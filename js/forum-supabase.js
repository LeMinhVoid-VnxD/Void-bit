// ================================================================
//  VOID-BIT — Forum Threads + Private Chat (Supabase)
//  Thread list + real-time messages + DM with Supabase Realtime.
// ================================================================

var forum = {
  view: 'thread-list',
  threadId: null,
  threadTitle: '',
  dmUser: null,
  channels: [],
  threadsLoaded: false,
  presenceChannel: null,
  onlineUsers: {},
  myName: 'Anonymous',
  myAvatar: '',
  loggedIn: false,
  unsubDm: null
};

// ----------------------------------------------------------------
//  ENTRY
// ----------------------------------------------------------------
function renderForum() {
  var container = $('#forumContent');
  if (!container) return;
  cleanupForum();
  checkSession();
  forum.myName = localStorage.getItem('voidbit_forum_name') || 'Anonymous';
  forum.myAvatar = localStorage.getItem('voidbit_forum_avatar') || '';
  forum.view = 'thread-list';
  forum.threadId = null;
  forum.dmUser = null;
  renderForumTabs(container);
  trackPresence();
}

function checkSession() {
  forum.loggedIn = !!localStorage.getItem('voidbit_session');
  if (forum.loggedIn) {
    forum.myName = localStorage.getItem('voidbit_forum_name') || 'Anonymous';
    forum.myAvatar = localStorage.getItem('voidbit_forum_avatar') || '';
  } else {
    forum.myName = 'Anonymous';
    forum.myAvatar = '';
  }
}

function renderForumTabs(container) {
  container.innerHTML =
    '<div class="mb-8 text-center">' +
      '<span class="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">' + t('forum.badge') + '</span>' +
      '<h2 class="text-3xl sm:text-4xl font-extrabold text-white">' + t('forum.title') + '</h2>' +
      '<p class="text-slate-400 mt-3 max-w-xl mx-auto">' + t('forum.subtitle') + '</p>' +
    '</div>' +
    '<div class="flex gap-2 mb-6 justify-center">' +
      '<button id="tabThreads" class="tab-btn active" onclick="switchForumTab(\'threads\')">' +
        '<i data-lucide="message-square" class="w-4 h-4 inline-block mr-1.5"></i>' + t('forum.tabThreads') +
      '</button>' +
      '<button id="tabChat" class="tab-btn" onclick="switchForumTab(\'chat\')">' +
        '<i data-lucide="message-circle" class="w-4 h-4 inline-block mr-1.5"></i>' + t('forum.tabChat') +
      '</button>' +
    '</div>' +
    '<div id="forumBody"></div>';
  lucide.createIcons();
  switchForumTab('threads');
}

function switchForumTab(tab) {
  var tb = $('#tabThreads');
  var cb = $('#tabChat');
  var body = $('#forumBody');
  if (!body) return;
  cleanupForum();
  forum.threadsLoaded = false;
  if (tb) tb.classList.toggle('active', tab === 'threads');
  if (cb) cb.classList.toggle('active', tab === 'chat');
  if (tab === 'threads') {
    forum.view = 'thread-list';
    renderThreadHeader(body);
    renderThreadList(body);
  } else {
    forum.view = 'user-list';
    renderUserList(body);
    trackPresence();
  }
}

// ================================================================
//  THREADS
// ================================================================
function renderThreadHeader(container) {
  container.innerHTML =
    '<div class="flex items-center justify-between mb-6">' +
      '<p class="text-sm text-slate-500" id="threadCount">' + t('forum.loading') + '</p>' +
      '<div class="flex items-center gap-2">' +
        (forum.loggedIn
          ? '<span class="text-xs text-slate-500 hidden sm:inline">' + escapeHtml(forum.myName) + '</span>' +
            '<button onclick="openProfileModal()" class="btn-secondary py-2 px-2.5 text-sm" title="' + t('forum.settings') + '">' +
              getAvatarHtml(forum.myName, forum.myAvatar, 8) +
            '</button>' +
            '<button onclick="logoutUser()" class="btn-secondary py-2 px-2.5 text-sm" title="' + t('forum.logout') + '">' +
              '<i data-lucide="log-out" class="w-4 h-4"></i>' +
            '</button>'
          : '<button onclick="openAuthModal()" class="btn-primary py-2.5 px-4 text-sm">' +
              '<i data-lucide="log-in" class="w-4 h-4"></i> ' + t('forum.login') +
            '</button>'
        ) +
        '<button onclick="openNewThreadModal()" class="btn-primary py-2.5 px-4 text-sm">' +
          '<i data-lucide="plus" class="w-4 h-4"></i> ' + t('forum.newThread') +
        '</button>' +
      '</div>' +
    '</div>' +
    '<div id="threadList" class="space-y-2"></div>';
  lucide.createIcons();
}

