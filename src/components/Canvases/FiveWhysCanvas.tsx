import React, { useState } from 'react';
import { ArrowDown, CheckCircle2, Copy, Download, RefreshCw, Sparkles } from 'lucide-react';
import { copyToClipboard, downloadFile } from '../../utils/export';
import { useLanguage } from '../../i18n/LanguageContext';

interface FiveWhysCanvasProps {
  initialProblem?: string;
}

export const FiveWhysCanvas: React.FC<FiveWhysCanvasProps> = ({ initialProblem = '' }) => {
  const { lang } = useLanguage();

  const defaultProblem = lang === 'vi'
    ? 'API thanh toán của khách hàng trả về lỗi HTTP 500 trong giờ cao điểm'
    : 'Customer checkout API returned HTTP 500 errors during traffic peak';

  const defaultWhys = lang === 'vi'
    ? [
        'Connection pool kết nối cơ sở dữ liệu bị bão hòa và từ chối các kết nối mới.',
        'Một câu truy vấn báo cáo mới triển khai đã khóa bảng users mà không phân trang.',
        'Câu truy vấn được chạy trực tiếp trên replica chính thay vì kho dữ liệu phân tích read-only.',
        'Kỹ sư trực ca chưa được cấp quyền vào cụm phân tích nên đã vội vã chạy trực tiếp.',
        'Quy trình tiếp nhận kỹ sư mới thiếu mục cấp quyền kho phân tích và thiếu linter kiểm tra câu lệnh khóa bảng trong CI/CD.'
      ]
    : [
        'Database connection pool was completely saturated and rejected new connections.',
        'A newly deployed reporting query locked the users table without pagination.',
        'The query was written directly against the live production replica instead of the read-only analytics warehouse.',
        'The junior engineer on call lacked access to the read replica cluster and rushed a hotfix.',
        'Onboarding checklist does not include read-replica role setup or automated query lock linting.'
      ];

  const defaultCountermeasure = lang === 'vi'
    ? 'Triển khai công cụ CI linter tự động chặn các câu truy vấn khóa bảng và mặc định cấu hình quyền kho phân tích riêng cho mọi kỹ sư.'
    : 'Implement automated CI query lock linters and provision all engineering roles with dedicated analytics warehouse access by default.';

  const defaultDri = lang === 'vi' ? 'Trưởng nhóm DevOps & Giám đốc kỹ thuật' : 'DevOps Lead & Tech Director';

  const [problem, setProblem] = useState(initialProblem || defaultProblem);
  const [whys, setWhys] = useState<string[]>(defaultWhys);
  const [countermeasure, setCountermeasure] = useState(defaultCountermeasure);
  const [dri, setDri] = useState(defaultDri);
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
    if (lang === 'vi') {
      return `# Báo Cáo Phân Tích Nguyên Nhân Gốc Rễ 5 Whys

## Phát Biểu Vấn Đề:
${problem}

## Chuỗi Nhân Quả:
${whys.map((w, idx) => `1. **Tại sao #${idx + 1}?** ${w}`).join('\n')}

## 🎯 Nguyên Nhân Gốc Rễ Đã Xác Minh:
${whys[whys.length - 1] || 'Đang chờ xác minh'}

## 🛡️ Biện Pháp Đối Phó Phòng Ngừa (Poka-Yoke):
${countermeasure}

**Người chịu trách nhiệm (DRI):** ${dri || 'Chưa chỉ định'}
**Ngày nghiệm thu:** ${new Date().toISOString().split('T')[0]}
`;
    }

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
            {lang === 'vi' ? 'Bảng Phân Tích 5 Lần Tại Sao (5 Whys)' : '5 Whys Interactive Drill-Down Canvas'}
          </h3>
          <p className="text-sm text-slate-400">
            {lang === 'vi' ? 'Khoan sâu qua các triệu chứng bề mặt để chạm tới nguyên nhân hệ thống và quy trình.' : 'Drill past surface symptoms to locate systemic and procedural root causes.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> {lang === 'vi' ? 'Làm mới' : 'Reset'}
          </button>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (lang === 'vi' ? 'Đã sao chép!' : 'Copied!') : (lang === 'vi' ? 'Sao chép Markdown' : 'Copy Markdown')}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> {lang === 'vi' ? 'Xuất .md' : 'Export .md'}
          </button>
        </div>
      </div>

      {/* Problem Statement Box */}
      <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> {lang === 'vi' ? 'Phát biểu vấn đề ban đầu (Triệu chứng đo lường được)' : 'Initial Problem Statement (Observable Symptom)'}
        </label>
        <textarea
          rows={2}
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder={lang === 'vi' ? 'Mô tả sự cố hoặc sai sót cụ thể một cách khách quan...' : 'Describe the defect, incident, or unexpected failure in verifiable terms...'}
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
                  {lang === 'vi'
                    ? (idx === 0 ? 'Tại sao sự cố lại xảy ra?' : `Tại sao điều đó xảy ra (#${idx + 1})?`)
                    : (idx === 0 ? 'Why did the problem happen?' : `Why did that happen (#${idx + 1})?`)}
                </div>
                <input
                  type="text"
                  value={why}
                  onChange={(e) => handleWhyChange(idx, e.target.value)}
                  placeholder={lang === 'vi' ? `Lý do cho bước #${idx + 1}...` : `Reason for step #${idx + 1}...`}
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
            <CheckCircle2 className="w-3.5 h-3.5" /> {lang === 'vi' ? 'Biện pháp đối phó phòng ngừa mang tính hệ thống (Poka-Yoke)' : 'Preventative Countermeasure (Poka-Yoke / Systemic Fix)'}
          </label>
          <textarea
            rows={2}
            value={countermeasure}
            onChange={(e) => setCountermeasure(e.target.value)}
            placeholder={lang === 'vi' ? 'Quy trình, công cụ hoặc chốt chặn kiểm tra nào sẽ triệt tiêu nguyên nhân gốc rễ này?' : 'What systemic process, tooling, or check will eliminate this root cause?'}
            className="w-full bg-slate-900/80 border border-slate-700/80 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {lang === 'vi' ? 'Người chịu trách nhiệm chính (DRI)' : 'DRI / Accountability Owner'}
            </label>
            <input
              type="text"
              value={dri}
              onChange={(e) => setDri(e.target.value)}
              placeholder={lang === 'vi' ? 'Ví dụ: Trưởng nhóm SRE / Trưởng phòng QA' : 'e.g. Lead SRE / QA Director'}
              className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div className="text-xs text-slate-500 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
            💡 <strong className="text-slate-300">{lang === 'vi' ? 'Mẹo thực chiến:' : 'Rule of Thumb:'}</strong> {lang === 'vi' ? 'Nếu câu tại sao thứ 5 kết thúc bằng "con người bất cẩn", bạn chưa chạm tới gốc rễ. Hãy hỏi vì sao hệ thống lại cho phép sự bất cẩn gây ra lỗi.' : 'If your 5th why ends with "human was careless", you haven’t reached the root. Ask why the system permitted human error to cause failure.'}
          </div>
        </div>
      </div>
    </div>
  );
};
