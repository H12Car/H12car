"use client";

import { useState, useEffect } from "react";
import {
  Plane,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Star,
  MapPin,
  Clock,
  Users,
  Building2,
  Palmtree,
  PartyPopper,
} from "lucide-react";

type TransferCategory = "AIRPORT" | "CITY" | "EXCURSION" | "NIGHTLIFE";

interface TransferRoute {
  id: string;
  name: string;
  category: TransferCategory;
  price1to4: number | null;
  price5to8: number | null;
  price9to17: number | null;
  price18to48: number | null;
  distance: string | null;
  duration: string | null;
  popular: boolean;
  isActive: boolean;
  sortOrder: number;
}

const emptyRoute: Omit<TransferRoute, "id"> = {
  name: "",
  category: "AIRPORT",
  price1to4: null,
  price5to8: null,
  price9to17: null,
  price18to48: null,
  distance: "",
  duration: "",
  popular: false,
  isActive: true,
  sortOrder: 0,
};

const CATEGORY_LABELS: Record<TransferCategory, string> = {
  AIRPORT: "Aéroport",
  CITY: "Villes",
  EXCURSION: "Excursions",
  NIGHTLIFE: "Sorties",
};

const CATEGORY_ICONS: Record<TransferCategory, typeof Plane> = {
  AIRPORT: Plane,
  CITY: Building2,
  EXCURSION: Palmtree,
  NIGHTLIFE: PartyPopper,
};

const CATEGORY_COLORS: Record<TransferCategory, string> = {
  AIRPORT: "text-blue-400 bg-blue-500/20 border-blue-500/30",
  CITY: "text-purple-400 bg-purple-500/20 border-purple-500/30",
  EXCURSION: "text-green-400 bg-green-500/20 border-green-500/30",
  NIGHTLIFE: "text-pink-400 bg-pink-500/20 border-pink-500/30",
};

