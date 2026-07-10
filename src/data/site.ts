export const WHATSAPP_NUMBER = "56984402664";

export const WHATSAPP_MESSAGE_BASE = "Hola Nico, vi el sitio de TRX Concept.";

export const WHATSAPP_DEFAULT_MESSAGE = `${WHATSAPP_MESSAGE_BASE} Me gustaría agendar la evaluación gratis.`;

export const WHATSAPP_MESSAGE_EVALUATION = `${WHATSAPP_MESSAGE_BASE} Me gustaría agendar la evaluación gratis para ver si esto es para mí.`;

export const WHATSAPP_MESSAGE_PLAN = `${WHATSAPP_MESSAGE_BASE} Quiero saber más sobre el plan mensual.`;

export const WHATSAPP_MESSAGE_SINGLE = `${WHATSAPP_MESSAGE_BASE} Me interesa una sesión individual para probar.`;

export const getWhatsAppHref = (message = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const site = {
  name: "TRX Concept",
  url: "https://trxconcept.cl",
  ga4Id: "G-P1W5Z80Z88",
  consentCookie: "site_consent",
  instagram: "https://www.instagram.com/trxconcept",
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappDefaultMessage: WHATSAPP_DEFAULT_MESSAGE,
  getWhatsAppHref,
  whatsappLabel: "Agendar evaluación gratis por WhatsApp",
  nav: [
    { href: "/servicios/", label: "Servicios" },
    { href: "/sobre-mi/", label: "Sobre mí" },
    { href: "/preguntas-frecuentes/", label: "Preguntas frecuentes" },
  ],
  legal: [{ href: "/politica-de-cookies/", label: "Política de cookies" }],
};
