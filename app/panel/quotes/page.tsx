"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  FileText,
  Phone,
  Mail,
  Calendar,
  Clock,
  Car,
  Bike,
  Users,
  X,
  Check,
  Trash2,
  Eye
} from "lucide-react";

interface Quote {
  id: string;
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
          prev.map((q) => (q.id === quoteId ? { ...q, status: status as Quote["status"] } : q))
        );
        if (selectedQuote?.id === quoteId) {
          setSelectedQuote({ ...selectedQuote, status: status as Quote["status"] });
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

  const filteredQuotes =
    filter === "all" ? quotes : quotes.filter((q) => q.status === filter);

  const getStatusBadge = (status: string, size: "sm" | "md" = "sm") => {
    const option = statusOptions.find((o) => o.value === status);
    if (!option) return null;

    const sizeClasses = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm";

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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
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
        <h1 className="text-2xl font-bold text-white mb-2">Devis</h1>
        <p className="text-zinc-400">
          Gérez les demandes de réservation
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              filter === option.value
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-white hover:border-zinc-600"
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

      {/* Quotes List */}
      {filteredQuotes.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900 border border-zinc-700 rounded-2xl">
          <FileText className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Aucun devis</h3>
          <p className="text-zinc-400">
            {filter === "all"
              ? "Aucune demande de réservation pour le moment"
              : `Aucun devis avec le statut "${filterOptions.find((f) => f.value === filter)?.label}"`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 hover:border-zinc-600 transition-all"
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
                  <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      {quote.serviceType === "moto" ? (
                        <Bike className="w-4 h-4" />
                      ) : (
                        <Car className="w-4 h-4" />
                      )}
                      {quote.vehicleName || quote.serviceType}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4" />
                      {quote.phone}
                    </span>
                    {quote.pickupDate && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formatDate(quote.pickupDate)}
                        {quote.returnDate && ` → ${formatDate(quote.returnDate)}`}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {formatDate(quote.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center gap-4">
                  {quote.totalPrice && (
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">
                        {quote.totalPrice} DH
                      </div>
                      {quote.rentalDays && (
                        <div className="text-sm text-zinc-400">
                          {quote.rentalDays} jour{quote.rentalDays > 1 ? "s" : ""}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedQuote(quote)}
                      className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
                      title="Voir détails"
                    >
                      <Eye className="w-5 h-5" />
                    </button>

                    {/* Quick status change */}
                    {quote.status === "PENDING" && (
                      <button
                        onClick={() => updateQuoteStatus(quote.id, "CONFIRMED")}
                        disabled={updating === quote.id}
                        className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all disabled:opacity-50"
                        title="Confirmer"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                    )}

                    <button
                      onClick={() => deleteQuote(quote.id)}
                      className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-red-500/20 transition-all"
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
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Détails du devis
                </h2>
                <p className="text-sm text-zinc-400">
                  Créé le {formatDate(selectedQuote.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
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
                          : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600"
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
                      className="text-blue-400 hover:underline"
                    >
                      {selectedQuote.phone}
                    </a>
                  </div>
                  {selectedQuote.email && (
                    <div className="flex items-center gap-2 text-zinc-300">
                      <Mail className="w-4 h-4 text-zinc-500" />
                      <a
                        href={`mailto:${selectedQuote.email}`}
                        className="text-blue-400 hover:underline"
                      >
                        {selectedQuote.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="bg-zinc-800/50 rounded-xl p-4">
                <h3 className="font-medium text-white mb-3">Véhicule</h3>
                <div className="space-y-2 text-zinc-300">
                  <div className="flex items-center gap-2">
                    {selectedQuote.serviceType === "moto" ? (
                      <Bike className="w-4 h-4 text-zinc-500" />
                    ) : (
                      <Car className="w-4 h-4 text-zinc-500" />
                    )}
                    {selectedQuote.vehicleName || selectedQuote.serviceType}
                  </div>
                  {selectedQuote.vehiclePrice && (
                    <div className="text-sm text-zinc-400">
                      {selectedQuote.vehiclePrice} DH / jour
                    </div>
                  )}
                </div>
              </div>

              {/* Booking Details */}
              <div className="bg-zinc-800/50 rounded-xl p-4">
                <h3 className="font-medium text-white mb-3">Réservation</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-zinc-500 mb-1">Date de prise</div>
                    <div className="text-zinc-300">
                      {formatDate(selectedQuote.pickupDate)}
                      {selectedQuote.pickupTime && ` à ${selectedQuote.pickupTime}`}
                    </div>
                  </div>
                  <div>
                    <div className="text-zinc-500 mb-1">Date de retour</div>
                    <div className="text-zinc-300">
                      {formatDate(selectedQuote.returnDate)}
                    </div>
                  </div>
                  {selectedQuote.pickupLocation && (
                    <div>
                      <div className="text-zinc-500 mb-1">Lieu de prise</div>
                      <div className="text-zinc-300">
                        {selectedQuote.pickupLocation}
                        {selectedQuote.pickupZone && ` - ${selectedQuote.pickupZone}`}
                      </div>
                    </div>
                  )}
                  {selectedQuote.deliveryCity && (
                    <div>
                      <div className="text-zinc-500 mb-1">Ville</div>
                      <div className="text-zinc-300 capitalize">
                        {selectedQuote.deliveryCity}
                      </div>
                    </div>
                  )}
                  {selectedQuote.wantsDriver && (
                    <div className="col-span-2">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs">
                        Avec chauffeur
                      </span>
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
                    {selectedQuote.rentalDays && (
                      <div className="text-sm text-zinc-400">
                        {selectedQuote.rentalDays} jour{selectedQuote.rentalDays > 1 ? "s" : ""}
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
                className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all"
              >
                Supprimer
              </button>
              <button
                onClick={() => setSelectedQuote(null)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700 transition-all"
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
