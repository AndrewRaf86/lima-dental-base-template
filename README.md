# Lima Dental Base Template

Template estático de Lima Systems Lab para crear landing pages SEO en español para clínicas dentales de Lima, con foco en búsquedas de Google y reservas por WhatsApp.

## Cómo personalizar

Edita `clinic-data.js` y reemplaza:

- `CLINIC_NAME`
- `CLINIC_DISTRICT`
- `CLINIC_CITY`
- `CLINIC_ADDRESS`
- `CLINIC_PHONE`
- `WHATSAPP_NUMBER`
- `WHATSAPP_LINK`
- `GOOGLE_MAPS_LINK`
- `GOOGLE_RATING`
- `GOOGLE_REVIEW_COUNT`
- `INSTAGRAM_LINK`
- `FACEBOOK_LINK`
- `PRIMARY_SERVICE`
- `SECONDARY_SERVICES`
- `REVIEW_THEMES`
- `TOURIST_OR_ENGLISH_NOTE`
- `DEMO_NOTICE`
- `BRAND_ACCENT_COLOR`
- `CANONICAL_URL`

Los valores demo usan `Clínica Dental Demo Lima`, `Santiago de Surco`, `+51 999 999 999`, rating `4.9` y `100` reseñas. No representan una clínica real.

## WhatsApp

Actualiza `WHATSAPP_NUMBER` con el formato internacional sin `+`, espacios ni guiones. Ejemplo:

```js
WHATSAPP_NUMBER: "51999999999"
```

El sitio genera automáticamente:

- Mensaje principal: `Hola [CLINIC_NAME], quisiera coordinar una evaluación dental.`
- Mensajes por servicio: `Hola [CLINIC_NAME], quisiera información sobre [SERVICE_NAME].`

## Google Maps

Reemplaza `GOOGLE_MAPS_LINK` por el enlace público correcto de Google Maps o Google Business Profile. Verifica que abra la ubicación exacta antes de publicar.

## SEO

Actualiza en `clinic-data.js`:

- `CANONICAL_URL`
- nombre de clínica
- distrito
- ciudad
- rating y cantidad de reseñas solo si son datos públicos confirmados

El JavaScript actualiza title, meta description, Open Graph, Twitter/X tags, Dentist JSON-LD y FAQ JSON-LD. Para máxima indexación en proyectos finales, también conviene reflejar los datos principales directamente en `index.html` antes de desplegar.

## Imágenes

La carpeta `assets/images/` está preparada para fotos reales autorizadas. El HTML contiene comentarios indicando dónde reemplazar:

- hero clinic photo
- team photo
- clinic interior
- building/entrance
- treatment image

No uses fotos que sugieran falsamente que pertenecen a la clínica.

## Despliegue en Vercel

Este proyecto no necesita build.

```bash
vercel deploy --prod
```

Si cambias el dominio final, actualiza:

- `CANONICAL_URL` en `clinic-data.js`
- `robots.txt`
- `sitemap.xml`
- canonical y Open Graph URL en `index.html`

## Revisión antes de publicar

- Confirmar servicios reales.
- Confirmar reseñas y rating.
- Confirmar dirección, teléfono y WhatsApp.
- Confirmar métodos de pago antes de mencionarlos.
- Confirmar si atienden visitantes o en inglés.
- Reemplazar o eliminar el aviso demo solo con aprobación del negocio.
