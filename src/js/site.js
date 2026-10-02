(function () {
  var header = document.querySelector('.site-header');
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  }
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  document.querySelectorAll('[data-print]').forEach(function (b) {
    b.addEventListener('click', function () { window.print(); });
  });
})();

// Basic consent mode: no Google script or requests until analytics is allowed.
(function () {
  var id = 'G-Z1V76FJWPK';
  var key = 'ace-t-analytics-choice';
  var panel = document.querySelector('.analytics-choice');
  if (!panel) return;
  var loaded = false;
  var choice = null;
  try { choice = localStorage.getItem(key); } catch (e) {}
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window['ga-disable-' + id] = true;
  window.gtag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied'
  });
  function cleanUrl(value) {
    try { var u = new URL(value); return u.origin + u.pathname; } catch (e) { return ''; }
  }
  function removeCookies() {
    document.cookie.split(';').forEach(function (cookie) {
      var name = cookie.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) return;
      ['', location.hostname, '.' + location.hostname].forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax' + (domain ? '; domain=' + domain : '');
      });
    });
  }
  function apply(value) {
    var allowed = value === 'granted';
    window['ga-disable-' + id] = !allowed;
    window.gtag('consent', 'update', {
      analytics_storage: allowed ? 'granted' : 'denied',
      ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
    });
    if (!allowed) { removeCookies(); return; }
    if (loaded || location.hostname !== 'theace-t.com') return;
    loaded = true;
    window.gtag('js', new Date());
    window.gtag('config', id, {
      allow_google_signals: false, allow_ad_personalization_signals: false,
      page_location: cleanUrl(location.href), page_referrer: cleanUrl(document.referrer)
    });
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(tag);
  }
  panel.querySelectorAll('[data-analytics]').forEach(function (button) {
    button.addEventListener('click', function () {
      choice = button.dataset.analytics;
      try { localStorage.setItem(key, choice); } catch (e) {}
      apply(choice);
      panel.hidden = true;
      var preferences = document.querySelector('.analytics-preferences');
      if (preferences) preferences.focus();
    });
  });
  document.querySelectorAll('.analytics-preferences').forEach(function (button) {
    button.addEventListener('click', function () {
      panel.hidden = false;
      panel.querySelector('[data-analytics="denied"]').focus();
    });
  });
  if (choice === 'granted' || choice === 'denied') apply(choice);
  else panel.hidden = false;
})();
