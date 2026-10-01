import React, { useState } from 'react';
import { Framework, FrameworkCategory } from '../../types/framework';
import { FRAMEWORKS, CATEGORY_METADATA } from '../../data/frameworks';
import { Sparkles, Eye, Play } from 'lucide-react';

interface MatrixViewProps {
  onSelectFramework: (fw: Framework) => void;
  onOpenCanvas: (type: any) => void;
}

export const MatrixView: React.FC<MatrixViewProps> = ({
  onSelectFramework,
  onOpenCanvas
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FrameworkCategory | 'all'>('all');
  const [hoveredFw, setHoveredFw] = useState<Framework | null>(null);

  const filteredFrameworks = selectedCategory === 'all'
    ? FRAMEWORKS
    : FRAMEWORKS.filter(fw => fw.category === selectedCategory);

  const getCategoryColor = (cat: FrameworkCategory) => {
    switch (cat) {
      case 'root-cause': return 'bg-rose-500 border-rose-300 text-rose-100 shadow-rose-500/30';
      case 'strategic': return 'bg-indigo-500 border-indigo-300 text-indigo-100 shadow-indigo-500/30';
      case 'innovation': return 'bg-emerald-500 border-emerald-300 text-emerald-100 shadow-emerald-500/30';
      case 'quality': return 'bg-amber-500 border-amber-300 text-amber-100 shadow-amber-500/30';
      case 'prioritization': return 'bg-cyan-500 border-cyan-300 text-cyan-100 shadow-cyan-500/30';
      default: return 'bg-slate-500 border-slate-300 text-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter pills */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 font-mono text-sm">
              2D
            </span>
            Problem Space Landscape Map
          </h2>
          <p className="text-xs text-slate-400">
            Explore frameworks positioned across Analytical Rigor vs. Creative Divergence and Problem Complexity.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({FRAMEWORKS.length})
          </button>
          {(Object.keys(CATEGORY_METADATA) as FrameworkCategory[]).map(catKey => {
            const meta = CATEGORY_METADATA[catKey];
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {meta.name.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* The 2D Interactive Plot Surface */}
      <div className="relative w-full h-[540px] bg-slate-950 rounded-2xl border border-slate-800 p-6 overflow-hidden select-none shadow-2xl">
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Quadrant Axis Dividers */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-800/80 dashed pointer-events-none" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-800/80 dashed pointer-events-none" />

        {/* Axis Labels */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold">
          ▲ High Complexity & Emergence (Turbulent / Human)
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold">
          ▼ Clear Deterministic (Known / Repeatable)
        </div>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold">
          ◄ Pure Analytical & Deductive
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 origin-right text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold">
          Pure Creative & Generative ►
        </div>

        {/* Quadrant Watermarks */}
        <div className="absolute top-8 left-8 text-xs font-bold text-slate-800 uppercase tracking-wider pointer-events-none">
          Strategic Decomposition
        </div>
        <div className="absolute top-8 right-8 text-xs font-bold text-slate-800 uppercase tracking-wider pointer-events-none text-right">
          Emergent Innovation
        </div>
        <div className="absolute bottom-8 left-8 text-xs font-bold text-slate-800 uppercase tracking-wider pointer-events-none">
          Root Cause & Variance Reduction
        </div>
        <div className="absolute bottom-8 right-8 text-xs font-bold text-slate-800 uppercase tracking-wider pointer-events-none text-right">
          Prioritization & Fast Ideation
        </div>

        {/* Framework Nodes Plotted */}
        {filteredFrameworks.map((fw) => {
          // X = analyticalVsCreative (0-100) -> 8% to 92%
          // Y = complexityScore (0-100) -> inverted: 100 is top (8%), 0 is bottom (92%)
          const posX = 8 + (fw.plotCoordinates.analyticalVsCreative / 100) * 84;
          const posY = 92 - (fw.plotCoordinates.complexityScore / 100) * 84;
          const isHovered = hoveredFw?.id === fw.id;

          return (
            <div
              key={fw.id}
              style={{ left: `${posX}%`, top: `${posY}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-200"
              onMouseEnter={() => setHoveredFw(fw)}
              onMouseLeave={() => setHoveredFw(null)}
              onClick={() => onSelectFramework(fw)}
            >
              <button
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shadow-md border cursor-pointer transition-all ${
                  getCategoryColor(fw.category)
                } ${isHovered ? 'scale-125 z-30 ring-2 ring-white shadow-xl' : 'hover:scale-110'}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                <span className="truncate max-w-[120px]">{fw.shortName}</span>
              </button>
            </div>
          );
        })}

        {/* Active Node Detail Card Preview */}
        {hoveredFw && (
          <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 z-40 bg-slate-900/95 backdrop-blur-md p-4 rounded-xl border border-indigo-500/40 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                {hoveredFw.category}
              </span>
              <span className="text-[10px] text-slate-400">
                {hoveredFw.timeframe}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mb-1">{hoveredFw.name}</h4>
            <p className="text-xs text-slate-300 line-clamp-2 mb-3">{hoveredFw.tagline}</p>

            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectFramework(hoveredFw);
                }}
                className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" /> View Playbook
              </button>
              {hoveredFw.interactiveCanvasType && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (hoveredFw.interactiveCanvasType) {
                      onOpenCanvas(hoveredFw.interactiveCanvasType);
                    }
                  }}
                  className="py-1.5 px-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                  title="Launch Interactive Canvas"
                >
                  <Play className="w-3 h-3 fill-current" /> Canvas
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
