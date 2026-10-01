import React, { useState } from 'react';
import { CynefinDomain } from '../../types/framework';
import { ShieldAlert, Compass, CheckCircle2, Copy, Download, Sparkles } from 'lucide-react';
import { copyToClipboard, downloadFile } from '../../utils/export';
import { useLanguage } from '../../i18n/LanguageContext';

interface DomainDetails {
  domain: CynefinDomain;
  nature: string;
  responseMode: string;
  practiceType: string;
  dangerTrap: string;
  recommendedTools: string[];
}

const DOMAIN_DATA_EN: Record<CynefinDomain, DomainDetails> = {
  'Clear': {
    domain: 'Clear',
    nature: 'Cause and effect is self-evident to everyone. Highly predictable, repeatable, and stable.',
    responseMode: 'Sense → Categorize → Respond',
    practiceType: 'Best Practice',
    dangerTrap: 'Complacency: Assuming everything stays simple until sudden catastrophic collapse into Chaos.',
    recommendedTools: ['Checklists', 'Standard Operating Procedures (SOPs)', '5 Whys', 'PDCA']
  },
  'Complicated': {
    domain: 'Complicated',
    nature: 'Cause and effect requires discovery and analysis by domain experts. Multiple right answers exist.',
    responseMode: 'Sense → Analyze → Respond',
    practiceType: 'Good Practice',
    dangerTrap: 'Analysis Paralysis: Blindly trusting entrenched experts who resist novel perspectives.',
    recommendedTools: ['Kepner-Tregoe', 'DMAIC', 'MECE Issue Trees', 'Fishbone Diagram', 'FMEA']
  },
  'Complex': {
    domain: 'Complex',
    nature: 'Emergent order. Cause and effect only makes sense in hindsight. Unpredictable human and market ecosystems.',
    responseMode: 'Probe → Sense → Respond',
    practiceType: 'Emergent Practice',
    dangerTrap: 'Imposing rigid blueprints or premature KPIs onto living systems that require experimentation.',
    recommendedTools: ['Design Thinking', 'Double Diamond', 'Safe-to-Fail Pilots', 'Cynefin Sense-making']
  },
  'Chaotic': {
    domain: 'Chaotic',
    nature: 'High turbulence, immediate crisis, no perceivable cause-and-effect relationship.',
    responseMode: 'Act → Sense → Respond',
    practiceType: 'Novel Practice',
    dangerTrap: 'Deliberating and planning while the system bleeds to death. Missing the critical stabilization window.',
    recommendedTools: ['OODA Loop', 'Immediate Containment (8D D3)', 'Incident Command War Room']
  },
  'Confused': {
    domain: 'Confused',
    nature: 'State of not knowing which domain you are in. People default to their comfort zone.',
    responseMode: 'Break down the problem into component domains',
    practiceType: 'Aporia / Decomposition',
    dangerTrap: 'Factional infighting where engineers treat everything as Complicated and managers treat everything as Clear.',
    recommendedTools: ['Context Decomposition', 'Multi-perspective Triangulation']
  }
};

