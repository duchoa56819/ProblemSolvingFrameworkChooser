import React, { useState } from 'react';
import { Sparkles, Copy, Download, CheckCircle2 } from 'lucide-react';
import { copyToClipboard, downloadFile } from '../../utils/export';
import { useLanguage } from '../../i18n/LanguageContext';

interface ScamperPrompt {
  letter: string;
  word: string;
  prompt: string;
  questionStarters: string[];
}

export const ScamperCanvas: React.FC = () => {
  const { lang } = useLanguage();

  const SCAMPER_PROMPTS: ScamperPrompt[] = lang === 'vi' ? [
    {
      letter: 'S',
      word: 'Thay thế (Substitute)',
      prompt: 'Thành phần, vật liệu, nhân sự hoặc bước quy trình nào có thể thay thế bằng thứ khác tốt hơn?',
      questionStarters: [
        'Có thể thay thế lệnh gọi đồng bộ (sync) bằng hàng đợi tin nhắn bất đồng bộ (async queue) không?',
        'Có thể thay thế việc nhập liệu thủ công bằng quét sinh trắc học hoặc trích xuất AI không?',
        'Điều gì xảy ra nếu chúng ta đổi nhà cung cấp dịch vụ hoặc nền tảng công nghệ cốt lõi?'
      ]
    },
    {
      letter: 'C',
      word: 'Kết hợp (Combine)',
      prompt: 'Những tính năng, dịch vụ hoặc chức năng rời rạc nào có thể tích hợp thành một thể thống nhất?',
      questionStarters: [
        'Có thể kết hợp bước thanh toán và thông báo tiến độ giao hàng vào một điểm chạm duy nhất?',
        'Có thể gộp chức năng gửi phản hồi khách hàng và báo cáo lỗi trực tiếp ngay trên màn hình app?',
        'Điều gì sẽ xảy ra nếu sản phẩm kết hợp thế mạnh của hai mô hình hàng đầu thị trường?'
      ]
    },
    {
      letter: 'A',
      word: 'Thích ứng (Adapt)',
      prompt: 'Ý tưởng nào từ ngành nghề khác, từ tự nhiên hoặc đối thủ có thể mượn để áp dụng vào vấn đề này?',
      questionStarters: [
        'Cơ chế làm nhiệm vụ trong game hoặc bảng kiểm an toàn hàng không xử lý vấn đề này ra sao?',
        'Có thể áp dụng thuật toán tính giá linh hoạt hoặc theo dõi trực tiếp thời gian thực của xe công nghệ?',
        'Trong hệ sinh thái tự nhiên có giải pháp thích ứng tương đồng nào không?'
      ]
    },
    {
      letter: 'M',
      word: 'Phóng đại (Modify/Magnify)',
      prompt: 'Yếu tố nào có thể phóng to, cường điệu hóa vượt trội hoặc thu nhỏ tối đa?',
      questionStarters: [
        'Điều gì sẽ xảy ra nếu tính năng này xử lý nhanh gấp 100 lần, hoặc độ trễ tiệm cận bằng 0?',
        'Nếu chúng ta biến một tính năng phụ ít người để ý thành điểm bán hàng độc nhất (USP)?',
        'Giao diện sẽ ra sao nếu được tinh giản tối đa hoặc hiển thị mật độ thông tin chuyên sâu cao?'
      ]
    },
    {
      letter: 'P',
      word: 'Chuyển đổi mục đích (Put to other use)',
      prompt: 'Công cụ, dữ liệu hoặc sản phẩm phụ hiện có này có thể giải quyết bài toán nào hoàn toàn khác?',
      questionStarters: [
        'Công cụ nội bộ của đội ngũ kỹ thuật có thể đóng gói thành dịch vụ B2B bán ra ngoài (như AWS)?',
        'Người cao tuổi, trẻ em hoặc người khiếm thị có thể sử dụng giải pháp này như thế nào?',
        'Dữ liệu nhật ký hệ thống có thể chuyển đổi thành mô hình dự báo hành vi thông minh?'
      ]
    },
    {
      letter: 'E',
      word: 'Loại bỏ (Eliminate)',
      prompt: 'Sự phức tạp, nút bấm, bước phê duyệt hoặc quy tắc rườm rà nào có thể xóa bỏ triệt để?',
      questionStarters: [
        'Nếu hoàn toàn không cần mật khẩu (đăng nhập sinh trắc học Passkey/WebAuthn)?',
        'Nếu loại bỏ hoàn toàn các trường biểu mẫu thanh toán phức tạp?',
        '80% tùy chọn cấu hình nào trong hệ thống mà người dùng gần như không bao giờ dùng?'
      ]
    },
    {
      letter: 'R',
      word: 'Đảo ngược (Reverse/Rearrange)',
      prompt: 'Điều gì xảy ra nếu đảo ngược hoàn toàn trình tự các bước, vai trò hoặc kỳ vọng thông thường?',
      questionStarters: [
        'Nếu người dùng nhận được giá trị trước khi phải tạo tài khoản (thử nghiệm trước - đăng ký sau)?',
        'Nếu đảo ngược luồng thanh toán: người dùng được nhận ưu đãi trước (mô hình khuyến khích)?',
        'Nếu kết quả đầu ra được tạo trước, còn dữ liệu đầu vào được bổ sung sau?'
      ]
    }
  ] : [
    {
      letter: 'S',
      word: 'Substitute',
      prompt: 'What components, materials, personnel, or steps can be swapped for something else?',
      questionStarters: [
        'Can we substitute a synchronous call with an asynchronous message queue?',
        'Can we substitute manual data entry with biometric scanning or AI extraction?',
        'What happens if we swap the primary supplier or tech stack?'
      ]
    },
    {
      letter: 'C',
      word: 'Combine',
      prompt: 'What disparate features, services, or functions can be merged into a unified whole?',
      questionStarters: [
        'Can we bundle payment and shipping notification into a single touchpoint?',
        'Can we merge customer feedback with bug report submission directly in-app?',
        'What if our product combined features of two unrelated market winners?'
      ]
    },
    {
      letter: 'A',
      word: 'Adapt',
      prompt: 'What ideas from other industries, nature, or competitors can be adapted to this problem?',
      questionStarters: [
        'How does video game mechanics or aviation checklists solve this problem?',
        'Can we adapt ride-sharing surge pricing or live tracking to our domain?',
        'What parallel solution exists in biological ecosystems?'
      ]
    },
    {
      letter: 'M',
      word: 'Modify / Magnify',
      prompt: 'What can be exaggerated, enlarged, amplified, or shrunk down to the extreme?',
      questionStarters: [
        'What if this feature was 100x faster, or had zero latency?',
        'What if we magnified the most obscure edge case to be the core value prop?',
        'What happens if we make the interface micro-minimalist or hyper-dense?'
      ]
    },
    {
      letter: 'P',
      word: 'Put to Another Use',
      prompt: 'How could this existing tool, asset, or byproduct solve a completely different problem?',
      questionStarters: [
        'Can our internal developer tooling be open-sourced or sold as a standalone B2B product (like AWS)?',
        'How could a child, an elderly person, or a blind user use this product?',
        'Can waste data logs be repurposed into predictive intelligence?'
      ]
    },
    {
      letter: 'E',
      word: 'Eliminate',
      prompt: 'What non-essential complexity, buttons, steps, or rules can be radically deleted?',
      questionStarters: [
        'What if there were zero passwords (passwordless WebAuthn)?',
        'What if we eliminated the checkout form entirely?',
        'Which 80% of settings do customers never touch?'
      ]
    },
    {
      letter: 'R',
      word: 'Reverse / Rearrange',
      prompt: 'What happens if you turn the sequence, roles, or expectations completely backwards?',
      questionStarters: [
        'What if the user received value before ever creating an account (try-before-buy)?',
        'What if we reverse who pays whom (freemium incentive model)?',
        'What if the output is generated first, and the input is requested later?'
      ]
    }
  ];

  const defaultTopic = lang === 'vi'
    ? 'Tái thiết kế quy trình hướng dẫn người dùng mới (onboarding) của nền tảng SaaS'
    : 'Redesigning the customer SaaS onboarding tour';

  const defaultIdeas = lang === 'vi' ? {
    S: 'Thay thế video hướng dẫn thụ động bằng không gian trải nghiệm thực tế (sandbox) chứa sẵn dữ liệu mẫu sinh động.',
    C: 'Kết hợp bước kích hoạt tài khoản ban đầu với lời mời tích hợp ngay vào Slack / Teams của đội ngũ.',
    A: 'Áp dụng cơ chế nhiệm vụ và nhận huy hiệu thành tích của trò chơi điện tử vào quá trình làm quen phần mềm.',
    M: 'Khuếch đại khoảnh khắc "Aha!" đầu tiên để người dùng cảm nhận được giá trị cốt lõi chỉ trong 30 giây đầu tiên.',
    P: 'Tận dụng dữ liệu thao tác của người dùng trong bước onboarding làm tín hiệu cảnh báo sớm nguy cơ rời bỏ nền tảng.',
    E: 'Loại bỏ bước bắt buộc xác nhận email phiền toái trước khi cho phép người dùng trải nghiệm không gian làm việc.',
    R: 'Đảo ngược trình tự: Cho phép người dùng tạo ngay dự án trước, chỉ yêu cầu đăng ký khi họ muốn lưu lại kết quả.'
  } : {
    S: 'Substitute generic video tours with interactive live workspace sandbox prepopulated with demo data.',
    C: 'Combine initial account setup with immediate Slack / Teams integration invitation.',
    A: 'Adapt video game tutorial progression (quest rewards and achievements) for software activation.',
    M: 'Magnify the first "Aha!" moment so users experience core value within 30 seconds of signup.',
    P: 'Put customer onboarding telemetry to use as an automated early-warning churn detector.',
    E: 'Eliminate required email confirmation before letting user interact with the workspace.',
    R: 'Reverse the order: Let users build a working project first; ask them to sign up only when saving.'
  };

  const [activeTab, setActiveTab] = useState<string>('S');
  const [topic, setTopic] = useState(defaultTopic);
  const [ideas, setIdeas] = useState<Record<string, string>>(defaultIdeas);
  const [copied, setCopied] = useState(false);

  const currentPrompt = SCAMPER_PROMPTS.find(p => p.letter === activeTab) || SCAMPER_PROMPTS[0];

  const exportReport = () => {
    if (lang === 'vi') {
      return `# Kế Hoạch Đổi Mới Sáng Tạo Đa Chiều SCAMPER

## Chủ đề / Thách thức Đổi mới:
${topic}

${SCAMPER_PROMPTS.map(p => `### [${p.letter}] ${p.word}
*Câu hỏi gợi mở:* ${p.prompt}
**Ý tưởng phát kiến:**
${ideas[p.letter] || '(Chưa ghi nhận ý tưởng)'}
`).join('\n')}

---
*Được tạo bởi Problem-Solving Framework Chooser - Bảng SCAMPER*
`;
    }

    return `# SCAMPER Lateral Ideation Playbook

## Target Subject / Challenge:
${topic}

${SCAMPER_PROMPTS.map(p => `### [${p.letter}] ${p.word}
*Prompt:* ${p.prompt}
**Generated Idea:**
${ideas[p.letter] || '(No ideas recorded)'}
`).join('\n')}

---
*Created with Problem-Solving Framework Chooser SCAMPER Canvas*
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
    downloadFile(`scamper-ideation-${Date.now()}.md`, exportReport());
  };

  return (
    <div className="space-y-6 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-500/20 text-pink-400 font-mono text-sm">
              SCM
            </span>
            {lang === 'vi' ? 'Bảng Động Não Sáng Tạo Đa Chiều SCAMPER' : 'SCAMPER Lateral Ideation Canvas'}
          </h3>
          <p className="text-sm text-slate-400">
            {lang === 'vi'
              ? 'Đột phá và biến đổi tính năng/sản phẩm thông qua 7 hướng kích thích tư duy sáng tạo.'
              : 'Mutate existing features through 7 lateral provocation vectors.'}
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
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-pink-600 hover:bg-pink-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> {lang === 'vi' ? 'Xuất .md' : 'Export .md'}
          </button>
        </div>
      </div>

      {/* Target Focus Subject */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> {lang === 'vi' ? 'Sản phẩm / Tính năng cần đột phá sáng tạo' : 'Product / Feature to Mutate'}
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={lang === 'vi' ? 'Nhập quy trình, sản phẩm hoặc tính năng bạn muốn đổi mới...' : 'State what workflow or product you want to innovate...'}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-pink-500"
        />
      </div>

      {/* 7 SCAMPER Letter Tabs */}
      <div className="grid grid-cols-7 gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
        {SCAMPER_PROMPTS.map(p => {
          const isActive = activeTab === p.letter;
          const hasContent = !!ideas[p.letter]?.trim();

          return (
            <button
              key={p.letter}
              onClick={() => setActiveTab(p.letter)}
              className={`py-2 px-1 text-center rounded-lg transition-all ${
                isActive
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="font-mono font-bold text-sm">{p.letter}</div>
              <div className="text-[10px] truncate hidden sm:block">{p.word}</div>
              {hasContent && (
                <div className="w-1.5 h-1.5 mx-auto mt-0.5 rounded-full bg-pink-300"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Tab Prompt & Ideas Editor */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold font-mono text-pink-400">[{currentPrompt.letter}]</span>
            <h4 className="text-lg font-bold text-white">{currentPrompt.word}</h4>
          </div>
          <p className="text-sm text-slate-300">{currentPrompt.prompt}</p>
        </div>

        {/* Thought starters */}
        <div className="space-y-1.5 bg-slate-950/70 p-3 rounded-lg border border-slate-800 text-xs">
          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
            {lang === 'vi' ? 'Câu hỏi gợi ý kích hoạt tư duy:' : 'Thought-Starter Inquiries:'}
          </span>
          <ul className="list-disc pl-4 space-y-1 text-slate-400">
            {currentPrompt.questionStarters.map((q, idx) => (
              <li key={idx}>{q}</li>
            ))}
          </ul>
        </div>

        {/* Textarea for this letter */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {lang === 'vi' ? `Ý tưởng sáng tạo của bạn cho [${currentPrompt.word}]:` : `Your Creative Ideas for [${currentPrompt.word}]:`}
          </label>
          <textarea
            rows={4}
            value={ideas[currentPrompt.letter] || ''}
            onChange={(e) => setIdeas({ ...ideas, [currentPrompt.letter]: e.target.value })}
            placeholder={lang === 'vi' ? `Động não các ý tưởng sáng tạo cho [${currentPrompt.word}]...` : `Brainstorm ideas on how to ${currentPrompt.word.toLowerCase()} this challenge...`}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
        </div>
      </div>
    </div>
  );
};
