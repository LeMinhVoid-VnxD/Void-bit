// ================================================================
//  VOID-BIT — Forum & Chat (Supabase)
//  Thread list + real-time messages via Supabase Realtime.
// ================================================================

var forum = {
  view: 'list',
  threadId: null,
  threadTitle: '',
  channels: [],
  threadsLoaded: false
};

// ----------------------------------------------------------------
//  ENTRY
// ----------------------------------------------------------------
function renderForum() {
  var container = $('#forumContent');
  if (!container) return;
  cleanupForum();
  forum.view = 'list';
  forum.threadId = null;
  renderForumHeader(container);
  renderThreadList(container);
}

function renderForumHeader(container) {
  container.innerHTML =
    '<div class="mb-10 text-center">' +
      '<span class="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">' + t('forum.badge') + '</span>' +
      '<h2 class="text-3xl sm:text-4xl font-extrabold text-white">' + t('forum.title') + '</h2>' +
      '<p class="text-slate-400 mt-3 max-w-xl mx-auto">' + t('forum.subtitle') + '</p>' +
    '</div>' +
    '<div class="flex items-center justify-between mb-6">' +
      '<p class="text-sm text-slate-500" id="threadCount">' + t('forum.loading') + '</p>' +
      '<button onclick="openNewThreadModal()" class="btn-primary py-2.5 px-4 text-sm">' +
        '<i data-lucide="plus" class="w-4 h-4"></i> ' + t('forum.newThread') +
      '</button>' +
    '</div>' +
    '<div id="threadList" class="space-y-2"></div>';
  lucide.createIcons();
}

// ----------------------------------------------------------------
//  THREAD LIST
// ----------------------------------------------------------------
function renderThreadList(container) {
  var listEl = $('#threadList');
  var countEl = $('#threadCount');
  if (!listEl) return;

  // Load existing threads
  supabaseClient.from('threads').select('*').order('last_activity_at', { ascending: false }).then(function(res) {
    if (res.error) { listEl.innerHTML = '<p class="text-center text-red-400 py-8">Error loading threads.</p>'; return; }
    forum.threadsLoaded = true;
    if (res.data.length === 0) {
      listEl.innerHTML = '<div class="text-center text-slate-500 py-16"><i data-lucide="message-circle" class="w-12 h-12 mx-auto mb-3 opacity-20"></i><p>' + t('forum.empty') + '</p></div>';
      lucide.createIcons();
    } else {
      renderThreadCards(res.data);
    }
    if (countEl) countEl.textContent = res.data.length + ' ' + t('forum.threads');
  });

  // Subscribe to new threads in real-time
  var ch = supabaseClient.channel('forum-threads');
  ch.on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'threads' },
    function(payload) {
      if (!forum.threadsLoaded) return;
      var listEl2 = $('#threadList');
      if (!listEl2) return;
      // Prepend new thread
      var card = buildThreadCard(payload.new.id, payload.new);
      var emptyMsg = listEl2.querySelector('.text-center.py-16');
      if (emptyMsg) {
        listEl2.innerHTML = card;
      } else {
        listEl2.innerHTML = card + listEl2.innerHTML;
      }
      lucide.createIcons();
      attachThreadClicks();
      var countEl2 = $('#threadCount');
      if (countEl2) {
        var cards = listEl2.querySelectorAll('.thread-card');
        countEl2.textContent = cards.length + ' ' + t('forum.threads');
      }
    }
  );
  ch.subscribe();
  forum.channels.push(ch);
}

function renderThreadCards(threads) {
  var listEl = $('#threadList');
  if (!listEl) return;
  var html = '';
  for (var i = 0; i < threads.length; i++) {
    html += buildThreadCard(threads[i].id, threads[i]);
  }
  listEl.innerHTML = html;
  lucide.createIcons();
  attachThreadClicks();
}

function buildThreadCard(id, t) {
  var timeStr = t.last_activity_at ? formatTime(new Date(t.last_activity_at)) : '';
  var replies = (t.reply_count || 0) + ' ' + t('forum.replies');
  return '<div class="thread-card" data-thread-id="' + id + '">' +
    '<div class="thread-card-left">' +
      '<div class="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">' +
        '<i data-lucide="message-square" class="w-4 h-4 text-cyan-400"></i>' +
      '</div>' +
      '<div class="min-w-0 flex-1">' +
        '<h4 class="text-sm font-bold text-white truncate">' + escapeHtml(t.title) + '</h4>' +
        '<p class="text-xs text-slate-500 mt-0.5">' +
          '<span class="text-cyan-400 font-medium">' + escapeHtml(t.author) + '</span>' +
          ' · ' + replies +
          (timeStr ? ' · ' + timeStr : '') +
        '</p>' +
      '</div>' +
    '</div>' +
    '<i data-lucide="chevron-right" class="w-4 h-4 text-slate-600 shrink-0"></i>' +
  '</div>';
}

