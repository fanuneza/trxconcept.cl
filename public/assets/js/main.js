(function () {
  "use strict";

  // Copyright year
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var btn = document.querySelector(".nav-toggle-btn");
  var menu = document.getElementById("nav-main");
  if (btn && menu) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("nav-open");
    });
    document.addEventListener("click", function (e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        btn.setAttribute("aria-expanded", "false");
        menu.classList.remove("nav-open");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("nav-open")) {
        btn.setAttribute("aria-expanded", "false");
        menu.classList.remove("nav-open");
        btn.focus();
      }
    });
  }

  // WhatsApp links — single source of truth for the number, per-link message.
  // Each [data-wa] link may carry its own message via data-wa-msg; otherwise it
  // falls back to the default. This lets every CTA say what happens next.
  var WA_NUMBER = "56984402664";
  var WA_DEFAULT = "Hola Nico, vi el sitio de TRX Concept. Me interesa agendar la evaluación gratis.";
  function waHref(msg) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg || WA_DEFAULT);
  }
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.href = waHref(el.getAttribute("data-wa-msg"));
  });

  // Scrolled header — hysteresis (add at >70, remove at <50) + rAF gate
  // prevents oscillation when scroll deceleration keeps scrollY near the threshold
  var header = document.querySelector(".site-header");
  if (header) {
    var rafPending = false;
    window.addEventListener(
      "scroll",
      function () {
        if (rafPending) return;
        rafPending = true;
        requestAnimationFrame(function () {
          rafPending = false;
          var y = window.scrollY;
          if (!header.classList.contains("scrolled") && y > 70) {
            header.classList.add("scrolled");
          } else if (header.classList.contains("scrolled") && y < 50) {
            header.classList.remove("scrolled");
          }
        });
      },
      { passive: true }
    );
  }

  // ── Discovery flow ──────────────────────────────────────────────
  // A 3-step qualifier that builds a prefilled WhatsApp message from the
  // visitor's answers. Progressive enhancement: without JS the form shows
  // stacked with a plain WhatsApp fallback link that is always present.
  var discovery = document.querySelector("[data-discovery]");
  if (discovery) {
    var form = discovery.querySelector("[data-discovery-form]");
    var steps = Array.prototype.slice.call(discovery.querySelectorAll(".discovery-step"));
    var barFill = discovery.querySelector("[data-discovery-bar]");
    var nextBtn = discovery.querySelector("[data-discovery-next]");
    var backBtn = discovery.querySelector("[data-discovery-back]");
    var nav = discovery.querySelector(".discovery-nav");
    var result = discovery.querySelector("[data-discovery-result]");
    var resultLink = discovery.querySelector("[data-discovery-link]");
    var restartBtn = discovery.querySelector("[data-discovery-restart]");
    var current = 0;

    var OBJETIVO = {
      empezar: "quiero empezar desde cero",
      retomar: "quiero retomar el ejercicio",
      molestia: "quiero entrenar cuidando una molestia",
      fuerza: "quiero ganar fuerza y mejorar mi postura",
    };
    var MOLESTIA = {
      ninguna: "sin lesiones",
      rodilla: "con una molestia de rodilla",
      espalda: "con una molestia de espalda",
      principiante: "soy principiante",
      otra: "con una molestia que te cuento",
    };

    discovery.classList.add("is-enhanced");
    if (nav) nav.hidden = false;

    function value(name) {
      var el = form.querySelector('input[name="' + name + '"]:checked, select[name="' + name + '"]');
      return el ? el.value : "";
    }

    // Every named control group in the step must have a value (e.g. step 3
    // has both a comuna <select> and a horario radio group).
    function unansweredName(index) {
      var controls = steps[index].querySelectorAll("input, select");
      var seen = {};
      for (var i = 0; i < controls.length; i++) {
        var name = controls[i].getAttribute("name");
        if (!name || seen[name]) continue;
        seen[name] = true;
        if (!value(name)) return name;
      }
      return null;
    }

    // moveFocus is false on the initial render: focusing there would scroll
    // the page away from the hero as soon as the script loads.
    function showStep(index, moveFocus) {
      steps.forEach(function (step, i) {
        step.classList.toggle("is-active", i === index);
      });
      current = index;
      var pct = ((index + 1) / steps.length) * 100;
      if (barFill) barFill.style.width = pct + "%";
      if (backBtn) backBtn.hidden = index === 0;
      if (nextBtn) nextBtn.textContent = index === steps.length - 1 ? "Ver mi resultado" : "Siguiente";
      if (moveFocus) {
        var focusTarget = steps[index].querySelector("legend");
        if (focusTarget) focusTarget.focus();
      }
    }

    function buildMessage() {
      var comuna = value("comuna") || "Santiago";
      var horario = value("horario") || "cuando se pueda";
      var objetivo = OBJETIVO[value("objetivo")] || "quiero empezar a entrenar";
      objetivo = objetivo.charAt(0).toUpperCase() + objetivo.slice(1);
      var msg =
        "Hola Nico, vi el sitio de TRX Concept. " +
        objetivo +
        ", " +
        (MOLESTIA[value("molestia")] || "sin lesiones") +
        " y entreno en " +
        comuna +
        " (" +
        horario +
        "). Me interesa la evaluación gratis.";
      return msg;
    }

    function finish() {
      var msg = buildMessage();
      if (resultLink) {
        resultLink.href = waHref(msg);
        resultLink.setAttribute("data-wa-msg", msg);
      }
      steps.forEach(function (step) {
        step.classList.remove("is-active");
      });
      if (nav) nav.hidden = true;
      if (result) {
        result.hidden = false;
        var heading = result.querySelector(".discovery-result-title");
        if (heading) heading.focus();
      }
      if (barFill) barFill.style.width = "100%";
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        var missing = unansweredName(current);
        if (missing) {
          steps[current].classList.add("has-error");
          var invalid = steps[current].querySelector('[name="' + missing + '"]');
          if (invalid) invalid.focus();
          return;
        }
        steps[current].classList.remove("has-error");
        if (current === steps.length - 1) {
          finish();
        } else {
          showStep(current + 1, true);
        }
      });
    }
    if (backBtn) {
      backBtn.addEventListener("click", function () {
        if (current > 0) showStep(current - 1, true);
      });
    }
    if (restartBtn) {
      restartBtn.addEventListener("click", function () {
        form.reset();
        if (result) result.hidden = true;
        if (nav) nav.hidden = false;
        showStep(0, true);
      });
    }
    // Auto-advance when a radio is chosen (still allows Back / manual Next).
    form.addEventListener("change", function (e) {
      if (e.target && e.target.type === "radio") {
        steps[current].classList.remove("has-error");
      }
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
    });

    showStep(0, false);
  }
})();
