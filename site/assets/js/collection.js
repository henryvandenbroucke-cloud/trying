/* Vroeglicht — collection page: size choice updates price and order link; tabs follow the scroll. */
(function () {
  "use strict";
  var VL = window.VL, $ = VL.$, $$ = VL.$$;

  function wire(block) {
    var priceEl = $(".buy__price", block), link = $(".buy__order", block);
    var product = block.getAttribute("data-product");
    function update() {
      var c = $("input[type=radio]:checked", block);
      if (!c) return;
      priceEl.setAttribute("data-price", c.getAttribute("data-price"));
      priceEl.textContent = VL.price(+c.getAttribute("data-price"));
      link.setAttribute("href", "contact.html?type=order&product=" + product + "&size=" + c.value + "#aanvraag");
    }
    $$("input[type=radio]", block).forEach(function (r) { r.addEventListener("change", update); });
    link.addEventListener("click", function () {
      var c = $("input[type=radio]:checked", block);
      try { sessionStorage.setItem("vroeglicht-order", JSON.stringify({ type: "order", product: product, size: c ? c.value : "" })); } catch (e) {}
    });
    update();
  }
  $$("[data-product]").forEach(wire);
  VL.onLang(function () { $$("[data-product]").forEach(function (b) { var p = $(".buy__price", b); if (p) p.textContent = VL.price(+p.getAttribute("data-price")); }); });

  // Tabs: highlight the section in view.
  var links = $$(".tabs__list a");
  var map = links.map(function (a) { return { a: a, el: document.getElementById(a.getAttribute("href").slice(1)) }; }).filter(function (m) { return m.el; });
  if ("IntersectionObserver" in window && map.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
        var m = map.filter(function (x) { return x.el === en.target; })[0];
        if (m) { m.a.classList.add("is-active"); m.a.setAttribute("aria-current", "true"); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach(function (m) { io.observe(m.el); });
  }
})();
