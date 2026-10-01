import React, { useState } from 'react';
import { Sparkles, Copy, Download, CheckCircle2 } from 'lucide-react';
import { copyToClipboard, downloadFile } from '../../utils/export';

interface ScamperPrompt {
  letter: string;
  word: string;
  prompt: string;
  questionStarters: string[];
}

const SCAMPER_PROMPTS: ScamperPrompt[] = [
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

export const ScamperCanvas: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('S');
  const [topic, setTopic] = useState('Redesigning the customer SaaS onboarding tour');
  const [ideas, setIdeas] = useState<Record<string, string>>({
    S: 'Substitute generic video tours with interactive live workspace sandbox prepopulated with demo data.',
    C: 'Combine initial account setup with immediate Slack / Teams integration invitation.',
    A: 'Adapt video game tutorial progression (quest rewards and achievements) for software activation.',
    M: 'Magnify the first "Aha!" moment so users experience core value within 30 seconds of signup.',
    P: 'Put customer onboarding telemetry to use as an automated early-warning churn detector.',
    E: 'Eliminate required email confirmation before letting user interact with the workspace.',
    R: 'Reverse the order: Let users build a working project first; ask them to sign up only when saving.'
  });
  const [copied, setCopied] = useState(false);

  const currentPrompt = SCAMPER_PROMPTS.find(p => p.letter === activeTab) || SCAMPER_PROMPTS[0];

  const exportReport = () => {
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
            SCAMPER Lateral Ideation Canvas
          </h3>
          <p className="text-sm text-slate-400">Mutate existing features through 7 lateral provocation vectors.</p>
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
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-pink-600 hover:bg-pink-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Export .md
          </button>
        </div>
      </div>

      {/* Target Focus Subject */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Product / Feature to Mutate
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="State what workflow or product you want to innovate..."
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
            Thought-Starter Inquiries:
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
            Your Creative Ideas for [{currentPrompt.word}]:
          </label>
          <textarea
            rows={4}
            value={ideas[currentPrompt.letter] || ''}
            onChange={(e) => setIdeas({ ...ideas, [currentPrompt.letter]: e.target.value })}
            placeholder={`Brainstorm ideas on how to ${currentPrompt.word.toLowerCase()} this challenge...`}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
        </div>
      </div>
    </div>
  );
};
