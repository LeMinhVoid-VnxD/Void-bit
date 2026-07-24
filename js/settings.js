/* ================================================================
   VOID-BIT — Cyber Settings Engine & Customization Manager
   Persistence via localStorage ('voidbit_settings')
   ================================================================ */

(function () {
  'use strict';

  var DEFAULT_SETTINGS = {
    matrixRain: true,
    tilt3D: true,
    constellation3D: true,
    hideGraphInTHCS: true,
    cyberAudio: false
  };

  var settings = Object.assign({}, DEFAULT_SETTINGS);

  function loadSettings() {
    try {
      var saved = localStorage.getItem('voidbit_settings');
      if (saved) {
        settings = Object.assign({}, DEFAULT_SETTINGS, JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load settings from localStorage', e);
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem('voidbit_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings', e);
    }
    applySettings();
  }

  function applySettings() {
    // 1. Matrix Rain & Constellation opacity
    var canvas = document.getElementById('cyberCanvas');
    if (canvas) {
      canvas.style.display = (settings.constellation3D || settings.matrixRain) ? 'block' : 'none';
    }

    // Update Hacker Button
    var hackerBtn = document.getElementById('hackerModeBtn');
    if (hackerBtn) {
      if (settings.matrixRain) {
        hackerBtn.classList.add('border-emerald-400', 'text-emerald-400', 'shadow-emerald-500/50');
        hackerBtn.classList.remove('border-slate-800', 'text-slate-400');
        hackerBtn.innerHTML = '<i data-lucide="terminal" class="w-4 h-4 text-emerald-400"></i> MATRIX: ON';
      } else {
        hackerBtn.classList.remove('border-emerald-400', 'text-emerald-400', 'shadow-emerald-500/50');
        hackerBtn.classList.add('border-slate-800', 'text-slate-400');
        hackerBtn.innerHTML = '<i data-lucide="terminal" class="w-4 h-4"></i> MATRIX: OFF';
      }
      if (window.lucide) window.lucide.createIcons();
    }

    // 2. 3D Card Tilt
    window.voidbitTiltEnabled = settings.tilt3D;

    // 3. Re-render Roadmap if needed
    if (typeof renderRoadmapContent === 'function') {
      renderRoadmapContent();
    }
  }

  // Settings Modal Controls
  window.openSettingsModal = function () {
    var modal = document.getElementById('settingsModal');
    if (!modal) return;
    loadSettings();
    updateModalToggles();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  };

  window.closeSettingsModal = function () {
    var modal = document.getElementById('settingsModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  };

  function updateModalToggles() {
    var toggles = {
      'toggleMatrixRain': settings.matrixRain,
      'toggleTilt3D': settings.tilt3D,
      'toggleConstellation': settings.constellation3D,
      'toggleHideGraphTHCS': settings.hideGraphInTHCS,
      'toggleCyberAudio': settings.cyberAudio
    };

    Object.keys(toggles).forEach(function (id) {
      var input = document.getElementById(id);
      if (input) {
        input.checked = toggles[id];
      }
    });
  }

  window.updateSetting = function (key, value) {
    settings[key] = value;
    if (key === 'matrixRain' && typeof window.toggleHackerMatrix === 'function') {
      // Keep matrix engine in sync
    }
    saveSettings();
  };

  window.getVoidbitSetting = function (key) {
    return settings[key];
  };

  // Auto Init
  document.addEventListener('DOMContentLoaded', function () {
    loadSettings();
    applySettings();
  });

  window.voidbitSettings = settings;
})();
