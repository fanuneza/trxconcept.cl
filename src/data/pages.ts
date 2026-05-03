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

export const pages = {
  home: {
    title: `Entrenador Personal TRX en Santiago, Chile | TRX Concept`,
    description: `Entrena con un entrenador certificado en TRX, en casa o al aire libre en Santiago. Clases 1 a 1, seguras y personalizadas.`,
    canonical: `https://trxconcept.cl/`,
    ogTitle: `Entrenador Personal TRX en Santiago | TRX Concept`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
      "@id": "https://trxconcept.cl/#business",
      name: "TRX Concept",
      description:
        "Entrenamiento personal con TRX en Santiago, Chile. Clases individuales y grupales en casa o al aire libre.",
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
    content: `<!-- HERO SECTION -->
      <section id="hero" class="hero">
        <picture class="hero-media" aria-hidden="true">
          <source type="image/avif" srcset="/assets/img/hero-768.avif 768w, /assets/img/hero-960.avif 960w, /assets/img/hero-1080.avif 1080w, /assets/img/hero-1280.avif 1280w" sizes="100vw" />
          <source type="image/webp" srcset="/assets/img/hero-768.webp 768w, /assets/img/hero-960.webp 960w, /assets/img/hero-1080.webp 1080w, /assets/img/hero-1280.webp 1280w" sizes="100vw" />
          <img src="/assets/img/hero-960.webp" alt="" width="960" height="540" fetchpriority="high" decoding="async" loading="eager" />
        </picture>
        <div class="container">
          <h1 class="hero-title">Entrena donde estés,<br>sin máquinas, sin excusas.</h1>
          <p class="hero-lead"><a href="/servicios/">Clases de TRX personalizadas</a> en casa o al aire libre,<br>sin el estrés del gimnasio.</p>
          <a
            href="https://wa.me/56984402664?text=Hola%21%20Vi%20tu%20sitio%20web%20y%20me%20gustar%C3%ADa%20agendar%20una%20clase%20de%20TRX." data-wa
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-trx"
            aria-label="Escríbeme por WhatsApp"
            >¡Reserva tu clase gratis!
            <svg class="wa-icon" aria-hidden="true" focusable="false"><use href="#wa-symbol"/></svg></a>
          <p class="hero-note"><span class="hero-badge">⚡ Respondo en 4 horas o menos</span></p>
        </div>
      </section>

      <!-- TRUST ANCHOR -->
      <section id="trust" class="trust">
        <div class="container trust-inner">
          <img
            src="/assets/img/nico-140.webp"
            srcset="/assets/img/nico-140.webp 140w, /assets/img/nico-384.webp 384w"
            sizes="(max-width: 767px) 140px, 140px"
            alt="Nicolás Echeverría, entrenador personal TRX"
            class="profile-pic"
            width="140"
            height="140"
            decoding="async"
          />
          <div class="trust-content">
            <h2 class="trust-name"><a href="/sobre-mi/">Nicolás Echeverría</a></h2>
            <p>TRX Suspension Trainer™ y Rip Trainer® certificado para clases individuales y grupales.</p>
            <div class="trust-stats">
              <div class="trust-stat">
                <span class="trust-stat-number">10+</span>
                <span class="trust-stat-label">años de experiencia</span>
              </div>
              <div class="trust-stat">
                <span class="trust-stat-number">1 a 1</span>
                <span class="trust-stat-label">atención personalizada</span>
              </div>
              <div class="trust-stat">
                <span class="trust-stat-number">Santiago</span>
                <span class="trust-stat-label">Chile</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- BENEFITS SECTION -->
      <section id="benefits" class="benefits">
        <div class="benefits-grid container">
          <div class="benefit">
            <div class="benefit-icon-wrap">
              <img class="benefit-icon-svg" src="/assets/img/icon-solo-para-ti.svg" alt="" aria-hidden="true" width="24" height="24" loading="lazy" />
            </div>
            <h3>Solo para ti</h3>
            <p>Tu entrenamiento, a tu ritmo, con atención completa de principio a fin.</p>
          </div>
          <div class="benefit">
            <div class="benefit-icon-wrap">
              <img class="benefit-icon-svg" src="/assets/img/icon-donde-estes.svg" alt="" aria-hidden="true" width="24" height="24" loading="lazy" />
            </div>
            <h3>Donde estés</h3>
            <p>En casa o al aire libre, sin máquinas, sin traslados.</p>
          </div>
          <div class="benefit">
            <div class="benefit-icon-wrap">
              <img class="benefit-icon-svg" src="/assets/img/icon-bajo-riesgo.svg" alt="" aria-hidden="true" width="24" height="24" loading="lazy" />
            </div>
            <h3>Bajo riesgo de lesiones</h3>
            <p>Método de bajo impacto, ideal para volver al ejercicio o empezar desde cero.</p>
          </div>
        </div>
      </section>

      <!-- MID-PAGE CTA BAND -->
      <section class="cta-band">
        <div class="container text-center">
          <p class="cta-band-text"><a href="/preguntas-frecuentes/">¿Dudas?</a> Tu primera clase es sin costo.</p>
          <a
            href="https://wa.me/56984402664?text=Hola%21%20Vi%20tu%20sitio%20web%20y%20me%20gustar%C3%ADa%20agendar%20una%20clase%20de%20TRX." data-wa
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-trx"
            aria-label="Escríbeme por WhatsApp"
            >¡Reserva tu clase gratis!
            <svg class="wa-icon" aria-hidden="true" focusable="false"><use href="#wa-symbol"/></svg></a>
        </div>
      </section>

      <!-- TESTIMONIAL SECTION -->
      <section
        id="testimonios"
        class="testimonial container"
      >
        <h2>Lo que dicen quienes entrenan con Nico</h2>
        <div class="testimonial-grid">
          <div class="testimonial-col">
            <div class="testimonial-card">
              <img
                src="/assets/img/testimonio-valentinarosenthal-320.webp"
                srcset="/assets/img/testimonio-valentinarosenthal-320.webp 320w, /assets/img/testimonio-valentinarosenthal.webp 512w"
                sizes="100px"
                alt="Valentina Rosenthal"
                class="testimonial-img"
                loading="lazy"
                decoding="async"
                width="512"
                height="512"
              />
              <div class="testimonial-stars" aria-label="5 estrellas">★★★★★</div>
              <blockquote class="testimonial-quote">
                <p>
                  Entreno con Nico desde 2021. Partimos dos veces a la semana y
                  hoy entrenamos tres. Sin haber sido nunca buena para hacer
                  deportes, Nico ha logrado que tenga una rutina y que lleve
                  cuatro años entrenando, con todos los beneficios que esto trae.
                </p>
                <footer class="testimonial-author">– Valentina</footer>
              </blockquote>
            </div>
          </div>

          <div class="testimonial-col">
            <div class="testimonial-card">
              <img
                src="/assets/img/testimonio-marisagracia-320.webp"
                srcset="/assets/img/testimonio-marisagracia-320.webp 320w, /assets/img/testimonio-marisagracia.webp 512w"
                sizes="100px"
                alt="Marisa Gracia"
                class="testimonial-img"
                loading="lazy"
                decoding="async"
                width="512"
                height="512"
              />
              <div class="testimonial-stars" aria-label="5 estrellas">★★★★★</div>
              <blockquote class="testimonial-quote">
                <p>
                  Entrenar con Nicolás fue una excelente experiencia. Gracias a su
                  guía y el trabajo constante con TRX, mi cuerpo ganó fuerza,
                  estabilidad y tono muscular. Noté mejoras en mi postura, control
                  corporal y energía general.
                </p>
                <footer class="testimonial-author">– Marisa Gracia</footer>
              </blockquote>
            </div>
          </div>

          <div class="testimonial-col">
            <div class="testimonial-card">
              <img
                src="/assets/img/testimonio-mariaignacia-320.webp"
                srcset="/assets/img/testimonio-mariaignacia-320.webp 320w, /assets/img/testimonio-mariaignacia.webp 792w"
                sizes="100px"
                alt="María Ignacia Williamson"
                class="testimonial-img"
                loading="lazy"
                decoding="async"
                width="792"
                height="792"
              />
              <div class="testimonial-stars" aria-label="5 estrellas">★★★★★</div>
              <blockquote class="testimonial-quote">
                <p>
                  Entrenar con Nico fue una muy buena experiencia. Su enfoque
                  personalizado y su profundo conocimiento del TRX hicieron que
                  cada sesión fuera desafiante pero muy gratificante.
                </p>
                <footer class="testimonial-author">– María Ignacia</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <!-- COMPARISON -->
      <section id="comparison" class="comparison">
        <h2>¿Qué ofrece TRX Concept que los otros no?</h2>
        <div class="comparison-cards">
          <div class="comp-card comp-card-others">
            <h3>Gimnasio / CrossFit</h3>
            <ul>
              <li><span class="comp-x" aria-hidden="true">✗</span>Sin personalización 1 a 1</li>
              <li><span class="comp-x" aria-hidden="true">✗</span>Solo en instalaciones fijas</li>
              <li><span class="comp-x" aria-hidden="true">✗</span>No siempre adaptable a tu nivel</li>
              <li><span class="comp-x" aria-hidden="true">✗</span>Mayor riesgo de lesiones</li>
              <li><span class="comp-x" aria-hidden="true">✗</span>Horario rígido</li>
              <li><span class="comp-x" aria-hidden="true">✗</span>Mensualidad fija obligatoria</li>
            </ul>
          </div>
          <div class="comp-card comp-card-trx">
            <span class="recommended-badge">Recomendado</span>
            <h3>TRX Concept</h3>
            <ul>
              <li><span class="comp-check" aria-hidden="true">✓</span>Personalización 1 a 1</li>
              <li><span class="comp-check" aria-hidden="true">✓</span>En casa o al aire libre</li>
              <li><span class="comp-check" aria-hidden="true">✓</span>Adaptable a cualquier nivel</li>
              <li><span class="comp-check" aria-hidden="true">✓</span>Bajo riesgo de lesiones</li>
              <li><span class="comp-check" aria-hidden="true">✓</span>Horario flexible</li>
              <li><span class="comp-check" aria-hidden="true">✓</span>Sin mensualidad fija</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- PACKAGES / PRICING -->
      <section id="pricing" class="pricing">
        <h2>Planes y precios</h2>
        <p class="pricing-subtitle">Sin mensualidad fija. Entrena cuando puedas.</p>
        <div class="pricing-cards">
          <div class="pricing-card">
            <h3>Sesión Individual</h3>
            <p class="pricing-price">$15.000</p>
            <p class="pricing-desc">Ideal para probar o entrenar a tu propio ritmo.</p>
            <ul class="pricing-list">
              <li>1 hora de entrenamiento personalizado</li>
              <li>En casa o al aire libre</li>
              <li>Adaptado a tu nivel</li>
              <li>Sin compromiso</li>
            </ul>
            <a
              href="https://wa.me/56984402664?text=Hola%21%20Vi%20tu%20sitio%20web%20y%20me%20gustar%C3%ADa%20agendar%20una%20clase%20de%20TRX." data-wa
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-whatsapp"
              aria-label="Escríbeme por WhatsApp"
              >Reservar
              <svg class="wa-icon" aria-hidden="true" focusable="false"><use href="#wa-symbol"/></svg></a>
          </div>
          <div class="pricing-card pricing-card-featured">
            <span class="pricing-badge">Más popular</span>
            <h3>Paquete Mensual</h3>
            <p class="pricing-price">$160.000</p>
            <p class="pricing-per">3 veces por semana · ~12 sesiones</p>
            <p class="pricing-per-session">≈ $13.300 por sesión</p>
            <ul class="pricing-list">
              <li>Resultados constantes y medibles</li>
              <li>Seguimiento personalizado continuo</li>
              <li>Mejor precio por sesión</li>
              <li>Horario flexible desde las 6 AM</li>
            </ul>
            <a
              href="https://wa.me/56984402664?text=Hola%21%20Vi%20tu%20sitio%20web%20y%20me%20gustar%C3%ADa%20agendar%20una%20clase%20de%20TRX." data-wa
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-trx"
              aria-label="Escríbeme por WhatsApp"
              >¡Reserva tu clase gratis!
              <svg class="wa-icon" aria-hidden="true" focusable="false"><use href="#wa-symbol"/></svg></a>
          </div>
        </div>
        <p class="pricing-note">Disponible: Mañanas desde las 6:00 AM.</p>
      </section>`,
    isHome: true,
  },
  services: {
    title: `Servicios de Entrenamiento TRX en Santiago | TRX Concept`,
    description: `Clases individuales y paquetes mensuales de TRX en casa o al aire libre en Santiago. Entrenamiento personalizado con Nicolás Echeverría.`,
    canonical: `https://trxconcept.cl/servicios/`,
    breadcrumb: [
      { name: "Inicio", item: "https://trxconcept.cl/" },
      { name: "Servicios", item: "https://trxconcept.cl/servicios/" },
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Entrenamiento Personal TRX",
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
    content: `<div class="page-hero">
        <h1>Entrenamientos diseñados para ti</h1>
        <p>Sin máquinas, sin gimnasio, sin excusas. Solo TRX y trabajo real.</p>
      </div>

      <!-- WHAT IS TRX -->
      <section>
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

      <!-- SERVICES -->
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
      </section>`,
    isHome: false,
  },
  about: {
    title: `Sobre Nicolás Echeverría, Entrenador TRX | TRX Concept`,
    description: `Conoce al entrenador certificado detrás de TRX Concept. Más de 10 años formando personas en Santiago con método TRX.`,
    canonical: `https://trxconcept.cl/sobre-mi/`,
    breadcrumb: [
      { name: "Inicio", item: "https://trxconcept.cl/" },
      { name: "Sobre mí", item: "https://trxconcept.cl/sobre-mi/" },
    ],
    content: `<div class="page-hero">
        <h1>Conoce a tu entrenador</h1>
        <p>La persona detrás de cada sesión, cada ajuste y cada logro.</p>
      </div>

      <!-- BIO -->
      <section>
        <div class="container about-section">
          <div class="trust-inner">
            <img
              src="/assets/img/nico-384.webp"
              srcset="/assets/img/nico-384.webp 384w, /assets/img/nico.webp 512w"
              sizes="160px"
              alt="Nicolás Echeverría, entrenador personal TRX"
              class="profile-pic"
              width="512"
              height="512"
              decoding="async"
            />
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
    title: `Preguntas Frecuentes sobre TRX en Santiago | TRX Concept`,
    description: `Resolvemos tus dudas sobre el entrenamiento TRX en Santiago. ¿Necesito experiencia? ¿Qué necesito en casa? ¿Cómo son los horarios?`,
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
          name: "¿Cuánto cuesta?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La sesión individual tiene un valor de $15.000. El paquete mensual de 3 veces por semana (~12 sesiones) tiene un valor de $160.000, lo que equivale a aproximadamente $13.300 por sesión. La primera clase es siempre gratis.",
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
      ],
    },
    content: `<div class="page-hero">
        <h1>Preguntas frecuentes</h1>
        <p>Si tienes una duda, es probable que alguien más también la haya tenido. También puedes revisar nuestros <a href="/servicios/">servicios</a> o <a href="/sobre-mi/">conocer a tu entrenador</a>.</p>
      </div>

      <section>
        <div class="container faq-list">

          <details class="faq-item">
            <summary>¿Necesito experiencia previa para entrenar TRX?</summary>
            <p class="faq-answer">
              No. El TRX es completamente adaptable a tu nivel, sea cual sea. Si nunca has hecho ejercicio, empezamos desde lo más básico y avanzamos a tu propio ritmo. Si ya tienes experiencia, podemos llevar la intensidad mucho más lejos. La primera sesión siempre empieza con una evaluación para conocer tu punto de partida.
            </p>
          </details>

          <details class="faq-item">
            <summary>¿Qué necesito tener en casa para entrenar?</summary>
            <p class="faq-answer">
              Solo necesitas espacio para moverte y una puerta estándar o barra donde fijar el equipo. El TRX y todos los implementos los llevo yo. Tú solo necesitas ropa cómoda y zapatillas.
            </p>
          </details>

          <details class="faq-item">
            <summary>¿Es seguro si tengo una lesión o dolor crónico?</summary>
            <p class="faq-answer">
              El TRX es uno de los métodos más seguros que existen, precisamente porque es de bajo impacto y sin cargas externas. He trabajado con personas en recuperación de lesiones de rodilla, hombro y espalda. Eso sí, antes de empezar siempre conversamos sobre tu situación médica y, si es necesario, coordino con tu médico o kinesiólogo.
            </p>
          </details>

          <details class="faq-item">
            <summary>¿En qué sectores de Santiago entrenas?</summary>
            <p class="faq-answer">
              Trabajo principalmente en sectores de Santiago oriente y centro. Escríbeme por WhatsApp con tu comuna y lo coordinamos; en la mayoría de los casos puedo llegar a ti.
            </p>
          </details>

          <details class="faq-item">
            <summary>¿Cuáles son los horarios disponibles?</summary>
            <p class="faq-answer">
              Tengo disponibilidad principalmente en las mañanas, desde las 6:00 AM. Los horarios exactos los coordinamos directamente según tu disponibilidad semanal. La flexibilidad es parte del servicio.
            </p>
          </details>

          <details class="faq-item">
            <summary>¿Cuántas veces a la semana debería entrenar?</summary>
            <p class="faq-answer">
              Depende de tu objetivo y tu agenda. El mínimo recomendable para ver resultados es 2 veces por semana. El paquete mensual incluye 3 sesiones semanales, que es la frecuencia ideal para progreso constante sin sobrecargar el cuerpo.
            </p>
          </details>

          <details class="faq-item">
            <summary>¿Qué pasa si tengo que cancelar una sesión?</summary>
            <p class="faq-answer">
              Las cancelaciones con más de 24 horas de anticipación no tienen costo. Lo coordinamos directamente por WhatsApp y buscamos una alternativa en la misma semana cuando sea posible.
            </p>
          </details>

          <details class="faq-item">
            <summary>¿Cómo es la primera clase?</summary>
            <p class="faq-answer">
              La primera sesión es siempre gratuita y sirve para conocernos. Conversamos sobre tus objetivos, hago una evaluación básica de tu nivel y coordinamos cómo seguir. Sin presión ni compromiso. Si después de la sesión sientes que encajamos, coordinamos el plan; si no, ningún problema.
            </p>
          </details>

          <details class="faq-item">
            <summary>¿Cuánto cuesta?</summary>
            <p class="faq-answer">
              La sesión individual tiene un valor de $15.000. El paquete mensual de 3 veces por semana (~12 sesiones) tiene un valor de $160.000, lo que equivale a aproximadamente $13.300 por sesión. La primera clase es siempre gratis.
            </p>
          </details>

          <details class="faq-item">
            <summary>¿El TRX sirve para bajar de peso?</summary>
            <p class="faq-answer">
              El entrenamiento con TRX ayuda a desarrollar masa muscular y mejorar el metabolismo, lo que contribuye a la pérdida de grasa. Para resultados de composición corporal, lo ideal es combinar el entrenamiento con buenos hábitos de alimentación, algo sobre lo que también podemos conversar.
            </p>
          </details>

        </div>
      </section>`,
    isHome: false,
  },
  cookies: {
    title: `Política de Cookies y Consentimiento | TRX Concept`,
    description: `Información sobre las cookies que usa TRX Concept y cómo puedes gestionar tus preferencias.`,
    canonical: `https://trxconcept.cl/politica-de-cookies/`,
    robots: `noindex`,
    breadcrumb: [
      { name: "Inicio", item: "https://trxconcept.cl/" },
      { name: "Política de cookies", item: "https://trxconcept.cl/politica-de-cookies/" },
    ],
    content: `<div class="page-hero">
        <h1>Política de cookies</h1>
        <p>Información sobre las cookies que usamos y cómo gestionarlas.</p>
      </div>

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
