"use client";

import { motion } from "framer-motion";
import { Star, Car, Bike, MapPin, Shield, Clock, Phone, CheckCircle, Users, Heart, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MousePushCard from "@/components/MousePushCard";
import WhatsAppButton from "@/components/WhatsAppButton";

const features = [
  {
    icon: Clock,
    title: "Service Rapide",
    description: "Livraison gratuite à l'aéroport ou en centre-ville"
  },
  {
    icon: Shield,
    title: "Assurance Incluse",
    description: "Tous nos véhicules sont assurés tous risques"
  },
  {
    icon: Phone,
    title: "Assistance 7j/7",
    description: "Une équipe disponible pour vous accompagner"
  },
  {
    icon: Heart,
    title: "Sans Caution",
    description: "Possibilité de location sans caution (sous conditions)"
  },
];

const stats = [
  { value: "2000+", label: "Clients Satisfaits" },
  { value: "25+", label: "Véhicules" },
  { value: "10+", label: "Ans d'Expérience" },
  { value: "4.9", label: "Note Moyenne", hasStar: true },
];

const services = [
  {
    icon: Car,
    title: "Location de Voitures",
    description: "Des berlines de luxe aux SUV familiaux, trouvez le véhicule parfait pour vos déplacements."
  },
  {
    icon: Bike,
    title: "Location de Motos",
    description: "Explorez Marrakech en toute liberté avec notre collection de motos et scooters."
  },
  {
    icon: MapPin,
    title: "Excursions",
    description: "Découvrez les merveilles du Maroc avec nos excursions sur mesure : quad, dromadaire et plus."
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-800">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-3xl" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 relative z-10">
          {/* Mobile Layout */}
          <div className="lg:hidden text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">
                À Propos de H12
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight"
            >
              Votre Route{" "}
              <span className="text-blue-500">
                Commence Ici
              </span>
            </motion.h1>

            {/* Image Card - Mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mb-6"
            >
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-2xl shadow-black/50 border-4 border-zinc-700">
                <Image
                  src="/h12carlogo.png"
                  alt="H12 Logo"
                  fill
                  priority
                  sizes="192px"
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-6 max-w-md mx-auto"
            >
              Notre mission est simple : vous offrir un service de location fiable,
              transparent et flexible, adapté aussi bien aux touristes qu&apos;aux résidents.
            </motion.p>

            {/* Stats - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-8"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 shadow-sm text-center">
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="text-xl sm:text-2xl font-black text-white">{stat.value}</span>
                    {stat.hasStar && <Star className="w-3 h-3 text-blue-400 fill-blue-400 ml-0.5" />}
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Desktop Layout - Two Column */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
            {/* Left - Content */}
            <div>
              {/* Overline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-blue-500 text-sm font-medium tracking-[0.15em] uppercase mb-5"
              >
                À Propos de H12
              </motion.p>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-5xl xl:text-6xl font-bold text-white leading-[1.1] tracking-[-0.02em] mb-6"
              >
                Votre Route.
                <br />
                <span className="text-blue-500">
                  Commence Ici.
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-lg xl:text-xl text-zinc-400 leading-relaxed mb-10 max-w-[520px]"
              >
                Notre mission est simple : vous offrir un service de location fiable,
                transparent et flexible, adapté aussi bien aux touristes qu&apos;aux résidents.
                Chez H12, chaque client est accueilli avec le sourire.
              </motion.p>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="flex items-center gap-4 mb-10"
              >
                {stats.map((stat, idx) => (
                  <div key={idx} className="px-5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 shadow-sm text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-3xl font-black text-white tracking-tighter">{stat.value}</span>
                      {stat.hasStar && (
                        <Star className="w-4 h-4 text-blue-400 fill-blue-400 ml-0.5" />
                      )}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                className="flex items-center gap-4"
              >
                <Link href="/voiture">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="group px-7 py-3.5 rounded-full bg-blue-500 text-white text-[15px] font-medium flex items-center gap-2 transition-all lg:hover:bg-blue-600 shadow-lg shadow-blue-500/20"
                  >
                    Voir nos Véhicules
                    <ArrowRight className="w-4 h-4 lg:group-hover:translate-x-0.5 transition-transform duration-200" />
                  </motion.button>
                </Link>

                <Link href="/moto">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-7 py-3.5 rounded-full bg-zinc-800 border border-zinc-700 text-[15px] font-medium text-zinc-300 transition-colors lg:hover:bg-zinc-700 lg:hover:text-white"
                  >
                    Voir Nos Motos
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            {/* Right - Image Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative flex justify-center"
            >
              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-blue-500/30 blur-[80px] rounded-full" />

              {/* Image Container */}
              <MousePushCard maxTilt={6} smoothing={0.04} className="relative max-w-[400px] w-full">
                <div className="relative aspect-square rounded-full overflow-hidden border-8 border-zinc-700 shadow-2xl shadow-black/50">
                  <Image
                    src="/h12carlogo.png"
                    alt="H12 Logo"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>

                {/* Floating Icon Pills */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                  className="absolute -top-4 -right-4 px-4 py-2.5 rounded-full bg-zinc-800 flex items-center gap-2 shadow-lg shadow-black/30 border border-zinc-700"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <Star className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                  <span className="text-sm font-medium text-white">4.9</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
                  className="absolute -bottom-3 -left-3 px-4 py-2.5 rounded-full bg-blue-500 flex items-center gap-2 shadow-lg"
                >
                  <Users className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">2000+ Clients</span>
                </motion.div>
              </MousePushCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24 bg-zinc-900">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full" />
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-700 shadow-lg shadow-black/30">
                <Image
                  src="/h12_hero_new.webp"
                  alt="H12 Premium Fleet"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-blue-500 text-sm font-medium tracking-[0.15em] uppercase mb-4">
                Notre Engagement
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Une Entreprise Locale,{" "}
                <span className="text-blue-500">
                  Dynamique et de Confiance
                </span>
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Nous proposons une flotte de véhicules économiques et confortables,
                livrés gratuitement à l&apos;aéroport ou en centre-ville, avec assurance
                incluse et possibilité de location sans caution (sous conditions).
              </p>
              <p className="text-zinc-400 leading-relaxed mb-8">
                Nous organisons également des excursions sur devis pour vous faire
                découvrir les merveilles du Maroc. Faites le choix de la tranquillité
                pour vos déplacements et aventures à Marrakech.
              </p>

              {/* Feature List */}
              <div className="space-y-3">
                {["Réservation simple par WhatsApp ou en ligne", "Aucun frais caché", "Service personnalisé"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-blue-400 text-sm font-medium tracking-[0.15em] uppercase mb-4">
              Nos Services
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Tout Pour Vos{" "}
              <span className="text-blue-500">
                Déplacements
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <MousePushCard maxTilt={8} smoothing={0.05} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-700 shadow-sm lg:hover:border-blue-500/30 lg:hover:shadow-md transition-all group h-full">
                  <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center mb-4 lg:group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-zinc-400">{service.description}</p>
                </MousePushCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-zinc-900">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-blue-400 text-sm font-medium tracking-[0.15em] uppercase mb-4">
              Pourquoi Nous Choisir
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              L&apos;Excellence{" "}
              <span className="text-blue-500">
                à Votre Service
              </span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <MousePushCard maxTilt={8} smoothing={0.05} className="text-center p-6 rounded-2xl bg-zinc-800 border border-zinc-700 h-full">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-zinc-400">{feature.description}</p>
                </MousePushCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600" />

            <div className="relative p-8 sm:p-12 lg:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Prêt à{" "}
                <span className="text-white/90">
                  Commencer ?
                </span>
              </h2>
              <p className="text-lg text-white/70 max-w-xl mx-auto mb-8">
                Contactez-nous dès maintenant et découvrez pourquoi H12 est le choix préféré des voyageurs à Marrakech.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/voiture"
                  className="px-8 py-4 rounded-full bg-white text-gray-900 font-semibold flex items-center gap-2 lg:hover:bg-gray-50 transition shadow-lg"
                >
                  Voir nos véhicules
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-full bg-white/20 border border-white/30 text-white font-semibold flex items-center gap-2 lg:hover:bg-white/30 transition"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <WhatsAppButton />
    </div>
  );
}
