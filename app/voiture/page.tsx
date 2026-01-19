"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Fuel, Users, Settings, Car, ArrowRight, Heart, Shield, X, CheckCircle } from "lucide-react";
import Image from "next/image";
import DevModal from "@/components/DevModal";

const cars = [
  {
    id: 1,
    name: "Mercedes-Benz Classe S",
    category: "Luxe",
    price: "4500",
    period: "jour",
    image: "/h12_mercedes.png",
    description: "Le summum du luxe automobile avec toutes les options premium",
    features: ["7 Places", "Automatique", "Diesel", "Full Options"],
    rating: 4.9,
    reviews: 124,
    fuel: "Diesel",
    seats: 7,
    transmission: "Automatique",
    year: 2024,
    power: "435 ch",
    favorite: true
  },
  {
    id: 2,
    name: "BMW X7",
    category: "SUV Luxury",
    price: "3800",
    period: "jour",
    image: "/h12_x7.png",
    description: "SUV spacieux et élégant pour toute la famille",
    features: ["7 Places", "Automatique", "Essence", "Toit Panoramique"],
    rating: 4.8,
    reviews: 89,
    fuel: "Essence",
    seats: 7,
    transmission: "Automatique",
    year: 2023,
    power: "335 ch",
    favorite: false
  },
  {
    id: 3,
    name: "Range Rover Sport",
    category: "SUV Premium",
    price: "4200",
    period: "jour",
    image: "/h12_range.png",
    description: "Performance et luxe dans un SUV tout-terrain",
    features: ["5 Places", "Automatique", "Diesel", "4x4"],
    rating: 4.7,
    reviews: 67,
    fuel: "Diesel",
    seats: 5,
    transmission: "Automatique",
    year: 2023,
    power: "400 ch",
    favorite: true
  },
  {
    id: 4,
    name: "Porsche Cayenne",
    category: "SUV Sport",
    price: "3900",
    period: "jour",
    image: "/car.png",
    description: "Élégance sportive et performance exceptionnelle",
    features: ["5 Places", "Automatique", "Essence", "Sport+"],
    rating: 4.9,
    reviews: 92,
    fuel: "Essence",
    seats: 5,
    transmission: "Automatique",
    year: 2024,
    power: "340 ch",
    favorite: false
  },
  {
    id: 5,
    name: "Audi Q8",
    category: "SUV Coupe",
    price: "3600",
    period: "jour",
    image: "/car.png",
    description: "Design coupé avec technologie de pointe",
    features: ["5 Places", "Automatique", "Diesel", "Quattro"],
    rating: 4.6,
    reviews: 78,
    fuel: "Diesel",
    seats: 5,
    transmission: "Automatique",
    year: 2023,
    power: "286 ch",
    favorite: false
  },
  {
    id: 6,
    name: "Tesla Model X",
    category: "Électrique",
    price: "4100",
    period: "jour",
    image: "/car.png",
    description: "Innovation électrique avec portes papillon",
    features: ["7 Places", "Automatique", "Électrique", "Autopilot"],
    rating: 4.8,
    reviews: 105,
    fuel: "Électrique",
    seats: 7,
    transmission: "Automatique",
    year: 2024,
    power: "670 ch",
    favorite: true
  },
  {
    id: 7,
    name: "Lexus LX 600",
    category: "SUV Luxe",
    price: "3700",
    period: "jour",
    image: "/car.png",
    description: "Confort exceptionnel et fiabilité légendaire",
    features: ["7 Places", "Automatique", "Essence", "Mark Levinson"],
    rating: 4.7,
    reviews: 56,
    fuel: "Essence",
    seats: 7,
    transmission: "Automatique",
    year: 2023,
    power: "409 ch",
    favorite: false
  },
  {
    id: 8,
    name: "Volkswagen Touareg",
    category: "SUV Confort",
    price: "2800",
    period: "jour",
    image: "/car.png",
    description: "Confort allemand et technologie avancée",
    features: ["5 Places", "Automatique", "Diesel", "Air Suspension"],
    rating: 4.5,
    reviews: 112,
    fuel: "Diesel",
    seats: 5,
    transmission: "Automatique",
    year: 2023,
    power: "286 ch",
    favorite: false
  },
  {
    id: 9,
    name: "Jeep Grand Cherokee",
    category: "SUV Adventure",
    price: "3200",
    period: "jour",
    image: "/car.png",
    description: "Aventure et capacité tout-terrain supérieure",
    features: ["5 Places", "Automatique", "Essence", "4x4 Select"],
    rating: 4.4,
    reviews: 83,
    fuel: "Essence",
    seats: 5,
    transmission: "Automatique",
    year: 2023,
    power: "357 ch",
    favorite: false
  },
  {
    id: 10,
    name: "Cadillac Escalade",
    category: "SUV Prestige",
    price: "4400",
    period: "jour",
    image: "/car.png",
    description: "Prestige américain avec intérieur cinéma",
    features: ["7 Places", "Automatique", "Essence", "AKG Studio"],
    rating: 4.8,
    reviews: 47,
    fuel: "Essence",
    seats: 7,
    transmission: "Automatique",
    year: 2024,
    power: "420 ch",
    favorite: true
  },
];

