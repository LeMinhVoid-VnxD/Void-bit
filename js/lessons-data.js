// ================================================================
//  VOID-BIT — Complete Lesson Library (All CP Topics)
//  Each lesson: explanation, key functions, sample code, problems.
// ================================================================

const LESSONS = {
  categories: [
    // ============================================================
    //  1. THUẬT TOÁN CƠ BẢN (PARADIGMS)
    // ============================================================
    {
      id: 'paradigms',
      name: 'Kĩ thuật thiết kế giải thuật',
      icon: 'cpu',
      color: 'cyan',
      lessons: [
        {
          id: 'binary-search',
          title: 'Tìm kiếm nhị phân (Binary Search)',
          difficulty: 'easy',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Tìm kiếm nhị phân là thuật toán chia để trị hoạt động trên mảng đã được sắp xếp. Ý tưởng: so sánh giá trị cần tìm với phần tử ở giữa mảng, nếu nhỏ hơn thì tìm ở nửa trái, lớn hơn thì tìm ở nửa phải. Độ phức tạp O(log n).</p>
  <p><strong>Binary Search on Answer:</strong> Áp dụng cho bài toán tìm giá trị X thỏa mãn điều kiện nào đó, biết rằng nếu X thỏa mãn thì mọi giá trị lớn hơn (hoặc nhỏ hơn) cũng thỏa mãn (tính đơn điệu).</p>
</div>
<div class="lesson-section">
  <h4>Các hàm quan trọng (C++ STL)</h4>
  <ul>
    <li><code>binary_search(first, last, value)</code> — trả về true nếu value có trong mảng</li>
    <li><code>lower_bound(first, last, value)</code> — iterator tới phần tử đầu tiên &gt;= value</li>
    <li><code>upper_bound(first, last, value)</code> — iterator tới phần tử đầu tiên &gt; value</li>
    <li><code>equal_range(first, last, value)</code> — cặp lower_bound và upper_bound</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">int binarySearch(vector&lt;int&gt;& a, int x) {
    int l = 0, r = (int)a.size() - 1;
    while (l &lt;= r) {
        int m = l + (r - l) / 2;
        if (a[m] == x) return m;
        else if (a[m] &lt; x) l = m + 1;
        else r = m - 1;
    }
    return -1; // không tìm thấy
}

// Binary Search on Answer
bool check(int mid) { /* kiểm tra điều kiện */ }
int bsOnAnswer() {
    int l = 0, r = 1e9, ans = -1;
    while (l &lt;= r) {
        int m = (l + r) / 2;
        if (check(m)) { ans = m; l = m + 1; }
        else r = m - 1;
    }
    return ans;
}</pre>
</div>`,
          problems: [
            { name: 'Binary Search — Codeforces', platform: 'CF', link: 'https://codeforces.com/edu/course/2/lesson/6/1', difficulty: 'easy' },
            { name: 'Aggressive Cows — SPOJ', platform: 'SPOJ', link: 'https://www.spoj.com/problems/AGGRCOW/', difficulty: 'medium' }
          ]
        },
        {
          id: 'two-pointers',
          title: 'Two Pointers & Sliding Window',
          difficulty: 'easy',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Two Pointers:</strong> Dùng hai chỉ số (con trỏ) để duyệt mảng, mỗi con trỏ đại diện cho một vị trí. Thường dùng để tìm cặp phần tử thỏa mãn điều kiện, giảm O(n²) xuống O(n).</p>
  <p><strong>Sliding Window:</strong> Duy trì một cửa sổ (đoạn) liên tiếp trên mảng. Khi cửa sổ trượt, ta cập nhật kết quả dựa trên phần tử vào và ra khỏi cửa sổ.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Two Sum (mảng đã sắp xếp)</h4>
  <pre class="code-sample">vector&lt;int&gt; twoSum(vector&lt;int&gt;& a, int target) {
    int l = 0, r = a.size() - 1;
    while (l &lt; r) {
        int sum = a[l] + a[r];
        if (sum == target) return {l, r};
        else if (sum &lt; target) l++;
        else r--;
    }
    return {};
}

// Sliding Window — tổng đoạn con dài nhất &lt;= K
int slidingWindow(vector&lt;int&gt;& a, int K) {
    int l = 0, sum = 0, ans = 0;
    for (int r = 0; r &lt; a.size(); r++) {
        sum += a[r];
        while (sum &gt; K) sum -= a[l++];
        ans = max(ans, r - l + 1);
    }
    return ans;
}</pre>
</div>`,
          problems: [
            { name: 'Two Sum — LeetCode', platform: 'LeetCode', link: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', difficulty: 'easy' },
            { name: 'Subarray with given sum', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/A', difficulty: 'medium' }
          ]
        },
        {
          id: 'dp-intro',
          title: 'Quy hoạch động (DP) — Tổng quan',
          difficulty: 'medium',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Quy hoạch động (Dynamic Programming) là kĩ thuật chia bài toán lớn thành các bài toán con chồng lấp, lưu kết quả để tái sử dụng. Điều kiện áp dụng: <strong>Cấu trúc con tối ưu</strong> (lời giải bài toán con nằm trong lời giải bài toán lớn) và <strong>Bài toán con chồng lấp</strong> (cùng bài toán con được dùng nhiều lần).</p>
  <p><strong>Các bước giải:</strong> (1) Xác định trạng thái (state), (2) Xây dựng công thức truy hồi, (3) Xác định điều kiện cơ sở (base case), (4) Tính toán theo thứ tự phù hợp.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Fibonacci (DP cơ bản)</h4>
  <pre class="code-sample">// Bottom-up
int fib(int n) {
    vector&lt;int&gt; dp(n + 1);
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i &lt;= n; i++)
        dp[i] = dp[i-1] + dp[i-2]; // O(n)
    return dp[n];
}

// 0/1 Knapsack
int knapsack(vector&lt;int&gt;& w, vector&lt;int&gt;& v, int W) {
    int n = w.size();
    vector&lt;vector&lt;int&gt;&gt; dp(n+1, vector&lt;int&gt;(W+1, 0));
    for (int i = 1; i &lt;= n; i++)
        for (int j = 0; j &lt;= W; j++)
            if (w[i-1] &lt;= j)
                dp[i][j] = max(dp[i-1][j], dp[i-1][j - w[i-1]] + v[i-1]);
            else dp[i][j] = dp[i-1][j];
    return dp[n][W]; // O(n*W)
}</pre>
</div>`,
          problems: [
            { name: 'Boredom — CF 455A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/455/A', difficulty: 'easy' },
            { name: 'Knapsack 1 — AtCoder', platform: 'AtCoder', link: 'https://atcoder.jp/contests/dp/tasks/dp_d', difficulty: 'medium' }
          ]
        },
        {
          id: 'bitmask-dp',
          title: 'DP trạng thái (Bitmask DP)',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Bitmask DP dùng một số nguyên (bitmask) để biểu diễn trạng thái của tập hợp (mỗi bit = 1 nếu phần tử đã được chọn). Thường dùng cho bài toán có N ≤ 20, như TSP (Người du lịch) hoặc bài toán phân công.</p>
  <p>DP[mask][i] = chi phí nhỏ nhất khi đã thăm tập mask và đang ở đỉnh i.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — TSP (Held-Karp)</h4>
  <pre class="code-sample">int tsp(vector&lt;vector&lt;int&gt;&gt;& dist) {
    int n = dist.size();
    vector&lt;vector&lt;int&gt;&gt; dp(1&lt;&lt;n, vector&lt;int&gt;(n, 1e9));
    dp[1][0] = 0; // bắt đầu từ đỉnh 0
    for (int mask = 1; mask &lt; (1&lt;&lt;n); mask++) {
        for (int u = 0; u &lt; n; u++) {
            if (!(mask &gt;&gt; u &amp; 1)) continue;
            for (int v = 0; v &lt; n; v++) {
                if (mask &gt;&gt; v &amp; 1) continue;
                int next = mask | (1 &lt;&lt; v);
                dp[next][v] = min(dp[next][v], dp[mask][u] + dist[u][v]);
            }
        }
    }
    int ans = 1e9;
    for (int i = 1; i &lt; n; i++)
        ans = min(ans, dp[(1&lt;&lt;n)-1][i] + dist[i][0]);
    return ans; // O(n²·2ⁿ)
}</pre>
</div>`,
          problems: [
            { name: 'Mondriaan Dream — PKU', platform: 'VNOI', link: '#', difficulty: 'hard' },
            { name: 'Traveling Salesman — SPOJ', platform: 'SPOJ', link: '#', difficulty: 'hard' }
          ]
        },
        {
          id: 'digit-dp',
          title: 'DP chữ số (Digit DP)',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Digit DP dùng để đếm số lượng số trong một đoạn [L, R] thỏa mãn tính chất nào đó (liên quan đến các chữ số). Kĩ thuật: duyệt từng chữ số, lưu trạng thái tight (có bị ràng buộc bởi cận trên không).</p>
  <p>State thường gồm: vị trí chữ số đang xét, tight flag, leading-zero flag, và các thông tin đặc thù (tổng chữ số, chữ số trước đó,...).</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Đếm số có tổng chữ số chia hết cho K</h4>
  <pre class="code-sample">string s;
int K;
long long dp[20][2][100];

long long solve(int pos, bool tight, int sum) {
    if (pos == s.size()) return (sum % K == 0);
    if (dp[pos][tight][sum] != -1) return dp[pos][tight][sum];
    int lim = tight ? (s[pos] - '0') : 9;
    long long ans = 0;
    for (int d = 0; d &lt;= lim; d++)
        ans += solve(pos+1, tight &amp;&amp; d == lim, (sum + d) % K);
    return dp[pos][tight][sum] = ans;
}

long long count(long long n) {
    s = to_string(n);
    memset(dp, -1, sizeof(dp));
    return solve(0, true, 0);
}
// Kết quả = count(R) - count(L-1)</pre>
</div>`,
          problems: [
            { name: 'Digit DP — CF 1036C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1036/C', difficulty: 'hard' }
          ]
        },
        {
          id: 'tree-dp',
          title: 'DP cây (Tree DP)',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Tree DP là DP trên cấu trúc cây. Thường dùng DFS để tính DP từ lá lên gốc (post-order). Mỗi nút lưu kết quả dựa trên các nút con. Kĩ thuật <strong>rerooting DP</strong> cho phép tính DP cho mọi nút làm gốc trong O(n).</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Đường kính của cây</h4>
  <pre class="code-sample">vector&lt;int&gt; adj[100005];
int dp[100005], ans;

void dfs(int u, int p) {
    int max1 = 0, max2 = 0;
    for (int v : adj[u]) {
        if (v == p) continue;
        dfs(v, u);
        int len = dp[v] + 1;
        if (len &gt; max1) { max2 = max1; max1 = len; }
        else if (len &gt; max2) max2 = len;
    }
    ans = max(ans, max1 + max2);
    dp[u] = max1;
}

// ans là đường kính của cây
// Gọi dfs(root, 0)</pre>
</div>`,
          problems: [
            { name: 'Tree Diameter — CSES', platform: 'CSES', link: 'https://cses.fi/problemset/task/1131', difficulty: 'medium' },
            { name: 'Tree DP — CF 161D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/161/D', difficulty: 'hard' }
          ]
        },
        {
          id: 'convex-hull-trick',
          title: 'DP bao lồi (Convex Hull Trick)',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>CHT dùng để tối ưu công thức DP dạng: dp[i] = min/max(dp[j] + a[i]*b[j] + c[j]) với i &gt; j. Khi các đường thẳng có hệ số góc đơn điệu, ta dùng deque để duy trì bao lồi trong O(n). Nếu không đơn điệu, dùng Li Chao Tree.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — CHT (hệ số góc tăng dần)</h4>
  <pre class="code-sample">struct Line {
    long long a, b; // y = a*x + b
    long long get(long long x) { return a * x + b; }
};

double intersect(Line l1, Line l2) {
    return (double)(l2.b - l1.b) / (l1.a - l2.a);
}

vector&lt;Line&gt; lines;
int ptr = 0; // con trỏ tối ưu

void add(Line l) {
    while (lines.size() &gt;= 2) {
        int n = lines.size();
        if (intersect(lines[n-2], lines[n-1]) &gt;= intersect(lines[n-1], l))
            lines.pop_back();
        else break;
    }
    lines.push_back(l);
}

long long query(long long x) {
    while (ptr + 1 &lt; lines.size()
           &amp;&amp; lines[ptr].get(x) &gt;= lines[ptr+1].get(x)) ptr++;
    return lines[ptr].get(x);
}</pre>
</div>`,
          problems: [
            { name: 'CHT — CF 319C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/319/C', difficulty: 'hard' }
          ]
        },
        {
          id: 'greedy',
          title: 'Tham lam (Greedy)',
          difficulty: 'easy',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Thuật toán tham lam đưa ra lựa chọn tối ưu tại mỗi bước với hy vọng đạt được kết quả tối ưu toàn cục. Không phải bài toán nào cũng giải được bằng tham lam — cần chứng minh tính đúng đắn bằng phản chứng hoặc bất biến.</p>
  <p><strong>Ví dụ kinh điển:</strong> Bài toán đổi tiền (ATM), lập lịch công việc (Scheduling), Huffman Coding, Prim/Kruskal (MST), Dijkstra.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Lập lịch công việc</h4>
  <pre class="code-sample">struct Job { int start, end; };
bool cmp(Job a, Job b) { return a.end &lt; b.end; }

int maxJobs(vector&lt;Job&gt; jobs) {
    sort(jobs.begin(), jobs.end(), cmp);
    int cnt = 0, last = 0;
    for (auto&amp; j : jobs) {
        if (j.start &gt;= last) {
            cnt++;
            last = j.end;
        }
    }
    return cnt; // O(n log n)
}</pre>
</div>`,
          problems: [
            { name: 'Activity Selection', platform: 'CF', link: '#', difficulty: 'easy' },
            { name: 'Little Girl and Game — CF 276B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/276/B', difficulty: 'easy' }
          ]
        },
        {
          id: 'divide-conquer',
          title: 'Chia để trị (Divide and Conquer)',
          difficulty: 'medium',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Chia bài toán thành các bài toán con nhỏ hơn, giải quyết từng bài con một cách độc lập, sau đó kết hợp kết quả. Ba bước: <strong>Divide</strong> (chia), <strong>Conquer</strong> (trị), <strong>Combine</strong> (kết hợp).</p>
  <p>Ví dụ: Merge Sort, Quick Sort, Binary Search, Strassen nhân ma trận, Karatsuba.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Merge Sort</h4>
  <pre class="code-sample">void merge(vector&lt;int&gt;& a, int l, int m, int r) {
    vector&lt;int&gt; L(a.begin()+l, a.begin()+m+1);
    vector&lt;int&gt; R(a.begin()+m+1, a.begin()+r+1);
    int i = 0, j = 0, k = l;
    while (i &lt; L.size() &amp;&amp; j &lt; R.size())
        a[k++] = (L[i] &lt;= R[j]) ? L[i++] : R[j++];
    while (i &lt; L.size()) a[k++] = L[i++];
    while (j &lt; R.size()) a[k++] = R[j++];
}

void mergeSort(vector&lt;int&gt;& a, int l, int r) {
    if (l &gt;= r) return;
    int m = (l + r) / 2;
    mergeSort(a, l, m);
    mergeSort(a, m+1, r);
    merge(a, l, m, r);
} // O(n log n)</pre>
</div>`,
          problems: [
            { name: 'Inversion Count', platform: 'CF', link: '#', difficulty: 'medium' }
          ]
        },
        {
          id: 'meet-in-middle',
          title: 'Meet in the Middle',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Kĩ thuật chia đôi tập dữ liệu thành 2 nửa, tính toán kết quả từng nửa riêng biệt, rồi kết hợp. Giảm độ phức tạp từ O(2ⁿ) xuống O(2^(n/2)).</p>
  <p>Thường dùng cho bài toán tìm tập con có tổng bằng K, hoặc Subset Sum khi N &gt; 30.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Subset Sum (N=40)</h4>
  <pre class="code-sample">vector&lt;long long&gt; gen(vector&lt;int&gt;& a, int l, int r) {
    vector&lt;long long&gt; res;
    int len = r - l + 1;
    for (int mask = 0; mask &lt; (1&lt;&lt;len); mask++) {
        long long sum = 0;
        for (int i = 0; i &lt; len; i++)
            if (mask &gt;&gt; i &amp; 1) sum += a[l + i];
        res.push_back(sum);
    }
    return res;
}

bool subsetSum(vector&lt;int&gt;& a, long long target) {
    int n = a.size();
    vector&lt;long long&gt; L = gen(a, 0, n/2-1);
    vector&lt;long long&gt; R = gen(a, n/2, n-1);
    sort(R.begin(), R.end());
    for (long long x : L)
        if (binary_search(R.begin(), R.end(), target - x))
            return true;
    return false;
} // O(2^(n/2) * log(2^(n/2)))</pre>
</div>`,
          problems: [
            { name: 'Meet in the Middle — CF 888E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/888/E', difficulty: 'hard' }
          ]
        }
      ]
    },

    // ============================================================
    //  2. CẤU TRÚC DỮ LIỆU TUYẾN TÍNH
    // ============================================================
    {
      id: 'linear-ds',
      name: 'Cấu trúc dữ liệu Tuyến tính',
      icon: 'layers',
      color: 'emerald',
      lessons: [
        {
          id: 'array-vector',
          title: 'Array & Vector (Mảng tĩnh và động)',
          difficulty: 'easy',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Array (mảng tĩnh):</strong> Các phần tử nằm ở ô nhớ liên tiếp. Kích thước cố định, truy cập O(1), thêm/xóa cuối O(1) nếu còn chỗ.</p>
  <p><strong>Vector (mảng động):</strong> Tự động co giãn kích thước. Khi đầy, vùng nhớ cũ được giải phóng và cấp phát vùng mới gấp đôi (amortized O(1)).</p>
</div>
<div class="lesson-section">
  <h4>Các hàm chính (C++ vector)</h4>
  <ul>
    <li><code>push_back(x)</code> — thêm x vào cuối</li>
    <li><code>pop_back()</code> — xóa phần tử cuối</li>
    <li><code>insert(pos, x)</code> — chèn x tại vị trí pos</li>
    <li><code>erase(pos)</code> — xóa phần tử tại pos</li>
    <li><code>size()</code>, <code>resize(n)</code>, <code>clear()</code></li>
    <li><code>begin()</code>, <code>end()</code> — iterator</li>
  </ul>
</div>`,
          problems: [
            { name: 'Vector Erase — HackerRank', platform: 'HackerRank', link: '#', difficulty: 'easy' }
          ]
        },
        {
          id: 'linked-list',
          title: 'Linked List (Danh sách liên kết)',
          difficulty: 'medium',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Danh sách liên kết gồm các Node, mỗi Node chứa dữ liệu và con trỏ tới Node tiếp theo (và Node trước đó nếu là doubly linked list).</p>
  <p>Thêm/xóa ở đầu O(1), nhưng truy cập phần tử thứ i phải duyệt từ đầu O(n).</p>
</div>
<div class="lesson-section">
  <h4>C++ STL: list, forward_list</h4>
  <ul>
    <li><code>push_front(x)</code>, <code>push_back(x)</code></li>
    <li><code>pop_front()</code>, <code>pop_back()</code></li>
    <li><code>insert(pos, x)</code> — O(1) sau khi có iterator</li>
    <li><code>splice(pos, list2)</code> — nối hai list</li>
  </ul>
</div>`,
          problems: [
            { name: 'Reverse Linked List', platform: 'LeetCode', link: 'https://leetcode.com/problems/reverse-linked-list/', difficulty: 'medium' }
          ]
        },
        {
          id: 'stack',
          title: 'Stack (Ngăn xếp)',
          difficulty: 'easy',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Stack hoạt động theo cơ chế LIFO (Last In, First Out). Giống như chồng đĩa — đĩa nào đặt vào cuối cùng sẽ lấy ra trước.</p>
  <p><strong>Ứng dụng:</strong> Kiểm tra dấu ngoặc, chuyển đổi biểu thức (trung tố sang hậu tố), DFS, Undo/Redo.</p>
</div>
<div class="lesson-section">
  <h4>Các hàm chính</h4>
  <ul>
    <li><code>push(x)</code> — đưa phần tử lên đỉnh</li>
    <li><code>pop()</code> — xóa phần tử đỉnh</li>
    <li><code>top()</code> — lấy giá trị phần tử đỉnh</li>
    <li><code>empty()</code>, <code>size()</code></li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Kiểm tra dấu ngoặc</h4>
  <pre class="code-sample">bool isValid(string s) {
    stack&lt;char&gt; st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            if (c == ')' &amp;&amp; st.top() != '(') return false;
            if (c == '}' &amp;&amp; st.top() != '{') return false;
            if (c == ']' &amp;&amp; st.top() != '[') return false;
            st.pop();
        }
    }
    return st.empty();
}</pre>
</div>`,
          problems: [
            { name: 'Valid Parentheses — LeetCode', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-parentheses/', difficulty: 'easy' }
          ]
        },
        {
          id: 'queue-deque',
          title: 'Queue & Deque (Hàng đợi)',
          difficulty: 'easy',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Queue:</strong> FIFO (First In, First Out). Giống xếp hàng mua vé — ai đến trước được phục vụ trước. Dùng trong BFS, lập lịch.</p>
  <p><strong>Deque:</strong> Double-ended queue — thêm/xóa ở cả 2 đầu trong O(1). Dùng trong Sliding Window maximum.</p>
</div>
<div class="lesson-section">
  <h4>Các hàm chính</h4>
  <ul>
    <li>Queue: <code>push(x)</code>, <code>pop()</code>, <code>front()</code>, <code>back()</code></li>
    <li>Deque: <code>push_front(x)</code>, <code>push_back(x)</code>, <code>pop_front()</code>, <code>pop_back()</code>, <code>front()</code>, <code>back()</code></li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Sliding Window Maximum</h4>
  <pre class="code-sample">vector&lt;int&gt; maxSlidingWindow(vector&lt;int&gt;& a, int k) {
    deque&lt;int&gt; dq; // lưu index
    vector&lt;int&gt; res;
    for (int i = 0; i &lt; a.size(); i++) {
        while (!dq.empty() &amp;&amp; dq.front() &lt;= i - k)
            dq.pop_front(); // loại phần tử ngoài cửa sổ
        while (!dq.empty() &amp;&amp; a[dq.back()] &lt;= a[i])
            dq.pop_back(); // giữ deque giảm dần
        dq.push_back(i);
        if (i &gt;= k - 1) res.push_back(a[dq.front()]);
    }
    return res; // O(n)
}</pre>
</div>`,
          problems: [
            { name: 'Sliding Window Maximum — LeetCode', platform: 'LeetCode', link: 'https://leetcode.com/problems/sliding-window-maximum/', difficulty: 'hard' }
          ]
        }
      ]
    },

    // ============================================================
    //  3. CẤU TRÚC DỮ LIỆU PHI TUYẾN TÍNH
    // ============================================================
    {
      id: 'nonlinear-ds',
      name: 'Cấu trúc dữ liệu Phi tuyến tính',
      icon: 'git-branch',
      color: 'purple',
      lessons: [
        {
          id: 'tree-bst',
          title: 'Cây & Cây tìm kiếm nhị phân (BST)',
          difficulty: 'medium',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Cây (Tree):</strong> Cấu trúc phân cấp gồm gốc (root), nhánh (branch) và lá (leaf). Mỗi nút có một nút cha và nhiều nút con. Cây nhị phân: mỗi nút có tối đa 2 con.</p>
  <p><strong>BST:</strong> Cây nhị phân thỏa mãn: giá trị nút trái &lt; giá trị nút gốc &lt; giá trị nút phải. Tìm kiếm, thêm, xóa O(h) với h là chiều cao cây (lý tưởng O(log n), tệ nhất O(n)).</p>
</div>
<div class="lesson-section">
  <h4>Các thao tác cơ bản</h4>
  <ul>
    <li><code>insert(root, x)</code> — thêm x vào BST</li>
    <li><code>search(root, x)</code> — tìm x trong BST</li>
    <li><code>erase(root, x)</code> — xóa x khỏi BST</li>
    <li>Duyệt cây: Pre-order, In-order, Post-order, Level-order</li>
  </ul>
</div>`,
          problems: [
            { name: 'Binary Tree Inorder Traversal', platform: 'LeetCode', link: '#', difficulty: 'easy' }
          ]
        },
        {
          id: 'graph-intro',
          title: 'Đồ thị (Graph)',
          difficulty: 'medium',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Đồ thị gồm tập đỉnh (V) và tập cạnh (E). Biểu diễn: ma trận kề (O(V²) bộ nhớ), danh sách kề (O(V+E)).</p>
  <p><strong>Phân loại:</strong> Vô hướng / Có hướng, có trọng số / không trọng số, đầy đủ / thưa, DAG (có hướng không chu trình).</p>
</div>
<div class="lesson-section">
  <h4>Các khái niệm cơ bản</h4>
  <ul>
    <li>Bậc (degree) của đỉnh</li>
    <li>Đường đi (path), chu trình (cycle)</li>
    <li>Thành phần liên thông (connected component)</li>
    <li>Cây khung (spanning tree)</li>
    <li>Đồ thị hai phía (bipartite graph)</li>
  </ul>
</div>`,
          problems: [
            { name: 'Graph Representation — CF', platform: 'CF', link: '#', difficulty: 'easy' }
          ]
        },
        {
          id: 'hash-table',
          title: 'Hash Table (Bảng băm)',
          difficulty: 'medium',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Hash table lưu cặp key-value. Dùng hàm băm biến key thành index trong mảng. Trung bình O(1) cho insert, find, delete.</p>
  <p>C++ STL: <code>unordered_map</code> (hash table), <code>unordered_set</code> (hash set). Lưu ý: trong CP, có thể bị tấn công hash (nên dùng thêm seed ngẫu nhiên hoặc dùng map nếu cần an toàn).</p>
</div>
<div class="lesson-section">
  <h4>Các hàm chính</h4>
  <ul>
    <li><code>umap[key] = value</code> — thêm/cập nhật</li>
    <li><code>umap.find(key)</code> — iterator tới key (hoặc end)</li>
    <li><code>umap.count(key)</code> — 0 hoặc 1</li>
    <li><code>umap.erase(key)</code> — xóa phần tử</li>
  </ul>
</div>`,
          problems: [
            { name: 'Two Sum — LeetCode (dùng map)', platform: 'LeetCode', link: 'https://leetcode.com/problems/two-sum/', difficulty: 'easy' }
          ]
        }
      ]
    },

    // ============================================================
    //  4. CẤU TRÚC DỮ LIỆU NÂNG CAO
    // ============================================================
    {
      id: 'advanced-ds',
      name: 'Cấu trúc dữ liệu Nâng cao',
      icon: 'layers',
      color: 'cyan',
      lessons: [
        {
          id: 'dsu',
          title: 'Disjoint Set Union (DSU)',
          difficulty: 'medium',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>DSU quản lý các tập hợp rời nhau, hỗ trợ hai thao tác: <strong>Find(u)</strong> (tìm đại diện của tập chứa u) và <strong>Union(u, v)</strong> (hợp nhất hai tập chứa u và v).</p>
  <p><strong>Kĩ thuật tối ưu:</strong> Path compression (nén đường) + Union by size/rank. Độ phức tạp gần như O(α(n)) — hằng số Ackermann.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">struct DSU {
    vector&lt;int&gt; par, sz;
    DSU(int n) {
        par.resize(n+1); sz.resize(n+1, 1);
        for (int i = 1; i &lt;= n; i++) par[i] = i;
    }
    int find(int u) {
        if (par[u] != u) par[u] = find(par[u]); // nén đường
        return par[u];
    }
    bool unite(int u, int v) {
        u = find(u); v = find(v);
        if (u == v) return false;
        if (sz[u] &lt; sz[v]) swap(u, v);
        par[v] = u;
        sz[u] += sz[v];
        return true;
    }
};</pre>
</div>`,
          problems: [
            { name: 'DSU — CF 217A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/217/A', difficulty: 'medium' },
            { name: 'MST Kruskal — DSU ứng dụng', platform: 'CF', link: '#', difficulty: 'medium' }
          ]
        },
        {
          id: 'segment-tree',
          title: 'Segment Tree (Cây phân đoạn)',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Segment Tree là cấu trúc dạng cây lưu thông tin (tổng, max, min, gcd,...) của mỗi đoạn [l, r].</p>
  <p><strong>Thao tác:</strong> Build O(n), Query O(log n), Update O(log n). Lazy Propagation giúp cập nhật cả đoạn trong O(log n).</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Segment Tree (tổng đoạn)</h4>
  <pre class="code-sample">struct SegTree {
    int n;
    vector&lt;long long&gt; t;
    SegTree(int _n) { n = _n; t.resize(4*n); }

    void build(vector&lt;int&gt;& a, int v, int l, int r) {
        if (l == r) { t[v] = a[l]; return; }
        int m = (l + r) / 2;
        build(a, v*2, l, m);
        build(a, v*2+1, m+1, r);
        t[v] = t[v*2] + t[v*2+1];
    }

    long long query(int v, int l, int r, int ql, int qr) {
        if (ql &gt; r || qr &lt; l) return 0;
        if (ql &lt;= l &amp;&amp; r &lt;= qr) return t[v];
        int m = (l + r) / 2;
        return query(v*2, l, m, ql, qr)
             + query(v*2+1, m+1, r, ql, qr);
    }

    void update(int v, int l, int r, int pos, int val) {
        if (l == r) { t[v] = val; return; }
        int m = (l + r) / 2;
        if (pos &lt;= m) update(v*2, l, m, pos, val);
        else update(v*2+1, m+1, r, pos, val);
        t[v] = t[v*2] + t[v*2+1];
    }
};</pre>
</div>`,
          problems: [
            { name: 'Range Sum Queries — CSES', platform: 'CSES', link: 'https://cses.fi/problemset/task/1646', difficulty: 'medium' },
            { name: 'XOR Segment — VNOI', platform: 'VNOI', link: '#', difficulty: 'hard' }
          ]
        },
        {
          id: 'fenwick',
          title: 'Fenwick Tree (Binary Indexed Tree)',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Fenwick Tree (BIT) là cấu trúc mảng đặc biệt dùng để tính tổng tiền tố (prefix sum) và cập nhật điểm trong O(log n). Cài đặt ngắn gọn, chỉ tốn O(n) bộ nhớ.</p>
  <p><strong>Ý tưởng:</strong> Mỗi phần tử i lưu tổng của đoạn [i - lowbit(i) + 1, i] với lowbit(i) = i &amp; (-i).</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">struct BIT {
    int n;
    vector&lt;long long&gt; bit;
    BIT(int _n) : n(_n), bit(_n+1, 0) {}

    void add(int idx, long long val) {
        for (; idx &lt;= n; idx += idx &amp; -idx)
            bit[idx] += val;
    }

    long long sum(int idx) {
        long long res = 0;
        for (; idx &gt; 0; idx -= idx &amp; -idx)
            res += bit[idx];
        return res;
    }

    long long rangeSum(int l, int r) {
        return sum(r) - sum(l-1);
    }
};</pre>
</div>`,
          problems: [
            { name: 'Inversion Count (BIT)', platform: 'CF', link: '#', difficulty: 'medium' },
            { name: 'Range Sum Queries II — CSES', platform: 'CSES', link: 'https://cses.fi/problemset/task/1648', difficulty: 'medium' }
          ]
        },
        {
          id: 'sparse-table',
          title: 'Sparse Table',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Sparse Table dùng để truy vấn RMQ (min/max/gcd trên đoạn) trong O(1) sau khi tiền xử lý O(n log n). Chỉ áp dụng cho mảng tĩnh (không cập nhật).</p>
  <p><strong>Ý tưởng:</strong> st[i][k] lưu kết quả của đoạn [i, i + 2ᵏ - 1].</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — RMQ</h4>
  <pre class="code-sample">struct SparseTable {
    int n, K;
    vector&lt;vector&lt;int&gt;&gt; st;
    SparseTable(vector&lt;int&gt;& a) {
        n = a.size();
        K = log2(n) + 1;
        st.assign(n, vector&lt;int&gt;(K));
        for (int i = 0; i &lt; n; i++) st[i][0] = a[i];
        for (int j = 1; j &lt; K; j++)
            for (int i = 0; i + (1&lt;&lt;j) &lt;= n; i++)
                st[i][j] = min(st[i][j-1], st[i + (1&lt;&lt;(j-1))][j-1]);
    }
    int query(int l, int r) {
        int j = log2(r - l + 1);
        return min(st[l][j], st[r - (1&lt;&lt;j) + 1][j]);
    }
};</pre>
</div>`,
          problems: [
            { name: 'RMQ — CF 6E', platform: 'CF', link: '#', difficulty: 'medium' }
          ]
        },
        {
          id: 'sqrt-decomp',
          title: 'Sqrt Decomposition & Mo\'s Algorithm',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Sqrt Decomposition:</strong> Chia mảng thành các block kích thước √n. Mỗi block lưu thông tin tổng hợp. Query O(√n), Update O(1).</p>
  <p><strong>Mo\'s Algorithm:</strong> Xử lý truy vấn đoạn offline bằng cách sắp xếp theo block của L, sau đó theo R. Duy trì 2 con trỏ l, r, di chuyển dần. Độ phức tạp O((n+q)√n).</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Mo\'s Algorithm</h4>
  <pre class="code-sample">struct Query { int l, r, idx; };
int BLOCK = sqrt(100005);
int freq[100005], curAns = 0;

void add(int pos) {
    if (freq[pos] == 0) curAns++;
    freq[pos]++;
}
void remove(int pos) {
    freq[pos]--;
    if (freq[pos] == 0) curAns--;
}

vector&lt;int&gt; mosAlgo(vector&lt;int&gt;& a, vector&lt;Query&gt; qs) {
    sort(qs.begin(), qs.end(), [](Query a, Query b) {
        if (a.l/BLOCK != b.l/BLOCK)
            return a.l/BLOCK &lt; b.l/BLOCK;
        return (a.l/BLOCK % 2) ? a.r &gt; b.r : a.r &lt; b.r;
    });
    int curL = 0, curR = -1;
    vector&lt;int&gt; ans(qs.size());
    for (auto&amp; q : qs) {
        while (curL &gt; q.l) add(a[--curL]);
        while (curR &lt; q.r) add(a[++curR]);
        while (curL &lt; q.l) remove(a[curL++]);
        while (curR &gt; q.r) remove(a[curR--]);
        ans[q.idx] = curAns;
    }
    return ans;
}</pre>
</div>`,
          problems: [
            { name: 'D-query — SPOJ', platform: 'SPOJ', link: 'https://www.spoj.com/problems/DQUERY/', difficulty: 'hard' }
          ]
        },
        {
          id: 'set-map',
          title: 'Set & Map (Cây đỏ đen)',
          difficulty: 'medium',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><code>set</code> và <code>map</code> trong C++ được cài đặt bằng Red-Black Tree (cây cân bằng). Các phần tử tự động sắp xếp theo thứ tự tăng dần. Tìm kiếm, thêm, xóa O(log n).</p>
</div>
<div class="lesson-section">
  <h4>Các hàm chính</h4>
  <ul>
    <li><code>set&lt;T&gt; s;</code> — <code>insert(x)</code>, <code>erase(x)</code>, <code>find(x)</code>, <code>count(x)</code>, <code>lower_bound(x)</code>, <code>upper_bound(x)</code></li>
    <li><code>map&lt;K,V&gt; m;</code> — <code>m[key] = value</code>, <code>m.find(key)</code>, <code>m.erase(key)</code></li>
    <li><code>multiset</code> — cho phép trùng lặp</li>
  </ul>
</div>`,
          problems: [
            { name: 'Set — CF 520B', platform: 'CF', link: '#', difficulty: 'easy' }
          ]
        },
        {
          id: 'priority-queue',
          title: 'Priority Queue & Heap',
          difficulty: 'medium',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Priority Queue luôn đưa phần tử có độ ưu tiên cao nhất (lớn nhất hoặc nhỏ nhất) lên đầu. Cài đặt bằng Heap — cây nhị phân hoàn chỉnh với tính chất heap: giá trị nút cha ≥ giá trị nút con (max-heap).</p>
  <p>Push và pop O(log n), top O(1).</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Top K lần xuất hiện nhiều nhất</h4>
  <pre class="code-sample">vector&lt;int&gt; topKFrequent(vector&lt;int&gt;& a, int k) {
    unordered_map&lt;int,int&gt; freq;
    for (int x : a) freq[x]++;
    priority_queue&lt;pair&lt;int,int&gt;&gt; pq;
    for (auto&amp; p : freq)
        pq.push({p.second, p.first});
    vector&lt;int&gt; res;
    for (int i = 0; i &lt; k &amp;&amp; !pq.empty(); i++) {
        res.push_back(pq.top().second);
        pq.pop();
    }
    return res;
} // O(n log n)</pre>
</div>`,
          problems: [
            { name: 'Kth Largest Element', platform: 'LeetCode', link: '#', difficulty: 'medium' }
          ]
        }
      ]
    },

    // ============================================================
    //  5. THUẬT TOÁN ĐỒ THỊ
    // ============================================================
    {
      id: 'graph-algos',
      name: 'Thuật toán Đồ thị',
      icon: 'share-2',
      color: 'blue',
      lessons: [
        {
          id: 'bfs-dfs',
          title: 'BFS & DFS (Duyệt đồ thị)',
          difficulty: 'easy',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>DFS (Depth-First Search):</strong> Đi sâu nhất có thể, quay lui khi không đi được. Dùng đệ quy hoặc stack. Ứng dụng: tìm thành phần liên thông, chu trình, topo sort, SCC.</p>
  <p><strong>BFS (Breadth-First Search):</strong> Dùng queue, duyệt theo tầng. Tìm đường đi ngắn nhất trên đồ thị không trọng số.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">vector&lt;int&gt; adj[100005];
bool visited[100005];

// DFS
void dfs(int u) {
    visited[u] = true;
    for (int v : adj[u])
        if (!visited[v]) dfs(v);
}

// BFS — đường đi ngắn nhất
vector&lt;int&gt; bfs(int start, int target) {
    queue&lt;int&gt; q;
    vector&lt;int&gt; dist(100005, -1);
    dist[start] = 0; q.push(start);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        if (u == target) break;
        for (int v : adj[u])
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
    }
    return dist;
} // O(V + E)</pre>
</div>`,
          problems: [
            { name: 'Connected Components — CF', platform: 'CF', link: '#', difficulty: 'easy' },
            { name: 'BFS Shortest Path — CSES', platform: 'CSES', link: 'https://cses.fi/problemset/task/1193', difficulty: 'medium' }
          ]
        },
        {
          id: 'dijkstra',
          title: 'Dijkstra — Đường đi ngắn nhất',
          difficulty: 'medium',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Dijkstra tìm đường đi ngắn nhất từ một đỉnh đến tất cả các đỉnh trên đồ thị có trọng số DƯƠNG. Dùng priority queue để luôn chọn đỉnh có khoảng cách nhỏ nhất chưa xử lý.</p>
  <p>Độ phức tạp: O((V+E) log V) với priority queue.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">vector&lt;pair&lt;int,int&gt;&gt; adj[100005];
const long long INF = 1e18;

vector&lt;long long&gt; dijkstra(int start, int n) {
    vector&lt;long long&gt; dist(n+1, INF);
    priority_queue&lt;pair&lt;long long,int&gt;,
                   vector&lt;pair&lt;long long,int&gt;&gt;,
                   greater&lt;pair&lt;long long,int&gt;&gt;&gt; pq;
    dist[start] = 0;
    pq.push({0, start});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d != dist[u]) continue;
        for (auto [v, w] : adj[u])
            if (dist[v] &gt; dist[u] + w) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
    }
    return dist;
} // O((V+E) log V)</pre>
</div>`,
          problems: [
            { name: 'Shortest Path — CSES', platform: 'CSES', link: 'https://cses.fi/problemset/task/1671', difficulty: 'medium' },
            { name: 'Dijkstra — CF 20C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/20/C', difficulty: 'medium' }
          ]
        },
        {
          id: 'bellman-ford',
          title: 'Bellman-Ford (trọng số âm)',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Bellman-Ford tìm đường đi ngắn nhất trên đồ thị có thể có trọng số âm. Chạy V-1 lần relax tất cả các cạnh, sau đó chạy thêm lần thứ V để phát hiện chu trình âm.</p>
  <p>Độ phức tạp: O(V·E).</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">struct Edge { int u, v, w; };
vector&lt;Edge&gt; edges;
const long long INF = 1e18;

vector&lt;long long&gt; bellmanFord(int n, int start) {
    vector&lt;long long&gt; dist(n+1, INF);
    dist[start] = 0;
    for (int i = 1; i &lt; n; i++)
        for (auto&amp; e : edges)
            if (dist[e.u] != INF
                &amp;&amp; dist[e.v] &gt; dist[e.u] + e.w)
                dist[e.v] = dist[e.u] + e.w;
    // Phát hiện chu trình âm
    for (auto&amp; e : edges)
        if (dist[e.u] != INF
            &amp;&amp; dist[e.v] &gt; dist[e.u] + e.w) {
            // Có chu trình âm
            break;
        }
    return dist;
} // O(V*E)</pre>
</div>`,
          problems: [
            { name: 'Bellman-Ford — CF 25C', platform: 'CF', link: '#', difficulty: 'hard' }
          ]
        },
        {
          id: 'floyd-warshall',
          title: 'Floyd-Warshall (APSP)',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Floyd-Warshall tìm đường đi ngắn nhất GIỮA MỌI CẶP ĐỈNH. Ý tưởng: dùng DP với trạng thái k — có phép đi qua các đỉnh 1..k hay không.</p>
  <p>Độ phức tạp: O(V³). Chỉ dùng khi V ≤ 500.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">int dist[505][505];
const int INF = 1e9;

void floydWarshall(int n) {
    for (int k = 1; k &lt;= n; k++)
        for (int i = 1; i &lt;= n; i++)
            for (int j = 1; j &lt;= n; j++)
                if (dist[i][k] + dist[k][j] &lt; dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
} // O(V³)</pre>
</div>`,
          problems: [
            { name: 'Shortest Path II — CSES', platform: 'CSES', link: 'https://cses.fi/problemset/task/1672', difficulty: 'medium' }
          ]
        },
        {
          id: 'mst',
          title: 'MST — Kruskal & Prim',
          difficulty: 'medium',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Kruskal:</strong> Sắp xếp cạnh theo trọng số, thêm cạnh nhỏ nhất không tạo chu trình (dùng DSU). O(E log E).</p>
  <p><strong>Prim:</strong> Xuất phát từ 1 đỉnh, luôn chọn cạnh nhỏ nhất nối đỉnh đã chọn với đỉnh chưa chọn. O((V+E) log V).</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Kruskal</h4>
  <pre class="code-sample">struct Edge { int u, v, w; };
vector&lt;Edge&gt; edges;
DSU dsu(n);

long long kruskal() {
    sort(edges.begin(), edges.end(),
         [](Edge a, Edge b) { return a.w &lt; b.w; });
    long long ans = 0;
    for (auto&amp; e : edges)
        if (dsu.unite(e.u, e.v)) ans += e.w;
    return ans; // O(E log E)
}</pre>
</div>`,
          problems: [
            { name: 'MST — CSES', platform: 'CSES', link: 'https://cses.fi/problemset/task/1675', difficulty: 'medium' }
          ]
        },
        {
          id: 'lca',
          title: 'LCA & Binary Lifting',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>LCA (Lowest Common Ancestor) là tổ tiên chung gần nhất của hai nút trên cây. <strong>Binary Lifting:</strong> up[u][k] = tổ tiên thứ 2ᵏ của u. Tiền xử lý O(n log n), truy vấn O(log n).</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">const int LOG = 18;
int up[100005][LOG];
int depth[100005];

void dfs(int u, int p) {
    up[u][0] = p;
    for (int k = 1; k &lt; LOG; k++)
        up[u][k] = up[up[u][k-1]][k-1];
    for (int v : adj[u])
        if (v != p) {
            depth[v] = depth[u] + 1;
            dfs(v, u);
        }
}

int lca(int u, int v) {
    if (depth[u] &lt; depth[v]) swap(u, v);
    int diff = depth[u] - depth[v];
    for (int k = 0; k &lt; LOG; k++)
        if (diff &gt;&gt; k &amp; 1) u = up[u][k];
    if (u == v) return u;
    for (int k = LOG-1; k &gt;= 0; k--)
        if (up[u][k] != up[v][k])
            { u = up[u][k]; v = up[v][k]; }
    return up[u][0];
} // O(log n) mỗi truy vấn</pre>
</div>`,
          problems: [
            { name: 'LCA — CSES', platform: 'CSES', link: 'https://cses.fi/problemset/task/1688', difficulty: 'medium' },
            { name: 'LCA — CF', platform: 'CF', link: '#', difficulty: 'hard' }
          ]
        },
        {
          id: 'scc',
          title: 'SCC — Tarjan & Kosaraju',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>SCC (Strongly Connected Component) — trong đồ thị có hướng, hai đỉnh cùng SCC nếu có đường đi từ u đến v và từ v đến u.</p>
  <p><strong>Thuật toán Tarjan:</strong> Một lần DFS với lowlink và stack. <strong>Kosaraju:</strong> Hai lần DFS (xuôi + ngược).</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Tarjan</h4>
  <pre class="code-sample">int disc[100005], low[100005], timer = 0;
bool inStack[100005];
stack&lt;int&gt; st;
vector&lt;int&gt; scc[100005];
int sccId[100005], sccCnt = 0;

void tarjan(int u) {
    disc[u] = low[u] = ++timer;
    st.push(u); inStack[u] = true;
    for (int v : adj[u]) {
        if (!disc[v]) {
            tarjan(v);
            low[u] = min(low[u], low[v]);
        } else if (inStack[v])
            low[u] = min(low[u], disc[v]);
    }
    if (low[u] == disc[u]) {
        sccCnt++;
        while (true) {
            int v = st.top(); st.pop();
            inStack[v] = false;
            sccId[v] = sccCnt;
            scc[sccCnt].push_back(v);
            if (v == u) break;
        }
    }
} // O(V + E)</pre>
</div>`,
          problems: [
            { name: 'SCC — CF 427C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/427/C', difficulty: 'hard' }
          ]
        },
        {
          id: 'max-flow',
          title: 'Max Flow — Dinic',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Bài toán luồng cực đại: tìm lượng lớn nhất có thể gửi từ source đến sink qua mạng có giới hạn dung lượng trên cạnh.</p>
  <p><strong>Thuật toán Dinic:</strong> BFS xây đồ thị lớp (level graph), sau đó DFS gửi luồng (blocking flow). Độ phức tạp O(V²·E) nhưng thường chạy rất nhanh.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Dinic</h4>
  <pre class="code-sample">struct Edge { int v, rev; long long cap; };
vector&lt;Edge&gt; adj[1005];
int level[1005], it[1005];

void addEdge(int u, int v, long long cap) {
    adj[u].push_back({v, (int)adj[v].size(), cap});
    adj[v].push_back({u, (int)adj[u].size()-1, 0});
}

bool bfs(int s, int t) {
    memset(level, -1, sizeof(level));
    queue&lt;int&gt; q; q.push(s); level[s] = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (auto&amp; e : adj[u])
            if (level[e.v] &lt; 0 &amp;&amp; e.cap &gt; 0)
                { level[e.v] = level[u]+1; q.push(e.v); }
    }
    return level[t] &gt;= 0;
}

long long dfs(int u, int t, long long f) {
    if (u == t) return f;
    for (int &amp;i = it[u]; i &lt; adj[u].size(); i++) {
        Edge &amp;e = adj[u][i];
        if (e.cap &gt; 0 &amp;&amp; level[u] + 1 == level[e.v]) {
            long long flow = dfs(e.v, t, min(f, e.cap));
            if (flow &gt; 0) {
                e.cap -= flow;
                adj[e.v][e.rev].cap += flow;
                return flow;
            }
        }
    }
    return 0;
}

long long maxFlow(int s, int t) {
    long long flow = 0;
    while (bfs(s, t)) {
        memset(it, 0, sizeof(it));
        while (long long pushed = dfs(s, t, 1e18))
            flow += pushed;
    }
    return flow;
}</pre>
</div>`,
          problems: [
            { name: 'Max Flow — SPOJ FASTFLOW', platform: 'SPOJ', link: 'https://www.spoj.com/problems/FASTFLOW/', difficulty: 'hard' }
          ]
        }
      ]
    },

    // ============================================================
    //  6. TOÁN HỌC & LÝ THUYẾT SỐ
    // ============================================================
    {
      id: 'math',
      name: 'Toán học & Lý thuyết số',
      icon: 'sigma',
      color: 'amber',
      lessons: [
        {
          id: 'sieve',
          title: 'Sàng số nguyên tố (Sieve)',
          difficulty: 'easy',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Sàng Eratosthenes đánh dấu các bội số của từng số nguyên tố bắt đầu từ 2. Sau khi chạy, các số chưa bị đánh dấu là số nguyên tố.</p>
  <p><strong>Biến thể:</strong> Sàng tuyến tính (Linear Sieve) — mỗi hợp số được đánh dấu đúng một lần bởi ước nguyên tố nhỏ nhất của nó. Có thể tính thêm phi hàm Euler, số lượng ước, tổng ước.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">// Sàng Eratosthenes cơ bản — O(n log log n)
vector&lt;bool&gt; sieve(int n) {
    vector&lt;bool&gt; isPrime(n+1, true);
    isPrime[0] = isPrime[1] = false;
    for (int i = 2; i*i &lt;= n; i++)
        if (isPrime[i])
            for (int j = i*i; j &lt;= n; j += i)
                isPrime[j] = false;
    return isPrime;
}

// Sàng tuyến tính — O(n)
vector&lt;int&gt; linearSieve(int n) {
    vector&lt;int&gt; primes;
    vector&lt;int&gt; lp(n+1, 0); // ước nguyên tố nhỏ nhất
    for (int i = 2; i &lt;= n; i++) {
        if (lp[i] == 0) { lp[i] = i; primes.push_back(i); }
        for (int p : primes)
            if (p &gt; lp[i] || i*p &gt; n) break;
            else lp[i*p] = p;
    }
    return primes;
}</pre>
</div>`,
          problems: [
            { name: 'Prime Factorization — CF', platform: 'CF', link: '#', difficulty: 'easy' },
            { name: 'Almost Prime — CF 26A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/26/A', difficulty: 'easy' }
          ]
        },
        {
          id: 'binary-exp',
          title: 'Lũy thừa nhị phân (Binary Exponentiation)',
          difficulty: 'easy',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Tính a^b (mod M) trong O(log b). Ý tưởng: a^b = (a^(b/2))² nếu b chẵn, = a * a^(b-1) nếu b lẻ.</p>
  <p><strong>Ứng dụng:</strong> Kết hợp Định lý Fermat nhỏ (a^(M-2) mod M) để tính nghịch đảo mô-đun khi M là số nguyên tố.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">const long long MOD = 1e9 + 7;

long long binPow(long long a, long long b) {
    long long res = 1;
    while (b &gt; 0) {
        if (b &amp; 1) res = res * a % MOD;
        a = a * a % MOD;
        b &gt;&gt;= 1;
    }
    return res; // O(log b)
}

// Nghịch đảo mô-đun: a^(MOD-2) % MOD
long long modInv(long long a) {
    return binPow(a, MOD - 2);
}

// Tổ hợp C(n,k) % MOD (với factorial đã tính)
long long nCk(int n, int k, vector&lt;long long&gt;& fact) {
    if (k &lt; 0 || k &gt; n) return 0;
    return fact[n] * modInv(fact[k]) % MOD
         * modInv(fact[n-k]) % MOD;
}</pre>
</div>`,
          problems: [
            { name: 'Binary Exponentiation — CF', platform: 'CF', link: '#', difficulty: 'easy' },
            { name: 'Modular Combinatorics — VNOI', platform: 'VNOI', link: '#', difficulty: 'medium' }
          ]
        },
        {
          id: 'computational-geo',
          title: 'Hình học tính toán',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Tích có hướng (Cross Product):</strong> cross(a, b, c) = (b.x - a.x)*(c.y - a.y) - (b.y - a.y)*(c.x - a.x). Dương = rẽ trái, âm = rẽ phải, 0 = thẳng hàng.</p>
  <p><strong>Convex Hull (Bao lồi):</strong> Tìm đa giác lồi nhỏ nhất chứa tất cả điểm. Thuật toán Monotone Chain: sort theo (x, y), xây bao dưới + bao trên. O(n log n).</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Monotone Chain</h4>
  <pre class="code-sample">struct Point { long long x, y; };
long long cross(Point a, Point b, Point c) {
    return (b.x-a.x)*(c.y-a.y) - (b.y-a.y)*(c.x-a.x);
}

vector&lt;Point&gt; convexHull(vector&lt;Point&gt; pts) {
    sort(pts.begin(), pts.end(),
         [](Point a, Point b) {
            return a.x &lt; b.x || (a.x==b.x &amp;&amp; a.y&lt;b.y); });
    vector&lt;Point&gt; hull;
    for (int phase = 0; phase &lt; 2; phase++) {
        int start = hull.size();
        for (auto&amp; p : pts) {
            while (hull.size() &gt;= start+2
                &amp;&amp; cross(hull[hull.size()-2], hull.back(), p) &lt;= 0)
                hull.pop_back();
            hull.push_back(p);
        }
        hull.pop_back();
        reverse(pts.begin(), pts.end());
    }
    return hull;
} // O(n log n)</pre>
</div>`,
          problems: [
            { name: 'Convex Hull — CF', platform: 'CF', link: '#', difficulty: 'hard' }
          ]
        },
        {
          id: 'fft',
          title: 'FFT (Biến đổi Fourier nhanh)',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>FFT nhân hai đa thức bậc n trong O(n log n). Ý tưởng: biểu diễn đa thức dưới dạng điểm-giá trị (point-value), nhân tương ứng từng điểm, chuyển ngược lại dạng hệ số.</p>
  <p><strong>NTT (Number Theoretic Transform):</strong> Phiên bản dùng số nguyên modulo (thay vì số phức), tránh sai số.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — FFT cơ bản</h4>
  <pre class="code-sample">using cd = complex&lt;double&gt;;
const double PI = acos(-1);

void fft(vector&lt;cd&gt;& a, bool invert) {
    int n = a.size();
    for (int i = 1, j = 0; i &lt; n; i++) {
        int bit = n &gt;&gt; 1;
        for (; j &amp; bit; bit &gt;&gt;= 1) j ^= bit;
        j ^= bit;
        if (i &lt; j) swap(a[i], a[j]);
    }
    for (int len = 2; len &lt;= n; len &lt;&lt;= 1) {
        double ang = 2*PI/len * (invert ? -1 : 1);
        cd wlen(cos(ang), sin(ang));
        for (int i = 0; i &lt; n; i += len) {
            cd w(1);
            for (int j = 0; j &lt; len/2; j++) {
                cd u = a[i+j], v = a[i+j+len/2] * w;
                a[i+j] = u + v;
                a[i+j+len/2] = u - v;
                w *= wlen;
            }
        }
    }
    if (invert)
        for (auto&amp; x : a) x /= n;
}

vector&lt;int&gt; multiply(vector&lt;int&gt;& a, vector&lt;int&gt;& b) {
    vector&lt;cd&gt; fa(a.begin(), a.end());
    vector&lt;cd&gt; fb(b.begin(), b.end());
    int n = 1;
    while (n &lt; a.size() + b.size()) n &lt;&lt;= 1;
    fa.resize(n); fb.resize(n);
    fft(fa, false); fft(fb, false);
    for (int i = 0; i &lt; n; i++) fa[i] *= fb[i];
    fft(fa, true);
    vector&lt;int&gt; res(n);
    for (int i = 0; i &lt; n; i++)
        res[i] = round(fa[i].real());
    return res;
} // O(n log n)</pre>
</div>`,
          problems: [
            { name: 'FFT — CF 993E', platform: 'CF', link: '#', difficulty: 'hard' }
          ]
        }
      ]
    },

    // ============================================================
    //  7. XỬ LÝ CHUỖI
    // ============================================================
    {
      id: 'string',
      name: 'Xử lý chuỗi (String Algorithms)',
      icon: 'typography',
      color: 'pink',
      lessons: [
        {
          id: 'string-hashing',
          title: 'String Hashing (Băm chuỗi)',
          difficulty: 'medium',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Biến chuỗi thành mã băm (số nguyên) để so sánh hai chuỗi con trong O(1). Công thức: hash(s) = (s[0]*P^(n-1) + s[1]*P^(n-2) + ... + s[n-1]) mod M.</p>
  <p><strong>Lưu ý:</strong> Dùng hai modulo (double hash) để tránh xung đột. Base P thường là 311 hoặc 91138233.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">struct StringHash {
    const long long P = 91138233;
    const long long MOD = 1e9 + 7;
    vector&lt;long long&gt; h, p;

    StringHash(string s) {
        int n = s.size();
        h.resize(n+1, 0); p.resize(n+1, 1);
        for (int i = 1; i &lt;= n; i++) {
            h[i] = (h[i-1] * P + s[i-1]) % MOD;
            p[i] = p[i-1] * P % MOD;
        }
    }

    long long get(int l, int r) { // 0-indexed
        return (h[r+1] - h[l] * p[r-l+1] % MOD + MOD) % MOD;
    }
}; // So sánh s[l1..r1] == s[l2..r2] trong O(1)</pre>
</div>`,
          problems: [
            { name: 'String Hashing — CF 271D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/271/D', difficulty: 'medium' }
          ]
        },
        {
          id: 'kmp',
          title: 'KMP (Knuth-Morris-Pratt)',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>KMP tìm tất cả vị trí xuất hiện của chuỗi mẫu P trong chuỗi văn bản T với thời gian O(|P| + |T|). Ý tưởng: xây hàm prefix (LPS) của mẫu để biết khi khớp sai cần lùi về đâu.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">vector&lt;int&gt; buildLPS(string p) {
    int m = p.size();
    vector&lt;int&gt; lps(m, 0);
    for (int i = 1, len = 0; i &lt; m; ) {
        if (p[i] == p[len]) { lps[i++] = ++len; }
        else if (len) len = lps[len-1];
        else lps[i++] = 0;
    }
    return lps;
}

vector&lt;int&gt; kmp(string text, string pattern) {
    vector&lt;int&gt; lps = buildLPS(pattern);
    vector&lt;int&gt; matches;
    int n = text.size(), m = pattern.size();
    for (int i = 0, j = 0; i &lt; n; ) {
        if (text[i] == pattern[j]) { i++; j++; }
        if (j == m) {
            matches.push_back(i - j);
            j = lps[j-1];
        } else if (i &lt; n &amp;&amp; text[i] != pattern[j]) {
            if (j) j = lps[j-1];
            else i++;
        }
    }
    return matches; // O(n + m)</pre>
</div>`,
          problems: [
            { name: 'KMP — CF 471D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/471/D', difficulty: 'hard' }
          ]
        },
        {
          id: 'z-algorithm',
          title: 'Z-Algorithm',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Z-Algorithm tính mảng Z[i] = độ dài tiền tố chung dài nhất của chuỗi s và hậu tố s[i..n-1]. Dùng để tìm kiếm chuỗi, đếm số lần xuất hiện, tìm palindrome.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">vector&lt;int&gt; zFunction(string s) {
    int n = s.size();
    vector&lt;int&gt; z(n, 0);
    int l = 0, r = 0;
    for (int i = 1; i &lt; n; i++) {
        if (i &lt;= r)
            z[i] = min(r - i + 1, z[i - l]);
        while (i + z[i] &lt; n &amp;&amp; s[z[i]] == s[i + z[i]])
            z[i]++;
        if (i + z[i] - 1 &gt; r)
            { l = i; r = i + z[i] - 1; }
    }
    return z;
}

// Tìm pattern trong text: tạo S = pattern + '$' + text
// Duyệt Z, nếu Z[i] == |pattern| -> match</pre>
</div>`,
          problems: [
            { name: 'Z Algorithm — CF 126B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/126/B', difficulty: 'hard' }
          ]
        },
        {
          id: 'trie',
          title: 'Trie (Cây tiền tố)',
          difficulty: 'medium',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Trie là cấu trúc cây lưu trữ tập hợp chuỗi. Mỗi nút tương ứng với một ký tự. Cho phép thêm, tìm kiếm, kiểm tra tiền tố trong O(|S|).</p>
  <p><strong>Biến thể:</strong> XOR Trie — tìm cặp số có XOR lớn nhất bằng cách duyệt từ bit cao xuống thấp.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Trie cơ bản</h4>
  <pre class="code-sample">struct Trie {
    struct Node {
        Node* child[26];
        bool isEnd;
        Node() : isEnd(false) {
            memset(child, 0, sizeof(child));
        }
    };
    Node* root;
    Trie() { root = new Node(); }

    void insert(string s) {
        Node* cur = root;
        for (char c : s) {
            int idx = c - 'a';
            if (!cur-&gt;child[idx]) cur-&gt;child[idx] = new Node();
            cur = cur-&gt;child[idx];
        }
        cur-&gt;isEnd = true;
    }

    bool search(string s) {
        Node* cur = root;
        for (char c : s) {
            int idx = c - 'a';
            if (!cur-&gt;child[idx]) return false;
            cur = cur-&gt;child[idx];
        }
        return cur-&gt;isEnd;
    }
}; // O(|S|) cho mỗi thao tác</pre>
</div>`,
          problems: [
            { name: 'Trie — CF 706D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/706/D', difficulty: 'medium' }
          ]
        }
      ]
    },

    // ============================================================
    //  8. THỦ THUẬT TỐI ƯU
    // ============================================================
    {
      id: 'optimizations',
      name: 'Thủ thuật tối ưu hóa',
      icon: 'zap',
      color: 'yellow',
      lessons: [
        {
          id: 'bitmask',
          title: 'Bitmask — Mặt nạ bit',
          difficulty: 'easy',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Bitmask dùng các bit của số nguyên để biểu diễn trạng thái bật/tắt của tập hợp. Thao tác với bit cực nhanh nhờ phép toán bit (&, |, ^, <<, >>).</p>
  <p><strong>Ứng dụng:</strong> Lưu trạng thái 0/1 cho N ≤ 60, DP bitmask, tìm tập con, kiểm tra cờ (flags).</p>
</div>
<div class="lesson-section">
  <h4>Các thao tác cơ bản</h4>
  <ul>
    <li><code>mask | (1 << i)</code> — bật bit thứ i</li>
    <li><code>mask & ~(1 << i)</code> — tắt bit thứ i</li>
    <li><code>(mask >> i) & 1</code> — kiểm tra bit thứ i</li>
    <li><code>mask & -mask</code> — lowbit (bit 1 thấp nhất)</li>
    <li><code>__builtin_popcount(mask)</code> — số bit 1</li>
    <li><code>__builtin_ctz(mask)</code> — số bit 0 ở cuối</li>
  </ul>
</div>`,
          problems: [
            { name: 'Bitmask — CF 579A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/579/A', difficulty: 'easy' }
          ]
        },
        {
          id: 'pragma',
          title: 'Pragma Optimization',
          difficulty: 'easy',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Pragma là chỉ thị gửi đến trình biên dịch để tối ưu hóa code. Trong CP, thêm ở đầu file để tăng tốc độ chạy.</p>
  <p><strong>Lưu ý:</strong> Chỉ dùng pragma khi thực sự cần, vì có thể làm code khó debug.</p>
</div>
<div class="lesson-section">
  <h4>Các pragma thường dùng</h4>
  <pre class="code-sample">#pragma GCC optimize("O3,unroll-loops")
#pragma GCC target("avx2,bmi,bmi2,lzcnt,popcnt")

// Hoặc đầy đủ:
#pragma GCC optimize("Ofast")
#pragma GCC target("sse,sse2,sse3,ssse3,sse4,popcnt,abm,mmx,avx,tune=native")</pre>
  <p>Khi đã dùng pragma, các vòng lặp sẽ được tự động mở (unroll) và tận dụng tối đa CPU.</p>
</div>`,
          problems: []
        },
        {
          id: 'fast-io',
          title: 'Fast I/O',
          difficulty: 'easy',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Trong C++, cin/cout mặc định chậm hơn scanf/printf do phải đồng bộ với C I/O. Hai lệnh sau giúp tăng tốc cin/cout lên ngang hàng (và đôi khi nhanh hơn) scanf/printf.</p>
  <p><strong>Bắt buộc</strong> trong mọi bài CP C++ nếu dùng cin/cout.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">// Phải đặt ở đầu main()
ios::sync_with_stdio(false);
cin.tie(nullptr);

// Nếu cần nhập nhanh hơn nữa — dùng getchar
long long readInt() {
    long long x = 0, sign = 1;
    char c = getchar();
    while (c &lt; '0' || c &gt; '9') {
        if (c == '-') sign = -1;
        c = getchar();
    }
    while (c &gt;= '0' &amp;&amp; c &lt;= '9') {
        x = x*10 + (c - '0');
        c = getchar();
    }
    return x * sign;
} // Nhanh hơn cin/scanf</pre>
  <p>Sau khi gọi <code>ios::sync_with_stdio(false)</code>, không được trộn cin với scanf/gets.</p>
</div>`,
          problems: []
        }
      ]
    }
  ]
};
