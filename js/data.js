// ================================================================
//  VOID-BIT — Core Mock Data
//  All roadmaps, courses, leaderboard, and daily problem data.
// ================================================================
const VOID_DATA = {

  // ------------------------------------------------------------
  //  COURSES  (mapped from LESSONS.categories in lessons-data.js)
  // ------------------------------------------------------------
  courses: [
    { id: 'paradigms',     difficulty: 'hard',   lessons: 10, progress: 0, icon: 'cpu',          color: 'cyan' },
    { id: 'linear-ds',     difficulty: 'easy',   lessons: 4,  progress: 0, icon: 'list',         color: 'emerald' },
    { id: 'nonlinear-ds',  difficulty: 'medium', lessons: 3,  progress: 0, icon: 'share-2',      color: 'purple' },
    { id: 'advanced-ds',   difficulty: 'hard',   lessons: 7,  progress: 0, icon: 'layers',       color: 'amber' },
    { id: 'graph-algos',   difficulty: 'hard',   lessons: 8,  progress: 0, icon: 'git-branch',   color: 'purple' },
    { id: 'math',          difficulty: 'medium', lessons: 4,  progress: 0, icon: 'sigma',        color: 'rose' },
    { id: 'string',        difficulty: 'medium', lessons: 4,  progress: 0, icon: 'type',         color: 'blue' },
    { id: 'optimizations', difficulty: 'easy',   lessons: 3,  progress: 0, icon: 'zap',          color: 'cyan' }
  ],

  // ------------------------------------------------------------
  //  ROADMAPS  (4 pathways — Vietnamese CP context)
  // ------------------------------------------------------------
  roadmaps: [
    // ============================================================
    //  1. HSG TỈNH / THÀNH PHỐ
    // ============================================================
    {
      id: 'hsg-tinh',
      name: 'HSG Tỉnh / Thành Phố',
      icon: 'award',
      timeFrame: '6 - 12 tháng',
      goal: 'Đạt giải cao ở Kỳ thi Tỉnh (Nhất/Nhì), lọt vào đội tuyển đại diện Tỉnh thi Quốc gia.',
      targetRating: '1200 - 1400',
      targetLevel: 'Pupil / Specialist',
      platforms: ['LQDOJ', 'VNOI Wiki', 'Codeforces'],
      milestones: [
        {
          id: 'tinh-step1',
          title: 'Làm chủ Ngôn ngữ & STL',
          duration: '1 - 2 tháng',
          difficulty: 'easy',
          subtopics: ['C++ syntax & basic I/O', 'vector, pair, sort', 'set, map, stack, queue', 'Code gọn gàng, tối ưu', 'Làm quen với debug'],
          problems: [
            { name: 'Watermelon — CF 4A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/4/A' },
            { name: 'Theatre Square — CF 1A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1/A' }
          ]
        },
        {
          id: 'tinh-step2',
          title: 'Thuật toán nền tảng',
          duration: '2 - 3 tháng',
          difficulty: 'medium',
          subtopics: ['Đệ quy (Recursion)', 'Quay lui (Backtracking)', 'Nhánh cận (Branch & Bound)', 'Chặt nhị phân (Binary Search)', 'Hai con trỏ (Two Pointers)'],
          problems: [
            { name: 'Binary Search — CF Edu', platform: 'CF', link: 'https://codeforces.com/edu/course/2/lesson/6/1' },
            { name: 'Little Girl and Game — CF 276B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/276/B' }
          ]
        },
        {
          id: 'tinh-step3',
          title: 'Quy hoạch động cơ bản',
          duration: '3 - 5 tháng',
          difficulty: 'medium',
          subtopics: ['Bài toán cái túi (Knapsack)', 'Dãy con tăng dài nhất (LIS)', 'Xâu con chung dài nhất (LCS)', 'Fibonacci & linear recurrence', 'DP cơ bản trên mảng'],
          problems: [
            { name: 'Boredom — CF 455A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/455/A' },
            { name: 'Knapsack 1 — AtCoder', platform: 'AtCoder', link: 'https://atcoder.jp/contests/dp/tasks/dp_d' }
          ]
        },
        {
          id: 'tinh-step4',
          title: 'Đồ thị cơ bản',
          duration: '3 - 5 tháng',
          difficulty: 'medium',
          subtopics: ['Biểu diễn đồ thị (danh sách kề)', 'DFS — tìm thành phần liên thông', 'BFS — đường đi ngắn nhất', 'Kiểm tra chu trình', 'Đồ thị hai phía (bipartite)'],
          problems: [
            { name: 'Connected Components — CF', platform: 'CF', link: '#' },
            { name: 'BFS Shortest Path — CSES', platform: 'CSES', link: 'https://cses.fi/problemset/task/1193' }
          ]
        },
        {
          id: 'tinh-step5',
          title: 'Số học cơ bản',
          duration: '1 tháng',
          difficulty: 'easy',
          subtopics: ['GCD & LCM (Euclidean)', 'Sàng Eratosthenes', 'Lũy thừa nhị phân', 'Phân tích thừa số nguyên tố', 'Số nguyên tố & hợp số'],
          problems: [
            { name: 'Almost Prime — CF 26A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/26/A' },
            { name: 'Modular Exponentiation — CF', platform: 'CF', link: '#' }
          ]
        }
      ]
    },

    // ============================================================
    //  2. VOI (HSG QUỐC GIA)
    // ============================================================
    {
      id: 'hsg-quocgia',
      name: 'VOI — HSG Quốc Gia',
      icon: 'medal',
      timeFrame: '1 - 2 năm',
      goal: 'Giành giải Quốc gia (Nhất, Nhì, Ba), săn suất tuyển thẳng Đại học hoặc lọt top thi TST.',
      targetRating: '1600 - 1900',
      targetLevel: 'Expert / Expert cứng',
      platforms: ['VNOJ (VNOI)', 'Codeforces', 'CSES'],
      milestones: [
        {
          id: 'voi-step1',
          title: 'Cấu trúc dữ liệu nâng cao',
          duration: '3 - 4 tháng',
          difficulty: 'hard',
          subtopics: ['Segment Tree — cài đặt & truy vấn', 'Fenwick Tree (BIT)', 'Lazy Propagation (cập nhật đoạn)', 'DSU (Disjoint Set Union)', 'Sparse Table — RMQ'],
          problems: [
            { name: 'Range Sum Queries — CSES', platform: 'CSES', link: 'https://cses.fi/problemset/task/1646' },
            { name: 'Inversion Count — CF', platform: 'CF', link: '#' }
          ]
        },
        {
          id: 'voi-step2',
          title: 'Đồ thị chuyên sâu',
          duration: '4 - 5 tháng',
          difficulty: 'hard',
          subtopics: ['Dijkstra — đường đi ngắn nhất', 'Bellman-Ford (trọng số âm)', 'Floyd-Warshall (APSP)', 'Kruskal — MST + DSU', 'Tarjan — Khớp, cầu, SCC', 'LCA — Binary Lifting'],
          problems: [
            { name: 'Shortest Path — CSES', platform: 'CSES', link: 'https://cses.fi/problemset/task/1671' },
            { name: 'MST — CSES', platform: 'CSES', link: 'https://cses.fi/problemset/task/1675' },
            { name: 'LCA — CSES', platform: 'CSES', link: 'https://cses.fi/problemset/task/1688' }
          ]
        },
        {
          id: 'voi-step3',
          title: 'Quy hoạch động nâng cao',
          duration: '3 - 4 tháng',
          difficulty: 'hard',
          subtopics: ['Bitmask DP (TSP)', 'Tree DP (DP trên cây)', 'Digit DP (DP chữ số)', 'Convex Hull Trick', 'DP tối ưu hóa cơ bản'],
          problems: [
            { name: 'Mondriaan Dream — PKU', platform: 'VNOI', link: '#' },
            { name: 'Tree DP — CF 161D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/161/D' }
          ]
        },
        {
          id: 'voi-step4',
          title: 'Chuỗi & Toán số học',
          duration: '2 - 3 tháng',
          difficulty: 'hard',
          subtopics: ['Thuật toán KMP', 'String Hashing (băm chuỗi)', 'Phi hàm Euler', 'Modular Inverse & Fermat nhỏ', 'Tổ hợp (C(n,k) modulo)'],
          problems: [
            { name: 'KMP — CF 471D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/471/D' },
            { name: 'String Hashing — CF 271D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/271/D' }
          ]
        },
        {
          id: 'voi-step5',
          title: 'Luyện đề VOI các năm',
          duration: 'Liên tục',
          difficulty: 'hard',
          subtopics: ['Phân tích đề thi VOI 2010-2024', 'Chiến thuật làm bài 180 phút', 'Tối ưu subtask', 'Kỹ năng đọc đề & cài đặt nhanh', 'Debug dưới áp lực'],
          problems: []
        }
      ]
    },

    // ============================================================
    //  3. TST & IOI
    // ============================================================
    {
      id: 'ioi-icpc',
      name: 'TST & IOI',
      icon: 'globe',
      timeFrame: '6 tháng (sau VOI)',
      goal: 'Lọt vào top 4 người thi TST để đại diện Việt Nam ăn huy chương APIO và IOI.',
      targetRating: '2100 - 2400+',
      targetLevel: 'Master / International Master / LGM',
      platforms: ['USACO (Platinum)', 'COCI (Croatia)', 'POI (Ba Lan)', 'Codeforces'],
      milestones: [
        {
          id: 'tst-step1',
          title: 'Kỹ thuật phân rã & CTDL đỉnh cao',
          duration: '2 tháng',
          difficulty: 'hard',
          subtopics: ['Sqrt Decomposition', 'Mo\'s Algorithm (offline queries)', 'Heavy-Light Decomposition (HLD)', 'Centroid Decomposition', 'Dynamic Segment Tree', 'Persistent Data Structures'],
          problems: [
            { name: 'D-Query — SPOJ', platform: 'SPOJ', link: 'https://www.spoj.com/problems/DQUERY/' },
            { name: 'Xor Tree — CF', platform: 'CF', link: '#' }
          ]
        },
        {
          id: 'tst-step2',
          title: 'Luồng & Cặp ghép',
          duration: '1.5 tháng',
          difficulty: 'hard',
          subtopics: ['Dinic — Max Flow', 'Min Cut = Max Flow', 'Bipartite Matching (Kuhn)', 'Assignment Problem (Hungarian)', 'Applications in CP'],
          problems: [
            { name: 'Max Flow — SPOJ FASTFLOW', platform: 'SPOJ', link: 'https://www.spoj.com/problems/FASTFLOW/' },
            { name: 'Matching — CF', platform: 'CF', link: '#' }
          ]
        },
        {
          id: 'tst-step3',
          title: 'Hình học & Toán cao cấp',
          duration: '1.5 tháng',
          difficulty: 'hard',
          subtopics: ['Tích có hướng (Cross Product)', 'Convex Hull (Monotone Chain)', 'FFT — nhân đa thức', 'NTT (Number Theoretic Transform)', 'Generating Functions'],
          problems: [
            { name: 'Convex Hull — CF', platform: 'CF', link: '#' },
            { name: 'FFT — CF 993E', platform: 'CF', link: '#' }
          ]
        },
        {
          id: 'tst-step4',
          title: 'Chiến thuật thi Quốc tế',
          duration: '1 tháng',
          difficulty: 'hard',
          subtopics: ['Interactive Problems', 'Subtask-aware solutions', 'Partial scoring strategies', 'Code nhanh — ít bug', 'Đọc đề & phân tích bằng tiếng Anh'],
          problems: []
        }
      ]
    },

    // ============================================================
    //  4. ICPC (ĐẤU TRƯỜNG SINH VIÊN)
    // ============================================================
    {
      id: 'icpc',
      name: 'ICPC — Đại học',
      icon: 'graduation-cap',
      timeFrame: '3 - 4 năm Đại học',
      goal: 'Vô địch ICPC National, giành giải ICPC Regional để lấy vé đi World Finals.',
      targetRating: '2200 - 2600+',
      targetLevel: 'Master / International Master',
      platforms: ['Kattis', 'Codeforces Gym', 'AtCoder (AGC)'],
      milestones: [
        {
          id: 'icpc-step1',
          title: 'Thành lập Team & Phân vai',
          duration: 'Tháng đầu',
          difficulty: 'medium',
          subtopics: ['Tìm 2 đồng đội hợp rơ', 'Phân vai: Toán/Hình — Đồ thị/DP — Coder chính', 'Phối hợp 3 người 1 máy tính', 'Chiến thuật đọc đề phân tán', 'Xây dựng thư viện code mẫu'],
          problems: []
        },
        {
          id: 'icpc-step2',
          title: 'Xây dựng Codebook (Notebook)',
          duration: 'Liên tục',
          difficulty: 'hard',
          subtopics: ['Tổng hợp template SegTree, BIT, DSU', 'Template Tarjan, HLD, LCA', 'Template Dinic, Matching', 'Template FFT, Geometry', 'Thu gọn trong 25 trang giấy (luật ICPC)'],
          problems: []
        },
        {
          id: 'icpc-step3',
          title: 'Cày dạng bài ICPC đặc thù',
          duration: '1 - 2 năm',
          difficulty: 'hard',
          subtopics: ['Constructive Algorithms (tự dựng đáp án)', 'Game Theory (lý thuyết trò chơi)', 'Bài đếm tổ hợp nặng', 'Math & Number Theory nâng cao', 'Implementation problems'],
          problems: [
            { name: 'AGC — AtCoder', platform: 'AtCoder', link: 'https://atcoder.jp/contests/agc' },
            { name: 'ICPC Gym — CF', platform: 'CF', link: 'https://codeforces.com/gyms' }
          ]
        },
        {
          id: 'icpc-step4',
          title: 'Luyện đề mô phỏng áp lực cao',
          duration: 'Liên tục',
          difficulty: 'hard',
          subtopics: ['Thi ICPC Online miền Bắc/Trung/Nam', 'Mock contest 5 tiếng cuối tuần', 'Giải đề ICPC Regional cũ trên Kattis', 'Debug trên giấy khi máy bận', 'Phân tích sai lầm sau mỗi contest'],
          problems: [
            { name: 'Kattis — ICPC', platform: 'Kattis', link: 'https://open.kattis.com/' }
          ]
        }
      ]
    }
  ],

  // ------------------------------------------------------------
  //  LEADERBOARD  (fallback if Supabase query fails)
  // ------------------------------------------------------------
  leaderboard: [
    { name: 'void_admin',  score: 3200 },
    { name: 'cp_master',   score: 2850 },
    { name: 'algowizard',  score: 2540 },
    { name: 'dp_king',     score: 2310 },
    { name: 'graph_hacker',score: 2100 },
    { name: 'math_whiz',   score: 1920 },
    { name: 'str_ninja',   score: 1750 },
    { name: 'bit_bender',  score: 1580 }
  ],

  // ------------------------------------------------------------
  //  PROBLEM OF THE DAY
  // ------------------------------------------------------------
  problemOfDay: {
    name: 'Vus the Cossack and Strings',
    platform: 'Codeforces',
    difficulty: 'easy',
    link: 'https://codeforces.com/problemset/problem/1186/C',
    rating: 1500
  }
};
