// ================================================================
//  VOID-BIT — Application Logic
//  Rendering, localStorage persistence, tab switching, accordion.
// ================================================================

// ----------------------------------------------------------------
//  DOM SHORTCUTS
// ----------------------------------------------------------------
const $  = (s, p) => (p || document).querySelector(s);
const $$ = (s, p) => [...(p || document).querySelectorAll(s)];

// ----------------------------------------------------------------
//  CATEGORY NAME MAPPINGS
// ----------------------------------------------------------------
var CAT_NAMES = { dp:'Quy hoạch động', binary_search:'Chặt nhị phân', greedy:'Tham lam', graph:'Đồ thị', math:'Toán học', string:'Xử lý xâu', data_structure:'Cấu trúc dữ liệu', other:'Khác' };

// ----------------------------------------------------------------
//  ROLE HIERARCHY (highest → lowest)
// ----------------------------------------------------------------
var ROLES = [
  { id:'Owner',   label:'Owner',  badge:'👑', level:9, color:'text-amber-400' },
  { id:'Admin',   label:'Admin',  badge:'🛡️', level:8, color:'text-red-400' },
  { id:'Co-Admin',label:'C-Adm',  badge:'⚔️', level:7, color:'text-orange-400' },
  { id:'Dev',     label:'Dev',    badge:'💻', level:6, color:'text-cyan-400' },
  { id:'Executor',label:'Exec',   badge:'⚡', level:5, color:'text-yellow-400' },
  { id:'AI-Check',label:'AI-C',   badge:'🤖', level:4, color:'text-purple-400' },
  { id:'Member',  label:'Member', badge:'👤', level:3, color:'text-slate-400' },
  { id:'Skid',    label:'Skid',   badge:'🐍', level:2, color:'text-green-500' },
  { id:'Vibe',    label:'Vibe',   badge:'🌊', level:1, color:'text-blue-300' },
];

function getRoleInfo(id) {
  return ROLES.find(function(r) { return r.id === id; }) || ROLES[6];
}

function hasRole(userRole, minRole) {
  var u = getRoleInfo(userRole);
  var m = getRoleInfo(minRole);
  return u.level >= m.level;
}

function getRoleBadge(role) {
  var r = getRoleInfo(role);
  return '<span class="role-badge" style="color:' + r.color + ';font-size:0.7rem;font-weight:600">' + r.badge + ' ' + r.label + '</span>';
}

// ----------------------------------------------------------------
//  LOCALSTORAGE KEYS
// ----------------------------------------------------------------
const LS_PROGRESS = 'voidbit_progress';
const LS_STREAK   = 'voidbit_streak';

// ----------------------------------------------------------------
//  STATE
// ----------------------------------------------------------------
let activeTabId  = VOID_DATA.roadmaps[0].id;
let progress     = {};  // { roadmapId: { milestoneId: true } }
let streakData   = { count: 0, lastDate: '' };

// ----------------------------------------------------------------
//  AUTH GATE — Force login before accessing the site
// ----------------------------------------------------------------
function hideAuthGate() {
  var gate = $('#authGate');
  if (gate) gate.remove();
  document.body.style.overflow = '';
}

function showAuthGate() {
  if ($('#authGate')) return;
  forum.loggedIn = false;
  document.body.style.display = 'block';
  document.body.style.background = '#0b1120';
  var gate = document.createElement('div');
  gate.id = 'authGate';
  gate.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#0b1120;display:flex;align-items:center;justify-content:center;';
  gate.innerHTML =
    '<div style="width:100%;max-width:400px;text-align:center;padding:0 16px">' +
      '<div style="font-size:2.25rem;font-weight:800;background:linear-gradient(135deg,#00f0ff,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:4px">Void-bit</div>' +
      '<p style="color:#64748b;font-size:0.875rem;margin-bottom:2rem">' + t('auth.tagline') + '</p>' +
      '<div class="card" style="padding:1.5rem;text-align:left">' +
        '<div style="display:flex;gap:8px;margin-bottom:1.25rem">' +
          '<button id="gateTabLogin" class="tab-btn active" style="flex:1;justify-content:center;font-size:0.875rem" onclick="gateSwitchTab(\'login\')">' + t('forum.login') + '</button>' +
          '<button id="gateTabRegister" class="tab-btn" style="flex:1;justify-content:center;font-size:0.875rem" onclick="gateSwitchTab(\'register\')">' + t('forum.register') + '</button>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:16px">' +
          '<div><label style="font-size:0.75rem;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:6px">' + t('forum.username') + '</label>' +
            '<input type="text" id="authUsername" maxlength="20" style="width:100%;padding:10px 16px;border-radius:8px;background:rgba(30,41,59,0.5);border:1px solid rgba(51,65,85,0.5);font-size:0.875rem;color:#fff;outline:none;box-sizing:border-box" placeholder="' + t('forum.usernamePlace') + '"></div>' +
          '<div><label style="font-size:0.75rem;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:6px">' + t('forum.password') + '</label>' +
            '<input type="password" id="authPassword" maxlength="50" style="width:100%;padding:10px 16px;border-radius:8px;background:rgba(30,41,59,0.5);border:1px solid rgba(51,65,85,0.5);font-size:0.875rem;color:#fff;outline:none;box-sizing:border-box" placeholder="' + t('forum.passwordPlace') + '"></div>' +
          '<div id="authExtra" style="display:none">' +
            '<div><label style="font-size:0.75rem;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:6px">' + t('forum.displayName') + '</label>' +
            '<input type="text" id="authDisplayName" maxlength="20" style="width:100%;padding:10px 16px;border-radius:8px;background:rgba(30,41,59,0.5);border:1px solid rgba(51,65,85,0.5);font-size:0.875rem;color:#fff;outline:none;box-sizing:border-box" placeholder="' + t('forum.nickname') + '"></div>' +
            '<div><label style="font-size:0.75rem;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:6px">' + t('forum.avatarUrl') + '</label>' +
            '<input type="text" id="authAvatar" maxlength="500" style="width:100%;padding:10px 16px;border-radius:8px;background:rgba(30,41,59,0.5);border:1px solid rgba(51,65,85,0.5);font-size:0.875rem;color:#fff;outline:none;box-sizing:border-box" placeholder="https://example.com/avatar.jpg"></div>' +
          '</div>' +
          '<button id="gateSubmitBtn" onclick="gateSubmit()" style="width:100%;padding:10px 16px;border-radius:8px;border:none;background:linear-gradient(135deg,#00f0ff,#3b82f6);color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center">' + t('forum.login') + '</button>' +
          '<p id="gateError" style="font-size:0.75rem;color:#f87171;text-align:center;display:none;margin:0"></p>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(gate);
  document.body.style.overflow = 'hidden';
  var pw = $('#authPassword');
  if (pw) pw.addEventListener('keydown', function(e) { if (e.key === 'Enter') gateSubmit(); });
}

