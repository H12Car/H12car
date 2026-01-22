"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, Users, MapPin, ArrowRight, Heart, Calendar, CheckCircle, Compass, X } from "lucide-react";
import Image from "next/image";
import { useBooking } from "@/context/bookingContext";

const excursions = [
  {
    id: 1,
    name: "Balade en Dromadaire",
    category: "Palmeraie",
    price: "350",
    period: "personne",
    image: "/excursions/h12_dromadaire.png",
    description: "Vivez une expérience authentique à dos de dromadaire à travers la palmeraie de Marrakech et ses 100 000 palmiers",
    features: ["Transport A/R", "Guide berbère", "Thé à la menthe", "Photos souvenirs"],
    rating: 4.9,
    reviews: 234,
    duration: "1 heure",
    groupSize: "1-8",
    departure: "Multiple",
    difficulty: "Facile",
    highlights: ["Palmeraie de Marrakech", "Villages berbères", "Pause thé traditionnelle", "Coucher de soleil disponible"],
    favorite: true
  },
  {
    id: 2,
    name: "Aventure Quad",
    category: "Aventure",
    price: "450",
    period: "personne",
    image: "/excursions/h12_quad.png",
    description: "Pilotez votre quad à travers la palmeraie et le désert rocheux avec des vues panoramiques sur l'Atlas",
    features: ["Équipement complet", "Guide moniteur", "Quad automatique", "Pause thé berbère"],
    rating: 4.8,
    reviews: 312,
    duration: "2 heures",
    groupSize: "1-12",
    departure: "Multiple",
    difficulty: "Modéré",
    highlights: ["Palmeraie & désert rocheux", "Vue sur l'Atlas", "Villages berbères", "Adrénaline garantie"],
    favorite: true
  },
  {
    id: 3,
    name: "Moto Off-Road",
    category: "Extrême",
    price: "650",
    period: "personne",
    image: "/excursions/h12_motooffroad.png",
    description: "Aventure tout-terrain en moto dirt bike à travers les pistes rocheuses et les sentiers de la palmeraie",
    features: ["Moto dirt bike", "Équipement pro", "Guide expert", "Briefing sécurité"],
    rating: 4.7,
    reviews: 145,
    duration: "2-3 heures",
    groupSize: "1-6",
    departure: "09:00 / 14:00",
    difficulty: "Sportif",
    highlights: ["Pistes techniques", "Terrain varié", "Sensations fortes", "Encadrement pro"],
    favorite: false
  },
  {
    id: 4,
    name: "Combo Quad + Dromadaire",
    category: "Pack",
    price: "700",
    period: "personne",
    image: "/excursions/h12_quadetdromadaire.png",
    description: "L'expérience complète : combinez l'adrénaline du quad et la sérénité de la balade en dromadaire",
    features: ["2 activités", "Demi-journée", "Guide dédié", "Thé & collation"],
    rating: 4.9,
    reviews: 189,
    duration: "3 heures",
    groupSize: "1-8",
    departure: "09:00 / 15:00",
    difficulty: "Modéré",
    highlights: ["1h Quad + 1h Dromadaire", "Meilleur rapport qualité/prix", "Pause dans camp berbère", "Photos incluses"],
    favorite: true
  },
];

