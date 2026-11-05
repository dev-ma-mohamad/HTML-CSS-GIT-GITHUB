import React, { useState } from 'react';
import {
  Palette,
  Sliders,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Layout,
  Maximize2,
  Box,
  Eye,
  Zap
} from 'lucide-react';
import { Language } from '../data/translations';

interface CssVisualPlaygroundProps {
  language: Language;
  onNavigateHome: () => void;
  onNavigateProperties: () => void;
}

interface Preset {
  id: string;
  name: Record<Language, string>;
  styles: {
    bgColor: string;
    textColor: string;
    fontSize: number;
    padding: number;
    borderRadius: number;
    borderWidth: number;
    borderColor: string;
    shadowBlur: number;
    shadowSpread: number;
    shadowColor: string;
    gap: number;
    flexDirection: 'row' | 'column';
    justifyContent: 'flex-start' | 'center' | 'space-between' | 'space-around';
    alignItems: 'stretch' | 'center' | 'flex-start' | 'flex-end';
    animation: 'none' | 'pulse' | 'bounce' | 'spin' | 'float';
  };
}

export const CssVisualPlayground: React.FC<CssVisualPlaygroundProps> = ({
  language,
  onNavigateHome,
  onNavigateProperties,
}) => {
  const [copied, setCopied] = useState(false);

  // Playground state
  const [bgColor, setBgColor] = useState('#0f172a');
  const [textColor, setTextColor] = useState('#38bdf8');
  const [fontSize, setFontSize] = useState(16);
  const [padding, setPadding] = useState(24);
  const [borderRadius, setBorderRadius] = useState(16);
  const [borderWidth, setBorderWidth] = useState(1);
  const [borderColor, setBorderColor] = useState('#00f0ff');
  const [shadowBlur, setShadowBlur] = useState(25);
  const [shadowSpread, setShadowSpread] = useState(0);
  const [shadowColor, setShadowColor] = useState('rgba(0, 240, 255, 0.3)');
  const [gap, setGap] = useState(12);
  const [flexDirection, setFlexDirection] = useState<'row' | 'column'>('column');
  const [justifyContent, setJustifyContent] = useState<'flex-start' | 'center' | 'space-between' | 'space-around'>('center');
  const [alignItems, setAlignItems] = useState<'stretch' | 'center' | 'flex-start' | 'flex-end'>('center');
  const [animation, setAnimation] = useState<'none' | 'pulse' | 'bounce' | 'spin' | 'float'>('none');

  const presets: Preset[] = [
    {
      id: 'cyber-neon',
      name: { en: 'Cyber Neon Card', fr: 'Carte Cyber Néon', ar: 'بطاقة سايبر نيون' },
      styles: {
        bgColor: '#090d16',
        textColor: '#00f0ff',
        fontSize: 18,
        padding: 28,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#00f0ff',
        shadowBlur: 30,
        shadowSpread: 2,
        shadowColor: 'rgba(0, 240, 255, 0.4)',
        gap: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        animation: 'none',
      },
    },
    {
      id: 'synthwave-glow',
      name: { en: 'Synthwave Magenta', fr: 'Synthwave Magenta', ar: 'سينثويف ماجنتا وردي' },
      styles: {
        bgColor: '#17061f',
        textColor: '#f43f5e',
        fontSize: 16,
        padding: 24,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: '#f43f5e',
        shadowBlur: 35,
        shadowSpread: 1,
        shadowColor: 'rgba(244, 63, 94, 0.35)',
        gap: 12,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        animation: 'pulse',
      },
    },
    {
      id: 'emerald-matrix',
      name: { en: 'Emerald Matrix', fr: 'Matrice Émeraude', ar: 'ماتريكس الزمرد الأخضر' },
      styles: {
        bgColor: '#021811',
        textColor: '#10b981',
        fontSize: 16,
        padding: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#10b981',
        shadowBlur: 20,
        shadowSpread: 0,
        shadowColor: 'rgba(16, 185, 129, 0.3)',
        gap: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        animation: 'none',
      },
    },
    {
      id: 'glass-frost',
      name: { en: 'Glassmorphism Frost', fr: 'Givré Glassmorphism', ar: 'زجاجي مثلج شفاف' },
      styles: {
        bgColor: 'rgba(255, 255, 255, 0.05)',
        textColor: '#ffffff',
        fontSize: 16,
        padding: 28,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        shadowBlur: 40,
        shadowSpread: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        gap: 14,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        animation: 'none',
      },
    },
  ];

  const applyPreset = (preset: Preset) => {
    setBgColor(preset.styles.bgColor);
    setTextColor(preset.styles.textColor);
    setFontSize(preset.styles.fontSize);
    setPadding(preset.styles.padding);
    setBorderRadius(preset.styles.borderRadius);
    setBorderWidth(preset.styles.borderWidth);
    setBorderColor(preset.styles.borderColor);
    setShadowBlur(preset.styles.shadowBlur);
    setShadowSpread(preset.styles.shadowSpread);
    setShadowColor(preset.styles.shadowColor);
    setGap(preset.styles.gap);
    setFlexDirection(preset.styles.flexDirection);
    setJustifyContent(preset.styles.justifyContent);
    setAlignItems(preset.styles.alignItems);
    setAnimation(preset.styles.animation);
  };

  const resetToDefault = () => {
    applyPreset(presets[0]);
  };

  const generatedCss = `.cyber-card {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  gap: ${gap}px;
  background-color: ${bgColor};
  color: ${textColor};
  font-size: ${fontSize}px;
  padding: ${padding}px;
  border-radius: ${borderRadius}px;
  border: ${borderWidth}px solid ${borderColor};
  box-shadow: 0 0 ${shadowBlur}px ${shadowSpread}px ${shadowColor};
  ${animation !== 'none' ? `animation: ${animation} 2s infinite ease-in-out;` : ''}
}`;

  const copyCss = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getAnimationClass = () => {
    if (animation === 'pulse') return 'animate-pulse';
    if (animation === 'bounce') return 'animate-bounce';
    if (animation === 'spin') return 'animate-spin';
    return '';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="text-xs uppercase font-mono tracking-wider text-slate-400 hover:text-cyan-400 transition-colors"
            >
              ← {language === 'ar' ? 'الرئيسية' : language === 'fr' ? 'Accueil' : 'Home'}
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-xs uppercase font-mono tracking-wider text-purple-400 font-semibold">
              CSS Visual Playground
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetToDefault}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'إعادة تعيين' : language === 'fr' ? 'Réinitialiser' : 'Reset'}</span>
            </button>

            <button
              onClick={onNavigateProperties}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/40 text-xs font-mono text-purple-300 hover:bg-purple-500/20 transition-colors"
            >
              <span>{language === 'ar' ? 'دليل الخصائص A-J' : language === 'fr' ? 'Guide A-J' : 'Properties A-J'}</span>
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-400 text-xs font-mono uppercase tracking-widest shadow-[0_0_12px_rgba(168,85,247,0.2)]">
            <Sliders className="w-4 h-4 text-purple-400" />
            <span>Real-time CSS Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            {language === 'ar'
              ? 'مختبر CSS المرئي التفاعلي'
              : language === 'fr'
              ? 'Laboratoire Visuel CSS Interactif'
              : 'Interactive Visual CSS Playground'}
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {language === 'ar'
              ? 'حرك أشرطة التحكم لتعديل الألوان، التباعد، الحواف، الظلال النيونية، وخاصية Flexbox في الوقت الفعلي مع نسخ كود CSS الجاهز فوراً!'
              : language === 'fr'
              ? 'Ajustez les curseurs pour modifier les couleurs, espacements, arrondis, néons et flexbox en direct, puis copiez le CSS prêt à l\'emploi.'
              : 'Adjust interactive sliders for padding, border-radius, glowing shadows, typography, and flexbox in real-time, then copy pristine generated CSS.'}
          </p>
        </div>

        {/* Preset Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-xs font-mono text-slate-400 uppercase mr-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            {language === 'ar' ? 'القوالب الجاهزة:' : language === 'fr' ? 'Préréglages :' : 'Presets:'}
          </span>
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-850 text-xs font-medium text-slate-300 transition-colors whitespace-nowrap"
            >
              {preset.name[language]}
            </button>
          ))}
        </div>

        {/* Playground Grid: Controls (5 cols) + Visual Preview & CSS Output (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sliders & Controls */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-900/90 border border-slate-800 p-6 space-y-6 shadow-xl backdrop-blur-md">
            <h3 className="font-bold text-slate-100 text-sm font-mono uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>{language === 'ar' ? 'لوحة التحكم بالخصائص' : language === 'fr' ? 'Contrôles CSS' : 'CSS Controls'}</span>
            </h3>

            {/* Colors */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-cyan-400" />
                {language === 'ar' ? 'الألوان' : language === 'fr' ? 'Couleurs' : 'Colors'}
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-slate-400">Background</label>
                  <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <input
                      type="color"
                      value={bgColor.startsWith('#') ? bgColor : '#0f172a'}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="bg-transparent text-xs font-mono text-slate-200 outline-none w-full"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-slate-400">Text Color</label>
                  <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <input
                      type="color"
                      value={textColor.startsWith('#') ? textColor : '#38bdf8'}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="bg-transparent text-xs font-mono text-slate-200 outline-none w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sizing & Spacing */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-pink-400" />
                {language === 'ar' ? 'الأبعاد والتباعد' : language === 'fr' ? 'Dimensions & Espacement' : 'Dimensions & Spacing'}
              </span>

              {/* Font Size */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Font Size</span>
                  <span className="text-cyan-400 font-bold">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="36"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              {/* Padding */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Padding</span>
                  <span className="text-pink-400 font-bold">{padding}px</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="60"
                  value={padding}
                  onChange={(e) => setPadding(Number(e.target.value))}
                  className="w-full accent-pink-400"
                />
              </div>

              {/* Border Radius */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Border Radius</span>
                  <span className="text-purple-400 font-bold">{borderRadius}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(Number(e.target.value))}
                  className="w-full accent-purple-400"
                />
              </div>

              {/* Border Width & Color */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Border Width</span>
                    <span className="text-cyan-400">{borderWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={borderWidth}
                    onChange={(e) => setBorderWidth(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 block">Border Color</span>
                  <input
                    type="color"
                    value={borderColor.startsWith('#') ? borderColor : '#00f0ff'}
                    onChange={(e) => setBorderColor(e.target.value)}
                    className="w-full h-8 rounded-lg cursor-pointer bg-slate-950 border border-slate-800 p-1"
                  />
                </div>
              </div>
            </div>

            {/* Neon Box Shadow */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                {language === 'ar' ? 'التوهج والظل (Glow Shadow)' : language === 'fr' ? 'Lueur & Ombre' : 'Glow & Shadow'}
              </span>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Shadow Blur</span>
                  <span className="text-amber-400 font-bold">{shadowBlur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={shadowBlur}
                  onChange={(e) => setShadowBlur(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>
            </div>

            {/* Flexbox Layout */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layout className="w-3.5 h-3.5 text-blue-400" />
                {language === 'ar' ? 'تخطيط الفليكس بوكس (Flexbox)' : language === 'fr' ? 'Mise en page Flexbox' : 'Flexbox Controls'}
              </span>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 block">Direction</span>
                  <select
                    value={flexDirection}
                    onChange={(e) => setFlexDirection(e.target.value as 'row' | 'column')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-200 outline-none text-xs"
                  >
                    <option value="column">column</option>
                    <option value="row">row</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 block">Justify Content</span>
                  <select
                    value={justifyContent}
                    onChange={(e) =>
                      setJustifyContent(
                        e.target.value as 'flex-start' | 'center' | 'space-between' | 'space-around'
                      )
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-200 outline-none text-xs"
                  >
                    <option value="center">center</option>
                    <option value="flex-start">flex-start</option>
                    <option value="space-between">space-between</option>
                    <option value="space-around">space-around</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Animation */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                {language === 'ar' ? 'الحركة والتأثيرات' : language === 'fr' ? 'Animations' : 'Animation'}
              </span>

              <div className="flex gap-2">
                {(['none', 'pulse', 'bounce'] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => setAnimation(a)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                      animation === a
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Visual Canvas + Generated CSS Code */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Visual Canvas */}
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 shadow-2xl backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  {language === 'ar' ? 'المعاينة المرئية المباشرة' : language === 'fr' ? 'Aperçu Visuel Direct' : 'Live Visual Preview'}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  100% Client-side CSS
                </span>
              </div>

              {/* Viewport Render Area with Grid Backdrop */}
              <div className="min-h-[340px] rounded-2xl bg-slate-950 border border-slate-800/80 p-8 flex items-center justify-center relative overflow-hidden">
                {/* Background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:28px_28px] opacity-25" />

                {/* Target Element */}
                <div
                  style={{
                    backgroundColor: bgColor,
                    color: textColor,
                    fontSize: `${fontSize}px`,
                    padding: `${padding}px`,
                    borderRadius: `${borderRadius}px`,
                    border: `${borderWidth}px solid ${borderColor}`,
                    boxShadow: `0 0 ${shadowBlur}px ${shadowSpread}px ${shadowColor}`,
                    display: 'flex',
                    flexDirection: flexDirection,
                    justifyContent: justifyContent,
                    alignItems: alignItems,
                    gap: `${gap}px`,
                    transition: 'all 0.25s ease',
                  }}
                  className={`max-w-md w-full relative z-10 ${getAnimationClass()}`}
                >
                  <div className="font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 shrink-0" />
                    <span>Cyber Dev Academy</span>
                  </div>
                  <p className="opacity-90 leading-relaxed text-xs sm:text-sm">
                    {language === 'ar'
                      ? 'عنصر تجريبي يتأثر بكل حركة في لوحة التحكم في اللحظة ذاتها.'
                      : language === 'fr'
                      ? 'Élément test réagissant instantanément à chaque réglage.'
                      : 'Interactive target adapting to every CSS parameter tweak.'}
                  </p>
                  <button
                    style={{
                      borderColor: borderColor,
                      color: textColor,
                    }}
                    className="px-4 py-2 rounded-lg border text-xs font-mono font-bold mt-1 bg-black/30 hover:bg-black/50 transition-colors"
                  >
                    Action Button
                  </button>
                </div>
              </div>
            </div>

            {/* Generated CSS Code Block */}
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl backdrop-blur-md space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-slate-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                  Generated CSS Output
                </span>
                <button
                  onClick={copyCss}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">{language === 'ar' ? 'تم النسخ!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'نسخ كود CSS' : 'Copy CSS'}</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-cyan-300 overflow-x-auto leading-relaxed">
                <code>{generatedCss}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
