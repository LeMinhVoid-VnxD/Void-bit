var OJ_SUPABASE_URL = 'https://amcuddpczwixylrlhxru.supabase.co';
var OJ_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtY3VkZHBjendpeHlscmxoeHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2OTk0NjksImV4cCI6MjEwMDI3NTQ2OX0.ruTbGNW8h6rJh21Lcl1LUFZVHR6SzuuKLoRxW91Duyk';
var ojdb = supabase.createClient(OJ_SUPABASE_URL, OJ_SUPABASE_ANON_KEY);

function ojUser() {
  var token = localStorage.getItem('voidbit_session');
  if (!token) return null;
  return {
    username: localStorage.getItem('voidbit_username') || '',
    displayName: localStorage.getItem('voidbit_forum_name') || 'Anonymous',
    avatar: localStorage.getItem('voidbit_forum_avatar') || ''
  };
}

function ojRequireAuth() {
  var u = ojUser();
  if (!u) {
    var gate = document.createElement('div');
    gate.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(11,17,32,0.97);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px';
    gate.innerHTML = '<div style="font-size:2rem;font-weight:800;background:linear-gradient(135deg,#00f0ff,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Void-bit</div><p style="color:#64748b;font-size:0.875rem">Vui lòng đăng nhập để sử dụng tính năng này</p><a href="index.html" style="padding:10px 24px;border-radius:8px;background:linear-gradient(135deg,#00f0ff,#3b82f6);color:#fff;font-size:0.875rem;font-weight:600;text-decoration:none">Đăng nhập</a>';
    document.body.appendChild(gate);
    return false;
  }
  return u;
}

function ojToast(msg, type) {
  var c = document.getElementById('toastContainer');
  if (!c) { c = document.createElement('div'); c.id = 'toastContainer'; c.style.cssText = 'position:fixed;top:80px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:8px'; document.body.appendChild(c); }
  var t = document.createElement('div');
  t.style.cssText = 'padding:12px 20px;border-radius:8px;font-size:0.875rem;font-weight:500;box-shadow:0 4px 20px rgba(0,0,0,.3);animation:fadeIn .2s;background:' + (type==='error'?'#ef4444':type==='success'?'#22c55e':'#3b82f6') + ';color:#fff';
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(function() { t.style.opacity='0'; t.style.transition='opacity .3s'; setTimeout(function() { t.remove(); }, 300); }, 3000);
}

(function(){ var s = document.createElement('style'); s.textContent = '@keyframes ojFadeIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}'; document.head.appendChild(s); })();
