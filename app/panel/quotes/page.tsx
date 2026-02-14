"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  FileText,
  Phone,
  Mail,
  Calendar,
  Clock,
  Car,
  Bike,
  Plane,
  Compass,
  Users,
  X,
  Check,
  Trash2,
  Eye,
  Search,
  ArrowRight,
  MapPin,
} from "lucide-react";

interface TransferRoute {
  id: string;
  name: string;
  category: string;
  distance: string | null;
  duration: string | null;
}

interface Quote {
  id: string;
  reference: string | null;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  serviceType: string;
  vehicleId: string | null;
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
  transferRouteId: string | null;
  transferRoute: TransferRoute | null;
  fullName: string;
  phone: string;
  email: string | null;
  notes: string | null;
  rentalDays: number | null;
  totalPrice: number | null;
  createdAt: string;
  vehicle: {
    id: string;
    name: string;
    image: string;
    category: string;
  } | null;
}

const statusOptions = [
  { value: "PENDING", label: "En attente", color: "amber" },
  { value: "CONFIRMED", label: "Confirmé", color: "green" },
  { value: "COMPLETED", label: "Terminé", color: "blue" },
  { value: "CANCELLED", label: "Annulé", color: "red" },
];

const filterOptions = [
  { value: "all", label: "Tous" },
  { value: "PENDING", label: "En attente" },
  { value: "CONFIRMED", label: "Confirmés" },
  { value: "COMPLETED", label: "Terminés" },
  { value: "CANCELLED", label: "Annulés" },
];

