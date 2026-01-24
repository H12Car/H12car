"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Fuel, Users, Settings, Bike, ArrowRight, Heart, Shield, X, MapPin } from "lucide-react";
import Image from "next/image";
import { useBooking } from "@/context/bookingContext";
import MousePushCard from "@/components/MousePushCard";

const motos = [
  // PREMIUM ADVENTURE
  {
    id: 20,
    name: "BMW R 1250 GS",
    category: "Adventure",
    price: "1850",
    period: "jour",
    image: "/moto_h12/h12_gs1250.png",
    description: "Le summum de l'aventure avec confort et performance",
    features: ["1254cc", "Manuelle", "Essence", "ShiftCam"],
    rating: 4.9,
    reviews: 167,
    fuel: "Essence",
    seats: 2,
    transmission: "Manuelle",
    year: 2024,
    power: "136 ch",
    favorite: true
  },
  {
    id: 19,
    name: "Honda Africa Twin 1100",
    category: "Adventure",
    price: "1600",
    period: "jour",
    image: "/moto_h12/h12_africatwin1100.png",
    description: "La moto parfaite pour explorer le désert et les pistes",
    features: ["1084cc", "DCT/Manuel", "Essence", "HSTC"],
    rating: 4.9,
    reviews: 145,
    fuel: "Essence",
    seats: 2,
    transmission: "DCT Auto",
    year: 2024,
    power: "102 ch",
    favorite: true
  },
  {
    id: 18,
    name: "BMW F 850 GS",
    category: "Adventure",
    price: "1300",
    period: "jour",
    image: "/moto_h12/h12_gs850.png",
    description: "La polyvalente BMW avec capacités off-road",
    features: ["853cc", "Manuelle", "Essence", "Pro Mode"],
    rating: 4.8,
    reviews: 78,
    fuel: "Essence",
    seats: 2,
    transmission: "Manuelle",
    year: 2024,
    power: "95 ch",
    favorite: false
  },
  // ADVENTURE
  {
    id: 17,
    name: "BMW F 750 GS",
    category: "Adventure",
    price: "1100",
    period: "jour",
    image: "/moto_h12/h12_gs750.png",
    description: "Adventure BMW accessible avec grand confort",
    features: ["853cc", "Manuelle", "Essence", "TFT"],
    rating: 4.7,
    reviews: 67,
    fuel: "Essence",
    seats: 2,
    transmission: "Manuelle",
    year: 2024,
    power: "77 ch",
    favorite: false
  },
  {
    id: 16,
    name: "Yamaha Ténéré 700",
    category: "Adventure",
    price: "950",
    period: "jour",
    image: "/moto_h12/h12_tenere700.png",
    description: "L'aventurière par excellence inspirée du Dakar",
    features: ["689cc", "Manuelle", "Essence", "Rally"],
    rating: 4.9,
    reviews: 123,
    fuel: "Essence",
    seats: 2,
    transmission: "Manuelle",
    year: 2024,
    power: "73 ch",
    favorite: true
  },
  {
    id: 10,
    name: "Honda X-ADV 750",
    category: "Maxi-Scooter",
    price: "950",
    period: "jour",
    image: "/moto_h12/h12_xadv750.png",
    description: "Le crossover ultime entre scooter et trail",
    features: ["750cc", "DCT", "Essence", "HSTC"],
    rating: 4.9,
    reviews: 87,
    fuel: "Essence",
    seats: 2,
    transmission: "DCT Auto",
    year: 2024,
    power: "59 ch",
    favorite: true
  },
  // SCOOTER GT PREMIUM & TRAIL
  {
    id: 11,
    name: "Yamaha TMAX Techmax 560",
    category: "Maxi-Scooter",
    price: "900",
    period: "jour",
    image: "/moto_h12/h12_tmaxTechmax560.png",
    description: "Le roi des maxi-scooters sportifs",
    features: ["560cc", "Automatique", "Essence", "TCS"],
    rating: 4.9,
    reviews: 112,
    fuel: "Essence",
    seats: 2,
    transmission: "Automatique",
    year: 2024,
    power: "48 ch",
    favorite: true
  },
  {
    id: 15,
    name: "Yamaha MT 450",
    category: "Trail",
    price: "800",
    period: "jour",
    image: "/moto_h12/h12_mt450.png",
    description: "Trail polyvalente pour route et piste",
    features: ["450cc", "Manuelle", "Essence", "LED"],
    rating: 4.6,
    reviews: 56,
    fuel: "Essence",
    seats: 2,
    transmission: "Manuelle",
    year: 2023,
    power: "42 ch",
    favorite: false
  },
  {
    id: 13,
    name: "KTM Adventure 390",
    category: "Adventure",
    price: "700",
    period: "jour",
    image: "/moto_h12/h12_ktmadventure390.png",
    description: "Compacte et agile pour les aventures urbaines et off-road",
    features: ["373cc", "Manuelle", "Essence", "Quickshifter"],
    rating: 4.7,
    reviews: 89,
    fuel: "Essence",
    seats: 2,
    transmission: "Manuelle",
    year: 2024,
    power: "43 ch",
    favorite: false
  },
  // SCOOTER GT & ADVENTURE
  {
    id: 9,
    name: "Yamaha DX 530",
    category: "Maxi-Scooter",
    price: "650",
    period: "jour",
    image: "/moto_h12/h12_yamahadx530.png",
    description: "Maxi-scooter sportif hautes performances",
    features: ["530cc", "Automatique", "Essence", "TCS"],
    rating: 4.7,
    reviews: 54,
    fuel: "Essence",
    seats: 2,
    transmission: "Automatique",
    year: 2023,
    power: "46 ch",
    favorite: false
  },
  {
    id: 14,
    name: "Royal Enfield Himalayan",
    category: "Adventure",
    price: "650",
    period: "jour",
    image: "/moto_h12/h12_royalhimalayan.png",
    description: "L'aventurière authentique au style rétro",
    features: ["411cc", "Manuelle", "Essence", "ABS"],
    rating: 4.6,
    reviews: 94,
    fuel: "Essence",
    seats: 2,
    transmission: "Manuelle",
    year: 2024,
    power: "24 ch",
    favorite: false
  },
  {
    id: 12,
    name: "Yamaha XT 250",
    category: "Trail",
    price: "550",
    period: "jour",
    image: "/moto_h12/h12_yamahaxt250.png",
    description: "Trail légère parfaite pour débuter l'aventure",
    features: ["250cc", "Manuelle", "Essence", "Injection"],
    rating: 4.5,
    reviews: 78,
    fuel: "Essence",
    seats: 2,
    transmission: "Manuelle",
    year: 2023,
    power: "20 ch",
    favorite: false
  },
  // SCOOTERS
  {
    id: 8,
    name: "Honda X-ADV 300",
    category: "Maxi-Scooter",
    price: "500",
    period: "jour",
    image: "/moto_h12/h12_xadv300.png",
    description: "Scooter crossover polyvalent route et piste",
    features: ["300cc", "Automatique", "Essence", "ABS"],
    rating: 4.8,
    reviews: 76,
    fuel: "Essence",
    seats: 2,
    transmission: "Automatique",
    year: 2024,
    power: "29 ch",
    favorite: true
  },
  {
    id: 6,
    name: "Yamaha XMAX 250",
    category: "Maxi-Scooter",
    price: "450",
    period: "jour",
    image: "/moto_h12/h12_xmax250.png",
    description: "Scooter GT confortable pour longs trajets",
    features: ["250cc", "Automatique", "Essence", "ABS"],
    rating: 4.7,
    reviews: 98,
    fuel: "Essence",
    seats: 2,
    transmission: "Automatique",
    year: 2023,
    power: "23 ch",
    favorite: false
  },
  {
    id: 7,
    name: "SYM 300",
    category: "Maxi-Scooter",
    price: "450",
    period: "jour",
    image: "/moto_h12/h12_sym300.png",
    description: "Maxi-scooter polyvalent ville et route",
    features: ["300cc", "Automatique", "Essence", "CBS"],
    rating: 4.5,
    reviews: 67,
    fuel: "Essence",
    seats: 2,
    transmission: "Automatique",
    year: 2023,
    power: "26 ch",
    favorite: false
  },
  {
    id: 4,
    name: "Yamaha NMAX 155",
    category: "Scooter",
    price: "400",
    period: "jour",
    image: "/moto_h12/h12_nmax155.png",
    description: "Scooter sportif avec design moderne et performances",
    features: ["155cc", "Automatique", "Essence", "ABS"],
    rating: 4.7,
    reviews: 178,
    fuel: "Essence",
    seats: 2,
    transmission: "Automatique",
    year: 2023,
    power: "15 ch",
    favorite: true
  },
  {
    id: 5,
    name: "Yamaha XMAX 125",
    category: "Scooter",
    price: "400",
    period: "jour",
    image: "/moto_h12/h12_xmax125.png",
    description: "Scooter GT compact avec équipements premium",
    features: ["125cc", "Automatique", "Essence", "TCS"],
    rating: 4.6,
    reviews: 112,
    fuel: "Essence",
    seats: 2,
    transmission: "Automatique",
    year: 2023,
    power: "12 ch",
    favorite: false
  },
  {
    id: 3,
    name: "SYM 125",
    category: "Scooter",
    price: "350",
    period: "jour",
    image: "/moto_h12/h12_sym125.png",
    description: "Scooter polyvalent avec bon rapport qualité-prix",
    features: ["125cc", "Automatique", "Essence", "ABS"],
    rating: 4.5,
    reviews: 134,
    fuel: "Essence",
    seats: 2,
    transmission: "Automatique",
    year: 2023,
    power: "12 ch",
    favorite: false
  },
  {
    id: 2,
    name: "TVS 125",
    category: "Scooter",
    price: "300",
    period: "jour",
    image: "/moto_h12/h12_tvs125.png",
    description: "Scooter fiable et confortable pour la ville",
    features: ["125cc", "Automatique", "Essence", "USB"],
    rating: 4.4,
    reviews: 89,
    fuel: "Essence",
    seats: 2,
    transmission: "Automatique",
    year: 2023,
    power: "10 ch",
    favorite: false
  },
  {
    id: 1,
    name: "SYM 50cc",
    category: "Scooter",
    price: "200",
    period: "jour",
    image: "/moto_h12/h12_sym50.png",
    description: "Scooter économique idéal pour les déplacements en ville",
    features: ["50cc", "Automatique", "Essence", "Sans Permis"],
    rating: 4.5,
    reviews: 156,
    fuel: "Essence",
    seats: 2,
    transmission: "Automatique",
    year: 2024,
    power: "4 ch",
    favorite: false
  },
];