function gateSwitchTab(mode) {
  forum._authMode = mode;
  var lt = $('#gateTabLogin');
  var rt = $('#gateTabRegister');
  var extra = $('#authExtra');
  var btn = $('#gateSubmitBtn');
  if (lt) lt.classList.toggle('active', mode === 'login');
  if (rt) rt.classList.toggle('active', mode === 'register');
  if (extra) extra.style.display = mode === 'register' ? '' : 'none';
  if (btn) btn.textContent = t(mode === 'login' ? 'forum.login' : 'forum.register');
}

function gateSubmit() {
  var username = ($('#authUsername') || {}).value || '';
  var password = ($('#authPassword') || {}).value || '';
  var errEl = $('#gateError');
  if (!username || !password) {
    if (errEl) { errEl.textContent = t('forum.authRequired'); errEl.style.display = ''; }
    return;
  }
  if (forum._authMode === 'register') {
    gateRegister(username, password, errEl);
  } else {
    gateLogin(username, password, errEl);
  }
}

function gateRegister(username, password, errEl) {
  var displayName = ($('#authDisplayName') || {}).value || username;
  var avatarUrl = ($('#authAvatar') || {}).value || '';
  var passHash = hashStr(password);
  supabaseClient.from('users').insert({
    username: username.toLowerCase(),
    password_hash: passHash,
    display_name: displayName,
    avatar_url: avatarUrl,
    role: 'Member'
  }).then(function(res) {
    if (res.error) {
      if (res.error.message && res.error.message.indexOf('duplicate') > -1) {
        if (errEl) { errEl.textContent = t('forum.userExists'); errEl.style.display = ''; }
      } else {
        if (errEl) { errEl.textContent = t('forum.authError') + ' ' + (res.error.message || ''); errEl.style.display = ''; }
      }
      return;
    }
    gateCreateSession(username, displayName, avatarUrl, 'Member');
    hideAuthGate();
    location.reload();
  });
}

function gateLogin(username, password, errEl) {
  var passHash = hashStr(password);
  supabaseClient.from('users').select('*').eq('username', username.toLowerCase()).single().then(function(res) {
    if (res.error || !res.data) {
      if (errEl) { errEl.textContent = t('forum.userNotFound'); errEl.style.display = ''; }
      return;
    }
    if (res.data.password_hash !== passHash) {
      if (errEl) { errEl.textContent = t('forum.wrongPass'); errEl.style.display = ''; }
      return;
    }
    gateCreateSession(username, res.data.display_name || username, res.data.avatar_url || '', res.data.role || 'Member');
    hideAuthGate();
    location.reload();
  });
}

function gateCreateSession(username, displayName, avatarUrl, role) {
  var token = hashStr(username + ':' + Date.now());
  localStorage.setItem('voidbit_session', token);
  localStorage.setItem('voidbit_username', username.toLowerCase());
  localStorage.setItem('voidbit_forum_name', displayName);
  localStorage.setItem('voidbit_forum_avatar', avatarUrl);
  localStorage.setItem('voidbit_role', role || 'Member');
  forum.loggedIn = true;
  forum.myName = displayName;
  forum.myAvatar = avatarUrl;
}

function renderNavProfile() {
  var badge = $('#navUserBadge');
  var avatarBtn = $('#navAvatarBtn');
  if (!badge || !avatarBtn) return;
  if (!forum.loggedIn) {
    badge.style.display = 'none';
    avatarBtn.textContent = '?';
    return;
  }
  badge.style.display = 'flex';
  var userRole = localStorage.getItem('voidbit_role') || 'Member';
  badge.innerHTML = getAvatarHtml(forum.myName, forum.myAvatar, 7) +
    '<span class="text-xs text-slate-400 hidden sm:inline max-w-[100px] truncate">' + escapeHtml(forum.myName) + '</span>' +
    getRoleBadge(userRole);
  if (forum.myAvatar) {
    var initial = forum.myName ? forum.myName.charAt(0).toUpperCase() : '?';
    avatarBtn.innerHTML = '<img src="' + escapeHtml(forum.myAvatar) + '" alt="" class="w-full h-full rounded-full object-cover" onerror="this.remove();this.parentElement.textContent=\'' + initial + '\'" loading="lazy">';
  } else {
    avatarBtn.textContent = forum.myName.charAt(0).toUpperCase();
  }
}