function renderThreadList(container) {
  var listEl = $('#threadList');
  var countEl = $('#threadCount');
  if (!listEl) return;

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

  var ch = supabaseClient.channel('forum-threads');
  ch.on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'threads' },
    function(payload) {
      if (!forum.threadsLoaded || payload.new.author === forum.myName) return;
      var listEl2 = $('#threadList');
      if (!listEl2) return;
      var card = buildThreadCard(payload.new.id, payload.new);
      var emptyMsg = listEl2.querySelector('.text-center.py-16');
      if (emptyMsg) { listEl2.innerHTML = card; }
      else { listEl2.innerHTML = card + listEl2.innerHTML; }
      lucide.createIcons();
      attachThreadClicks();
      updateThreadCount();
    }
  );
  ch.on('postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'threads' },
    function(payload) {
      updateThreadReplyCount(payload.new.id, payload.new.reply_count);
    }
  );
  ch.subscribe(function(status, err) {
    if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') console.warn('Realtime forum-threads:', status, err);
  });
  forum.channels.push(ch);
}

function updateThreadCount() {
  var listEl2 = $('#threadList');
  var countEl2 = $('#threadCount');
  if (listEl2 && countEl2) {
    var cards = listEl2.querySelectorAll('.thread-card');
    countEl2.textContent = cards.length + ' ' + t('forum.threads');
  }
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

function buildThreadCard(id, thread) {
  var timeStr = thread.last_activity_at ? formatTime(new Date(thread.last_activity_at)) : '';
  var replies = (thread.reply_count || 0) + ' ' + t('forum.replies');
  return '<div class="thread-card" data-thread-id="' + id + '">' +
    '<div class="thread-card-left">' +
      '<div class="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">' +
        '<i data-lucide="message-square" class="w-4 h-4 text-cyan-400"></i>' +
      '</div>' +
      '<div class="min-w-0 flex-1">' +
        '<h4 class="text-sm font-bold text-white truncate">' + escapeHtml(thread.title) + '</h4>' +
        '<p class="text-xs text-slate-500 mt-0.5">' +
          '<span class="text-cyan-400 font-medium">' + escapeHtml(thread.author) + '</span> · ' + replies +
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
      forum.view = 'thread-detail';
      renderThreadView($('#forumBody'));
    });
  }
}

function renderThreadView(container) {
  container.innerHTML =
    '<div class="mb-4">' +
      '<button onclick="threadGoBack()" class="text-xs text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1">' +
        '<i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> ' + t('forum.back') +
      '</button>' +
      '<h3 class="text-lg font-bold text-white mt-2 truncate">' + escapeHtml(forum.threadTitle) + '</h3>' +
    '</div>' +
    '<div class="forum-messages-wrap mb-4" id="messageWrap">' +
      '<div id="messageList" class="space-y-3"></div>' +
    '</div>' +
    '<div class="forum-input-bar">' +
      '<input type="text" id="messageInput" placeholder="' + t('forum.placeholder') + '" class="flex-1 px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition-colors">' +
      '<button onclick="threadSendMessage()" class="btn-primary py-2.5 px-4 text-sm">' +
        '<i data-lucide="send" class="w-4 h-4"></i>' +
      '</button>' +
    '</div>';
  lucide.createIcons();

  var listEl = $('#messageList');
  supabaseClient.from('messages').select('*').eq('thread_id', forum.threadId).order('created_at', { ascending: true }).then(function(res) {
    if (res.error) { if (listEl) listEl.innerHTML = '<p class="text-center text-red-400 py-8">Error.</p>'; return; }
    if (res.data.length === 0) { if (listEl) listEl.innerHTML = '<div class="text-center text-slate-500 py-12"><p>' + t('forum.noMessages') + '</p></div>'; return; }
    if (listEl) {
      var html = '';
      for (var i = 0; i < res.data.length; i++) html += buildMessageCard(res.data[i]);
      listEl.innerHTML = html;
      var wrap = $('#messageWrap');
      if (wrap) wrap.scrollTop = wrap.scrollHeight;
      lucide.createIcons();
    }
  });

  var ch = supabaseClient.channel('forum-msg-' + forum.threadId);
  ch.on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'messages', filter: 'thread_id=eq.' + forum.threadId },
    function(payload) {
      if (payload.new.author === forum.myName) return;
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
  ch.subscribe(function(status, err) {
    if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') console.warn('Realtime forum-msg:', status, err);
  });
  forum.channels.push(ch);

  var input = $('#messageInput');
  if (input) {
    input.addEventListener('keydown', function(e) { if (e.key === 'Enter') threadSendMessage(); });
    setTimeout(function() { input.focus(); }, 100);
  }
  startPolling('thread', forum.threadId);
}

function startPolling(type, id) {
  stopPolling();
  forum._pollTimer = setInterval(function() {
    if (type === 'thread') pollThreadMessages(id);
    else if (type === 'dm') pollDMMessages(forum.dmUser);
  }, 100);
}

function stopPolling() {
  if (forum._pollTimer) { clearInterval(forum._pollTimer); forum._pollTimer = null; }
}

