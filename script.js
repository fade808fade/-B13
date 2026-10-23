/* ===== Б13 Barbershop — script.js ===== */
(function () {
  'use strict';

  /* Мобильное меню */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); });
    });
  }

  /* Шапка при прокрутке */
  var header = document.getElementById('site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 30);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Появление при скролле */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Заглушки для картинок, которые не загрузились */
  document.querySelectorAll('img').forEach(function (img) {
    function hide() { img.classList.add('broken'); }
    img.addEventListener('error', hide);
    // lazy-картинки, ещё не начавшие загрузку, ломаными не считаем
    if (img.complete && img.naturalWidth === 0 && img.loading !== 'lazy') hide();
  });

  /* Аккордеон услуг */
  document.querySelectorAll('.svc').forEach(function (svc) {
    var btn = svc.querySelector('.svc-head');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var open = svc.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

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
  var mapFrame = document.getElementById('map-frame');
  var mapLink = document.getElementById('map-link');
  document.querySelectorAll('[data-map]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (mapFrame) mapFrame.src = btn.getAttribute('data-map');
      if (mapLink) mapLink.href = btn.getAttribute('data-link');
      document.querySelectorAll('[data-map]').forEach(function (b) { b.classList.remove('btn'); b.classList.add('btn-outline', 'btn'); });
      btn.classList.remove('btn-outline');
    });
  });

  /* Форма обратной связи (без бэкенда) */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements['name'].value.trim();
      alert('Спасибо' + (name ? ', ' + name : '') + '! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
      form.reset();
    });
  }

  /* Год в подвале */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
