/* Vroeglicht — home page: the live flacon, the intro, and the pinned night-to-dawn story. */
(function () {
  "use strict";
  var VL = window.VL, $ = VL.$, $$ = VL.$$;
  var root = document.documentElement;
  var gsap = window.gsap, ST = window.ScrollTrigger;
  var motion = !!(gsap && ST) && !VL.reduceMotion;
  if (motion) root.classList.add("motion");

  var canvas = $(".stage");
  var heroSection = $(".hero"), heroVisual = $(".hero__visual");
  var hoursSection = $(".hours"), hoursVisual = $(".hours__visual");
  var sky = $(".sky");

  /* ------------------------------------------------------------ Stage */
  var stage = null;
  try {
    stage = VL.createStage(canvas, { reduceMotion: VL.reduceMotion });
    root.classList.add("stage-ready");
  } catch (err) {
    root.classList.add("no-webgl");
    if (window.console) console.warn("WebGL unavailable, showing the still flacon.", err);
  }
  var S = stage ? stage.state : { x: 0, y: 0, scale: 1, rotY: 0, colorT: 0, intro: 1 };
  if (motion) S.intro = 0;

  // The flacon is placed over empty layout boxes (.hero__visual, .hours__visual), so it never covers text.
  var L = null;
  function boxToWorld(el, container) {
    var r = el.getBoundingClientRect(), c = container.getBoundingClientRect();
    var W = canvas.clientWidth || window.innerWidth, H = canvas.clientHeight || window.innerHeight;
    var v = stage ? stage.viewSize() : { w: W / H * 4.8, h: 4.8 };
    var cx = r.left + r.width / 2, cy = r.top - c.top + r.height / 2;
    var sH = (r.height * 0.8 / H) * v.h / 3.15;
    var sW = (r.width * 0.72 / W) * v.w / 1.74;
    return {
      x: (cx / W - 0.5) * v.w,
      y: (0.5 - cy / H) * v.h,
      s: Math.max(0.3, Math.min(sH, sW, 1.08)),
      glowX: (cx / W) * 100
    };
  }
  function computeLayout() {
    L = { hero: boxToWorld(heroVisual, heroSection), story: boxToWorld(hoursVisual, hoursSection) };
    return L;
  }
  function lay() { return L || computeLayout(); }

  /* ------------------------------------------------------------ Static path (reduced motion / no GSAP) */
  if (!motion) {
    var place = function () {
      computeLayout();
      S.x = L.hero.x; S.y = L.hero.y; S.scale = L.hero.s;
      if (sky) sky.style.setProperty("--glow-x", L.hero.glowX + "%");
      if (stage) stage.renderOnce();
    };
    place();
    window.addEventListener("resize", function () { clearTimeout(place.t); place.t = setTimeout(place, 150); });
    window.addEventListener("load", place);
    // The stage is only visible behind the hero; stop drawing once the story covers it.
    if (stage && "IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { stage.setActive(en[0].isIntersecting); }, { threshold: 0 }).observe(heroSection);
    }
    return;
  }

  /* ------------------------------------------------------------ Motion path */
  gsap.registerPlugin(ST);
  ST.config({ ignoreMobileResize: true });
  ST.addEventListener("refreshInit", computeLayout);

  // Hero → story: the flacon glides from its hero box to its story box.
  var heroScrub = { trigger: heroSection, start: "top top", end: "bottom top", scrub: 1, invalidateOnRefresh: true };
  gsap.fromTo(S,
    { x: function () { return lay().hero.x; }, y: function () { return lay().hero.y; }, scale: function () { return lay().hero.s; } },
    { x: function () { return lay().story.x; }, y: function () { return lay().story.y; }, scale: function () { return lay().story.s; }, ease: "none", scrollTrigger: heroScrub });
  gsap.fromTo(sky,
    { "--glow-x": function () { return lay().hero.glowX + "%"; } },
    { "--glow-x": function () { return lay().story.glowX + "%"; }, ease: "none", scrollTrigger: Object.assign({}, heroScrub) });

  // The story: one pinned sequence from 04:12 to 05:21.
  var SKY = {
    blue: { "--sky-top": "#1c2260", "--sky-bot": "#5a5ca2", "--glow": "rgba(179,169,240,0.38)" },
    dawn: { "--sky-top": "#d9d3e8", "--sky-bot": "#f3eff2", "--glow": "rgba(243,211,145,0.55)" }
  };
  var ink = getComputedStyle(root).getPropertyValue("--ink").trim() || "#17142b";
  var inkSoft = getComputedStyle(root).getPropertyValue("--ink-soft").trim() || "#4a4660";
  var hours = $$(".hour");
  var clockEl = $(".hours__clock");
  var clockSpans = clockEl ? $$("span", clockEl) : [];
  gsap.set(hours.slice(1), { autoAlpha: 0, y: 28 });

  var storyOn = false;
  var tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: hoursSection, start: "top top",
      end: function () { return "+=" + Math.round(window.innerHeight * 3); },
      pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
      onToggle: function (self) { storyOn = self.isActive; if (!storyOn) VL.setNavOverride(self.progress >= 1 ? true : null); },
      onUpdate: function (self) {
        var p = self.progress;
        if (clockEl) clockEl.style.setProperty("--progress", p.toFixed(4));
        var idx = p < 0.36 ? 0 : p < 0.7 ? 1 : 2;
        clockSpans.forEach(function (s, i) { s.classList.toggle("is-on", i === idx); });
        if (storyOn) VL.setNavOverride(p > 0.72);
      }
    }
  });
  tl.to(S, { rotY: Math.PI * 1.5, duration: 3 }, 0)
    .to(S, { colorT: 1, duration: 0.5 }, 0.95)
    .to(S, { colorT: 2, duration: 0.5 }, 1.95)
    .to(sky, Object.assign({ duration: 0.6 }, SKY.blue), 0.9)
    .to(sky, Object.assign({ duration: 0.6 }, SKY.dawn), 1.9)
    .to(hours[0], { autoAlpha: 0, y: -28, duration: 0.25, ease: "power1.in" }, 0.85)
    .to(hours[1], { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }, 1.1)
    .to(hours[1], { autoAlpha: 0, y: -28, duration: 0.25, ease: "power1.in" }, 1.85)
    .to(hours[2], { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }, 2.1)
    .to(".hours__intro h2", { color: ink, duration: 0.4 }, 1.95)
    .to(".hours__intro .kicker", { color: inkSoft, duration: 0.4 }, 1.95)
    .to(".hours__clock", { color: ink, duration: 0.4 }, 1.95)
    .to({}, { duration: 0.35 }, 2.65);

  // Between the end of the story (dawn, light) and the light content reaching the bar, keep the bar dark-on-light.
  ST.create({
    trigger: ".home-light", start: "top 38px",
    onEnter: function () { VL.setNavOverride(null); },
    onLeaveBack: function () { VL.setNavOverride(true); }
  });
  // Once the light content fully covers the stage, stop drawing it.
  if (stage) ST.create({ trigger: ".home-light", start: "top top", end: "max", onToggle: function (self) { stage.setActive(!self.isActive); } });

  // Intro: the flacon lights up, the copy settles in. One orchestrated moment.
  gsap.to(S, { intro: 1, duration: 2.4, ease: "power3.out", delay: 0.2 });
  gsap.from(".hero__title", { autoAlpha: 0, y: 24, duration: 1.2, ease: "power3.out", delay: 0.15 });
  gsap.from([".hero__kicker", ".hero__lede", ".hero__actions", ".hero__trust"], { autoAlpha: 0, y: 14, duration: 1, ease: "power2.out", stagger: 0.1, delay: 0.45 });

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ST.refresh(); });
  window.addEventListener("load", function () { ST.refresh(); });
})();
