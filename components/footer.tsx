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
  Clock
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "À Propos" },
  { href: "/fleet", label: "Notre Flotte" },
  { href: "/contact", label: "Contact" },
];

const services = [
  { name: "Location Voiture", icon: Car },
  { name: "Location Moto", icon: Bike },
  { name: "Excursions Guidées", icon: MapPin },
];

const contactInfo = [
  { icon: Phone, text: "(MAR) +212 6 14 96 85 94", href: "tel:+212614968594" },
  { icon: Phone, text: "(FR) +33 6 46 46 66 56", href: "tel:+33646466656" },
  { icon: Mail, text: "contact@h12car.com", href: "mailto:contact@h12car.com" },
  { icon: MapPin, text: "Marrackech, Maroc", href: "#" },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900 border-t border-purple-500/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-gradient-to-r from-purple-600/10 to-fuchsia-600/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-l from-purple-600/5 to-fuchsia-600/5 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12 py-16 lg:py-24">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 group"
              >
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-600 p-0.5">
                  <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center">
                    <span className="text-2xl font-black bg-gradient-to-br from-white to-purple-100 bg-clip-text text-transparent">
                      H
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-black bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                    H12
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
                      Premium Travel
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Votre partenaire de confiance pour des expériences de voyage premium au Maroc. Luxe, aventure et service exceptionnel.
            </p>

            <div className="pt-2">
              <h4 className="text-white/60 text-sm font-medium mb-3">Suivez-nous</h4>
              <div className="flex items-center gap-2">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-purple-600/20 hover:border-purple-500/30 transition-all group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-white/70 group-hover:text-purple-400 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
            
          </div>

          {/* Services Column */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg relative inline-block">
              <span className="relative z-10">Nos Services</span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-fuchsia-600 rounded-full" />
            </h3>
            
            <div className="space-y-3">
              {services.map((service) => (
                <motion.div
                  key={service.name}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20 flex items-center justify-center">
                    <service.icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                    {service.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg relative inline-block">
              <span className="relative z-10">Contact</span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-fuchsia-600 rounded-full" />
            </h3>
            
            <div className="space-y-4">
              {contactInfo.map((info, idx) => (
                <motion.a
                  key={idx}
                  href={info.href}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/10 to-fuchsia-600/10 flex items-center justify-center border border-purple-500/10">
                    <info.icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white/90 text-sm font-medium group-hover:text-white transition-colors">
                      {info.text}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-bold text-lg relative inline-block mb-2">
                <span className="relative z-10">Newsletter</span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-fuchsia-600 rounded-full" />
              </h3>
              <p className="text-white/60 text-sm">
                Recevez nos offres exclusives et actualités directement dans votre boîte mail.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/30 transition-all pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
              
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  className="mt-1 rounded border-white/20 bg-white/5 focus:ring-purple-500"
                />
                <label htmlFor="privacy" className="text-white/50 text-xs">
                  J&apos;accepte de recevoir des communications marketing et je confirme avoir pris connaissance de la politique de confidentialité.
                </label>
              </div>
            </form>
            
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        {/* Bottom Bar */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-6">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className="text-white/60 hover:text-white text-sm font-medium transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-fuchsia-600 rounded-full group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Copyright & Policies */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm">
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-white/50 hover:text-white transition-colors">
                Confidentialité
              </Link>
              <Link href="/terms" className="text-white/50 hover:text-white transition-colors">
                Conditions
              </Link>
              <Link href="/cookies" className="text-white/50 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
            
            <div className="text-white/50 text-center md:text-right">
              <div className="flex items-center gap-2 justify-center md:justify-end">
                <Star className="w-3 h-3 text-purple-400" />
                <span>&copy; {new Date().getFullYear()} H12. Tous droits réservés.</span>
              </div>
              <p className="text-xs mt-1">Marque déposée • Certifié Premium</p>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/30 flex items-center justify-center border border-white/10"
          aria-label="Retour en haut"
        >
          <ArrowRight className="w-5 h-5 rotate-270" />
        </motion.button>
      </div>
    </footer>
  );
}