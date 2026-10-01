import React, { useState } from 'react';
import { Plus, X, Copy, Download, CheckCircle2, Sparkles } from 'lucide-react';
import { copyToClipboard, downloadFile } from '../../utils/export';

interface BoneCategory {
  key: string;
  name: string;
  tag: string;
  causes: string[];
}

export const FishboneCanvas: React.FC = () => {
  const [problem, setProblem] = useState('High latency (>3000ms) on customer checkout transactions');
  const [categories, setCategories] = useState<BoneCategory[]>([
    {
      key: 'manpower',
      name: 'Manpower / People',
      tag: 'Skills, Fatigue, Training',
      causes: ['Shift handoff communication gaps', 'Junior devs lack DB indexing training']
    },
    {
      key: 'machine',
      name: 'Machine / Technology',
      tag: 'Hardware, Servers, Networks',
      causes: ['Database disk IOPS throttled on AWS EBS', 'Redis cache eviction memory spike']
    },
    {
      key: 'method',
      name: 'Method / Process',
      tag: 'Procedures, Code, Workflows',
      causes: ['N+1 ORM query loops in cart checkout controller', 'Synchronous tax calculation webhook blocking UI thread']
    },
    {
      key: 'material',
      name: 'Material / Data Inputs',
      tag: 'Payloads, Assets, 3rd Party APIs',
      causes: ['3rd-party payment gateway latency fluctuation', 'Oversized JSON payload on cart serialization']
    },
    {
      key: 'measurement',
      name: 'Measurement / Telemetry',
      tag: 'Metrics, Logging, Audits',
      causes: ['APM latency threshold set too high (10s instead of 1s)', 'No p99 percentile alerts configured']
    },
    {
      key: 'milieu',
      name: 'Milieu / Environment',
      tag: 'Peak Loads, Context, Regulations',
      causes: ['Flash sale marketing blast launched without notifying Ops', 'Cross-region network packet latency']
    }
  ]);

  const [newCauseText, setNewCauseText] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const addCause = (catKey: string) => {
    const text = newCauseText[catKey]?.trim();
    if (!text) return;

    setCategories(prev =>
      prev.map(cat =>
        cat.key === catKey ? { ...cat, causes: [...cat.causes, text] } : cat
      )
    );
    setNewCauseText(prev => ({ ...prev, [catKey]: '' }));
  };

  const removeCause = (catKey: string, index: number) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.key === catKey
          ? { ...cat, causes: cat.causes.filter((_, i) => i !== index) }
          : cat
      )
    );
  };

  const exportReport = () => {
    return `# Ishikawa / Fishbone Diagram Analysis

## Defect Statement (Fish Head):
${problem}

## 6M Categorized Potential Causes:
${categories.map(c => `### ${c.name} (${c.tag})
${c.causes.length ? c.causes.map(cause => `- ${cause}`).join('\n') : '- (None identified)'}
`).join('\n')}

---
*Created with Problem-Solving Framework Chooser Fishbone Canvas*
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
    downloadFile(`fishbone-analysis-${Date.now()}.md`, exportReport());
  };

  return (
    <div className="space-y-6 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 font-mono text-sm">
              6M
            </span>
            Ishikawa Fishbone Diagram Canvas
          </h3>
          <p className="text-sm text-slate-400">Map multi-variable contributors across 6 systemic dimensions.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy Markdown'}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Export .md
          </button>
        </div>
      </div>

      {/* Problem Header (The Fish Head) */}
      <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4 space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Problem Defect (Fish Head)
        </label>
        <input
          type="text"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="State the measurable failure or defect..."
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* The 6 Ribs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.key}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-white">{cat.name}</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  {cat.causes.length} items
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">{cat.tag}</p>

              {/* Causes List */}
              <div className="space-y-1.5 min-h-[90px]">
                {cat.causes.map((cause, idx) => (
                  <div
                    key={idx}
                    className="group flex items-start justify-between gap-2 text-xs bg-slate-950/80 p-2 rounded-lg border border-slate-800/80 text-slate-300"
                  >
                    <span>{cause}</span>
                    <button
                      onClick={() => removeCause(cat.key, idx)}
                      className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-opacity"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {cat.causes.length === 0 && (
                  <div className="text-xs text-slate-600 italic py-2">No causes added yet</div>
                )}
              </div>
            </div>

            {/* Input to add */}
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex gap-1.5">
              <input
                type="text"
                value={newCauseText[cat.key] || ''}
                onChange={(e) => setNewCauseText({ ...newCauseText, [cat.key]: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && addCause(cat.key)}
                placeholder="Add hypothesis..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                onClick={() => addCause(cat.key)}
                className="p-1 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