function attachThreadClicks() {
  var cards = $$('.thread-card');
  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function() {
      var tid = this.dataset.threadId;
      var titleEl = this.querySelector('h4');
      forum.threadId = tid;
      forum.threadTitle = titleEl ? titleEl.textContent : '';
      forum.view = 'thread';
      renderThreadView($('#forumContent'));
    });
  }
}

// ----------------------------------------------------------------
//  THREAD DETAIL
// ----------------------------------------------------------------
function renderThreadView(container) {
  container.innerHTML =
    '<div class="mb-4">' +
      '<button onclick="forumGoBack()" class="text-xs text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1">' +
        '<i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> ' + t('forum.back') +
      '</button>' +
      '<h3 class="text-lg font-bold text-white mt-2 truncate">' + escapeHtml(forum.threadTitle) + '</h3>' +
    '</div>' +
    '<div class="forum-messages-wrap mb-4" id="messageWrap">' +
      '<div id="messageList" class="space-y-3"></div>' +
    '</div>' +
    '<div class="forum-input-bar">' +
      '<input type="text" id="messageInput" placeholder="' + t('forum.placeholder') + '" class="flex-1 px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition-colors">' +
      '<button onclick="forumSendMessage()" class="btn-primary py-2.5 px-4 text-sm">' +
        '<i data-lucide="send" class="w-4 h-4"></i>' +
      '</button>' +
    '</div>';
  lucide.createIcons();

  // Load existing messages
  var listEl = $('#messageList');
  supabaseClient.from('messages').select('*').eq('thread_id', forum.threadId).order('created_at', { ascending: true }).then(function(res) {
    if (res.error) { if (listEl) listEl.innerHTML = '<p class="text-center text-red-400 py-8">Error.</p>'; return; }
    if (res.data.length === 0) {
      if (listEl) listEl.innerHTML = '<div class="text-center text-slate-500 py-12"><p>' + t('forum.noMessages') + '</p></div>';
      return;
    }
    if (listEl) {
      var html = '';
      for (var i = 0; i < res.data.length; i++) {
        html += buildMessageCard(res.data[i]);
      }
      listEl.innerHTML = html;
      var wrap = $('#messageWrap');
      if (wrap) wrap.scrollTop = wrap.scrollHeight;
      lucide.createIcons();
    }
  });

  // Subscribe to new messages in real-time
  var ch = supabaseClient.channel('forum-msg-' + forum.threadId);
  ch.on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'messages', filter: 'thread_id=eq.' + forum.threadId },
    function(payload) {
      var listEl2 = $('#messageList');
      if (!listEl2) return;
      var emptyMsg = listEl2.querySelector('.text-center.py-12');
      if (emptyMsg) emptyMsg.remove();
      listEl2.innerHTML += buildMessageCard(payload.new);
      var wrap2 = $('#messageWrap');
      if (wrap2) wrap2.scrollTop = wrap2.scrollHeight;
      lucide.createIcons();
    }
  );
  ch.subscribe();
  forum.channels.push(ch);

  // Enter key to send
  var input = $('#messageInput');
  if (input) {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') forumSendMessage();
    });
    setTimeout(function() { input.focus(); }, 100);
  }
}

function buildMessageCard(m) {
  var timeStr = '';
  if (m.created_at) {
    timeStr = formatTime(new Date(m.created_at));
  }
  var initial = m.author ? m.author.charAt(0).toUpperCase() : '?';
  return '<div class="message-card">' +
    '<div class="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">' + initial + '</div>' +
    '<div class="flex-1 min-w-0">' +
      '<div class="flex items-center gap-2">' +
        '<span class="text-sm font-bold text-white">' + escapeHtml(m.author) + '</span>' +
        '<span class="text-[10px] text-slate-600">' + timeStr + '</span>' +
      '</div>' +
      '<p class="text-sm text-slate-300 mt-1 leading-relaxed whitespace-pre-wrap">' + escapeHtml(m.content) + '</p>' +
    '</div>' +
  '</div>';
}

// ----------------------------------------------------------------
//  ACTIONS
// ----------------------------------------------------------------
function forumGoBack() {
  cleanupForum();
  forum.view = 'list';
  forum.threadId = null;
  forum.threadsLoaded = false;
  var container = $('#forumContent');
  if (container) renderForum();
}

