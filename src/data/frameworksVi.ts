import { Framework } from '../types/framework';

export const FRAMEWORKS_VI: Framework[] = [
  // --- 1. ROOT CAUSE & DIAGNOSTICS ---
  {
    id: 'five-whys',
    name: '5 Whys - Phân Tích 5 Lần Tại Sao',
    shortName: '5 Whys',
    origin: 'Taiichi Ohno (Tập đoàn Toyota, thập niên 1950)',
    tagline: 'Khoan sâu qua các triệu chứng bề mặt để chạm tới nguyên nhân gốc rễ mang tính hệ thống.',
    category: 'root-cause',
    complexity: 'Beginner',
    timeframe: '< 1 hour',
    teamSize: 'Small Team (2–6)',
    cynefinDomain: 'Clear',
    bestFor: 'Các lỗi vận hành đơn tuyến, sự cố máy móc lặp lại, hoặc lỗi quy trình có mối quan hệ nhân-quả tuyến tính.',
    whenToAvoid: 'Khủng hoảng đa biến phức tạp, tái cấu trúc phần mềm toàn diện, hoặc các vấn đề văn hóa/chính trị nội bộ.',
    summary: '5 Whys là phương pháp thẩm vấn lặp đi lặp lại nhằm khám phá mối quan hệ nhân-quả của một vấn đề cụ thể. Bằng cách hỏi "Tại sao?" năm lần, nhóm giải quyết sẽ vượt qua xu hướng đổ lỗi cá nhân để tìm ra lỗ hổng trong quy trình hoặc chính sách quản lý.',
    steps: [
      {
        number: 1,
        title: 'Xác định phát biểu vấn đề cụ thể',
        description: 'Mô tả chính xác triệu chứng quan sát được một cách khách quan, không phán xét và không gán sẵn giải pháp.',
        actionableTip: 'Đảm bảo vấn đề có thể đo lường, kiểm chứng được và có mốc thời gian/địa điểm rõ ràng.'
      },
      {
        number: 2,
        title: 'Đặt câu hỏi "Tại sao?" đầu tiên',
        description: 'Khám phá lý do trực tiếp gây ra triệu chứng bề mặt đó. Dựa hoàn toàn vào dữ liệu thực tế.',
        actionableTip: 'Dựa trên bằng chứng và dữ liệu, tuyệt đối không suy đoán theo cảm tính.'
      },
      {
        number: 3,
        title: 'Lặp lại 4 lần tiếp theo',
        description: 'Với mỗi câu trả lời, tiếp tục hỏi "Tại sao điều đó xảy ra?" cho đến khi chạm tới lỗ hổng quy trình hoặc chính sách.',
        actionableTip: 'Dừng lại khi câu trả lời chạm vào lỗ hổng đào tạo, thiếu kiểm tra chéo hoặc sai sót chính sách, thay vì đổ lỗi cho cá nhân.'
      },
      {
        number: 4,
        title: 'Thiết lập biện pháp đối phó & Người chịu trách nhiệm',
        description: 'Đưa ra biện pháp phòng ngừa mang tính hệ thống (như cơ chế chống lỗi Poka-Yoke) thay vì chỉ nhắc nhở "cần cẩn thận hơn".',
        actionableTip: 'Chỉ định rõ một người chịu trách nhiệm chính (DRI) và thời hạn kiểm tra nghiệm thu.'
      }
    ],
    keyQuestions: [
      'Mỗi câu trả lời "tại sao" có thực sự được chứng minh bằng dữ liệu là nguyên nhân gây ra triệu chứng phía trên không?',
      'Nếu đảo ngược các mệnh đề bằng từ "do đó", logic nhân-quả có còn vững vàng không?',
      'Chúng ta đang đổ lỗi cho sự bất cẩn của con người hay đang chẩn đoán lỗ hổng thiết kế hệ thống?',
      'Biện pháp đối phó này có ngăn chặn vĩnh viễn sự cố tái diễn không?'
    ],
    exampleUseCase: {
      title: 'Sập Cổng Thanh Toán API Đêm Mua Sắm Black Friday',
      scenario: 'API thanh toán của khách hàng bị sập liên tục 42 phút trong đợt cao điểm khuyến mãi.',
      application: 'Tại sao? Tràn bộ nhớ RAM. Tại sao? Số lượng key cache tăng đột biến không kiểm soát. Tại sao? Thiếu cài đặt TTL thời gian hết hạn cho giỏ hàng ẩn danh. Tại sao? Tiến độ gấp rút nên bỏ qua kiểm thử dữ liệu rác. Tại sao? Checklist QA chưa có kịch bản mô phỏng tải giỏ hàng ẩn danh hàng loạt.',
      outcome: 'Bổ sung kiểm thử tải tự động trong pipeline CI/CD để đảm bảo mọi giỏ hàng ẩn danh bắt buộc phải có TTL trước khi phát hành phiên bản mới.'
    },
    pros: [
      'Đơn giản, trực quan, không đòi hỏi học tập phức tạp',
      'Thúc đẩy tinh thần không đổ lỗi cá nhân trong đội ngũ',
      'Thực hiện nhanh gọn trong buổi họp post-mortem 30 phút'
    ],
    cons: [
      'Dễ rơi vào bẫy thiên kiến xác nhận theo một hướng tuyến tính',
      'Phụ thuộc lớn vào hiểu biết chuyên môn của người điều phối',
      'Không bao quát được các nguyên nhân đa biến phân nhánh tương tác lẫn nhau'
    ],
    toolsNeeded: ['Bảng trắng / Miro', 'Giấy ghi chú Post-it', 'Nhật ký sự cố'],
    interactiveCanvasType: 'five-whys',
    plotCoordinates: {
      complexityScore: 18,
      analyticalVsCreative: 20
    }
  },
  {
    id: 'fishbone',
    name: 'Biểu Đồ Xương Cá Ishikawa (Mô Hình 6M)',
    shortName: 'Xương Cá (6M)',
    origin: 'Kaoru Ishikawa (Đại học Tokyo / Kawasaki Steel, 1968)',
    tagline: 'Phân loại các yếu tố đóng góp theo 6 khía cạnh vận hành để trực quan hóa toàn bộ nguyên nhân tiềm ẩn.',
    category: 'root-cause',
    complexity: 'Intermediate',
    timeframe: '1–2 days',
    teamSize: 'Cross-Functional (5–15)',
    cynefinDomain: 'Complicated',
    bestFor: 'Sự cố dây chuyền sản xuất phức tạp, điểm nghẽn liên phòng ban, và các vấn đề do nhiều yếu tố tích tụ.',
    whenToAvoid: 'Tình huống khẩn cấp cần đưa ra quyết định hành động ngay trong vài phút.',
    summary: 'Biểu đồ Ishikawa là công cụ trực quan hóa mối quan hệ nguyên nhân - kết quả, chia nhỏ các yếu tố gây ra sai sót thành các nhánh chuẩn (Con người, Máy móc, Phương pháp, Vật liệu, Đo lường, Môi trường).',
    steps: [
      {
        number: 1,
        title: 'Đặt vấn đề tại đầu cá',
        description: 'Ghi rõ phát biểu vấn đề định lượng ở phần đầu xương cá phía bên phải.',
        actionableTip: 'Lượng hóa vấn đề (ví dụ: "Tỷ lệ phế phẩm tăng đột biến từ 1.2% lên 4.8% trong Quý 3").'
      },
      {
        number: 2,
        title: 'Vẽ 6 nhánh xương chính (6M)',
        description: 'Vẽ các nhánh: Con người (Manpower), Máy móc (Machine), Phương pháp (Method), Vật liệu (Material), Đo lường (Measurement), và Môi trường (Milieu).',
        actionableTip: 'Trong ngành dịch vụ/phần mềm, có thể chuyển đổi thành 4S (Không gian, Nhà cung cấp, Hệ thống, Kỹ năng) hoặc 8P.'
      },
      {
        number: 3,
        title: 'Động não & phát triển các nhánh xương phụ',
        description: 'Cả nhóm cùng liệt kê mọi yếu tố khả dĩ, gắn thành các nhánh xương nhỏ hơn vào từng nhánh chính.',
        actionableTip: 'Không tranh cãi đúng sai trong giai đoạn động não; hãy ghi nhận tất cả các giả thuyết trước.'
      },
      {
        number: 4,
        title: 'Ưu tiên & xác minh bằng dữ liệu',
        description: 'Bình chọn hoặc dùng biểu đồ Pareto để chọn ra 3 nhánh có xác suất cao nhất và thu thập số liệu kiểm chứng.',
        actionableTip: 'Thu thập dữ liệu thực tế để chứng minh hoặc bác bỏ 3 giả thuyết hàng đầu.'
      }
    ],
    keyQuestions: [
      'Chúng ta đã tính đến các yếu tố môi trường như nhiệt độ, chuyển giao ca làm việc hoặc mạng nghẽn chưa?',
      'Công cụ đo lường và cảm biến có được hiệu chuẩn chính xác không?',
      'Đã có mặt đầy đủ đại diện từ vận hành, QA và tuyến đầu chưa?'
    ],
    exampleUseCase: {
      title: 'Tỷ Lệ Người Dùng Rời Bỏ Khi Đăng Ký Tài Khoản Tăng Vọt',
      scenario: 'Nền tảng SaaS B2B ghi nhận tỷ lệ kích hoạt tài khoản sụt giảm 35% sau khi làm mới giao diện.',
      application: 'Phân tích 6M: Phương pháp (yêu cầu KYC định danh quá sớm), Máy móc (lỗi hiển thị trên trình duyệt Safari WebKit), Con người (đội sales chưa được đào tạo về luồng mới), Đo lường (thiếu sự kiện theo dõi trên mobile).',
      outcome: 'Phát hiện chặn cookie trên Safari kết hợp với bước KYC sớm chiếm 80% nguyên nhân; dời bước KYC sang sau khi đã kích hoạt tài khoản thành công.'
    },
    pros: [
      'Buộc nhóm phải nhìn nhận toàn diện qua nhiều khía cạnh vận hành',
      'Rất hiệu quả để kết nối các phòng ban lại cùng thảo luận',
      'Ngăn ngừa việc vội vàng quy chụp cho một nguyên nhân hiển nhiên'
    ],
    cons: [
      'Dễ trở nên lan man nếu người điều phối không chặt chẽ',
      'Chỉ chỉ ra các nguyên nhân tiềm ẩn chứ chưa chứng minh tính nhân-quả nếu thiếu dữ liệu theo sau'
    ],
    toolsNeeded: ['Bảng vẽ xương cá', 'Giấy dán ghi chú', 'Bút màu đánh dấu'],
    interactiveCanvasType: 'fishbone',
    plotCoordinates: {
      complexityScore: 40,
      analyticalVsCreative: 35
    }
  },
  {
    id: 'kepner-tregoe',
    name: 'Phân Tích Vấn Đề Kepner-Tregoe (IS / IS NOT)',
    shortName: 'Kepner-Tregoe',
    origin: 'Charles Kepner & Benjamin Tregoe (Tập đoàn RAND / KT, 1958)',
    tagline: 'Phương pháp loại trừ suy diễn chặt chẽ dựa trên đối chiếu ranh giới: CÁI GÌ LÀ vs. CÁI GÌ KHÔNG PHẢI.',
    category: 'root-cause',
    complexity: 'Advanced',
    timeframe: '1–2 days',
    teamSize: 'Small Team (2–6)',
    cynefinDomain: 'Complicated',
    bestFor: 'Các sự cố kỹ thuật phức tạp nghiêm trọng khi một hệ thống vốn đang chạy ổn định đột ngột bị sai lệch bất thường.',
    whenToAvoid: 'Các dự án sáng tạo ý tưởng mới hoàn toàn từ đầu chưa có hệ thống chuẩn.',
    summary: 'Một phương pháp luận giải quyết vấn đề bằng tư duy duy lý và khoa học. KT dựa trên nguyên lý: vấn đề là một sai lệch so với tiêu chuẩn do một thay đổi không được nhận biết gây ra. Nó tìm ra nguyên nhân bằng cách so sánh đối chiếu giữa CÁI BỊ ẢNH HƯỞNG (IS) và CÁI LẼ RA CÓ THỂ BỊ NHƯNG LẠI KHÔNG BỊ (IS NOT).',
    steps: [
      {
        number: 1,
        title: 'Mô tả rõ sự sai lệch',
        description: 'Phát biểu chính xác tiêu chuẩn vận hành nào đang bị phá vỡ.',
        actionableTip: 'Phân biệt rành mạch giữa triệu chứng và đường cơ sở kỳ vọng.'
      },
      {
        number: 2,
        title: 'Thiết lập ma trận IS vs. IS NOT',
        description: 'Phân loại theo Cái gì, Ở đâu, Khi nào và Mức độ. Xác định rõ điều gì BỊ và điều gì KHÔNG BỊ nhưng hợp lý là có thể bị.',
        actionableTip: 'Manh mối của nguyên nhân nằm chính ở điểm khác biệt đặc trưng giữa IS và IS NOT.'
      },
      {
        number: 3,
        title: 'Nhận diện các thay đổi đặc trưng',
        description: 'Tìm kiếm những thay đổi gần đây (bản cập nhật, lô hàng mới, cấu hình, ca kíp) trùng khớp với sự khác biệt đó.',
        actionableTip: 'Rà soát changelog, nhà cung cấp, thông số môi trường và nhân sự.'
      },
      {
        number: 4,
        title: 'Kiểm chứng giả thuyết & Xác nhận',
        description: 'Kiểm tra xem nguyên nhân ứng viên có giải thích được trọn vẹn TẤT CẢ các dữ kiện IS và IS NOT hay không.',
        actionableTip: 'Nếu giả thuyết không giải thích được vì sao máy B KHÔNG hỏng, hãy bác bỏ hoặc tinh chỉnh lại giả thuyết đó.'
      }
    ],
    keyQuestions: [
      'Điểm độc nhất ở điều kiện xảy ra lỗi so với điều kiện không xảy ra lỗi là gì?',
      'Có điều gì đã thay đổi xung quanh thời điểm sự sai lệch lần đầu tiên xuất hiện?',
      'Giả thuyết này có giải thích được TẤT CẢ các sự kiện IS NOT mà không có mâu thuẫn nào không?'
    ],
    exampleUseCase: {
      title: 'Điều Tra Sự Cố Nổ Bình Oxy Tàu Apollo 13 Của NASA',
      scenario: 'Bình oxy đông lạnh phát nổ giữa không gian. NASA cần tìm ra nguyên nhân chính xác tuyệt đối.',
      application: 'Dùng KT: IS (Bình oxy 2 nổ) vs IS NOT (Bình oxy 1 nguyên vẹn, các thử nghiệm mặt đất trước đó bình thường). Tìm thấy thay đổi: thử nghiệm gia nhiệt 65V tại bệ phóng đã làm hỏng công tắc cảm ứng nhiệt.',
      outcome: 'Thiết kế lại công tắc chịu nhiệt và mạch an toàn dự phòng, ngăn chặn vĩnh viễn thảm họa cho các tàu vũ trụ sau này.'
    },
    pros: [
      'Tính chặt chẽ khoa học cực cao, loại bỏ hoàn toàn phỏng đoán mò mẫm',
      'Tiết kiệm hàng triệu đô trong các sự cố hàng không vũ trụ, bán dẫn và trung tâm dữ liệu',
      'Lọc bỏ các mối tương quan giả mạo rất nhanh chóng'
    ],
    cons: [
      'Đòi hỏi kỷ luật tư duy cao và dữ liệu thực tế chính xác',
      'Có thể tạo cảm giác chậm đối với những người nóng lòng muốn thử nghiệm ngay'
    ],
    toolsNeeded: ['Bảng đặc tả KT IS/IS NOT', 'Nhật ký telemetry', 'Lịch sử thay đổi hệ thống'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 55,
      analyticalVsCreative: 10
    }
  },
  {
    id: 'fmea',
    name: 'FMEA - Phân Tích Phương Thức Hỏng Hóc Và Tác Động',
    shortName: 'FMEA',
    origin: 'Quân đội Hoa Kỳ (MIL-P-1629, 1949) & NASA / Hiệp hội Ô tô AIAG',
    tagline: 'Chủ động tính điểm rủi ro và ngăn ngừa lỗi tiềm ẩn trước khi sản phẩm đi vào thực tế.',
    category: 'root-cause',
    complexity: 'Advanced',
    timeframe: '1–4 weeks',
    teamSize: 'Cross-Functional (5–15)',
    cynefinDomain: 'Complicated',
    bestFor: 'Kỹ thuật an toàn trọng yếu, thiết bị y tế, triển khai kiến trúc phần mềm lõi và phần cứng hàng không.',
    whenToAvoid: 'Giai đoạn thử nghiệm prototype ban đầu khi yêu cầu thay đổi từng giờ.',
    summary: 'FMEA là phương pháp chủ động, có cấu trúc nhằm đánh giá một quy trình hoặc thiết kế để nhận diện xem nó có thể hỏng hóc ở đâu, hậu quả ra sao, và chấm điểm mức độ rủi ro thông qua Chỉ số RPN = Mức độ nghiêm trọng (S) × Xác suất xảy ra (O) × Khả năng phát hiện (D).',
    steps: [
      {
        number: 1,
        title: 'Phân rã các thành phần / bước quy trình',
        description: 'Chia nhỏ sản phẩm hoặc quy trình thành từng cấu phần riêng biệt.',
        actionableTip: 'Lập bản đồ mọi điểm chạm của người dùng hoặc điểm tích hợp API.'
      },
      {
        number: 2,
        title: 'Nhận diện các dạng hỏng hóc & tác động',
        description: 'Liệt kê mọi cách thức mà từng thành phần có thể bị lỗi và hậu quả dây chuyền đi kèm.',
        actionableTip: 'Xem xét cả sự cố thảm khốc lẫn các suy giảm chất lượng âm thầm.'
      },
      {
        number: 3,
        title: 'Chấm điểm S, O, D (Thang 1-10)',
        description: 'Chấm điểm Mức độ nghiêm trọng (S), Tần suất xuất hiện (O), Khả năng phát hiện sớm (D). Tính chỉ số RPN = S × O × D.',
        actionableTip: 'Ưu tiên các hạng mục có Nghiêm trọng S >= 9 bất kể RPN tổng thể là bao nhiêu.'
      },
      {
        number: 4,
        title: 'Triển khai biện pháp giảm thiểu & Đánh giá lại',
        description: 'Thiết kế các chốt chặn phòng ngừa, kiểm thử tự động, hoặc cơ chế dự phòng failover để hạ chỉ số RPN.',
        actionableTip: 'Đánh giá lại sau khi triển khai để chứng minh mức rủi ro còn lại đã an toàn.'
      }
    ],
    keyQuestions: [
      'Tình huống xấu nhất là gì nếu cơ sở dữ liệu chính hoặc cụm máy chủ khu vực bị mất kết nối?',
      'Hệ thống giám sát hiện tại có phát hiện được lỗi âm thầm trước khi khách hàng phàn nàn không?',
      'Thiết kế khóa liên động nào có thể triệt tiêu hoàn toàn khả năng xảy ra lỗi?'
    ],
    exampleUseCase: {
      title: 'Hệ Thống Phanh Xe Tự Hành Thông Minh',
      scenario: 'Thiết kế bộ kích hoạt phanh xe tự hành cho tiêu chuẩn xe thương mại Cấp 1.',
      application: 'FMEA chỉ ra dây cảm biến bàn đạp phanh bị lỏng có S=10, O=3, D=7 (RPN = 210). Bổ sung cảm biến Hall kép song song kèm mạch kiểm tra phần cứng độc lập.',
      outcome: 'Giảm chỉ số Phát hiện D từ 7 xuống 1, đưa RPN về mức 30, đạt tiêu chuẩn an toàn ISO 26262 ASIL D.'
    },
    pros: [
      'Ngăn chặn sự cố thảm khốc ngay từ trên bàn thiết kế',
      'Tạo ra ma trận rủi ro có thể đo lường và phục vụ kiểm toán an toàn',
      'Buộc đội ngũ phải tư duy vượt ra ngoài kịch bản màu hồng'
    ],
    cons: [
      'Tiêu tốn nhiều thời gian và nguồn lực; dễ rơi vào tê liệt phân tích',
      'Điểm số RPN có thể mang tính chủ quan giữa các chuyên gia khác nhau'
    ],
    toolsNeeded: ['Bảng tính FMEA', 'Sơ đồ nguyên lý hệ thống', 'Bảng phân loại lỗi'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 70,
      analyticalVsCreative: 15
    }
  },
  {
    id: 'pareto',
    name: 'Nguyên Lý Pareto (Quy Tắc 80/20)',
    shortName: 'Pareto (80/20)',
    origin: 'Vilfredo Pareto & Joseph Juran (Quản lý chất lượng, 1941)',
    tagline: 'Xác định chính xác 20% nguyên nhân cốt lõi tạo ra 80% khuyết tật hoặc phàn nàn của khách hàng.',
    category: 'prioritization',
    complexity: 'Beginner',
    timeframe: '< 1 hour',
    teamSize: 'Solo',
    cynefinDomain: 'Clear',
    bestFor: 'Xử lý khi bị quá tải bởi hàng trăm ticket hỗ trợ, lỗi bug phần mềm hoặc danh sách khiếu nại.',
    whenToAvoid: 'Khi đối mặt với các sự kiện Thiên nga đen hiếm gặp nhưng có thể gây tử vong/phá sản ngay lập tức.',
    summary: 'Phân tích Pareto dùng phương pháp thống kê sắp xếp để phân biệt giữa "thiểu số sống còn" (vital few) và "đa số vụn vặt" (trivial many). Bằng cách tập trung nguồn lực vào nhóm nguyên nhân nhỏ gây ra phần lớn hậu quả, đội ngũ đạt được hiệu suất giải quyết vấn đề cao nhất.',
    steps: [
      {
        number: 1,
        title: 'Thu thập dữ liệu vấn đề',
        description: 'Tổng hợp nhật ký lỗi, ticket hỗ trợ hoặc thời gian trễ thành một bảng số liệu.',
        actionableTip: 'Đảm bảo khoảng thời gian lấy mẫu mang tính đại diện.'
      },
      {
        number: 2,
        title: 'Phân nhóm & đếm tần suất',
        description: 'Gộp các mục theo nguyên nhân gốc rễ và tính tổng số lần xuất hiện cùng chi phí tổn thất.',
        actionableTip: 'Chuẩn hóa tên gọi để gộp các danh mục trùng lặp.'
      },
      {
        number: 3,
        title: 'Vẽ biểu đồ Pareto (Tần suất & % Tích lũy)',
        description: 'Sắp xếp danh mục giảm dần theo tần suất và tính phần trăm tích lũy lũy kế.',
        actionableTip: 'Tìm điểm gãy nơi 2-3 danh mục đầu tiên đã chiếm khoảng 80% tổng khối lượng.'
      },
      {
        number: 4,
        title: 'Tập trung hỏa lực vào thiểu số sống còn',
        description: 'Dành toàn bộ sprint trước mắt để tiêu diệt dứt điểm 20% nguyên nhân cốt lõi đó.',
        actionableTip: 'Tạm gác lại các lỗi nhỏ ở phần đuôi cho đến khi phần đầu đã được giải quyết.'
      }
    ],
    keyQuestions: [
      '2 hoặc 3 nhóm lỗi nào đang tạo ra 80% số lượng ticket khiếu nại của người dùng?',
      'Chúng ta có đang lãng phí thời gian sprint cho các lỗi giao diện ít người gặp không?',
      'Chi phí do lỗi gây ra so với công sức bỏ ra để sửa chữa có tương xứng không?'
    ],
    exampleUseCase: {
      title: 'Tần Suất Crash Ứng Dụng Ngân Hàng Trên Thiết Bị Di Động',
      scenario: 'Ứng dụng ngân hàng nhận bão 1 sao vì lỗi văng ứng dụng trên 84 mẫu điện thoại khác nhau.',
      application: 'Phân tích Pareto chỉ ra 3 lỗi crash chiếm tới 79.4% toàn bộ số phiên bị văng (khóa luồng Bluetooth và lỗi con trỏ camera null).',
      outcome: 'Sửa dứt điểm 3 lỗi đó trong 48 giờ; tỷ lệ người dùng không gặp lỗi nhảy từ 91% lên 99.2%.'
    },
    pros: [
      'Đem lại sự sáng tỏ ngay lập tức về nơi cần ưu tiên nguồn lực',
      'Định hướng dựa trên số liệu giúp dẹp bỏ các tranh cãi cảm tính chính trị',
      'Tạo ra ROI cao nhất trong thời gian ngắn nhất'
    ],
    cons: [
      'Dựa trên tần suất lịch sử; có thể bỏ sót các rủi ro hiếm gặp nhưng gây chết người',
      'Mặc định coi mọi vấn đề trong cùng danh mục có tác động tài chính ngang nhau'
    ],
    toolsNeeded: ['Bảng tính Excel / Truy vấn SQL', 'Trình tạo biểu đồ Pareto', 'Hệ thống quản lý ticket'],
    interactiveCanvasType: 'rice-calc',
    plotCoordinates: {
      complexityScore: 15,
      analyticalVsCreative: 10
    }
  },

  // --- 2. STRATEGIC THINKING & SENSE-MAKING ---
  {
    id: 'cynefin',
    name: 'Khung Nhận Thức Cynefin (Sense-Making)',
    shortName: 'Cynefin',
    origin: 'Dave Snowden (IBM Global Services / Cognitive Edge, 1999)',
    tagline: 'Chẩn đoán đúng bản chất của thực tại: Rõ ràng, Rắc rối, Phức tạp hay Hỗn loạn.',
    category: 'strategic',
    complexity: 'Intermediate',
    timeframe: '< 1 hour',
    teamSize: 'Cross-Functional (5–15)',
    cynefinDomain: 'Complex',
    bestFor: 'Xác định tư thế quản lý chính xác và tránh áp dụng công cụ máy móc cứng nhắc vào môi trường biến đổi khó lường.',
    whenToAvoid: 'Khi bối cảnh đã hoàn toàn rõ ràng 100% và chỉ cần thực thi theo checklist.',
    summary: 'Cynefin chia vấn đề thành 5 miền: Rõ ràng (Clear: Cảm nhận-Phân loại-Phản hồi), Rắc rối (Complicated: Cảm nhận-Phân tích-Phản hồi), Phức tạp (Complex: Thử nghiệm-Cảm nhận-Phản hồi), Hỗn loạn (Chaotic: Hành động-Cảm nhận-Phản hồi) và Chưa rõ (Confused). Nó bảo vệ nhà lãnh đạo khỏi việc ngộ nhận bối cảnh dẫn đến sai lầm chiến lược.',
    steps: [
      {
        number: 1,
        title: 'Đánh giá mối quan hệ Nhân - Quả',
        description: 'Quan hệ nhân-quả là lặp lại (Rõ ràng), cần chuyên gia phân tích (Rắc rối), chỉ thấy được sau khi sự việc đã diễn ra (Phức tạp), hay không có quy luật (Hỗn loạn)?',
        actionableTip: 'Không gượng ép sự chắc chắn lên các hệ thống tương tác con người hoặc thị trường.'
      },
      {
        number: 2,
        title: 'Xác định miền bối cảnh hiện tại',
        description: 'Định vị thách thức vào 1 trong 4 góc phần tư của Cynefin.',
        actionableTip: 'Cảnh giác ranh giới giữa Rõ ràng và Hỗn loạn—sự tự mãn quá mức sẽ dẫn tới sụp đổ bất ngờ.'
      },
      {
        number: 3,
        title: 'Áp dụng phương thức phản hồi tương ứng',
        description: 'Rõ ràng: Phân loại theo Best Practice. Rắc rối: Phân tích theo Good Practice. Phức tạp: Thử nghiệm thăm dò an toàn để học hỏi. Hỗn loạn: Hành động dập lửa ngay lập tức.',
        actionableTip: 'Trong miền Phức tạp, hãy chạy nhiều thử nghiệm nhỏ an toàn-để-thất-bại thay vì lập một kế hoạch tổng thể khổng lồ.'
      },
      {
        number: 4,
        title: 'Khuếch đại thành công & Thu hẹp thất bại',
        description: 'Theo dõi phản hồi. Dần chuyển dịch hệ thống sang miền Rắc rối hoặc Rõ ràng khi các quy luật đã ổn định.',
        actionableTip: 'Duy trì các góc nhìn đa dạng để tránh rơi vào vùng trung tâm Chưa rõ.'
      }
    ],
    keyQuestions: [
      'Một chuyên gia có thể phân tích được trước việc này không, hay câu trả lời chỉ xuất hiện trong quá trình thử nghiệm?',
      'Chúng ta có đang cố áp dụng Six Sigma hay 5 Whys cứng nhắc vào một hệ sinh thái con người sống động không?',
      'Nếu đang ở trong miền Hỗn loạn, hành động ổn định tình hình nào cần thực hiện ngay bây giờ?'
    ],
    exampleUseCase: {
      title: 'Đưa Trợ Lý AI Vào Phòng Khám Y Tế Tư Nhân',
      scenario: 'Công ty công nghệ phát triển AI hỗ trợ bác sĩ nhưng gặp phản ứng dữ dội và tâm lý lo sợ từ nhân viên y tế.',
      application: 'Nhận diện đây là miền Phức tạp (hành vi và tâm lý con người không thể dự đoán bằng công thức). Hủy bỏ kế hoạch triển khai đồng loạt 18 tháng; thay bằng 4 thử nghiệm nhỏ quy mô an toàn ở 4 phòng khám khác nhau.',
      outcome: 'Phát hiện một phòng khám thử nghiệm ghi âm nền tự động tạo sự tin tưởng vượt trội; lập tức xoay trục sản phẩm tập trung vào tính năng đó.'
    },
    pros: [
      'Ngăn chặn việc dùng sai công cụ cho sai bài toán',
      'Tạo ngôn ngữ chung mạch lạc giữa lãnh đạo, kỹ sư và đội ngũ sáng tạo',
      'Hợp thức hóa giá trị của việc thử nghiệm nhanh với chi phí thấp'
    ],
    cons: [
      'Đòi hỏi chuyển đổi tư duy thoát khỏi lối quản lý chỉ huy - kiểm soát cứng nhắc',
      'Có thể bị hiểu nhầm thành một ma trận phân loại 2x2 đơn thuần thay vì một mô hình cảm nhận động'
    ],
    toolsNeeded: ['Bản đồ không gian Cynefin', 'Biểu mẫu thiết kế thử nghiệm safe-to-fail'],
    interactiveCanvasType: 'cynefin-tester',
    plotCoordinates: {
      complexityScore: 75,
      analyticalVsCreative: 55
    }
  },
  {
    id: 'mece-issue-trees',
    name: 'Cây Vấn Đề MECE & Định Hướng Giả Thuyết',
    shortName: 'MECE & Issue Trees',
    origin: 'Barbara Minto (McKinsey & Company, thập niên 1960)',
    tagline: 'Phân rã bài toán kinh doanh phức tạp thành các nhánh Không Trùng Lặp và Không Bỏ Sót.',
    category: 'strategic',
    complexity: 'Advanced',
    timeframe: '1–4 weeks',
    teamSize: 'Small Team (2–6)',
    cynefinDomain: 'Complicated',
    bestFor: 'Tư vấn chiến lược, xoay chuyển lợi nhuận kinh doanh, thẩm định sáp nhập M&A và mở rộng thị trường mới.',
    whenToAvoid: 'Các bài toán sáng tạo nghệ thuật hoặc thiết kế ý tưởng khi các khái niệm cơ sở chưa hề tồn tại.',
    summary: 'MECE (Mutually Exclusive, Collectively Exhaustive) là tiêu chuẩn vàng trong giải quyết vấn đề của các hãng tư vấn quản trị hàng đầu. Nó phân rã câu hỏi lớn thành các cây phân nhánh logic không chồng chéo nhau và bao hàm toàn bộ trường hợp, kết hợp với việc đưa ra các giả thuyết có thể kiểm chứng từ sớm.',
    steps: [
      {
        number: 1,
        title: 'Xác định câu hỏi cốt lõi',
        description: 'Viết ra câu hỏi rõ ràng, có thể hành động được (ví dụ: "Làm thế nào để Công ty X tăng biên lợi nhuận hoạt động thêm 5% trong 18 tháng?").',
        actionableTip: 'Đảm bảo câu hỏi có thể đo lường được và định hướng đến việc ra quyết định.'
      },
      {
        number: 2,
        title: 'Xây dựng cây phân nhánh MECE',
        description: 'Tách bài toán thành 2-4 nhánh chính không trùng nhau và bao quát toàn bộ (ví dụ: Doanh thu vs. Chi phí).',
        actionableTip: 'Sử dụng các công thức toán học/tài chính (ví dụ: Lợi nhuận = Sản lượng × Giá - Chi phí cố định - Chi phí biến đổi) để đảm bảo chuẩn MECE.'
      },
      {
        number: 3,
        title: 'Đưa ra các giả thuyết có thể bác bỏ sớm',
        description: 'Đưa ra phán đoán có cơ sở về nhánh nào đem lại đòn bẩy thay đổi lớn nhất.',
        actionableTip: 'Một giả thuyết tốt là giả thuyết có thể được chứng minh là sai bằng dữ liệu chỉ trong vài ngày.'
      },
      {
        number: 4,
        title: 'Thiết kế phân tích mục tiêu để kiểm tra giả thuyết',
        description: 'Xây dựng mô hình tài chính hoặc khảo sát tập trung tuyệt đối vào việc chứng minh hoặc bác bỏ giả thuyết đó.',
        actionableTip: 'Tránh việc "đun sôi cả đại dương"—tuyệt đối không phân tích những nhánh không có đòn bẩy.'
      }
    ],
    keyQuestions: [
      'Các nhánh này có hoàn toàn loại trừ lẫn nhau không (không tính trùng)?',
      'Chúng có bao quát toàn bộ không gian vấn đề không (không bỏ sót khả năng nào)?',
      'Dữ liệu nào sẽ chứng minh giả thuyết ban đầu của chúng ta là sai?'
    ],
    exampleUseCase: {
      title: 'Biên Lợi Nhuận Bán Lẻ Trực Tuyến Bị Xói Mòn',
      scenario: 'Doanh nghiệp thương mại điện tử sụt giảm 12% biên lợi nhuận gộp dù doanh số vẫn tăng trưởng.',
      application: 'Xây cây MECE: Lợi nhuận = (Giá trị đơn - Giá vốn - Phí vận chuyển - Chi phí đổi trả). Đặt giả thuyết tỷ lệ đổi trả tăng vọt. Dữ liệu chứng minh tỷ lệ đổi trả hàng điện tử giá trị cao tăng từ 4% lên 22% do lỗi đóng gói của nhà cung cấp.',
      outcome: 'Siết chặt quy trình kiểm định hàng điện tử trước khi giao, khôi phục biên lợi nhuận trong 60 ngày.'
    },
    pros: [
      'Loại bỏ các công việc vô bổ và nghiên cứu lan man không trọng tâm',
      'Cung cấp cấu trúc báo cáo mạch lạc, thuyết phục hoàn toàn các giám đốc điều hành',
      'Quy mô áp dụng linh hoạt từ dự án nhỏ đến các thương vụ hàng tỷ USD'
    ],
    cons: [
      'Đòi hỏi kỷ luật tư duy logic cao để xây dựng cây MECE chuẩn xác',
      'Có thể tạo cảm giác máy móc nếu áp dụng vào các vấn đề văn hóa xã hội phi định lượng'
    ],
    toolsNeeded: ['Phần mềm vẽ sơ đồ tư duy', 'Bảng tính mô hình tài chính', 'Sổ theo dõi giả thuyết'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 65,
      analyticalVsCreative: 25
    }
  },
  {
    id: 'ooda-loop',
    name: 'Vòng Lặp OODA (Quan Sát - Định Hướng - Quyết Định - Hành Động)',
    shortName: 'OODA Loop',
    origin: 'Đại tá John Boyd (Không quân Hoa Kỳ, 1976)',
    tagline: 'Chiếm thế thượng phong và áp đảo đối thủ bằng cách xoay chuyển chu kỳ nhận thức và ra quyết định nhanh hơn.',
    category: 'strategic',
    complexity: 'Intermediate',
    timeframe: '< 1 hour',
    teamSize: 'Solo',
    cynefinDomain: 'Chaotic',
    bestFor: 'Chiến lược cạnh tranh khốc liệt, phản ứng sự cố an ninh mạng, thị trường biến động dữ dội và xử lý khủng hoảng.',
    whenToAvoid: 'Môi trường hành chính quan liêu chậm chạp nơi tốc độ bị pháp luật hoặc quy chế cấm đoán.',
    summary: 'Được phát triển bởi nhà chiến lược quân sự John Boyd, Vòng lặp OODA là mô hình tâm lý liên tục dành cho các môi trường xung đột năng động. Bên nào hoàn thành chu kỳ Quan sát - Định hướng - Quyết định - Hành động nhanh và chuẩn xác hơn sẽ kiểm soát nhịp độ, buộc đối phương rơi vào tình trạng hoang mang và sụp đổ.',
    steps: [
      {
        number: 1,
        title: 'Quan sát (Observe - Tín hiệu môi trường thô)',
        description: 'Thu thập nhận thức tình huống thời gian thực. Phát hiện các bất thường, động thái thị trường hoặc vector tấn công.',
        actionableTip: 'Cảnh giác với việc chỉ dựa vào các dashboard lịch sử đã lỗi thời.'
      },
      {
        number: 2,
        title: 'Định hướng (Orient - Cốt lõi: Mô hình tâm trí)',
        description: 'Tổng hợp các quan sát qua lăng kính kinh nghiệm, văn hóa, thông tin mới và các mô hình tư duy.',
        actionableTip: 'Định hướng là giai đoạn quyết định nhất: đập tan các giả định cũ để thích ứng tức thì với thực tại.'
      },
      {
        number: 3,
        title: 'Quyết định (Decide - Chọn phương án có thể kiểm chứng)',
        description: 'Lựa chọn một bước đi dứt khoát. Trong hỗn loạn, tốc độ quan trọng hơn sự đắn đo hoàn hảo.',
        actionableTip: 'Chỉ cần đạt ngưỡng chắc chắn 70%—chờ đợi đến khi chắc chắn 95% đồng nghĩa với việc bạn đã quá muộn.'
      },
      {
        number: 4,
        title: 'Hành động (Act - Thực thi & Quan sát phản ứng ngay lập tức)',
        description: 'Thực hiện hành động mạnh mẽ và ngay lập tức quay lại bước Quan sát để xem hệ thống phản ứng ra sao.',
        actionableTip: 'Hành động không phải là điểm kết thúc; nó là một phép thử thăm dò phản ứng của đối phương.'
      }
    ],
    keyQuestions: [
      'Vòng lặp phản hồi của chúng ta nhanh hơn hay chậm hơn tốc độ thay đổi của môi trường bên ngoài?',
      'Mô hình tư duy lỗi thời nào đang làm đội ngũ bị mù quáng trước thực tại?',
      'Hành động thăm dò bất ngờ nào chúng ta có thể thực hiện ngay lúc này để giành lại thế chủ động?'
    ],
    exampleUseCase: {
      title: 'Ứng Phó Đợt Tấn Công Mã Hóa Dữ Liệu Ransomware Zero-Day',
      scenario: 'Công ty vận tải toàn cầu bị mã hóa máy chủ hàng loạt lúc 2 giờ sáng.',
      application: 'Đội bảo mật kích hoạt OODA thần tốc: Quan sát thấy lưu lượng SMB bất thường, Định hướng ngay đây là chủng ransomware lây lan qua mạng nội bộ, Quyết định ngắt kết nối đường trục WAN toàn cầu ngay lập tức, Hành động trong vòng 4 phút.',
      outcome: 'Cô lập mã độc trong 3 văn phòng chi nhánh, cứu nguy cho 28.000 máy trạm doanh nghiệp và khoản tiền chuộc 40 triệu USD.'
    },
    pros: [
      'Xây dựng sự nhạy bén và khả năng phục hồi cực cao trong biến động',
      'Đề cao sự thích ứng tâm lý thay vì bám víu vào kế hoạch cứng nhắc',
      'Trao quyền tự chủ ra quyết định nhanh chóng cho tuyến đầu'
    ],
    cons: [
      'Dễ dẫn đến các quyết định giật cục nếu giai đoạn Định hướng bị xem nhẹ',
      'Đòi hỏi kỷ luật tinh thần và sự điềm tĩnh dưới áp lực cao'
    ],
    toolsNeeded: ['Dữ liệu giám sát thời gian thực', 'Phòng tác chiến sự cố', 'Sổ ghi nhận quyết định'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 80,
      analyticalVsCreative: 60
    }
  },
  {
    id: 'inversion',
    name: 'Tư Duy Đảo Ngược & Hệ Quả Bậc Hai',
    shortName: 'Tư Duy Đảo Ngược',
    origin: 'Carl Jacobi / Charlie Munger / Howard Marks',
    tagline: 'Tránh thảm họa bằng cách giải bài toán ngược lại: "Luôn luôn đảo ngược."',
    category: 'strategic',
    complexity: 'Intermediate',
    timeframe: '< 1 hour',
    teamSize: 'Solo',
    cynefinDomain: 'Complicated',
    bestFor: 'Đầu tư mạo hiểm rủi ro cao, kiến trúc hệ thống, quản trị rủi ro và ngăn ngừa điểm mù chí mạng.',
    whenToAvoid: 'Khi bạn cần tìm kiếm cảm hứng sáng tạo ban đầu từ con số không.',
    summary: 'Được cổ vũ mạnh mẽ bởi Charlie Munger ("Tất cả những gì tôi muốn biết là nơi tôi sẽ chết để tôi không bao giờ đến đó"), Tư duy đảo ngược lật ngược vấn đề: thay vì hỏi "Làm sao để thành công?", hãy hỏi "Làm sao để chắc chắn thất bại thảm hại?" và sau đó triệt tiêu tất cả các yếu tố đó.',
    steps: [
      {
        number: 1,
        title: 'Lật ngược câu hỏi 180 độ',
        description: 'Phát biểu điều ngược lại hoàn toàn với mục tiêu của bạn (ví dụ: "Làm thế nào để đợt ra mắt sản phẩm này trở thành thảm họa?").',
        actionableTip: 'Tạo tâm lý thoải mái để nhóm có thể tự do nêu ra các kịch bản tồi tệ nhất.'
      },
      {
        number: 2,
        title: 'Lập bản đồ "Kịch bản thất bại chắc chắn"',
        description: 'Động não mọi quyết định, hành vi hoặc lỗ hổng có thể đảm bảo dẫn tới thảm họa đó.',
        actionableTip: 'Hãy thành thật thừa nhận những thói quen hiện tại của công ty đang giống với kịch bản thất bại này.'
      },
      {
        number: 3,
        title: 'Truy vết hệ quả bậc hai và bậc ba',
        description: 'Hỏi câu hỏi: "Và rồi điều gì sẽ xảy ra tiếp theo?" Truy vết tác động dây chuyền tới động lực nhân sự, phản ứng đối thủ và nút thắt cổ chai.',
        actionableTip: 'Tư duy bậc một chỉ nhìn vào lợi ích trước mắt; tư duy bậc hai nhìn vào hậu quả mang tính hệ thống lâu dài.'
      },
      {
        number: 4,
        title: 'Thiết lập hàng rào bảo vệ vững chắc',
        description: 'Xây dựng các quy tắc kiểm tra, checklist hoặc quy chuẩn tự động để biến những hành vi gây hại đó thành bất khả thi.',
        actionableTip: 'Tập trung vào việc nhất quán không phạm sai lầm ngớ ngẩn thay vì cố gắng tìm kiếm sự xuất chúng nhất thời.'
      }
    ],
    keyQuestions: [
      'Nếu muốn phá hủy hoàn toàn dự án này trong 6 tháng tới, chúng ta sẽ làm gì hôm nay?',
      'Hậu quả ngoài ý muốn bậc hai của giải pháp chúng ta đang đề xuất là gì?',
      'Chúng ta có đang đánh đổi một lợi ích nhỏ trước mắt lấy một rủi ro thảm họa tiềm ẩn trong tương lai không?'
    ],
    exampleUseCase: {
      title: 'Thay Đổi Chính Sách Giá Phần Mềm Đăng Ký Định Kỳ (SaaS)',
      scenario: 'Công ty SaaS định ép buộc toàn bộ khách hàng phải trả trước theo năm để tăng dòng tiền ngắn hạn.',
      application: 'Áp dụng đảo ngược: Làm sao để khiến các lập trình viên ủng hộ chúng ta quay lưng bỏ đi? Phân tích bậc hai cho thấy bỏ gói tháng sẽ bóp nghẹt phễu tiếp cận tự nhiên của các startup, giảm 60% lượng người dùng mới.',
      outcome: 'Giữ gói trả theo tháng với mức giá hợp lý; bổ sung ưu đãi hấp dẫn cho gói năm mà không làm mất đi cộng đồng người dùng trung thành.'
    },
    pros: [
      'Vạch trần những lỗ hổng chết người mà sự lạc quan thái quá thường bỏ qua',
      'Giảm thiểu đáng kể nguy cơ rủi ro phá sản',
      'Rất dễ tổ chức trong các buổi họp pre-mortem trước dự án'
    ],
    cons: [
      'Có thể tạo ra bầu không khí tiêu cực nếu không được cân bằng với tinh thần hành động',
      'Bản thân nó không tự sinh ra các giá trị hoặc ý tưởng sản phẩm mới'
    ],
    toolsNeeded: ['Biểu mẫu pre-mortem', 'Ma trận phân tích hệ quả bậc hai'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 50,
      analyticalVsCreative: 45
    }
  },
  {
    id: 'first-principles',
    name: 'Tư Duy Nguyên Lý Khởi Nguyên (First Principles Thinking)',
    shortName: 'Nguyên Lý Đầu Tiên',
    origin: 'Aristotle / Vật lý & Kỹ thuật (Được phổ biến bởi Elon Musk)',
    tagline: 'Phân rã thực tại về những chân lý nền tảng không thể chối cãi và suy luận dựng lên từ đó, từ chối sao chép theo tương tự.',
    category: 'strategic',
    complexity: 'Advanced',
    timeframe: '1–4 weeks',
    teamSize: 'Small Team (2–6)',
    cynefinDomain: 'Complicated',
    bestFor: 'Giảm giá thành đột phá hàng chục lần, đổi mới công nghệ đột phá và thách thức những giáo điều thâm căn cố đế của ngành.',
    whenToAvoid: 'Các công việc vận hành thông thường nơi việc sao chép quy trình chuẩn có sẵn mang lại hiệu quả nhanh gấp 100 lần.',
    summary: 'Tư duy từ nguyên lý đầu tiên là việc bóc tách một vấn đề về những chân lý cơ bản nhất, vững chắc nhất mà bạn biết, rồi từ đó suy luận xây dựng giải pháp mới, thay vì suy luận theo lối so sánh tương tự (bắt chước cách người khác làm với một vài chỉnh sửa nhỏ).',
    steps: [
      {
        number: 1,
        title: 'Nhận diện & nêu rõ giáo điều hiện tại',
        description: 'Liệt kê các giả định truyền thống của ngành (ví dụ: "Pin luôn có giá 600 USD/kWh vì các nhà cung cấp báo giá như vậy").',
        actionableTip: 'Chất vấn định kiến thông thường bằng câu hỏi: "Tại sao nó bắt buộc phải như vậy?"'
      },
      {
        number: 2,
        title: 'Phân rã về các chân lý vật lý nền tảng',
        description: 'Bóc tách mọi chi phí trung gian và di sản lịch sử. Các thành phần nguyên tố hoặc giới hạn vật lý thuần túy là gì?',
        actionableTip: 'Xem xét giá giao dịch kim loại giao ngay trên sàn London hoặc bảng tuần hoàn hóa học.'
      },
      {
        number: 3,
        title: 'Tính toán mức sàn lý thuyết tối thiểu',
        description: 'Tính tổng chi phí vật liệu thô và năng lượng lý thuyết cần thiết. Đây chính là mức sàn giới hạn thực sự.',
        actionableTip: 'Khoảng cách giữa mức sàn lý thuyết và giá thị trường chính là cơ hội kỹ thuật khổng lồ.'
      },
      {
        number: 4,
        title: 'Tái cấu trúc giải pháp mới từ con số không',
        description: 'Thiết kế quy trình sản xuất, sản phẩm hoặc phần mềm từ gốc để tiệm cận mức sàn lý thuyết đó.',
        actionableTip: 'Tự chủ sản xuất nội bộ nếu các nhà cung cấp bên ngoài không thể đáp ứng mức giá vật lý.'
      }
    ],
    keyQuestions: [
      'Ràng buộc này bắt nguồn từ các định luật vật lý hay chỉ là quy ước lịch sử thông thường?',
      'Các nguyên tố cấu thành cơ bản nhất của cơ cấu chi phí này là gì?',
      'Nếu chúng ta bắt đầu lại từ đầu vào ngày hôm nay với công nghệ hiện đại, chúng ta sẽ chế tạo nó như thế nào?'
    ],
    exampleUseCase: {
      title: 'Tên Lửa Tái Sử Dụng Falcon 9 Của SpaceX',
      scenario: 'Quan điểm chung của ngành hàng không vũ trụ là tên lửa dùng một lần rồi bỏ và chi phí phóng tối thiểu 65 triệu USD.',
      application: 'Musk phân tích vật liệu tên lửa: Hợp kim nhôm hàng không, titan, sợi carbon, dầu hỏa rocket và oxy lỏng. Chi phí nguyên liệu thô chỉ chiếm khoảng 2% giá thành tên lửa. Phần còn lại là do chi phí sản xuất quan liêu và việc vứt bỏ tên lửa sau 1 lần bay.',
      outcome: 'Chế tạo tầng đẩy tên lửa tái sử dụng và tự sản xuất linh kiện nội bộ, giảm hơn 70% chi phí phóng và thống trị ngành phóng vệ tinh toàn cầu.'
    },
    pros: [
      'Mở ra những bước nhảy vọt đột phá gấp 10 lần thay vì chỉ cải tiến nhỏ giọt 10%',
      'Phá vỡ thế độc quyền và biên lợi nhuận bị thổi phồng của các nhà cung cấp truyền thống',
      'Xây dựng hào kinh tế công nghệ vững chắc khó sao chép'
    ],
    cons: [
      'Đòi hỏi nỗ lực trí tuệ, lòng dũng cảm và độ sâu kỹ thuật rất lớn',
      'Rủi ro thất bại cao nếu tính toán sai các giả định vật lý nền tảng'
    ],
    toolsNeeded: ['Thông số vật lý/hóa học', 'Bảng phân tích chi phí vật liệu', 'Mô hình kiến trúc CAD'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 85,
      analyticalVsCreative: 70
    }
  },

  // --- 3. HUMAN-CENTERED & CREATIVE INNOVATION ---
  {
    id: 'design-thinking',
    name: 'Tư Duy Thiết Kế 5 Bước (Design Thinking)',
    shortName: 'Design Thinking',
    origin: 'Stanford d.school / David Kelley & Tim Brown (IDEO, 1991)',
    tagline: 'Thấu cảm, Xác định, Lên ý tưởng, Tạo mẫu và Thử nghiệm để giải quyết các vấn đề phức tạp hướng tới con người.',
    category: 'innovation',
    complexity: 'Intermediate',
    timeframe: '1–4 weeks',
    teamSize: 'Cross-Functional (5–15)',
    cynefinDomain: 'Complex',
    bestFor: 'Khó khăn trong việc chấp nhận sản phẩm, khách hàng rời bỏ, khám phá sản phẩm mới và các bài toán xã hội phức tạp.',
    whenToAvoid: 'Các lỗi tính toán thuần toán học, cơ khí chính xác hoặc yêu cầu pháp lý không có yếu tố con người.',
    summary: 'Design Thinking là một quy trình lặp đi lặp lại phi tuyến tính được sử dụng để thấu hiểu người dùng, thách thức các giả định, định nghĩa lại vấn đề và tạo ra các giải pháp sáng tạo mang tính đột phá. Nó gồm 5 giai đoạn: Thấu cảm, Xác định, Lên ý tưởng, Tạo mẫu thử và Kiểm thử.',
    steps: [
      {
        number: 1,
        title: 'Thấu cảm (Empathize - Quan sát & Lắng nghe)',
        description: 'Phỏng vấn sâu, quan sát trực tiếp hành vi người dùng trong bối cảnh thực tế để cảm nhận nỗi đau của họ.',
        actionableTip: 'Quan sát những gì người dùng THỰC SỰ LÀM, không chỉ những gì họ nói họ làm.'
      },
      {
        number: 2,
        title: 'Xác định (Define - Đóng khung vấn đề)',
        description: 'Tổng hợp các quan sát thành một Phát biểu vấn đề lấy con người làm trung tâm: [Người dùng] cần [nhu cầu] vì [thấu thị bất ngờ].',
        actionableTip: 'Đóng khung bằng các câu hỏi cơ hội: "Chúng ta có thể làm thế nào để...?" (How Might We?).'
      },
      {
        number: 3,
        title: 'Lên ý tưởng (Ideate - Động não phân kỳ)',
        description: 'Tạo ra số lượng lớn các ý tưởng sáng tạo mà không phán xét đúng sai quá sớm.',
        actionableTip: 'Tập trung vào số lượng và phát triển tiếp nối trên ý tưởng của người khác trước khi sàng lọc.'
      },
      {
        number: 4,
        title: 'Tạo mẫu thử (Prototype - Biến ý tưởng thành hiện thực)',
        description: 'Làm các mô hình mẫu đơn giản bằng giấy, wireframe có thể bấm được, hoặc mô hình bìa carton trong vài giờ.',
        actionableTip: 'Giữ mẫu thử ở độ trung thực thấp (low-fidelity) để người dùng thoải mái góp ý chê bai.'
      },
      {
        number: 5,
        title: 'Thử nghiệm (Test - Lắng nghe phản hồi thực tế)',
        description: 'Đưa mẫu thử vào tay người dùng mục tiêu, quan sát hành vi, lắng nghe phản hồi thô mộc và tinh chỉnh.',
        actionableTip: 'Tuyệt đối không giải thích hay bảo vệ mẫu thử trong khi kiểm thử; hãy hỏi: "Bạn đã mong đợi điều gì xảy ra ở đây?"'
      }
    ],
    keyQuestions: [
      'Chúng ta thực sự đang giải quyết nỗi đau của ai, và chúng ta đã tận mắt chứng kiến họ trải qua nỗi đau đó chưa?',
      'Chúng ta đang đóng khung vấn đề quanh nhu cầu của người dùng hay quanh chỉ số kinh doanh nội bộ?',
      'Mẫu thử rẻ nhất có thể kiểm chứng được giả định cốt lõi của chúng ta ngay hôm nay là gì?'
    ],
    exampleUseCase: {
      title: 'Tái Thiết Kế Máy Chụp Cộng Hưởng Từ Trẻ Em Của GE Healthcare',
      scenario: 'Doug Dietz nhận thấy 80% trẻ em phải tiêm thuốc mê vì quá hoảng sợ trước tiếng ồn và vẻ ngoài lạnh lẽo của máy chụp MRI.',
      application: 'Áp dụng Design Thinking: Thấu cảm với bệnh nhi, định nghĩa lại bài toán từ "thiết kế lại máy quét y tế" thành "biến hành trình ở bệnh viện thành một chuyến phiêu lưu". Tạo ra "Chuỗi phiêu lưu GE" (biến máy chụp thành tàu cướp biển và safari rừng xanh).',
      outcome: 'Tỷ lệ trẻ phải gây mê giảm từ 80% xuống dưới 0.5%, chỉ số hài lòng của phụ huynh và bệnh viện vượt 90%.'
    },
    pros: [
      'Khai mở sự thấu cảm chân thực và tạo ra đột phá về trải nghiệm người dùng',
      'Giảm thiểu rủi ro thất bại sản phẩm nhờ tạo mẫu thử nhanh giá rẻ',
      'Kích thích sự gắn kết và năng lượng sáng tạo liên phòng ban'
    ],
    cons: [
      'Có thể tạo cảm giác mơ hồ với những kỹ sư quen tư duy logic đóng',
      'Bắt buộc phải có khả năng tiếp cận trực tiếp với người dùng cuối thực tế'
    ],
    toolsNeeded: ['Kịch bản phỏng vấn', 'Figma / Miro', 'Giấy ghi chú Post-it', 'Vật liệu làm mẫu thử nhanh'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 50,
      analyticalVsCreative: 90
    }
  },
  {
    id: 'double-diamond',
    name: 'Mô Hình Kim Cương Kép (Double Diamond)',
    shortName: 'Kim Cương Kép',
    origin: 'Hội đồng Thiết kế Vương quốc Anh (Design Council UK, 2004)',
    tagline: 'Cân bằng giữa khám phá phân kỳ và hội tụ trọng tâm: Khám phá, Xác định, Phát triển, Chuyển giao.',
    category: 'innovation',
    complexity: 'Intermediate',
    timeframe: '1–4 weeks',
    teamSize: 'Cross-Functional (5–15)',
    cynefinDomain: 'Complex',
    bestFor: 'Thiết kế dịch vụ, tái cấu trúc trải nghiệm sản phẩm từ đầu đến cuối và đảm bảo giải quyết ĐÚNG VẤN ĐỀ trước khi GIẢI QUYẾT NÓ ĐÚNG CÁCH.',
    whenToAvoid: 'Các lỗi vá kỹ thuật ngắn hạn cần xử lý ngay trong vòng 30 phút.',
    summary: 'Kim Cương Kép mô tả hành trình thiết kế qua hai viên kim cương đại diện cho tư duy phân kỳ (mở rộng) và hội tụ (thu hẹp): Kim cương 1 (Khám phá & Xác định = Tìm hiểu không gian vấn đề -> chốt lại đúng bài toán); Kim cương 2 (Phát triển & Chuyển giao = Tìm kiếm nhiều giải pháp -> kiểm chứng và bàn giao giải pháp tối ưu).',
    steps: [
      {
        number: 1,
        title: 'Khám phá (Discover - Mở rộng không gian vấn đề)',
        description: 'Nghiên cứu rộng rãi bối cảnh, xu hướng, hành vi người dùng và các trường hợp ngoại lệ.',
        actionableTip: 'Mở rộng tầm mắt; kiềm chế ham muốn vội vàng nhảy ngay vào tìm giải pháp.'
      },
      {
        number: 2,
        title: 'Xác định (Define - Thu hẹp chọn đúng vấn đề cốt lõi)',
        description: 'Tổng hợp các phát hiện nghiên cứu thành một bản tóm tắt thiết kế sáng tạo rõ ràng với các ràng buộc cụ thể.',
        actionableTip: 'Đảm bảo tất cả các bên liên quan đều thống nhất về định nghĩa vấn đề duy nhất này.'
      },
      {
        number: 3,
        title: 'Phát triển (Develop - Mở rộng các phương án giải pháp)',
        description: 'Cùng thiết kế nhiều phương án giải pháp, kiến trúc kỹ thuật và hành trình người dùng.',
        actionableTip: 'Khuyến khích sự đóng góp đa ngành từ kỹ sư, nhà thiết kế và tiếp thị.'
      },
      {
        number: 4,
        title: 'Chuyển giao (Deliver - Thu hẹp & Thử nghiệm giải pháp)',
        description: 'Thử nghiệm, chạy thử nghiệm pilot, hoàn thiện và phát hành giải pháp đã chọn kèm theo các chỉ số theo dõi.',
        actionableTip: 'Gắn các công cụ phân tích số liệu để đo lường tác động thực tế sau khi ra mắt.'
      }
    ],
    keyQuestions: [
      'Chúng ta hiện đang ở chế độ tư duy phân kỳ (mở rộng) hay hội tụ (thu hẹp)?',
      'Chúng ta đã kiểm chứng rằng mình đang giải quyết đúng nguyên nhân gốc rễ hay chỉ đang chữa triệu chứng?',
      'Bằng chứng nào cho thấy giải pháp bàn giao đáp ứng đúng yêu cầu đã xác định ban đầu?'
    ],
    exampleUseCase: {
      title: 'Đổi Mới Cổng Dịch Vụ Công Kỹ Thuật Số Vương Quốc Anh (Gov.uk)',
      scenario: 'Chính phủ Anh cần hợp nhất hàng trăm website bộ ngành rời rạc thành một cổng thông tin duy nhất cho công dân.',
      application: 'Dùng Kim cương kép: Khám phá những rào cản của người dân xoay quanh các sự kiện cuộc đời (nộp thuế, bầu cử, khai sinh). Xác định các hành trình người dùng chung. Phát triển các thành phần hệ thống thiết kế chuẩn hóa. Chuyển giao cổng Gov.uk duy nhất.',
      outcome: 'Tiết kiệm hàng tỷ bảng tiền thuế công nghệ và đạt giải thưởng Thiết kế của năm.'
    },
    pros: [
      'Mô hình trực quan rõ ràng tách bạch giữa việc tìm đúng vấn đề và tìm đúng giải pháp',
      'Ngăn ngừa việc vội vàng đâm đầu vào giải quyết sai bài toán',
      'Khung tiêu chuẩn được tin dùng bởi các tập đoàn thiết kế hàng đầu thế giới'
    ],
    cons: [
      'Có thể bị coi như mô hình thác nước cứng nhắc nếu đội ngũ lờ đi các vòng lặp phản hồi',
      'Đòi hỏi người điều phối vững tay để chuyển giao nhịp nhàng giữa hai pha phân kỳ và hội tụ'
    ],
    toolsNeeded: ['Kho lưu trữ nghiên cứu', 'Bản đồ hành trình khách hàng', 'Figma', 'Bộ công cụ kiểm thử người dùng'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 55,
      analyticalVsCreative: 85
    }
  },
  {
    id: 'triz',
    name: 'TRIZ - Lý Thuyết Giải Quyết Vấn Đề Sáng Tạo',
    shortName: 'TRIZ',
    origin: 'Genrich Altshuller & Cục Sáng chế Hải quân Liên Xô (1946–1985)',
    tagline: 'Giải quyết triệt để các mâu thuẫn kỹ thuật và vật lý mà không phải chấp nhận sự đánh đổi thỏa hiệp.',
    category: 'innovation',
    complexity: 'Advanced',
    timeframe: '1–2 days',
    teamSize: 'Small Team (2–6)',
    cynefinDomain: 'Complicated',
    bestFor: 'Các điểm nghẽn kỹ thuật hóc búa nơi việc cải thiện một thông số (như tốc độ) làm suy giảm một thông số khác (như trọng lượng hoặc nhiệt độ).',
    whenToAvoid: 'Các mâu thuẫn giao tiếp cá nhân, đánh giá thẩm mỹ chủ quan hoặc sắp xếp lịch trình thông thường.',
    summary: 'TRIZ là phương pháp luận sáng tạo có hệ thống dựa trên việc nghiên cứu hơn 400.000 bằng sáng chế. Nó khẳng định rằng mọi đột phá kỹ thuật đều giải quyết một mâu thuẫn cốt lõi bằng các nguyên tắc sáng tạo phổ quát (như Phân nhỏ, Đảo ngược, Đệm linh hoạt, Thực hiện trước, v.v.).',
    steps: [
      {
        number: 1,
        title: 'Phát biểu bài toán dưới dạng Mâu thuẫn Kỹ thuật',
        description: 'Nêu rõ xung đột: "Nếu tôi cải thiện Thông số X (ví dụ: Độ bền), thì Thông số Y (ví dụ: Trọng lượng) sẽ xấu đi."',
        actionableTip: 'Không chấp nhận một giải pháp dung hòa nửa vời; kiên quyết đòi hỏi giải quyết được cả hai.'
      },
      {
        number: 2,
        title: 'Ánh xạ vào 39 thông số kỹ thuật chuẩn của TRIZ',
        description: 'Chuyển đổi ngôn ngữ chuyên ngành của bạn thành các thông số tiêu chuẩn của TRIZ.',
        actionableTip: 'Dùng các thông số chuẩn như Khối lượng, Kích thước, Tốc độ, Tổn hao chất, Nhiệt độ.'
      },
      {
        number: 3,
        title: 'Tra cứu Ma trận Mâu thuẫn TRIZ',
        description: 'Tra bảng để tìm 3-4 nguyên tắc sáng tạo đã từng giải quyết thành công mâu thuẫn này trong lịch sử.',
        actionableTip: 'Xem xét các nguyên tắc kinh điển như #1 Phân nhỏ, #10 Thực hiện trước, #15 Linh hoạt hóa, #35 Thay đổi thông số lý hóa.'
      },
      {
        number: 4,
        title: 'Chuyển hóa nguyên tắc trừu tượng thành thiết kế cụ thể',
        description: 'Ứng dụng nguyên tắc gợi ý vào hệ thống cơ khí, hóa chất hoặc phần mềm của bạn.',
        actionableTip: 'Hướng tới "Kết Quả Cuối Cùng Lý Tưởng" (IFR) nơi hệ thống tự thực hiện chức năng mà không phát sinh thêm chi phí, trọng lượng hay năng lượng.'
      }
    ],
    keyQuestions: [
      'Mâu thuẫn cơ bản nào chúng ta đang chấp nhận như một sự đánh đổi hiển nhiên?',
      'Tự nhiên hoặc 40 nguyên tắc TRIZ sẽ giải quyết mâu thuẫn này như thế nào?',
      'Chức năng này có thể được đảm nhiệm miễn phí bởi một thành phần sẵn có trong hệ thống không?'
    ],
    exampleUseCase: {
      title: 'Tản Nhiệt Chip Vi Xử Lý Smartphone Samsung Galaxy',
      scenario: 'Chip CPU hiệu năng cao sinh nhiệt lớn, nhưng việc lắp thêm miếng tản nhiệt dày vi phạm giới hạn độ mỏng của khung máy.',
      application: 'Áp dụng Ma trận mâu thuẫn TRIZ: Thông số cần cải thiện = Độ dẫn nhiệt; Thông số bị xấu đi = Độ dày/Trọng lượng. Đề xuất Nguyên tắc #35 (Thay đổi thông số) và #2 (Tách rời). Triển khai buồng tản nhiệt hơi siêu mỏng (vapor chamber).',
      outcome: 'Giảm 40% hiện tượng hạ xung CPU do quá nhiệt trong khi vẫn giữ nguyên thiết kế siêu mỏng đẳng cấp.'
    },
    pros: [
      'Xóa bỏ hoàn toàn việc động não mò mẫm thử-sai mù quáng',
      'Giải quyết dứt điểm các mâu thuẫn kỹ thuật tưởng chừng bất khả thi',
      'Đã tạo ra hàng ngàn sáng chế thương mại tại Samsung, Intel và Boeing'
    ],
    cons: [
      'Độ dốc học tập cao và thuật ngữ chuyên sâu',
      'Ít phù hợp cho các bài toán tiếp thị hoặc tâm lý xã hội thuần túy'
    ],
    toolsNeeded: ['Ma trận mâu thuẫn TRIZ', 'Sổ tay 40 nguyên tắc sáng tạo', 'Cơ sở dữ liệu sáng chế'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 78,
      analyticalVsCreative: 75
    }
  },
  {
    id: 'scamper',
    name: 'SCAMPER - Kích Hoạt Ý Tưởng Sáng Tạo Đa Chiều',
    shortName: 'SCAMPER',
    origin: 'Alex Osborn (Cha đẻ Brainstorming) & Bob Eberle (1971)',
    tagline: 'Kích hoạt tư duy đột phá bằng cách áp dụng 7 câu hỏi gợi ý biến đổi lên sản phẩm hiện tại.',
    category: 'innovation',
    complexity: 'Beginner',
    timeframe: '< 1 hour',
    teamSize: 'Solo',
    cynefinDomain: 'Clear',
    bestFor: 'Động não tính năng nhanh, làm mới sản phẩm, phá vỡ bế tắc ý tưởng và các buổi sprint sáng tạo.',
    whenToAvoid: 'Khắc phục các lỗi sản xuất đa biến phức tạp hoặc lỗ hổng bảo mật nghiêm trọng.',
    summary: 'SCAMPER là kỹ thuật đặt câu hỏi sáng tạo dựa trên từ viết tắt: Thay thế (Substitute), Kết hợp (Combine), Thích ứng (Adapt), Điều chỉnh/Phóng đại (Modify/Magnify), Chuyển mục đích sử dụng (Put to another use), Loại bỏ (Eliminate) và Đảo ngược/Sắp xếp lại (Reverse/Rearrange).',
    steps: [
      {
        number: 1,
        title: 'Chọn đối tượng hoặc quy trình trọng tâm',
        description: 'Cô lập sản phẩm, tính năng hoặc quy trình bạn muốn biến đổi.',
        actionableTip: 'Chọn chủ đề cụ thể (ví dụ: "Chuỗi email hướng dẫn người dùng mới hàng tuần").'
      },
      {
        number: 2,
        title: 'Áp dụng lần lượt 7 câu hỏi biến đổi',
        description: 'S - Thay thế; C - Kết hợp; A - Thích ứng; M - Phóng đại/Thu nhỏ; P - Dùng cho việc khác; E - Cắt giảm triệt để; R - Đảo ngược trình tự.',
        actionableTip: 'Dành 5 phút tập trung cho mỗi chữ cái mà không phán xét tính khả thi.'
      },
      {
        number: 3,
        title: 'Thu hoạch & chọn lọc ý tưởng độc đáo',
        description: 'Rà soát danh sách ý tưởng và chọn ra 2 ý tưởng có tác động lớn nhất và khả thi nhất.',
        actionableTip: 'Kết hợp các ý tưởng bay bổng táo bạo với năng lực thực thi kỹ thuật vững chắc.'
      }
    ],
    keyQuestions: [
      'Chúng ta có thể loại bỏ hoàn toàn thứ gì để trải nghiệm đơn giản hơn gấp 10 lần?',
      'Tính năng nào từ ngành game hoặc tài chính có thể thích ứng vào sản phẩm của chúng ta?',
      'Điều gì sẽ xảy ra nếu chúng ta đảo ngược hoàn toàn trình tự các bước?'
    ],
    exampleUseCase: {
      title: 'Đổi Mới Trải Nghiệm Mua Đồ Ăn Qua Cửa Kính Ô Tô (McDonald’s)',
      scenario: 'Rút ngắn thời gian phục vụ tại làn Drive-Through trong giờ cao điểm.',
      application: 'Áp dụng SCAMPER: Thay thế (màn hình cảm ứng thay nhân viên ghi đơn), Kết hợp (cửa sổ thanh toán gộp chung với giao hàng), Loại bỏ (menu in giấy thay bằng màn hình kỹ thuật số động), Đảo ngược (chuẩn bị món trước khi khách tới nhờ AI dự đoán).',
      outcome: 'Cắt giảm 28 giây chờ đợi cho mỗi lượt xe và gia tăng doanh thu đáng kể.'
    },
    pros: [
      'Dễ tiếp cận, vui nhộn và đem lại kết quả ngay trong vòng 45 phút',
      'Cung cấp các gợi ý rõ ràng giúp dẹp tan hội chứng "trang giấy trắng"',
      'Hiệu quả cho cả người làm việc độc lập lẫn nhóm workshop'
    ],
    cons: [
      'Cải tiến trên các giải pháp sẵn có; hiếm khi tự tạo ra các mô thức chưa từng có tiền lệ',
      'Cần có thêm bộ lọc ưu tiên riêng sau khi tạo ra ý tưởng'
    ],
    toolsNeeded: ['Bộ thẻ câu hỏi SCAMPER', 'Đồng hồ đếm ngược', 'Giấy ghi chú Post-it'],
    interactiveCanvasType: 'scamper-board',
    plotCoordinates: {
      complexityScore: 22,
      analyticalVsCreative: 88
    }
  },
  {
    id: 'six-thinking-hats',
    name: '6 Chiếc Mũ Tư Duy (Tư Duy Song Song)',
    shortName: '6 Chiếc Mũ Tư Duy',
    origin: 'Edward de Bono (Nhà tiên phong Tư duy đa chiều, 1985)',
    tagline: 'Xóa bỏ tranh cãi đối đầu bằng cách yêu cầu cả nhóm cùng nhìn nhận theo một góc độ tư duy tại cùng một thời điểm.',
    category: 'innovation',
    complexity: 'Beginner',
    timeframe: '< 1 hour',
    teamSize: 'Cross-Functional (5–15)',
    cynefinDomain: 'Complicated',
    bestFor: 'Các cuộc họp hội đồng nhiều mâu thuẫn, quyết định sản phẩm gây tranh cãi và phá vỡ thế bế tắc trong ban giám đốc.',
    whenToAvoid: 'Gỡ lỗi thuật toán định lượng chuyên sâu của một lập trình viên duy nhất.',
    summary: 'Được sáng tạo bởi Edward de Bono, 6 Chiếc Mũ Tư Duy phân tách suy nghĩ nhóm thành 6 lăng kính: Trắng (Dữ liệu & Sự thật), Đỏ (Cảm xúc & Trực giác), Đen (Đánh giá rủi ro & Mặt tiêu cực), Vàng (Lạc quan & Lợi ích), Xanh lá (Sáng tạo & Ý tưởng mới), và Xanh dương (Kiểm soát tiến trình & Tổng kết). Cả nhóm cùng đội một màu mũ tại một thời điểm.',
    steps: [
      {
        number: 1,
        title: 'Mũ Xanh dương: Đặt mục tiêu và lộ trình mũ',
        description: 'Người điều phối vạch rõ chương trình nghị sự, quy tắc và thứ tự màu mũ sẽ đội.',
        actionableTip: 'Khống chế thời gian chặt chẽ (ví dụ: 5 phút cho Mũ Đỏ, 10 phút cho Mũ Đen).'
      },
      {
        number: 2,
        title: 'Mũ Trắng & Đỏ: Dữ kiện trước, Trực giác theo sau',
        description: 'Xem xét số liệu đã kiểm chứng (Trắng), sau đó cho phép mọi người chia sẻ cảm xúc thật mà không cần giải thích biện hộ (Đỏ).',
        actionableTip: 'Mũ Đỏ giúp giải tỏa những bức xúc ngầm và rào cản chính trị từ sớm.'
      },
      {
        number: 3,
        title: 'Mũ Vàng & Xanh lá: Giá trị tiềm năng & Ý tưởng sáng tạo',
        description: 'Khám phá các khía cạnh tích cực, lợi ích và các phương án mới để mở rộng giải pháp.',
        actionableTip: 'Buộc những người hay hoài nghi phải đội Mũ Vàng và đóng góp sự lạc quan chân thành.'
      },
      {
        number: 4,
        title: 'Mũ Đen: Thử nghiệm chịu tải & Vạch trần điểm yếu',
        description: 'Phản biện gay gắt, phân tích rủi ro pháp lý, chi phí và kịch bản sụp đổ.',
        actionableTip: 'Mũ Đen cực kỳ quan trọng nhưng cần được đóng khung thời gian để không bóp nghẹt sáng tạo.'
      },
      {
        number: 5,
        title: 'Mũ Xanh dương: Tổng hợp & Thống nhất hành động',
        description: 'Tóm tắt sự đồng thuận, ghi nhận các biện pháp phòng ngừa cho rủi ro Mũ Đen và phân công bước tiếp theo.',
        actionableTip: 'Kiểm tra xem còn trực giác băn khoăn nào chưa được giải tỏa trước khi kết thúc.'
      }
    ],
    keyQuestions: [
      'Tất cả chúng ta hiện đang cùng đội một màu mũ hay đang tranh cãi đối đầu theo cảm tính cá nhân?',
      'Những con số thô nói lên điều gì (Mũ Trắng), và trực giác của chúng ta cảm nhận thế nào (Mũ Đỏ)?',
      'Những rủi ro lớn nhất là gì (Mũ Đen), và ý tưởng sáng tạo nào (Mũ Xanh lá) có thể hóa giải chúng?'
    ],
    exampleUseCase: {
      title: 'Tranh Cãi Về Chính Sách Đi Làm Lại Tại Văn Phòng',
      scenario: 'Ban lãnh đạo mâu thuẫn gay gắt về việc bắt buộc nhân viên phải lên công ty 3 ngày một tuần.',
      application: 'Tổ chức workshop 6 Mũ: Mũ Trắng xác minh quãng đường di chuyển và chỉ số năng suất. Mũ Đỏ giải tỏa nỗi sợ kiệt sức và mong muốn gắn kết. Mũ Đen vạch ra nguy cơ nghỉ việc của các kỹ sư cấp cao. Mũ Xanh lá sáng tạo ra mô hình "Tuần lễ hợp tác tập trung" kết hợp làm việc linh hoạt từ xa.',
      outcome: 'Đạt được sự đồng thuận tuyệt đối trong 90 phút mà không có xung đột cá nhân.'
    },
    pros: [
      'Giảm một nửa thời gian họp bằng cách thay thế tranh cãi bằng tư duy song song',
      'Đảm bảo việc đánh giá rủi ro (Mũ Đen) diễn ra mang tính xây dựng',
      'Mang lại tiếng nói tâm lý bình đẳng cho những người hướng nội'
    ],
    cons: [
      'Đòi hỏi người điều phối có kỷ luật và kinh nghiệm (Mũ Xanh dương)',
      'Có thể tạo cảm giác gượng gạo nếu người tham gia từ chối tuân thủ màu mũ được chỉ định'
    ],
    toolsNeeded: ['Bộ 6 màu mũ / thẻ màu', 'Đồng hồ hẹn giờ họp', 'Tài liệu ghi chú chung'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 35,
      analyticalVsCreative: 65
    }
  },

  // --- 4. CONTINUOUS QUALITY & EXECUTION SYSTEMS ---
  {
    id: 'pdca',
    name: 'Vòng Tròn PDCA / PDSA (Bánh Xe Deming)',
    shortName: 'Vòng Tròn PDCA',
    origin: 'Walter Shewhart & W. Edwards Deming (1939 / Thập niên 1950)',
    tagline: 'Vòng lặp quản trị 4 giai đoạn để liên tục cải tiến chất lượng dựa trên phương pháp thực nghiệm.',
    category: 'quality',
    complexity: 'Beginner',
    timeframe: '1–4 weeks',
    teamSize: 'Small Team (2–6)',
    cynefinDomain: 'Clear',
    bestFor: 'Tối ưu hóa quy trình liên tục, tinh chỉnh tiêu chuẩn công việc và thử nghiệm các thay đổi vận hành từng bước.',
    whenToAvoid: 'Các cuộc chuyển đổi mô hình đột phá một lần hoặc các tình huống sinh tử trong khủng hoảng tức thời.',
    summary: 'Vòng lặp PDCA (Kế hoạch - Thực hiện - Kiểm tra - Hành động/Chuẩn hóa) là mô hình kinh điển để cải tiến quy trình và sản phẩm liên tục. Nó đưa phương pháp nghiên cứu khoa học vào công tác quản lý vận hành hàng ngày.',
    steps: [
      {
        number: 1,
        title: 'Kế hoạch (Plan - Giả thuyết & Đường cơ sở)',
        description: 'Xác định mục tiêu, hiểu rõ số liệu cơ sở hiện tại và thiết kế một thay đổi kèm kết quả dự đoán.',
        actionableTip: 'Phát biểu giả thuyết rõ ràng: "Nếu chúng ta làm X, chỉ số Y sẽ thay đổi Z%."'
      },
      {
        number: 2,
        title: 'Thực hiện (Do - Thử nghiệm quy mô nhỏ)',
        description: 'Triển khai thay đổi đã lên kế hoạch trên phạm vi giới hạn hoặc một ca làm việc thử nghiệm.',
        actionableTip: 'Chưa triển khai toàn công ty ngay; kiểm soát chặt chẽ các biến số can thiệp.'
      },
      {
        number: 3,
        title: 'Kiểm tra / Nghiên cứu (Check / Study - Đối chiếu kết quả)',
        description: 'Thu thập số liệu hiệu suất, so sánh kết quả thực tế với giả thuyết ban đầu và ghi lại các sai lệch.',
        actionableTip: 'Khuyến khích việc học hỏi từ thất bại—giai đoạn Nghiên cứu chính là nơi tri thức thực sự được sinh ra.'
      },
      {
        number: 4,
        title: 'Hành động / Chuẩn hóa (Act - Chuẩn hóa hoặc Điều chỉnh)',
        description: 'Nếu thành công, chuẩn hóa quy trình mới vào sổ tay vận hành; nếu thất bại, điều chỉnh hoặc khởi động lại vòng lặp.',
        actionableTip: 'Cập nhật Quy trình chuẩn (SOP) để thành quả đạt được không bị trượt dốc trở lại.'
      }
    ],
    keyQuestions: [
      'Chỉ số định lượng cụ thể nào chúng ta đang cố gắng thay đổi, và mức cơ sở hiện tại là bao nhiêu?',
      'Chúng ta có thể thử nghiệm việc này trên một nhóm nhỏ trước khi áp dụng toàn diện không?',
      'Chúng ta đã hệ thống hóa quy trình chiến thắng vào tài liệu đào tạo chính thức chưa?'
    ],
    exampleUseCase: {
      title: 'Rút Ngắn Thời Gian Phản Hồi Ticket Chăm Sóc Khách Hàng',
      scenario: 'Ticket hỗ trợ SaaS Cấp 1 mất trung bình 4.2 giờ mới nhận được phản hồi đầu tiên.',
      application: 'Plan: Giả thuyết rằng định tuyến tự động theo phân hạng khách hàng sẽ hạ thời gian phản hồi xuống dưới 1 giờ. Do: Thử nghiệm riêng tại khu vực Châu Á - Thái Bình Dương trong 2 tuần. Study: Thời gian phản hồi giảm xuống 48 phút mà điểm CSAT không giảm. Act: Chuẩn hóa thuật toán định tuyến cho toàn cầu.',
      outcome: 'Thời gian phản hồi trung vị toàn cầu giảm xuống còn 52 phút trên toàn công ty.'
    },
    pros: [
      'Đơn giản, khoa học và nuôi dưỡng văn hóa cải tiến liên tục bền bỉ',
      'Giảm thiểu rủi ro vận hành nhờ cơ chế thử nghiệm có kiểm soát',
      'Đảm bảo tri thức tổ chức được lưu giữ và chuẩn hóa thành tài sản'
    ],
    cons: [
      'Có thể diễn ra chậm chạp nếu các bước cải tiến nhỏ bị phân tích quá đà',
      'Xu hướng tạo ra tối ưu hóa cục bộ thay vì các đột phá mang tầm vĩ mô'
    ],
    toolsNeeded: ['Biểu đồ kiểm soát', 'Tài liệu quy trình chuẩn SOP', 'Bảng theo dõi thử nghiệm pilot'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 25,
      analyticalVsCreative: 30
    }
  },
  {
    id: 'dmaic',
    name: 'DMAIC - Khung Chuẩn 5 Pha Six Sigma',
    shortName: 'DMAIC (Six Sigma)',
    origin: 'Bill Smith & Bob Galvin (Motorola, 1986) / Jack Welch (GE)',
    tagline: 'Phương pháp thống kê dữ liệu 5 giai đoạn nhằm triệt tiêu biến động quy trình và giảm lỗi về mức 3.4 DPMO.',
    category: 'quality',
    complexity: 'Advanced',
    timeframe: '1–4 weeks',
    teamSize: 'Cross-Functional (5–15)',
    cynefinDomain: 'Complicated',
    bestFor: 'Các quy trình sản xuất quy mô lớn có sẵn, tỷ lệ phế phẩm cao hoặc lãng phí vận hành tốn kém.',
    whenToAvoid: 'Dự án khởi nghiệp giai đoạn đầu, các ý tưởng sáng tạo có độ bất định cao, hoặc nơi chưa hề có dữ liệu lịch sử.',
    summary: 'DMAIC (Xác định, Đo lường, Phân tích, Cải tiến, Kiểm soát) là chiến lược chất lượng dựa trên dữ liệu hàng đầu. Nó xem xét mọi vấn đề dưới góc nhìn toán học Y = f(X), sử dụng các công cụ thống kê để cô lập các biến số đầu vào trọng yếu (Xs) chi phối kết quả đầu ra (Y).',
    steps: [
      {
        number: 1,
        title: 'Xác định (Define - Điều lệ dự án & Tiếng nói khách hàng)',
        description: 'Soạn thảo điều lệ dự án, trường hợp kinh doanh, phát biểu vấn đề và các yêu cầu chất lượng trọng yếu (CTQ).',
        actionableTip: 'Lượng hóa tác động tài chính: mỗi dự án DMAIC bắt buộc phải gắn liền với con số tiết kiệm thực tế.'
      },
      {
        number: 2,
        title: 'Đo lường (Measure - Dữ liệu cơ sở & Năng lực quy trình)',
        description: 'Vẽ sơ đồ quy trình (SIPOC), kiểm tra độ tin cậy của hệ thống đo lường (Gage R&R) và đo năng lực cơ sở (Cp, Cpk).',
        actionableTip: 'Đảm bảo cảm biến và thước đo của bạn hoàn toàn chính xác trước khi tin vào những con số.'
      },
      {
        number: 3,
        title: 'Phân tích (Analyze - Xác minh nguyên nhân gốc rễ bằng thống kê)',
        description: 'Sử dụng hồi quy, ANOVA, biểu đồ đa biến và kiểm định giả thuyết để cô lập toán học các yếu tố đầu vào trọng yếu (Xs).',
        actionableTip: 'Chứng minh ý nghĩa thống kê với p-value < 0.05 thay vì dựa vào cảm nhận trực quan.'
      },
      {
        number: 4,
        title: 'Cải tiến (Improve - Thiết kế thử nghiệm DOE & Giải pháp)',
        description: 'Phát triển, thử nghiệm và triển khai các giải pháp tối ưu hóa thiết lập quy trình.',
        actionableTip: 'Chạy mô phỏng hoặc thiết kế thực nghiệm đáp ứng bề mặt để dò tìm các thông số vàng.'
      },
      {
        number: 5,
        title: 'Kiểm soát (Control - Chuẩn hóa & Kiểm soát quy trình thống kê)',
        description: 'Thiết lập biểu đồ kiểm soát thống kê (SPC), cơ chế chống lỗi Poka-Yoke và bàn giao cho người làm chủ quy trình.',
        actionableTip: 'Cài đặt ngưỡng cảnh báo tự động để xử lý ngay khi quy trình bắt đầu có dấu hiệu lệch chuẩn.'
      }
    ],
    keyQuestions: [
      'Phương trình toán học Y = f(X) chi phối đầu ra quy trình của chúng ta là gì?',
      'Hệ thống đo lường có đáng tin cậy và không bị thiên lệch bởi người vận hành không?',
      'Chúng ta đã áp dụng Kiểm soát Quy trình Thống kê (SPC) để ngăn chặn việc quay lại thói quen cũ chưa?'
    ],
    exampleUseCase: {
      title: 'Đúc Cánh Tuabin Động Cơ Máy Bay General Electric',
      scenario: 'Tỷ lệ phế phẩm khi đúc cánh tuabin áp suất cao gây thiệt hại 8.5 triệu USD mỗi năm.',
      application: 'Dự án DMAIC: Xác định giới hạn độ rỗng. Đo lường chênh lệch nhiệt độ khuôn. Phân tích ANOVA: phát hiện nhiệt độ rót kim loại và tốc độ hút chân không là 2 yếu tố chi phối. Cải tiến mạch điều khiển nhiệt độ PID. Kiểm soát bằng cảnh báo tự động trên biểu đồ SPC.',
      outcome: 'Tỷ lệ phế phẩm giảm 73%, tiết kiệm định kỳ 6.2 triệu USD mỗi năm cho nhà máy.'
    },
    pros: [
      'Độ chặt chẽ thống kê vô song giúp triệt tiêu triệt để sự biến động',
      'Đem lại khoản tiết kiệm tài chính khổng lồ trong các quy mô vận hành lớn',
      'Tạo ra sự ổn định bền vững, có thể kiểm toán được cho quy trình'
    ],
    cons: [
      'Gánh nặng tính toán thống kê cao; đòi hỏi chuyên gia có chứng chỉ Đai Xanh/Đai Đen',
      'Có thể làm chậm tốc độ trong môi trường cần lặp nhanh hơn là sự chính xác đến 6 chữ số thập phân'
    ],
    toolsNeeded: ['Phần mềm Minitab / Python SciPy', 'Sơ đồ luồng quy trình SIPOC', 'Biểu đồ kiểm soát SPC', 'Dụng cụ đo đạc chuẩn'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 82,
      analyticalVsCreative: 12
    }
  },
  {
    id: 'eight-disciplines',
    name: '8D - Tám Kỷ Luật Giải Quyết Vấn Đề (Ford Motor)',
    shortName: '8D Problem Solving',
    origin: 'Công ty Ford Motor / Bộ Quốc phòng Hoa Kỳ (1987)',
    tagline: 'Quy trình chuẩn hóa về cô lập khẩn cấp, tìm nguyên nhân gốc rễ và ngăn ngừa tái diễn cho các khiếu nại khách hàng nghiêm trọng.',
    category: 'quality',
    complexity: 'Advanced',
    timeframe: '1–4 weeks',
    teamSize: 'Cross-Functional (5–15)',
    cynefinDomain: 'Complicated',
    bestFor: 'Khiếu nại khách hàng nghiêm trọng, sự cố chất lượng lọt lưới, sai lỗi nhà cung cấp ô tô/hàng không và kiểm toán an toàn.',
    whenToAvoid: 'Các lỗi nhỏ nội bộ mang tính thẩm mỹ có thể sửa chữa ngay trong 10 phút.',
    summary: 'Mô hình 8D (Tám Kỷ Luật) là phương pháp toàn diện được thiết kế để tìm nguyên nhân gốc rễ của lỗi, thiết lập biện pháp ngăn chặn tạm thời để bảo vệ khách hàng, triển khai hành động khắc phục vĩnh viễn và ngăn chặn sự cố tái diễn trong toàn hệ thống.',
    steps: [
      {
        number: 1,
        title: 'D1 & D2: Thành lập đội ngũ & Mô tả vấn đề',
        description: 'Tập hợp các chuyên gia liên chức năng có người bảo trợ. Mô tả vấn đề theo cấu trúc 5W2H (Ai, Cái gì, Ở đâu, Khi nào, Tại sao, Thế nào, Bao nhiêu).',
        actionableTip: 'Bắt buộc mời cả công nhân/kỹ thuật viên trực tiếp thao tác thành phần bị lỗi tham gia.'
      },
      {
        number: 2,
        title: 'D3: Triển khai hành động cô lập tạm thời (ICA)',
        description: 'Bảo vệ khách hàng ngay lập tức! Cách ly lô hàng nghi vấn, kiểm tra 100% hoặc kích hoạt rollback khẩn cấp.',
        actionableTip: 'Cô lập khẩn cấp phải hoàn tất trong vòng 24 giờ để chặn đứng tổn thất trong khi chờ điều tra sâu.'
      },
      {
        number: 3,
        title: 'D4: Xác định & Kiểm chứng nguyên nhân gốc rễ & Điểm thoát lỗi',
        description: 'Cô lập nguyên nhân bằng Xương cá/5 Whys. Điểm then chốt: phải giải thích được cả lý do vì sao lỗi phát sinh VÀ vì sao hệ thống kiểm tra để lỗi thoát ra ngoài.',
        actionableTip: 'Không bao giờ được đóng bước D4 nếu chưa chỉ ra được lỗ hổng của cơ chế kiểm soát chất lượng.'
      },
      {
        number: 4,
        title: 'D5 & D6: Lựa chọn & Kiểm chứng hành động khắc phục vĩnh viễn (PCA)',
        description: 'Chọn các giải pháp kỹ thuật/quy trình triệt tiêu nguyên nhân gốc rễ. Triển khai và kiểm tra trên đợt sản xuất thực tế.',
        actionableTip: 'Chỉ dỡ bỏ biện pháp cô lập tạm thời sau khi hành động khắc phục vĩnh viễn đã được chứng minh hiệu quả.'
      },
      {
        number: 5,
        title: 'D7 & D8: Ngăn ngừa tái diễn & Vinh danh đội ngũ',
        description: 'Cập nhật tài liệu FMEA, kế hoạch kiểm soát và tiêu chuẩn thiết kế. Ghi nhận và khen thưởng nỗ lực của các thành viên.',
        actionableTip: 'Kiểm toán chéo các dây chuyền sản xuất tương tự để triệt tiêu các lỗ hổng giống nhau ở các nhà máy khác.'
      }
    ],
    keyQuestions: [
      'Khách hàng hiện đã được bảo vệ an toàn 100% nhờ biện pháp cô lập tạm thời chưa?',
      'Tại sao khâu kiểm tra nội bộ của chúng ta lại không bắt được lỗi này trước khi nó thoát ra ngoài khách hàng?',
      'Tiêu chuẩn công ty hoặc chương trình đào tạo nào bắt buộc phải cập nhật để không bao giờ tái diễn lỗi này?'
    ],
    exampleUseCase: {
      title: 'Thu Hồi Hộp Điều Khiển Trợ Lực Lái Điện Tử Ô Tô',
      scenario: 'Nhà cung cấp linh kiện ô tô Cấp 1 nhận thông báo khẩn: trợ lực lái mất tín hiệu trên 14 xe khi trời rét đậm.',
      application: 'Kích hoạt 8D: D3 cô lập kiểm tra toàn bộ linh kiện tại nhà máy lắp ráp trong 18 giờ. D4 chẩn đoán hiện tượng giòn mối hàn ở chân số 4 dưới nhiệt độ -30°C. D5 đổi sang hợp kim hàn bạc có độ dẻo cao. D7 cập nhật tiêu chuẩn kem hàn toàn cầu trên mọi dòng sản phẩm.',
      outcome: 'Tránh được lệnh triệu hồi an toàn liên bang tốn kém; ghi nhận 0 vụ lỗi trợ lực lái trong 5 năm tiếp theo.'
    },
    pros: [
      'Ưu tiên bảo vệ khách hàng đầu tiên bằng biện pháp cô lập khẩn cấp',
      'Bắt buộc phải tìm ra cả nguyên nhân phát sinh lẫn lỗ hổng thoát lỗi',
      'Được thừa nhận như một tiêu chuẩn pháp lý trong chuỗi cung ứng toàn cầu'
    ],
    cons: [
      'Thủ tục giấy tờ nặng nề và đòi hỏi nhiều nguồn lực liên phòng ban',
      'Có thể tạo cảm giác quan liêu nếu áp dụng cho các lỗi nhỏ nội bộ'
    ],
    toolsNeeded: ['Biểu mẫu báo cáo chuẩn 8D', 'Nhật ký theo dõi hàng cô lập', 'Cơ sở dữ liệu FMEA'],
    interactiveCanvasType: 'action-plan',
    plotCoordinates: {
      complexityScore: 72,
      analyticalVsCreative: 20
    }
  },
  {
    id: 'a3-problem-solving',
    name: 'Báo Cáo Giải Quyết Vấn Đề A3 (Toyota Management)',
    shortName: 'Bản Báo Cáo A3',
    origin: 'Tập đoàn Toyota Motor / Taiichi Ohno (Thập niên 1960)',
    tagline: 'Cô đọng toàn bộ vấn đề phức tạp, chẩn đoán, giải pháp và kế hoạch hành động lên đúng một trang giấy A3 duy nhất.',
    category: 'quality',
    complexity: 'Intermediate',
    timeframe: '1–2 days',
    teamSize: 'Small Team (2–6)',
    cynefinDomain: 'Complicated',
    bestFor: 'Đạt được sự đồng thuận liên phòng ban, thuyết phục ban lãnh đạo, xóa bỏ nút thắt vận hành và thống nhất hành động.',
    whenToAvoid: 'Tình huống chữa cháy khẩn cấp nơi bạn chỉ có 5 phút để ra quyết định sinh tử.',
    summary: 'A3 Problem Solving là công cụ quản trị trang giấy huyền thoại của Toyota dựa trên chu trình PDCA. Vì mọi thứ bắt buộc phải trình bày vừa vặn trên một tờ giấy khổ A3 (11" x 17"), nó buộc người lập phải lọc bỏ mọi từ ngữ sáo rỗng, truyền đạt thông điệp bằng hình ảnh trực quan và xây dựng sự đồng thuận (nemawashi).',
    steps: [
      {
        number: 1,
        title: 'Chủ đề & Bối cảnh',
        description: 'Nêu vấn đề ngắn gọn và giải thích vì sao nó quan trọng đối với mục tiêu chiến lược của công ty.',
        actionableTip: 'Thu hút người đọc bằng bối cảnh kinh doanh chỉ trong 2 câu văn súc tích.'
      },
      {
        number: 2,
        title: 'Thực trạng hiện tại & Mục tiêu hướng tới',
        description: 'Vẽ sơ đồ luồng quy trình, đồ thị số liệu để trực quan hóa thực trạng. Đưa ra chỉ số mục tiêu định lượng cụ thể.',
        actionableTip: 'Sử dụng hình vẽ đơn giản, đồ thị và ô chú thích thay vì các đoạn văn dài dòng.'
      },
      {
        number: 3,
        title: 'Phân tích nguyên nhân gốc rễ',
        description: 'Khoan sâu bằng 5 Whys hoặc Xương cá trực tiếp trên trang giấy để chỉ ra các đứt gãy tiềm ẩn.',
        actionableTip: 'Đảm bảo mối liên kết giữa nguyên nhân gốc rễ và vấn đề hiện lên rõ ràng về mặt thị giác.'
      },
      {
        number: 4,
        title: 'Biện pháp đối phó & Kế hoạch thực hiện',
        description: 'Quy định các giải pháp mang tính hệ thống, Ai làm Cái gì trước Thời hạn nào (dạng bảng Gantt) và phương án dự phòng.',
        actionableTip: 'Xử lý thẳng vào nguyên nhân gốc rễ bằng các cơ chế chống lỗi bền vững.'
      },
      {
        number: 5,
        title: 'Xác nhận hiệu quả & Chuẩn hóa theo dõi',
        description: 'Theo dõi các chỉ số sau triển khai đối chiếu với mục tiêu; lên lịch trình kiểm tra phản tư định kỳ.',
        actionableTip: 'Chia sẻ bản A3 hoàn chỉnh cho các phòng ban khác để nhân rộng tri thức trong tổ chức.'
      }
    ],
    keyQuestions: [
      'Một giám đốc có thể hiểu được toàn bộ bài toán, chẩn đoán và kế hoạch chỉ trong 3 phút nhìn vào tờ giấy này không?',
      'Mỗi biện pháp đối phó đề xuất có gắn liền trực tiếp với một nguyên nhân gốc rễ đã được chứng minh không?',
      'Tất cả các bên liên quan bị ảnh hưởng đã xem và ký nháy đồng thuận (nemawashi) vào tờ giấy này chưa?'
    ],
    exampleUseCase: {
      title: 'Giải Tỏa Điểm Nghẽn Nhặt Hàng Tại Kho Thương Mại Điện Tử',
      scenario: 'Trung tâm phân phối bị trễ hạn cam kết giao hàng trong ngày 18% trong mùa mua sắm cao điểm.',
      application: 'Trưởng phòng vận hành soạn bản A3: Vẽ sơ đồ spaghetti cho thấy nhân viên nhặt hàng phải đi bộ tới 14 dặm mỗi ca. Phân tích nguyên nhân chỉ ra các mặt hàng bán chạy nhất lại bị xếp rải rác ngẫu nhiên ở khu Zone D xa xôi. Đề xuất quy hoạch lại vùng ABC.',
      outcome: 'Giám đốc duyệt phương án 15.000 USD chỉ sau 10 phút xem xét; quãng đường đi bộ giảm 45%, tỷ lệ đạt cam kết giao hàng tăng lên 99.4%.'
    },
    pros: [
      'Dẹp bỏ các slide PowerPoint 50 trang rườm rà, thay bằng sự súc tích và trực quan tuyệt đối',
      'Rèn luyện kỹ năng kể chuyện gãy gọn và gắn kết sự đồng thuận giữa các bộ phận',
      'Liên kết trực tiếp từ khâu chẩn đoán đến kế hoạch hành động có trách nhiệm rõ ràng'
    ],
    cons: [
      'Cần thời gian luyện tập để cô đọng câu chuyện phức tạp vào 1 trang duy nhất',
      'Đòi hỏi văn hóa lãnh đạo tôn trọng sự súc tích và tính minh bạch'
    ],
    toolsNeeded: ['Tờ giấy khổ A3 / Biểu mẫu A3', 'Sơ đồ luồng quy trình', 'Bút chì và tẩy'],
    interactiveCanvasType: 'a3-canvas',
    plotCoordinates: {
      complexityScore: 48,
      analyticalVsCreative: 40
    }
  },

  // --- 5. PRIORITIZATION & DECISION TRADE-OFFS ---
  {
    id: 'eisenhower-matrix',
    name: 'Ma Trận Quyết Định Eisenhower (Khẩn Cấp vs Quan Trọng)',
    shortName: 'Ma Trận Eisenhower',
    origin: 'Dwight D. Eisenhower (1954) / Stephen Covey (7 Thói Quen, 1989)',
    tagline: 'Phân loại công việc vào 4 góc phần tư để ngăn chặn những việc Khẩn Cấp ồn ào lấn át những việc Quan Trọng sống còn.',
    category: 'prioritization',
    complexity: 'Beginner',
    timeframe: '< 1 hour',
    teamSize: 'Solo',
    cynefinDomain: 'Clear',
    bestFor: 'Quản lý thời gian cá nhân, chống kiệt sức của lãnh đạo, quá tải công việc và giải phóng băng thông cho chiến lược.',
    whenToAvoid: 'Đánh giá các đánh đổi kiến trúc kỹ thuật đa chiều hoặc nghiên cứu khách hàng phức tạp.',
    summary: 'Ma trận Eisenhower phân loại công việc theo hai trục: Khẩn cấp (đòi hỏi chú ý ngay) và Quan trọng (đóng góp vào mục tiêu dài hạn). Nó chia công việc thành 4 ô: Q1: Làm Ngay (Khẩn cấp & Quan trọng), Q2: Lên Lịch Làm Sâu (Quan trọng, Không khẩn cấp), Q3: Ủy Quyền / Tự Động Hóa (Khẩn cấp, Không quan trọng), Q4: Loại Bỏ (Không khẩn cấp & Không quan trọng).',
    steps: [
      {
        number: 1,
        title: 'Liệt kê toàn bộ tồn đọng công việc',
        description: 'Trút hết mọi dự án dang dở, email cần trả lời, sự việc phát sinh và mục tiêu ra một danh sách thô.',
        actionableTip: 'Không phán xét hay kiểm duyệt trong lúc liệt kê; hãy giải phóng toàn bộ tâm trí của bạn.'
      },
      {
        number: 2,
        title: 'Phân loại khách quan vào 4 góc phần tư',
        description: 'Gắn từng đầu việc vào Q1 (Làm ngay), Q2 (Lên lịch), Q3 (Ủy quyền), hoặc Q4 (Xóa bỏ).',
        actionableTip: 'Hãy tỉnh táo: hầu hết các "việc khẩn cấp" trong hộp thư thực chất chỉ là việc Q3 làm phiền từ người khác.'
      },
      {
        number: 3,
        title: 'Bảo vệ các khối thời gian làm việc sâu cho Q2',
        description: 'Khóa các khung giờ vàng trên lịch làm việc cho các sáng kiến chiến lược Q2 trước khi các sự cố khẩn cấp bùng phát.',
        actionableTip: 'Hiệu suất đỉnh cao đến từ việc dành trên 60% thời gian của bạn trong Ô Q2.'
      },
      {
        number: 4,
        title: 'Xóa sạch Q4 và ủy quyền Q3',
        description: 'Xóa bỏ các công việc hình thức vô bổ và tự động hóa hoặc giao quyền cho người khác các công việc hành chính.',
        actionableTip: 'Học cách từ chối lịch sự để bảo vệ sự tập trung vào các kết quả có đòn bẩy cao.'
      }
    ],
    keyQuestions: [
      'Tôi có đang nhầm lẫn giữa sự ồn ào khẩn cấp và giá trị chiến lược dài hạn không?',
      'Tuần này tôi đã dành bao nhiêu giờ cho việc phát triển chiến lược chủ động trong Ô 2?',
      'Thứ gì tôi có thể xóa bỏ ngay hôm nay mà trên thực tế chẳng ai buồn bận tâm?'
    ],
    exampleUseCase: {
      title: 'Giải Cứu Giám Đốc Kỹ Thuật Khỏi Nguy Cơ Kiệt Sức',
      scenario: 'Giám đốc công nghệ làm việc 75 giờ/tuần, kiệt sức trong khi dự án chuyển đổi nền tảng cốt lõi bị đình trệ.',
      application: 'Áp dụng Ma trận Eisenhower: Nhận ra 60% thời gian trong tuần bị nướng vào Ô Q3 (họp những cuộc họp không cần thiết, trả lời thắc mắc lặt vặt trên Slack). Ủy quyền tham gia họp cho các nhóm trưởng, khóa các buổi sáng cho tài liệu kiến trúc Q2, hủy bỏ các cuộc họp báo cáo Q4 vô nghĩa.',
      outcome: 'Giờ làm việc giảm xuống 45 giờ/tuần trong khi dự án di chuyển nền tảng hoàn thành sớm trước thời hạn 3 tuần.'
    },
    pros: [
      'Đem lại sự giải tỏa tâm lý và sáng suốt tinh thần ngay tức thì',
      'Bảo vệ chiến lược chủ động trước những đám cháy vận hành hàng ngày',
      'Có thể áp dụng nhanh trong 15 phút vào mỗi sáng thứ Hai'
    ],
    cons: [
      'Là công cụ cá nhân; bản thân nó không tự giải quyết được sự phụ thuộc tài nguyên liên nhóm',
      'Đánh giá mang tính chủ quan về việc thế nào là thực sự "quan trọng"'
    ],
    toolsNeeded: ['Bảng ma trận 2x2', 'Ứng dụng lịch quản lý thời gian'],
    interactiveCanvasType: 'eisenhower-board',
    plotCoordinates: {
      complexityScore: 10,
      analyticalVsCreative: 20
    }
  },
  {
    id: 'rice-scoring',
    name: 'Mô Hình Chấm Điểm Ưu Tiên RICE / ICE',
    shortName: 'RICE Scoring',
    origin: 'Sean Ellis (Growth Hackers) & Nhóm Sản phẩm Intercom (2016)',
    tagline: 'Lượng hóa các cuộc tranh cãi về lộ trình sản phẩm bằng công thức tính: Độ tiếp cận, Tác động, Độ tự tin và Nỗ lực.',
    category: 'prioritization',
    complexity: 'Beginner',
    timeframe: '< 1 hour',
    teamSize: 'Small Team (2–6)',
    cynefinDomain: 'Clear',
    bestFor: 'Ưu tiên tính năng trên lộ trình sản phẩm, thí nghiệm tăng trưởng và xóa bỏ thiên kiến bảo thủ của sếp (HiPPO).',
    whenToAvoid: 'Tình huống sự cố khẩn cấp duy nhất nơi việc tính toán làm chậm trễ thời gian sống còn.',
    summary: 'RICE là mô hình chấm điểm tiêu chuẩn giúp các nhà quản lý sản phẩm đánh giá khách quan các ý tưởng dự án. Điểm RICE = (Độ tiếp cận × Mức tác động × Độ tự tin) / Nỗ lực thực hiện. Nó loại trừ các dự án cưng mang tính cảm tính và làm nổi bật các dự án có đòn bẩy cao, bằng chứng rõ ràng.',
    steps: [
      {
        number: 1,
        title: 'Ước lượng Độ tiếp cận (Reach - R)',
        description: 'Bao nhiêu người dùng sẽ bị ảnh hưởng bởi tính năng này trong một khoảng thời gian nhất định (ví dụ: người dùng/tháng)?',
        actionableTip: 'Dùng số liệu phân tích đã kiểm chứng, không dùng con số ước tính lạc quan.'
      },
      {
        number: 2,
        title: 'Ước lượng Mức tác động (Impact - I)',
        description: 'Chấm điểm tác động lên chỉ số mục tiêu: 3 = Rất lớn, 2 = Lớn, 1 = Trung bình, 0.5 = Nhỏ, 0.25 = Tối thiểu.',
        actionableTip: 'Gắn mức tác động vào một chỉ số hiệu suất bắc đẩu duy nhất (North Star Metric).'
      },
      {
        number: 3,
        title: 'Đánh giá Độ tự tin (Confidence - C %)',
        description: 'Bạn tự tin đến mức nào vào các ước tính của mình? 100% = Nhiều bằng chứng kiểm chứng, 80% = Trung bình, 50% = Phỏng đoán/Ít dữ liệu.',
        actionableTip: 'Độ tự tin đóng vai trò như chiếc phanh hãm lại những dự án bị thổi phồng.'
      },
      {
        number: 4,
        title: 'Ước tính Nỗ lực (Effort - E) & Xếp hạng',
        description: 'Ước tính tổng số người-tháng/sprint cần thiết. Tính: (R × I × C) / E.',
        actionableTip: 'Sắp xếp danh sách giảm dần để tạo ra thứ tự ưu tiên khách quan cho backlog.'
      }
    ],
    keyQuestions: [
      'Bằng chứng nào chứng minh cho tỷ lệ Độ tự tin của chúng ta (phỏng vấn, thử nghiệm, hay chỉ là cảm giác)?',
      'Tính năng này có phải là ý tưởng cưng của một lãnh đạo nào đó với ước lượng công sức bị cố tình hạ thấp không?',
      'Dự án có điểm số cao nhất với mức Nỗ lực dưới 2 sprint là gì?'
    ],
    exampleUseCase: {
      title: 'Ưu Tiên Lộ Trình Tính Năng Ứng Dụng FinTech Quý 4',
      scenario: 'Nhóm sản phẩm có 24 ý tưởng tính năng nhưng kỹ thuật chỉ có đủ nguồn lực cho 4 tính năng.',
      application: 'Chấm điểm 24 mục bằng RICE. Tính năng hào nhoáng "Theo dõi danh mục Crypto" có Reach cao nhưng Confidence thấp (50%) và Effort khổng lồ (8 người-tháng, điểm: 75). Trong khi đó, "Đăng nhập sinh trắc học một chạm" có Reach 20.000, Impact 2, Confidence 100%, Effort 1 tháng (điểm: 40.000).',
      outcome: 'Phát hành tính năng Đăng nhập sinh trắc học trước; tỷ lệ giữ chân người dùng tăng ngay 18% trong tháng đầu tiên.'
    },
    pros: [
      'Dân chủ hóa quá trình ra quyết định và dẹp tan ý kiến của người được trả lương cao nhất (HiPPO)',
      'Buộc đội ngũ phải đối mặt với khối lượng công sức kỹ thuật thực tế trước khi cam kết',
      'Cực kỳ nhanh gọn và dễ dàng tự động hóa trên bảng tính'
    ],
    cons: [
      'Có thể bị thao túng bằng cách thổi phồng Reach hoặc nói giảm Effort',
      'Giả định rằng mọi tính năng đều độc lập và có tính module hóa'
    ],
    toolsNeeded: ['Bảng tính tính điểm', 'Số liệu phân tích hành vi người dùng'],
    interactiveCanvasType: 'rice-calc',
    plotCoordinates: {
      complexityScore: 16,
      analyticalVsCreative: 15
    }
  }
];
