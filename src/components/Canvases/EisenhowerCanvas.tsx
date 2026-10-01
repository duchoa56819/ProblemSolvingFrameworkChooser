import React, { useState } from 'react';
import { Plus, X, Check, Copy, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { copyToClipboard, downloadFile } from '../../utils/export';
import { useLanguage } from '../../i18n/LanguageContext';

type QuadrantId = 'q1' | 'q2' | 'q3' | 'q4';

interface Task {
  id: string;
  title: string;
  quadrant: QuadrantId;
  completed: boolean;
}

export const EisenhowerCanvas: React.FC = () => {
  const { lang } = useLanguage();

  const QUADRANTS: Record<QuadrantId, {
    name: string;
    action: string;
    color: string;
    border: string;
    desc: string;
  }> = {
    q1: {
      name: lang === 'vi' ? 'Q1: Khẩn cấp & Quan trọng' : 'Q1: Urgent & Important',
      action: lang === 'vi' ? 'LÀM NGAY LẬP TỨC' : 'DO IMMEDIATELY',
      color: 'text-rose-400 bg-rose-950/30',
      border: 'border-rose-500/40',
      desc: lang === 'vi' ? 'Khủng hoảng, sự cố hệ thống nghiêm trọng, hạn chót nguy cấp.' : 'Crises, system outages, deadline-driven emergencies.'
    },
    q2: {
      name: lang === 'vi' ? 'Q2: Quan trọng, Không khẩn cấp' : 'Q2: Not Urgent, but Important',
      action: lang === 'vi' ? 'LÊN LỊCH TẬP TRUNG SÂU' : 'SCHEDULE DEEP WORK',
      color: 'text-emerald-400 bg-emerald-950/30',
      border: 'border-emerald-500/40',
      desc: lang === 'vi' ? 'Quy hoạch chiến lược, tối ưu kiến trúc, phòng ngừa rủi ro, đào tạo.' : 'Strategic planning, refactoring, health, relationships.'
    },
    q3: {
      name: lang === 'vi' ? 'Q3: Khẩn cấp, Không quan trọng' : 'Q3: Urgent, Not Important',
      action: lang === 'vi' ? 'ỦY QUYỀN / TỰ ĐỘNG HÓA' : 'DELEGATE / AUTOMATE',
      color: 'text-amber-400 bg-amber-950/30',
      border: 'border-amber-500/40',
      desc: lang === 'vi' ? 'Sự gián đoạn, họp đột xuất, việc phát sinh không nằm trong mục tiêu cốt lõi.' : 'Interruptions, ad-hoc meetings, other people’s fires.'
    },
    q4: {
      name: lang === 'vi' ? 'Q4: Không khẩn cấp & Không quan trọng' : 'Q4: Not Urgent & Not Important',
      action: lang === 'vi' ? 'LOẠI BỎ / CẮT GIẢM' : 'ELIMINATE / PURGE',
      color: 'text-slate-400 bg-slate-900/60',
      border: 'border-slate-800',
      desc: lang === 'vi' ? 'Việc lãng phí thời gian, các cuộc họp vô bổ, việc không đem lại giá trị.' : 'Mindless scrolling, vanity tasks, obsolete syncs.'
    }
  };

  const defaultTasks: Task[] = lang === 'vi' ? [
    { id: '1', title: 'Khắc phục sự cố nghẽn kết nối cơ sở dữ liệu trên production', quadrant: 'q1', completed: false },
    { id: '2', title: 'Thiết kế kiến trúc kiểm thử tự động integration test suite', quadrant: 'q2', completed: false },
    { id: '3', title: 'Tài liệu hóa kiến trúc hệ thống & đào tạo nội bộ hàng tuần', quadrant: 'q2', completed: false },
    { id: '4', title: 'Trả lời các email chào hàng không khẩn cấp của đối tác', quadrant: 'q3', completed: false },
    { id: '5', title: 'Tham gia cuộc họp cập nhật tiến độ 45 phút không có chương trình nghị sự', quadrant: 'q4', completed: false }
  ] : [
    { id: '1', title: 'Fix database connection timeout bug on production', quadrant: 'q1', completed: false },
    { id: '2', title: 'Design automated integration test suite architecture', quadrant: 'q2', completed: false },
    { id: '3', title: 'Weekly architecture documentation & knowledge sharing', quadrant: 'q2', completed: false },
    { id: '4', title: 'Reply to non-urgent general vendor emails', quadrant: 'q3', completed: false },
    { id: '5', title: 'Attend 45-minute status meeting with no active agenda', quadrant: 'q4', completed: false }
  ];

  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [newTaskText, setNewTaskText] = useState('');
  const [selectedQuadrant, setSelectedQuadrant] = useState<QuadrantId>('q2');
  const [copied, setCopied] = useState(false);

  const addTask = () => {
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskText.trim(),
      quadrant: selectedQuadrant,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const moveTask = (id: string, targetQuadrant: QuadrantId) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, quadrant: targetQuadrant } : t))
    );
  };

  // Calculate percentage of tasks in Q2
  const totalTasks = tasks.length || 1;
  const q2Tasks = tasks.filter(t => t.quadrant === 'q2').length;
  const q2Percentage = Math.round((q2Tasks / totalTasks) * 100);

  const exportReport = () => {
    if (lang === 'vi') {
      return `# Báo Cáo Ma Trận Ưu Tiên Eisenhower

## Chỉ số Sức Khỏe Q2 Chiến Lược: ${q2Percentage}% công việc thuộc Góc phần tư 2 (Chiến lược & Đòn bẩy cao)

${(Object.keys(QUADRANTS) as QuadrantId[]).map(qKey => {
  const qTasks = tasks.filter(t => t.quadrant === qKey);
  const qInfo = QUADRANTS[qKey];
  return `### ${qInfo.name} (${qInfo.action})
${qTasks.length ? qTasks.map(t => `- [${t.completed ? 'x' : ' '}] ${t.title}`).join('\n') : '- (Không có)'}
`;
}).join('\n')}

---
*Được tạo bởi Problem-Solving Framework Chooser - Bảng Eisenhower*
`;
    }

    return `# Eisenhower Priority Matrix

## Strategic Q2 Health Ratio: ${q2Percentage}% of tasks in High-Leverage Strategic Planning

${(Object.keys(QUADRANTS) as QuadrantId[]).map(qKey => {
  const qTasks = tasks.filter(t => t.quadrant === qKey);
  const qInfo = QUADRANTS[qKey];
  return `### ${qInfo.name} (${qInfo.action})
${qTasks.length ? qTasks.map(t => `- [${t.completed ? 'x' : ' '}] ${t.title}`).join('\n') : '- (None)'}
`;
}).join('\n')}

---
*Created with Problem-Solving Framework Chooser Eisenhower Matrix*
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
    downloadFile(`eisenhower-matrix-${Date.now()}.md`, exportReport());
  };

  return (
    <div className="space-y-6 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-sm">
              EIS
            </span>
            {lang === 'vi' ? 'Bảng Ma Trận Ưu Tiên Eisenhower' : 'Eisenhower Matrix Board'}
          </h3>
          <p className="text-sm text-slate-400">
            {lang === 'vi'
              ? 'Bảo vệ thời gian làm việc chiến lược Đòn bẩy cao (Góc Q2) khỏi những áp lực khẩn cấp.'
              : 'Protect high-leverage Quadrant 2 strategic deep work from urgent noise.'}
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

      {/* Add task bar */}
      <div className="flex flex-wrap sm:flex-nowrap gap-2 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder={lang === 'vi' ? 'Nhập tên công việc hoặc sáng kiến cần sắp xếp...' : 'Enter task or initiative name...'}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        <select
          value={selectedQuadrant}
          onChange={(e) => setSelectedQuadrant(e.target.value as QuadrantId)}
          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
        >
          <option value="q1">{lang === 'vi' ? 'Q1: Khẩn cấp & Quan trọng (Làm ngay)' : 'Q1: Urgent & Important (Do)'}</option>
          <option value="q2">{lang === 'vi' ? 'Q2: Quan trọng, Không khẩn cấp (Lên lịch)' : 'Q2: Important, Not Urgent (Schedule)'}</option>
          <option value="q3">{lang === 'vi' ? 'Q3: Khẩn cấp, Không quan trọng (Ủy quyền)' : 'Q3: Urgent, Not Important (Delegate)'}</option>
          <option value="q4">{lang === 'vi' ? 'Q4: Không quan trọng & Không khẩn (Loại bỏ)' : 'Q4: Neither (Eliminate)'}</option>
        </select>
        <button
          onClick={addTask}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> {lang === 'vi' ? 'Thêm việc' : 'Add Task'}
        </button>
      </div>

      {/* Q2 Health Index Metric Bar */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold text-slate-300">
            {lang === 'vi' ? (
              <>Chỉ số sức khỏe Góc Q2: <strong className="text-emerald-400">{q2Percentage}%</strong> công việc thuộc phát triển chiến lược dài hạn</>
            ) : (
              <>Quadrant 2 Health Index: <strong className="text-emerald-400">{q2Percentage}%</strong> of backlog in high-leverage strategic growth</>
            )}
          </span>
        </div>
        <span className="text-[11px] text-slate-500">{lang === 'vi' ? 'Mục tiêu: > 50%' : 'Target: > 50%'}</span>
      </div>

      {/* 4 Quadrants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(Object.keys(QUADRANTS) as QuadrantId[]).map(qKey => {
          const q = QUADRANTS[qKey];
          const qTasks = tasks.filter(t => t.quadrant === qKey);

          return (
            <div
              key={qKey}
              className={`rounded-xl border ${q.border} bg-slate-900/50 p-4 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-white">{q.name}</h4>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${q.color}`}>
                    {q.action}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mb-3">{q.desc}</p>

                {/* Task list */}
                <div className="space-y-2 min-h-[120px]">
                  {qTasks.map(task => (
                    <div
                      key={task.id}
                      className="group flex items-center justify-between gap-2 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80 text-xs"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`h-4 w-4 rounded flex items-center justify-center border transition-colors ${
                            task.completed
                              ? 'bg-emerald-600 border-emerald-500 text-white'
                              : 'border-slate-600 hover:border-slate-400'
                          }`}
                        >
                          {task.completed && <Check className="w-3 h-3" />}
                        </button>
                        <span className={`truncate ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                          {task.title}
                        </span>
                      </div>

                      {/* Move dropdown & delete */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <select
                          value={task.quadrant}
                          onChange={(e) => moveTask(task.id, e.target.value as QuadrantId)}
                          className="bg-slate-900 text-[10px] text-slate-400 border border-slate-800 rounded px-1 py-0.5"
                        >
                          <option value="q1">→ Q1</option>
                          <option value="q2">→ Q2</option>
                          <option value="q3">→ Q3</option>
                          <option value="q4">→ Q4</option>
                        </select>
                        <button
                          onClick={() => removeTask(task.id)}
                          className="text-slate-500 hover:text-rose-400 p-0.5"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {qTasks.length === 0 && (
                    <div className="text-xs text-slate-600 italic py-6 text-center">
                      {lang === 'vi' ? 'Chưa có công việc nào trong góc phần tư này' : 'No tasks in this quadrant'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
