"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Star, Sparkles, Shield, Clock, MapPin, Headphones, CheckCircle2, Car, Compass, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MousePushCard from "@/components/MousePushCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import Script from "next/script";

const services = [
  {
    title: "Location Voiture",
    description: "Large choix de véhicules premium avec kilométrage illimité",
    icon: Car,
    href: "/voiture"
  },
  {
    title: "Location Moto",
    description: "Motos et scooters pour explorer Marrakech en toute liberté",
    icon: Compass,
    href: "/moto"
  },
  {
    title: "Excursions",
    description: "Découvrez le Maroc avec nos circuits organisés",
    icon: MapPin,
    href: "/excursions"
  },
  {
    title: "Service Transfer",
    description: "Transfert aéroport et déplacements en toute sérénité",
    icon: Clock,
    href: "/transfer"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "H12 Car",
  description: "Location de voiture, moto et excursions à Marrakech. Kilométrage illimité, assurance incluse, livraison à l'hôtel ou à l'aéroport Menara.",
  url: "https://h12car.com",
  telephone: "+212614968594",
  email: "K0664676267@gmail.com",
  priceRange: "400-800 MAD/jour",
  image: "https://h12car.com/h12carlogo.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Marrakech",
    addressCountry: "MA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 31.6295,
    longitude: -7.9811,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "2000",
  },
  sameAs: ["https://wa.me/212614968594"],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://h12car.com",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Le kilométrage est-il vraiment illimité avec H12 Car?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, tous nos véhicules sont disponibles avec kilométrage illimité sans frais supplémentaires. Vous pouvez explorer le Maroc en toute liberté.",
      },
    },
    {
      "@type": "Question",
      name: "Livrez-vous à l'aéroport de Marrakech Menara?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, nous offrons un service de livraison gratuit à l'aéroport Marrakech Menara et à tous les hôtels de Marrakech.",
      },
    },
    {
      "@type": "Question",
      name: "L'assurance est-elle incluse dans le prix?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, une assurance complète est incluse dans tous nos tarifs de location, sans frais cachés.",
      },
    },
  ],
};

