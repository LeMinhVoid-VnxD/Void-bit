/*
 * Problem: Construct array a[1..n] satisfying m constraints:
 *   o=1 (i,j): a[i] + a[j] >= 0
 *   o=2 (i,j): a[i] + a[j] <  0  (i.e., <= -1 for integers)
 *
 * Algorithm: BFS on constraint graph
 *
 *   Model a[root] = x  (free integer per connected component).
 *   Propagate through spanning tree:
 *     type-1 tree-edge (u->v): a[v] = -a[u]      => alpha[v]=-alpha[u], beta[v]=-beta[u]
 *     type-2 tree-edge (u->v): a[v] = -a[u] - 1  => alpha[v]=-alpha[u], beta[v]=-beta[u]-1
 *   So each a[i] = alpha[i]*x + beta[i],  alpha[i] in {+1,-1}.
 *
 *   Each non-tree edge (u,v) of type o gives a linear constraint on x:
 *     let Sa = alpha[u]+alpha[v], Sb = beta[u]+beta[v]
 *     o=1: Sa*x + Sb >= 0
 *     o=2: Sa*x + Sb <= -1
 *   Collect all such constraints into [L, R].
 *   If L > R => "NO", else pick x in [L, R].
 *
 * Why the check is complete:
 *   An alternating type2-type1 cycle forces the same linear combination
 *   to be both >= 0 and <= -k, yielding L > R.
 *   (Sum of type-2 constraints = sum of type-1 constraints over same elements.)
 */

#include <bits/stdc++.h>
using namespace std;

// Ceiling division assuming b > 0
static inline long long ceildiv(long long a, long long b) {
    return a / b + (a % b != 0 && (a ^ b) > 0 ? 1 : 0);
}
// Floor division assuming b > 0
static inline long long floordiv(long long a, long long b) {
    return a / b - (a % b != 0 && (a ^ b) < 0 ? 1 : 0);
}

void solve() {
    int n, m;
    cin >> n >> m;

    vector<vector<pair<int,int>>> adj(n + 1); // {neighbour, edge_type}
    vector<pair<int,int>> selfcons;            // {node, type} when i==j

    for (int k = 0; k < m; k++) {
        int o, i, j;
        cin >> o >> i >> j;
        if (i == j) {
            selfcons.push_back({i, o});
        } else {
            adj[i].push_back({j, o});
            adj[j].push_back({i, o});
        }
    }

    vector<int>       alpha(n + 1, 0);
    vector<long long> beta (n + 1, 0);
    vector<bool>      vis  (n + 1, false);

    const long long INF = 4e18;
    long long L = -INF, R = INF;
    bool ok = true;

    // Add constraint Sa*x + Sb >= 0 (type 1) or <= -1 (type 2)
    auto add_constraint = [&](long long Sa, long long Sb, int type) {
        if (!ok) return;
        if (type == 1) {
            // Sa*x >= -Sb
            if (Sa == 0) {
                if (Sb < 0) ok = false;
            } else if (Sa > 0) {
                L = max(L, ceildiv(-Sb, Sa));
            } else { // Sa < 0  =>  (-Sa)*x <= Sb
                R = min(R, floordiv(Sb, -Sa));
            }
        } else {
            // Sa*x <= -1-Sb
            long long rhs = -1LL - Sb;
            if (Sa == 0) {
                if (Sb >= 0) ok = false; // 0*x+Sb <= -1 requires Sb < 0
            } else if (Sa > 0) {
                R = min(R, floordiv(rhs, Sa));
            } else { // Sa < 0  =>  (-Sa)*x >= -rhs
                L = max(L, ceildiv(-rhs, -Sa));
            }
        }
        if (L > R) ok = false;
    };

    // BFS over each connected component
    for (int root = 1; root <= n && ok; root++) {
        if (vis[root]) continue;
        vis[root] = true;
        alpha[root] = 1;
        beta[root]  = 0;

        queue<int> q;
        q.push(root);
        while (!q.empty() && ok) {
            int u = q.front(); q.pop();
            for (int ei = 0; ei < (int)adj[u].size(); ei++) {
                int v     = adj[u][ei].first;
                int etype = adj[u][ei].second;
                if (!vis[v]) {
                    vis[v] = true;
                    alpha[v] = -alpha[u];
                    beta[v]  = (etype == 1) ? (-beta[u]) : (-beta[u] - 1);
                    q.push(v);
                } else {
                    // Non-tree edge => constraint on x
                    long long Sa = (long long)alpha[u] + alpha[v];
                    long long Sb = beta[u] + beta[v];
                    add_constraint(Sa, Sb, etype);
                }
            }
        }
    }

    // Handle self-constraints: 2*a[i] >= 0 or 2*a[i] <= -1
    for (int si = 0; si < (int)selfcons.size(); si++) {
        if (!ok) break;
        int node  = selfcons[si].first;
        int etype = selfcons[si].second;
        add_constraint(2LL * alpha[node], 2LL * beta[node], etype);
    }

    if (!ok) {
        cout << "NO\n";
        return;
    }

    // Pick x in [L, R], prefer 0 to keep magnitudes small
    long long x;
    if      (L <= 0 && R >= 0) x = 0;
    else if (L > 0)             x = L;
    else                        x = R;

    cout << "YES\n";
    for (int i = 1; i <= n; i++) {
        cout << (alpha[i] * x + beta[i]);
        if (i < n) cout << ' ';
    }
    cout << '\n';
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t; cin >> t;
    while (t--) solve();
}
