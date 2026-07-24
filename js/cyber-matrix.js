/* ================================================================
   VOID-BIT — 3D Constellation, Cyber Matrix Rain & 3D Card Tilt Engine
   ================================================================ */

(function () {
  'use strict';

  // Canvas creation
  var canvas = document.createElement('canvas');
  canvas.id = 'cyberCanvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:0;opacity:0.85;transition:opacity 0.5s ease;';
  document.body.insertBefore(canvas, document.body.firstChild);

  var ctx = canvas.getContext('2d');
  var width = (canvas.width = window.innerWidth);
  var height = (canvas.height = window.innerHeight);

  // Resize handler
  window.addEventListener('resize', function () {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initMatrixColumns();
  });

  // Mouse tracking for 3D constellation interaction
  var mouse = { x: width / 2, y: height / 2, active: false };
  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });
  window.addEventListener('mouseleave', function () {
    mouse.active = false;
  });

  // ----------------------------------------------------------------
  //  1. 3D CONSTELLATION NODE NETWORK
  // ----------------------------------------------------------------
  var STARS_COUNT = 130;
  var stars = [];
  var fov = 350;

  function Star() {
    this.reset();
  }

  Star.prototype.reset = function () {
    this.x = (Math.random() - 0.5) * width * 1.5;
    this.y = (Math.random() - 0.5) * height * 1.5;
    this.z = Math.random() * fov + 50;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.vz = (Math.random() - 0.5) * 0.3;
    this.radius = Math.random() * 2 + 1;
    this.hue = Math.random() > 0.6 ? 180 : (Math.random() > 0.5 ? 280 : 160);
  };

  Star.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.z += this.vz;

    if (this.z <= 10 || this.z > fov + 200 || Math.abs(this.x) > width || Math.abs(this.y) > height) {
      this.reset();
    }
  };

  Star.prototype.getScreenPos = function () {
    var scale = fov / (fov + this.z);
    var sx = this.x * scale + width / 2;
    var sy = this.y * scale + height / 2;
    return { x: sx, y: sy, scale: scale };
  };

  for (var i = 0; i < STARS_COUNT; i++) {
    stars.push(new Star());
  }

  // ----------------------------------------------------------------
  //  2. MATRIX DIGITAL RAIN ENGINE
  // ----------------------------------------------------------------
  var matrixChars = '01VOIDBITCP10X<>{}[]*&%$#@!?+=~/-アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
  var fontSize = 14;
  var columns = Math.floor(width / fontSize);
  var drops = [];

  function initMatrixColumns() {
    columns = Math.floor(width / fontSize);
    drops = [];
    for (var c = 0; c < columns; c++) {
      drops[c] = Math.floor(Math.random() * -50);
    }
  }
  initMatrixColumns();

  var matrixRainEnabled = true;

  // ----------------------------------------------------------------
  //  3. MAIN RENDER LOOP
  // ----------------------------------------------------------------
  function render() {
    ctx.fillStyle = 'rgba(3, 6, 13, 0.22)';
    ctx.fillRect(0, 0, width, height);

    if (matrixRainEnabled) {
      ctx.font = fontSize + 'px "JetBrains Mono", monospace';
      for (var k = 0; k < drops.length; k++) {
        if (Math.random() > 0.85) continue;

        var char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        var mx = k * fontSize;
        var my = drops[k] * fontSize;

        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00f0ff';
        ctx.fillText(char, mx, my);

        ctx.fillStyle = (k % 3 === 0) ? 'rgba(0, 240, 255, 0.4)' : 'rgba(0, 255, 136, 0.3)';
        ctx.shadowBlur = 0;
        ctx.fillText(char, mx, my - fontSize);

        if (my > height && Math.random() > 0.975) {
          drops[k] = 0;
        }
        drops[k]++;
      }
    }

    var screenPositions = [];
    for (var s = 0; s < stars.length; s++) {
      var star = stars[s];
      star.update();
      var pos = star.getScreenPos();
      screenPositions.push(pos);

      var alpha = (1 - star.z / (fov + 200));
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, star.radius * pos.scale, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + star.hue + ', 100%, 75%, ' + alpha + ')';
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'hsl(' + star.hue + ', 100%, 50%)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    var maxDist = 120;
    for (var i = 0; i < screenPositions.length; i++) {
      for (var j = i + 1; j < screenPositions.length; j++) {
        var p1 = screenPositions[i];
        var p2 = screenPositions[j];
        var dx = p1.x - p2.x;
        var dy = p1.y - p2.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          var lineAlpha = (1 - dist / maxDist) * 0.25;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(0, 240, 255, ' + lineAlpha + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      if (mouse.active) {
        var p = screenPositions[i];
        var mdx = p.x - mouse.x;
        var mdy = p.y - mouse.y;
        var mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 160) {
          var mAlpha = (1 - mdist / 160) * 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = 'rgba(255, 0, 127, ' + mAlpha + ')';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  // ----------------------------------------------------------------
  //  4. AUTOMATIC 3D CARD TILT ENGINE
  // ----------------------------------------------------------------
  function init3DTiltCards() {
    var selectors = '.card, .stat-card, .bento-card, .cyber-terminal, .roadmap-3d-node';
    var cards = document.querySelectorAll(selectors);

    cards.forEach(function (card) {
      if (card.dataset.tiltInit) return;
      card.dataset.tiltInit = 'true';

      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;

        var rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
        var rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = 'perspective(1000px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateZ(10px) scale3d(1.02, 1.02, 1.02)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
      });
    });
  }

  // Bind tilt engine on load and DOM changes
  document.addEventListener('DOMContentLoaded', init3DTiltCards);
  setInterval(init3DTiltCards, 1000);

  // Global helper
  window.toggleHackerMatrix = function () {
    matrixRainEnabled = !matrixRainEnabled;
    var btn = document.getElementById('hackerModeBtn');
    if (btn) {
      if (matrixRainEnabled) {
        btn.classList.add('border-emerald-400', 'text-emerald-400', 'shadow-emerald-500/50');
        btn.classList.remove('border-slate-800', 'text-slate-400');
        btn.innerHTML = '<i data-lucide="terminal" class="w-4 h-4 text-emerald-400"></i> MATRIX: ON';
      } else {
        btn.classList.remove('border-emerald-400', 'text-emerald-400', 'shadow-emerald-500/50');
        btn.classList.add('border-slate-800', 'text-slate-400');
        btn.innerHTML = '<i data-lucide="terminal" class="w-4 h-4"></i> MATRIX: OFF';
      }
      if (window.lucide) window.lucide.createIcons();
    }
  };
})();
