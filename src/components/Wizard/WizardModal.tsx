import React, { useState } from 'react';
import { 
  X, ArrowRight, ArrowLeft, RotateCcw, CheckCircle2, 
  Sparkles, AlertTriangle, Compass, Users, Cpu, Activity, 
  Layers, GitBranch, Network, Flame, BarChart3, MessageSquare, 
  HelpCircle, Zap, Clock, Calendar, Repeat, User, Share2, 
  Award, CheckCircle, ListOrdered, TrendingUp, FileText, 
  Download, Copy, Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WIZARD_QUESTIONS } from '../../data/wizardQuestions';
import { calculateRecommendation } from '../../utils/scoring';
import { WizardResult, CanvasType, Framework } from '../../types/framework';
import { generateMarkdownReport, copyToClipboard, downloadFile } from '../../utils/export';

interface WizardModalProps {
  onClose: () => void;
  onOpenCanvas: (type: CanvasType) => void;
  onSelectFramework: (fw: Framework) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  AlertTriangle: <AlertTriangle className="w-5 h-5 text-rose-400" />,
  Compass: <Compass className="w-5 h-5 text-indigo-400" />,
  Users: <Users className="w-5 h-5 text-emerald-400" />,
  Cpu: <Cpu className="w-5 h-5 text-cyan-400" />,
  Activity: <Activity className="w-5 h-5 text-amber-400" />,
  Layers: <Layers className="w-5 h-5 text-purple-400" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
  GitBranch: <GitBranch className="w-5 h-5 text-blue-400" />,
  Network: <Network className="w-5 h-5 text-teal-400" />,
  Flame: <Flame className="w-5 h-5 text-orange-400" />,
  BarChart3: <BarChart3 className="w-5 h-5 text-cyan-400" />,
  MessageSquare: <MessageSquare className="w-5 h-5 text-pink-400" />,
  HelpCircle: <HelpCircle className="w-5 h-5 text-slate-400" />,
  Zap: <Zap className="w-5 h-5 text-amber-400" />,
  Clock: <Clock className="w-5 h-5 text-indigo-400" />,
  Calendar: <Calendar className="w-5 h-5 text-violet-400" />,
  Repeat: <Repeat className="w-5 h-5 text-emerald-400" />,
  User: <User className="w-5 h-5 text-blue-400" />,
  Share2: <Share2 className="w-5 h-5 text-purple-400" />,
  Award: <Award className="w-5 h-5 text-amber-400" />,
  CheckCircle: <CheckCircle className="w-5 h-5 text-emerald-400" />,
  Sparkles: <Sparkles className="w-5 h-5 text-pink-400" />,
  ListOrdered: <ListOrdered className="w-5 h-5 text-cyan-400" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-indigo-400" />,
  FileText: <FileText className="w-5 h-5 text-amber-400" />
};

