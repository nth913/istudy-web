export const MM_ICON = {
  book: '<svg class="icon" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  test: '<svg class="icon" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="m9 14 2 2 4-4"/></svg>',
  fire: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 1-3s-3 2-3 6a6 6 0 0 0 12 0c0-5-6-11-6-11z"/></svg>',
  bolt: '<svg class="icon" viewBox="0 0 24 24"><path d="M13 2 3 14h7l-1 8 10-12h-7z"/></svg>',
  pen: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
  cap: '<svg class="icon" viewBox="0 0 24 24"><path d="m22 10-10-5L2 10l10 5 10-5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/></svg>',
  speak: '<svg class="icon" viewBox="0 0 24 24"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
  note: '<svg class="icon" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/></svg>',
  star: '<svg class="icon" viewBox="0 0 24 24"><path d="m12 2 3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z"/></svg>',
  grid: '<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
  play: '<svg class="icon" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
  target: '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
};

export type MMItem = { name: string; sub?: string; tag?: string };
export type MMGroup = { title: string; items: MMItem[] };
export type MMTab = { id: string; icon: string; label: string; desc: string; groups: MMGroup[] };
export type MMPromo = { title: string; sub: string; cta: string };
export type MMRegular = { title: string; tabs: MMTab[]; promo: MMPromo; kind?: undefined };
export type MMShowcase = {
  title: string;
  kind: "showcase";
  categories: { name: string; color: string; bg: string }[];
  featured: { t: string; cat: number; d: string; v: string; g: [string, string, string] }[];
  latest: { t: string; cat: number; d: string; v: string; g: [string, string, string] }[];
  topics: string[];
  promo: MMPromo;
};
export type MMData = MMRegular | MMShowcase;

