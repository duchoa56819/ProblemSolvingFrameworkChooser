import React, { useState } from 'react';
import { Framework } from '../../types/framework';
import { CATEGORY_METADATA } from '../../data/frameworks';
import { 
  X, Copy, Download, CheckCircle2, Play, 
  Check, AlertTriangle, Lightbulb, HelpCircle, Briefcase, Sparkles
} from 'lucide-react';
import { generateFrameworkMarkdown, copyToClipboard, downloadFile } from '../../utils/export';
import { useLanguage } from '../../i18n/LanguageContext';

interface FrameworkModalProps {
  framework: Framework;
  onClose: () => void;
  onOpenCanvas: (type: any) => void;
}

export const FrameworkModal: React.FC<FrameworkModalProps> = ({
  framework,
  onClose,
  onOpenCanvas
}) => {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'steps' | 'questions' | 'case-study'>('overview');
  const [copied, setCopied] = useState(false);
  const catMeta = CATEGORY_METADATA[framework.category];

  const handleCopy = async () => {
    const text = generateFrameworkMarkdown(framework, lang);
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const text = generateFrameworkMarkdown(framework, lang);
    downloadFile(`framework-${framework.id}-${lang}.md`, text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${catMeta.badgeColor}`}>
                {t.categories[framework.category]}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                Cynefin: {framework.cynefinDomain}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {framework.name}
            </h2>
            <p className="text-xs text-slate-400">{framework.origin}</p>
          </div>

          <div className="flex items-center gap-2">
            {framework.interactiveCanvasType && (
              <button
                onClick={() => {
                  if (framework.interactiveCanvasType) {
                    onOpenCanvas(framework.interactiveCanvasType);
                    onClose();
                  }
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> {t.modal.launchCanvas}
              </button>
            )}
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 border border-slate-700 transition-colors"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? t.modal.copied : t.modal.copy}
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Download Markdown"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab navigation bar */}
        <div className="flex border-b border-slate-800 bg-slate-900/90 px-5 gap-1 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {t.modal.overviewTab}
          </button>
          <button
            onClick={() => setActiveTab('steps')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'steps'
                ? 'border-indigo-500 text-indigo-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {t.modal.stepsTab} ({framework.steps.length})
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'questions'
                ? 'border-indigo-500 text-indigo-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {t.modal.questionsTab} ({framework.keyQuestions.length})
          </button>
          <button
            onClick={() => setActiveTab('case-study')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'case-study'
                ? 'border-indigo-500 text-indigo-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {t.modal.caseStudyTab}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(92vh-160px)] space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <blockquote className="border-l-4 border-indigo-500 pl-4 py-1 text-sm italic text-slate-200 bg-indigo-950/20 rounded-r-xl">
                "{framework.tagline}"
              </blockquote>

              <div className="text-sm text-slate-300 leading-relaxed">
                {framework.summary}
              </div>

              {/* Best for vs When to avoid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-1.5">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> {t.modal.bestFor}
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {framework.bestFor}
                  </p>
                </div>

                <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 space-y-1.5">
                  <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> {t.modal.whenToAvoid}
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {framework.whenToAvoid}
                  </p>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">{t.modal.timeframe}</span>
                  <strong className="text-white">{framework.timeframe}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">{t.modal.teamSize}</span>
                  <strong className="text-white">{framework.teamSize}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">{t.modal.complexityLevel}</span>
                  <strong className="text-white">{framework.complexity}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">{t.modal.toolsNeeded}</span>
                  <strong className="text-white truncate block">{framework.toolsNeeded.join(', ')}</strong>
                </div>
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> {t.modal.strengths}
                  </h4>
                  <ul className="space-y-1.5">
                    {framework.pros.map((pro, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/60">
                        <span className="text-emerald-400 font-bold">+</span> {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> {t.modal.tradeoffs}
                  </h4>
                  <ul className="space-y-1.5">
                    {framework.cons.map((con, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/60">
                        <span className="text-amber-400 font-bold">-</span> {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STEPS */}
          {activeTab === 'steps' && (
            <div className="space-y-4">
              {framework.steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 font-mono text-xs font-bold">
                      {step.number}
                    </span>
                    <h4 className="text-sm font-bold text-white">{step.title}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-8">
                    {step.description}
                  </p>
                  <div className="ml-8 mt-2 text-[11px] text-indigo-300 bg-indigo-950/40 border border-indigo-900/40 p-2.5 rounded-lg flex items-start gap-2">
                    <Lightbulb className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span><strong>{t.modal.proTip}:</strong> {step.actionableTip}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: QUESTIONS */}
          {activeTab === 'questions' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                {t.modal.questionsIntro}
              </p>
              {framework.keyQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-200"
                >
                  <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{q}</span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: CASE STUDY */}
          {activeTab === 'case-study' && (
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">
                  {framework.exampleUseCase.title}
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                    {t.modal.caseChallenge}
                  </span>
                  <p className="text-slate-300 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    {framework.exampleUseCase.scenario}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-semibold text-indigo-400 uppercase tracking-wider text-[10px]">
                    {t.modal.caseApplication}
                  </span>
                  <p className="text-slate-200 bg-slate-900/80 p-3 rounded-lg border border-indigo-950">
                    {framework.exampleUseCase.application}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[10px]">
                    {t.modal.caseOutcome}
                  </span>
                  <p className="text-emerald-300 bg-emerald-950/20 p-3 rounded-lg border border-emerald-900/40">
                    {framework.exampleUseCase.outcome}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
