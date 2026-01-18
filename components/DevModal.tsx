"use client";

import { useEffect, useState } from "react";
import { X, Code2, ArrowRight, Sparkles } from "lucide-react";

interface DevModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DevModal({ isOpen, onClose }: DevModalProps) {
  const [mounted, setMounted] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => setPulse(true), 500);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
      setPulse(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      <div
        className={`relative bg-[#fafafa] rounded-[20px] sm:rounded-[28px] max-w-[480px] w-full shadow-2xl transition-all duration-500 overflow-hidden ${
          mounted ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        <div className="h-1 sm:h-1.5 bg-gradient-to-r from-[#0097B2] via-[#004F52] to-[#0097B2] animate-pulse" />

        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 w-8 h-8 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center transition-colors duration-300 z-10"
        >
          <X size={16} className="text-black/50" />
        </button>

        <div className="p-6 sm:p-8 md:p-10">
          <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-black rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${pulse ? "shadow-lg shadow-[#0097B2]/30" : ""}`}>
              <Code2 size={20} className={`sm:w-6 sm:h-6 text-[#0097B2] transition-transform duration-500 ${pulse ? "scale-110" : ""}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[10px] sm:text-[11px] font-bold text-[#0097B2] uppercase tracking-[0.15em]">
                  Prototype
                </p>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#0097B2]/10 rounded-full">
                  <span className="w-1.5 h-1.5 bg-[#0097B2] rounded-full animate-pulse" />
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#0097B2]">LIVE</span>
                </span>
              </div>
              <h3 className="text-[18px] sm:text-[22px] font-bold text-black leading-tight">
                Version de démonstration
              </h3>
            </div>
          </div>

          <p className="text-[14px] sm:text-[15px] text-black/60 leading-relaxed mb-5 sm:mb-6">
            Vous consultez un prototype exclusif développé par notre équipe.
            Cette fonctionnalité sera activée dès votre validation.
          </p>

          <div className={`bg-gradient-to-br from-black to-[#1a1a1a] rounded-xl sm:rounded-2xl p-5 sm:p-6 mb-5 sm:mb-6 transition-all duration-700 ${pulse ? "shadow-xl shadow-black/20" : ""}`}>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Sparkles size={14} className="sm:w-4 sm:h-4 text-[#0097B2]" />
              <p className="text-[11px] sm:text-[12px] font-bold text-white/60 uppercase tracking-wider">
                Prêt pour la livraison
              </p>
            </div>
            <p className="text-[14px] sm:text-[15px] text-white/90 leading-relaxed mb-3 sm:mb-4">
              Dès votre confirmation, notre équipe finalisera l&apos;intégration
              complète du site avec toutes les fonctionnalités opérationnelles.
            </p>
            <div className="flex items-center gap-2 sm:gap-3 pt-3 border-t border-white/10">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#0097B2] rounded-full border-2 border-black flex items-center justify-center">
                  <span className="text-[9px] sm:text-[10px] font-bold text-white">D</span>
                </div>
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white rounded-full border-2 border-black flex items-center justify-center">
                  <span className="text-[9px] sm:text-[10px] font-bold text-black">M</span>
                </div>
              </div>
              <p className="text-[11px] sm:text-[12px] text-white/50">
                Équipe dédiée prête à démarrer
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#f0f0f0] rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-5 sm:mb-6 border border-black/5">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-black rounded-lg sm:rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-[12px] sm:text-[14px]">D</span>
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] text-black/40 uppercase tracking-wider font-semibold">
                  Développé par
                </p>
                <p className="text-[13px] sm:text-[14px] font-bold text-black">
                  DigitalMaroc
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] sm:text-[11px] text-black/40">Casablanca</p>
              <p className="text-[10px] sm:text-[11px] font-semibold text-[#0097B2]">Maroc</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`w-full py-3.5 sm:py-4 bg-[#0097B2] text-white text-[14px] sm:text-[15px] font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 group ${pulse ? "shadow-lg shadow-[#0097B2]/30" : ""} hover:bg-[#007a91]`}
          >
            Continuer la visite
            <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <p className="text-center text-[11px] sm:text-[12px] text-black/30 mt-3 sm:mt-4">
            Pour toute question, contactez notre Directeur Technique
          </p>
          <p className="text-center text-[9px] sm:text-[10px] text-black/20 mt-2">
            © 2025 DigitalMaroc. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}
