"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
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
  CircleUser,
  Info,
  ChevronDown,
} from "lucide-react";
import { useBooking, type Excursion, type Car as CarType, type Transfer } from "@/context/bookingContext";
import { useState } from "react";
import Image from "next/image";
// Web link is used instead of PDF - see /app/demande/page.tsx

// Get today's date in YYYY-MM-DD format for min date validation
const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Delivery zones in Marrakech (free delivery)
const marrakechZones = [
  { value: "aeroport", label: "Aéroport Menara" },
  { value: "medina", label: "Médina" },
  { value: "gueliz", label: "Gueliz" },
  { value: "hivernage", label: "Hivernage" },
  { value: "palmeraie", label: "Palmeraie" },
  { value: "targa", label: "Targa" },
  { value: "amelkis", label: "Amelkis" },
  { value: "agdal", label: "Agdal" },
  { value: "autre_marrakech", label: "Autre quartier" },
];

// Other Moroccan cities (paid delivery)
const moroccanCities = [
  { value: "casablanca", label: "Casablanca" },
  { value: "rabat", label: "Rabat" },
  { value: "agadir", label: "Agadir" },
  { value: "fes", label: "Fès" },
  { value: "tangier", label: "Tanger" },
  { value: "essaouira", label: "Essaouira" },
  { value: "ouarzazate", label: "Ouarzazate" },
  { value: "meknes", label: "Meknès" },
  { value: "autre_ville", label: "Autre ville" },
];

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

