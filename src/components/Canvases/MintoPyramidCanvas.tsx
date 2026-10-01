import React, { useState } from 'react';
import { 
  Layers, Copy, Download, CheckCircle2, Plus, 
  Trash2, FileText, ArrowRight, Lightbulb, MessageSquareQuote, CheckSquare 
} from 'lucide-react';
import { copyToClipboard, downloadFile } from '../../utils/export';
import { useLanguage } from '../../i18n/LanguageContext';

interface SupportingPillar {
  id: string;
  title: string;
  evidence: string[];
}

export const MintoPyramidCanvas: React.FC = () => {
  const { lang } = useLanguage();

  // Default content based on language
  const defaultSituation = lang === 'vi'
    ? 'Hệ thống thương mại điện tử hiện tại đang vận hành trên 4 cụm máy chủ on-premise truyền thống với 2,4 triệu người dùng hoạt động.'
    : 'Our e-commerce platform currently operates across 4 legacy on-premise datacenter clusters serving 2.4 million active users.';

  const defaultComplication = lang === 'vi'
    ? 'Lượng truy cập dịp cao điểm dự kiến tăng 3 lần, trong khi hạ tầng vật lý đã đạt 89% công suất và chi phí bảo trì phần cứng tăng vọt 45%.'
    : 'Peak traffic is forecasted to surge 3x, while on-premise compute has reached 89% capacity and hardware maintenance renewal costs jumped 45%.';

  const defaultQuestion = lang === 'vi'
    ? 'Làm thế nào để bảo đảm hệ thống vận hành thông suốt tuyệt đối trong đợt cao điểm mà không phải lãng phí chi phí gia hạn phần cứng?'
    : 'How can we guarantee zero downtime during peak traffic without overpaying for obsolete hardware maintenance contracts?';

  const defaultAnswer = lang === 'vi'
    ? 'Chuyển đổi toàn bộ các vi dịch vụ tải cao (giỏ hàng, thanh toán, kho vận) sang kiến trúc Hybrid Cloud linh hoạt trong vòng 45 ngày tới.'
    : 'Migrate critical high-throughput microservices (checkout, cart, inventory) to an auto-scaling Hybrid Cloud architecture within 45 days.';

  const defaultPillars: SupportingPillar[] = lang === 'vi' ? [
    {
      id: 'p1',
      title: '1. Triệt tiêu rủi ro quá tải hệ thống (Cam kết 99.99% SLA)',
      evidence: [
        'Khả năng tự động mở rộng (Auto-scaling) từ 10 lên 500 node chỉ trong 90 giây khi tải tăng đột biến.',
        'Đã vượt qua bài kiểm thử tải mô phỏng 50.000 RPS với tỷ lệ lỗi dưới 0.001%.'
      ]
    },
    {
      id: 'p2',
      title: '2. Tiết kiệm 28% tổng chi phí sở hữu (TCO) trong 3 năm',
      evidence: [
        'Cắt giảm ngay 140.000 USD chi phí phạt gia hạn bảo trì cụm máy chủ cũ.',
        'Mô hình trả tiền theo dung lượng thực dùng (Pay-as-you-go) cho phép co cụm hạ tầng ngay sau đợt cao điểm.'
      ]
    },
    {
      id: 'p3',
      title: '3. Tăng tốc độ phát hành tính năng kỹ thuật lên gấp 3 lần',
      evidence: [
        'Chuẩn hóa hạ tầng bằng mã nguồn (Infrastructure as Code - Terraform).',
        'Rút ngắn chu kỳ release tính năng từ 4 ngày xuống còn dưới 35 phút.'
      ]
    }
  ] : [
    {
      id: 'p1',
      title: '1. Eliminate system outage risk with 99.99% availability',
      evidence: [
        'Auto-scale capacity from 10 to 500 nodes in under 90 seconds during unexpected spikes.',
        'Validated with 50,000 RPS simulated load test resulting in zero dropped connections.'
      ]
    },
    {
      id: 'p2',
      title: '2. Reduce 3-year Total Cost of Ownership (TCO) by 28%',
      evidence: [
        'Avoid $140,000 in legacy on-premise hardware renewal penalty fees.',
        'Elastic pay-as-you-go cloud billing scales down instantly post-peak season.'
      ]
    },
    {
      id: 'p3',
      title: '3. Accelerate product delivery release cycle 3x',
      evidence: [
        'Standardize environments using Infrastructure as Code (Terraform CI/CD pipelines).',
        'Production feature deployment lead time reduced from 4 days to 35 minutes.'
      ]
    }
  ];

  const [situation, setSituation] = useState(defaultSituation);
  const [complication, setComplication] = useState(defaultComplication);
  const [question, setQuestion] = useState(defaultQuestion);
  const [answer, setAnswer] = useState(defaultAnswer);
  const [pillars, setPillars] = useState<SupportingPillar[]>(defaultPillars);
  const [activeTab, setActiveTab] = useState<'scqa' | 'pyramid' | 'memo'>('scqa');
  const [copied, setCopied] = useState(false);

  // Pillar management
  const handlePillarTitleChange = (id: string, newTitle: string) => {
    setPillars(pillars.map(p => p.id === id ? { ...p, title: newTitle } : p));
  };

  const handleEvidenceChange = (pillarId: string, evidenceIndex: number, newText: string) => {
    setPillars(pillars.map(p => {
      if (p.id !== pillarId) return p;
      const updated = [...p.evidence];
      updated[evidenceIndex] = newText;
      return { ...p, evidence: updated };
    }));
  };

  const addEvidence = (pillarId: string) => {
    setPillars(pillars.map(p => {
      if (p.id !== pillarId) return p;
      return { ...p, evidence: [...p.evidence, lang === 'vi' ? 'Bằng chứng/Số liệu minh chứng mới...' : 'New supporting data metric...'] };
    }));
  };

  const removeEvidence = (pillarId: string, evidenceIndex: number) => {
    setPillars(pillars.map(p => {
      if (p.id !== pillarId) return p;
      return { ...p, evidence: p.evidence.filter((_, idx) => idx !== evidenceIndex) };
    }));
  };

  const addPillar = () => {
    if (pillars.length >= 5) return;
    const newId = `p${Date.now()}`;
    const newPillar: SupportingPillar = {
      id: newId,
      title: lang === 'vi' ? `${pillars.length + 1}. Trụ cột luận điểm mới (MECE)` : `${pillars.length + 1}. New Key-Line Pillar (MECE)`,
      evidence: [lang === 'vi' ? 'Số liệu kiểm chứng hoặc tiền lệ thực tế...' : 'Empirical benchmark or operational data...']
    };
    setPillars([...pillars, newPillar]);
  };

  const removePillar = (id: string) => {
    if (pillars.length <= 1) return;
    setPillars(pillars.filter(p => p.id !== id));
  };

  const exportReport = () => {
    if (lang === 'vi') {
      return `# Bản Ghi Chú Điều Hành: Kim Tự Tháp Minto & Mô Hình SCQA

## 1. Mở Đầu Theo Cốt Truyện SCQA (Executive Hook)
- **Bối cảnh (Situation):** ${situation}
- **Biến cố / Thách thức (Complication):** ${complication}
- **Câu hỏi chiến lược (Question):** ${question}
- **Khuyến nghị trọng tâm (Answer / BLUF):** ${answer}

---

## 2. Cấu Trúc Kim Tự Tháp Luận Điểm (Top-Down Logic Tree)

### [ĐỈNH THÁP - THÔNG ĐIỆP CỐT LÕI (GOVERNING THOUGHT)]
> **${answer}**

### [TẦNG 2 - CÁC TRỤ CỘT LUẬN ĐIỂM MECE (KEY-LINE PILLARS)]
${pillars.map(p => `#### ${p.title}
${p.evidence.map(e => `  - ${e}`).join('\n')}
`).join('\n')}

---
*Được tạo bởi Problem-Solving Framework Chooser - Bảng Kim Tự Tháp Minto & SCQA*
`;
    }

    return `# Executive Briefing Memo: The Minto Pyramid Principle & SCQA

## 1. SCQA Narrative Storyline (Executive Hook)
- **Situation:** ${situation}
- **Complication:** ${complication}
- **Question:** ${question}
- **Governing Answer (BLUF):** ${answer}

---

## 2. Top-Down Pyramid Logic Structure

### [APEX - GOVERNING THOUGHT (BOTTOM LINE UP FRONT)]
> **${answer}**

### [TIER 2 - MECE KEY-LINE SUPPORTING PILLARS]
${pillars.map(p => `#### ${p.title}
${p.evidence.map(e => `  - ${e}`).join('\n')}
`).join('\n')}

---
*Created with Problem-Solving Framework Chooser Minto Pyramid & SCQA Canvas*
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
    downloadFile(`minto-scqa-memo-${Date.now()}.md`, exportReport());
  };

  return (
    <div className="space-y-6 text-slate-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 font-mono text-sm">
              SCQA
            </span>
            {lang === 'vi' ? 'Bảng Kim Tự Tháp Minto & Mô Hình SCQA' : 'The Minto Pyramid Principle & SCQA Canvas'}
          </h3>
          <p className="text-sm text-slate-400">
            {lang === 'vi'
              ? 'Cấu trúc thông điệp lãnh đạo Top-Down (Answer-First) với cốt truyện mở đầu SCQA chuẩn mực McKinsey.'
              : 'Structure top-down executive communication with SCQA narrative storyline & MECE pyramid pillars.'}
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

      {/* Navigation View Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('scqa')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            activeTab === 'scqa'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <MessageSquareQuote className="w-3.5 h-3.5" />
          {lang === 'vi' ? '1. Cốt Truyện SCQA' : '1. SCQA Narrative Hook'}
        </button>
        <button
          onClick={() => setActiveTab('pyramid')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            activeTab === 'pyramid'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          {lang === 'vi' ? '2. Tháp Luận Điểm MECE' : '2. MECE Pyramid Pillars'}
        </button>
        <button
          onClick={() => setActiveTab('memo')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            activeTab === 'memo'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          {lang === 'vi' ? '3. Bản Tóm Tắt Điều Hành' : '3. Executive Memo Preview'}
        </button>
      </div>

      {/* TAB 1: SCQA STORYLINE */}
      {activeTab === 'scqa' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-3.5 text-xs text-indigo-300 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 mt-0.5 text-indigo-400 shrink-0" />
            <div>
              <strong className="font-semibold text-white">
                {lang === 'vi' ? 'Quy tắc vàng của Barbara Minto:' : 'Barbara Minto’s Golden Rule:'}
              </strong>{' '}
              {lang === 'vi'
                ? 'Hãy thu hút sự chú ý của người nghe trước bằng câu chuyện mà họ hoàn toàn đồng tình (S), giới thiệu biến cố kích hoạt (C), đặt câu hỏi then chốt (Q) rồi lập tức tung ra câu trả lời trọng tâm (A - BLUF).'
                : 'Hook stakeholder attention with unquestioned context (S), introduce the disruptive catalyst (C), articulate the core question (Q), and instantly deliver your governing answer (A - BLUF).'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Situation */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  S • {lang === 'vi' ? 'BỐI CẢNH (SITUATION)' : 'SITUATION'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {lang === 'vi' ? 'Sự thật hiển nhiên, không tranh cãi' : 'Non-controversial agreed reality'}
                </span>
              </div>
              <textarea
                rows={3}
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder={lang === 'vi' ? 'Mô tả bối cảnh hiện tại mà mọi người đều đồng ý...' : 'State the established status quo everyone agrees with...'}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
              />
            </div>

            {/* Complication */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  C • {lang === 'vi' ? 'BIẾN CỐ & THÁCH THỨC (COMPLICATION)' : 'COMPLICATION'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {lang === 'vi' ? 'Điều gì đã thay đổi / Đe dọa / Cơ hội' : 'The trigger or shift that creates tension'}
                </span>
              </div>
              <textarea
                rows={3}
                value={complication}
                onChange={(e) => setComplication(e.target.value)}
                placeholder={lang === 'vi' ? 'Điều gì đột ngột phát sinh tạo ra trở ngại hoặc đe dọa mục tiêu?...' : 'What changed or broke, forcing a decision?...'}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
              />
            </div>

            {/* Question */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Q • {lang === 'vi' ? 'CÂU HỎI THEN CHỐT (QUESTION)' : 'QUESTION'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {lang === 'vi' ? 'Chúng ta cần giải bài toán gì?' : 'The focal question demanding resolution'}
                </span>
              </div>
              <textarea
                rows={3}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={lang === 'vi' ? 'Đặt câu hỏi trọng tâm phát sinh từ biến cố trên...' : 'State the central question that arises from the complication...'}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed"
              />
            </div>

            {/* Answer */}
            <div className="rounded-xl border border-indigo-500/40 bg-indigo-950/20 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  A • {lang === 'vi' ? 'CÂU TRẢ LỜI TRỌNG TÂM (ANSWER / BLUF)' : 'ANSWER (GOVERNING THOUGHT)'}
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold">
                  {lang === 'vi' ? 'Đỉnh kim tự tháp (Bottom Line Up Front)' : 'Apex of the pyramid'}
                </span>
              </div>
              <textarea
                rows={3}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={lang === 'vi' ? 'Khuyến nghị hành động cốt lõi rõ ràng trong 1 câu duy nhất...' : 'State your core recommendation or answer clearly in 1 sentence...'}
                className="w-full bg-slate-950 border border-indigo-500/40 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-400 font-medium leading-relaxed"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveTab('pyramid')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md"
            >
              {lang === 'vi' ? 'Chuyển sang Xây dựng Tháp Luận Điểm' : 'Proceed to Build Pyramid Pillars'} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: PYRAMID STRUCTURE */}
      {activeTab === 'pyramid' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* APEX LEVEL */}
          <div className="rounded-2xl border-2 border-indigo-500/60 bg-gradient-to-b from-indigo-950/60 to-slate-900/60 p-5 text-center space-y-2 shadow-lg">
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20">
              {lang === 'vi' ? 'TẦNG 1: ĐỈNH KIM TỰ THÁP (THÔNG ĐIỆP CỐT LÕI / GOVERNING THOUGHT)' : 'TIER 1: PYRAMID APEX (GOVERNING THOUGHT / BLUF)'}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-white max-w-3xl mx-auto pt-1">
              "{answer}"
            </h4>
            <p className="text-xs text-slate-400">
              {lang === 'vi' ? 'Được nâng đỡ bằng các trụ cột MECE độc lập bên dưới:' : 'Directly supported by the MECE key-line pillars below:'}
            </p>
          </div>

          {/* TIER 2: PILLARS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">
                  {lang === 'vi' ? 'TẦNG 2: CÁC TRỤ CỘT LUẬN ĐIỂM (KEY-LINE PILLARS)' : 'TIER 2: SUPPORTING MECE PILLARS'}
                </h4>
                <p className="text-xs text-slate-400">
                  {lang === 'vi'
                    ? 'Mỗi trụ cột trả lời câu hỏi "Tại sao?" hoặc "Làm thế nào?" cho thông điệp đỉnh tháp.'
                    : 'Each pillar answers "Why?" or "How?" for the governing thought at the apex.'}
                </p>
              </div>

              {pillars.length < 5 && (
                <button
                  onClick={addPillar}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition-colors border border-slate-700"
                >
                  <Plus className="w-3.5 h-3.5 text-indigo-400" />
                  {lang === 'vi' ? 'Thêm Trụ Cột' : 'Add Pillar'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pillars.map((pillar) => (
                <div
                  key={pillar.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider">
                        {lang === 'vi' ? 'Luận Điểm Trụ Cột' : 'Key-Line Pillar'}
                      </span>
                      {pillars.length > 1 && (
                        <button
                          onClick={() => removePillar(pillar.id)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                          title={lang === 'vi' ? 'Xóa trụ cột' : 'Delete pillar'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={pillar.title}
                      onChange={(e) => handlePillarTitleChange(pillar.id, e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />

                    {/* Evidence Points */}
                    <div className="space-y-2 pt-2">
                      <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <CheckSquare className="w-3 h-3 text-emerald-400" />
                        {lang === 'vi' ? 'Số liệu / Bằng chứng minh chứng:' : 'Evidentiary Data & Metrics:'}
                      </label>

                      {pillar.evidence.map((ev, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <textarea
                            rows={2}
                            value={ev}
                            onChange={(e) => handleEvidenceChange(pillar.id, idx, e.target.value)}
                            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-[11px] text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-snug"
                          />
                          {pillar.evidence.length > 1 && (
                            <button
                              onClick={() => removeEvidence(pillar.id, idx)}
                              className="text-slate-600 hover:text-rose-400 p-1 mt-1"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        onClick={() => addEvidence(pillar.id)}
                        className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 pt-1 font-medium"
                      >
                        <Plus className="w-3 h-3" /> {lang === 'vi' ? 'Thêm bằng chứng' : 'Add metric'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: EXECUTIVE MEMO PREVIEW */}
      {activeTab === 'memo' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
              {lang === 'vi' ? 'BẢN GHI CHÚ ĐIỀU HÀNH CHUẨN MỰC MCKINSEY' : 'MCKINSEY-STANDARD EXECUTIVE MEMO'}
            </span>
            <h3 className="text-xl font-bold text-white mt-2">
              {lang === 'vi' ? 'Đề Xuất & Khuyến Nghị Quyết Định' : 'Strategic Recommendation & Executive Briefing'}
            </h3>
          </div>

          {/* Narrative Hook */}
          <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 space-y-2 text-xs leading-relaxed">
            <h4 className="font-bold text-indigo-400 uppercase tracking-wider text-[11px]">
              {lang === 'vi' ? 'Bối Cảnh & Vấn Đề (SCQA Narrative Context)' : 'Context & Strategic Dilemma (SCQA)'}
            </h4>
            <p className="text-slate-300"><strong className="text-white">{lang === 'vi' ? 'Bối cảnh:' : 'Situation:'}</strong> {situation}</p>
            <p className="text-slate-300"><strong className="text-white">{lang === 'vi' ? 'Biến cố:' : 'Complication:'}</strong> {complication}</p>
            <p className="text-slate-300"><strong className="text-white">{lang === 'vi' ? 'Câu hỏi cốt lõi:' : 'Focal Question:'}</strong> {question}</p>
          </div>

          {/* Governing Recommendation */}
          <div className="bg-indigo-950/30 rounded-xl p-4 border border-indigo-500/40 text-xs space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-emerald-400">
              {lang === 'vi' ? 'KHUYẾN NGHỊ HÀNH ĐỘNG (ANSWER / BOTTOM LINE UP FRONT)' : 'CORE RECOMMENDATION (BLUF)'}
            </span>
            <p className="text-sm font-bold text-white pt-1">
              {answer}
            </p>
          </div>

          {/* Detailed Pillars */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {lang === 'vi' ? 'Các Luận Điểm Chiến Lược Nâng Đỡ (Supporting Pillars)' : 'Strategic Pillars & Supporting Evidence'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {pillars.map(p => (
                <div key={p.id} className="bg-slate-950/50 rounded-lg p-3 border border-slate-800 text-xs space-y-2">
                  <div className="font-bold text-white text-xs">{p.title}</div>
                  <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
                    {p.evidence.map((ev, idx) => (
                      <li key={idx}>{ev}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
