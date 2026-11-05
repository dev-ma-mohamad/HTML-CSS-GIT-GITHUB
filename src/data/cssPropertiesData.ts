import { Language } from './translations';

export interface CssPropertyItem {
  id: string;
  property: string;
  category: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';
  categoryTitle: Record<Language, string>;
  meaning: Record<Language, string>;
  syntax: string;
  availableValues: {
    value: string;
    description: Record<Language, string>;
  }[];
  htmlExample: string;
  cssExample: string;
  liveStyle: Record<string, string>;
  commonMistakes: Record<Language, string>;
  differenceWithSimilar: Record<Language, string>;
}

export const CSS_CATEGORIES: { id: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J'; label: Record<Language, string> }[] = [
  { id: 'A', label: { en: 'A. CSS Basics & Selectors', fr: 'A. Bases & Sélecteurs', ar: 'أ. الأساسيات والمحددات' } },
  { id: 'B', label: { en: 'B. Colors & Backgrounds', fr: 'B. Couleurs & Arrière-plans', ar: 'ب. الألوان والخلفيات' } },
  { id: 'C', label: { en: 'C. Text & Fonts', fr: 'C. Texte & Polices', ar: 'ج. النصوص والخطوط' } },
  { id: 'D', label: { en: 'D. Box Model', fr: 'D. Modèle de Boîte (Box Model)', ar: 'د. نموذج الصندوق (Box Model)' } },
  { id: 'E', label: { en: 'E. Display & Positioning', fr: 'E. Affichage & Positionnement', ar: 'هـ. العرض والمحاذاة المكانية' } },
  { id: 'F', label: { en: 'F. Flexbox', fr: 'F. Flexbox (Mise en page 1D)', ar: 'و. التخطيط المرن (Flexbox)' } },
  { id: 'G', label: { en: 'G. CSS Grid', fr: 'G. Grille CSS (Mise en page 2D)', ar: 'ز. شبكة التخطيط (CSS Grid)' } },
  { id: 'H', label: { en: 'H. Animations & Transitions', fr: 'H. Animations & Transitions', ar: 'ح. الحركات والتحريك' } },
  { id: 'I', label: { en: 'I. Responsive Design', fr: 'I. Design Réactif (Responsive)', ar: 'ط. التصميم المتجاوب للشاشات' } },
  { id: 'J', label: { en: 'J. Advanced Modern CSS', fr: 'J. CSS Moderne Avancé', ar: 'ي. خصائص CSS الحديثة والمتقدمة' } }
];

