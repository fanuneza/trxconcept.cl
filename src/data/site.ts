export const WHATSAPP_NUMBER = "56984402664";
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola Nico, vi el sitio de TRX Concept. Me gustaría agendar la evaluación gratis.";

const whatsappHref = (message = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const site = {
  name: "TRX Concept",
  url: "https://trxconcept.cl",
  ga4Id: "G-P1W5Z80Z88",
  consentCookie: "site_consent",
  instagram: "https://www.instagram.com/trxconcept",
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappDefaultMessage: WHATSAPP_DEFAULT_MESSAGE,
  whatsappHref: whatsappHref(),
  whatsappLabel: "Agendar evaluación gratis por WhatsApp",
  nav: [
    { href: "/servicios/", label: "Servicios" },
    { href: "/sobre-mi/", label: "Sobre mí" },
    { href: "/preguntas-frecuentes/", label: "Preguntas frecuentes" },
  ],
  legal: [{ href: "/politica-de-cookies/", label: "Política de cookies" }],
};
