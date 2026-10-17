/* Vroeglicht — contact page: request form (order, discovery set, consultation, question). */
(function () {
  "use strict";
  var VL = window.VL, $ = VL.$, $$ = VL.$$;
  var form = $("#request-form");
  if (!form) return;
  var type = $("#f-type"), product = $("#f-product"), size = $("#f-size");
  var orderFields = $("#order-fields");
  var status = $("#form-status");

  // Prefill from the collection page (query string, or session storage in previews).
  var pre = {};
  try { var q = new URLSearchParams(location.search); q.forEach(function (v, k) { pre[k] = v; }); } catch (e) {}
  if (!pre.type) { try { pre = JSON.parse(sessionStorage.getItem("vroeglicht-order") || "{}") || {}; } catch (e) {} }
  if (pre.type && $('option[value="' + pre.type + '"]', type)) type.value = pre.type;
  if (pre.product && $('option[value="' + pre.product + '"]', product)) product.value = pre.product;
  if (pre.size && $('option[value="' + pre.size + '"]', size)) size.value = pre.size;
  try { sessionStorage.removeItem("vroeglicht-order"); } catch (e) {}

  function syncType() {
    var isOrder = type.value === "order";
    orderFields.hidden = !isOrder;
    product.required = isOrder; size.required = isOrder;
  }
  type.addEventListener("change", syncType);
  syncType();

  function setError(input, key) {
    var err = $("#" + input.id + "-err");
    input.setAttribute("aria-invalid", "true");
    err.textContent = VL.t(key); err.hidden = false;
  }
  function clearErrors() {
    $$("[aria-invalid]", form).forEach(function (i) { i.removeAttribute("aria-invalid"); });
    $$(".field__error", form).forEach(function (e) { e.hidden = true; e.textContent = ""; });
  }
  function showStatus(kind, text) {
    status.hidden = false;
    status.className = "form__status form__status--" + kind;
    status.textContent = text;
  }
  $$("input, select, textarea", form).forEach(function (i) {
    i.addEventListener("input", function () {
      if (i.getAttribute("aria-invalid") === "true") { i.removeAttribute("aria-invalid"); var e = $("#" + i.id + "-err"); if (e) e.hidden = true; }
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();
    var name = $("#f-name"), email = $("#f-email"), bad = [];
    if (!name.value.trim()) { setError(name, "err.name"); bad.push(name); }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { setError(email, "err.email"); bad.push(email); }
    if (type.value === "order" && !product.value) { setError(product, "err.product"); bad.push(product); }
    if (bad.length) { status.hidden = true; bad[0].focus(); return; }

    var first = name.value.trim().split(/\s+/)[0];
    if (!VL.canSubmit(form)) { showStatus("ok", VL.t("form.preview", { name: first })); return; }
    var btn = $("button[type=submit]", form);
    btn.disabled = true;
    showStatus("ok", VL.t("form.sending"));
    VL.submitForm(form).then(function () {
      showStatus("ok", VL.t("form.ok", { name: first }));
      form.reset(); syncType();
    }).catch(function () {
      showStatus("err", VL.t("form.fail"));
    }).then(function () { btn.disabled = false; });
  });
})();
