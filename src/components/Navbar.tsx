import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Navbar() {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="bg-slate-900 text-white border-b-2 border-blue-600 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-3">
        {/* Title & Badge */}
        <div className="flex flex-col items-start gap-1">
          <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono text-[11px] font-bold tracking-wider">
            {t.header.badge}
          </span>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            {t.header.title}
          </h1>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-lg border border-slate-700 shadow-inner flex-shrink-0">
          <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 hidden sm:inline" />
          <div className="flex items-center bg-slate-900/90 rounded-md p-0.5 text-xs font-semibold">
            <button
              id="lang-btn-ko"
              onClick={() => setLang('ko')}
              className={`px-2.5 py-1 rounded transition-all cursor-pointer font-mono ${
                lang === 'ko'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="한국어로 변경 (KOR)"
            >
              KOR
            </button>
            <button
              id="lang-btn-en"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded transition-all cursor-pointer font-mono ${
                lang === 'en'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Switch to English (ENG)"
            >
              ENG
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