function pollThreadMessages(threadId) {
  var listEl = $('#messageList');
  if (!listEl) return;
  var lastMsg = listEl.lastElementChild;
  var lastId = lastMsg ? lastMsg.getAttribute('data-msg-id') : null;
  supabaseClient.from('messages').select('id,author,content,created_at').eq('thread_id', threadId).order('created_at', { ascending: true }).then(function(res) {
    if (res.error || !res.data || res.data.length === 0) return;
    var currentIds = {};
    var items = listEl.querySelectorAll('.message-card');
    for (var i = 0; i < items.length; i++) {
      currentIds[items[i].getAttribute('data-msg-id')] = true;
    }
    var added = false;
    for (var i = 0; i < res.data.length; i++) {
      var m = res.data[i];
      if (!currentIds[m.id]) {
        listEl.innerHTML += buildMessageCard(m);
        added = true;
      }
    }
    if (added) {
      var wrap = $('#messageWrap');
      if (wrap) wrap.scrollTop = wrap.scrollHeight;
      lucide.createIcons();
    }
  });
}

function pollDMMessages(other) {
  var listEl = $('#dmList');
  if (!listEl) return;
  supabaseClient.from('direct_messages')
    .select('*')
    .or('and(sender.eq.' + forum.myName + ',recipient.eq.' + other + '),and(sender.eq.' + other + ',recipient.eq.' + forum.myName + ')')
    .order('created_at', { ascending: true })
    .then(function(res) {
      if (res.error || !res.data || res.data.length === 0) return;
      var currentIds = {};
      var items = listEl.querySelectorAll('.message-card');
      for (var i = 0; i < items.length; i++) {
        currentIds[items[i].getAttribute('data-msg-id')] = true;
      }
      var added = false;
      for (var i = 0; i < res.data.length; i++) {
        var m = res.data[i];
        if (!currentIds[m.id]) {
          listEl.innerHTML += buildDMCard(m);
          added = true;
        }
      }
      if (added) {
        var wrap = $('#dmWrap');
        if (wrap) wrap.scrollTop = wrap.scrollHeight;
        lucide.createIcons();
      }
    });
}

function threadSendMessage() {
  if (!forum.loggedIn) { openAuthModal(); return; }
  var input = $('#messageInput');
  if (!input || !input.value.trim()) return;
  var content = input.value.trim();
  input.value = '';
  var author = forum.myName;
  // Show immediately in UI
  var listEl = $('#messageList');
  if (listEl) {
    var emptyMsg = listEl.querySelector('.text-center.py-12');
    if (emptyMsg) emptyMsg.remove();
    listEl.innerHTML += buildMessageCard({ author: author, content: content, created_at: new Date().toISOString() });
    var wrap = $('#messageWrap');
    if (wrap) wrap.scrollTop = wrap.scrollHeight;
    lucide.createIcons();
  }
  // Save to DB
  supabaseClient.from('messages').insert({ thread_id: forum.threadId, author: author, content: content }).then(function(res) {
    if (res.error) console.error('Message send error:', res.error);
  });
  // Update reply count
  supabaseClient.from('threads').select('reply_count').eq('id', forum.threadId).single().then(function(res) {
    if (!res.error && res.data) {
      var newCount = (res.data.reply_count || 0) + 1;
      supabaseClient.from('threads').update({ last_activity_at: new Date().toISOString(), reply_count: newCount }).eq('id', forum.threadId);
      // Update thread card count in the list
      updateThreadReplyCount(forum.threadId, newCount);
    }
  });
}

function updateThreadReplyCount(threadId, count) {
  var card = document.querySelector('.thread-card[data-thread-id="' + threadId + '"]');
  if (!card) return;
  var p = card.querySelector('p.text-xs.text-slate-500');
  if (p) {
    var parts = p.innerHTML.split(' · ');
    if (parts.length >= 2) parts[1] = count + ' ' + t('forum.replies');
    p.innerHTML = parts.join(' · ');
  }
}

function threadGoBack() {
  cleanupForum();
  forum.view = 'thread-list';
  forum.threadId = null;
  forum.threadsLoaded = false;
  switchForumTab('threads');
}

// ================================================================
//  PRESENCE (Realtime)
// ================================================================
function trackPresence() {
  forum.presenceChannel = supabaseClient.channel('online-users', {
    config: { presence: { key: forum.myName } }
  });
  forum.presenceChannel.on('presence', { event: 'sync' }, function() {
    var state = forum.presenceChannel.presenceState();
    forum.onlineUsers = {};
    for (var key in state) {
      if (state.hasOwnProperty(key) && key !== forum.myName) {
        forum.onlineUsers[key] = true;
      }
    }
    if (forum.view === 'user-list') {
      var listEl = $('#onlineList');
      if (listEl) renderOnlineList(listEl);
    }
  });
  forum.presenceChannel.subscribe(function(status, err) {
    if (status === 'SUBSCRIBED') {
      forum.presenceChannel.track({ online_at: new Date().toISOString() });
    } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
      console.warn('Realtime presence:', status, err);
    }
  });
}

