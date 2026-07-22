// ================================================================
//  VOID-BIT — Lesson Catalog (Modal)
//  Browse categories → topics, then navigate to Lesson page.
// ================================================================

var viewStack = [];

function openLessonViewer() {
  var panel = $('#lessonViewer');
  if (!panel) return;
  viewStack = ['categories'];
  panel.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderLessonView();
}

function closeLessonViewer() {
  var panel = $('#lessonViewer');
  if (!panel) return;
  panel.classList.remove('open');
  document.body.style.overflow = '';
  viewStack = ['categories'];
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLessonViewer();
});

function lessonNavPush(state) {
  viewStack.push(state);
  renderLessonView();
}
function lessonNavBack() {
  if (viewStack.length > 1) viewStack.pop();
  renderLessonView();
}

// Navigate to the standalone lesson page
function goToLesson(catId, lessonId) {
  closeLessonViewer();
  window.location.href = 'Lesson/index.html?cat=' + catId + '&id=' + lessonId;
}

function renderLessonView() {
  var body = $('#lessonViewerBody');
  var title = $('#lessonViewerTitle');
  if (!body || !title) return;

  var current = viewStack[viewStack.length - 1];

  // ----- CATEGORIES (root) -----
  if (current === 'categories') {
    title.textContent = t('lesson.title');
    var html = '<p style="color:#64748b;font-size:13px;margin-bottom:16px;">' + t('lesson.subtitle') + '</p>';
    html += '<div class="lesson-category-grid">';
    var cats = LESSONS.categories;
    for (var i = 0; i < cats.length; i++) {
      var c = cats[i];
      html += '<div class="lesson-category-card" data-cat-id="' + c.id + '">' +
        '<div class="lesson-category-icon" style="background:rgba(0,240,255,0.08);border:1px solid rgba(0,240,255,0.15);">' +
          '<i data-lucide="' + c.icon + '" class="w-5 h-5 text-' + c.color + '-400"></i>' +
        '</div>' +
        '<div class="lesson-category-name">' + t('cat.' + c.id) + '</div>' +
        '<div class="lesson-category-count">' + c.lessons.length + ' ' + t('lesson.lessons') + '</div>' +
      '</div>';
    }
    html += '</div>';
    body.innerHTML = html;

    var cards = body.querySelectorAll('.lesson-category-card');
    for (var i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click', function() {
        lessonNavPush({ catId: this.dataset.catId });
      });
    }
    lucide.createIcons();
    return;
  }

  // ----- TOPICS LIST within a category -----
  if (current.catId && !current.lessonId) {
    var cat = null;
    for (var i = 0; i < LESSONS.categories.length; i++) {
      if (LESSONS.categories[i].id === current.catId) { cat = LESSONS.categories[i]; break; }
    }
    if (!cat) { lessonNavBack(); return; }

    title.textContent = t('cat.' + cat.id);
    var html = '<button class="lesson-back-btn" id="lessonBackBtn"><i data-lucide="arrow-left" class="w-4 h-4"></i> ' + t('lesson.back') + '</button>';
    html += '<p style="color:#64748b;font-size:13px;margin-bottom:12px;">' + cat.lessons.length + ' ' + t('lesson.lessons') + ' — ' + t('lesson.subtitle').toLowerCase() + '</p>';
    html += '<div class="lesson-topic-list">';
    for (var i = 0; i < cat.lessons.length; i++) {
      var l = cat.lessons[i];
      var diffCls = l.difficulty === 'easy' ? 'badge-easy' : l.difficulty === 'medium' ? 'badge-medium' : 'badge-hard';
      var diffLabel = t('diff.' + l.difficulty);
      var dotColor = l.difficulty === 'easy' ? '#34d399' : l.difficulty === 'medium' ? '#fbbf24' : '#f87171';
      html += '<div class="lesson-topic-item" data-cat-id="' + cat.id + '" data-lesson-id="' + l.id + '">' +
        '<span class="lesson-topic-icon" style="background:' + dotColor + '"></span>' +
        '<span class="lesson-topic-title">' + l.title + '</span>' +
        '<span class="lesson-topic-diff ' + diffCls + '">' + diffLabel + '</span>' +
        '<i data-lucide="chevron-right" class="lesson-topic-arrow w-4 h-4"></i>' +
      '</div>';
    }
    html += '</div>';
    body.innerHTML = html;

    var backBtn = $('#lessonBackBtn', body);
    if (backBtn) backBtn.addEventListener('click', lessonNavBack);

    var items = body.querySelectorAll('.lesson-topic-item');
    for (var i = 0; i < items.length; i++) {
      items[i].addEventListener('click', function() {
        goToLesson(this.dataset.catId, this.dataset.lessonId);
      });
    }
    lucide.createIcons();
    return;
  }
}
