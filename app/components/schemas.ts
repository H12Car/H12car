export const carRentalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  "name": "H12 Car",
  "alternateName": ["Kechstraw", "H12 Car Marrakech"],
  "description": "Location de voiture et moto à Marrakech avec kilométrage illimité. Service premium 24/7, livraison gratuite à l'aéroport Menara et dans tous les hôtels.",
  "url": "https://h12car.com",
  "telephone": "+212614968594",
  "email": "K0664676267@gmail.com",
  "priceRange": "400-800 MAD",
  "image": [
    "https://h12car.com/h12_hero_new.webp",
    "https://h12car.com/h12carlogo.png"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Marrakech",
    "addressRegion": "Marrakech-Safi",
    "addressCountry": "MA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "31.6295",
    "longitude": "-7.9811"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "2000",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://www.facebook.com/h12car",
    "https://www.instagram.com/kechstraw_",
    "https://wa.me/212614968594",
    "https://www.avito.ma/fr/sofia/voitures_de_location/kechstraw_location_de_voiture_Marrakech_56003612.htm",
    "https://www.charika.ma/societe--1068774",
    "https://www.bt-africa.com/en/company/c8fb10448800aa04baa3d088d9603640-kechstraw"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "H12 Car",
  "alternateName": "H12 Car Marrakech",
  "url": "https://h12car.com",
  "description": "Location de voiture et moto à Marrakech",
  "publisher": {
    "@type": "Organization",
    "name": "H12 Car",
    "logo": {
      "@type": "ImageObject",
      "url": "https://h12car.com/h12carlogo.png"
    }
  },
  "inLanguage": ["fr-FR", "en-US", "ar-MA"]
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "H12 Car",
  "alternateName": ["Kechstraw", "H12 Car Marrakech"],
  "url": "https://h12car.com",
  "logo": "https://h12car.com/h12carlogo.png",
  "description": "Service premium de location de voiture et moto à Marrakech",
  "email": "K0664676267@gmail.com",
  "telephone": "+212614968594",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Marrakech",
    "addressRegion": "Marrakech-Safi",
    "addressCountry": "MA"
  },
  "sameAs": [
    "https://www.facebook.com/h12car",
    "https://www.instagram.com/kechstraw_",
    "https://wa.me/212614968594",
    "https://www.avito.ma/fr/sofia/voitures_de_location/kechstraw_location_de_voiture_Marrakech_56003612.htm",
    "https://www.charika.ma/societe--1068774",
    "https://www.bt-africa.com/en/company/c8fb10448800aa04baa3d088d9603640-kechstraw"
  ]
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Location de Voiture",
  "provider": {
    "@type": "AutoRental",
    "name": "H12 Car",
    "url": "https://h12car.com"
  },
  "areaServed": {
    "@type": "City",
    "name": "Marrakech"
  }
};