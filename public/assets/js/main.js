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
  }

  // WhatsApp links — single source of truth for number and pre-filled message
  var WA_NUMBER = "56984402664";
  var WA_MESSAGE = "Hola! Vi tu sitio web y me gustaría agendar una clase de TRX.";
  var WA_HREF = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(WA_MESSAGE);
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.href = WA_HREF;
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
})();
