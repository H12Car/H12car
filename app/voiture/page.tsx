"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Fuel, Users, Settings, Car, ArrowRight, Heart, Shield, X, MapPin } from "lucide-react";
import Image from "next/image";
import { useBooking } from "@/context/bookingContext";
import MousePushCard from "@/components/MousePushCard";

const cars = [
  {
    id: 8,
    name: "Hyundai Tucson",
    category: "SUV Familial",
    price: "750",
    period: "jour",
    image: "/voiture_h12/h12_tucson.png",
    description: "SUV moderne et spacieux pour toute la famille",
    features: ["5 Places", "Automatique", "Écran Tactile", "Caméra 360°"],
    rating: 4.8,
    reviews: 87,
    fuel: "Diesel",
    seats: 5,
    transmission: "Automatique",
    year: 2024,
    power: "136 ch",
    favorite: true
  },
  {
    id: 9,
    name: "Volkswagen Touareg",
    category: "SUV Premium",
    price: "1200",
    period: "jour",
    image: "/voiture_h12/h12_touareg.png",
    description: "Luxe et performance pour une expérience haut de gamme",
    features: ["5 Places", "Automatique", "Cuir", "Toit Panoramique"],
    rating: 4.9,
    reviews: 56,
    fuel: "Diesel",
    seats: 5,
    transmission: "Automatique",
    year: 2023,
    power: "286 ch",
    favorite: false
  },
  {
    id: 7,
    name: "Dacia Duster",
    category: "SUV Compact",
    price: "450",
    period: "jour",
    image: "/voiture_h12/h12_daciaduster.png",
    description: "SUV robuste parfait pour l'aventure et la montagne",
    features: ["5 Places", "Climatisation", "4x4", "Barres de Toit"],
    rating: 4.7,
    reviews: 198,
    fuel: "Diesel",
    seats: 5,
    transmission: "Manuelle",
    year: 2023,
    power: "115 ch",
    favorite: true
  },
  {
    id: 1,
    name: "Renault Clio 5",
    category: "Économique",
    price: "250",
    period: "jour",
    image: "/voiture_h12/h12_clio5.png",
    description: "Citadine polyvalente et économique, idéale pour la ville",
    features: ["5 Places", "Climatisation", "Bluetooth", "USB"],
    rating: 4.7,
    reviews: 156,
    fuel: "Diesel",
    seats: 5,
    transmission: "Manuelle",
    year: 2023,
    power: "90 ch",
    favorite: false
  },
  {
    id: 5,
    name: "Hyundai Accent",
    category: "Berline",
    price: "280",
    period: "jour",
    image: "/voiture_h12/h12_haccent.png",
    description: "Berline confortable pour longs trajets",
    features: ["5 Places", "Climatisation", "Grand Coffre", "Bluetooth"],
    rating: 4.5,
    reviews: 167,
    fuel: "Diesel",
    seats: 5,
    transmission: "Manuelle",
    year: 2022,
    power: "100 ch",
    favorite: false
  },
  {
    id: 3,
    name: "Fiat 500",
    category: "Citadine",
    price: "300",
    period: "jour",
    image: "/voiture_h12/h12_fiat500.png",
    description: "Style italien et maniabilité parfaite en ville",
    features: ["4 Places", "Climatisation", "Toit Ouvrant", "Design"],
    rating: 4.6,
    reviews: 89,
    fuel: "Essence",
    seats: 4,
    transmission: "Manuelle",
    year: 2023,
    power: "70 ch",
    favorite: false
  },
  {
    id: 4,
    name: "Hyundai i20",
    category: "Économique",
    price: "250",
    period: "jour",
    image: "/voiture_h12/h12_Hi20.png",
    description: "Compacte moderne avec équipements premium",
    features: ["5 Places", "Climatisation", "Écran Tactile", "Caméra"],
    rating: 4.6,
    reviews: 134,
    fuel: "Essence",
    seats: 5,
    transmission: "Manuelle",
    year: 2023,
    power: "84 ch",
    favorite: false
  },
  {
    id: 2,
    name: "Dacia Sandero",
    category: "Économique",
    price: "220",
    period: "jour",
    image: "/voiture_h12/h12_Daciasandero.png",
    description: "Le meilleur rapport qualité-prix pour vos déplacements",
    features: ["5 Places", "Climatisation", "Bluetooth", "Économique"],
    rating: 4.5,
    reviews: 203,
    fuel: "Essence",
    seats: 5,
    transmission: "Manuelle",
    year: 2023,
    power: "90 ch",
    favorite: true
  },
  {
    id: 6,
    name: "Opel Corsa",
    category: "Économique",
    price: "260",
    period: "jour",
    image: "/voiture_h12/h12_oppel.png",
    description: "Fiabilité allemande et confort au quotidien",
    features: ["5 Places", "Climatisation", "Bluetooth", "Régulateur"],
    rating: 4.4,
    reviews: 112,
    fuel: "Essence",
    seats: 5,
    transmission: "Manuelle",
    year: 2023,
    power: "75 ch",
    favorite: false
  },
  {
    id: 10,
    name: "Mercedes Sprinter",
    category: "Transport",
    price: "500",
    period: "trajet",
    image: "/voiture_h12/h12_transporttouristicmerco.png",
    description: "Transport touristique confortable pour vos transferts aéroport",
    features: ["15 Places", "Climatisation", "Bagages", "Confort Premium"],
    rating: 4.9,
    reviews: 210,
    fuel: "Diesel",
    seats: 15,
    transmission: "Automatique",
    year: 2023,
    power: "190 ch",
    favorite: false
  },
  {
    id: 11,
    name: "Fiat Ducato",
    category: "Transport",
    price: "400",
    period: "trajet",
    image: "/voiture_h12/h12_transporttouristiquefiat.png",
    description: "Navette aéroport spacieuse et fiable pour groupes",
    features: ["12 Places", "Climatisation", "Bagages", "Wifi"],
    rating: 4.7,
    reviews: 178,
    fuel: "Diesel",
    seats: 12,
    transmission: "Manuelle",
    year: 2023,
    power: "160 ch",
    favorite: false
  },
];

