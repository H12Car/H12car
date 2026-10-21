"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: Phone,
    title: "Jabrane",
    value: "+212 6 14 96 85 94",
    description: "Appelez-nous directement"
  },
  {
    icon: Phone,
    title: "Rachid",
    value: "+212 6 64 67 62 67",
    description: "Appelez-nous directement"
  },
  {
    icon: Phone,
    title: "Souad",
    value: "+212 6 43 10 37 59",
    description: "Service client"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+212 6 14 96 85 94",
    description: "Réponse rapide garantie",
    isWhatsApp: true
  },
  {
    icon: Mail,
    title: "Email",
    value: "K0664676267@gmail.com",
    description: "Pour vos demandes détaillées"
  },
  {
    icon: MapPin,
    title: "Adresse",
    value: "Marrakech, Maroc",
    description: "Livraison aéroport & centre-ville"
  },
];

const hours = [
  { day: "Lundi - Vendredi", hours: "08:00 - 20:00" },
  { day: "Samedi", hours: "09:00 - 18:00" },
  { day: "Dimanche", hours: "10:00 - 16:00" },
];

const subjectLabels: Record<string, string> = {
  car: "Location de voiture",
  moto: "Location de moto",
  excursion: "Excursion",
  devis: "Demande de devis",
  other: "Autre",
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subjectText = subjectLabels[formData.subject] || formData.subject;

    const message = [
      `Bonjour H12,`,
      ``,
      `*Nom :* ${formData.fullName}`,
      `*Email :* ${formData.email}`,
      formData.phone ? `*Téléphone :* ${formData.phone}` : "",
      `*Sujet :* ${subjectText}`,
      ``,
      `*Message :*`,
      formData.message,
    ]
      .filter(Boolean)
      .join("\n");

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/212614968594?text=${encoded}`, "_blank");

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Bonjour H12, je souhaite avoir des informations sur vos services de location.");
    window.open(`https://wa.me/212614968594?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-zinc-800">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-3xl" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">
                Contactez-Nous
              </span>
            </motion.div>

            {/* ✅ H1 optimisé */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight"
            >
              Contactez H12 Car{" "}
              <span className="text-blue-500">
                à Marrakech
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-zinc-400 leading-relaxed"
            >
              Une question ? Une demande de devis ? Notre équipe est là pour vous
              accompagner dans tous vos projets de mobilité à Marrakech.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 lg:py-12 bg-zinc-800">
        <div className="max-w-[1700px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={info.isWhatsApp ? openWhatsApp : undefined}
                className={`p-6 rounded-2xl bg-zinc-900 border border-zinc-700 shadow-sm lg:hover:border-blue-500/30 lg:hover:shadow-md transition-all ${info.isWhatsApp ? 'cursor-pointer' : ''}`}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{info.title}</h3>
                <p className="text-blue-400 font-medium mb-1">{info.value}</p>
                <p className="text-sm text-zinc-500">{info.description}</p>
                {info.isWhatsApp && (
                  <span className="inline-block mt-3 text-xs text-blue-400 font-medium">
                    Cliquez pour ouvrir WhatsApp →
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Hours Section */}
      <section className="py-16 lg:py-24 bg-zinc-900">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              {/* ✅ H2 optimisé */}
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Réservez ou Demandez un{" "}
                <span className="text-blue-500">
                  Devis à Marrakech
                </span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-zinc-400 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-zinc-400 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition"
                      placeholder="+212 6XX XX XX XX"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-zinc-400 mb-2">
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="car">Location de voiture</option>
                      <option value="moto">Location de moto</option>
                      <option value="excursion">Excursion</option>
                      <option value="devis">Demande de devis</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition resize-none"
                    placeholder="Décrivez votre demande..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full sm:w-auto px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition ${
                    submitted
                      ? 'bg-green-500 text-white'
                      : 'bg-green-500 text-white lg:hover:bg-green-600'
                  } disabled:opacity-70`}
                >
                  {submitted ? (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Message envoyé via WhatsApp !
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      Envoyer via WhatsApp
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Hours & Quick Contact */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="p-6 rounded-2xl bg-zinc-800 border border-zinc-700 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Horaires</h3>
                </div>
                <div className="space-y-3">
                  {hours.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-zinc-500">{item.day}</span>
                      <span className="text-white font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-zinc-500 mt-4">
                  * Assistance téléphonique disponible 7j/7
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-blue-500/20 border border-blue-500/30">
                <h3 className="text-lg font-bold text-white mb-2">
                  Réponse Immédiate ?
                </h3>
                <p className="text-zinc-400 text-sm mb-4">
                  Contactez-nous directement sur WhatsApp pour une réponse rapide.
                </p>
                <button
                  onClick={openWhatsApp}
                  className="w-full px-6 py-3 rounded-xl bg-green-500 lg:hover:bg-green-600 text-white font-semibold flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  Ouvrir WhatsApp
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-800 border border-zinc-700 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Notre Zone</h3>
                </div>
                <p className="text-zinc-400 text-sm mb-3">
                  Nous intervenons sur tout Marrakech et ses environs.
                </p>
                <ul className="text-sm text-zinc-500 space-y-1">
                  <li>• Aéroport Menara</li>
                  <li>• Médina & Guéliz</li>
                  <li>• Palmeraie</li>
                  <li>• Environs de Marrakech</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}