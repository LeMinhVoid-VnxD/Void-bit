// ================================================================
//  VOID-BIT — Lesson Page Script
//  Reads ?cat=X&id=Y from URL, renders sidebar + content.
// ================================================================

var $ = function(s, p) { return (p || document).querySelector(s); };
var $$ = function(s, p) { return [...(p || document).querySelectorAll(s)]; };

// ----------------------------------------------------------------
//  READ URL PARAMS
// ----------------------------------------------------------------
function getParams() {
  var p = new URLSearchParams(window.location.search);
  return { cat: p.get('cat'), id: p.get('id') };
}

// ----------------------------------------------------------------
//  RENDER PAGE
// ----------------------------------------------------------------
function renderLessonPage() {
  var params = getParams();
  if (!params.cat || !params.id) {
    window.location.href = '../index.html';
    return;
  }

  // Find category and lesson
  var cat = null, catIdx = -1;
  for (var i = 0; i < LESSONS.categories.length; i++) {
    if (LESSONS.categories[i].id === params.cat) { cat = LESSONS.categories[i]; catIdx = i; break; }
  }
  if (!cat) { window.location.href = '../index.html'; return; }

  var lesson = null, lessonIdx = -1;
  for (var i = 0; i < cat.lessons.length; i++) {
    if (cat.lessons[i].id === params.id) { lesson = cat.lessons[i]; lessonIdx = i; break; }
  }
  if (!lesson) { window.location.href = '../index.html'; return; }

  // Set page title
  document.title = lesson.title + ' — Void-bit';

  // Render sidebar
  renderSidebar(cat, lesson.id);

  // Render main content
  renderContent(cat, lesson, lessonIdx, catIdx);

  // Render nav
  renderNav(cat, lessonIdx);

  // Load Lucide icons
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ----------------------------------------------------------------
//  SIDEBAR
// ----------------------------------------------------------------
function renderSidebar(cat, activeId) {
  var sidebar = $('#lessonSidebar');
  if (!sidebar) return;

  var html = '<div class="lesson-sidebar-header">' +
    '<a href="../index.html" class="lesson-sidebar-back">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>' +
      (typeof t === 'function' ? t('lesson.backTo') + ' Void-bit' : 'Back') +
    '</a>' +
    '<div class="lesson-sidebar-title">' + (typeof t === 'function' ? t('cat.' + cat.id) : cat.name) + '</div>' +
    '<div class="lesson-sidebar-count">' + cat.lessons.length + ' ' + (typeof t === 'function' ? t('lesson.lessons') : 'lessons') + '</div>' +
  '</div>';

  html += '<div class="lesson-sidebar-topics">';
  for (var i = 0; i < cat.lessons.length; i++) {
    var l = cat.lessons[i];
    var active = l.id === activeId ? ' active' : '';
    var dotColor = l.difficulty === 'easy' ? '#34d399' : l.difficulty === 'medium' ? '#fbbf24' : '#f87171';
    var diffCls = l.difficulty === 'easy' ? 'badge-easy' : l.difficulty === 'medium' ? 'badge-medium' : 'badge-hard';
    var diffLabel = typeof t === 'function' ? t('diff.' + l.difficulty) : l.difficulty;
    html += '<a href="index.html?cat=' + cat.id + '&id=' + l.id + '" class="lesson-sidebar-item' + active + '">' +
      '<span class="lesson-sidebar-dot" style="background:' + dotColor + '"></span>' +
      '<span class="lesson-sidebar-label">' + l.title + '</span>' +
      '<span class="lesson-sidebar-diff ' + diffCls + '">' + diffLabel + '</span>' +
    '</a>';
  }
  html += '</div>';

  sidebar.innerHTML = html;
}

// ----------------------------------------------------------------
//  MAIN CONTENT
// ----------------------------------------------------------------
function renderContent(cat, lesson, lessonIdx, catIdx) {
  var content = $('#lessonContent');
  if (!content) return;

  var diffCls = lesson.difficulty === 'easy' ? 'badge-easy' : lesson.difficulty === 'medium' ? 'badge-medium' : 'badge-hard';
  var diffLabel = typeof t === 'function' ? t('diff.' + lesson.difficulty) : lesson.difficulty;

  var html =
    '<div class="lesson-breadcrumb">' +
      '<a href="../index.html">Void-bit</a>' +
      '<span class="sep">/</span>' +
      '<a href="../index.html#roadmap">' + (typeof t === 'function' ? t('nav.lessons') : 'Lessons') + '</a>' +
      '<span class="sep">/</span>' +
      '<span>' + (typeof t === 'function' ? t('cat.' + cat.id) : cat.name) + '</span>' +
      '<span class="sep">/</span>' +
      '<span style="color:#e2e8f0">' + lesson.title + '</span>' +
    '</div>' +
    '<div class="lesson-main-header">' +
      '<h1 class="lesson-main-title">' + lesson.title + '</h1>' +
      '<div class="lesson-main-meta">' +
        '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ' + diffCls + '">' + diffLabel + '</span>' +
      '</div>' +
    '</div>';

  html += lesson.content;

  // Problems section
  if (lesson.problems && lesson.problems.length > 0) {
    html += '<div class="lesson-section"><h4>' + (typeof t === 'function' ? t('lesson.problems') : 'Practice Problems') + '</h4><div class="lesson-problems">';
    for (var i = 0; i < lesson.problems.length; i++) {
      var p = lesson.problems[i];
      var dc = p.difficulty === 'easy' ? 'badge-easy' : p.difficulty === 'medium' ? 'badge-medium' : 'badge-hard';
      var dl = typeof t === 'function' ? t('diff.' + p.difficulty) : p.difficulty;
      html += '<a href="' + p.link + '" target="_blank" class="lesson-problem-item">' +
        '<span class="lesson-problem-name">' + p.name + '</span>' +
        '<span class="lesson-problem-platform">' + p.platform + '</span>' +
        '<span class="lesson-problem-diff ' + dc + '">' + dl + '</span>' +
      '</a>';
    }
    html += '</div></div>';
  }

  content.innerHTML = html;
}

// ----------------------------------------------------------------
//  PREV / NEXT NAV
// ----------------------------------------------------------------
function renderNav(cat, lessonIdx) {
  var nav = $('#lessonNav');
  if (!nav) return;

  var prevHtml = '', nextHtml = '';
  if (lessonIdx > 0) {
    var prev = cat.lessons[lessonIdx - 1];
    prevHtml = '<a href="index.html?cat=' + cat.id + '&id=' + prev.id + '" class="lesson-nav-btn">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>' +
      prev.title +
    '</a>';
  } else {
    prevHtml = '<span class="lesson-nav-btn disabled">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>' +
      (typeof t === 'function' ? t('lesson.backTo') : 'Previous') +
    '</span>';
  }

  if (lessonIdx < cat.lessons.length - 1) {
    var next = cat.lessons[lessonIdx + 1];
    nextHtml = '<a href="index.html?cat=' + cat.id + '&id=' + next.id + '" class="lesson-nav-btn">' +
      next.title +
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
    '</a>';
  } else {
    nextHtml = '<span class="lesson-nav-btn disabled">' +
      (typeof t === 'function' ? t('lesson.coming') : 'Next') +
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
    '</span>';
  }

  nav.innerHTML = prevHtml + nextHtml;
}

// ----------------------------------------------------------------
//  INIT
// ----------------------------------------------------------------
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderLessonPage);
} else {
  renderLessonPage();
}