const categories = [
  "Tous",
  "Luxe",
  "SUV",
  "Électrique",
  "Sport",
  "Familial"
];

export default function VoiturePage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);
  const [expandedCarId, setExpandedCarId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([1, 3, 6, 10]);

  const filteredCars = selectedCategory === "Tous"
    ? cars
    : cars.filter(car =>
        selectedCategory === "SUV"
          ? car.category.includes("SUV")
          : car.category.includes(selectedCategory)
      );

  const handleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const handleCardClick = (carId: number) => {
    setExpandedCarId(expandedCarId === carId ? null : carId);
  };

  const handleReserve = () => {
    setExpandedCarId(null);
    setIsDevModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Apple Style */}
      <section className="relative pt-24 sm:pt-28 pb-12 lg:pt-40 lg:pb-20 overflow-hidden">
        {/* Animated Background Elements */}
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                <Car className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-semibold text-purple-400">
                  Collection Premium
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
              Notre Flotte.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                Votre Liberté.
              </span>
            </motion.h1>

            {/* Image Card - Mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mb-6"
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20">
                <Image
                  src="/h12_hero.png"
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
              className="text-base sm:text-lg text-white/50 leading-relaxed mb-6 max-w-md mx-auto"
            >
              Des berlines élégantes aux SUV puissants, explorez notre collection de véhicules premium.
            </motion.p>

            {/* Stats - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              {[
                { value: '10', suffix: '+', label: 'Modèles' },
                { value: '100', suffix: '%', label: 'Assurés' },
                { value: '4.9', label: 'Note', hasStar: true }
              ].map((stat, idx) => (
                <div key={idx} className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="text-xl sm:text-2xl font-black text-white">{stat.value}</span>
                    {stat.suffix && <span className="text-sm font-bold text-purple-400">{stat.suffix}</span>}
                    {stat.hasStar && <Star className="w-3 h-3 text-purple-400 fill-purple-400 ml-0.5" />}
                  </div>
                  <div className="text-[10px] text-white/40 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Button - Mobile */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onClick={() => {
                document.getElementById('cars-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              whileTap={{ scale: 0.98 }}
              className="mx-auto px-7 py-3.5 rounded-full bg-white text-black text-sm font-semibold shadow-lg flex items-center gap-2 hover:bg-white/90 transition-all"
            >
              Voir notre Flotte
              <ArrowRight className="w-4 h-4" />
            </motion.button>
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
                Location de Voitures Premium
              </motion.p>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-5xl xl:text-6xl font-bold text-white leading-[1.1] tracking-[-0.02em] mb-6"
              >
                Notre Flotte.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400">
                  Votre Liberté.
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-lg xl:text-xl text-white/50 leading-relaxed mb-10 max-w-[520px]"
              >
                Des berlines élégantes aux SUV puissants, explorez notre collection
                de véhicules premium. Chaque modèle, une promesse d&apos;excellence.
              </motion.p>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="flex items-center gap-4 mb-10"
              >
                {[
                  { value: '10', suffix: '+', label: 'Modèles' },
                  { value: '100', suffix: '%', label: 'Assurés' },
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

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                className="flex items-center gap-4"
              >
                <motion.button
                  onClick={() => {
                    document.getElementById('cars-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-7 py-3.5 rounded-full bg-white text-black text-[15px] font-medium flex items-center gap-2 transition-colors hover:bg-white/90"
                >
                  Voir notre Flotte
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
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
                    src="/h12_hero.png"
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
                  <Car className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Filter Section */}
      <section className="relative py-8 lg:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          {/* Categories Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/30"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cars Grid */}
      <section id="cars-grid" className="py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredCars.map((car, index) => {
              const isExpanded = expandedCarId === car.id;

              return (
                <motion.div
                  key={car.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    layout: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
                  }}
                  className={`group cursor-pointer ${isExpanded ? 'md:col-span-2' : ''}`}
                  onClick={() => !isExpanded && handleCardClick(car.id)}
                >
                  <motion.div
                    layout
                    className={`relative bg-black overflow-hidden transition-all duration-500 ${
                      isExpanded
                        ? 'rounded-[24px] sm:rounded-[32px]'
                        : 'rounded-[20px] sm:rounded-[24px] hover:scale-[1.02] hover:shadow-2xl'
                    }`}
                  >
                    {/* Collapsed Card View */}
                    {!isExpanded && (
                      <div className="relative h-[360px] sm:h-[380px] lg:h-[420px]">
                        {/* Car Image - Full Bleed */}
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

                        {/* Favorite Button - Top Right */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFavorite(car.id);
                          }}
                          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                        >
                          <Heart
                            className={`w-4 h-4 sm:w-[18px] sm:h-[18px] transition-all duration-300 ${
                              favorites.includes(car.id)
                                ? "fill-red-500 text-red-500"
                                : "text-white/80 hover:text-red-400"
                            }`}
                          />
                        </button>

                        {/* Category Badge - Top Left */}
                        <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20">
                          <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                            <span className="text-[10px] sm:text-[11px] font-bold text-white/90 uppercase tracking-wide">{car.category}</span>
                          </div>
                        </div>

                        {/* Accent line at top */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-1 bg-purple-500 rounded-b-full" />

                        {/* Content Card - Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 md:p-4">
                          <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-3.5 md:p-4 border border-white/10 group-hover:bg-white/15 group-hover:border-white/20 transition-all duration-500">
                            {/* Header: Name + Price */}
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-sm sm:text-[15px] md:text-[17px] font-bold text-white leading-tight pr-2">
                                {car.name}
                              </h3>
                              <div className="flex-shrink-0 text-right">
                                <span className="text-sm sm:text-[14px] md:text-[16px] font-black text-purple-400">{car.price}</span>
                                <span className="text-[9px] sm:text-[10px] md:text-[11px] text-white/50 ml-0.5">MAD/{car.period}</span>
                              </div>
                            </div>

                            {/* Features Row */}
                            <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 mb-2.5">
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400" />
                                <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white/70">{car.seats}pl</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Fuel className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400" />
                                <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white/70">{car.fuel}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Settings className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400" />
                                <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white/70">{car.transmission}</span>
                              </div>
                            </div>

                            {/* Footer: Rating + CTA */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400 fill-current" />
                                <span className="text-[11px] sm:text-[12px] md:text-[13px] font-semibold text-white">{car.rating}</span>
                                <span className="text-[9px] sm:text-[10px] md:text-[11px] text-white/40">({car.reviews})</span>
                              </div>
                              <div className="flex items-center gap-1 sm:gap-1.5 text-purple-400">
                                <span className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold tracking-wide">Détails</span>
                                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                  <ArrowRight className="w-3 h-3 sm:w-[14px] sm:h-[14px] text-white" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Expanded Card View */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="grid md:grid-cols-[45%_55%] gap-0"
                      >
                        {/* Left - Large Image */}
                        <div className="relative h-[200px] sm:h-[240px] md:h-[420px]">
                          <Image
                            src={car.image}
                            alt={car.name}
                            fill
                            className="object-cover object-left"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80 hidden md:block" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent md:hidden" />

                          {/* Close Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedCarId(null);
                            }}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                          >
                            <X className="w-5 h-5 sm:w-5 sm:h-5 text-white" />
                          </button>

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
                            <div className="px-4 py-2 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-500/30">
                              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">{car.category}</span>
                            </div>
                          </div>

                          {/* Accent line */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-b-full" />
                        </div>

                        {/* Right - Details */}
                        <div className="relative bg-gradient-to-br from-black via-[#0a0a0a] to-black p-4 sm:p-5 md:p-7 flex flex-col">
                          {/* Header */}
                          <div className="mb-3 sm:mb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                              <span className="text-sm font-semibold text-white">{car.rating}</span>
                              <span className="text-xs text-white/40">({car.reviews} avis)</span>
                            </div>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">{car.name}</h2>
                            <p className="text-white/50 text-xs sm:text-sm">{car.description}</p>
                          </div>

                          {/* Price */}
                          <div className="bg-white/5 rounded-xl p-3 sm:p-3.5 md:p-4 mb-3 sm:mb-4 border border-white/10">
                            <div className="flex items-end justify-between">
                              <div>
                                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">Prix par jour</p>
                                <div className="flex items-baseline gap-1">
                                  <span className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">{car.price}</span>
                                  <span className="text-white/50 text-xs">MAD</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] text-white/40 mb-0.5">Année</p>
                                <p className="text-sm sm:text-base font-bold text-white">{car.year}</p>
                              </div>
                            </div>
                          </div>

                          {/* Specs Grid */}
                          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-3 sm:mb-4">
                            {[
                              { icon: Users, label: 'Places', value: car.seats },
                              { icon: Fuel, label: 'Carburant', value: car.fuel },
                              { icon: Settings, label: 'Boîte', value: car.transmission },
                              { icon: Car, label: 'Puissance', value: car.power },
                            ].map((spec, idx) => (
                              <div key={idx} className="bg-white/5 rounded-lg p-2 sm:p-2.5 text-center border border-white/5">
                                <spec.icon className="w-3.5 h-3.5 text-purple-400 mx-auto mb-1" />
                                <p className="text-[9px] text-white/40 uppercase tracking-wider mb-0.5">{spec.label}</p>
                                <p className="text-xs font-semibold text-white">{spec.value}</p>
                              </div>
                            ))}
                          </div>

                          {/* Insurance & Features */}
                          <div className="bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 rounded-xl p-3 sm:p-3.5 mb-3 sm:mb-4 border border-purple-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                              <p className="text-[11px] sm:text-xs font-semibold text-white">Assurance tous risques incluse</p>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5">
                              {car.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-1.5">
                                  <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                                  <span className="text-[10px] sm:text-[11px] text-white/70">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* CTA Button */}
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReserve();
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-bold rounded-full shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 mt-auto"
                          >
                            Réserver ce véhicule
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredCars.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Car className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white/40 mb-2">
                Aucun véhicule trouvé
              </h3>
              <p className="text-white/30">
                Essayez de sélectionner une autre catégorie
              </p>
            </motion.div>
          )}

        </div>
      </section>

      {/* Moto CTA Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-fuchsia-600/10 to-purple-600/10 blur-3xl"
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center"
          >
            {/* Subtitle */}
            <p className="text-purple-400/80 text-sm font-medium tracking-[0.15em] uppercase mb-4">
              Explorer Marrakech Autrement
            </p>

            {/* Main Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Voulez-vous une{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-fuchsia-400">
                Moto ?
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg text-white/50 max-w-xl mx-auto mb-10">
              Parcourez Marrakech en toute liberté avec notre collection de motos et scooters premium.
            </p>

            {/* CTA Button */}
            <motion.button
              onClick={() => setIsDevModalOpen(true)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 rounded-full bg-white text-black text-[15px] font-medium inline-flex items-center gap-2 transition-colors hover:bg-white/90"
            >
              Découvrir les motos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </motion.button>
          </motion.div>
        </div>
      </section>


      {/* Dev Modal */}
      <DevModal isOpen={isDevModalOpen} onClose={() => setIsDevModalOpen(false)} />
    </div>
  );
}