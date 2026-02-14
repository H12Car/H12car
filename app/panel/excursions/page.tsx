"use client";

import { useState, useEffect } from "react";
import {
  Compass,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Heart,
  Clock,
  Users,
  MapPin,
  Star,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";

interface Excursion {
  id: string;
  name: string;
  category: string;
  price: number;
  period: string;
  image: string;
  description: string;
  features: string[];
  highlights: string[];
  duration: string | null;
  groupSize: string | null;
  departure: string | null;
  difficulty: string | null;
  rating: number;
  reviews: number;
  favorite: boolean;
  isActive: boolean;
  sortOrder: number;
}

const emptyExcursion: Omit<Excursion, "id"> = {
  name: "",
  category: "",
  price: 0,
  period: "personne",
  image: "",
  description: "",
  features: [],
  highlights: [],
  duration: "",
  groupSize: "",
  departure: "",
  difficulty: "",
  rating: 5.0,
  reviews: 0,
  favorite: false,
  isActive: true,
  sortOrder: 0,
};

const DIFFICULTY_OPTIONS = ["Facile", "Modéré", "Sportif", "Extrême"];

export default function ExcursionsPage() {
  const [excursions, setExcursions] = useState<Excursion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExcursion, setEditingExcursion] = useState<Excursion | null>(null);
  const [formData, setFormData] = useState(emptyExcursion);
  const [saving, setSaving] = useState(false);
  const [featuresInput, setFeaturesInput] = useState("");
  const [highlightsInput, setHighlightsInput] = useState("");

  useEffect(() => {
    fetchExcursions();
  }, []);

  async function fetchExcursions() {
    try {
      const res = await fetch("/api/excursions?active=false");
      const data = await res.json();
      setExcursions(data);
    } catch (error) {
      console.error("Failed to fetch excursions:", error);
    } finally {
      setLoading(false);
    }
  }

  async function toggleActive(excursion: Excursion) {
    try {
      const res = await fetch(`/api/excursions/${excursion.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !excursion.isActive }),
      });

      if (res.ok) {
        setExcursions((prev) =>
          prev.map((e) =>
            e.id === excursion.id ? { ...e, isActive: !e.isActive } : e
          )
        );
      }
    } catch (error) {
      console.error("Failed to toggle active:", error);
    }
  }

  async function toggleFavorite(excursion: Excursion) {
    try {
      const res = await fetch(`/api/excursions/${excursion.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorite: !excursion.favorite }),
      });

      if (res.ok) {
        setExcursions((prev) =>
          prev.map((e) =>
            e.id === excursion.id ? { ...e, favorite: !e.favorite } : e
          )
        );
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  }

  async function deleteExcursion(excursionId: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette excursion ?")) return;

    try {
      const res = await fetch(`/api/excursions/${excursionId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setExcursions((prev) => prev.filter((e) => e.id !== excursionId));
      }
    } catch (error) {
      console.error("Failed to delete excursion:", error);
    }
  }

  function openForm(excursion?: Excursion) {
    if (excursion) {
      setEditingExcursion(excursion);
      setFormData({
        name: excursion.name,
        category: excursion.category,
        price: excursion.price,
        period: excursion.period,
        image: excursion.image,
        description: excursion.description,
        features: excursion.features,
        highlights: excursion.highlights,
        duration: excursion.duration || "",
        groupSize: excursion.groupSize || "",
        departure: excursion.departure || "",
        difficulty: excursion.difficulty || "",
        rating: excursion.rating,
        reviews: excursion.reviews,
        favorite: excursion.favorite,
        isActive: excursion.isActive,
        sortOrder: excursion.sortOrder,
      });
      setFeaturesInput(excursion.features.join(", "));
      setHighlightsInput(excursion.highlights.join(", "));
    } else {
      setEditingExcursion(null);
      setFormData(emptyExcursion);
      setFeaturesInput("");
      setHighlightsInput("");
    }
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingExcursion(null);
    setFormData(emptyExcursion);
    setFeaturesInput("");
    setHighlightsInput("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...formData,
      features: featuresInput.split(",").map((s) => s.trim()).filter(Boolean),
      highlights: highlightsInput.split(",").map((s) => s.trim()).filter(Boolean),
      duration: formData.duration || null,
      groupSize: formData.groupSize || null,
      departure: formData.departure || null,
      difficulty: formData.difficulty || null,
    };

    try {
      let res;
      if (editingExcursion) {
        res = await fetch(`/api/excursions/${editingExcursion.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/excursions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        const updated = await res.json();
        if (editingExcursion) {
          setExcursions((prev) =>
            prev.map((e) => (e.id === updated.id ? updated : e))
          );
        } else {
          setExcursions((prev) => [...prev, updated]);
        }
        closeForm();
      }
    } catch (error) {
      console.error("Failed to save excursion:", error);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-zinc-700 rounded w-48"></div>
          <div className="h-12 bg-zinc-700 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-zinc-700 rounded-xl"></div>
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
          <h1 className="text-2xl font-bold text-white mb-2">Excursions</h1>
          <p className="text-zinc-400">
            Gérez vos activités et excursions
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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4">
          <p className="text-zinc-500 text-sm">Total</p>
          <p className="text-2xl font-bold text-white">{excursions.length}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4">
          <p className="text-zinc-500 text-sm">Actives</p>
          <p className="text-2xl font-bold text-green-400">{excursions.filter((e) => e.isActive).length}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4">
          <p className="text-zinc-500 text-sm">Favoris</p>
          <p className="text-2xl font-bold text-red-400">{excursions.filter((e) => e.favorite).length}</p>
        </div>
      </div>

      {/* Excursions Grid */}
      {excursions.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900 border border-zinc-700 rounded-2xl">
          <Compass className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            Aucune excursion
          </h3>
          <p className="text-zinc-400 mb-6">
            Commencez par ajouter une excursion
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {excursions.map((excursion) => (
            <div
              key={excursion.id}
              className={`bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden transition-all ${
                !excursion.isActive ? "opacity-50" : ""
              }`}
            >
              {/* Image */}
              <div className="relative h-48">
                {excursion.image ? (
                  <Image
                    src={excursion.image}
                    alt={excursion.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-zinc-600" />
                  </div>
                )}
                {/* Overlays */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-xs font-medium text-white">
                    {excursion.category}
                  </span>
                  {!excursion.isActive && (
                    <span className="px-2 py-1 rounded-lg bg-red-500/80 text-xs font-medium text-white">
                      Inactif
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-lg bg-blue-500/90 backdrop-blur-sm text-sm font-bold text-white">
                    {excursion.price} MAD
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{excursion.name}</h3>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-medium">{excursion.rating}</span>
                    <span className="text-zinc-500">({excursion.reviews})</span>
                  </div>
                </div>

                <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{excursion.description}</p>

                {/* Details */}
                <div className="flex flex-wrap gap-3 mb-4 text-xs text-zinc-500">
                  {excursion.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-400" />
                      {excursion.duration}
                    </span>
                  )}
                  {excursion.groupSize && (
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-blue-400" />
                      {excursion.groupSize} pers.
                    </span>
                  )}
                  {excursion.difficulty && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-400" />
                      {excursion.difficulty}
                    </span>
                  )}
                </div>

                {/* Features */}
                {excursion.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {excursion.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-xs text-zinc-400"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-1 pt-3 border-t border-zinc-800">
                  <button
                    onClick={() => toggleActive(excursion)}
                    className={`p-2 rounded-lg transition-all ${
                      excursion.isActive
                        ? "bg-green-500/20 text-green-400"
                        : "bg-zinc-800 text-zinc-500 lg:hover:text-green-400"
                    }`}
                    title={excursion.isActive ? "Désactiver" : "Activer"}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleFavorite(excursion)}
                    className={`p-2 rounded-lg transition-all ${
                      excursion.favorite
                        ? "bg-red-500/20 text-red-400"
                        : "bg-zinc-800 text-zinc-500 lg:hover:text-red-400"
                    }`}
                    title={excursion.favorite ? "Retirer favoris" : "Ajouter favoris"}
                  >
                    <Heart className={`w-4 h-4 ${excursion.favorite ? "fill-red-400" : ""}`} />
                  </button>
                  <button
                    onClick={() => openForm(excursion)}
                    className="p-2 rounded-lg bg-zinc-800 text-zinc-400 lg:hover:text-white transition-all"
                    title="Modifier"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteExcursion(excursion.id)}
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

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-white">
                {editingExcursion ? "Modifier l'excursion" : "Ajouter une excursion"}
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
              {/* Name & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                    placeholder="Balade en Dromadaire"
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
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                    placeholder="Palmeraie, Aventure, Pack..."
                    required
                  />
                </div>
              </div>

              {/* Price & Period */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Prix (MAD) *
                  </label>
                  <input
                    type="number"
                    value={formData.price || ""}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                    placeholder="350"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Par
                  </label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                    placeholder="personne"
                  />
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Image (URL ou chemin) *
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                  placeholder="/excursions/photo.png ou https://..."
                  required
                />
                {formData.image && (
                  <div className="mt-2 relative h-32 rounded-lg overflow-hidden">
                    <Image
                      src={formData.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="400px"
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 resize-none"
                  rows={3}
                  placeholder="Décrivez l'excursion..."
                  required
                />
              </div>

              {/* Duration, Group Size, Departure, Difficulty */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Durée
                  </label>
                  <input
                    type="text"
                    value={formData.duration || ""}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                    placeholder="1 heure"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Taille du groupe
                  </label>
                  <input
                    type="text"
                    value={formData.groupSize || ""}
                    onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                    placeholder="1-8"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Départ
                  </label>
                  <input
                    type="text"
                    value={formData.departure || ""}
                    onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                    placeholder="Multiple, 09:00 / 14:00..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Difficulté
                  </label>
                  <select
                    value={formData.difficulty || ""}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="">Sélectionner</option>
                    {DIFFICULTY_OPTIONS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Features (comma-separated) */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Caractéristiques (séparées par des virgules)
                </label>
                <input
                  type="text"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                  placeholder="Transport A/R, Guide berbère, Thé à la menthe"
                />
                {featuresInput && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {featuresInput.split(",").map((f, i) => f.trim() && (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-xs text-blue-400">
                        {f.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Highlights (comma-separated) */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Points forts (séparés par des virgules)
                </label>
                <input
                  type="text"
                  value={highlightsInput}
                  onChange={(e) => setHighlightsInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                  placeholder="Palmeraie de Marrakech, Villages berbères"
                />
                {highlightsInput && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {highlightsInput.split(",").map((h, i) => h.trim() && (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/30 text-xs text-green-400">
                        {h.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Rating & Reviews */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    <Star className="w-4 h-4 inline mr-2" />
                    Note
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Nombre d&apos;avis
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.reviews}
                    onChange={(e) => setFormData({ ...formData, reviews: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Ordre d&apos;affichage
                </label>
                <input
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                  placeholder="0"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className={`w-11 h-6 rounded-full relative transition-colors ${formData.isActive ? "bg-green-500" : "bg-zinc-700"}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.isActive ? "left-6" : "left-1"}`} />
                  </div>
                  <span className="text-zinc-300">Active</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, favorite: !formData.favorite })}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className={`w-11 h-6 rounded-full relative transition-colors ${formData.favorite ? "bg-red-500" : "bg-zinc-700"}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.favorite ? "left-6" : "left-1"}`} />
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
                  {saving ? "Enregistrement..." : editingExcursion ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
