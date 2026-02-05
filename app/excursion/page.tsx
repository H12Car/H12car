"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Clock,
  Users,
  MapPin,
  ArrowRight,
  Heart,
  Calendar,
  CheckCircle,
  Compass,
  X,
  Plane,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useBooking } from "@/context/bookingContext";
import MousePushCard from "@/components/MousePushCard";

// ============================================
// EXCURSIONS DATA
// ============================================
const excursions = [
  {
    id: 1,
    name: "Balade en Dromadaire",
    category: "Palmeraie",
    price: "350",
    period: "personne",
    image: "/excursions/h12_dromadaire.png",
    description:
      "Vivez une expérience authentique à dos de dromadaire à travers la palmeraie de Marrakech et ses 100 000 palmiers",
    features: ["Transport A/R", "Guide berbère", "Thé à la menthe", "Photos souvenirs"],
    rating: 4.9,
    reviews: 234,
    duration: "1 heure",
    groupSize: "1-8",
    departure: "Multiple",
    difficulty: "Facile",
    highlights: [
      "Palmeraie de Marrakech",
      "Villages berbères",
      "Pause thé traditionnelle",
      "Coucher de soleil disponible",
    ],
    favorite: true,
  },
  {
    id: 2,
    name: "Aventure Quad",
    category: "Aventure",
    price: "450",
    period: "personne",
    image: "/excursions/h12_quad.png",
    description:
      "Pilotez votre quad à travers la palmeraie et le désert rocheux avec des vues panoramiques sur l'Atlas",
    features: ["Équipement complet", "Guide moniteur", "Quad automatique", "Pause thé berbère"],
    rating: 4.8,
    reviews: 312,
    duration: "2 heures",
    groupSize: "1-12",
    departure: "Multiple",
    difficulty: "Modéré",
    highlights: [
      "Palmeraie & désert rocheux",
      "Vue sur l'Atlas",
      "Villages berbères",
      "Adrénaline garantie",
    ],
    favorite: true,
  },
  {
    id: 3,
    name: "Moto Off-Road",
    category: "Extrême",
    price: "650",
    period: "personne",
    image: "/excursions/h12_motooffroad.png",
    description:
      "Aventure tout-terrain en moto dirt bike à travers les pistes rocheuses et les sentiers de la palmeraie",
    features: ["Moto dirt bike", "Équipement pro", "Guide expert", "Briefing sécurité"],
    rating: 4.7,
    reviews: 145,
    duration: "2-3 heures",
    groupSize: "1-6",
    departure: "09:00 / 14:00",
    difficulty: "Sportif",
    highlights: ["Pistes techniques", "Terrain varié", "Sensations fortes", "Encadrement pro"],
    favorite: false,
  },
  {
    id: 4,
    name: "Combo Quad + Dromadaire",
    category: "Pack",
    price: "700",
    period: "personne",
    image: "/excursions/h12_quadetdromadaire.png",
    description:
      "L'expérience complète : combinez l'adrénaline du quad et la sérénité de la balade en dromadaire",
    features: ["2 activités", "Demi-journée", "Guide dédié", "Thé & collation"],
    rating: 4.9,
    reviews: 189,
    duration: "3 heures",
    groupSize: "1-8",
    departure: "09:00 / 15:00",
    difficulty: "Modéré",
    highlights: [
      "1h Quad + 1h Dromadaire",
      "Meilleur rapport qualité/prix",
      "Pause dans camp berbère",
      "Photos incluses",
    ],
    favorite: true,
  },
];

// ============================================
// TRANSFER TYPES
// ============================================
type PeopleRange = "1-4" | "5-8" | "9-17" | "18-48";

interface TransferRoute {
  id: string;
  name: string;
  category: string;
  price1to4: number | null;
  price5to8: number | null;
  price9to17: number | null;
  price18to48: number | null;
  distance: string | null;
  duration: string | null;
  popular: boolean;
}

function getPriceRange(numPeople: number): PeopleRange {
  if (numPeople <= 4) return "1-4";
  if (numPeople <= 8) return "5-8";
  if (numPeople <= 17) return "9-17";
  return "18-48";
}

