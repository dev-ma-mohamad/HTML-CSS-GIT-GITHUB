import React, { useState } from 'react';
import {
  Search,
  Copy,
  Check,
  Palette,
  AlertTriangle,
  Layers,
  Sparkles,
  ArrowRight,
  Code
} from 'lucide-react';
import { Language } from '../data/translations';
import { ALL_CSS_PROPERTIES, CSS_CATEGORIES, CssPropertyItem } from '../data/cssPropertiesData';

interface CssPropertiesExplainedProps {
  language: Language;
  onNavigateHome: () => void;
  onNavigatePlayground: () => void;
}

export const CssPropertiesExplained: React.FC<CssPropertiesExplainedProps> = ({
  language,
  onNavigateHome,
  onNavigatePlayground,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activePropertyId, setActivePropertyId] = useState<string>(ALL_CSS_PROPERTIES[0]?.id || 'css-color');
  const [selectedCustomValues, setSelectedCustomValues] = useState<Record<string, string>>({});

  const isRtl = language === 'ar';

  const t = {
    title: {
      en: 'CSS Properties Master Guide',
      fr: 'Guide Maître des Propriétés CSS',
      ar: 'دليل احتراف خصائص CSS الشامل',
    }[language],
    subtitle: {
      en: 'Explore CSS properties from A to J with interactive live visual previews, clear syntax, real examples, common mistakes, and value switchers.',
      fr: 'Explorez les propriétés CSS de A à J avec prévisualisations interactives en direct, syntaxe claire, exemples réels et pièges courants.',
      ar: 'استكشف خصائص CSS من الألف إلى الياء (الفئات أ إلى ي) مع معاينة مرئية تفاعلية حية، بناء جملة دقيق، وأخطاء شائعة مع تصحيحها.',
    }[language],
    searchPlaceholder: {
      en: 'Search any CSS property (e.g., flexbox, display, grid, padding, transform)...',
      fr: 'Rechercher une propriété CSS (ex. flexbox, display, grid, padding)...',
      ar: 'ابحث عن أي خاصية CSS (مثل: flexbox, display, grid, border, transform)...',
    }[language],
    allCategories: {
      en: 'All Categories',
      fr: 'Toutes les catégories',
      ar: 'جميع الفئات',
    }[language],
    interactivePreview: {
      en: 'Interactive Live Preview',
      fr: 'Aperçu Dynamique en Direct',
      ar: 'معاينة بصرية تفاعلية حية',
    }[language],
    clickToApply: {
      en: 'Click any value below to see it live:',
      fr: 'Cliquez sur une valeur ci-dessous pour l\'appliquer :',
      ar: 'انقر على أي قيمة أدناه لتطبيقها فوراً:',
    }[language],
    syntax: {
      en: 'Syntax',
      fr: 'Syntaxe',
      ar: 'بناء الجملة (Syntax)',
    }[language],
    availableValues: {
      en: 'Available Values & Meanings',
      fr: 'Valeurs Possibles & Significations',
      ar: 'القيم المتاحة وشرحها',
    }[language],
    codeExample: {
      en: 'HTML & CSS Code',
      fr: 'Code HTML & CSS',
      ar: 'كود HTML و CSS',
    }[language],
    commonMistakes: {
      en: 'Common Mistakes & Fixes',
      fr: 'Erreurs Fréquentes & Solutions',
      ar: 'أخطاء شائعة وكيفية تجنبها',
    }[language],
    similarDiff: {
      en: 'Comparison with Similar Properties',
      fr: 'Différence avec les Propriétés Similaires',
      ar: 'الفرق بينها وبين الخصائص المشابهة',
    }[language],
    copied: {
      en: 'Copied!',
      fr: 'Copié !',
      ar: 'تم النسخ!',
    }[language],
    openPlayground: {
      en: 'Open Full Visual CSS Playground',
      fr: 'Ouvrir le Playground CSS Visuel',
      ar: 'فتح مختبر CSS المرئي المتكامل',
    }[language],
    noResults: {
      en: 'No properties found matching your search.',
      fr: 'Aucune propriété ne correspond à votre recherche.',
      ar: 'لم يتم العثور على أي خاصية تطابق بحثك.',
    }[language],
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredProperties = ALL_CSS_PROPERTIES.filter((item) => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesQuery =
      item.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryTitle[language].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const activeProperty: CssPropertyItem | undefined =
    filteredProperties.find((p) => p.id === activePropertyId) ||
    filteredProperties[0] ||
    ALL_CSS_PROPERTIES[0];

  const handleSelectValue = (propId: string, cssProperty: string, val: string) => {
    setSelectedCustomValues((prev) => ({
      ...prev,
      [`${propId}_${cssProperty}`]: val,
    }));
  };

  const getComputedStyleForPreview = (item: CssPropertyItem): React.CSSProperties => {
    const base = { ...item.liveStyle };
    const customVal = selectedCustomValues[`${item.id}_${item.property}`];
    if (customVal) {
      // camelCase conversion for CSS property
      const camelKey = item.property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      (base as Record<string, string>)[camelKey] = customVal;
    }
    return base as React.CSSProperties;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Breadcrumb & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="text-xs uppercase font-mono tracking-wider text-slate-400 hover:text-cyan-400 transition-colors"
            >
              ← {language === 'ar' ? 'الرئيسية' : language === 'fr' ? 'Accueil' : 'Home'}
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold">
              CSS Academy
            </span>
          </div>

          <button
            onClick={onNavigatePlayground}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/40 text-cyan-300 font-medium text-sm transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)]"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{t.openPlayground}</span>
            <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs font-mono uppercase tracking-widest shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <Palette className="w-4 h-4 text-cyan-400" />
            <span>CSS Properties A-J Academy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            {t.title}
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 text-slate-100 placeholder-slate-500 outline-none text-sm font-mono shadow-inner transition-all"
          />
        </div>

        {/* Categories Tab Selector (A to J) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all border ${
              selectedCategory === 'ALL'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {t.allCategories} ({ALL_CSS_PROPERTIES.length})
          </button>
          {CSS_CATEGORIES.map((cat) => {
            const count = ALL_CSS_PROPERTIES.filter((p) => p.category === cat.id).length;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                  active
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/60 shadow-[0_0_12px_rgba(168,85,247,0.25)]'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>{cat.label[language]}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Grid: Properties List + Detail Showcase */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
            <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 font-medium">{t.noResults}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Properties Quick Selector */}
            <div className="lg:col-span-4 space-y-3 max-h-[850px] overflow-y-auto pr-1">
              {filteredProperties.map((prop) => {
                const isSelected = activeProperty?.id === prop.id;
                return (
                  <button
                    key={prop.id}
                    onClick={() => setActivePropertyId(prop.id)}
                    className={`w-full text-left p-4 rounded-2xl transition-all border block ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-950/60 to-purple-950/40 border-cyan-500/60 shadow-[0_0_20px_rgba(0,240,255,0.15)] ring-1 ring-cyan-500/40'
                        : 'bg-slate-900/80 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono font-bold text-sm text-cyan-400">
                        {prop.property}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700">
                        {prop.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {prop.meaning[language]}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Detailed Property Visualizer */}
            {activeProperty && (
              <div className="lg:col-span-8 space-y-6">
                <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                  {/* Property Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                          Cat. {activeProperty.category} — {activeProperty.categoryTitle[language]}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black font-mono text-cyan-300">
                        {activeProperty.property}
                      </h2>
                    </div>

                    <button
                      onClick={() =>
                        copyToClipboard(
                          activeProperty.syntax,
                          `syntax-${activeProperty.id}`
                        )
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700 transition-colors"
                    >
                      {copiedId === `syntax-${activeProperty.id}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">{t.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{t.syntax}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Meaning & Explanation */}
                  <div className="mt-4">
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {activeProperty.meaning[language]}
                    </p>
                  </div>

                  {/* Interactive Live Playground Box */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        {t.interactivePreview}
                      </span>
                      {selectedCustomValues[`${activeProperty.id}_${activeProperty.property}`] && (
                        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded-md border border-cyan-500/30">
                          {activeProperty.property}:{' '}
                          {selectedCustomValues[`${activeProperty.id}_${activeProperty.property}`]}
                        </span>
                      )}
                    </div>

                    {/* The Live Render Surface */}
                    <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center min-h-[160px] overflow-hidden relative">
                      {/* Grid background effect */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />

                      {/* Preview Element */}
                      <div
                        style={getComputedStyleForPreview(activeProperty)}
                        className="transition-all duration-300 z-10 p-4 rounded-xl max-w-full text-center"
                      >
                        <span className="font-bold">
                          {activeProperty.property} : Preview
                        </span>
                        <p className="text-xs opacity-80 mt-1">
                          Cyber Dev Interactive Target
                        </p>
                      </div>
                    </div>

                    {/* Interactive Value Chips */}
                    <div className="space-y-2 pt-2">
                      <p className="text-xs text-slate-400">{t.clickToApply}</p>
                      <div className="flex flex-wrap gap-2">
                        {activeProperty.availableValues.map((valObj) => {
                          const isCurrent =
                            selectedCustomValues[`${activeProperty.id}_${activeProperty.property}`] ===
                            valObj.value;
                          return (
                            <button
                              key={valObj.value}
                              onClick={() =>
                                handleSelectValue(
                                  activeProperty.id,
                                  activeProperty.property,
                                  valObj.value
                                )
                              }
                              className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all border flex items-center gap-1.5 ${
                                isCurrent
                                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                                  : 'bg-slate-800/80 hover:bg-slate-800 text-cyan-300 border-slate-700 hover:border-cyan-500/50'
                              }`}
                            >
                              <code>{valObj.value}</code>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Values & Meanings List */}
                  <div className="mt-8 space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-purple-400" />
                      {t.availableValues}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeProperty.availableValues.map((v) => (
                        <div
                          key={v.value}
                          className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1 hover:border-slate-700 transition-colors"
                        >
                          <div className="font-mono text-xs font-bold text-cyan-400">
                            {v.value}
                          </div>
                          <div className="text-xs text-slate-400 leading-normal">
                            {v.description[language]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Code Examples Snippets */}
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Code className="w-3.5 h-3.5 text-cyan-400" />
                        {t.codeExample}
                      </h3>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `${activeProperty.htmlExample}\n\n${activeProperty.cssExample}`,
                            `code-${activeProperty.id}`
                          )
                        }
                        className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1"
                      >
                        {copiedId === `code-${activeProperty.id}` ? (
                          <span className="text-emerald-400">{t.copied}</span>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* HTML */}
                      <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs overflow-x-auto">
                        <div className="text-slate-500 text-[10px] uppercase mb-2">
                          HTML
                        </div>
                        <pre className="text-cyan-300">
                          <code>{activeProperty.htmlExample}</code>
                        </pre>
                      </div>

                      {/* CSS */}
                      <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs overflow-x-auto">
                        <div className="text-slate-500 text-[10px] uppercase mb-2">
                          CSS
                        </div>
                        <pre className="text-purple-300">
                          <code>{activeProperty.cssExample}</code>
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Common Mistakes & Differences */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Common Mistakes */}
                    <div className="rounded-2xl bg-amber-950/20 border border-amber-500/30 p-4 space-y-2">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono uppercase">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{t.commonMistakes}</span>
                      </div>
                      <p className="text-xs text-amber-200/80 leading-relaxed">
                        {activeProperty.commonMistakes[language]}
                      </p>
                    </div>

                    {/* Differences */}
                    <div className="rounded-2xl bg-blue-950/20 border border-blue-500/30 p-4 space-y-2">
                      <div className="flex items-center gap-2 text-blue-400 text-xs font-bold font-mono uppercase">
                        <Layers className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>{t.similarDiff}</span>
                      </div>
                      <p className="text-xs text-blue-200/80 leading-relaxed">
                        {activeProperty.differenceWithSimilar[language]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