export default function ExcursionPage() {
  const [expandedExcursionId, setExpandedExcursionId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([1, 2, 4]);
  const { openWizard } = useBooking();

  const handleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const handleCardClick = (excursionId: number) => {
    setExpandedExcursionId(expandedExcursionId === excursionId ? null : excursionId);
  };

  const handleReserve = (excursion: typeof excursions[0]) => {
    setExpandedExcursionId(null);
    openWizard("excursion", {
      id: excursion.id,
      name: excursion.name,
      price: excursion.price,
      period: excursion.period,
      duration: excursion.duration,
      image: excursion.image,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 pb-12 lg:pt-40 lg:pb-20 overflow-hidden">
        {/* Background Elements - CSS animations for GPU acceleration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl animate-pulse-slow"
            style={{ willChange: 'transform, opacity' }}
          />
          <div
            className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-sky-100/40 blur-3xl animate-pulse-slow-delayed"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
                <Compass className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">
                  Excursions Guidées
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight tracking-tight"
            >
              Aventure.
              <br />
              <span className="text-blue-500">
                Sensations.
              </span>
            </motion.h1>

            {/* Image Card - Mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mb-6"
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-gray-300/50">
                <Image
                  src="/h12_hero.png"
                  alt="H12 Excursions"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
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
              className="text-base sm:text-lg text-gray-500 leading-relaxed mb-6 max-w-md mx-auto"
            >
              Quad, dromadaire ou moto off-road : vivez des aventures uniques avec nos guides experts.
            </motion.p>

            {/* Stats - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              {[
                { value: '4', label: 'Activités' },
                { value: '100', suffix: '%', label: 'Guidé' },
                { value: '4.8', label: 'Note', hasStar: true }
              ].map((stat, idx) => (
                <div key={idx} className="px-4 py-2 rounded-xl bg-white border border-gray-100 shadow-sm text-center">
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="text-xl sm:text-2xl font-black text-gray-900">{stat.value}</span>
                    {stat.suffix && <span className="text-sm font-bold text-blue-500">{stat.suffix}</span>}
                    {stat.hasStar && <Star className="w-3 h-3 text-blue-500 fill-blue-500 ml-0.5" />}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Button - Mobile */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onClick={() => {
                document.getElementById('excursions-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              whileTap={{ scale: 0.98 }}
              className="mx-auto px-7 py-3.5 rounded-full bg-blue-500 text-white text-sm font-semibold shadow-lg flex items-center gap-2 hover:bg-blue-600 transition-all"
            >
              Voir nos Activités
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Desktop Layout */}
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
                Excursions avec Guides Experts
              </motion.p>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.1] tracking-[-0.02em] mb-6"
              >
                Aventure.
                <br />
                <span className="text-blue-500">
                  Sensations.
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-lg xl:text-xl text-gray-500 leading-relaxed mb-10 max-w-[520px]"
              >
                Quad, dromadaire ou moto off-road : explorez la palmeraie et
                le désert de Marrakech avec nos guides locaux expérimentés.
              </motion.p>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="flex items-center gap-4 mb-10"
              >
                {[
                  { value: '4', label: 'Activités' },
                  { value: '100', suffix: '%', label: 'Guidé' },
                  { value: '4.8', label: 'Note', hasStar: true }
                ].map((stat, idx) => (
                  <div key={idx} className="px-5 py-2.5 rounded-xl bg-white border border-gray-100 shadow-sm text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-3xl font-black text-gray-900 tracking-tighter">{stat.value}</span>
                      {stat.suffix && <span className="text-xl font-bold text-blue-500">{stat.suffix}</span>}
                      {stat.hasStar && (
                        <Star className="w-4 h-4 text-blue-500 fill-blue-500 ml-0.5" />
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                className="flex items-center gap-4"
              >
                <motion.button
                  onClick={() => {
                    document.getElementById('excursions-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-7 py-3.5 rounded-full bg-blue-500 text-white text-[15px] font-medium flex items-center gap-2 transition-colors hover:bg-blue-600"
                >
                  Voir nos Activités
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </motion.button>
                <motion.button
                  onClick={() => {
                    document.getElementById('excursions-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-7 py-3.5 rounded-full bg-gray-100 text-gray-700 text-[15px] font-medium flex items-center gap-2 transition-colors hover:bg-gray-200"
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
              <div className="absolute inset-0 bg-blue-100/40 blur-[80px] rounded-full" />

              {/* Image Container */}
              <div className="relative max-w-[466px] w-full">
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-gray-100">
                  <Image
                    src="/h12_hero.png"
                    alt="H12 Excursions"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 466px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
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
                  <span className="text-sm font-medium text-gray-900">4.8</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
                  className="absolute -bottom-3 -left-3 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-lg"
                >
                  <Compass className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guide Badge Section */}
      <section className="relative py-6 lg:py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <div className="px-5 py-2.5 rounded-full bg-blue-50 border border-blue-100 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Toutes nos excursions sont accompagnées par des guides locaux experts</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Excursions Grid */}
      <section id="excursions-grid" className="py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {excursions.map((excursion, index) => {
              const isExpanded = expandedExcursionId === excursion.id;

              return (
                <motion.div
                  key={excursion.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    layout: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
                  }}
                  className="group cursor-pointer"
                  onClick={() => handleCardClick(excursion.id)}
                >
                  <motion.div
                    layout
                    className={`relative bg-black overflow-hidden transition-all duration-500 rounded-[20px] sm:rounded-[24px] ${!isExpanded ? 'hover:scale-[1.02] hover:shadow-2xl' : 'shadow-2xl ring-2 ring-blue-500/30'}`}
                  >
                    {/* Image Section */}
                    <motion.div layout className={`relative overflow-hidden ${isExpanded ? 'h-[220px] sm:h-[260px]' : 'h-[360px] sm:h-[380px] lg:h-[420px]'}`}>
                      {/* Excursion Image */}
                      <Image
                        src={excursion.image}
                        alt={excursion.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={`object-cover object-top transition-all duration-700 ${isExpanded ? 'scale-105' : 'group-hover:scale-105'}`}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavorite(excursion.id);
                        }}
                        className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                      >
                        <Heart
                          className={`w-4 h-4 sm:w-[18px] sm:h-[18px] transition-all duration-300 ${
                            favorites.includes(excursion.id)
                              ? "fill-red-500 text-red-500"
                              : "text-white/80 hover:text-red-400"
                          }`}
                        />
                      </button>

                      {/* Top Left - Close Button (expanded) or Category Badge */}
                      <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20">
                        {isExpanded ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedExcursionId(null);
                            }}
                            className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        ) : (
                          <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                            <span className="text-[10px] sm:text-[11px] font-bold text-white/90 uppercase tracking-wide">{excursion.category}</span>
                          </div>
                        )}
                      </div>

                      {/* Accent line */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-1 bg-blue-500 rounded-b-full" />

                      {/* Content Card - Bottom (only when not expanded) */}
                      {!isExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 md:p-4">
                          <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-3.5 md:p-4 border border-white/10 group-hover:bg-white/15 group-hover:border-white/20 transition-all duration-500">
                            {/* Header: Name + Price */}
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-sm sm:text-[15px] md:text-[17px] font-bold text-white leading-tight pr-2">
                                {excursion.name}
                              </h3>
                              <div className="flex-shrink-0 text-right">
                                <span className="text-sm sm:text-[14px] md:text-[16px] font-black text-blue-400">{excursion.price}</span>
                                <span className="text-[9px] sm:text-[10px] md:text-[11px] text-white/50 ml-0.5">MAD/{excursion.period}</span>
                              </div>
                            </div>

                            {/* Features Row */}
                            <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 mb-2.5">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
                                <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white/70">{excursion.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
                                <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white/70">{excursion.groupSize}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
                                <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white/70">{excursion.difficulty}</span>
                              </div>
                            </div>

                            {/* Footer: Rating + CTA */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400 fill-current" />
                                <span className="text-[11px] sm:text-[12px] md:text-[13px] font-semibold text-white">{excursion.rating}</span>
                                <span className="text-[9px] sm:text-[10px] md:text-[11px] text-white/40">({excursion.reviews})</span>
                              </div>
                              <div className="flex items-center gap-1 sm:gap-1.5 text-blue-400">
                                <span className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold tracking-wide">Détails</span>
                                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                  <ArrowRight className="w-3 h-3 sm:w-[14px] sm:h-[14px] text-white" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>

                    {/* Expanded Details Section */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="p-4 sm:p-5 space-y-3">
                            {/* Header */}
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                                <span className="text-sm font-semibold text-white">{excursion.rating}</span>
                                <span className="text-xs text-white/40">({excursion.reviews} avis)</span>
                              </div>
                              <h2 className="text-lg sm:text-xl font-bold text-white mb-1">{excursion.name}</h2>
                              <p className="text-white/50 text-xs sm:text-sm">{excursion.description}</p>
                            </div>

                            {/* Price */}
                            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                              <div className="flex items-end justify-between">
                                <div>
                                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">Prix par personne</p>
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-xl sm:text-2xl font-black text-blue-500">{excursion.price}</span>
                                    <span className="text-white/50 text-xs">MAD</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-[10px] text-white/40 mb-0.5">Départ</p>
                                  <p className="text-sm font-bold text-white">{excursion.departure}</p>
                                </div>
                              </div>
                            </div>

                            {/* Specs Grid */}
                            <div className="grid grid-cols-4 gap-2">
                              {[
                                { icon: Clock, label: 'Durée', value: excursion.duration },
                                { icon: Users, label: 'Groupe', value: excursion.groupSize },
                                { icon: MapPin, label: 'Difficulté', value: excursion.difficulty },
                                { icon: Calendar, label: 'Départ', value: excursion.departure },
                              ].map((spec, idx) => (
                                <div key={idx} className="bg-white/5 rounded-lg p-2 text-center border border-white/5">
                                  <spec.icon className="w-3.5 h-3.5 text-blue-400 mx-auto mb-1" />
                                  <p className="text-[8px] text-white/40 uppercase tracking-wider mb-0.5">{spec.label}</p>
                                  <p className="text-[10px] font-semibold text-white">{spec.value}</p>
                                </div>
                              ))}
                            </div>

                            {/* Highlights */}
                            <div className="bg-blue-500/10 rounded-xl p-3 border border-blue-500/20">
                              <div className="flex items-center gap-2 mb-2">
                                <Compass className="w-3.5 h-3.5 text-blue-400" />
                                <p className="text-[11px] font-semibold text-white">Ce qui est inclus</p>
                              </div>
                              <div className="grid grid-cols-2 gap-1.5">
                                {excursion.highlights.map((highlight, idx) => (
                                  <div key={idx} className="flex items-center gap-1.5">
                                    <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                                    <span className="text-[10px] text-white/70">{highlight}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* CTA Button */}
                            <motion.button
                              onClick={() => handleReserve(excursion)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded-full shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all duration-300"
                            >
                              Réserver cette activité
                              <ArrowRight className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background Gradient - CSS animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-100/30 blur-3xl animate-pulse-slow"
            style={{ willChange: 'transform, opacity' }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center"
          >
            {/* Subtitle */}
            <p className="text-blue-500 text-sm font-medium tracking-[0.15em] uppercase mb-4">
              Besoin d&apos;un véhicule ?
            </p>

            {/* Main Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Louez une{" "}
              <span className="text-blue-500">
                Voiture Premium
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10">
              Découvrez notre flotte de véhicules haut de gamme pour explorer Marrakech et ses environs en toute liberté.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-4">
              <motion.a
                href="/voiture"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 rounded-full bg-blue-500 text-white text-[15px] font-medium inline-flex items-center gap-2 transition-colors hover:bg-blue-600"
              >
                Voir notre flotte
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </motion.a>
              <motion.a
                href="/voiture"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 rounded-full bg-gray-100 text-gray-700 text-[15px] font-medium inline-flex items-center gap-2 transition-colors hover:bg-gray-200"
              >
                En savoir plus
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
