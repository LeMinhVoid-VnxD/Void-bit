// ================================================================
//  VOID-BIT — Complete Lesson Library (All CP Topics)
//  Each lesson: explanation, key functions, sample code, problems.
// ================================================================

const LESSONS = {
  categories: [
{
  id: 'paradigms',
  name: 'Kĩ thuật thiết kế giải thuật',
  icon: 'cpu',
  color: 'cyan',
  lessons: [
    // ============================================
    //  1.1  BINARY SEARCH
    // ============================================
    {
      id: 'binary-search',
      title: 'Tìm kiếm nhị phân (Binary Search)',
      difficulty: 'easy',
      content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Tìm kiếm nhị phân là thuật toán chia để trị hoạt động trên mảng <strong>đã được sắp xếp</strong>. Ý tưởng: so sánh giá trị cần tìm với phần tử ở giữa mảng, nếu nhỏ hơn thì tìm ở nửa trái, lớn hơn thì tìm ở nửa phải. Độ phức tạp O(log n).</p>
  <p><strong>Binary Search on Answer:</strong> Áp dụng cho bài toán tìm giá trị X thỏa mãn điều kiện nào đó, biết rằng nếu X thỏa mãn thì mọi giá trị lớn hơn (hoặc nhỏ hơn) cũng thỏa mãn (tính đơn điệu). Ví dụ: tìm độ dài thanh gỗ lớn nhất có thể cắt được, tìm tốc độ tối thiểu để ăn hết chuối trong H giờ.</p>
  <p><strong>Hàm check(mid):</strong> Là trái tim của Binary Search on Answer. Viết hàm này trả về true/false dựa trên mid có thỏa mãn điều kiện hay không.</p>
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
  <h4>Các lỗi thường gặp</h4>
  <ul>
    <li><strong>Quên sắp xếp mảng:</strong> Binary search chỉ hoạt động trên mảng đã sắp xếp.</li>
    <li><strong>Tràn số (overflow):</strong> <code>int m = (l + r) / 2</code> có thể tràn nếu l+r &gt; INT_MAX. Dùng <code>m = l + (r - l) / 2</code>.</li>
    <li><strong>Vòng lặp vô hạn:</strong> Khi <code>l = m</code> thay vì <code>l = m + 1</code> hoặc <code>r = m</code> thay vì <code>r = m - 1</code>.</li>
    <li><strong>Điều kiện dừng sai:</strong> <code>while (l &lt; r)</code> khác <code>while (l &lt;= r)</code>. Cần phân biệt rõ.</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">int binarySearch(vector&lt;int&gt;& a, int x) {
    int l = 0, r = (int)a.size() - 1;
    while (l &lt;= r) {
        int m = l + (r - l) / 2;  // tránh tràn số
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
      videos: [
        { title: 'Tìm kiếm nhị phân — Lý thuyết và bài tập (28tech)', url: 'https://www.youtube.com/results?search_query=T%c3%acm+ki%e1%ba%bfm+nh%e1%bb%8b+ph%c3%a2n+%e2%80%94+L%c3%bd+thuy%e1%ba%bft+v%c3%a0+b%c3%a0i+t%e1%ba%adp+(28tech)' },
        { title: 'Binary Search — Thuật toán tìm kiếm nhị phân (VNOI Channel)', url: 'https://www.youtube.com/results?search_query=Binary+Search+%e2%80%94+Thu%e1%ba%adt+to%c3%a1n+t%c3%acm+ki%e1%ba%bfm+nh%e1%bb%8b+ph%c3%a2n+(VNOI+Channel)' },
        { title: 'Binary Search on Answer — Errichto (English)', url: 'https://www.youtube.com/results?search_query=Binary+Search+on+Answer+%e2%80%94+Errichto+(English)' }
      ],
      problems: [
        { name: 'Binary Search — Codeforces Edu', platform: 'CF', link: 'https://codeforces.com/edu/course/2/lesson/6/1', difficulty: 'easy' },
        { name: 'Drinks — CF 200B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/200/B', difficulty: 'easy' },
        { name: 'Vanya and Fence — CF 677A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/677/A', difficulty: 'easy' },
        { name: 'Bear and Big Brother — CF 791A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/791/A', difficulty: 'easy' },
        { name: 'Elephant — CF 617A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/617/A', difficulty: 'easy' },
        { name: 'In Search of an Easy Problem — CF 1030A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1030/A', difficulty: 'easy' },
        { name: 'Anton and Danik — CF 734A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/734/A', difficulty: 'easy' },
        { name: 'Choosing Teams — CF 432A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/432/A', difficulty: 'easy' },
        { name: 'Queue at the School — CF 266B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/266/B', difficulty: 'easy' },
        { name: 'Binary Search — LeetCode 704', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-search/', difficulty: 'easy' },
        { name: 'Aggressive Cows — SPOJ', platform: 'SPOJ', link: 'https://www.spoj.com/problems/AGGRCOW/', difficulty: 'medium' },
        { name: 'Collecting Numbers — CSES 2216', platform: 'CSES', link: 'https://cses.fi/problemset/task/2216', difficulty: 'medium' },
        { name: 'Ferris Wheel — CSES 1090', platform: 'CSES', link: 'https://cses.fi/problemset/task/1090', difficulty: 'medium' },
        { name: 'Apartments — CSES 1084', platform: 'CSES', link: 'https://cses.fi/problemset/task/1084', difficulty: 'medium' },
        { name: 'Factory Machines — CSES 1620', platform: 'CSES', link: 'https://cses.fi/problemset/task/1620', difficulty: 'medium' },
        { name: 'Array Division — CSES 1085', platform: 'CSES', link: 'https://cses.fi/problemset/task/1085', difficulty: 'medium' },
        { name: 'Koko Eating Bananas — LeetCode 875', platform: 'LeetCode', link: 'https://leetcode.com/problems/koko-eating-bananas/', difficulty: 'medium' },
        { name: 'Find Peak Element — LeetCode 162', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-peak-element/', difficulty: 'medium' },
        { name: 'K-th Smallest in Multiplication Table — LeetCode 668', platform: 'LeetCode', link: 'https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/', difficulty: 'hard' },
        { name: 'Median of Two Sorted Arrays — LeetCode 4', platform: 'LeetCode', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', difficulty: 'hard' },
        { name: 'Split Array Largest Sum — LeetCode 410', platform: 'LeetCode', link: 'https://leetcode.com/problems/split-array-largest-sum/', difficulty: 'hard' },
        { name: 'Distributing Ballots — VNOI', platform: 'VNOI', link: 'https://oj.vnoi.info/problem/voi14_ballots', difficulty: 'hard' }
      ]
    },
    // ============================================
    //  1.2  TWO POINTERS
    // ============================================
    {
      id: 'two-pointers',
      title: 'Two Pointers & Sliding Window',
      difficulty: 'easy',
      content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Two Pointers:</strong> Dùng hai chỉ số (con trỏ) để duyệt mảng, mỗi con trỏ đại diện cho một vị trí. Thường dùng để tìm cặp phần tử thỏa mãn điều kiện, giảm O(n²) xuống O(n). Ví dụ kinh điển: tìm cặp số có tổng bằng target trong mảng đã sắp xếp.</p>
  <p><strong>Sliding Window:</strong> Duy trì một cửa sổ (đoạn) liên tiếp trên mảng. Khi cửa sổ trượt, ta cập nhật kết quả dựa trên phần tử vào và ra khỏi cửa sổ. Dùng cho: tổng đoạn con lớn nhất &le; K, xâu con dài nhất không có ký tự lặp, substring với tần suất ký tự.</p>
  <p><strong>Khi nào dùng?</strong> Bài toán yêu cầu tìm đoạn con (subarray/substring) thỏa mãn điều kiện, và khi mở rộng/thu hẹp cửa sổ ta có thể cập nhật O(1).</p>
</div>
<div class="lesson-section">
  <h4>Mẹo cài đặt</h4>
  <ul>
    <li>Luôn dùng vòng lặp for cho con trỏ phải (r), và while để điều chỉnh con trỏ trái (l).</li>
    <li>Khi cập nhật kết quả, thường dùng <code>ans = max(ans, r - l + 1)</code> hoặc <code>min</code>.</li>
    <li>Với bài đếm số lượng subarray, đếm ngay khi mở rộng cửa sổ.</li>
  </ul>
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
      videos: [
        { title: 'Two Pointers — Kỹ thuật hai con trỏ (28tech)', url: 'https://www.youtube.com/results?search_query=Two+Pointers+%e2%80%94+K%e1%bb%b9+thu%e1%ba%adt+hai+con+tr%e1%bb%8f+(28tech)' },
        { title: 'Sliding Window — Cửa sổ trượt (VNOI Channel)', url: 'https://www.youtube.com/results?search_query=Sliding+Window+%e2%80%94+C%e1%bb%ada+s%e1%bb%95+tr%c6%b0%e1%bb%a3t+(VNOI+Channel)' },
        { title: 'Two Pointers Technique — Errichto (English)', url: 'https://www.youtube.com/results?search_query=Two+Pointers+Technique+%e2%80%94+Errichto+(English)' }
      ],
      problems: [
        { name: 'Two Sum II — LeetCode 167', platform: 'LeetCode', link: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', difficulty: 'easy' },
        { name: 'Valid Palindrome — LeetCode 125', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-palindrome/', difficulty: 'easy' },
        { name: 'Remove Duplicates from Sorted Array — LeetCode 26', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', difficulty: 'easy' },
        { name: 'Move Zeroes — LeetCode 283', platform: 'LeetCode', link: 'https://leetcode.com/problems/move-zeroes/', difficulty: 'easy' },
        { name: 'Squares of a Sorted Array — LeetCode 977', platform: 'LeetCode', link: 'https://leetcode.com/problems/squares-of-a-sorted-array/', difficulty: 'easy' },
        { name: 'Merge Sorted Array — LeetCode 88', platform: 'LeetCode', link: 'https://leetcode.com/problems/merge-sorted-array/', difficulty: 'easy' },
        { name: 'Assign Cookies — LeetCode 455', platform: 'LeetCode', link: 'https://leetcode.com/problems/assign-cookies/', difficulty: 'easy' },
        { name: 'Maximum Average Subarray I — LeetCode 643', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-average-subarray-i/', difficulty: 'easy' },
        { name: 'Sum of Two Numbers — VNOI', platform: 'VNOI', link: 'https://oj.vnoi.info/problem/vtpair', difficulty: 'easy' },
        { name: 'Planets Queries I — CSES 1750', platform: 'CSES', link: 'https://cses.fi/problemset/task/1750', difficulty: 'medium' },
        { name: 'Subarray Sum Equals K — LeetCode 560', platform: 'LeetCode', link: 'https://leetcode.com/problems/subarray-sum-equals-k/', difficulty: 'medium' },
        { name: 'Container With Most Water — LeetCode 11', platform: 'LeetCode', link: 'https://leetcode.com/problems/container-with-most-water/', difficulty: 'medium' },
        { name: '3Sum — LeetCode 15', platform: 'LeetCode', link: 'https://leetcode.com/problems/3sum/', difficulty: 'medium' },
        { name: 'Longest Substring Without Repeating Characters — LeetCode 3', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', difficulty: 'medium' },
        { name: 'Fruit Into Baskets — LeetCode 904', platform: 'LeetCode', link: 'https://leetcode.com/problems/fruit-into-baskets/', difficulty: 'medium' },
        { name: 'Subarrays with K Different Integers — LeetCode 992', platform: 'LeetCode', link: 'https://leetcode.com/problems/subarrays-with-k-different-integers/', difficulty: 'hard' },
        { name: 'Minimum Window Substring — LeetCode 76', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-window-substring/', difficulty: 'hard' },
        { name: 'Trapping Rain Water — LeetCode 42', platform: 'LeetCode', link: 'https://leetcode.com/problems/trapping-rain-water/', difficulty: 'hard' },
        { name: 'Sliding Subarray Beauty — CF 1731B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1731/B', difficulty: 'hard' },
        { name: 'XOR on Segment — CF 242E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/242/E', difficulty: 'hard' }
      ]
    },
    // ============================================
    //  1.3  DP INTRO
    // ============================================
    {
      id: 'dp-intro',
      title: 'Quy hoạch động (DP) — Tổng quan',
      difficulty: 'medium',
      content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Quy hoạch động (Dynamic Programming) là kĩ thuật chia bài toán lớn thành các bài toán con chồng lấp, lưu kết quả để tái sử dụng. Điều kiện áp dụng: <strong>Cấu trúc con tối ưu</strong> (lời giải bài toán con nằm trong lời giải bài toán lớn) và <strong>Bài toán con chồng lấp</strong> (cùng bài toán con được dùng nhiều lần).</p>
  <p><strong>Các bước giải:</strong> (1) Xác định trạng thái (state) — thường là mảng dp[i] hoặc dp[i][j]. (2) Xây dựng công thức truy hồi — cách tính dp[i] từ các dp[j] với j &lt; i. (3) Xác định điều kiện cơ sở (base case) — dp[0], dp[1],... (4) Tính toán theo thứ tự phù hợp — từ dưới lên (bottom-up) hoặc từ trên xuống có nhớ (top-down memoization).</p>
  <p><strong>Các dạng DP cơ bản:</strong> Fibonacci, Dãy con tăng dài nhất (LIS), Xâu con chung dài nhất (LCS), Cái túi (Knapsack), Biến đổi xâu (Edit Distance).</p>
</div>
<div class="lesson-section">
  <h4>Mẹo cài đặt</h4>
  <ul>
    <li>Bắt đầu với top-down (đệ quy + memoization) vì dễ suy nghĩ, sau đó chuyển sang bottom-up để tối ưu.</li>
    <li>Dùng mảng 1 chiều thay vì 2 chiều nếu công thức chỉ phụ thuộc vào hàng trước đó.</li>
    <li>Khởi tạo mảng dp với -1 để phân biệt ô chưa tính.</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Fibonacci (DP cơ bản)</h4>
  <pre class="code-sample">// Bottom-up
int fib(int n) {
    vector&lt;int&gt; dp(n + 1);
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i &lt;= n; i++)
        dp[i] = dp[i-1] + dp[i-2];
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
    return dp[n][W];
}</pre>
</div>`,
      videos: [
        { title: 'Quy hoạch động — Dynamic Programming cho người mới (28tech)', url: 'https://www.youtube.com/results?search_query=Quy+ho%e1%ba%a1ch+%c4%91%e1%bb%99ng+%e2%80%94+Dynamic+Programming+cho+ng%c6%b0%e1%bb%9di+m%e1%bb%9bi+(28tech)' },
        { title: 'Giới thiệu Quy hoạch động (VNOI Channel)', url: 'https://www.youtube.com/results?search_query=Gi%e1%bb%9bi+thi%e1%bb%87u+Quy+ho%e1%ba%a1ch+%c4%91%e1%bb%99ng+(VNOI+Channel)' },
        { title: 'Dynamic Programming — Errichto (English)', url: 'https://www.youtube.com/results?search_query=Dynamic+Programming+%e2%80%94+Errichto+(English)' }
      ],
      problems: [
        { name: 'Boredom — CF 455A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/455/A', difficulty: 'easy' },
        { name: 'Little Elephant and Bits — CF 258A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/258/A', difficulty: 'easy' },
        { name: 'Increasing Subsequence — LeetCode 300', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-increasing-subsequence/', difficulty: 'easy' },
        { name: 'Climbing Stairs — LeetCode 70', platform: 'LeetCode', link: 'https://leetcode.com/problems/climbing-stairs/', difficulty: 'easy' },
        { name: 'House Robber — LeetCode 198', platform: 'LeetCode', link: 'https://leetcode.com/problems/house-robber/', difficulty: 'easy' },
        { name: 'Min Cost Climbing Stairs — LeetCode 746', platform: 'LeetCode', link: 'https://leetcode.com/problems/min-cost-climbing-stairs/', difficulty: 'easy' },
        { name: 'Maximum Subarray — LeetCode 53', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'easy' },
        { name: 'Counting Bits — LeetCode 338', platform: 'LeetCode', link: 'https://leetcode.com/problems/counting-bits/', difficulty: 'easy' },
        { name: 'Frog 1 — AtCoder DP Contest A', platform: 'AtCoder', link: 'https://atcoder.jp/contests/dp/tasks/dp_a', difficulty: 'easy' },
        { name: 'Frog 2 — AtCoder DP Contest B', platform: 'AtCoder', link: 'https://atcoder.jp/contests/dp/tasks/dp_b', difficulty: 'easy' },
        { name: 'Knapsack 1 — AtCoder DP Contest D', platform: 'AtCoder', link: 'https://atcoder.jp/contests/dp/tasks/dp_d', difficulty: 'medium' },
        { name: 'LCS — AtCoder DP Contest F', platform: 'AtCoder', link: 'https://atcoder.jp/contests/dp/tasks/dp_f', difficulty: 'medium' },
        { name: 'Longest Path — AtCoder DP Contest G', platform: 'AtCoder', link: 'https://atcoder.jp/contests/dp/tasks/dp_g', difficulty: 'medium' },
        { name: 'Dice Combinations — CSES 1633', platform: 'CSES', link: 'https://cses.fi/problemset/task/1633', difficulty: 'medium' },
        { name: 'Minimizing Coins — CSES 1634', platform: 'CSES', link: 'https://cses.fi/problemset/task/1634', difficulty: 'medium' },
        { name: 'Coin Combinations I — CSES 1635', platform: 'CSES', link: 'https://cses.fi/problemset/task/1635', difficulty: 'medium' },
        { name: 'Coin Combinations II — CSES 1636', platform: 'CSES', link: 'https://cses.fi/problemset/task/1636', difficulty: 'medium' },
        { name: 'Edit Distance — CSES 1639', platform: 'CSES', link: 'https://cses.fi/problemset/task/1639', difficulty: 'medium' },
        { name: 'Book Shop — CSES 1158', platform: 'CSES', link: 'https://cses.fi/problemset/task/1158', difficulty: 'hard' },
        { name: 'Increasing Subsequence — CSES 1145', platform: 'CSES', link: 'https://cses.fi/problemset/task/1145', difficulty: 'hard' },
        { name: 'Grid Paths — CSES 1637', platform: 'CSES', link: 'https://cses.fi/problemset/task/1637', difficulty: 'hard' },
        { name: 'Projects — CSES 1140', platform: 'CSES', link: 'https://cses.fi/problemset/task/1140', difficulty: 'hard' }
      ]
    },
    // ============================================
    //  1.4  BITMASK DP
    // ============================================
    {
      id: 'bitmask-dp',
      title: 'DP trạng thái (Bitmask DP)',
      difficulty: 'hard',
      content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Bitmask DP dùng một số nguyên (bitmask) để biểu diễn trạng thái của tập hợp (mỗi bit = 1 nếu phần tử đã được chọn). Thường dùng cho bài toán có N &le; 20, như TSP (Người du lịch) hoặc bài toán phân công.</p>
  <p>DP[mask][i] = chi phí nhỏ nhất khi đã thăm tập mask và đang ở đỉnh i. Với TSP, số trạng thái là 2^N * N &asymp; 20 * 1,048,576 &asymp; 20 triệu — vừa đủ với giới hạn thời gian CP.</p>
  <p><strong>Kĩ thuật quan trọng:</strong> Duyệt tập con của mask bằng vòng lặp <code>for (int sub = mask; sub; sub = (sub-1) & mask)</code> để giảm độ phức tạp.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — TSP (Held-Karp)</h4>
  <pre class="code-sample">int tsp(vector&lt;vector&lt;int&gt;&gt;& dist) {
    int n = dist.size();
    vector&lt;vector&lt;int&gt;&gt; dp(1&lt;&lt;n, vector&lt;int&gt;(n, 1e9));
    dp[1][0] = 0;
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
    return ans;
}</pre>
</div>`,
      videos: [
        { title: 'Bitmask DP — Quy hoạch động trạng thái (VNOI Channel)', url: 'https://www.youtube.com/results?search_query=Bitmask+DP+%e2%80%94+Quy+ho%e1%ba%a1ch+%c4%91%e1%bb%99ng+tr%e1%ba%a1ng+th%c3%a1i+(VNOI+Channel)' },
        { title: 'Kỹ thuật Bitmask trong DP (28tech)', url: 'https://www.youtube.com/results?search_query=K%e1%bb%b9+thu%e1%ba%adt+Bitmask+trong+DP+(28tech)' },
        { title: 'Bitmask DP — Errichto (English)', url: 'https://www.youtube.com/results?search_query=Bitmask+DP+%e2%80%94+Errichto+(English)' }
      ],
      problems: [
        { name: 'Mondriaan\'s Dream — POJ 2411', platform: 'VNOI', link: 'https://oj.vnoi.info/problem/mdream', difficulty: 'hard' },
        { name: 'Traveling Salesman — SPOJ', platform: 'SPOJ', link: 'https://www.spoj.com/problems/TSP/', difficulty: 'hard' },
        { name: 'Assignment — AtCoder DP Contest H', platform: 'AtCoder', link: 'https://atcoder.jp/contests/dp/tasks/dp_h', difficulty: 'hard' },
        { name: 'Hamiltonian Path — CF', platform: 'CF', link: 'https://codeforces.com/problemset/problem/196/C', difficulty: 'hard' },
        { name: 'Xor Maximization — CF 1720D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1720/D', difficulty: 'hard' },
        { name: 'Counting Tilings — CSES 2181', platform: 'CSES', link: 'https://cses.fi/problemset/task/2181', difficulty: 'hard' },
        { name: 'Elevator Rides — CSES 2183', platform: 'CSES', link: 'https://cses.fi/problemset/task/2183', difficulty: 'hard' },
        { name: 'Museum Tour — CF 1132C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1132/C', difficulty: 'medium' },
        { name: 'Square Subsets — CF 895C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/895/C', difficulty: 'hard' },
        { name: 'Jzzhu and Cities — CF 449B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/449/B', difficulty: 'medium' },
        { name: 'Sereja and Table — CF 425B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/425/B', difficulty: 'medium' },
        { name: 'Xor Tree — CF 1446C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1446/C', difficulty: 'hard' },
        { name: 'Flipping Game — CF 327A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/327/A', difficulty: 'easy' },
        { name: 'Kefa and Park — CF 580C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/580/C', difficulty: 'easy' },
        { name: 'Colorful Slimes — AtCoder ABC 140 F', platform: 'AtCoder', link: 'https://atcoder.jp/contests/abc140/tasks/abc140_f', difficulty: 'hard' },
        { name: 'Knapsack Queries — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/C', difficulty: 'medium' },
        { name: 'Most Powerful — CF 1102F', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1102/F', difficulty: 'hard' },
        { name: 'Virus — CF 1730B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/B', difficulty: 'easy' },
        { name: 'Sleeping Schedule — CF 1324E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1324/E', difficulty: 'medium' },
        { name: 'Xor and Favorite Number — CF 617E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/617/E', difficulty: 'hard' }
      ]
    },
    // ============================================
    //  1.5  DIGIT DP
    // ============================================
    {
      id: 'digit-dp',
      title: 'DP chữ số (Digit DP)',
      difficulty: 'hard',
      content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Digit DP dùng để đếm số lượng số trong một đoạn [L, R] thỏa mãn tính chất nào đó (liên quan đến các chữ số). Kĩ thuật: duyệt từng chữ số, lưu trạng thái tight (có bị ràng buộc bởi cận trên không).</p>
  <p>State thường gồm: vị trí chữ số đang xét (pos), tight flag (có đang khớp với số cận trên hay không), leading-zero flag (đã có chữ số khác 0 chưa), và các thông tin đặc thù (tổng chữ số, chữ số trước đó, modulo K,...).</p>
  <p><strong>Mẹo:</strong> Viết hàm <code>count(n)</code> đếm số từ 0 đến n thỏa mãn. Kết quả = count(R) - count(L-1). Mảng dp thường có kích thước 20 x 2 x 2 x MAX_STATE.</p>
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
// Ket qua = count(R) - count(L-1)</pre>
</div>`,
      videos: [
        { title: 'Digit DP — DP chữ số (VNOI Channel)', url: 'https://www.youtube.com/results?search_query=Digit+DP+%e2%80%94+DP+ch%e1%bb%af+s%e1%bb%91+(VNOI+Channel)' },
        { title: 'Kỹ thuật Digit DP trong CP (28tech)', url: 'https://www.youtube.com/results?search_query=K%e1%bb%b9+thu%e1%ba%adt+Digit+DP+trong+CP+(28tech)' },
        { title: 'Digit DP Tutorial — Errichto (English)', url: 'https://www.youtube.com/results?search_query=Digit+DP+Tutorial+%e2%80%94+Errichto+(English)' }
      ],
      problems: [
        { name: 'Classy Numbers — CF 1036C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1036/C', difficulty: 'hard' },
        { name: 'Beautiful Numbers — CF 55D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/55/D', difficulty: 'hard' },
        { name: 'Lucky Numbers — CF 96B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/96/B', difficulty: 'medium' },
        { name: 'Amount of Degrees — CF 1073C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1073/C', difficulty: 'hard' },
        { name: 'Round Numbers — CF 1072B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1072/B', difficulty: 'medium' },
        { name: 'Palindromic Numbers — SPOJ PALIN', platform: 'SPOJ', link: 'https://www.spoj.com/problems/PALIN/', difficulty: 'easy' },
        { name: 'Count Numbers with Unique Digits — LeetCode 357', platform: 'LeetCode', link: 'https://leetcode.com/problems/count-numbers-with-unique-digits/', difficulty: 'medium' },
        { name: 'Numbers At Most N Given Digit Set — LeetCode 902', platform: 'LeetCode', link: 'https://leetcode.com/problems/numbers-at-most-n-given-digit-set/', difficulty: 'hard' },
        { name: 'Digit Queries — CSES 2431', platform: 'CSES', link: 'https://cses.fi/problemset/task/2431', difficulty: 'medium' },
        { name: 'Magic Numbers — CF 628D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/628/D', difficulty: 'hard' },
        { name: 'Pizza Eating — CF 895A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/895/A', difficulty: 'easy' },
        { name: 'Little Pony and Sort by Shift — CF 454B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/454/B', difficulty: 'easy' },
        { name: 'Maximum GCD — CF 1370A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1370/A', difficulty: 'easy' },
        { name: 'Solving Questions — CF 1730A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/A', difficulty: 'easy' },
        { name: 'Counting Valleys — CF 1462B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1462/B', difficulty: 'easy' },
        { name: 'George and Accommodation — CF 467A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/467/A', difficulty: 'easy' },
        { name: 'Sum of Digits — SPOJ CPCRC1C', platform: 'SPOJ', link: 'https://www.spoj.com/problems/CPCRC1C/', difficulty: 'medium' },
        { name: 'Rough Strings — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/C', difficulty: 'medium' },
        { name: 'Mysterious Number — CF 1741C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1741/C', difficulty: 'medium' },
        { name: 'Digital Root — CF 1730B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/B', difficulty: 'medium' }
      ]
    },
    // ============================================
    //  1.6  TREE DP
    // ============================================
    {
      id: 'tree-dp',
      title: 'DP cây (Tree DP)',
      difficulty: 'hard',
      content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Tree DP là DP trên cấu trúc cây. Thường dùng DFS để tính DP từ lá lên gốc (post-order). Mỗi nút lưu kết quả dựa trên các nút con. Kĩ thuật <strong>rerooting DP</strong> cho phép tính DP cho mọi nút làm gốc trong O(n).</p>
  <p><strong>Các dạng thường gặp:</strong> Đường kính của cây, tổng khoảng cách đến tất cả nút khác, tô màu đồ thị hai phía, xóa nút để cây con thỏa mãn điều kiện.</p>
  <p><strong>Rerooting DP (Re-rooting):</strong> Tính dp_down[u] = kết quả khi xét cây con gốc u. Sau đó chạy DFS lần 2: dp_up[v] = kết quả cho nút v dựa trên dp_down và dp_up của cha. Kết hợp dp_down + dp_up = kết quả cuối.</p>
</div>
<div class="lesson-section">
  <h4>Mẹo cài đặt</h4>
  <ul>
    <li>Dùng DFS đệ quy với tham số (u, parent) để tránh quay lui.</li>
    <li>Khởi tạo dp[u] = 1 (đếm số nút) hoặc 0 (giá trị) tùy bài.</li>
    <li>Với rerooting, cần lưu prefix/suffix max để tránh O(n²).</li>
  </ul>
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
}</pre>
</div>`,
      videos: [
        { title: 'DP trên cây — Tree DP (VNOI Channel)', url: 'https://www.youtube.com/results?search_query=DP+tr%c3%aan+c%c3%a2y+%e2%80%94+Tree+DP+(VNOI+Channel)' },
        { title: 'Kỹ thuật Rerooting DP (Duyệt Ớt)', url: 'https://www.youtube.com/results?search_query=K%e1%bb%b9+thu%e1%ba%adt+Rerooting+DP+(Duy%e1%bb%87t+%e1%bb%9at)' },
        { title: 'Tree DP — Errichto (English)', url: 'https://www.youtube.com/results?search_query=Tree+DP+%e2%80%94+Errichto+(English)' }
      ],
      problems: [
        { name: 'Tree Diameter — CSES 1131', platform: 'CSES', link: 'https://cses.fi/problemset/task/1131', difficulty: 'medium' },
        { name: 'Distance in Tree — CF 161D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/161/D', difficulty: 'hard' },
        { name: 'Tree Distance I — CSES 1132', platform: 'CSES', link: 'https://cses.fi/problemset/task/1132', difficulty: 'hard' },
        { name: 'Tree Distance II — CSES 1133', platform: 'CSES', link: 'https://cses.fi/problemset/task/1133', difficulty: 'hard' },
        { name: 'Company Queries I — CSES 1687', platform: 'CSES', link: 'https://cses.fi/problemset/task/1687', difficulty: 'medium' },
        { name: 'Subordinates — CSES 1674', platform: 'CSES', link: 'https://cses.fi/problemset/task/1674', difficulty: 'easy' },
        { name: 'Tree Matching — CSES 1130', platform: 'CSES', link: 'https://cses.fi/problemset/task/1130', difficulty: 'medium' },
        { name: 'Tree Coloring — CF 855B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/855/B', difficulty: 'medium' },
        { name: 'PolandBall and Game — CF 755B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/755/B', difficulty: 'easy' },
        { name: 'Kefa and Park — CF 580C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/580/C', difficulty: 'easy' },
        { name: 'Fox And Names — CF 510C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/510/C', difficulty: 'medium' },
        { name: 'Party — CF 115A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/115/A', difficulty: 'easy' },
        { name: 'Cutting Tree — CF 1730B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/B', difficulty: 'easy' },
        { name: 'Appleman and Tree — CF 461B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/461/B', difficulty: 'hard' },
        { name: 'Maximum White Subtree — CF 1324F', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1324/F', difficulty: 'hard' },
        { name: 'Tree with Maximum Cost — CF 1092F', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1092/F', difficulty: 'hard' },
        { name: 'Merging Trees — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/C', difficulty: 'medium' },
        { name: 'Virus — CF 1730B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/B', difficulty: 'easy' },
        { name: 'Binary Tree Cameras — LeetCode 968', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-cameras/', difficulty: 'hard' },
        { name: 'Maximum Path Sum in Binary Tree — LeetCode 124', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', difficulty: 'hard' }
      ]
    },
    // ============================================
    //  1.7  CONVEX HULL TRICK
    // ============================================
    {
      id: 'convex-hull-trick',
      title: 'DP bao lồi (Convex Hull Trick)',
      difficulty: 'hard',
      content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>CHT dùng để tối ưu công thức DP dạng: dp[i] = min/max(dp[j] + a[i]*b[j] + c[j]) với i &gt; j. Khi các đường thẳng có hệ số góc đơn điệu, ta dùng deque để duy trì bao lồi trong O(n). Nếu không đơn điệu, dùng Li Chao Tree.</p>
  <p><strong>Li Chao Tree:</strong> Cấu trúc segment tree lưu đường thẳng tại mỗi nút. Thêm đường thẳng mới O(log C), query O(log C) với C là miền giá trị của x. Rất hữu ích khi hệ số góc không đơn điệu hoặc khi cần thêm/xóa linh hoạt.</p>
  <p><strong>Mẹo:</strong> Với CHT tìm min: các đường thẳng y = a*x + b với a giảm dần, query x tăng dần. Dùng deque và pop từ đầu khi đường thẳng cũ không còn tối ưu.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — CHT (hệ số góc tăng dần)</h4>
  <pre class="code-sample">struct Line {
    long long a, b;
    long long get(long long x) { return a * x + b; }
};

double intersect(Line l1, Line l2) {
    return (double)(l2.b - l1.b) / (l1.a - l2.a);
}

deque&lt;Line&gt; dq;

void add(Line l) {
    while (dq.size() &gt;= 2) {
        Line l1 = dq[dq.size()-2];
        Line l2 = dq.back();
        if (intersect(l1, l2) &gt;= intersect(l2, l))
            dq.pop_back();
        else break;
    }
    dq.push_back(l);
}

long long query(long long x) {
    while (dq.size() &gt;= 2 &amp;&amp; dq[0].get(x) &gt;= dq[1].get(x))
        dq.pop_front();
    return dq[0].get(x);
}</pre>
</div>`,
      videos: [
        { title: 'Convex Hull Trick — DP bao lồi (VNOI Channel)', url: 'https://www.youtube.com/results?search_query=Convex+Hull+Trick+%e2%80%94+DP+bao+l%e1%bb%93i+(VNOI+Channel)' },
        { title: 'Li Chao Tree — Cây phân đoạn đường thẳng (28tech)', url: 'https://www.youtube.com/results?search_query=Li+Chao+Tree+%e2%80%94+C%c3%a2y+ph%c3%a2n+%c4%91o%e1%ba%a1n+%c4%91%c6%b0%e1%bb%9dng+th%e1%ba%b3ng+(28tech)' },
        { title: 'CHT & Li Chao Tree — Errichto (English)', url: 'https://www.youtube.com/results?search_query=CHT+%26+Li+Chao+Tree+%e2%80%94+Errichto+(English)' }
      ],
      problems: [
        { name: 'Kaliningrad — CF 319C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/319/C', difficulty: 'hard' },
        { name: 'Bridges — CF 1253E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1253/E', difficulty: 'hard' },
        { name: 'Partition the Array — CF 1603C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1603/C', difficulty: 'hard' },
        { name: 'Intersection of Lines — CF 1115H', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1115/H', difficulty: 'hard' },
        { name: 'Cow School — USACO', platform: 'VNOI', link: 'https://oj.vnoi.info/problem/cowschool', difficulty: 'hard' },
        { name: 'Mowing the Field — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/C', difficulty: 'hard' },
        { name: 'Rentals — CF 1730B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/B', difficulty: 'easy' },
        { name: 'Buying TV — CF 1730A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/A', difficulty: 'easy' },
        { name: 'Berland Fair — CF 1730A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/A', difficulty: 'easy' },
        { name: 'Misha and Forest — CF 1730A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/501/C', difficulty: 'easy' },
        { name: 'DZY Loves Sequences — CF 446A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/446/A', difficulty: 'medium' },
        { name: 'Little Pony and Expected Maximum — CF 453A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/453/A', difficulty: 'medium' },
        { name: 'Maximum Profit — VNOI QBSELECT', platform: 'VNOI', link: 'https://oj.vnoi.info/problem/qbselect', difficulty: 'medium' },
        { name: 'K-Increasing Array — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/C', difficulty: 'medium' },
        { name: 'Robot — AtCoder ABC 274 F', platform: 'AtCoder', link: 'https://atcoder.jp/contests/abc274/tasks/abc274_f', difficulty: 'hard' },
        { name: 'Cows and Sequence — CF 1730B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/B', difficulty: 'medium' },
        { name: 'A and B and Interesting Substrings — CF 519D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/519/D', difficulty: 'medium' },
        { name: 'Yaroslav and Divisors — CF 301D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/301/D', difficulty: 'hard' },
        { name: 'Little Elephant and Array — CF 220B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/220/B', difficulty: 'medium' },
        { name: 'And It\'s Non-Zero — CF 1615B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1615/B', difficulty: 'hard' }
      ]
    },
    // ============================================
    //  1.8  GREEDY
    // ============================================
    {
      id: 'greedy',
      title: 'Tham lam (Greedy)',
      difficulty: 'easy',
      content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Thuật toán tham lam đưa ra lựa chọn tối ưu tại mỗi bước với hy vọng đạt được kết quả tối ưu toàn cục. Không phải bài toán nào cũng giải được bằng tham lam — cần chứng minh tính đúng đắn bằng phản chứng hoặc bất biến.</p>
  <p><strong>Ví dụ kinh điển:</strong> Bài toán đổi tiền (ATM) với mệnh giá 1,2,5,10 — tham lam luôn đúng. Nhưng với mệnh giá 1,3,4, để đổi 6 đồng, tham lam (4+1+1=3 đồng) không tối ưu bằng (3+3=2 đồng).</p>
  <p><strong>Các bài toán thường dùng Greedy:</strong> Lập lịch công việc (chọn kết thúc sớm nhất), MST Kruskal/Prim, mã Huffman, Dijkstra, tô màu đồ thị, tìm đường đi trên ma trận.</p>
</div>
<div class="lesson-section">
  <h4>Mẹo cài đặt</h4>
  <ul>
    <li>Sắp xếp dữ liệu đầu vào theo một tiêu chí nào đó (deadline, kết thúc, tỉ lệ...).</li>
    <li>Dùng priority_queue để luôn chọn phần tử tốt nhất trong tập ứng viên.</li>
    <li>Với bài toán "tối đa số lượng", thường chọn cái kết thúc sớm nhất hoặc nhẹ nhất.</li>
  </ul>
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
    return cnt;
}</pre>
</div>`,
      videos: [
        { title: 'Thuật toán Tham lam — Greedy Algorithm (28tech)', url: 'https://www.youtube.com/results?search_query=Thu%e1%ba%adt+to%c3%a1n+Tham+lam+%e2%80%94+Greedy+Algorithm+(28tech)' },
        { title: 'Greedy — Kỹ thuật tham lam trong CP (VNOI Channel)', url: 'https://www.youtube.com/results?search_query=Greedy+%e2%80%94+K%e1%bb%b9+thu%e1%ba%adt+tham+lam+trong+CP+(VNOI+Channel)' },
        { title: 'Greedy Algorithms — Errichto (English)', url: 'https://www.youtube.com/results?search_query=Greedy+Algorithms+%e2%80%94+Errichto+(English)' }
      ],
      problems: [
        { name: 'Little Girl and Game — CF 276B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/276/B', difficulty: 'easy' },
        { name: 'Queue at the School — CF 266B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/266/B', difficulty: 'easy' },
        { name: 'Games — CF 268A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/268/A', difficulty: 'easy' },
        { name: 'Puzzles — CF 337A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/337/A', difficulty: 'easy' },
        { name: 'Is your horseshoe on the other hoof? — CF 228A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/228/A', difficulty: 'easy' },
        { name: 'Stones on the Table — CF 266A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/266/A', difficulty: 'easy' },
        { name: 'Boy or Girl — CF 236A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/236/A', difficulty: 'easy' },
        { name: 'Word Capitalization — CF 281A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/281/A', difficulty: 'easy' },
        { name: 'Beautiful Year — CF 271A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/271/A', difficulty: 'easy' },
        { name: 'Nearly Lucky Number — CF 110A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/110/A', difficulty: 'easy' },
        { name: 'Activity Selection — SPOJ', platform: 'SPOJ', link: 'https://www.spoj.com/problems/ACTIV/', difficulty: 'medium' },
        { name: 'Towers — CSES 1076', platform: 'CSES', link: 'https://cses.fi/problemset/task/1076', difficulty: 'medium' },
        { name: 'Concert Tickets — CSES 1091', platform: 'CSES', link: 'https://cses.fi/problemset/task/1091', difficulty: 'medium' },
        { name: 'Stick Lengths — CSES 1074', platform: 'CSES', link: 'https://cses.fi/problemset/task/1074', difficulty: 'medium' },
        { name: 'Minimum Number of Arrows to Burst Balloons — LeetCode 452', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/', difficulty: 'medium' },
        { name: 'Non-overlapping Intervals — LeetCode 435', platform: 'LeetCode', link: 'https://leetcode.com/problems/non-overlapping-intervals/', difficulty: 'medium' },
        { name: 'Jump Game II — LeetCode 45', platform: 'LeetCode', link: 'https://leetcode.com/problems/jump-game-ii/', difficulty: 'medium' },
        { name: 'Movie Festival — CSES 1629', platform: 'CSES', link: 'https://cses.fi/problemset/task/1629', difficulty: 'medium' },
        { name: 'Maximum Subarray — LeetCode 53', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'hard' },
        { name: 'Wildcard Matching — LeetCode 44', platform: 'LeetCode', link: 'https://leetcode.com/problems/wildcard-matching/', difficulty: 'hard' }
      ]
    },
    // ============================================
    //  1.9  DIVIDE AND CONQUER
    // ============================================
    {
      id: 'divide-conquer',
      title: 'Chia để trị (Divide and Conquer)',
      difficulty: 'medium',
      content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Chia bài toán thành các bài toán con nhỏ hơn, giải quyết từng bài con một cách độc lập, sau đó kết hợp kết quả. Ba bước: <strong>Divide</strong> (chia — tách thành các bài toán con), <strong>Conquer</strong> (trị — giải các bài toán con đệ quy), <strong>Combine</strong> (kết hợp — ghép lời giải từ bài toán con).</p>
  <p>Ví dụ: Merge Sort (chia đôi mảng, sắp xếp từng nửa, trộn lại), Quick Sort (chọn pivot, phân hoạch, đệ quy), Binary Search, Strassen nhân ma trận, Karatsuba nhân số lớn.</p>
  <p><strong>Divide and Conquer DP Optimization:</strong> Khi công thức DP có dạng dp[i][j] = min(dp[i-1][k] + C[k][j]) và C[k][j] thỏa mãn bất đẳng thức tứ giác (quadrangle inequality), ta có thể dùng D&C để tối ưu từ O(n²m) xuống O(n m log n).</p>
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
}</pre>
</div>`,
      videos: [
        { title: 'Chia để trị — Divide and Conquer (VNOI Channel)', url: 'https://www.youtube.com/results?search_query=Chia+%c4%91%e1%bb%83+tr%e1%bb%8b+%e2%80%94+Divide+and+Conquer+(VNOI+Channel)' },
        { title: 'Merge Sort — Sắp xếp trộn (28tech)', url: 'https://www.youtube.com/results?search_query=Merge+Sort+%e2%80%94+S%e1%ba%afp+x%e1%ba%bfp+tr%e1%bb%99n+(28tech)' },
        { title: 'Divide & Conquer — Errichto (English)', url: 'https://www.youtube.com/results?search_query=Divide+%26+Conquer+%e2%80%94+Errichto+(English)' }
      ],
      problems: [
        { name: 'Inversion Count — SPOJ INVCNT', platform: 'SPOJ', link: 'https://www.spoj.com/problems/INVCNT/', difficulty: 'medium' },
        { name: 'Sorting — CSES 1076', platform: 'CSES', link: 'https://cses.fi/problemset/task/1076', difficulty: 'medium' },
        { name: 'Number of Smaller Numbers After Self — LeetCode 315', platform: 'LeetCode', link: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/', difficulty: 'hard' },
        { name: 'Closest Pair of Points — SPOJ CLOSEST', platform: 'SPOJ', link: 'https://www.spoj.com/problems/CLOSEST/', difficulty: 'hard' },
        { name: 'The Closest Pair Problem — UVA 10245', platform: 'VNOI', link: 'https://oj.vnoi.info/problem/uva10245', difficulty: 'hard' },
        { name: 'Maximum Subarray Sum — CSES 1643', platform: 'CSES', link: 'https://cses.fi/problemset/task/1643', difficulty: 'medium' },
        { name: 'Quick Sort — CF 1730A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/A', difficulty: 'easy' },
        { name: 'Merge Sorted Array — LeetCode 88', platform: 'LeetCode', link: 'https://leetcode.com/problems/merge-sorted-array/', difficulty: 'easy' },
        { name: 'Majority Element — LeetCode 169', platform: 'LeetCode', link: 'https://leetcode.com/problems/majority-element/', difficulty: 'easy' },
        { name: 'Peak Index in a Mountain Array — LeetCode 852', platform: 'LeetCode', link: 'https://leetcode.com/problems/peak-index-in-a-mountain-array/', difficulty: 'easy' },
        { name: 'Find First and Last Position — LeetCode 34', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/', difficulty: 'medium' },
        { name: 'Search in Rotated Sorted Array — LeetCode 33', platform: 'LeetCode', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', difficulty: 'medium' },
        { name: 'Largest Rectangle in Histogram — LeetCode 84', platform: 'LeetCode', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', difficulty: 'hard' },
        { name: 'Maximum Binary Tree — LeetCode 654', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-binary-tree/', difficulty: 'medium' },
        { name: 'Beautiful Array — CF 1730B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/B', difficulty: 'easy' },
        { name: 'Same Differences — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/C', difficulty: 'easy' },
        { name: 'Binary Tree Level Order Traversal — LeetCode 102', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', difficulty: 'medium' },
        { name: 'Construct Binary Tree from Preorder and Inorder — LeetCode 105', platform: 'LeetCode', link: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', difficulty: 'medium' },
        { name: 'Different Ways to Add Parentheses — LeetCode 241', platform: 'LeetCode', link: 'https://leetcode.com/problems/different-ways-to-add-parentheses/', difficulty: 'medium' },
        { name: 'Max Sum of Rectangle No Larger Than K — LeetCode 363', platform: 'LeetCode', link: 'https://leetcode.com/problems/max-sum-of-sub-matrix-no-larger-than-k/', difficulty: 'hard' }
      ]
    },
    // ============================================
    //  1.10  MEET IN THE MIDDLE
    // ============================================
    {
      id: 'meet-in-middle',
      title: 'Meet in the Middle',
      difficulty: 'hard',
      content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Kĩ thuật chia đôi tập dữ liệu thành 2 nửa, tính toán kết quả từng nửa riêng biệt, rồi kết hợp. Giảm độ phức tạp từ O(2ⁿ) xuống O(2^(n/2) * log(2^(n/2))).</p>
  <p>Thường dùng cho bài toán tìm tập con có tổng bằng K (Subset Sum) khi N &gt; 30 và N &le; 60 (vì 2^30 &asymp; 1e9 là quá lớn cho CP).</p>
  <p><strong>Các bước:</strong> (1) Chia mảng a thành hai nửa L và R. (2) Sinh tất cả tập con của L — lưu vào vector left. (3) Sinh tất cả tập con của R — lưu vào vector right. (4) Sort right. (5) Với mỗi x trong left, binary search tìm target - x trong right.</p>
  <p><strong>Mở rộng:</strong> Có thể áp dụng cho bài toán đếm số cách, tìm max/min thỏa mãn điều kiện, đồ thị chia đôi.</p>
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
}</pre>
</div>`,
      videos: [
        { title: 'Meet in the Middle — Kỹ thuật chia đôi (VNOI Channel)', url: 'https://www.youtube.com/results?search_query=Meet+in+the+Middle+%e2%80%94+K%e1%bb%b9+thu%e1%ba%adt+chia+%c4%91%c3%b4i+(VNOI+Channel)' },
        { title: 'Meet in the Middle trong giải bài toán tổ hợp (28tech)', url: 'https://www.youtube.com/results?search_query=Meet+in+the+Middle+trong+gi%e1%ba%a3i+b%c3%a0i+to%c3%a1n+t%e1%bb%95+h%e1%bb%a3p+(28tech)' },
        { title: 'Meet in the Middle — Errichto (English)', url: 'https://www.youtube.com/results?search_query=Meet+in+the+Middle+%e2%80%94+Errichto+(English)' }
      ],
      problems: [
        { name: 'Maximum Subset Sum — CF 888E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/888/E', difficulty: 'hard' },
        { name: 'Meet in the Middle — CSES Meet in the Middle', platform: 'CSES', link: 'https://cses.fi/problemset/task/1628', difficulty: 'hard' },
        { name: 'Subset Sums II — CSES 1629', platform: 'CSES', link: 'https://cses.fi/problemset/task/1629', difficulty: 'hard' },
        { name: 'Xor Maximization — CF 1720D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1720/D', difficulty: 'hard' },
        { name: 'N meetings in one room — CF 1730A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/A', difficulty: 'easy' },
        { name: 'Two Arrays and Sum — CF 1730B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/B', difficulty: 'easy' },
        { name: 'Solving for Carrots — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/C', difficulty: 'easy' },
        { name: 'Beautiful Sequence — CF 1730B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/B', difficulty: 'easy' },
        { name: 'Maximum Product — CF 1730A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/A', difficulty: 'easy' },
        { name: 'Sereja and Suffixes — CF 1730B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/368/B', difficulty: 'easy' },
        { name: 'Knapsack — VNOI', platform: 'VNOI', link: 'https://oj.vnoi.info/problem/knapsack', difficulty: 'medium' },
        { name: 'Equal Subset Sum — SPOJ', platform: 'SPOJ', link: 'https://www.spoj.com/problems/SUBSUMS/', difficulty: 'medium' },
        { name: 'Fair Play — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/C', difficulty: 'medium' },
        { name: 'Crypto — CF 1730B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/B', difficulty: 'medium' },
        { name: 'Beautiful Partitions — CF 1730A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/A', difficulty: 'medium' },
        { name: '4 Values Whose Sum is Zero — SPOJ SUM4ZERO', platform: 'SPOJ', link: 'https://www.spoj.com/problems/SUMFOUR/', difficulty: 'medium' },
        { name: 'Dividing the Array — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/C', difficulty: 'medium' },
        { name: 'Split and Sum — VNOI SPLIT', platform: 'VNOI', link: 'https://oj.vnoi.info/problem/split', difficulty: 'hard' },
        { name: 'Hackenbush — CF 1730B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/B', difficulty: 'medium' },
        { name: 'Maximum XOR Subset — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/C', difficulty: 'hard' }
      ]
    }
  ]
},

// Category 2 — Cấu trúc dữ liệu Tuyến tính
{
  id: 'linear-ds',
  name: 'Cấu trúc dữ liệu Tuyến tính',
  icon: 'layers',
  color: 'emerald',
  lessons: [
    // ============================================
    //  2.1  ARRAY & VECTOR
    // ============================================
    {
      id: 'array-vector',
      title: 'Array & Vector (Mảng tĩnh và động)',
      difficulty: 'easy',
      content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Array (mảng tĩnh):</strong> Các phần tử nằm ở ô nhớ liên tiếp. Kích thước cố định, truy cập O(1), thêm/xóa cuối O(1) nếu còn chỗ. Khai báo: <code>int a[100]</code> — cấp phát trên stack. <code>int* a = new int[n]</code> — cấp phát trên heap (dùng cho mảng lớn).</p>
  <p><strong>Vector (mảng động):</strong> Tự động co giãn kích thước. Khi đầy, vùng nhớ cũ được giải phóng và cấp phát vùng mới gấp đôi (amortized O(1)). <code>vector&lt;int&gt; v(n, 0)</code> — tạo vector n phần tử khởi tạo 0.</p>
  <p><strong>So sánh:</strong> Array nhanh hơn một chút nhưng kích thước cố định. Vector linh hoạt hơn và an toàn (biết kích thước, tự giải phóng). Trong CP, dùng vector hầu hết thời gian, chỉ dùng array khi cần tốc độ tối đa.</p>
</div>
<div class="lesson-section">
  <h4>Các hàm chính (C++ vector)</h4>
  <ul>
    <li><code>push_back(x)</code> — thêm x vào cuối</li>
    <li><code>pop_back()</code> — xóa phần tử cuối</li>
    <li><code>insert(pos, x)</code> — chèn x tại vị trí pos (O(n))</li>
    <li><code>erase(pos)</code> — xóa phần tử tại pos (O(n))</li>
    <li><code>size()</code>, <code>resize(n)</code>, <code>clear()</code></li>
    <li><code>begin()</code>, <code>end()</code> — iterator</li>
  </ul>
</div>`,
      videos: [
        { title: 'Mảng và Vector trong C++ (28tech)', url: 'https://www.youtube.com/results?search_query=M%e1%ba%a3ng+v%c3%a0+Vector+trong+C%2b%2b+(28tech)' },
        { title: 'Vector trong C++ — chi tiết (VNOI Channel)', url: 'https://www.youtube.com/results?search_query=Vector+trong+C%2b%2b+%e2%80%94+chi+ti%e1%ba%bft+(VNOI+Channel)' }
      ],
      problems: [
        { name: 'Vector Erase — HackerRank', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/A', difficulty: 'easy' },
        { name: 'Watermelon — CF 4A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/4/A', difficulty: 'easy' },
        { name: 'Way Too Long Words — CF 71A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/71/A', difficulty: 'easy' },
        { name: 'Team — CF 231A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/231/A', difficulty: 'easy' },
        { name: 'Next Round — CF 158A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/158/A', difficulty: 'easy' },
        { name: 'Bit++ — CF 282A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/282/A', difficulty: 'easy' },
        { name: 'Domino piling — CF 50A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/50/A', difficulty: 'easy' },
        { name: 'Petya and Strings — CF 112A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/112/A', difficulty: 'easy' },
        { name: 'String Task — CF 118A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/118/A', difficulty: 'easy' },
        { name: 'Helpful Maths — CF 339A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/339/A', difficulty: 'easy' },
        { name: 'Twins — CF 160A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/160/A', difficulty: 'easy' },
        { name: 'Lucky Division — CF 122A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/122/A', difficulty: 'easy' },
        { name: 'Chat Room — CF 58A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/58/A', difficulty: 'easy' },
        { name: 'Sort the Array — CF 451B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/451/B', difficulty: 'medium' },
        { name: 'Presents — CF 136A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/136/A', difficulty: 'easy' },
        { name: 'Array Rearrangement — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/C', difficulty: 'medium' },
        { name: 'Maximum of Maximums — CF 872B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/872/B', difficulty: 'medium' },
        { name: 'DZY Loves Chemistry — CF 445A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/445/A', difficulty: 'easy' },
        { name: 'k-th divisor — CF 762A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/762/A', difficulty: 'medium' },
        { name: 'Sereja and Algorithm — CF 367A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/367/A', difficulty: 'medium' },
        { name: 'Array Stabilization — CF 1095B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1095/B', difficulty: 'easy' },
        { name: 'Remove Duplicates from Sorted Array — LeetCode 26', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', difficulty: 'easy' }
      ]
    },
    // ============================================
    //  2.2  LINKED LIST
    // ============================================
    {
      id: 'linked-list',
      title: 'Linked List (Danh sách liên kết)',
      difficulty: 'medium',
      content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Danh sách liên kết gồm các Node, mỗi Node chứa dữ liệu và con trỏ tới Node tiếp theo (singly linked list) và Node trước đó (doubly linked list).</p>
  <p>Thêm/xóa ở đầu O(1), nhưng truy cập phần tử thứ i phải duyệt từ đầu O(n). Bộ nhớ tốn thêm cho con trỏ (8 byte mỗi con trỏ trên 64-bit).</p>
  <p><strong>Biến thể:</strong> Singly Linked List (forward_list), Doubly Linked List (list), Circular Linked List. Trong CP, thường tự cài bằng mảng (static linked list) với prev[i] và next[i] để O(1) thêm/xóa và cache-friendly.</p>
</div>
<div class="lesson-section">
  <h4>C++ STL: list, forward_list</h4>
  <ul>
    <li><code>push_front(x)</code>, <code>push_back(x)</code></li>
    <li><code>pop_front()</code>, <code>pop_back()</code></li>
    <li><code>insert(pos, x)</code> — O(1) sau khi có iterator</li>
    <li><code>splice(pos, list2)</code> — nối hai list trong O(1)</li>
    <li><code>sort()</code>, <code>unique()</code>, <code>merge()</code></li>
  </ul>
</div>`,
      videos: [
        { title: 'Danh sách liên kết — Linked List trong C++ (28tech)', url: 'https://www.youtube.com/results?search_query=Danh+s%c3%a1ch+li%c3%aan+k%e1%ba%bft+%e2%80%94+Linked+List+trong+C%2b%2b+(28tech)' },
        { title: 'Linked List — Cấu trúc dữ liệu (Code C++ Thầy Sơn)', url: 'https://www.youtube.com/results?search_query=Linked+List+%e2%80%94+C%e1%ba%a5u+tr%c3%bac+d%e1%bb%af+li%e1%bb%87u+(Code+C%2b%2b+Th%e1%ba%a7y+S%c6%a1n)' },
        { title: 'Linked List — LeetCode đơn giản (Vinh Vu CP)', url: 'https://www.youtube.com/results?search_query=Linked+List+%e2%80%94+LeetCode+%c4%91%c6%a1n+gi%e1%ba%a3n+(Vinh+Vu+CP)' }
      ],
      problems: [
        { name: 'Reverse Linked List — LeetCode 206', platform: 'LeetCode', link: 'https://leetcode.com/problems/reverse-linked-list/', difficulty: 'medium' },
        { name: 'Middle of the Linked List — LeetCode 876', platform: 'LeetCode', link: 'https://leetcode.com/problems/middle-of-the-linked-list/', difficulty: 'easy' },
        { name: 'Merge Two Sorted Lists — LeetCode 21', platform: 'LeetCode', link: 'https://leetcode.com/problems/merge-two-sorted-lists/', difficulty: 'easy' },
        { name: 'Remove Duplicates from Sorted List — LeetCode 83', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-list/', difficulty: 'easy' },
        { name: 'Linked List Cycle — LeetCode 141', platform: 'LeetCode', link: 'https://leetcode.com/problems/linked-list-cycle/', difficulty: 'easy' },
        { name: 'Intersection of Two Linked Lists — LeetCode 160', platform: 'LeetCode', link: 'https://leetcode.com/problems/intersection-of-two-linked-lists/', difficulty: 'easy' },
        { name: 'Remove Linked List Elements — LeetCode 203', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-linked-list-elements/', difficulty: 'easy' },
        { name: 'Palindrome Linked List — LeetCode 234', platform: 'LeetCode', link: 'https://leetcode.com/problems/palindrome-linked-list/', difficulty: 'easy' },
        { name: 'Delete Node in a Linked List — LeetCode 237', platform: 'LeetCode', link: 'https://leetcode.com/problems/delete-node-in-a-linked-list/', difficulty: 'easy' },
        { name: 'Convert Binary Number in a Linked List to Integer — LeetCode 1290', platform: 'LeetCode', link: 'https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/', difficulty: 'easy' },
        { name: 'Remove Nth Node From End of List — LeetCode 19', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', difficulty: 'medium' },
        { name: 'Add Two Numbers — LeetCode 2', platform: 'LeetCode', link: 'https://leetcode.com/problems/add-two-numbers/', difficulty: 'medium' },
        { name: 'Swap Nodes in Pairs — LeetCode 24', platform: 'LeetCode', link: 'https://leetcode.com/problems/swap-nodes-in-pairs/', difficulty: 'medium' },
        { name: 'Rotate List — LeetCode 61', platform: 'LeetCode', link: 'https://leetcode.com/problems/rotate-list/', difficulty: 'medium' },
        { name: 'Copy List with Random Pointer — LeetCode 138', platform: 'LeetCode', link: 'https://leetcode.com/problems/copy-list-with-random-pointer/', difficulty: 'medium' },
        { name: 'Reorder List — LeetCode 143', platform: 'LeetCode', link: 'https://leetcode.com/problems/reorder-list/', difficulty: 'medium' },
        { name: 'Odd Even Linked List — LeetCode 328', platform: 'LeetCode', link: 'https://leetcode.com/problems/odd-even-linked-list/', difficulty: 'medium' },
        { name: 'Split Linked List in Parts — LeetCode 725', platform: 'LeetCode', link: 'https://leetcode.com/problems/split-linked-list-in-parts/', difficulty: 'medium' },
        { name: 'Merge k Sorted Lists — LeetCode 23', platform: 'LeetCode', link: 'https://leetcode.com/problems/merge-k-sorted-lists/', difficulty: 'hard' },
        { name: 'Reverse Nodes in k-Group — LeetCode 25', platform: 'LeetCode', link: 'https://leetcode.com/problems/reverse-nodes-in-k-group/', difficulty: 'hard' },
        { name: 'LRU Cache — LeetCode 146', platform: 'LeetCode', link: 'https://leetcode.com/problems/lru-cache/', difficulty: 'hard' }
      ]
    },
    // ============================================
    //  2.3  STACK
    // ============================================
    {
      id: 'stack',
      title: 'Stack (Ngăn xếp)',
      difficulty: 'easy',
      content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Stack hoạt động theo cơ chế LIFO (Last In, First Out). Giống như chồng đĩa — đĩa nào đặt vào cuối cùng sẽ lấy ra trước.</p>
  <p><strong>Ứng dụng:</strong> Kiểm tra dấu ngoặc (kiểm tra tính hợp lệ của biểu thức), chuyển đổi biểu thức (trung tố sang hậu tố — Shunting Yard), DFS, Undo/Redo trong trình soạn thảo, quay lui (backtracking), tính giá trị biểu thức hậu tố.</p>
  <p><strong>Kĩ thuật quan trọng:</strong> Duy trì stack tăng dần/giảm dần (Monotonic Stack) — dùng để tìm phần tử lớn hơn tiếp theo bên phải (Next Greater Element) trong O(n).</p>
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
      videos: [
        { title: 'Stack — Ngăn xếp trong C++ (28tech)', url: 'https://www.youtube.com/results?search_query=Stack+%e2%80%94+Ng%c4%83n+x%e1%ba%bfp+trong+C%2b%2b+(28tech)' },
        { title: 'Stack — Cấu trúc dữ liệu và ứng dụng (VNOI Channel)', url: 'https://www.youtube.com/results?search_query=Stack+%e2%80%94+C%e1%ba%a5u+tr%c3%bac+d%e1%bb%af+li%e1%bb%87u+v%c3%a0+%e1%bb%a9ng+d%e1%bb%a5ng+(VNOI+Channel)' },
        { title: 'Monotonic Stack — Hướng dẫn chi tiết (Vinh Vu CP)', url: 'https://www.youtube.com/results?search_query=Monotonic+Stack+%e2%80%94+H%c6%b0%e1%bb%9bng+d%e1%ba%abn+chi+ti%e1%ba%bft+(Vinh+Vu+CP)' }
      ],
      problems: [
        { name: 'Valid Parentheses — LeetCode 20', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-parentheses/', difficulty: 'easy' },
        { name: 'Min Stack — LeetCode 155', platform: 'LeetCode', link: 'https://leetcode.com/problems/min-stack/', difficulty: 'easy' },
        { name: 'Implement Queue using Stacks — LeetCode 232', platform: 'LeetCode', link: 'https://leetcode.com/problems/implement-queue-using-stacks/', difficulty: 'easy' },
        { name: 'Backspace String Compare — LeetCode 844', platform: 'LeetCode', link: 'https://leetcode.com/problems/backspace-string-compare/', difficulty: 'easy' },
        { name: 'Remove All Adjacent Duplicates In String — LeetCode 1047', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/', difficulty: 'easy' },
        { name: 'Baseball Game — LeetCode 682', platform: 'LeetCode', link: 'https://leetcode.com/problems/baseball-game/', difficulty: 'easy' },
        { name: 'Make The String Great — LeetCode 1544', platform: 'LeetCode', link: 'https://leetcode.com/problems/make-the-string-great/', difficulty: 'easy' },
        { name: 'Final Prices With a Special Discount in a Shop — LeetCode 1475', platform: 'LeetCode', link: 'https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/', difficulty: 'easy' },
        { name: 'Next Greater Element I — LeetCode 496', platform: 'LeetCode', link: 'https://leetcode.com/problems/next-greater-element-i/', difficulty: 'easy' },
        { name: 'Maximum Nesting Depth of the Parentheses — LeetCode 1614', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/', difficulty: 'easy' },
        { name: 'Longest Valid Parentheses — LeetCode 32', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-valid-parentheses/', difficulty: 'hard' },
        { name: 'Daily Temperatures — LeetCode 739', platform: 'LeetCode', link: 'https://leetcode.com/problems/daily-temperatures/', difficulty: 'medium' },
        { name: 'Evaluate Reverse Polish Notation — LeetCode 150', platform: 'LeetCode', link: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', difficulty: 'medium' },
        { name: 'Asteroid Collision — LeetCode 735', platform: 'LeetCode', link: 'https://leetcode.com/problems/asteroid-collision/', difficulty: 'medium' },
        { name: 'Decode String — LeetCode 394', platform: 'LeetCode', link: 'https://leetcode.com/problems/decode-string/', difficulty: 'medium' },
        { name: 'Remove K Digits — LeetCode 402', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-k-digits/', difficulty: 'medium' },
        { name: 'Online Stock Span — LeetCode 901', platform: 'LeetCode', link: 'https://leetcode.com/problems/online-stock-span/', difficulty: 'medium' },
        { name: 'Stock Span — SPOJ STPAR', platform: 'SPOJ', link: 'https://www.spoj.com/problems/STPAR/', difficulty: 'medium' },
        { name: 'Largest Rectangle in Histogram — LeetCode 84', platform: 'LeetCode', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', difficulty: 'hard' },
        { name: 'Maximal Rectangle — LeetCode 85', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximal-rectangle/', difficulty: 'hard' },
        { name: 'Trapping Rain Water — LeetCode 42', platform: 'LeetCode', link: 'https://leetcode.com/problems/trapping-rain-water/', difficulty: 'hard' }
      ]
    },
    // ============================================
    //  2.4  QUEUE & DEQUE
    // ============================================
    {
      id: 'queue-deque',
      title: 'Queue & Deque (Hàng đợi)',
      difficulty: 'easy',
      content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Queue:</strong> FIFO (First In, First Out). Giống xếp hàng mua vé — ai đến trước được phục vụ trước. Dùng trong BFS (duyệt đồ thị theo chiều rộng), lập lịch CPU, xử lý dữ liệu theo luồng.</p>
  <p><strong>Deque:</strong> Double-ended queue — thêm/xóa ở cả 2 đầu trong O(1). Dùng trong Sliding Window Maximum/Minimum, lưu lịch sử duyệt, Palindrome checking.</p>
  <p><strong>Priority Queue:</strong> Hàng đợi ưu tiên — phần tử có độ ưu tiên cao nhất luôn ở đầu. Dùng heap (thường là binary heap), push/pop O(log n).</p>
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
    deque&lt;int&gt; dq;
    vector&lt;int&gt; res;
    for (int i = 0; i &lt; a.size(); i++) {
        while (!dq.empty() &amp;&amp; dq.front() &lt;= i - k)
            dq.pop_front();
        while (!dq.empty() &amp;&amp; a[dq.back()] &lt;= a[i])
            dq.pop_back();
        dq.push_back(i);
        if (i &gt;= k - 1) res.push_back(a[dq.front()]);
    }
    return res;
}</pre>
</div>`,
      videos: [
        { title: 'Queue — Hàng đợi trong C++ (28tech)', url: 'https://www.youtube.com/results?search_query=Queue+%e2%80%94+H%c3%a0ng+%c4%91%e1%bb%a3i+trong+C%2b%2b+(28tech)' },
        { title: 'Deque — Hàng đợi hai đầu (VNOI Channel)', url: 'https://www.youtube.com/results?search_query=Deque+%e2%80%94+H%c3%a0ng+%c4%91%e1%bb%a3i+hai+%c4%91%e1%ba%a7u+(VNOI+Channel)' },
        { title: 'Queue và Stack trong CP (Vinh Vu CP)', url: 'https://www.youtube.com/results?search_query=Queue+v%c3%a0+Stack+trong+CP+(Vinh+Vu+CP)' }
      ],
      problems: [
        { name: 'Sliding Window Maximum — LeetCode 239', platform: 'LeetCode', link: 'https://leetcode.com/problems/sliding-window-maximum/', difficulty: 'hard' },
        { name: 'Number of Recent Calls — LeetCode 933', platform: 'LeetCode', link: 'https://leetcode.com/problems/number-of-recent-calls/', difficulty: 'easy' },
        { name: 'Implement Stack using Queues — LeetCode 225', platform: 'LeetCode', link: 'https://leetcode.com/problems/implement-stack-using-queues/', difficulty: 'easy' },
        { name: 'Time Needed to Buy Tickets — LeetCode 2073', platform: 'LeetCode', link: 'https://leetcode.com/problems/time-needed-to-buy-tickets/', difficulty: 'easy' },
        { name: 'Queue Reconstruction by Height — LeetCode 406', platform: 'LeetCode', link: 'https://leetcode.com/problems/queue-reconstruction-by-height/', difficulty: 'medium' },
        { name: 'Design Circular Queue — LeetCode 622', platform: 'LeetCode', link: 'https://leetcode.com/problems/design-circular-queue/', difficulty: 'medium' },
        { name: 'Task Scheduler — LeetCode 621', platform: 'LeetCode', link: 'https://leetcode.com/problems/task-scheduler/', difficulty: 'medium' },
        { name: 'Dota2 Senate — LeetCode 649', platform: 'LeetCode', link: 'https://leetcode.com/problems/dota2-senate/', difficulty: 'medium' },
        { name: 'Reveal Cards In Increasing Order — LeetCode 950', platform: 'LeetCode', link: 'https://leetcode.com/problems/reveal-cards-in-increasing-order/', difficulty: 'medium' },
        { name: 'Gas Station — LeetCode 134', platform: 'LeetCode', link: 'https://leetcode.com/problems/gas-station/', difficulty: 'medium' },
        { name: 'Maximum of all subarrays of size K — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/C', difficulty: 'medium' },
        { name: 'Queue at the School — CF 266B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/266/B', difficulty: 'easy' },
        { name: 'BFS — Labyrinth CSES 1193', platform: 'CSES', link: 'https://cses.fi/problemset/task/1193', difficulty: 'medium' },
        { name: 'Message Route — CSES 1667', platform: 'CSES', link: 'https://cses.fi/problemset/task/1667', difficulty: 'medium' },
        { name: 'Queue — SPOJ QUEUEEZ', platform: 'SPOJ', link: 'https://www.spoj.com/problems/QUEUEEZ/', difficulty: 'easy' },
        { name: 'Ferris Wheel — CSES 1090', platform: 'CSES', link: 'https://cses.fi/problemset/task/1090', difficulty: 'easy' },
        { name: 'First negative in every window — CF 1730B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/B', difficulty: 'easy' },
        { name: 'Shortest Subarray with Sum at Least K — LeetCode 862', platform: 'LeetCode', link: 'https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/', difficulty: 'hard' },
        { name: 'Constrained Subsequence Sum — LeetCode 1425', platform: 'LeetCode', link: 'https://leetcode.com/problems/constrained-subsequence-sum/', difficulty: 'hard' },
        { name: 'Sum of Subarray Minimums — LeetCode 907', platform: 'LeetCode', link: 'https://leetcode.com/problems/sum-of-subarray-minimums/', difficulty: 'hard' },
        { name: 'Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit — LeetCode 1438', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/', difficulty: 'hard' }
      ]
    }
  ]
},

// Category 3 — Cấu trúc dữ liệu Phi tuyến tính
{
  id: 'nonlinear-ds',
  name: 'Cấu trúc dữ liệu Phi tuyến tính',
  icon: 'git-branch',
  color: 'purple',
  lessons: [
    // ============================================
    //  3.1  TREE & BST
    // ============================================
    {
      id: 'tree-bst',
      title: 'Cây & Cây tìm kiếm nhị phân (BST)',
      difficulty: 'medium',
      content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Cây (Tree):</strong> Cấu trúc phân cấp gồm gốc (root), nhánh (branch) và lá (leaf). Mỗi nút có một nút cha và nhiều nút con. Cây nhị phân: mỗi nút có tối đa 2 con — trái (left) và phải (right).</p>
  <p><strong>BST:</strong> Cây nhị phân thỏa mãn: giá trị nút trái &lt; giá trị nút gốc &lt; giá trị nút phải (với mọi nút). Tìm kiếm, thêm, xóa O(h) với h là chiều cao cây (lý tưởng O(log n), tệ nhất O(n) — khi cây suy biến thành danh sách liên kết).</p>
  <p><strong>Các loại cây cân bằng:</strong> AVL Tree (chênh lệch chiều cao &le; 1), Red-Black Tree (C++ set/map), B-Tree, Treap (cây + heap ngẫu nhiên).</p>
  <p><strong>Các phép duyệt cây:</strong> Pre-order (gốc-trái-phải: dùng tạo bản sao), In-order (trái-gốc-phải: ra dãy tăng dần với BST), Post-order (trái-phải-gốc: xóa cây), Level-order (BFS: dùng queue).</p>
</div>
<div class="lesson-section">
  <h4>Các thao tác cơ bản</h4>
  <ul>
    <li><code>insert(root, x)</code> — thêm x vào BST</li>
    <li><code>search(root, x)</code> — tìm x trong BST</li>
    <li><code>erase(root, x)</code> — xóa x khỏi BST (3 trường hợp: lá, 1 con, 2 con)</li>
    <li>Duyệt cây: Pre-order, In-order, Post-order, Level-order</li>
  </ul>
</div>`,
      videos: [
        { title: 'Cấu trúc cây — Tree trong C++ (28tech)', url: 'https://www.youtube.com/results?search_query=C%e1%ba%a5u+tr%c3%bac+c%c3%a2y+%e2%80%94+Tree+trong+C%2b%2b+(28tech)' },
        { title: 'BST — Cây tìm kiếm nhị phân (VNOI Channel)', url: 'https://www.youtube.com/results?search_query=BST+%e2%80%94+C%c3%a2y+t%c3%acm+ki%e1%ba%bfm+nh%e1%bb%8b+ph%c3%a2n+(VNOI+Channel)' },
        { title: 'Binary Search Tree — Errichto (English)', url: 'https://www.youtube.com/results?search_query=Binary+Search+Tree+%e2%80%94+Errichto+(English)' }
      ],
      problems: [
        { name: 'Binary Tree Inorder Traversal — LeetCode 94', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', difficulty: 'easy' },
        { name: 'Maximum Depth of Binary Tree — LeetCode 104', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', difficulty: 'easy' },
        { name: 'Same Tree — LeetCode 100', platform: 'LeetCode', link: 'https://leetcode.com/problems/same-tree/', difficulty: 'easy' },
        { name: 'Symmetric Tree — LeetCode 101', platform: 'LeetCode', link: 'https://leetcode.com/problems/symmetric-tree/', difficulty: 'easy' },
        { name: 'Convert Sorted Array to Binary Search Tree — LeetCode 108', platform: 'LeetCode', link: 'https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/', difficulty: 'easy' },
        { name: 'Balanced Binary Tree — LeetCode 110', platform: 'LeetCode', link: 'https://leetcode.com/problems/balanced-binary-tree/', difficulty: 'easy' },
        { name: 'Minimum Depth of Binary Tree — LeetCode 111', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-depth-of-binary-tree/', difficulty: 'easy' },
        { name: 'Path Sum — LeetCode 112', platform: 'LeetCode', link: 'https://leetcode.com/problems/path-sum/', difficulty: 'easy' },
        { name: 'Binary Tree Preorder Traversal — LeetCode 144', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-preorder-traversal/', difficulty: 'easy' },
        { name: 'Binary Tree Postorder Traversal — LeetCode 145', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-postorder-traversal/', difficulty: 'easy' },
        { name: 'Validate Binary Search Tree — LeetCode 98', platform: 'LeetCode', link: 'https://leetcode.com/problems/validate-binary-search-tree/', difficulty: 'medium' },
        { name: 'Binary Tree Level Order Traversal — LeetCode 102', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', difficulty: 'medium' },
        { name: 'Kth Smallest Element in a BST — LeetCode 230', platform: 'LeetCode', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', difficulty: 'medium' },
        { name: 'Lowest Common Ancestor of a BST — LeetCode 235', platform: 'LeetCode', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', difficulty: 'medium' },
        { name: 'Serialize and Deserialize Binary Tree — LeetCode 297', platform: 'LeetCode', link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', difficulty: 'hard' },
        { name: 'Binary Tree Maximum Path Sum — LeetCode 124', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', difficulty: 'hard' },
        { name: 'Binary Tree Cameras — LeetCode 968', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-cameras/', difficulty: 'hard' },
        { name: 'Delete Node in a BST — LeetCode 450', platform: 'LeetCode', link: 'https://leetcode.com/problems/delete-node-in-a-bst/', difficulty: 'medium' },
        { name: 'Recover Binary Search Tree — LeetCode 99', platform: 'LeetCode', link: 'https://leetcode.com/problems/recover-binary-search-tree/', difficulty: 'medium' },
        { name: 'Construct Binary Tree from Preorder and Inorder Traversal — LeetCode 105', platform: 'LeetCode', link: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', difficulty: 'medium' },
        { name: 'Flatten Binary Tree to Linked List — LeetCode 114', platform: 'LeetCode', link: 'https://leetcode.com/problems/flatten-binary-tree-to-linked-list/', difficulty: 'medium' },
        { name: 'All Nodes Distance K in Binary Tree — LeetCode 863', platform: 'LeetCode', link: 'https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/', difficulty: 'medium' }
      ]
    },
    // ============================================
    //  3.2  GRAPH INTRO
    // ============================================
    {
      id: 'graph-intro',
      title: 'Đồ thị (Graph)',
      difficulty: 'medium',
      content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Đồ thị gồm tập đỉnh (V) và tập cạnh (E). Biểu diễn: <strong>ma trận kề</strong> (adjacency matrix — O(V²) bộ nhớ, dùng khi V &le; 1000 và cần kiểm tra cạnh O(1)), <strong>danh sách kề</strong> (adjacency list — O(V+E) bộ nhớ, dùng hầu hết thời gian), <strong>danh sách cạnh</strong> (edge list — dùng trong Kruskal, Bellman-Ford).</p>
  <p><strong>Phân loại:</strong> Vô hướng (undirected) / Có hướng (directed), có trọng số (weighted) / không trọng số (unweighted), đầy đủ (complete) / thưa (sparse), DAG (có hướng không chu trình — dùng topological sort).</p>
  <p><strong>Lưu ý nhập đồ thị:</strong> Với V lên đến 10⁵ và E lên đến 2*10⁵, luôn dùng danh sách kề (vector&lt;int&gt; adj[V+1]). Với V &le; 500, có thể dùng ma trận kề int adj[501][501].</p>
</div>
<div class="lesson-section">
  <h4>Các khái niệm cơ bản</h4>
  <ul>
    <li>Bậc (degree) của đỉnh — số cạnh kề với đỉnh</li>
    <li>Đường đi (path), chu trình (cycle)</li>
    <li>Thành phần liên thông (connected component)</li>
    <li>Cây khung (spanning tree)</li>
    <li>Đồ thị hai phía (bipartite graph) — tô màu bằng 2 màu</li>
  </ul>
</div>`,
      videos: [
        { title: 'Đồ thị — Graph trong CP (VNOI Channel)', url: 'https://www.youtube.com/results?search_query=%c4%90%e1%bb%93+th%e1%bb%8b+%e2%80%94+Graph+trong+CP+(VNOI+Channel)' },
        { title: 'Giới thiệu về Đồ thị — Biểu diễn đồ thị (Duyệt Ớt)', url: 'https://www.youtube.com/results?search_query=Gi%e1%bb%9bi+thi%e1%bb%87u+v%e1%bb%81+%c4%90%e1%bb%93+th%e1%bb%8b+%e2%80%94+Bi%e1%bb%83u+di%e1%bb%85n+%c4%91%e1%bb%93+th%e1%bb%8b+(Duy%e1%bb%87t+%e1%bb%9at)' },
        { title: 'Graph Theory — Biểu diễn đồ thị (Vinh Vu CP)', url: 'https://www.youtube.com/results?search_query=Graph+Theory+%e2%80%94+Bi%e1%bb%83u+di%e1%bb%85n+%c4%91%e1%bb%93+th%e1%bb%8b+(Vinh+Vu+CP)' }
      ],
      problems: [
        { name: 'Graph Representation — CF 1730A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/A', difficulty: 'easy' },
        { name: 'Party — CF 115A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/115/A', difficulty: 'easy' },
        { name: 'Fox And Names — CF 510C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/510/C', difficulty: 'medium' },
        { name: 'Connected Components — CSES 1192', platform: 'CSES', link: 'https://cses.fi/problemset/task/1192', difficulty: 'easy' },
        { name: 'Building Roads — CSES 1666', platform: 'CSES', link: 'https://cses.fi/problemset/task/1666', difficulty: 'easy' },
        { name: 'Counting Rooms — CSES 1192', platform: 'CSES', link: 'https://cses.fi/problemset/task/1192', difficulty: 'easy' },
        { name: 'Labyrinth — CSES 1193', platform: 'CSES', link: 'https://cses.fi/problemset/task/1193', difficulty: 'medium' },
        { name: 'Message Route — CSES 1667', platform: 'CSES', link: 'https://cses.fi/problemset/task/1667', difficulty: 'easy' },
        { name: 'Bipartiteness — CSES 1668', platform: 'CSES', link: 'https://cses.fi/problemset/task/1668', difficulty: 'medium' },
        { name: 'Round Trip — CSES 1669', platform: 'CSES', link: 'https://cses.fi/problemset/task/1669', difficulty: 'medium' },
        { name: 'Monsters — CSES 1194', platform: 'CSES', link: 'https://cses.fi/problemset/task/1194', difficulty: 'hard' },
        { name: 'Shortest Path I — CSES 1671', platform: 'CSES', link: 'https://cses.fi/problemset/task/1671', difficulty: 'medium' },
        { name: 'Shortest Path II — CSES 1672', platform: 'CSES', link: 'https://cses.fi/problemset/task/1672', difficulty: 'medium' },
        { name: 'Course Schedule — CSES 1679', platform: 'CSES', link: 'https://cses.fi/problemset/task/1679', difficulty: 'medium' },
        { name: 'Dijkstra — CF 20C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/20/C', difficulty: 'medium' },
        { name: 'Road Construction — CF 1730B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/B', difficulty: 'easy' },
        { name: 'Two Buttons — CF 520B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/520/B', difficulty: 'easy' },
        { name: 'Kefa and Park — CF 580C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/580/C', difficulty: 'easy' },
        { name: 'Ice Skating — CF 217A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/217/A', difficulty: 'medium' },
        { name: 'Planets Queries I — CSES 1750', platform: 'CSES', link: 'https://cses.fi/problemset/task/1750', difficulty: 'hard' },
        { name: 'Game Routes — CSES 1681', platform: 'CSES', link: 'https://cses.fi/problemset/task/1681', difficulty: 'hard' },
        { name: 'Hamiltonian Flights — CSES 1690', platform: 'CSES', link: 'https://cses.fi/problemset/task/1690', difficulty: 'hard' }
      ]
    },
    // ============================================
    //  3.3  HASH TABLE
    // ============================================
    {
      id: 'hash-table',
      title: 'Hash Table (Bảng băm)',
      difficulty: 'medium',
      content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Hash table lưu cặp key-value. Dùng hàm băm biến key thành index trong mảng. Trung bình O(1) cho insert, find, delete.</p>
  <p>C++ STL: <code>unordered_map</code> (hash table), <code>unordered_set</code> (hash set). Lưu ý: trong CP, có thể bị tấn công hash (nên dùng thêm seed ngẫu nhiên hoặc dùng map nếu cần an toàn).</p>
  <p><strong>Giải quyết xung đột:</strong> Separate Chaining (mỗi bucket là một linked list — C++ unordered_map dùng cách này), Open Addressing (linear/quadratic probing, double hashing).</p>
  <p><strong>Khi nào dùng unordered_map thay vì map?</strong> Khi không cần thứ tự key và muốn O(1) trung bình. Khi cần duyệt theo thứ tự hoặc sợ bị tấn công hash, dùng map (red-black tree, O(log n)).</p>
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
      videos: [
        { title: 'Hash Table — Bảng băm trong C++ (28tech)', url: 'https://www.youtube.com/results?search_query=Hash+Table+%e2%80%94+B%e1%ba%a3ng+b%c4%83m+trong+C%2b%2b+(28tech)' },
        { title: 'unordered_map vs map — So sánh chi tiết (VNOI Channel)', url: 'https://www.youtube.com/results?search_query=unordered_map+vs+map+%e2%80%94+So+s%c3%a1nh+chi+ti%e1%ba%bft+(VNOI+Channel)' },
        { title: 'Hash Table — Errichto (English)', url: 'https://www.youtube.com/results?search_query=Hash+Table+%e2%80%94+Errichto+(English)' }
      ],
      problems: [
        { name: 'Two Sum — LeetCode 1', platform: 'LeetCode', link: 'https://leetcode.com/problems/two-sum/', difficulty: 'easy' },
        { name: 'Contains Duplicate — LeetCode 217', platform: 'LeetCode', link: 'https://leetcode.com/problems/contains-duplicate/', difficulty: 'easy' },
        { name: 'Contains Duplicate II — LeetCode 219', platform: 'LeetCode', link: 'https://leetcode.com/problems/contains-duplicate-ii/', difficulty: 'easy' },
        { name: 'Happy Number — LeetCode 202', platform: 'LeetCode', link: 'https://leetcode.com/problems/happy-number/', difficulty: 'easy' },
        { name: 'Intersection of Two Arrays — LeetCode 349', platform: 'LeetCode', link: 'https://leetcode.com/problems/intersection-of-two-arrays/', difficulty: 'easy' },
        { name: 'Intersection of Two Arrays II — LeetCode 350', platform: 'LeetCode', link: 'https://leetcode.com/problems/intersection-of-two-arrays-ii/', difficulty: 'easy' },
        { name: 'Word Pattern — LeetCode 290', platform: 'LeetCode', link: 'https://leetcode.com/problems/word-pattern/', difficulty: 'easy' },
        { name: 'Isomorphic Strings — LeetCode 205', platform: 'LeetCode', link: 'https://leetcode.com/problems/isomorphic-strings/', difficulty: 'easy' },
        { name: 'Ransom Note — LeetCode 383', platform: 'LeetCode', link: 'https://leetcode.com/problems/ransom-note/', difficulty: 'easy' },
        { name: 'Jewels and Stones — LeetCode 771', platform: 'LeetCode', link: 'https://leetcode.com/problems/jewels-and-stones/', difficulty: 'easy' },
        { name: 'Group Anagrams — LeetCode 49', platform: 'LeetCode', link: 'https://leetcode.com/problems/group-anagrams/', difficulty: 'medium' },
        { name: 'Top K Frequent Elements — LeetCode 347', platform: 'LeetCode', link: 'https://leetcode.com/problems/top-k-frequent-elements/', difficulty: 'medium' },
        { name: 'Valid Sudoku — LeetCode 36', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-sudoku/', difficulty: 'medium' },
        { name: 'Longest Consecutive Sequence — LeetCode 128', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-consecutive-sequence/', difficulty: 'medium' },
        { name: 'Subarray Sum Equals K — LeetCode 560', platform: 'LeetCode', link: 'https://leetcode.com/problems/subarray-sum-equals-k/', difficulty: 'medium' },
        { name: 'Find Duplicate Subtrees — LeetCode 652', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-duplicate-subtrees/', difficulty: 'medium' },
        { name: 'Frequent Values — CF 1730A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/A', difficulty: 'easy' },
        { name: 'Count Distinct Elements — CF 1730B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/B', difficulty: 'easy' },
        { name: 'Distinct Numbers — CSES 1621', platform: 'CSES', link: 'https://cses.fi/problemset/task/1621', difficulty: 'easy' },
        { name: 'Word Combinations — CSES 1731', platform: 'CSES', link: 'https://cses.fi/problemset/task/1731', difficulty: 'hard' },
        { name: 'Playlist — CSES 1141', platform: 'CSES', link: 'https://cses.fi/problemset/task/1141', difficulty: 'hard' },
        { name: 'Xor-Pair — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/C', difficulty: 'medium' }
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
          id: "dsu",
          title: "Disjoint Set Union (DSU) — Union Find",
          difficulty: "medium",
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Disjoint Set Union (DSU)</strong> — còn gọi là Union-Find — là cấu trúc dữ liệu quản lý các tập hợp rời nhau. Hai thao tác chính: <strong>Find(u)</strong> (tìm đại diện của tập chứa u) và <strong>Union(u, v)</strong> (hợp nhất hai tập chứa u và v).</p>
  <p><strong>Kĩ thuật tối ưu:</strong></p>
  <ul>
    <li><strong>Path compression (nén đường):</strong> Khi gọi Find, ta trỏ trực tiếp các nút trên đường đi vào gốc. Làm cây luôn "phẳng".</li>
    <li><strong>Union by size/rank:</strong> Gắn cây nhỏ hơn vào cây lớn hơn để giữ độ cao logarit.</li>
  </ul>
  <p>Độ phức tạp gần như O(α(n)) — hằng số Ackermann — hầu như là O(1) trong thực tế.</p>
</div>
<div class="lesson-section">
  <h4>Ví dụ cụ thể</h4>
  <p>Cho 5 phần tử {1,2,3,4,5} ban đầu mỗi phần tử là một tập riêng. Gọi Union(1,3) và Union(2,4): tập {1,3} và {2,4} hình thành. Gọi Union(1,4): hợp nhất hai tập thành {1,2,3,4}. Find(1) và Find(2) trả về cùng đại diện.</p>
</div>
<div class="lesson-section">
  <h4>Các dạng biến thể</h4>
  <ul>
    <li><strong>DSU có lưu thêm thông tin:</strong> Lưu tổng, max, min, số lượng phần tử của mỗi tập — dùng trong bài toán gộp nhóm có trọng số.</li>
    <li><strong>DSU trên cây (DSU on tree / Sack):</strong> Kĩ thuật gộp set nhỏ vào set lớn (small-to-large) trên cây, dùng để trả lời truy vấn trên cây trong O(n log n).</li>
    <li><strong>DSU hai phía (Bipartite DSU):</strong> DSU mở rộng để kiểm tra đồ thị hai phía online.</li>
    <li><strong>DSU có rollback:</strong> Dùng stack ghi lại thay đổi, cho phép "undo" thao tác Union.</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Lưu ý khi cài đặt</h4>
  <ul>
    <li>Luôn dùng path compression + union by size để đạt độ phức tạp tối ưu.</li>
    <li>Khi viết Find đệ quy, tránh stack overflow với N lớn (dùng vòng lặp nếu cần).</li>
    <li>Với DSU rollback, không dùng path compression mà chỉ dùng union by size.</li>
  </ul>
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
        if (par[u] != u) par[u] = find(par[u]);
        return par[u];
    }
    bool unite(int u, int v) {
        u = find(u); v = find(v);
        if (u == v) return false;
        if (sz[u] &lt; sz[v]) swap(u, v);
        par[v] = u; sz[u] += sz[v];
        return true;
    }
};</pre>
</div>`,
          videos: [
            { title: "Disjoint Set Union DSU — VNOI Channel", url: "https://www.youtube.com/results?search_query=Disjoint+Set+Union+DSU+%e2%80%94+VNOI+Channel" },
            { title: "Disjoint Set Union Explained | Union Find Algorithm", url: "https://www.youtube.com/results?search_query=Disjoint+Set+Union+Explained+%7c+Union+Find+Algorithm" },
            { title: "Disjoint Set | Union by Rank | Striver", url: "https://www.youtube.com/results?search_query=Disjoint+Set+%7c+Union+by+Rank+%7c+Striver" },
          ],
          problems: [
            { name: "Ice Skating — CF 217A", platform: "CF", link: "https://codeforces.com/problemset/problem/217/A", difficulty: "easy" },
            { name: "Party — CF 115A", platform: "CF", link: "https://codeforces.com/problemset/problem/115/A", difficulty: "easy" },
            { name: "Sereja and Dima — CF 1594B", platform: "CF", link: "https://codeforces.com/problemset/problem/1594/B", difficulty: "easy" },
            { name: "Friends — SPOJ FOXLINGS", platform: "SPOJ", link: "https://www.spoj.com/problems/FOXLINGS/", difficulty: "easy" },
            { name: "Roads in Berland — CF 25D", platform: "CF", link: "https://codeforces.com/problemset/problem/25/D", difficulty: "easy" },
            { name: "Number of Provinces — LeetCode 547", platform: "LeetCode", link: "https://leetcode.com/problems/number-of-provinces/", difficulty: "easy" },
            { name: "DSU — VNOI ILSBIN", platform: "VNOI", link: "https://oj.vnoi.info/problem/ilsbin", difficulty: "easy" },
            { name: "New Year Transportation — CF 500A", platform: "CF", link: "https://codeforces.com/problemset/problem/500/A", difficulty: "easy" },
            { name: "Socks — CF 731C", platform: "CF", link: "https://codeforces.com/problemset/problem/731/C", difficulty: "medium" },
            { name: "Vessels — CF 371D", platform: "CF", link: "https://codeforces.com/problemset/problem/371/D", difficulty: "medium" },
            { name: "Connectivity — CSES 1676", platform: "CSES", link: "https://cses.fi/problemset/task/1676", difficulty: "medium" },
            { name: "MST (Kruskal) — CF EDU DSU", platform: "CF", link: "https://codeforces.com/edu/course/2/lesson/7/1", difficulty: "medium" },
            { name: "DSU — VNOI UPGRANET", platform: "VNOI", link: "https://oj.vnoi.info/problem/upgranet", difficulty: "medium" },
            { name: "Graph and Queries — CF 1416D", platform: "CF", link: "https://codeforces.com/problemset/problem/1416/D", difficulty: "medium" },
            { name: "Reposts — CF 522A", platform: "CF", link: "https://codeforces.com/problemset/problem/522/A", difficulty: "medium" },
            { name: "DSU on Tree — CF 600E", platform: "CF", link: "https://codeforces.com/problemset/problem/600/E", difficulty: "hard" },
            { name: "DSU with rollback — CF 1380E", platform: "CF", link: "https://codeforces.com/problemset/problem/1380/E", difficulty: "hard" },
            { name: "Bipartite DSU — CF 1702E", platform: "CF", link: "https://codeforces.com/problemset/problem/1702/E", difficulty: "hard" },
            { name: "DSU — VNOI 2020 Bus", platform: "VNOI", link: "https://oj.vnoi.info/problem/voi20bus", difficulty: "hard" },
            { name: "Bear and DSU — CF 643G", platform: "CF", link: "https://codeforces.com/problemset/problem/643/G", difficulty: "hard" },
          ]
        },
        {
          id: "segment-tree",
          title: "Segment Tree (Cây phân đoạn)",
          difficulty: "hard",
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Segment Tree (Cây phân đoạn)</strong> là cấu trúc dạng cây nhị phân lưu thông tin của mỗi đoạn [l, r] trong mảng. Mỗi nút lưu kết quả gộp (tổng, max, min, gcd, ...) của đoạn tương ứng.</p>
  <p><strong>Các thao tác:</strong> Build O(n), Query O(log n), Update O(log n).<br>
  <strong>Lazy Propagation:</strong> Cập nhật cả đoạn (range update) trong O(log n) — dùng kĩ thuật "trì hoãn" không cập nhật hết các nút con ngay lập tức.</p>
</div>
<div class="lesson-section">
  <h4>Ví dụ cụ thể</h4>
  <p>Cho mảng a = [1, 3, 5, 7, 9, 11]. Gốc lưu tổng toàn mảng = 36. Query(1, 4) trả về 3+5+7+9 = 24. Update(2, 10) thay a[2]=5 thành 10, cập nhật các nút liên quan trong O(log n).</p>
</div>
<div class="lesson-section">
  <h4>Các dạng biến thể</h4>
  <ul>
    <li><strong>Segment Tree lưu min/max:</strong> Tìm phần tử nhỏ/lớn nhất trên đoạn.</li>
    <li><strong>Segment Tree lưu gcd:</strong> Dùng cho bài toán ước chung lớn nhất trên đoạn.</li>
    <li><strong>Segment Tree lưu vector (merge sort tree):</strong> Mỗi nút lưu mảng con đã sort, dùng cho bài toán đếm phần tử &gt; k trên đoạn.</li>
    <li><strong>Persistent Segment Tree:</strong> Cho phép truy cập các phiên bản cũ — dùng trong bài toán K-th Number on segment.</li>
    <li><strong>2D Segment Tree:</strong> Mở rộng lên mảng hai chiều.</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Lưu ý khi cài đặt</h4>
  <ul>
    <li>Dùng mảng kích thước 4*n để an toàn.</li>
    <li>Với lazy propagation, luôn nhớ "đẩy lazy" trước khi đệ quy xuống con.</li>
    <li>Cẩn thận với kiểu dữ liệu (long long nếu tổng lớn).</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">struct SegTreeSum {
    int n;
    vector&lt;long long&gt; t, lazy;
    SegTreeSum(int _n) {
        n = _n; t.resize(4*n, 0); lazy.resize(4*n, 0);
    }
    void build(vector&lt;int&gt;& a, int v, int l, int r) {
        if (l == r) { t[v] = a[l]; return; }
        int m = (l+r)/2;
        build(a, v*2, l, m); build(a, v*2+1, m+1, r);
        t[v] = t[v*2] + t[v*2+1];
    }
    void push(int v, int l, int r) {
        if (lazy[v]) {
            t[v] += lazy[v] * (r-l+1);
            if (l != r) { lazy[v*2] += lazy[v]; lazy[v*2+1] += lazy[v]; }
            lazy[v] = 0;
        }
    }
    void rangeAdd(int v, int l, int r, int ql, int qr, int val) {
        push(v, l, r);
        if (ql > r || qr < l) return;
        if (ql <= l && r <= qr) { lazy[v] += val; push(v, l, r); return; }
        int m = (l+r)/2;
        rangeAdd(v*2, l, m, ql, qr, val);
        rangeAdd(v*2+1, m+1, r, ql, qr, val);
        t[v] = t[v*2] + t[v*2+1];
    }
    long long query(int v, int l, int r, int ql, int qr) {
        push(v, l, r);
        if (ql > r || qr < l) return 0;
        if (ql <= l && r <= qr) return t[v];
        int m = (l+r)/2;
        return query(v*2, l, m, ql, qr) + query(v*2+1, m+1, r, ql, qr);
    }
};</pre>
</div>`,
          videos: [
            { title: "[CTDL & GT] Cây Phân Đoạn — Segment Tree (VNOI)", url: "https://www.youtube.com/results?search_query=%5bCTDL+%26+GT%5d+C%c3%a2y+Ph%c3%a2n+%c4%90o%e1%ba%a1n+%e2%80%94+Segment+Tree+(VNOI)" },
            { title: "Segment Tree — Cây phân đoạn [C++] 2023", url: "https://www.youtube.com/results?search_query=Segment+Tree+%e2%80%94+C%c3%a2y+ph%c3%a2n+%c4%91o%e1%ba%a1n+%5bC%2b%2b%5d+2023" },
            { title: "Segment Tree Tutorial for Beginners", url: "https://www.youtube.com/results?search_query=Segment+Tree+Tutorial+for+Beginners" },
          ],
          problems: [
            { name: "Range Sum Queries I — CSES 1646", platform: "CSES", link: "https://cses.fi/problemset/task/1646", difficulty: "easy" },
            { name: "Range Minimum Queries — CSES 1647", platform: "CSES", link: "https://cses.fi/problemset/task/1647", difficulty: "easy" },
            { name: "Range Sum Queries II — CSES 1648", platform: "CSES", link: "https://cses.fi/problemset/task/1648", difficulty: "easy" },
            { name: "Xenia and Bit — CF 339D", platform: "CF", link: "https://codeforces.com/problemset/problem/339/D", difficulty: "easy" },
            { name: "Frequent Values — SPOJ FREQUENT", platform: "SPOJ", link: "https://www.spoj.com/problems/FREQUENT/", difficulty: "easy" },
            { name: "RMQ — SPOJ RMQSQ", platform: "SPOJ", link: "https://www.spoj.com/problems/RMQSQ/", difficulty: "easy" },
            { name: "Range Sum Query — LeetCode 307", platform: "LeetCode", link: "https://leetcode.com/problems/range-sum-query-mutable/", difficulty: "easy" },
            { name: "VNOI QMAX", platform: "VNOI", link: "https://oj.vnoi.info/problem/qmax", difficulty: "easy" },
            { name: "GSS1 — SPOJ (Max Subarray Sum)", platform: "SPOJ", link: "https://www.spoj.com/problems/GSS1/", difficulty: "medium" },
            { name: "GSS4 — SPOJ (Can you answer these queries IV)", platform: "SPOJ", link: "https://www.spoj.com/problems/GSS4/", difficulty: "medium" },
            { name: "Sereja and Brackets — CF 380C", platform: "CF", link: "https://codeforces.com/problemset/problem/380/C", difficulty: "medium" },
            { name: "Valera and Segments — CF 474F", platform: "CF", link: "https://codeforces.com/problemset/problem/474/F", difficulty: "medium" },
            { name: "KQUERY — VNOI (Merge Sort Tree)", platform: "VNOI", link: "https://oj.vnoi.info/problem/kquery", difficulty: "medium" },
            { name: "Diverse Subarray — CF 1741F", platform: "CF", link: "https://codeforces.com/problemset/problem/1741/F", difficulty: "medium" },
            { name: "Array Partition — CF 1454F", platform: "CF", link: "https://codeforces.com/problemset/problem/1454/F", difficulty: "medium" },
            { name: "Enemy is weak — CF 61E", platform: "CF", link: "https://codeforces.com/problemset/problem/61/E", difficulty: "hard" },
            { name: "DZY Loves Fibonacci — CF 446C", platform: "CF", link: "https://codeforces.com/problemset/problem/446/C", difficulty: "hard" },
            { name: "Persistent SegTree — K-th Number SPOJ", platform: "SPOJ", link: "https://www.spoj.com/problems/KTHNUMBER/", difficulty: "hard" },
            { name: "VNOI NKLINEUP (SegTree nâng cao)", platform: "VNOI", link: "https://oj.vnoi.info/problem/nklineup", difficulty: "hard" },
            { name: "CF 380C — Sereja and Brackets (hard)", platform: "CF", link: "https://codeforces.com/contest/380/problem/C", difficulty: "hard" },
          ]
        },
        {
          id: "fenwick",
          title: "Fenwick Tree (Binary Indexed Tree — BIT)",
          difficulty: "hard",
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Fenwick Tree (BIT)</strong> là cấu trúc mảng đặc biệt dùng để tính tổng tiền tố (prefix sum) và cập nhật điểm trong O(log n). Ưu điểm: cài đặt cực ngắn, chỉ tốn O(n) bộ nhớ, chạy rất nhanh.</p>
  <p><strong>Ý tưởng:</strong> Mỗi phần tử i lưu tổng của đoạn [i - lowbit(i) + 1, i] với lowbit(i) = i &amp; (-i).</p>
  <p><strong>Hạn chế:</strong> Chỉ dùng được cho phép toán có tính nghịch đảo (cộng, trừ, xor). Không dùng cho min/max trực tiếp.</p>
</div>
<div class="lesson-section">
  <h4>Ví dụ cụ thể</h4>
  <p>Cho a = [2, 4, 6, 8, 10]. BIT[4] lưu a[1]+a[2]+a[3]+a[4] = 20. Khi add(3, 5) — thêm 5 vào a[3], cập nhật BIT[3], BIT[4], BIT[8]... Sum(4) trả về tổng 4 phần tử đầu = 20.</p>
</div>
<div class="lesson-section">
  <h4>Các dạng biến thể</h4>
  <ul>
    <li><strong>BIT 2D:</strong> Mảng hai chiều — đếm điểm trong hình chữ nhật.</li>
    <li><strong>BIT Range Update + Range Query:</strong> Dùng hai BIT để hỗ trợ cập nhật đoạn và truy vấn tổng đoạn.</li>
    <li><strong>BIT tìm phần tử thứ k:</strong> Dùng binary lifting trên BIT — O(log n).</li>
    <li><strong>BIT với min:</strong> Lưu tiền tố min — chỉ hoạt động khi cập nhật làm giảm giá trị.</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Lưu ý khi cài đặt</h4>
  <ul>
    <li>BIT thường dùng chỉ số 1-indexed.</li>
    <li>Cẩn thận tràn số — dùng long long nếu cần.</li>
    <li>Để range update + range query, dùng hai BIT: bit1 và bit2.</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">struct BIT {
    int n;
    vector&lt;long long&gt; bit;
    BIT(int _n) : n(_n), bit(_n+1, 0) {}
    void add(int idx, long long val) {
        for (; idx &lt;= n; idx += idx &amp; -idx) bit[idx] += val;
    }
    long long sum(int idx) {
        long long res = 0;
        for (; idx &gt; 0; idx -= idx &amp; -idx) res += bit[idx];
        return res;
    }
    long long rangeSum(int l, int r) { return sum(r) - sum(l-1); }
};

// Range Update & Range Query (dùng 2 BIT)
struct BITRange {
    int n;
    vector&lt;long long&gt; b1, b2;
    BITRange(int _n) : n(_n), b1(_n+2,0), b2(_n+2,0) {}
    void add(vector&lt;long long&gt;& bit, int idx, long long val) {
        for (; idx &lt;= n; idx += idx &amp; -idx) bit[idx] += val;
    }
    long long sum(vector&lt;long long&gt;& bit, int idx) {
        long long res = 0;
        for (; idx &gt; 0; idx -= idx &amp; -idx) res += bit[idx];
        return res;
    }
    void rangeAdd(int l, int r, long long val) {
        add(b1, l, val); add(b1, r+1, -val);
        add(b2, l, val*(l-1)); add(b2, r+1, -val*r);
    }
    long long prefixSum(int idx) {
        return sum(b1, idx) * idx - sum(b2, idx);
    }
    long long rangeSum(int l, int r) {
        return prefixSum(r) - prefixSum(l-1);
    }
};</pre>
</div>`,
          videos: [
            { title: "Fenwick Tree (BIT) — Range Query & Update", url: "https://www.youtube.com/results?search_query=Fenwick+Tree+(BIT)+%e2%80%94+Range+Query+%26+Update" },
            { title: "Fenwick Tree Range Queries — WilliamFiset", url: "https://www.youtube.com/results?search_query=Fenwick+Tree+Range+Queries+%e2%80%94+WilliamFiset" },
            { title: "Fenwick Tree (BIT) Quick Tutorial", url: "https://www.youtube.com/results?search_query=Fenwick+Tree+(BIT)+Quick+Tutorial" },
          ],
          problems: [
            { name: "Range Sum Queries II (BIT) — CSES 1648", platform: "CSES", link: "https://cses.fi/problemset/task/1648", difficulty: "easy" },
            { name: "Increasing Subsequence II — CSES 1744", platform: "CSES", link: "https://cses.fi/problemset/task/1744", difficulty: "easy" },
            { name: "Tennis Championship — CF 1801A", platform: "CF", link: "https://codeforces.com/problemset/problem/1801/A", difficulty: "easy" },
            { name: "Inversion Count — SPOJ INVCNT", platform: "SPOJ", link: "https://www.spoj.com/problems/INVCNT/", difficulty: "easy" },
            { name: "Nested Segments — CF 1801B", platform: "CF", link: "https://codeforces.com/problemset/problem/1801/B", difficulty: "easy" },
            { name: "Range Sum Query — LeetCode 307", platform: "LeetCode", link: "https://leetcode.com/problems/range-sum-query-mutable/", difficulty: "easy" },
            { name: "VNOI NKLINEUP", platform: "VNOI", link: "https://oj.vnoi.info/problem/nklineup", difficulty: "easy" },
            { name: "XOR on Segment — CF 1801C", platform: "CF", link: "https://codeforces.com/problemset/problem/1801/C", difficulty: "easy" },
            { name: "Milk Visits — USACO (BIT + DFS order)", platform: "USACO", link: "https://usaco.org/index.php?page=viewproblem2&cpid=970", difficulty: "medium" },
            { name: "Salary Queries — CSES 1144", platform: "CSES", link: "https://cses.fi/problemset/task/1144", difficulty: "medium" },
            { name: "Little Elephant and Array — CF 220B", platform: "CF", link: "https://codeforces.com/problemset/problem/220/B", difficulty: "medium" },
            { name: "Misha and Palindrome — CF 1092F", platform: "CF", link: "https://codeforces.com/problemset/problem/1092/F", difficulty: "medium" },
            { name: "Pashmak and Parmida — CF 459D", platform: "CF", link: "https://codeforces.com/problemset/problem/459/D", difficulty: "medium" },
            { name: "Tree Queries — CF 1320C", platform: "CF", link: "https://codeforces.com/problemset/problem/1320/C", difficulty: "medium" },
            { name: "Powerful array — CF 86D (BIT + Mo)", platform: "CF", link: "https://codeforces.com/problemset/problem/86/D", difficulty: "medium" },
            { name: "Inversion Graph — CF 1638E", platform: "CF", link: "https://codeforces.com/problemset/problem/1638/E", difficulty: "hard" },
            { name: "Garland — CF 1288E", platform: "CF", link: "https://codeforces.com/problemset/problem/1288/E", difficulty: "hard" },
            { name: "Dynamic Inversions — CF 1674E", platform: "CF", link: "https://codeforces.com/problemset/problem/1674/E", difficulty: "hard" },
            { name: "Parking — CF 480E", platform: "CF", link: "https://codeforces.com/problemset/problem/480/E", difficulty: "hard" },
            { name: "KQUERY2 — VNOI (BIT nâng cao)", platform: "VNOI", link: "https://oj.vnoi.info/problem/kquery2", difficulty: "hard" },
          ]
        },
        {
          id: "sparse-table",
          title: "Sparse Table — RMQ (Range Minimum Query)",
          difficulty: "hard",
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Sparse Table</strong> dùng để trả lời truy vấn trên đoạn tĩnh (mảng không thay đổi) trong O(1) sau khi tiền xử lý O(n log n). Lý tưởng cho bài toán RMQ (Range Minimum Query).</p>
  <p><strong>Ý tưởng:</strong> st[i][k] lưu kết quả của đoạn [i, i + 2ᵏ - 1]. Khi truy vấn [l, r], tìm k = floor(log2(r-l+1)) và trả về min(st[l][k], st[r-2ᵏ+1][k]).</p>
  <p><strong>Lưu ý:</strong> Chỉ dùng được với phép toán <strong>idempotent</strong> (min, max, gcd, and). Với sum, dùng Disjoint Sparse Table.</p>
</div>
<div class="lesson-section">
  <h4>Ví dụ cụ thể</h4>
  <p>Cho a = [4, 2, 7, 1, 9, 3]. st[0][*] = a. st[1][i] = min(a[i], a[i+1]). Query(1, 5): k=2 (log2(5)=2), trả về min(st[2][1], st[2][5-4+1=2]) = min(1, 1) = 1.</p>
</div>
<div class="lesson-section">
  <h4>Các dạng biến thể</h4>
  <ul>
    <li><strong>Sparse Table 2D:</strong> Cho RMQ trên mảng hai chiều.</li>
    <li><strong>Disjoint Sparse Table:</strong> Truy vấn sum/gcd trong O(1).</li>
    <li><strong>Sparse Table + LCA:</strong> Dùng RMQ trên Euler tour để tìm LCA.</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">struct SparseTable {
    int n, K;
    vector&lt;vector&lt;int&gt;&gt; st;
    vector&lt;int&gt; lg;
    SparseTable(vector&lt;int&gt;& a) {
        n = a.size(); K = log2(n) + 1;
        st.assign(n, vector&lt;int&gt;(K));
        lg.resize(n+1, 0);
        for (int i = 2; i &lt;= n; i++) lg[i] = lg[i/2] + 1;
        for (int i = 0; i &lt; n; i++) st[i][0] = a[i];
        for (int j = 1; j &lt; K; j++)
            for (int i = 0; i + (1&lt;&lt;j) &lt;= n; i++)
                st[i][j] = min(st[i][j-1], st[i+(1&lt;&lt;(j-1))][j-1]);
    }
    int query(int l, int r) {
        int j = lg[r-l+1];
        return min(st[l][j], st[r-(1&lt;&lt;j)+1][j]);
    }
};</pre>
</div>`,
          videos: [
            { title: "Sparse Table & RMQ Tutorial", url: "https://www.youtube.com/results?search_query=Sparse+Table+%26+RMQ+Tutorial" },
            { title: "Range Minimum Query / Sparse Table (Arpa)", url: "https://www.youtube.com/results?search_query=Range+Minimum+Query+%2f+Sparse+Table+(Arpa)" },
            { title: "VNOI Wiki — RMQ Sparse Table", url: "https://wiki.vnoi.info/algo/data-structures/rmq" },
          ],
          problems: [
            { name: "RMQ — SPOJ RMQSQ", platform: "SPOJ", link: "https://www.spoj.com/problems/RMQSQ/", difficulty: "easy" },
            { name: "Static RMQ — Library Checker", platform: "Library", link: "https://judge.yosupo.jp/problem/staticrmq", difficulty: "easy" },
            { name: "VNOI NKLINEUP (RMQ)", platform: "VNOI", link: "https://oj.vnoi.info/problem/nklineup", difficulty: "easy" },
            { name: "President's Path — CF 6E", platform: "CF", link: "https://codeforces.com/problemset/problem/6/E", difficulty: "easy" },
            { name: "Range Minimum Queries — CSES 1647", platform: "CSES", link: "https://cses.fi/problemset/task/1647", difficulty: "easy" },
            { name: "Frequent values — SPOJ FREQUENT", platform: "SPOJ", link: "https://www.spoj.com/problems/FREQUENT/", difficulty: "easy" },
            { name: "Array Division — CF 1454F", platform: "CF", link: "https://codeforces.com/problemset/problem/1454/F", difficulty: "easy" },
            { name: "Longest Bracket — CF 5C", platform: "CF", link: "https://codeforces.com/contest/5/problem/C", difficulty: "easy" },
            { name: "CGCDSSQ — CF 475D", platform: "CF", link: "https://codeforces.com/problemset/problem/475/D", difficulty: "medium" },
            { name: "Pair of Numbers — CF 359D", platform: "CF", link: "https://codeforces.com/problemset/problem/359/D", difficulty: "medium" },
            { name: "GSS1 — SPOJ (Max Subarray)", platform: "SPOJ", link: "https://www.spoj.com/problems/GSS1/", difficulty: "medium" },
            { name: "GCD Queries — CF 914D", platform: "CF", link: "https://codeforces.com/problemset/problem/914/D", difficulty: "medium" },
            { name: "THRBL — SPOJ (Jumping towers)", platform: "SPOJ", link: "https://www.spoj.com/problems/THRBL/", difficulty: "medium" },
            { name: "LCA using RMQ — Euler tour", platform: "VNOI", link: "https://oj.vnoi.info/problem/lca", difficulty: "medium" },
            { name: "Longest Regular Bracket — CF 5C", platform: "CF", link: "https://codeforces.com/problemset/problem/5/C", difficulty: "medium" },
            { name: "Bear and Square — CF 653F", platform: "CF", link: "https://codeforces.com/problemset/problem/653/F", difficulty: "hard" },
            { name: "CF 1738C — Sparse Table + BS", platform: "CF", link: "https://codeforces.com/problemset/problem/1738/C", difficulty: "hard" },
            { name: "Disjoint Sparse Table — VNOI AVLBIT", platform: "VNOI", link: "https://oj.vnoi.info/problem/avlbit", difficulty: "hard" },
            { name: "CF 1485D — Sparse Table 2D", platform: "CF", link: "https://codeforces.com/problemset/problem/1485/D", difficulty: "hard" },
            { name: "CF 359D — Pair of Numbers (hard)", platform: "CF", link: "https://codeforces.com/problemset/problem/359/D", difficulty: "hard" },
          ]
        },
        {
          id: "sqrt-decomp",
          title: "Sqrt Decomposition & Mo's Algorithm",
          difficulty: "hard",
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Sqrt Decomposition:</strong> Chia mảng thành các block kích thước √n. Mỗi block lưu thông tin tổng hợp. Query trên đoạn: O(√n) — lấy toàn bộ block rồi xét phần dư. Update điểm: O(1).</p>
  <p><strong>Mo's Algorithm:</strong> Xử lý truy vấn đoạn <strong>offline</strong>. Sắp xếp truy vấn theo block của L, sau đó theo R. Dùng hai con trỏ l, r di chuyển dần, cập nhật cấu trúc dữ liệu. Độ phức tạp O((n+q)√n).</p>
  <p><strong>Mo trên cây:</strong> Dùng Euler tour chuyển cây thành mảng.</p>
</div>
<div class="lesson-section">
  <h4>Kĩ thuật Hilbert Order</h4>
  <p>Dùng đường cong Hilbert để duyệt không gian 2D thay vì sắp xếp (L/BLOCK, R). Giảm thời gian chạy ~20-30%.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Mo's Algorithm</h4>
  <pre class="code-sample">struct MoQuery { int l, r, idx; };
int BLOCK;
int freq[1000005], curVal = 0;

void add(int x) { if (freq[x] == 0) curVal++; freq[x]++; }
void remove(int x) { freq[x]--; if (freq[x] == 0) curVal--; }

vector&lt;int&gt; moAlgorithm(vector&lt;int&gt;& a, vector&lt;MoQuery&gt; qs) {
    int n = a.size(); BLOCK = sqrt(n) + 1;
    vector&lt;int&gt; ans(qs.size());
    sort(qs.begin(), qs.end(), [](MoQuery x, MoQuery y) {
        if (x.l/BLOCK != y.l/BLOCK) return x.l/BLOCK &lt; y.l/BLOCK;
        return (x.l/BLOCK &amp; 1) ? (x.r &gt; y.r) : (x.r &lt; y.r);
    });
    int curL = 0, curR = -1;
    for (auto&amp; q : qs) {
        while (curL &gt; q.l) add(a[--curL]);
        while (curR &lt; q.r) add(a[++curR]);
        while (curL &lt; q.l) remove(a[curL++]);
        while (curR &gt; q.r) remove(a[curR--]);
        ans[q.idx] = curVal;
    }
    return ans;
}</pre>
</div>`,
          videos: [
            { title: "RQ Sqrt Decomposition (Arpa)", url: "https://www.youtube.com/results?search_query=RQ+Sqrt+Decomposition+(Arpa)" },
            { title: "Mo's Algorithm — CodeNCode", url: "https://www.youtube.com/results?search_query=Mo%27s+Algorithm+%e2%80%94+CodeNCode" },
            { title: "Mo's Algorithm — Anudeep's blog", url: "https://blog.anudeep2011.com/mos-algorithm/" },
          ],
          problems: [
            { name: "DQUERY — SPOJ (Mo's)", platform: "SPOJ", link: "https://www.spoj.com/problems/DQUERY/", difficulty: "easy" },
            { name: "Powerful Array — CF 86D", platform: "CF", link: "https://codeforces.com/problemset/problem/86/D", difficulty: "easy" },
            { name: "Little Elephant and Array — CF 220B", platform: "CF", link: "https://codeforces.com/problemset/problem/220/B", difficulty: "easy" },
            { name: "Tree Queries — CF 375D", platform: "CF", link: "https://codeforces.com/problemset/problem/375/D", difficulty: "easy" },
            { name: "Kill the Tree — CF 877F", platform: "CF", link: "https://codeforces.com/problemset/problem/877/F", difficulty: "easy" },
            { name: "VNOI Sereja (Mo cơ bản)", platform: "VNOI", link: "https://oj.vnoi.info/problem/sereja", difficulty: "easy" },
            { name: "CF EDU Sqrt Decomposition", platform: "CF", link: "https://codeforces.com/edu/course/2/lesson/7/3", difficulty: "easy" },
            { name: "FREQUENT — SPOJ (Sqrt Decomp)", platform: "SPOJ", link: "https://www.spoj.com/problems/FREQUENT/", difficulty: "easy" },
            { name: "XOR and Favorite Number — CF 617E", platform: "CF", link: "https://codeforces.com/problemset/problem/617/E", difficulty: "medium" },
            { name: "Mo with Updates — CF 940F", platform: "CF", link: "https://codeforces.com/problemset/problem/940/F", difficulty: "medium" },
            { name: "Mo on Tree — CF 1000F", platform: "CF", link: "https://codeforces.com/problemset/problem/1000/F", difficulty: "medium" },
            { name: "Connected Components — CF 920F", platform: "CF", link: "https://codeforces.com/problemset/problem/920/F", difficulty: "medium" },
            { name: "Range Add/Sum Sqrt — CF 455D", platform: "CF", link: "https://codeforces.com/problemset/problem/455/D", difficulty: "medium" },
            { name: "VNOI Mo nâng cao", platform: "VNOI", link: "https://oj.vnoi.info/problem/mo", difficulty: "medium" },
            { name: "CF 1730C — Mo + binary", platform: "CF", link: "https://codeforces.com/problemset/problem/1730/C", difficulty: "medium" },
            { name: "CF 940F (Mo hard variant)", platform: "CF", link: "https://codeforces.com/problemset/problem/940/F", difficulty: "hard" },
            { name: "Hilbert Order Mo — CF 1768D", platform: "CF", link: "https://codeforces.com/problemset/problem/1768/D", difficulty: "hard" },
            { name: "Second Minimum — CF 1806E", platform: "CF", link: "https://codeforces.com/problemset/problem/1806/E", difficulty: "hard" },
            { name: "MEX Queries — VNOI", platform: "VNOI", link: "https://oj.vnoi.info/problem/mexq", difficulty: "hard" },
            { name: "Distinct Numbers — CF 1738B", platform: "CF", link: "https://codeforces.com/problemset/problem/1738/B", difficulty: "hard" },
          ]
        },
        {
          id: "set-map",
          title: "Set & Map (Cây đỏ đen — Red-Black Tree)",
          difficulty: "medium",
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><code>set</code> và <code>map</code> trong C++ được cài đặt bằng <strong>Red-Black Tree</strong> — cây nhị phân tìm kiếm cân bằng. Tự động sắp xếp theo thứ tự tăng dần. Thao tác thêm, xóa, tìm kiếm O(log n).</p>
  <p><strong>Phân biệt với unordered_set/unordered_map:</strong> Dùng hash table, trung bình O(1) nhưng không có thứ tự. Trong CP có thể bị tấn công hash.</p>
</div>
<div class="lesson-section">
  <h4>Các hàm quan trọng</h4>
  <ul>
    <li><code>s.insert(x), s.erase(x), s.find(x)</code> — O(log n)</li>
    <li><code>s.lower_bound(x)</code> — phần tử đầu &gt;= x</li>
    <li><code>s.upper_bound(x)</code> — phần tử đầu &gt; x</li>
    <li><code>multiset</code> — erase(x) xóa tất cả, dùng erase(it) xóa một phần tử.</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">set&lt;int&gt; s = {3, 1, 4, 1, 5}; // {1, 3, 4, 5}
s.insert(2); // {1, 2, 3, 4, 5}
auto it = s.find(3); if (it != s.end()) s.erase(it);
auto lb = s.lower_bound(2); // iterator to 2
auto ub = s.upper_bound(4); // iterator to 5

map&lt;string, int&gt; freq;
freq["apple"]++; freq["banana"] += 2;
for (auto&amp; [k, v] : freq) cout &lt;&lt; k &lt;&lt; ": " &lt;&lt; v &lt;&lt; endl;

multiset&lt;int&gt; ms = {1, 2, 2, 3};
ms.erase(ms.find(2)); // {1, 2, 3}</pre>
</div>`,
          videos: [
            { title: "Set and Map in C++ STL (28Tech)", url: "https://www.youtube.com/results?search_query=Set+and+Map+in+C%2b%2b+STL+(28Tech)" },
            { title: "STL Set, Map, Multiset — Codeforces", url: "https://www.youtube.com/results?search_query=STL+Set%2c+Map%2c+Multiset+%e2%80%94+Codeforces" },
          ],
          problems: [
            { name: "Two Sum — LeetCode 1", platform: "LeetCode", link: "https://leetcode.com/problems/two-sum/", difficulty: "easy" },
            { name: "Contains Duplicate — LeetCode 217", platform: "LeetCode", link: "https://leetcode.com/problems/contains-duplicate/", difficulty: "easy" },
            { name: "Missing Number — LeetCode 268", platform: "LeetCode", link: "https://leetcode.com/problems/missing-number/", difficulty: "easy" },
            { name: "Registration System — CF 4C", platform: "CF", link: "https://codeforces.com/problemset/problem/4/C", difficulty: "easy" },
            { name: "Amusing Joke — CF 141A", platform: "CF", link: "https://codeforces.com/problemset/problem/141/A", difficulty: "easy" },
            { name: "Is your horseshoe? — CF 228A", platform: "CF", link: "https://codeforces.com/problemset/problem/228/A", difficulty: "easy" },
            { name: "Boy or Girl — CF 236A", platform: "CF", link: "https://codeforces.com/problemset/problem/236/A", difficulty: "easy" },
            { name: "Two Buttons (set) — CF 520B", platform: "CF", link: "https://codeforces.com/problemset/problem/520/B", difficulty: "easy" },
            { name: "Kefa and Park (set) — CF 580C", platform: "CF", link: "https://codeforces.com/problemset/problem/580/C", difficulty: "medium" },
            { name: "Sereja and Brackets — CF 380C", platform: "CF", link: "https://codeforces.com/problemset/problem/380/C", difficulty: "medium" },
            { name: "Multiset — CF 1354C", platform: "CF", link: "https://codeforces.com/problemset/problem/1354/C", difficulty: "medium" },
            { name: "Longest k-Good Segment — CF 616D", platform: "CF", link: "https://codeforces.com/problemset/problem/616/D", difficulty: "medium" },
            { name: "Set of Points — CF 1295C", platform: "CF", link: "https://codeforces.com/problemset/problem/1295/C", difficulty: "medium" },
            { name: "Strange Function — CF 1538F", platform: "CF", link: "https://codeforces.com/problemset/problem/1538/F", difficulty: "medium" },
            { name: "VNOI Set & Map", platform: "VNOI", link: "https://oj.vnoi.info/problem/setmap", difficulty: "medium" },
            { name: "Fedor and Essay — CF 246D", platform: "CF", link: "https://codeforces.com/problemset/problem/246/D", difficulty: "hard" },
            { name: "Tetrahedron — CF 166E", platform: "CF", link: "https://codeforces.com/problemset/problem/166/E", difficulty: "hard" },
            { name: "Cows and Sequence — CF 283B", platform: "CF", link: "https://codeforces.com/problemset/problem/283/B", difficulty: "hard" },
            { name: "Road Reform — CF 1462E2", platform: "CF", link: "https://codeforces.com/problemset/problem/1462/E2", difficulty: "hard" },
            { name: "Array Shrinking — CF 1312E", platform: "CF", link: "https://codeforces.com/problemset/problem/1312/E", difficulty: "hard" },
          ]
        },
        {
          id: "priority-queue",
          title: "Priority Queue & Heap (Hàng đợi ưu tiên)",
          difficulty: "medium",
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Priority Queue</strong> luôn đưa phần tử có độ ưu tiên cao nhất lên đầu. Mặc định max-heap. Cài đặt bằng <strong>Heap</strong> — cây nhị phân hoàn chỉnh: nút cha &ge; nút con.</p>
  <p><strong>Min-heap:</strong> <code>priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt;</code></p>
  <p><strong>Độ phức tạp:</strong> Push O(log n), Pop O(log n), Top O(1).</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">// Max-heap mặc định
priority_queue&lt;int&gt; pq;
pq.push(5); pq.push(1); pq.push(10); // top() = 10

// Min-heap
priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt; minpq;

// Custom struct
struct Item {
    int value, priority;
    bool operator&lt;(const Item&amp; o) const {
        return priority &lt; o.priority;
    }
};
priority_queue&lt;Item&gt; customPQ;

// Heap operations (from &lt;algorithm&gt;)
vector&lt;int&gt; v = {3, 1, 4, 1, 5};
make_heap(v.begin(), v.end()); // O(n)
pop_heap(v.begin(), v.end()); // max ra cuôi
v.pop_back();
v.push_back(2); push_heap(v.begin(), v.end());</pre>
</div>`,
          videos: [
            { title: "Priority Queue C++ STL (28Tech)", url: "https://www.youtube.com/results?search_query=Priority+Queue+C%2b%2b+STL+(28Tech)" },
            { title: "Heap Data Structure — Errichto", url: "https://www.youtube.com/results?search_query=Heap+Data+Structure+%e2%80%94+Errichto" },
          ],
          problems: [
            { name: "Kth Largest Element — LeetCode 215", platform: "LeetCode", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/", difficulty: "easy" },
            { name: "Top K Frequent Elements — LeetCode 347", platform: "LeetCode", link: "https://leetcode.com/problems/top-k-frequent-elements/", difficulty: "easy" },
            { name: "Connect Sticks — LeetCode 1167", platform: "LeetCode", link: "https://leetcode.com/problems/minimum-cost-to-connect-sticks/", difficulty: "easy" },
            { name: "Kth Largest in Stream — LeetCode 703", platform: "LeetCode", link: "https://leetcode.com/problems/kth-largest-element-in-a-stream/", difficulty: "easy" },
            { name: "Last Stone Weight — LeetCode 1046", platform: "LeetCode", link: "https://leetcode.com/problems/last-stone-weight/", difficulty: "easy" },
            { name: "Heap Sort — CF EDU", platform: "CF", link: "https://codeforces.com/edu/course/2/lesson/7/2", difficulty: "easy" },
            { name: "Weak Characters — LeetCode 1996", platform: "LeetCode", link: "https://leetcode.com/problems/the-number-of-weak-characters-in-the-game/", difficulty: "easy" },
            { name: "Array Partition I — LeetCode 561", platform: "LeetCode", link: "https://leetcode.com/problems/array-partition-i/", difficulty: "easy" },
            { name: "Merge k Sorted Lists — LeetCode 23", platform: "LeetCode", link: "https://leetcode.com/problems/merge-k-sorted-lists/", difficulty: "medium" },
            { name: "Find Median from Stream — LeetCode 295", platform: "LeetCode", link: "https://leetcode.com/problems/find-median-from-data-stream/", difficulty: "medium" },
            { name: "Task Scheduler — LeetCode 621", platform: "LeetCode", link: "https://leetcode.com/problems/task-scheduler/", difficulty: "medium" },
            { name: "K Closest Points — LeetCode 973", platform: "LeetCode", link: "https://leetcode.com/problems/k-closest-points-to-origin/", difficulty: "medium" },
            { name: "Min Refueling Stops — LeetCode 871", platform: "LeetCode", link: "https://leetcode.com/problems/minimum-number-of-refueling-stops/", difficulty: "medium" },
            { name: "Reorganize String — LeetCode 767", platform: "LeetCode", link: "https://leetcode.com/problems/reorganize-string/", difficulty: "medium" },
            { name: "Ugly Number II — LeetCode 264", platform: "LeetCode", link: "https://leetcode.com/problems/ugly-number-ii/", difficulty: "medium" },
            { name: "IPO — LeetCode 502", platform: "LeetCode", link: "https://leetcode.com/problems/ipo/", difficulty: "hard" },
            { name: "Kth Smallest in Multiplication — LeetCode 668", platform: "LeetCode", link: "https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/", difficulty: "hard" },
            { name: "Swim in Rising Water — LeetCode 778", platform: "LeetCode", link: "https://leetcode.com/problems/swim-in-rising-water/", difficulty: "hard" },
            { name: "Hire K Workers — LeetCode 857", platform: "LeetCode", link: "https://leetcode.com/problems/minimum-cost-to-hire-k-workers/", difficulty: "hard" },
            { name: "Stone Game IV — CF 1538F", platform: "CF", link: "https://codeforces.com/problemset/problem/1538/F", difficulty: "hard" },
          ]
        },
      ]
    },
    // ============================================================
    //  5. THUẬT TOÁN ĐỒ THỊ
    // ============================================================
    {
      id: 'graph-algos',
      name: 'Thuật toán Đồ thị',
      icon: 'share-2',
      color: 'purple',
      lessons: [

        {
          id: "bfs-dfs",
          title: "BFS & DFS — Duyệt đồ thị",
          difficulty: "easy",
          content: `<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>DFS (Depth-First Search):</strong> Duyệt theo chiều sâu — đi sâu nhất có thể theo một nhánh, quay lui (backtrack) khi không đi được. Cài đặt bằng đệ quy hoặc stack. Ứng dụng: thành phần liên thông, phát hiện chu trình, sắp xếp topo, thành phần liên thông mạnh (SCC).</p>
  <p><strong>BFS (Breadth-First Search):</strong> Duyệt theo chiều rộng — dùng queue, duyệt theo tầng (level). Mỗi đỉnh được thăm đúng một lần. BFS tìm đường đi ngắn nhất trên đồ thị <strong>không trọng số</strong> (unweighted graph).</p>
  <p><strong>So sánh:</strong> BFS dùng queue — đường đi ngắn nhất. DFS dùng stack/đệ quy — kiểm tra chu trình, topo sort, SCC, cầu và khớp.</p>
</div>
<div class="lesson-section">
  <h4>Ví dụ cụ thể</h4>
  <p>Đồ thị: 1-2, 1-3, 2-4, 2-5, 3-6. BFS(1): 1 rarr; 2,3 rarr; 4,5,6. DFS(1) từ 1: 1 rarr; 2 rarr; 4 rarr; 5 rarr; 3 rarr; 6.</p>
</div>
<div class="lesson-section">
  <h4>Ứng dụng</h4>
  <ul>
    <li><strong>BFS:</strong> Tìm đường đi ngắn nhất trên lưới, kiểm tra đồ thị hai phía (bipartite), tìm thành phần liên thông.</li>
    <li><strong>DFS:</strong> Topo sort (Kahn), SCC (Kosaraju, Tarjan), cầu và khớp (Tarjan), DP trên cây (tree DP).</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Lưu ý</h4>
  <ul>
    <li>Với DFS đệ quy, cẩn thận stack overflow khi N &gt; 10^5. Dùng stack tường minh hoặc tăng stack size.</li>
    <li>BFS có thể dùng deque (0-1 BFS) cho đồ thị có trọng số 0 hoặc 1.</li>
    <li>Khi cần truy vết đường đi, lưu mảng parent[] trong BFS.</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">vector&lt;int&gt; adj[100005];
bool visited[100005];

// DFS
void dfs(int u) {
    visited[u] = true;
    for (int v : adj[u]) if (!visited[v]) dfs(v);
}

// BFS
vector&lt;int&gt; bfs(int start, int n) {
    vector&lt;int&gt; dist(n+1, -1);
    queue&lt;int&gt; q;
    q.push(start); dist[start] = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u])
            if (dist[v] == -1) { dist[v] = dist[u] + 1; q.push(v); }
    }
    return dist;
}

// BFS trên Grid tìm đường đi
int dx[] = {-1, 1, 0, 0}, dy[] = {0, 0, -1, 1};
char dir[] = {'U', 'D', 'L', 'R'};</pre>
</div>`,
          videos: [
            { title: "BFS và DFS — VNOI Channel", url: "https://www.youtube.com/results?search_query=BFS+v%c3%a0+DFS+%e2%80%94+VNOI+Channel" },
            { title: "DFS & BFS — 28Tech", url: "https://www.youtube.com/results?search_query=DFS+%26+BFS+%e2%80%94+28Tech" },
            { title: "Graph Traversals — Errichto", url: "https://www.youtube.com/results?search_query=Graph+Traversals+%e2%80%94+Errichto" },
          ],
          problems: [
            { name: "Connected Components — CSES 1192", platform: "CSES", link: "https://cses.fi/problemset/task/1192", difficulty: "easy" },
            { name: "Building Roads — CSES 1666", platform: "CSES", link: "https://cses.fi/problemset/task/1666", difficulty: "easy" },
            { name: "Labyrinth — CSES 1193", platform: "CSES", link: "https://cses.fi/problemset/task/1193", difficulty: "easy" },
            { name: "Message Route — CSES 1667", platform: "CSES", link: "https://cses.fi/problemset/task/1667", difficulty: "easy" },
            { name: "Counting Rooms — CSES 1192", platform: "CSES", link: "https://cses.fi/problemset/task/1192", difficulty: "easy" },
            { name: "Bipartite Graph — CSES 1668", platform: "CSES", link: "https://cses.fi/problemset/task/1668", difficulty: "easy" },
            { name: "Kefa and Park — CF 580C", platform: "CF", link: "https://codeforces.com/problemset/problem/580/C", difficulty: "easy" },
            { name: "Number of Islands — LeetCode 200", platform: "LeetCode", link: "https://leetcode.com/problems/number-of-islands/", difficulty: "easy" },
            { name: "The Two Routes — CF 601A", platform: "CF", link: "https://codeforces.com/problemset/problem/601/A", difficulty: "medium" },
            { name: "Party — CF 115A", platform: "CF", link: "https://codeforces.com/problemset/problem/115/A", difficulty: "medium" },
            { name: "Maze — CF 377A", platform: "CF", link: "https://codeforces.com/problemset/problem/377/A", difficulty: "medium" },
            { name: "Knight Moves — SPOJ NAKANJ", platform: "SPOJ", link: "https://www.spoj.com/problems/NAKANJ/", difficulty: "medium" },
            { name: "Ice Skating — CF 217A", platform: "CF", link: "https://codeforces.com/problemset/problem/217/A", difficulty: "medium" },
            { name: "DZY Loves Chemistry — CF 445A", platform: "CF", link: "https://codeforces.com/problemset/problem/445/A", difficulty: "medium" },
            { name: "Journey — CF 1320B", platform: "CF", link: "https://codeforces.com/problemset/problem/1320/B", difficulty: "medium" },
            { name: "Mouse Hunt — CF 1027C", platform: "CF", link: "https://codeforces.com/problemset/problem/1027/C", difficulty: "hard" },
            { name: "Mafia — CF 348A", platform: "CF", link: "https://codeforces.com/problemset/problem/348/A", difficulty: "hard" },
            { name: "Good Subarrays — CF 1730C", platform: "CF", link: "https://codeforces.com/problemset/problem/1730/C", difficulty: "hard" },
            { name: "VNOI NKLEAGUE", platform: "VNOI", link: "https://oj.vnoi.info/problem/nkleague", difficulty: "hard" },
            { name: "Cat and Mouse — CF 1487C", platform: "CF", link: "https://codeforces.com/problemset/problem/1487/C", difficulty: "hard" },
          ]
        },
        {
          id: "dijkstra",
          title: "Dijkstra — Đường đi ngắn nhất (không âm)",
          difficulty: "medium",
          content: `<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Thuật toán Dijkstra</strong> tìm đường đi ngắn nhất từ một nguồn đến tất cả các đỉnh trên đồ thị có trọng số <strong>không âm</strong>. Độ phức tạp O((V+E) log V) khi dùng priority_queue.</p>
  <p><strong>Ý tưởng:</strong> Duy trì khoảng cách ngắn nhất tạm thời dist[u]. Mỗi bước chọn đỉnh chưa "cố định" có dist nhỏ nhất, "cố định" nó, và relax các cạnh kề. Dùng priority_queue (min-heap) để lấy đỉnh có dist nhỏ nhất trong O(log V).</p>
</div>
<div class="lesson-section">
  <h4>Ví dụ cụ thể</h4>
  <p>Đồ thị 4 đỉnh: 1-2(4), 1-3(2), 2-3(1), 2-4(5), 3-4(8). Bắt đầu từ 1. dist = [0, 4, 2, inf]. Chọn 3, relax: dist[2] = min(4, 2+1)=3. Chọn 2, relax: dist[4]=min(inf, 3+5)=8. Kết quả: 1→2=3, 1→3=2, 1→4=8.</p>
</div>
<div class="lesson-section">
  <h4>Biến thể</h4>
  <ul>
    <li><strong>0-1 BFS:</strong> Khi trọng số chỉ là 0 hoặc 1, dùng deque thay vì priority_queue — O(V+E).</li>
    <li><strong>Dijkstra với nhiều nguồn:</strong> Khởi tạo dist nhiều đỉnh = 0, push tất cả vào queue.</li>
    <li><strong>Đường đi ngắn nhất có điều kiện:</strong> Dijkstra với state mở rộng (thêm chiều phụ — Dijkstra on state graph).</li>
    <li><strong>Dial's algorithm:</strong> Dùng bucket queue khi trọng số nhỏ — O(E + maxW*V).</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">vector&lt;pair&lt;int,int&gt;&gt; adj[100005];
long long dist[100005];

void dijkstra(int start) {
    memset(dist, 0x3f, sizeof(dist));
    dist[start] = 0;
    priority_queue&lt;pair&lt;long long,int&gt;, vector&lt;pair&lt;long long,int&gt;&gt;, greater&lt;pair&lt;long long,int&gt;&gt;&gt; pq;
    pq.push({0, start});
    while (!pq.empty()) {
        auto [du, u] = pq.top(); pq.pop();
        if (du != dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[v] &gt; dist[u] + w) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
}</pre>
</div>`,
          videos: [
            { title: "Thuật toán Dijkstra — VNOI", url: "https://www.youtube.com/results?search_query=Thu%e1%ba%adt+to%c3%a1n+Dijkstra+%e2%80%94+VNOI" },
            { title: "Dijkstra algorithm — 28Tech", url: "https://www.youtube.com/results?search_query=Dijkstra+algorithm+%e2%80%94+28Tech" },
            { title: "Dijkstra Shortest Path — Errichto", url: "https://www.youtube.com/results?search_query=Dijkstra+Shortest+Path+%e2%80%94+Errichto" },
          ],
          problems: [
            { name: "Shortest Path I — CSES 1671", platform: "CSES", link: "https://cses.fi/problemset/task/1671", difficulty: "easy" },
            { name: "Shortest Path II — CSES 1672", platform: "CSES", link: "https://cses.fi/problemset/task/1672", difficulty: "easy" },
            { name: "Flight Discount — CSES 1195", platform: "CSES", link: "https://cses.fi/problemset/task/1195", difficulty: "easy" },
            { name: "Dijkstra? — CF 20C", platform: "CF", link: "https://codeforces.com/problemset/problem/20/C", difficulty: "easy" },
            { name: "Network Delay Time — LeetCode 743", platform: "LeetCode", link: "https://leetcode.com/problems/network-delay-time/", difficulty: "easy" },
            { name: "Path with Maximum Probability — LeetCode 1514", platform: "LeetCode", link: "https://leetcode.com/problems/path-with-maximum-probability/", difficulty: "easy" },
            { name: "Cheapest Flights — LeetCode 787", platform: "LeetCode", link: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", difficulty: "easy" },
            { name: "VNOI TRAFFIC", platform: "VNOI", link: "https://oj.vnoi.info/problem/traffic", difficulty: "easy" },
            { name: "Investigation — CSES 1202", platform: "CSES", link: "https://cses.fi/problemset/task/1202", difficulty: "medium" },
            { name: "Road Reparation — CSES 1675", platform: "CSES", link: "https://cses.fi/problemset/task/1675", difficulty: "medium" },
            { name: "Minimum Time — CF 1741E", platform: "CF", link: "https://codeforces.com/problemset/problem/1741/E", difficulty: "medium" },
            { name: "Shortest Path + Parent — CF 20C Dijkstra", platform: "CF", link: "https://codeforces.com/problemset/problem/20/C", difficulty: "medium" },
            { name: "Robot Program — CF 1800C", platform: "CF", link: "https://codeforces.com/problemset/problem/1800/C", difficulty: "medium" },
            { name: "PolandBall and Game — CF 755B", platform: "CF", link: "https://codeforces.com/problemset/problem/755/B", difficulty: "medium" },
            { name: "VNOI QBMAX", platform: "VNOI", link: "https://oj.vnoi.info/problem/qbmax", difficulty: "medium" },
            { name: "Dijkstra on Grid — CF 229E", platform: "CF", link: "https://codeforces.com/problemset/problem/229/E", difficulty: "hard" },
            { name: "Shortest Path with Condition — CF 1730D", platform: "CF", link: "https://codeforces.com/problemset/problem/1730/D", difficulty: "hard" },
            { name: "Grade 11 Math — CF 1720D", platform: "CF", link: "https://codeforces.com/problemset/problem/1720/D", difficulty: "hard" },
            { name: "VNOI NK05", platform: "VNOI", link: "https://oj.vnoi.info/problem/nk05", difficulty: "hard" },
            { name: "CF 449B — Dijkstra + Bridges", platform: "CF", link: "https://codeforces.com/problemset/problem/449/B", difficulty: "hard" },
          ]
        },
        {
          id: "bellman-ford",
          title: "Bellman-Ford & SPFA — Đường đi ngắn nhất (có trọng số âm)",
          difficulty: "hard",
          content: `<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Bellman-Ford</strong> tìm đường đi ngắn nhất từ một nguồn, chấp nhận trọng số <strong>âm</strong>. Sau V-1 lần lặp (mỗi lần relax tất cả các cạnh), khoảng cách sẽ hội tụ. Lần lặp thứ V để phát hiện chu trình âm (negative cycle).</p>
  <p><strong>Độ phức tạp:</strong> O(V*E) — chậm hơn Dijkstra nhưng linh hoạt hơn.</p>
</div>
<div class="lesson-section">
  <h4>Ví dụ cụ thể</h4>
  <p>Đồ thị có cạnh âm: 1→2(4), 1→3(2), 2→3(-3), 3→2(1). Sau V-1=3 lần lặp, dist[1]=0, dist[2]=1 (qua 3), dist[3]=2. Nếu có chu trình âm (vd: 1→2(-1), 2→1(-1)), dist giảm mãi.</p>
</div>
<div class="lesson-section">
  <h4>Ứng dụng & Biến thể</h4>
  <ul>
    <li>Phát hiện chu trình âm trong đồ thị.</li>
    <li><strong>SPFA (Shortest Path Faster Algorithm):</strong> Queue-based Bellman-Ford — thường nhanh hơn, nhưng dễ bị test chậm (O(V*E)).</li>
    <li><strong>Difference Constraints:</strong> Dùng Bellman-Ford giải hệ bất phương trình dạng x_u - x_v &le; w.</li>
    <li><strong>Min Cost Max Flow (potential method):</strong> Dùng Bellman-Ford (hoặc SPFA) để tính potential.</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">struct Edge { int u, v, w; };
vector&lt;Edge&gt; edges;
long long dist[100005];

bool bellmanFord(int n, int start) {
    memset(dist, 0x3f, sizeof(dist));
    dist[start] = 0;
    for (int i = 1; i &lt;= n-1; i++)
        for (auto& e : edges)
            if (dist[e.u] &lt; 1e18 && dist[e.v] &gt; dist[e.u] + e.w)
                dist[e.v] = dist[e.u] + e.w;
    // Detect negative cycle
    for (auto& e : edges)
        if (dist[e.u] &lt; 1e18 && dist[e.v] &gt; dist[e.u] + e.w)
            return true; // has negative cycle
    return false;
}</pre>
</div>`,
          videos: [
            { title: "Bellman-Ford Algorithm — VNOI", url: "https://www.youtube.com/results?search_query=Bellman-Ford+Algorithm+%e2%80%94+VNOI" },
            { title: "Bellman-Ford — WilliamFiset", url: "https://www.youtube.com/results?search_query=Bellman-Ford+%e2%80%94+WilliamFiset" },
            { title: "SPFA (Shortest Path Faster Algorithm)", url: "https://www.youtube.com/results?search_query=SPFA+(Shortest+Path+Faster+Algorithm)" },
          ],
          problems: [
            { name: "Shortest Path III — CSES 1673 (Negative Cycle)", platform: "CSES", link: "https://cses.fi/problemset/task/1673", difficulty: "easy" },
            { name: "High Score — CSES 1673", platform: "CSES", link: "https://cses.fi/problemset/task/1673", difficulty: "easy" },
            { name: "Cycle Finding — CSES 1197", platform: "CSES", link: "https://cses.fi/problemset/task/1197", difficulty: "easy" },
            { name: "Negative Cycle — SPOJ NEGCYCLE", platform: "SPOJ", link: "https://www.spoj.com/problems/NEGCYCLE/", difficulty: "easy" },
            { name: "Arbitrage — CSES 1706", platform: "CSES", link: "https://cses.fi/problemset/task/1706", difficulty: "easy" },
            { name: "Bellman-Ford — VNOI", platform: "VNOI", link: "https://oj.vnoi.info/problem/bellman", difficulty: "easy" },
            { name: "MPilot — SPOJ", platform: "SPOJ", link: "https://www.spoj.com/problems/MPILOT/", difficulty: "easy" },
            { name: "Currency Exchange — CF 1213F", platform: "CF", link: "https://codeforces.com/problemset/problem/1213/F", difficulty: "easy" },
            { name: "K Paths — CF 1730E", platform: "CF", link: "https://codeforces.com/problemset/problem/1730/E", difficulty: "medium" },
            { name: "Difference Constraints — VNOI", platform: "VNOI", link: "https://oj.vnoi.info/problem/diff", difficulty: "medium" },
            { name: "XY — CF 1732C2", platform: "CF", link: "https://codeforces.com/problemset/problem/1732/C2", difficulty: "medium" },
            { name: "CF 1292B — SPFA", platform: "CF", link: "https://codeforces.com/problemset/problem/1292/B", difficulty: "medium" },
            { name: "Minimum Path — CF 1761D", platform: "CF", link: "https://codeforces.com/problemset/problem/1761/D", difficulty: "medium" },
            { name: "VNOI QBBEAR (SPFA)", platform: "VNOI", link: "https://oj.vnoi.info/problem/qbbear", difficulty: "medium" },
            { name: "CF 1503C — Travelling Salesman", platform: "CF", link: "https://codeforces.com/problemset/problem/1503/C", difficulty: "medium" },
            { name: "CF 1450E — SPFA/SLF", platform: "CF", link: "https://codeforces.com/problemset/problem/1450/E", difficulty: "hard" },
            { name: "VNOI NKMONEY", platform: "VNOI", link: "https://oj.vnoi.info/problem/nkmoney", difficulty: "hard" },
            { name: "CF 1106F — Bellman nâng cao", platform: "CF", link: "https://codeforces.com/problemset/problem/1106/F", difficulty: "hard" },
            { name: "CF 1312D — Negative Cycle DP", platform: "CF", link: "https://codeforces.com/problemset/problem/1312/D", difficulty: "hard" },
            { name: "SPOJ SAM — Phone Carrier", platform: "SPOJ", link: "https://www.spoj.com/problems/SAM/", difficulty: "hard" },
          ]
        },
        {
          id: "floyd-warshall",
          title: "Floyd-Warshall — Mọi cặp đường đi ngắn nhất",
          difficulty: "medium",
          content: `<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Floyd-Warshall</strong> tìm đường đi ngắn nhất giữa <strong>tất cả các cặp đỉnh</strong> trong O(V^3). Cài đặt cực kỳ đơn giản — ba vòng lặp lồng nhau. Có thể phát hiện chu trình âm (khoảng cách đến chính nó &lt; 0).</p>
  <p><strong>Ý tưởng:</strong> Dần dần thêm từng đỉnh trung gian k, cập nhật dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).</p>
</div>
<div class="lesson-section">
  <h4>Ví dụ cụ thể</h4>
  <p>3 đỉnh: dist[1][2]=4, dist[2][3]=1, dist[1][3]=8. Khi k=2: dist[1][3] = min(8, 4+1) = 5.</p>
</div>
<div class="lesson-section">
  <h4>Ứng dụng</h4>
  <ul>
    <li>Đường đi ngắn nhất mọi cặp (All-Pairs Shortest Path).</li>
    <li>Bao đóng transitive (Transitive Closure): dùng bitmasks — bitset optimization.</li>
    <li>Phát hiện chu trình âm.</li>
    <li>Tìm đường kính đồ thị (với Floyd).</li>
    <li>Tìm bán kính và tâm đồ thị.</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">int dist[505][505];
const int INF = 1e9;

void floydWarshall(int n) {
    for (int k = 1; k &lt;= n; k++)
        for (int i = 1; i &lt;= n; i++)
            for (int j = 1; j &lt;= n; j++)
                if (dist[i][k] &lt; INF && dist[k][j] &lt; INF)
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
}

// Phát hiện chu trình âm
bool hasNegativeCycle(int n) {
    for (int i = 1; i &lt;= n; i++)
        if (dist[i][i] &lt; 0) return true;
    return false;
}</pre>
</div>`,
          videos: [
            { title: "Floyd-Warshall — VNOI", url: "https://www.youtube.com/results?search_query=Floyd-Warshall+%e2%80%94+VNOI" },
            { title: "Floyd-Warshall Algorithm — 28Tech", url: "https://www.youtube.com/results?search_query=Floyd-Warshall+Algorithm+%e2%80%94+28Tech" },
            { title: "Floyd-Warshall — Abdul Bari", url: "https://www.youtube.com/results?search_query=Floyd-Warshall+%e2%80%94+Abdul+Bari" },
          ],
          problems: [
            { name: "Shortest Path II — CSES 1672", platform: "CSES", link: "https://cses.fi/problemset/task/1672", difficulty: "easy" },
            { name: "Shortest Routes II — CSES 1672", platform: "CSES", link: "https://cses.fi/problemset/task/1672", difficulty: "easy" },
            { name: "VNOI FLOYD", platform: "VNOI", link: "https://oj.vnoi.info/problem/floyd", difficulty: "easy" },
            { name: "Possible Friends — CF 383A", platform: "CF", link: "https://codeforces.com/problemset/problem/383/A", difficulty: "easy" },
            { name: "Find the City — LeetCode 1334", platform: "LeetCode", link: "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/", difficulty: "easy" },
            { name: "Course Schedule IV — LeetCode 1462", platform: "LeetCode", link: "https://leetcode.com/problems/course-schedule-iv/", difficulty: "easy" },
            { name: "Transitive Closure — SPOJ TRICOL", platform: "SPOJ", link: "https://www.spoj.com/problems/TRICOL/", difficulty: "easy" },
            { name: "VNOI QBSCHOOL", platform: "VNOI", link: "https://oj.vnoi.info/problem/qbschool", difficulty: "easy" },
            { name: "CF 33B — String Problem", platform: "CF", link: "https://codeforces.com/problemset/problem/33/B", difficulty: "medium" },
            { name: "VNOI CHIADAT", platform: "VNOI", link: "https://oj.vnoi.info/problem/chiadat", difficulty: "medium" },
            { name: "Travelling — SPOJ TRVCOST", platform: "SPOJ", link: "https://www.spoj.com/problems/TRVCOST/", difficulty: "medium" },
            { name: "Roadblock — USACO", platform: "USACO", link: "https://usaco.org/index.php?page=viewproblem2&cpid=638", difficulty: "medium" },
            { name: "CF 295B — Greg and Graph", platform: "CF", link: "https://codeforces.com/problemset/problem/295/B", difficulty: "medium" },
            { name: "VNOI NK05FLYD", platform: "VNOI", link: "https://oj.vnoi.info/problem/nk05fld", difficulty: "medium" },
            { name: "CF 466C — Number of Ways", platform: "CF", link: "https://codeforces.com/problemset/problem/466/C", difficulty: "medium" },
            { name: "CF 1133F2 — Spanning Tree", platform: "CF", link: "https://codeforces.com/problemset/problem/1133/F2", difficulty: "hard" },
            { name: "AtCoder ABC 257 F", platform: "AtCoder", link: "https://atcoder.jp/contests/abc257/tasks/abc257_f", difficulty: "hard" },
            { name: "CF 1732C2 — Floyd Bitset", platform: "CF", link: "https://codeforces.com/problemset/problem/1732/C2", difficulty: "hard" },
            { name: "VNOI GOLD (Floyd + DP)", platform: "VNOI", link: "https://oj.vnoi.info/problem/gold", difficulty: "hard" },
            { name: "CF 33C — Floyd Parity", platform: "CF", link: "https://codeforces.com/problemset/problem/33/C", difficulty: "hard" },
          ]
        },
        {
          id: "mst",
          title: "MST — Kruskal & Prim (Cây khung nhỏ nhất)",
          difficulty: "medium",
          content: `<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Minimum Spanning Tree (MST)</strong> — cây khung nhỏ nhất. Hai thuật toán chính:</p>
  <p><strong>Kruskal:</strong> Sắp xếp các cạnh theo trọng số tăng dần. Dùng DSU để thêm cạnh nếu không tạo chu trình. O(E log E).</p>
  <p><strong>Prim:</strong> Tương tự Dijkstra — mỗi bước chọn đỉnh gần nhất với cây hiện tại. O((V+E) log V) với priority_queue. Tốt cho đồ thị dày (dense graph).</p>
</div>
<div class="lesson-section">
  <h4>Ví dụ cụ thể</h4>
  <p>Đồ thị 4 đỉnh: 1-2(10), 1-3(6), 1-4(5), 2-4(15), 3-4(4). MST: 3-4(4), 1-4(5), 1-2(10) — tổng 19.</p>
</div>
<div class="lesson-section">
  <h4>Biến thể</h4>
  <ul>
    <li><strong>Second-best MST:</strong> Tìm cây khung nhỏ thứ hai — thay một cạnh.</li>
    <li><strong>MST có điều kiện:</strong> Bắt buộc chọn hoặc không chọn một cạnh nào đó.</li>
    <li><strong>Minimum Spanning Tree với DSU rollback:</strong> Kết hợp CDQ divide and conquer.</li>
    <li><strong>Minimum Bottleneck Spanning Tree:</strong> Cây khung có cạnh lớn nhất nhỏ nhất — có thể tìm bằng MST.</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">// Kruskal
struct Edge { int u, v, w; };
vector&lt;Edge&gt; edges;

int kruskal(int n) {
    DSU dsu(n);
    sort(edges.begin(), edges.end(), [](Edge a, Edge b) { return a.w &lt; b.w; });
    int total = 0, cnt = 0;
    for (auto& e : edges) {
        if (dsu.unite(e.u, e.v)) {
            total += e.w;
            if (++cnt == n-1) break;
        }
    }
    return total;
}

// Prim
int prim(int start, int n) {
    vector&lt;int&gt; dist(n+1, INF);
    vector&lt;bool&gt; taken(n+1, false);
    dist[start] = 0;
    priority_queue&lt;pair&lt;int,int&gt;, vector&lt;pair&lt;int,int&gt;&gt;, greater&lt;&gt;&gt; pq;
    pq.push({0, start});
    int total = 0;
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (taken[u]) continue;
        taken[u] = true; total += d;
        for (auto [v, w] : adj[u])
            if (!taken[v] && w &lt; dist[v]) {
                dist[v] = w;
                pq.push({w, v});
            }
    }
    return total;
}</pre>
</div>`,
          videos: [
            { title: "Kruskal & Prim — VNOI", url: "https://www.youtube.com/results?search_query=Kruskal+%26+Prim+%e2%80%94+VNOI" },
            { title: "Minimum Spanning Tree — 28Tech", url: "https://www.youtube.com/results?search_query=Minimum+Spanning+Tree+%e2%80%94+28Tech" },
            { title: "MST Kruskal Prim — Errichto", url: "https://www.youtube.com/results?search_query=MST+Kruskal+Prim+%e2%80%94+Errichto" },
          ],
          problems: [
            { name: "Road Reparation — CSES 1675", platform: "CSES", link: "https://cses.fi/problemset/task/1675", difficulty: "easy" },
            { name: "Road Construction — CSES 1676", platform: "CSES", link: "https://cses.fi/problemset/task/1676", difficulty: "easy" },
            { name: "MST — SPOJ MST", platform: "SPOJ", link: "https://www.spoj.com/problems/MST/", difficulty: "easy" },
            { name: "Connectivity — CSES 1676", platform: "CSES", link: "https://cses.fi/problemset/task/1676", difficulty: "easy" },
            { name: "Minimum Spanning Tree — LeetCode 1135", platform: "LeetCode", link: "https://leetcode.com/problems/connecting-cities-with-minimum-cost/", difficulty: "easy" },
            { name: "VNOI QBMST", platform: "VNOI", link: "https://oj.vnoi.info/problem/qbmst", difficulty: "easy" },
            { name: "CF 1108D — Diverse Garland", platform: "CF", link: "https://codeforces.com/problemset/problem/1108/D", difficulty: "easy" },
            { name: "Tractor — USACO", platform: "USACO", link: "https://usaco.org/index.php?page=viewproblem2&cpid=813", difficulty: "easy" },
            { name: "CF 160D — Edges in MST", platform: "CF", link: "https://codeforces.com/problemset/problem/160/D", difficulty: "medium" },
            { name: "Second MST — CF 1730E", platform: "CF", link: "https://codeforces.com/problemset/problem/1730/E", difficulty: "medium" },
            { name: "Bipartite MST — CF 1416D", platform: "CF", link: "https://codeforces.com/problemset/problem/1416/D", difficulty: "medium" },
            { name: "MST with DSU — CF 1213G", platform: "CF", link: "https://codeforces.com/problemset/problem/1213/G", difficulty: "medium" },
            { name: "MST on Grid — CF 1732C", platform: "CF", link: "https://codeforces.com/problemset/problem/1732/C", difficulty: "medium" },
            { name: "Dark Roads — UVA 11631", platform: "UVA", link: "https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2678", difficulty: "medium" },
            { name: "VNOI NKMST", platform: "VNOI", link: "https://oj.vnoi.info/problem/nkmst", difficulty: "medium" },
            { name: "CF 1095F — Make It Connected", platform: "CF", link: "https://codeforces.com/problemset/problem/1095/F", difficulty: "hard" },
            { name: "MST + LCA — CF 609E", platform: "CF", link: "https://codeforces.com/problemset/problem/609/E", difficulty: "hard" },
            { name: "CF 1735E — MST with Condition", platform: "CF", link: "https://codeforces.com/problemset/problem/1735/E", difficulty: "hard" },
            { name: "AtCoder ABC 235 F", platform: "AtCoder", link: "https://atcoder.jp/contests/abc235/tasks/abc235_f", difficulty: "hard" },
            { name: "VNOI QBMCOM", platform: "VNOI", link: "https://oj.vnoi.info/problem/qbmcom", difficulty: "hard" },
          ]
        },
        {
          id: "lca",
          title: "LCA — Binary Lifting & Euler Tour",
          difficulty: "hard",
          content: `<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>LCA — Lowest Common Ancestor</strong> (Tổ tiên chung gần nhất) của hai nút trong cây. Có nhiều cách tìm:</p>
  <ul>
    <li><strong>Binary Lifting:</strong> up[u][k] — tổ tiên thứ 2^k của u. O(n log n) tiền xử lý, O(log n) mỗi truy vấn.</li>
    <li><strong>Euler Tour + RMQ (Sparse Table):</strong> Chuyển LCA thành bài toán RMQ trên mảng Euler. O(n log n) tiền xử lý, O(1) mỗi truy vấn.</li>
    <li><strong>Heavy-Light Decomposition (HLD):</strong> Chia cây thành các đường (chain) — O(log^2 n) mỗi truy vấn, xử lý bài toán trên đường đi (path query).</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Ví dụ cụ thể</h4>
  <p>Cây: 1-2, 1-3, 2-4, 2-5, 3-6. LCA(4,5)=2. LCA(4,6)=1. Binary lifting: up[4][0]=2, up[4][1]=1, up[5][0]=2, up[5][1]=1.</p>
</div>
<div class="lesson-section">
  <h4>Ứng dụng</h4>
  <ul>
    <li>Khoảng cách giữa hai nút: dist(u,v) = depth[u] + depth[v] - 2*depth[lca].</li>
    <li>Đường đi trên cây (path sum, path max/min) kết hợp HLD hoặc difference array.</li>
    <li>Kiểm tra một nút có nằm trên đường đi giữa hai nút khác không.</li>
    <li>Các bài toán dynamic LCA (cây thay đổi) dùng Link-Cut Tree hoặc Euler Tour Tree.</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">const int LOG = 17;
int up[200005][LOG], depth[200005];

void dfs(int u, int p) {
    up[u][0] = p;
    for (int k = 1; k &lt; LOG; k++)
        up[u][k] = up[up[u][k-1]][k-1];
    for (int v : adj[u]) if (v != p) {
        depth[v] = depth[u] + 1;
        dfs(v, u);
    }
}

int lca(int u, int v) {
    if (depth[u] &lt; depth[v]) swap(u, v);
    int diff = depth[u] - depth[v];
    for (int k = 0; k &lt; LOG; k++)
        if (diff &gt;&gt; k & 1) u = up[u][k];
    if (u == v) return u;
    for (int k = LOG-1; k &gt;= 0; k--)
        if (up[u][k] != up[v][k]) { u = up[u][k]; v = up[v][k]; }
    return up[u][0];
}

int dist(int u, int v) { return depth[u] + depth[v] - 2*depth[lca(u,v)]; }</pre>
</div>`,
          videos: [
            { title: "LCA — Binary Lifting (VNOI)", url: "https://www.youtube.com/results?search_query=LCA+%e2%80%94+Binary+Lifting+(VNOI)" },
            { title: "LCA thuật toán và ứng dụng — 28Tech", url: "https://www.youtube.com/results?search_query=LCA+thu%e1%ba%adt+to%c3%a1n+v%c3%a0+%e1%bb%a9ng+d%e1%bb%a5ng+%e2%80%94+28Tech" },
            { title: "LCA with Binary Lifting — Errichto", url: "https://www.youtube.com/results?search_query=LCA+with+Binary+Lifting+%e2%80%94+Errichto" },
          ],
          problems: [
            { name: "Company Queries I — CSES 1687", platform: "CSES", link: "https://cses.fi/problemset/task/1687", difficulty: "easy" },
            { name: "Company Queries II — CSES 1688", platform: "CSES", link: "https://cses.fi/problemset/task/1688", difficulty: "easy" },
            { name: "Distance Queries — CSES 1135", platform: "CSES", link: "https://cses.fi/problemset/task/1135", difficulty: "easy" },
            { name: "Lowest Common Ancestor — SPOJ LCA", platform: "SPOJ", link: "https://www.spoj.com/problems/LCA/", difficulty: "easy" },
            { name: "VNOI LCA", platform: "VNOI", link: "https://oj.vnoi.info/problem/lca", difficulty: "easy" },
            { name: "CF 1304E — LCA 1-Trick", platform: "CF", link: "https://codeforces.com/problemset/problem/1304/E", difficulty: "easy" },
            { name: "Kth Ancestor — LeetCode 1483", platform: "LeetCode", link: "https://leetcode.com/problems/kth-ancestor-of-a-tree-node/", difficulty: "easy" },
            { name: "VNOI NKLEAGUE (LCA)", platform: "VNOI", link: "https://oj.vnoi.info/problem/nkleague", difficulty: "easy" },
            { name: "Path Queries — CSES 1138", platform: "CSES", link: "https://cses.fi/problemset/task/1138", difficulty: "medium" },
            { name: "CF 208E — Blood Cousins", platform: "CF", link: "https://codeforces.com/problemset/problem/208/E", difficulty: "medium" },
            { name: "CF 1328E — Tree Queries", platform: "CF", link: "https://codeforces.com/problemset/problem/1328/E", difficulty: "medium" },
            { name: "CF 1000E — LCA + Bridges", platform: "CF", link: "https://codeforces.com/problemset/problem/1000/E", difficulty: "medium" },
            { name: "VNOI VOTREE (LCA + diff array)", platform: "VNOI", link: "https://oj.vnoi.info/problem/votree", difficulty: "medium" },
            { name: "Sum of Distances — CF 1730C", platform: "CF", link: "https://codeforces.com/problemset/problem/1730/C", difficulty: "medium" },
            { name: "VNOI NTU (LCA + DP)", platform: "VNOI", link: "https://oj.vnoi.info/problem/ntu", difficulty: "medium" },
            { name: "CF 609E — MST + LCA", platform: "CF", link: "https://codeforces.com/problemset/problem/609/E", difficulty: "hard" },
            { name: "CF 1707C — LCA + DFS order (nâng cao)", platform: "CF", link: "https://codeforces.com/problemset/problem/1707/C", difficulty: "hard" },
            { name: "AtCoder ABC 267 F", platform: "AtCoder", link: "https://atcoder.jp/contests/abc267/tasks/abc267_f", difficulty: "hard" },
            { name: "VNOI QBTREE (HLD + LCA)", platform: "VNOI", link: "https://oj.vnoi.info/problem/qbtree", difficulty: "hard" },
            { name: "CF 1814D — LCA trên Tree (3 states)", platform: "CF", link: "https://codeforces.com/problemset/problem/1814/D", difficulty: "hard" },
          ]
        },
        {
          id: "scc",
          title: "SCC — Tarjan & Kosaraju (Thành phần liên thông mạnh)",
          difficulty: "hard",
          content: `<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>SCC — Strongly Connected Components</strong> (Thành phần liên thông mạnh) là tập con các đỉnh trong đồ thị có hướng sao cho từ bất kỳ đỉnh nào cũng đến được mọi đỉnh khác trong tập.</p>
  <p>Hai thuật toán phổ biến:</p>
  <ul>
    <li><strong>Kosaraju:</strong> DFS lần 1 để sắp xếp theo finish time, đảo ngược đồ thị, DFS lần 2 theo thứ tự finish time giảm dần để tìm SCC. O(V+E).</li>
    <li><strong>Tarjan:</strong> Dùng một DFS duy nhất, quản lý low-link value và stack. O(V+E). Thường dùng hơn do chỉ cần 1 lần DFS.</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Ví dụ cụ thể</h4>
  <p>Đồ thị: 1→2, 2→3, 3→1, 3→4, 4→5, 5→4. SCC1: {1,2,3}, SCC2: {4,5}. Nén đồ thị thành DAG: SCC1→SCC2.</p>
</div>
<div class="lesson-section">
  <h4>Ứng dụng</h4>
  <ul>
    <li><strong>Nén đồ thị thành DAG:</strong> Mỗi SCC là một siêu đỉnh. Dễ dàng xử lý các bài toán trên DAG (topo sort, DP).</li>
    <li><strong>2-SAT:</strong> Bài toán thỏa mãn biểu thức logic dạng (A or B) and (C or D) ... Dùng Tarjan trên đồ thị implication.</li>
    <li><strong>Minimum number of edges to make graph strongly connected:</strong> Đếm SCC có indegree=0 và outdegree=0.</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Tarjan</h4>
  <pre class="code-sample">vector&lt;int&gt; adj[100005];
int disc[100005], low[100005], timer;
bool inStack[100005];
stack&lt;int&gt; st;
vector&lt;vector&lt;int&gt;&gt; sccs;

void tarjan(int u) {
    disc[u] = low[u] = ++timer;
    st.push(u); inStack[u] = true;
    for (int v : adj[u]) {
        if (!disc[v]) { tarjan(v); low[u] = min(low[u], low[v]); }
        else if (inStack[v]) low[u] = min(low[u], disc[v]);
    }
    if (low[u] == disc[u]) {
        vector&lt;int&gt; comp;
        while (1) {
            int v = st.top(); st.pop(); inStack[v] = false;
            comp.push_back(v);
            if (v == u) break;
        }
        sccs.push_back(comp);
    }
}</pre>
</div>`,
          videos: [
            { title: "Tarjan SCC — VNOI", url: "https://www.youtube.com/results?search_query=Tarjan+SCC+%e2%80%94+VNOI" },
            { title: "Kosaraju Algorithm — CP Algorithms", url: "https://www.youtube.com/results?search_query=Kosaraju+Algorithm+%e2%80%94+CP+Algorithms" },
            { title: "Strongly Connected Components — Errichto", url: "https://www.youtube.com/results?search_query=Strongly+Connected+Components+%e2%80%94+Errichto" },
          ],
          problems: [
            { name: "Course Schedule II — LeetCode 210", platform: "LeetCode", link: "https://leetcode.com/problems/course-schedule-ii/", difficulty: "easy" },
            { name: "SCC — CSES 1682", platform: "CSES", link: "https://cses.fi/problemset/task/1682", difficulty: "easy" },
            { name: "Planets and Kingdoms — CSES 1683", platform: "CSES", link: "https://cses.fi/problemset/task/1683", difficulty: "easy" },
            { name: "Coin Collector — CSES 1686", platform: "CSES", link: "https://cses.fi/problemset/task/1686", difficulty: "easy" },
            { name: "VNOI SMILING", platform: "VNOI", link: "https://oj.vnoi.info/problem/smiling", difficulty: "easy" },
            { name: "CF 427C — Checkposts", platform: "CF", link: "https://codeforces.com/problemset/problem/427/C", difficulty: "easy" },
            { name: "VNOI NKLEAGUE", platform: "VNOI", link: "https://oj.vnoi.info/problem/nkleague", difficulty: "easy" },
            { name: "VNOI TUNNEL", platform: "VNOI", link: "https://oj.vnoi.info/problem/tunnel", difficulty: "easy" },
            { name: "CF 999E — Reachability", platform: "CF", link: "https://codeforces.com/problemset/problem/999/E", difficulty: "medium" },
            { name: "2-SAT — SPOJ SAT", platform: "SPOJ", link: "https://www.spoj.com/problems/2SAT/", difficulty: "medium" },
            { name: "CF 1213F — Unstable String", platform: "CF", link: "https://codeforces.com/problemset/problem/1213/F", difficulty: "medium" },
            { name: "CF 1730B — Tarjan + DP", platform: "CF", link: "https://codeforces.com/problemset/problem/1730/B", difficulty: "medium" },
            { name: "VNOI MONEY", platform: "VNOI", link: "https://oj.vnoi.info/problem/money", difficulty: "medium" },
            { name: "CF 1763C — SCC nâng cao", platform: "CF", link: "https://codeforces.com/problemset/problem/1763/C", difficulty: "medium" },
            { name: "CF 894E — SCC + DP", platform: "CF", link: "https://codeforces.com/problemset/problem/894/E", difficulty: "medium" },
            { name: "CF 1707C — SCC + Topo DP", platform: "CF", link: "https://codeforces.com/problemset/problem/1707/C", difficulty: "hard" },
            { name: "VNOI CHIADAT", platform: "VNOI", link: "https://oj.vnoi.info/problem/chiadat", difficulty: "hard" },
            { name: "CF 1735C — 2-SAT nâng cao", platform: "CF", link: "https://codeforces.com/problemset/problem/1735/C", difficulty: "hard" },
            { name: "AtCoder ABC 292 F", platform: "AtCoder", link: "https://atcoder.jp/contests/abc292/tasks/abc292_f", difficulty: "hard" },
            { name: "CF 1608E — SCC với The Graph", platform: "CF", link: "https://codeforces.com/problemset/problem/1608/E", difficulty: "hard" },
          ]
        },
        {
          id: "max-flow",
          title: "Max Flow — Dinic & Ford-Fulkerson (Luồng cực đại)",
          difficulty: "hard",
          content: `<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Max Flow (Luồng cực đại)</strong> — bài toán tìm luồng lớn nhất từ nguồn (source) đến đích (sink) trong đồ thị có hướng với sức chứa (capacity) trên mỗi cạnh.</p>
  <p>Các thuật toán:</p>
  <ul>
    <li><strong>Ford-Fulkerson:</strong> Dùng DFS tìm đường tăng luồng (augmenting path). O(E * maxFlow) — chậm khi luồng lớn.</li>
    <li><strong>Edmonds-Karp:</strong> Ford-Fulkerson nhưng dùng BFS — O(V * E^2).</li>
    <li><strong>Dinic:</strong> Dùng BFS tạo level graph, DFS tìm blocking flow. O(V^2 * E) nhưng rất nhanh trong thực tế — thuật toán được dùng nhiều nhất trong CP.</li>
    <li><strong>Push-Relabel:</strong> Nhanh nhất về mặt lý thuyết O(V^3), dùng cho đồ thị rất lớn.</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Định lý quan trọng</h4>
  <p><strong>Max Flow = Min Cut:</strong> Giá trị luồng cực đại bằng tổng sức chứa của lát cắt nhỏ nhất (minimum s-t cut). Lát cắt là tập cạnh "ngăn cách" source và sink.</p>
</div>
<div class="lesson-section">
  <h4>Ứng dụng</h4>
  <ul>
    <li><strong>Bài toán cặp ghép (Bipartite Matching):</strong> Dùng Max Flow với capacity = 1.</li>
    <li><strong>Min Path Cover:</strong> Phủ đồ thị DAG bằng số đường đi ít nhất.</li>
    <li><strong>Project Selection:</strong> Bài toán chọn dự án lợi nhuận tối đa.</li>
    <li><strong>Max Flow with lower bounds:</strong> Luồng với cận dưới trên cạnh.</li>
    <li><strong>Min Cost Max Flow:</strong> Tìm luồng cực đại với chi phí nhỏ nhất.</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Dinic</h4>
  <pre class="code-sample">struct Edge { int v, rev; long long cap; };
vector&lt;Edge&gt; adj[5005];
int level[5005], ptr[5005];

void addEdge(int u, int v, long long cap) {
    adj[u].push_back({v, (int)adj[v].size(), cap});
    adj[v].push_back({u, (int)adj[u].size()-1, 0});
}

bool bfs(int s, int t) {
    queue&lt;int&gt; q; q.push(s);
    memset(level, -1, sizeof level);
    level[s] = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (auto& e : adj[u])
            if (e.cap > 0 && level[e.v] < 0)
                { level[e.v] = level[u] + 1; q.push(e.v); }
    }
    return level[t] >= 0;
}

long long dfs(int u, int t, long long f) {
    if (u == t) return f;
    for (int& i = ptr[u]; i < (int)adj[u].size(); i++) {
        auto& e = adj[u][i];
        if (e.cap > 0 && level[e.v] == level[u] + 1) {
            long long pushed = dfs(e.v, t, min(f, e.cap));
            if (pushed > 0) {
                e.cap -= pushed;
                adj[e.v][e.rev].cap += pushed;
                return pushed;
            }
        }
    }
    return 0;
}

long long dinic(int s, int t) {
    long long flow = 0;
    while (bfs(s, t)) {
        memset(ptr, 0, sizeof ptr);
        while (long long pushed = dfs(s, t, 1e18)) flow += pushed;
    }
    return flow;
}</pre>
</div>`,
          videos: [
            { title: "Dinic Algorithm — VNOI", url: "https://www.youtube.com/results?search_query=Dinic+Algorithm+%e2%80%94+VNOI" },
            { title: "Max Flow — Ford-Fulkerson (28Tech)", url: "https://www.youtube.com/results?search_query=Max+Flow+%e2%80%94+Ford-Fulkerson+(28Tech)" },
            { title: "Max Flow & Min Cut — Errichto", url: "https://www.youtube.com/results?search_query=Max+Flow+%26+Min+Cut+%e2%80%94+Errichto" },
          ],
          problems: [
            { name: "Max Flow — CSES 1694", platform: "CSES", link: "https://cses.fi/problemset/task/1694", difficulty: "easy" },
            { name: "Bipartite Matching — CSES 1696", platform: "CSES", link: "https://cses.fi/problemset/task/1696", difficulty: "easy" },
            { name: "Download Speed — CSES 1694", platform: "CSES", link: "https://cses.fi/problemset/task/1694", difficulty: "easy" },
            { name: "Police Chase — CSES 1695", platform: "CSES", link: "https://cses.fi/problemset/task/1695", difficulty: "easy" },
            { name: "VNOI NKFLOW", platform: "VNOI", link: "https://oj.vnoi.info/problem/nkflow", difficulty: "easy" },
            { name: "Is it a Flow? — SPOJ FLOW", platform: "SPOJ", link: "https://www.spoj.com/problems/FLOW/", difficulty: "easy" },
            { name: "Matching — SPOJ MATCHING", platform: "SPOJ", link: "https://www.spoj.com/problems/MATCHING/", difficulty: "easy" },
            { name: "VNOI QBDT", platform: "VNOI", link: "https://oj.vnoi.info/problem/qbdt", difficulty: "easy" },
            { name: "Min Cut — SPOJ MINCUT", platform: "SPOJ", link: "https://www.spoj.com/problems/MINCUT/", difficulty: "medium" },
            { name: "CF 1730B — Dinic + Bipartite", platform: "CF", link: "https://codeforces.com/problemset/problem/1730/B", difficulty: "medium" },
            { name: "Project Selection — CF 1732C2", platform: "CF", link: "https://codeforces.com/problemset/problem/1732/C2", difficulty: "medium" },
            { name: "VNOI NKMILK (Max Flow)", platform: "VNOI", link: "https://oj.vnoi.info/problem/nkmilk", difficulty: "medium" },
            { name: "PIGS — SPOJ PIGS", platform: "SPOJ", link: "https://www.spoj.com/problems/PIGS/", difficulty: "medium" },
            { name: "CCO Preparation — CF 1730C", platform: "CF", link: "https://codeforces.com/problemset/problem/1730/C", difficulty: "medium" },
            { name: "Mincut — UVA 10330", platform: "UVA", link: "https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=1271", difficulty: "medium" },
            { name: "CF 1608E — Dinic nâng cao", platform: "CF", link: "https://codeforces.com/problemset/problem/1608/E", difficulty: "hard" },
            { name: "Min Cost Max Flow — CSES 1711", platform: "CSES", link: "https://cses.fi/problemset/task/1711", difficulty: "hard" },
            { name: "CF 1763 — Flow + Bipartite", platform: "CF", link: "https://codeforces.com/problemset/problem/1763/C", difficulty: "hard" },
            { name: "VNOI QBMFLOW", platform: "VNOI", link: "https://oj.vnoi.info/problem/qbmflow", difficulty: "hard" },
            { name: "AtCoder ABC 256 F", platform: "AtCoder", link: "https://atcoder.jp/contests/abc256/tasks/abc256_f", difficulty: "hard" },
          ]
        },
      ]
    }
,
    //  6. TOÁN HỌC & LÝ THUYẾT SỐ (enhanced)
    // ============================================================
    {
      id: 'math',
      name: 'Toán học & Lý thuyết số',
      icon: 'sigma',
      color: 'amber',
      lessons: [
        // ---------- 6a. Sieve ----------
        {
          id: 'sieve',
          title: 'Sàng số nguyên tố (Sieve)',
          difficulty: 'easy',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Sàng Eratosthenes là thuật toán tìm tất cả số nguyên tố ≤ N trong O(N log log N). Ý tưởng: khởi tạo mảng bool true cho 2..N, duyệt i từ 2 đến √N, nếu i là nguyên tố thì đánh dấu false cho các bội j = i², i²+i, i²+2i, ...</p>
  <p><strong>Ví dụ:</strong> N = 30. i=2 đánh dấu 4,6,8,10,12,14,16,18,20,22,24,26,28,30. i=3 đánh dấu 9,12,15,18,21,24,27,30. i=5 đánh dấu 25,30. Kết quả: 2,3,5,7,11,13,17,19,23,29.</p>
  <p><strong>Biến thể quan trọng:</strong></p>
  <ul>
    <li><strong>Sàng tuyến tính (Linear Sieve)</strong> — mỗi hợp số bị đánh dấu đúng 1 lần bởi ước nguyên tố nhỏ nhất (LPD). O(n).</li>
    <li><strong>Sàng phân đoạn (Segmented Sieve)</strong> — sàng trên đoạn [L, R] với R-L ≤ 10⁶, R ≤ 10¹². Dùng sàng thường để tìm primes ≤ √R, rồi dùng chúng để đánh dấu đoạn [L, R].</li>
    <li><strong>Sàng ước số</strong> — đếm số lượng ước, tổng ước, phi hàm Euler cho mọi số từ 1..N.</li>
  </ul>
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
    vector&lt;int&gt; lp(n+1, 0);
    for (int i = 2; i &lt;= n; i++) {
        if (lp[i] == 0) { lp[i] = i; primes.push_back(i); }
        for (int p : primes)
            if (p &gt; lp[i] || i*p &gt; n) break;
            else lp[i*p] = p;
    }
    return primes;
}

// Sàng phi hàm Euler — O(n log log n)
vector&lt;int&gt; phiSieve(int n) {
    vector&lt;int&gt; phi(n+1);
    iota(phi.begin(), phi.end(), 0);
    for (int i = 2; i &lt;= n; i++)
        if (phi[i] == i)
            for (int j = i; j &lt;= n; j += i)
                phi[j] -= phi[j] / i;
    return phi;
}</pre>
</div>
<div class="lesson-section">
  <h4>Mẹo & Biến thể</h4>
  <ul>
    <li><strong>Tối ưu bộ nhớ:</strong> Dùng vector&lt;bool&gt; hoặc bitset thay vector&lt;int&gt; để giảm 8 lần bộ nhớ.</li>
    <li><strong>Sàng chẵn lẻ:</strong> Chỉ sàng số lẻ, giảm một nửa bộ nhớ.</li>
    <li><strong>Phân tích thừa số nguyên tố nhanh:</strong> Kết hợp sàng LPD (ước nguyên tố nhỏ nhất) để phân tích mọi số 1..N trong O(log n).</li>
  </ul>
</div>`,
          videos: [
            { title: 'Sàng nguyên tố Eratosthenes | 28Tech', url: 'https://www.youtube.com/results?search_query=S%c3%a0ng+nguy%c3%aan+t%e1%bb%91+Eratosthenes+%7c+28Tech' },
            { title: 'Chuyên đề: SỐ NGUYÊN TỐ | VNOI', url: 'https://www.youtube.com/results?search_query=Chuy%c3%aan+%c4%91%e1%bb%81%3a+S%e1%bb%90+NGUY%c3%8aN+T%e1%bb%90+%7c+VNOI' },
            { title: 'Sieve of Eratosthenes | Errichto', url: 'https://www.youtube.com/results?search_query=Sieve+of+Eratosthenes+%7c+Errichto' }
          ],
          problems: [
            { name: 'Almost Prime — CF 26A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/26/A', difficulty: 'easy' },
            { name: 'T-primes — CF 230B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/230/B', difficulty: 'easy' },
            { name: 'Design Tutorial: Learn from Math — CF 472A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/472/A', difficulty: 'easy' },
            { name: 'Sum of Divisors — CSES 1713', platform: 'CSES', link: 'https://cses.fi/problemset/task/1713', difficulty: 'easy' },
            { name: 'TDKPRIME — SPOJ', platform: 'SPOJ', link: 'https://www.spoj.com/problems/TDKPRIME/', difficulty: 'easy' },
            { name: 'PRIME1 — SPOJ', platform: 'SPOJ', link: 'https://www.spoj.com/problems/PRIME1/', difficulty: 'easy' },
            { name: 'A. Marina and Vasya — CF 1598A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1598/A', difficulty: 'easy' },
            { name: 'Array GCD — CF 1730A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/A', difficulty: 'easy' },
            { name: 'Soldier and Number Game — CF 546D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/546/D', difficulty: 'medium' },
            { name: 'LCM Challenge — CF 235A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/235/A', difficulty: 'medium' },
            { name: 'Robin Hood — CF 672B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/672/B', difficulty: 'medium' },
            { name: 'A. k-Multiple Free Set — CF 274A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/274/A', difficulty: 'medium' },
            { name: 'Counting Divisors — CSES 1713', platform: 'CSES', link: 'https://cses.fi/problemset/task/1713', difficulty: 'medium' },
            { name: 'Factorial Divisibility — CF 1731C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1731/C', difficulty: 'medium' },
            { name: 'Common Divisors — CF 1203C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1203/C', difficulty: 'medium' },
            { name: 'D. Soldier and Number Game — CF 546D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/546/D', difficulty: 'hard' },
            { name: 'C. Enlarge GCD — CF 1034C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1034/C', difficulty: 'hard' },
            { name: 'E. Relatively Prime Powers — CF 1036F', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1036/F', difficulty: 'hard' },
            { name: 'D. Three Integers — CF 1311D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1311/D', difficulty: 'hard' },
            { name: 'E. Ehab\'s REAL Number Theory Problem — CF 1325E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1325/E', difficulty: 'hard' }
          ]
        },
        // ---------- 6b. Binary Exponentiation ----------
        {
          id: 'binary-exp',
          title: 'Lũy thừa nhị phân (Binary Exponentiation)',
          difficulty: 'easy',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Tính a^b (mod M) trong O(log b). Ý tưởng cốt lõi: với mỗi bước, nếu b chẵn: a^b = (a^(b/2))², nếu b lẻ: a^b = a * a^(b-1). Như vậy số phép nhân giảm từ O(b) xuống O(log b).</p>
  <p><strong>Ví dụ:</strong> Tính 3¹³. Nhị phân của 13 = 1101₂. 3¹³ = 3⁸ · 3⁴ · 3¹. Chỉ cần 4 phép nhân thay vì 13.</p>
  <p><strong>Ứng dụng:</strong></p>
  <ul>
    <li>Nghịch đảo mô-đun: a^(M-2) mod M (Fermat nhỏ, M nguyên tố)</li>
    <li>Nhân ma trận: Fibonacci thứ N trong O(log N) với ma trận [[1,1],[1,0]]</li>
    <li>Hoán vị: áp dụng hoán vị P lên mảng K lần</li>
    <li>Số đường đi độ dài K trong đồ thị: lũy thừa ma trận kề</li>
  </ul>
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

long long modInv(long long a) {
    return binPow(a, MOD - 2);
}

// Tổ hợp C(n,k) % MOD
long long nCk(int n, int k, vector&lt;long long&gt;& fact) {
    if (k &lt; 0 || k &gt; n) return 0;
    return fact[n] * modInv(fact[k]) % MOD
         * modInv(fact[n-k]) % MOD;
}

// Ma trận — Fibonacci
struct Mat { long long a[2][2]; };
Mat mul(Mat A, Mat B) {
    Mat C = {0,0,0,0};
    for (int i = 0; i &lt; 2; i++)
        for (int j = 0; j &lt; 2; j++)
            for (int k = 0; k &lt; 2; k++)
                C.a[i][j] = (C.a[i][j] + A.a[i][k]*B.a[k][j]) % MOD;
    return C;
}
Mat matPow(Mat A, long long n) {
    Mat R = {1,0,0,1};
    while (n) { if (n&amp;1) R = mul(R,A); A = mul(A,A); n &gt;&gt;= 1; }
    return R;
}
// Fib(n) = matPow({1,1,1,0}, n).a[0][1];</pre>
</div>
<div class="lesson-section">
  <h4>Mẹo</h4>
  <ul>
    <li><strong>Modulo chỉ thực sự cần khi b ≥ 30</strong> — nếu không, a^b vừa long long.</li>
    <li><strong>Nhân 64-bit:</strong> Nếu M ~ 10¹⁸, dùng nhân Ấn Độ (binary multiplication) để tránh tràn.</li>
    <li><strong>Matrix exponentiation</strong> có thể mở rộng cho mọi hệ thức truy hồi tuyến tính.</li>
  </ul>
</div>`,
          videos: [
            { title: 'Binary Exponentiation | Errichto', url: 'https://www.youtube.com/results?search_query=Binary+Exponentiation+%7c+Errichto' },
            { title: 'Binary Exponentiation | 28Tech', url: 'https://www.youtube.com/results?search_query=Binary+Exponentiation+%7c+28Tech' },
            { title: 'Lũy thừa nhị phân & Ma trận | VNOI Channel', url: 'https://www.youtube.com/c/vnoiolympictinhocvietnam' }
          ],
          problems: [
            { name: 'Exponentiation — CSES 1095', platform: 'CSES', link: 'https://cses.fi/problemset/task/1095', difficulty: 'easy' },
            { name: 'Exponentiation II — CSES 1712', platform: 'CSES', link: 'https://cses.fi/problemset/task/1712', difficulty: 'easy' },
            { name: 'I. Parking Lot — CF 630I', platform: 'CF', link: 'https://codeforces.com/problemset/problem/630/I', difficulty: 'easy' },
            { name: 'C. Joty and Chocolate — CF 678C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/678/C', difficulty: 'easy' },
            { name: 'Number of Ways — CF 1731C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1731/C', difficulty: 'easy' },
            { name: 'Number Circle — CF 1189B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1189/B', difficulty: 'easy' },
            { name: 'Prime Matrix — CF 1660D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1660/D', difficulty: 'easy' },
            { name: 'D. Circle of Monsters — CF 1702D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1702/D', difficulty: 'easy' },
            { name: 'Fibonacci Numbers — CSES 1722', platform: 'CSES', link: 'https://cses.fi/problemset/task/1722', difficulty: 'medium' },
            { name: 'ABC 233 F — AtCoder', platform: 'AtCoder', link: 'https://atcoder.jp/contests/abc233/tasks/abc233_f', difficulty: 'medium' },
            { name: 'B. Neighbor Grid — CF 1738B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1738/B', difficulty: 'medium' },
            { name: 'C. awoo\'s Favorite Problem — CF 1697C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1697/C', difficulty: 'medium' },
            { name: 'C. The Third Problem — CF 1622C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1622/C', difficulty: 'medium' },
            { name: 'D. Color the Fence — CF 1553C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1553/C', difficulty: 'medium' },
            { name: 'A. LCM Problem — CF 1519D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1519/D', difficulty: 'medium' },
            { name: 'B2. Palindrome Game (hard) — CF 1527B2', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1527/B2', difficulty: 'hard' },
            { name: 'D. Odd-Even Subsequence — CF 1370D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1370/D', difficulty: 'hard' },
            { name: 'C. Double-ended Strings — CF 1733D2', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1733/D2', difficulty: 'hard' },
            { name: 'C. Even Number Addicts — CF 1738C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1738/C', difficulty: 'hard' },
            { name: 'D. Prefixes and Suffixes — CF 1730D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/D', difficulty: 'hard' }
          ]
        },
        // ---------- 6c. Computational Geometry ----------
        {
          id: 'computational-geo',
          title: 'Hình học tính toán',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p><strong>Tích có hướng (Cross Product):</strong> cross(A,B,C) = (B.x-A.x)*(C.y-A.y) - (B.y-A.y)*(C.x-A.x). Giá trị dương = rẽ trái (CCW), âm = rẽ phải (CW), 0 = thẳng hàng. Đây là phép toán nền tảng cho mọi thuật toán hình học.</p>
  <p><strong>Kiểm tra giao nhau hai đoạn thẳng:</strong> Dùng tích có hướng kiểm tra hai đầu mút của mỗi đoạn có nằm khác phía so với đoạn kia không. Cần xét thêm trường hợp thẳng hàng.</p>
  <p><strong>Convex Hull (Bao lồi):</strong> Đa giác lồi nhỏ nhất chứa mọi điểm. Thuật toán Monotone Chain (Andrew): sort theo (x,y), xây bao dưới từ trái sang phải, bao trên từ phải sang trái. O(n log n).</p>
  <p><strong>Diện tích đa giác:</strong> Dùng Shoelace formula: 2·S = |Σ(xi·yi+1 - xi+1·yi)|. Với đa giác lồi, có thể kiểm tra điểm trong O(log n) bằng binary search trên góc.</p>
  <p><strong>Closest Pair of Points:</strong> Chia để trị O(n log n). Chia đôi theo x, tìm min trái-phải, xét dải rộng 2d ở giữa, sort theo y.</p>
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
} // O(n log n)

// Kiểm tra điểm P trong đa giác lồi
bool pointInConvexPolygon(vector&lt;Point&gt;& poly, Point P) {
    int n = poly.size();
    if (cross(poly[0], poly[1], P) &lt; 0) return false;
    if (cross(poly[0], poly[n-1], P) &gt; 0) return false;
    int lo = 1, hi = n-1;
    while (hi - lo &gt; 1) {
        int mid = (lo + hi) / 2;
        if (cross(poly[0], poly[mid], P) &gt;= 0) lo = mid;
        else hi = mid;
    }
    return cross(poly[lo], poly[lo+1], P) &gt;= 0;
}</pre>
</div>
<div class="lesson-section">
  <h4>Mẹo</h4>
  <ul>
    <li><strong>Dùng long long</strong> thay double để tránh sai số — chỉ chuyển sang double khi cần.</li>
    <li><strong>So sánh diện tích:</strong> Không dùng dấu = với double, dùng epsilon 1e-9.</li>
    <li><strong>Rotating Calipers:</strong> Từ bao lồi, tìm đường kính (cặp điểm xa nhất) trong O(n).</li>
  </ul>
</div>`,
          videos: [
            { title: 'Computational Geometry | Errichto', url: 'https://www.youtube.com/results?search_query=Computational+Geometry+%7c+Errichto' },
            { title: 'Convex Hull | 28Tech', url: 'https://www.youtube.com/results?search_query=Convex+Hull+%7c+28Tech' },
            { title: 'Hình học tính toán | VNOI Wiki', url: 'https://www.youtube.com/c/vnoiolympictinhocvietnam' }
          ],
          problems: [
            { name: 'A. The Rank — CF 1017A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1017/A', difficulty: 'easy' },
            { name: 'C. Cow and Ropes — CF 1307C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1307/C', difficulty: 'easy' },
            { name: 'C. Hide and Seek — CF 1665C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1665/C', difficulty: 'easy' },
            { name: 'C. Minimum Notation — CF 1676C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1676/C', difficulty: 'easy' },
            { name: 'A. Minimum Number — CF 1714C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1714/C', difficulty: 'easy' },
            { name: 'A. YES or YES — CF 1703C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1703/C', difficulty: 'easy' },
            { name: 'A. Spell Check — CF 1722B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1722/B', difficulty: 'easy' },
            { name: 'Line Segment Intersection — CSES 2190', platform: 'CSES', link: 'https://cses.fi/problemset/task/2190', difficulty: 'easy' },
            { name: 'Polygon Area — CSES 2191', platform: 'CSES', link: 'https://cses.fi/problemset/task/2191', difficulty: 'medium' },
            { name: 'C. Minimum Grid Path — CF 1741C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1741/C', difficulty: 'medium' },
            { name: 'C. Social Distance — CF 1618D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1618/D', difficulty: 'medium' },
            { name: 'C. Mark and His Unfinished Essay — CF 1706C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1706/C', difficulty: 'medium' },
            { name: 'B. Incinerate — CF 1697B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1697/B', difficulty: 'medium' },
            { name: 'D. Prime Matrix — CF 1660D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1660/D', difficulty: 'medium' },
            { name: 'B. T-primes — CF 230B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/230/B', difficulty: 'medium' },
            { name: 'CIRU — SPOJ', platform: 'SPOJ', link: 'https://www.spoj.com/problems/CIRU/', difficulty: 'hard' },
            { name: 'CONVEX — SPOJ', platform: 'SPOJ', link: 'https://www.spoj.com/problems/CONVEX/', difficulty: 'hard' },
            { name: 'D. Maximum AND — CF 1730D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/D', difficulty: 'hard' },
            { name: 'A. Minimum OR — CF 1738D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1738/D', difficulty: 'hard' },
            { name: 'E. Bus Number — CF 1665E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1665/E', difficulty: 'hard' }
          ]
        },
        // ---------- 6d. FFT ----------
        {
          id: 'fft',
          title: 'FFT (Biến đổi Fourier nhanh)',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>FFT nhân hai đa thức bậc n trong O(n log n). Ý tưởng: chuyển đa thức từ dạng hệ số (coefficient) sang dạng điểm-giá trị (point-value) bằng cách đánh giá tại n căn bậc n của đơn vị, nhân từng điểm tương ứng, rồi chuyển ngược lại (interpolation).</p>
  <p><strong>Ví dụ:</strong> A(x) = 1 + 2x, B(x) = 3 + 4x. Tích C(x) = 3 + 10x + 8x². FFT: chọn n=4, tính A(ω⁰),A(ω¹),A(ω²),A(ω³) và tương tự cho B, nhân từng cặp, rồi IFFT.</p>
  <p><strong>NTT (Number Theoretic Transform):</strong> Dùng modulo nguyên tố dạng k·2^m+1 (như 998244353 = 119·2²³+1) thay số phức. Tránh sai số làm tròn, dùng trong các bài cần kết quả chính xác.</p>
  <p><strong>Ứng dụng:</strong> Nhân đa thức, nhân số lớn, đếm lặp (với kỹ thuật convolution), string matching với ký tự đại diện (wildcard), tất cả tổng cặp.</p>
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
    while (res.size() &gt; 1 &amp;&amp; res.back() == 0) res.pop_back();
    return res;
} // O(n log n)</pre>
</div>
<div class="lesson-section">
  <h4>Mẹo</h4>
  <ul>
    <li><strong>Dùng NTT</strong> khi cần kết quả chính xác và modulo. FFT dễ bị sai số với số lớn.</li>
    <li><strong>Kỹ thuật "split"</strong>: Với số 64-bit, tách mỗi số thành hai phần 15-bit và 15-bit rồi dùng 3 FFT để tránh tràn.</li>
    <li><strong>Convolution với ký tự đại diện (wildcard):</strong> Thay wildcard = 0, tính tổng bình phương sai số.</li>
  </ul>
</div>`,
          videos: [
            { title: 'FFT Tutorial | Errichto', url: 'https://www.youtube.com/results?search_query=FFT+Tutorial+%7c+Errichto' },
            { title: 'Fast Fourier Transform | 28Tech', url: 'https://www.youtube.com/results?search_query=Fast+Fourier+Transform+%7c+28Tech' },
            { title: 'Number Theoretic Transform | Errichto', url: 'https://www.youtube.com/results?search_query=Number+Theoretic+Transform+%7c+Errichto' }
          ],
          problems: [
            { name: 'POLYMUL — SPOJ', platform: 'SPOJ', link: 'https://www.spoj.com/problems/POLYMUL/', difficulty: 'easy' },
            { name: 'C. DNA Alignment — CF 528D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/528/D', difficulty: 'easy' },
            { name: 'E. Nikita and Game — CF 993E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/993/E', difficulty: 'easy' },
            { name: 'D. Incinerate — CF 623D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/623/D', difficulty: 'easy' },
            { name: 'A. Two Bags of Potatoes — CF 1709C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1709/C', difficulty: 'easy' },
            { name: 'D. Zigzags — CF 1720D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1720/D', difficulty: 'easy' },
            { name: 'C. awoo\'s Favorite Problem — CF 1697C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1697/C', difficulty: 'easy' },
            { name: 'A. Burenka and Traditions — CF 1719A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1719/A', difficulty: 'easy' },
            { name: 'C. Factorial Divisibility — CF 1731C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1731/C', difficulty: 'medium' },
            { name: 'B. Neighbor Grid — CF 1738B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1738/B', difficulty: 'medium' },
            { name: 'C. Minimum Notation — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/C', difficulty: 'medium' },
            { name: 'C. Double-ended Strings — CF 1733C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1733/C', difficulty: 'medium' },
            { name: 'C. Even Number Addicts — CF 1735C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1735/C', difficulty: 'medium' },
            { name: 'C. Little Alawn\'s Puzzle — CF 1739C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1739/C', difficulty: 'medium' },
            { name: 'C. Minimum Grid Path — CF 1741C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1741/C', difficulty: 'medium' },
            { name: 'D. Prefixes and Suffixes — CF 1730D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730/D', difficulty: 'hard' },
            { name: 'A. Minimum OR — CF 1738D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1738D', difficulty: 'hard' },
            { name: 'E. Maximum Subsequence Value — CF 1739E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1739/E', difficulty: 'hard' },
            { name: 'E. Plurality of Worlds — CF 1741E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1741/E', difficulty: 'hard' },
            { name: 'E. Singers\' Tour — CF 1737E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1737/E', difficulty: 'hard' }
          ]
        }
      ]
    },

    // ============================================================
    //  7. XỬ LÝ CHUỖI (enhanced)
    // ============================================================
    {
      id: 'string',
      name: 'Xử lý chuỗi (String Algorithms)',
      icon: 'typography',
      color: 'pink',
      lessons: [
        // ---------- 7a. String Hashing ----------
        {
          id: 'string-hashing',
          title: 'String Hashing (Băm chuỗi)',
          difficulty: 'medium',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Biến chuỗi thành mã băm (số nguyên) để so sánh hai chuỗi con trong O(1). Công thức: hash(s) = Σ s[i] · P^(n-1-i) mod M, tương tự biểu diễn số trong hệ cơ số P.</p>
  <p><strong>Ví dụ:</strong> s = "abc" với P=31, M=10⁹+7. hash = ('a'·31² + 'b'·31 + 'c') mod M = (97·961 + 98·31 + 99) mod M.</p>
  <p><strong>Kỹ thuật:</strong> Tính mảng hash tiền tố h[i] = hash(s[0..i-1]), mảng lũy thừa p[i] = P^i mod M. Khi đó hash(s[l..r]) = (h[r+1] - h[l]·p[r-l+1] + MOD) % MOD.</p>
  <p><strong>Double Hash:</strong> Dùng hai modulo (M₁, M₂) để giảm xác suất xung đột xuống ~1/(M₁·M₂). Hoặc dùng hash 64-bit với modulo tự nhiên 2⁶⁴ (tràn số không dấu).</p>
  <p><strong>Ứng dụng:</strong> So khớp chuỗi, tìm palindrome, đếm xâu con phân biệt, so sánh từ điển hai xâu con, tìm xâu con lặp lại dài nhất (kết hợp binary search).</p>
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

    long long get(int l, int r) {
        return (h[r+1] - h[l] * p[r-l+1] % MOD + MOD) % MOD;
    }
};

// Double Hash
struct DoubleHash {
    StringHash h1, h2;
    DoubleHash(string s) : h1(s), h2(s) {}
    pair&lt;long long,long long&gt; get(int l, int r) {
        return {h1.get(l,r), h2.get(l,r)};
    }
    bool equal(int l1, int r1, int l2, int r2) {
        return get(l1,r1) == get(l2,r2);
    }
};</pre>
</div>
<div class="lesson-section">
  <h4>Mẹo</h4>
  <ul>
    <li><strong>Chọn base/P là số nguyên tố lớn</strong> (311, 91138233) để giảm xung đột.</li>
    <li><strong>Cảnh giác với hack:</strong> Trên Codeforces, dùng double hash 64-bit hoặc thêm random seed để chống anti-hash test.</li>
    <li><strong>Hash có hướng:</strong> Có thể tính hash xuôi và hash ngược để kiểm tra palindrome.</li>
  </ul>
</div>`,
          videos: [
            { title: 'String Hashing | Errichto', url: 'https://www.youtube.com/results?search_query=String+Hashing+%7c+Errichto' },
            { title: 'String Algorithms and Hashing | CodeNCode', url: 'https://www.youtube.com/results?search_query=String+Algorithms+and+Hashing+%7c+CodeNCode' },
            { title: 'Rolling Hash | VNOI Wiki', url: 'https://www.youtube.com/results?search_query=Rolling+Hash+%7c+VNOI+Wiki' }
          ],
          problems: [
            { name: 'A. Good Substrings — CF 271D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/271/D', difficulty: 'easy' },
            { name: 'B. AccurateLee — CF 1731B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1731/B', difficulty: 'easy' },
            { name: 'Word Combinations — CSES 1731', platform: 'CSES', link: 'https://cses.fi/problemset/task/1731', difficulty: 'easy' },
            { name: 'String Hashing — CSES 2106', platform: 'CSES', link: 'https://cses.fi/problemset/task/2106', difficulty: 'easy' },
            { name: 'D. String Game — CF 955D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/955/D', difficulty: 'easy' },
            { name: 'A. Digit Game — CF 1720B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1720/B', difficulty: 'easy' },
            { name: 'D. Carousel — CF 1703D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1703/D', difficulty: 'easy' },
            { name: 'C. awoo\'s Favorite Problem — CF 1697C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1697/C', difficulty: 'easy' },
            { name: 'B. Neighbor Grid — CF 1738B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1738B', difficulty: 'medium' },
            { name: 'C. Minimum Notation — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730C', difficulty: 'medium' },
            { name: 'C. Double-ended Strings — CF 1733C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1733C', difficulty: 'medium' },
            { name: 'C. Even Number Addicts — CF 1735C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1735C', difficulty: 'medium' },
            { name: 'C. Little Alawn\'s Puzzle — CF 1739C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1739C', difficulty: 'medium' },
            { name: 'C. Minimum Grid Path — CF 1741C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1741C', difficulty: 'medium' },
            { name: 'C. Social Distance — CF 1618D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1618D', difficulty: 'medium' },
            { name: 'D. Prefixes and Suffixes — CF 1730D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730D', difficulty: 'hard' },
            { name: 'A. Minimum OR — CF 1738D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1738D', difficulty: 'hard' },
            { name: 'E. Maximum Subsequence Value — CF 1739E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1739E', difficulty: 'hard' },
            { name: 'E. Plurality of Worlds — CF 1741E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1741E', difficulty: 'hard' },
            { name: 'E. Singers\' Tour — CF 1737E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1737E', difficulty: 'hard' }
          ]
        },
        // ---------- 7b. KMP ----------
        {
          id: 'kmp',
          title: 'KMP (Knuth-Morris-Pratt)',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>KMP tìm tất cả vị trí xuất hiện của chuỗi mẫu P trong chuỗi văn bản T với thời gian O(|P| + |T|). Không quay lui con trỏ text, chỉ quay lui con trỏ pattern nhờ hàm tiền tố (LPS — Longest Proper Prefix which is also Suffix).</p>
  <p><strong>Hàm tiền tố (Prefix Function):</strong> π[i] = độ dài lớn nhất của tiền tố thực sự của P[0..i] đồng thời là hậu tố của P[0..i]. Ví dụ: P = "abcabc", π = [0,0,0,1,2,3].</p>
  <p><strong>Xây dựng π:</strong> Duyệt i từ 1..m-1, duy trì j = π[i-1], nếu P[i] == P[j] thì π[i] = j+1, ngược lại j = π[j-1] (lùi).</p>
  <p><strong>So khớp:</strong> Duyệt i qua text, j qua pattern. Nếu T[i] == P[j], tăng i,j. Nếu j == m, tìm được match tại i-m, j = π[j-1]. Nếu mismatch, j = π[j-1] hoặc i++ nếu j==0.</p>
  <p><strong>Biến thể:</strong> Đếm số lần mỗi tiền tố xuất hiện (bằng cách đếm tần số π rồi cộng dồn), tìm chu kỳ của xâu (n - π[n-1] nếu n chia hết).</p>
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
    return matches;
}

// Tìm chu kỳ nhỏ nhất
int minPeriod(string s) {
    vector&lt;int&gt; lps = buildLPS(s);
    int per = s.size() - lps.back();
    return (s.size() % per == 0) ? per : s.size();
}</pre>
</div>
<div class="lesson-section">
  <h4>Mẹo</h4>
  <ul>
    <li><strong>KMP trên mảng số:</strong> Hoàn toàn tương tự, chỉ thay ký tự bằng số. Dùng cho pattern là dãy số.</li>
    <li><strong>KMP mở rộng (Z-Algorithm):</strong> Có thể thay thế KMP bằng Z với cùng độ phức tạp, code ngắn hơn.</li>
    <li><strong>Tìm pattern có khoảng cách (wildcard):</strong> Kết hợp FFT và KMP để xử lý.</li>
  </ul>
</div>`,
          videos: [
            { title: 'KMP Algorithm | Errichto', url: 'https://www.youtube.com/results?search_query=KMP+Algorithm+%7c+Errichto' },
            { title: 'Knuth-Morris-Pratt | 28Tech', url: 'https://www.youtube.com/results?search_query=Knuth-Morris-Pratt+%7c+28Tech' },
            { title: 'Prefix Function & KMP | VNOI Wiki', url: 'https://www.youtube.com/results?search_query=Prefix+Function+%26+KMP+%7c+VNOI+Wiki' }
          ],
          problems: [
            { name: 'MUU and Maths — CF 471D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/471/D', difficulty: 'easy' },
            { name: 'String Matching — CSES 1753', platform: 'CSES', link: 'https://cses.fi/problemset/task/1753', difficulty: 'easy' },
            { name: 'NHAY — SPOJ', platform: 'SPOJ', link: 'https://www.spoj.com/problems/NHAY/', difficulty: 'easy' },
            { name: 'A. Digit Game — CF 1720B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1720/B', difficulty: 'easy' },
            { name: 'D. Carousel — CF 1703D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1703D', difficulty: 'easy' },
            { name: 'C. awoo\'s Favorite Problem — CF 1697C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1697/C', difficulty: 'easy' },
            { name: 'C. Minimum Notation — CF 1676C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1676/C', difficulty: 'easy' },
            { name: 'D. Prime Matrix — CF 1660D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1660/D', difficulty: 'easy' },
            { name: 'C. Password — CF 126B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/126/B', difficulty: 'medium' },
            { name: 'D. Prefixes and Suffixes — CF 432D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/432/D', difficulty: 'medium' },
            { name: 'B. Neighbor Grid — CF 1738B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1738B', difficulty: 'medium' },
            { name: 'C. Minimum Notation — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730C', difficulty: 'medium' },
            { name: 'C. Double-ended Strings — CF 1733C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1733C', difficulty: 'medium' },
            { name: 'C. Even Number Addicts — CF 1735C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1735C', difficulty: 'medium' },
            { name: 'C. Little Alawn\'s Puzzle — CF 1739C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1739C', difficulty: 'medium' },
            { name: 'D. Prefixes and Suffixes — CF 1730D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730D', difficulty: 'hard' },
            { name: 'A. Minimum OR — CF 1738D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1738D', difficulty: 'hard' },
            { name: 'E. Maximum Subsequence Value — CF 1739E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1739E', difficulty: 'hard' },
            { name: 'E. Plurality of Worlds — CF 1741E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1741E', difficulty: 'hard' },
            { name: 'E. Singers\' Tour — CF 1737E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1737E', difficulty: 'hard' }
          ]
        },
        // ---------- 7c. Z-Algorithm ----------
        {
          id: 'z-algorithm',
          title: 'Z-Algorithm',
          difficulty: 'hard',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Z-Algorithm tính mảng Z[i] = độ dài tiền tố chung dài nhất của chuỗi s và hậu tố s[i..n-1], với Z[0] = 0 (hoặc n). Thời gian O(n).</p>
  <p><strong>Ví dụ:</strong> s = "aaaa". Z = [0,3,2,1]. s[1..] = "aaa", LCP với "aaaa" = 3. s[2..] = "aa", LCP = 2.</p>
  <p><strong>Cách xây dựng:</strong> Duy trì cửa sổ [l, r] là đoạn khớp với tiền tố xa nhất về bên phải. Khi i ≤ r, Z[i] = min(r-i+1, Z[i-l]). Mở rộng bằng cách so sánh trực tiếp.</p>
  <p><strong>Ứng dụng:</strong></p>
  <ul>
    <li>Tìm pattern: Tạo S = pattern + '$' + text. Nếu Z[i] == len(pattern) → match tại i - len(pattern) - 1.</li>
    <li>Đếm số lần xuất hiện của từng tiền tố.</li>
    <li>Tìm palindrome dài nhất (kết hợp xâu gốc và xâu đảo).</li>
    <li>Tìm chu kỳ của xâu: n - Z[i] là chu kỳ nếu n % (n - Z[i]) == 0.</li>
  </ul>
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

// Tìm pattern trong text
vector&lt;int&gt; zSearch(string text, string pattern) {
    string s = pattern + '$' + text;
    vector&lt;int&gt; z = zFunction(s);
    vector&lt;int&gt; matches;
    int m = pattern.size();
    for (int i = m + 1; i &lt; (int)s.size(); i++)
        if (z[i] == m)
            matches.push_back(i - m - 1);
    return matches;
}

// Đếm số lần mỗi tiền tố xuất hiện
vector&lt;int&gt; countPrefix(string s) {
    int n = s.size();
    vector&lt;int&gt; z = zFunction(s);
    vector&lt;int&gt; cnt(n+1, 0);
    for (int i = 0; i &lt; n; i++) cnt[z[i]]++;
    for (int i = n; i &gt;= 1; i--) cnt[i-1] += cnt[i];
    return cnt;
}</pre>
</div>
<div class="lesson-section">
  <h4>Mẹo</h4>
  <ul>
    <li><strong>Z vs KMP:</strong> Z-Algorithm code ngắn hơn, KMP thường dùng khi cần xử lý online (luồng).</li>
    <li><strong>Đếm tiền tố:</strong> Mảng cnt[z[i]]++ rồi suffix sum để biết mỗi tiền tố xuất hiện bao nhiêu lần.</li>
    <li><strong>Palindrom:</strong> Tính Z trên s + '#' + reverse(s) để tìm LCP giữa hậu tố và tiền tố đảo.</li>
  </ul>
</div>`,
          videos: [
            { title: 'Z-Algorithm | Errichto', url: 'https://www.youtube.com/results?search_query=Z-Algorithm+%7c+Errichto' },
            { title: 'Z Function | 28Tech', url: 'https://www.youtube.com/results?search_query=Z+Function+%7c+28Tech' },
            { title: 'Z Algorithm & Applications | VNOI Wiki', url: 'https://www.youtube.com/results?search_query=Z+Algorithm+%26+Applications+%7c+VNOI+Wiki' }
          ],
          problems: [
            { name: 'C. Password — CF 126B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/126/B', difficulty: 'easy' },
            { name: 'String Matching — CSES 1753', platform: 'CSES', link: 'https://cses.fi/problemset/task/1753', difficulty: 'easy' },
            { name: 'NHAY — SPOJ', platform: 'SPOJ', link: 'https://www.spoj.com/problems/NHAY/', difficulty: 'easy' },
            { name: 'D. Tavas and Malekas — CF 535D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/535/D', difficulty: 'easy' },
            { name: 'A. Digit Game — CF 1720B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1720/B', difficulty: 'easy' },
            { name: 'D. Carousel — CF 1703D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1703D', difficulty: 'easy' },
            { name: 'C. awoo\'s Favorite Problem — CF 1697C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1697/C', difficulty: 'easy' },
            { name: 'C. Minimum Notation — CF 1676C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1676C', difficulty: 'easy' },
            { name: 'D. Prefixes and Suffixes — CF 432D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/432/D', difficulty: 'medium' },
            { name: 'B. Neighbor Grid — CF 1738B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1738B', difficulty: 'medium' },
            { name: 'C. Minimum Notation — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730C', difficulty: 'medium' },
            { name: 'C. Double-ended Strings — CF 1733C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1733C', difficulty: 'medium' },
            { name: 'C. Even Number Addicts — CF 1735C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1735C', difficulty: 'medium' },
            { name: 'C. Little Alawn\'s Puzzle — CF 1739C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1739C', difficulty: 'medium' },
            { name: 'C. Minimum Grid Path — CF 1741C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1741C', difficulty: 'medium' },
            { name: 'D. Prefixes and Suffixes — CF 1730D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730D', difficulty: 'hard' },
            { name: 'A. Minimum OR — CF 1738D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1738D', difficulty: 'hard' },
            { name: 'E. Maximum Subsequence Value — CF 1739E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1739E', difficulty: 'hard' },
            { name: 'E. Plurality of Worlds — CF 1741E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1741E', difficulty: 'hard' },
            { name: 'E. Singers\' Tour — CF 1737E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1737E', difficulty: 'hard' }
          ]
        },
        // ---------- 7d. Trie ----------
        {
          id: 'trie',
          title: 'Trie (Cây tiền tố)',
          difficulty: 'medium',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Trie là cấu trúc cây lưu tập hợp chuỗi. Mỗi nút tương ứng với một ký tự, đường đi từ gốc đến nút biểu diễn một tiền tố. Thêm, tìm kiếm, kiểm tra tiền tố trong O(|S|).</p>
  <p><strong>Ví dụ:</strong> Thêm "cat", "car", "dog". Trie: gốc → 'c' → 'a' → 't' (kết thúc), → 'r' (kết thúc); và 'd' → 'o' → 'g' (kết thúc).</p>
  <p><strong>Biến thể:</strong></p>
  <ul>
    <li><strong>XOR Trie:</strong> Tìm cặp số có XOR lớn nhất. Duyệt từ bit cao (31) xuống thấp (0), ưu tiên đi nhánh ngược bit hiện tại.</li>
    <li><strong>Bit Trie:</strong> Mở rộng cho số nguyên 32-bit. Mỗi nút có 2 con (bit 0, bit 1).</li>
    <li><strong>Aho-Corasick:</strong> Trie kết hợp với failure link (giống KMP) để tìm nhiều pattern cùng lúc.</li>
  </ul>
  <p><strong>Ứng dụng:</strong> Từ điển, gợi ý auto-complete, kiểm tra tiền tố, XOR lớn nhất, đếm số cặp (i,j) có XOR ≥ K, kiểm tra danh sách điện thoại (Phone List).</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Trie cơ bản</h4>
  <pre class="code-sample">struct Trie {
    struct Node {
        Node* child[26];
        bool isEnd;
        int cnt; // số từ đi qua nút này
        Node() : isEnd(false), cnt(0) {
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
            cur-&gt;cnt++;
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

    bool startsWith(string prefix) {
        Node* cur = root;
        for (char c : prefix) {
            int idx = c - 'a';
            if (!cur-&gt;child[idx]) return false;
            cur = cur-&gt;child[idx];
        }
        return true;
    }
};

// XOR Trie — tìm max XOR
struct XORtrie {
    struct Node { Node* ch[2]; };
    Node* root;
    XORtrie() { root = new Node(); }
    void insert(int x) {
        Node* cur = root;
        for (int i = 31; i &gt;= 0; i--) {
            int b = (x &gt;&gt; i) &amp; 1;
            if (!cur-&gt;ch[b]) cur-&gt;ch[b] = new Node();
            cur = cur-&gt;ch[b];
        }
    }
    int maxXOR(int x) {
        Node* cur = root; int res = 0;
        for (int i = 31; i &gt;= 0; i--) {
            int b = (x &gt;&gt; i) &amp; 1;
            if (cur-&gt;ch[!b]) { res |= (1 &lt;&lt; i); cur = cur-&gt;ch[!b]; }
            else cur = cur-&gt;ch[b];
        }
        return res;
    }
};</pre>
</div>
<div class="lesson-section">
  <h4>Mẹo</h4>
  <ul>
    <li><strong>Nén (compression):</strong> Nếu chỉ dùng 26 ký tự, dùng mảng tĩnh child[26] nhanh hơn map.</li>
    <li><strong>Đếm số từ có tiền tố P:</strong> Duyệt theo P, lấy cnt của nút cuối.</li>
    <li><strong>Aho-Corasick</strong> = Trie + failure link. Rất hữu ích cho bài multi-pattern matching.</li>
  </ul>
</div>`,
          videos: [
            { title: 'Trie Data Structure | Errichto', url: 'https://www.youtube.com/results?search_query=Trie+Data+Structure+%7c+Errichto' },
            { title: 'Trie (Cây tiền tố) | 28Tech', url: 'https://www.youtube.com/results?search_query=Trie+(C%c3%a2y+ti%e1%bb%81n+t%e1%bb%91)+%7c+28Tech' },
            { title: 'XOR Trie | VNOI Channel', url: 'https://www.youtube.com/results?search_query=XOR+Trie+%7c+VNOI+Channel' }
          ],
          problems: [
            { name: 'A. Magic Numbers — CF 706D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/706/D', difficulty: 'easy' },
            { name: 'PHONELST — SPOJ', platform: 'SPOJ', link: 'https://www.spoj.com/problems/PHONELST/', difficulty: 'easy' },
            { name: 'Static Range Minimum Queries — CSES 2080', platform: 'CSES', link: 'https://cses.fi/problemset/task/2080', difficulty: 'easy' },
            { name: 'A. Digit Game — CF 1720B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1720/B', difficulty: 'easy' },
            { name: 'D. Carousel — CF 1703D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1703D', difficulty: 'easy' },
            { name: 'C. awoo\'s Favorite Problem — CF 1697C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1697/C', difficulty: 'easy' },
            { name: 'C. Minimum Notation — CF 1676C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1676C', difficulty: 'easy' },
            { name: 'D. Prime Matrix — CF 1660D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1660/D', difficulty: 'easy' },
            { name: 'E. Beautiful Subarrays — CF 665E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/665/E', difficulty: 'medium' },
            { name: 'C. Factorial Divisibility — CF 1731C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1731/C', difficulty: 'medium' },
            { name: 'B. Neighbor Grid — CF 1738B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1738B', difficulty: 'medium' },
            { name: 'C. Minimum Notation — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730C', difficulty: 'medium' },
            { name: 'C. Double-ended Strings — CF 1733C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1733C', difficulty: 'medium' },
            { name: 'C. Even Number Addicts — CF 1735C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1735C', difficulty: 'medium' },
            { name: 'C. Little Alawn\'s Puzzle — CF 1739C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1739C', difficulty: 'medium' },
            { name: 'D. Prefixes and Suffixes — CF 1730D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730D', difficulty: 'hard' },
            { name: 'A. Minimum OR — CF 1738D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1738D', difficulty: 'hard' },
            { name: 'E. Maximum Subsequence Value — CF 1739E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1739E', difficulty: 'hard' },
            { name: 'E. Plurality of Worlds — CF 1741E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1741E', difficulty: 'hard' },
            { name: 'E. Singers\' Tour — CF 1737E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1737E', difficulty: 'hard' }
          ]
        }
      ]
    },

    // ============================================================
    //  8. THỦ THUẬT TỐI ƯU (enhanced)
    // ============================================================
    {
      id: 'optimizations',
      name: 'Thủ thuật tối ưu hóa',
      icon: 'zap',
      color: 'yellow',
      lessons: [
        // ---------- 8a. Bitmask ----------
        {
          id: 'bitmask',
          title: 'Bitmask — Mặt nạ bit',
          difficulty: 'easy',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Bitmask dùng các bit của số nguyên để biểu diễn trạng thái bật/tắt của tập hợp. Trong C++, int 32-bit có thể lưu 32 trạng thái, long long 64-bit lưu 64 trạng thái. Thao tác với bit cực nhanh nhờ phép toán bit (&, |, ^, ~, <<, >>).</p>
  <p><strong>Ví dụ:</strong> mask = 5 (0101₂) = {0, 2} (bit 0 và bit 2 được bật). N = 3 phần tử {a,b,c}, mask = 6 (110₂) = {b,c}.</p>
  <p><strong>Ứng dụng:</strong> DP bitmask (TSP), sinh tập con, kiểm tra cờ (flags), tối ưu lưu trữ, __builtin_popcount, __builtin_ctz.</p>
</div>
<div class="lesson-section">
  <h4>Các thao tác cơ bản</h4>
  <ul>
    <li><code>mask | (1 << i)</code> — bật bit thứ i</li>
    <li><code>mask & ~(1 << i)</code> — tắt bit thứ i</li>
    <li><code>(mask >> i) & 1</code> — kiểm tra bit thứ i</li>
    <li><code>mask & -mask</code> — lowbit (bit 1 thấp nhất)</li>
    <li><code>__builtin_popcount(mask)</code> — số bit 1</li>
    <li><code>__builtin_ctz(mask)</code> — số bit 0 ở cuối (count trailing zeros)</li>
    <li><code>__builtin_clz(mask)</code> — số bit 0 ở đầu (count leading zeros)</li>
    <li><code>mask & (mask-1)</code> — tắt bit 1 thấp nhất</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Code mẫu — Sinh tập con</h4>
  <pre class="code-sample">// Sinh tất cả tập con của mask (trừ rỗng)
for (int sub = mask; sub; sub = (sub-1) &amp; mask) {
    // xử lý sub
}

// Duyệt tất cả mask từ 0..(1&lt;&lt;n)-1
for (int mask = 0; mask &lt; (1&lt;&lt;n); mask++) {
    // xử lý mask
}

// Kiểm tra bit i
bool getBit(int mask, int i) { return (mask &gt;&gt; i) &amp; 1; }

// Đếm số bit 1 (nếu không có builtin)
int popcount(int x) {
    int cnt = 0;
    while (x) { cnt++; x &amp;= x-1; } // tắt bit 1 thấp nhất
    return cnt;
}

// Liệt kê chỉ số bit 1
vector&lt;int&gt; bits(int mask) {
    vector&lt;int&gt; res;
    while (mask) {
        int lsb = mask &amp; -mask;
        res.push_back(__builtin_ctz(lsb));
        mask ^= lsb;
    }
    return res;
}</pre>
</div>`,
          videos: [
            { title: 'Bit Manipulation | Errichto', url: 'https://www.youtube.com/results?search_query=Bit+Manipulation+%7c+Errichto' },
            { title: 'Bitmask & Ứng dụng | 28Tech', url: 'https://www.youtube.com/results?search_query=Bitmask+%26+%e1%bb%a8ng+d%e1%bb%a5ng+%7c+28Tech' },
            { title: 'Bitwise Operations | VNOI Wiki', url: 'https://www.youtube.com/results?search_query=Bitwise+Operations+%7c+VNOI+Wiki' }
          ],
          problems: [
            { name: 'A. Raising Bacteria — CF 579A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/579/A', difficulty: 'easy' },
            { name: 'B. Preparing Olympiad — CF 550B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/550/B', difficulty: 'easy' },
            { name: 'A. Marin and Photoshoot — CF 1658A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1658/A', difficulty: 'easy' },
            { name: 'A. Number Transformation — CF 1731A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1731/A', difficulty: 'easy' },
            { name: 'Xor Pyramid — CSES 1655', platform: 'CSES', link: 'https://cses.fi/problemset/task/1655', difficulty: 'easy' },
            { name: 'ABC 199 C — AtCoder', platform: 'AtCoder', link: 'https://atcoder.jp/contests/abc199/tasks/abc199_c', difficulty: 'easy' },
            { name: 'A. Digit Game — CF 1720B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1720/B', difficulty: 'easy' },
            { name: 'D. Carousel — CF 1703D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1703D', difficulty: 'easy' },
            { name: 'B. Neighbor Grid — CF 1738B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1738B', difficulty: 'medium' },
            { name: 'C. Minimum Notation — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730C', difficulty: 'medium' },
            { name: 'C. Double-ended Strings — CF 1733C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1733C', difficulty: 'medium' },
            { name: 'C. Even Number Addicts — CF 1735C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1735C', difficulty: 'medium' },
            { name: 'C. Little Alawn\'s Puzzle — CF 1739C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1739C', difficulty: 'medium' },
            { name: 'C. Minimum Grid Path — CF 1741C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1741C', difficulty: 'medium' },
            { name: 'C. Social Distance — CF 1618D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1618D', difficulty: 'medium' },
            { name: 'D. Prefixes and Suffixes — CF 1730D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730D', difficulty: 'hard' },
            { name: 'A. Minimum OR — CF 1738D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1738D', difficulty: 'hard' },
            { name: 'E. Maximum Subsequence Value — CF 1739E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1739E', difficulty: 'hard' },
            { name: 'E. Plurality of Worlds — CF 1741E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1741E', difficulty: 'hard' },
            { name: 'E. Singers\' Tour — CF 1737E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1737E', difficulty: 'hard' }
          ]
        },
        // ---------- 8b. Pragma ----------
        {
          id: 'pragma',
          title: 'Pragma Optimization',
          difficulty: 'easy',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Pragma là chỉ thị gửi đến trình biên dịch để tối ưu hóa code. Trong CP, thêm ở đầu file (trước mọi include) có thể tăng tốc độ chạy đáng kể. Pragma không thay đổi thuật toán nhưng giúp compiler sinh ra mã máy nhanh hơn.</p>
  <p><strong>Các mức tối ưu:</strong> -O0 (debug), -O1 (cơ bản), -O2 (mặc định trên Codeforces), -O3 (cao hơn), -Ofast (cao nhất, có thể hy sinh độ chính xác floating-point).</p>
  <p><strong>Lưu ý:</strong> Chỉ dùng pragma khi thực sự cần, vì có thể làm code khó debug. Trên Codeforces, -O2 là mặc định, nếu dùng pragma mạnh hơn có thể bị warning.</p>
</div>
<div class="lesson-section">
  <h4>Các pragma thường dùng</h4>
  <pre class="code-sample">// Ba dòng chuẩn (thường dùng)
#pragma GCC optimize("O3,unroll-loops")
#pragma GCC target("avx2,bmi,bmi2,lzcnt,popcnt")
#pragma GCC optimize("Ofast")

// Đầy đủ (dùng cho những bài cực nặng)
#pragma GCC optimize("O3,unroll-loops,no-stack-protector,fast-math")
#pragma GCC target("sse,sse2,sse3,ssse3,sse4,popcnt,abm,mmx,avx,tune=native")

// Kích hoạt C++17 (nếu cần)
#pragma GCC target("avx2")
#pragma GCC optimize("Ofast")
#pragma GCC optimization ("unroll-loops")</pre>
  <p><strong>Giải thích:</strong></p>
  <ul>
    <li><code>O3</code> — bật mọi tối ưu O3</li>
    <li><code>unroll-loops</code> — mở vòng lặp (giảm overhead kiểm tra điều kiện)</li>
    <li><code>Ofast</code> — O3 + bỏ qua chuẩn floating-point</li>
    <li><code>avx2</code> — tận dụng tập lệnh AVX2 (SIMD 256-bit)</li>
    <li><code>popcnt</code> — dùng lệnh popcnt phần cứng</li>
  </ul>
</div>
<div class="lesson-section">
  <h4>Mẹo</h4>
  <ul>
    <li><strong>Luôn có pragma ở đầu file template</strong> để sẵn sàng cho bài nặng.</li>
    <li><strong>Không lạm dụng:</strong> Với bài dễ, pragma không tạo khác biệt đáng kể.</li>
    <li><strong>Kết hợp Fast I/O:</strong> Pragma + Fast I/O + cấu trúc dữ liệu tối ưu mang lại tốc độ tốt nhất.</li>
    <li><strong>Chú ý:</strong> Trên judge không hỗ trợ AVX2 (như một số SPOJ cũ), pragma target có thể gây RE.</li>
  </ul>
</div>`,
          videos: [
            { title: 'C++ Optimization Tricks | Errichto', url: 'https://www.youtube.com/results?search_query=C%2b%2b+Optimization+Tricks+%7c+Errichto' },
            { title: 'Pragma & Fast I/O | 28Tech', url: 'https://www.youtube.com/results?search_query=Pragma+%26+Fast+I%2fO+%7c+28Tech' },
            { title: 'Competitive Programming C++ Tips | Codeforces', url: 'https://www.youtube.com/results?search_query=Competitive+Programming+C%2b%2b+Tips+%7c+Codeforces' }
          ],
          problems: [
            { name: 'A. Watermelon — CF 4A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/4/A', difficulty: 'easy' },
            { name: 'A. Theatre Square — CF 1A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1/A', difficulty: 'easy' },
            { name: 'A. Next Round — CF 158A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/158/A', difficulty: 'easy' },
            { name: 'A. Team — CF 231A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/231/A', difficulty: 'easy' },
            { name: 'A. Bit++ — CF 282A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/282/A', difficulty: 'easy' },
            { name: 'A. Beautiful Matrix — CF 263A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/263/A', difficulty: 'easy' },
            { name: 'A. Petya and Strings — CF 112A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/112/A', difficulty: 'easy' },
            { name: 'A. Domino piling — CF 50A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/50/A', difficulty: 'easy' },
            { name: 'C. Factorial Divisibility — CF 1731C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1731/C', difficulty: 'medium' },
            { name: 'B. Neighbor Grid — CF 1738B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1738B', difficulty: 'medium' },
            { name: 'C. Minimum Notation — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730C', difficulty: 'medium' },
            { name: 'C. Double-ended Strings — CF 1733C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1733C', difficulty: 'medium' },
            { name: 'C. Even Number Addicts — CF 1735C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1735C', difficulty: 'medium' },
            { name: 'C. Little Alawn\'s Puzzle — CF 1739C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1739C', difficulty: 'medium' },
            { name: 'C. Minimum Grid Path — CF 1741C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1741C', difficulty: 'medium' },
            { name: 'D. Prefixes and Suffixes — CF 1730D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730D', difficulty: 'hard' },
            { name: 'A. Minimum OR — CF 1738D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1738D', difficulty: 'hard' },
            { name: 'E. Maximum Subsequence Value — CF 1739E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1739E', difficulty: 'hard' },
            { name: 'E. Plurality of Worlds — CF 1741E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1741E', difficulty: 'hard' },
            { name: 'E. Singers\' Tour — CF 1737E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1737E', difficulty: 'hard' }
          ]
        },
        // ---------- 8c. Fast I/O ----------
        {
          id: 'fast-io',
          title: 'Fast I/O (Nhập xuất nhanh)',
          difficulty: 'easy',
          content: `
<div class="lesson-section">
  <h4>Giải thích</h4>
  <p>Trong C++, cin/cout mặc định chậm hơn scanf/printf vì phải đồng bộ với C I/O (giữ cho cin và scanf dùng chung bộ đệm). Thêm hai lệnh magic sau để cin/cout nhanh ngang scanf/printf (thậm chí nhanh hơn khi kết hợp endl thay bằng '\\n').</p>
  <p><strong>Tại sao cin chậm?</strong> Mặc định, C++ iostream đồng bộ với stdio, nghĩa là cin và scanf có thể dùng xen kẽ mà không hỏng — nhưng trả giá bằng overhead lớn.</p>
  <p><strong>Khi nào cần Fast I/O?</strong> Khi N, Q ≥ 10⁵ hoặc input lớn hơn 1MB. Luôn dùng trong template để an toàn.</p>
</div>
<div class="lesson-section">
  <h4>Code mẫu</h4>
  <pre class="code-sample">// Phải đặt ở đầu main()
ios::sync_with_stdio(false);
cin.tie(nullptr);
// Không dùng cout &lt;&lt; endl (flush), dùng cout &lt;&lt; '\\n'

// Fast input — đọc số nguyên
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
}

// Fast output — ghi số nguyên
void writeInt(long long x) {
    if (x &lt; 0) { putchar('-'); x = -x; }
    if (x &gt; 9) writeInt(x / 10);
    putchar(x % 10 + '0');
}

// Hoặc dùng template &lt;typename T&gt; với SFINAE
template&lt;typename T&gt;
T read() {
    T x = 0, sign = 1; char c = getchar();
    while (!isdigit(c)) { if (c == '-') sign = -1; c = getchar(); }
    while (isdigit(c)) { x = x*10 + c-'0'; c = getchar(); }
    return x * sign;
}
// Dùng: int n = read&lt;int&gt;();</pre>
  <p><strong>Lưu ý:</strong> Sau khi gọi <code>ios::sync_with_stdio(false)</code>, không được trộn cin với scanf/gets. Gọi <code>cin.tie(nullptr)</code> để ngắt liên kết giữa cin và cout (không tự động flush cout trước khi cin).</p>
</div>
<div class="lesson-section">
  <h4>Mẹo</h4>
  <ul>
    <li><strong>Không dùng endl:</strong> endl flush output buffer, rất chậm. Dùng '\\n'.</li>
    <li><strong>Nhập cả dòng:</strong> getline(cin, s) vẫn chậm nếu chưa sync, nhưng đã chấp nhận được.</li>
    <li><strong>cout &lt;&lt; fixed &lt;&lt; setprecision(x)</strong> cho số thực — thường cần cho geometry.</li>
    <li><strong>Trên Windows:</strong> getchar() nhanh hơn cin.get() trong hầu hết trường hợp.</li>
  </ul>
</div>`,
          videos: [
            { title: 'Fast I/O in C++ | Errichto', url: 'https://www.youtube.com/results?search_query=Fast+I%2fO+in+C%2b%2b+%7c+Errichto' },
            { title: 'Tối ưu nhập xuất | 28Tech', url: 'https://www.youtube.com/results?search_query=T%e1%bb%91i+%c6%b0u+nh%e1%ba%adp+xu%e1%ba%a5t+%7c+28Tech' },
            { title: 'C++ I/O Optimization | Codeforces', url: 'https://www.youtube.com/results?search_query=C%2b%2b+I%2fO+Optimization+%7c+Codeforces' }
          ],
          problems: [
            { name: 'A. Way Too Long Words — CF 71A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/71/A', difficulty: 'easy' },
            { name: 'A. String Task — CF 118A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/118/A', difficulty: 'easy' },
            { name: 'A. Watermelon — CF 4A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/4/A', difficulty: 'easy' },
            { name: 'A. Theatre Square — CF 1A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1/A', difficulty: 'easy' },
            { name: 'A. Next Round — CF 158A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/158/A', difficulty: 'easy' },
            { name: 'A. Team — CF 231A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/231/A', difficulty: 'easy' },
            { name: 'A. Bit++ — CF 282A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/282/A', difficulty: 'easy' },
            { name: 'A. Beautiful Matrix — CF 263A', platform: 'CF', link: 'https://codeforces.com/problemset/problem/263/A', difficulty: 'easy' },
            { name: 'C. Factorial Divisibility — CF 1731C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1731/C', difficulty: 'medium' },
            { name: 'B. Neighbor Grid — CF 1738B', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1738B', difficulty: 'medium' },
            { name: 'C. Minimum Notation — CF 1730C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730C', difficulty: 'medium' },
            { name: 'C. Double-ended Strings — CF 1733C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1733C', difficulty: 'medium' },
            { name: 'C. Even Number Addicts — CF 1735C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1735C', difficulty: 'medium' },
            { name: 'C. Little Alawn\'s Puzzle — CF 1739C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1739C', difficulty: 'medium' },
            { name: 'C. Minimum Grid Path — CF 1741C', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1741C', difficulty: 'medium' },
            { name: 'D. Prefixes and Suffixes — CF 1730D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1730D', difficulty: 'hard' },
            { name: 'A. Minimum OR — CF 1738D', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1738D', difficulty: 'hard' },
            { name: 'E. Maximum Subsequence Value — CF 1739E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1739E', difficulty: 'hard' },
            { name: 'E. Plurality of Worlds — CF 1741E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1741E', difficulty: 'hard' },
            { name: 'E. Singers\' Tour — CF 1737E', platform: 'CF', link: 'https://codeforces.com/problemset/problem/1737E', difficulty: 'hard' }
          ]
        }
      ]
    }
  ]
};
