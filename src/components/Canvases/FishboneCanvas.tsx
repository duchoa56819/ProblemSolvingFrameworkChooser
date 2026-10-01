import React, { useState } from 'react';
import { Plus, X, Copy, Download, CheckCircle2, Sparkles } from 'lucide-react';
import { copyToClipboard, downloadFile } from '../../utils/export';
import { useLanguage } from '../../i18n/LanguageContext';

interface BoneCategory {
  key: string;
  name: string;
  tag: string;
  causes: string[];
}

export const FishboneCanvas: React.FC = () => {
  const { lang } = useLanguage();

  const defaultProblem = lang === 'vi'
    ? 'Độ trễ cao (>3000ms) trên các giao dịch thanh toán của khách hàng'
    : 'High latency (>3000ms) on customer checkout transactions';

  const defaultCategories: BoneCategory[] = lang === 'vi'
    ? [
        {
          key: 'manpower',
          name: 'Con người (Manpower)',
          tag: 'Kỹ năng, Mệt mỏi, Đào tạo',
          causes: ['Đứt gãy bàn giao ca trực vận hành', 'Lập trình viên mới chưa qua đào tạo về index DB']
        },
        {
          key: 'machine',
          name: 'Máy móc & Công nghệ (Machine)',
          tag: 'Phần cứng, Cụm máy chủ, Mạng',
          causes: ['Nghẽn IOPS ổ đĩa AWS EBS của cơ sở dữ liệu', 'Đột biến bộ nhớ do dọn dẹp cache Redis']
        },
        {
          key: 'method',
          name: 'Phương pháp & Quy trình (Method)',
          tag: 'Quy chuẩn, Mã nguồn, Luồng xử lý',
          causes: ['Vòng lặp truy vấn N+1 ORM trong bộ điều khiển giỏ hàng', 'Webhook tính thuế chạy đồng bộ chặn luồng UI']
        },
        {
          key: 'material',
          name: 'Vật liệu & Dữ liệu (Material)',
          tag: 'Payload, Dữ liệu đầu vào, API bên thứ ba',
          causes: ['Độ trễ cổng thanh toán bên thứ ba dao động lớn', 'Payload JSON bị phình to khi serialize giỏ hàng']
        },
        {
          key: 'measurement',
          name: 'Đo lường & Giám sát (Measurement)',
          tag: 'Chỉ số, Nhật ký, Cảnh báo',
          causes: ['Ngưỡng trễ APM đặt quá cao (10s thay vì 1s)', 'Chưa cấu hình cảnh báo phân vị p99']
        },
        {
          key: 'milieu',
          name: 'Môi trường (Milieu)',
          tag: 'Tải đột biến, Quy định, Bối cảnh',
          causes: ['Chiến dịch flash sale đẩy thông báo mà không báo trước cho Ops', 'Độ trễ truyền gói tin mạng xuyên khu vực']
        }
      ]
    : [
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
      ];

  const [problem, setProblem] = useState(defaultProblem);
  const [categories, setCategories] = useState<BoneCategory[]>(defaultCategories);
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
    if (lang === 'vi') {
      return `# Báo Cáo Phân Tích Biểu Đồ Xương Cá Ishikawa

## Phát Biểu Vấn Đề Khuyết Tật (Đầu Cá):
${problem}

## 6M Nhóm Nguyên Nhân Tiềm Ẩn:
${categories.map(c => `### ${c.name} (${c.tag})
${c.causes.length ? c.causes.map(cause => `- ${cause}`).join('\n') : '- (Chưa ghi nhận)'}
`).join('\n')}

---
*Khởi tạo từ Problem-Solving Framework Chooser Fishbone Canvas*
`;
    }

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
            {lang === 'vi' ? 'Biểu Đồ Xương Cá Ishikawa (Mô Hình 6M)' : 'Ishikawa Fishbone Diagram Canvas'}
          </h3>
          <p className="text-sm text-slate-400">
            {lang === 'vi' ? 'Phân loại các yếu tố đóng góp theo 6 khía cạnh vận hành.' : 'Map multi-variable contributors across 6 systemic dimensions.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (lang === 'vi' ? 'Đã sao chép!' : 'Copied!') : (lang === 'vi' ? 'Sao chép Markdown' : 'Copy Markdown')}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> {lang === 'vi' ? 'Xuất .md' : 'Export .md'}
          </button>
        </div>
      </div>

      {/* Problem Header (The Fish Head) */}
      <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4 space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> {lang === 'vi' ? 'Khuyết tật cần giải quyết (Đầu cá)' : 'Problem Defect (Fish Head)'}
        </label>
        <input
          type="text"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder={lang === 'vi' ? 'Nêu rõ khuyết tật hoặc sai lệch có thể đo lường được...' : 'State the measurable failure or defect...'}
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
                  {cat.causes.length} {lang === 'vi' ? 'mục' : 'items'}
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
                  <div className="text-xs text-slate-600 italic py-2">{lang === 'vi' ? 'Chưa có giả thuyết nào' : 'No causes added yet'}</div>
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
                placeholder={lang === 'vi' ? 'Thêm giả thuyết...' : 'Add hypothesis...'}
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
