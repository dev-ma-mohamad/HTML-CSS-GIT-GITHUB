create or replace function public.is_platform_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'dev.ma.mohamad@gmail.com';
$$;

create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null default '',
  display_name text not null default 'Web Developer',
  photo_url text not null default '',
  role text not null default 'user' check (role in ('user', 'admin')),
  selected_level text check (selected_level in ('beginner', 'intermediate', 'advanced')),
  onboarding_completed boolean not null default false,
  points integer not null default 0 check (points >= 0),
  current_course text not null default 'html',
  current_lesson_id text not null default 'html-01',
  completed_lessons text[] not null default '{}',
  completed_exercises text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_activity_date timestamptz not null default now()
);

create table if not exists public.quiz_attempts (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  first_attempt_correct boolean not null,
  attempts_count integer not null default 1 check (attempts_count > 0),
  earned_point boolean not null default false,
  answered_at timestamptz not null default now(),
  last_attempted_at timestamptz,
  primary key (user_id, question_id)
);

create table if not exists public.quiz_answer_keys (
  question_id text primary key,
  correct_index integer not null check (correct_index >= 0)
);

insert into public.quiz_answer_keys (question_id, correct_index)
values
  ('101', 0), ('102', 0), ('103', 0), ('104', 0), ('105', 0),
  ('106', 0), ('107', 0), ('201', 0), ('202', 0), ('203', 0),
  ('204', 0), ('301', 0), ('302', 0), ('303', 0), ('304', 0),
  ('401', 0), ('402', 0), ('403', 0), ('404', 0)
on conflict (question_id) do update
set correct_index = excluded.correct_index;

revoke all on public.quiz_answer_keys from public, anon, authenticated;
alter table public.quiz_answer_keys enable row level security;

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  user_display_name text not null default 'Learner',
  user_photo_url text not null default '',
  content text not null check (char_length(content) >= 5),
  rating integer check (rating between 1 and 5),
  reported boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists comments_created_at_idx on public.comments (created_at desc);
create index if not exists user_profiles_points_idx on public.user_profiles (points desc);

create table if not exists public.admin_audit_logs (
  id bigint generated always as identity primary key,
  admin_id uuid not null references auth.users(id) on delete cascade,
  admin_email text not null,
  action text not null,
  target_id text,
  created_at timestamptz not null default now()
);

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.user_profiles (id, email, display_name, photo_url, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', split_part(coalesce(new.email, ''), '@', 1), 'Web Developer'),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture', ''),
    case when coalesce(new.email, '') = 'dev.ma.mohamad@gmail.com' then 'admin' else 'user' end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute function public.create_profile_for_new_user();

insert into public.user_profiles (
  id, email, display_name, photo_url, role
)
select
  users.id,
  coalesce(users.email, ''),
  coalesce(users.raw_user_meta_data ->> 'display_name', users.raw_user_meta_data ->> 'full_name', users.raw_user_meta_data ->> 'name', split_part(coalesce(users.email, ''), '@', 1), 'Web Developer'),
  coalesce(users.raw_user_meta_data ->> 'avatar_url', users.raw_user_meta_data ->> 'picture', ''),
  case when coalesce(users.email, '') = 'dev.ma.mohamad@gmail.com' then 'admin' else 'user' end
from auth.users as users
on conflict (id) do nothing;

create or replace function public.protect_user_profile()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if auth.uid() = old.id
     and not public.is_platform_admin()
     and coalesce(current_setting('app.recording_quiz_attempt', true), '') <> 'true' then
    new.role := old.role;
    new.points := old.points;
    new.email := old.email;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists protect_user_profile_fields on public.user_profiles;
create trigger protect_user_profile_fields
  before update on public.user_profiles
  for each row execute function public.protect_user_profile();

create or replace function public.guard_comment_updates()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if auth.uid() is not null
     and auth.uid() <> old.user_id
     and not public.is_platform_admin()
     and (
       new.user_id is distinct from old.user_id
       or new.user_display_name is distinct from old.user_display_name
       or new.user_photo_url is distinct from old.user_photo_url
       or new.content is distinct from old.content
       or new.rating is distinct from old.rating
       or new.reported is distinct from true
       or old.reported
     ) then
    raise exception 'You may only report a comment for moderation.';
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists guard_comment_updates on public.comments;
create trigger guard_comment_updates
  before update on public.comments
  for each row execute function public.guard_comment_updates();

create or replace function public.record_quiz_attempt(p_user_id uuid, p_question_id text, p_answer_index integer)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  inserted_count integer;
  correct_index integer;
  is_correct boolean;
  earned boolean := false;