function forumSendMessage() {
  var input = $('#messageInput');
  if (!input || !input.value.trim()) return;
  var content = input.value.trim();
  input.value = '';
  var author = localStorage.getItem('voidbit_forum_name') || 'Anonymous';

  supabaseClient.from('messages').insert({
    thread_id: forum.threadId,
    author: author,
    content: content
  }).then(function() {
    supabaseClient.from('threads').update({
      last_activity_at: new Date().toISOString(),
      reply_count: supabaseClient.rpc('increment', { x: 1 })  // placeholder, handled below
    }).eq('id', forum.threadId);
  });

  // Simpler: increment via select+update
  supabaseClient.from('threads').select('reply_count').eq('id', forum.threadId).single().then(function(res) {
    if (!res.error && res.data) {
      supabaseClient.from('threads').update({
        last_activity_at: new Date().toISOString(),
        reply_count: (res.data.reply_count || 0) + 1
      }).eq('id', forum.threadId);
    }
  });
}

// ----------------------------------------------------------------
//  NEW THREAD MODAL
// ----------------------------------------------------------------
function openNewThreadModal() {
  var old = $('#newThreadModal');
  if (old) old.remove();

  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'newThreadModal';
  overlay.innerHTML =
    '<div class="modal-panel">' +
      '<div class="flex items-center justify-between mb-5">' +
        '<h3 class="text-lg font-bold text-white">' + t('forum.createTitle') + '</h3>' +
        '<button onclick="closeNewThreadModal()" class="text-slate-500 hover:text-white transition-colors"><i data-lucide="x" class="w-5 h-5"></i></button>' +
      '</div>' +
      '<div class="space-y-4">' +
        '<div>' +
          '<label class="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">' + t('forum.yourName') + '</label>' +
          '<input type="text" id="newThreadName" placeholder="Anonymous" class="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition-colors" value="' + escapeHtml(localStorage.getItem('voidbit_forum_name') || '') + '">' +
        '</div>' +
        '<div>' +
          '<label class="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">' + t('forum.threadTitle') + '</label>' +
          '<input type="text" id="newThreadTitle" placeholder="' + t('forum.titlePlaceholder') + '" class="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition-colors">' +
        '</div>' +
        '<div>' +
          '<label class="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">' + t('forum.message') + '</label>' +
          '<textarea id="newThreadMessage" rows="4" placeholder="' + t('forum.msgPlaceholder') + '" class="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition-colors resize-none"></textarea>' +
        '</div>' +
        '<div class="flex gap-3">' +
          '<button onclick="closeNewThreadModal()" class="btn-secondary flex-1 justify-center text-sm py-2.5">' + t('forum.cancel') + '</button>' +
          '<button onclick="forumCreateThread()" class="btn-primary flex-1 justify-center text-sm py-2.5">' + t('forum.create') + '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);
  lucide.createIcons();
  var nameInput = $('#newThreadName');
  if (nameInput) nameInput.focus();
}

function closeNewThreadModal() {
  var el = $('#newThreadModal');
  if (el) el.remove();
}

function forumCreateThread() {
  var titleEl = $('#newThreadTitle');
  var msgEl = $('#newThreadMessage');
  var nameEl = $('#newThreadName');
  if (!titleEl || !msgEl) return;
  var title = titleEl.value.trim();
  var content = msgEl.value.trim();
  var author = nameEl ? nameEl.value.trim() || 'Anonymous' : 'Anonymous';
  if (!title || !content) return;
  localStorage.setItem('voidbit_forum_name', author);
  closeNewThreadModal();

  supabaseClient.from('threads').insert({
    title: title,
    author: author,
    reply_count: 0
  }).select().single().then(function(res) {
    if (res.error || !res.data) return;
    supabaseClient.from('messages').insert({
      thread_id: res.data.id,
      author: author,
      content: content
    }).then(function() {
      supabaseClient.from('threads').update({
        reply_count: 1
      }).eq('id', res.data.id);
    });
  });
}

// ----------------------------------------------------------------
//  HELPERS
// ----------------------------------------------------------------
function cleanupForum() {
  for (var i = 0; i < forum.channels.length; i++) {
    supabaseClient.removeChannel(forum.channels[i]);
  }
  forum.channels = [];
}

function formatTime(date) {
  var now = new Date();
  var diff = Math.floor((now - date) / 1000);
  if (diff < 60) return t('forum.justNow');
  if (diff < 3600) {
    var m = Math.floor(diff / 60);
    return currentLang === 'vi' ? m + ' phút trước' : m + 'm ago';
  }
  if (diff < 86400) {
    var h = Math.floor(diff / 3600);
    return currentLang === 'vi' ? h + ' giờ trước' : h + 'h ago';
  }
  if (diff < 604800) {
    var d = Math.floor(diff / 86400);
    return currentLang === 'vi' ? d + ' ngày trước' : d + 'd ago';
  }
  return date.toLocaleDateString();
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  var d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}
