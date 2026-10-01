import React from 'react';
import { Sparkles, ArrowRight, Play, Layers } from 'lucide-react';
import { FrameworkCategory } from '../types/framework';
import { CATEGORY_METADATA } from '../data/frameworks';

interface HeroProps {
  onOpenWizard: () => void;
  onOpenCanvas: (type: any) => void;
  onSelectCategory: (cat: FrameworkCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenWizard,
  onOpenCanvas,
  onSelectCategory
}) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-12 border-b border-slate-800/80">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        {/* Sub-pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-700/50 text-indigo-300 text-xs font-semibold shadow-sm animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Interactive Diagnostic Engine • 24 Methodologies Supported</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Never Use the Wrong <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">Problem-Solving</span> Tool Again.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Diagnose your operational, strategic, or engineering roadblock in 60 seconds. Get an irrefutable methodology match with ready-to-run interactive canvases.
        </p>

        {/* Primary Call-to-actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenWizard}
            className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 group"
          >
            <Sparkles className="w-4 h-4" /> Run 60s Framework Finder
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onOpenCanvas('five-whys')}
            className="px-5 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 rounded-xl text-sm font-semibold flex items-center gap-2 border border-slate-700/80 transition-colors"
          >
            <Play className="w-4 h-4 text-rose-400 fill-current" /> Quick 5 Whys Canvas
          </button>

          <button
            onClick={() => onOpenCanvas('rice-calc')}
            className="px-5 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 rounded-xl text-sm font-semibold flex items-center gap-2 border border-slate-700/80 transition-colors"
          >
            <Layers className="w-4 h-4 text-cyan-400" /> RICE Calculator
          </button>
        </div>

        {/* 5 Category Quick Jump Pill Bar */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-slate-500 font-medium mr-1">Quick Pillars:</span>
          {(Object.keys(CATEGORY_METADATA) as FrameworkCategory[]).map(catKey => {
            const meta = CATEGORY_METADATA[catKey];
            return (
              <button
                key={catKey}
                onClick={() => onSelectCategory(catKey)}
                className={`text-xs px-3 py-1.5 rounded-lg border bg-slate-900/60 hover:bg-slate-800 transition-colors text-slate-300 hover:text-white border-slate-800`}
              >
                {meta.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