// ================================================================
//  CHAT — User List
// ================================================================
function renderUserList(container) {
  container.innerHTML =
    '<div class="flex items-center justify-between mb-5">' +
      '<p class="text-sm text-slate-500">' + t('chat.online') + '</p>' +
    '</div>' +
    '<div id="onlineList" class="space-y-2 mb-8"></div>' +
    '<div class="mb-5">' +
      '<h4 class="text-sm font-bold text-white mb-3">' + t('chat.allUsers') + '</h4>' +
      '<div id="allUsersList" class="space-y-2"></div>' +
    '</div>' +
    '<div>' +
      '<h4 class="text-sm font-bold text-white mb-3">' + t('chat.recent') + '</h4>' +
      '<div id="recentChats" class="space-y-2"></div>' +
    '</div>';
  lucide.createIcons();
  var listEl = $('#onlineList');
  renderOnlineList(listEl);
  loadAllUsers();
  loadRecentChats();
}

function renderOnlineList(listEl) {
  var names = Object.keys(forum.onlineUsers);
  if (names.length === 0) {
    listEl.innerHTML = '<div class="text-center text-slate-500 py-8"><i data-lucide="wifi-off" class="w-8 h-8 mx-auto mb-2 opacity-30"></i><p class="text-sm">' + t('chat.noOnline') + '</p></div>';
    lucide.createIcons();
    return;
  }
  var html = '';
  for (var i = 0; i < names.length; i++) {
    html += '<div class="online-user" data-user="' + escapeHtml(names[i]) + '">' +
      '<div class="flex items-center gap-3 flex-1 min-w-0">' +
        '<div class="relative">' +
          getAvatarHtml(names[i], '', 9) +
          '<div class="online-dot"></div>' +
        '</div>' +
        '<div class="min-w-0">' +
          '<p class="text-sm font-semibold text-white truncate">' + escapeHtml(names[i]) + '</p>' +
          '<p class="text-[10px] text-emerald-400">' + t('chat.online') + '</p>' +
        '</div>' +
      '</div>' +
      '<i data-lucide="chevron-right" class="w-4 h-4 text-slate-600 shrink-0"></i>' +
    '</div>';
  }
  listEl.innerHTML = html;
  lucide.createIcons();
  attachUserClicks();
}

function attachUserClicks() {
  var users = $$('.online-user');
  for (var i = 0; i < users.length; i++) {
    users[i].addEventListener('click', function() {
      var name = this.dataset.user;
      openDM(name);
    });
  }
}

function loadRecentChats() {
  var container = $('#recentChats');
  if (!container) return;
  supabaseClient.from('direct_messages')
    .select('*')
    .or('sender.eq.' + forum.myName + ',recipient.eq.' + forum.myName)
    .order('created_at', { ascending: false })
    .limit(50)
    .then(function(res) {
      if (res.error || res.data.length === 0) {
        container.innerHTML = '<p class="text-xs text-slate-600 text-center py-4">' + t('chat.noRecent') + '</p>';
        return;
      }
      var partners = {};
      for (var i = 0; i < res.data.length; i++) {
        var other = res.data[i].sender === forum.myName ? res.data[i].recipient : res.data[i].sender;
        if (!partners[other]) partners[other] = { name: other, lastTime: res.data[i].created_at, lastMsg: res.data[i].content };
      }
      var sorted = Object.values(partners).sort(function(a, b) { return new Date(b.lastTime) - new Date(a.lastTime); });
      var html = '';
      for (var j = 0; j < Math.min(5, sorted.length); j++) {
        html += '<div class="thread-card" onclick="openDM(\'' + escapeHtml(sorted[j].name) + '\')">' +
          '<div class="thread-card-left">' +
            getAvatarHtml(sorted[j].name, '', 9) +
            '<div class="min-w-0 flex-1">' +
              '<p class="text-sm font-bold text-white truncate">' + escapeHtml(sorted[j].name) + '</p>' +
              '<p class="text-xs text-slate-500 truncate">' + escapeHtml(sorted[j].lastMsg) + '</p>' +
            '</div>' +
          '</div>' +
        '</div>';
      }
      container.innerHTML = html;
      lucide.createIcons();
    });
}