function QuotesContent() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("status") || "all";

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filter, setFilter] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  async function fetchQuotes() {
    try {
      const res = await fetch("/api/quotes");
      const data = await res.json();
      setQuotes(data);
    } catch (error) {
      console.error("Failed to fetch quotes:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateQuoteStatus(quoteId: string, status: string) {
    setUpdating(quoteId);
    try {
      const res = await fetch(`/api/quotes/${quoteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setQuotes((prev) =>
          prev.map((q) =>
            q.id === quoteId ? { ...q, status: status as Quote["status"] } : q
          )
        );
        if (selectedQuote?.id === quoteId) {
          setSelectedQuote({
            ...selectedQuote,
            status: status as Quote["status"],
          });
        }
      }
    } catch (error) {
      console.error("Failed to update quote:", error);
    } finally {
      setUpdating(null);
    }
  }

  async function deleteQuote(quoteId: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce devis ?")) return;

    try {
      const res = await fetch(`/api/quotes/${quoteId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setQuotes((prev) => prev.filter((q) => q.id !== quoteId));
        if (selectedQuote?.id === quoteId) {
          setSelectedQuote(null);
        }
      }
    } catch (error) {
      console.error("Failed to delete quote:", error);
    }
  }

  const filteredQuotes = useMemo(() => {
    let result = filter === "all" ? quotes : quotes.filter((q) => q.status === filter);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (quote) =>
          quote.fullName.toLowerCase().includes(q) ||
          quote.phone.includes(q) ||
          (quote.reference && quote.reference.toLowerCase().includes(q)) ||
          (quote.email && quote.email.toLowerCase().includes(q)) ||
          (quote.vehicleName && quote.vehicleName.toLowerCase().includes(q))
      );
    }

    return result;
  }, [quotes, filter, searchQuery]);

  const getStatusBadge = (status: string, size: "sm" | "md" = "sm") => {
    const option = statusOptions.find((o) => o.value === status);
    if (!option) return null;

    const sizeClasses =
      size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1.5 text-sm";

    return (
      <span
        className={`${sizeClasses} font-medium rounded-full ${
          option.color === "amber"
            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
            : option.color === "green"
            ? "bg-green-500/20 text-green-400 border border-green-500/30"
            : option.color === "blue"
            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
            : "bg-red-500/20 text-red-400 border border-red-500/30"
        }`}
      >
        {option.label}
      </span>
    );
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case "moto":
        return <Bike className="w-4 h-4" />;
      case "transfer":
        return <Plane className="w-4 h-4" />;
      case "excursion":
        return <Compass className="w-4 h-4" />;
      default:
        return <Car className="w-4 h-4" />;
    }
  };

  const getServiceLabel = (serviceType: string) => {
    switch (serviceType) {
      case "moto":
        return "Moto";
      case "transfer":
        return "Transfert";
      case "excursion":
        return "Excursion";
      case "car":
        return "Voiture";
      default:
        return serviceType;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatCreatedAt = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffH = Math.floor(diffMin / 60);
    const diffD = Math.floor(diffH / 24);

    if (diffMin < 1) return "À l'instant";
    if (diffMin < 60) return `Il y a ${diffMin}min`;
    if (diffH < 24) return `Il y a ${diffH}h`;
    if (diffD < 7) return `Il y a ${diffD}j`;

    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-zinc-700 rounded w-48"></div>
          <div className="h-12 bg-zinc-700 rounded"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-zinc-700 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Devis</h1>
        <p className="text-zinc-400">
          {quotes.length} devis au total
        </p>
      </div>

      {/* Search + Filters */}
      <div className="space-y-4 mb-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Rechercher par nom, téléphone, référence, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                filter === option.value
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-zinc-800 text-zinc-400 border border-zinc-700 lg:hover:text-white lg:hover:border-zinc-600"
              }`}
            >
              {option.label}
              {option.value !== "all" && (
                <span className="ml-2 text-xs opacity-70">
                  ({quotes.filter((q) => q.status === option.value).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quotes List */}
      {filteredQuotes.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900 border border-zinc-700 rounded-2xl">
          <FileText className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Aucun devis</h3>
          <p className="text-zinc-400">
            {searchQuery
              ? `Aucun résultat pour "${searchQuery}"`
              : filter === "all"
              ? "Aucune demande de réservation pour le moment"
              : `Aucun devis avec le statut "${filterOptions.find((f) => f.value === filter)?.label}"`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredQuotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 lg:hover:border-zinc-600 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Main Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-semibold text-white">
                      {quote.fullName}
                    </span>
                    {getStatusBadge(quote.status)}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400">
                    {/* Reference */}
                    {quote.reference && (
                      <span className="font-mono text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
                        {quote.reference}
                      </span>
                    )}
                    {/* Service type + vehicle */}
                    <span className="flex items-center gap-1.5">
                      {getServiceIcon(quote.serviceType)}
                      {quote.vehicleName || getServiceLabel(quote.serviceType)}
                    </span>
                    {/* Phone */}
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      {quote.phone}
                    </span>
                    {/* Transfer route name */}
                    {quote.transferRoute && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {quote.transferRoute.name}
                      </span>
                    )}
                    {/* Dates */}
                    {quote.pickupDate && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(quote.pickupDate)}
                        {quote.returnDate && (
                          <>
                            <ArrowRight className="w-3 h-3" />
                            {formatDate(quote.returnDate)}
                          </>
                        )}
                      </span>
                    )}
                    {/* Created */}
                    <span className="flex items-center gap-1.5 text-zinc-500">
                      <Clock className="w-3.5 h-3.5" />
                      {formatCreatedAt(quote.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center gap-4">
                  {quote.totalPrice != null && quote.totalPrice > 0 && (
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">
                        {quote.totalPrice} DH
                      </div>
                      {quote.rentalDays && (
                        <div className="text-xs text-zinc-500">
                          {quote.rentalDays} jour
                          {quote.rentalDays > 1 ? "s" : ""}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedQuote(quote)}
                      className="p-2 rounded-lg bg-zinc-800 text-zinc-400 lg:hover:text-white lg:hover:bg-zinc-700 transition-all"
                      title="Voir détails"
                    >
                      <Eye className="w-5 h-5" />
                    </button>

                    {quote.status === "PENDING" && (
                      <button
                        onClick={() =>
                          updateQuoteStatus(quote.id, "CONFIRMED")
                        }
                        disabled={updating === quote.id}
                        className="p-2 rounded-lg bg-green-500/20 text-green-400 lg:hover:bg-green-500/30 transition-all disabled:opacity-50"
                        title="Confirmer"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                    )}

                    <button
                      onClick={() => deleteQuote(quote.id)}
                      className="p-2 rounded-lg bg-zinc-800 text-zinc-400 lg:hover:text-red-400 lg:hover:bg-red-500/20 transition-all"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between z-10">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold text-white">
                    Détails du devis
                  </h2>
                  {selectedQuote.reference && (
                    <span className="font-mono text-sm text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-lg">
                      {selectedQuote.reference}
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-500">
                  Créé le {formatDate(selectedQuote.createdAt)}
                  {selectedQuote.pickupTime &&
                    ` • Prise à ${selectedQuote.pickupTime}`}
                </p>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-2 rounded-lg bg-zinc-800 text-zinc-400 lg:hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Statut
                </label>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        updateQuoteStatus(selectedQuote.id, option.value)
                      }
                      disabled={updating === selectedQuote.id}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedQuote.status === option.value
                          ? option.color === "amber"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : option.color === "green"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : option.color === "blue"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                          : "bg-zinc-800 text-zinc-400 border border-zinc-700 lg:hover:border-zinc-600"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-zinc-800/50 rounded-xl p-4">
                <h3 className="font-medium text-white mb-3">Contact</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Users className="w-4 h-4 text-zinc-500" />
                    {selectedQuote.fullName}
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Phone className="w-4 h-4 text-zinc-500" />
                    <a
                      href={`tel:${selectedQuote.phone}`}
                      className="text-blue-400 lg:hover:underline"
                    >
                      {selectedQuote.phone}
                    </a>
                  </div>
                  {selectedQuote.email && (
                    <div className="flex items-center gap-2 text-zinc-300">
                      <Mail className="w-4 h-4 text-zinc-500" />
                      <a
                        href={`mailto:${selectedQuote.email}`}
                        className="text-blue-400 lg:hover:underline"
                      >
                        {selectedQuote.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Service Info */}
              <div className="bg-zinc-800/50 rounded-xl p-4">
                <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                  {getServiceIcon(selectedQuote.serviceType)}
                  {getServiceLabel(selectedQuote.serviceType)}
                </h3>
                <div className="space-y-2 text-zinc-300">
                  {/* Vehicle name */}
                  {selectedQuote.vehicleName && (
                    <div className="flex items-center gap-2">
                      {selectedQuote.serviceType === "moto" ? (
                        <Bike className="w-4 h-4 text-zinc-500" />
                      ) : (
                        <Car className="w-4 h-4 text-zinc-500" />
                      )}
                      <span>{selectedQuote.vehicleName}</span>
                      {selectedQuote.vehiclePrice != null && (
                        <span className="text-sm text-zinc-500">
                          ({selectedQuote.vehiclePrice} DH/jour)
                        </span>
                      )}
                    </div>
                  )}

                  {/* Transfer route details */}
                  {selectedQuote.transferRoute && (
                    <div className="bg-zinc-700/30 rounded-lg p-3 space-y-1.5">
                      <div className="flex items-center gap-2 text-white font-medium">
                        <Plane className="w-4 h-4 text-sky-400" />
                        {selectedQuote.transferRoute.name}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-zinc-400">
                        {selectedQuote.transferRoute.distance && (
                          <span>{selectedQuote.transferRoute.distance}</span>
                        )}
                        {selectedQuote.transferRoute.duration && (
                          <span>{selectedQuote.transferRoute.duration}</span>
                        )}
                        <span className="capitalize">
                          {selectedQuote.transferRoute.category.toLowerCase()}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Number of people */}
                  {selectedQuote.numberOfPeople != null && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-zinc-500" />
                      <span>
                        {selectedQuote.numberOfPeople} personne
                        {selectedQuote.numberOfPeople > 1 ? "s" : ""}
                      </span>
                    </div>
                  )}

                  {/* Wants driver */}
                  {selectedQuote.wantsDriver && (
                    <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs">
                      Avec chauffeur
                    </span>
                  )}
                </div>
              </div>

              {/* Excursions */}
              {selectedQuote.excursions &&
                selectedQuote.excursions.length > 0 && (
                  <div className="bg-zinc-800/50 rounded-xl p-4">
                    <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-emerald-400" />
                      Excursions ({selectedQuote.excursions.length})
                    </h3>
                    <div className="space-y-2">
                      {selectedQuote.excursions.map((exc, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2.5 bg-zinc-700/30 rounded-lg"
                        >
                          <span className="text-zinc-300">{exc.name}</span>
                          <span className="text-sm font-medium text-white">
                            {exc.price} DH
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Booking Details */}
              <div className="bg-zinc-800/50 rounded-xl p-4">
                <h3 className="font-medium text-white mb-3">Réservation</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {/* Pickup date */}
                  <div>
                    <div className="text-zinc-500 mb-1">Date de prise</div>
                    <div className="text-zinc-300">
                      {formatDate(selectedQuote.pickupDate)}
                      {selectedQuote.pickupTime &&
                        ` à ${selectedQuote.pickupTime}`}
                    </div>
                  </div>

                  {/* Return date */}
                  {selectedQuote.returnDate && (
                    <div>
                      <div className="text-zinc-500 mb-1">Date de retour</div>
                      <div className="text-zinc-300">
                        {formatDate(selectedQuote.returnDate)}
                      </div>
                    </div>
                  )}

                  {/* Pickup location */}
                  {selectedQuote.pickupLocation && (
                    <div>
                      <div className="text-zinc-500 mb-1">Lieu de prise</div>
                      <div className="text-zinc-300">
                        {selectedQuote.pickupLocation}
                      </div>
                    </div>
                  )}

                  {/* Pickup zone */}
                  {selectedQuote.pickupZone && (
                    <div>
                      <div className="text-zinc-500 mb-1">Zone</div>
                      <div className="text-zinc-300 capitalize">
                        {selectedQuote.pickupZone === "hors_marrakech"
                          ? "Hors Marrakech"
                          : selectedQuote.pickupZone.replace(/_/g, " ")}
                      </div>
                    </div>
                  )}

                  {/* Drop-off location (transfers / trajet) */}
                  {selectedQuote.dropoffLocation && (
                    <div>
                      <div className="text-zinc-500 mb-1">Destination</div>
                      <div className="text-zinc-300">
                        {selectedQuote.dropoffLocation}
                      </div>
                    </div>
                  )}

                  {/* Delivery city */}
                  {selectedQuote.deliveryCity && (
                    <div>
                      <div className="text-zinc-500 mb-1">Ville de livraison</div>
                      <div className="text-zinc-300 capitalize">
                        {selectedQuote.deliveryCity}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              {selectedQuote.notes && (
                <div className="bg-zinc-800/50 rounded-xl p-4">
                  <h3 className="font-medium text-white mb-3">Notes</h3>
                  <p className="text-zinc-300 whitespace-pre-wrap">
                    {selectedQuote.notes}
                  </p>
                </div>
              )}

              {/* Total */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-blue-400 font-medium">Total</div>
                    {selectedQuote.rentalDays != null &&
                      selectedQuote.rentalDays > 0 && (
                        <div className="text-sm text-zinc-400">
                          {selectedQuote.rentalDays} jour
                          {selectedQuote.rentalDays > 1 ? "s" : ""}
                        </div>
                      )}
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {selectedQuote.totalPrice || 0} DH
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-zinc-900 border-t border-zinc-800 p-6 flex justify-end gap-3">
              <button
                onClick={() => deleteQuote(selectedQuote.id)}
                className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 lg:hover:bg-red-500/30 transition-all"
              >
                Supprimer
              </button>
              <button
                onClick={() => setSelectedQuote(null)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-white border border-zinc-700 lg:hover:bg-zinc-700 transition-all"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="p-8">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-zinc-700 rounded w-48"></div>
        <div className="h-12 bg-zinc-700 rounded"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-24 bg-zinc-700 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}

export default function QuotesPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <QuotesContent />
    </Suspense>
  );
}
