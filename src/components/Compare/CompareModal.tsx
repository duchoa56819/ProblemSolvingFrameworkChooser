import React from 'react';
import { Framework } from '../../types/framework';
import { FRAMEWORKS } from '../../data/frameworks';
import { FRAMEWORKS_VI } from '../../data/frameworksVi';
import { X, Play } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface CompareModalProps {
  compareIds: string[];
  onRemoveCompare: (id: string) => void;
  onClearCompare: () => void;
  onClose: () => void;
  onOpenCanvas: (type: any) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  compareIds,
  onRemoveCompare,
  onClearCompare,
  onClose,
  onOpenCanvas
}) => {
  const { lang, t } = useLanguage();
  const allFrameworks = lang === 'vi' ? FRAMEWORKS_VI : FRAMEWORKS;
  const frameworks = allFrameworks.filter(fw => compareIds.includes(fw.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {t.compareModal.title}
            </h3>
            <p className="text-xs text-slate-400">
              {t.compareModal.comparingPrefix} {frameworks.length} {frameworks.length === 1 ? t.compareModal.frameworkWord : t.compareModal.frameworksWord}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClearCompare}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {t.compareModal.clearAll}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="p-6 overflow-y-auto max-h-[calc(92vh-120px)]">
          {frameworks.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              {t.compareModal.emptyText}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="py-3 px-3 text-slate-400 font-semibold uppercase tracking-wider w-36">
                      {t.compareModal.dimension}
                    </th>
                    {frameworks.map(fw => (
                      <th key={fw.id} className="py-3 px-4 min-w-[240px]">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-sm text-white">{fw.shortName}</span>
                          <button
                            onClick={() => onRemoveCompare(fw.id)}
                            className="text-slate-500 hover:text-rose-400 p-1"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400 bg-slate-950/40">{t.compareModal.category}</td>
                    {frameworks.map(fw => (
                      <td key={fw.id} className="py-3 px-4 font-mono text-[11px] text-indigo-400">
                        {t.categories[fw.category]}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400 bg-slate-950/40">{t.compareModal.origin}</td>
                    {frameworks.map(fw => (
                      <td key={fw.id} className="py-3 px-4 text-slate-400">
                        {fw.origin}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400 bg-slate-950/40">{t.compareModal.tagline}</td>
                    {frameworks.map(fw => (
                      <td key={fw.id} className="py-3 px-4 italic text-slate-200">
                        "{fw.tagline}"
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400 bg-slate-950/40">{t.compareModal.cynefinDomain}</td>
                    {frameworks.map(fw => (
                      <td key={fw.id} className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-800 font-mono text-slate-300">
                          {fw.cynefinDomain}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400 bg-slate-950/40">{t.compareModal.bestFor}</td>
                    {frameworks.map(fw => (
                      <td key={fw.id} className="py-3 px-4 text-emerald-300 bg-emerald-950/10">
                        {fw.bestFor}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400 bg-slate-950/40">{t.compareModal.whenToAvoid}</td>
                    {frameworks.map(fw => (
                      <td key={fw.id} className="py-3 px-4 text-rose-300 bg-rose-950/10">
                        {fw.whenToAvoid}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400 bg-slate-950/40">{t.compareModal.timeCommitment}</td>
                    {frameworks.map(fw => (
                      <td key={fw.id} className="py-3 px-4 font-semibold text-white">
                        {fw.timeframe}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400 bg-slate-950/40">{t.compareModal.teamStructure}</td>
                    {frameworks.map(fw => (
                      <td key={fw.id} className="py-3 px-4">
                        {fw.teamSize}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400 bg-slate-950/40">{t.compareModal.complexity}</td>
                    {frameworks.map(fw => (
                      <td key={fw.id} className="py-3 px-4">
                        {fw.complexity}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-400 bg-slate-950/40">{t.compareModal.interactiveCanvas}</td>
                    {frameworks.map(fw => (
                      <td key={fw.id} className="py-3 px-4">
                        {fw.interactiveCanvasType ? (
                          <button
                            onClick={() => {
                              if (fw.interactiveCanvasType) {
                                onOpenCanvas(fw.interactiveCanvasType);
                                onClose();
                              }
                            }}
                            className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium flex items-center gap-1"
                          >
                            <Play className="w-3 h-3 fill-current" /> {t.compareModal.openCanvas}
                          </button>
                        ) : (
                          <span className="text-slate-600">{t.compareModal.none}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