export const ALL_CSS_PROPERTIES: CssPropertyItem[] = [
  // --- B. Colors & Backgrounds ---
  {
    id: 'css-color',
    property: 'color',
    category: 'B',
    categoryTitle: { en: 'Colors & Backgrounds', fr: 'Couleurs & Arrière-plans', ar: 'الألوان والخلفيات' },
    meaning: {
      en: 'Sets the foreground text color of an element.',
      fr: 'Définit la couleur du texte au premier plan d\'un élément.',
      ar: 'يحدد لون خط النص الأمامي للعنصر.'
    },
    syntax: 'color: <value>;',
    availableValues: [
      { value: '#00f0ff', description: { en: 'Hexadecimal hex color code', fr: 'Code couleur hexadécimal', ar: 'كود سداسي عشري (Hex)' } },
      { value: 'rgb(0, 240, 255)', description: { en: 'Red, Green, Blue channel numbers (0-255)', fr: 'Canaux Rouge, Vert, Bleu', ar: 'قنوات RGB من 0 إلى 255' } },
      { value: 'hsl(180, 100%, 50%)', description: { en: 'Hue, Saturation, Lightness values', fr: 'Teinte, Saturation, Luminosité', ar: 'درجة اللون، التشبع، والإضاءة' } },
      { value: 'currentColor', description: { en: 'Inherits current computed text color', fr: 'Hérite de la couleur de texte actuelle', ar: 'يرث لون النص المحسوب حالياً' } }
    ],
    htmlExample: `<p class="glow-text">Hello Cyber Web</p>`,
    cssExample: `.glow-text {\n  color: #00f0ff;\n  font-weight: 700;\n}`,
    liveStyle: { color: '#00f0ff', fontWeight: '700' },
    commonMistakes: {
      en: 'Using "color" to change the background. For backgrounds, use "background-color".',
      fr: 'Utiliser "color" pour changer le fond. Utilisez "background-color".',
      ar: 'استخدام خاصية color لتغيير لون الخلفية؛ لتغيير الخلفية استخدم background-color.'
    },
    differenceWithSimilar: {
      en: '"color" changes text. "background-color" changes the surface beneath text.',
      fr: '"color" cible le texte; "background-color" cible le fond.',
      ar: 'خاصية color للنص نفسه؛ بينما background-color للسطح الذي يقع تحته.'
    }
  },
  {
    id: 'css-background',
    property: 'background',
    category: 'B',
    categoryTitle: { en: 'Colors & Backgrounds', fr: 'Couleurs & Arrière-plans', ar: 'الألوان والخلفيات' },
    meaning: {
      en: 'Shorthand for all background properties: color, image, position, size, repeat, and attachment.',
      fr: 'Raccourci regroupant couleur, image, position, taille et répétition de fond.',
      ar: 'خاصية مجمعة تحدد كل خصائص الخلفية: اللون، الصورة، الموضع، التكرار، والتثبيت.'
    },
    syntax: 'background: <color> <image> <position>/<size> <repeat>;',
    availableValues: [
      { value: '#0f172a', description: { en: 'Solid background color', fr: 'Couleur unie', ar: 'لون خلفية موحد' } },
      { value: 'linear-gradient(135deg, #00f0ff, #ec4899)', description: { en: 'Smooth angled gradient fill', fr: 'Dégradé linéaire', ar: 'تدرج لوني خطي مائل' } },
      { value: 'radial-gradient(circle, #3b82f6, #090d16)', description: { en: 'Circular radiating glow', fr: 'Dégradé radial circulaire', ar: 'تدرج لوني دائري مشع' } }
    ],
    htmlExample: `<div class="gradient-banner">RGB Experience</div>`,
    cssExample: `.gradient-banner {\n  background: linear-gradient(135deg, #00f0ff, #8b5cf6);\n  padding: 24px;\n  border-radius: 12px;\n  color: #fff;\n}`,
    liveStyle: { background: 'linear-gradient(135deg, #00f0ff, #8b5cf6)', padding: '24px', borderRadius: '12px', color: '#fff' },
    commonMistakes: {
      en: 'Specifying background shorthand AFTER background-size overrides and wipes out the size declaration.',
      fr: 'Déclarer le raccourci background après background-size écrase ce dernier.',
      ar: 'كتابة background المجمعة بعد background-size يلغي حجم الخلفية السابق.'
    },
    differenceWithSimilar: {
      en: 'background-color only accepts colors; background accepts gradients and images as well.',
      fr: 'background-color accepte uniquement des couleurs; background accepte aussi dégradés et images.',
      ar: 'background-color للألوان فقط؛ بينما background تقبل التدرجات اللمسية والصور أيضاً.'
    }
  },

  // --- D. Box Model ---
  {
    id: 'css-box-sizing',
    property: 'box-sizing',
    category: 'D',
    categoryTitle: { en: 'Box Model', fr: 'Modèle de Boîte', ar: 'نموذج الصندوق' },
    meaning: {
      en: 'Controls how the total width and height of an element are calculated (content vs border-box).',
      fr: 'Contrôle le calcul de la largeur et hauteur totales de l\'élément.',
      ar: 'يتحكم في طريقة احتساب العرض والارتفاع الكليين للعنصر (هل يشملان الحشوة والإطار أم لا).'
    },
    syntax: 'box-sizing: content-box | border-box;',
    availableValues: [
      { value: 'border-box', description: { en: 'Width/Height include padding and border (RECOMMENDED)', fr: 'La largeur inclut padding et bordures (RECOMMANDÉ)', ar: 'العرض والارتفاع يشملان الحشوة والإطار (موصى به دائماً)' } },
      { value: 'content-box', description: { en: 'Default: padding and border expand beyond declared width', fr: 'Par défaut : padding et bordures s\'ajoutent à la largeur', ar: 'الوضع الافتراضي: الحشوة والإطار يتمددان خارج العرض المحدد' } }
    ],
    htmlExample: `<div class="safe-box">Width is exactly 260px</div>`,
    cssExample: `.safe-box {\n  box-sizing: border-box;\n  width: 260px;\n  padding: 24px;\n  border: 2px solid #00f0ff;\n  background: #0f172a;\n  color: #fff;\n}`,
    liveStyle: { boxSizing: 'border-box', width: '260px', padding: '24px', border: '2px solid #00f0ff', background: '#0f172a', color: '#fff' },
    commonMistakes: {
      en: 'Leaving default content-box causing grids to wrap and elements to break layouts on mobile.',
      fr: 'Garder content-box provoque le débordement de vos colonnes sur mobile.',
      ar: 'ترك الوضع الافتراضي مما يؤدي لتمدد العناصر وتخريب التخطيط في الهواتف.'
    },
    differenceWithSimilar: {
      en: 'border-box gives predictable layouts where 100% width always stays within the screen.',
      fr: 'border-box garantit qu\'une largeur de 100% ne dépasse jamais l\'écran.',
      ar: 'border-box يضمن أن عرض 100% لا يتجاوز عرض الشاشة إطلاقاً عند إضافة padding.'
    }
  },
  {
    id: 'css-border-radius',
    property: 'border-radius',
    category: 'D',
    categoryTitle: { en: 'Box Model', fr: 'Modèle de Boîte', ar: 'استدارة الحواف' },
    meaning: {
      en: 'Rounds the corners of an element\'s outer border edge.',
      fr: 'Arrondit les coins de la bordure extérieure d\'un élément.',
      ar: 'يقوم بتدوير حواف وزوايا الصندوق لجعلها ناعمة ومنحنية.'
    },
    syntax: 'border-radius: <length> | <percentage>;',
    availableValues: [
      { value: '8px', description: { en: 'Subtle modern corner curve', fr: 'Coins légèrement arrondis', ar: 'استدارة خفيفة وعصرية' } },
      { value: '16px', description: { en: 'Pronounced card rounding', fr: 'Coins arrondis prononcés', ar: 'استدارة متوسطة للبطاقات' } },
      { value: '9999px', description: { en: 'Pill capsule button shape', fr: 'Forme de pilule ovale', ar: 'شكل كبسولة دائرية للأزرار' } },
      { value: '50%', description: { en: 'Perfect circle (when width equals height)', fr: 'Cercle parfait si largeur = hauteur', ar: 'دائرة تامة إذا كان الطول يساوي العرض' } }
    ],
    htmlExample: `<div class="pill-badge">PRO DEV 2026</div>`,
    cssExample: `.pill-badge {\n  border-radius: 9999px;\n  background: rgba(0, 240, 255, 0.15);\n  border: 1px solid #00f0ff;\n  color: #00f0ff;\n  padding: 6px 16px;\n  display: inline-block;\n}`,
    liveStyle: { borderRadius: '9999px', background: 'rgba(0, 240, 255, 0.15)', border: '1px solid #00f0ff', color: '#00f0ff', padding: '6px 16px', display: 'inline-block', fontWeight: 'bold' },
    commonMistakes: {
      en: 'Applying border-radius: 50% on non-square containers creates an oval egg shape instead of a circle.',
      fr: 'border-radius: 50% sur un rectangle crée un ovale et non un cercle.',
      ar: 'وضع 50% على صندوق مستطيل يحوله لشكل بيضاوي وليس دائرة (يجب أن يكون العرض مساوياً للارتفاع).'
    },
    differenceWithSimilar: {
      en: 'border-radius shapes corners; clip-path cuts custom polygon vector shapes.',
      fr: 'border-radius arrondit les coins; clip-path découpe des formes géométriques complexes.',
      ar: 'border-radius يلف الزوايا؛ بينما clip-path يقص الأشكال هندسياً كالمثلث والمضلع.'
    }
  },

  // --- F. Flexbox ---
  {
    id: 'css-display-flex',
    property: 'display: flex',
    category: 'F',
    categoryTitle: { en: 'Flexbox', fr: 'Flexbox', ar: 'التخطيط المرن' },
    meaning: {
      en: 'Turns an element into a flex container, laying out direct children along a flexible single-dimensional axis.',
      fr: 'Transforme un élément en conteneur flexible, organisant ses enfants sur un axe à 1 dimension.',
      ar: 'يحول العنصر إلى حاوية مرنة توزع عناصرها الفرعية في بعد واحد بمرونة تامة.'
    },
    syntax: 'display: flex;',
    availableValues: [
      { value: 'flex', description: { en: 'Block-level flex container', fr: 'Conteneur flex de niveau bloc', ar: 'حاوية كتلية مرنة تأخذ عرض السطر كاملاً' } },
      { value: 'inline-flex', description: { en: 'Inline-level flex container', fr: 'Conteneur flex en ligne', ar: 'حاوية مرنة سطرية تأخذ حجم محتواها فقط' } }
    ],
    htmlExample: `<div class="flex-row">\n  <span>Home</span>\n  <span>Courses</span>\n  <span>Terminal</span>\n</div>`,
    cssExample: `.flex-row {\n  display: flex;\n  gap: 16px;\n  background: #0f172a;\n  padding: 16px;\n  border-radius: 8px;\n  color: #fff;\n}`,
    liveStyle: { display: 'flex', gap: '16px', background: '#0f172a', padding: '16px', borderRadius: '8px', color: '#fff' },
    commonMistakes: {
      en: 'Expecting display: flex to position items both horizontally and vertically across rows simultaneously (use CSS Grid for 2D).',
      fr: 'Vouloir gérer lignes ET colonnes complexes en même temps (utilisez CSS Grid pour le 2D).',
      ar: 'محاولة بناء شبكات معقدة ثنائية الأبعاد بـ Flexbox؛ لشبكات الصفوف والأعمدة معاً استخدم CSS Grid.'
    },
    differenceWithSimilar: {
      en: 'Flexbox distributes items along one axis (row OR column); Grid manages both rows AND columns simultaneously.',
      fr: 'Flexbox gère 1 axe (ligne OU colonne); Grid gère les 2 dimensions à la fois.',
      ar: 'Flexbox يتعامل مع بعد واحد (صف أو عمود)؛ بينما Grid يتعامل مع الصفوف والأعمدة معاً.'
    }
  },
  {
    id: 'css-justify-content',
    property: 'justify-content',
    category: 'F',
    categoryTitle: { en: 'Flexbox', fr: 'Flexbox', ar: 'المحاذاة الأفقية (Flexbox)' },
    meaning: {
      en: 'Distributes and aligns flex items along the main axis of the container (horizontal by default).',
      fr: 'Aligne et répartit les éléments flexibles le long de l\'axe principal.',
      ar: 'يتحكم في محاذاة وتوزيع العناصر الفرعية على طول المحور الرئيسي (أفقياً في الوضع الافتراضي).'
    },
    syntax: 'justify-content: flex-start | center | space-between | space-around | space-evenly;',
    availableValues: [
      { value: 'space-between', description: { en: 'Pushes first item to start, last to end, equal gaps between', fr: 'Espace maximal entre les éléments, collés aux bords', ar: 'يلصق أول عنصر في البداية وآخر عنصر في النهاية ومسافات متساوية بينهما' } },
      { value: 'center', description: { en: 'Packs all children together at center', fr: 'Centre tous les éléments au milieu', ar: 'يجمع كل العناصر في منتصف المحور تماماً' } },
      { value: 'space-evenly', description: { en: 'Equal spacing between items and around outer edges', fr: 'Espacement parfaitement égal partout', ar: 'مسافات متساوية تماماً بين العناصر والحواف الخارجية' } }
    ],
    htmlExample: `<div class="navbar-demo">\n  <strong>Logo</strong>\n  <span>Profile</span>\n</div>`,
    cssExample: `.navbar-demo {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background: #1e293b;\n  padding: 12px 20px;\n  border-radius: 8px;\n  color: #fff;\n}`,
    liveStyle: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e293b', padding: '12px 20px', borderRadius: '8px', color: '#fff' },
    commonMistakes: {
      en: 'Using justify-content to center vertically when flex-direction is row (use align-items instead).',
      fr: 'Confondre l\'axe principal (justify-content) et l\'axe secondaire (align-items).',
      ar: 'استخدام justify-content للمحاذاة الرأسية في الوضع الأفقي؛ للمحاذاة الرأسية استخدم align-items.'
    },
    differenceWithSimilar: {
      en: 'justify-content aligns on main axis; align-items aligns on cross axis.',
      fr: 'justify-content = axe principal; align-items = axe secondaire.',
      ar: 'justify-content للمحور الرئيسي؛ بينما align-items للمحور العمودي المتقاطع.'
    }
  },

  // --- G. CSS Grid ---
  {
    id: 'css-grid-template-columns',
    property: 'grid-template-columns',
    category: 'G',
    categoryTitle: { en: 'CSS Grid', fr: 'Grille CSS', ar: 'شبكة التخطيط (Grid)' },
    meaning: {
      en: 'Defines the column track sizing and count in a CSS Grid container.',
      fr: 'Définit le nombre et la largeur des colonnes dans une grille CSS.',
      ar: 'يحدد عدد الأعمدة وأحجامها في حاوية الـ Grid.'
    },
    syntax: 'grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) | 1fr 1fr | 200px auto;',
    availableValues: [
      { value: 'repeat(auto-fit, minmax(200px, 1fr))', description: { en: 'Auto-responsive card grid without media queries', fr: 'Grille réactive automatique sans media queries', ar: 'شبكة بطاقات متجاوبة تلقائياً بدون استعلامات وسائط' } },
      { value: '1fr 2fr', description: { en: 'Two columns: second is twice as wide as first', fr: 'Deux colonnes: la 2ème est deux fois plus large', ar: 'عمودان: الثاني ضعف عرض الأول' } },
      { value: 'repeat(3, 1fr)', description: { en: 'Three equal fractional columns', fr: 'Trois colonnes d\'égale largeur', ar: 'ثلاثة أعمدة متساوية المساحة تماماً' } }
    ],
    htmlExample: `<div class="grid-showcase">\n  <div class="col-box">HTML</div>\n  <div class="col-box">CSS</div>\n  <div class="col-box">Git</div>\n</div>`,
    cssExample: `.grid-showcase {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n.col-box {\n  background: #0284c7;\n  padding: 16px;\n  border-radius: 8px;\n  text-align: center;\n  color: #fff;\n}`,
    liveStyle: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' },
    commonMistakes: {
      en: 'Using rigid pixel widths like "300px 300px 300px" causing horizontal screen scroll on mobile devices.',
      fr: 'Utiliser des pixels fixes provoquant un défilement horizontal sur mobile.',
      ar: 'استخدام بكسلات ثابتة تسبب التمرير الأفقي وانكسار الصفحة في شاشات الهواتف.'
    },
    differenceWithSimilar: {
      en: 'grid-template-columns sets vertical columns; grid-template-rows sets horizontal rows.',
      fr: 'grid-template-columns gère les colonnes; grid-template-rows gère les lignes.',
      ar: 'grid-template-columns للأعمدة الرأسية؛ بينما grid-template-rows للصفوف الأفقية.'
    }
  },

  // --- H. Animations & Transitions ---
  {
    id: 'css-transition',
    property: 'transition',
    category: 'H',
    categoryTitle: { en: 'Animations & Transitions', fr: 'Animations & Transitions', ar: 'الانتقالات الحركية' },
    meaning: {
      en: 'Smoothly animates CSS property changes over time on state triggers like :hover and :focus.',
      fr: 'Anime en douceur les changements de propriétés lors d\'un survol :hover ou focus.',
      ar: 'يجعل انتقال وتغير خصائص الـ CSS يحدث بنعومة وتدريج زمني عند تفاعل المستخدم (:hover).'
    },
    syntax: 'transition: <property> <duration> <timing-function> <delay>;',
    availableValues: [
      { value: 'all 0.3s ease', description: { en: 'Animates any change over 300ms smoothly', fr: 'Anime tout changement en 300ms', ar: 'يحرك أي تغيير بنعومة خلال 0.3 ثانية' } },
      { value: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)', description: { en: 'High-performance GPU spring transition', fr: 'Transition ultra-fluide avec courbe bezier', ar: 'انتقال فائق السلاسة بتسريع معالج الرسوميات' } }
    ],
    htmlExample: `<button class="hover-btn">Hover over me</button>`,
    cssExample: `.hover-btn {\n  background: #0284c7;\n  color: #fff;\n  padding: 12px 24px;\n  border: none;\n  border-radius: 8px;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.hover-btn:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 10px 20px rgba(2, 132, 199, 0.5);\n}`,
    liveStyle: { background: '#0284c7', color: '#fff', padding: '12px 24px', border: 'none', borderRadius: '8px', transition: 'all 0.2s ease', cursor: 'pointer', fontWeight: 'bold' },
    commonMistakes: {
      en: 'Placing the transition property inside the :hover block instead of the base class rule! Causes jerky snap back.',
      fr: 'Mettre la transition dans :hover au lieu de la classe de base. Le retour est alors brusque.',
      ar: 'وضع خاصية transition داخل كلاس :hover بدلاً من الكلاس الأصلي، مما يجعل التراجع فجائياً وبدون نعومة.'
    },
    differenceWithSimilar: {
      en: 'transition needs an external trigger (:hover, :focus, JS class); animation runs automatically via keyframes.',
      fr: 'transition requiert un déclencheur (:hover); animation tourne automatiquement via keyframes.',
      ar: 'transition يحتاج محفزاً مثل hover؛ بينما animation يشتغل تلقائياً ومستقلاً عبر keyframes.'
    }
  },

  // --- J. Advanced Modern CSS ---
  {
    id: 'css-variables',
    property: 'CSS Variables (--custom-prop)',
    category: 'J',
    categoryTitle: { en: 'Advanced CSS', fr: 'CSS Avancé', ar: 'المتغيرات والخصائص الحديثة' },
    meaning: {
      en: 'Allows you to store reusable values (colors, spacing, fonts) in custom properties declared in :root and called with var().',
      fr: 'Stocke des valeurs réutilisables (couleurs, espacements) appelées avec var().',
      ar: 'يتيح تخزين قيم قابلة لإعادة الاستخدام (ألوان، مسافات، خطوط) يعلن عنها في :root وتستدعى بـ var().'
    },
    syntax: ':root { --primary-color: #00f0ff; }\n.card { color: var(--primary-color); }',
    availableValues: [
      { value: 'var(--brand-color, #0284c7)', description: { en: 'Reads variable with optional fallback value', fr: 'Lit la variable avec valeur de secours optionnelle', ar: 'يقرأ المتغير مع قيمة بديلة في حال عدم توفره' } }
    ],
    htmlExample: `<div class="theme-card">Styled with CSS Variables</div>`,
    cssExample: `:root {\n  --neon-cyan: #00f0ff;\n  --card-bg: #090d16;\n}\n.theme-card {\n  background: var(--card-bg);\n  border: 1px solid var(--neon-cyan);\n  color: var(--neon-cyan);\n  padding: 16px;\n  border-radius: 8px;\n}`,
    liveStyle: { background: '#090d16', border: '1px solid #00f0ff', color: '#00f0ff', padding: '16px', borderRadius: '8px', fontWeight: 'bold' },
    commonMistakes: {
      en: 'Forgetting the leading double hyphens (--). Without "--" it is not recognized as a valid variable.',
      fr: 'Oublier les deux tirets (--) au début du nom de variable.',
      ar: 'نسيان الشرطتين -- في بداية اسم المتغير؛ بدونهما لن يتعرف المتصفح على المتغير.'
    },
    differenceWithSimilar: {
      en: 'Native CSS variables update live in real-time in the browser and can be toggled by JS; SASS/SCSS variables compile to static values.',
      fr: 'Les variables CSS natives réagissent en temps réel en JS, contrairement aux variables SASS statiques.',
      ar: 'متغيرات CSS الأصلية ديناميكية وتتغير حياً عبر JavaScript؛ بينما متغيرات SASS جامدة وتترجم قبل التشغيل.'
    }
  }
];
