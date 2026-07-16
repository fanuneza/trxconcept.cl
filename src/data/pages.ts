import type { ImageMetadata } from "astro";
import ogImage from "../assets/images/og-image.webp";
import nicoImage from "../assets/images/nico.webp";
import heroServicios from "../assets/images/hero-servicios.jpg";
import heroFaq from "../assets/images/hero-faq.jpg";
import heroNico from "../assets/images/hero-new.jpg";
import { site } from "./site";

const assetUrl = (src: string) => new URL(src, site.url).toString();
const pageUrl = (path = "") => `${site.url}${path}`;
const phoneNumber = `+${site.whatsappNumber}`;

export type SitePage = {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
  twitterCard?: string;
  robots?: string;
  structuredData?: unknown;
  breadcrumb?: { name: string; item: string }[];
  hero?: {
    title: string;
    /** May contain inline HTML (e.g. links). */
    description?: string;
    image?: ImageMetadata;
    imageAlt?: string;
    cta?: {
      label: string;
      message: string;
    };
  };
  content: string;
  isHome?: boolean;
};

// ─────────────────────────────────────────────────────────────────────────────
// FAQ: single source of truth for both JSON-LD and rendered <details>.
// ─────────────────────────────────────────────────────────────────────────────

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    id: "experiencia-previa",
    question: "¿Necesito experiencia previa para entrenar TRX?",
    answer:
      "No. El TRX se adapta a tu nivel. Si nunca has hecho ejercicio, empezamos desde lo más básico y avanzamos a tu ritmo. Si ya tienes experiencia, ajustamos la exigencia. La evaluación inicial gratis y sin compromiso sirve para conocer tu punto de partida.",
  },
  {
    id: "que-necesito-en-casa",
    question: "¿Qué necesito tener en casa para entrenar?",
    answer:
      "Solo necesitas espacio para moverte y una puerta estándar o barra donde fijar el equipo. El TRX y todos los implementos los llevo yo. Tú solo necesitas ropa cómoda y zapatillas.",
  },
  {
    id: "molestia-o-dolor-cronico",
    question: "¿Qué pasa si tengo una molestia o dolor crónico?",
    answer:
      "Antes de empezar conversamos sobre tu situación y adaptamos el entrenamiento a lo que sea pertinente. Esto es entrenamiento, no tratamiento médico. Si hay una lesión, diagnóstico o indicación clínica, lo revisamos con criterio y, si corresponde, lo coordinamos con tu médico o kinesiólogo.",
  },
  {
    id: "es-rehabilitacion",
    question: "¿Esto es rehabilitación o tratamiento médico?",
    answer:
      "No. Esto es entrenamiento personal con criterio, adaptado a tu historial, pero no reemplaza a un tratamiento médico ni a la kinesiología. Si estás en rehabilitación o tienes un diagnóstico que requiere supervisión, entreno dentro del alcance que indique tu profesional de salud y en coordinación con él.",
  },
  {
    id: "sectores-de-santiago",
    question: "¿En qué sectores de Santiago entrenas?",
    answer:
      "Trabajo principalmente en sectores de Santiago oriente y centro. Escríbeme por WhatsApp con tu comuna y lo coordinamos; en la mayoría de los casos puedo llegar a ti.",
  },
  {
    id: "horarios-disponibles",
    question: "¿Cuáles son los horarios disponibles?",
    answer:
      "Tengo disponibilidad principalmente en las mañanas, desde las 6:00 AM. Los horarios exactos los coordinamos directamente según tu disponibilidad semanal. La flexibilidad es parte del servicio.",
  },
  {
    id: "frecuencia-semanal",
    question: "¿Cuántas veces a la semana debería entrenar?",
    answer:
      "Depende de tu objetivo, tu experiencia, tu agenda y cómo responda tu cuerpo. El plan mensual contempla 3 sesiones semanales, pero en la evaluación inicial revisamos qué frecuencia tiene sentido para ti.",
  },
  {
    id: "cancelacion-de-sesion",
    question: "¿Qué pasa si tengo que cancelar una sesión?",
    answer:
      "Las cancelaciones con más de 24 horas de anticipación no tienen costo. Lo coordinamos directamente por WhatsApp y buscamos una alternativa en la misma semana cuando sea posible.",
  },
  {
    id: "primera-clase",
    question: "¿Cómo es la evaluación inicial?",
    answer:
      "La evaluación inicial es gratis y sin compromiso. Conversamos sobre tus objetivos, revisamos tu nivel y cómo te mueves, y vemos cómo podría seguir el entrenamiento. Sin presión ni pago por adelantado. Si después te hace sentido, coordinamos un plan; si no, ningún problema.",
  },
  {
    id: "precios",
    question: "¿Cuánto cuestan las clases de TRX?",
    answer:
      "Las clases de TRX tienen dos opciones: la sesión individual tiene un valor de $15.000, y el plan mensual de 3 veces por semana (~12 sesiones) tiene un valor de $160.000, lo que equivale a aproximadamente $13.300 por sesión. Antes puedes hacer una evaluación inicial gratis y sin compromiso.",
  },
  {
    id: "bajar-de-peso",
    question: "¿El TRX sirve para bajar de peso?",
    answer:
      "El TRX puede ser parte de un plan para moverte más y ganar fuerza, pero no prometo cambios de peso ni de composición corporal. Si ese es tu objetivo, lo conversamos en la evaluación inicial y, para indicaciones de alimentación, corresponde apoyarte en un profesional de nutrición.",
  },
  {
    id: "donde-clases",
    question: "¿Dónde das las clases de TRX?",
    answer:
      "A domicilio o al aire libre en Santiago, principalmente en sectores oriente y centro. Escríbeme con tu comuna y coordinamos el lugar que te acomode.",
  },
  {
    id: "venden-equipos",
    question: "¿Vendes equipos TRX?",
    answer:
      "No vendo equipos. El TRX y todos los implementos los llevo yo a cada sesión. Tú solo necesitas espacio para moverte, ropa cómoda y zapatillas.",
  },
  {
    id: "como-agendar",
    question: "¿Cómo agendo una clase de TRX?",
    answer:
      "Escríbeme por WhatsApp, coordinamos día y hora según tu disponibilidad, y partes con una evaluación inicial gratis y sin compromiso. Sin pago por adelantado.",
  },
];

const buildFaqStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

const renderFaqDetails = (items: FaqItem[]) =>
  items
    .map(
      (item) =>
        `<details class="faq-item" id="${item.id}">
            <summary>${item.question}</summary>
            <p class="faq-answer">${item.answer}</p>
          </details>`
    )
    .join("");

// ─────────────────────────────────────────────────────────────────────────────
// Services: single source of truth for JSON-LD OfferCatalog and service cards.
// ─────────────────────────────────────────────────────────────────────────────

type ServicePlan = {
  name: string;
  description: string;
  price: string;
  priceCurrency: "CLP";
  featured?: boolean;
  badge?: string;
  cardPrice?: string;
};

const servicePlans: ServicePlan[] = [
  {
    name: "Evaluación inicial TRX",
    description: "Evaluación inicial gratis y sin compromiso para conocernos y ver tu punto de partida.",
    price: "0",
    priceCurrency: "CLP",
  },
  {
    name: "Sesión individual TRX",
    description: "1 hora de entrenamiento personalizado en casa o al aire libre.",
    price: "15000",
    priceCurrency: "CLP",
    cardPrice: "$15.000",
  },
  {
    name: "Plan mensual TRX",
    description: "3 sesiones por semana, aproximadamente 12 sesiones al mes.",
    price: "160000",
    priceCurrency: "CLP",
    featured: true,
    badge: "Más elegido",
    cardPrice: "$160.000",
  },
];

