import React, { useState } from 'react';
import { Copy, Download, CheckCircle2 } from 'lucide-react';
import { copyToClipboard, downloadFile } from '../../utils/export';

export const A3Canvas: React.FC = () => {
  const [title, setTitle] = useState('E-commerce Warehouse Dispatch Delay Reduction');
  const [author, setAuthor] = useState('Operations Excellence Lead');
  const [background, setBackground] = useState('Same-day fulfillment rate fell from 98.5% to 84.1% over the last 3 months, resulting in $120k in courier refund credits and declining customer satisfaction.');
  const [currentCondition, setCurrentCondition] = useState('Order pickers travel an average of 14.2 miles per 8-hour shift. High-velocity seasonal items are scattered randomly across remote Zone D racks.');
  const [targetGoal, setTargetGoal] = useState('Achieve > 99.0% same-day order dispatch within 45 days while reducing average picker walking distance below 8 miles per shift.');
  const [rootCause, setRootCause] = useState('Warehouse management slotting algorithm defaults to random storage bins upon restock rather than dynamic ABC velocity zoning.');
  const [countermeasures, setCountermeasures] = useState('1. Deploy dynamic ABC velocity slotting module in WMS.\n2. Relocate top 50 SKU velocity items to front staging aisle.\n3. Implement barcode pick-path optimization on handheld terminals.');
  const [plan, setPlan] = useState('Week 1: WMS software rule update.\nWeek 2: Physical inventory re-slotting during maintenance window.\nWeek 3: Frontline picker training.\nWeek 4: 100% go-live audit.');
  const [followUp, setFollowUp] = useState('Weekly review of picker travel telemetry and daily SLA dashboards. Quarterly slotting recalibration schedule established.');
  const [copied, setCopied] = useState(false);

  const exportReport = () => {
    return `# Toyota A3 Problem Solving Report: ${title}
**Author / DRI:** ${author}  
**Date:** ${new Date().toISOString().split('T')[0]}

---

### 1. Theme & Background
${background}

### 2. Current Condition
${currentCondition}

### 3. Target State & Measurable Goals
${targetGoal}

### 4. Root Cause Analysis
${rootCause}

### 5. Proposed Countermeasures
${countermeasures}

### 6. Implementation Action Plan
${plan}

### 7. Effect Confirmation & Standardized Follow-up
${followUp}

---
*Created with Problem-Solving Framework Chooser A3 Canvas*
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
    downloadFile(`a3-report-${Date.now()}.md`, exportReport());
  };

  return (
    <div className="space-y-6 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 font-mono text-sm">
              A3
            </span>
            Toyota A3 One-Page Problem Solving Canvas
          </h3>
          <p className="text-sm text-slate-400">Condense an entire complex problem, diagnosis, and action plan onto a single page.</p>
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
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-600 hover:bg-amber-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Export .md
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="md:col-span-2">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">A3 Project Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-semibold"
          />
        </div>
        <div>
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Author / Owner</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* A3 7-Box Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column (Problem & Diagnosis) */}
        <div className="space-y-4">
          {/* Box 1 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3.5 space-y-1.5">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              1. Theme & Background (Why this matters)
            </span>
            <textarea
              rows={3}
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Box 2 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3.5 space-y-1.5">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              2. Current Condition (Baseline metrics & pain)
            </span>
            <textarea
              rows={3}
              value={currentCondition}
              onChange={(e) => setCurrentCondition(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Box 3 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3.5 space-y-1.5">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              3. Target State & Measurable Goals
            </span>
            <textarea
              rows={2}
              value={targetGoal}
              onChange={(e) => setTargetGoal(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Box 4 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3.5 space-y-1.5">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              4. Root Cause Analysis (5 Whys / Fishbone summary)
            </span>
            <textarea
              rows={3}
              value={rootCause}
              onChange={(e) => setRootCause(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Right Column (Countermeasures & Execution) */}
        <div className="space-y-4">
          {/* Box 5 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3.5 space-y-1.5">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              5. Proposed Countermeasures (Systemic Fixes)
            </span>
            <textarea
              rows={4}
              value={countermeasures}
              onChange={(e) => setCountermeasures(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Box 6 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3.5 space-y-1.5">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              6. Implementation Action Plan (Who does What by When)
            </span>
            <textarea
              rows={4}
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Box 7 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3.5 space-y-1.5">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              7. Effect Confirmation & Standardization (Nemawashi)
            </span>
            <textarea
              rows={3}
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
