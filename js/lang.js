// ================================================================
//  VOID-BIT — Bilingual Support (English / Tiếng Việt)
//  Call t('key') to get translated string in current language.
//  Language is stored in localStorage key 'voidbit_lang'.
// ================================================================

var currentLang = 'en';

var LANG = {

  // ============================================================
  //  ENGLISH
  // ============================================================
  en: {
    // Navbar
    'nav.features':     'Features',
    'nav.courses':      'Courses',
    'nav.roadmap':      'Roadmap',
    'nav.lessons':      'Lessons',
    'nav.forum':        'Forum',
    'nav.chat':         'Chat',

    // Auth
    'auth.tagline':     'Sign in to start learning Competitive Programming',

    // Hero
    'hero.badge':       'The Ultimate CP Learning Platform',
    'hero.title.line1': 'Void-bit:',
    'hero.title.line2': 'Zero to Hero in',
    'hero.title.line3': 'Competitive Programming',
    'hero.desc':        'Master C++, conquer algorithms, and dominate competitions — from provincial olympiads to ICPC World Finals.',
    'hero.btn.roadmap': 'Explore Roadmaps',
    'hero.btn.lessons': 'Start Learning',
    'hero.stat1':       'learners',
    'hero.stat2':       'rating',

    // Features
    'features.badge':       'Why Void-bit?',
    'features.title':       'Built for Champions',
    'features.subtitle':    'Everything you need from absolute beginner to international medalist.',
    'features.card1.title': 'Structured Roadmaps',
    'features.card1.desc':  '4 curated pathways from C++ basics to ICPC-level mastery.',
    'features.card2.title': 'Gamified Learning',
    'features.card2.desc':  'Streaks, leaderboards, and achievements keep you motivated.',
    'features.card3.title': 'Deep Curriculum',
    'features.card3.desc':  '60+ topics, 200+ problems, and detailed subtopic breakdowns.',
    'features.card4.title': 'Practice-First',
    'features.card4.desc':  'Every concept backed by curated practice problems from Codeforces.',

    // Courses
    'courses.badge':    'Curriculum',
    'courses.title':    'Course Library',
    'courses.subtitle': 'Core topic areas with structured lessons and progress tracking.',
    'courses.lessons':  'lessons',
    'courses.view':     'View lessons →',

    // Course names
    'course.cpp':       'C++ Basics',
    'course.cpp.desc':  'Syntax, STL, I/O, pointers, and OOP fundamentals.',
    'course.ds':        'Data Structures',
    'course.ds.desc':   'Arrays, linked lists, trees, heaps, hash tables, graphs.',
    'course.algo':      'Algorithms',
    'course.algo.desc': 'Sorting, searching, two pointers, binary search, greedy.',
    'course.dp':        'Dynamic Programming',
    'course.dp.desc':   'Memoization, tabulation, tree DP, digit DP, optimizations.',
    'course.math':      'Math for CP',
    'course.math.desc': 'Number theory, combinatorics, modulo arithmetic, geometry.',

    // Dashboard
    'streak.title':  'Daily Streak',
    'streak.days':   'days',
    'streak.msg':    'Solve at least one problem daily to maintain your streak!',
    'leaderboard':   'Leaderboard',
    'potd.title':    'Problem of the Day',
    'potd.solve':    'Solve Now',
    'potd.rating':   'Rating',

    // Roadmap
    'roadmap.badge':     'Learning Path',
    'roadmap.title':     'The Ultimate CP Roadmap',
    'roadmap.subtitle':  'Choose your pathway and track your progress milestone by milestone.',
    'roadmap.milestones':'milestones',
    'roadmap.completed': 'Completed',
    'roadmap.remaining': 'Remaining',
    'roadmap.total':     'Total milestones',
    'roadmap.progress':  'Progress Overview',
    'roadmap.progressOf':'of',
    'roadmap.tips.title':'Quick Tips',
    'roadmap.tips.1':    'Solve at least 3 problems per milestone.',
    'roadmap.tips.2':    'Review failed problems the next day.',
    'roadmap.tips.3':    'Compete in weekly contests to apply skills.',
    'roadmap.done':      'Done',

    // Roadmap names (keep original for proper names)
    'roadmap.basics-cpp':  'Basics & C++',
    'roadmap.hsg-tinh':    'HSG Tỉnh',
    'roadmap.hsg-quocgia': 'HSG Quốc Gia',
    'roadmap.ioi-icpc':    'IOI & ICPC',

    // Lesson viewer
    'lesson.title':     'Lesson Library',
    'lesson.subtitle':  'Select a category to start learning:',
    'lesson.lessons':   'lessons',
    'lesson.back':      'Back to categories',
    'lesson.backTo':    'Back to',
    'lesson.breadcrumbCats': 'Categories',
    'lesson.explanation': 'Explanation',
    'lesson.functions':   'Key Functions',
    'lesson.code':        'Sample Code',
    'lesson.problems':    'Practice Problems',
    'lesson.coming':      'Practice problems coming soon.',
    'lesson.topics':      'Topics',

    // Lesson category names
    'cat.paradigms':     'Algorithm Design Techniques',
    'cat.linear-ds':     'Linear Data Structures',
    'cat.nonlinear-ds':  'Non-Linear Data Structures',
    'cat.advanced-ds':   'Advanced Data Structures',
    'cat.graph-algos':   'Graph Algorithms',
    'cat.math':          'Math & Number Theory',
    'cat.string':        'String Algorithms',
    'cat.optimizations': 'Low-level Optimizations',

    // Difficulty
    'diff.easy':    'Easy',
    'diff.medium':  'Medium',
    'diff.hard':    'Hard',

    // Forum
    'forum.badge':         'Community',
    'forum.title':         'Forum & Discussion',
    'forum.subtitle':      'Ask questions, share tips, and discuss CP problems with fellow programmers.',
    'forum.newThread':     'New Thread',
    'forum.threads':       'threads',
    'forum.replies':       'replies',
    'forum.loading':       'Loading...',
    'forum.empty':         'No threads yet. Be the first to start a discussion!',
    'forum.back':          'Back to threads',
    'forum.placeholder':   'Type your message...',
    'forum.noMessages':    'No messages yet. Be the first to reply!',
    'forum.justNow':       'just now',
    'forum.createTitle':   'Create New Thread',
    'forum.threadTitle':   'Thread Title',
    'forum.titlePlaceholder': 'e.g., Tips for Segment Tree',
    'forum.message':       'Message',
    'forum.msgPlaceholder':'Share your thoughts...',
    'forum.cancel':        'Cancel',
    'forum.create':        'Create Thread',
    'forum.tabThreads':    'Threads',
    'forum.tabChat':       'Chat',
    'forum.settings':      'Profile',
    'forum.profile':       'Your Profile',
    'forum.profileDesc':   'Your display name and avatar across the forum.',
    'forum.nickname':      'Nickname',
    'forum.avatarUrl':     'Avatar URL (optional)',
    'forum.save':          'Save',
    'forum.login':         'Login',
    'forum.register':      'Register',
    'forum.logout':        'Logout',
    'forum.username':      'Username',
    'forum.password':      'Password',
    'forum.displayName':   'Display Name',
    'forum.usernamePlace': 'Enter username',
    'forum.passwordPlace': 'Enter password',
    'forum.authRequired':  'Please enter both username and password.',
    'forum.userExists':    'Username already taken. Please choose another.',
    'forum.authError':     'Registration failed:',
    'forum.userNotFound':  'User not found.',
    'forum.wrongPass':     'Wrong password.',
    'chat.online':         'Online',
    'chat.offline':        'Offline',
    'chat.noOnline':       'No one online right now.',
    'chat.startDM':        'Send a message to start the conversation!',
    'chat.backToUsers':    'Back to users',
    'chat.recent':         'Recent Chats',
    'chat.noRecent':       'No conversations yet.',
    'chat.presence':       'Set your display name in Settings to chat.',
    'chat.subtitle':       'Message other competitive programmers in real time.',
    'chat.allUsers':       'All Users',
    'chat.noOtherUsers':   'No other users yet. Share the site!',

    // Footer
    'footer.brand':   'Zero to Hero in Competitive Programming. Master algorithms, conquer contests.',
    'footer.learn':   'Learn',
    'footer.paths':   'Paths',
    'footer.community':'Community',
    'footer.copyright':'Built for competitive programmers, by competitive programmers.',
  },

  // ============================================================
  //  VIETNAMESE
  // ============================================================
  vi: {
    // Navbar
    'nav.features':     'Tính năng',
    'nav.courses':      'Khóa học',
    'nav.roadmap':      'Lộ trình',
    'nav.lessons':      'Bài giảng',
    'nav.forum':        'Diễn đàn',
    'nav.chat':         'Chat',

    // Auth
    'auth.tagline':     'Đăng nhập để bắt đầu học Lập trình thi đấu',

    // Hero
    'hero.badge':       'Nền tảng học CP tối ưu',
    'hero.title.line1': 'Void-bit:',
    'hero.title.line2': 'Từ số 0 đến anh hùng trong',
    'hero.title.line3': 'Lập trình thi đấu',
    'hero.desc':        'Làm chủ C++, chinh phục thuật toán, thống trị các kỳ thi — từ HSG Tỉnh đến ICPC World Finals.',
    'hero.btn.roadmap': 'Khám phá lộ trình',
    'hero.btn.lessons': 'Bắt đầu học',
    'hero.stat1':       'học viên',
    'hero.stat2':       'đánh giá',

    // Features
    'features.badge':       'Tại sao Void-bit?',
    'features.title':       'Xây dựng cho nhà vô địch',
    'features.subtitle':    'Mọi thứ bạn cần từ người mới bắt đầu đến huy chương quốc tế.',
    'features.card1.title': 'Lộ trình bài bản',
    'features.card1.desc':  '4 lộ trình từ C++ cơ bản đến trình độ ICPC.',
    'features.card2.title': 'Học tập như chơi game',
    'features.card2.desc':  'Chuỗi ngày, bảng xếp hạng, thành tích giúp bạn luôn có động lực.',
    'features.card3.title': 'Chương trình sâu rộng',
    'features.card3.desc':  '60+ chủ đề, 200+ bài tập, phân tích chi tiết từng phần.',
    'features.card4.title': 'Thực hành là chính',
    'features.card4.desc':  'Mỗi khái niệm đi kèm bài tập chọn lọc từ Codeforces.',

    // Courses
    'courses.badge':    'Chương trình',
    'courses.title':    'Thư viện khóa học',
    'courses.subtitle': 'Các chủ đề cốt lõi với bài học có cấu trúc và theo dõi tiến độ.',
    'courses.lessons':  'bài học',
    'courses.view':     'Xem bài giảng →',

    // Course names
    'course.cpp':       'C++ Cơ bản',
    'course.cpp.desc':  'Cú pháp, STL, I/O, con trỏ, và OOP cơ bản.',
    'course.ds':        'Cấu trúc dữ liệu',
    'course.ds.desc':   'Mảng, danh sách liên kết, cây, heap, bảng băm, đồ thị.',
    'course.algo':      'Thuật toán',
    'course.algo.desc': 'Sắp xếp, tìm kiếm, hai con trỏ, chặt nhị phân, tham lam.',
    'course.dp':        'Quy hoạch động',
    'course.dp.desc':   'Ghi nhớ, truy hồi, DP cây, DP chữ số, tối ưu hóa.',
    'course.math':      'Toán cho CP',
    'course.math.desc': 'Lý thuyết số, tổ hợp, số học modulo, hình học.',

    // Dashboard
    'streak.title':  'Chuỗi ngày',
    'streak.days':   'ngày',
    'streak.msg':    'Giải ít nhất một bài mỗi ngày để duy trì chuỗi!',
    'leaderboard':   'Bảng xếp hạng',
    'potd.title':    'Bài toán trong ngày',
    'potd.solve':    'Giải ngay',
    'potd.rating':   'Độ khó',

    // Roadmap
    'roadmap.badge':     'Lộ trình học',
    'roadmap.title':     'Lộ trình CP tối thượng',
    'roadmap.subtitle':  'Chọn lộ trình và theo dõi tiến độ từng cột mốc.',
    'roadmap.milestones':'cột mốc',
    'roadmap.completed': 'Đã hoàn thành',
    'roadmap.remaining': 'Còn lại',
    'roadmap.total':     'Tổng số cột mốc',
    'roadmap.progress':  'Tổng quan tiến độ',
    'roadmap.progressOf':'của',
    'roadmap.tips.title':'Mẹo nhỏ',
    'roadmap.tips.1':    'Giải ít nhất 3 bài tập mỗi cột mốc.',
    'roadmap.tips.2':    'Xem lại bài sai vào ngày hôm sau.',
    'roadmap.tips.3':    'Tham gia thi đấu hàng tuần để áp dụng kỹ năng.',
    'roadmap.done':      'Xong',

    // Roadmap names
    'roadmap.basics-cpp':  'C++ Cơ bản',
    'roadmap.hsg-tinh':    'HSG Tỉnh',
    'roadmap.hsg-quocgia': 'HSG Quốc Gia',
    'roadmap.ioi-icpc':    'IOI & ICPC',

    // Lesson viewer
    'lesson.title':     'Thư viện bài giảng',
    'lesson.subtitle':  'Chọn một nhóm chủ đề để bắt đầu học:',
    'lesson.lessons':   'bài học',
    'lesson.back':      'Quay lại danh mục',
    'lesson.backTo':    'Quay lại',
    'lesson.breadcrumbCats': 'Danh mục',
    'lesson.explanation': 'Giải thích',
    'lesson.functions':   'Các hàm quan trọng',
    'lesson.code':        'Code mẫu',
    'lesson.problems':    'Bài tập thực hành',
    'lesson.coming':      'Bài tập thực hành đang cập nhật.',
    'lesson.topics':      'Chủ đề',

    // Lesson category names
    'cat.paradigms':     'Kĩ thuật thiết kế giải thuật',
    'cat.linear-ds':     'Cấu trúc dữ liệu Tuyến tính',
    'cat.nonlinear-ds':  'Cấu trúc dữ liệu Phi tuyến tính',
    'cat.advanced-ds':   'Cấu trúc dữ liệu Nâng cao',
    'cat.graph-algos':   'Thuật toán Đồ thị',
    'cat.math':          'Toán học & Lý thuyết số',
    'cat.string':        'Xử lý chuỗi',
    'cat.optimizations': 'Thủ thuật tối ưu hóa',

    // Difficulty
    'diff.easy':    'Dễ',
    'diff.medium':  'Trung bình',
    'diff.hard':    'Khó',

    // Forum
    'forum.badge':         'Cộng đồng',
    'forum.title':         'Diễn đàn & Thảo luận',
    'forum.subtitle':      'Đặt câu hỏi, chia sẻ mẹo và thảo luận bài tập CP với các lập trình viên khác.',
    'forum.newThread':     'Tạo chủ đề',
    'forum.threads':       'chủ đề',
    'forum.replies':       'phản hồi',
    'forum.loading':       'Đang tải...',
    'forum.empty':         'Chưa có chủ đề nào. Hãy tạo chủ đề đầu tiên!',
    'forum.back':          'Quay lại danh sách',
    'forum.placeholder':   'Nhập tin nhắn...',
    'forum.noMessages':    'Chưa có tin nhắn nào. Hãy là người đầu tiên trả lời!',
    'forum.justNow':       'vừa xong',
    'forum.createTitle':   'Tạo chủ đề mới',
    'forum.threadTitle':   'Tiêu đề',
    'forum.titlePlaceholder': 'VD: Mẹo dùng Segment Tree',
    'forum.message':       'Nội dung',
    'forum.msgPlaceholder':'Chia sẻ suy nghĩ của bạn...',
    'forum.cancel':        'Hủy',
    'forum.create':        'Tạo chủ đề',
    'forum.tabThreads':    'Chủ đề',
    'forum.tabChat':       'Nhắn tin',
    'forum.settings':      'Hồ sơ',
    'forum.profile':       'Hồ sơ của bạn',
    'forum.profileDesc':   'Tên hiển thị và avatar trên toàn diễn đàn.',
    'forum.nickname':      'Tên hiển thị',
    'forum.avatarUrl':     'URL ảnh đại diện (không bắt buộc)',
    'forum.save':          'Lưu',
    'forum.login':         'Đăng nhập',
    'forum.register':      'Đăng ký',
    'forum.logout':        'Đăng xuất',
    'forum.username':      'Tên đăng nhập',
    'forum.password':      'Mật khẩu',
    'forum.displayName':   'Tên hiển thị',
    'forum.usernamePlace': 'Nhập tên đăng nhập',
    'forum.passwordPlace': 'Nhập mật khẩu',
    'forum.authRequired':  'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.',
    'forum.userExists':    'Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.',
    'forum.authError':     'Đăng ký thất bại:',
    'forum.userNotFound':  'Không tìm thấy người dùng.',
    'forum.wrongPass':     'Sai mật khẩu.',
    'chat.online':         'Online',
    'chat.offline':        'Off',
    'chat.noOnline':       'Không có ai online.',
    'chat.startDM':        'Gửi tin nhắn để bắt đầu trò chuyện!',
    'chat.backToUsers':    'Quay lại danh sách',
    'chat.recent':         'Gần đây',
    'chat.noRecent':       'Chưa có hội thoại nào.',
    'chat.presence':       'Đặt tên hiển thị để chat.',
    'chat.subtitle':       'Nhắn tin trực tiếp với các lập trình viên khác trong thời gian thực.',
    'chat.allUsers':       'Tất cả người dùng',
    'chat.noOtherUsers':   'Chưa có người dùng khác. Chia sẻ trang web nhé!',

    // Footer
    'footer.brand':   'Từ số 0 đến anh hùng trong Lập trình thi đấu. Làm chủ thuật toán, chinh phục các kỳ thi.',
    'footer.learn':   'Học',
    'footer.paths':   'Lộ trình',
    'footer.community':'Cộng đồng',
    'footer.copyright':'Xây dựng bởi lập trình viên thi đấu, dành cho lập trình viên thi đấu.',
  }
};

