"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Star, Sparkles, Shield, Clock, MapPin, Headphones, CheckCircle2, Car, Compass } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/types/home_service";
import MousePushCard from "@/components/MousePushCard";
import WhatsAppButton from "@/components/WhatsAppButton";

// Animation variants moved outside component for better performance
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

export default function HomePage() {

  return (
    <div className="bg-zinc-800 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 pb-12 lg:pt-40 lg:pb-20 overflow-hidden">
        {/* Subtle Background Elements */}
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
          {/* Mobile Layout */}
          <div className="lg:hidden text-center">
            {/* Badge */}
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

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight tracking-tight"
            >
              Votre voyage.
              <br />
              <span className="text-blue-500">
                Notre Passion.
              </span>
            </motion.h1>

            {/* Image Card - Mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mb-6"
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                <Image
                  src="/h12_hero_new.webp"
                  alt="H12 Premium Car"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover scale-[1.12]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-6 max-w-md mx-auto"
            >
              Découvrez la liberté de la route avec H12. Kilométrage illimité, service multilingue, expérience sans compromis.
            </motion.p>

            {/* Stats - Mobile */}
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

            {/* CTA Button - Mobile */}
            <Link href="/voiture">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileTap={{ scale: 0.98 }}
                className="mx-auto px-7 py-3.5 rounded-full bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 flex items-center gap-2 lg:hover:bg-blue-600 transition-all"
              >
                Réserver maintenant
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>

          {/* Desktop Layout - Apple Style Two Column */}
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
                Location Premium à Marrakech
              </motion.p>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-5xl xl:text-6xl font-bold text-white leading-[1.1] tracking-[-0.02em] mb-6"
              >
                Votre voyage.
                <br />
                <span className="text-blue-500">
                  Notre Passion.
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-lg xl:text-xl text-zinc-400 leading-relaxed mb-10 max-w-[520px]"
              >
                Découvrez la liberté de la route avec H12. Kilométrage illimité,
                service multilingue, expérience sans compromis.
              </motion.p>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="flex items-center gap-4 mb-10"
              >
                {[
                  { value: '2000', suffix: '+', label: 'Clients' },
                  { value: '25', suffix: '+', label: 'Véhicules' },
                  { value: '4.9', label: 'Note', hasStar: true }
                ].map((stat, idx) => (
                  <div key={idx} className="min-w-[100px] px-5 py-3 rounded-xl bg-zinc-800/80 border border-zinc-700/50 backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-2xl xl:text-3xl font-black text-white tabular-nums">{stat.value}</span>
                      {stat.suffix && <span className="text-lg font-bold text-blue-400">{stat.suffix}</span>}
                      {stat.hasStar && (
                        <Star className="w-4 h-4 text-blue-400 fill-blue-400 ml-0.5" />
                      )}
                    </div>
                    <div className="text-xs text-zinc-500 text-center mt-1.5 font-medium">{stat.label}</div>
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
                  Réserver maintenant
                  <ArrowRight className="w-4 h-4 lg:group-hover:translate-x-0.5 transition-transform duration-200" />
                </motion.button>
              </Link>

                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-7 py-3.5 rounded-full bg-zinc-800 border border-zinc-700 text-[15px] font-medium text-zinc-300 transition-colors lg:hover:bg-zinc-700 lg:hover:text-white"
                  >
                    En savoir plus
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
              {/* Ambient Glow - subtle blue */}
              <div className="absolute inset-0 bg-blue-500/30 blur-[80px] rounded-full" />

              {/* Image Container */}
              <MousePushCard maxTilt={6} smoothing={0.04} className="relative max-w-[466px] w-full">
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-zinc-700 shadow-2xl shadow-black/50">
                  <Image
                    src="/h12_hero_new.webp"
                    alt="H12 Premium Vehicle"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 466px"
                    className="object-cover scale-[1.12]"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
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
                  className="absolute -bottom-3 -left-3 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold text-lg">H</span>
                </motion.div>
              </MousePushCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service section */}
      <section id="services" className="relative py-20 lg:pb-20 lg:pt-10 overflow-hidden bg-zinc-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-3xl"
          style={{ willChange: 'transform, opacity' }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6">
            <Star className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
              Nos Services
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            L&apos;Excellence dans chaque
            <br />
            <span className="text-blue-500">
              Détail
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
            Des expériences sur mesure conçues avec précision et élégance
          </p>
        </motion.div>

        {/* Services Grid - Clean Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {services.map((service, index) => {
            const tags = ['01', '02', '03', '04'];
            const ctaLabels: Record<string, string> = {
              car: 'Louer une Voiture',
              motorbike: 'Louer une Moto',
              excursion: 'Trouver une Excursion',
              transfer: 'Voir les Tarifs'
            };
            const cardImages = ['/voiture_h12/h12_car_new.webp', '/moto_h12/h12_moto_new.webp', '/excursions/h12_excursion_new.webp', '/voiture_h12/h12_transporttouristicmerco.png'];

            // Per-card image styles to account for different source images
            const cardImageStyles = [
              // Car: studio shot, bright subject — default styling works
              'object-cover scale-[1.12] opacity-70 lg:group-hover:opacity-90 lg:group-hover:scale-[1.15] transition-all duration-700',
              // Moto: very dark studio shot — boost brightness so the bike is visible
              'object-cover scale-[1.12] opacity-90 brightness-125 lg:group-hover:opacity-100 lg:group-hover:scale-[1.15] transition-all duration-700',
              // Excursion: bright outdoor photo — lower opacity, position on rider
              'object-cover object-center scale-[1.2] opacity-60 lg:group-hover:opacity-75 lg:group-hover:scale-[1.25] transition-all duration-700',
              // Transfer: studio shot — default styling works
              'object-cover scale-[1.12] opacity-70 lg:group-hover:opacity-90 lg:group-hover:scale-[1.15] transition-all duration-700',
            ];

            // Per-card gradient overlays
            const cardGradients = [
              'bg-gradient-to-t from-black via-black/50 to-black/20',
              'bg-gradient-to-t from-black via-black/40 to-black/10',
              'bg-gradient-to-t from-black via-black/60 to-black/30',
              'bg-gradient-to-t from-black via-black/50 to-black/20',
            ];

            const CardContent = (
              <div className="relative bg-gray-900 rounded-[20px] sm:rounded-[24px] overflow-hidden h-[300px] sm:h-[350px] lg:h-[400px] lg:hover:scale-[1.02] lg:hover:shadow-2xl transition-all duration-500 shadow-xl">
                {/* Image */}
                <Image
                  src={cardImages[index]}
                  alt={service.title}
                  fill
                  className={cardImageStyles[index]}
                />

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 ${cardGradients[index]}`} />

                {/* Number Tag - Top Left */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center">
                    <span className="text-[11px] sm:text-[12px] font-bold text-white/80">{tags[index]}</span>
                  </div>
                </div>

                {/* Accent line at top - blue */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-1 bg-blue-500 rounded-b-full" />

                {/* Content Card - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-3.5 border border-white/10 lg:group-hover:bg-white/15 lg:group-hover:border-white/20 transition-all duration-500">
                    <h3 className="text-[15px] sm:text-[17px] font-bold text-white mb-1">
                      {service.title}
                    </h3>
                    <p className="text-[11px] sm:text-[12px] text-white/60 leading-relaxed line-clamp-2 mb-2.5">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] sm:text-[12px] font-semibold text-blue-400 tracking-wide">
                        {ctaLabels[service.serviceType]}
                      </span>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center lg:group-hover:scale-110 transition-transform duration-300">
                        <ArrowRight size={12} className="sm:w-[14px] sm:h-[14px] text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );

            // Link each service card to its respective page
            const serviceLinks: Record<string, string> = {
              car: '/voiture',
              motorbike: '/moto',
              excursion: '/excursion',
              transfer: '/transfer'
            };

            return (
              <motion.div key={index} variants={cardVariants} className="group">
                <MousePushCard as="a" href={serviceLinks[service.serviceType]} maxTilt={10} smoothing={0.05}>
                  {CardContent}
                </MousePushCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>

      {/* Why H12 Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-zinc-900">
        {/* Background Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                Pourquoi H12
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              La Confiance <br className="hidden sm:block" />
              <span className="text-blue-500">Avant Tout</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Des services premium pensés pour votre tranquillité
            </p>
          </motion.div>

          {/* Features Grid - Service Card Style */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {[
              {
                icon: Car,
                title: "Kilométrage Illimité",
                description: "Roulez sans compter, sans frais cachés",
                image: "/excursions/h12_quad.png",
                tag: "01",
                cta: "Voir nos Voitures",
                href: "/voiture"
              },
              {
                icon: Shield,
                title: "Assurance Incluse",
                description: "Tous risques pour votre tranquillité",
                image: "/h12_hero_new.webp",
                tag: "02",
                cta: "En savoir plus",
                href: "/about"
              },
              {
                icon: MapPin,
                title: "Livraison Gratuite",
                description: "À l'aéroport ou à votre hôtel",
                image: "/excursions/h12_quad.png",
                tag: "03",
                cta: "Nous Contacter",
                href: "/contact"
              },
              {
                icon: Headphones,
                title: "Support 24/7",
                description: "Une équipe à votre écoute",
                image: "/h12_hero_new.webp",
                tag: "04",
                cta: "Nous Contacter",
                href: "/contact"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group"
              >
                <Link href={feature.href}>
                <div className="relative bg-zinc-900 rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] overflow-hidden h-[220px] sm:h-[260px] lg:h-[320px] lg:hover:scale-[1.02] lg:hover:shadow-2xl transition-all duration-500 shadow-xl border border-zinc-800 lg:hover:border-blue-500/30">
                  {/* Image */}
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover scale-[1.15] opacity-50 lg:group-hover:opacity-70 lg:group-hover:scale-[1.2] transition-all duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

                  {/* Number Tag - Top Left */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center">
                      <span className="text-[10px] sm:text-[11px] font-bold text-white/80">{feature.tag}</span>
                    </div>
                  </div>

                  {/* Accent line at top - blue */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-1 bg-blue-500 rounded-b-full" />

                  {/* Content Card - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 lg:p-4">
                    <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-3.5 border border-white/10 lg:group-hover:bg-white/15 lg:group-hover:border-white/20 transition-all duration-500">
                      {/* Icon */}
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 flex items-center justify-center mb-2 sm:mb-2.5 lg:group-hover:bg-blue-500/30 transition-colors duration-300">
                        <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                      </div>

                      <h3 className="text-[13px] sm:text-[15px] lg:text-[16px] font-bold text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-[11px] sm:text-[12px] text-white/60 leading-relaxed line-clamp-2 mb-2.5">
                        {feature.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-[11px] font-semibold text-blue-400 tracking-wide">
                          {feature.cta}
                        </span>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-500 rounded-full flex items-center justify-center lg:group-hover:scale-110 transition-transform duration-300">
                          <ArrowRight size={10} className="sm:w-[12px] sm:h-[12px] text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-zinc-800">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/5 blur-3xl" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                Comment ça marche
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Simple. Rapide. <br className="hidden sm:block" />
              <span className="text-blue-500">Efficace.</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Trois étapes pour votre prochaine aventure
            </p>
          </motion.div>

          {/* Steps - Same card style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {[
              {
                step: "01",
                title: "Choisissez",
                description: "Parcourez notre flotte premium et sélectionnez le véhicule idéal.",
                icon: Car,
                cta: "Voir la Flotte",
                href: "/voiture"
              },
              {
                step: "02",
                title: "Réservez",
                description: "Réservation en ligne simple. Confirmez vos dates et lieu de livraison.",
                icon: Clock,
                cta: "Réserver maintenant",
                href: "/voiture"
              },
              {
                step: "03",
                title: "Profitez",
                description: "Recevez votre véhicule et partez à la découverte de Marrakech.",
                icon: Compass,
                cta: "Nos Excursions",
                href: "/excursion"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group"
              >
                <Link href={item.href}>
                <div className="relative bg-zinc-900 rounded-[20px] sm:rounded-[24px] overflow-hidden h-[280px] sm:h-[320px] lg:h-[380px] lg:hover:scale-[1.02] lg:hover:shadow-2xl transition-all duration-500 shadow-xl border border-zinc-800 lg:hover:border-blue-500/30">
                  {/* Abstract SVG Background Pattern */}
                  <div className="absolute inset-0 opacity-40 lg:group-hover:opacity-60 transition-opacity duration-500">
                    {idx === 0 && (
                      <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="200" cy="200" r="150" stroke="url(#grad1)" strokeWidth="2" strokeDasharray="10 5" className="animate-[spin_30s_linear_infinite]" />
                        <circle cx="200" cy="200" r="100" stroke="url(#grad1)" strokeWidth="1.5" strokeDasharray="8 4" className="animate-[spin_25s_linear_infinite_reverse]" />
                        <circle cx="200" cy="200" r="50" fill="url(#grad1)" fillOpacity="0.15" />
                        <path d="M120 200 L200 120 L280 200 L200 280 Z" stroke="url(#grad1)" strokeWidth="1.5" fill="none" />
                        <defs>
                          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#60A5FA" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                    {idx === 1 && (
                      <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="100" y="100" width="200" height="200" rx="20" stroke="url(#grad2)" strokeWidth="2" strokeDasharray="15 5" className="animate-pulse" />
                        <rect x="140" y="140" width="120" height="120" rx="10" stroke="url(#grad2)" strokeWidth="1.5" fill="url(#grad2)" fillOpacity="0.08" />
                        <line x1="50" y1="200" x2="150" y2="200" stroke="url(#grad2)" strokeWidth="1.5" />
                        <line x1="250" y1="200" x2="350" y2="200" stroke="url(#grad2)" strokeWidth="1.5" />
                        <line x1="200" y1="50" x2="200" y2="150" stroke="url(#grad2)" strokeWidth="1.5" />
                        <line x1="200" y1="250" x2="200" y2="350" stroke="url(#grad2)" strokeWidth="1.5" />
                        <defs>
                          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#60A5FA" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                    {idx === 2 && (
                      <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M200 50 L350 150 L350 300 L200 350 L50 300 L50 150 Z" stroke="url(#grad3)" strokeWidth="2" fill="url(#grad3)" fillOpacity="0.08" />
                        <path d="M200 100 L300 175 L300 275 L200 325 L100 275 L100 175 Z" stroke="url(#grad3)" strokeWidth="1.5" fill="none" strokeDasharray="5 3" />
                        <circle cx="200" cy="200" r="30" fill="url(#grad3)" fillOpacity="0.25" />
                        <circle cx="200" cy="200" r="10" fill="#3B82F6" />
                        <defs>
                          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#60A5FA" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                  </div>

                  {/* Gradient Overlay - lighter to let SVGs show through */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                  {/* Number Tag - Top Left */}
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center">
                      <span className="text-[11px] sm:text-[12px] font-bold text-white/80">{item.step}</span>
                    </div>
                  </div>

                  {/* Accent line at top - blue */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-1 bg-blue-500 rounded-b-full" />

                  {/* Content Card - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-white/10 lg:group-hover:bg-white/15 lg:group-hover:border-white/20 transition-all duration-500">
                      {/* Icon */}
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-500 flex items-center justify-center mb-2.5 sm:mb-3 shadow-lg shadow-blue-500/20 mx-auto">
                        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>

                      <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-white mb-1.5 text-center">
                        {item.title}
                      </h3>
                      <p className="text-[12px] sm:text-[13px] text-white/60 leading-relaxed text-center mb-3">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] sm:text-[12px] font-semibold text-blue-400 tracking-wide">
                          {item.cta}
                        </span>
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center lg:group-hover:scale-110 transition-transform duration-300">
                          <ArrowRight size={12} className="sm:w-[14px] sm:h-[14px] text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Fleet Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-zinc-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 lg:mb-16"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6">
                <Car className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                  Notre Flotte
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                Véhicules <span className="text-blue-500">Premium</span>
              </h2>
            </div>

            <Link href="/voiture" className="mt-6 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-zinc-300 font-medium lg:hover:border-blue-500/50 lg:hover:text-white transition-all"
              >
                Voir toute la flotte
                <ArrowRight className="w-4 h-4 lg:group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Fleet Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Volkswagen Touareg",
                category: "SUV Premium",
                price: "800",
                image: "/voiture_h12/h12_touareg.png",
                features: ["Climatisation", "GPS", "7 Places"],
                href: "/voiture"
              },
              {
                name: "Honda Africa Twin 1100",
                category: "Adventure",
                price: "600",
                image: "/moto_h12/h12_africatwin1100.png",
                features: ["ABS", "DCT", "Adventure"],
                href: "/moto"
              },
              {
                name: "Quad Adventure",
                category: "Excursion",
                price: "400",
                image: "/excursions/h12_quad.png",
                features: ["Guide inclus", "Équipement", "Aventure"],
                href: "/excursion"
              }
            ].map((vehicle, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link href={vehicle.href} className="block relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 lg:hover:border-blue-500/30 transition-all duration-500 shadow-xl">
                  {/* Image */}
                  <div className="relative h-56 sm:h-60 lg:h-64 overflow-hidden bg-zinc-950">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      className="object-cover scale-105 lg:group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Dark overlay to unify all images */}
                    <div className="absolute inset-0 bg-black/25 lg:group-hover:bg-black/15 transition-colors duration-500" />
                    {/* Bottom fade into card content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
                    {/* Edge vignette */}
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/30 via-transparent to-zinc-900/30" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-xs font-medium text-white">
                        {vehicle.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{vehicle.name}</h3>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {vehicle.features.map((feature, i) => (
                        <span key={i} className="text-xs text-zinc-500">{feature}{i < vehicle.features.length - 1 && " •"}</span>
                      ))}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-black text-white">{vehicle.price}</span>
                        <span className="text-zinc-500 text-sm ml-1">MAD/jour</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center lg:group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="relative py-20 lg:pb-20 lg:pt-10 overflow-hidden bg-zinc-800">
        {/* Background Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/3 -left-20 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-3xl"
            style={{ willChange: 'transform, opacity' }}
          />
          <div
            className="absolute bottom-1/4 -right-16 w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-3xl"
            style={{ willChange: 'transform, opacity' }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6">
              <Star className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                Avis Clients
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Ce Que Disent <br />
              <span className="text-blue-500">
                Nos Clients
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
              Expériences réelles de clients qui ont voyagé avec H12. Qualité, confort et aventure garantis.
            </p>
          </motion.div>

          {/* Scrolling Reviews Container */}
          <div className="relative overflow-hidden group/carousel">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-zinc-800 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-zinc-800 to-transparent z-10 pointer-events-none" />

            {/* Scrolling Wrapper - CSS animation for better hover control */}
            <div
              className="flex gap-4 sm:gap-6 animate-scroll group-hover/carousel:[animation-play-state:paused]"
              style={{ width: 'max-content' }}
            >
              {/* Duplicate reviews for seamless loop */}
              {[...Array(2)].map((_, duplicateIndex) => (
                <div key={duplicateIndex} className="flex gap-4 sm:gap-6">
                  {[
                    {
                      name: "Youssef El Amrani",
                      role: "Marrakech",
                      initials: "YA",
                      review: "Voiture propre, Jabrane très sympa. On a fait l'Atlas sans souci. Je recommande les yeux fermés.",
                      rating: 5,
                      date: "Il y a 2 jours"
                    },
                    {
                      name: "Carlos Méndez",
                      role: "Madrid",
                      initials: "CM",
                      review: "Alquilamos un Tucson para recorrer el sur de Marruecos. Todo perfecto, coche limpio y buen precio. Repetiré seguro.",
                      rating: 5,
                      date: "Il y a 1 semaine"
                    },
                    {
                      name: "Stijn de Vries",
                      role: "Amsterdam",
                      initials: "SV",
                      review: "Top service, auto stond klaar bij het hotel. Geen gedoe, geen verborgen kosten. Echt een aanrader voor Marrakech.",
                      rating: 5,
                      date: "Il y a 5 jours"
                    },
                    {
                      name: "Nadia Benkirane",
                      role: "Casablanca",
                      initials: "NB",
                      review: "J'ai loué une moto pour le weekend. Livraison rapide, moto nickel. Rapport qualité-prix au top.",
                      rating: 5,
                      date: "Il y a 3 jours"
                    },
                    {
                      name: "Thomas Lefèvre",
                      role: "Lyon",
                      initials: "TL",
                      review: "Super excursion en quad dans la palmeraie. Le guide était au top et l'organisation impeccable. Merci H12 !",
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
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl" />

                      {/* Top section with avatar and info */}
                      <div className="relative z-10 flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {/* Avatar with initials */}
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

                        {/* Date */}
                        <span className="text-zinc-600 text-xs">{client.date}</span>
                      </div>

                      {/* Review Text */}
                      <p className="relative z-10 text-zinc-400 text-sm leading-relaxed mb-5 line-clamp-3">
                        {client.review}
                      </p>

                      {/* Bottom section with rating */}
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < client.rating ? "text-blue-400 fill-blue-400" : "text-zinc-700"}`}
                            />
                          ))}
                        </div>

                        {/* Verified badge */}
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

          {/* CTA Buttons */}
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

      {/* Simple CTA Section */}
      <section className="relative py-20 lg:pb-20 lg:pt-10 overflow-hidden bg-zinc-900">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-10"
          >
            {/* Title */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Prêt à
                <span className="text-blue-500 ml-3">
                  Découvrir ?
                </span>
              </h2>

              {/* Description */}
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Votre prochaine aventure vous attend. Choisissez votre expérience idéale.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Services Button */}
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

              {/* Contact Button */}
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
          </motion.div>
        </div>
      </section>
      <WhatsAppButton />
    </div>
  );
}
