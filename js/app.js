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
    if (errEl) { errEl.textContent = t('forum.authRequired'); errEl.classList.remove('hidden'); }
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
  var passHash = hashStr(password);
  supabaseClient.from('users').insert({
    username: username.toLowerCase(),
    password_hash: passHash,
    display_name: displayName,
    avatar_url: ''
  }).then(function(res) {
    if (res.error) {
      if (res.error.message && res.error.message.indexOf('duplicate') > -1) {
        if (errEl) { errEl.textContent = t('forum.userExists'); errEl.classList.remove('hidden'); }
      } else {
        if (errEl) { errEl.textContent = t('forum.authError') + ' ' + (res.error.message || ''); errEl.classList.remove('hidden'); }
      }
      return;
    }
    gateCreateSession(username, displayName, '');
    hideAuthGate();
    init();
  });
}

function gateLogin(username, password, errEl) {
  var passHash = hashStr(password);
  supabaseClient.from('users').select('*').eq('username', username.toLowerCase()).single().then(function(res) {
    if (res.error || !res.data) {
      if (errEl) { errEl.textContent = t('forum.userNotFound'); errEl.classList.remove('hidden'); }
      return;
    }
    if (res.data.password_hash !== passHash) {
      if (errEl) { errEl.textContent = t('forum.wrongPass'); errEl.classList.remove('hidden'); }
      return;
    }
    gateCreateSession(username, res.data.display_name || username, res.data.avatar_url || '');
    hideAuthGate();
    init();
  });
}

function gateCreateSession(username, displayName, avatarUrl) {
  var token = hashStr(username + ':' + Date.now());
  localStorage.setItem('voidbit_session', token);
  localStorage.setItem('voidbit_username', username.toLowerCase());
  localStorage.setItem('voidbit_forum_name', displayName);
  localStorage.setItem('voidbit_forum_avatar', avatarUrl);
  forum.loggedIn = true;
  forum.myName = displayName;
  forum.myAvatar = avatarUrl;
}

function renderNavProfile() {
  var badge = $('#navUserBadge');
  if (!badge) return;
  if (!forum.loggedIn) {
    badge.style.display = 'none';
    return;
  }
  badge.style.display = 'flex';
  badge.innerHTML = getAvatarHtml(forum.myName, forum.myAvatar, 7) +
    '<span class="text-xs text-slate-400 hidden sm:inline max-w-[100px] truncate">' + escapeHtml(forum.myName) + '</span>';
}