// ----------------------------------------------------------------
//  INIT — read localStorage, render everything
// ----------------------------------------------------------------
function init() {
  if (typeof PAGE_TYPE !== 'undefined') return;
  document.body.style.display = 'block';
  document.body.style.background = '';
  if (!localStorage.getItem('voidbit_session')) {
    showAuthGate();
    return;
  }
  forum.loggedIn = true;
  forum.myName = localStorage.getItem('voidbit_forum_name') || 'Anonymous';
  forum.myAvatar = localStorage.getItem('voidbit_forum_avatar') || '';
  document.body.style.overflow = '';
  renderNavProfile();
  loadProgress();
  renderNavStreak();
  renderCourses();
  renderStreak();
  renderLeaderboard();
  renderProblemOfDay();
  renderTabs();
  renderRoadmapContent();
  renderForum();
  initMobileNav();
  initFadeIn();
  initCourseClick();
  initSectionFade();
}

// Run init when DOM is ready (supports both sync and async loads)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ----------------------------------------------------------------
//  COURSE CARD CLICK → OPEN LESSON VIEWER (event delegation)
// ----------------------------------------------------------------
function initCourseClick() {
  var container = $('#coursesContainer');
  if (!container) return;
  container.addEventListener('click', function(e) {
    var card = e.target.closest('.course-card');
    if (card && typeof openLessonViewer === 'function') openLessonViewer();
  });
}

// ----------------------------------------------------------------
//  FADE IN SECTIONS
// ----------------------------------------------------------------
function initSectionFade() {
  var sections = $$('section');
  for (var i = 0; i < sections.length; i++) {
    sections[i].classList.add('fade-in');
    (function(el) {
      setTimeout(function() { el.classList.add('visible'); }, 100 + i * 50);
    })(sections[i]);
  }
}

// ----------------------------------------------------------------
//  LOCALSTORAGE HELPERS
// ----------------------------------------------------------------
function loadProgress() {
  try {
    const saved = localStorage.getItem(LS_PROGRESS);
    progress = saved ? JSON.parse(saved) : {};
  } catch { progress = {}; }

  try {
    const saved = localStorage.getItem(LS_STREAK);
    streakData = saved ? JSON.parse(saved) : { count: 0, lastDate: '' };
  } catch { streakData = { count: 0, lastDate: '' }; }

  // Seed streak if not set (real value loaded asynchronously by renderStreak)
  if (!streakData.count) {
    streakData = { count: 0, lastDate: '' };
    saveStreak();
  }
}

function saveProgress() {
  try { localStorage.setItem(LS_PROGRESS, JSON.stringify(progress)); } catch {}
}

function saveStreak() {
  try { localStorage.setItem(LS_STREAK, JSON.stringify(streakData)); } catch {}
}

// Check if a milestone is completed
function isChecked(roadmapId, milestoneId) {
  return !!(progress[roadmapId] && progress[roadmapId][milestoneId]);
}

// Toggle a milestone's completion status
function toggleMilestone(roadmapId, milestoneId) {
  if (!progress[roadmapId]) progress[roadmapId] = {};
  if (progress[roadmapId][milestoneId]) {
    delete progress[roadmapId][milestoneId];
  } else {
    progress[roadmapId][milestoneId] = true;
  }
  saveProgress();
}

// ----------------------------------------------------------------
//  RENDER: Nav Streak Badge
// ----------------------------------------------------------------
function renderNavStreak() {
  var el = $('#streakDisplay');
  if (el) el.textContent = streakData.count;
}

// ----------------------------------------------------------------
//  RENDER: Courses Grid
// ----------------------------------------------------------------
function renderCourses() {
  var container = $('#coursesContainer');
  if (!container) return;

  var courses = VOID_DATA.courses;
  var completed = {};
  try { completed = JSON.parse(localStorage.getItem('voidbit_completed_lessons') || '{}'); } catch(e) {}
  var html = '';
  for (var i = 0; i < courses.length; i++) {
    var c = courses[i];
    var badgeCls = c.difficulty === 'easy'   ? 'badge-easy'   :
                   c.difficulty === 'medium' ? 'badge-medium' : 'badge-hard';
    var badgeLabel = t('diff.' + c.difficulty);
    var done = completed[c.id] || 0;
    var pct = c.lessons > 0 ? Math.round(done / c.lessons * 100) : 0;
    var color = c.color || 'cyan';

    html += '<div class="card p-5 cursor-pointer group course-card" data-course="' + c.id + '">' +
      '<div class="flex items-start justify-between mb-3">' +
        '<div class="w-10 h-10 rounded-xl bg-' + color + '-500/10 border border-' + color + '-500/20 flex items-center justify-center group-hover:bg-' + color + '-500/20 transition-colors">' +
          '<i data-lucide="' + c.icon + '" class="w-5 h-5 text-' + color + '-400"></i>' +
        '</div>' +
        '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ' + badgeCls + '">' + badgeLabel + '</span>' +
      '</div>' +
      '<h3 class="text-lg font-bold text-white mb-1">' + t('cat.' + c.id) + '</h3>' +
      '<p class="text-xs text-slate-500 mb-4">' + done + '/' + c.lessons + ' ' + t('courses.lessons') + '</p>' +
      '<div class="flex items-center justify-between mb-2">' +
        '<span class="text-xs text-slate-500">' + pct + '%</span>' +
      '</div>' +
      '<div class="progress-bar"><div class="progress-fill bg-gradient-to-r from-' + color + '-500 to-blue-500" style="width:' + pct + '%"></div></div>' +
      '<div class="mt-3 text-center"><span class="text-xs font-medium text-' + color + '-400 opacity-0 group-hover:opacity-100 transition-opacity">' + t('courses.view') + '</span></div>' +
    '</div>';
  }
  container.innerHTML = html;
  lucide.createIcons();
}