const DOMAIN_DATA_VI: Record<CynefinDomain, DomainDetails> = {
  'Clear': {
    domain: 'Clear',
    nature: 'Mối quan hệ nhân - quả hiển nhiên với mọi người. Có tính lặp lại cao, ổn định và có thể đoán trước.',
    responseMode: 'Cảm nhận → Phân loại → Phản hồi',
    practiceType: 'Thực hành Tốt nhất (Best Practice)',
    dangerTrap: 'Tự mãn chủ quan: Cho rằng mọi thứ luôn đơn giản cho đến khi sụp đổ bất ngờ sang Hỗn loạn.',
    recommendedTools: ['Bảng kiểm tra (Checklists)', 'Quy trình chuẩn (SOP)', '5 Whys', 'PDCA']
  },
  'Complicated': {
    domain: 'Complicated',
    nature: 'Mối quan hệ nhân - quả cần có chuyên gia điều tra và phân tích. Có nhiều phương án đúng khác nhau.',
    responseMode: 'Cảm nhận → Phân tích → Phản hồi',
    practiceType: 'Thực hành Tốt (Good Practice)',
    dangerTrap: 'Tê liệt vì phân tích: Tin tưởng mù quáng vào các chuyên gia bảo thủ từ chối góc nhìn mới.',
    recommendedTools: ['Kepner-Tregoe', 'DMAIC', 'Cây vấn đề MECE', 'Biểu đồ xương cá', 'FMEA']
  },
  'Complex': {
    domain: 'Complex',
    nature: 'Hệ thống thích ứng có trật tự nổi sinh. Nhân quả chỉ giải thích được sau khi đã diễn ra. Hệ sinh thái con người và thị trường.',
    responseMode: 'Thử nghiệm thăm dò → Cảm nhận → Phản hồi',
    practiceType: 'Thực hành Thích ứng (Emergent Practice)',
    dangerTrap: 'Áp đặt các kế hoạch tổng thể cứng nhắc hoặc chỉ số KPI vội vã lên hệ thống cần thử nghiệm.',
    recommendedTools: ['Tư duy thiết kế', 'Kim cương kép', 'Thử nghiệm an toàn-để-thất-bại', 'Mô hình Cynefin']
  },
  'Chaotic': {
    domain: 'Chaotic',
    nature: 'Hỗn loạn biến động dữ dội, khủng hoảng ngay trước mắt, không có mối quan hệ nhân-quả nào nhận thức được.',
    responseMode: 'Hành động dập lửa → Cảm nhận → Phản hồi',
    practiceType: 'Thực hành Đột phá Mới (Novel Practice)',
    dangerTrap: 'Bàn bạc đắn đo trong khi hệ thống đang chảy máu đến chết. Bỏ lỡ cửa sổ ổn định tình thế.',
    recommendedTools: ['Vòng lặp OODA', 'Cô lập khẩn cấp (8D D3)', 'Phòng chỉ huy tác chiến sự cố']
  },
  'Confused': {
    domain: 'Confused',
    nature: 'Tình trạng không biết mình đang ở miền nào. Mọi người có xu hướng phán xét theo thói quen cũ của bản thân.',
    responseMode: 'Phân rã vấn đề thành các cấu phần thuộc các miền khác nhau',
    practiceType: 'Phân tách bối cảnh',
    dangerTrap: 'Tranh cãi bè phái nội bộ nơi kỹ sư coi mọi thứ là Rắc rối còn quản lý coi mọi thứ là Rõ ràng.',
    recommendedTools: ['Phân rã bối cảnh', 'Đối chiếu đa góc nhìn']
  }
};