export const WizardModal: React.FC<WizardModalProps> = ({
  onClose,
  onOpenCanvas,
  onSelectFramework
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<WizardResult | null>(null);
  const [copied, setCopied] = useState(false);

  const totalSteps = WIZARD_QUESTIONS.length;
  const activeQuestion = WIZARD_QUESTIONS[currentStep];

  const handleSelectOption = (optionId: string) => {
    const updatedAnswers = {
      ...answers,
      [activeQuestion.id]: optionId
    };
    setAnswers(updatedAnswers);

    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Completed all steps!
      const finalResult = calculateRecommendation(updatedAnswers);
      setResult(finalResult);
      // Trigger confetti celebration!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setResult(null);
  };

  const handleCopyReport = async () => {
    if (!result) return;
    const text = generateMarkdownReport(result);
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadReport = () => {
    if (!result) return;
    const text = generateMarkdownReport(result);
    downloadFile(`framework-diagnostic-report-${result.topFramework.id}.md`, text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Smart Framework Finder</h3>
              <p className="text-xs text-slate-400">
                {result ? 'Diagnostic complete & matched!' : `Diagnostic Step ${currentStep + 1} of ${totalSteps}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!result && (
              <button
                onClick={handleRestart}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 text-xs flex items-center gap-1 transition-colors"
                title="Restart diagnostic"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {!result && (
          <div className="w-full bg-slate-800 h-1">
            <div 
              className="bg-indigo-500 h-1 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        )}

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(92vh-130px)]">
          {!result ? (
            /* QUESTION VIEW */
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
                  Diagnostic Parameter #{activeQuestion.stepNumber}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {activeQuestion.title}
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  {activeQuestion.subtitle}
                </p>
              </div>

              {/* Options list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {activeQuestion.options.map((opt) => {
                  const isSelected = answers[activeQuestion.id] === opt.id;
                  const icon = ICON_MAP[opt.iconName] || <Sparkles className="w-5 h-5 text-indigo-400" />;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 group ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-950/30 ring-1 ring-indigo-500'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 group-hover:border-slate-700 transition-colors shrink-0">
                        {icon}
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                          {opt.label}
                        </div>
                        <div className="text-xs text-slate-400 leading-relaxed">
                          {opt.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Back */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-lg transition-colors ${
                    currentStep === 0
                      ? 'text-slate-600 cursor-not-allowed'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" /> Previous Step
                </button>

                <span className="text-xs text-slate-500 font-mono">
                  {currentStep + 1} / {totalSteps}
                </span>
              </div>
            </div>
          ) : (
            /* RESULTS VIEW */
            <div className="space-y-6">
              {/* Header result banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 p-5 rounded-2xl border border-indigo-500/30">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                      Optimal Match Identified
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white">
                    {result.topFramework.name}
                  </h2>
                  <p className="text-xs text-slate-400">{result.topFramework.origin}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-2xl font-black font-mono text-indigo-400">
                      {result.topScore}%
                    </div>
                    <div className="text-[10px] uppercase font-semibold text-slate-400">
                      Affinity Match
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={handleCopyReport}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 border border-slate-700 transition-colors"
                    >
                      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied!' : 'Copy Summary'}
                    </button>
                    <button
                      onClick={handleDownloadReport}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" /> Export Report
                    </button>
                  </div>
                </div>
              </div>

              {/* Rationale & Quick Action */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 rounded-xl bg-slate-900/70 border border-slate-800 p-4 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Why This Fits Your Challenge
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {result.matchReason}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <div>
                      <strong className="text-slate-300">Domain:</strong> {result.topFramework.cynefinDomain}
                    </div>
                    <div>
                      <strong className="text-slate-300">Timeframe:</strong> {result.topFramework.timeframe}
                    </div>
                    <div>
                      <strong className="text-slate-300">Team:</strong> {result.topFramework.teamSize}
                    </div>
                  </div>
                </div>

                {/* Primary Action Button Card */}
                <div className="rounded-xl bg-gradient-to-br from-indigo-900/30 to-slate-900 border border-indigo-500/20 p-4 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Ready to Execute?
                    </span>
                    <p className="text-xs text-slate-300">
                      Open the interactive workspace to run this framework immediately.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {result.topFramework.interactiveCanvasType && (
                      <button
                        onClick={() => {
                          if (result.topFramework.interactiveCanvasType) {
                            onOpenCanvas(result.topFramework.interactiveCanvasType);
                            onClose();
                          }
                        }}
                        className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" /> Launch Interactive Canvas
                      </button>
                    )}
                    <button
                      onClick={() => {
                        onSelectFramework(result.topFramework);
                        onClose();
                      }}
                      className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                    >
                      View Complete Playbook
                    </button>
                  </div>
                </div>
              </div>

              {/* Execution Steps Preview */}
              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  Immediate 4-Step Execution Blueprint
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {result.topFramework.steps.map((s) => (
                    <div key={s.number} className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-1">
                      <div className="text-[10px] font-mono font-bold text-indigo-400">STEP {s.number}</div>
                      <div className="text-xs font-semibold text-slate-200 line-clamp-1">{s.title}</div>
                      <p className="text-[11px] text-slate-400 line-clamp-3">{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Runner Ups & Avoid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Runner Ups */}
                <div className="rounded-xl bg-slate-900/40 border border-slate-800 p-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400" /> Viable Runner-Up Alternatives
                  </h4>
                  <div className="space-y-2">
                    {result.runnerUps.map((runner) => (
                      <div
                        key={runner.framework.id}
                        onClick={() => {
                          onSelectFramework(runner.framework);
                          onClose();
                        }}
                        className="cursor-pointer p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between transition-colors group"
                      >
                        <div>
                          <div className="text-xs font-semibold text-white group-hover:text-indigo-400 transition-colors">
                            {runner.framework.name}
                          </div>
                          <p className="text-[11px] text-slate-400">{runner.fitReason}</p>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-400 shrink-0 ml-2">
                          {runner.score}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Frameworks to Avoid */}
                <div className="rounded-xl bg-slate-900/40 border border-slate-800 p-4 space-y-3">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> Frameworks to Avoid in This Context
                  </h4>
                  <div className="space-y-2">
                    {result.avoidFrameworks.map((avoid) => (
                      <div
                        key={avoid.framework.id}
                        className="p-2.5 rounded-lg bg-rose-950/10 border border-rose-900/30 space-y-0.5"
                      >
                        <div className="text-xs font-semibold text-rose-300">
                          {avoid.framework.name}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {avoid.reason}
                        </p>
                      </div>
                    ))}
                    {result.avoidFrameworks.length === 0 && (
                      <div className="text-xs text-slate-500 italic py-2">
                        No severe methodology mismatches flagged.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Restart Button */}
              <div className="pt-2 text-center">
                <button
                  onClick={handleRestart}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mx-auto transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Take diagnostic again with different parameters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
