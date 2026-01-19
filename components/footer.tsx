// components/footer.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  Sparkles,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Car,
  Bike,
  ChevronUp
} from "lucide-react";
import DevModal from "@/components/DevModal";

const quickLinks = [
  { href: "/", label: "Accueil" },
  { href: "/voiture", label: "Voitures" },
  { href: "/moto", label: "Motos" },
  { href: "/excursion", label: "Excursions" },
  { href: "/about", label: "À Propos" },
];

const services = [
  { name: "Location Voiture", icon: Car, href: "/voiture" },
  { name: "Location Moto", icon: Bike, href: "/moto" },
  { name: "Excursions", icon: MapPin, href: "/excursion" },
];

const contactInfo = [
  { icon: Phone, text: "+212 6 14 96 85 94", href: "tel:+212614968594" },
  { icon: Phone, text: "+33 6 46 46 66 56", href: "tel:+33646466656" },
  { icon: Mail, text: "contact@h12car.com", href: "mailto:contact@h12car.com" },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDevModalOpen(true);
    setEmail("");
  };

  return (
    <>
      <footer className="relative overflow-hidden bg-[#0a0a0a] border-t border-white/[0.08]">
        {/* Subtle Background Gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-fuchsia-600/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 py-12 sm:py-16 lg:py-20">
            {/* Brand Widget */}
            <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2 space-y-6 text-center sm:text-left">
              <Link href="/" className="inline-block">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 p-[2px]">
                    <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
                      <span className="text-lg font-black text-white">H</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl font-black text-white">H12</span>
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-purple-400" />
                      <span className="text-[9px] text-purple-400 font-semibold uppercase tracking-wider">
                        Premium Travel
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>

              <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
                Location de véhicules premium et expériences exclusives à Marrakech.
              </p>

              {/* Social Links */}
              <div className="flex items-center justify-center sm:justify-start gap-2">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-white/60 group-hover:text-purple-400 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links Widget */}
            <div className="space-y-4">
              <h3 className="text-white/90 font-semibold text-sm">Navigation</h3>
              <div className="space-y-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services Widget */}
            <div className="space-y-4">
              <h3 className="text-white/90 font-semibold text-sm">Services</h3>
              <div className="space-y-2">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors group"
                  >
                    <service.icon className="w-3.5 h-3.5 text-purple-400/60 group-hover:text-purple-400 transition-colors" />
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Widget */}
            <div className="space-y-4">
              <h3 className="text-white/90 font-semibold text-sm">Contact</h3>
              <div className="space-y-3">
                {contactInfo.map((info, idx) => (
                  <a
                    key={idx}
                    href={info.href}
                    className="flex items-start gap-2 text-white/50 hover:text-white text-sm transition-colors group"
                  >
                    <info.icon className="w-3.5 h-3.5 text-purple-400/60 group-hover:text-purple-400 transition-colors flex-shrink-0 mt-0.5" />
                    <span className="text-xs">{info.text}</span>
                  </a>
                ))}
              </div>

              {/* Newsletter */}
              <div className="pt-2 max-w-xs mx-auto sm:mx-0">
                <form onSubmit={handleNewsletterSubmit} className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Newsletter"
                    required
                    className="w-full px-3 py-2.5 pr-10 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/30 transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-purple-600/80 hover:bg-purple-600 transition-all"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/[0.06] py-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Star className="w-3 h-3 text-purple-400/60 fill-purple-400/60" />
                <span>&copy; {new Date().getFullYear()} H12. Tous droits réservés.</span>
              </div>
              <span className="hidden sm:block text-white/20">•</span>
              <span className="text-white/30 text-xs">Développé par DigitalMaroc</span>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white shadow-lg flex items-center justify-center transition-all"
          aria-label="Retour en haut"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      </footer>

      {/* DevModal */}
      <DevModal isOpen={isDevModalOpen} onClose={() => setIsDevModalOpen(false)} />
    </>
  );
}