function loadAllUsers() {
  var container = $('#allUsersList');
  if (!container) return;
  supabaseClient.from('users').select('username, display_name, avatar_url').then(function(res) {
    if (res.error || !res.data) {
      container.innerHTML = '<p class="text-xs text-slate-600 text-center py-4">Error loading users.</p>';
      return;
    }
    var html = '';
    var currentUser = (localStorage.getItem('voidbit_username') || '').toLowerCase();
    for (var i = 0; i < res.data.length; i++) {
      var u = res.data[i];
      if (u.username === currentUser) continue;
      var displayName = u.display_name || u.username;
      html += '<div class="thread-card" onclick="openDM(\'' + escapeHtml(u.username) + '\')">' +
        '<div class="thread-card-left">' +
          getAvatarHtml(displayName, u.avatar_url || '', 9) +
          '<div class="min-w-0 flex-1">' +
            '<p class="text-sm font-bold text-white truncate">' + escapeHtml(displayName) + '</p>' +
            '<p class="text-[10px] text-slate-500">@' + escapeHtml(u.username) + '</p>' +
          '</div>' +
        '</div>' +
        '<i data-lucide="chevron-right" class="w-4 h-4 text-slate-600 shrink-0"></i>' +
      '</div>';
    }
    if (res.data.length <= 1) {
      container.innerHTML = '<p class="text-xs text-slate-600 text-center py-4">' + t('chat.noOtherUsers') + '</p>';
      return;
    }
    container.innerHTML = html;
    lucide.createIcons();
  });
}

// ================================================================
//  CHAT — Direct Messages
// ================================================================
function openDM(otherUser) {
  var body = $('#forumBody') || $('#chatPageContent');
  if (!body) return;
  if (forum.unsubDm) forum.unsubDm();
  forum.view = 'dm';
  forum.dmUser = otherUser;
  renderDMHeader(body, otherUser);
  loadDMMessages(body, otherUser);
  subscribeDMMessages(body, otherUser);
}

function renderDMHeader(container, other) {
  container.innerHTML =
    '<div class="mb-4">' +
      '<button onclick="dmGoBack()" class="text-xs text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1">' +
        '<i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> ' + t('chat.backToUsers') +
      '</button>' +
      '<div class="flex items-center gap-3 mt-2">' +
        '<div class="relative">' +
          getAvatarHtml(other, '', 10) +
          (forum.onlineUsers[other] ? '<div class="online-dot"></div>' : '') +
        '</div>' +
        '<div>' +
          '<h3 class="text-lg font-bold text-white">' + escapeHtml(other) + '</h3>' +
          '<p class="text-[10px] ' + (forum.onlineUsers[other] ? 'text-emerald-400' : 'text-slate-500') + '">' + (forum.onlineUsers[other] ? t('chat.online') : t('chat.offline')) + '</p>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="forum-messages-wrap mb-4" id="dmWrap">' +
      '<div id="dmList" class="space-y-3"></div>' +
    '</div>' +
    '<div class="forum-input-bar">' +
      '<input type="text" id="dmInput" placeholder="' + t('forum.placeholder') + '" class="flex-1 px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition-colors">' +
      '<button onclick="sendDM()" class="btn-primary py-2.5 px-4 text-sm">' +
        '<i data-lucide="send" class="w-4 h-4"></i>' +
      '</button>' +
    '</div>';
  lucide.createIcons();
  var input = $('#dmInput');
  if (input) {
    input.addEventListener('keydown', function(e) { if (e.key === 'Enter') sendDM(); });
    setTimeout(function() { input.focus(); }, 100);
  }
}

function loadDMMessages(container, other) {
  var listEl = $('#dmList');
  if (!listEl) return;
  supabaseClient.from('direct_messages')
    .select('*')
    .or('and(sender.eq.' + forum.myName + ',recipient.eq.' + other + '),and(sender.eq.' + other + ',recipient.eq.' + forum.myName + ')')
    .order('created_at', { ascending: true })
    .then(function(res) {
      if (res.error) { listEl.innerHTML = '<p class="text-center text-red-400 py-8">Error.</p>'; return; }
      if (res.data.length === 0) {
        listEl.innerHTML = '<div class="text-center text-slate-500 py-12"><p>' + t('chat.startDM') + '</p></div>';
        return;
      }
      var html = '';
      for (var i = 0; i < res.data.length; i++) {
        html += buildDMCard(res.data[i]);
      }
      listEl.innerHTML = html;
      var wrap = $('#dmWrap');
      if (wrap) wrap.scrollTop = wrap.scrollHeight;
      lucide.createIcons();
    });
}

function subscribeDMMessages(container, other) {
  var ch = supabaseClient.channel('dm-' + forum.myName + '-' + other);
  ch.on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'direct_messages' },
    function(payload) {
      var msg = payload.new;
      if (msg.sender === forum.myName) return;
      if ((msg.sender === other && msg.recipient === forum.myName)) {
        var listEl2 = $('#dmList');
        if (!listEl2) return;
        var emptyMsg = listEl2.querySelector('.text-center.py-12');
        if (emptyMsg) emptyMsg.remove();
        listEl2.innerHTML += buildDMCard(msg);
        var wrap2 = $('#dmWrap');
        if (wrap2) wrap2.scrollTop = wrap2.scrollHeight;
        lucide.createIcons();
      }
    }
  );
  ch.subscribe(function(status, err) {
    if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') console.warn('Realtime DM:', status, err);
  });
  forum.unsubDm = function() { supabaseClient.removeChannel(ch); };
  startPolling('dm', other);
}

