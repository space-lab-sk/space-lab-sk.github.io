/* ============================================================
   SPACE::LAB — site behaviours
   Nav scroll state · mobile menu · starfield · lang toggle
   ============================================================ */
(function () {
  'use strict';

  /* ---- Nav: solid on scroll ---- */
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var burger = document.querySelector('.hamburger');
  var menu = document.querySelector('.mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Language toggle (visual only) ---- */
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.lang button').forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
    });
  });

  /* ---- Starfield (hero only, subtle, slow drift) ---- */
  var canvas = document.getElementById('starfield');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ctx = canvas.getContext('2d');
    var stars = [];
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var w, h;

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * DPR; canvas.height = h * DPR;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      build();
    }
    function build() {
      stars = [];
      var count = Math.min(90, Math.round(w * h / 16000));
      for (var i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.3 + 0.3,
          a: Math.random() * 0.5 + 0.25,
          tw: Math.random() * 0.02 + 0.004,
          ph: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.04,
          vy: (Math.random() - 0.5) * 0.04
        });
      }
    }
    var t = 0;
    function frame() {
      ctx.clearRect(0, 0, w, h);
      t += 1;
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = w; if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h; if (s.y > h) s.y = 0;
        var alpha = s.a + Math.sin(t * s.tw + s.ph) * 0.18;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + Math.max(0.05, alpha) + ')';
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(frame);
  }

  /* ---- Scroll-spy: highlights the link whose section is in view ----
     Used by the main nav on the home page and by the .subnav on sub-pages. */
  var sections = document.querySelectorAll('section[id]');

  function spy(linkSel, margin) {
    var links = document.querySelectorAll(linkSel);
    if (!sections.length || !links.length || !('IntersectionObserver' in window)) return;
    var byId = {};
    links.forEach(function (l) { byId[l.getAttribute('data-anchor')] = l; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && byId[e.target.id]) {
          links.forEach(function (l) { l.classList.remove('active'); });
          byId[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: margin });
    sections.forEach(function (s) { io.observe(s); });
  }

  spy('.nav-links a[data-anchor]', '-45% 0px -50% 0px');
  spy('.subnav a[data-anchor]', '-40% 0px -55% 0px');
})();
