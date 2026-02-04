"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Fuel, Users, Settings, Car, ArrowRight, Heart, Shield, X, MapPin } from "lucide-react";
import Image from "next/image";
import { useBooking } from "@/context/bookingContext";
import MousePushCard from "@/components/MousePushCard";

interface Vehicle {
  id: string;
  name: string;
  category: string;
  price: number;
  period: string;
  image: string;
  description: string | null;
  features: string[];
  fuel: string | null;
  seats: number | null;
  transmission: string | null;
  year: number | null;
  power: string | null;
  available: boolean;
  featured: boolean;
}

interface VoitureClientProps {
  cars: Vehicle[];
}

const categories = [
  "Tous",
  "SUV",
  "Berline",
  "Citadine",
  "Économique",
  "Transport"
];

export default function VoitureClient({ cars }: VoitureClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [expandedCarId, setExpandedCarId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { openWizard } = useBooking();

  const filteredCars = selectedCategory === "Tous"
    ? cars
    : cars.filter(car =>
        selectedCategory === "SUV"
          ? car.category.includes("SUV")
          : car.category === selectedCategory
      );

  const handleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const handleCardClick = (carId: string) => {
    setExpandedCarId(expandedCarId === carId ? null : carId);
  };

  const handleReserve = (car: Vehicle) => {
    setExpandedCarId(null);
    openWizard("car", {
      id: car.id,
      name: car.name,
      price: String(car.price),
      period: car.period,
      image: car.image,
      category: car.category,
    });
  };

  return (
    <div className="min-h-screen bg-zinc-800">
      {/* Hero Section - Apple Style */}
      <section className="relative pt-24 sm:pt-28 pb-12 lg:pt-40 lg:pb-20 overflow-hidden">
        {/* Background Elements - CSS animations for GPU acceleration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl animate-pulse-slow"
            style={{ willChange: 'transform, opacity' }}
          />
          <div
            className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-sky-500/20 blur-3xl animate-pulse-slow-delayed"
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
                <Car className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold text-blue-400">
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
              <span className="text-blue-500">
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
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                <Image
                  src="/voiture_h12/h12_car_new.webp"
                  alt="H12 Premium Car"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover scale-[1.12]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-6 max-w-md mx-auto"
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
                { value: String(cars.length), suffix: '+', label: 'Modèles' },
                { value: '100', suffix: '%', label: 'Assurés' },
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
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onClick={() => {
                document.getElementById('cars-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              whileTap={{ scale: 0.98 }}
              className="mx-auto px-7 py-3.5 rounded-full bg-blue-500 text-white text-sm font-semibold shadow-lg flex items-center gap-2 hover:bg-blue-600 transition-all"
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
                className="text-blue-500 text-sm font-medium tracking-[0.15em] uppercase mb-5"
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
                <span className="text-blue-500">
                  Votre Liberté.
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-lg xl:text-xl text-zinc-400 leading-relaxed mb-10 max-w-[520px]"
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
                  { value: String(cars.length), suffix: '+', label: 'Modèles' },
                  { value: '100', suffix: '%', label: 'Assurés' },
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
                  className="group px-7 py-3.5 rounded-full bg-blue-500 text-white text-[15px] font-medium flex items-center gap-2 transition-colors hover:bg-blue-600"
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
              <div className="absolute inset-0 bg-blue-500/30 blur-[80px] rounded-full" />

              {/* Image Container */}
              <MousePushCard maxTilt={10} smoothing={0.06} className="relative max-w-[466px] w-full">
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-zinc-700 shadow-2xl shadow-black/50">
                  <Image
                    src="/voiture_h12/h12_car_new.webp"
                    alt="H12 Premium Vehicle"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 466px"
                    className="object-cover scale-[1.12]"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                {/* Floating Icon Pills */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                  className="absolute -top-4 -right-4 px-4 py-2.5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center gap-2 shadow-lg shadow-black/30"
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
                  <Car className="w-5 h-5 text-white" />
                </motion.div>
              </MousePushCard>
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
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700"
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group cursor-pointer"
                  onClick={() => handleCardClick(car.id)}
                >
                  <MousePushCard maxTilt={8} smoothing={0.05}>
                  <div
                    className={`relative bg-black overflow-hidden rounded-[20px] sm:rounded-[24px] h-[380px] sm:h-[400px] lg:h-[440px] transition-all duration-500 ${!isExpanded ? 'hover:shadow-2xl' : 'shadow-2xl ring-2 ring-blue-500/30'}`}
                  >
                    {/* Car Image - Always full size */}
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`object-cover object-center transition-all duration-700 ${isExpanded ? 'scale-[1.15]' : 'scale-[1.1] group-hover:scale-[1.12]'}`}
                    />

                    {/* Gradient Overlay - stronger when expanded */}
                    <div className={`absolute inset-0 transition-all duration-500 ${isExpanded ? 'bg-gradient-to-t from-black/90 via-black/50 to-black/20' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`} />

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

                    {/* Top Left - Close Button (expanded) or Category Badge */}
                    <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20">
                      {isExpanded ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedCarId(null);
                          }}
                          className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      ) : (
                        <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                          <span className="text-[10px] sm:text-[11px] font-bold text-white/90 uppercase tracking-wide">{car.category}</span>
                        </div>
                      )}
                    </div>

                    {/* Accent line at top */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-1 bg-blue-500 rounded-b-full z-10" />

                    {/* Collapsed: Info Card at Bottom */}
                    <AnimatePresence>
                      {!isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                          className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 md:p-4"
                        >
                          <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-3.5 md:p-4 border border-white/10 group-hover:bg-white/15 group-hover:border-white/20 transition-all duration-500">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-sm sm:text-[15px] md:text-[17px] font-bold text-white leading-tight pr-2">
                                {car.name}
                              </h3>
                              <div className="flex-shrink-0 text-right">
                                <span className="text-sm sm:text-[14px] md:text-[16px] font-black text-blue-400">{car.price}</span>
                                <span className="text-[9px] sm:text-[10px] md:text-[11px] text-white/50 ml-0.5">MAD/{car.period}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 mb-2.5">
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
                                <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white/70">{car.seats}pl</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Fuel className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
                                <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white/70">{car.fuel}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Settings className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
                                <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white/70">{car.transmission}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400 fill-current" />
                                <span className="text-[11px] sm:text-[12px] md:text-[13px] font-semibold text-white">4.8</span>
                                <span className="text-[9px] sm:text-[10px] md:text-[11px] text-white/40">(50+)</span>
                              </div>
                              <div className="flex items-center gap-1 sm:gap-1.5 text-blue-400">
                                <span className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold tracking-wide">Détails</span>
                                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                  <ArrowRight className="w-3 h-3 sm:w-[14px] sm:h-[14px] text-white" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Expanded: Frosted Glass Overlay Sheet */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, y: 60 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 60 }}
                          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                          className="absolute bottom-0 left-0 right-0 z-10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="bg-black/60 backdrop-blur-2xl rounded-t-[20px] border-t border-white/10 p-4 sm:p-5">
                            {/* Grab Handle */}
                            <div className="w-8 h-1 bg-white/20 rounded-full mx-auto mb-3" />

                            {/* Name + Price Row */}
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h2 className="text-base sm:text-lg font-bold text-white leading-tight">{car.name}</h2>
                                <div className="flex items-center gap-1.5 mt-1">
                                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                                  <span className="text-xs font-semibold text-white">4.8</span>
                                  <span className="text-[10px] text-white/40">(50+)</span>
                                  <span className="text-white/20 mx-1">·</span>
                                  <span className="text-[10px] text-white/50">{car.year}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-xl sm:text-2xl font-black text-blue-400">{car.price}</span>
                                <p className="text-[10px] text-white/40">MAD/{car.period}</p>
                              </div>
                            </div>

                            {/* Specs Row - Horizontal minimal */}
                            <div className="flex items-center gap-3 mb-3">
                              {[
                                { icon: Users, value: `${car.seats}pl` },
                                { icon: Fuel, value: car.fuel },
                                { icon: Settings, value: car.transmission },
                                { icon: Car, value: car.power },
                              ].map((spec, idx) => (
                                <div key={idx} className="flex items-center gap-1">
                                  <spec.icon className="w-3 h-3 text-blue-400" />
                                  <span className="text-[10px] sm:text-[11px] text-white/70">{spec.value}</span>
                                </div>
                              ))}
                            </div>

                            {/* Features as Pills */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/15 border border-blue-500/20">
                                <Shield className="w-3 h-3 text-blue-400" />
                                <span className="text-[9px] sm:text-[10px] font-medium text-blue-300">Assurance incluse</span>
                              </div>
                              {car.features.slice(0, 3).map((feature, idx) => (
                                <div key={idx} className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                                  <span className="text-[9px] sm:text-[10px] text-white/60">{feature}</span>
                                </div>
                              ))}
                            </div>

                            {/* Delivery + CTA Row */}
                            <div className="flex items-center gap-2 mb-3">
                              <MapPin className="w-3 h-3 text-green-400 flex-shrink-0" />
                              <span className="text-[10px] text-green-300/80">
                                {car.period === "trajet"
                                  ? "Transport aéroport & centre-ville"
                                  : "Livraison gratuite Marrakech (15km)"}
                              </span>
                            </div>

                            {/* CTA Button */}
                            <motion.button
                              onClick={() => handleReserve(car)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-full shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all duration-300"
                            >
                              {car.period === "trajet" ? "Réserver ce transport" : "Réserver ce véhicule"}
                              <ArrowRight className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  </MousePushCard>
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
              <Car className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-zinc-400 mb-2">
                Aucun véhicule trouvé
              </h3>
              <p className="text-zinc-500">
                Essayez de sélectionner une autre catégorie
              </p>
            </motion.div>
          )}

        </div>
      </section>

      {/* Moto CTA Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background Gradient - CSS animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-3xl animate-pulse-slow"
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
            <p className="text-blue-400 text-sm font-medium tracking-[0.15em] uppercase mb-4">
              Explorer Marrakech Autrement
            </p>

            {/* Main Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Voulez-vous une{" "}
              <span className="text-blue-500">
                Moto ?
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10">
              Parcourez Marrakech en toute liberté avec notre collection de motos et scooters premium.
            </p>

            {/* CTA Button */}
            <motion.a
              href="/moto"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 rounded-full bg-blue-500 text-white text-[15px] font-medium inline-flex items-center gap-2 transition-colors hover:bg-blue-600"
            >
              Découvrir les motos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