const serviceCards = [
  {
    title: "Sesión individual",
    price: "$15.000",
    body: "Una hora de entrenamiento 1 a 1, adaptada a tu nivel y a lo que buscas. Sin compromiso de continuidad: sirve para probar o para complementar tu rutina.",
    cta: "Consultar por una sesión individual",
    ctaMessage: "Hola Nico, vi el sitio de TRX Concept. Me interesa una sesión individual para probar.",
  },
  {
    title: "Plan mensual",
    price: "$160.000",
    featured: true,
    badge: "Más elegido",
    body: "3 sesiones por semana, unas 12 al mes: queda en cerca de $13.300 por sesión. Voy siguiendo tu avance y ajusto el programa mes a mes.",
    cta: "Preguntar por el plan mensual",
    ctaMessage: "Hola Nico, vi el sitio de TRX Concept. Quiero saber más sobre el plan mensual.",
  },
  {
    title: "TRX Suspension Trainer™",
    body: "El sistema clásico de entrenamiento en suspensión: fuerza, core y movilidad usando solo el peso de tu cuerpo. El mismo ejercicio se ajusta a cualquier nivel cambiando el ángulo.",
    cta: "Preguntar por el método TRX",
    ctaMessage: "Hola Nico, vi el sitio de TRX Concept. Quiero saber si el método TRX es adecuado para mí.",
  },
  {
    title: "TRX Rip Trainer®",
    body: "Una barra con resistencia elástica asimétrica para trabajar potencia, rotación y estabilidad del core. Pensado para deportistas y para quienes ya quieren un trabajo más explosivo.",
    cta: "Preguntar por el Rip Trainer",
    ctaMessage: "Hola Nico, vi el sitio de TRX Concept. Quiero saber más sobre el TRX Rip Trainer®.",
  },
];

const buildServicesStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Clases de TRX en Santiago",
  url: pageUrl("/servicios/"),
  image: assetUrl(ogImage.src),
  provider: {
    "@type": "LocalBusiness",
    name: "TRX Concept",
    url: pageUrl("/"),
  },
  areaServed: {
    "@type": "City",
    name: "Santiago",
    addressCountry: "CL",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Planes de entrenamiento TRX",
    itemListElement: servicePlans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.description,
      price: plan.price,
      priceCurrency: plan.priceCurrency,
    })),
  },
});

const renderServiceCards = () =>
  serviceCards
    .map(
      (card) =>
        `<div class="service-card${card.featured ? " service-card--featured" : ""}">
          ${card.badge ? `<span class="pricing-badge">${card.badge}</span>` : ""}
          <h3>${card.title}</h3>
          ${card.price ? `<p class="pricing-price">${card.price}</p>` : ""}
          <p>${card.body}</p>
          <a class="btn btn--${card.featured ? "primary" : "outline"}" href="https://wa.me/56984402664" data-wa data-wa-msg="${card.ctaMessage}" target="_blank" rel="noopener noreferrer">${card.cta}</a>
        </div>`
    )
    .join("");

// ─────────────────────────────────────────────────────────────────────────────
// Pages
// ─────────────────────────────────────────────────────────────────────────────