begin
  if auth.uid() is distinct from p_user_id then
    raise exception 'Not authorized to record this attempt.';
  end if;
  if p_question_id is null or length(p_question_id) = 0 then
    raise exception 'Question ID is required.';
  end if;

  select answer_key.correct_index into correct_index
  from public.quiz_answer_keys as answer_key
  where answer_key.question_id = p_question_id;
  if not found then
    raise exception 'Unknown question ID.';
  end if;
  is_correct := p_answer_index = correct_index;

  insert into public.quiz_attempts (user_id, question_id, first_attempt_correct, earned_point)
  values (p_user_id, p_question_id, is_correct, is_correct)
  on conflict (user_id, question_id) do nothing;
  get diagnostics inserted_count = row_count;

  if inserted_count = 1 then
    earned := is_correct;
    if earned then
      perform set_config('app.recording_quiz_attempt', 'true', true);
      update public.user_profiles
      set points = points + 1, last_activity_date = now()
      where id = p_user_id;
    end if;
  else
    update public.quiz_attempts
    set attempts_count = attempts_count + 1, last_attempted_at = now()
    where user_id = p_user_id and question_id = p_question_id;
  end if;

  return jsonb_build_object('earnedPoint', earned);
end;
$$;

revoke all on function public.record_quiz_attempt(uuid, text, integer) from public;
grant execute on function public.record_quiz_attempt(uuid, text, integer) to authenticated;

create or replace view public.public_leaderboard as
select id, display_name, photo_url, role, selected_level, points, completed_lessons
from public.user_profiles;

alter table public.user_profiles enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.comments enable row level security;
alter table public.admin_audit_logs enable row level security;

drop policy if exists "Profiles can be read by owner or admin" on public.user_profiles;
create policy "Profiles can be read by owner or admin"
  on public.user_profiles for select to authenticated
  using (id = auth.uid() or public.is_platform_admin());
drop policy if exists "Users can create their own profile" on public.user_profiles;
create policy "Users can create their own profile"
  on public.user_profiles for insert to authenticated
  with check (id = auth.uid() and role = 'user');
drop policy if exists "Users can update their profile" on public.user_profiles;
create policy "Users can update their profile"
  on public.user_profiles for update to authenticated
  using (id = auth.uid() or public.is_platform_admin())
  with check (id = auth.uid() or public.is_platform_admin());
drop policy if exists "Admins can delete profiles" on public.user_profiles;
create policy "Admins can delete profiles"
  on public.user_profiles for delete to authenticated
  using (public.is_platform_admin());

drop policy if exists "Users can read their quiz attempts" on public.quiz_attempts;
create policy "Users can read their quiz attempts"
  on public.quiz_attempts for select to authenticated
  using (user_id = auth.uid() or public.is_platform_admin());

drop policy if exists "Comments are readable by everyone" on public.comments;
create policy "Comments are readable by everyone"
  on public.comments for select to anon, authenticated using (true);
drop policy if exists "Users can create their own comments" on public.comments;
create policy "Users can create their own comments"
  on public.comments for insert to authenticated
  with check (user_id = auth.uid());
drop policy if exists "Users can update or report comments" on public.comments;
create policy "Users can update or report comments"
  on public.comments for update to authenticated
  using (user_id = auth.uid() or public.is_platform_admin() or auth.uid() is not null)
  with check (user_id = auth.uid() or public.is_platform_admin() or auth.uid() is not null);
drop policy if exists "Owners and admins can delete comments" on public.comments;
create policy "Owners and admins can delete comments"
  on public.comments for delete to authenticated
  using (user_id = auth.uid() or public.is_platform_admin());

drop policy if exists "Admins can read audit logs" on public.admin_audit_logs;
create policy "Admins can read audit logs"
  on public.admin_audit_logs for select to authenticated
  using (public.is_platform_admin());
drop policy if exists "Admins can create audit logs" on public.admin_audit_logs;
create policy "Admins can create audit logs"
  on public.admin_audit_logs for insert to authenticated
  with check (public.is_platform_admin() and admin_id = auth.uid());

grant select on public.public_leaderboard to anon, authenticated;
grant select, insert, update, delete on public.user_profiles, public.comments to authenticated;
grant select on public.comments to anon;
grant select on public.quiz_attempts to authenticated;
grant select, insert on public.admin_audit_logs to authenticated;

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
     and not exists (
       select 1 from pg_publication_tables
       where pubname = 'supabase_realtime'
         and schemaname = 'public'
         and tablename = 'comments'
     ) then
    alter publication supabase_realtime add table public.comments;
  end if;
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
     and not exists (
       select 1 from pg_publication_tables
       where pubname = 'supabase_realtime'
         and schemaname = 'public'
         and tablename = 'user_profiles'
     ) then
    alter publication supabase_realtime add table public.user_profiles;
  end if;
end;
$$;
