"use client";

import { motion } from "framer-motion";
import { Star, Car, Bike, MapPin, Shield, Clock, Phone, CheckCircle, Users, Heart, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-l from-fuchsia-600/15 to-purple-600/15 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400">
                A Propos de H12
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight"
            >
              Votre Route{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                Commence Ici
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/60 leading-relaxed mb-8"
            >
              Notre mission est simple : vous offrir un service de location fiable,
              transparent et flexible, adapte aussi bien aux touristes qu&apos;aux residents.
              Chez H12, chaque client est accueilli avec le sourire, ecoute avec attention,
              et servi avec professionnalisme.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl sm:text-3xl font-black text-white tracking-tighter">{stat.value}</span>
                    {stat.hasStar && (
                      <Star className="w-4 h-4 text-purple-400 fill-purple-400 ml-0.5" />
                    )}
                  </div>
                  <div className="text-xs text-white/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24">
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
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-fuchsia-600/10 to-purple-600/20 blur-[60px] rounded-full" />
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10">
                <Image
                  src="/h12_hero.png"
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
              <p className="text-purple-400/80 text-sm font-medium tracking-[0.15em] uppercase mb-4">
                Notre Engagement
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Une Entreprise Locale,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                  Dynamique et de Confiance
                </span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Nous proposons une flotte de vehicules economiques et confortables,
                livres gratuitement a l&apos;aeroport ou en centre-ville, avec assurance
                incluse et possibilite de location sans caution (sous conditions).
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Nous organisons egalement des excursions sur devis pour vous faire
                decouvrir les merveilles du Maroc. Faites le choix de la tranquillite
                pour vos deplacements et aventures a Marrakech.
              </p>

              {/* Feature List */}
              <div className="space-y-3">
                {["Reservation simple par WhatsApp ou en ligne", "Aucun frais cache", "Service personnalise"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-purple-400/80 text-sm font-medium tracking-[0.15em] uppercase mb-4">
              Nos Services
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Tout Pour Vos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
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
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-white/60">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-purple-400/80 text-sm font-medium tracking-[0.15em] uppercase mb-4">
              Pourquoi Nous Choisir
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              L&apos;Excellence{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
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
                className="text-center p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10"
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-fuchsia-600/20 to-purple-600/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_100%)]" />

            <div className="relative p-8 sm:p-12 lg:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Pret a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                  Commencer ?
                </span>
              </h2>
              <p className="text-lg text-white/60 max-w-xl mx-auto mb-8">
                Contactez-nous des maintenant et decouvrez pourquoi H12 est le choix prefere des voyageurs a Marrakech.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/voiture"
                  className="px-8 py-4 rounded-full bg-white text-black font-semibold flex items-center gap-2 hover:bg-white/90 transition"
                >
                  Voir nos vehicules
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold flex items-center gap-2 hover:bg-white/20 transition"
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
