import { useState, useEffect, useMemo } from 'react';
import { Framework, FrameworkCategory, ComplexityLevel, Timeframe, CanvasType } from './types/framework';
import { FRAMEWORKS, CATEGORY_METADATA } from './data/frameworks';
import { FRAMEWORKS_VI } from './data/frameworksVi';
import { useLanguage } from './i18n/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FrameworkCard } from './components/Encyclopedia/FrameworkCard';
import { FrameworkModal } from './components/Encyclopedia/FrameworkModal';
import { WizardModal } from './components/Wizard/WizardModal';
import { MatrixView } from './components/Matrix/MatrixView';
import { CanvasModal } from './components/Canvases/CanvasModal';
import { CompareModal } from './components/Compare/CompareModal';
import { 
  Filter, Play, Sparkles, 
  RotateCcw, ArrowRight 
} from 'lucide-react';
import { GithubIcon } from './components/GithubIcon';

export default function App() {
  const { lang, t } = useLanguage();
  const allFrameworks = lang === 'vi' ? FRAMEWORKS_VI : FRAMEWORKS;

  // Navigation & View state
  const [activeView, setActiveView] = useState<'library' | 'matrix' | 'canvases'>('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FrameworkCategory | 'all'>('all');
  const [selectedComplexity, setSelectedComplexity] = useState<ComplexityLevel | 'all'>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe | 'all'>('all');

  // Bookmarks & Compare State (with LocalStorage)
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ps_framework_bookmarks');
      return saved ? JSON.parse(saved) : ['five-whys', 'cynefin', 'rice-scoring'];
    } catch {
      return ['five-whys', 'cynefin', 'rice-scoring'];
    }
  });

  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);

  const [compareIds, setCompareIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ps_framework_compare');
      return saved ? JSON.parse(saved) : ['five-whys', 'fishbone'];
    } catch {
      return ['five-whys', 'fishbone'];
    }
  });

  // Modals state
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null);
  const [activeCanvas, setActiveCanvas] = useState<CanvasType | null>(null);

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ps_framework_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  // Sync compareIds to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ps_framework_compare', JSON.stringify(compareIds));
    } catch (e) {
      console.error(e);
    }
  }, [compareIds]);

  // Keyboard shortcut listener (Esc to close, / to search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedFramework(null);
        setActiveCanvas(null);
        setIsWizardOpen(false);
        setIsCompareOpen(false);
      }
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toggle Bookmark
  const toggleBookmark = (id: string) => {
    setBookmarks(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Toggle Compare
  const toggleCompare = (id: string) => {
    setCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        if (prev.length >= 3) {
          alert(lang === 'vi' ? 'Bạn chỉ có thể so sánh tối đa 3 phương pháp cùng lúc.' : 'You can compare a maximum of 3 frameworks side by side.');
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  const clearCompare = () => setCompareIds([]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedComplexity('all');
    setSelectedTimeframe('all');
    setShowOnlyBookmarks(false);
  };

  // Filtered Frameworks computation
  const filteredFrameworks = useMemo(() => {
    return allFrameworks.filter(fw => {
      // Bookmark filter
      if (showOnlyBookmarks && !bookmarks.includes(fw.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && fw.category !== selectedCategory) {
        return false;
      }

      // Complexity filter
      if (selectedComplexity !== 'all' && fw.complexity !== selectedComplexity) {
        return false;
      }

      // Timeframe filter
      if (selectedTimeframe !== 'all' && fw.timeframe !== selectedTimeframe) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inName = fw.name.toLowerCase().includes(q);
        const inShort = fw.shortName.toLowerCase().includes(q);
        const inOrigin = fw.origin.toLowerCase().includes(q);
        const inTag = fw.tagline.toLowerCase().includes(q);
        const inBest = fw.bestFor.toLowerCase().includes(q);
        const inDomain = fw.cynefinDomain.toLowerCase().includes(q);
        const inTools = fw.toolsNeeded.some(t => t.toLowerCase().includes(q));
        return inName || inShort || inOrigin || inTag || inBest || inDomain || inTools;
      }

      return true;
    });
  }, [allFrameworks, searchQuery, selectedCategory, selectedComplexity, selectedTimeframe, showOnlyBookmarks, bookmarks]);

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || selectedComplexity !== 'all' || selectedTimeframe !== 'all' || showOnlyBookmarks;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeView={activeView}
        onViewChange={setActiveView}
        bookmarksCount={bookmarks.length}
        showOnlyBookmarks={showOnlyBookmarks}
        onToggleBookmarksOnly={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
        compareCount={compareIds.length}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenWizard={() => setIsWizardOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onOpenWizard={() => setIsWizardOpen(true)}
        onOpenCanvas={(type) => setActiveCanvas(type)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveView('library');
        }}
      />

      {/* Main Workspace Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* VIEW 1: LIBRARY & CARDS */}
        {activeView === 'library' && (
          <div className="space-y-6">
            {/* Filter toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-slate-700 text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {t.filter.allMethods} ({allFrameworks.length})
                </button>
                {(Object.keys(CATEGORY_METADATA) as FrameworkCategory[]).map(catKey => {
                  const isSelected = selectedCategory === catKey;
                  return (
                    <button
                      key={catKey}
                      onClick={() => setSelectedCategory(catKey)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {t.categories[catKey]}
                    </button>
                  );
                })}
              </div>

              {/* Secondary dropdown filters */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedComplexity}
                  onChange={(e) => setSelectedComplexity(e.target.value as ComplexityLevel | 'all')}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="all">{t.filter.anyComplexity}</option>
                  <option value="Beginner">{t.complexity.Beginner}</option>
                  <option value="Intermediate">{t.complexity.Intermediate}</option>
                  <option value="Advanced">{t.complexity.Advanced}</option>
                </select>

                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value as Timeframe | 'all')}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="all">{t.filter.anyTimeframe}</option>
                  <option value="< 1 hour">{lang === 'vi' ? '< 1 giờ' : '< 1 hour'}</option>
                  <option value="1–2 days">{lang === 'vi' ? '1–2 ngày' : '1–2 days'}</option>
                  <option value="1–4 weeks">{lang === 'vi' ? '1–4 tuần' : '1–4 weeks'}</option>
                  <option value="Continuous">{lang === 'vi' ? 'Liên tục' : 'Continuous'}</option>
                </select>

                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title={lang === 'vi' ? 'Đặt lại bộ lọc' : 'Reset all filters'}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Results counter & active category summary */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div>
                {t.filter.showing} <strong className="text-white">{filteredFrameworks.length}</strong> {t.filter.of} {allFrameworks.length} {t.filter.frameworks}
                {showOnlyBookmarks && ` ${t.filter.bookmarkedOnly}`}
              </div>
              {selectedCategory !== 'all' && (
                <span className="italic text-slate-500 hidden sm:inline">
                  {t.categories[selectedCategory]}
                </span>
              )}
            </div>

            {/* Frameworks Grid */}
            {filteredFrameworks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredFrameworks.map(fw => (
                  <FrameworkCard
                    key={fw.id}
                    framework={fw}
                    isBookmarked={bookmarks.includes(fw.id)}
                    isCompared={compareIds.includes(fw.id)}
                    onToggleBookmark={toggleBookmark}
                    onToggleCompare={toggleCompare}
                    onSelect={setSelectedFramework}
                    onOpenCanvas={(type) => setActiveCanvas(type)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800 space-y-3">
                <Filter className="w-8 h-8 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">{t.filter.noResultsTitle}</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {t.filter.noResultsDesc}
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-medium transition-colors"
                >
                  {t.filter.clearFilters}
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: 2D LANDSCAPE MATRIX */}
        {activeView === 'matrix' && (
          <MatrixView
            onSelectFramework={setSelectedFramework}
            onOpenCanvas={(type) => setActiveCanvas(type)}
          />
        )}

        {/* VIEW 3: CANVASES HUB */}
        {activeView === 'canvases' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                {t.canvasesHub.title}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {t.canvasesHub.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Canvas 1: 5 Whys */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between hover:border-rose-500/50 transition-all group">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/40">
                    {lang === 'vi' ? 'NGUYÊN NHÂN GỐC RỄ' : 'ROOT CAUSE'}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                    {lang === 'vi' ? 'Bộ Xây Dựng Chuỗi 5 Whys' : '5 Whys Chain Builder'}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'vi'
                      ? 'Thang câu hỏi truy vấn sâu tương tác với phân công biện pháp khắc phục, người phụ trách (DRI) và xuất báo cáo markdown tự động.'
                      : 'Interactive interrogative ladder with automated countermeasure assignment, DRI ownership, and markdown report generator.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveCanvas('five-whys')}
                  className="mt-6 w-full py-2 px-3 bg-rose-600/20 hover:bg-rose-600 border border-rose-500/40 text-rose-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> {lang === 'vi' ? 'Mở Bảng 5 Whys' : 'Open 5 Whys Canvas'}
                </button>
              </div>

              {/* Canvas 2: Fishbone */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between hover:border-indigo-500/50 transition-all group">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
                    {lang === 'vi' ? 'CHẨN ĐOÁN TOÀN DIỆN' : 'DIAGNOSTICS'}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {lang === 'vi' ? 'Bảng Xương Cá Ishikawa (6M)' : 'Ishikawa Fishbone (6M) Canvas'}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'vi'
                      ? 'Phân nhánh đa chiều các yếu tố gây lỗi qua Con người, Máy móc, Phương pháp, Vật liệu, Đo lường và Môi trường.'
                      : 'Map multi-variable contributors across Manpower, Machine, Method, Material, Measurement, and Milieu with interactive branches.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveCanvas('fishbone')}
                  className="mt-6 w-full py-2 px-3 bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> {lang === 'vi' ? 'Mở Bảng Xương Cá' : 'Open Fishbone Canvas'}
                </button>
              </div>

              {/* Canvas 3: RICE */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between hover:border-cyan-500/50 transition-all group">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                    {lang === 'vi' ? 'ƯU TIÊN HÓA' : 'PRIORITIZATION'}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {lang === 'vi' ? 'Máy Tính Điểm RICE & ICE' : 'RICE & ICE Calculator'}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'vi'
                      ? 'Định lượng tính năng sản phẩm: (Độ tiếp cận × Tác động × Độ tự tin) / Nỗ lực với bảng xếp hạng sắp xếp thời gian thực.'
                      : 'Quantify roadmap candidates: (Reach × Impact × Confidence) / Effort with real-time leaderboard sorting.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveCanvas('rice-calc')}
                  className="mt-6 w-full py-2 px-3 bg-cyan-600/20 hover:bg-cyan-600 border border-cyan-500/40 text-cyan-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> {lang === 'vi' ? 'Mở Máy Tính RICE' : 'Open RICE Calculator'}
                </button>
              </div>

              {/* Canvas 4: Cynefin */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between hover:border-emerald-500/50 transition-all group">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                    {lang === 'vi' ? 'CHIẾN LƯỢC' : 'STRATEGY'}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {lang === 'vi' ? 'Ma Trận Nhận Thức Cynefin' : 'Cynefin Sense-Making Matrix'}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'vi'
                      ? 'Phân loại bối cảnh thực tế thành Rõ ràng, Phức tạp, Rối rắm hoặc Hỗn loạn và mở khóa tư thế phản ứng chuẩn xác.'
                      : 'Classify operating reality into Clear, Complicated, Complex, or Chaotic and unlock the correct response posture.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveCanvas('cynefin-tester')}
                  className="mt-6 w-full py-2 px-3 bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> {lang === 'vi' ? 'Mở Ma Trận Cynefin' : 'Open Cynefin Matrix'}
                </button>
              </div>

              {/* Canvas 5: Eisenhower */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between hover:border-emerald-500/50 transition-all group">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                    {lang === 'vi' ? 'THỰC THI & QUẢN TRỊ' : 'EXECUTION'}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {lang === 'vi' ? 'Bảng Ma Trận Ưu Tiên Eisenhower' : 'Eisenhower Priority Board'}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'vi'
                      ? 'Phân loại công việc vào 4 góc phần tư để bảo vệ thời gian làm việc chiến lược sâu (Q2) với theo dõi tỷ lệ sức khỏe.'
                      : 'Sort tasks into 4 quadrants to protect high-leverage Quadrant 2 strategic deep work with health ratio tracking.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveCanvas('eisenhower-board')}
                  className="mt-6 w-full py-2 px-3 bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> {lang === 'vi' ? 'Mở Bảng Eisenhower' : 'Open Eisenhower Board'}
                </button>
              </div>

              {/* Canvas 6: SCAMPER */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between hover:border-pink-500/50 transition-all group">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-pink-950/60 text-pink-300 border border-pink-800/40">
                    {lang === 'vi' ? 'ĐỔI MỚI SÁNG TẠO' : 'INNOVATION'}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors">
                    {lang === 'vi' ? 'Bảng Kích Hoạt Sáng Tạo SCAMPER' : 'SCAMPER Ideation Prompter'}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'vi'
                      ? 'Đột phá sản phẩm hiện có với 7 hướng tư duy đa chiều: Thay thế, Kết hợp, Thích ứng, Phóng đại, Chuyển đổi mục đích, Loại bỏ, Đảo ngược.'
                      : 'Mutate existing products using 7 lateral vectors: Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveCanvas('scamper-board')}
                  className="mt-6 w-full py-2 px-3 bg-pink-600/20 hover:bg-pink-600 border border-pink-500/40 text-pink-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> {lang === 'vi' ? 'Mở Bảng SCAMPER' : 'Open SCAMPER Canvas'}
                </button>
              </div>

              {/* Canvas 7: Toyota A3 */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between hover:border-amber-500/50 transition-all group">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">
                    {lang === 'vi' ? 'CHẤT LƯỢNG & PDCA' : 'QUALITY & PDCA'}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {lang === 'vi' ? 'Bảng Một Trang Toyota A3' : 'Toyota A3 One-Pager Canvas'}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'vi'
                      ? 'Cô đọng toàn bộ vấn đề phức tạp, phân tích nguyên nhân, giải pháp và kế hoạch thực thi vào một trang báo cáo điều hành chuẩn mực.'
                      : 'Condense an entire complex problem, diagnosis, countermeasure, and execution plan onto an executive one-page sheet.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveCanvas('a3-canvas')}
                  className="mt-6 w-full py-2 px-3 bg-amber-600/20 hover:bg-amber-600 border border-amber-500/40 text-amber-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> {lang === 'vi' ? 'Mở Bảng Toyota A3' : 'Open A3 Canvas'}
                </button>
              </div>

              {/* Canvas 8: Minto Pyramid & SCQA */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between hover:border-indigo-500/50 transition-all group">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
                    {lang === 'vi' ? 'GIAO TIẾP & CHIẾN LƯỢC' : 'EXECUTIVE STRATEGY'}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {lang === 'vi' ? 'Kim Tự Tháp Minto & SCQA' : 'Minto Pyramid & SCQA Canvas'}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'vi'
                      ? 'Cấu trúc thông điệp thuyết phục lãnh đạo với cốt truyện mở đầu SCQA, nguyên tắc Answer-First và các trụ cột logic MECE.'
                      : 'Structure executive briefings with the SCQA storytelling hook, Answer-First logic (BLUF), and supporting MECE pyramid pillars.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveCanvas('minto-pyramid')}
                  className="mt-6 w-full py-2 px-3 bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> {lang === 'vi' ? 'Mở Bảng Kim Tự Tháp Minto' : 'Open Minto Pyramid Canvas'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/80 mt-16 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">{t.appName}</span>
            <span>•</span>
            <span>{t.footer.openSource}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/duchoa56819/ProblemSolvingFrameworkChooser"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <GithubIcon className="w-4 h-4" /> {t.footer.githubRepo}
            </a>
            <span>•</span>
            <button
              onClick={() => setIsWizardOpen(true)}
              className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors font-medium"
            >
              {t.footer.takeDiagnostic} <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </footer>

      {/* MODAL 1: FRAMEWORK DETAIL PLAYBOOK */}
      {selectedFramework && (
        <FrameworkModal
          framework={selectedFramework}
          onClose={() => setSelectedFramework(null)}
          onOpenCanvas={(type) => setActiveCanvas(type)}
        />
      )}

      {/* MODAL 2: INTERACTIVE CANVAS TOOL */}
      {activeCanvas && (
        <CanvasModal
          canvasType={activeCanvas}
          onClose={() => setActiveCanvas(null)}
        />
      )}

      {/* MODAL 3: WIZARD DIAGNOSTIC FINDER */}
      {isWizardOpen && (
        <WizardModal
          onClose={() => setIsWizardOpen(false)}
          onOpenCanvas={(type) => setActiveCanvas(type)}
          onSelectFramework={(fw) => setSelectedFramework(fw)}
        />
      )}

      {/* MODAL 4: SIDE-BY-SIDE COMPARE */}
      {isCompareOpen && (
        <CompareModal
          compareIds={compareIds}
          onRemoveCompare={toggleCompare}
          onClearCompare={clearCompare}
          onClose={() => setIsCompareOpen(false)}
          onOpenCanvas={(type) => setActiveCanvas(type)}
        />
      )}
    </div>
  );
}
