import { WizardQuestion } from '../types/framework';
import { WIZARD_QUESTIONS } from './wizardQuestions';

export const WIZARD_QUESTIONS_VI: WizardQuestion[] = [
  {
    id: 'nature',
    stepNumber: 1,
    title: 'Bản chất chính của thách thức bạn đang đối mặt là gì?',
    subtitle: 'Xác định miền nơi vấn đề hoặc cơ hội bắt nguồn.',
    options: [
      {
        id: 'defect-failure',
        label: 'Sự Cố Hệ Thống, Hỏng Hóc Hoặc Lỗi Bất Thường',
        description: 'Thứ gì đó vốn đang chạy ổn định đột nhiên bị hỏng, rớt chất lượng hoặc gặp sự cố ngừng hoạt động.',
        iconName: 'AlertTriangle',
        scores: WIZARD_QUESTIONS[0].options[0].scores,
        penalties: WIZARD_QUESTIONS[0].options[0].penalties
      },
      {
        id: 'strategy-market',
        label: 'Tình Thế Chiến Lược Hoặc Quyết Định Kinh Doanh',
        description: 'Phân bổ nguồn vốn, lựa chọn mô hình kinh doanh, thâm nhập thị trường hoặc đánh giá các phương án đối đầu.',
        iconName: 'Compass',
        scores: WIZARD_QUESTIONS[0].options[1].scores,
        penalties: WIZARD_QUESTIONS[0].options[1].penalties
      },
      {
        id: 'user-experience',
        label: 'Khách Hàng Rời Bỏ, Trải Nghiệm Kém Hoặc Ít Sử Dụng',
        description: 'Người dùng không hành xử như kỳ vọng, mức độ gắn kết yếu, hoặc một nhu cầu con người chưa được đáp ứng.',
        iconName: 'Users',
        scores: WIZARD_QUESTIONS[0].options[2].scores,
        penalties: WIZARD_QUESTIONS[0].options[2].penalties
      },
      {
        id: 'engineering-contradiction',
        label: 'Mâu Thuẫn Kỹ Thuật Hoặc Bế Tắc Ý Tưởng Sáng Tạo',
        description: 'Cải thiện thông số này (tốc độ/trọng lượng/chi phí) thì làm hỏng thông số khác, hoặc nhóm cạn kiệt ý tưởng.',
        iconName: 'Cpu',
        scores: WIZARD_QUESTIONS[0].options[3].scores,
        penalties: WIZARD_QUESTIONS[0].options[3].penalties
      },
      {
        id: 'process-variation',
        label: 'Quy Trình Kém Hiệu Quả & Lãng Phí Vận Hành',
        description: 'Quy trình hiện tại quá chậm, biến động chất lượng cao, nhiều phế phẩm hoặc tắc nghẽn liên tục.',
        iconName: 'Activity',
        scores: WIZARD_QUESTIONS[0].options[4].scores,
        penalties: WIZARD_QUESTIONS[0].options[4].penalties
      },
      {
        id: 'prioritization-overload',
        label: 'Quá Tải Công Việc & Hạn Chế Về Băng Thông Nguồn Lực',
        description: 'Quá nhiều việc, tính năng hoặc ý tưởng tranh giành sự chú ý trong khi nguồn lực kỹ sư có hạn.',
        iconName: 'Layers',
        scores: WIZARD_QUESTIONS[0].options[5].scores,
        penalties: WIZARD_QUESTIONS[0].options[5].penalties
      }
    ]
  },
  {
    id: 'complexity',
    stepNumber: 2,
    title: 'Mối quan hệ nhân - quả có mức độ dự đoán được ra sao?',
    subtitle: 'Thấu hiểu mức độ chắc chắn giúp tránh việc áp dụng công cụ cứng nhắc vào môi trường biến động.',
    options: [
      {
        id: 'clear-linear',
        label: 'Rõ Ràng & Có Thể Lặp Lại Được',
        description: 'Quan hệ nhân-quả hiển nhiên; chúng ta chỉ cần kỷ luật thực thi và tuân thủ quy trình chuẩn.',
        iconName: 'CheckCircle2',
        scores: WIZARD_QUESTIONS[1].options[0].scores,
        penalties: WIZARD_QUESTIONS[1].options[0].penalties
      },
      {
        id: 'complicated-expert',
        label: 'Rắc Rối (Cần Chuyên Gia Phân Tích)',
        description: 'Một câu đố kỹ thuật hóc búa. Câu trả lời có tồn tại, nhưng đòi hỏi chẩn đoán và thử nghiệm chuyên sâu.',
        iconName: 'GitBranch',
        scores: WIZARD_QUESTIONS[1].options[1].scores,
        penalties: WIZARD_QUESTIONS[1].options[1].penalties
      },
      {
        id: 'complex-emergent',
        label: 'Phức Tạp (Hệ Thống Con Người & Biến Đổi Khó Lường)',
        description: 'Các biến số tương tác liên tục sinh ra quy luật mới. Lời giải chỉ xuất hiện thông qua các thử nghiệm nhỏ.',
        iconName: 'Network',
        scores: WIZARD_QUESTIONS[1].options[2].scores,
        penalties: WIZARD_QUESTIONS[1].options[2].penalties
      },
      {
        id: 'chaotic-crisis',
        label: 'Hỗn Loạn (Khủng Hoảng Cháy Nhà Khẩn Cấp)',
        description: 'Tình huống khẩn cấp không có thời gian phân tích sâu; cần dập lửa và ổn định tình hình ngay trước mắt.',
        iconName: 'Flame',
        scores: WIZARD_QUESTIONS[1].options[3].scores,
        penalties: WIZARD_QUESTIONS[1].options[3].penalties
      }
    ]
  },
  {
    id: 'data',
    stepNumber: 3,
    title: 'Bạn đang nắm giữ loại dữ liệu hoặc bằng chứng chủ yếu nào?',
    subtitle: 'Chọn định dạng dữ liệu khả dụng hiện tại của bạn.',
    options: [
      {
        id: 'hard-metrics',
        label: 'Số Liệu Đo Đạc, Telemetry & Tập Dữ Liệu Thống Kê',
        description: 'Nhật ký log, tỷ lệ lỗi phần trăm, báo cáo tài chính, số liệu cảm biến hoặc cơ sở dữ liệu số.',
        iconName: 'BarChart3',
        scores: WIZARD_QUESTIONS[2].options[0].scores,
        penalties: WIZARD_QUESTIONS[2].options[0].penalties
      },
      {
        id: 'qualitative-interviews',
        label: 'Phỏng Vấn Người Dùng, Cảm Xúc & Câu Chuyện',
        description: 'Ghi âm phỏng vấn khách hàng, phàn nàn trực tiếp, tâm lý đội ngũ và phản hồi hành vi.',
        iconName: 'MessageSquare',
        scores: WIZARD_QUESTIONS[2].options[1].scores,
        penalties: WIZARD_QUESTIONS[2].options[1].penalties
      },
      {
        id: 'physical-architecture',
        label: 'Bản Vẽ Kỹ Thuật, Sơ Đồ Khối & Kiến Trúc Mã Nguồn',
        description: 'Kiến trúc thành phần phần mềm, bản vẽ phần cứng, hoặc các điều khoản cam kết kỹ thuật.',
        iconName: 'Cpu',
        scores: WIZARD_QUESTIONS[2].options[2].scores,
        penalties: WIZARD_QUESTIONS[2].options[2].penalties
      },
      {
        id: 'sparse-uncertainty',
        label: 'Rất Ít Dữ Liệu Lịch Sử / Lãnh Địa Hoàn Toàn Mới',
        description: 'Thị trường chưa ai làm, công nghệ chưa từng có tiền lệ, hoặc trong màn sương mù khủng hoảng.',
        iconName: 'HelpCircle',
        scores: WIZARD_QUESTIONS[2].options[3].scores,
        penalties: WIZARD_QUESTIONS[2].options[3].penalties
      }
    ]
  },
  {
    id: 'timeframe',
    stepNumber: 4,
    title: 'Khung thời gian và mức độ khẩn cấp của bạn ra sao?',
    subtitle: 'Cân đối độ sâu của phương pháp với hạn định thực tế.',
    options: [
      {
        id: 'rapid-flash',
        label: 'Xử Lý Nhanh Ngay Tức Thì (< 1 Giờ)',
        description: 'Cần có định hướng, phân loại hoặc gỡ rối ngay trong một cuộc họp hoặc phiên họp khẩn.',
        iconName: 'Zap',
        scores: WIZARD_QUESTIONS[3].options[0].scores,
        penalties: WIZARD_QUESTIONS[3].options[0].penalties
      },
      {
        id: 'sprint-days',
        label: 'Sprint Tập Trung (1–2 Ngày)',
        description: 'Một workshop chuyên đề, hackathon hoặc phiên điều tra sự cố kéo dài hai ngày.',
        iconName: 'Clock',
        scores: WIZARD_QUESTIONS[3].options[1].scores,
        penalties: WIZARD_QUESTIONS[3].options[1].penalties
      },
      {
        id: 'deep-initiative',
        label: 'Dự Án Chiến Lược Sâu (1–4 Tuần)',
        description: 'Sáng kiến cấp doanh nghiệp với các cuộc kiểm tra và đối chiếu đa bên kỹ lưỡng.',
        iconName: 'Calendar',
        scores: WIZARD_QUESTIONS[3].options[2].scores,
        penalties: WIZARD_QUESTIONS[3].options[2].penalties
      },
      {
        id: 'continuous-cadence',
        label: 'Vòng Lặp Cải Tiến Liên Tục Bền Vững',
        description: 'Thói quen làm việc thường nhật và nhịp sinh học vận hành kiểm tra hàng tuần.',
        iconName: 'Repeat',
        scores: WIZARD_QUESTIONS[3].options[3].scores,
        penalties: WIZARD_QUESTIONS[3].options[3].penalties
      }
    ]
  },
  {
    id: 'team',
    stepNumber: 5,
    title: 'Ai sẽ là người trực tiếp tham gia giải quyết vấn đề?',
    subtitle: 'Các phương pháp phụ thuộc vào năng lực phối hợp và người điều phối.',
    options: [
      {
        id: 'solo-contributor',
        label: 'Cá Nhân Tự Suy Nghĩ / Độc Lập',
        description: 'Tự làm việc một mình tại bàn làm việc, cần sự rõ ràng và kết quả tập trung cho bản thân.',
        iconName: 'User',
        scores: WIZARD_QUESTIONS[4].options[0].scores,
        penalties: WIZARD_QUESTIONS[4].options[0].penalties
      },
      {
        id: 'tactical-team',
        label: 'Nhóm Tác Chiến Nòng Cốt (2–6 Người)',
        description: 'Các kỹ sư, trưởng nhóm sản phẩm hoặc chuyên gia tin cậy gắn bó chặt chẽ.',
        iconName: 'Users',
        scores: WIZARD_QUESTIONS[4].options[1].scores,
        penalties: WIZARD_QUESTIONS[4].options[1].penalties
      },
      {
        id: 'cross-functional',
        label: 'Biệt Đội Liên Chức Năng (5–15 Người)',
        description: 'Đại diện hỗn hợp: Kỹ thuật, Thiết kế, Vận hành, QA, Sản phẩm và Chăm sóc khách hàng.',
        iconName: 'Share2',
        scores: WIZARD_QUESTIONS[4].options[2].scores,
        penalties: WIZARD_QUESTIONS[4].options[2].penalties
      },
      {
        id: 'executive-boardroom',
        label: 'Ban Lãnh Đạo Cấp Cao / Hội Đồng',
        description: 'Các bên liên quan cấp cao cân đối sự đánh đổi chiến lược, phân bổ nguồn lực và văn hóa.',
        iconName: 'Award',
        scores: WIZARD_QUESTIONS[4].options[3].scores,
        penalties: WIZARD_QUESTIONS[4].options[3].penalties
      }
    ]
  },
  {
    id: 'deliverable',
    stepNumber: 6,
    title: 'Kết quả đầu ra cụ thể mong muốn nhất lúc này là gì?',
    subtitle: 'Xác định sản phẩm bàn giao cuối cùng bạn cần đạt được.',
    options: [
      {
        id: 'root-cause-fix',
        label: 'Nguyên Nhân Gốc Rễ Đã Xác Minh & Cơ Chế Phòng Ngừa',
        description: 'Chẩn đoán chính xác không thể chối cãi, kèm theo cơ chế tự động ngăn chặn tái diễn vĩnh viễn.',
        iconName: 'CheckCircle',
        scores: WIZARD_QUESTIONS[5].options[0].scores,
        penalties: WIZARD_QUESTIONS[5].options[0].penalties
      },
      {
        id: 'tested-prototype',
        label: 'Mẫu Thử Prototype Đã Kiểm Chứng Với Người Dùng',
        description: 'Mẫu thử giải pháp kèm trích dẫn thực tế của người dùng chứng minh mức độ hấp dẫn.',
        iconName: 'Sparkles',
        scores: WIZARD_QUESTIONS[5].options[1].scores,
        penalties: WIZARD_QUESTIONS[5].options[1].penalties
      },
      {
        id: 'prioritized-roadmap',
        label: 'Bảng Xếp Hạng Ưu Tiên Tính Điểm ROI Khách Quan',
        description: 'Danh sách các tính năng/dự án được xếp hạng minh bạch dựa trên công thức tác động và nỗ lực.',
        iconName: 'ListOrdered',
        scores: WIZARD_QUESTIONS[5].options[2].scores,
        penalties: WIZARD_QUESTIONS[5].options[2].penalties
      },
      {
        id: 'executive-decision',
        label: 'Luận Điểm Chiến Lược & Lộ Trình Cho Ban Giám Đốc',
        description: 'Luận điểm kinh doanh có cấu trúc, đánh giá rủi ro rõ ràng cho các nhà hoạch định chiến lược.',
        iconName: 'TrendingUp',
        scores: WIZARD_QUESTIONS[5].options[3].scores,
        penalties: WIZARD_QUESTIONS[5].options[3].penalties
      },
      {
        id: 'a3-one-pager',
        label: 'Tài Liệu Báo Cáo A3 Trực Quan Đồng Thuận Trong 1 Trang',
        description: 'Bản tóm tắt súc tích kết hợp bối cảnh, số liệu thực trạng, chẩn đoán và kế hoạch hành động.',
        iconName: 'FileText',
        scores: WIZARD_QUESTIONS[5].options[4].scores,
        penalties: WIZARD_QUESTIONS[5].options[4].penalties
      }
    ]
  }
];
