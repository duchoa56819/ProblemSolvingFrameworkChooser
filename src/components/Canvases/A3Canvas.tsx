import React, { useState } from 'react';
import { Copy, Download, CheckCircle2 } from 'lucide-react';
import { copyToClipboard, downloadFile } from '../../utils/export';
import { useLanguage } from '../../i18n/LanguageContext';

export const A3Canvas: React.FC = () => {
  const { lang } = useLanguage();

  const defaultTitle = lang === 'vi'
    ? 'Giảm Thiểu Tỷ Lệ Giao Hàng Chậm Tại Kho Thương Mại Điện Tử'
    : 'E-commerce Warehouse Dispatch Delay Reduction';

  const defaultAuthor = lang === 'vi'
    ? 'Trưởng Nhóm Vận Hành Xuất Sắc (Operations Excellence)'
    : 'Operations Excellence Lead';

  const defaultBackground = lang === 'vi'
    ? 'Tỷ lệ hoàn thành đơn hàng cùng ngày giảm từ 98.5% xuống 84.1% trong 3 tháng qua, dẫn đến 120.000 USD chi phí bồi thường và mức độ hài lòng khách hàng sụt giảm.'
    : 'Same-day fulfillment rate fell from 98.5% to 84.1% over the last 3 months, resulting in $120k in courier refund credits and declining customer satisfaction.';

  const defaultCurrentCondition = lang === 'vi'
    ? 'Nhân viên nhặt hàng phải di chuyển trung bình 22.8 km (14.2 dặm) mỗi ca 8 tiếng. Các mặt hàng bán chạy theo mùa bị xếp rải rác ngẫu nhiên tại các kệ xa ở Khu D.'
    : 'Order pickers travel an average of 14.2 miles per 8-hour shift. High-velocity seasonal items are scattered randomly across remote Zone D racks.';

  const defaultTargetGoal = lang === 'vi'
    ? 'Đạt tỷ lệ xuất hàng trong ngày > 99.0% trong vòng 45 ngày, đồng thời giảm quãng đường đi bộ của nhân viên xuống dưới 12.8 km (8 dặm)/ca.'
    : 'Achieve > 99.0% same-day order dispatch within 45 days while reducing average picker walking distance below 8 miles per shift.';

  const defaultRootCause = lang === 'vi'
    ? 'Thuật toán xếp vị trí kho (slotting) trong phần mềm WMS mặc định chọn ô chứa ngẫu nhiên khi nhập hàng mới thay vì phân khu theo tốc độ bán hàng ABC linh hoạt.'
    : 'Warehouse management slotting algorithm defaults to random storage bins upon restock rather than dynamic ABC velocity zoning.';

  const defaultCountermeasures = lang === 'vi'
    ? '1. Cập nhật phân hệ thuật toán xếp vị trí động ABC trên WMS.\n2. Di dời 50 mặt hàng bán chạy nhất về lối đi chính gần khu đóng gói.\n3. Ứng dụng thuật toán tối ưu hóa đường gom hàng theo mã vạch trên máy quét cầm tay.'
    : '1. Deploy dynamic ABC velocity slotting module in WMS.\n2. Relocate top 50 SKU velocity items to front staging aisle.\n3. Implement barcode pick-path optimization on handheld terminals.';

  const defaultPlan = lang === 'vi'
    ? 'Tuần 1: Cập nhật thuật toán phần mềm WMS.\nTuần 2: Sắp xếp lại kho hàng vật lý trong ca bảo trì cuối tuần.\nTuần 3: Đào tạo nhân viên kho theo quy trình nhặt hàng mới.\nTuần 4: Đánh giá vận hành chính thức 100%.'
    : 'Week 1: WMS software rule update.\nWeek 2: Physical inventory re-slotting during maintenance window.\nWeek 3: Frontline picker training.\nWeek 4: 100% go-live audit.';

  const defaultFollowUp = lang === 'vi'
    ? 'Đánh giá định kỳ hàng tuần dữ liệu đo quãng đường di chuyển và bảng điều khiển SLA hàng ngày. Thiết lập lịch hiệu chỉnh vị trí kho định kỳ hàng quý.'
    : 'Weekly review of picker travel telemetry and daily SLA dashboards. Quarterly slotting recalibration schedule established.';

  const [title, setTitle] = useState(defaultTitle);
  const [author, setAuthor] = useState(defaultAuthor);
  const [background, setBackground] = useState(defaultBackground);
  const [currentCondition, setCurrentCondition] = useState(defaultCurrentCondition);
  const [targetGoal, setTargetGoal] = useState(defaultTargetGoal);
  const [rootCause, setRootCause] = useState(defaultRootCause);
  const [countermeasures, setCountermeasures] = useState(defaultCountermeasures);
  const [plan, setPlan] = useState(defaultPlan);
  const [followUp, setFollowUp] = useState(defaultFollowUp);
  const [copied, setCopied] = useState(false);

  const exportReport = () => {
    if (lang === 'vi') {
      return `# Báo Cáo Giải Quyết Vấn Đề Một Trang Toyota A3: ${title}
**Người thực hiện / DRI:** ${author}  
**Ngày thực hiện:** ${new Date().toISOString().split('T')[0]}

---

### 1. Chủ đề & Bối cảnh
${background}

### 2. Hiện trạng thực tế
${currentCondition}

### 3. Mục tiêu hướng tới & Chỉ số đo lường
${targetGoal}

### 4. Phân tích nguyên nhân gốc rễ
${rootCause}

### 5. Các biện pháp khắc phục đề xuất
${countermeasures}

### 6. Kế hoạch hành động triển khai
${plan}

### 7. Đánh giá hiệu quả & Tiêu chuẩn hóa quy trình
${followUp}

---
*Được tạo bởi Problem-Solving Framework Chooser - Bảng Toyota A3*
`;
    }

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
            {lang === 'vi' ? 'Bảng Giải Quyết Vấn Đề Một Trang Toyota A3' : 'Toyota A3 One-Page Problem Solving Canvas'}
          </h3>
          <p className="text-sm text-slate-400">
            {lang === 'vi'
              ? 'Cô đọng toàn bộ vấn đề phức tạp, chẩn đoán nguyên nhân và kế hoạch hành động vào một trang duy nhất.'
              : 'Condense an entire complex problem, diagnosis, and action plan onto a single page.'}
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
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-600 hover:bg-amber-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> {lang === 'vi' ? 'Xuất .md' : 'Export .md'}
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="md:col-span-2">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            {lang === 'vi' ? 'Tiêu đề dự án / Báo cáo A3' : 'A3 Project Title'}
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-semibold"
          />
        </div>
        <div>
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            {lang === 'vi' ? 'Tác giả / Người phụ trách (DRI)' : 'Author / Owner'}
          </label>
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
              {lang === 'vi' ? '1. Chủ đề & Bối cảnh (Tại sao vấn đề này quan trọng)' : '1. Theme & Background (Why this matters)'}
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
              {lang === 'vi' ? '2. Hiện trạng thực tế (Số liệu nền & Nỗi đau)' : '2. Current Condition (Baseline metrics & pain)'}
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
              {lang === 'vi' ? '3. Mục tiêu hướng tới & Chỉ số đo lường (Target State)' : '3. Target State & Measurable Goals'}
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
              {lang === 'vi' ? '4. Phân tích nguyên nhân gốc rễ (5 Whys / Ishikawa tóm lược)' : '4. Root Cause Analysis (5 Whys / Fishbone summary)'}
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
              {lang === 'vi' ? '5. Biện pháp khắc phục đề xuất (Giải pháp có hệ thống)' : '5. Proposed Countermeasures (Systemic Fixes)'}
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
              {lang === 'vi' ? '6. Kế hoạch hành động triển khai (Ai làm gì, Khi nào xong)' : '6. Implementation Action Plan (Who does What by When)'}
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
              {lang === 'vi' ? '7. Đánh giá hiệu quả & Tiêu chuẩn hóa quy trình (Nemawashi)' : '7. Effect Confirmation & Standardization (Nemawashi)'}
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
