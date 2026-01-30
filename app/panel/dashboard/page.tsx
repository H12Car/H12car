"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Car,
  Bike,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Users
} from "lucide-react";

interface Quote {
  id: string;
  status: string;
  serviceType: string;
  vehicleName: string | null;
  fullName: string;
  phone: string;
  totalPrice: number | null;
  createdAt: string;
}

interface Stats {
  totalQuotes: number;
  pendingQuotes: number;
  confirmedQuotes: number;
  totalVehicles: number;
  availableCars: number;
  availableMotos: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalQuotes: 0,
    pendingQuotes: 0,
    confirmedQuotes: 0,
    totalVehicles: 0,
    availableCars: 0,
    availableMotos: 0,
  });
  const [recentQuotes, setRecentQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch quotes
        const quotesRes = await fetch("/api/quotes");
        const quotes = await quotesRes.json();

        // Fetch vehicles
        const vehiclesRes = await fetch("/api/vehicles");
        const vehicles = await vehiclesRes.json();

        // Calculate stats
        const pending = quotes.filter((q: Quote) => q.status === "PENDING").length;
        const confirmed = quotes.filter((q: Quote) => q.status === "CONFIRMED").length;
        const cars = vehicles.filter((v: { type: string; available: boolean }) =>
          v.type === "CAR" && v.available
        ).length;
        const motos = vehicles.filter((v: { type: string; available: boolean }) =>
          v.type === "MOTO" && v.available
        ).length;

        setStats({
          totalQuotes: quotes.length,
          pendingQuotes: pending,
          confirmedQuotes: confirmed,
          totalVehicles: vehicles.length,
          availableCars: cars,
          availableMotos: motos,
        });

        // Get recent 5 quotes
        setRecentQuotes(quotes.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const statsCards = [
    {
      label: "Devis en attente",
      value: stats.pendingQuotes,
      icon: Clock,
      color: "amber",
      href: "/panel/quotes?status=PENDING",
    },
    {
      label: "Confirmés",
      value: stats.confirmedQuotes,
      icon: CheckCircle,
      color: "green",
      href: "/panel/quotes?status=CONFIRMED",
    },
    {
      label: "Total devis",
      value: stats.totalQuotes,
      icon: FileText,
      color: "blue",
      href: "/panel/quotes",
    },
    {
      label: "Véhicules",
      value: stats.totalVehicles,
      icon: Car,
      color: "purple",
      href: "/panel/vehicles",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full">
            En attente
          </span>
        );
      case "CONFIRMED":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
            Confirmé
          </span>
        );
      case "COMPLETED":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
            Terminé
          </span>
        );
      case "CANCELLED":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30 rounded-full">
            Annulé
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-zinc-700 rounded w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-zinc-700 rounded-2xl"></div>
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
        <h1 className="text-2xl font-bold text-white mb-2">Tableau de bord</h1>
        <p className="text-zinc-400">Bienvenue sur le panneau d'administration H12</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 hover:border-zinc-600 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-3 rounded-xl ${
                  card.color === "amber"
                    ? "bg-amber-500/20"
                    : card.color === "green"
                    ? "bg-green-500/20"
                    : card.color === "blue"
                    ? "bg-blue-500/20"
                    : "bg-purple-500/20"
                }`}
              >
                <card.icon
                  className={`w-5 h-5 ${
                    card.color === "amber"
                      ? "text-amber-400"
                      : card.color === "green"
                      ? "text-green-400"
                      : card.color === "blue"
                      ? "text-blue-400"
                      : "text-purple-400"
                  }`}
                />
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
            <div className="text-sm text-zinc-400">{card.label}</div>
          </Link>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Quotes */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Derniers devis</h2>
            <Link
              href="/panel/quotes"
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              Voir tout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {recentQuotes.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-400">Aucun devis pour le moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white truncate">
                        {quote.fullName}
                      </span>
                      {getStatusBadge(quote.status)}
                    </div>
                    <div className="text-sm text-zinc-400">
                      {quote.vehicleName || quote.serviceType} • {quote.phone}
                    </div>
                  </div>
                  {quote.totalPrice && (
                    <div className="text-right ml-4">
                      <div className="font-semibold text-white">
                        {quote.totalPrice} DH
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Vehicle Availability */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Disponibilité</h2>
            <Link
              href="/panel/vehicles"
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              Gérer
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-500/20">
                  <Car className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="font-medium text-white">Voitures</div>
                  <div className="text-sm text-zinc-400">disponibles</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">
                {stats.availableCars}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-500/20">
                  <Bike className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-medium text-white">Motos</div>
                  <div className="text-sm text-zinc-400">disponibles</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-white">
                {stats.availableMotos}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
