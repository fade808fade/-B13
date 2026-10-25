/* ===== B13 — script.js ===== */
(function () {
  'use strict';

  var BURGER = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  var CLOSE = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  /* Мобильное меню */
  var header = document.getElementById('site-header');
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      if (header) header.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      burger.innerHTML = open ? CLOSE : BURGER;
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        if (header) header.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.innerHTML = BURGER;
      });
    });
  }

  /* Шапка при прокрутке */
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 30);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Заглушки для фото, которые не загрузились */
  document.querySelectorAll('img').forEach(function (img) {
    function hide() { img.classList.add('broken'); }
    img.addEventListener('error', hide);
    if (img.complete && img.naturalWidth === 0 && img.loading !== 'lazy') hide();
  });

  /* Прайс-доска: раскрытие услуг */
  document.querySelectorAll('.svc').forEach(function (svc) {
    var btn = svc.querySelector('.svc-head');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var open = svc.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* Переход по ссылке-якорю из меню: раскрыть первую услугу не нужно, просто прокрутка. */

  /* Лайтбокс галереи */
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    document.querySelectorAll('.zoomable').forEach(function (el) {
      el.addEventListener('click', function () {
        var img = el.querySelector('img');
        if (!img || img.classList.contains('broken')) return;
        lbImg.src = img.getAttribute('src');
        lbImg.alt = img.alt;
        lb.classList.add('open');
      });
    });
    lb.addEventListener('click', function () { lb.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('open'); });
  }

  /* Переключение карт */
  var frame = document.getElementById('map-frame');
  var link = document.getElementById('map-link');
  var tabs = document.querySelectorAll('[data-map]');
  tabs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (frame) frame.src = btn.getAttribute('data-map');
      if (link) link.href = btn.getAttribute('data-link');
      tabs.forEach(function (b) { b.classList.add('btn-line'); });
      btn.classList.remove('btn-line');
    });
  });

  /* Форма обратной связи (без бэкенда) */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var name = form.elements['name'].value.trim();
      alert('Спасибо' + (name ? ', ' + name : '') + '! Сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
      form.reset();
    });
  }

  /* Год в подвале */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
