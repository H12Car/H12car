"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDown, Car, Bike } from "lucide-react";

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
  { href: "/transfer", label: "Transfert" },
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
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 xl:px-16"
      >
        <div
          className={`max-w-[1400px] mx-auto transition-all duration-500 ${
            scrolled ? "mt-2" : "mt-3"
          }`}
        >
          {/* Main Header Container - Dark Mode */}
          <div
            className={`relative rounded-[24px] transition-all duration-500 ${
              scrolled
                ? "bg-zinc-900/90 backdrop-blur-xl shadow-lg shadow-black/20 border border-zinc-800"
                : "bg-zinc-900/70 backdrop-blur-md border border-zinc-800/50"
            }`}
          >
            <div className="px-4 sm:px-5 py-4">
              <div className="flex items-center justify-between">
                {/* Logo + Company Name */}
                <Link href="/" className="flex items-center gap-3 relative z-10 group">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3"
                  >
                    {/* Logo Image */}
                    <div className="relative w-11 h-11 flex items-center justify-center rounded-full overflow-hidden border border-zinc-700/50">
                      <Image
                        src="/h12carlogo.png"
                        alt="H12 Car Logo"
                        width={44}
                        height={44}
                        className="object-cover w-full h-full"
                        priority
                      />
                    </div>
                    {/* Company Name */}
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-lg tracking-tight leading-none">
                        H12
                        <span className="text-blue-400 ml-0.5">Car</span>
                      </span>
                      <span className="text-zinc-500 text-[10px] font-medium tracking-wider uppercase">
                        Location
                      </span>
                    </div>
                  </motion.div>
                </Link>

                {/* Desktop Navigation - Centered Pill */}
                <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
                  <div className="relative flex items-center gap-0.5 p-1.5 rounded-full bg-zinc-800/80 border border-zinc-700/50 backdrop-blur-sm">
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
                                  ? "text-blue-400 font-semibold"
                                  : "text-zinc-400 hover:text-white"
                              }`}
                            >
                              <span className="relative z-10">{link.label}</span>
                              <ChevronDown className={`w-3 h-3 relative z-10 transition-transform duration-300 ${
                                hoveredDropdown === link.label ? "rotate-180 text-blue-400" : "text-zinc-500"
                              }`} />

                              {/* Hover underline effect */}
                              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-500 group-hover/nav:w-3/4 transition-all duration-300 rounded-full" />

                              {/* Subtle background on hover */}
                              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                                hoveredDropdown === link.label || link.dropdown?.some(item => activeLink === item.href)
                                  ? "bg-blue-500/20"
                                  : "group-hover/nav:bg-zinc-700/50"
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
                                  className="absolute top-full left-0 mt-2 min-w-[200px] rounded-[20px] overflow-hidden bg-zinc-900 backdrop-blur-xl border border-zinc-800 shadow-xl shadow-black/30 z-50"
                                >
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
                                              ? "bg-blue-500/20 text-blue-400"
                                              : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                                          }`}
                                        >
                                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                            activeLink === item.href
                                              ? "bg-blue-500/30"
                                              : "bg-zinc-800"
                                          }`}>
                                            <item.icon className={`w-4 h-4 ${
                                              activeLink === item.href
                                                ? "text-blue-400"
                                                : "text-zinc-500"
                                            }`} />
                                          </div>
                                          <span className="font-medium text-sm">{item.label}</span>
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
                                  ? "text-blue-400 font-semibold"
                                  : "text-zinc-400 hover:text-white"
                              }`}
                            >
                              {link.label}
                            </span>

                            {/* Hover underline effect */}
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-500 group-hover/nav:w-3/4 transition-all duration-300 rounded-full" />

                            {/* Subtle background on hover and active */}
                            <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                              activeLink === link.href
                                ? "bg-blue-500/20"
                                : "group-hover/nav:bg-zinc-700/50"
                            }`} />
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button - Right side */}
                <div className="hidden lg:flex items-center gap-4 relative z-10">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-5 py-2.5 rounded-full bg-blue-500 text-white font-semibold text-[13px] tracking-wide shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all duration-300"
                    >
                      Nous Contacter
                    </motion.button>
                  </Link>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle menu"
                >
                  <div className="flex flex-col gap-1.5 items-center justify-center">
                    <motion.span
                      animate={isOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                      className="w-5 h-[2px] bg-zinc-300 block rounded-full origin-center"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.span
                      animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                      className="w-5 h-[2px] bg-zinc-300 block rounded-full"
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      animate={isOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                      className="w-5 h-[2px] bg-zinc-300 block rounded-full origin-center"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Menu - Light dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden mt-2 overflow-hidden rounded-[24px] bg-zinc-900 backdrop-blur-xl border border-zinc-800 shadow-xl shadow-black/30"
              >
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
                                ? "bg-blue-500/20 text-blue-400"
                                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
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
                                <div className="ml-4 mt-2 pl-4 border-l-2 border-blue-500/30 flex flex-col gap-2">
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
                                            ? "bg-blue-500/20 text-blue-400"
                                            : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                                        }`}
                                      >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                          activeLink === item.href
                                            ? "bg-blue-500/30"
                                            : "bg-zinc-800"
                                        }`}>
                                          <item.icon className={`w-4 h-4 ${
                                            activeLink === item.href
                                              ? "text-blue-400"
                                              : "text-zinc-500"
                                          }`} />
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
                                ? "bg-blue-500/20 text-blue-400"
                                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
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
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-2 pt-2 border-t border-zinc-800"
                  >
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="block"
                    >
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3.5 rounded-xl bg-blue-500 text-white font-bold tracking-wide shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all duration-300"
                      >
                        Nous Contacter
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
}
