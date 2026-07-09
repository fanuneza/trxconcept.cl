# Google Search Console — hallazgos y takeaways

Resumen del export de GSC usado para orientar el rediseño y el plan SEO
(ver `seo-content-plan.md`). Datos reales; no inventar más allá de esto.

---

## Resumen general

- **Clics totales:** ~30
- **Impresiones totales:** ~371
- **Posición promedio:** ~12–18
- **Dispositivo:** móvil 218 impresiones (CTR ~10%) vs. escritorio 185 impresiones (CTR ~4,3%).
  → **El móvil domina en volumen y convierte más del doble.** Prioridad de diseño: móvil primero.
- **País:** dominado por **Chile**.
- **Página de entrada principal:** Home, con **29 de los ~30 clics**.
- **`/servicios/`:** ~**50 impresiones, 0 clics**, posición promedio ~**49**.
  → Alta visibilidad sin retorno: la peor relevancia/CTR del sitio y la mayor oportunidad.

---

## Datos de consultas (query data)

Consultas reales top (Chile, mayoría móvil), con posición aproximada y potencial:

| Consulta                  | Posición aprox.  | Cluster       | Nota / oportunidad                                           |
| ------------------------- | ---------------- | ------------- | ------------------------------------------------------------ |
| gimnasio trx              | 4–13             | TRX genérico  | Quick win: empujar a top 3–5.                                |
| trx concept               | 4–13             | Marca         | Quick win: consulta de marca, debería rankear 1.             |
| clases de trx cerca de mi | ~12–18           | Local + TRX   | Reforzar señales locales ("cerca de ti", Santiago, comunas). |
| trx cerca de mi           | ~12–18           | Local + TRX   | Igual: SEO local.                                            |
| trx clases                | ~12–18           | TRX clases    | Título/H1 con "clases de TRX".                               |
| trx                       | alta competencia | TRX genérico  | Difícil; capturar vía long-tail local.                       |
| trx chile                 | ~12–18           | TRX + país    | Reforzar "Chile"/"Santiago".                                 |
| clase de trx              | 4–13             | TRX clases    | Quick win.                                                   |
| clases de trx             | 4–13             | TRX clases    | Quick win.                                                   |
| entrenamiento trx         | 4–13             | TRX genérico  | Quick win.                                                   |
| trx coach                 | 4–13             | TRX + persona | Quick win: enlazar a Sobre mí (Nico, coach TRX certificado). |

**Cluster ausente y clave:** "entrenador personal santiago" y términos genéricos de personal
trainer tienen **~0 impresiones**. No hay demanda; no orientar contenido a ellos.

### Clusters de consultas

1. **TRX genérico** (`trx`, `gimnasio trx`, `entrenamiento trx`): volumen alto, alta competencia. Capturar con long-tail local.
2. **TRX + clases** (`clases de trx`, `clase de trx`, `trx clases`): intención clara de clases; nuestro núcleo.
3. **TRX + local** (`trx cerca de mi`, `clases de trx cerca de mi`, `trx chile`): intención local fuerte → SEO local + móvil.
4. **Marca** (`trx concept`): debe rankear #1 sin discusión.
5. **TRX + persona** (`trx coach`): oportunidad de conectar con Sobre mí / Nico.

---

## Quick wins (posiciones 4–13 empujables)

Consultas ya cerca de la primera página; pequeñas mejoras de título, H1, contenido y enlazado
pueden subirlas: **`trx concept`, `clase de trx`, `clases de trx`, `trx coach`,
`entrenamiento trx`, `gimnasio trx`.**

Acciones:

- Poner "clases de TRX" y "Santiago" en title y H1 de Home y Servicios.
- Asegurar que la marca "TRX Concept" rankee #1 (title, H1, schema Organization/LocalBusiness).
- Enlazar `trx coach` hacia Sobre mí con ancla "coach/entrenador TRX certificado".

---

## Takeaways para el rediseño

1. **Móvil primero.** El móvil trae más impresiones y el doble de CTR. CTA de WhatsApp sticky y diseño mobile-first.
2. **Arreglar `/servicios/`.** 50 impresiones, 0 clics, posición ~49: reescribir title y H1 con "Clases de TRX a domicilio en Santiago", mejorar relevancia y meta description (ver `seo-content-plan.md`).
3. **No soltar "TRX".** Es el ancla de toda la demanda; anclas primarias: TRX, clases de TRX, Santiago, a domicilio, cerca de mí.
4. **SEO local.** Reforzar "Santiago", "cerca de ti", "a domicilio", sectores oriente/centro; schema LocalBusiness.
5. **Ignorar "entrenador personal" genérico.** Cero demanda; no invertir ahí.
6. **La Home ya funciona como entrada.** Mantener su fuerza y usarla para distribuir enlaces internos a Servicios, Sobre mí y FAQ.
7. **Aprovechar la marca.** `trx concept` es tráfico de intención alta: cuidar que la experiencia de aterrizaje convierta a WhatsApp.
