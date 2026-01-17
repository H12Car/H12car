"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Sparkles, Fuel, Users, Settings, Car, ArrowRight, Heart, Shield, Calendar } from "lucide-react";
import Image from "next/image";
import DevisModal from "@/components/devisModal";
import FormReviews, { ReviewFormData } from "@/components/formReviews";

const cars = [
  {
    id: 1,
    name: "Mercedes-Benz Classe S",
    category: "Luxe",
    price: "4500",
    period: "jour",
    image: "/cars/mercedes-s-class.png",
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
    image: "/cars/bmw-x7.png",
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
    image: "/cars/range-rover.png",
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
    image: "/cars/porsche-cayenne.png",
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
    image: "/cars/audi-q8.png",
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
    image: "/cars/tesla-model-x.png",
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
    image: "/cars/lexus-lx.png",
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
    image: "/cars/vw-touareg.png",
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
    image: "/cars/jeep-cherokee.png",
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
    image: "/cars/cadillac-escalade.png",
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
  const [isDevisModalOpen, setIsDevisModalOpen] = useState(false);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
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

  const handleReserve = (carId: number) => {
    setSelectedCar(carId);
    setIsDevisModalOpen(true);
  };

  const handleInfo = (carId: number) => {
    // In a real app, you would navigate to a detailed car page
    console.log(`More info for car ${carId}`);
    // For now, we'll just show a simple alert
    const car = cars.find(c => c.id === carId);
    alert(`Plus d'informations pour: ${car?.name}\n\nDescription: ${car?.description}\n\nCaractéristiques:\n- ${car?.features.join("\n- ")}`);
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-600/10 to-fuchsia-600/10 blur-3xl"
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
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Car className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
                Notre Collection
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Explorez Notre
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                Flotte Exclusive
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto">
              Des véhicules premium soigneusement sélectionnés pour votre confort et votre style
            </p>
          </motion.div>

          {/* Categories Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
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

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { icon: Car, value: "10+", label: "Modèles Premium" },
              { icon: Shield, value: "100%", label: "Assurés" },
              { icon: Star, value: "4.8★", label: "Note Moyenne" },
              { icon: Calendar, value: "24/7", label: "Disponibilité" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-sm border border-white/10">
                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-black bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 p-6 overflow-hidden transition-all duration-500 hover:border-purple-500/30">
                  {/* Favorite Button */}
                  <button
                    onClick={() => handleFavorite(car.id)}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <Heart 
                      className={`w-5 h-5 transition-all duration-300 ${
                        favorites.includes(car.id) 
                          ? "fill-red-500 text-red-500" 
                          : "text-white/60 hover:text-red-400"
                      }`} 
                    />
                  </button>

                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 border border-purple-500/30">
                      <span className="text-xs font-semibold text-purple-400">{car.category}</span>
                    </div>
                  </div>

                  {/* Car Image */}
                  <div className="relative h-48 mb-6 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                    <div className="relative w-full h-full">
                      <Image
                        src={car.image}
                        alt={car.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    
                    {/* Price Tag */}
                    <div className="absolute bottom-4 left-4 z-20">
                      <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold shadow-lg shadow-purple-500/30">
                        <span className="text-lg">{car.price} MAD</span>
                        <span className="text-xs opacity-90 ml-1">/{car.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Car Info */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-fuchsia-400 transition-all duration-300">
                      {car.name}
                    </h3>
                    
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">
                      {car.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Fuel className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-white/70">{car.fuel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-white/70">{car.seats} Places</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-white/70">{car.transmission}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-white/70">{car.year}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-medium">{car.rating}</span>
                        </div>
                        <span className="text-white/50 text-sm">({car.reviews} avis)</span>
                      </div>
                      <div className="text-sm text-white/70">
                        {car.power}
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => handleInfo(car.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>Plus d&apos;infos</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                      onClick={() => handleReserve(car.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold text-sm shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
                    >
                      Réserver
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
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

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/10 to-fuchsia-600/10 border border-purple-500/20 mb-6">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400">
                Besoin d&apos;un véhicule spécifique ?
              </span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Véhicule sur mesure ?
            </h2>
            
            <p className="text-white/60 max-w-xl mx-auto mb-8">
              Contactez-nous pour discuter de vos besoins spécifiques. Nous trouverons la solution parfaite pour vous.
            </p>
            
            <motion.button
              onClick={() => setIsDevisModalOpen(true)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold shadow-lg shadow-purple-500/30 transition-all duration-300 inline-flex items-center gap-2"
            >
              Demander un devis personnalisé
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      <DevisModal 
        isOpen={isDevisModalOpen} 
        onClose={() => setIsDevisModalOpen(false)}
        serviceType="car-rental"
      />

      <FormReviews
        isOpen={isReviewFormOpen}
        onClose={() => setIsReviewFormOpen(false)}
        onSubmit={(data: ReviewFormData) => {
          // Handle review submission
          console.log("Review submitted:", data);
        }}
        onShowDevisModal={() => {
          setIsDevisModalOpen(true);
        }}
      />
    </div>
  );
}