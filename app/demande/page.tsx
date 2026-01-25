"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  Phone,
  Mail,
  Car,
  Bike,
  Mountain,
  MessageSquare,
  CheckCircle,
  ArrowRight
} from "lucide-react";

function BookingContent() {
  const searchParams = useSearchParams();

  // Get data from URL params
  const name = searchParams.get("n") || "";
  const phone = searchParams.get("p") || "";
  const email = searchParams.get("e") || "";
  const notes = searchParams.get("no") || "";
  const service = searchParams.get("s") || "car";
  const vehicle = searchParams.get("v") || "";
  const vehiclePrice = searchParams.get("vp") || "";
  const vehiclePeriod = searchParams.get("vd") || "jour";
  const excursions = searchParams.get("ex") || "";
  const pickupDate = searchParams.get("d") || "";
  const pickupTime = searchParams.get("t") || "";
  const returnDate = searchParams.get("r") || "";
  const zone = searchParams.get("z") || "";
  const address = searchParams.get("a") || "";
  const city = searchParams.get("c") || "marrakech";
  const driver = searchParams.get("dr") === "1";
  const people = parseInt(searchParams.get("pp") || "1");
  const total = searchParams.get("tot") || "0";
  const days = parseInt(searchParams.get("dy") || "1");

  // Parse excursions (format: "name1:price1|name2:price2")
  const excursionList = excursions ? excursions.split("|").map(e => {
    const [excName, excPrice] = e.split(":");
    return { name: excName, price: excPrice };
  }) : [];

  // Format date
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const serviceLabels: Record<string, string> = {
    car: "Location Voiture",
    moto: "Location Moto",
    excursion: "Excursion",
  };

  const ServiceIcon = service === "moto" ? Bike : service === "excursion" ? Mountain : Car;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6 px-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">H12</h1>
              <p className="text-blue-100 text-sm">Location Marrakech</p>
            </div>
            <div className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
              {serviceLabels[service] || "Reservation"}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Status Badge */}
        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-xl">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Demande de reservation</span>
        </div>

        {/* Client Info */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Client
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{name}</p>
                <p className="text-sm text-gray-500">{phone}</p>
              </div>
            </div>
            {email && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{email}</span>
              </div>
            )}
          </div>
        </section>

        {/* Vehicle */}
        {vehicle && (
          <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              {service === "moto" ? "Moto" : "Vehicule"}
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
                <ServiceIcon className="w-7 h-7 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{vehicle}</p>
                <p className="text-sm text-gray-500">
                  {vehiclePrice} DH / {vehiclePeriod}
                </p>
              </div>
            </div>
            {vehiclePeriod !== "trajet" && days > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-sm">
                <span className="text-gray-500">{days} jour{days > 1 ? "s" : ""}</span>
                <span className="font-semibold text-blue-600">
                  {parseInt(vehiclePrice) * days} DH
                </span>
              </div>
            )}
          </section>
        )}

        {/* Excursions */}
        {excursionList.length > 0 && (
          <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Excursions
            </h2>
            <div className="space-y-3">
              {excursionList.map((exc, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                      <Mountain className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="font-medium text-gray-900">{exc.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-amber-600">{exc.price} DH</p>
                    <p className="text-xs text-gray-400">x {people} pers</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Booking Details */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Details
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">{formatDate(pickupDate)}</p>
                {pickupTime && (
                  <p className="text-sm text-gray-500">a {pickupTime}</p>
                )}
              </div>
            </div>

            {returnDate && vehiclePeriod !== "trajet" && (
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Retour</p>
                  <p className="font-medium text-gray-900">{formatDate(returnDate)}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">
                  {zone || (city === "marrakech" ? "Marrakech" : city)}
                </p>
                {address && <p className="text-sm text-gray-500">{address}</p>}
                {city !== "marrakech" && (
                  <p className="text-xs text-amber-600 mt-1">Frais de livraison</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-400" />
              <p className="font-medium text-gray-900">{people} personne{people > 1 ? "s" : ""}</p>
            </div>

            {driver && (
              <div className="flex items-center gap-3 text-blue-600">
                <Car className="w-5 h-5" />
                <p className="font-medium">Avec chauffeur</p>
              </div>
            )}
          </div>
        </section>

        {/* Notes */}
        {notes && (
          <section className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800 mb-1">Notes</p>
                <p className="text-amber-700">{notes}</p>
              </div>
            </div>
          </section>
        )}

        {/* Total */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between">
            <span className="text-blue-100">Total estime</span>
            <span className="text-3xl font-bold">{total} DH</span>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center pt-4 pb-8">
          <p className="text-sm text-gray-500 mb-4">
            Cette demande sera confirmee par notre equipe.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition"
          >
            Visiter h12.ma
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      {/* Footer Brand */}
      <footer className="bg-gray-50 py-6 px-4 text-center border-t border-gray-100">
        <p className="text-sm text-gray-500">H12 Location - Marrakech</p>
        <p className="text-sm text-gray-400">+212 614 968 594</p>
      </footer>
    </div>
  );
}

export default function DemandePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