function buildDMCard(m) {
  var timeStr = m.created_at ? formatTime(new Date(m.created_at)) : '';
  var isMe = m.sender === forum.myName;
  return '<div class="message-card ' + (isMe ? 'dm-mine' : '') + '" data-msg-id="' + (m.id || '') + '" ' + (isMe ? 'style="flex-direction:row-reverse"' : '') + '>' +
    getAvatarHtml(m.sender, m.sender === forum.myName ? forum.myAvatar : '', 8) +
    '<div class="flex-1 min-w-0">' +
      '<div class="flex items-center gap-2">' +
        '<span class="text-sm font-bold text-white">' + escapeHtml(m.sender) + '</span>' +
        '<span class="text-[10px] text-slate-600">' + timeStr + '</span>' +
      '</div>' +
      '<p class="text-sm text-slate-300 mt-1 leading-relaxed">' + escapeHtml(m.content) + '</p>' +
    '</div>' +
  '</div>';
}

function sendDM() {
  var input = $('#dmInput');
  if (!input || !input.value.trim()) return;
  var content = input.value.trim();
  input.value = '';
  // Show immediately in UI
  var listEl = $('#dmList');
  if (listEl) {
    var emptyMsg = listEl.querySelector('.text-center.py-12');
    if (emptyMsg) emptyMsg.remove();
    listEl.innerHTML += buildDMCard({ sender: forum.myName, recipient: forum.dmUser, content: content, created_at: new Date().toISOString() });
    var wrap = $('#dmWrap');
    if (wrap) wrap.scrollTop = wrap.scrollHeight;
    lucide.createIcons();
  }
  // Save to DB
  supabaseClient.from('direct_messages').insert({
    sender: forum.myName,
    recipient: forum.dmUser,
    content: content
  }).then(function(res) {
    if (res.error) console.error('DM send error:', res.error);
  });
}

function dmGoBack() {
  if (forum.unsubDm) { forum.unsubDm(); forum.unsubDm = null; }
  var container = $('#forumBody') || $('#chatPageContent');
  if (container && container.id === 'chatPageContent' && typeof renderChatPage === 'function') {
    renderChatPage();
  } else {
    renderUserList($('#forumBody'));
  }
}

// ================================================================
//  NEW THREAD MODAL
// ================================================================
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
}

function closeNewThreadModal() {
  var el = $('#newThreadModal');
  if (el) el.remove();
}

function forumCreateThread() {
  if (!forum.loggedIn) { closeNewThreadModal(); openAuthModal(); return; }
  var titleEl = $('#newThreadTitle');
  var msgEl = $('#newThreadMessage');
  if (!titleEl || !msgEl) return;
  var title = titleEl.value.trim();
  var content = msgEl.value.trim();
  var author = forum.myName;
  if (!title || !content) return;
  closeNewThreadModal();
  supabaseClient.from('threads').insert({ title: title, author: author, reply_count: 1 }).select().single().then(function(res) {
    if (res.error) { console.error('Thread insert error:', res.error); alert('Lỗi: ' + res.error.message); return; }
    if (!res.data) { console.error('No data returned'); alert('Không tạo được thread'); return; }
    supabaseClient.from('messages').insert({ thread_id: res.data.id, author: author, content: content }).then(function(res2) {
      if (res2.error) console.error('Message insert error:', res2.error);
    });
    // Add thread card immediately
    var listEl = $('#threadList');
    if (listEl) {
      var emptyMsg = listEl.querySelector('.text-center.py-16');
      if (emptyMsg) listEl.innerHTML = '';
      listEl.innerHTML = buildThreadCard(res.data.id, { title: title, author: author, reply_count: 1, last_activity_at: new Date().toISOString() }) + listEl.innerHTML;
      lucide.createIcons();
      attachThreadClicks();
    }
    var countEl = $('#threadCount');
    if (countEl) {
      var cards = listEl ? listEl.querySelectorAll('.thread-card').length : 0;
      countEl.textContent = cards + ' ' + t('forum.threads');
    }
  });
}

