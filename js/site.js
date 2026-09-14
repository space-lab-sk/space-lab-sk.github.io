/* SPACE::LAB — site behaviour. Vanilla, no dependencies, no build step. */
(function () {
  'use strict';
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Nav: translucent bar once scrolled ---------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 10); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  var burger = document.querySelector('.hamburger');
  var menu = document.querySelector('.mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Sub-nav: smooth scroll + scroll-spy ---------- */
  var subnav = document.querySelector('.subnav');
  if (subnav) {
    var links = [].slice.call(subnav.querySelectorAll('a[href^="#"]'));
    var offset = 132; /* 72px nav + 52px subnav + breathing room */
    links.forEach(function (a) {
      a.addEventListener('click', function (e) {
        var el = document.getElementById(a.getAttribute('href').slice(1));
        if (!el) return;
        e.preventDefault();
        var top = window.scrollY + el.getBoundingClientRect().top - offset + 8;
        window.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
        history.replaceState(null, '', a.getAttribute('href'));
      });
    });
    var spy = function () {
      var current = 0;
      links.forEach(function (a, i) {
        var el = document.getElementById(a.getAttribute('href').slice(1));
        if (el && el.getBoundingClientRect().top <= offset) current = i;
      });
      links.forEach(function (a, i) { a.classList.toggle('active', i === current); });
    };
    spy();
    window.addEventListener('scroll', spy, { passive: true });
    window.addEventListener('resize', spy);
  }

  /* ---------- Filter chips ---------- */
  /* Buttons carry data-filter="<value>"; targets carry data-group="<value>". */
  [].forEach.call(document.querySelectorAll('[data-filters]'), function (bar) {
    var scope = document.getElementById(bar.getAttribute('data-filters'));
    if (!scope) return;
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (!btn) return;
      var value = btn.getAttribute('data-filter');
      [].forEach.call(bar.querySelectorAll('[data-filter]'), function (b) {
        b.classList.toggle('on', b === btn);
      });
      [].forEach.call(scope.querySelectorAll('[data-group]'), function (g) {
        g.hidden = !(value === 'all' || g.getAttribute('data-group') === value);
      });
    });
  });

  /* ---------- Show-all lists ---------- */
  [].forEach.call(document.querySelectorAll('[data-showall]'), function (btn) {
    btn.addEventListener('click', function () {
      var scope = document.getElementById(btn.getAttribute('data-showall'));
      if (!scope) return;
      [].forEach.call(scope.querySelectorAll('[hidden]'), function (el) { el.hidden = false; });
      btn.remove();
    });
  });

  /* ---------- Hero starfield ----------
     Dim and slow: star drift stays under ~5 px/s and peak opacity under 0.55.
     Stars breathe on a long random phase; three satellite points cross at
     14-22 px/s — slow enough to read as orbital motion, not as traffic. */
  var canvas = document.querySelector('.hero__starfield');
  if (canvas && canvas.getContext && !reduced) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, stars = [], last = 0, clock = 0;
    var seed = function () {
      var count = Math.round(Math.min(110, Math.max(50, w / 16)));
      stars = [];
      for (var i = 0; i < count; i++) {
        var roll = Math.random();
        stars.push({
          x: Math.random() * w, y: Math.random() * h,
          r: roll < 0.18 ? 1.6 : roll < 0.5 ? 1.1 : 0.8,
          o: 0.14 + Math.random() * 0.4,
          vx: (0.3 + Math.random() * 0.85) * (Math.random() < 0.5 ? -1 : 1),
          vy: (Math.random() - 0.5) * 0.35,
          ph: Math.random() * Math.PI * 2,
          tw: 0.5 + Math.random() * 0.7
        });
      }
    };
    var resize = function () {
      var r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    var frame = function (t) {
      var dt = last ? Math.min((t - last) / 1000, 0.05) : 0;
      last = t; clock += dt;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#fff';
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.x += s.vx * dt * 4; s.y += s.vy * dt * 4;
        if (s.x < -2) s.x = w + 2; else if (s.x > w + 2) s.x = -2;
        if (s.y < -2) s.y = h + 2; else if (s.y > h + 2) s.y = -2;
        ctx.globalAlpha = s.o * (0.72 + 0.28 * Math.sin(clock * s.tw + s.ph));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    };
    resize();
    requestAnimationFrame(frame);
    window.addEventListener('resize', resize);
  }
})();
