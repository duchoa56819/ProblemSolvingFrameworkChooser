import React from 'react';
import { 
  Sparkles, Search, Bookmark, 
  MapPin, Grid, Layers 
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { useLanguage } from '../i18n/LanguageContext';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeView: 'library' | 'matrix' | 'canvases';
  onViewChange: (view: 'library' | 'matrix' | 'canvases') => void;
  bookmarksCount: number;
  showOnlyBookmarks: boolean;
  onToggleBookmarksOnly: () => void;
  compareCount: number;
  onOpenCompare: () => void;
  onOpenWizard: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  activeView,
  onViewChange,
  bookmarksCount,
  showOnlyBookmarks,
  onToggleBookmarksOnly,
  compareCount,
  onOpenCompare,
  onOpenWizard
}) => {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-md shadow-indigo-500/25">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
              {t.appName.slice(0, 9)}<span className="text-indigo-400">{t.appName.slice(9)}</span>
            </span>
            <span className="text-[10px] text-slate-500 block -mt-1 font-mono">
              {t.appTagline}
            </span>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-9 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
              /
            </kbd>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => onViewChange('library')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeView === 'library'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" /> {t.views.library}
          </button>
          <button
            onClick={() => onViewChange('matrix')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeView === 'matrix'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" /> {t.views.matrix}
          </button>
          <button
            onClick={() => onViewChange('canvases')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeView === 'canvases'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> {t.views.canvases}
          </button>
        </div>

        {/* Actions right */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white transition-all shadow-sm"
            title={lang === 'vi' ? 'Chuyển sang Tiếng Anh (English)' : 'Chuyển sang Tiếng Việt'}
          >
            <span className="text-sm">{lang === 'vi' ? '🇻🇳' : '🇺🇸'}</span>
            <span className="font-mono text-xs">{lang === 'vi' ? 'VI' : 'EN'}</span>
          </button>

          {/* Bookmark filter toggle */}
          <button
            onClick={onToggleBookmarksOnly}
            className={`p-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors border ${
              showOnlyBookmarks
                ? 'bg-amber-950/60 border-amber-600/60 text-amber-300'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Filter bookmarked frameworks"
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarksCount > 0 ? 'text-amber-400 fill-current' : ''}`} />
            <span className="font-mono text-xs">{bookmarksCount}</span>
          </button>

          {/* Compare button */}
          {compareCount > 0 && (
            <button
              onClick={onOpenCompare}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 hover:bg-indigo-900 transition-colors flex items-center gap-1"
            >
              <span>VS</span>
              <span className="px-1.5 py-0.2 rounded-full bg-indigo-600 text-white text-[10px] font-mono">
                {compareCount}
              </span>
            </button>
          )}

          {/* GitHub Repo */}
          <a
            href="https://github.com/duchoa56819/ProblemSolvingFrameworkChooser"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="GitHub Repository"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Wizard Finder CTA */}
          <button
            onClick={onOpenWizard}
            className="px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/25 transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === 'vi' ? 'Bộ Chẩn Đoán' : 'Diagnostic Finder'}</span>
            <span className="sm:hidden">{lang === 'vi' ? 'Chẩn đoán' : 'Finder'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
