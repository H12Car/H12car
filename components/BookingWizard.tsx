"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  MapPin,
  Users,
  ChevronRight,
  ChevronLeft,
  Check,
  Car,
  Mountain,
  Plus,
  Minus,
  Phone,
  Mail,
  User,
  MessageSquare,
  Send,
  ArrowLeft,
  Bike,
} from "lucide-react";
import { useBooking, Excursion, Car as CarType } from "@/context/bookingContext";
import { useState } from "react";
import Image from "next/image";

// Available excursions for add-ons
const availableExcursions: Excursion[] = [
  {
    id: 1,
    name: "Balade en Dromadaire",
    price: "350",
    period: "personne",
    duration: "1 heure",
    image: "/excursions/camel.jpg",
  },
  {
    id: 2,
    name: "Aventure Quad",
    price: "450",
    period: "personne",
    duration: "2 heures",
    image: "/excursions/quad.jpg",
  },
  {
    id: 3,
    name: "Moto Off-Road",
    price: "650",
    period: "personne",
    duration: "2-3 heures",
    image: "/excursions/moto.jpg",
  },
  {
    id: 4,
    name: "Combo Quad + Dromadaire",
    price: "700",
    period: "personne",
    duration: "3 heures",
    image: "/excursions/combo.jpg",
  },
];

// Available cars for cross-selling
const availableCars: CarType[] = [
  { id: 1, name: "Mercedes-Benz Classe S", price: "4500", period: "jour", image: "/h12_mercedes.png", category: "Luxe" },
  { id: 2, name: "BMW X7", price: "3800", period: "jour", image: "/h12_x7.png", category: "SUV Luxury" },
  { id: 3, name: "Range Rover Sport", price: "4200", period: "jour", image: "/h12_range.png", category: "SUV Premium" },
  { id: 4, name: "Porsche Cayenne", price: "3900", period: "jour", image: "/car.png", category: "SUV Sport" },
  { id: 5, name: "Audi Q8", price: "3600", period: "jour", image: "/car.png", category: "SUV Coupe" },
  { id: 6, name: "Tesla Model X", price: "4100", period: "jour", image: "/car.png", category: "Électrique" },
  { id: 7, name: "Lexus LX 600", price: "3700", period: "jour", image: "/car.png", category: "SUV Luxe" },
  { id: 8, name: "Volkswagen Touareg", price: "2800", period: "jour", image: "/car.png", category: "SUV Confort" },
  { id: 9, name: "Jeep Grand Cherokee", price: "3200", period: "jour", image: "/car.png", category: "SUV Adventure" },
  { id: 10, name: "Cadillac Escalade", price: "4400", period: "jour", image: "/car.png", category: "SUV Prestige" },
];

const steps = [
  { number: 1, title: "Détails", icon: Calendar },
  { number: 2, title: "Sélection", icon: Car },
  { number: 3, title: "Extras", icon: Plus },
  { number: 4, title: "Contact", icon: Send },
];