export const pages = {
  home: {
    title: `Clases de TRX en Santiago, a domicilio y 1 a 1`,
    description: `Entrenamiento personal 1 a 1 con TRX en Santiago, a domicilio o al aire libre. Para empezar de a poco o retomar seguro. Evaluación inicial gratis por WhatsApp.`,
    canonical: pageUrl("/"),
    ogTitle: `Clases de TRX en Santiago, 1 a 1 a domicilio | TRX Concept`,
    ogImageAlt: "Nicolás Echeverría junto al texto Entrena con Nico, entrenador certificado TRX en Santiago",
    structuredData: {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
      "@id": `${pageUrl("/")}#business`,
      name: "TRX Concept",
      description:
        "Entrenamiento personal 1 a 1 con TRX en Santiago, Chile. A domicilio o al aire libre, para principiantes y para quienes retoman el ejercicio. Evaluación inicial gratis.",
      url: pageUrl("/"),
      telephone: phoneNumber,
      image: assetUrl(ogImage.src),
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Santiago",
        addressCountry: "CL",
      },
      areaServed: {
        "@type": "City",
        name: "Santiago",
        addressCountry: "CL",
      },
      founder: {
        "@type": "Person",
        name: "Nicolás Echeverría",
        jobTitle: "Entrenador Personal",
      },
      sameAs: ["https://www.instagram.com/trxconcept"],
      // No aggregateRating/review here: Google disallows self-serving review
      // markup on an entity's own LocalBusiness/Organization node, so it can't
      // earn a rich result and risks being flagged. The three real testimonials
      // remain visible on the page (HomeContent.astro) — see docs/final-production-audit.md.
    },
    content: "",
    isHome: true,
  },
  services: {
    title: `Clases de TRX a domicilio en Santiago: precios`,
    description: `Clases de TRX 1 a 1 a domicilio o al aire libre en Santiago. Evaluación gratis, sesión $15.000, plan mensual $160.000. Para principiantes y quienes retoman.`,
    canonical: pageUrl("/servicios/"),
    breadcrumb: [
      { name: "Inicio", item: pageUrl("/") },
      { name: "Servicios", item: pageUrl("/servicios/") },
    ],
    structuredData: buildServicesStructuredData(),
    hero: {
      title: "Clases de TRX a domicilio en Santiago",
      description:
        "Sesión individual o plan mensual, siempre 1 a 1, en tu casa o al aire libre. Sin membresía de gimnasio ni equipos que tengas que comprar.",
      image: heroServicios,
      imageAlt: "Correas de suspensión TRX amarillas colgando, listas para una sesión al aire libre",
      cta: {
        label: "Agendar evaluación inicial",
        message:
          "Hola Nico, vi los servicios de TRX Concept. Me gustaría agendar la evaluación inicial gratis y sin compromiso.",
      },
    },
    content: `<!-- SERVICES / PRICING -->
      <section class="section-alt">
        <div class="container">
          <div class="section-head text-center">
            <h2>Servicios y precios</h2>
            <p class="section-intro">Sesiones 1 a 1 en tu casa o en un parque cercano. Tú eliges cómo partir.</p>
          </div>
          <p class="text-center">La evaluación inicial es gratis y sin compromiso: conversamos, revisamos tu punto de partida y decides con calma si quieres seguir.</p>
          <div class="services-grid">
            ${renderServiceCards()}
          </div>
        </div>
      </section>

      <!-- HOW TO BOOK -->
      <section>
        <div class="container">
          <div class="section-head text-center">
            <h2>¿Cómo reservar una clase?</h2>
          </div>
          <ol class="steps-list">
            <li><strong>Escríbeme por WhatsApp</strong> y cuéntame qué te gustaría lograr.</li>
            <li><strong>Coordinamos día, hora y lugar</strong> según lo que te acomode.</li>
            <li><strong>Partes con una evaluación inicial gratis y sin compromiso.</strong> Sirve para conocernos, revisar tu punto de partida y decidir con calma si quieres seguir.</li>
          </ol>
          <p class="text-center">No vendo equipos TRX ni necesitas comprar nada: el equipo lo llevo yo a cada sesión.</p>
        </div>
      </section>

      <!-- WHAT IS TRX -->
      <section class="section-alt">
        <div class="container about-section">
          <h2>¿Qué es el entrenamiento TRX?</h2>
          <p>
            TRX (Total Resistance eXercise) es un sistema de entrenamiento en suspensión: usas el
            peso de tu propio cuerpo para trabajar fuerza, estabilidad y equilibrio al mismo tiempo.
            Se instala en minutos en una puerta, un árbol o una barra, y el mismo ejercicio se hace
            más suave o más exigente con solo cambiar el ángulo del cuerpo. Por eso funciona igual
            de bien si recién partes o si llevas años entrenando.
          </p>
          <p>¿Tienes dudas? Revisa las <a href="/preguntas-frecuentes/">preguntas frecuentes</a>.</p>
        </div>
      </section>

      <!-- FOR WHOM -->
      <section>
        <div class="container">
          <div class="section-head text-center">
            <h2>¿Para quién es?</h2>
            <p class="section-intro">Entreno a personas muy distintas. Quizás te reconoces en alguna de estas:</p>
          </div>
          <div class="audience-grid">
            <div class="audience-item">
              <h3>Principiantes absolutos</h3>
              <p>Nunca has entrenado o llevas años sin hacerlo. Partimos desde donde estás, con calma y sin juicio.</p>
            </div>
            <div class="audience-item">
              <h3>Personas con molestias</h3>
              <p>Si tienes una molestia de rodilla, espalda u hombro, conversamos cómo avanzar con criterio. Esto es entrenamiento, no tratamiento médico.</p>
            </div>
            <div class="audience-item">
              <h3>Profesionales ocupados</h3>
              <p>Sin traslados ni horarios de gimnasio. Entrenas en tu casa o en un parque cercano, con mañanas desde las 6:00.</p>
            </div>
            <div class="audience-item">
              <h3>Deportistas activos</h3>
              <p>Ya entrenas y quieres sumar core, fuerza funcional y movilidad que complementen tu deporte.</p>
            </div>
            <div class="audience-item">
              <h3>Quienes buscan un gimnasio TRX</h3>
              <p>Buscabas clases de TRX cerca de ti, pero sin traslados ni grupos. Las sesiones 1 a 1 van a donde tú estás.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- WHAT TO EXPECT -->
      <section class="section-alt">
        <div class="container about-section">
          <h2>¿Cómo es una sesión?</h2>
          <p>
            Cada sesión dura cerca de una hora. Partimos con un calentamiento según cómo llegas ese
            día, seguimos con el bloque principal de trabajo con TRX y cerramos con estiramiento y
            movilidad.
          </p>
          <p>
            La evaluación inicial gratis y sin compromiso parte conversando sobre tu objetivo, tu experiencia y
            cualquier molestia relevante. Con eso armamos una forma de avanzar que tenga sentido para ti, no una rutina
            genérica.
          </p>
          <p>
            El equipo lo llevo yo a cada sesión. Tú solo necesitas ropa cómoda.
          </p>
          <p>Conoce más <a href="/sobre-mi/">sobre Nicolás y su experiencia</a>.</p>
        </div>
      </section>`,
    isHome: false,
  },
  about: {
    title: `Nico Echeverría, entrenador TRX en Santiago`,
    description: `Entrenador TRX certificado en Santiago. Más de 10 años de experiencia, clases 1 a 1 y método de bajo impacto. Conoce a Nico.`,
    canonical: pageUrl("/sobre-mi/"),
    breadcrumb: [
      { name: "Inicio", item: pageUrl("/") },
      { name: "Sobre mí", item: pageUrl("/sobre-mi/") },
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${pageUrl("/sobre-mi/")}#person`,
      name: "Nicolás Echeverría",
      alternateName: "Nico Echeverría",
      jobTitle: "Entrenador Personal TRX",
      url: pageUrl("/sobre-mi/"),
      image: assetUrl(nicoImage.src),
      worksFor: {
        "@type": "LocalBusiness",
        name: "TRX Concept",
        url: pageUrl("/"),
      },
      knowsAbout: ["Entrenamiento TRX", "Entrenamiento en suspensión", "Entrenamiento personal 1 a 1"],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "TRX Suspension Trainer™ — Certificado Oficial",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "TRX Rip Trainer® — Certificado Oficial",
        },
      ],
      sameAs: ["https://www.instagram.com/trxconcept"],
      areaServed: {
        "@type": "City",
        name: "Santiago",
        addressCountry: "CL",
      },
    },
    hero: {
      title: "Tu entrenador TRX en Santiago",
      description:
        "Nicolás Echeverría: certificado en TRX Suspension Trainer™ y Rip Trainer®, con más de 10 años entrenando en Santiago.",
      image: heroNico,
      imageAlt: "Nicolás Echeverría entrenando calistenia en un parque de Santiago",
    },
    // Sobre mí renders its body through AboutContent.astro; content is empty
    // (same pattern as home/HomeContent.astro). The hero is rendered from `hero`.
    content: "",
    isHome: false,
  },
  faq: {
    title: `Preguntas frecuentes sobre clases de TRX`,
    description: `Resolvemos tus dudas sobre clases de TRX en Santiago: experiencia previa, equipos, horarios, precios y cómo reservar. Evaluación inicial gratis.`,
    canonical: pageUrl("/preguntas-frecuentes/"),
    breadcrumb: [
      { name: "Inicio", item: pageUrl("/") },
      { name: "Preguntas frecuentes", item: pageUrl("/preguntas-frecuentes/") },
    ],
    structuredData: buildFaqStructuredData(),
    hero: {
      title: "Preguntas frecuentes sobre clases de TRX",
      description:
        'Desde si necesitas experiencia hasta cómo reservar tu evaluación inicial gratis. También puedes revisar nuestros <a href="/servicios/">servicios</a> o <a href="/sobre-mi/">conocer a tu entrenador</a>.',
      image: heroFaq,
      imageAlt:
        "Parque al aire libre en Santiago con equipamiento para entrenar, uno de los lugares donde damos las clases",
    },
    content: `<section>
        <div class="container faq-list">
          ${renderFaqDetails(faqItems)}
        </div>
      </section>`,
    isHome: false,
  },
  cookies: {
    title: `Política de Cookies y Consentimiento`,
    description: `Información sobre las cookies que usa TRX Concept y cómo puedes gestionar tus preferencias.`,
    canonical: pageUrl("/politica-de-cookies/"),
    robots: `noindex`,
    breadcrumb: [
      { name: "Inicio", item: pageUrl("/") },
      { name: "Política de cookies", item: pageUrl("/politica-de-cookies/") },
    ],
    hero: {
      title: "Política de cookies",
      description: "Información sobre las cookies que usamos y cómo gestionarlas.",
    },
    content: `<section>
        <div class="container about-section">

          <h2>¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que un sitio web almacena en tu navegador
            cuando lo visitas. Sirven para recordar información entre visitas, como preferencias
            de usuario o datos de navegación. No contienen código ejecutable ni acceden a tu
            dispositivo más allá de lo que el navegador permite.
          </p>

          <h2>Cookies que usamos</h2>
          <p>TRX Concept usa exclusivamente las siguientes cookies:</p>
          <div class="cookie-table-wrap">
            <table class="cookie-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Propósito</th>
                  <th>Duración</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Nombre"><code>site_consent</code></td>
                  <td data-label="Propósito">Almacena tu preferencia de cookies (aceptar / rechazar)</td>
                  <td data-label="Duración">12 meses</td>
                  <td data-label="Tipo">Necesaria / preferencias</td>
                </tr>
                <tr>
                  <td data-label="Nombre"><code>_ga</code>, <code>_ga_*</code></td>
                  <td data-label="Propósito">Google Analytics 4 — análisis de tráfico agregado y anónimo. Solo se activan si aceptas las cookies.</td>
                  <td data-label="Duración">Hasta 2 años</td>
                  <td data-label="Tipo">Analítica (opcional)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Cómo gestionamos el consentimiento</h2>
          <p>
            Al visitar TRX Concept por primera vez verás un aviso en la parte inferior de la pantalla.
            Puedes hacer clic en <strong>Aceptar</strong> para autorizar el uso de cookies de análisis,
            o en <strong>Rechazar</strong> para denegarlas. Tu elección se guarda en la cookie
            <code>site_consent</code> y el aviso no volverá a aparecer durante 12 meses.
          </p>
          <p>
            Si rechazas las cookies, Google Analytics no se carga en ningún momento de tu visita.
            El sitio funciona con normalidad en cualquier caso.
          </p>

          <h2>Cómo retirar el consentimiento</h2>
          <p>
            Puedes cambiar tu preferencia en cualquier momento haciendo clic en
            <strong>Gestionar preferencias de cookies</strong>, disponible al pie de todas las páginas del
            sitio. Esto elimina la cookie de consentimiento y recarga la página, mostrando de nuevo el
            aviso para que puedas elegir nuevamente.
          </p>
          <p>
            También puedes eliminar todas las cookies desde la configuración de tu navegador. Consulta
            la ayuda de tu navegador para saber cómo hacerlo.
          </p>

          <h2>Base legal</h2>
          <p>
            Este sitio opera en Chile y se rige por la
            <strong>Ley N.° 19.628 sobre Protección de la Vida Privada</strong>. El uso de cookies
            de análisis está sujeto a tu consentimiento previo y explícito, el cual puedes retirar
            en cualquier momento tal como se describe más arriba. La cookie de preferencias
            (<code>site_consent</code>) es necesaria para recordar tu decisión y no requiere
            consentimiento adicional.
          </p>

        </div>
      </section>`,
    isHome: false,
  },
} satisfies Record<string, SitePage>;