export default function HomePage() {

  return (
    <div className="bg-zinc-800 min-h-screen">

      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative pt-24 sm:pt-28 pb-12 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div
            className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl"
            style={{ willChange: 'transform, opacity' }}
          />
          <div
            className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-sky-500/20 blur-3xl"
            style={{ willChange: 'transform, opacity' }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="lg:hidden text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold text-blue-400">
                  Premium Rental
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight lg:hidden"
            >
              Location de Voiture à Marrakech —
              <br />
              <span className="text-blue-500">
                Kilométrage Illimité
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mb-6"
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                <Image
                  src="/h12_hero_new.webp"
                  alt="Location de voiture premium à Marrakech avec H12 Car - Kilométrage illimité et livraison incluse"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover scale-[1.12]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-6 max-w-md mx-auto"
            >
              Découvrez la liberté de la route avec H12. Kilométrage illimité, service multilingue, expérience sans compromis.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              {[
                { value: '2000', suffix: '+', label: 'Clients' },
                { value: '25', suffix: '+', label: 'Véhicules' },
                { value: '4.9', label: 'Note', hasStar: true }
              ].map((stat, idx) => (
                <div key={idx} className="min-w-[85px] px-4 py-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700/50 backdrop-blur-sm">
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="text-xl sm:text-2xl font-black text-white tabular-nums">{stat.value}</span>
                    {stat.suffix && <span className="text-sm font-bold text-blue-400">{stat.suffix}</span>}
                    {stat.hasStar && <Star className="w-3.5 h-3.5 text-blue-400 fill-blue-400 ml-0.5" />}
                  </div>
                  <div className="text-[10px] text-zinc-500 text-center mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <Link href="/voiture">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 rounded-full bg-blue-500 text-white text-[15px] font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 lg:hover:bg-blue-600 transition-all duration-300 w-full sm:w-auto mx-auto"
                aria-label="Réserver une voiture à Marrakech"
              >
                <span className="relative z-10">Réserver Maintenant</span>
                <ArrowRight className="w-4 h-4 relative z-10 lg:group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>
          </div>

          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold text-blue-400">
                  Premium Rental Service
                </span>
              </div>

              <h1 className="text-5xl xl:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                Location de Voiture
                <br />
                à <span className="text-blue-500">Marrakech</span>
              </h1>

              <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl">
                Découvrez la liberté de la route avec H12 Car. Service premium de location avec kilométrage illimité, assurance complète et livraison gratuite à l'<a href="https://en.wikipedia.org/wiki/Marrakesh_Menara_Airport" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">aéroport Menara</a> ou votre hôtel.
              </p>

              <div className="flex items-center gap-4 mb-10">
                {[
                  { value: '2000', suffix: '+', label: 'Clients Satisfaits' },
                  { value: '25', suffix: '+', label: 'Véhicules Premium' },
                  { value: '4.9', label: 'Note Moyenne', hasStar: true }
                ].map((stat, idx) => (
                  <div key={idx} className="px-5 py-3 rounded-xl bg-zinc-800/80 border border-zinc-700/50 backdrop-blur-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-black text-white tabular-nums">{stat.value}</span>
                      {stat.suffix && <span className="text-base font-bold text-blue-400">{stat.suffix}</span>}
                      {stat.hasStar && <Star className="w-4 h-4 text-blue-400 fill-blue-400 ml-1" />}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Link href="/voiture">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-4 rounded-full bg-blue-500 text-white text-[15px] font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 lg:hover:bg-blue-600 transition-all duration-300"
                    aria-label="Louer une voiture à Marrakech"
                  >
                    <span className="relative z-10">Louer une Voiture</span>
                    <ArrowRight className="w-4 h-4 relative z-10 lg:group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </Link>

                <Link href="/moto">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-4 rounded-full bg-zinc-800 border border-zinc-700 text-[15px] font-semibold text-zinc-300 flex items-center gap-2 lg:hover:border-zinc-600 lg:hover:bg-zinc-700 lg:hover:text-white transition-all duration-300"
                    aria-label="Louer une moto à Marrakech"
                  >
                    Louer une Moto
                    <ArrowRight className="w-4 h-4 lg:group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-blue-500/20 rounded-3xl blur-2xl" />
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                <Image
                  src="/h12_hero_new.webp"
                  alt="Flotte de voitures H12 Car à Marrakech - Location avec kilométrage illimité"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="services" className="relative py-20 lg:py-28 overflow-hidden bg-zinc-900">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
              Nos <span className="text-blue-500">Services</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Explorez <a href="https://www.visitmorocco.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Marrakech et le Maroc</a> avec nos services premium de location et d'excursions
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={cardVariants}>
                <MousePushCard>
                  <Link 
                    href={service.href}
                    className="block h-full"
                    aria-label={`Découvrir ${service.title}`}
                  >
                    <div className="relative h-full p-8 rounded-3xl bg-zinc-800 border border-zinc-700 lg:hover:border-blue-500/40 transition-all duration-300 flex flex-col">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                      
                      <div className="relative z-10 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-4">
                          <service.icon className="w-7 h-7 text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {service.title}
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      <div className="relative z-10 mt-auto">
                        <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm lg:group-hover:gap-3 transition-all duration-300">
                          <span>Explorer</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </MousePushCard>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-zinc-500 text-sm">
              Plus de 2000 clients satisfaits nous font confiance. 
              Consultez les <a href="https://www.tripadvisor.com/Attractions-g293734-Activities-Marrakech" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1">
                meilleures attractions de Marrakech <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 lg:py-28 overflow-hidden bg-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
              Pourquoi Choisir <span className="text-blue-500">H12 Car</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Une expérience de location sans compromis avec des standards européens au Maroc
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Shield,
                title: "Assurance Complète Incluse",
                description: "Tous nos véhicules sont couverts par une assurance complète conforme aux normes de l'ACAPS sans frais supplémentaires",
                link: "https://www.acaps.ma",
                linkText: "En savoir plus sur les normes d'assurance"
              },
              {
                icon: MapPin,
                title: "Livraison Gratuite",
                description: "Service de livraison et récupération gratuit à votre hôtel, riad ou à l'aéroport Marrakech Menara",
                link: "https://en.wikipedia.org/wiki/Marrakesh_Menara_Airport",
                linkText: "Infos aéroport Menara"
              },
              {
                icon: Clock,
                title: "Service 24/7",
                description: "Notre équipe multilingue est disponible 24h/24 et 7j/7 pour vous assister pendant votre location",
              },
              {
                icon: CheckCircle2,
                title: "Kilométrage Illimité",
                description: "Explorez le Maroc sans limites. Aucune restriction de kilométrage sur tous nos véhicules",
              },
              {
                icon: Headphones,
                title: "Support Multilingue",
                description: "Service client en français, anglais, arabe et espagnol pour une communication fluide",
              },
              {
                icon: Car,
                title: "Flotte Récente et Entretenue",
                description: "Véhicules récents régulièrement entretenus selon les standards européens pour votre sécurité",
                link: "https://www.leaseurope.org",
                linkText: "Standards européens de location"
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative p-8 rounded-3xl bg-zinc-900 border border-zinc-700 lg:hover:border-blue-500/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-4 lg:group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                    {feature.description}
                  </p>
                  {feature.link && (
                    <a 
                      href={feature.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-xs inline-flex items-center gap-1 underline"
                    >
                      {feature.linkText} <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 lg:py-28 overflow-hidden bg-zinc-900">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6">
              <Star className="w-4 h-4 text-blue-400 fill-blue-400" />
              <span className="text-sm font-semibold text-blue-400">
                4.9/5 sur 2000+ avis
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
              Ce Que Disent Nos <span className="text-blue-500">Clients</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Des milliers de voyageurs ont fait confiance à H12 Car pour leur location à Marrakech
            </p>
          </motion.div>

          <div className="relative">
            <div className="flex overflow-x-auto gap-6 pb-8 no-scrollbar snap-x snap-mandatory">
              {[...Array(2)].map((_, duplicateIndex) => (
                <div key={duplicateIndex} className="flex gap-6 flex-shrink-0">
                  {[
                    {
                      name: "Sophie Martin",
                      role: "Paris",
                      initials: "SM",
                      review: "Service impeccable! Voiture propre, livraison à l'heure à notre riad. L'équipe parle parfaitement français. Je recommande vivement pour visiter Marrakech.",
                      rating: 5,
                      date: "Il y a 3 jours"
                    },
                    {
                      name: "James Wilson",
                      role: "London",
                      initials: "JW",
                      review: "Best car rental experience in Morocco. Unlimited km, full insurance, and delivered to Menara Airport. Will definitely use again.",
                      rating: 5,
                      date: "Il y a 1 semaine"
                    },
                    {
                      name: "Mohammed Alaoui",
                      role: "Casablanca",
                      initials: "MA",
                      review: "خدمة ممتازة وسيارات نظيفة. الفريق محترف جداً والتواصل سهل. استأجرت منهم عدة مرات ودائماً راضي عن الخدمة.",
                      rating: 5,
                      date: "Il y a 2 semaines"
                    },
                    {
                      name: "Pilar García",
                      role: "Barcelona",
                      initials: "PG",
                      review: "Nos recogieron en el aeropuerto con el coche listo. Muy profesionales y amables. Mejor que las grandes empresas de alquiler.",
                      rating: 5,
                      date: "Il y a 4 jours"
                    },
                    {
                      name: "Karim Idrissi",
                      role: "Rabat",
                      initials: "KI",
                      review: "Deuxième fois que je loue chez H12. Toujours au rendez-vous, véhicules propres et bien entretenus. Rien à dire.",
                      rating: 5,
                      date: "Il y a 1 mois"
                    },
                    {
                      name: "Femke Jansen",
                      role: "Rotterdam",
                      initials: "FJ",
                      review: "Wij hebben een Africa Twin gehuurd voor 3 dagen. Geweldige motor, goede staat. De WhatsApp-communicatie was heel makkelijk.",
                      rating: 5,
                      date: "Il y a 6 jours"
                    },
                  ].map((client, idx) => (
                    <div
                      key={`${duplicateIndex}-${idx}`}
                      className="group relative flex-shrink-0 w-[300px] sm:w-[340px] lg:w-[380px] rounded-2xl sm:rounded-3xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6 lg:hover:border-blue-500/40 transition-all duration-300 lg:hover:shadow-xl lg:hover:shadow-blue-500/5 lg:hover:-translate-y-2"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl" />

                      <div className="relative z-10 flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="absolute -inset-0.5 bg-blue-500 rounded-full blur opacity-0 lg:group-hover:opacity-30 transition-opacity duration-300" />
                            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center lg:group-hover:border-blue-500/50 transition-colors duration-300">
                              <span className="text-blue-400 font-bold text-base sm:text-lg">
                                {client.initials}
                              </span>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold text-base sm:text-lg">{client.name}</h4>
                            <p className="text-zinc-500 text-xs sm:text-sm">{client.role}</p>
                          </div>
                        </div>

                        <span className="text-zinc-600 text-xs">{client.date}</span>
                      </div>

                      <p className="relative z-10 text-zinc-400 text-sm leading-relaxed mb-5 line-clamp-3">
                        {client.review}
                      </p>

                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < client.rating ? "text-blue-400 fill-blue-400" : "text-zinc-700"}`}
                            />
                          ))}
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 lg:group-hover:bg-blue-500/20 lg:group-hover:border-blue-500/30 transition-colors duration-300">
                          <Sparkles className="w-3 h-3 text-blue-400" />
                          <span className="text-xs text-blue-400 font-medium">Vérifié</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 lg:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/voiture">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 rounded-full bg-blue-500 text-white text-[15px] font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 lg:hover:bg-blue-600 transition-all duration-300"
              >
                <span className="relative z-10">Louer une Voiture</span>
                <ArrowRight className="w-4 h-4 relative z-10 lg:group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>

            <Link href="/moto">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 rounded-full bg-zinc-800 border border-zinc-700 text-[15px] font-semibold text-zinc-300 flex items-center gap-2 lg:hover:border-zinc-600 lg:hover:bg-zinc-700 lg:hover:text-white transition-all duration-300"
              >
                Louer une Moto
                <ArrowRight className="w-4 h-4 lg:group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

      </section>

      <section className="relative py-20 lg:pb-20 lg:pt-10 overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-10"
          >
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Prêt à Explorer
                <span className="text-blue-500 ml-3">
                  Marrakech ?
                </span>
              </h2>

              <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Découvrez les <a href="https://whc.unesco.org/en/list/331" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1">sites UNESCO de Marrakech <ExternalLink className="w-3 h-3" /></a> et <a href="https://www.lonelyplanet.com/morocco/marrakesh" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1">planifiez votre séjour <ExternalLink className="w-3 h-3" /></a> avec nos véhicules premium
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={() => {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 rounded-full bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/20 transition-all duration-300 flex items-center gap-3 lg:hover:bg-blue-600"
              >
                <span>Voir nos Services</span>
                <ArrowRight className="w-5 h-5 lg:group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold lg:hover:bg-zinc-700 lg:hover:border-zinc-600 lg:hover:text-white transition-all duration-300"
                >
                  Nous Contacter
                </motion.button>
              </Link>
            </div>

            <div className="pt-8 border-t border-zinc-800">
              <p className="text-zinc-500 text-sm mb-3">
                Liens utiles pour votre voyage au Maroc
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <a href="https://www.visitmorocco.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-blue-400 inline-flex items-center gap-1">
                  Office du Tourisme <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-zinc-700">•</span>
                <a href="https://www.marrakech.travel" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-blue-400 inline-flex items-center gap-1">
                  Guide Marrakech <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-zinc-700">•</span>
                <a href="https://www.weather.com/weather/today/l/Marrakech" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-blue-400 inline-flex items-center gap-1">
                  Météo Marrakech <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-zinc-700">•</span>
                <a href="https://www.booking.com/city/ma/marrakech.html" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-blue-400 inline-flex items-center gap-1">
                  Hôtels Marrakech <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <WhatsAppButton />
    </div>
  );
}