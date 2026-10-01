import React, { useState } from 'react';
import { ArrowDown, CheckCircle2, Copy, Download, RefreshCw, Sparkles } from 'lucide-react';
import { copyToClipboard, downloadFile } from '../../utils/export';

interface FiveWhysCanvasProps {
  initialProblem?: string;
}

export const FiveWhysCanvas: React.FC<FiveWhysCanvasProps> = ({ initialProblem = '' }) => {
  const [problem, setProblem] = useState(initialProblem || 'Customer checkout API returned HTTP 500 errors during traffic peak');
  const [whys, setWhys] = useState<string[]>([
    'Database connection pool was completely saturated and rejected new connections.',
    'A newly deployed reporting query locked the users table without pagination.',
    'The query was written directly against the live production replica instead of the read-only analytics warehouse.',
    'The junior engineer on call lacked access to the read replica cluster and rushed a hotfix.',
    'Onboarding checklist does not include read-replica role setup or automated query lock linting.'
  ]);
  const [countermeasure, setCountermeasure] = useState('Implement automated CI query lock linters and provision all engineering roles with dedicated analytics warehouse access by default.');
  const [dri, setDri] = useState('DevOps Lead & Tech Director');
  const [copied, setCopied] = useState(false);

  const handleWhyChange = (index: number, value: string) => {
    const updated = [...whys];
    updated[index] = value;
    setWhys(updated);
  };

  const handleReset = () => {
    setProblem('');
    setWhys(['', '', '', '', '']);
    setCountermeasure('');
    setDri('');
  };

  const exportReport = () => {
    return `# 5 Whys Root Cause Analysis Report

## Problem Statement:
${problem}

## Causal Chain:
${whys.map((w, idx) => `1. **Why #${idx + 1}?** ${w}`).join('\n')}

## 🎯 Verified Root Cause:
${whys[whys.length - 1] || 'Pending'}

## 🛡️ Preventative Countermeasure (Poka-Yoke):
${countermeasure}

**DRI / Owner:** ${dri || 'Unassigned'}
**Audit Date:** ${new Date().toISOString().split('T')[0]}
`;
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(exportReport());
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    downloadFile(`5-whys-analysis-${Date.now()}.md`, exportReport());
  };

  return (
    <div className="space-y-6 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400 font-mono text-sm">
              5W
            </span>
            5 Whys Interactive Drill-Down Canvas
          </h3>
          <p className="text-sm text-slate-400">Drill past surface symptoms to locate systemic and procedural root causes.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy Markdown'}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Export .md
          </button>
        </div>
      </div>

      {/* Problem Statement Box */}
      <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Initial Problem Statement (Observable Symptom)
        </label>
        <textarea
          rows={2}
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Describe the defect, incident, or unexpected failure in verifiable terms..."
          className="w-full bg-slate-900/80 border border-slate-700/80 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
        />
      </div>

      {/* 5 Whys Chain */}
      <div className="space-y-3">
        {whys.map((why, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex flex-col items-center pt-0.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-rose-400 font-mono text-xs font-bold border border-slate-700">
                  {idx + 1}
                </span>
              </div>
              <div className="flex-1 space-y-1">
                <div className="text-xs font-medium text-slate-400">
                  {idx === 0 ? 'Why did the problem happen?' : `Why did that happen (#${idx + 1})?`}
                </div>
                <input
                  type="text"
                  value={why}
                  onChange={(e) => handleWhyChange(idx, e.target.value)}
                  placeholder={`Reason for step #${idx + 1}...`}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
            </div>
            {idx < whys.length - 1 && (
              <div className="flex justify-center -my-1 text-slate-600">
                <ArrowDown className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Root Cause Conclusion & Countermeasure */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="md:col-span-2 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Preventative Countermeasure (Poka-Yoke / Systemic Fix)
          </label>
          <textarea
            rows={2}
            value={countermeasure}
            onChange={(e) => setCountermeasure(e.target.value)}
            placeholder="What systemic process, tooling, or check will eliminate this root cause?"
            className="w-full bg-slate-900/80 border border-slate-700/80 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              DRI / Accountability Owner
            </label>
            <input
              type="text"
              value={dri}
              onChange={(e) => setDri(e.target.value)}
              placeholder="e.g. Lead SRE / QA Director"
              className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div className="text-xs text-slate-500 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
            💡 <strong className="text-slate-300">Rule of Thumb:</strong> If your 5th why ends with "human was careless", you haven’t reached the root. Ask why the system permitted human error to cause failure.
          </div>
        </div>
      </div>
    </div>
  );
};
