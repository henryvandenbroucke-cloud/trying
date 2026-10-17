/* Vroeglicht — shared behaviour for every page: language, navigation, smooth scroll, newsletter. */
(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");

  var VL = window.VL = window.VL || {};
  VL.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  VL.finePointer = window.matchMedia("(pointer: fine)").matches;
  VL.$ = function (s, c) { return (c || document).querySelector(s); };
  VL.$$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var $ = VL.$, $$ = VL.$$;

  /* ------------------------------------------------------------ Language
     Pages are written in Dutch. The Dutch text is read from the page itself, so only English
     (and strings created by scripts) live in i18n.js. */
  var I18N = window.VL_I18N || { en: {}, dyn: { nl: {}, en: {} } };
  var original = new Map();
  var originalAttr = [];
  $$("[data-i18n]").forEach(function (el) { original.set(el, el.innerHTML); });
  $$("[data-i18n-attr]").forEach(function (el) {
    el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
      var p = pair.split(":"); if (p.length !== 2) return;
      originalAttr.push({ el: el, attr: p[0].trim(), key: p[1].trim(), nl: el.getAttribute(p[0].trim()) });
    });
  });

  var listeners = [];
  VL.onLang = function (fn) { listeners.push(fn); };
  VL.lang = "nl";
  try {
    var saved = localStorage.getItem("vroeglicht-lang");
    VL.lang = saved === "nl" || saved === "en" ? saved : (/^nl/i.test(navigator.language || "") ? "nl" : "en");
  } catch (e) { VL.lang = /^nl/i.test(navigator.language || "") ? "nl" : "en"; }

  VL.t = function (key, vars) {
    var table = I18N.dyn[VL.lang] || {};
    var s = table[key] != null ? table[key] : (I18N.dyn.nl[key] != null ? I18N.dyn.nl[key] : key);
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  };
  VL.price = function (n) {
    return new Intl.NumberFormat(VL.lang === "nl" ? "nl-BE" : "en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  };

  function applyLang(lang) {
    VL.lang = lang;
    root.lang = lang;
    $$("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      var v = lang === "en" ? I18N.en[k] : original.get(el);
      if (v != null) el.innerHTML = v;
    });
    originalAttr.forEach(function (o) {
      var v = lang === "en" ? I18N.en[o.key] : o.nl;
      if (v != null) o.el.setAttribute(o.attr, v);
    });
    $$("[data-price]").forEach(function (el) { el.textContent = VL.price(+el.getAttribute("data-price")); });
    $$(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang)); });
    syncMenuLabel();
    try { localStorage.setItem("vroeglicht-lang", lang); } catch (e) {}
    listeners.forEach(function (fn) { fn(lang); });
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }
  $$(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { var l = b.getAttribute("data-lang"); if (l !== VL.lang) applyLang(l); });
  });

  /* ------------------------------------------------------------ Mobile menu */
  var nav = $("#nav"), menu = $("#menu"), menuBtn = $(".nav__menu");
  function syncMenuLabel() {
    if (!menuBtn) return;
    var open = menuBtn.getAttribute("aria-expanded") === "true";
    $(".nav__menu-label", menuBtn).textContent = VL.t(open ? "nav.close" : "nav.menu");
  }
  function setMenu(open) {
    if (!menu) return;
    menuBtn.setAttribute("aria-expanded", String(open));
    syncMenuLabel();
    if (open) {
      menu.hidden = false;
      nav.classList.add("nav--menu");
      requestAnimationFrame(function () { requestAnimationFrame(function () { menu.classList.add("is-open"); }); });
      if (VL.lenis) VL.lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      menu.classList.remove("is-open");
      nav.classList.remove("nav--menu");
      if (VL.lenis) VL.lenis.start();
      document.body.style.overflow = "";
      setTimeout(function () { if (menuBtn.getAttribute("aria-expanded") === "false") menu.hidden = true; }, VL.reduceMotion ? 0 : 700);
    }
    syncNavColor();
  }
  VL.closeMenu = function () { if (menuBtn && menuBtn.getAttribute("aria-expanded") === "true") setMenu(false); };
  if (menuBtn) {
    menuBtn.addEventListener("click", function () { setMenu(menuBtn.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") { setMenu(false); menuBtn.focus(); } });
    window.addEventListener("resize", function () { if (window.innerWidth > 820) VL.closeMenu(); });
  }

  /* ------------------------------------------------------------ Nav colour
     Sections mark their ground with data-nav="dark" or "light". Whatever crosses the line just under
     the bar decides the colour. A page script can override it (the pinned story on the home page). */
  var navInk = false, override = null;
  function syncNavColor() {
    if (!nav) return;
    var ink = override != null ? override : navInk;
    nav.classList.toggle("nav--ink", ink && !nav.classList.contains("nav--menu"));
  }
  VL.setNavOverride = function (v) { override = v; syncNavColor(); };
  var regions = $$("[data-nav]");
  if ("IntersectionObserver" in window && regions.length) {
    var active = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { active.set(en.target, en.isIntersecting); });
      var hit = null;
      regions.forEach(function (r) { if (active.get(r)) hit = r; });
      if (hit) { navInk = hit.getAttribute("data-nav") === "light"; syncNavColor(); }
    }, { rootMargin: "-38px 0px -99% 0px", threshold: 0 });
    regions.forEach(function (r) { io.observe(r); });
  }

  // Hide the bar while reading down, bring it back (frosted) on the way up.
  var lastY = window.scrollY, ticking = false;
  function onScroll() {
    ticking = false;
    if (!nav) return;
    var y = window.scrollY;
    if (y < 60) nav.classList.remove("nav--hidden", "nav--solid");
    else {
      if (y > lastY + 6 && y > 240) nav.classList.add("nav--hidden");
      else if (y < lastY - 6) nav.classList.remove("nav--hidden");
      nav.classList.add("nav--solid");
    }
    lastY = y;
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  /* ------------------------------------------------------------ Smooth scroll (mouse only) */
  if (window.Lenis && VL.finePointer && !VL.reduceMotion) {
    VL.lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });
    if (window.gsap && window.ScrollTrigger) {
      VL.lenis.on("scroll", window.ScrollTrigger.update);
      window.gsap.ticker.add(function (time) { VL.lenis.raf(time * 1000); });
      window.gsap.ticker.lagSmoothing(0);
    } else {
      var raf = function (t) { VL.lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  VL.scrollTo = function (target) {
    var offset = -(nav ? nav.offsetHeight : 0) - 8;
    if (target === 0) {
      if (VL.lenis) VL.lenis.scrollTo(0, { duration: 1.4 }); else window.scrollTo({ top: 0, behavior: VL.reduceMotion ? "auto" : "smooth" });
      return;
    }
    if (VL.lenis) VL.lenis.scrollTo(target, { offset: offset, duration: 1.4 });
    else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset, behavior: VL.reduceMotion ? "auto" : "smooth" });
    var focusEl = target.matches("[tabindex]") ? target : $("[tabindex='-1']", target);
    if (focusEl) setTimeout(function () { focusEl.focus({ preventScroll: true }); }, VL.lenis ? 1000 : 500);
  };
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href").slice(1);
    if (!id) return;
    var target = id === "top" ? 0 : document.getElementById(id);
    if (target == null) return;
    e.preventDefault();
    VL.closeMenu();
    VL.scrollTo(target);
    if (id !== "top" && history.replaceState) history.replaceState(null, "", "#" + id);
  });
  // Arriving with a hash (e.g. collection.html#proefset): land under the bar.
  if (location.hash && location.hash.length > 1) {
    var landing = document.getElementById(location.hash.slice(1));
    if (landing) window.addEventListener("load", function () { setTimeout(function () { VL.scrollTo(landing); }, 60); });
  }

  /* ------------------------------------------------------------ Forms on static hosting
     On Netlify the forms are collected automatically (data-netlify). Elsewhere, and in previews,
     the page says plainly that nothing was sent. */
  VL.canSubmit = function (form) {
    var host = location.hostname;
    return form.hasAttribute("data-netlify") && location.protocol.indexOf("http") === 0 && !/claude|localhost|127\.0\.0\.1/.test(host);
  };
  VL.submitForm = function (form) {
    var data = new FormData(form);
    var body = new URLSearchParams();
    data.forEach(function (v, k) { body.append(k, v); });
    return fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); });
  };

  var news = $("#news-form");
  if (news) {
    news.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = $("input[type=email]", news), msg = $(".news__msg", news);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) { msg.textContent = VL.t("news.invalid"); input.focus(); return; }
      if (!VL.canSubmit(news)) { msg.textContent = VL.t("news.preview"); return; }
      msg.textContent = VL.t("form.sending");
      VL.submitForm(news).then(function () { msg.textContent = VL.t("news.ok"); news.reset(); })
        .catch(function () { msg.textContent = VL.t("news.fail"); });
    });
  }

  var year = $("[data-year]"); if (year) year.textContent = String(new Date().getFullYear());

  applyLang(VL.lang);
})();