function getTransferPrice(route: TransferRoute, numPeople: number): number | null {
  const range = getPriceRange(numPeople);
  switch (range) {
    case "1-4":
      return route.price1to4;
    case "5-8":
      return route.price5to8;
    case "9-17":
      return route.price9to17;
    case "18-48":
      return route.price18to48;
  }
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function ExcursionPage() {
  // Tab state
  const [activeTab, setActiveTab] = useState<"excursions" | "transfers">("excursions");

  // Excursions state
  const [expandedExcursionId, setExpandedExcursionId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([1, 2, 4]);
  const { openWizard } = useBooking();

  // Transfers state
  const [transferRoutes, setTransferRoutes] = useState<TransferRoute[]>([]);
  const [loadingTransfers, setLoadingTransfers] = useState(false);
  const [numPeople, setNumPeople] = useState(2);

  // Fetch transfer routes when tab switches
  useEffect(() => {
    if (activeTab === "transfers" && transferRoutes.length === 0) {
      setLoadingTransfers(true);
      fetch("/api/transfers")
        .then((res) => res.json())
        .then((data) => {
          setTransferRoutes(data);
        })
        .catch(console.error)
        .finally(() => setLoadingTransfers(false));
    }
  }, [activeTab, transferRoutes.length]);

  const handleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleCardClick = (excursionId: number) => {
    setExpandedExcursionId(expandedExcursionId === excursionId ? null : excursionId);
  };

  const handleReserve = (excursion: (typeof excursions)[0]) => {
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

  const priceRange = getPriceRange(numPeople);

  // Filter only airport transfers for this page
  const airportTransfers = transferRoutes.filter(
    (r) => r.category === "AIRPORT" || r.popular
  );

  return (
    <div className="min-h-screen bg-zinc-800">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 pb-8 lg:pt-36 lg:pb-12 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl animate-pulse-slow"
            style={{ willChange: "transform, opacity" }}
          />
          <div
            className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-sky-500/20 blur-3xl animate-pulse-slow-delayed"
            style={{ willChange: "transform, opacity" }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6">
              <Compass className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                Activités & Services
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Excursion et{" "}
              <span className="text-blue-500">Transfert Aéroport</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Réservez vos activités guidées ou votre navette aéroport en quelques clics
            </p>
          </motion.div>

          {/* Tab Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center gap-4 mb-8"
          >
            <button
              onClick={() => setActiveTab("excursions")}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold text-lg transition-all ${
                activeTab === "excursions"
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "bg-zinc-900/50 text-zinc-400 border border-zinc-700 hover:text-white hover:border-zinc-600"
              }`}
            >
              <Compass className="w-5 h-5" />
              Excursions
            </button>
            <button
              onClick={() => setActiveTab("transfers")}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold text-lg transition-all ${
                activeTab === "transfers"
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "bg-zinc-900/50 text-zinc-400 border border-zinc-700 hover:text-white hover:border-zinc-600"
              }`}
            >
              <Plane className="w-5 h-5" />
              Transfert Aéroport
            </button>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* EXCURSIONS TAB */}
      {/* ============================================ */}
      {activeTab === "excursions" && (
        <>
          {/* Guide Badge Section */}
          <section className="relative py-4 lg:py-6">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap gap-3 justify-center"
              >
                <div className="px-5 py-2.5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-zinc-300">
                    Toutes nos excursions sont accompagnées par des guides locaux experts
                  </span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Excursions Grid */}
          <section id="excursions-grid" className="py-8">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {excursions.map((excursion, index) => {
                  const isExpanded = expandedExcursionId === excursion.id;

                  return (
                    <motion.div
                      key={excursion.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className="group cursor-pointer"
                      onClick={() => handleCardClick(excursion.id)}
                    >
                      <MousePushCard maxTilt={8} smoothing={0.05}>
                        <div
                          className={`relative bg-black overflow-hidden rounded-[20px] sm:rounded-[24px] h-[380px] sm:h-[400px] lg:h-[440px] transition-all duration-500 ${
                            !isExpanded ? "hover:shadow-2xl" : "shadow-2xl ring-2 ring-blue-500/30"
                          }`}
                        >
                          {/* Excursion Image */}
                          <Image
                            src={excursion.image}
                            alt={excursion.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className={`object-cover object-top transition-all duration-700 ${
                              isExpanded
                                ? "scale-[1.15]"
                                : "scale-[1.1] group-hover:scale-[1.12]"
                            }`}
                          />

                          {/* Gradient Overlay */}
                          <div
                            className={`absolute inset-0 transition-all duration-500 ${
                              isExpanded
                                ? "bg-gradient-to-t from-black/90 via-black/50 to-black/20"
                                : "bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                            }`}
                          />

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
                                <span className="text-[10px] sm:text-[11px] font-bold text-white/90 uppercase tracking-wide">
                                  {excursion.category}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Accent line */}
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
                                      {excursion.name}
                                    </h3>
                                    <div className="flex-shrink-0 text-right">
                                      <span className="text-sm sm:text-[14px] md:text-[16px] font-black text-blue-400">
                                        {excursion.price}
                                      </span>
                                      <span className="text-[9px] sm:text-[10px] md:text-[11px] text-white/50 ml-0.5">
                                        MAD/{excursion.period}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 mb-2.5">
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
                                      <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white/70">
                                        {excursion.duration}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
                                      <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white/70">
                                        {excursion.groupSize}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
                                      <span className="text-[10px] sm:text-[11px] md:text-[12px] text-white/70">
                                        {excursion.difficulty}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400 fill-current" />
                                      <span className="text-[11px] sm:text-[12px] md:text-[13px] font-semibold text-white">
                                        {excursion.rating}
                                      </span>
                                      <span className="text-[9px] sm:text-[10px] md:text-[11px] text-white/40">
                                        ({excursion.reviews})
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1 sm:gap-1.5 text-blue-400">
                                      <span className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold tracking-wide">
                                        Détails
                                      </span>
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
                                      <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                                        {excursion.name}
                                      </h2>
                                      <div className="flex items-center gap-1.5 mt-1">
                                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                                        <span className="text-xs font-semibold text-white">
                                          {excursion.rating}
                                        </span>
                                        <span className="text-[10px] text-white/40">
                                          ({excursion.reviews})
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-xl sm:text-2xl font-black text-blue-400">
                                        {excursion.price}
                                      </span>
                                      <p className="text-[10px] text-white/40">
                                        MAD/{excursion.period}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Specs Row */}
                                  <div className="flex items-center gap-3 mb-3">
                                    {[
                                      { icon: Clock, value: excursion.duration },
                                      { icon: Users, value: excursion.groupSize },
                                      { icon: MapPin, value: excursion.difficulty },
                                      { icon: Calendar, value: excursion.departure },
                                    ].map((spec, idx) => (
                                      <div key={idx} className="flex items-center gap-1">
                                        <spec.icon className="w-3 h-3 text-blue-400" />
                                        <span className="text-[10px] sm:text-[11px] text-white/70">
                                          {spec.value}
                                        </span>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Highlights as Pills */}
                                  <div className="flex flex-wrap gap-1.5 mb-3">
                                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/15 border border-blue-500/20">
                                      <Compass className="w-3 h-3 text-blue-400" />
                                      <span className="text-[9px] sm:text-[10px] font-medium text-blue-300">
                                        Guidé
                                      </span>
                                    </div>
                                    {excursion.highlights.slice(0, 3).map((highlight, idx) => (
                                      <div
                                        key={idx}
                                        className="px-2 py-1 rounded-full bg-white/5 border border-white/10"
                                      >
                                        <span className="text-[9px] sm:text-[10px] text-white/60">
                                          {highlight}
                                        </span>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Departure info */}
                                  <div className="flex items-center gap-2 mb-3">
                                    <MapPin className="w-3 h-3 text-green-400 flex-shrink-0" />
                                    <span className="text-[10px] text-green-300/80">
                                      Départ: {excursion.departure}
                                    </span>
                                  </div>

                                  {/* CTA Button */}
                                  <motion.button
                                    onClick={() => handleReserve(excursion)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-full shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all duration-300"
                                  >
                                    Réserver cette activité
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
            </div>
          </section>
        </>
      )}

      {/* ============================================ */}
      {/* TRANSFERS TAB */}
      {/* ============================================ */}
      {activeTab === "transfers" && (
        <section className="py-8">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
            {loadingTransfers ? (
              <div className="text-center py-16">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-zinc-400">Chargement des tarifs...</p>
              </div>
            ) : (
              <>
                {/* People Selector */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-zinc-900/50 border border-zinc-700 rounded-2xl p-6 mb-8"
                >
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    Combien de personnes ?
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 17, 20, 30, 40].map((num) => (
                      <button
                        key={num}
                        onClick={() => setNumPeople(num)}
                        className={`min-w-[48px] h-12 px-3 rounded-xl font-semibold transition-all ${
                          numPeople === num
                            ? "bg-blue-500 text-white"
                            : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-zinc-400 text-sm">
                      <span className="text-white font-medium">{numPeople}</span> personne
                      {numPeople > 1 ? "s" : ""}
                    </p>
                    <div className="h-4 w-px bg-zinc-700" />
                    <p className="text-sm">
                      <span className="text-blue-400 font-medium">Tarif {priceRange} pax</span>
                    </p>
                  </div>
                </motion.div>

                {/* Transfer Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {airportTransfers.map((route, idx) => {
                    const price = getTransferPrice(route, numPeople);
                    const isAvailable = price !== null;

                    return (
                      <motion.div
                        key={route.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className={`relative bg-zinc-900 border rounded-2xl p-5 transition-all ${
                          route.popular
                            ? "border-blue-500/50 shadow-lg shadow-blue-500/10"
                            : "border-zinc-700 hover:border-zinc-600"
                        } ${!isAvailable ? "opacity-60" : ""}`}
                      >
                        {route.popular && (
                          <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-full">
                            POPULAIRE
                          </span>
                        )}

                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                              <Plane className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-white font-semibold">{route.name}</h4>
                              {(route.distance || route.duration) && (
                                <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                                  {route.distance && (
                                    <span className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />
                                      {route.distance}
                                    </span>
                                  )}
                                  {route.duration && (
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {route.duration}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {isAvailable ? (
                          <div className="flex items-end justify-between">
                            <div>
                              <p className="text-xs text-zinc-500 mb-1">
                                {numPeople} pers. ({priceRange} pax)
                              </p>
                              <p className="text-2xl font-black text-white">
                                {price}{" "}
                                <span className="text-sm font-medium text-zinc-500">MAD</span>
                              </p>
                              {numPeople > 1 && (
                                <p className="text-xs text-blue-400 mt-1">
                                  ≈ {Math.ceil(price / numPeople)} MAD/pers
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => openWizard("transfer", {
                                id: route.id,
                                name: route.name,
                                price: price,
                                category: route.category,
                                distance: route.distance || undefined,
                                duration: route.duration || undefined,
                                numPeople: numPeople,
                              })}
                              className="flex items-center gap-1.5 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all"
                            >
                              Réserver
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <p className="text-red-400 text-sm">
                            Non disponible pour {numPeople} personnes
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA to full transfer page */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="mt-8 text-center"
                >
                  <a
                    href="/transfer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-full font-medium transition-all"
                  >
                    Voir toutes les destinations
                    <ChevronRight className="w-5 h-5" />
                  </a>
                </motion.div>
              </>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-3xl animate-pulse-slow"
            style={{ willChange: "transform, opacity" }}
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
              Besoin d&apos;un véhicule ?
            </p>

            {/* Main Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Louez une <span className="text-blue-500">Voiture Premium</span>
            </h2>

            {/* Description */}
            <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10">
              Découvrez notre flotte de véhicules haut de gamme pour explorer Marrakech et ses
              environs en toute liberté.
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
                className="group px-8 py-4 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-[15px] font-medium inline-flex items-center gap-2 transition-colors hover:bg-zinc-700 hover:text-white"
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
