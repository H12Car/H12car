"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Car,
  Bike,
  Clock,
  CheckCircle,
  ArrowRight,
  Compass,
  Plane,
  Banknote,
  CalendarCheck,
} from "lucide-react";

interface RecentQuote {
  id: string;
  reference: string | null;
  status: string;
  serviceType: string;
  vehicleName: string | null;
  fullName: string;
  phone: string;
  totalPrice: number | null;
  createdAt: string;
}

interface DashboardStats {
  quotes: {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
    today: number;
  };
  vehicles: {
    total: number;
    availableCars: number;
    availableMotos: number;
  };
  transfers: {
    total: number;
    active: number;
  };
  excursions: {
    total: number;
    active: number;
  };
  revenue: number;
  recentQuotes: RecentQuote[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((stats) => setData(stats))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="px-2 py-0.5 text-[11px] font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full">
            En attente
          </span>
        );
      case "CONFIRMED":
        return (
          <span className="px-2 py-0.5 text-[11px] font-medium bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
            Confirmé
          </span>
        );
      case "COMPLETED":
        return (
          <span className="px-2 py-0.5 text-[11px] font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
            Terminé
          </span>
        );
      case "CANCELLED":
        return (
          <span className="px-2 py-0.5 text-[11px] font-medium bg-red-500/20 text-red-400 border border-red-500/30 rounded-full">
            Annulé
          </span>
        );
      default:
        return null;
    }
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

  const formatDate = (dateString: string) => {
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

  if (loading || !data) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-zinc-700 rounded w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-zinc-700 rounded-2xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-zinc-700 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Tableau de bord</h1>
        <p className="text-zinc-400">
          Bienvenue sur le panneau d&apos;administration H12
        </p>
      </div>

      {/* Top Stats Row - Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Pending */}
        <Link
          href="/panel/quotes?status=PENDING"
          className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 lg:hover:border-amber-500/30 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            {data.quotes.pending > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-white rounded-full animate-pulse">
                ACTION
              </span>
            )}
          </div>
          <div className="text-3xl font-bold text-white mb-0.5">{data.quotes.pending}</div>
          <div className="text-sm text-zinc-400">En attente</div>
        </Link>

        {/* Confirmed */}
        <Link
          href="/panel/quotes?status=CONFIRMED"
          className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 lg:hover:border-green-500/30 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-green-500/20">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 lg:group-hover:text-zinc-400 transition-colors" />
          </div>
          <div className="text-3xl font-bold text-white mb-0.5">{data.quotes.confirmed}</div>
          <div className="text-sm text-zinc-400">Confirmés</div>
        </Link>

        {/* Revenue */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20">
              <Banknote className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-0.5">
            {data.revenue > 0 ? `${data.revenue.toLocaleString("fr-FR")}` : "0"}
            <span className="text-base font-medium text-zinc-500 ml-1">DH</span>
          </div>
          <div className="text-sm text-zinc-400">Chiffre d&apos;affaires</div>
        </div>

        {/* Today */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20">
              <CalendarCheck className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-0.5">{data.quotes.today}</div>
          <div className="text-sm text-zinc-400">Devis aujourd&apos;hui</div>
        </div>
      </div>

      {/* Second Row - Inventory Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Quotes */}
        <Link
          href="/panel/quotes"
          className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4 lg:hover:border-zinc-600 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <FileText className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-lg font-bold text-white">{data.quotes.total}</div>
              <div className="text-xs text-zinc-500">Total devis</div>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 lg:group-hover:text-zinc-400 transition-colors" />
          </div>
        </Link>

        {/* Vehicles */}
        <Link
          href="/panel/vehicles"
          className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4 lg:hover:border-zinc-600 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/20">
              <Car className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-lg font-bold text-white">{data.vehicles.total}</div>
              <div className="text-xs text-zinc-500">Véhicules</div>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 lg:group-hover:text-zinc-400 transition-colors" />
          </div>
        </Link>

        {/* Transfers */}
        <Link
          href="/panel/transfers"
          className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4 lg:hover:border-zinc-600 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky-500/20">
              <Plane className="w-4 h-4 text-sky-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-lg font-bold text-white">{data.transfers.active}</div>
              <div className="text-xs text-zinc-500">Transferts actifs</div>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 lg:group-hover:text-zinc-400 transition-colors" />
          </div>
        </Link>

        {/* Excursions */}
        <Link
          href="/panel/excursions"
          className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4 lg:hover:border-zinc-600 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <Compass className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-lg font-bold text-white">{data.excursions.active}</div>
              <div className="text-xs text-zinc-500">Excursions actives</div>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 lg:group-hover:text-zinc-400 transition-colors" />
          </div>
        </Link>
      </div>

      {/* Bottom Section - 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Quotes */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white">Derniers devis</h2>
            <Link
              href="/panel/quotes"
              className="text-sm text-blue-400 lg:hover:text-blue-300 flex items-center gap-1"
            >
              Voir tout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {data.recentQuotes.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-400">Aucun devis pour le moment</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.recentQuotes.map((quote) => (
                <Link
                  key={quote.id}
                  href="/panel/quotes"
                  className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl lg:hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2 rounded-lg bg-zinc-700/50 text-zinc-400">
                      {getServiceIcon(quote.serviceType)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-medium text-white text-sm truncate">
                          {quote.fullName}
                        </span>
                        {getStatusBadge(quote.status)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        {quote.reference && (
                          <>
                            <span className="font-mono text-zinc-400">{quote.reference}</span>
                            <span>•</span>
                          </>
                        )}
                        <span>{quote.vehicleName || quote.serviceType}</span>
                        <span>•</span>
                        <span>{formatDate(quote.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  {quote.totalPrice != null && quote.totalPrice > 0 && (
                    <div className="text-right ml-3 flex-shrink-0">
                      <div className="text-sm font-semibold text-white">
                        {quote.totalPrice} DH
                      </div>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Fleet Overview */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white">Flotte & Services</h2>
            <Link
              href="/panel/vehicles"
              className="text-sm text-blue-400 lg:hover:text-blue-300 flex items-center gap-1"
            >
              Gérer
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {/* Cars */}
            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/20">
                  <Car className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="font-medium text-white">Voitures</div>
                  <div className="text-xs text-zinc-500">disponibles</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">
                {data.vehicles.availableCars}
              </div>
            </div>

            {/* Motos */}
            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/20">
                  <Bike className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-medium text-white">Motos</div>
                  <div className="text-xs text-zinc-500">disponibles</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">
                {data.vehicles.availableMotos}
              </div>
            </div>

            {/* Transfers */}
            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500/20">
                  <Plane className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <div className="font-medium text-white">Transferts</div>
                  <div className="text-xs text-zinc-500">{data.transfers.active} actifs / {data.transfers.total} total</div>
                </div>
              </div>
              <Link
                href="/panel/transfers"
                className="p-2 rounded-lg bg-zinc-700/50 text-zinc-400 lg:hover:text-white transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Excursions */}
            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20">
                  <Compass className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="font-medium text-white">Excursions</div>
                  <div className="text-xs text-zinc-500">{data.excursions.active} actives / {data.excursions.total} total</div>
                </div>
              </div>
              <Link
                href="/panel/excursions"
                className="p-2 rounded-lg bg-zinc-700/50 text-zinc-400 lg:hover:text-white transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quote Breakdown */}
          <div className="mt-5 pt-5 border-t border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-400 mb-3">Répartition des devis</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-zinc-800/50 rounded-xl">
                <div className="text-xs text-zinc-500 mb-1">Terminés</div>
                <div className="text-lg font-bold text-blue-400">{data.quotes.completed}</div>
              </div>
              <div className="p-3 bg-zinc-800/50 rounded-xl">
                <div className="text-xs text-zinc-500 mb-1">Annulés</div>
                <div className="text-lg font-bold text-red-400">{data.quotes.cancelled}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