// ----------------------------------------------------------------
//  INIT — read localStorage, render everything
// ----------------------------------------------------------------
function init() {
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

  // Seed streak if not set
  if (!streakData.count) {
    streakData = { count: 7, lastDate: new Date().toISOString().slice(0, 10) };
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
  var html = '';
  for (var i = 0; i < courses.length; i++) {
    var c = courses[i];
    var badgeCls = c.difficulty === 'easy'   ? 'badge-easy'   :
                   c.difficulty === 'medium' ? 'badge-medium' : 'badge-hard';
    var badgeLabel = t('diff.' + c.difficulty);

    html += '<div class="card p-5 cursor-pointer group course-card" data-course="' + c.id + '">' +
      '<div class="flex items-start justify-between mb-3">' +
        '<div class="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">' +
          '<i data-lucide="' + c.icon + '" class="w-5 h-5 text-cyan-400"></i>' +
        '</div>' +
        '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ' + badgeCls + '">' + badgeLabel + '</span>' +
      '</div>' +
      '<h3 class="text-lg font-bold text-white mb-1">' + t('course.' + c.id) + '</h3>' +
      '<p class="text-xs text-slate-500 mb-4">' + t('course.' + c.id + '.desc') + '</p>' +
      '<div class="flex items-center justify-between mb-2">' +
        '<span class="text-xs text-slate-500"><span class="text-slate-300 font-semibold">' + c.lessons + '</span> ' + t('courses.lessons') + '</span>' +
        '<span class="text-xs text-slate-500">' + c.progress + '%</span>' +
      '</div>' +
      '<div class="progress-bar"><div class="progress-fill bg-gradient-to-r from-cyan-500 to-blue-500" style="width:' + c.progress + '%"></div></div>' +
      '<div class="mt-3 text-center"><span class="text-xs font-medium text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">' + t('courses.view') + '</span></div>' +
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

  var users = VOID_DATA.leaderboard;
  var rowColors  = ['text-amber-400','text-slate-300','text-amber-600','text-slate-500','text-slate-500'];
  var rowBgs     = ['bg-amber-400/20 border-amber-400/30','bg-slate-300/20 border-slate-300/30','bg-amber-600/20 border-amber-600/30','bg-slate-500/20 border-slate-500/30','bg-slate-500/20 border-slate-500/30'];
  var gradients  = ['amber','blue','purple','cyan','emerald'];
  var html = '';

  for (var i = 0; i < users.length; i++) {
    var u = users[i];
    html += '<div class="leaderboard-row">' +
      '<div class="leaderboard-rank ' + rowBgs[i] + ' ' + rowColors[i] + '">' + (i + 1) + '</div>' +
      '<div class="flex-1 flex items-center gap-2">' +
        '<div class="w-6 h-6 rounded-full bg-gradient-to-br from-' + gradients[i] + '-400 to-' + gradients[i] + '-600 flex items-center justify-center text-[9px] font-bold text-white">' + u.name.charAt(0).toUpperCase() + '</div>' +
        '<span class="text-sm font-medium text-slate-300">' + u.name + '</span>' +
      '</div>' +
      '<span class="text-sm font-bold text-cyan-400">' + u.score + '</span>' +
    '</div>';
  }
  container.innerHTML = html;
}

// ----------------------------------------------------------------
//  RENDER: Problem of the Day
// ----------------------------------------------------------------
function renderProblemOfDay() {
  var container = $('#problemOfDayContainer');
  if (!container) return;

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

  // -------- Build milestone HTML --------
  var milestonesHtml = '';
  for (var i = 0; i < milestones.length; i++) {
    var m = milestones[i];
    var checked = isChecked(roadmap.id, m.id);

    var badgeCls = m.difficulty === 'easy'   ? 'badge-easy'   :
                   m.difficulty === 'medium' ? 'badge-medium' : 'badge-hard';
    var badgeLabel = t('diff.' + m.difficulty);

    // Subtopics
    var topicsHtml = '';
    if (m.subtopics && m.subtopics.length > 0) {
      topicsHtml += '<div><p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Topics</p><div class="flex flex-wrap gap-2">';
      for (var j = 0; j < m.subtopics.length; j++) {
        topicsHtml += '<span class="px-3 py-1 rounded-lg bg-slate-800/50 border border-slate-700/50 text-xs text-slate-300">' + m.subtopics[j] + '</span>';
      }
      topicsHtml += '</div></div>';
    }

    // Problems
    var problemsHtml = '';
    if (m.problems && m.problems.length > 0) {
      problemsHtml += '<div><p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Practice Problems</p><div class="space-y-2">';
      for (var j = 0; j < m.problems.length; j++) {
        var prob = m.problems[j];
        problemsHtml +=
          '<a href="' + prob.link + '" target="_blank" class="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:border-cyan-500/20 hover:bg-cyan-500/5 transition-all group">' +
            '<div class="w-6 h-6 rounded-md bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">' +
              '<i data-lucide="code" class="w-3.5 h-3.5 text-cyan-400"></i>' +
            '</div>' +
            '<span class="flex-1 text-sm text-slate-300 group-hover:text-white transition-colors">' + prob.name + '</span>' +
            '<span class="text-[10px] font-medium text-slate-600 group-hover:text-cyan-400 transition-colors">' + prob.platform + '</span>' +
            '<i data-lucide="external-link" class="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors"></i>' +
          '</a>';
      }
      problemsHtml += '</div></div>';
    } else {
      problemsHtml = '<p class="text-xs text-slate-600 italic">Practice problems coming soon.</p>';
    }

    milestonesHtml +=
      '<div class="timeline-milestone' + (checked ? ' checked' : '') + '" data-milestone-id="' + m.id + '">' +
        '<div class="timeline-dot">' + (checked ? '&#10003;' : '') + '</div>' +

        '<div class="milestone-header flex items-start justify-between p-4 rounded-xl hover:bg-slate-800/30 transition-colors" data-milestone-id="' + m.id + '">' +
          '<div class="flex items-center gap-3 flex-1 min-w-0">' +
            '<input type="checkbox" class="milestone-checkbox" data-roadmap="' + roadmap.id + '" data-milestone="' + m.id + '"' + (checked ? ' checked' : '') + '>' +
            '<div class="flex-1 min-w-0">' +
              '<div class="flex items-center gap-2 flex-wrap">' +
                '<span class="text-sm font-bold text-white">' + m.title + '</span>' +
                '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ' + badgeCls + '">' + badgeLabel + '</span>' +
                (m.duration ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800/60 text-slate-400 border border-slate-700/50"><i data-lucide="clock" class="w-3 h-3"></i>' + m.duration + '</span>' : '') +
              '</div>' +
            '</div>' +
          '</div>' +
          '<i data-lucide="chevron-down" class="w-4 h-4 text-slate-500 mt-0.5 transition-transform duration-300 shrink-0"></i>' +
        '</div>' +

        '<div class="accordion-content pl-4 pr-4">' +
          '<div class="pb-4 pt-2 space-y-4">' +
            topicsHtml +
            problemsHtml +
          '</div>' +
        '</div>' +
      '</div>';
  }

  // -------- Main content card --------
  var infoHtml = '';
  if (roadmap.goal || roadmap.timeFrame || roadmap.targetRating) {
    infoHtml += '<div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">';
    if (roadmap.timeFrame) {
      infoHtml += '<div class="px-3 py-2 rounded-lg bg-slate-800/40 border border-slate-700/40"><span class="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Thời gian</span><span class="text-sm font-bold text-white">' + roadmap.timeFrame + '</span></div>';
    }
    if (roadmap.targetRating) {
      infoHtml += '<div class="px-3 py-2 rounded-lg bg-slate-800/40 border border-slate-700/40"><span class="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider">CF Target</span><span class="text-sm font-bold text-cyan-400">' + roadmap.targetRating + '</span></div>';
    }
    if (roadmap.targetLevel) {
      infoHtml += '<div class="px-3 py-2 rounded-lg bg-slate-800/40 border border-slate-700/40"><span class="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Level</span><span class="text-sm font-bold text-amber-400">' + roadmap.targetLevel + '</span></div>';
    }
    if (roadmap.platforms && roadmap.platforms.length) {
      infoHtml += '<div class="px-3 py-2 rounded-lg bg-slate-800/40 border border-slate-700/40"><span class="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Nền tảng</span><span class="text-sm font-bold text-emerald-400">' + roadmap.platforms.join(', ') + '</span></div>';
    }
    infoHtml += '</div>';
    if (roadmap.goal) {
      infoHtml += '<p class="text-xs text-slate-400 leading-relaxed mb-5 px-1">🎯 ' + roadmap.goal + '</p>';
    }
  }

  content.innerHTML =
    '<div class="card p-6">' +
      '<div class="flex items-center justify-between mb-4">' +
        '<div>' +
          '<h3 class="text-xl font-bold text-white">' + t('roadmap.' + roadmap.id) + '</h3>' +
          '<p class="text-sm text-slate-500 mt-1">' + milestones.length + ' ' + t('roadmap.milestones') + '</p>' +
        '</div>' +
        '<div class="text-right">' +
          '<span class="text-2xl font-extrabold text-cyan-400" id="roadmapPct">' + progressPct + '%</span>' +
          '<div class="progress-bar w-32 mt-1 ml-auto">' +
            '<div class="progress-fill bg-gradient-to-r from-cyan-500 to-blue-500" id="roadmapProgressFill" style="width:' + progressPct + '%"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      infoHtml +
      '<div class="space-y-0">' + milestonesHtml + '</div>' +
    '</div>';

  lucide.createIcons();

  // -------- Accordion toggle --------
  var headers = $$('.milestone-header', content);
  for (var i = 0; i < headers.length; i++) {
    headers[i].addEventListener('click', function(e) {
      // Ignore clicks on the checkbox itself
      if (e.target.type === 'checkbox') return;

      var parentEl = this.closest('.timeline-milestone');
      var accordionEl = parentEl.querySelector('.accordion-content');
      var icon = parentEl.querySelector('[data-lucide="chevron-down"]');
      var isOpen = accordionEl.classList.contains('open');

      // Close all siblings
      var siblings = content.querySelectorAll('.accordion-content');
      var ms = content.querySelectorAll('.timeline-milestone');
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
      var parentEl = this.closest('.timeline-milestone');

      toggleMilestone(rid, mid);

      // Update visual state
      if (this.checked) {
        parentEl.classList.add('checked');
      } else {
        parentEl.classList.remove('checked');
      }

      var dot = parentEl.querySelector('.timeline-dot');
      if (dot) { dot.innerHTML = this.checked ? '&#10003;' : ''; }

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
