// components/Footer.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Car,
  Bike,
  Compass,
} from "lucide-react";

const quickLinks = [
  { href: "/", label: "Accueil" },
  { href: "/voiture", label: "Voitures" },
  { href: "/moto", label: "Motos" },
  { href: "/excursion", label: "Excursions" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "À Propos" },
];

const services = [
  { name: "Location Voiture", icon: Car, href: "/voiture" },
  { name: "Location Moto", icon: Bike, href: "/moto" },
  { name: "Excursions", icon: Compass, href: "/excursion" },
];

const contactInfo = [
  { icon: Phone, text: "Jabrane: +212 6 14 96 85 94", href: "tel:+212614968594" },
  { icon: Phone, text: "+33 6 46 46 66 56", href: "tel:+33646466656" },
  { icon: Mail, text: "k0664676267@gmail.com", href: "mailto:k0664676267@gmail.com" },
  { icon: MapPin, text: "Marrakech, Maroc", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="relative overflow-hidden bg-zinc-900 border-t border-zinc-800">
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        {/* CTA Banner */}
        <div className="py-10 lg:py-14 border-b border-zinc-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Prêt pour l&apos;aventure ?
              </h3>
              <p className="text-zinc-400 text-sm">
                Réservez votre véhicule en quelques clics
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/voiture">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-6 py-3 rounded-full bg-blue-500 text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 lg:hover:bg-blue-600 transition-all"
                >
                  <Car className="w-4 h-4" />
                  Louer une Voiture
                  <ArrowRight className="w-4 h-4 lg:group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/moto">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-6 py-3 rounded-full bg-zinc-800 border border-zinc-700 text-white text-sm font-semibold flex items-center gap-2 lg:hover:bg-zinc-700 lg:hover:border-zinc-600 transition-all"
                >
                  <Bike className="w-4 h-4" />
                  Louer une Moto
                </motion.button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10 py-12 lg:py-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative w-11 h-11 flex items-center justify-center rounded-full overflow-hidden border border-zinc-700/50">
                <Image
                  src="/h12carlogo.png"
                  alt="H12 Logo"
                  width={44}
                  height={44}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg tracking-tight leading-none">
                  H12
                  <span className="text-blue-400 ml-0.5">Car</span>
                </span>
                <span className="text-zinc-500 text-[10px] font-medium tracking-wider uppercase">
                  Location Premium
                </span>
              </div>
            </Link>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Location de véhicules premium et expériences exclusives à Marrakech. Qualité, confort et service personnalisé.
            </p>

          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm">Navigation</h3>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-zinc-400 lg:hover:text-blue-400 text-sm transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services Column - Pill Buttons */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm">Services</h3>
            <div className="flex flex-col gap-2">
              {services.map((service) => (
                <Link key={service.name} href={service.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 lg:hover:bg-zinc-800 lg:hover:border-zinc-600 transition-all group cursor-pointer"
                  >
                    <service.icon className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs text-zinc-400 lg:group-hover:text-white transition-colors">{service.name}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <h3 className="text-white font-semibold text-sm">Contact</h3>
            <div className="flex flex-col gap-2">
              {contactInfo.map((info, idx) => (
                <a
                  key={idx}
                  href={info.href}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 lg:hover:bg-zinc-800 lg:hover:border-zinc-600 transition-all group w-fit"
                >
                  <info.icon className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs text-zinc-400 lg:group-hover:text-white transition-colors">{info.text}</span>
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="pt-3">
              <p className="text-xs text-zinc-500 mb-2">Newsletter</p>
              {subscribed ? (
                <div className="px-4 py-2.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs text-center">
                  Merci pour votre inscription!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    required
                    className="w-full px-4 py-2.5 pr-11 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-white text-xs placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-blue-500 lg:hover:bg-blue-600 transition-all"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500 text-xs">
              © {new Date().getFullYear()} H12 Car. Tous droits réservés.
            </p>
            <a
              href="https://digital-maroc.vercel.app/services"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 lg:hover:text-zinc-400 text-[11px] transition-colors"
            >
              v2.5 — Codé par <span className="font-medium">DigitalMaroc Team</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
