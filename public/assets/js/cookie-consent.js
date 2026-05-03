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

function loadGA4() {
  if (!GA4_ID) return;
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

const consent = getCookie(CONSENT_COOKIE);
if (consent === "accepted") {
  loadGA4();
  hideBanner();
} else if (consent === "rejected") {
  hideBanner();
}

document.getElementById("cookie-accept")?.addEventListener("click", () => {
  setCookie(CONSENT_COOKIE, "accepted");
  loadGA4();
  hideBanner();
});

document.getElementById("cookie-reject")?.addEventListener("click", () => {
  setCookie(CONSENT_COOKIE, "rejected");
  hideBanner();
});

document.getElementById("cookie-manage-btn")?.addEventListener("click", () => {
  document.cookie = `${CONSENT_COOKIE}=; max-age=0; path=/; Secure`;
  window.location.reload();
});
