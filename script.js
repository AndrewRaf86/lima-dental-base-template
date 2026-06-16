const data = window.CLINIC_DATA || {};

const getValue = (key) => data[key] || "";
const encode = (value) => encodeURIComponent(value);
const clinicName = getValue("CLINIC_NAME") || "Clínica Dental Demo Lima";
const district = getValue("CLINIC_DISTRICT") || "Santiago de Surco";
const city = getValue("CLINIC_CITY") || "Lima";
const whatsappNumber = getValue("WHATSAPP_NUMBER") || "51999999999";

const whatsappUrl = (message) => `https://wa.me/${whatsappNumber}?text=${encode(message)}`;
const mainMessage = `Hola ${clinicName}, quisiera coordinar una evaluación dental.`;

document.documentElement.style.setProperty("--accent", getValue("BRAND_ACCENT_COLOR") || "#197d86");

document.querySelectorAll("[data-field]").forEach((element) => {
  const key = element.dataset.field;
  if (getValue(key)) element.textContent = getValue(key);
});

document.querySelectorAll("[data-whatsapp='main']").forEach((link) => {
  link.href = whatsappUrl(mainMessage);
});

document.querySelectorAll(".service-card").forEach((card) => {
  const serviceName = card.dataset.service || card.querySelector("h3")?.textContent.trim();
  const link = card.querySelector("a");
  if (link && serviceName) {
    link.href = whatsappUrl(`Hola ${clinicName}, quisiera información sobre ${serviceName}.`);
  }
});

document.querySelectorAll("[data-link='GOOGLE_MAPS_LINK']").forEach((link) => {
  const mapsLink = getValue("GOOGLE_MAPS_LINK");
  if (mapsLink) link.href = mapsLink;
});

document.querySelectorAll("[data-social]").forEach((link) => {
  const url = getValue(link.dataset.social);
  if (url) {
    link.href = url;
    link.hidden = false;
  }
});

const title = `Dentista en ${district} | ${clinicName} | Citas por WhatsApp`;
const description = `${clinicName} cuenta con ${getValue("GOOGLE_RATING") || "4.9"}★ y ${getValue("GOOGLE_REVIEW_COUNT") || "100"} reseñas en Google. Coordina una evaluación dental por WhatsApp en ${district}, ${city}.`;
document.title = title;
document.querySelector("meta[name='description']")?.setAttribute("content", description);
document.querySelector("meta[property='og:title']")?.setAttribute("content", `Dentista en ${district} | ${clinicName}`);
document.querySelector("meta[property='og:description']")?.setAttribute("content", description);
document.querySelector("meta[property='og:site_name']")?.setAttribute("content", clinicName);
document.querySelector("meta[name='twitter:title']")?.setAttribute("content", `Dentista en ${district} | ${clinicName}`);
document.querySelector("meta[name='twitter:description']")?.setAttribute("content", description);
document.querySelector("link[rel='canonical']")?.setAttribute("href", getValue("CANONICAL_URL") || "https://lima-dental-base-template.vercel.app/");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${getValue("CANONICAL_URL") || "https://lima-dental-base-template.vercel.app/"}#dentist`,
  name: clinicName,
  description: `Clínica dental en ${district}, ${city}. Página demo preparada por Lima Systems Lab.`,
  url: getValue("CANONICAL_URL") || "https://lima-dental-base-template.vercel.app/",
  telephone: getValue("CLINIC_PHONE"),
  address: {
    "@type": "PostalAddress",
    streetAddress: getValue("CLINIC_ADDRESS"),
    addressLocality: district,
    addressRegion: city,
    addressCountry: "PE"
  },
  areaServed: [district, city],
  medicalSpecialty: "Dentistry",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: getValue("GOOGLE_RATING") || "4.9",
    reviewCount: getValue("GOOGLE_REVIEW_COUNT") || "100"
  }
};

const sameAs = [getValue("INSTAGRAM_LINK"), getValue("FACEBOOK_LINK")].filter(Boolean);
if (sameAs.length) structuredData.sameAs = sameAs;

const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...document.querySelectorAll(".faq-list details")].map((detail) => ({
    "@type": "Question",
    name: detail.querySelector("summary")?.textContent.trim(),
    acceptedAnswer: {
      "@type": "Answer",
      text: detail.querySelector("p")?.textContent.trim()
    }
  }))
};

for (const payload of [structuredData, faqData]) {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(payload);
  document.head.appendChild(script);
}

const revealItems = document.querySelectorAll(".reveal");
const stickyWhatsapp = document.querySelector(".sticky-whatsapp");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => {
    item.classList.add("can-reveal");
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll("details[open]").forEach((openDetail) => {
      if (openDetail !== detail) openDetail.removeAttribute("open");
    });
  });
});

const updateStickyWhatsapp = () => {
  if (!stickyWhatsapp) return;
  stickyWhatsapp.classList.toggle("is-active", window.scrollY > 560);
};

updateStickyWhatsapp();
window.addEventListener("scroll", updateStickyWhatsapp, { passive: true });
