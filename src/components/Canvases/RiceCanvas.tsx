import React, { useState } from 'react';
import { Plus, Trash2, Award, Copy, Download, CheckCircle2 } from 'lucide-react';
import { copyToClipboard, downloadFile } from '../../utils/export';
import { useLanguage } from '../../i18n/LanguageContext';

interface Initiative {
  id: string;
  name: string;
  reach: number; // e.g. users / month
  impact: number; // 3 = Massive, 2 = High, 1 = Medium, 0.5 = Low, 0.25 = Minimal
  confidence: number; // 1 = 100%, 0.8 = 80%, 0.5 = 50%
  effort: number; // person-months / sprints
}

export const RiceCanvas: React.FC = () => {
  const { lang } = useLanguage();

  const defaultInitiatives: Initiative[] = lang === 'vi'
    ? [
        {
          id: '1',
          name: 'Đăng nhập sinh trắc học một chạm',
          reach: 18000,
          impact: 2.0,
          confidence: 1.0,
          effort: 1.0
        },
        {
          id: '2',
          name: 'Gợi ý tìm kiếm thông minh bằng AI',
          reach: 25000,
          impact: 1.0,
          confidence: 0.8,
          effort: 2.0
        },
        {
          id: '3',
          name: 'Giao diện nền tối (Dark Mode)',
          reach: 9000,
          impact: 0.5,
          confidence: 1.0,
          effort: 0.5
        },
        {
          id: '4',
          name: 'Tích hợp thanh toán ví tiền điện tử',
          reach: 3500,
          impact: 3.0,
          confidence: 0.5,
          effort: 6.0
        }
      ]
    : [
        {
          id: '1',
          name: 'One-Tap Biometric Authentication',
          reach: 18000,
          impact: 2.0,
          confidence: 1.0,
          effort: 1.0
        },
        {
          id: '2',
          name: 'AI Smart Search Auto-Suggestions',
          reach: 25000,
          impact: 1.0,
          confidence: 0.8,
          effort: 2.0
        },
        {
          id: '3',
          name: 'Dark Mode Theme Support',
          reach: 9000,
          impact: 0.5,
          confidence: 1.0,
          effort: 0.5
        },
        {
          id: '4',
          name: 'Crypto Wallet Integration',
          reach: 3500,
          impact: 3.0,
          confidence: 0.5,
          effort: 6.0
        }
      ];

  const [initiatives, setInitiatives] = useState<Initiative[]>(defaultInitiatives);
  const [newName, setNewName] = useState('');
  const [copied, setCopied] = useState(false);

  const calculateScore = (item: Initiative) => {
    if (item.effort <= 0) return 0;
    return Math.round((item.reach * item.impact * item.confidence) / item.effort);
  };

  const sortedList = [...initiatives].sort((a, b) => calculateScore(b) - calculateScore(a));

  const addInitiative = () => {
    if (!newName.trim()) return;
    const newItem: Initiative = {
      id: Date.now().toString(),
      name: newName.trim(),
      reach: 5000,
      impact: 1.0,
      confidence: 0.8,
      effort: 2.0
    };
    setInitiatives([...initiatives, newItem]);
    setNewName('');
  };

  const updateItem = (id: string, field: keyof Initiative, value: number | string) => {
    setInitiatives(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (id: string) => {
    setInitiatives(prev => prev.filter(item => item.id !== id));
  };

  const exportReport = () => {
    if (lang === 'vi') {
      return `# Bảng Điểm Ưu Tiên Tính Năng RICE

| Xếp hạng | Sáng kiến / Tính năng | Độ tiếp cận (Reach) | Tác động (Impact) | Độ tự tin (Confidence) | Nỗ lực (Effort) | Điểm RICE |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|
${sortedList.map((item, idx) => `| #${idx + 1} | ${item.name} | ${item.reach.toLocaleString()} | ${item.impact}x | ${Math.round(item.confidence * 100)}% | ${item.effort} | **${calculateScore(item).toLocaleString()}** |`).join('\n')}

---
*Công thức: Điểm RICE = (Độ tiếp cận × Mức tác động × Độ tự tin) / Nỗ lực*
`;
    }

    return `# RICE Prioritization Scorecard

| Rank | Initiative | Reach | Impact | Confidence | Effort (mo) | RICE Score |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|
${sortedList.map((item, idx) => `| #${idx + 1} | ${item.name} | ${item.reach.toLocaleString()} | ${item.impact}x | ${Math.round(item.confidence * 100)}% | ${item.effort} | **${calculateScore(item).toLocaleString()}** |`).join('\n')}

---
*Formula: RICE = (Reach × Impact × Confidence) / Effort*
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
    downloadFile(`rice-prioritization-${Date.now()}.md`, exportReport());
  };

  return (
    <div className="space-y-6 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 font-mono text-sm">
              RICE
            </span>
            {lang === 'vi' ? 'Máy Tính Điểm Ưu Tiên RICE' : 'RICE Prioritization Calculator'}
          </h3>
          <p className="text-sm text-slate-400">
            {lang === 'vi' ? 'Chấm điểm tính năng khách quan: (Độ tiếp cận × Tác động × Độ tự tin) / Nỗ lực.' : 'Score roadmap candidates objectively: (Reach × Impact × Confidence) / Effort.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (lang === 'vi' ? 'Đã sao chép!' : 'Copied!') : (lang === 'vi' ? 'Sao chép bảng' : 'Copy Table')}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> {lang === 'vi' ? 'Xuất .md' : 'Export .md'}
          </button>
        </div>
      </div>

      {/* Add new initiative */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addInitiative()}
          placeholder={lang === 'vi' ? 'Nhập tên tính năng hoặc dự án cần ưu tiên...' : 'Enter feature or project name to prioritize...'}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          onClick={addInitiative}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> {lang === 'vi' ? 'Thêm sáng kiến' : 'Add Initiative'}
        </button>
      </div>

      {/* Table of initiatives */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">{lang === 'vi' ? 'Thứ hạng' : 'Rank'}</th>
              <th className="py-3 px-4 min-w-[200px]">{lang === 'vi' ? 'Sáng kiến' : 'Initiative'}</th>
              <th className="py-3 px-3">{lang === 'vi' ? 'Tiếp cận (Users)' : 'Reach (Users)'}</th>
              <th className="py-3 px-3">{lang === 'vi' ? 'Tác động' : 'Impact'}</th>
              <th className="py-3 px-3">{lang === 'vi' ? 'Độ tự tin' : 'Confidence'}</th>
              <th className="py-3 px-3">{lang === 'vi' ? 'Nỗ lực (Tháng)' : 'Effort (mo)'}</th>
              <th className="py-3 px-4 text-right">{lang === 'vi' ? 'Điểm RICE' : 'RICE Score'}</th>
              <th className="py-3 px-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {sortedList.map((item, idx) => {
              const score = calculateScore(item);
              const isWinner = idx === 0 && sortedList.length > 1;

              return (
                <tr
                  key={item.id}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    isWinner ? 'bg-cyan-950/20' : ''
                  }`}
                >
                  <td className="py-3 px-4 font-mono font-bold text-xs">
                    {isWinner ? (
                      <span className="flex items-center gap-1 text-amber-400">
                        <Award className="w-4 h-4" /> #1
                      </span>
                    ) : (
                      <span className="text-slate-500">#{idx + 1}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-100">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                      className="w-full bg-transparent border-b border-transparent hover:border-slate-700 focus:border-cyan-500 focus:outline-none text-sm text-white"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      step={500}
                      min={1}
                      value={item.reach}
                      onChange={(e) => updateItem(item.id, 'reach', Math.max(1, Number(e.target.value)))}
                      className="w-20 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <select
                      value={item.impact}
                      onChange={(e) => updateItem(item.id, 'impact', Number(e.target.value))}
                      className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                    >
                      <option value={3.0}>3.0 - {lang === 'vi' ? 'Rất lớn' : 'Massive'}</option>
                      <option value={2.0}>2.0 - {lang === 'vi' ? 'Lớn' : 'High'}</option>
                      <option value={1.0}>1.0 - {lang === 'vi' ? 'Trung bình' : 'Medium'}</option>
                      <option value={0.5}>0.5 - {lang === 'vi' ? 'Nhỏ' : 'Low'}</option>
                      <option value={0.25}>0.25 - {lang === 'vi' ? 'Tối thiểu' : 'Minimal'}</option>
                    </select>
                  </td>
                  <td className="py-3 px-3">
                    <select
                      value={item.confidence}
                      onChange={(e) => updateItem(item.id, 'confidence', Number(e.target.value))}
                      className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                    >
                      <option value={1.0}>100% - {lang === 'vi' ? 'Bằng chứng cao' : 'High evidence'}</option>
                      <option value={0.8}>80% - {lang === 'vi' ? 'Trung bình' : 'Medium'}</option>
                      <option value={0.5}>50% - {lang === 'vi' ? 'Ước đoán/Thấp' : 'Moonshot/Low'}</option>
                    </select>
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      step={0.5}
                      min={0.2}
                      value={item.effort}
                      onChange={(e) => updateItem(item.id, 'effort', Math.max(0.1, Number(e.target.value)))}
                      className="w-16 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                    />
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-cyan-400 text-sm">
                    {score.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-600 hover:text-rose-400 p-1 transition-colors"
                      title={lang === 'vi' ? 'Xóa' : 'Remove'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
