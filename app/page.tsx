"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DevModal from "@/components/DevModal";
import { services } from "@/types/home_service";

export default function HomePage() {
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const handleLearnMore = () => {
    setIsDevModalOpen(true);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 pb-12 lg:pt-40 lg:pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Main gradient orb */}
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
          
          {/* Secondary orb */}
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

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight tracking-tight"
            >
              Your Journey,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                Our Passion
              </span>
            </motion.h1>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-semibold text-purple-400">
                  Premium Rental
                </span>
              </div>
            </motion.div>

            {/* Image Card - Mobile */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mb-6"
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20">
                <Image
                  src="/car.png"
                  alt="H12 Premium Car"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-white/70 leading-relaxed mb-8"
            >
              Experience the freedom of the open road with H12. Premium vehicles, expert-guided excursions, and unforgettable adventures await.
            </motion.p>

            {/* Stats - Mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              {[
                { value: '500+', label: 'Clients' },
                { value: '40+', label: 'Vehicles' },
                { value: '4.9★', label: 'Rating' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/50">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons - Mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col gap-3"
            >
              <motion.button
                onClick={() => setIsDevModalOpen(true)}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold text-center shadow-lg shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Explore Our Fleet
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-center transition-all duration-300"
              >
                Learn More
              </motion.button>
            </motion.div>
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
                className="text-purple-400/80 text-sm font-medium tracking-[0.15em] uppercase mb-5"
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400">
                  Notre Passion.
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-lg xl:text-xl text-white/50 leading-relaxed mb-10 max-w-[520px]"
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
                  { value: '500', suffix: '+', label: 'Clients' },
                  { value: '40', suffix: '+', label: 'Véhicules' },
                  { value: '4.9', label: 'Note', hasStar: true }
                ].map((stat, idx) => (
                  <div key={idx} className="px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-3xl font-black text-white tracking-tighter">{stat.value}</span>
                      {stat.suffix && <span className="text-xl font-bold text-purple-400">{stat.suffix}</span>}
                      {stat.hasStar && (
                        <Star className="w-4 h-4 text-purple-400 fill-purple-400 ml-0.5" />
                      )}
                    </div>
                    <div className="text-xs text-white/40 mt-1">{stat.label}</div>
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
                <motion.button
                  onClick={() => setIsDevModalOpen(true)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-7 py-3.5 rounded-full bg-white text-black text-[15px] font-medium flex items-center gap-2 transition-colors hover:bg-white/90"
                >
                  Réserver maintenant
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-7 py-3.5 rounded-full bg-white/[0.06] border border-white/10 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
                >
                  En savoir plus
                </motion.button>
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
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/25 via-fuchsia-600/15 to-purple-600/25 blur-[80px] rounded-full" />

              {/* Image Container */}
              <div className="relative max-w-[466px] w-full">
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/[0.08]">
                  <Image
                    src="/car.png"
                    alt="H12 Premium Vehicle"
                    fill
                    priority
                    className="object-cover"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                {/* Floating Icon Pills */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                  className="absolute -top-4 -right-4 px-4 py-2.5 rounded-full bg-white flex items-center gap-2 shadow-lg"
                >
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                    <Star className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                  <span className="text-sm font-medium text-black">4.9</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
                  className="absolute -bottom-3 -left-3 w-10 h-10 rounded-full bg-black flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold text-lg">I</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service section */}
      <section className="relative py-20 lg:pb-20 lg:pt-10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-purple-600/10 to-fuchsia-600/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Star className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
              Nos Services
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            L&apos;Excellence dans chaque
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
              Détail
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto">
            Des expériences sur mesure conçues avec la même précision que les produits Apple
          </p>
        </motion.div>

        {/* Services Grid - Tobkal Style Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {services.map((service, index) => {
            const tags = ['01', '02', '03'];
            const ctaLabels: Record<string, string> = {
              car: 'Louer une Voiture',
              motorbike: 'Louer une Moto',
              excursion: 'Trouver une Excursion'
            };

            const CardContent = (
              <div className="relative bg-black rounded-[20px] sm:rounded-[24px] overflow-hidden h-[300px] sm:h-[350px] lg:h-[400px] hover:scale-[1.02] hover:shadow-2xl transition-all duration-500">
                {/* Image */}
                <Image
                  src="/car.png"
                  alt={service.title}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

                {/* Number Tag - Top Left */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center">
                    <span className="text-[11px] sm:text-[12px] font-bold text-white/80">{tags[index]}</span>
                  </div>
                </div>

                {/* Accent line at top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-1 bg-purple-500 rounded-b-full" />

                {/* Content Card - Bottom - Fixed Height */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-white/10 group-hover:bg-white/15 group-hover:border-white/20 transition-all duration-500 h-[160px] sm:h-[180px] flex flex-col">
                    <h3 className="text-[16px] sm:text-[18px] font-bold text-white mb-1.5 sm:mb-2">
                      {service.title}
                    </h3>
                    <p className="text-[12px] sm:text-[13px] text-white/60 leading-relaxed mb-auto">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[11px] sm:text-[12px] font-semibold text-purple-400 tracking-wide">
                        {ctaLabels[service.serviceType]}
                      </span>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <ArrowRight size={12} className="sm:w-[14px] sm:h-[14px] text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );

            // Only "Location de voitures" (car) links to its page
            return service.serviceType === 'car' ? (
              <motion.div key={index} variants={cardVariants} className="group">
                <Link href="/voiture" className="block">
                  {CardContent}
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key={index}
                variants={cardVariants}
                onClick={() => handleLearnMore()}
                className="group cursor-pointer"
              >
                {CardContent}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>

      {/* Reviews Section */}
      <section className="relative py-20 lg:pb-20 lg:pt-10 overflow-hidden">
        {/* Background Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/3 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-purple-600/10 to-fuchsia-600/10 blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-16 w-[500px] h-[500px] rounded-full bg-gradient-to-l from-fuchsia-600/10 to-purple-600/10 blur-3xl"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Star className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
                Avis Clients
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Ce Que Disent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                Nos Clients Heureux
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto">
              Expériences réelles de clients qui ont voyagé avec H12. Qualité, confort et aventure garantis.
            </p>
          </motion.div>

          {/* Scrolling Reviews Container */}
          <div className="relative overflow-hidden">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

            {/* Scrolling Wrapper */}
            <motion.div
              className="flex gap-6 lg:gap-8"
              animate={{
                x: [0, -1032], // Adjust based on total width of duplicated content
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
              style={{ width: 'max-content' }}
            >
              {/* Duplicate reviews for seamless loop */}
              {[...Array(3)].map((_, duplicateIndex) => (
                <div key={duplicateIndex} className="flex gap-6 lg:gap-8">
                  {[
                    {
                      name: "Alex Johnson",
                      role: "Entrepreneur",
                      initials: "AJ",
                      review: "H12 a rendu mon road trip inoubliable. Les voitures étaient impeccables et le service était de premier ordre. Je réserverai certainement à nouveau!",
                      rating: 5,
                      date: "Il y a 2 jours"
                    },
                    {
                      name: "Maria Rodriguez",
                      role: "Blogueuse Voyage",
                      initials: "MR",
                      review: "De la réservation à la restitution, tout s'est déroulé sans accroc. Les véhicules de luxe ont dépassé mes attentes. Je recommande vivement pour les voyages de luxe!",
                      rating: 5,
                      date: "Il y a 1 semaine"
                    },
                    {
                      name: "James Lee",
                      role: "Aventurier",
                      initials: "JL",
                      review: "Des véhicules incroyables et des expériences uniques. H12 va bien au-delà des attentes de ses clients. Parfait pour les passionnés d'aventure!",
                      rating: 5,
                      date: "Il y a 3 jours"
                    },
                    {
                      name: "Sophie Chen",
                      role: "Voyageuse d'Affaires",
                      initials: "SC",
                      review: "Service professionnel et véhicules premium. A rendu mon voyage d'affaires fluide et confortable. J'utiliserai exclusivement H12!",
                      rating: 5,
                      date: "Il y a 2 semaines"
                    },
                    {
                      name: "David Wilson",
                      role: "Voyageur en Famille",
                      initials: "DW",
                      review: "Parfait pour nos vacances en famille! Spacieux, propre et fiable. Les enfants ont adoré l'expérience aussi. Merci H12!",
                      rating: 5,
                      date: "Il y a 1 mois"
                    },
                    {
                      name: "Emma Thompson",
                      role: "Passionnée de Luxe",
                      initials: "ET",
                      review: "Collection exquise de véhicules premium. L'attention aux détails et le service client sont exceptionnels. Une véritable expérience de luxe!",
                      rating: 5,
                      date: "Il y a 4 jours"
                    },
                    {
                      name: "Pierre Martin",
                      role: "Explorateur Urbain",
                      initials: "PM",
                      review: "Service impeccable et véhicules toujours parfaitement entretenus. H12 comprend les besoins des voyageurs modernes.",
                      rating: 5,
                      date: "Il y a 5 jours"
                    },
                    {
                      name: "Camille Dubois",
                      role: "Influenceuse Lifestyle",
                      initials: "CD",
                      review: "L'expérience H12 est bien plus qu'une simple location de voiture. C'est une aventure complète avec un service personnalisé exceptionnel.",
                      rating: 5,
                      date: "Il y a 2 semaines"
                    },
                  ].map((client, idx) => (
                    <motion.div
                      key={`${duplicateIndex}-${idx}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group relative flex-shrink-0 w-[320px] lg:w-[400px] rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 p-6 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10"
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-fuchsia-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10" />

                      {/* Top section with avatar and info */}
                      <div className="flex items-start justify-between ">
                        <div className="flex items-center gap-4">
                          {/* Avatar with initials */}
                          <div className="relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full blur opacity-30 group-hover:opacity-70 transition-opacity duration-500" />
                            <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-purple-600/30 to-fuchsia-600/30 border-2 border-white/10 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {client.initials}
                              </span>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-lg">{client.name}</h4>
                            <p className="text-white/50 text-sm">{client.role}</p>
                          </div>
                        </div>
                        
                        {/* Date */}
                        <span className="text-white/30 text-sm">{client.date}</span>
                      </div>

                      {/* Review Text */}
                      <p className="text-white/70 text-sm leading-relaxed mb-6 line-clamp-3">
                        {client.review}
                      </p>

                      {/* Bottom section with rating */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 fill-current ${i < client.rating ? "text-purple-400" : "text-white/30"}`}
                            />
                          ))}
                        </div>
                        
                        {/* Verified badge */}
                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                          <Sparkles className="w-3 h-3 text-purple-400" />
                          <span className="text-xs text-purple-400">Vérifié</span>
                        </div>
                      </div>

                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
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
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 bg-[length:200%_100%] text-white text-[15px] font-semibold flex items-center gap-2 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-500 hover:bg-right"
              >
                <span className="relative z-10">Louer une Voiture</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              </motion.button>
            </Link>

            <motion.button
              onClick={() => handleLearnMore()}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 rounded-full bg-white/[0.03] backdrop-blur-sm border border-purple-500/30 text-[15px] font-semibold text-white flex items-center gap-2 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
            >
              Louer une Moto
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </div>
        
      </section>

      {/* Simple CTA Section */}
      <section className="relative py-20 lg:pb-20 lg:pt-10 overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
        
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 ml-3">
                  Découvrir ?
                </span>
              </h2>
              
              {/* Description */}
              <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                Votre prochaine aventure vous attend. Choisissez votre expérience idéale.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Services Button */}
              <motion.button
                onClick={() => {
                  // Scroll to services section or navigate to services page
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold shadow-lg shadow-purple-500/30 transition-all duration-300 flex items-center gap-3"
              >
                <span>Voir nos Services</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Contact Button */}
              <motion.button
                onClick={() => setIsDevModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/15 transition-all duration-300"
              >
                Nous Contacter
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>


      {/* DevModal */}
      <DevModal isOpen={isDevModalOpen} onClose={() => setIsDevModalOpen(false)} />
    </div>
  );
}