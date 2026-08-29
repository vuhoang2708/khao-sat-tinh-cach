import { StyleProfile, SocialStyle } from '../types/personality';

export const STYLE_PROFILES: Record<SocialStyle, StyleProfile> = {
  peacock: {
    id: 'peacock',
    name: 'Ưa Thể Hiện (Chim Công)',
    vietnameseName: 'Chim Công — Ưa Thể Hiện',
    englishStyle: 'Expressive / Sanguine',
    animal: 'Chim Công',
    icon: '🦚',
    color: {
      bg: 'from-amber-500/20 to-orange-500/20',
      border: 'border-amber-500/40',
      text: 'text-amber-400',
      accent: '#F59E0B',
      glow: 'shadow-[0_0_25px_rgba(245,158,11,0.3)]'
    },
    tagline: 'Sáng tạo, Truyền cảm hứng, Hoạt ngôn & Tràn đầy Năng lượng',
    overview: 'Người thuộc nhóm Chim Công là tâm điểm của sự gắn kết xã hội, luôn mang lại bầu không khí vui vẻ, sôi nổi và nguồn cảm hứng bất tận cho tập thể. Họ giao tiếp xuất sắc, giàu trí tưởng tượng và dễ dàng kết nối mọi người.',
    strengths: {
      emotion: [
        'Phong cách hấp dẫn, cuốn hút người nghe',
        'Hay nói, là người kể chuyện tài ba',
        'Có khiếu hài hước, nhớ màu sắc và hình ảnh sống động',
        'Cảm tính, chân thật và hay giãi bày tâm sự',
        'Nhiệt tình, phấn khởi, luôn tò mò học hỏi',
        'Biểu diễn và tỏa sáng tốt trên sân khấu',
        'Tấm lòng chân thật, sống trọn vẹn trong hiện tại'
      ],
      work: [
        'Tự nguyện xung phong nhận nhiệm vụ',
        'Nghĩ ra nhiều ý tưởng, hoạt động mới lạ',
        'Sáng tạo, phong cách bắt đầu hào nhoáng',
        'Năng lượng dồi dào, nhiệt huyết bùng nổ',
        'Truyền cảm hứng và lôi cuốn người khác cùng làm việc'
      ],
      friends: [
        'Dễ dàng kết bạn, yêu quý và cởi mở với mọi người',
        'Hay dành nhiều lời khen ngợi chân thành',
        'Không thù lâu nhớ dai, xin lỗi nhanh chóng',
        'Thích các hoạt động giao lưu ngẫu hứng, thú vị'
      ]
    },
    weaknesses: {
      emotion: [
        'Đôi khi nói áp đặt, phóng đại và thêm thắt chi tiết',
        'Dễ bị chi phối bởi hoàn cảnh xung quanh, dễ nổi nóng',
        'Có lúc tự cao, hay khoe khoang hoặc than phiền',
        'Ngây thơ, nhẹ dạ cả tin nên dễ bị lừa',
        'Năng lượng thất thường, khó duy trì sự điềm tĩnh lâu dài'
      ],
      work: [
        'Hay quên nhiệm vụ chi tiết, thiếu kỷ luật tự giác',
        'Khởi đầu hào hứng nhưng ít khi theo đuổi đến cùng',
        'Đặt sai thứ tự ưu tiên, quyết định thiên về cảm tính',
        'Dễ mất tập trung, tốn nhiều thời gian vào tán gẫu'
      ],
      friends: [
        'Nhu cầu cao được làm trung tâm của sự chú ý',
        'Hay ngắt lời, tranh nói và trả lời hộ người khác',
        'Đôi khi lặp lại các câu chuyện cũ mà không nhận ra',
        'Thiếu kiên định và hay viện cớ khi quên hẹn'
      ]
    },
    communicationTips: [
      'Giao tiếp cởi mở, sử dụng nhiều năng lượng tích cực và lời khen ngợi',
      'Tạo không gian cho họ chia sẻ ý tưởng sáng tạo và bộc lộ cảm xúc',
      'Giúp họ ghi lại các mốc thời gian và hành động cụ thể bằng văn bản'
    ],
    growthTips: [
      'Rèn luyện tính kỷ luật, lập danh sách việc cần làm (To-Do List) và bám sát đến cùng',
      'Tập trung lắng nghe người khác nhiều hơn thay vì chiếm sóng đối thoại',
      'Học cách kiểm soát cảm xúc và cân nhắc kỹ trước khi đưa ra quyết định'
    ],
    collaborationTips: [
      {
        targetStyle: 'eagle',
        advice: 'Với Đại Bàng: Hãy nói thẳng vào kết quả, tránh lan man vòng vo để họ không sốt ruột.'
      },
      {
        targetStyle: 'owl',
        advice: 'Với Chim Cú: Cung cấp số liệu, bằng chứng cụ thể và tôn trọng quy trình chi tiết của họ.'
      },
      {
        targetStyle: 'dove',
        advice: 'Với Bồ Câu: Lắng nghe nhẹ nhàng, kiên nhẫn và không tạo áp lực biến động quá nhanh.'
      }
    ]
  },

  eagle: {
    id: 'eagle',
    name: 'Ưa Chỉ Đạo (Đại Bàng)',
    vietnameseName: 'Đại Bàng — Ưa Chỉ Đạo',
    englishStyle: 'Driver / Choleric',
    animal: 'Đại Bàng',
    icon: '🦅',
    color: {
      bg: 'from-rose-500/20 to-red-500/20',
      border: 'border-rose-500/40',
      text: 'text-rose-400',
      accent: '#EF4444',
      glow: 'shadow-[0_0_25px_rgba(239,68,68,0.3)]'
    },
    tagline: 'Quyết đoán, Mục tiêu, Dũng mãnh & Thực thi Tốc độ',
    overview: 'Người thuộc nhóm Đại Bàng là những nhà lãnh đạo bẩm sinh, tập trung cao độ vào kết quả, hành động quyết liệt và không ngại thử thách. Họ luôn hướng tới mục tiêu lớn và dẫn dắt đội ngũ tiến lên.',
    strengths: {
      emotion: [
        'Là nhà lãnh đạo bản năng, năng nổ và luôn chủ động',
        'Kiên quyết, dũng cảm và cực kỳ quyết đoán',
        'Không bị cảm xúc chi phối, tự tin và độc lập',
        'Ý chí mạnh mẽ, không bao giờ dễ dàng nản lòng',
        'Có khả năng điều hành, kiểm soát tình huống xuất sắc'
      ],
      work: [
        'Khuynh hướng định hướng mục tiêu và kết quả rõ ràng',
        'Nhìn thấy bức tranh toàn cảnh chiến lược',
        'Tổ chức tốt, đưa ra các giải pháp mang tính thực tiễn cao',
        'Dễ dàng biến ý tưởng thành hành động ngay lập tức',
        'Biết giao phó công việc và kích thích sự chuyển động của đội ngũ'
      ],
      friends: [
        'Xuất sắc và vượt trội trong các tình huống khẩn cấp',
        'Dẫn dắt, bảo vệ và định hướng cho đồng đội',
        'Thẳng thắn, chân thành và đáng tin cậy trong hành động'
      ]
    },
    weaknesses: {
      emotion: [
        'Dễ nóng nảy, thiếu kiên nhẫn với sự chậm trễ',
        'Khó thư giãn, luôn trong trạng thái căng thẳng vì mục tiêu',
        'Đôi khi thiếu sự cảm thông và không thích sự xúc động ướt át',
        'Có xu hướng hách dịch và ra vẻ bề trên'
      ],
      work: [
        'Khó chấp nhận khi người khác mắc lỗi, đòi hỏi quá khắt khe',
        'Bỏ qua các chi tiết nhỏ hoặc đưa ra quyết định vội vàng',
        'Có thể thô lỗ, thiếu khéo léo trong cách dùng lời nói',
        'Xem công việc là tất cả và yêu cầu sự trung thành tuyệt đối'
      ],
      friends: [
        'Có xu hướng áp đặt, quyết định thay cho người khác',
        'Ít khi nhận lỗi hay nói câu xin lỗi',
        'Quá độc lập khiến người khác cảm thấy khó tiếp cận'
      ]
    },
    communicationTips: [
      'Giao tiếp ngắn gọn, đi thẳng vào trọng tâm, nêu rõ kết quả và mục tiêu',
      'Đưa ra các phương án lựa chọn thay vì chỉ nêu khó khăn',
      'Tôn trọng quyền tự chủ và khả năng ra quyết định của họ'
    ],
    growthTips: [
      'Học cách lắng nghe tích cực và phát triển lòng thấu cảm với cảm xúc đồng đội',
      'Kiên nhẫn hơn với các thành viên cần thời gian phân tích hoặc hòa nhập',
      'Tập thói quen ghi nhận, khen ngợi nỗ lực của tập thể thay vì chỉ đòi hỏi kết quả'
    ],
    collaborationTips: [
      {
        targetStyle: 'peacock',
        advice: 'Với Chim Công: Hãy khen ngợi sự sáng tạo của họ trước khi giao việc cụ thể.'
      },
      {
        targetStyle: 'owl',
        advice: 'Với Chim Cú: Cho họ thời gian nghiên cứu và cung cấp dữ liệu rõ ràng.'
      },
      {
        targetStyle: 'dove',
        advice: 'Với Bồ Câu: Nói chuyện nhẹ nhàng, tránh áp đặt hoặc dồn ép làm họ sợ hãi.'
      }
    ]
  },

  owl: {
    id: 'owl',
    name: 'Ưa Phân Tích (Chim Cú)',
    vietnameseName: 'Chim Cú — Ưa Phân Tích',
    englishStyle: 'Analytical / Melancholy',
    animal: 'Chim Cú',
    icon: '🦉',
    color: {
      bg: 'from-indigo-500/20 to-blue-500/20',
      border: 'border-indigo-500/40',
      text: 'text-indigo-400',
      accent: '#6366F1',
      glow: 'shadow-[0_0_25px_rgba(99,102,241,0.3)]'
    },
    tagline: 'Sâu sắc, Logic, Kỷ luật & Chuẩn mực Cầu toàn',
    overview: 'Người thuộc nhóm Chim Cú là bậc thầy về tư duy logic, sự tỉ mỉ và tiêu chuẩn chất lượng cao. Họ luôn tìm kiếm sự hoàn hảo, ngăn nắp, làm việc dựa trên dữ liệu và giải quyết vấn đề thấu đáo.',
    strengths: {
      emotion: [
        'Sâu sắc, thấu đáo, nghiêm túc và có mục đích sống rõ ràng',
        'Có tư duy thẩm mỹ, nghệ thuật, triết học và thơ ca',
        'Nhạy cảm với người khác, sẵn sàng hy sinh và tận tâm',
        'Biết cư xử, chu đáo, chuẩn mực và đáng kính'
      ],
      work: [
        'Làm việc có kế hoạch, bám sát lịch trình và quy trình',
        'Cầu toàn với tiêu chuẩn chất lượng cực kỳ cao',
        'Chú ý chi tiết, bền bỉ, kỹ lưỡng và ngăn nắp',
        'Yêu thích con số, biểu đồ, bảng dữ liệu và phân tích nguyên nhân gốc rễ',
        'Tìm ra các giải pháp sáng tạo mang tính hệ thống bền vững'
      ],
      friends: [
        'Kết bạn thận trọng nhưng một khi đã gắn bó thì vô cùng trung thành, tận tụy',
        'Biết lắng nghe tâm sự và chân thành giải quyết vấn đề của người khác',
        'Quan tâm sâu sắc và trân trọng tình cảm chân thật'
      ]
    },
    weaknesses: {
      emotion: [
        'Dễ nhớ những chuyện tiêu cực, có xu hướng u uất hoặc tự ti',
        'Nhạy cảm quá mức, hay suy nghĩ phức tạp và tự dằn vặt',
        'Thường thu mình, sống trong thế giới nội tâm tách biệt',
        'Hoài nghi về những lời khen ngợi và khó tha thứ lỗi lầm'
      ],
      work: [
        'Dễ chán nản trước những điều chưa hoàn hảo',
        'Mất quá nhiều thời gian cho việc lên kế hoạch (tê liệt vì phân tích)',
        'Chần chừ khi bắt đầu hoặc sợ mắc lỗi nên trì hoãn ra quyết định',
        'Đưa ra tiêu chuẩn quá cao khiến đồng nghiệp cảm thấy áp lực'
      ],
      friends: [
        'Kín đáo, hay phê bình ngầm hoặc soi xét khuyết điểm của người khác',
        'Bấp bênh về mặt xã hội, ngại giao lưu nơi đông người',
        'Khó mở lòng chia sẻ nếu chưa cảm thấy an toàn tuyệt đối'
      ]
    },
    communicationTips: [
      'Cung cấp thông tin chi tiết, logic, có số liệu và căn cứ rõ ràng',
      'Tôn trọng không gian riêng tư và thời gian suy nghĩ của họ',
      'Đưa ra phản hồi mang tính xây dựng, cụ thể và không quá cảm tính'
    ],
    growthTips: [
      'Chấp nhận nguyên lý 80/20 — Hoàn thành tốt hơn hoàn hảo',
      'Học cách nhìn vào mặt tích cực và mở lòng đón nhận những ý kiến khác biệt',
      'Quyết đoán hơn trong hành động, giảm bớt thời gian phân tích quá đà'
    ],
    collaborationTips: [
      {
        targetStyle: 'peacock',
        advice: 'Với Chim Công: Hãy đánh giá cao sự sáng tạo và năng lượng của họ, nhắc nhở quy trình một cách vui vẻ.'
      },
      {
        targetStyle: 'eagle',
        advice: 'Với Đại Bàng: Trình bày tóm tắt kết luận trước, chuẩn bị sẵn chi tiết khi họ cần đào sâu.'
      },
      {
        targetStyle: 'dove',
        advice: 'Với Bồ Câu: Nhẹ nhàng, hỗ trợ và cùng họ xây dựng từng bước một.'
      }
    ]
  },

  dove: {
    id: 'dove',
    name: 'Dễ Chịu (Bồ Câu)',
    vietnameseName: 'Bồ Câu — Dễ Chịu',
    englishStyle: 'Amiable / Phlegmatic',
    animal: 'Bồ Câu',
    icon: '🕊️',
    color: {
      bg: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/40',
      text: 'text-emerald-400',
      accent: '#10B981',
      glow: 'shadow-[0_0_25px_rgba(16,185,129,0.3)]'
    },
    tagline: 'Điềm tĩnh, Hòa nhã, Lắng nghe & Hợp tác Bền vững',
    overview: 'Người thuộc nhóm Bồ Câu là chỗ dựa bình yên và đáng tin cậy của mọi đội ngũ. Họ điềm đạm, biết lắng nghe, kiên nhẫn, luôn tìm kiếm sự hòa thuận và duy trì sự ổn định trong tập thể.',
    strengths: {
      emotion: [
        'Bình tĩnh, tự chủ, điềm đạm trước mọi biến động',
        'Dễ tính, thoải mái, hướng tới cuộc sống yên bình và cân bằng',
        'Cảm thông sâu sắc, tốt bụng, kín đáo và nhẫn nại',
        'Có khiếu hài hước dí dỏm, tế nhị'
      ],
      work: [
        'Vững chắc, có năng lực quản trị hành chính và điều phối nhịp nhàng',
        'Là cầu nối trung gian hòa giải xung đột trong đội ngũ',
        'Chịu được áp lực một cách bền bỉ mà không than vãn',
        'Tìm ra những phương thức triển khai dễ dàng, êm đẹp'
      ],
      friends: [
        'Dễ hòa nhập, có nhiều bạn bè và được mọi người quý mến',
        'Là người biết lắng nghe tuyệt vời nhất trong 4 nhóm',
        'Có lòng trắc ẩn lớn, luôn quan tâm và đồng hành cùng người khác'
      ]
    },
    weaknesses: {
      emotion: [
        'Thiếu sự nhiệt tình, đôi khi tỏ ra thờ ơ hoặc thụ động',
        'Hay lo sợ, thiếu quyết đoán khi phải đối mặt với thay đổi',
        'Dễ tránh né trách nhiệm trực tiếp, quá nhân nhượng người khác',
        'Giấu kín cảm xúc tiêu cực cho đến khi bùng nổ âm ỉ'
      ],
      work: [
        'Thiếu động lực tự thân mạnh mẽ, dễ bị trì hoãn',
        'Ngại thay đổi và khó thích ứng với các yêu cầu chuyển đổi gấp gáp',
        'Cảm thấy khó chịu khi bị ép buộc hoặc hối thúc',
        'Có xu hướng chỉ muốn đứng nhìn hơn là tiên phong hành động'
      ],
      friends: [
        'Hờ hững với các kế hoạch mới, đôi khi làm giảm nhiệt huyết của nhóm',
        'Ngại va chạm nên không dám nói thẳng quan điểm cá nhân',
        'Có xu hướng mỉa mai ngầm hoặc chống lại sự thay đổi'
      ]
    },
    communicationTips: [
      'Giao tiếp chân thành, ấm áp, tạo cảm giác an toàn và tin cậy',
      'Đưa ra các hướng dẫn rõ ràng, không thúc ép họ ra quyết định tức thì',
      'Chủ động hỏi ý kiến của họ vì họ thường ngại ngùng không tự phát biểu'
    ],
    growthTips: [
      'Học cách nói "Không" và dũng cảm bảo vệ chính kiến của bản thân',
      'Chủ động đặt ra các mục tiêu cá nhân và cam kết hành động quyết liệt',
      'Đón nhận sự thay đổi như một cơ hội phát triển thay vì mối đe dọa'
    ],
    collaborationTips: [
      {
        targetStyle: 'peacock',
        advice: 'Với Chim Công: Cùng tham gia vào các hoạt động vui vẻ nhưng nhẹ nhàng giữ họ đi đúng hướng.'
      },
      {
        targetStyle: 'eagle',
        advice: 'Với Đại Bàng: Thẳng thắn, trình bày rõ ràng tiến độ và không né tránh việc đối thoại.'
      },
      {
        targetStyle: 'owl',
        advice: 'Với Chim Cú: Hợp tác trong việc duy trì quy trình ổn định và tôn trọng chuẩn mực chất lượng.'
      }
    ]
  }
};
