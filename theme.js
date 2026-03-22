/* ═══════════════════════════════════════════════════════════════
   THE PRICE OF BLOOD — Theme Toggle
   Persists preference in localStorage, injects UI
═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var KEY = 'pob-theme';
  var root = document.documentElement;

  // Apply saved theme immediately (before paint) to avoid flash
  var saved = localStorage.getItem(KEY) || 'dark';
  root.setAttribute('data-theme', saved);

  function icon(theme) {
    return theme === 'dark' ? '◑' : '◐';
  }

  function createToggle() {
    var btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle light / dark mode');
    btn.setAttribute('title', saved === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.textContent = icon(saved);

    btn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem(KEY, next);
      btn.textContent = icon(next);
      btn.setAttribute('title', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

      // Re-draw canvases if they expose a global redraw hook
      if (typeof window.redrawCharts === 'function') {
        window.redrawCharts();
      }
    });

    document.body.appendChild(btn);
  }

  function createBackNav() {
    // Only add back nav on non-index pages
    if (window.location.pathname.endsWith('index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('/')) {
      return;
    }
    var a = document.createElement('a');
    a.id = 'back-nav';
    a.href = 'index.html';
    a.textContent = 'The Filing Cabinet';

    // Insert as first child of body
    var body = document.body;
    body.insertBefore(a, body.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      createToggle();
      createBackNav();
    });
  } else {
    createToggle();
    createBackNav();
  }
})();
