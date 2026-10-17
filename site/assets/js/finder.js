/* Vroeglicht — scent finder: four questions, one at a time, then a recommendation. */
(function () {
  "use strict";
  var VL = window.VL, $ = VL.$, $$ = VL.$$;
  var form = $("#finder-form");
  if (!form) return;
  var steps = $$(".finder__step", form);
  var results = $$(".result-block");
  var bar = $(".finder__progress-bar span");
  var progressText = $(".finder__progress-text");
  var back = $("#finder-back"), next = $("#finder-next"), restart = $("#finder-restart");
  var nav = $(".finder__nav");
  var current = 0, total = steps.length;

  function selected(step) { return $("input:checked", step); }
  function render() {
    steps.forEach(function (s, i) { s.hidden = i !== current; });
    var done = current >= total;
    results.forEach(function (r) { r.hidden = true; });
    nav.hidden = done;
    if (done) {
      var tally = { night: 0, blue: 0, light: 0 };
      steps.forEach(function (s, i) { var c = selected(s); if (c) tally[c.value] += i === 0 ? 1.5 : 1; });
      var winner = Object.keys(tally).sort(function (a, b) { return tally[b] - tally[a]; })[0];
      var res = $('.result-block[data-scent="' + winner + '"]');
      res.hidden = false;
      bar.style.setProperty("--p", "100%");
      progressText.textContent = VL.t("finder.done");
      var h = $("h2", res); if (h) h.focus({ preventScroll: true });
      if (VL.scrollTo && window.innerWidth < 960) VL.scrollTo($("#finder"));
      return;
    }
    bar.style.setProperty("--p", ((current + 1) / total * 100) + "%");
    progressText.textContent = VL.t("finder.progress", { n: current + 1, total: total });
    back.disabled = current === 0;
    next.disabled = !selected(steps[current]);
    $(".finder__next-label", next).textContent = VL.t(current === total - 1 ? "finder.show" : "finder.next");
  }
  form.addEventListener("change", function () { next.disabled = !selected(steps[current]); });
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  next.addEventListener("click", function () {
    if (!selected(steps[current])) return;
    current++;
    render();
    if (current < total) { var first = $("input", steps[current]); if (first) first.focus({ preventScroll: true }); }
  });
  back.addEventListener("click", function () { if (current > 0) { current--; render(); } });
  $$("[data-finder-restart]").forEach(function (b) {
    b.addEventListener("click", function () {
      form.reset(); current = 0; render();
      var first = $("input", steps[0]); if (first) first.focus({ preventScroll: true });
    });
  });
  // Enter on an option moves on.
  form.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.type === "radio") { e.preventDefault(); next.click(); }
  });
  VL.onLang(render);
  render();
})();