const categories = [
  "Tous",
  "Économique",
  "Citadine",
  "Berline",
  "SUV",
  "Transport"
];

export default function VoiturePage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [expandedCarId, setExpandedCarId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([8, 9, 7]);
  const { openWizard } = useBooking();

  const filteredCars = selectedCategory === "Tous"
    ? cars
    : cars.filter(car =>
        selectedCategory === "SUV"
          ? car.category.includes("SUV")
          : car.category === selectedCategory
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

  const handleReserve = (car: typeof cars[0]) => {
    setExpandedCarId(null);
    openWizard("car", {
      id: car.id,
      name: car.name,
      price: car.price,
      period: car.period,
      image: car.image,
      category: car.category,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Apple Style */}
      <section className="relative pt-24 sm:pt-28 pb-12 lg:pt-40 lg:pb-20 overflow-hidden">
        {/* Background Elements - CSS animations for GPU acceleration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl animate-pulse-slow"
            style={{ willChange: 'transform, opacity' }}
          />
          <div
            className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-blue-100/50 blur-3xl animate-pulse-slow-delayed"
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
                <Car className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">
                  Collection Premium
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
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-gray-300/50">
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
              className="text-base sm:text-lg text-gray-500 leading-relaxed mb-6 max-w-md mx-auto"
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
                <div key={idx} className="px-4 py-2 rounded-xl bg-white border border-gray-100 shadow-sm text-center">
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="text-xl sm:text-2xl font-black text-gray-900">{stat.value}</span>
                    {stat.suffix && <span className="text-sm font-bold text-blue-500">{stat.suffix}</span>}
                    {stat.hasStar && <Star className="w-3 h-3 text-blue-500 fill-blue-500 ml-0.5" />}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{stat.label}</div>
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
                className="text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.1] tracking-[-0.02em] mb-6"
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
                className="text-lg xl:text-xl text-gray-500 leading-relaxed mb-10 max-w-[520px]"
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
                  <div key={idx} className="px-5 py-2.5 rounded-xl bg-white border border-gray-100 shadow-sm text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-3xl font-black text-gray-900 tracking-tighter">{stat.value}</span>
                      {stat.suffix && <span className="text-xl font-bold text-blue-500">{stat.suffix}</span>}
                      {stat.hasStar && (
                        <Star className="w-4 h-4 text-blue-500 fill-blue-500 ml-0.5" />
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
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
              <div className="absolute inset-0 bg-blue-100/50 blur-[80px] rounded-full" />

              {/* Image Container */}
              <MousePushCard maxTilt={10} smoothing={0.06} className="relative max-w-[466px] w-full">
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-gray-100">
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
                  className="absolute -top-4 -right-4 px-4 py-2.5 rounded-full bg-white border border-gray-100 flex items-center gap-2 shadow-lg"
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
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                                <span className="text-[11px] sm:text-[12px] md:text-[13px] font-semibold text-white">{car.rating}</span>
                                <span className="text-[9px] sm:text-[10px] md:text-[11px] text-white/40">({car.reviews})</span>
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
                                  <span className="text-xs font-semibold text-white">{car.rating}</span>
                                  <span className="text-[10px] text-white/40">({car.reviews})</span>
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
              <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                Aucun véhicule trouvé
              </h3>
              <p className="text-gray-400">
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-100/50 blur-3xl animate-pulse-slow"
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
              Explorer Marrakech Autrement
            </p>

            {/* Main Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Voulez-vous une{" "}
              <span className="text-blue-500">
                Moto ?
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10">
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