import React from 'react';
import { Framework } from '../../types/framework';
import { CATEGORY_METADATA } from '../../data/frameworks';
import { Clock, Users, Bookmark, Play, Check } from 'lucide-react';

interface FrameworkCardProps {
  framework: Framework;
  isBookmarked: boolean;
  isCompared: boolean;
  onToggleBookmark: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelect: (fw: Framework) => void;
  onOpenCanvas: (type: any) => void;
}

export const FrameworkCard: React.FC<FrameworkCardProps> = ({
  framework,
  isBookmarked,
  isCompared,
  onToggleBookmark,
  onToggleCompare,
  onSelect,
  onOpenCanvas
}) => {
  const catMeta = CATEGORY_METADATA[framework.category];

  return (
    <div 
      onClick={() => onSelect(framework)}
      className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 hover:border-slate-700 p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer hover:shadow-xl hover:-translate-y-0.5"
    >
      <div>
        {/* Top Badges & Actions */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${catMeta.badgeColor}`}>
            {catMeta.name.split(' ')[0]}
          </span>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {/* Compare checkbox */}
            <button
              onClick={() => onToggleCompare(framework.id)}
              className={`p-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1 ${
                isCompared
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
              }`}
              title={isCompared ? 'Remove from compare' : 'Compare side-by-side'}
            >
              {isCompared ? <Check className="w-3.5 h-3.5" /> : <span className="text-[11px] px-0.5 font-bold">VS</span>}
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(framework.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                isBookmarked
                  ? 'text-amber-400 bg-amber-950/40'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark framework'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Framework Title & Origin */}
        <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
          {framework.name}
        </h3>
        <p className="text-[11px] text-slate-400 mb-2.5">{framework.origin}</p>

        {/* Tagline */}
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
          {framework.tagline}
        </p>
      </div>

      {/* Footer metadata & buttons */}
      <div>
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{framework.timeframe}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>{framework.teamSize.split(' ')[0]}</span>
          </div>
          <span className="font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-950 text-[10px]">
            {framework.cynefinDomain}
          </span>
        </div>

        {/* Canvas Trigger if available */}
        {framework.interactiveCanvasType && (
          <div className="mt-3 pt-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => {
                if (framework.interactiveCanvasType) {
                  onOpenCanvas(framework.interactiveCanvasType);
                }
              }}
              className="w-full py-1.5 px-2 bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/30 hover:border-indigo-500 text-indigo-300 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <Play className="w-3 h-3 fill-current" /> Interactive Canvas
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
