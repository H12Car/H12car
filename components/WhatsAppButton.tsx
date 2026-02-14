"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";


export default function WhatsAppButton() {
  const whatsappNumber = "+212614968594"; // Morocco number from footer
  const message = "Bonjour, je suis intéressé par vos services de location.";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] lg:hover:bg-[#20BD5A] text-white shadow-2xl flex items-center justify-center transition-all group"
      aria-label="Contact via WhatsApp"
    >
      <FaWhatsapp  className="w-8 h-8 lg:group-hover:scale-110 transition-transform" />

      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
    </motion.button>
  );
}
