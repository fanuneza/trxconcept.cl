const GA4_ID = document.documentElement.dataset.ga4Id || "";
const CONSENT_COOKIE = document.documentElement.dataset.consentCookie || "site_consent";

function getCookie(name) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

function setCookie(name, value) {
  document.cookie = `${name}=${value}; max-age=31536000; path=/; SameSite=Lax; Secure`;
}

function ensureGA4Preconnect() {
  if (!GA4_ID) return;
  if (document.querySelector('link[data-ga4-preconnect="true"]')) return;

  const link = document.createElement("link");
  link.rel = "preconnect";
  link.href = "https://www.googletagmanager.com";
  link.crossOrigin = "";
  link.dataset.ga4Preconnect = "true";
  document.head.appendChild(link);
}

function loadGA4() {
  if (!GA4_ID) return;
  ensureGA4Preconnect();
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  gtag("js", new Date());
  gtag("config", GA4_ID);
}

function hideBanner() {
  document.getElementById("cookie-banner")?.remove();
}

function announceConsentResolution() {
  document.dispatchEvent(new CustomEvent("site:consent-resolved"));
}

const consent = getCookie(CONSENT_COOKIE);
if (consent === "accepted") {
  loadGA4();
  hideBanner();
} else if (consent === "rejected") {
  hideBanner();
} else {
  // The banner is display:none by default so it can't flash before this
  // script runs. On mobile, let the first page introduction and its CTA have
  // the viewport to themselves; consent appears as soon as that intro leaves.
  const banner = document.getElementById("cookie-banner");
  const mobileViewport = window.matchMedia("(max-width: 679px)");
  const intro = document.querySelector(
    "#main-content > .hero, #main-content > .page-hero, #main-content > header:first-child, #main-content > section:first-child"
  );
  const showBanner = () => banner?.classList.add("is-visible");

  if (!mobileViewport.matches || !intro || !("IntersectionObserver" in window)) {
    showBanner();
  } else {
    const introObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => !entry.isIntersecting)) {
        showBanner();
        introObserver.disconnect();
      }
    });
    introObserver.observe(intro);

    // A device rotation or desktop resize should never leave the consent
    // control needlessly hidden.
    mobileViewport.addEventListener(
      "change",
      (event) => {
        if (!event.matches) {
          showBanner();
          introObserver.disconnect();
        }
      },
      { once: true }
    );
  }
}

document.getElementById("cookie-accept")?.addEventListener("click", () => {
  setCookie(CONSENT_COOKIE, "accepted");
  loadGA4();
  hideBanner();
  announceConsentResolution();
});

document.getElementById("cookie-reject")?.addEventListener("click", () => {
  setCookie(CONSENT_COOKIE, "rejected");
  hideBanner();
  announceConsentResolution();
});

document.getElementById("cookie-manage-btn")?.addEventListener("click", () => {
  document.cookie = `${CONSENT_COOKIE}=; max-age=0; path=/; Secure`;
  window.location.reload();
});