// ----------------------------------------------------------------
//  GET TRANSLATED STRING
// ----------------------------------------------------------------
function t(key) {
  var lang = LANG[currentLang];
  if (lang && lang[key] !== undefined) return lang[key];
  // fallback to English
  if (LANG.en && LANG.en[key] !== undefined) return LANG.en[key];
  return key;
}

// ----------------------------------------------------------------
//  LANGUAGE SWITCHING
// ----------------------------------------------------------------
function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'vi') return;
  currentLang = lang;
  try { localStorage.setItem('voidbit_lang', lang); } catch {}
  translatePage();
  // Re-render dynamic content
  if (typeof renderCourses === 'function') {
    renderCourses();
    renderStreak();
    renderLeaderboard();
    renderProblemOfDay();
    renderTabs();
    renderRoadmapContent();
    renderNavProfile();
    renderForum();
  }
}

function toggleLanguage() {
  setLanguage(currentLang === 'en' ? 'vi' : 'en');
}

// ----------------------------------------------------------------
//  TRANSLATE STATIC HTML (data-i18n attributes)
// ----------------------------------------------------------------
function translatePage() {
  // Elements with data-i18n get their textContent replaced
  var els = document.querySelectorAll('[data-i18n]');
  for (var i = 0; i < els.length; i++) {
    var key = els[i].getAttribute('data-i18n');
    els[i].textContent = t(key);
  }

  // Elements with data-i18n-attr get specific attribute translated
  var attrEls = document.querySelectorAll('[data-i18n-attr]');
  for (var i = 0; i < attrEls.length; i++) {
    var el = attrEls[i];
    var val = el.getAttribute('data-i18n-attr');
    var parts = val.split(':');
    if (parts.length === 2) {
      el.setAttribute(parts[0], t(parts[1]));
    }
  }

  // Update language switcher button text
  var btn = document.getElementById('langToggle');
  if (btn) {
    btn.textContent = currentLang === 'en' ? 'VI' : 'EN';
    btn.setAttribute('title', currentLang === 'en' ? 'Switch to Tiếng Việt' : 'Switch to English');
  }
}

// ----------------------------------------------------------------
//  INIT LANGUAGE ON LOAD
// ----------------------------------------------------------------
(function() {
  try {
    var saved = localStorage.getItem('voidbit_lang');
    if (saved === 'en' || saved === 'vi') currentLang = saved;
  } catch {}
  // Translate static elements immediately (DOM is ready when script runs at end of body)
  if (typeof translatePage === 'function') translatePage();
})();
