"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import Image from "next/image";
import DevisModal from "@/components/devisModal";
import { services } from "@/types/home_service";
import FormReviews, { ReviewFormData } from "@/components/formReviews";

export default function HomePage() {
  const [isDevisModalOpen, setIsDevisModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  // Animation variants
  const fadeInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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
        ease: "easeOut"
      }
    }
  };

  const handleLearnMore = (serviceType: string) => {
    setSelectedService(serviceType);
    setIsDevisModalOpen(true);
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

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
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
                onClick={() => setIsDevisModalOpen(true)}
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

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Content */}
            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              {/* Badge */}
              <motion.div
                variants={fadeInLeft}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
                    Agence de Location Premium
                  </span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeInLeft}
                transition={{ duration: 0.6 }}
                className="text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 leading-tight tracking-tight"
              >
                Votre voyage
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                  Notre Passion
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeInLeft}
                transition={{ duration: 0.6 }}
                className="text-xl text-white/70 leading-relaxed mb-10"
              >
                Découvrez la liberté de la route avec H12.
                Location de voitures premium à Marrakech, kilométrage illimité et service multilingue pour une expérience sans compromis.
                </motion.p>

              {/* Stats */}
              <motion.div
                variants={fadeInLeft}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap gap-10 mb-10"
              >
                {[
                  { value: '500+', label: 'Happy Clients' },
                  { value: '40+', label: 'Premium Vehicles' },
                  { value: '4.9★', label: 'Client Rating' }
                ].map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/50">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeInLeft}
                transition={{ duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  onClick={() => setIsDevisModalOpen(true)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold text-center shadow-lg shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Découvrir notre flotte
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-center transition-all duration-300 hover:bg-white/15"
                >
                  Savoir Plus
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right - Floating Image Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Blurred background image */}
              <div className="absolute inset-0 -m-8">
                <div className="relative w-full h-full">
                  <Image
                    src="/car.png"
                    alt=""
                    fill
                    className="object-cover blur-3xl opacity-20 scale-110"
                  />
                </div>
              </div>

              {/* Floating image card */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/30 border border-white/10">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-fuchsia-500/5 z-10" />
                  
                  {/* Car Image */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src="/car.png"
                      alt="H12 Premium Car"
                      fill
                      priority
                      className="object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>
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

        {/* Services Grid - Liquid Glass Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Liquid Glass Card */}
              <div className="relative h-full rounded-[32px] overflow-hidden">
                {/* Blurred background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.15] to-white/[0.05] backdrop-blur-3xl" />
                
                {/* Liquid glass effect layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.03]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(217,70,239,0.08),transparent_50%)]" />
                
                {/* Subtle border effect */}
                <div className="absolute inset-0 border border-white/10 rounded-[32px]" />
                <div className="absolute inset-[1px] border border-white/5 rounded-[31px]" />
                
                {/* Content container */}
                <div className="relative z-10 h-full p-8 flex flex-col">
                  {/* Icon with glass effect */}
                  <div className="mb-8">
                    <div className="relative w-16 h-16">
                      {/* Glass orb background */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.15] to-white/[0.05] backdrop-blur-xl border border-white/10" />
                      
                      {/* Inner glass layer */}
                      <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-white/[0.1] to-white/[0.02] backdrop-blur-sm" />
                      
                      {/* Icon */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Glass highlight */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                  </div>

                  {/* Title with gradient reveal */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    <span className="relative inline-block">
                      {service.title}
                      <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {service.title}
                      </span>
                    </span>
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>

                  {/* Glass divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                  {/* Features with minimal dots */}
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                          <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-white/20 blur-[2px]" />
                        </div>
                        <span className="text-sm text-white/70">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Apple-style button */}
                  <motion.button
                    onClick={() => handleLearnMore(service.serviceType)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full py-3.5 px-6 rounded-2xl overflow-hidden group/btn"
                  >
                    {/* Button glass background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.15] to-white/[0.05] backdrop-blur-xl border border-white/10" />
                    
                    {/* Button inner glass */}
                    <div className="absolute inset-[1px] rounded-[15px] bg-gradient-to-br from-white/[0.1] to-white/[0.02] backdrop-blur-sm" />
                    
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    
                    {/* Button content */}
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      <span className="font-semibold text-white text-sm tracking-wide">
                        En savoir plus
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/80 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all duration-300" />
                    </div>
                    
                    {/* Glass highlight on button */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
                  </motion.button>
                </div>

                {/* Liquid reflection effects */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/3 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-1000" />
                
                {/* Corner glow effects */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-600/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tl from-fuchsia-600/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 lg:mt-20 text-center"
        >
          <p className="text-white/60 mb-6">
            Vous ne trouvez pas ce que vous cherchez ?
          </p>
          <motion.button
            onClick={() => setIsDevisModalOpen(true)}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold shadow-lg shadow-purple-500/30 transition-all duration-300 inline-flex items-center gap-2"
          >
            Contactez-nous pour une solution sur mesure
            <ArrowRight className="w-5 h-5" />
          </motion.button>
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

          {/* Indicators and CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 lg:mt-20 text-center"
          >
            
            <p className="text-white/60 mb-6">
              Rejoignez nos clients satisfaits et vivez l&apos;expérience du voyage premium
            </p>
            <motion.button
              onClick={() => setIsReviewFormOpen(true)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold shadow-lg shadow-purple-500/30 transition-all duration-300 inline-flex items-center gap-2"
            >
              Partagez Votre Expérience
              <ArrowRight className="w-5 h-5" />
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
                onClick={() => {
                  setSelectedService("");
                  setIsDevisModalOpen(true);
                }}
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

      


      {/* DevisModal */}
      <DevisModal 
        isOpen={isDevisModalOpen} 
        onClose={() => setIsDevisModalOpen(false)}
        serviceType={selectedService}
      />

      <FormReviews
        isOpen={isReviewFormOpen}
        onClose={() => setIsReviewFormOpen(false)}
        onSubmit={(data: ReviewFormData) => {
          // Here you would typically save the review to your backend
          // No console.log or alert needed
        }}
        onShowDevisModal={() => {
          // Show devis modal directly
          setSelectedService(""); // Or set a default service
          setIsDevisModalOpen(true);
        }}
      />
    </div>
  );
}