// Available motos for cross-selling
const availableMotos: CarType[] = [
  { id: 101, name: "BMW R 1250 GS", price: "1200", period: "jour", image: "/moto.png", category: "Adventure" },
  { id: 102, name: "Harley-Davidson Street Glide", price: "1500", period: "jour", image: "/moto.png", category: "Touring" },
  { id: 103, name: "Yamaha MT-09", price: "800", period: "jour", image: "/moto.png", category: "Naked" },
  { id: 104, name: "Honda Africa Twin", price: "1000", period: "jour", image: "/moto.png", category: "Adventure" },
  { id: 105, name: "Kawasaki Z900", price: "750", period: "jour", image: "/moto.png", category: "Naked" },
  { id: 106, name: "Ducati Monster", price: "900", period: "jour", image: "/moto.png", category: "Naked" },
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
    selectedTransfer,
    bookingDetails,
    contactInfo,
    updateBookingDetails,
    updateContactInfo,
    toggleExcursion,
    isExcursionSelected,
    getTotalPrice,
    getRentalDays,
    selectCar,
  } = useBooking();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionMethod, setSubmissionMethod] = useState<'whatsapp' | 'devis' | null>(null);
  const [createdQuote, setCreatedQuote] = useState<{ reference: string; id: string } | null>(null);

  // Cross-selling car selection state
  const [carSelectionMode, setCarSelectionMode] = useState<'hidden' | 'list' | 'dates'>('hidden');
  const [pendingCar, setPendingCar] = useState<CarType | null>(null);
  const [carRentalDates, setCarRentalDates] = useState({ pickupDate: '', returnDate: '' });

  // Cross-selling moto selection state
  const [motoSelectionMode, setMotoSelectionMode] = useState<'hidden' | 'list' | 'dates'>('hidden');
  const [pendingMoto, setPendingMoto] = useState<CarType | null>(null);
  const [motoRentalDates, setMotoRentalDates] = useState({ pickupDate: '', returnDate: '' });

  const canProceed = () => {
    switch (currentStep) {
      case 1: {
        const hasPickupDate = !!bookingDetails.pickupDate;
        const hasPickupTime = !!bookingDetails.pickupTime;
        const hasPeople = bookingDetails.numberOfPeople > 0;

        // Transfer: need date, time, and pickup location
        if (serviceType === "transfer" && selectedTransfer) {
          const hasPickupLocation = !!bookingDetails.pickupLocation;
          return hasPickupDate && hasPickupTime && hasPickupLocation && hasPeople;
        }

        // Excursion-only: need date, time, pickup location (Marrakech), and people
        if (serviceType === "excursion" && !selectedCar) {
          const hasPickupLocation = !!bookingDetails.pickupLocation;
          return hasPickupDate && hasPickupTime && hasPickupLocation && hasPeople;
        }

        // Transport: need origin + destination (no return date needed)
        if (selectedCar?.period === "trajet") {
          return hasPickupDate && hasPickupTime && !!bookingDetails.pickupLocation && !!bookingDetails.dropoffLocation && hasPeople;
        }

        // Car/Moto: validate based on delivery city
        const hasReturnDate = !!bookingDetails.returnDate;

        // Marrakech delivery
        if (bookingDetails.deliveryCity === "marrakech") {
          const hasZone = !!bookingDetails.pickupZone;
          const hasAddress = bookingDetails.pickupZone === "autre_marrakech" ? !!bookingDetails.pickupLocation : true;
          return hasPickupDate && hasPickupTime && hasReturnDate && hasZone && hasAddress && hasPeople;
        }

        // Outside Marrakech delivery
        if (bookingDetails.pickupZone === "hors_marrakech") {
          const hasCity = !!bookingDetails.deliveryCity;
          const hasAddress = !!bookingDetails.pickupLocation;
          return hasPickupDate && hasPickupTime && hasReturnDate && hasCity && hasAddress && hasPeople;
        }

        // Default: need to select a city first
        return false;
      }
      case 2:
        return selectedCar || selectedExcursions.length > 0 || selectedTransfer;
      case 3:
        return true; // Extras are optional
      case 4:
        return contactInfo.fullName && contactInfo.phone;
      default:
        return false;
    }
  };

  // Format date to French format
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const generateWhatsAppMessage = () => {
    const divider = "━━━━━━━━━━━━━━━━━━━━";
    let message = `🚗 *DEMANDE DE RÉSERVATION H12*\n${divider}\n\n`;

    // Service Type Header
    if (serviceType === "moto") {
      message += `🏍️ *LOCATION MOTO*\n\n`;
    } else if (serviceType === "car") {
      message += `🚘 *LOCATION VÉHICULE*\n\n`;
    } else if (serviceType === "excursion") {
      message += `🏔️ *RÉSERVATION EXCURSION*\n\n`;
    } else if (serviceType === "transfer") {
      message += `✈️ *RÉSERVATION TRANSFERT*\n\n`;
    }

    // Vehicle Details
    if (selectedCar) {
      message += `📌 *Véhicule sélectionné:*\n`;
      message += `   • ${selectedCar.name}\n`;
      if (selectedCar.period === "trajet") {
        message += `   • ${selectedCar.price} DH par trajet\n\n`;
      } else {
        const days = getRentalDays();
        message += `   • ${selectedCar.price} DH/jour × ${days} jour${days > 1 ? 's' : ''}\n`;
        message += `   • Sous-total: ${parseInt(selectedCar.price) * days} DH\n\n`;
      }
    }

    // Transfer Details
    if (selectedTransfer) {
      message += `✈️ *Transfert sélectionné:*\n`;
      message += `   • ${selectedTransfer.name}\n`;
      message += `   • ${selectedTransfer.numPeople} personne${selectedTransfer.numPeople > 1 ? 's' : ''}\n`;
      message += `   • Prix: ${selectedTransfer.price} DH\n\n`;
    }

    // Excursions Details
    if (selectedExcursions.length > 0) {
      message += `🎯 *Excursions sélectionnées:*\n`;
      selectedExcursions.forEach((exc) => {
        const excTotal = parseInt(exc.price) * bookingDetails.numberOfPeople;
        message += `   • ${exc.name}\n`;
        message += `     ${exc.price} DH × ${bookingDetails.numberOfPeople} pers = ${excTotal} DH\n`;
      });
      message += `\n`;
    }

    // Booking Details
    message += `📅 *Détails de la réservation:*\n`;
    message += `   • Date: ${formatDate(bookingDetails.pickupDate)}`;
    if (bookingDetails.pickupTime) {
      message += ` à ${bookingDetails.pickupTime}`;
    }
    message += `\n`;
    if (bookingDetails.returnDate && selectedCar?.period !== "trajet") {
      message += `   • Retour: ${formatDate(bookingDetails.returnDate)}\n`;
      message += `   • Durée: ${getRentalDays()} jour${getRentalDays() > 1 ? 's' : ''}\n`;
    }

    if (selectedCar?.period === "trajet") {
      message += `   • Départ: ${bookingDetails.pickupLocation}\n`;
      message += `   • Destination: ${bookingDetails.dropoffLocation}\n`;
    } else if (serviceType === "excursion" && !selectedCar) {
      // Excursion-only: show pickup location (Marrakech)
      message += `   • Lieu: ${bookingDetails.pickupLocation} (Marrakech)\n`;
    } else {
      // Car/Moto rental: show delivery location
      if (bookingDetails.deliveryCity === "marrakech") {
        const zone = marrakechZones.find(z => z.value === bookingDetails.pickupZone);
        const zoneName = zone?.label || bookingDetails.pickupZone;
        message += `   • Ville: Marrakech\n`;
        message += `   • Zone: ${zoneName} ✅ (Livraison gratuite)\n`;
        if (bookingDetails.pickupZone === "autre_marrakech" && bookingDetails.pickupLocation) {
          message += `   • Adresse: ${bookingDetails.pickupLocation}\n`;
        }
      } else {
        // Outside Marrakech
        const city = moroccanCities.find(c => c.value === bookingDetails.deliveryCity);
        const cityName = city?.label || bookingDetails.deliveryCity;
        message += `   • Ville: ${cityName} 📍 (Frais de livraison)\n`;
        if (bookingDetails.pickupLocation) {
          message += `   • Adresse: ${bookingDetails.pickupLocation}\n`;
        }
      }

      // Driver option
      if (bookingDetails.wantsDriver) {
        message += `   • 🚗 Avec chauffeur\n`;
      }
    }
    message += `   • Personnes: ${bookingDetails.numberOfPeople}\n\n`;

    // Contact Info
    message += `👤 *Coordonnées client:*\n`;
    message += `   • Nom: ${contactInfo.fullName}\n`;
    message += `   • Tél: ${contactInfo.phone}\n`;
    if (contactInfo.email) {
      message += `   • Email: ${contactInfo.email}\n`;
    }

    // Special Notes
    if (contactInfo.notes) {
      message += `\n📝 *Notes:*\n   ${contactInfo.notes}\n`;
    }

    // Total
    message += `\n${divider}\n`;
    message += `💰 *TOTAL ESTIMÉ: ${getTotalPrice()} DH*\n`;
    message += `${divider}\n\n`;
    message += `_Merci de confirmer la disponibilité._`;

    return encodeURIComponent(message);
  };

  // Save quote to database and return the created quote
  const saveQuoteToDatabase = async (): Promise<{ reference: string; id: string } | null> => {
    const quoteData = {
      serviceType: serviceType || "car",
      vehicleId: selectedCar?.id ? String(selectedCar.id) : null,
      vehicleName: selectedCar?.name || null,
      vehiclePrice: selectedCar?.price ? parseInt(selectedCar.price) : null,
      pickupDate: bookingDetails.pickupDate || null,
      pickupTime: bookingDetails.pickupTime || null,
      returnDate: bookingDetails.returnDate || null,
      pickupLocation: bookingDetails.pickupLocation || null,
      pickupZone: bookingDetails.pickupZone || null,
      dropoffLocation: bookingDetails.dropoffLocation || null,
      deliveryCity: bookingDetails.deliveryCity || "marrakech",
      wantsDriver: bookingDetails.wantsDriver,
      numberOfPeople: bookingDetails.numberOfPeople,
      excursions: selectedExcursions.length > 0
        ? selectedExcursions.map(e => ({ name: e.name, price: parseInt(e.price) }))
        : null,
      // Transfer data
      transferId: selectedTransfer?.id || null,
      transferName: selectedTransfer?.name || null,
      transferPrice: selectedTransfer?.price || null,
      fullName: contactInfo.fullName,
      phone: contactInfo.phone,
      email: contactInfo.email || null,
      notes: contactInfo.notes || null,
      rentalDays: getRentalDays(),
      totalPrice: getTotalPrice(),
    };

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData),
      });

      if (!response.ok) {
        console.error('Failed to save quote to database');
        return null;
      }

      const data = await response.json();
      return { reference: data.reference, id: data.id };
    } catch (error) {
      console.error('Error saving quote:', error);
      return null;
    }
  };

  // Handle "Envoyer le devis" submission
  const handleSendDevis = async () => {
    setIsSubmitting(true);
    setSubmissionMethod('devis');

    try {
      const quote = await saveQuoteToDatabase();
      if (quote) {
        setCreatedQuote(quote);
        setIsSubmitted(true);
      } else {
        alert('Erreur lors de la création du devis. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Devis submission error:', error);
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Build booking URL with all data encoded as params
  const buildBookingURL = () => {
    // Use current origin so it works on localhost AND production
    const baseURL = `${window.location.origin}/demande`;
    const params = new URLSearchParams();

    // Contact info
    params.set("n", contactInfo.fullName);
    params.set("p", contactInfo.phone);
    if (contactInfo.email) params.set("e", contactInfo.email);
    if (contactInfo.notes) params.set("no", contactInfo.notes);

    // Service type
    params.set("s", serviceType || "car");

    // Vehicle info
    if (selectedCar) {
      params.set("v", selectedCar.name);
      params.set("vp", selectedCar.price);
      params.set("vd", selectedCar.period);
    }

    // Excursions (format: name1:price1|name2:price2)
    if (selectedExcursions.length > 0) {
      const excStr = selectedExcursions
        .map(e => `${e.name}:${e.price}`)
        .join("|");
      params.set("ex", excStr);
    }

    // Transfer info
    if (selectedTransfer) {
      params.set("tr", selectedTransfer.name);
      params.set("trp", String(selectedTransfer.price));
      params.set("trn", String(selectedTransfer.numPeople));
    }

    // Booking details
    if (bookingDetails.pickupDate) params.set("d", bookingDetails.pickupDate);
    if (bookingDetails.pickupTime) params.set("t", bookingDetails.pickupTime);
    if (bookingDetails.returnDate) params.set("r", bookingDetails.returnDate);

    // Location
    const zoneName = bookingDetails.pickupZone
      ? (marrakechZones.find(z => z.value === bookingDetails.pickupZone)?.label || bookingDetails.pickupZone)
      : "";
    if (zoneName) params.set("z", zoneName);
    if (bookingDetails.pickupLocation) params.set("a", bookingDetails.pickupLocation);
    params.set("c", bookingDetails.deliveryCity || "marrakech");

    // Options
    if (bookingDetails.wantsDriver) params.set("dr", "1");
    params.set("pp", String(bookingDetails.numberOfPeople));

    // Totals
    params.set("tot", String(getTotalPrice()));
    params.set("dy", String(getRentalDays()));

    return `${baseURL}?${params.toString()}`;
  };

  // Handle WhatsApp submission - sends booking link DIRECTLY (no PDF, no share sheet)
  const handleWhatsAppWithPDF = async () => {
    setIsSubmitting(true);
    setSubmissionMethod('whatsapp');

    try {
      // Save to database first and get reference
      const quote = await saveQuoteToDatabase();
      if (quote) {
        setCreatedQuote(quote);
      }

      // Send email notification
      try {
        await fetch('/api/email_reservation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            serviceType,
            selectedCar,
            selectedExcursions,
            bookingDetails: {
              ...bookingDetails,
              rentalDays: getRentalDays(),
              zoneName: bookingDetails.deliveryCity === "marrakech" 
                ? marrakechZones.find(z => z.value === bookingDetails.pickupZone)?.label 
                : moroccanCities.find(c => c.value === bookingDetails.deliveryCity)?.label,
            },
            contactInfo,
            totalPrice: getTotalPrice(),
          }),
        });
        // Continue même si l'email échoue
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        // On continue quand même vers WhatsApp
      }
      
      // Build the devis URL instead of booking URL
      const devisURL = quote
        ? `${window.location.origin}/devis/${quote.reference}`
        : buildBookingURL();

      // Build WhatsApp message with the link
      const message = encodeURIComponent(
        `Bonjour H12! 👋\n\n` +
        `Nouvelle demande de réservation:\n\n` +
        `👤 *${contactInfo.fullName}*\n` +
        `📞 ${contactInfo.phone}\n` +
        `💰 Total: ${getTotalPrice()} DH\n` +
        (quote ? `📝 Réf: ${quote.reference}\n\n` : '\n') +
        `📋 Voir le devis:\n${devisURL}\n\n` +
        `Merci de confirmer la disponibilité! 🙏`
      );

      // Show success state
      setIsSubmitted(true);
      setIsSubmitting(false);

      // Open WhatsApp DIRECTLY (use location.href for better mobile support)
      setTimeout(() => {
        window.open(`https://wa.me/212614968594?text=${message}`, '_blank');
      }, 600);

    } catch (error) {
      console.error('Error building booking URL:', error);
      // Fallback: just open WhatsApp with text message
      window.location.href = `https://wa.me/212614968594?text=${generateWhatsAppMessage()}`;
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
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
                                      ? "bg-blue-500 text-white"
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
                                        ? "bg-blue-500"
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

                    {/* Pickup Date & Time Row */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Pickup Date */}
                      <div>
                        <label className="text-sm text-white/60 mb-1.5 block">
                          Date *
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="date"
                            value={bookingDetails.pickupDate}
                            min={getTodayString()}
                            onChange={(e) => {
                              const newPickupDate = e.target.value;
                              updateBookingDetails({ pickupDate: newPickupDate });
                              // If return date is before new pickup date, reset it
                              if (bookingDetails.returnDate && bookingDetails.returnDate < newPickupDate) {
                                updateBookingDetails({ returnDate: '' });
                              }
                            }}
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                       text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
                          />
                        </div>
                      </div>

                      {/* Pickup Time */}
                      <div>
                        <label className="text-sm text-white/60 mb-1.5 block">
                          Heure *
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="time"
                            value={bookingDetails.pickupTime}
                            onChange={(e) =>
                              updateBookingDetails({ pickupTime: e.target.value })
                            }
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                       text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Return Date (for cars and motos, not transport) */}
                    {(serviceType === "car" || serviceType === "moto") && selectedCar?.period !== "trajet" && (
                      <div>
                        <label className="text-sm text-white/60 mb-1.5 block">
                          Date de retour *
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="date"
                            value={bookingDetails.returnDate}
                            min={bookingDetails.pickupDate || getTodayString()}
                            onChange={(e) =>
                              updateBookingDetails({ returnDate: e.target.value })
                            }
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                       text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
                          />
                        </div>
                      </div>
                    )}

                    {/* ========== LOCATION FIELDS ========== */}
                    {selectedCar?.period === "trajet" ? (
                      <>
                        {/* Transport: Origin + Destination */}
                        <div>
                          <label className="text-sm text-white/60 mb-1.5 block">
                            Lieu de départ *
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                              type="text"
                              value={bookingDetails.pickupLocation}
                              onChange={(e) =>
                                updateBookingDetails({ pickupLocation: e.target.value })
                              }
                              placeholder="Aéroport Menara, Hôtel, Adresse..."
                              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                         text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-white/60 mb-1.5 block">
                            Destination *
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                              type="text"
                              value={bookingDetails.dropoffLocation}
                              onChange={(e) =>
                                updateBookingDetails({ dropoffLocation: e.target.value })
                              }
                              placeholder="Hôtel, Riad, Adresse..."
                              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                         text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
                            />
                          </div>
                        </div>
                      </>
                    ) : serviceType === "transfer" && selectedTransfer ? (
                      <>
                        {/* TRANSFER: Show transfer summary + pickup location */}
                        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-white text-sm">{selectedTransfer.name}</h4>
                              <p className="text-xs text-white/60">
                                {selectedTransfer.numPeople} pers · {selectedTransfer.price} DH
                                {selectedTransfer.duration && ` · ${selectedTransfer.duration}`}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-white/60 mb-1.5 block">
                            Adresse de prise en charge *
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                              type="text"
                              value={bookingDetails.pickupLocation}
                              onChange={(e) =>
                                updateBookingDetails({ pickupLocation: e.target.value })
                              }
                              placeholder="Hôtel, Riad, adresse complète..."
                              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                         text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
                            />
                          </div>
                          <p className="text-xs text-white/40 mt-1.5">
                            Indiquez où nous devons venir vous chercher
                          </p>
                        </div>
                      </>
                    ) : serviceType === "excursion" && !selectedCar ? (
                      <>
                        {/* EXCURSION: Marrakech only with required pickup */}
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-1">
                          <div className="flex items-start gap-2">
                            <Info className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-amber-200">
                              Les excursions sont disponibles uniquement au départ de <strong>Marrakech</strong>.
                              Nous viendrons vous chercher à votre hébergement.
                            </p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-white/60 mb-1.5 block">
                            Lieu de prise en charge à Marrakech *
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                              type="text"
                              value={bookingDetails.pickupLocation}
                              onChange={(e) =>
                                updateBookingDetails({ pickupLocation: e.target.value })
                              }
                              placeholder="Nom de votre hôtel ou riad..."
                              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                         text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* CAR/MOTO: City selection + Zone/Address */}

                        {/* City Toggle: Marrakech vs Autre ville */}
                        <div>
                          <label className="text-sm text-white/60 mb-2 block">
                            Ville de livraison *
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => updateBookingDetails({
                                deliveryCity: "marrakech",
                                pickupZone: "",
                                pickupLocation: ""
                              })}
                              className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all
                                ${bookingDetails.deliveryCity === "marrakech"
                                  ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`}
                            >
                              <span className="flex items-center justify-center gap-2">
                                <Check className={`w-4 h-4 ${bookingDetails.deliveryCity === "marrakech" ? "opacity-100" : "opacity-0"}`} />
                                Marrakech
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => updateBookingDetails({
                                deliveryCity: "",
                                pickupZone: "hors_marrakech",
                                pickupLocation: ""
                              })}
                              className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all
                                ${bookingDetails.deliveryCity !== "marrakech" && bookingDetails.deliveryCity !== ""
                                  ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                                  : bookingDetails.pickupZone === "hors_marrakech"
                                    ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`}
                            >
                              <span className="flex items-center justify-center gap-2">
                                <Check className={`w-4 h-4 ${(bookingDetails.deliveryCity !== "marrakech" && bookingDetails.deliveryCity !== "") || bookingDetails.pickupZone === "hors_marrakech" ? "opacity-100" : "opacity-0"}`} />
                                Autre ville
                              </span>
                            </button>
                          </div>
                        </div>

                        {/* Marrakech: Zone dropdown */}
                        {bookingDetails.deliveryCity === "marrakech" && (
                          <>
                            <div>
                              <label className="text-sm text-white/60 mb-1.5 block">
                                Quartier / Zone *
                              </label>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <select
                                  value={bookingDetails.pickupZone}
                                  onChange={(e) => {
                                    const zone = e.target.value;
                                    updateBookingDetails({
                                      pickupZone: zone,
                                      pickupLocation: zone !== "autre_marrakech"
                                        ? marrakechZones.find(z => z.value === zone)?.label || ""
                                        : "",
                                    });
                                  }}
                                  className="w-full pl-11 pr-10 py-3 rounded-xl bg-white/5 border border-white/10
                                             text-white focus:outline-none focus:border-blue-500/50 appearance-none"
                                >
                                  <option value="" className="bg-zinc-900">Sélectionnez une zone</option>
                                  {marrakechZones.map((zone) => (
                                    <option key={zone.value} value={zone.value} className="bg-zinc-900">
                                      {zone.label}
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                              </div>
                              {/* Free delivery badge */}
                              {bookingDetails.pickupZone && bookingDetails.pickupZone !== "autre_marrakech" && (
                                <div className="mt-2">
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-medium text-green-400">
                                    <Check className="w-3 h-3" />
                                    Livraison gratuite à Marrakech
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Precise address for "autre quartier" */}
                            {bookingDetails.pickupZone === "autre_marrakech" && (
                              <div>
                                <label className="text-sm text-white/60 mb-1.5 block">
                                  Adresse précise à Marrakech *
                                </label>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                  <input
                                    type="text"
                                    value={bookingDetails.pickupLocation}
                                    onChange={(e) => updateBookingDetails({ pickupLocation: e.target.value })}
                                    placeholder="Adresse, nom d'hôtel..."
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                               text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
                                  />
                                </div>
                                <div className="mt-2">
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-medium text-green-400">
                                    <Check className="w-3 h-3" />
                                    Livraison gratuite à Marrakech
                                  </span>
                                </div>
                              </div>
                            )}
                          </>
                        )}

                        {/* Outside Marrakech: City + Address */}
                        {bookingDetails.pickupZone === "hors_marrakech" && (
                          <>
                            <div>
                              <label className="text-sm text-white/60 mb-1.5 block">
                                Ville *
                              </label>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <select
                                  value={bookingDetails.deliveryCity}
                                  onChange={(e) => updateBookingDetails({
                                    deliveryCity: e.target.value,
                                    pickupLocation: ""
                                  })}
                                  className="w-full pl-11 pr-10 py-3 rounded-xl bg-white/5 border border-white/10
                                             text-white focus:outline-none focus:border-blue-500/50 appearance-none"
                                >
                                  <option value="" className="bg-zinc-900">Sélectionnez une ville</option>
                                  {moroccanCities.map((city) => (
                                    <option key={city.value} value={city.value} className="bg-zinc-900">
                                      {city.label}
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
                              </div>
                            </div>

                            {bookingDetails.deliveryCity && (
                              <div>
                                <label className="text-sm text-white/60 mb-1.5 block">
                                  Adresse de livraison *
                                </label>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                  <input
                                    type="text"
                                    value={bookingDetails.pickupLocation}
                                    onChange={(e) => updateBookingDetails({ pickupLocation: e.target.value })}
                                    placeholder="Hôtel, adresse..."
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                               text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
                                  />
                                </div>
                              </div>
                            )}

                            {/* Paid delivery notice */}
                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                              <div className="flex items-start gap-2">
                                <Info className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-amber-200">
                                  La livraison hors Marrakech est soumise à des frais supplémentaires.
                                  Nous vous contacterons pour confirmer le tarif.
                                </p>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Driver option */}
                        {(serviceType === "car" || serviceType === "moto") && selectedCar?.period !== "trajet" && (
                          <div
                            onClick={() => updateBookingDetails({ wantsDriver: !bookingDetails.wantsDriver })}
                            className={`p-4 rounded-xl border cursor-pointer transition-all
                              ${bookingDetails.wantsDriver
                                ? "bg-blue-500/10 border-blue-500/30"
                                : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center
                                ${bookingDetails.wantsDriver ? "bg-blue-500/20" : "bg-white/10"}`}>
                                <CircleUser className={`w-5 h-5 ${bookingDetails.wantsDriver ? "text-blue-400" : "text-white/50"}`} />
                              </div>
                              <div className="flex-1">
                                <p className={`font-medium ${bookingDetails.wantsDriver ? "text-white" : "text-white/80"}`}>
                                  Avec chauffeur
                                </p>
                                <p className="text-xs text-white/50">
                                  Un chauffeur professionnel conduira pour vous
                                </p>
                              </div>
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                                ${bookingDetails.wantsDriver
                                  ? "bg-blue-500 border-blue-500"
                                  : "border-white/30"}`}>
                                {bookingDetails.wantsDriver && <Check className="w-4 h-4 text-white" />}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}

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
                          <Users className="w-5 h-5 text-blue-400" />
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
                          <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            {serviceType === "moto" ? (
                              <Bike className="w-6 h-6 text-blue-400" />
                            ) : (
                              <Car className="w-6 h-6 text-blue-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">
                              {selectedCar.name}
                            </h4>
                            <p className="text-sm text-white/60">
                              {selectedCar.price} DH / {selectedCar.period}
                              {selectedCar.period !== "trajet" && bookingDetails.returnDate && (
                                <span className="text-blue-400 ml-2">
                                  × {getRentalDays()} jour{getRentalDays() > 1 ? 's' : ''} = {parseInt(selectedCar.price) * getRentalDays()} DH
                                </span>
                              )}
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
                              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                <Mountain className="w-6 h-6 text-blue-400" />
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

                    {/* Selected Transfer */}
                    {selectedTransfer && (
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">
                              {selectedTransfer.name}
                            </h4>
                            <p className="text-sm text-white/60">
                              {selectedTransfer.numPeople} pers · {selectedTransfer.price} DH
                              {selectedTransfer.duration && ` · ${selectedTransfer.duration}`}
                            </p>
                          </div>
                          <Check className="w-5 h-5 text-green-500" />
                        </div>
                      </div>
                    )}

                    {/* Booking Summary */}
                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <h4 className="text-sm font-semibold text-blue-400 mb-2">
                        Récapitulatif
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between text-white/60">
                          <span>Date</span>
                          <span>
                            {bookingDetails.pickupDate || "-"}
                            {bookingDetails.pickupTime && ` à ${bookingDetails.pickupTime}`}
                          </span>
                        </div>
                        {bookingDetails.returnDate && (
                          <>
                            <div className="flex justify-between text-white/60">
                              <span>Retour</span>
                              <span>{bookingDetails.returnDate}</span>
                            </div>
                            <div className="flex justify-between text-blue-400 font-medium">
                              <span>Durée</span>
                              <span>{getRentalDays()} jour{getRentalDays() > 1 ? 's' : ''}</span>
                            </div>
                          </>
                        )}
                        {selectedCar?.period === "trajet" ? (
                          <>
                            <div className="flex justify-between text-white/60">
                              <span>Départ</span>
                              <span>{bookingDetails.pickupLocation || "-"}</span>
                            </div>
                            <div className="flex justify-between text-white/60">
                              <span>Destination</span>
                              <span>{bookingDetails.dropoffLocation || "-"}</span>
                            </div>
                          </>
                        ) : serviceType === "transfer" && selectedTransfer ? (
                          // Transfer: show pickup location
                          <div className="flex justify-between text-white/60">
                            <span>Prise en charge</span>
                            <span className="truncate max-w-[180px]">{bookingDetails.pickupLocation || "-"}</span>
                          </div>
                        ) : serviceType === "excursion" && !selectedCar ? (
                          // Excursion-only: show pickup location (Marrakech)
                          <div className="flex justify-between text-white/60">
                            <span>Lieu</span>
                            <span>{bookingDetails.pickupLocation} <span className="text-[10px] text-blue-400">(Marrakech)</span></span>
                          </div>
                        ) : (
                          // Car/Moto rental: show delivery info
                          <>
                            {bookingDetails.deliveryCity === "marrakech" ? (
                              <div className="flex justify-between text-white/60">
                                <span>Livraison</span>
                                <span className="flex items-center gap-2">
                                  {marrakechZones.find(z => z.value === bookingDetails.pickupZone)?.label || "Marrakech"}
                                  <span className="text-[10px] text-green-400">(Gratuit)</span>
                                </span>
                              </div>
                            ) : (
                              <div className="flex justify-between text-white/60">
                                <span>Livraison</span>
                                <span className="flex items-center gap-2">
                                  {moroccanCities.find(c => c.value === bookingDetails.deliveryCity)?.label || bookingDetails.deliveryCity}
                                  <span className="text-[10px] text-amber-400">(Frais)</span>
                                </span>
                              </div>
                            )}
                            {bookingDetails.pickupLocation && (bookingDetails.pickupZone === "autre_marrakech" || bookingDetails.pickupZone === "hors_marrakech") && (
                              <div className="flex justify-between text-white/60">
                                <span>Adresse</span>
                                <span className="truncate max-w-[180px]">{bookingDetails.pickupLocation}</span>
                              </div>
                            )}
                            {bookingDetails.wantsDriver && (
                              <div className="flex justify-between text-blue-400">
                                <span>Chauffeur</span>
                                <span>Oui ✓</span>
                              </div>
                            )}
                          </>
                        )}
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
                    {/* ========== CAR SELECTION SUB-FLOW ========== */}
                    {(serviceType === "excursion" || serviceType === "moto") && carSelectionMode !== 'hidden' && (
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
                              Choisissez votre voiture
                            </h3>
                            <p className="text-sm text-white/60 mb-4">
                              Sélectionnez une voiture pour vos déplacements
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
                                             hover:border-blue-500/50 hover:bg-white/10 transition-all text-left
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
                                    <p className="font-bold text-blue-400 text-sm">
                                      {car.price} DH
                                    </p>
                                    <p className="text-[10px] text-white/40">/{car.period}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Car Date Selection View */}
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
                              <span className="text-sm">Changer de voiture</span>
                            </button>

                            {/* Selected Car Preview */}
                            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 mb-4">
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
                                  <p className="text-sm text-blue-400">{pendingCar.price} DH/{pendingCar.period}</p>
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
                                  min={getTodayString()}
                                  onChange={(e) => {
                                    const newPickupDate = e.target.value;
                                    setCarRentalDates(prev => ({
                                      ...prev,
                                      pickupDate: newPickupDate,
                                      returnDate: prev.returnDate && prev.returnDate < newPickupDate ? '' : prev.returnDate
                                    }));
                                  }}
                                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                             text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
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
                                  min={carRentalDates.pickupDate || getTodayString()}
                                  onChange={(e) => setCarRentalDates(prev => ({ ...prev, returnDate: e.target.value }))}
                                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                             text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
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
                              className="w-full py-3 rounded-xl bg-blue-500
                                         text-white font-semibold flex items-center justify-center gap-2
                                         disabled:opacity-50 disabled:cursor-not-allowed
                                         hover:bg-blue-600 transition"
                            >
                              <Check className="w-4 h-4" />
                              Ajouter cette voiture
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}

                    {/* ========== MOTO SELECTION SUB-FLOW ========== */}
                    {(serviceType === "car" || serviceType === "excursion") && motoSelectionMode !== 'hidden' && (
                      <AnimatePresence mode="wait">
                        {/* Moto List View */}
                        {motoSelectionMode === 'list' && (
                          <motion.div
                            key="moto-list"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                          >
                            <button
                              onClick={() => setMotoSelectionMode('hidden')}
                              className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              <span className="text-sm">Retour</span>
                            </button>
                            <h3 className="text-xl font-bold text-white mb-2">
                              Choisissez votre moto
                            </h3>
                            <p className="text-sm text-white/60 mb-4">
                              Sélectionnez une moto pour vos aventures
                            </p>
                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
                              {availableMotos.map((moto) => (
                                <button
                                  key={moto.id}
                                  onClick={() => {
                                    setPendingMoto(moto);
                                    setMotoSelectionMode('dates');
                                  }}
                                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10
                                             hover:border-orange-500/50 hover:bg-white/10 transition-all text-left
                                             flex items-center gap-3"
                                >
                                  <div className="w-16 h-12 rounded-lg bg-white/10 overflow-hidden flex-shrink-0 relative">
                                    <Image
                                      src={moto.image}
                                      alt={moto.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-white text-sm truncate">
                                      {moto.name}
                                    </h4>
                                    <p className="text-xs text-white/50">{moto.category}</p>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <p className="font-bold text-orange-400 text-sm">
                                      {moto.price} DH
                                    </p>
                                    <p className="text-[10px] text-white/40">/{moto.period}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Moto Date Selection View */}
                        {motoSelectionMode === 'dates' && pendingMoto && (
                          <motion.div
                            key="moto-dates"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                          >
                            <button
                              onClick={() => setMotoSelectionMode('list')}
                              className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              <span className="text-sm">Changer de moto</span>
                            </button>

                            {/* Selected Moto Preview */}
                            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-16 h-12 rounded-lg bg-white/10 overflow-hidden flex-shrink-0 relative">
                                  <Image
                                    src={pendingMoto.image}
                                    alt={pendingMoto.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white">{pendingMoto.name}</h4>
                                  <p className="text-sm text-orange-400">{pendingMoto.price} DH/{pendingMoto.period}</p>
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
                                  value={motoRentalDates.pickupDate}
                                  min={getTodayString()}
                                  onChange={(e) => {
                                    const newPickupDate = e.target.value;
                                    setMotoRentalDates(prev => ({
                                      ...prev,
                                      pickupDate: newPickupDate,
                                      returnDate: prev.returnDate && prev.returnDate < newPickupDate ? '' : prev.returnDate
                                    }));
                                  }}
                                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                             text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
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
                                  value={motoRentalDates.returnDate}
                                  min={motoRentalDates.pickupDate || getTodayString()}
                                  onChange={(e) => setMotoRentalDates(prev => ({ ...prev, returnDate: e.target.value }))}
                                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                             text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
                                />
                              </div>
                            </div>

                            {/* Confirm Button */}
                            <button
                              onClick={() => {
                                if (motoRentalDates.pickupDate && motoRentalDates.returnDate) {
                                  selectCar(pendingMoto);
                                  updateBookingDetails({
                                    returnDate: motoRentalDates.returnDate,
                                  });
                                  setMotoSelectionMode('hidden');
                                  setPendingMoto(null);
                                }
                              }}
                              disabled={!motoRentalDates.pickupDate || !motoRentalDates.returnDate}
                              className="w-full py-3 rounded-xl bg-orange-500
                                         text-white font-semibold flex items-center justify-center gap-2
                                         disabled:opacity-50 disabled:cursor-not-allowed
                                         hover:bg-orange-600 transition"
                            >
                              <Check className="w-4 h-4" />
                              Ajouter cette moto
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}

                    {/* ========== NORMAL STEP 3 CONTENT ========== */}
                    {carSelectionMode === 'hidden' && motoSelectionMode === 'hidden' && (
                      <>
                        <h3 className="text-xl font-bold text-white mb-2">
                          Complétez votre aventure
                        </h3>
                        <p className="text-sm text-white/60 mb-4">
                          {serviceType === "car"
                            ? "Ajoutez une moto ou des excursions"
                            : serviceType === "moto"
                            ? "Ajoutez une voiture ou des excursions"
                            : "Ajoutez une moto, une voiture ou d'autres excursions"}
                        </p>

                        {/* ===== CROSS-SELL SECTION ===== */}
                        <div className="space-y-3 mb-4">
                          {/* Cross-sell MOTO for Car/Excursion customers */}
                          {(serviceType === "car" || serviceType === "excursion") && (
                            <button
                              onClick={() => setMotoSelectionMode('list')}
                              className="w-full p-4 rounded-xl border-2 border-dashed border-orange-500/30
                                         bg-orange-500/5 hover:bg-orange-500/10 hover:border-orange-500/50
                                         transition-all text-left group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center
                                                group-hover:bg-orange-500/30 transition">
                                  <Bike className="w-6 h-6 text-orange-400" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white">
                                    Envie d&apos;une moto ?
                                  </h4>
                                  <p className="text-sm text-white/60">
                                    Louez une moto pour explorer librement
                                  </p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition" />
                              </div>
                            </button>
                          )}

                          {/* Cross-sell CAR for Moto/Excursion customers */}
                          {(serviceType === "moto" || serviceType === "excursion") && !selectedCar && (
                            <button
                              onClick={() => setCarSelectionMode('list')}
                              className="w-full p-4 rounded-xl border-2 border-dashed border-blue-500/30
                                         bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/50
                                         transition-all text-left group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center
                                                group-hover:bg-blue-500/30 transition">
                                  <Car className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white">
                                    Besoin d&apos;une voiture ?
                                  </h4>
                                  <p className="text-sm text-white/60">
                                    Louez une voiture pour vos déplacements
                                  </p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition" />
                              </div>
                            </button>
                          )}

                          {/* Show selected car if added via cross-sell (for excursion customers) */}
                          {serviceType === "excursion" && selectedCar && (
                            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                  <Car className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white">{selectedCar.name}</h4>
                                  <p className="text-sm text-blue-400">{selectedCar.price} DH/{selectedCar.period}</p>
                                </div>
                                <Check className="w-5 h-5 text-green-500" />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* ===== EXCURSIONS LIST (for car and moto customers) ===== */}
                        {(serviceType === "car" || serviceType === "moto") && (
                          <>
                            <div className="flex items-center gap-2 mb-3">
                              <Mountain className="w-5 h-5 text-amber-400" />
                              <h4 className="font-semibold text-white">Excursions disponibles</h4>
                            </div>
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
                                                        ? "bg-amber-500 text-white"
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
                                        <p className="font-bold text-amber-400">
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

                        {/* ===== MORE EXCURSIONS (for excursion customers) ===== */}
                        {serviceType === "excursion" && (
                          <>
                            <div className="flex items-center gap-2 mb-3">
                              <Mountain className="w-5 h-5 text-amber-400" />
                              <h4 className="font-semibold text-white">Autres excursions</h4>
                            </div>
                            <div className="space-y-3">
                              {availableExcursions
                                .filter(exc => !isExcursionSelected(exc.id))
                                .map((excursion) => (
                                  <button
                                    key={excursion.id}
                                    onClick={() => toggleExcursion(excursion)}
                                    className="w-full p-4 rounded-xl border transition-all text-left
                                               bg-white/5 border-white/10 hover:border-amber-500/30"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/10 text-white">
                                        <Plus className="w-5 h-5" />
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
                                        <p className="font-bold text-amber-400">
                                          {excursion.price} DH
                                        </p>
                                        <p className="text-xs text-white/40">
                                          par personne
                                        </p>
                                      </div>
                                    </div>
                                  </button>
                                ))}
                            </div>
                          </>
                        )}
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
                                     text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
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
                                     text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
                        />
                      </div>
                    </div>

                    {/* Email (optional) */}
                    <div>
                      <label className="text-sm text-white/60 mb-1.5 block">
                        Email <span className="text-white/30">(optionnel)</span>
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
                                     text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
                        />
                      </div>
                    </div>

                    {/* Notes (optional) */}
                    <div>
                      <label className="text-sm text-white/60 mb-1.5 block">
                        Notes <span className="text-white/30">(optionnel)</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                        <textarea
                          value={contactInfo.notes}
                          onChange={(e) =>
                            updateContactInfo({ notes: e.target.value })
                          }
                          placeholder="Demandes spéciales..."
                          rows={2}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10
                                     text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50
                                     resize-none"
                        />
                      </div>
                    </div>

                    {/* Total */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30">
                      <div className="flex items-center justify-between">
                        <span className="text-white/80 font-medium">Total estimé</span>
                        <span className="text-2xl font-bold text-green-400">
                          {getTotalPrice()} DH
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Success State - Show Devis Link or WhatsApp redirect */}
                {isSubmitted && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <motion.div
                      className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                        submissionMethod === 'devis' ? 'bg-blue-500/20' : 'bg-green-500/20'
                      }`}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Check className={`w-10 h-10 ${submissionMethod === 'devis' ? 'text-blue-500' : 'text-green-500'}`} />
                    </motion.div>

                    {submissionMethod === 'devis' && createdQuote ? (
                      <>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          Devis créé !
                        </h3>
                        <p className="text-white/60 mb-2">
                          Référence: <span className="text-blue-400 font-bold">{createdQuote.reference}</span>
                        </p>
                        <p className="text-sm text-white/40 mb-6">
                          Conservez cette référence pour accéder à votre devis
                        </p>

                        <div className="space-y-3">
                          <a
                            href={`/devis/${createdQuote.reference}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600
                                       text-white font-semibold transition flex items-center justify-center gap-2"
                          >
                            <Send className="w-5 h-5" />
                            Voir mon devis
                          </a>
                          <button
                            onClick={() => {
                              closeWizard();
                              setIsSubmitted(false);
                              setSubmissionMethod(null);
                              setCreatedQuote(null);
                            }}
                            className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20
                                       text-white/70 font-medium transition"
                          >
                            Fermer
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          Parfait !
                        </h3>
                        {createdQuote && (
                          <p className="text-white/60 mb-2">
                            Référence: <span className="text-green-400 font-bold">{createdQuote.reference}</span>
                          </p>
                        )}
                        <p className="text-white/60 mb-4">
                          Redirection vers WhatsApp...
                        </p>
                        <div className="flex items-center justify-center gap-2 text-green-400">
                          <svg className="w-5 h-5 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          <span className="font-medium">Ouverture de WhatsApp...</span>
                        </div>
                      </>
                    )}
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
                      className="flex-1 py-3 rounded-xl bg-blue-500
                                 text-white font-semibold hover:bg-blue-600
                                 transition flex items-center justify-center gap-2
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continuer
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleWhatsAppWithPDF}
                      disabled={!canProceed() || isSubmitting}
                      className="flex-1 py-3 rounded-xl bg-green-500
                                text-white font-semibold hover:bg-green-600
                                transition flex items-center justify-center gap-2
                                disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting && submissionMethod === 'whatsapp' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Envoi...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          <span>Envoyer via WhatsApp</span>
                        </>
                      )}
                    </button>
                    // <div className="flex-1 flex flex-col gap-2">
                    //   {/* WhatsApp Button */}
                    //   <button
                    //     onClick={handleWhatsAppWithPDF}
                    //     disabled={!canProceed() || isSubmitting}
                    //     className="w-full py-3 rounded-xl bg-green-500/20 border border-green-500/40
                    //                text-green-400 font-semibold hover:bg-green-500/30
                    //                transition flex items-center justify-center gap-2
                    //                disabled:opacity-50 disabled:cursor-not-allowed"
                    //   >
                    //     {isSubmitting && submissionMethod === 'whatsapp' ? (
                    //       <>
                    //         <div className="w-5 h-5 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
                    //         <span>Envoi...</span>
                    //       </>
                    //     ) : (
                    //       <>
                    //         <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    //           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    //         </svg>
                    //         <span>Envoyer via WhatsApp</span>
                    //       </>
                    //     )}
                    //   </button>

                    //   {/* Devis Button */}
                    //   <button
                    //     onClick={handleSendDevis}
                    //     disabled={!canProceed() || isSubmitting}
                    //     className="w-full py-3 rounded-xl bg-blue-500/20 border border-blue-500/40
                    //                text-blue-400 font-semibold hover:bg-blue-500/30
                    //                transition flex items-center justify-center gap-2
                    //                disabled:opacity-50 disabled:cursor-not-allowed"
                    //   >
                    //     {isSubmitting && submissionMethod === 'devis' ? (
                    //       <>
                    //         <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                    //         <span>Création du devis...</span>
                    //       </>
                    //     ) : (
                    //       <>
                    //         <Send className="w-5 h-5" />
                    //         <span>Recevoir mon devis</span>
                    //       </>
                    //     )}
                    //   </button>
                    // </div>
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
