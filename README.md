<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your web development learning app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:** Node.js

1. Copy `.env.example` to `.env.local` and set your Supabase URL and publishable key.
2. In the Supabase SQL Editor, run [`supabase/migration.sql`](supabase/migration.sql) to create the tables, row-level security policies, and quiz RPC.
3. Configure Google and GitHub providers in Supabase Authentication, and set the allowed redirect URLs for your local and deployed app.
4. Install dependencies with `npm install`, then start the app with `npm run dev`.

The Supabase secret/service-role key must only be used by a trusted server and must never be added to `.env.local` as a `VITE_*` variable or included in browser code.

This switches the app's backend integration and creates the Supabase schema; it does not copy existing Firebase Auth accounts or Firestore records. Plan a separate data import before cutover, and expect users to sign up or authenticate with Supabase after migration.