export default function BookingWizard() {
  const {
    isWizardOpen,
    closeWizard,
    currentStep,
    nextStep,
    prevStep,
    serviceType,
    selectedCar,
    selectedExcursions,
    bookingDetails,
    contactInfo,
    updateBookingDetails,
    updateContactInfo,
    toggleExcursion,
    isExcursionSelected,
    getTotalPrice,
    selectCar,
  } = useBooking();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Cross-selling car selection state
  const [carSelectionMode, setCarSelectionMode] = useState<'hidden' | 'list' | 'dates'>('hidden');
  const [pendingCar, setPendingCar] = useState<CarType | null>(null);
  const [carRentalDates, setCarRentalDates] = useState({ pickupDate: '', returnDate: '' });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      closeWizard();
    }, 2000);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          bookingDetails.pickupDate &&
          bookingDetails.pickupLocation &&
          bookingDetails.numberOfPeople > 0
        );
      case 2:
        return selectedCar || selectedExcursions.length > 0;
      case 3:
        return true; // Extras are optional
      case 4:
        return contactInfo.fullName && contactInfo.phone;
      default:
        return false;
    }
  };

  const generateWhatsAppMessage = () => {
    let message = `Bonjour H12,\n\nJe souhaite faire une réservation:\n\n`;

    if (selectedCar) {
      const vehicleType = serviceType === "moto" ? "Moto" : "Véhicule";
      message += `*${vehicleType}:* ${selectedCar.name}\n`;
      message += `*Prix:* ${selectedCar.price} DH/${selectedCar.period}\n\n`;
    }

    if (selectedExcursions.length > 0) {
      message += `*Excursions:*\n`;
      selectedExcursions.forEach((exc) => {
        message += `- ${exc.name} (${exc.price} DH/pers)\n`;
      });
      message += `\n`;
    }

    message += `*Détails:*\n`;
    message += `- Date: ${bookingDetails.pickupDate}\n`;
    if (bookingDetails.returnDate) {
      message += `- Retour: ${bookingDetails.returnDate}\n`;
    }
    message += `- Lieu: ${bookingDetails.pickupLocation}\n`;
    message += `- Personnes: ${bookingDetails.numberOfPeople}\n\n`;

    message += `*Contact:*\n`;
    message += `- Nom: ${contactInfo.fullName}\n`;
    message += `- Tél: ${contactInfo.phone}\n`;
    if (contactInfo.email) {
      message += `- Email: ${contactInfo.email}\n`;
    }
    if (contactInfo.notes) {
      message += `\n*Notes:* ${contactInfo.notes}\n`;
    }

    message += `\n*Total estimé:* ${getTotalPrice()} DH`;

    return encodeURIComponent(message);
  };

  return (
    <AnimatePresence>
      {isWizardOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWizard}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 30, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-hidden rounded-2xl
                       bg-gradient-to-b from-zinc-900 to-black
                       border border-white/10 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={closeWizard}
              className="absolute top-4 right-4 w-8 h-8 rounded-full
                         bg-white/10 hover:bg-white/20 transition z-10
                         flex items-center justify-center"
            >
              <X className="w-4 h-4 text-white/70" />
            </button>

            {/* Progress Steps */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full
                                  transition-all duration-300
                                  ${
                                    currentStep >= step.number
                                      ? "bg-amber-500 text-black"
                                      : "bg-white/10 text-white/40"
                                  }`}
                    >
                      {currentStep > step.number ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-8 sm:w-12 h-0.5 mx-1 transition-all duration-300
                                    ${
                                      currentStep > step.number
                                        ? "bg-amber-500"
                                        : "bg-white/10"
                                    }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 px-1">
                {steps.map((step) => (
                  <span
                    key={step.number}
                    className={`text-[10px] sm:text-xs font-medium transition-colors
                               ${
                                 currentStep >= step.number
                                   ? "text-white"
                                   : "text-white/40"
                               }`}
                  >
                    {step.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <AnimatePresence mode="wait">
                {/* Step 1: Details */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">
                      Détails de la réservation
                    </h3>

                    {/* Pickup Date */}
                    <div>
                      <label className="text-sm text-white/60 mb-1.5 block">
                        Date de prise en charge *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="date"
                          value={bookingDetails.pickupDate}
                          onChange={(e) =>
                            updateBookingDetails({ pickupDate: e.target.value })
                          }
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                     text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50"
                        />
                      </div>
                    </div>

                    {/* Return Date (for cars and motos) */}
                    {(serviceType === "car" || serviceType === "moto") && (
                      <div>
                        <label className="text-sm text-white/60 mb-1.5 block">
                          Date de retour
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="date"
                            value={bookingDetails.returnDate}
                            onChange={(e) =>
                              updateBookingDetails({ returnDate: e.target.value })
                            }
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                       text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50"
                          />
                        </div>
                      </div>
                    )}

                    {/* Pickup Location */}
                    <div>
                      <label className="text-sm text-white/60 mb-1.5 block">
                        Lieu de prise en charge *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="text"
                          value={bookingDetails.pickupLocation}
                          onChange={(e) =>
                            updateBookingDetails({ pickupLocation: e.target.value })
                          }
                          placeholder="Aéroport, Hôtel, Adresse..."
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                     text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50"
                        />
                      </div>
                    </div>

                    {/* Number of People */}
                    <div>
                      <label className="text-sm text-white/60 mb-1.5 block">
                        Nombre de personnes *
                      </label>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() =>
                            updateBookingDetails({
                              numberOfPeople: Math.max(1, bookingDetails.numberOfPeople - 1),
                            })
                          }
                          className="w-12 h-12 rounded-xl bg-white/5 border border-white/10
                                     flex items-center justify-center hover:bg-white/10 transition"
                        >
                          <Minus className="w-5 h-5 text-white" />
                        </button>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-amber-500" />
                          <span className="text-2xl font-bold text-white">
                            {bookingDetails.numberOfPeople}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            updateBookingDetails({
                              numberOfPeople: Math.min(20, bookingDetails.numberOfPeople + 1),
                            })
                          }
                          className="w-12 h-12 rounded-xl bg-white/5 border border-white/10
                                     flex items-center justify-center hover:bg-white/10 transition"
                        >
                          <Plus className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Selection Summary */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">
                      Votre sélection
                    </h3>

                    {/* Selected Car or Moto */}
                    {selectedCar && (
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                            {serviceType === "moto" ? (
                              <Bike className="w-6 h-6 text-amber-500" />
                            ) : (
                              <Car className="w-6 h-6 text-amber-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">
                              {selectedCar.name}
                            </h4>
                            <p className="text-sm text-white/60">
                              {selectedCar.price} DH / {selectedCar.period}
                            </p>
                          </div>
                          <Check className="w-5 h-5 text-green-500" />
                        </div>
                      </div>
                    )}

                    {/* Selected Excursions */}
                    {selectedExcursions.length > 0 && (
                      <div className="space-y-2">
                        {selectedExcursions.map((excursion) => (
                          <div
                            key={excursion.id}
                            className="p-4 rounded-xl bg-white/5 border border-white/10"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                <Mountain className="w-6 h-6 text-amber-500" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-white">
                                  {excursion.name}
                                </h4>
                                <p className="text-sm text-white/60">
                                  {excursion.price} DH/pers · {excursion.duration}
                                </p>
                              </div>
                              <Check className="w-5 h-5 text-green-500" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Booking Summary */}
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <h4 className="text-sm font-semibold text-amber-500 mb-2">
                        Récapitulatif
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between text-white/60">
                          <span>Date</span>
                          <span>{bookingDetails.pickupDate || "-"}</span>
                        </div>
                        {bookingDetails.returnDate && (
                          <div className="flex justify-between text-white/60">
                            <span>Retour</span>
                            <span>{bookingDetails.returnDate}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-white/60">
                          <span>Lieu</span>
                          <span>{bookingDetails.pickupLocation || "-"}</span>
                        </div>
                        <div className="flex justify-between text-white/60">
                          <span>Personnes</span>
                          <span>{bookingDetails.numberOfPeople}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Add-ons with Smart Cross-Selling */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {/* Car Selection Sub-flow for Excursion Customers */}
                    {serviceType === "excursion" && carSelectionMode !== 'hidden' && (
                      <AnimatePresence mode="wait">
                        {/* Car List View */}
                        {carSelectionMode === 'list' && (
                          <motion.div
                            key="car-list"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                          >
                            <button
                              onClick={() => setCarSelectionMode('hidden')}
                              className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              <span className="text-sm">Retour</span>
                            </button>
                            <h3 className="text-xl font-bold text-white mb-2">
                              Choisissez votre véhicule
                            </h3>
                            <p className="text-sm text-white/60 mb-4">
                              Sélectionnez un véhicule pour vos déplacements
                            </p>
                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
                              {availableCars.map((car) => (
                                <button
                                  key={car.id}
                                  onClick={() => {
                                    setPendingCar(car);
                                    setCarSelectionMode('dates');
                                  }}
                                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10
                                             hover:border-purple-500/50 hover:bg-white/10 transition-all text-left
                                             flex items-center gap-3"
                                >
                                  <div className="w-16 h-12 rounded-lg bg-white/10 overflow-hidden flex-shrink-0 relative">
                                    <Image
                                      src={car.image}
                                      alt={car.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-white text-sm truncate">
                                      {car.name}
                                    </h4>
                                    <p className="text-xs text-white/50">{car.category}</p>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <p className="font-bold text-purple-400 text-sm">
                                      {car.price} DH
                                    </p>
                                    <p className="text-[10px] text-white/40">/{car.period}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Date Selection View */}
                        {carSelectionMode === 'dates' && pendingCar && (
                          <motion.div
                            key="car-dates"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                          >
                            <button
                              onClick={() => setCarSelectionMode('list')}
                              className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              <span className="text-sm">Changer de véhicule</span>
                            </button>

                            {/* Selected Car Preview */}
                            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-16 h-12 rounded-lg bg-white/10 overflow-hidden flex-shrink-0 relative">
                                  <Image
                                    src={pendingCar.image}
                                    alt={pendingCar.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white">{pendingCar.name}</h4>
                                  <p className="text-sm text-purple-400">{pendingCar.price} DH/{pendingCar.period}</p>
                                </div>
                              </div>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-3">
                              Dates de location
                            </h3>

                            {/* Pickup Date */}
                            <div className="mb-3">
                              <label className="text-sm text-white/60 mb-1.5 block">
                                Date de prise en charge *
                              </label>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                  type="date"
                                  value={carRentalDates.pickupDate}
                                  onChange={(e) => setCarRentalDates(prev => ({ ...prev, pickupDate: e.target.value }))}
                                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                             text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
                                />
                              </div>
                            </div>

                            {/* Return Date */}
                            <div className="mb-4">
                              <label className="text-sm text-white/60 mb-1.5 block">
                                Date de retour *
                              </label>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                  type="date"
                                  value={carRentalDates.returnDate}
                                  onChange={(e) => setCarRentalDates(prev => ({ ...prev, returnDate: e.target.value }))}
                                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                             text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/50"
                                />
                              </div>
                            </div>

                            {/* Confirm Button */}
                            <button
                              onClick={() => {
                                if (carRentalDates.pickupDate && carRentalDates.returnDate) {
                                  selectCar(pendingCar);
                                  updateBookingDetails({
                                    returnDate: carRentalDates.returnDate,
                                  });
                                  setCarSelectionMode('hidden');
                                  setPendingCar(null);
                                }
                              }}
                              disabled={!carRentalDates.pickupDate || !carRentalDates.returnDate}
                              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600
                                         text-white font-semibold flex items-center justify-center gap-2
                                         disabled:opacity-50 disabled:cursor-not-allowed
                                         hover:from-purple-500 hover:to-fuchsia-500 transition"
                            >
                              <Check className="w-4 h-4" />
                              Ajouter ce véhicule
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}

                    {/* Normal Step 3 Content (when not in car selection mode) */}
                    {(serviceType !== "excursion" || carSelectionMode === 'hidden') && (
                      <>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {serviceType === "car" || serviceType === "moto"
                            ? "Ajoutez des excursions"
                            : "Complétez votre aventure"}
                        </h3>
                        <p className="text-sm text-white/60 mb-4">
                          {serviceType === "excursion"
                            ? "Ajoutez d'autres activités ou louez un véhicule"
                            : "Complétez votre expérience avec nos activités"}
                        </p>

                        {/* Cross-sell Car for Excursion Customers */}
                        {serviceType === "excursion" && !selectedCar && (
                          <div className="mb-4">
                            <button
                              onClick={() => setCarSelectionMode('list')}
                              className="w-full p-4 rounded-xl border-2 border-dashed border-purple-500/30
                                         bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-500/50
                                         transition-all text-left group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center
                                                group-hover:bg-purple-500/30 transition">
                                  <Car className="w-6 h-6 text-purple-400" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white">
                                    Besoin d&apos;un véhicule ?
                                  </h4>
                                  <p className="text-sm text-white/60">
                                    Louez une voiture pour vos déplacements
                                  </p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition" />
                              </div>
                            </button>
                          </div>
                        )}

                        {/* Show selected car if added via cross-sell */}
                        {serviceType === "excursion" && selectedCar && (
                          <div className="mb-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                <Car className="w-6 h-6 text-purple-400" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-white">{selectedCar.name}</h4>
                                <p className="text-sm text-purple-400">{selectedCar.price} DH/{selectedCar.period}</p>
                              </div>
                              <Check className="w-5 h-5 text-green-500" />
                            </div>
                          </div>
                        )}

                        {/* Excursions List */}
                        <div className="space-y-3">
                          {availableExcursions.map((excursion) => {
                            const isSelected = isExcursionSelected(excursion.id);
                            return (
                              <button
                                key={excursion.id}
                                onClick={() => toggleExcursion(excursion)}
                                className={`w-full p-4 rounded-xl border transition-all text-left
                                            ${
                                              isSelected
                                                ? "bg-amber-500/10 border-amber-500/50"
                                                : "bg-white/5 border-white/10 hover:border-white/20"
                                            }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center
                                                ${
                                                  isSelected
                                                    ? "bg-amber-500 text-black"
                                                    : "bg-white/10 text-white"
                                                }`}
                                  >
                                    {isSelected ? (
                                      <Check className="w-5 h-5" />
                                    ) : (
                                      <Plus className="w-5 h-5" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-white">
                                      {excursion.name}
                                    </h4>
                                    <p className="text-sm text-white/60">
                                      {excursion.duration}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold text-amber-500">
                                      {excursion.price} DH
                                    </p>
                                    <p className="text-xs text-white/40">
                                      par personne
                                    </p>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                {/* Step 4: Contact */}
                {currentStep === 4 && !isSubmitted && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">
                      Vos coordonnées
                    </h3>

                    {/* Full Name */}
                    <div>
                      <label className="text-sm text-white/60 mb-1.5 block">
                        Nom complet *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="text"
                          value={contactInfo.fullName}
                          onChange={(e) =>
                            updateContactInfo({ fullName: e.target.value })
                          }
                          placeholder="Votre nom"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                     text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-sm text-white/60 mb-1.5 block">
                        Téléphone / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="tel"
                          value={contactInfo.phone}
                          onChange={(e) =>
                            updateContactInfo({ phone: e.target.value })
                          }
                          placeholder="+212 6XX XXX XXX"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                     text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-sm text-white/60 mb-1.5 block">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="email"
                          value={contactInfo.email}
                          onChange={(e) =>
                            updateContactInfo({ email: e.target.value })
                          }
                          placeholder="votre@email.com"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                     text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50"
                        />
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="text-sm text-white/60 mb-1.5 block">
                        Notes / Demandes spéciales
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                        <textarea
                          value={contactInfo.notes}
                          onChange={(e) =>
                            updateContactInfo({ notes: e.target.value })
                          }
                          placeholder="Informations supplémentaires..."
                          rows={3}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                     text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50
                                     resize-none"
                        />
                      </div>
                    </div>

                    {/* Total */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">Total estimé</span>
                        <span className="text-2xl font-bold text-amber-500">
                          {getTotalPrice()} DH
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Success State */}
                {isSubmitted && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Demande envoyée !
                    </h3>
                    <p className="text-white/60">
                      Nous vous contacterons rapidement
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Actions */}
            {!isSubmitted && (
              <div className="px-6 pb-6 pt-2 border-t border-white/10">
                <div className="flex items-center gap-3">
                  {currentStep > 1 && (
                    <button
                      onClick={prevStep}
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10
                                 text-white font-medium hover:bg-white/10 transition
                                 flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Retour
                    </button>
                  )}

                  {currentStep < 4 ? (
                    <button
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500
                                 text-black font-semibold hover:from-amber-400 hover:to-orange-400
                                 transition flex items-center justify-center gap-2
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continuer
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <a
                      href={`https://wa.me/212600000000?text=${generateWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleSubmit}
                      className={`flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600
                                 text-white font-semibold hover:from-green-400 hover:to-green-500
                                 transition flex items-center justify-center gap-2
                                 ${!canProceed() || isSubmitting ? "opacity-50 pointer-events-none" : ""}`}
                    >
                      {isSubmitting ? (
                        <span>Envoi...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Envoyer via WhatsApp
                        </>
                      )}
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