// ----------------------------------------------------------------
//  RENDER: Streak Widget
// ----------------------------------------------------------------
function renderStreak() {
  var countEl = $('#streakCount');
  var dotsEl  = $('#streakDots');

  /* Try fetching real AC submission dates from Supabase */
  if (typeof supabaseClient !== 'undefined') {
    var username = localStorage.getItem('voidbit_username');
    if (username) {
      supabaseClient.from('submissions').select('created_at').eq('username', username).eq('verdict', 'AC').then(function(res) {
        if (!res.error && res.data && res.data.length > 0) {
          var dates = {};
          res.data.forEach(function(s) {
            var d = s.created_at ? s.created_at.slice(0, 10) : '';
            if (d) dates[d] = true;
          });
          var sorted = Object.keys(dates).sort().reverse();
          var streak = 0;
          var today = new Date();
          today.setHours(0,0,0,0);
          for (var i = 0; i < sorted.length; i++) {
            var subDate = new Date(sorted[i] + 'T00:00:00');
            var expected = new Date(today);
            expected.setDate(expected.getDate() - streak);
            if (subDate.getTime() === expected.getTime()) { streak++; }
            else if (subDate.getTime() < expected.getTime()) break;
          }
          streakData.count = streak;
          saveStreak();
          renderNavStreak();
        }
        renderStreakUI(countEl, dotsEl);
      }).catch(function() {
        renderStreakUI(countEl, dotsEl);
      });
      return;
    }
  }
  renderStreakUI(countEl, dotsEl);
}

function renderStreakUI(countEl, dotsEl) {
  if (countEl) countEl.textContent = streakData.count;
  if (dotsEl) {
    var s = streakData.count;
    var dotsHtml = '';
    for (var i = 0; i < 7; i++) {
      var filled = i < s;
      dotsHtml += '<div class="streak-dot ' +
        (filled
          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          : 'bg-slate-800/50 text-slate-600 border border-slate-700/50') +
        '">' + (filled ? '&#10003;' : (i + 1)) + '</div>';
    }
    dotsEl.innerHTML = dotsHtml;
  }
}

// ----------------------------------------------------------------
//  RENDER: Leaderboard
// ----------------------------------------------------------------
function renderLeaderboard() {
  var container = $('#leaderboardContainer');
  if (!container) return;

  var palettes = [
    { color: 'text-amber-400', bg: 'bg-amber-400/20 border-amber-400/30', grad: 'amber' },
    { color: 'text-slate-300', bg: 'bg-slate-300/20 border-slate-300/30', grad: 'blue' },
    { color: 'text-amber-600', bg: 'bg-amber-600/20 border-amber-600/30', grad: 'purple' },
    { color: 'text-cyan-400', bg: 'bg-cyan-400/20 border-cyan-400/30', grad: 'cyan' },
    { color: 'text-emerald-400', bg: 'bg-emerald-400/20 border-emerald-400/30', grad: 'emerald' },
    { color: 'text-slate-400', bg: 'bg-slate-400/20 border-slate-400/30', grad: 'slate' },
    { color: 'text-slate-400', bg: 'bg-slate-400/20 border-slate-400/30', grad: 'gray' },
    { color: 'text-slate-400', bg: 'bg-slate-400/20 border-slate-400/30', grad: 'stone' },
  ];

  function renderRows(users) {
    var html = '';
    for (var i = 0; i < users.length; i++) {
      var u = users[i];
      var p = palettes[i % palettes.length];
      var dispName = u.displayName || u.name || u.username || 'Unknown';
      var roleBadge = u.role ? getRoleBadge(u.role) : '';
      html += '<div class="leaderboard-row">' +
        '<div class="leaderboard-rank ' + p.bg + ' ' + p.color + '">' + (i + 1) + '</div>' +
        '<div class="flex-1 flex items-center gap-2">' +
          '<div class="w-6 h-6 rounded-full bg-gradient-to-br from-' + p.grad + '-400 to-' + p.grad + '-600 flex items-center justify-center text-[9px] font-bold text-white">' + dispName.charAt(0).toUpperCase() + '</div>' +
          '<span class="text-sm font-medium text-slate-300 truncate">' + escapeHtml(dispName) + '</span>' +
          roleBadge +
        '</div>' +
        '<span class="text-sm font-bold text-cyan-400">' + (u.solved || u.score || 0) + '</span>' +
      '</div>';
    }
    container.innerHTML = html;
  }

  /* Try fetching real OJ data first */
  if (typeof supabaseClient !== 'undefined') {
    Promise.all([
      supabaseClient.from('submissions').select('username, display_name, verdict, problem_id, score, max_score, created_at'),
      supabaseClient.from('users').select('username, role')
    ]).then(function(resolved) {
      var subRes = resolved[0];
      var userRes = resolved[1];
      if (subRes.error || !subRes.data || subRes.data.length === 0) {
        renderRows(VOID_DATA.leaderboard);
        return;
      }

      /* Build role map */
      var roleMap = {};
      if (!userRes.error && userRes.data) {
        userRes.data.forEach(function(u) { roleMap[u.username] = u.role || 'Member'; });
      }

      var users = {};
      subRes.data.forEach(function(s) {
        var uname = s.username || 'unknown';
        if (!users[uname]) users[uname] = { username: uname, displayName: s.display_name || uname, solved: {}, totalScore: 0, totalMax: 0, lastSub: s.created_at, role: roleMap[uname] || 'Member' };
        var u = users[uname];
        if (s.verdict === 'AC' && s.problem_id) u.solved[s.problem_id] = true;
        u.totalScore += s.score || 0;
        u.totalMax += s.max_score || 0;
        if (s.created_at > u.lastSub) u.lastSub = s.created_at;
      });
      var ranked = Object.keys(users).map(function(k) {
        var u = users[k];
        return { displayName: u.displayName, username: u.username, solved: Object.keys(u.solved).length, totalScore: u.totalScore, totalMax: u.totalMax, accuracy: u.totalMax > 0 ? Math.round(u.totalScore / u.totalMax * 100) : 0, lastSub: u.lastSub, role: u.role };
      });
      ranked.sort(function(a, b) {
        if (b.solved !== a.solved) return b.solved - a.solved;
        if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
        return new Date(a.lastSub) - new Date(b.lastSub);
      });
      renderRows(ranked.slice(0, 8));
    }).catch(function() {
      renderRows(VOID_DATA.leaderboard);
    });
  } else {
    renderRows(VOID_DATA.leaderboard);
  }
}

