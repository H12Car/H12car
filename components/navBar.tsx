"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDown, Car, Bike } from "lucide-react";
import { useModal } from "@/context/modalContext";

const navLinks = [
  { href: "/", label: "Accueil" },
  {
    label: "Louer",
    dropdown: [
      { href: "/voiture", label: "Voiture", icon: Car },
      { href: "/moto", label: "Moto", icon: Bike },
    ]
  },
  { href: "/excursion", label: "Excursion" },
  { href: "/about", label: "À Propos" },
];


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState("/");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setIsDevisModalOpen } = useModal();


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update active link when pathname changes
  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setHoveredDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12 xl:px-20"
    >
      <div
        className={`max-w-[1400px] mx-auto transition-all duration-500 ${
          scrolled ? "mt-2" : "mt-3"
        }`}
      >
        {/* Main Header Container - Glassmorphic with Purple theme */}
        <div
          className={`relative rounded-2xl transition-all duration-500 ${
            scrolled
              ? "bg-slate-950/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(147,51,234,0.3)] border border-purple-500/20"
              : "bg-gradient-to-b from-purple-900/10 to-slate-950/5 backdrop-blur-md border border-purple-500/10"
          }`}
        >
          {/* Top highlight line - Purple glow */}
          <div className="absolute inset-x-0 top-0 h-[1px] rounded-t-2xl bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />

          <div className="px-4 sm:px-5 py-4">
            <div className="flex items-center justify-between">
              {/* Logo - Using Image Component */}
              <Link href="/" className="flex items-center gap-3 relative z-10 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3"
                >
                  {/* Logo Container */}
                  <div className="relative w-14 h-11 flex items-center justify-center">
                    {/* Glass effect background */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.12] to-white/[0.04] backdrop-blur-xl border border-white/10" />

                    {/* Logo Image */}
                    <div className="relative w-full h-full flex items-center justify-center p-1.5">
                      <Image
                        src="/logo_h12.png"
                        alt="H12 Logo"
                        width={70}
                        height={35}
                        className="object-contain w-full h-full"
                        priority
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Desktop Navigation - Centered Glassmorphic Pill */}
              <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
                <div className="relative flex items-center gap-0.5 p-1.5 rounded-full bg-white/[0.05] border border-purple-500/15 backdrop-blur-sm">
                  {navLinks.map((link) => (
                    <div 
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => 'dropdown' in link && setHoveredDropdown(link.label)}
                      onMouseLeave={() => setHoveredDropdown(null)}
                      ref={'dropdown' in link ? dropdownRef : null}
                    >
                      {'dropdown' in link ? (
                        <>
                          <button
                            onClick={() => setHoveredDropdown(hoveredDropdown === link.label ? null : link.label)}
                            className={`relative px-4 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 group/nav flex items-center gap-1 ${
                              hoveredDropdown === link.label || link.dropdown?.some(item => activeLink === item.href)
                                ? "text-purple-300 font-semibold"
                                : "text-white/60 hover:text-white"
                            }`}
                          >
                            <span className="relative z-10">{link.label}</span>
                            <ChevronDown className={`w-3 h-3 relative z-10 transition-transform duration-300 ${
                              hoveredDropdown === link.label ? "rotate-180 text-purple-300" : "text-white/60"
                            }`} />
                            
                            {/* Hover underline effect */}
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 group-hover/nav:w-3/4 transition-all duration-300 rounded-full" />
                            
                            {/* Subtle background on hover (not covering text) */}
                            <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                              hoveredDropdown === link.label || link.dropdown?.some(item => activeLink === item.href)
                                ? "bg-gradient-to-r from-purple-600/10 to-fuchsia-600/10"
                                : "group-hover/nav:bg-white/[0.03]"
                            }`} />
                          </button>

                          {/* Dropdown Menu */}
                          <AnimatePresence>
                            {hoveredDropdown === link.label && (
                              <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute top-full left-0 mt-2 min-w-[200px] rounded-2xl overflow-hidden bg-slate-950/90 backdrop-blur-xl border border-purple-500/20 shadow-[0_20px_60px_-15px_rgba(147,51,234,0.4)] z-50"
                              >
                                {/* Dropdown highlight */}
                                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />
                                
                                <div className="p-2">
                                  {link.dropdown?.map((item, idx) => (
                                    <motion.div
                                      key={item.href}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.05 }}
                                    >
                                      <Link
                                        href={item.href}
                                        onClick={() => {
                                          setActiveLink(item.href);
                                          setHoveredDropdown(null);
                                        }}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group/dropdown ${
                                          activeLink === item.href
                                            ? "bg-gradient-to-r from-purple-600/30 to-fuchsia-600/30 text-white"
                                            : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                                        }`}
                                      >
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20 flex items-center justify-center">
                                          <item.icon className="w-4 h-4 text-purple-400" />
                                        </div>
                                        <span className="font-medium text-sm">{item.label}</span>
                                        <ChevronDown className="w-3 h-3 ml-auto rotate-270 opacity-0 group-hover/dropdown:opacity-100 transition-opacity duration-300" />
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setActiveLink(link.href)}
                          className="relative px-4 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 group/nav"
                        >
                          <span
                            className={`relative z-10 transition-colors duration-300 ${
                              activeLink === link.href
                                ? "text-purple-300 font-semibold"
                                : "text-white/60 hover:text-white"
                            }`}
                          >
                            {link.label}
                          </span>
                          
                          {/* Hover underline effect */}
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 group-hover/nav:w-3/4 transition-all duration-300 rounded-full" />
                          
                          {/* Subtle background on hover and active */}
                          <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                            activeLink === link.href
                              ? "bg-gradient-to-r from-purple-600/10 to-fuchsia-600/10"
                              : "group-hover/nav:bg-white/[0.03]"
                          }`} />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button - Right side */}
              <div className="hidden lg:flex items-center gap-4 relative z-10">
                <motion.button
                  onClick={() => setIsDevisModalOpen(true)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative px-5 py-2.5 rounded-full overflow-hidden"
                >
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 bg-[length:200%_100%] animate-gradient-x" />

                  {/* Subtle glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />

                  {/* Text */}
                  <span className="relative z-10 text-white font-semibold text-[13px] tracking-wide">
                    Nous Contacter
                  </span>
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.06] border border-purple-500/15"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                <div className="flex flex-col gap-1.5 items-center justify-center">
                  <motion.span
                    animate={isOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                    className="w-5 h-[2px] bg-white block rounded-full origin-center"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.span
                    animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    className="w-5 h-[2px] bg-white block rounded-full"
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    animate={isOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                    className="w-5 h-[2px] bg-white block rounded-full origin-center"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Glassmorphic dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden mt-2 overflow-hidden rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-purple-500/20 shadow-[0_20px_60px_-15px_rgba(147,51,234,0.4)]"
            >
              {/* Top highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] rounded-t-2xl bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />

              <div className="p-4 flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <div key={link.label}>
                    {'dropdown' in link ? (
                      <div>
                        <motion.button
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                          onClick={() => setMobileDropdownOpen(mobileDropdownOpen === link.label ? null : link.label)}
                          className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl transition-all duration-300 ${
                            mobileDropdownOpen === link.label || link.dropdown?.some(item => activeLink === item.href)
                              ? "bg-gradient-to-r from-purple-600/30 to-fuchsia-600/30 text-purple-300"
                              : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                          }`}
                        >
                          <span className="font-semibold">{link.label}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                            mobileDropdownOpen === link.label ? "rotate-180" : ""
                          }`} />
                        </motion.button>

                        <AnimatePresence>
                          {mobileDropdownOpen === link.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="ml-4 mt-2 pl-4 border-l border-purple-500/20 flex flex-col gap-2">
                                {link.dropdown?.map((item, idx) => (
                                  <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                  >
                                    <Link
                                      href={item.href}
                                      onClick={() => {
                                        setIsOpen(false);
                                        setActiveLink(item.href);
                                        setMobileDropdownOpen(null);
                                      }}
                                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                        activeLink === item.href
                                          ? "bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 text-white"
                                          : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                                      }`}
                                    >
                                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20 flex items-center justify-center">
                                        <item.icon className="w-4 h-4 text-purple-400" />
                                      </div>
                                      <span className="font-medium">{item.label}</span>
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => {
                            setIsOpen(false);
                            setActiveLink(link.href);
                          }}
                          className={`block px-5 py-3.5 rounded-xl transition-all duration-300 ${
                            activeLink === link.href
                              ? "bg-gradient-to-r from-purple-600/30 to-fuchsia-600/30 text-purple-300"
                              : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                          }`}
                        >
                          <span className="font-semibold">{link.label}</span>
                        </Link>
                      </motion.div>
                    )}
                  </div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  onClick={() => setIsDevisModalOpen(true)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-2 pt-2 border-t border-purple-500/10"
                >
                  <motion.button
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full relative py-3.5 rounded-xl overflow-hidden group"
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 bg-[length:200%_100%] animate-gradient-x" />
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                    
                    {/* Top highlight */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    
                    {/* Text */}
                    <span className="relative z-10 text-white font-bold tracking-wide flex items-center justify-center gap-2">
                      Nous Contacter
                      
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gradient Animation Keyframes */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </motion.nav>
  );
}