const categories = [
  "Tous",
  "Scooter",
  "Maxi-Scooter",
  "Trail",
  "Adventure"
];

export default function MotoPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [expandedMotoId, setExpandedMotoId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([4, 8, 10, 11, 16, 19, 20]);
  const { openWizard } = useBooking();

  const filteredMotos = selectedCategory === "Tous"
    ? motos
    : motos.filter(moto => moto.category === selectedCategory);

  const handleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const handleCardClick = (motoId: number) => {
    setExpandedMotoId(expandedMotoId === motoId ? null : motoId);
  };

  const handleReserve = (moto: typeof motos[0]) => {
    setExpandedMotoId(null);
    openWizard("moto", {
      id: moto.id,
      name: moto.name,
      price: moto.price,
      period: moto.period,
      image: moto.image,
      category: moto.category,
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
                <Bike className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">
                  Collection Motos
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
              L&apos;Aventure.
              <br />
              <span className="text-blue-500">
                A Deux Roues.
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
                  src="/moto_h12/h12_moto_new.webp"
                  alt="H12 Premium Moto"
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
              Explorez Marrakech et ses environs avec notre collection de motos et scooters premium.
            </motion.p>

            {/* Stats - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              {[
                { value: '5', suffix: '', label: 'Modeles' },
                { value: '100', suffix: '%', label: 'Assures' },
                { value: '4.8', label: 'Note', hasStar: true }
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
                document.getElementById('motos-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              whileTap={{ scale: 0.98 }}
              className="mx-auto px-7 py-3.5 rounded-full bg-blue-500 text-white text-sm font-semibold shadow-lg flex items-center gap-2 hover:bg-blue-600 transition-all"
            >
              Voir nos Motos
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
                Location de Motos Premium
              </motion.p>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.1] tracking-[-0.02em] mb-6"
              >
                L&apos;Aventure.
                <br />
                <span className="text-blue-500">
                  A Deux Roues.
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-lg xl:text-xl text-gray-500 leading-relaxed mb-10 max-w-[520px]"
              >
                Des motos aventure aux scooters elegants, parcourez Marrakech
                et ses environs avec style et liberte.
              </motion.p>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="flex items-center gap-4 mb-10"
              >
                {[
                  { value: '5', suffix: '', label: 'Modeles' },
                  { value: '100', suffix: '%', label: 'Assures' },
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
                    document.getElementById('motos-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-7 py-3.5 rounded-full bg-blue-500 text-white text-[15px] font-medium flex items-center gap-2 transition-colors hover:bg-blue-600"
                >
                  Voir nos Motos
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </motion.button>
                <motion.button
                  onClick={() => {
                    document.getElementById('motos-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
              <div className="absolute inset-0 bg-blue-100/50 blur-[80px] rounded-full" />

              {/* Image Container */}
              <MousePushCard maxTilt={10} smoothing={0.06} className="relative max-w-[466px] w-full">
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-gray-100 shadow-2xl shadow-gray-300/50">
                  <Image
                    src="/moto_h12/h12_moto_new.webp"
                    alt="H12 Premium Moto"
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
                  <Bike className="w-5 h-5 text-white" />
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
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Motos Grid */}
      <section id="motos-grid" className="py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredMotos.map((moto, index) => {
              const isExpanded = expandedMotoId === moto.id;

              return (
                <motion.div
                  key={moto.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group cursor-pointer"
                  onClick={() => handleCardClick(moto.id)}
                >
                  <MousePushCard maxTilt={8} smoothing={0.05}>
                  <div
                    className={`relative bg-black overflow-hidden rounded-[20px] sm:rounded-[24px] h-[380px] sm:h-[400px] lg:h-[440px] transition-all duration-500 ${!isExpanded ? 'hover:shadow-2xl' : 'shadow-2xl ring-2 ring-blue-500/30'}`}
                  >
                    {/* Moto Image - Always full size */}
                    <Image
                      src={moto.image}
                      alt={moto.name}
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
                        handleFavorite(moto.id);
                      }}
                      className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                    >
                      <Heart
                        className={`w-4 h-4 sm:w-[18px] sm:h-[18px] transition-all duration-300 ${
                          favorites.includes(moto.id)
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
                            setExpandedMotoId(null);
                          }}
                          className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      ) : (
                        <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                          <span className="text-[10px] sm:text-[11px] font-bold text-white/90 uppercase tracking-wide">{moto.category}</span>
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
                                {moto.name}
                              </h3>
                              <div className="flex-shrink-0 text-right">
                                <span className="text-sm sm:text-[14px] md:text-[16px] font-black text-blue-400">{moto.price}</span>
                                <span className="text-[9px] sm:text-[10px] md:text-[11px] text-white/50 ml-0.5">MAD/{moto.period}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 mb-2.5">
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
                                <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white/70">{moto.seats}pl</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Fuel className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
                                <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white/70">{moto.fuel}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Settings className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
                                <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white/70">{moto.transmission}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400 fill-current" />
                                <span className="text-[11px] sm:text-[12px] md:text-[13px] font-semibold text-white">{moto.rating}</span>
                                <span className="text-[9px] sm:text-[10px] md:text-[11px] text-white/40">({moto.reviews})</span>
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
                                <h2 className="text-base sm:text-lg font-bold text-white leading-tight">{moto.name}</h2>
                                <div className="flex items-center gap-1.5 mt-1">
                                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                                  <span className="text-xs font-semibold text-white">{moto.rating}</span>
                                  <span className="text-[10px] text-white/40">({moto.reviews})</span>
                                  <span className="text-white/20 mx-1">·</span>
                                  <span className="text-[10px] text-white/50">{moto.year}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-xl sm:text-2xl font-black text-blue-400">{moto.price}</span>
                                <p className="text-[10px] text-white/40">MAD/{moto.period}</p>
                              </div>
                            </div>

                            {/* Specs Row - Horizontal minimal */}
                            <div className="flex items-center gap-3 mb-3">
                              {[
                                { icon: Users, value: `${moto.seats}pl` },
                                { icon: Fuel, value: moto.fuel },
                                { icon: Settings, value: moto.transmission },
                                { icon: Bike, value: moto.power },
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
                              {moto.features.slice(0, 3).map((feature, idx) => (
                                <div key={idx} className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                                  <span className="text-[9px] sm:text-[10px] text-white/60">{feature}</span>
                                </div>
                              ))}
                            </div>

                            {/* Delivery + CTA Row */}
                            <div className="flex items-center gap-2 mb-3">
                              <MapPin className="w-3 h-3 text-green-400 flex-shrink-0" />
                              <span className="text-[10px] text-green-300/80">
                                Livraison gratuite Marrakech (15km)
                              </span>
                            </div>

                            {/* CTA Button */}
                            <motion.button
                              onClick={() => handleReserve(moto)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-full shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all duration-300"
                            >
                              Réserver cette moto
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
          {filteredMotos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Bike className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                Aucune moto trouvee
              </h3>
              <p className="text-gray-400">
                Essayez de selectionner une autre categorie
              </p>
            </motion.div>
          )}

        </div>
      </section>

      {/* Excursion CTA Section */}
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
              Experiences Uniques
            </p>

            {/* Main Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Envie d&apos;une{" "}
              <span className="text-blue-500">
                Aventure ?
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10">
              Decouvrez nos excursions uniques: quad, dromadaire et bien plus encore.
            </p>

            {/* CTA Button */}
            <motion.a
              href="/excursion"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 rounded-full bg-blue-500 text-white text-[15px] font-medium inline-flex items-center gap-2 transition-colors hover:bg-blue-600"
            >
              Decouvrir nos excursions
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