// ----------------------------------------------------------------
//  RENDER: Problem of the Day
// ----------------------------------------------------------------
function renderProblemOfDay() {
  var container = $('#problemOfDayContainer');
  if (!container) return;

  /* Try picking a random problem from OJ problem list, deterministic by date */
  if (typeof PROBLEMS_INDEX !== 'undefined' && PROBLEMS_INDEX.length > 0) {
    var today = new Date();
    var dateStr = today.toISOString().slice(0, 10);
    var hash = 0;
    for (var i = 0; i < dateStr.length; i++) { hash = ((hash << 5) - hash) + dateStr.charCodeAt(i); hash |= 0; }
    var idx = Math.abs(hash) % PROBLEMS_INDEX.length;
    var p = PROBLEMS_INDEX[idx];

    var badgeCls = p.difficulty === 'easy' ? 'badge-easy' : p.difficulty === 'medium' ? 'badge-medium' : 'badge-hard';
    var badgeLabel = t('diff.' + p.difficulty);
    var catName = CAT_NAMES && CAT_NAMES[p.category] ? CAT_NAMES[p.category] : (p.category || 'Khác');

    container.innerHTML =
      '<a href="problem.html?id=' + encodeURIComponent(p.id) + '" class="block">' +
      '<div class="flex items-center gap-3 mb-3">' +
        '<div class="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">' +
          '<i data-lucide="brain" class="w-5 h-5 text-cyan-400"></i>' +
        '</div>' +
        '<div class="flex-1 min-w-0">' +
          '<p class="text-sm font-semibold text-white truncate">' + escapeHtml(p.title) + '</p>' +
          '<p class="text-xs text-slate-500">' + catName + ' &middot; ' + t('potd.rating') + ' ' + (p.cf_rating || '?') + '</p>' +
        '</div>' +
        '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ' + badgeCls + '">' + badgeLabel + '</span>' +
      '</div>' +
      '<div class="btn-primary w-full justify-center text-sm py-2.5">' +
        '<i data-lucide="code-2" class="w-4 h-4"></i> ' + t('potd.solve') + '</div>' +
      '</a>';
    lucide.createIcons();
    return;
  }

  /* Fallback to static data */
  var p = VOID_DATA.problemOfDay;
  var badgeCls = p.difficulty === 'easy' ? 'badge-easy' : p.difficulty === 'medium' ? 'badge-medium' : 'badge-hard';
  var badgeLabel = t('diff.' + p.difficulty);

  container.innerHTML =
    '<div class="flex items-center gap-3 mb-3">' +
      '<div class="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">' +
        '<i data-lucide="brain" class="w-5 h-5 text-cyan-400"></i>' +
      '</div>' +
      '<div class="flex-1 min-w-0">' +
        '<p class="text-sm font-semibold text-white truncate">' + p.name + '</p>' +
        '<p class="text-xs text-slate-500">' + p.platform + ' &middot; ' + t('potd.rating') + ' ' + p.rating + '</p>' +
      '</div>' +
      '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ' + badgeCls + '">' + badgeLabel + '</span>' +
    '</div>' +
    '<a href="' + p.link + '" target="_blank" class="btn-primary w-full justify-center text-sm py-2.5">' +
      '<i data-lucide="external-link" class="w-4 h-4"></i> ' + t('potd.solve') + '</a>';
  lucide.createIcons();
}

// ----------------------------------------------------------------
//  ROADMAP — Tabs
// ----------------------------------------------------------------
function renderTabs() {
  var container = $('#tabContainer');
  if (!container) return;

  var roadmaps = VOID_DATA.roadmaps;
  var html = '';
  for (var i = 0; i < roadmaps.length; i++) {
    var r = roadmaps[i];
    var active = r.id === activeTabId ? ' active' : '';
    html += '<button class="tab-btn' + active + '" data-tab="' + r.id + '">' +
      '<i data-lucide="' + r.icon + '" class="w-4 h-4 inline-block mr-1.5"></i>' +
      t('roadmap.' + r.id) + '</button>';
  }
  container.innerHTML = html;
  lucide.createIcons();

  // Attach click listeners
  var btns = $$('.tab-btn', container);
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {
      activeTabId = this.dataset.tab;
      renderTabs();
      renderRoadmapContent();
    });
  }
}

// ----------------------------------------------------------------
//  ROADMAP — Progress Calculation
// ----------------------------------------------------------------
function getRoadmapProgress(roadmapId, milestones) {
  var done = 0;
  for (var i = 0; i < milestones.length; i++) {
    if (isChecked(roadmapId, milestones[i].id)) done++;
  }
  return milestones.length > 0 ? Math.round((done / milestones.length) * 100) : 0;
}

