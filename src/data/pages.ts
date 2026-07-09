export type SitePage = {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  robots?: string;
  structuredData?: unknown;
  breadcrumb?: { name: string; item: string }[];
  content: string;
  isHome?: boolean;
};

const renderBreadcrumb = (breadcrumb?: { name: string; item: string }[]) => {
  if (!breadcrumb?.length) return "";

  const items = breadcrumb
    .map((item, index) => {
      const isLast = index === breadcrumb.length - 1;

      return `<li>${isLast ? `<span aria-current="page">${item.name}</span>` : `<a href="${item.item}">${item.name}</a>`}</li>`;
    })
    .join("");

  return `<nav class="page-breadcrumb" aria-label="Breadcrumb"><ol>${items}</ol></nav>`;
};

const renderPageHero = ({
  title,
  description,
  breadcrumb,
}: {
  title: string;
  description: string;
  breadcrumb?: { name: string; item: string }[];
}) => `<div class="page-hero">
    <div class="container page-hero-inner">
      ${renderBreadcrumb(breadcrumb)}
      <h1>${title}</h1>
      <p>${description}</p>
    </div>
  </div>`;

export const pages = {
  home: {
    title: `Clases de TRX en Santiago, a domicilio y 1 a 1`,
    description: `Entrenamiento personal 1 a 1 con TRX en Santiago, a domicilio o al aire libre. Para empezar de a poco o retomar seguro, aunque tengas una molestia. Evaluación inicial gratis por WhatsApp.`,
    canonical: `https://trxconcept.cl/`,
    ogTitle: `Clases de TRX en Santiago, 1 a 1 a domicilio | TRX Concept`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
      "@id": "https://trxconcept.cl/#business",
      name: "TRX Concept",
      description:
        "Entrenamiento personal 1 a 1 con TRX en Santiago, Chile. A domicilio o al aire libre, para principiantes y para quienes retoman el ejercicio. Evaluación inicial gratis.",
      url: "https://trxconcept.cl/",
      telephone: "+56984402664",
      image: "https://trxconcept.cl/assets/img/og-image.webp",
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
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "3",
      },
      review: [
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Valentina Rosenthal" },
          reviewRating: { "@type": "Rating", ratingValue: "5" },
          reviewBody:
            "Entreno con Nico desde 2021. Partimos dos veces a la semana y hoy entrenamos tres. Sin haber sido nunca buena para hacer deportes, Nico ha logrado que tenga una rutina y que lleve cuatro años entrenando, con todos los beneficios que esto trae.",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Marisa Gracia" },
          reviewRating: { "@type": "Rating", ratingValue: "5" },
          reviewBody:
            "Entrenar con Nicolás fue una excelente experiencia. Gracias a su guía y el trabajo constante con TRX, mi cuerpo ganó fuerza, estabilidad y tono muscular. Noté mejoras en mi postura, control corporal y energía general.",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "María Ignacia Williamson" },
          reviewRating: { "@type": "Rating", ratingValue: "5" },
          reviewBody:
            "Entrenar con Nico fue una muy buena experiencia. Su enfoque personalizado y su profundo conocimiento del TRX hicieron que cada sesión fuera desafiante pero muy gratificante.",
        },
      ],
    },
    content: "",
    isHome: true,
  },
  services: {
    title: `Clases de TRX en Santiago: precios y a domicilio`,
    description: `Clases de TRX 1 a 1 en Santiago, a domicilio o al aire libre. Evaluación inicial gratis, sesión individual $15.000 y plan mensual $160.000. Para principiantes y quienes retoman.`,
    canonical: `https://trxconcept.cl/servicios/`,
    breadcrumb: [
      { name: "Inicio", item: "https://trxconcept.cl/" },
      { name: "Servicios", item: "https://trxconcept.cl/servicios/" },
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Clases de TRX en Santiago",
      url: "https://trxconcept.cl/servicios/",
      image: "https://trxconcept.cl/assets/img/og-image.webp",
      provider: {
        "@type": "LocalBusiness",
        name: "TRX Concept",
        url: "https://trxconcept.cl/",
      },
      areaServed: {
        "@type": "City",
        name: "Santiago",
        addressCountry: "CL",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Planes de entrenamiento TRX",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Evaluación inicial TRX",
            description: "Primera sesión para conocernos y ver tu punto de partida. Sin costo ni compromiso.",
            price: "0",
            priceCurrency: "CLP",
          },
          {
            "@type": "Offer",
            name: "Sesión Individual TRX",
            description: "1 hora de entrenamiento personalizado en casa o al aire libre.",
            price: "15000",
            priceCurrency: "CLP",
          },
          {
            "@type": "Offer",
            name: "Paquete Mensual TRX",
            description: "3 sesiones por semana, aproximadamente 12 sesiones al mes.",
            price: "160000",
            priceCurrency: "CLP",
          },
        ],
      },
    },
    content: `${renderPageHero({
      title: "Clases de TRX personalizadas en Santiago",
      description: "Sesiones 1 a 1 o paquete mensual. Sin mensualidad fija, sin traslados, sin equipos que compres tú.",
      breadcrumb: [
        { name: "Inicio", item: "https://trxconcept.cl/" },
        { name: "Servicios", item: "https://trxconcept.cl/servicios/" },
      ],
    })}

      <!-- SERVICES / PRICING -->
      <section class="section-alt">
        <div class="container text-center">
          <h2>Nuestros servicios</h2>
          <p class="section-intro">Flexibles, a tu ritmo y en tu lugar.</p>
          <div class="services-grid">
            <div class="service-card">
              <h3>Sesión Individual</h3>
              <p class="pricing-price">$15.000</p>
              <p>Una hora de entrenamiento 1 a 1, adaptado completamente a tu nivel y objetivos. Sin compromiso de continuidad. Ideal para probar o complementar tu rutina.</p>
            </div>
            <div class="service-card service-card--featured">
              <span class="pricing-badge">Más popular</span>
              <h3>Paquete Mensual</h3>
              <p class="pricing-price">$160.000</p>
              <p>3 sesiones por semana (~12 al mes). La opción de mayor impacto para quienes buscan resultados consistentes. Incluye seguimiento personalizado y ajustes de programa.</p>
            </div>
            <div class="service-card">
              <h3>TRX Suspension Trainer™</h3>
              <p>El sistema clásico. Desarrolla fuerza funcional, core, movilidad y resistencia usando únicamente el peso de tu cuerpo. Efectivo para todos los niveles.</p>
            </div>
            <div class="service-card">
              <h3>TRX Rip Trainer®</h3>
              <p>Trabaja potencia, rotación y estabilidad del core con una barra elástica de resistencia asimétrica. Ideal para deportistas y quienes buscan trabajo explosivo.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- HOW TO BOOK -->
      <section>
        <div class="container text-center">
          <h2>¿Cómo reservar una clase?</h2>
          <ol class="steps-list">
            <li><strong>Escríbeme por WhatsApp</strong> y cuéntame qué buscas.</li>
            <li><strong>Coordinamos día y hora</strong> según tu disponibilidad.</li>
            <li><strong>Tu primera clase es gratis.</strong> Sin compromiso.</li>
          </ol>
          <p>No vendemos equipos TRX: el equipo lo llevo yo a cada sesión.</p>
        </div>
      </section>

      <!-- WHAT IS TRX -->
      <section class="section-alt">
        <div class="container about-section text-center">
          <h2>¿Qué es el entrenamiento TRX?</h2>
          <p>
            TRX (Total Resistance eXercise) es un sistema de suspensión que usa el peso de tu propio
            cuerpo para entrenar fuerza, estabilidad, flexibilidad y equilibrio al mismo tiempo. Se
            instala en segundos en una puerta, árbol o barra, y se adapta a cualquier nivel, desde
            principiantes hasta atletas avanzados, ajustando simplemente el ángulo del cuerpo.
          </p>
          <p>¿Tienes dudas? Revisa nuestras <a href="/preguntas-frecuentes/">preguntas frecuentes</a>.</p>
        </div>
      </section>

      <!-- FOR WHOM -->
      <section>
        <div class="container text-center">
          <h2>¿Para quién es?</h2>
          <p class="section-intro">TRX Concept funciona para personas muy distintas. Aquí algunas:</p>
          <div class="audience-grid">
            <div class="audience-item">
              <h3>Principiantes absolutos</h3>
              <p>Nunca has hecho ejercicio o llevas mucho tiempo sin hacerlo. Empezamos desde cero, con calma.</p>
            </div>
            <div class="audience-item">
              <h3>Personas con lesiones</h3>
              <p>El TRX es de bajo impacto y totalmente ajustable. Ideal para recuperación y fortalecimiento preventivo.</p>
            </div>
            <div class="audience-item">
              <h3>Profesionales ocupados</h3>
              <p>Sin traslado al gimnasio. Entrenas en casa o cerca, en el horario que te acomode, desde las 6 AM.</p>
            </div>
            <div class="audience-item">
              <h3>Deportistas activos</h3>
              <p>Complementa tu deporte con trabajo de core, fuerza funcional y movilidad dirigida.</p>
            </div>
            <div class="audience-item">
              <h3>Quienes buscan un gimnasio TRX</h3>
              <p>Si prefieres evitar el traslado y las clases grupales, las sesiones 1 a 1 son una alternativa personalizada y flexible.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- WHAT TO EXPECT -->
      <section class="section-alt">
        <div class="container about-section">
          <h2>¿Cómo es una sesión?</h2>
          <p>
            Cada sesión dura aproximadamente una hora. Comenzamos con un calentamiento adaptado a tu
            condición del día, seguido del bloque principal de trabajo con TRX, y terminamos con
            estiramiento y movilidad.
          </p>
          <p>
            Antes de la primera sesión conversamos sobre tus objetivos, historial de lesiones y
            disponibilidad. Eso me permite diseñar un programa que realmente tenga sentido para ti,
            no una rutina genérica.
          </p>
          <p>
            El equipo lo llevo yo. Tú solo necesitas ropa cómoda y ganas de trabajar.
          </p>
          <p>Conoce más <a href="/sobre-mi/">sobre Nicolás y su experiencia</a>.</p>
        </div>
      </section>

      <!-- CTA BAND -->
      <section class="cta-band">
        <div class="container text-center">
          <p class="cta-band-text">La evaluación inicial es gratis y sin compromiso.</p>
          <a
            href="https://wa.me/56984402664"
            data-wa
            data-wa-msg="Hola Nico, vi el sitio de TRX Concept. Me interesa una clase de TRX y quiero agendar la evaluación gratis."
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-trx"
            >Agendar evaluación gratis
            <svg class="wa-icon" aria-hidden="true" focusable="false"><use href="#wa-symbol"/></svg></a>
        </div>
      </section>`,
    isHome: false,
  },
  about: {
    title: `Nicolás Echeverría | Entrenador TRX | Santiago`,
    description: `Entrenador TRX certificado en Santiago. Más de 10 años de experiencia, clases 1 a 1 y método de bajo impacto. Conoce a Nico.`,
    canonical: `https://trxconcept.cl/sobre-mi/`,
    breadcrumb: [
      { name: "Inicio", item: "https://trxconcept.cl/" },
      { name: "Sobre mí", item: "https://trxconcept.cl/sobre-mi/" },
    ],
    content: `${renderPageHero({
      title: "Conoce a tu entrenador",
      description: "La persona detrás de cada sesión, cada ajuste y cada logro.",
      breadcrumb: [
        { name: "Inicio", item: "https://trxconcept.cl/" },
        { name: "Sobre mí", item: "https://trxconcept.cl/sobre-mi/" },
      ],
    })}

      <!-- BIO -->
      <section>
        <div class="container about-section">
          <div class="trust-inner">
            <picture>
              <source type="image/avif" srcset="/assets/img/nico-320.avif 320w" sizes="160px" />
              <source type="image/webp" srcset="/assets/img/nico-384.webp 384w, /assets/img/nico.webp 512w" sizes="160px" />
              <img
                src="/assets/img/nico-384.webp"
                alt="Nicolás Echeverría, entrenador personal TRX"
                class="profile-pic"
                width="512"
                height="512"
                decoding="async"
              />
            </picture>
            <div class="trust-content">
              <h2>Nicolás Echeverría</h2>
              <p>
                Llevo más de 10 años trabajando como entrenador personal en Santiago,
                especializándome en el <a href="/servicios/">método TRX</a>, un sistema de entrenamiento en suspensión
                que usa el peso del propio cuerpo para desarrollar fuerza, equilibrio y resistencia
                de forma segura y progresiva.
              </p>
              <p>
                Mi enfoque es simple: cada persona es diferente, y cada entrenamiento debe
                serlo también. No hay rutinas genéricas, no hay grupos masivos. Solo tú y yo,
                trabajando al ritmo que corresponde.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CERTIFICATIONS -->
      <section class="section-alt">
        <div class="container about-section text-center">
          <h2>Certificaciones</h2>
          <p class="section-subtitle">Formación oficial avalada por TRX Training.</p>
          <ul class="cert-list">
            <li>TRX Suspension Trainer™: Certificado Oficial</li>
            <li>TRX Rip Trainer®: Certificado Oficial</li>
            <li>Entrenamiento grupal e individual certificado</li>
            <li>Más de 10 años de práctica continua en Santiago</li>
          </ul>
        </div>
      </section>

      <!-- PHILOSOPHY -->
      <section>
        <div class="container about-section">
          <h2>Mi filosofía de entrenamiento</h2>
          <p>
            Creo que el ejercicio no debería ser una obligación intimidante, sino algo que genuinamente
            mejore tu vida. Por eso trabajo con personas de todos los niveles, desde quienes nunca han
            entrenado hasta deportistas que buscan complementar su actividad principal.
          </p>
          <p>
            El TRX es ideal para esto porque es infinitamente ajustable: el mismo ejercicio puede ser
            suave o extremadamente desafiante dependiendo del ángulo del cuerpo. Sin impacto en
            articulaciones, sin riesgo de lesiones por máquinas mal calibradas, sin filas de espera.
          </p>
          <p>
            Entreno a domicilio o al aire libre en parques de Santiago porque el ambiente importa.
            El estrés del gimnasio no ayuda a nadie a rendir mejor.
          </p>
        </div>
      </section>`,
    isHome: false,
  },
  faq: {
    title: `Preguntas frecuentes sobre clases TRX en Santiago`,
    description: `Resolvemos tus dudas sobre clases de TRX en Santiago: experiencia previa, equipos, horarios, precios y cómo reservar. Primera clase gratis.`,
    canonical: `https://trxconcept.cl/preguntas-frecuentes/`,
    breadcrumb: [
      { name: "Inicio", item: "https://trxconcept.cl/" },
      { name: "Preguntas frecuentes", item: "https://trxconcept.cl/preguntas-frecuentes/" },
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Necesito experiencia previa para entrenar TRX?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. El TRX es completamente adaptable a tu nivel, sea cual sea. Si nunca has hecho ejercicio, empezamos desde lo más básico y avanzamos a tu propio ritmo. Si ya tienes experiencia, podemos llevar la intensidad mucho más lejos. La primera sesión siempre empieza con una evaluación para conocer tu punto de partida.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué necesito tener en casa para entrenar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Solo necesitas espacio para moverte y una puerta estándar o barra donde fijar el equipo. El TRX y todos los implementos los llevo yo. Tú solo necesitas ropa cómoda y zapatillas.",
          },
        },
        {
          "@type": "Question",
          name: "¿Es seguro si tengo una lesión o dolor crónico?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El TRX es uno de los métodos más seguros que existen, precisamente porque es de bajo impacto y sin cargas externas. He trabajado con personas en recuperación de lesiones de rodilla, hombro y espalda. Eso sí, antes de empezar siempre conversamos sobre tu situación médica y, si es necesario, coordino con tu médico o kinesiólogo.",
          },
        },
        {
          "@type": "Question",
          name: "¿Esto es rehabilitación o tratamiento médico?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Esto es entrenamiento personal con criterio, adaptado a tu historial, pero no reemplaza a un tratamiento médico ni a la kinesiología. Si estás en rehabilitación o tienes un diagnóstico que requiere supervisión, entreno dentro del alcance que indique tu profesional de salud y en coordinación con él.",
          },
        },
        {
          "@type": "Question",
          name: "¿En qué sectores de Santiago entrenas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Trabajo principalmente en sectores de Santiago oriente y centro. Escríbeme por WhatsApp con tu comuna y lo coordinamos; en la mayoría de los casos puedo llegar a ti.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuáles son los horarios disponibles?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tengo disponibilidad principalmente en las mañanas, desde las 6:00 AM. Los horarios exactos los coordinamos directamente según tu disponibilidad semanal. La flexibilidad es parte del servicio.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuántas veces a la semana debería entrenar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Depende de tu objetivo y tu agenda. El mínimo recomendable para ver resultados es 2 veces por semana. El paquete mensual incluye 3 sesiones semanales, que es la frecuencia ideal para progreso constante sin sobrecargar el cuerpo.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué pasa si tengo que cancelar una sesión?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Las cancelaciones con más de 24 horas de anticipación no tienen costo. Lo coordinamos directamente por WhatsApp y buscamos una alternativa en la misma semana cuando sea posible.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo es la primera clase?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La primera sesión es siempre gratuita y sirve para conocernos. Conversamos sobre tus objetivos, hago una evaluación básica de tu nivel y coordinamos cómo seguir. Sin presión ni compromiso. Si después de la sesión sientes que encajamos, coordinamos el plan; si no, ningún problema.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuánto cuestan las clases de TRX?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Las clases de TRX tienen dos opciones: la sesión individual tiene un valor de $15.000, y el paquete mensual de 3 veces por semana (~12 sesiones) tiene un valor de $160.000, lo que equivale a aproximadamente $13.300 por sesión. La primera clase es siempre gratis.",
          },
        },
        {
          "@type": "Question",
          name: "¿El TRX sirve para bajar de peso?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El entrenamiento con TRX ayuda a desarrollar masa muscular y mejorar el metabolismo, lo que contribuye a la pérdida de grasa. Para resultados de composición corporal, lo ideal es combinar el entrenamiento con buenos hábitos de alimentación, algo sobre lo que también podemos conversar.",
          },
        },
        {
          "@type": "Question",
          name: "¿Dónde das las clases de TRX?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A domicilio o al aire libre en Santiago, principalmente en sectores oriente y centro. Escríbeme con tu comuna y coordinamos el lugar que te acomode.",
          },
        },
        {
          "@type": "Question",
          name: "¿Vendes equipos TRX?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No vendemos equipos. El TRX y todos los implementos los llevo yo a cada sesión. Tú solo necesitas espacio para moverte, ropa cómoda y zapatillas.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo agendo una clase de TRX?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Escríbeme por WhatsApp, coordinamos día y hora según tu disponibilidad, y la primera clase es gratis. Sin compromiso ni pago por adelantado.",
          },
        },
      ],
    },
    content: `${renderPageHero({
      title: "Preguntas frecuentes sobre clases de TRX",
      description:
        'Desde si necesitas experiencia hasta cómo reservar tu primera clase gratis. También puedes revisar nuestros <a href="/servicios/">servicios</a> o <a href="/sobre-mi/">conocer a tu entrenador</a>.',
      breadcrumb: [
        { name: "Inicio", item: "https://trxconcept.cl/" },
        { name: "Preguntas frecuentes", item: "https://trxconcept.cl/preguntas-frecuentes/" },
      ],
    })}

      <section>
        <div class="container faq-list">

          <details class="faq-item" id="experiencia-previa">
            <summary>¿Necesito experiencia previa para entrenar TRX?</summary>
            <p class="faq-answer">
              No. El TRX es completamente adaptable a tu nivel, sea cual sea. Si nunca has hecho ejercicio, empezamos desde lo más básico y avanzamos a tu propio ritmo. Si ya tienes experiencia, podemos llevar la intensidad mucho más lejos. La primera sesión siempre empieza con una evaluación para conocer tu punto de partida.
            </p>
          </details>

          <details class="faq-item" id="que-necesito-en-casa">
            <summary>¿Qué necesito tener en casa para entrenar?</summary>
            <p class="faq-answer">
              Solo necesitas espacio para moverte y una puerta estándar o barra donde fijar el equipo. El TRX y todos los implementos los llevo yo. Tú solo necesitas ropa cómoda y zapatillas.
            </p>
          </details>

          <details class="faq-item" id="lesion-o-dolor-cronico">
            <summary>¿Es seguro si tengo una lesión o dolor crónico?</summary>
            <p class="faq-answer">
              El TRX es uno de los métodos más seguros que existen, precisamente porque es de bajo impacto y sin cargas externas. He trabajado con personas en recuperación de lesiones de rodilla, hombro y espalda. Eso sí, antes de empezar siempre conversamos sobre tu situación médica y, si es necesario, coordino con tu médico o kinesiólogo.
            </p>
          </details>

          <details class="faq-item" id="es-rehabilitacion">
            <summary>¿Esto es rehabilitación o tratamiento médico?</summary>
            <p class="faq-answer">
              No. Esto es entrenamiento personal con criterio, adaptado a tu historial, pero no reemplaza a un tratamiento médico ni a la kinesiología. Si estás en rehabilitación o tienes un diagnóstico que requiere supervisión, entreno dentro del alcance que indique tu profesional de salud y en coordinación con él.
            </p>
          </details>

          <details class="faq-item" id="sectores-de-santiago">
            <summary>¿En qué sectores de Santiago entrenas?</summary>
            <p class="faq-answer">
              Trabajo principalmente en sectores de Santiago oriente y centro. Escríbeme por WhatsApp con tu comuna y lo coordinamos; en la mayoría de los casos puedo llegar a ti.
            </p>
          </details>

          <details class="faq-item" id="horarios-disponibles">
            <summary>¿Cuáles son los horarios disponibles?</summary>
            <p class="faq-answer">
              Tengo disponibilidad principalmente en las mañanas, desde las 6:00 AM. Los horarios exactos los coordinamos directamente según tu disponibilidad semanal. La flexibilidad es parte del servicio.
            </p>
          </details>

          <details class="faq-item" id="frecuencia-semanal">
            <summary>¿Cuántas veces a la semana debería entrenar?</summary>
            <p class="faq-answer">
              Depende de tu objetivo y tu agenda. El mínimo recomendable para ver resultados es 2 veces por semana. El paquete mensual incluye 3 sesiones semanales, que es la frecuencia ideal para progreso constante sin sobrecargar el cuerpo.
            </p>
          </details>

          <details class="faq-item" id="cancelacion-de-sesion">
            <summary>¿Qué pasa si tengo que cancelar una sesión?</summary>
            <p class="faq-answer">
              Las cancelaciones con más de 24 horas de anticipación no tienen costo. Lo coordinamos directamente por WhatsApp y buscamos una alternativa en la misma semana cuando sea posible.
            </p>
          </details>

          <details class="faq-item" id="primera-clase">
            <summary>¿Cómo es la primera clase?</summary>
            <p class="faq-answer">
              La primera sesión es siempre gratuita y sirve para conocernos. Conversamos sobre tus objetivos, hago una evaluación básica de tu nivel y coordinamos cómo seguir. Sin presión ni compromiso. Si después de la sesión sientes que encajamos, coordinamos el plan; si no, ningún problema.
            </p>
          </details>

          <details class="faq-item" id="precios">
            <summary>¿Cuánto cuestan las clases de TRX?</summary>
            <p class="faq-answer">
              Las clases de TRX tienen dos opciones: la sesión individual tiene un valor de $15.000, y el paquete mensual de 3 veces por semana (~12 sesiones) tiene un valor de $160.000, lo que equivale a aproximadamente $13.300 por sesión. La primera clase es siempre gratis.
            </p>
          </details>

          <details class="faq-item" id="bajar-de-peso">
            <summary>¿El TRX sirve para bajar de peso?</summary>
            <p class="faq-answer">
              El entrenamiento con TRX ayuda a desarrollar masa muscular y mejorar el metabolismo, lo que contribuye a la pérdida de grasa. Para resultados de composición corporal, lo ideal es combinar el entrenamiento con buenos hábitos de alimentación, algo sobre lo que también podemos conversar.
            </p>
          </details>

          <details class="faq-item" id="donde-clases">
            <summary>¿Dónde das las clases de TRX?</summary>
            <p class="faq-answer">
              A domicilio o al aire libre en Santiago, principalmente en sectores oriente y centro.
              Escríbeme con tu comuna y coordinamos el lugar que te acomode.
            </p>
          </details>

          <details class="faq-item" id="venden-equipos">
            <summary>¿Vendes equipos TRX?</summary>
            <p class="faq-answer">
              No vendemos equipos. El TRX y todos los implementos los llevo yo a cada sesión.
              Tú solo necesitas espacio para moverte, ropa cómoda y zapatillas.
            </p>
          </details>

          <details class="faq-item" id="como-agendar">
            <summary>¿Cómo agendo una clase de TRX?</summary>
            <p class="faq-answer">
              Escríbeme por WhatsApp, coordinamos día y hora según tu disponibilidad, y la primera clase es gratis.
              Sin compromiso ni pago por adelantado.
            </p>
          </details>

        </div>
      </section>`,
    isHome: false,
  },
  cookies: {
    title: `Política de Cookies y Consentimiento`,
    description: `Información sobre las cookies que usa TRX Concept y cómo puedes gestionar tus preferencias.`,
    canonical: `https://trxconcept.cl/politica-de-cookies/`,
    robots: `noindex`,
    breadcrumb: [
      { name: "Inicio", item: "https://trxconcept.cl/" },
      { name: "Política de cookies", item: "https://trxconcept.cl/politica-de-cookies/" },
    ],
    content: `${renderPageHero({
      title: "Política de cookies",
      description: "Información sobre las cookies que usamos y cómo gestionarlas.",
      breadcrumb: [
        { name: "Inicio", item: "https://trxconcept.cl/" },
        { name: "Política de cookies", item: "https://trxconcept.cl/politica-de-cookies/" },
      ],
    })}

      <section>
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
                  <td><code>site_consent</code></td>
                  <td>Almacena tu preferencia de cookies (aceptar / rechazar)</td>
                  <td>12 meses</td>
                  <td>Necesaria / preferencias</td>
                </tr>
                <tr>
                  <td><code>_ga</code>, <code>_ga_*</code></td>
                  <td>Google Analytics 4 — análisis de tráfico agregado y anónimo. Solo se activan si aceptas las cookies.</td>
                  <td>Hasta 2 años</td>
                  <td>Analítica (opcional)</td>
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