export default function TransfersPage() {
  const [routes, setRoutes] = useState<TransferRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TransferCategory | "ALL">("ALL");
  const [showForm, setShowForm] = useState(false);
  const [editingRoute, setEditingRoute] = useState<TransferRoute | null>(null);
  const [formData, setFormData] = useState(emptyRoute);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchRoutes();
  }, []);

  async function fetchRoutes() {
    try {
      const res = await fetch("/api/transfers?active=false");
      const data = await res.json();
      setRoutes(data);
    } catch (error) {
      console.error("Failed to fetch routes:", error);
    } finally {
      setLoading(false);
    }
  }

  async function toggleActive(route: TransferRoute) {
    try {
      const res = await fetch(`/api/transfers/${route.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !route.isActive }),
      });

      if (res.ok) {
        setRoutes((prev) =>
          prev.map((r) =>
            r.id === route.id ? { ...r, isActive: !r.isActive } : r
          )
        );
      }
    } catch (error) {
      console.error("Failed to toggle active:", error);
    }
  }

  async function togglePopular(route: TransferRoute) {
    try {
      const res = await fetch(`/api/transfers/${route.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ popular: !route.popular }),
      });

      if (res.ok) {
        setRoutes((prev) =>
          prev.map((r) =>
            r.id === route.id ? { ...r, popular: !r.popular } : r
          )
        );
      }
    } catch (error) {
      console.error("Failed to toggle popular:", error);
    }
  }

  async function deleteRoute(routeId: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette destination ?")) return;

    try {
      const res = await fetch(`/api/transfers/${routeId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setRoutes((prev) => prev.filter((r) => r.id !== routeId));
      }
    } catch (error) {
      console.error("Failed to delete route:", error);
    }
  }

  function openForm(route?: TransferRoute) {
    if (route) {
      setEditingRoute(route);
      setFormData({
        name: route.name,
        category: route.category,
        price1to4: route.price1to4,
        price5to8: route.price5to8,
        price9to17: route.price9to17,
        price18to48: route.price18to48,
        distance: route.distance || "",
        duration: route.duration || "",
        popular: route.popular,
        isActive: route.isActive,
        sortOrder: route.sortOrder,
      });
    } else {
      setEditingRoute(null);
      setFormData(emptyRoute);
    }
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingRoute(null);
    setFormData(emptyRoute);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...formData,
      distance: formData.distance || null,
      duration: formData.duration || null,
    };

    try {
      let res;
      if (editingRoute) {
        res = await fetch(`/api/transfers/${editingRoute.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/transfers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        const updated = await res.json();
        if (editingRoute) {
          setRoutes((prev) =>
            prev.map((r) => (r.id === updated.id ? updated : r))
          );
        } else {
          setRoutes((prev) => [...prev, updated]);
        }
        closeForm();
      }
    } catch (error) {
      console.error("Failed to save route:", error);
    } finally {
      setSaving(false);
    }
  }

  const filteredRoutes = activeTab === "ALL"
    ? routes
    : routes.filter((r) => r.category === activeTab);

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-zinc-700 rounded w-48"></div>
          <div className="h-12 bg-zinc-700 rounded"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-zinc-700 rounded-xl"></div>
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
          <h1 className="text-2xl font-bold text-white mb-2">Transferts</h1>
          <p className="text-zinc-400">
            Gérez les tarifs de vos transferts et navettes
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
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab("ALL")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${
            activeTab === "ALL"
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              : "bg-zinc-800 text-zinc-400 border border-zinc-700 lg:hover:text-white"
          }`}
        >
          Tous
          <span className="text-xs opacity-70">({routes.length})</span>
        </button>
        {(Object.keys(CATEGORY_LABELS) as TransferCategory[]).map((cat) => {
          const Icon = CATEGORY_ICONS[cat];
          const count = routes.filter((r) => r.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === cat
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-zinc-800 text-zinc-400 border border-zinc-700 lg:hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {CATEGORY_LABELS[cat]}
              <span className="text-xs opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Routes Table */}
      {filteredRoutes.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900 border border-zinc-700 rounded-2xl">
          <Plane className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            Aucune destination
          </h3>
          <p className="text-zinc-400 mb-6">
            Commencez par ajouter une destination
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
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-800/50">
                  <th className="text-left py-4 px-4 text-zinc-400 font-medium text-sm">Destination</th>
                  <th className="text-center py-4 px-3 text-zinc-400 font-medium text-sm whitespace-nowrap">
                    <div>1-4 pax</div>
                    <div className="text-xs text-zinc-500 font-normal">Berline</div>
                  </th>
                  <th className="text-center py-4 px-3 text-zinc-400 font-medium text-sm whitespace-nowrap">
                    <div>5-8 pax</div>
                    <div className="text-xs text-zinc-500 font-normal">Minivan</div>
                  </th>
                  <th className="text-center py-4 px-3 text-zinc-400 font-medium text-sm whitespace-nowrap">
                    <div>9-17 pax</div>
                    <div className="text-xs text-zinc-500 font-normal">Minibus</div>
                  </th>
                  <th className="text-center py-4 px-3 text-zinc-400 font-medium text-sm whitespace-nowrap">
                    <div>18-48 pax</div>
                    <div className="text-xs text-zinc-500 font-normal">Bus</div>
                  </th>
                  <th className="text-center py-4 px-4 text-zinc-400 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoutes.map((route, idx) => {
                  const Icon = CATEGORY_ICONS[route.category];
                  return (
                    <tr
                      key={route.id}
                      className={`border-t border-zinc-800 ${
                        idx % 2 === 0 ? "" : "bg-zinc-800/20"
                      } ${!route.isActive ? "opacity-50" : ""}`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${CATEGORY_COLORS[route.category]}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium">{route.name}</span>
                              {route.popular && (
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              )}
                              {!route.isActive && (
                                <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">
                                  Inactif
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                              {route.distance && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {route.distance}
                                </span>
                              )}
                              {route.duration && (
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {route.duration}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-3 text-center">
                        {route.price1to4 !== null ? (
                          <span className="text-white font-semibold">{route.price1to4}</span>
                        ) : (
                          <span className="text-zinc-600">-</span>
                        )}
                      </td>
                      <td className="py-4 px-3 text-center">
                        {route.price5to8 !== null ? (
                          <span className="text-white font-semibold">{route.price5to8}</span>
                        ) : (
                          <span className="text-zinc-600">-</span>
                        )}
                      </td>
                      <td className="py-4 px-3 text-center">
                        {route.price9to17 !== null ? (
                          <span className="text-white font-semibold">{route.price9to17}</span>
                        ) : (
                          <span className="text-zinc-600">-</span>
                        )}
                      </td>
                      <td className="py-4 px-3 text-center">
                        {route.price18to48 !== null ? (
                          <span className="text-white font-semibold">{route.price18to48}</span>
                        ) : (
                          <span className="text-zinc-600">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-1">
                          {/* Active Toggle */}
                          <button
                            onClick={() => toggleActive(route)}
                            className={`p-2 rounded-lg transition-all ${
                              route.isActive
                                ? "bg-green-500/20 text-green-400"
                                : "bg-zinc-800 text-zinc-500 lg:hover:text-green-400"
                            }`}
                            title={route.isActive ? "Désactiver" : "Activer"}
                          >
                            <Check className="w-4 h-4" />
                          </button>

                          {/* Popular Toggle */}
                          <button
                            onClick={() => togglePopular(route)}
                            className={`p-2 rounded-lg transition-all ${
                              route.popular
                                ? "bg-amber-500/20 text-amber-400"
                                : "bg-zinc-800 text-zinc-500 lg:hover:text-amber-400"
                            }`}
                            title={route.popular ? "Retirer populaire" : "Marquer populaire"}
                          >
                            <Star className={`w-4 h-4 ${route.popular ? "fill-amber-400" : ""}`} />
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => openForm(route)}
                            className="p-2 rounded-lg bg-zinc-800 text-zinc-400 lg:hover:text-white transition-all"
                            title="Modifier"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => deleteRoute(route.id)}
                            className="p-2 rounded-lg bg-zinc-800 text-zinc-400 lg:hover:text-red-400 lg:hover:bg-red-500/20 transition-all"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-zinc-800 text-xs text-zinc-500">
            * Prix en MAD Hors Taxes
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {editingRoute ? "Modifier la destination" : "Ajouter une destination"}
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
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Nom de la destination *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                  placeholder="Aéroport Marrakech (RAK)"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Catégorie
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(CATEGORY_LABELS) as TransferCategory[]).map((cat) => {
                    const Icon = CATEGORY_ICONS[cat];
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat })}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                          formData.category === cat
                            ? CATEGORY_COLORS[cat] + " border"
                            : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {CATEGORY_LABELS[cat]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prices */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  Tarifs par nombre de personnes (MAD H.T)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">1-4 personnes</label>
                    <input
                      type="number"
                      value={formData.price1to4 ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price1to4: e.target.value ? parseInt(e.target.value) : null,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                      placeholder="150"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">5-8 personnes</label>
                    <input
                      type="number"
                      value={formData.price5to8 ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price5to8: e.target.value ? parseInt(e.target.value) : null,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                      placeholder="200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">9-17 personnes</label>
                    <input
                      type="number"
                      value={formData.price9to17 ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price9to17: e.target.value ? parseInt(e.target.value) : null,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                      placeholder="400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">18-48 personnes</label>
                    <input
                      type="number"
                      value={formData.price18to48 ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price18to48: e.target.value ? parseInt(e.target.value) : null,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                      placeholder="1400"
                    />
                  </div>
                </div>
              </div>

              {/* Distance & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Distance
                  </label>
                  <input
                    type="text"
                    value={formData.distance || ""}
                    onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                    placeholder="6 km"
                  />
                </div>
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
                    placeholder="15-30 min"
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
                  onChange={(e) =>
                    setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })
                  }
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
                  <span className="text-zinc-300">Actif</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, popular: !formData.popular })}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className={`w-11 h-6 rounded-full relative transition-colors ${formData.popular ? "bg-amber-500" : "bg-zinc-700"}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.popular ? "left-6" : "left-1"}`} />
                  </div>
                  <span className="text-zinc-300">Populaire</span>
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
                  {saving ? "Enregistrement..." : editingRoute ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
