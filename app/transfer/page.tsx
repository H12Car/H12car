"use client";

import { motion } from "framer-motion";
import {
  Plane,
  MapPin,
  Users,
  ChevronRight,
  Clock,
  Briefcase,
  Star,
  CheckCircle2,
  Phone,
  Building2,
  Palmtree,
  PartyPopper,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useBooking } from "@/context/bookingContext";
import WhatsAppButton from "@/components/WhatsAppButton";

// ============================================
// TYPES
// ============================================
type PeopleRange = "1-4" | "5-8" | "9-17" | "18-48";
type TransferCategory = "AIRPORT" | "CITY" | "EXCURSION" | "NIGHTLIFE";

interface TransferRoute {
  id: string;
  name: string;
  category: TransferCategory;
  price1to4: number | null;
  price5to8: number | null;
  price9to17: number | null;
  price18to48: number | null;
  distance: string | null;
  duration: string | null;
  popular: boolean;
}

// Helper to get the right price range based on number of people
function getPriceRange(numPeople: number): PeopleRange {
  if (numPeople <= 4) return "1-4";
  if (numPeople <= 8) return "5-8";
  if (numPeople <= 17) return "9-17";
  return "18-48";
}

// Get price for a route based on number of people
function getPrice(route: TransferRoute, numPeople: number): number | null {
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

// Category labels
const CATEGORY_LABELS: Record<TransferCategory, string> = {
  AIRPORT: "Aéroport Marrakech",
  CITY: "Autres Villes",
  EXCURSION: "Excursions",
  NIGHTLIFE: "Sorties & Restaurants",
};

const CATEGORY_ICONS: Record<TransferCategory, typeof Plane> = {
  AIRPORT: Plane,
  CITY: Building2,
  EXCURSION: Palmtree,
  NIGHTLIFE: PartyPopper,
};

const CATEGORY_COLORS: Record<TransferCategory, string> = {
  AIRPORT: "text-blue-400 bg-blue-500/20 border-blue-500/30",
  CITY: "text-purple-400 bg-purple-500/20 border-purple-500/30",
  EXCURSION: "text-green-400 bg-green-500/20 border-green-500/30",
  NIGHTLIFE: "text-pink-400 bg-pink-500/20 border-pink-500/30",
};

export default function TransferPage() {
  const [routes, setRoutes] = useState<TransferRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [numPeople, setNumPeople] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState<TransferCategory | "all">("all");
  const { openWizard } = useBooking();

  // Fetch routes from API
  useEffect(() => {
    fetch("/api/transfers")
      .then((res) => res.json())
      .then((data) => {
        setRoutes(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Filter routes by category
  const filteredRoutes =
    selectedCategory === "all"
      ? routes
      : routes.filter((r) => r.category === selectedCategory);

  // Group routes by category for display
  const groupedRoutes = filteredRoutes.reduce(
    (acc, route) => {
      if (!acc[route.category]) acc[route.category] = [];
      acc[route.category].push(route);
      return acc;
    },
    {} as Record<TransferCategory, TransferRoute[]>
  );

  const priceRange = getPriceRange(numPeople);

  return (
    <div className="bg-zinc-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 pb-12 lg:pt-36 lg:pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-sky-500/20 blur-3xl" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6">
                <Plane className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                  Transferts & Navettes
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Service de
                <br />
                <span className="text-blue-500">Transfert</span>
              </h1>

              <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl">
                Navettes privées depuis l&apos;aéroport Marrakech vers votre hôtel, riads, ou
                destinations touristiques. Prix fixes, véhicules climatisés, chauffeurs
                professionnels.
              </p>

              {/* Key features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Clock, text: "Disponible 24h/24" },
                  { icon: Users, text: "De 1 à 48 personnes" },
                  { icon: Briefcase, text: "Bagages inclus" },
                  { icon: Star, text: "Chauffeurs pro" },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-zinc-300 text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+212614968594"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500 lg:hover:bg-blue-600 text-white font-medium transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>+212 6 14 96 85 94</span>
                </a>
                <a
                  href="https://wa.me/212614968594"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 lg:hover:bg-green-700 text-white font-medium transition-all"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-zinc-800">
                <Image
                  src="/voiture_h12/h12_transporttouristicmerco.png"
                  alt="Mercedes Sprinter Transfer"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">À partir de</p>
                      <p className="text-2xl font-black text-blue-400">
                        150 <span className="text-sm font-medium text-zinc-400">MAD</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-zinc-400 text-sm">Prix fixe</p>
                      <p className="text-white font-medium">Pas de surprise</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Price Calculator Section */}
      <section className="py-12 lg:py-20 bg-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Grille <span className="text-blue-500">Tarifaire</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Tarifs des transferts en Dirhams H.T par nombre de personnes - Saison 2025/2026
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-zinc-400">Chargement des tarifs...</p>
            </div>
          ) : (
            <>
              {/* People Selector */}
              <div className="bg-zinc-900/50 border border-zinc-700 rounded-2xl p-6 mb-8">
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
                          : "bg-zinc-800 text-zinc-400 lg:hover:bg-zinc-700 lg:hover:text-white"
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
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-8">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === "all"
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-800 text-zinc-400 lg:hover:text-white"
                  }`}
                >
                  Toutes les destinations
                </button>
                {(Object.keys(CATEGORY_LABELS) as TransferCategory[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === key
                        ? "bg-blue-500 text-white"
                        : "bg-zinc-800 text-zinc-400 lg:hover:text-white"
                    }`}
                  >
                    {CATEGORY_LABELS[key]}
                  </button>
                ))}
              </div>

              {/* Price Cards by Category */}
              <div className="space-y-8">
                {(Object.entries(groupedRoutes) as [TransferCategory, TransferRoute[]][]).map(
                  ([category, categoryRoutes]) => {
                    const Icon = CATEGORY_ICONS[category];
                    return (
                      <div key={category}>
                        <div className="flex items-center gap-3 mb-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-2 ${CATEGORY_COLORS[category]}`}
                          >
                            <Icon className="w-3 h-3" />
                            {CATEGORY_LABELS[category]}
                          </span>
                          <div className="flex-1 h-px bg-zinc-700" />
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {categoryRoutes.map((route) => {
                            const price = getPrice(route, numPeople);
                            const isAvailable = price !== null;

                            return (
                              <motion.div
                                key={route.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`relative bg-zinc-900 border rounded-xl p-5 transition-all ${
                                  route.popular
                                    ? "border-blue-500/50 shadow-lg shadow-blue-500/10"
                                    : "border-zinc-700 lg:hover:border-zinc-600"
                                } ${!isAvailable ? "opacity-60" : ""}`}
                              >
                                {route.popular && (
                                  <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-full">
                                    POPULAIRE
                                  </span>
                                )}

                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <h4 className="text-white font-semibold">{route.name}</h4>
                                    {(route.distance || route.duration) && (
                                      <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                                        {route.distance && <span>{route.distance}</span>}
                                        {route.distance && route.duration && <span>•</span>}
                                        {route.duration && <span>{route.duration}</span>}
                                      </div>
                                    )}
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
                                        <span className="text-sm font-medium text-zinc-500">
                                          MAD
                                        </span>
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
                                      className="flex items-center gap-1.5 px-4 py-2 bg-blue-500 lg:hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all"
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
                      </div>
                    );
                  }
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Full Price Table Section */}
      <section className="py-12 lg:py-20 bg-zinc-900">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Tableau <span className="text-blue-500">Complet</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Tous les tarifs par destination et nombre de personnes (prix en MAD H.T)
            </p>
          </motion.div>

          {/* Price Table */}
          <div className="overflow-x-auto rounded-xl border border-zinc-700">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-800">
                  <th className="text-left py-4 px-4 text-zinc-300 font-semibold">Destination</th>
                  <th className="text-center py-4 px-4 text-zinc-300 font-semibold whitespace-nowrap">
                    <div>1-4 pax</div>
                    <div className="text-xs text-zinc-500 font-normal">Berline / Van</div>
                  </th>
                  <th className="text-center py-4 px-4 text-zinc-300 font-semibold whitespace-nowrap">
                    <div>5-8 pax</div>
                    <div className="text-xs text-zinc-500 font-normal">Minivan</div>
                  </th>
                  <th className="text-center py-4 px-4 text-zinc-300 font-semibold whitespace-nowrap">
                    <div>9-17 pax</div>
                    <div className="text-xs text-zinc-500 font-normal">Minibus</div>
                  </th>
                  <th className="text-center py-4 px-4 text-zinc-300 font-semibold whitespace-nowrap">
                    <div>18-48 pax</div>
                    <div className="text-xs text-zinc-500 font-normal">Bus</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route, idx) => (
                  <tr
                    key={route.id}
                    className={`border-t border-zinc-800 ${
                      idx % 2 === 0 ? "bg-zinc-900" : "bg-zinc-800/30"
                    } lg:hover:bg-zinc-800/50 transition-colors`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <div>
                          <span className="text-white font-medium">{route.name}</span>
                          {route.duration && (
                            <span className="text-zinc-500 text-xs ml-2">({route.duration})</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {route.price1to4 !== null ? (
                        <span className="text-white font-semibold">{route.price1to4}</span>
                      ) : (
                        <span className="text-zinc-600">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {route.price5to8 !== null ? (
                        <span className="text-white font-semibold">{route.price5to8}</span>
                      ) : (
                        <span className="text-zinc-600">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {route.price9to17 !== null ? (
                        <span className="text-white font-semibold">{route.price9to17}</span>
                      ) : (
                        <span className="text-zinc-600">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {route.price18to48 !== null ? (
                        <span className="text-white font-semibold">{route.price18to48}</span>
                      ) : (
                        <span className="text-zinc-600">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-zinc-500 text-sm mt-6">
            * Prix en MAD Hors Taxes. Tarifs valables pour la saison 2025/2026.
          </p>
        </div>
      </section>

      {/* Vehicle Info Section */}
      <section className="py-12 lg:py-20 bg-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Nos <span className="text-blue-500">Véhicules</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Une flotte adaptée à tous vos besoins de transport
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Berline / Van",
                capacity: "1-4 personnes",
                features: ["Climatisation", "Confort", "Bagages"],
                image: "/voiture_h12/h12_tucson.png",
              },
              {
                name: "Minivan",
                capacity: "5-8 personnes",
                features: ["Climatisation", "Espace", "Bagages XL"],
                image: "/voiture_h12/h12_transporttouristiquefiat.png",
              },
              {
                name: "Minibus",
                capacity: "9-17 personnes",
                features: ["Climatisation", "Confort groupe", "Soute bagages"],
                image: "/voiture_h12/h12_transporttouristicmerco.png",
              },
              {
                name: "Bus",
                capacity: "18-48 personnes",
                features: ["Climatisation", "Grands groupes", "Soute XL"],
                image: "/voiture_h12/h12_transporttouristicmerco.png",
              },
            ].map((vehicle, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden lg:hover:border-blue-500/50 transition-all"
              >
                <div className="relative h-40 bg-zinc-800">
                  <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold text-lg mb-1">{vehicle.name}</h3>
                  <p className="text-blue-400 text-sm font-medium mb-3">{vehicle.capacity}</p>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feature, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400"
                      >
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-zinc-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Besoin d&apos;un <span className="text-blue-500">Transfert</span> ?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Réservez maintenant votre navette ou contactez-nous pour un devis personnalisé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/212614968594?text=Bonjour, je souhaite réserver un transfert."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 lg:hover:bg-green-700 text-white rounded-full font-semibold transition-all"
              >
                Réserver via WhatsApp
                <ChevronRight className="w-5 h-5" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 lg:hover:bg-zinc-700 border border-zinc-700 text-white rounded-full font-semibold transition-all"
              >
                Contactez-nous
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <WhatsAppButton />
    </div>
  );
}
