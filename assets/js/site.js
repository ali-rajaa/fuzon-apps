/* Fuzon Apps: shared behaviour for every page: header scroll state, the
   menus and phone sheet, the homepage showcase tabs and reveal-on-scroll.
   Each block checks for its own elements and does nothing when they are
   absent, so every page can load this one file. Loaded with defer from
   _includes/scripts.html. */
(function () {
  'use strict';

  /* iOS Safari only applies :active while a touch listener exists, so
     without this the press feedback on buttons never shows. */
  document.addEventListener('touchstart', function () {}, { passive: true });

  var root = document.documentElement;
  var header = document.getElementById('site-header');

  /* ---- Header scroll state ----
     The hairline and shadow appear once content is under the header,
     tracked by a 1px sentinel at the top of the page (no scroll listener). */
  var sentinel = document.getElementById('scroll-sentinel');
  if (header && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* ---- Navigation (playbook 9.1 and Appendix F) ----
     setSheet: the phone sheet behind the menu button.
     setSub: one menu (Apps, Support). On desktop a flyout with the page
     dimmed behind it; in the phone sheet it folds open.
     Desktop flyouts open on click, or on hover after a 140ms intent
     delay, and close when the pointer leaves the header, on Escape (focus
     returns to the trigger), on a click outside, when focus leaves the
     menu, or when a link inside is followed. Crossing the breakpoint
     resets both. */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  if (header && nav) {
    var desktop = window.matchMedia('(min-width: 760px)');
    var triggers = Array.prototype.slice.call(header.querySelectorAll('.nav-trigger'));
    var openSub = null;
    var openedAt = 0;
    var hoverTimer = null;

    var setSub = function (trigger, open, returnFocus) {
      if (open && openSub && openSub !== trigger) setSub(openSub, false);
      trigger.setAttribute('aria-expanded', String(open));
      if (open) { openSub = trigger; openedAt = Date.now(); }
      else if (openSub === trigger) openSub = null;
      var flyout = !!openSub && desktop.matches;
      header.classList.toggle('menu-open', flyout);
      root.classList.toggle('nav-flyout-open', flyout);
      if (!open && returnFocus) trigger.focus();
    };
    var closeSubs = function () { if (openSub) setSub(openSub, false); };

    triggers.forEach(function (t) {
      t.addEventListener('click', function () {
        var isOpenNow = t.getAttribute('aria-expanded') === 'true';
        // A click right after hover opened this menu confirms it rather
        // than closing it again.
        if (isOpenNow && desktop.matches && Date.now() - openedAt < 400) return;
        setSub(t, !isOpenNow);
      });
      t.parentElement.addEventListener('pointerenter', function (e) {
        if (e.pointerType !== 'mouse' || !desktop.matches) return;
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(function () { setSub(t, true); }, openSub ? 0 : 140);
      });
    });

    // Hovering a plain link in the bar (About) closes any open menu.
    Array.prototype.forEach.call(header.querySelectorAll('.nav-link--page'), function (a) {
      a.parentElement.addEventListener('pointerenter', function (e) {
        if (e.pointerType !== 'mouse' || !desktop.matches) return;
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(closeSubs, 120);
      });
    });

    header.addEventListener('pointerenter', function (e) {
      if (e.pointerType === 'mouse') clearTimeout(hoverTimer);
    });
    header.addEventListener('pointerleave', function (e) {
      if (e.pointerType !== 'mouse' || !desktop.matches) return;
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(closeSubs, 220);
    });

    var scrim = document.getElementById('nav-scrim');
    if (scrim) scrim.addEventListener('click', closeSubs);

    var sheetOpen = function () { return header.classList.contains('nav-open'); };
    var setSheet = function (open, returnFocus) {
      if (!toggle) return;
      header.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (!open) closeSubs();
      if (!open && returnFocus) toggle.focus();
    };
    if (toggle) toggle.addEventListener('click', function () { setSheet(!sheetOpen()); });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { closeSubs(); setSheet(false); }
    });

    document.addEventListener('click', function (e) {
      if (header.contains(e.target)) return;
      if (openSub && desktop.matches) closeSubs();
      if (sheetOpen()) setSheet(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (openSub && (desktop.matches || !sheetOpen())) { setSub(openSub, false, true); return; }
      if (sheetOpen()) setSheet(false, true);
    });

    header.addEventListener('focusout', function (e) {
      var to = e.relatedTarget;
      if (!to) return;
      if (!header.contains(to)) { closeSubs(); if (sheetOpen()) setSheet(false); return; }
      if (openSub && desktop.matches && !openSub.parentElement.contains(to)) closeSubs();
    });

    var onBreakpoint = function () { closeSubs(); setSheet(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onBreakpoint);
    else if (desktop.addListener) desktop.addListener(onBreakpoint);
  }

  /* ---- Showcase tabs (homepage) ----
     The ARIA tabs pattern: one tab in the tab order at a time, arrow
     keys / Home / End move between tabs and select them. Panels other
     than the selected one carry data-hidden (hidden by CSS only when
     .js is set, so without this script all three panels show). The
     panel that appears gets .is-entering for a short fade. */
  document.querySelectorAll('[data-tabs]').forEach(function (box) {
    var tabs = Array.prototype.slice.call(box.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        if (!panel) return;
        if (on) {
          if (panel.hasAttribute('data-hidden')) {
            panel.removeAttribute('data-hidden');
            panel.classList.remove('is-entering');
            void panel.offsetWidth;
            panel.classList.add('is-entering');
          }
        } else {
          panel.setAttribute('data-hidden', '');
        }
      });
      if (focus) tab.focus();
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') next = tabs[0];
        else if (e.key === 'End') next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); select(next, true); }
      });
    });
    box.addEventListener('animationend', function (e) {
      if (e.target.classList) e.target.classList.remove('is-entering');
    });
  });

  /* ---- Reveal on scroll ----
     .reveal-ready (which hides .reveal content) is added only after the
     observer that shows it again exists. If anything here fails, the
     content stays visible. */
  try {
    var reveals = document.querySelectorAll('.reveal');
    if (reveals.length && 'IntersectionObserver' in window) {
      var revealer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
      reveals.forEach(function (el) { revealer.observe(el); });
      root.classList.add('reveal-ready');
    }
  } catch (err) {
    root.classList.remove('reveal-ready');
  }
})();