// ================================================================
//  AUTH — Login / Register
// ================================================================
function openAuthModal() {
  var old = $('#authModal');
  if (old) old.remove();
  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'authModal';
  overlay.innerHTML =
    '<div class="modal-panel">' +
      '<div class="flex items-center justify-between mb-5">' +
        '<h3 class="text-lg font-bold text-white" id="authTitle">' + t('forum.login') + '</h3>' +
        '<button onclick="closeAuthModal()" class="text-slate-500 hover:text-white transition-colors"><i data-lucide="x" class="w-5 h-5"></i></button>' +
      '</div>' +
      '<div class="flex gap-2 mb-5">' +
        '<button id="authTabLogin" class="tab-btn active" onclick="switchAuthTab(\'login\')">' + t('forum.login') + '</button>' +
        '<button id="authTabRegister" class="tab-btn" onclick="switchAuthTab(\'register\')">' + t('forum.register') + '</button>' +
      '</div>' +
      '<div id="authBody">' +
        '<div class="space-y-4">' +
          '<div><label class="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">' + t('forum.username') + '</label>' +
            '<input type="text" id="authUsername" maxlength="20" class="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition-colors" placeholder="' + t('forum.usernamePlace') + '"></div>' +
          '<div><label class="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">' + t('forum.password') + '</label>' +
            '<input type="password" id="authPassword" maxlength="50" class="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition-colors" placeholder="' + t('forum.passwordPlace') + '"></div>' +
          '<div id="authExtra" style="display:none">' +
            '<div><label class="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">' + t('forum.displayName') + '</label>' +
            '<input type="text" id="authDisplayName" maxlength="20" class="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition-colors" placeholder="' + t('forum.nickname') + '"></div>' +
          '</div>' +
          '<button id="authSubmitBtn" onclick="submitAuth()" class="btn-primary w-full justify-center text-sm py-2.5">' + t('forum.login') + '</button>' +
          '<p id="authError" class="text-xs text-red-400 text-center hidden"></p>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);
  forum._authMode = 'login';
  lucide.createIcons();
}

function closeAuthModal() {
  var el = $('#authModal');
  if (el) el.remove();
}

function switchAuthTab(mode) {
  forum._authMode = mode;
  var lt = $('#authTabLogin');
  var rt = $('#authTabRegister');
  var title = $('#authTitle');
  var extra = $('#authExtra');
  var btn = $('#authSubmitBtn');
  if (lt) lt.classList.toggle('active', mode === 'login');
  if (rt) rt.classList.toggle('active', mode === 'register');
  if (title) title.textContent = t(mode === 'login' ? 'forum.login' : 'forum.register');
  if (extra) extra.style.display = mode === 'register' ? '' : 'none';
  if (btn) btn.textContent = t(mode === 'login' ? 'forum.login' : 'forum.register');
}

function submitAuth() {
  var username = ($('#authUsername') || {}).value || '';
  var password = ($('#authPassword') || {}).value || '';
  var errEl = $('#authError');
  if (!username || !password) {
    if (errEl) { errEl.textContent = t('forum.authRequired'); errEl.classList.remove('hidden'); }
    return;
  }
  if (forum._authMode === 'register') {
    registerUser(username, password, errEl);
  } else {
    loginUser(username, password, errEl);
  }
}

function hashStr(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    var ch = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + ch;
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

function registerUser(username, password, errEl) {
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
    createSession(username, displayName, '');
    closeAuthModal();
    renderForum();
  });
}

function loginUser(username, password, errEl) {
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
    createSession(username, res.data.display_name || username, res.data.avatar_url || '');
    closeAuthModal();
    renderForum();
  });
}

function createSession(username, displayName, avatarUrl) {
  var token = hashStr(username + ':' + Date.now());
  localStorage.setItem('voidbit_session', token);
  localStorage.setItem('voidbit_username', username.toLowerCase());
  localStorage.setItem('voidbit_forum_name', displayName);
  localStorage.setItem('voidbit_forum_avatar', avatarUrl);
  forum.loggedIn = true;
  forum.myName = displayName;
  forum.myAvatar = avatarUrl;
}

function logoutUser() {
  localStorage.removeItem('voidbit_session');
  localStorage.removeItem('voidbit_username');
  localStorage.removeItem('voidbit_forum_name');
  localStorage.removeItem('voidbit_forum_avatar');
  if (forum.presenceChannel) {
    supabaseClient.removeChannel(forum.presenceChannel);
    forum.presenceChannel = null;
  }
  location.reload();
}

// ================================================================
//  PROFILE — Nickname + Avatar URL
// ================================================================
function getAvatarHtml(name, url, size) {
  size = size || 9;
  var cls = 'w-' + size + ' h-' + size + ' rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0';
  if (url) {
    return '<img src="' + escapeHtml(url) + '" alt="A" class="' + cls + ' object-cover" onerror="this.style.display=\'none\';this.nextSibling.style.display=\'flex\'" loading="lazy"><div class="' + cls + ' bg-gradient-to-br from-cyan-400 to-blue-600" style="display:none">' + name.charAt(0).toUpperCase() + '</div>';
  }
  return '<div class="' + cls + ' bg-gradient-to-br from-cyan-400 to-blue-600">' + name.charAt(0).toUpperCase() + '</div>';
}

