"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FileText,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Users,
  Car,
  Plane,
  Mountain,
  CheckCircle,
  Printer,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Shield,
} from "lucide-react";
import Link from "next/link";

interface QuoteData {
  id: string;
  reference: string;
  status: string;
  serviceType: string;
  vehicleName: string | null;
  vehiclePrice: number | null;
  pickupDate: string | null;
  pickupTime: string | null;
  returnDate: string | null;
  pickupLocation: string | null;
  pickupZone: string | null;
  dropoffLocation: string | null;
  deliveryCity: string | null;
  wantsDriver: boolean;
  numberOfPeople: number | null;
  excursions: Array<{ name: string; price: number }> | null;
  transferRoute: {
    name: string;
    category: string;
    distance: string | null;
    duration: string | null;
  } | null;
  fullName: string;
  phone: string;
  email: string | null;
  notes: string | null;
  rentalDays: number | null;
  totalPrice: number | null;
  createdAt: string;
}

export default function DevisPage() {
  const params = useParams();
  const reference = params.reference as string;

  const [phone, setPhone] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [quote, setQuote] = useState<QuoteData | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError("");

    try {
      const res = await fetch(
        `/api/devis/${reference}?phone=${encodeURIComponent(phone)}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur de vérification");
        return;
      }

      setQuote(data);
    } catch {
      setError("Erreur de connexion");
    } finally {
      setIsVerifying(false);
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING":
        return { label: "En attente", color: "bg-yellow-500/20 text-yellow-400" };
      case "CONFIRMED":
        return { label: "Confirmé", color: "bg-green-500/20 text-green-400" };
      case "COMPLETED":
        return { label: "Terminé", color: "bg-blue-500/20 text-blue-400" };
      case "CANCELLED":
        return { label: "Annulé", color: "bg-red-500/20 text-red-400" };
      default:
        return { label: status, color: "bg-zinc-500/20 text-zinc-400" };
    }
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "car":
        return Car;
      case "moto":
        return Car;
      case "transfer":
        return Plane;
      case "excursion":
        return Mountain;
      default:
        return FileText;
    }
  };

  // Phone verification form
  if (!quote) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/">
              <Image
                src="/h12_logob.png"
                alt="H12"
                width={120}
                height={40}
                className="mx-auto mb-4"
              />
            </Link>
            <h1 className="text-2xl font-bold text-white">Votre Devis</h1>
            <p className="text-zinc-400 mt-2">Référence: {reference}</p>
          </div>

          {/* Verification Card */}
          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-white font-semibold">Vérification</h2>
                <p className="text-sm text-zinc-400">
                  Entrez votre numéro pour accéder au devis
                </p>
              </div>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="text-sm text-zinc-400 mb-1.5 block">
                  Numéro de téléphone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06 XX XX XX XX"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying || !phone}
                className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-semibold transition-all flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Vérification...
                  </>
                ) : (
                  <>
                    Accéder au devis
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-zinc-400 hover:text-white text-sm flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Quote/Receipt display
  const ServiceIcon = getServiceIcon(quote.serviceType);
  const status = getStatusLabel(quote.status);

  return (
    <div className="min-h-screen bg-zinc-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            Imprimer
          </button>
        </div>

        {/* Receipt Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl overflow-hidden shadow-2xl print:shadow-none"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src="/h12_logob.png"
                  alt="H12"
                  width={80}
                  height={30}
                  className="brightness-0 invert"
                />
                <div className="h-8 w-px bg-white/30" />
                <div>
                  <p className="text-sm text-white/70">Devis N°</p>
                  <p className="text-xl font-bold">{quote.reference}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                {status.label}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Service Type */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-50">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <ServiceIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Type de service</p>
                <p className="font-semibold text-zinc-900">
                  {quote.serviceType === "car" && "Location de véhicule"}
                  {quote.serviceType === "moto" && "Location de moto"}
                  {quote.serviceType === "transfer" && "Transfert"}
                  {quote.serviceType === "excursion" && "Excursion"}
                </p>
              </div>
            </div>

            {/* Vehicle Info */}
            {quote.vehicleName && (
              <div className="border-b border-zinc-200 pb-4">
                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                  Véhicule
                </h3>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-zinc-900">{quote.vehicleName}</p>
                  {quote.vehiclePrice && (
                    <p className="text-blue-600 font-bold">
                      {quote.vehiclePrice} MAD/jour
                    </p>
                  )}
                </div>
                {quote.rentalDays && quote.rentalDays > 1 && (
                  <p className="text-sm text-zinc-500 mt-1">
                    {quote.rentalDays} jours = {(quote.vehiclePrice || 0) * quote.rentalDays} MAD
                  </p>
                )}
              </div>
            )}

            {/* Transfer Info */}
            {quote.transferRoute && (
              <div className="border-b border-zinc-200 pb-4">
                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                  Transfert
                </h3>
                <p className="font-semibold text-zinc-900">{quote.transferRoute.name}</p>
                <div className="flex items-center gap-4 mt-1 text-sm text-zinc-500">
                  {quote.transferRoute.distance && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {quote.transferRoute.distance}
                    </span>
                  )}
                  {quote.transferRoute.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {quote.transferRoute.duration}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Excursions */}
            {quote.excursions && quote.excursions.length > 0 && (
              <div className="border-b border-zinc-200 pb-4">
                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                  Excursions
                </h3>
                <div className="space-y-2">
                  {quote.excursions.map((exc, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <p className="text-zinc-900">{exc.name}</p>
                      <p className="text-zinc-600">{exc.price} MAD/pers</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Booking Details */}
            <div className="border-b border-zinc-200 pb-4">
              <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                Détails de la réservation
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-zinc-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-zinc-500">Date</p>
                    <p className="text-sm font-medium text-zinc-900">
                      {formatDate(quote.pickupDate)}
                    </p>
                  </div>
                </div>
                {quote.pickupTime && (
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-zinc-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-zinc-500">Heure</p>
                      <p className="text-sm font-medium text-zinc-900">
                        {quote.pickupTime}
                      </p>
                    </div>
                  </div>
                )}
                {quote.returnDate && (
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-zinc-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-zinc-500">Retour</p>
                      <p className="text-sm font-medium text-zinc-900">
                        {formatDate(quote.returnDate)}
                      </p>
                    </div>
                  </div>
                )}
                {quote.numberOfPeople && (
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-zinc-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-zinc-500">Personnes</p>
                      <p className="text-sm font-medium text-zinc-900">
                        {quote.numberOfPeople}
                      </p>
                    </div>
                  </div>
                )}
                {quote.pickupLocation && (
                  <div className="flex items-start gap-2 col-span-2">
                    <MapPin className="w-4 h-4 text-zinc-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-zinc-500">Lieu</p>
                      <p className="text-sm font-medium text-zinc-900">
                        {quote.pickupLocation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Client Info */}
            <div className="border-b border-zinc-200 pb-4">
              <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                Client
              </h3>
              <div className="space-y-2">
                <p className="font-semibold text-zinc-900">{quote.fullName}</p>
                <p className="text-sm text-zinc-600">{quote.phone}</p>
                {quote.email && (
                  <p className="text-sm text-zinc-600">{quote.email}</p>
                )}
              </div>
            </div>

            {/* Notes */}
            {quote.notes && (
              <div className="border-b border-zinc-200 pb-4">
                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                  Notes
                </h3>
                <p className="text-sm text-zinc-600">{quote.notes}</p>
              </div>
            )}

            {/* Total */}
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total estimé</p>
                  <p className="text-xs text-blue-500">TVA non incluse</p>
                </div>
                <p className="text-3xl font-black text-blue-600">
                  {quote.totalPrice || 0} <span className="text-lg">MAD</span>
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-4">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-3">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Devis valide 7 jours</span>
              </div>
              <p className="text-xs text-zinc-500">
                Créé le {formatDate(quote.createdAt)}
              </p>
              <div className="mt-4 pt-4 border-t border-zinc-200">
                <p className="text-sm text-zinc-600">
                  Des questions ? Contactez-nous
                </p>
                <a
                  href="https://wa.me/212661398989"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-all print:hidden"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Print Styles */}
        <style jsx global>{`
          @media print {
            body {
              background: white !important;
            }
            .print\\:hidden {
              display: none !important;
            }
            .print\\:shadow-none {
              box-shadow: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