// ----------------------------------------------------------------
//  ROADMAP — Milestone Content
// ----------------------------------------------------------------
function renderRoadmapContent() {
  var content = $('#roadmapContent');
  var sidebar = $('#roadmapSidebar');
  if (!content) return;

  var roadmaps = VOID_DATA.roadmaps;
  var roadmap = null;
  for (var i = 0; i < roadmaps.length; i++) {
    if (roadmaps[i].id === activeTabId) { roadmap = roadmaps[i]; break; }
  }
  if (!roadmap) return;

  var milestones = roadmap.milestones;
  var progressPct = getRoadmapProgress(roadmap.id, milestones);

  // -------- Build 3D Milestone Nodes HTML --------
  var milestonesHtml = '';
  for (var i = 0; i < milestones.length; i++) {
    var m = milestones[i];
    var checked = isChecked(roadmap.id, m.id);

    var badgeCls = m.difficulty === 'easy'   ? 'badge-easy'   :
                   m.difficulty === 'medium' ? 'badge-medium' : 'badge-hard';
    var badgeLabel = t('diff.' + m.difficulty);

    var statusClass = checked ? 'status-mastered' : (i === 0 || isChecked(roadmap.id, milestones[Math.max(0, i - 1)].id) ? 'status-in-progress' : 'status-locked');
    var statusText  = checked ? '✓ MASTERED' : (statusClass === 'status-in-progress' ? '⚡ IN PROGRESS' : '🔒 LOCKED');

    // Subtopics
    var topicsHtml = '';
    if (m.subtopics && m.subtopics.length > 0) {
      topicsHtml += '<div><p class="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><i data-lucide="layers" class="w-3.5 h-3.5"></i> Skills & Subtopics</p><div class="flex flex-wrap gap-2">';
      for (var j = 0; j < m.subtopics.length; j++) {
        var subName = m.subtopics[j].replace(/'/g, "\\'");
        topicsHtml += '<span onclick="openLessonForMilestone(\'' + subName + '\')" class="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-300 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 cursor-pointer transition-all shadow-sm flex items-center gap-1.5"><i data-lucide="book-open" class="w-3 h-3 text-cyan-400"></i> ' + m.subtopics[j] + '</span>';
      }
      topicsHtml += '</div></div>';
    }

    // Practice Problems
    var problemsHtml = '';
    if (m.problems && m.problems.length > 0) {
      problemsHtml += '<div><p class="text-xs font-bold font-mono text-purple-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><i data-lucide="code-2" class="w-3.5 h-3.5"></i> Curated Practice Problems</p><div class="grid sm:grid-cols-2 gap-2.5">';
      for (var j = 0; j < m.problems.length; j++) {
        var prob = m.problems[j];
        problemsHtml +=
          '<a href="' + prob.link + '" target="_blank" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all group shadow-sm">' +
            '<div class="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">' +
              '<i data-lucide="code" class="w-4 h-4 text-cyan-400"></i>' +
            '</div>' +
            '<span class="flex-1 text-xs font-bold text-slate-200 group-hover:text-white transition-colors truncate">' + prob.name + '</span>' +
            '<span class="text-[10px] font-mono font-bold text-slate-500 group-hover:text-cyan-400 transition-colors px-2 py-0.5 rounded bg-slate-800">' + prob.platform + '</span>' +
            '<i data-lucide="external-link" class="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors"></i>' +
          '</a>';
      }
      problemsHtml += '</div></div>';
    } else {
      problemsHtml = '<p class="text-xs text-slate-500 italic">Curated practice telemetry coming soon.</p>';
    }

    var milestoneTitleEsc = m.title.replace(/'/g, "\\'");

    milestonesHtml +=
      '<div class="roadmap-3d-node' + (checked ? ' checked' : '') + '" data-milestone-id="' + m.id + '">' +
        '<div class="roadmap-3d-orb">' + (checked ? '<span style="color:#03060d;font-weight:900;font-size:11px">✓</span>' : '') + '</div>' +

        '<div class="milestone-header flex items-start justify-between p-2 rounded-xl" data-milestone-id="' + m.id + '">' +
          '<div class="flex items-start gap-4 flex-1 min-w-0">' +
            '<input type="checkbox" class="milestone-checkbox mt-1" data-roadmap="' + roadmap.id + '" data-milestone="' + m.id + '"' + (checked ? ' checked' : '') + '>' +
            '<div class="flex-1 min-w-0">' +
              '<div class="flex items-center gap-2 flex-wrap mb-1.5">' +
                '<span class="text-base font-black font-display text-white">' + m.title + '</span>' +
                '<span class="roadmap-status-badge ' + statusClass + '">' + statusText + '</span>' +
                '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ' + badgeCls + '">' + badgeLabel + '</span>' +
                (m.duration ? '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900 text-slate-400 border border-slate-800"><i data-lucide="clock" class="w-3 h-3"></i>' + m.duration + '</span>' : '') +
              '</div>' +
              '<!-- Direct Lesson Button -->' +
              '<div class="mt-2">' +
                '<button onclick="event.stopPropagation();openLessonForMilestone(\'' + milestoneTitleEsc + '\')" class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/30 text-xs font-bold font-mono transition-all flex items-center gap-2 shadow-sm">' +
                  '<i data-lucide="book-open" class="w-3.5 h-3.5 text-cyan-400"></i> Xem Bài Giảng Lộ Trình' +
                '</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 mt-1 transition-transform duration-300 shrink-0"></i>' +
        '</div>' +

        '<div class="accordion-content pt-3">' +
          '<div class="pb-2 pt-2 space-y-5 border-t border-slate-800/80 mt-3">' +
            topicsHtml +
            problemsHtml +
          '</div>' +
        '</div>' +
      '</div>';
  }

  // -------- Main 3D Header Card --------
  var infoHtml = '';
  if (roadmap.goal || roadmap.timeFrame || roadmap.targetRating) {
    infoHtml += '<div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">';
    if (roadmap.timeFrame) {
      infoHtml += '<div class="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800"><span class="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">Timeframe</span><span class="text-sm font-black text-white font-mono">' + roadmap.timeFrame + '</span></div>';
    }
    if (roadmap.targetRating) {
      infoHtml += '<div class="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800"><span class="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">CF Target</span><span class="text-sm font-black text-cyan-400 font-mono">' + roadmap.targetRating + '</span></div>';
    }
    if (roadmap.targetLevel) {
      infoHtml += '<div class="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800"><span class="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">Target Level</span><span class="text-sm font-black text-amber-400 font-mono">' + roadmap.targetLevel + '</span></div>';
    }
    if (roadmap.platforms && roadmap.platforms.length) {
      infoHtml += '<div class="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800"><span class="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">Platforms</span><span class="text-sm font-black text-emerald-400 font-mono">' + roadmap.platforms.join(', ') + '</span></div>';
    }
    infoHtml += '</div>';
    if (roadmap.goal) {
      infoHtml += '<div class="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed mb-6 flex items-start gap-2.5"><i data-lucide="target" class="w-4 h-4 text-cyan-400 shrink-0 mt-0.5"></i> <span>' + roadmap.goal + '</span></div>';
    }
  }

  content.innerHTML =
    '<div class="card p-6 sm:p-8 mb-8">' +
      '<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800/80">' +
        '<div>' +
          '<h3 class="text-2xl sm:text-3xl font-black font-display text-white flex items-center gap-3">' + 
            '<i data-lucide="cpu" class="w-7 h-7 text-cyan-400"></i> ' + t('roadmap.' + roadmap.id) + 
          '</h3>' +
          '<p class="text-xs font-mono text-slate-400 mt-1">' + milestones.length + ' 3D HOLOGRAPHIC MILESTONES IN PIPELINE</p>' +
        '</div>' +
        '<div class="text-left sm:text-right bg-slate-900/80 px-5 py-3 rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10">' +
          '<div class="text-xs font-mono font-bold text-slate-400 uppercase mb-1">Pipeline Completion</div>' +
          '<span class="text-3xl font-black text-cyber-cyan font-mono" id="roadmapPct">' + progressPct + '%</span>' +
          '<div class="progress-bar w-36 mt-2">' +
            '<div class="progress-fill bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" id="roadmapProgressFill" style="width:' + progressPct + '%"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      infoHtml +
    '</div>' +
    '<div class="roadmap-pipeline-container">' +
      '<div class="roadmap-pipeline-track"></div>' +
      milestonesHtml +
    '</div>';

  lucide.createIcons();

  // -------- Accordion toggle --------
  var headers = $$('.milestone-header', content);
  for (var i = 0; i < headers.length; i++) {
    headers[i].addEventListener('click', function(e) {
      // Ignore clicks on the checkbox itself
      if (e.target.type === 'checkbox') return;

      var parentEl = this.closest('.roadmap-3d-node, .timeline-milestone');
      if (!parentEl) return;
      var accordionEl = parentEl.querySelector('.accordion-content');
      var icon = parentEl.querySelector('[data-lucide="chevron-down"]');
      var isOpen = accordionEl.classList.contains('open');

      // Close all siblings
      var siblings = content.querySelectorAll('.accordion-content');
      var ms = content.querySelectorAll('.roadmap-3d-node, .timeline-milestone');
      var icons = content.querySelectorAll('[data-lucide="chevron-down"]');
      for (var j = 0; j < siblings.length; j++) { siblings[j].classList.remove('open'); }
      for (var j = 0; j < ms.length; j++) { ms[j].classList.remove('active'); }
      for (var j = 0; j < icons.length; j++) { icons[j].style.transform = 'rotate(0deg)'; }

      if (!isOpen) {
        accordionEl.classList.add('open');
        parentEl.classList.add('active');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
      lucide.createIcons();
    });
  }

  // -------- Checkbox listeners --------
  var checkboxes = $$('.milestone-checkbox', content);
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', function() {
      var rid  = this.dataset.roadmap;
      var mid  = this.dataset.milestone;
      var parentEl = this.closest('.roadmap-3d-node, .timeline-milestone');
      if (!parentEl) return;

      toggleMilestone(rid, mid);

      // Update visual state
      if (this.checked) {
        parentEl.classList.add('checked');
      } else {
        parentEl.classList.remove('checked');
      }

      var orb = parentEl.querySelector('.roadmap-3d-orb, .timeline-dot');
      if (orb) { orb.innerHTML = this.checked ? '<span style="color:#03060d;font-weight:900;font-size:11px">✓</span>' : ''; }

      // Recalculate and update progress
      var roadmaps = VOID_DATA.roadmaps;
      var roadmap = null;
      for (var r = 0; r < roadmaps.length; r++) {
        if (roadmaps[r].id === rid) { roadmap = roadmaps[r]; break; }
      }
      if (roadmap) {
        var newPct = getRoadmapProgress(rid, roadmap.milestones);
        var pctEl = $('#roadmapPct', content);
        var fillEl = $('#roadmapProgressFill', content);
        if (pctEl) pctEl.textContent = newPct + '%';
        if (fillEl) fillEl.style.width = newPct + '%';

        // Also update sidebar if visible
        var sidebarPct = $('#sidebarPct');
        var sidebarFill = $('#sidebarFill');
        if (sidebarPct) sidebarPct.textContent = newPct + '%';
        if (sidebarFill) sidebarFill.style.width = newPct + '%';

        var sidebarDone = $('#sidebarDone');
        var sidebarRem  = $('#sidebarRem');
        if (sidebarDone) {
          var doneCount = 0;
          for (var r2 = 0; r2 < roadmap.milestones.length; r2++) {
            if (isChecked(rid, roadmap.milestones[r2].id)) doneCount++;
          }
          sidebarDone.textContent = doneCount;
          if (sidebarRem) sidebarRem.textContent = roadmap.milestones.length - doneCount;
        }
      }
    });
  }

  // -------- Sidebar --------
  renderRoadmapSidebar(roadmap, progressPct);
}