export const MENUS: Record<string, MMData> = {
  "kho-de": {
    title: "Kho đề thi 12.000+",
    tabs: [
      {
        id: "vao-10",
        icon: MM_ICON.fire,
        label: "Đề thi vào lớp 10",
        desc: "Sở GD 34 tỉnh thành",
        groups: [
          { title: "Tỉnh / Thành phố", items: [
            { name: "Đề Hà Nội", sub: "2015 – 2025", tag: "HOT" },
            { name: "Đề TP.HCM", sub: "2015 – 2025", tag: "HOT" },
            { name: "Đề Đà Nẵng", sub: "2018 – 2025" },
            { name: "Đề Hải Phòng", sub: "2018 – 2025" },
            { name: "Tất cả 34 tỉnh", sub: "Tra cứu theo tỉnh" },
          ]},
          { title: "Trường chuyên", items: [
            { name: "Chuyên Sư phạm", sub: "Đề chính thức + giải" },
            { name: "Chuyên Ngoại ngữ", sub: "ĐHQG Hà Nội" },
            { name: "Chuyên KHTN", sub: "ĐHQG Hà Nội" },
            { name: "PTNK TP.HCM", sub: "ĐHQG-HCM" },
            { name: "Lê Hồng Phong", sub: "TP.HCM chuyên Anh" },
          ]},
          { title: "Dạng đề", items: [
            { name: "Đề thi chính thức", sub: "Sở GD công bố" },
            { name: "Đề thi thử Sở GD", sub: "Khảo sát cuối kỳ" },
            { name: "Đề minh hoạ", sub: "Theo cấu trúc mới" },
          ]},
        ],
      },
      {
        id: "thpt-qg",
        icon: MM_ICON.test,
        label: "Đề THPT Quốc gia",
        desc: "Tốt nghiệp & xét ĐH",
        groups: [
          { title: "Đề chính thức", items: [
            { name: "THPT QG 2025", sub: "Mã đề + đáp án Bộ GD", tag: "NEW" },
            { name: "THPT QG 2024", sub: "Đầy đủ 24 mã đề" },
            { name: "THPT QG 2023", sub: "Đầy đủ 24 mã đề" },
            { name: "Lưu trữ 2017 – 2022", sub: "Theo từng năm" },
          ]},
          { title: "Đề thi thử", items: [
            { name: "Sở GD Hà Nội", sub: "Khảo sát T3 hàng năm" },
            { name: "Chuyên ĐHSP", sub: "3 lượt khảo sát/năm", tag: "HOT" },
            { name: "Chuyên Vinh", sub: "Lần 1 → Lần 4" },
            { name: "Liên trường", sub: "Nghệ An, Thanh Hoá…" },
          ]},
          { title: "Đề minh hoạ", items: [
            { name: "Minh hoạ 2026", sub: "Bộ GD&ĐT", tag: "NEW" },
            { name: "Cấu trúc mới 2025", sub: "Phân tích chi tiết" },
            { name: "Tham khảo chính thức", sub: "Bám sát thi thật" },
          ]},
        ],
      },
      {
        id: "dgnl",
        icon: MM_ICON.target,
        label: "Đánh giá năng lực",
        desc: "HSA · APT · V-SAT · TSA",
        groups: [
          { title: "ĐHQG Hà Nội (HSA)", items: [
            { name: "Đề HSA 2025", sub: "Phần Tiếng Anh" },
            { name: "Đề HSA 2024", sub: "6 đợt thi" },
            { name: "Đề minh hoạ HSA", sub: "Cấu trúc đề mới" },
          ]},
          { title: "ĐHQG TP.HCM (APT)", items: [
            { name: "Đề APT 2025", sub: "Phần Ngôn ngữ" },
            { name: "Đề APT các năm", sub: "2018 – 2024" },
          ]},
          { title: "Khác", items: [
            { name: "V-SAT (Bộ GD)", sub: "Bài thi mới", tag: "NEW" },
            { name: "TSA — BK Hà Nội", sub: "Tư duy đọc hiểu" },
            { name: "ĐGNL Bộ Công an", sub: "CAND" },
          ]},
        ],
      },
      {
        id: "quoc-te-de",
        icon: MM_ICON.star,
        label: "Chứng chỉ quốc tế",
        desc: "IELTS · TOEIC · SAT",
        groups: [
          { title: "IELTS", items: [
            { name: "Cambridge 1 → 19", sub: "Bộ đề chính thức" },
            { name: "Đề thi thật theo tháng", sub: "Recent Actual Test" },
            { name: "IELTS Computer-based", sub: "Giao diện thi thật" },
          ]},
          { title: "TOEIC", items: [
            { name: "ETS 2024 – 2025", sub: "Bộ đề mới nhất", tag: "HOT" },
            { name: "Economy TOEIC", sub: "Vol 1 → Vol 5" },
            { name: "Hackers TOEIC", sub: "Reading & Listening" },
          ]},
          { title: "SAT / TOEFL", items: [
            { name: "Digital SAT", sub: "College Board", tag: "NEW" },
            { name: "TOEFL iBT", sub: "Đề ETS chính thức" },
            { name: "Duolingo Test", sub: "Đề luyện online" },
          ]},
        ],
      },
    ],
    promo: {
      title: "12.482 đề thi đã được giải chi tiết",
      sub: "Tải PDF + xem lời giải video + làm bài online có chấm tự động.",
      cta: "Vào kho đề",
    },
  },

  "thi-thu": {
    title: "Thi thử online",
    tabs: [
      {
        id: "vao-10-thu",
        icon: MM_ICON.fire,
        label: "Thi thử vào 10",
        desc: "Mô phỏng phòng thi thật",
        groups: [
          { title: "Theo Sở GD", items: [
            { name: "Vào 10 Hà Nội", sub: "Đề mới cập nhật tuần", tag: "HOT" },
            { name: "Vào 10 TP.HCM", sub: "Theo cấu trúc HCM" },
            { name: "Vào 10 Đà Nẵng", sub: "Bản chính thức" },
          ]},
          { title: "Trường chuyên", items: [
            { name: "Thi thử Chuyên Sư phạm", sub: "90 phút · 80 câu" },
            { name: "Thi thử Chuyên Ngoại ngữ", sub: "120 phút · viết luận" },
            { name: "Thi thử PTNK", sub: "Đề mở rộng" },
          ]},
        ],
      },
      {
        id: "thpt-thu",
        icon: MM_ICON.cap,
        label: "Thi thử THPT QG",
        desc: "60 phút · 40 câu",
        groups: [
          { title: "Lịch thi thử miễn phí", items: [
            { name: "Thi thử tháng 6", sub: "CN tuần này 9:00", tag: "NEW" },
            { name: "Thi thử cuối tháng", sub: "Báo cáo điểm theo lớp" },
            { name: "Marathon 24h", sub: "Thi 5 đề/ngày", tag: "HOT" },
          ]},
          { title: "Tự thi mọi lúc", items: [
            { name: "Đề ngẫu nhiên", sub: "Hệ thống random" },
            { name: "Đề theo độ khó", sub: "Cơ bản → vận dụng cao" },
            { name: "Đề theo chuyên đề", sub: "Tense, từ vựng, đọc…" },
          ]},
        ],
      },
      {
        id: "dgnl-thu",
        icon: MM_ICON.target,
        label: "Thi thử ĐGNL",
        desc: "HSA · APT · V-SAT",
        groups: [
          { title: "Đề mô phỏng", items: [
            { name: "Mô phỏng HSA", sub: "Phần Tiếng Anh đầy đủ" },
            { name: "Mô phỏng APT", sub: "Phần Ngôn ngữ Anh" },
            { name: "Mô phỏng V-SAT", sub: "Bộ GD 2025" },
          ]},
        ],
      },
      {
        id: "quoc-te-thu",
        icon: MM_ICON.star,
        label: "Thi thử quốc tế",
        desc: "IELTS · TOEIC · SAT",
        groups: [
          { title: "IELTS", items: [
            { name: "Full test IELTS", sub: "4 kỹ năng · 2h45p" },
            { name: "Mini test 30 phút", sub: "Đo nhanh band" },
            { name: "Speaking AI chấm", sub: "Phản hồi tức thì", tag: "NEW" },
          ]},
          { title: "TOEIC", items: [
            { name: "TOEIC 2 kỹ năng", sub: "L-R · 120 phút" },
            { name: "TOEIC mini test", sub: "60 phút rút gọn" },
          ]},
        ],
      },
    ],
    promo: {
      title: "Phòng thi mô phỏng thật 100%",
      sub: "Đếm ngược thời gian, chấm tự động, phân tích lỗi sai theo chuyên đề.",
      cta: "Vào phòng thi",
    },
  },

  "ngu-phap": {
    title: "Từ vựng & Ngữ pháp",
    tabs: [
      {
        id: "np-co-ban",
        icon: MM_ICON.book,
        label: "Ngữ pháp cơ bản",
        desc: "Cho người mới bắt đầu",
        groups: [
          { title: "12 thì cốt lõi", items: [
            { name: "Thì Hiện tại", sub: "Đơn · Tiếp diễn · HTHT" },
            { name: "Thì Quá khứ", sub: "Đơn · Tiếp diễn · QKHT" },
            { name: "Thì Tương lai", sub: "Will · Be going to · TLHT" },
            { name: "So sánh & phân biệt", sub: "Bảng tổng hợp 12 thì", tag: "HOT" },
          ]},
          { title: "Từ loại", items: [
            { name: "Danh từ", sub: "Đếm được & không đếm" },
            { name: "Động từ", sub: "V thường · trợ V · khuyết" },
            { name: "Tính từ – Trạng từ", sub: "Vị trí, so sánh" },
            { name: "Giới từ", sub: "In · On · At · For…" },
          ]},
          { title: "Cấu trúc câu", items: [
            { name: "Câu đơn – ghép – phức", sub: "Phân loại & ví dụ" },
            { name: "Câu hỏi (Wh-, Yes/No)", sub: "Trật tự từ" },
            { name: "Câu phủ định", sub: "Not · No · Never" },
          ]},
        ],
      },
      {
        id: "np-nang-cao",
        icon: MM_ICON.bolt,
        label: "Ngữ pháp nâng cao",
        desc: "Cho thi vào 10 & ĐH",
        groups: [
          { title: "Chuyên đề trọng tâm", items: [
            { name: "Câu điều kiện", sub: "Loại 0 → loại hỗn hợp", tag: "HOT" },
            { name: "Câu bị động", sub: "12 thì + đặc biệt" },
            { name: "Câu tường thuật", sub: "Statement · Question · Imperative" },
            { name: "Mệnh đề quan hệ", sub: "Defining & Non-defining" },
          ]},
          { title: "Cấu trúc khó", items: [
            { name: "Đảo ngữ", sub: "Negative inversion" },
            { name: "Câu chẻ (Cleft)", sub: "It is … that …" },
            { name: "Wish / If only", sub: "Câu ước" },
            { name: "Used to / Be used to", sub: "Phân biệt cấu trúc" },
          ]},
          { title: "Dạng bài thi", items: [
            { name: "Viết lại câu", sub: "Rewrite — 50 dạng" },
            { name: "Chia dạng động từ", sub: "V-ing · to V · V_ed" },
            { name: "Tìm lỗi sai", sub: "Error identification" },
            { name: "Word formation", sub: "Tạo từ từ gốc" },
          ]},
        ],
      },
      {
        id: "tu-vung",
        icon: MM_ICON.pen,
        label: "Từ vựng",
        desc: "Học theo chủ đề & gốc từ",
        groups: [
          { title: "Theo cấp độ", items: [
            { name: "Từ vựng lớp 9", sub: "1.500 từ — vào 10" },
            { name: "Từ vựng lớp 12", sub: "3.000 từ — THPT QG", tag: "HOT" },
            { name: "Oxford 3000 / 5000", sub: "Chuẩn quốc tế" },
          ]},
          { title: "Theo chủ đề", items: [
            { name: "Education & Career", sub: "Học hành & nghề nghiệp" },
            { name: "Environment", sub: "Môi trường & biến đổi KH" },
            { name: "Technology", sub: "Công nghệ & AI" },
            { name: "Health & Lifestyle", sub: "Sức khoẻ & lối sống" },
          ]},
          { title: "Học sâu", items: [
            { name: "Word family", sub: "Họ từ N–V–Adj–Adv" },
            { name: "Phrasal verbs", sub: "500 cụm động từ" },
            { name: "Collocations", sub: "Kết hợp từ tự nhiên" },
            { name: "Idioms thường gặp", sub: "Thành ngữ thi cử" },
          ]},
        ],
      },
      {
        id: "phat-am",
        icon: MM_ICON.speak,
        label: "Phát âm & Trọng âm",
        desc: "Dạng bài cốt lõi của đề thi",
        groups: [
          { title: "Phát âm", items: [
            { name: "Đuôi -ed", sub: "/t/ /d/ /ɪd/" },
            { name: "Đuôi -s / -es", sub: "/s/ /z/ /ɪz/" },
            { name: "Nguyên âm dễ nhầm", sub: "/iː/ vs /ɪ/, /æ/ vs /ʌ/" },
            { name: "Phụ âm khó", sub: "/θ/ /ð/ /ʃ/ /ʒ/" },
          ]},
          { title: "Trọng âm", items: [
            { name: "Quy tắc 2 âm tiết", sub: "V vs N · động từ ghép" },
            { name: "Quy tắc 3+ âm tiết", sub: "Hậu tố -tion, -ic, -ity" },
            { name: "Trường hợp ngoại lệ", sub: "Top từ hay ra đề" },
          ]},
        ],
      },
    ],
    promo: {
      title: "Sổ tay 250 chuyên đề ngữ pháp",
      sub: "Lý thuyết ngắn gọn, ví dụ trực quan, bài tập theo mức độ — PDF + bản online.",
      cta: "Mở sổ tay",
    },
  },

  "tai-lieu": {
    title: "Tài liệu & Bài giảng",
    tabs: [
      {
        id: "sgk",
        icon: MM_ICON.book,
        label: "Giải SGK",
        desc: "Bám sát chương trình mới",
        groups: [
          { title: "Tiếng Anh THCS", items: [
            { name: "Global Success 6 → 9", sub: "Bộ Kết nối tri thức", tag: "HOT" },
            { name: "Friends Plus 6 → 9", sub: "Bộ Chân trời sáng tạo" },
            { name: "i-Learn Smart World", sub: "Bộ Cánh diều" },
          ]},
          { title: "Tiếng Anh THPT", items: [
            { name: "Global Success 10 → 12", sub: "Kết nối tri thức" },
            { name: "Friends Global 10 → 12", sub: "Chân trời sáng tạo" },
            { name: "i-Learn Smart World 10 → 12", sub: "Cánh diều" },
          ]},
        ],
      },
      {
        id: "bai-giang",
        icon: MM_ICON.play,
        label: "Bài giảng video",
        desc: "Giáo viên chuyên thi cử",
        groups: [
          { title: "Theo cấp", items: [
            { name: "Video Lớp 9 vào 10", sub: "120 bài giảng" },
            { name: "Video Lớp 12 THPT QG", sub: "180 bài giảng", tag: "HOT" },
            { name: "Chữa đề chi tiết", sub: "Mỗi đề 1 video" },
          ]},
          { title: "Live & Webinar", items: [
            { name: "Live chữa đề hàng tuần", sub: "20:00 Thứ 4", tag: "LIVE" },
            { name: "Workshop chuyên đề", sub: "Miễn phí" },
            { name: "Lưu trữ Live", sub: "Xem lại bản ghi" },
          ]},
        ],
      },
      {
        id: "sach",
        icon: MM_ICON.note,
        label: "Sách & Tài liệu",
        desc: "PDF · ebook · in giấy",
        groups: [
          { title: "Sách istudy", items: [
            { name: "Cẩm nang vào 10", sub: "Lý thuyết + 200 đề" },
            { name: "Cẩm nang THPT QG", sub: "12 chuyên đề" },
            { name: "Mai Lan Hương", sub: "Bộ ngữ pháp kinh điển" },
            { name: "Bùi Văn Vinh", sub: "Trọng tâm ngữ pháp" },
          ]},
          { title: "Tài liệu miễn phí", items: [
            { name: "PDF tổng hợp 12 thì", sub: "Tải về dùng ngay" },
            { name: "Bộ 100 đề vào 10", sub: "File Word có đáp án" },
            { name: "Bộ flashcard từ vựng", sub: "Quizlet & Anki" },
          ]},
        ],
      },
      {
        id: "cong-cu",
        icon: MM_ICON.grid,
        label: "Công cụ AI",
        desc: "Hỗ trợ tự học",
        groups: [
          { title: "Học cùng AI", items: [
            { name: "Chấm Writing tự động", sub: "Theo barem THPT QG", tag: "NEW" },
            { name: "AI hỏi đáp ngữ pháp", sub: "Trả lời tức thì" },
            { name: "Dịch & giải thích câu", sub: "Phân tích cấu trúc" },
            { name: "Tạo đề luyện riêng", sub: "Theo trình độ bạn", tag: "NEW" },
          ]},
          { title: "Tiện ích", items: [
            { name: "Từ điển istudy", sub: "Tích hợp ví dụ thi" },
            { name: "Lịch học cá nhân", sub: "Nhắc bài hằng ngày" },
            { name: "Bảng xếp hạng", sub: "Theo trường, lớp" },
          ]},
        ],
      },
    ],
    promo: {
      title: "Học cùng AI — miễn phí 7 ngày",
      sub: "Lộ trình tự động điều chỉnh theo điểm yếu của bạn. Phù hợp ôn vào 10 & THPT QG.",
      cta: "Dùng thử ngay",
    },
  },

  blog: {
    title: "Blog istudy",
    kind: "showcase",
    categories: [
      { name: "Ngữ pháp", color: "var(--red)", bg: "var(--red-light)" },
      { name: "Từ vựng", color: "#9333EA", bg: "#F3E8FF" },
      { name: "Chiến lược", color: "var(--blue)", bg: "#EFF6FF" },
      { name: "Phát âm", color: "var(--green)", bg: "var(--green-bg)" },
      { name: "Viết", color: "#D97706", bg: "#FEF3C7" },
      { name: "Đọc hiểu", color: "#0891B2", bg: "#CFFAFE" },
    ],
    featured: [
      { t: "5 chiến lược làm bài thi THPT QG môn Anh đạt 9+", cat: 2, d: "25/04/2026", v: "21.3K", g: ["#FFE4E6", "#FECACA", "🎯"] },
      { t: "Câu điều kiện loại 1, 2, 3 và Mixed: Phân biệt cực dễ", cat: 0, d: "01/05/2026", v: "16.8K", g: ["#DBEAFE", "#BFDBFE", "📝"] },
      { t: "150 phrasal verbs với GET, PUT, TAKE phải nhớ", cat: 1, d: "09/05/2026", v: "18.9K", g: ["#F3E8FF", "#E9D5FF", "📚"] },
    ],
    latest: [
      { t: "Thì quá khứ đơn vs Hiện tại hoàn thành: Phân biệt dễ hiểu nhất", cat: 0, d: "10/05/2026", v: "12.3K", g: ["#FEF3C7", "#FDE68A", "🔤"] },
      { t: "Cách phát âm âm /θ/ và /ð/ chuẩn người bản xứ", cat: 3, d: "07/05/2026", v: "7.5K", g: ["#D1FAE5", "#A7F3D0", "🗣️"] },
      { t: "Cấu trúc bài luận Opinion Essay step-by-step", cat: 4, d: "05/05/2026", v: "11.2K", g: ["#FED7AA", "#FDBA74", "✏️"] },
      { t: "Mẫu câu giao tiếp tiếng Anh hàng ngày: 100 cụm", cat: 1, d: "03/05/2026", v: "14.6K", g: ["#FCE7F3", "#FBCFE8", "💬"] },
    ],
    topics: [
      "Ngữ pháp vào 10", "Từ vựng theo chủ đề", "Mẹo làm Reading",
      "Writing Task 2", "Phát âm IPA", "Đề minh hoạ 2026",
      "IELTS Speaking", "Lộ trình THPT QG",
    ],
    promo: {
      title: "Đăng ký nhận bản tin tuần",
      sub: "Tổng hợp đề mới, bài viết hay và mẹo ôn thi gửi vào hộp thư của bạn mỗi sáng thứ Hai.",
      cta: "Đăng ký miễn phí",
    },
  },
};

export const NAV_ITEMS: { key: string; label: string; href?: string; mega?: string }[] = [
  { key: "home", label: "Trang chủ", href: "/" },
  { key: "kho-de", label: "Kho đề thi", href: "/kho-de-thi", mega: "kho-de" },
  { key: "thi-thu", label: "Thi thử", mega: "thi-thu" },
  { key: "ngu-phap", label: "Từ vựng & Ngữ pháp", href: "/bai-viet", mega: "ngu-phap" },
  { key: "tai-lieu", label: "Tài liệu", mega: "tai-lieu" },
  { key: "blog", label: "Blog", href: "/bai-viet", mega: "blog" },
];
