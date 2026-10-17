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
     The hairline and the soft scroll-edge fade appear once content is
     under the header, tracked by a 1px sentinel at the top of the page
     (no scroll listener). */
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
     panel that appears gets .is-entering and comes in from the side of
     the tab that was picked (--enter-x). The white selection is one thumb
     that slides between tabs, like a segmented control. */
  document.querySelectorAll('[data-tabs]').forEach(function (box) {
    var tabs = Array.prototype.slice.call(box.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;
    var list = tabs[0].parentElement;
    var thumb = document.createElement('span');
    thumb.className = 'showcase-thumb is-placing';
    thumb.setAttribute('aria-hidden', 'true');
    list.insertBefore(thumb, list.firstChild);
    list.classList.add('has-thumb');
    var current = tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0];
    var place = function (instant) {
      if (instant) thumb.classList.add('is-placing');
      thumb.style.width = current.offsetWidth + 'px';
      thumb.style.transform = 'translateX(' + current.offsetLeft + 'px)';
      if (instant) { void thumb.offsetWidth; thumb.classList.remove('is-placing'); }
    };
    place(true);
    window.addEventListener('resize', function () { place(true); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { place(true); });
    var select = function (tab, focus) {
      var dir = tabs.indexOf(tab) - tabs.indexOf(current);
      current = tab;
      place(false);
      tabs.forEach(function (t) {
        var on = t === tab;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        if (!panel) return;
        if (on) {
          if (panel.hasAttribute('data-hidden')) {
            panel.style.setProperty('--enter-x', (dir > 0 ? 1.5 : dir < 0 ? -1.5 : 0) + 'rem');
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

  /* ---- Legal pages and guides: contents fold, current section, tables ----
     The contents list is open in the HTML (works without JavaScript);
     on phones it starts folded and folds again after a link is tapped.
     The link for the section being read gets .is-active. Each table
     cell is labelled with its column heading so rows can stack as cards
     on phones (legal.scss); without this the table scrolls sideways. */
  var folds = document.querySelectorAll('.legal-toc-fold');
  if (folds.length) {
    var wideToc = window.matchMedia('(min-width: 900px)');
    var syncFolds = function () { folds.forEach(function (d) { d.open = wideToc.matches; }); };
    syncFolds();
    if (wideToc.addEventListener) wideToc.addEventListener('change', syncFolds);
    folds.forEach(function (d) {
      d.addEventListener('click', function (e) {
        if (wideToc.matches && e.target.closest('summary')) e.preventDefault();
        if (!wideToc.matches && e.target.closest('a')) d.open = false;
      });
    });
  }
  /* The same highlighting drives the app pages' sticky section bar
     (.page-nav-list). That bar scrolls sideways on phones, so the active
     link is scrolled into view within it when it changes. */
  var tocLinks = document.querySelectorAll('.legal-toc-list a, .page-nav-list a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var targets = [];
    var lastActive = null;
    tocLinks.forEach(function (a) {
      var el = document.getElementById(decodeURIComponent(a.hash.slice(1)));
      if (el) targets.push({ link: a, el: el });
    });
    var setActive = function () {
      var current = null;
      var line = window.innerHeight * 0.3;
      targets.forEach(function (t) { if (t.el.getBoundingClientRect().top <= line) current = t; });
      targets.forEach(function (t) {
        var on = t === current;
        t.link.classList.toggle('is-active', on);
        if (on) t.link.setAttribute('aria-current', 'true'); else t.link.removeAttribute('aria-current');
      });
      if (current && current !== lastActive) {
        lastActive = current;
        var bar = current.link.closest('.page-nav-list');
        if (bar && bar.scrollWidth > bar.clientWidth) {
          bar.scrollTo({ left: Math.max(0, current.link.offsetLeft - 16), behavior: 'smooth' });
        }
      }
    };
    var spy = new IntersectionObserver(setActive, { rootMargin: '-30% 0px -65% 0px' });
    targets.forEach(function (t) { spy.observe(t.el); });
    setActive();
  }
  document.querySelectorAll('.table-scroll table').forEach(function (table) {
    var heads = Array.prototype.map.call(table.querySelectorAll('thead th'), function (th) {
      return th.textContent.trim();
    });
    if (!heads.length) return;
    table.querySelectorAll('tbody tr').forEach(function (tr) {
      Array.prototype.forEach.call(tr.children, function (cell, i) {
        if (heads[i]) cell.setAttribute('data-label', heads[i]);
      });
    });
    table.classList.add('is-stackable');
    // Stacked, the box no longer scrolls, so it drops its tab stop and
    // "scrolls sideways" label until the screen widens again.
    var wrap = table.parentNode;
    var label = wrap.getAttribute('aria-label');
    var phone = window.matchMedia('(max-width: 599.98px)');
    var sync = function () {
      if (phone.matches) { wrap.removeAttribute('tabindex'); wrap.setAttribute('aria-label', label.replace(' (table, scrolls sideways)', ' (table)')); }
      else { wrap.setAttribute('tabindex', '0'); wrap.setAttribute('aria-label', label); }
    };
    sync();
    if (phone.addEventListener) phone.addEventListener('change', sync);
  });

  /* ---- Guides hub: topic switcher ----
     Buttons with aria-pressed filter the grid by data-topic. The choice
     goes into the address (?topic=) so a filtered view can be shared or
     linked to (topic cards, guide pages), and a white thumb slides to the
     chosen button like the homepage tabs. The status line tells screen
     readers what is showing. Without this script every guide shows. */
  document.querySelectorAll('[data-filter]').forEach(function (bar) {
    var btns = Array.prototype.slice.call(bar.querySelectorAll('[data-topic]'));
    var grid = document.querySelector('.hub-grid');
    if (!btns.length || !grid) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.guide-card'));
    var status = document.getElementById('filter-status');
    var thumb = document.createElement('span');
    thumb.className = 'seg-thumb is-placing';
    thumb.setAttribute('aria-hidden', 'true');
    bar.insertBefore(thumb, bar.firstChild);
    var current = btns[0];
    var place = function (instant) {
      if (instant) thumb.classList.add('is-placing');
      thumb.style.width = current.offsetWidth + 'px';
      thumb.style.height = current.offsetHeight + 'px';
      thumb.style.transform = 'translate(' + current.offsetLeft + 'px, ' + current.offsetTop + 'px)';
      if (instant) { void thumb.offsetWidth; thumb.classList.remove('is-placing'); }
    };
    var choose = function (btn, opts) {
      opts = opts || {};
      current = btn;
      var topic = btn.getAttribute('data-topic');
      btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      cards.forEach(function (c) {
        var show = topic === 'all' || c.getAttribute('data-topic') === topic;
        var was = !c.hidden;
        c.hidden = !show;
        c.classList.remove('is-entering');
        if (show && !opts.first) { void c.offsetWidth; c.classList.add('is-entering'); }
        if (!show && was) c.classList.remove('is-entering');
      });
      place(opts.first);
      if (status && !opts.first) status.textContent = topic === 'all' ? 'Showing every guide.' : 'Showing ' + btn.textContent.trim() + ' guides.';
      if (!opts.first && window.history && history.replaceState) {
        var url = new URL(window.location.href);
        if (topic === 'all') url.searchParams.delete('topic'); else url.searchParams.set('topic', topic);
        history.replaceState(null, '', url.pathname + url.search + url.hash);
      }
    };
    btns.forEach(function (b) { b.addEventListener('click', function () { choose(b); }); });
    grid.addEventListener('animationend', function (e) { if (e.target.classList) e.target.classList.remove('is-entering'); });
    var wanted = new URLSearchParams(window.location.search).get('topic');
    var start = btns.filter(function (b) { return b.getAttribute('data-topic') === wanted; })[0] || btns[0];
    choose(start, { first: true });
    window.addEventListener('resize', function () { place(true); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { place(true); });
  });

  /* ---- Guide pages: reading progress and share ----
     The line under the header fills as the article is read (one rAF per
     scroll, transform only). Share opens the phone's share sheet where
     there is one, otherwise copies the link; the button stays hidden
     where neither works. */
  var progress = document.querySelector('.read-progress-bar');
  var article = document.querySelector('.guide-main');
  if (progress && article) {
    var ticking = false;
    var paint = function () {
      ticking = false;
      var r = article.getBoundingClientRect();
      var total = r.height - window.innerHeight * 0.6;
      var done = Math.min(1, Math.max(0, (window.innerHeight * 0.3 - r.top) / Math.max(total, 1)));
      progress.style.transform = 'scaleX(' + done + ')';
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(paint); } }, { passive: true });
    window.addEventListener('resize', paint);
    paint();
  }
  document.querySelectorAll('[data-share]').forEach(function (btn) {
    var canShare = !!navigator.share;
    var canCopy = !!(navigator.clipboard && window.isSecureContext);
    if (!canShare && !canCopy) return;
    var label = btn.querySelector('.share-text');
    var status = document.getElementById(btn.getAttribute('aria-describedby'));
    var link = (document.querySelector('link[rel="canonical"]') || {}).href || window.location.href;
    var timer;
    if (!canShare && label) label.textContent = 'Copy link';
    btn.hidden = false;
    btn.addEventListener('click', function () {
      if (canShare) {
        navigator.share({ title: document.title, url: link }).catch(function () {});
        return;
      }
      navigator.clipboard.writeText(link).then(function () {
        if (label) label.textContent = 'Link copied';
        if (status) status.textContent = 'Link copied.';
        clearTimeout(timer);
        timer = setTimeout(function () {
          if (label) label.textContent = 'Copy link';
          if (status) status.textContent = '';
        }, 2500);
      });
    });
  });

  /* ---- Copy button (Contact page) ----
     Hidden in the markup and shown only where the clipboard can be used,
     so it never appears as a button that does nothing. The status line
     announces the result to screen readers too (playbook 9.6). */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    if (!navigator.clipboard || !window.isSecureContext) return;
    var label = btn.querySelector('.copy-text');
    var status = document.getElementById(btn.getAttribute('aria-describedby'));
    var timer;
    btn.hidden = false;
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(btn.getAttribute('data-copy')).then(function () {
        if (label) label.textContent = 'Copied';
        if (status) status.textContent = 'Email address copied.';
        clearTimeout(timer);
        timer = setTimeout(function () {
          if (label) label.textContent = 'Copy address';
          if (status) status.textContent = '';
        }, 2500);
      }, function () {
        if (status) status.textContent = 'Couldn\'t copy. Select the address above instead.';
      });
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
