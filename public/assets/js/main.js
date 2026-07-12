(function () {
  "use strict";

  // Copyright year
  const yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const btn = document.querySelector(".nav-toggle-btn");
  const menu = document.getElementById("nav-main");
  if (btn && menu) {
    const setOpen = (open) => {
      btn.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
    };
    btn.addEventListener("click", () => setOpen(btn.getAttribute("aria-expanded") !== "true"));
    document.addEventListener("click", (e) => {
      if (!btn.contains(e.target) && !menu.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setOpen(false);
        btn.focus();
      }
    });
  }

  // WhatsApp links — single source of truth for the number and default message.
  // The default message is injected from site.ts via <html data-wa-default-msg>;
  // each [data-wa] link may still override it with data-wa-msg. This lets every
  // CTA say what happens next.
  const WA_NUMBER = document.documentElement.dataset.waNumber || "56984402664";
  const WA_DEFAULT =
    document.documentElement.dataset.waDefaultMsg ||
    "Hola Nico, vi el sitio de TRX Concept. Me gustaría agendar la evaluación gratis.";
  const waHref = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg || WA_DEFAULT)}`;
  document.querySelectorAll("[data-wa]").forEach((el) => {
    el.href = waHref(el.getAttribute("data-wa-msg"));
  });

  // Scrolled header — hysteresis (add at >70, remove at <50) + rAF gate
  // prevents oscillation when scroll deceleration keeps scrollY near the threshold
  const header = document.querySelector(".site-header");
  if (header) {
    let rafPending = false;
    window.addEventListener(
      "scroll",
      () => {
        if (rafPending) return;
        rafPending = true;
        requestAnimationFrame(() => {
          rafPending = false;
          const y = window.scrollY;
          const scrolled = header.classList.contains("is-scrolled");
          if (!scrolled && y > 70) {
            header.classList.add("is-scrolled");
          } else if (scrolled && y < 50) {
            header.classList.remove("is-scrolled");
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
  const discovery = document.querySelector("[data-discovery]");
  if (!discovery) return;

  const form = discovery.querySelector("[data-discovery-form]");
  const steps = Array.from(discovery.querySelectorAll(".discovery-step"));
  const barFill = discovery.querySelector("[data-discovery-bar]");
  const nextBtn = discovery.querySelector("[data-discovery-next]");
  const backBtn = discovery.querySelector("[data-discovery-back]");
  const nav = discovery.querySelector(".discovery-nav");
  const result = discovery.querySelector("[data-discovery-result]");
  const resultLink = discovery.querySelector("[data-discovery-link]");
  const restartBtn = discovery.querySelector("[data-discovery-restart]");
  let current = 0;

  const OBJETIVO = {
    empezar: "quiero empezar desde cero",
    retomar: "quiero retomar el ejercicio",
    molestia: "quiero entrenar cuidando una molestia",
    fuerza: "quiero ganar fuerza y mejorar mi postura",
  };
  const MOLESTIA = {
    ninguna: "sin lesiones",
    rodilla: "con una molestia de rodilla",
    espalda: "con una molestia de espalda",
    principiante: "soy principiante",
    otra: "con una molestia que te cuento",
  };

  discovery.classList.add("is-enhanced");
  if (nav) nav.hidden = false;

  const value = (name) => {
    const el = form.querySelector(`input[name="${name}"]:checked, select[name="${name}"]`);
    return el ? el.value : "";
  };

  // Horario is a checkbox group: "mañanas", "mañanas o tardes",
  // "mañanas, mediodía o tardes".
  const checkedList = (name) => {
    const els = form.querySelectorAll(`input[name="${name}"]:checked`);
    const vals = Array.from(els, (el) => el.value);
    if (vals.length > 1) {
      return `${vals.slice(0, -1).join(", ")} o ${vals[vals.length - 1]}`;
    }
    return vals[0] || "";
  };

  // Every named control group in the step must have a value (e.g. step 3
  // has both a comuna <select> and a horario radio group).
  const unansweredName = (index) => {
    const controls = steps[index].querySelectorAll("input, select");
    const seen = new Set();
    for (const control of controls) {
      const name = control.getAttribute("name");
      if (!name || seen.has(name)) continue;
      seen.add(name);
      if (!value(name)) return name;
    }
    return null;
  };

  // Focusing with the browser's default scroll pins the focused element to
  // the very top of the viewport, underneath the fixed header, hiding the
  // new question. So focus never scrolls; instead the card is scrolled just
  // below the header (html scroll-padding-top), and only when needed.
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const scrollCardIntoView = () => {
    if (discovery.getBoundingClientRect().top < 100) {
      discovery.scrollIntoView({ block: "start", behavior: reducedMotion.matches ? "auto" : "smooth" });
    }
  };

  // moveFocus is false on the initial render: focusing there would scroll
  // the page away from the hero as soon as the script loads.
  const showStep = (index, moveFocus) => {
    steps.forEach((step, i) => step.classList.toggle("is-active", i === index));
    current = index;
    const pct = ((index + 1) / steps.length) * 100;
    if (barFill) barFill.style.width = `${pct}%`;
    if (backBtn) backBtn.hidden = index === 0;
    if (nextBtn) nextBtn.textContent = index === steps.length - 1 ? "Ver mi resultado" : "Siguiente";
    if (moveFocus) {
      const focusTarget = steps[index].querySelector("legend");
      if (focusTarget) focusTarget.focus({ preventScroll: true });
      scrollCardIntoView();
    }
  };

  const buildMessage = () => {
    const comuna = value("comuna") || "Santiago";
    const horario = checkedList("horario") || "cuando se pueda";
    let objetivo = OBJETIVO[value("objetivo")] || "quiero empezar a entrenar";
    objetivo = objetivo.charAt(0).toUpperCase() + objetivo.slice(1);
    return `${objetivo}, ${MOLESTIA[value("molestia")] || "sin lesiones"} y entreno en ${comuna} (${horario}). Me interesa la evaluación gratis.`;
  };

  const finish = () => {
    const msg = buildMessage();
    if (resultLink) {
      resultLink.href = waHref(msg);
      resultLink.setAttribute("data-wa-msg", msg);
    }
    steps.forEach((step) => step.classList.remove("is-active"));
    if (nav) nav.hidden = true;
    if (result) {
      result.hidden = false;
      const heading = result.querySelector(".discovery-result-title");
      if (heading) heading.focus({ preventScroll: true });
      scrollCardIntoView();
    }
    if (barFill) barFill.style.width = "100%";
  };

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const missing = unansweredName(current);
      if (missing) {
        steps[current].classList.add("has-error");
        const invalid = steps[current].querySelector(`[name="${missing}"]`);
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
    backBtn.addEventListener("click", () => {
      if (current > 0) showStep(current - 1, true);
    });
  }
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      form.reset();
      if (result) result.hidden = true;
      if (nav) nav.hidden = false;
      showStep(0, true);
    });
  }
  // Answering clears the step's validation error right away.
  form.addEventListener("change", (e) => {
    if (e.target && (e.target.type === "radio" || e.target.type === "checkbox")) {
      steps[current].classList.remove("has-error");
    }
  });
  form.addEventListener("submit", (e) => e.preventDefault());

  showStep(0, false);
})();
