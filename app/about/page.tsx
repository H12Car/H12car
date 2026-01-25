"use client";

import { motion } from "framer-motion";
import { Star, Car, Bike, MapPin, Shield, Clock, Phone, CheckCircle, Users, Heart, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MousePushCard from "@/components/MousePushCard";

const features = [
  {
    icon: Clock,
    title: "Service Rapide",
    description: "Livraison gratuite a l'aeroport ou en centre-ville"
  },
  {
    icon: Shield,
    title: "Assurance Incluse",
    description: "Tous nos vehicules sont assures tous risques"
  },
  {
    icon: Phone,
    title: "Assistance 7j/7",
    description: "Une equipe disponible pour vous accompagner"
  },
  {
    icon: Heart,
    title: "Sans Caution",
    description: "Possibilite de location sans caution (sous conditions)"
  },
];

const stats = [
  { value: "500+", label: "Clients Satisfaits" },
  { value: "15+", label: "Vehicules" },
  { value: "7j/7", label: "Disponibilite" },
  { value: "4.9", label: "Note Moyenne", hasStar: true },
];

const services = [
  {
    icon: Car,
    title: "Location de Voitures",
    description: "Des berlines de luxe aux SUV familiaux, trouvez le vehicule parfait pour vos deplacements."
  },
  {
    icon: Bike,
    title: "Location de Motos",
    description: "Explorez Marrakech en toute liberte avec notre collection de motos et scooters."
  },
  {
    icon: MapPin,
    title: "Excursions",
    description: "Decouvrez les merveilles du Maroc avec nos excursions sur mesure : quad, dromadaire et plus."
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        {/* Subtle Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-blue-100/50 blur-3xl" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 relative z-10">
          {/* Mobile Layout */}
          <div className="lg:hidden text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-blue-600">
                A Propos de H12
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight tracking-tight"
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
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-2xl shadow-blue-300/50 border-4 border-white">
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
              className="text-base sm:text-lg text-gray-500 leading-relaxed mb-6 max-w-md mx-auto"
            >
              Notre mission est simple : vous offrir un service de location fiable,
              transparent et flexible, adapte aussi bien aux touristes qu&apos;aux residents.
            </motion.p>

            {/* Stats - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-8"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="px-4 py-2 rounded-xl bg-white border border-gray-100 shadow-sm text-center">
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="text-xl sm:text-2xl font-black text-gray-900">{stat.value}</span>
                    {stat.hasStar && <Star className="w-3 h-3 text-blue-500 fill-blue-500 ml-0.5" />}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{stat.label}</div>
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
                A Propos de H12
              </motion.p>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.1] tracking-[-0.02em] mb-6"
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
                className="text-lg xl:text-xl text-gray-500 leading-relaxed mb-10 max-w-[520px]"
              >
                Notre mission est simple : vous offrir un service de location fiable,
                transparent et flexible, adapte aussi bien aux touristes qu&apos;aux residents.
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
                  <div key={idx} className="px-5 py-2.5 rounded-xl bg-white border border-gray-100 shadow-sm text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-3xl font-black text-gray-900 tracking-tighter">{stat.value}</span>
                      {stat.hasStar && (
                        <Star className="w-4 h-4 text-blue-500 fill-blue-500 ml-0.5" />
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
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
                    className="group px-7 py-3.5 rounded-full bg-blue-500 text-white text-[15px] font-medium flex items-center gap-2 transition-all hover:bg-blue-600 shadow-lg shadow-blue-500/20"
                  >
                    Voir nos Vehicules
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </motion.button>
                </Link>

                <Link href="/moto">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-7 py-3.5 rounded-full bg-gray-100 border border-gray-200 text-[15px] font-medium text-gray-700 transition-colors hover:bg-gray-200"
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
              <div className="absolute inset-0 bg-blue-200/30 blur-[80px] rounded-full" />

              {/* Image Container */}
              <MousePushCard maxTilt={6} smoothing={0.04} className="relative max-w-[400px] w-full">
                <div className="relative aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl shadow-gray-300/50">
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
                  className="absolute -top-4 -right-4 px-4 py-2.5 rounded-full bg-white flex items-center gap-2 shadow-lg border border-gray-100"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <Star className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">4.9</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
                  className="absolute -bottom-3 -left-3 px-4 py-2.5 rounded-full bg-blue-500 flex items-center gap-2 shadow-lg"
                >
                  <Users className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">500+ Clients</span>
                </motion.div>
              </MousePushCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24 bg-white">
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
              <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full" />
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-gray-200 shadow-lg">
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
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Une Entreprise Locale,{" "}
                <span className="text-blue-500">
                  Dynamique et de Confiance
                </span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Nous proposons une flotte de vehicules economiques et confortables,
                livres gratuitement a l&apos;aeroport ou en centre-ville, avec assurance
                incluse et possibilite de location sans caution (sous conditions).
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Nous organisons egalement des excursions sur devis pour vous faire
                decouvrir les merveilles du Maroc. Faites le choix de la tranquillite
                pour vos deplacements et aventures a Marrakech.
              </p>

              {/* Feature List */}
              <div className="space-y-3">
                {["Reservation simple par WhatsApp ou en ligne", "Aucun frais cache", "Service personnalise"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-blue-500 text-sm font-medium tracking-[0.15em] uppercase mb-4">
              Nos Services
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Tout Pour Vos{" "}
              <span className="text-blue-500">
                Deplacements
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
                <MousePushCard maxTilt={8} smoothing={0.05} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all group h-full">
                  <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-500">{service.description}</p>
                </MousePushCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-blue-500 text-sm font-medium tracking-[0.15em] uppercase mb-4">
              Pourquoi Nous Choisir
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              L&apos;Excellence{" "}
              <span className="text-blue-500">
                a Votre Service
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
                <MousePushCard maxTilt={8} smoothing={0.05} className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 h-full">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </MousePushCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
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
                Pret a{" "}
                <span className="text-white/90">
                  Commencer ?
                </span>
              </h2>
              <p className="text-lg text-white/70 max-w-xl mx-auto mb-8">
                Contactez-nous des maintenant et decouvrez pourquoi H12 est le choix prefere des voyageurs a Marrakech.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/voiture"
                  className="px-8 py-4 rounded-full bg-white text-gray-900 font-semibold flex items-center gap-2 hover:bg-gray-50 transition shadow-lg"
                >
                  Voir nos vehicules
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-full bg-white/20 border border-white/30 text-white font-semibold flex items-center gap-2 hover:bg-white/30 transition"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