function openProfileModal() {
  var old = $('#profileModal');
  if (old) old.remove();
  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'profileModal';
  overlay.innerHTML =
    '<div class="modal-panel">' +
      '<div class="flex items-center justify-between mb-5">' +
        '<h3 class="text-lg font-bold text-white">' + t('forum.profile') + '</h3>' +
        '<button onclick="closeProfileModal()" class="text-slate-500 hover:text-white transition-colors"><i data-lucide="x" class="w-5 h-5"></i></button>' +
      '</div>' +
      '<div class="space-y-4">' +
        '<div class="flex items-center gap-4 mb-2">' +
          '<div id="profilePreview">' + getAvatarHtml(forum.myName, forum.myAvatar, 12) + '</div>' +
          '<div>' +
            '<p class="text-sm font-bold text-white">' + escapeHtml(forum.myName) + '</p>' +
            '<p class="text-xs text-slate-500">' + t('forum.profileDesc') + '</p>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<label class="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">' + t('forum.nickname') + '</label>' +
          '<input type="text" id="profileName" maxlength="20" class="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition-colors" value="' + escapeHtml(forum.myName) + '">' +
        '</div>' +
        '<div>' +
          '<label class="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">' + t('forum.avatarUrl') + '</label>' +
          '<input type="text" id="profileAvatar" placeholder="https://example.com/avatar.jpg" class="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition-colors" value="' + escapeHtml(forum.myAvatar) + '">' +
        '</div>' +
        '<div class="flex gap-3">' +
          '<button onclick="closeProfileModal()" class="btn-secondary flex-1 justify-center text-sm py-2.5">' + t('forum.cancel') + '</button>' +
          '<button onclick="saveProfile()" class="btn-primary flex-1 justify-center text-sm py-2.5">' + t('forum.save') + '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);
  lucide.createIcons();
  var nameInput = $('#profileName');
  var avatarInput = $('#profileAvatar');
  if (nameInput) nameInput.addEventListener('input', updateProfilePreview);
  if (avatarInput) avatarInput.addEventListener('input', updateProfilePreview);
}

function closeProfileModal() {
  var el = $('#profileModal');
  if (el) el.remove();
}

function updateProfilePreview() {
  var name = ($('#profileName') || {}).value || forum.myName;
  var url = ($('#profileAvatar') || {}).value || '';
  var preview = $('#profilePreview');
  if (preview) preview.innerHTML = getAvatarHtml(name, url, 12);
  lucide.createIcons();
}

function saveProfile() {
  var name = ($('#profileName') || {}).value || 'Anonymous';
  var url = ($('#profileAvatar') || {}).value || '';
  localStorage.setItem('voidbit_forum_name', name.trim());
  localStorage.setItem('voidbit_forum_avatar', url.trim());
  forum.myName = name.trim();
  forum.myAvatar = url.trim();
  if (forum.loggedIn) {
    var uname = localStorage.getItem('voidbit_username');
    if (uname) {
      supabaseClient.from('users').update({ display_name: name.trim(), avatar_url: url.trim() }).eq('username', uname);
    }
  }
  closeProfileModal();
  // Re-render nav and update thread cards
  if (typeof renderNavProfile === 'function') renderNavProfile();
  var container = $('#forumContent') || $('#chatPageContent');
  if (container && container.id === 'chatPageContent') {
    if (typeof renderChatPage === 'function') renderChatPage();
  }
}

// ================================================================
//  HELPERS
// ================================================================
function cleanupForum() {
  stopPolling();
  for (var i = 0; i < forum.channels.length; i++) {
    supabaseClient.removeChannel(forum.channels[i]);
  }
  forum.channels = [];
  if (forum.presenceChannel) { supabaseClient.removeChannel(forum.presenceChannel); forum.presenceChannel = null; }
  if (forum.unsubDm) { forum.unsubDm(); forum.unsubDm = null; }
}

function buildMessageCard(m) {
  var timeStr = m.created_at ? formatTime(new Date(m.created_at)) : '';
  return '<div class="message-card" data-msg-id="' + (m.id || '') + '">' +
    getAvatarHtml(m.author, m.author === forum.myName ? forum.myAvatar : '', 8) +
    '<div class="flex-1 min-w-0">' +
      '<div class="flex items-center gap-2">' +
        '<span class="text-sm font-bold text-white">' + escapeHtml(m.author) + '</span>' +
        '<span class="text-[10px] text-slate-600">' + timeStr + '</span>' +
      '</div>' +
      '<p class="text-sm text-slate-300 mt-1 leading-relaxed">' + escapeHtml(m.content) + '</p>' +
    '</div>' +
  '</div>';
}

function formatTime(date) {
  var now = new Date();
  var diff = Math.floor((now - date) / 1000);
  if (diff < 60) return t('forum.justNow');
  if (diff < 3600) { var m = Math.floor(diff / 60); return currentLang === 'vi' ? m + ' phút trước' : m + 'm ago'; }
  if (diff < 86400) { var h = Math.floor(diff / 3600); return currentLang === 'vi' ? h + ' giờ trước' : h + 'h ago'; }
  if (diff < 604800) { var d = Math.floor(diff / 86400); return currentLang === 'vi' ? d + ' ngày trước' : d + 'd ago'; }
  return date.toLocaleDateString();
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  var d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}