export const CynefinCanvas: React.FC = () => {
  const { lang } = useLanguage();
  const [selectedDomain, setSelectedDomain] = useState<CynefinDomain>('Complex');
  const [problemDescription, setProblemDescription] = useState(
    lang === 'vi'
      ? 'Mở rộng thị trường sàn thương mại điện tử nơi cung và cầu của người dùng tương tác phức tạp khó lường'
      : 'Scaling a consumer marketplace where seller supply and buyer demand interact unpredictably'
  );
  const [copied, setCopied] = useState(false);

  const domainSource = lang === 'vi' ? DOMAIN_DATA_VI : DOMAIN_DATA_EN;
  const activeData = domainSource[selectedDomain];

  const exportReport = () => {
    if (lang === 'vi') {
      return `# Báo Cáo Chẩn Đoán Nhận Thức Bối Cảnh Cynefin

## Mô Tả Bối Cảnh Vấn Đề:
${problemDescription}

## 🌐 Miền Không Gian Cynefin: **${activeData.domain}**
- **Bản chất thực tại:** ${activeData.nature}
- **Tư thế phản hồi yêu cầu:** **${activeData.responseMode}**
- **Kiểu thực hành:** ${activeData.practiceType}
- **⚠️ Cái bẫy chết người cần tránh:** ${activeData.dangerTrap}

### Các Phương Pháp & Công Cụ Khuyến Nghị:
${activeData.recommendedTools.map(t => `- ${t}`).join('\n')}

---
*Khởi tạo từ Problem-Solving Framework Chooser Cynefin Canvas*
`;
    }

    return `# Cynefin Sense-Making Diagnostic Report

## Challenge Description:
${problemDescription}

## 🌐 Classified Cynefin Domain: **${activeData.domain}**
- **Nature of Reality:** ${activeData.nature}
- **Required Response Mode:** **${activeData.responseMode}**
- **Type of Practice:** ${activeData.practiceType}
- **⚠️ Fatal Danger Trap to Avoid:** ${activeData.dangerTrap}

### Recommended Methodologies & Tools:
${activeData.recommendedTools.map(t => `- ${t}`).join('\n')}

---
*Created with Problem-Solving Framework Chooser Cynefin Canvas*
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
    downloadFile(`cynefin-assessment-${Date.now()}.md`, exportReport());
  };

  return (
    <div className="space-y-6 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-sm">
              CYN
            </span>
            {lang === 'vi' ? 'Ma Trận Nhận Thức Bối Cảnh Cynefin' : 'Cynefin Sense-Making Matrix'}
          </h3>
          <p className="text-sm text-slate-400">
            {lang === 'vi' ? 'Phân loại bản chất thực tại trước khi hành động để tránh dùng sai phương pháp quản trị.' : 'Classify reality before acting to avoid applying the wrong management tools.'}
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
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> {lang === 'vi' ? 'Xuất .md' : 'Export .md'}
          </button>
        </div>
      </div>

      {/* Challenge Description */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> {lang === 'vi' ? 'Mô tả bối cảnh thách thức cần định vị' : 'Describe the challenge context'}
        </label>
        <input
          type="text"
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
          placeholder={lang === 'vi' ? 'Tình huống cụ thể bạn đang cần đánh giá là gì?...' : 'What situation are you trying to assess?'}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* 4 Quadrants Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top-Left: Complex */}
        <div
          onClick={() => setSelectedDomain('Complex')}
          className={`cursor-pointer rounded-xl p-5 border transition-all ${
            selectedDomain === 'Complex'
              ? 'border-emerald-500 bg-emerald-950/30 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-500/50'
              : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
              <Compass className="w-5 h-5" /> {lang === 'vi' ? 'Miền Phức Tạp (Complex)' : 'Complex Domain'}
            </h4>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60">
              {lang === 'vi' ? 'Thử nghiệm → Cảm nhận → Phản hồi' : 'Probe → Sense → Respond'}
            </span>
          </div>
          <p className="text-xs text-slate-300 mb-2">
            {lang === 'vi' ? 'Vương quốc của những ẩn số bất định và hệ thống con người. Các quy luật mới chỉ nổi sinh theo thời gian.' : 'The realm of "Unknown Unknowns" and living human systems. Unpredictable patterns emerge over time.'}
          </p>
          <div className="text-[11px] text-slate-400">
            <strong>{lang === 'vi' ? 'Chiến lược cốt lõi:' : 'Key Strategy:'}</strong> {lang === 'vi' ? 'Chạy các thử nghiệm nhỏ an toàn-để-thất-bại để khám phá quy luật.' : 'Run small safe-to-fail pilot experiments to see what emerges.'}
          </div>
        </div>

        {/* Top-Right: Complicated */}
        <div
          onClick={() => setSelectedDomain('Complicated')}
          className={`cursor-pointer rounded-xl p-5 border transition-all ${
            selectedDomain === 'Complicated'
              ? 'border-indigo-500 bg-indigo-950/30 shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-500/50'
              : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
              <Compass className="w-5 h-5" /> {lang === 'vi' ? 'Miền Rắc Rối (Complicated)' : 'Complicated Domain'}
            </h4>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60">
              {lang === 'vi' ? 'Cảm nhận → Phân tích → Phản hồi' : 'Sense → Analyze → Respond'}
            </span>
          </div>
          <p className="text-xs text-slate-300 mb-2">
            {lang === 'vi' ? 'Lãnh địa của chuyên gia. Quan hệ nhân-quả có thể giải thích được nếu có đủ kiến thức chuyên môn và đo lường.' : 'The realm of "Known Unknowns". Cause and effect is discoverable through expert diagnostic rigor.'}
          </p>
          <div className="text-[11px] text-slate-400">
            <strong>{lang === 'vi' ? 'Chiến lược cốt lõi:' : 'Key Strategy:'}</strong> {lang === 'vi' ? 'Hỏi ý kiến kỹ sư chuyên gia; áp dụng phân tích nguyên nhân có cấu trúc.' : 'Consult specialized engineers; apply systematic root cause diagnostics.'}
          </div>
        </div>

        {/* Bottom-Left: Chaotic */}
        <div
          onClick={() => setSelectedDomain('Chaotic')}
          className={`cursor-pointer rounded-xl p-5 border transition-all ${
            selectedDomain === 'Chaotic'
              ? 'border-rose-500 bg-rose-950/30 shadow-lg shadow-rose-500/10 ring-2 ring-rose-500/50'
              : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-bold text-rose-400 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" /> {lang === 'vi' ? 'Miền Hỗn Loạn (Chaotic)' : 'Chaotic Domain'}
            </h4>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/60">
              {lang === 'vi' ? 'Hành động → Cảm nhận → Phản hồi' : 'Act → Sense → Respond'}
            </span>
          </div>
          <p className="text-xs text-slate-300 mb-2">
            {lang === 'vi' ? 'Khủng hoảng biến động dữ dội. Cần phân loại cấp cứu và hành động dứt khoát để chặn đứng đà chảy máu.' : 'The realm of "Unknowables" and high turbulence. Immediate crisis triage is needed to stem the bleeding.'}
          </p>
          <div className="text-[11px] text-slate-400">
            <strong>{lang === 'vi' ? 'Chiến lược cốt lõi:' : 'Key Strategy:'}</strong> {lang === 'vi' ? 'Hành động quyết liệt để lập lại trật tự; chỉ phân tích sâu sau khi đã kiểm soát tình hình.' : 'Act decisively to establish order first; analyze only after bleeding stops.'}
          </div>
        </div>

        {/* Bottom-Right: Clear */}
        <div
          onClick={() => setSelectedDomain('Clear')}
          className={`cursor-pointer rounded-xl p-5 border transition-all ${
            selectedDomain === 'Clear'
              ? 'border-cyan-500 bg-cyan-950/30 shadow-lg shadow-cyan-500/10 ring-2 ring-cyan-500/50'
              : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> {lang === 'vi' ? 'Miền Rõ Ràng (Clear)' : 'Clear Domain'}
            </h4>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
              {lang === 'vi' ? 'Cảm nhận → Phân loại → Phản hồi' : 'Sense → Categorize → Respond'}
            </span>
          </div>
          <p className="text-xs text-slate-300 mb-2">
            {lang === 'vi' ? 'Lãnh địa của công việc lặp lại, quy chuẩn. Đã có sẵn quy trình chuẩn và bảng kiểm tra đã kiểm chứng.' : 'The realm of "Known Knowns". Repeatable, standard work with proven operational checklists.'}
          </p>
          <div className="text-[11px] text-slate-400">
            <strong>{lang === 'vi' ? 'Chiến lược cốt lõi:' : 'Key Strategy:'}</strong> {lang === 'vi' ? 'Tuân thủ các phương pháp thực hành tốt nhất (Best Practices) và tự động hóa.' : 'Adhere to verified best practices and automated rules.'}
          </div>
        </div>
      </div>

      {/* Selected Domain Guidance Callout */}
      <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            {lang === 'vi' ? 'Cẩm nang chỉ định cho' : 'Prescribed Playbook for'}{' '}
            <span className="text-emerald-400 underline">{activeData.domain}</span>
          </h4>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-medium">
            {lang === 'vi' ? 'Phong cách thực hành:' : 'Practice Style:'} {activeData.practiceType}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {lang === 'vi' ? 'Tư thế phản hồi tối ưu:' : 'Optimal Response Posture:'}
            </span>
            <div className="text-sm font-bold text-white">{activeData.responseMode}</div>
            <p className="text-slate-400">{activeData.nature}</p>
          </div>

          <div className="space-y-1.5 bg-rose-950/20 p-3 rounded-lg border border-rose-900/40">
            <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> {lang === 'vi' ? 'Cái bẫy chết người cần tránh:' : 'Fatal Trap to Avoid:'}
            </span>
            <p className="text-rose-200">{activeData.dangerTrap}</p>
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            {lang === 'vi' ? `Các phương pháp khuyến nghị cho miền ${activeData.domain}:` : `Recommended Frameworks for ${activeData.domain}:`}
          </span>
          <div className="flex flex-wrap gap-2">
            {activeData.recommendedTools.map((t, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
