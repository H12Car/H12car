"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Sparkles } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: Phone,
    title: "Telephone",
    value: "+212 6XX XX XX XX",
    description: "Appelez-nous directement"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+212 6XX XX XX XX",
    description: "Reponse rapide garantie",
    isWhatsApp: true
  },
  {
    icon: Mail,
    title: "Email",
    value: "contact@h12car.com",
    description: "Pour vos demandes detaillees"
  },
  {
    icon: MapPin,
    title: "Adresse",
    value: "Marrakech, Maroc",
    description: "Livraison aeroport & centre-ville"
  },
];

const hours = [
  { day: "Lundi - Vendredi", hours: "08:00 - 20:00" },
  { day: "Samedi", hours: "09:00 - 18:00" },
  { day: "Dimanche", hours: "10:00 - 16:00" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 3000);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Bonjour H12, je souhaite avoir des informations sur vos services de location.");
    window.open(`https://wa.me/212XXXXXXXXX?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        {/* Subtle Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-blue-400/5 blur-3xl" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-blue-600">
                Contactez-Nous
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight"
            >
              Parlons de Votre{" "}
              <span className="text-blue-500">
                Projet
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-500 leading-relaxed"
            >
              Une question ? Une demande de devis ? Notre equipe est la pour vous
              accompagner dans tous vos projets de mobilite a Marrakech.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={info.isWhatsApp ? openWhatsApp : undefined}
                className={`p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all ${info.isWhatsApp ? 'cursor-pointer' : ''}`}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{info.title}</h3>
                <p className="text-blue-500 font-medium mb-1">{info.value}</p>
                <p className="text-sm text-gray-400">{info.description}</p>
                {info.isWhatsApp && (
                  <span className="inline-block mt-3 text-xs text-blue-500 font-medium">
                    Cliquez pour ouvrir WhatsApp →
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Hours Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
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
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Envoyez-nous un{" "}
                <span className="text-blue-500">
                  Message
                </span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-600 mb-2">
                      Nom Complet *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-2">
                      Telephone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition"
                      placeholder="+212 6XX XX XX XX"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-600 mb-2">
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition"
                    >
                      <option value="">Selectionnez un sujet</option>
                      <option value="car">Location de voiture</option>
                      <option value="moto">Location de moto</option>
                      <option value="excursion">Excursion</option>
                      <option value="devis">Demande de devis</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition resize-none"
                    placeholder="Decrivez votre demande..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full sm:w-auto px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition ${
                    submitted
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  } disabled:opacity-70`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Envoi en cours...
                    </>
                  ) : submitted ? (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Message envoye !
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le message
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
              {/* Hours */}
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Horaires</h3>
                </div>
                <div className="space-y-3">
                  {hours.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-500">{item.day}</span>
                      <span className="text-gray-900 font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  * Assistance telephonique disponible 7j/7
                </p>
              </div>

              {/* WhatsApp CTA */}
              <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Reponse Immediate ?
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Contactez-nous directement sur WhatsApp pour une reponse rapide.
                </p>
                <button
                  onClick={openWhatsApp}
                  className="w-full px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  Ouvrir WhatsApp
                </button>
              </div>

              {/* Map placeholder */}
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Notre Zone</h3>
                </div>
                <p className="text-gray-500 text-sm mb-3">
                  Nous intervenons sur tout Marrakech et ses environs.
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Aeroport Menara</li>
                  <li>• Medina & Gueliz</li>
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
