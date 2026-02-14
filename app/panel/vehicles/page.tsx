"use client";

import { useState, useEffect, useRef } from "react";
import {
  Car,
  Bike,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Star,
  Fuel,
  Users,
  Settings,
  Zap,
  Upload,
  Loader2
} from "lucide-react";

interface Vehicle {
  id: string;
  type: "CAR" | "MOTO";
  name: string;
  category: string;
  price: number;
  period: string;
  image: string;
  description: string | null;
  features: string[];
  fuel: string | null;
  seats: number | null;
  transmission: string | null;
  year: number | null;
  power: string | null;
  available: boolean;
  featured: boolean;
}

const emptyVehicle: Omit<Vehicle, "id"> = {
  type: "CAR",
  name: "",
  category: "",
  price: 0,
  period: "jour",
  image: "",
  description: "",
  features: [],
  fuel: "",
  seats: null,
  transmission: "",
  year: null,
  power: "",
  available: true,
  featured: false,
};

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"CAR" | "MOTO">("CAR");
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState(emptyVehicle);
  const [saving, setSaving] = useState(false);
  const [featuresInput, setFeaturesInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 6;
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("L'image est trop grande. Maximum 5MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner une image.");
      return;
    }

    setUploading(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formDataUpload,
      });

      const data = await res.json();

      if (data.secure_url) {
        setFormData({ ...formData, image: data.secure_url });
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Erreur lors de l'upload. Veuillez réessayer.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  useEffect(() => {
    fetchVehicles();
  }, []);

  async function fetchVehicles() {
    try {
      const res = await fetch("/api/vehicles");
      const data = await res.json();
      setVehicles(data);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    } finally {
      setLoading(false);
    }
  }

  async function toggleAvailability(vehicle: Vehicle) {
    try {
      const res = await fetch(`/api/vehicles/${vehicle.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ available: !vehicle.available }),
      });

      if (res.ok) {
        setVehicles((prev) =>
          prev.map((v) =>
            v.id === vehicle.id ? { ...v, available: !v.available } : v
          )
        );
      }
    } catch (error) {
      console.error("Failed to toggle availability:", error);
    }
  }

  async function toggleFeatured(vehicle: Vehicle) {
    try {
      const res = await fetch(`/api/vehicles/${vehicle.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !vehicle.featured }),
      });

      if (res.ok) {
        setVehicles((prev) =>
          prev.map((v) =>
            v.id === vehicle.id ? { ...v, featured: !v.featured } : v
          )
        );
      }
    } catch (error) {
      console.error("Failed to toggle featured:", error);
    }
  }

  async function deleteVehicle(vehicleId: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce véhicule ?")) return;

    try {
      const res = await fetch(`/api/vehicles/${vehicleId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
      }
    } catch (error) {
      console.error("Failed to delete vehicle:", error);
    }
  }

  function openForm(vehicle?: Vehicle) {
    if (vehicle) {
      setEditingVehicle(vehicle);
      setFormData({
        type: vehicle.type,
        name: vehicle.name,
        category: vehicle.category,
        price: vehicle.price,
        period: vehicle.period,
        image: vehicle.image,
        description: vehicle.description || "",
        features: vehicle.features,
        fuel: vehicle.fuel || "",
        seats: vehicle.seats,
        transmission: vehicle.transmission || "",
        year: vehicle.year,
        power: vehicle.power || "",
        available: vehicle.available,
        featured: vehicle.featured,
      });
      setFeaturesInput(vehicle.features.join(", "));
    } else {
      setEditingVehicle(null);
      setFormData({ ...emptyVehicle, type: activeTab });
      setFeaturesInput("");
    }
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingVehicle(null);
    setFormData(emptyVehicle);
    setFeaturesInput("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const features = featuresInput
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f);

    const payload = {
      ...formData,
      features,
      seats: formData.seats || null,
      year: formData.year || null,
    };

    try {
      let res;
      if (editingVehicle) {
        res = await fetch(`/api/vehicles/${editingVehicle.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/vehicles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        const updated = await res.json();
        if (editingVehicle) {
          setVehicles((prev) =>
            prev.map((v) => (v.id === updated.id ? updated : v))
          );
        } else {
          setVehicles((prev) => [updated, ...prev]);
        }
        closeForm();
      }
    } catch (error) {
      console.error("Failed to save vehicle:", error);
    } finally {
      setSaving(false);
    }
  }

  const filteredVehicles = vehicles.filter((v) => v.type === activeTab);
  const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage);
  const startIndex = (currentPage - 1) * vehiclesPerPage;
  const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + vehiclesPerPage);

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-zinc-700 rounded w-48"></div>
          <div className="h-12 bg-zinc-700 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-zinc-700 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Véhicules</h1>
          <p className="text-zinc-400">
            Gérez votre flotte de véhicules
          </p>
        </div>
        <button
          onClick={() => openForm()}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 lg:hover:bg-blue-600 text-white rounded-xl font-medium transition-all"
        >
          <Plus className="w-5 h-5" />
          Ajouter
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => { setActiveTab("CAR"); setCurrentPage(1); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
            activeTab === "CAR"
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              : "bg-zinc-800 text-zinc-400 border border-zinc-700 lg:hover:text-white"
          }`}
        >
          <Car className="w-5 h-5" />
          Voitures
          <span className="text-xs opacity-70">
            ({vehicles.filter((v) => v.type === "CAR").length})
          </span>
        </button>
        <button
          onClick={() => { setActiveTab("MOTO"); setCurrentPage(1); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
            activeTab === "MOTO"
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              : "bg-zinc-800 text-zinc-400 border border-zinc-700 lg:hover:text-white"
          }`}
        >
          <Bike className="w-5 h-5" />
          Motos
          <span className="text-xs opacity-70">
            ({vehicles.filter((v) => v.type === "MOTO").length})
          </span>
        </button>
      </div>

      {/* Vehicles Grid */}
      {filteredVehicles.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900 border border-zinc-700 rounded-2xl">
          {activeTab === "CAR" ? (
            <Car className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          ) : (
            <Bike className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          )}
          <h3 className="text-lg font-medium text-white mb-2">
            Aucun {activeTab === "CAR" ? "véhicule" : "moto"}
          </h3>
          <p className="text-zinc-400 mb-6">
            Commencez par ajouter un {activeTab === "CAR" ? "véhicule" : "moto"}
          </p>
          <button
            onClick={() => openForm()}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-500 lg:hover:bg-blue-600 text-white rounded-xl font-medium transition-all"
          >
            <Plus className="w-5 h-5" />
            Ajouter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`bg-zinc-900 border rounded-2xl overflow-hidden transition-all ${
                vehicle.available
                  ? "border-zinc-700 lg:hover:border-zinc-600"
                  : "border-red-500/30 opacity-75"
              }`}
            >
              {/* Image */}
              <div className="relative h-48 bg-zinc-800 flex items-center justify-center">
                {vehicle.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="max-h-full max-w-full object-contain p-4"
                  />
                ) : (
                  <>
                    {vehicle.type === "CAR" ? (
                      <Car className="w-16 h-16 text-zinc-600" />
                    ) : (
                      <Bike className="w-16 h-16 text-zinc-600" />
                    )}
                  </>
                )}

                {/* Featured Badge */}
                {vehicle.featured && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    Favori
                  </div>
                )}

                {/* Availability Badge */}
                {!vehicle.available && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-xs font-medium">
                    Indisponible
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-white">{vehicle.name}</h3>
                    <p className="text-sm text-zinc-400">{vehicle.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">
                      {vehicle.price} DH
                    </div>
                    <div className="text-xs text-zinc-500">/ {vehicle.period}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {vehicle.seats && (
                    <span className="flex items-center gap-1 text-xs text-zinc-400">
                      <Users className="w-3 h-3" />
                      {vehicle.seats}
                    </span>
                  )}
                  {vehicle.transmission && (
                    <span className="flex items-center gap-1 text-xs text-zinc-400">
                      <Settings className="w-3 h-3" />
                      {vehicle.transmission}
                    </span>
                  )}
                  {vehicle.fuel && (
                    <span className="flex items-center gap-1 text-xs text-zinc-400">
                      <Fuel className="w-3 h-3" />
                      {vehicle.fuel}
                    </span>
                  )}
                  {vehicle.power && (
                    <span className="flex items-center gap-1 text-xs text-zinc-400">
                      <Zap className="w-3 h-3" />
                      {vehicle.power}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-zinc-800">
                  {/* Availability Toggle */}
                  <button
                    onClick={() => toggleAvailability(vehicle)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      vehicle.available
                        ? "bg-green-500/20 text-green-400 lg:hover:bg-green-500/30"
                        : "bg-zinc-800 text-zinc-400 lg:hover:text-white"
                    }`}
                  >
                    {vehicle.available ? (
                      <>
                        <Check className="w-4 h-4" />
                        Disponible
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4" />
                        Indisponible
                      </>
                    )}
                  </button>

                  {/* Featured Toggle */}
                  <button
                    onClick={() => toggleFeatured(vehicle)}
                    className={`p-2 rounded-lg transition-all ${
                      vehicle.featured
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-zinc-800 text-zinc-500 lg:hover:text-amber-400"
                    }`}
                    title={vehicle.featured ? "Retirer des favoris" : "Ajouter aux favoris"}
                  >
                    <Star
                      className={`w-4 h-4 ${vehicle.featured ? "fill-amber-400" : ""}`}
                    />
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => openForm(vehicle)}
                    className="p-2 rounded-lg bg-zinc-800 text-zinc-400 lg:hover:text-white transition-all"
                    title="Modifier"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteVehicle(vehicle.id)}
                    className="p-2 rounded-lg bg-zinc-800 text-zinc-400 lg:hover:text-red-400 lg:hover:bg-red-500/20 transition-all"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            ← Précédent
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg font-medium transition-all ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Suivant →
          </button>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {editingVehicle ? "Modifier le véhicule" : "Ajouter un véhicule"}
              </h2>
              <button
                onClick={closeForm}
                className="p-2 rounded-lg bg-zinc-800 text-zinc-400 lg:hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Type
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "CAR" })}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                      formData.type === "CAR"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                    }`}
                  >
                    <Car className="w-5 h-5" />
                    Voiture
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "MOTO" })}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                      formData.type === "MOTO"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                    }`}
                  >
                    <Bike className="w-5 h-5" />
                    Moto
                  </button>
                </div>
              </div>

              {/* Name & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                    placeholder="Hyundai Tucson"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Catégorie *
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                    placeholder="SUV Premium"
                    required
                  />
                </div>
              </div>

              {/* Price & Period */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Prix (DH) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                    placeholder="750"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Période
                  </label>
                  <select
                    value={formData.period}
                    onChange={(e) =>
                      setFormData({ ...formData, period: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="jour">Par jour</option>
                    <option value="trajet">Par trajet</option>
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Image du véhicule
                </label>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Upload area or Preview */}
                {formData.image ? (
                  <div className="relative">
                    <div className="relative h-48 bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formData.image}
                        alt="Aperçu"
                        className="max-h-full max-w-full object-contain p-4"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: "" })}
                      className="absolute top-2 right-2 p-2 bg-red-500/80 lg:hover:bg-red-500 text-white rounded-lg transition-all"
                      title="Supprimer l'image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-2 right-2 px-3 py-1.5 bg-zinc-700/80 lg:hover:bg-zinc-600 text-white text-sm rounded-lg transition-all flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Changer
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full h-48 border-2 border-dashed border-zinc-700 lg:hover:border-zinc-500 rounded-xl flex flex-col items-center justify-center gap-3 text-zinc-400 lg:hover:text-zinc-300 transition-all disabled:opacity-50"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-10 h-10 animate-spin" />
                        <span>Téléchargement en cours...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-10 h-10" />
                        <span>Cliquez pour ajouter une image</span>
                        <span className="text-xs text-zinc-500">PNG, JPG jusqu&apos;à 5MB</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 resize-none"
                  rows={2}
                  placeholder="SUV moderne et spacieux..."
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Caractéristiques (séparées par virgules)
                </label>
                <input
                  type="text"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                  placeholder="5 Places, Automatique, Climatisation"
                />
              </div>

              {/* Technical Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Places
                  </label>
                  <input
                    type="number"
                    value={formData.seats || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seats: e.target.value ? parseInt(e.target.value) : null,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Transmission
                  </label>
                  <select
                    value={formData.transmission || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, transmission: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="">-</option>
                    <option value="Automatique">Automatique</option>
                    <option value="Manuelle">Manuelle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Carburant
                  </label>
                  <select
                    value={formData.fuel || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, fuel: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="">-</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Essence">Essence</option>
                    <option value="Électrique">Électrique</option>
                    <option value="Hybride">Hybride</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Année
                  </label>
                  <input
                    type="number"
                    value={formData.year || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        year: e.target.value ? parseInt(e.target.value) : null,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                    placeholder="2024"
                  />
                </div>
              </div>

              {/* Power */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Puissance
                </label>
                <input
                  type="text"
                  value={formData.power || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, power: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                  placeholder="136 ch"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, available: !formData.available })}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className={`w-11 h-6 rounded-full relative transition-colors ${formData.available ? "bg-green-500" : "bg-zinc-700"}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.available ? "left-6" : "left-1"}`} />
                  </div>
                  <span className="text-zinc-300">Disponible</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className={`w-11 h-6 rounded-full relative transition-colors ${formData.featured ? "bg-amber-500" : "bg-zinc-700"}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.featured ? "left-6" : "left-1"}`} />
                  </div>
                  <span className="text-zinc-300">Favori</span>
                </button>
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 text-white border border-zinc-700 lg:hover:bg-zinc-700 transition-all"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-blue-500 lg:hover:bg-blue-600 text-white font-medium transition-all disabled:opacity-50"
                >
                  {saving ? "Enregistrement..." : editingVehicle ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