// ----------------------------------------------------------------
//  ROADMAP — Sidebar
// ----------------------------------------------------------------
function renderRoadmapSidebar(roadmap, progressPct) {
  var sidebar = $('#roadmapSidebar');
  if (!sidebar) return;

  var doneCount = 0;
  for (var i = 0; i < roadmap.milestones.length; i++) {
    if (isChecked(roadmap.id, roadmap.milestones[i].id)) doneCount++;
  }
  var remaining = roadmap.milestones.length - doneCount;

  var metaHtml = '';
  if (roadmap.goal || roadmap.targetRating || roadmap.timeFrame || roadmap.platforms) {
    metaHtml = '<div class="stat-card p-5">' +
      '<div class="flex items-center gap-2 mb-3"><i data-lucide="info" class="w-4 h-4 text-cyan-400"></i><h4 class="font-bold text-sm text-white">Thông tin</h4></div>' +
      '<div class="space-y-2 text-xs">';
    if (roadmap.timeFrame) metaHtml += '<div class="flex justify-between text-slate-400"><span>Thời gian</span><span class="text-white font-medium">' + roadmap.timeFrame + '</span></div>';
    if (roadmap.targetRating) metaHtml += '<div class="flex justify-between text-slate-400"><span>CF Target</span><span class="text-cyan-400 font-medium">' + roadmap.targetRating + '</span></div>';
    if (roadmap.targetLevel) metaHtml += '<div class="flex justify-between text-slate-400"><span>Level</span><span class="text-amber-400 font-medium">' + roadmap.targetLevel + '</span></div>';
    if (roadmap.platforms && roadmap.platforms.length) metaHtml += '<div class="flex justify-between text-slate-400"><span>Nền tảng</span><span class="text-emerald-400 font-medium">' + roadmap.platforms.join(', ') + '</span></div>';
    metaHtml += '</div></div>';
  }

  sidebar.innerHTML =
    '<div class="stat-card p-5">' +
      '<div class="flex items-center gap-2 mb-4">' +
        '<i data-lucide="bar-chart-3" class="w-4 h-4 text-cyan-400"></i>' +
        '<h4 class="font-bold text-sm text-white">' + t('roadmap.progress') + '</h4>' +
      '</div>' +
      '<div class="text-center">' +
        '<span class="text-4xl font-extrabold text-white" id="sidebarPct">' + progressPct + '%</span>' +
        '<p class="text-xs text-slate-500 mt-1">' + t('roadmap.progressOf') + ' ' + t('roadmap.' + roadmap.id) + '</p>' +
      '</div>' +
      '<div class="progress-bar w-full mt-3">' +
        '<div class="progress-fill bg-gradient-to-r from-cyan-500 to-blue-500" id="sidebarFill" style="width:' + progressPct + '%"></div>' +
      '</div>' +
      '<div class="mt-4 space-y-2 text-xs">' +
        '<div class="flex justify-between text-slate-400"><span>' + t('roadmap.completed') + '</span><span class="text-emerald-400 font-semibold" id="sidebarDone">' + doneCount + '</span></div>' +
        '<div class="flex justify-between text-slate-400"><span>' + t('roadmap.remaining') + '</span><span class="text-cyan-400 font-semibold" id="sidebarRem">' + remaining + '</span></div>' +
        '<div class="flex justify-between text-slate-400"><span>' + t('roadmap.total') + '</span><span class="text-slate-300 font-semibold">' + roadmap.milestones.length + '</span></div>' +
      '</div>' +
    '</div>' +
    metaHtml +
    '<div class="stat-card p-5">' +
      '<div class="flex items-center gap-2 mb-3">' +
        '<i data-lucide="zap" class="w-4 h-4 text-amber-400"></i>' +
        '<h4 class="font-bold text-sm text-white">' + t('roadmap.tips.title') + '</h4>' +
      '</div>' +
      '<ul class="space-y-2 text-xs text-slate-400">' +
        '<li class="flex items-start gap-2"><i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0"></i> ' + t('roadmap.tips.1') + '</li>' +
        '<li class="flex items-start gap-2"><i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0"></i> ' + t('roadmap.tips.2') + '</li>' +
        '<li class="flex items-start gap-2"><i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0"></i> ' + t('roadmap.tips.3') + '</li>' +
      '</ul>' +
    '</div>';
  lucide.createIcons();
}

// ----------------------------------------------------------------
//  MOBILE NAV
// ----------------------------------------------------------------
function initMobileNav() {
  var hamburger = $('#hamburgerBtn');
  var menu      = $('#mobileMenu');
  if (!hamburger || !menu) return;

  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    menu.classList.toggle('open');
  });

  var links = $$('a', menu);
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function() {
      hamburger.classList.remove('active');
      menu.classList.remove('open');
    });
  }
}

// ----------------------------------------------------------------
//  FADE-IN ON SCROLL
// ----------------------------------------------------------------
function initFadeIn() {
  var observer = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('visible');
      }
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  var els = $$('.fade-in');
  for (var i = 0; i < els.length; i++) { observer.observe(els[i]); }
}
