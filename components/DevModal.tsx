"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight, Code2 } from "lucide-react";

interface DevModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DevModal({ isOpen, onClose }: DevModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 30, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative w-full max-w-[520px] rounded-3xl overflow-hidden 
                       bg-gradient-to-b from-white/[0.08] to-white/[0.03]
                       backdrop-blur-2xl border border-white/10 shadow-2xl"
          >
            {/* Accent Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-fuchsia-600/5 to-purple-600/10 pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full 
                         bg-white/10 hover:bg-white/20 transition
                         flex items-center justify-center z-10"
            >
              <X className="w-4 h-4 text-white/70" />
            </button>

            {/* Content */}
            <div className="relative p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Code2 className="w-6 h-6 text-white" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-semibold tracking-widest uppercase text-purple-400">
                      Prototype
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold text-purple-400">
                        LIVE
                      </span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                    Version de démonstration
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/60 text-[15px] leading-relaxed mb-6">
                Vous explorez actuellement une version prototype exclusive.
                Certaines fonctionnalités seront pleinement activées après
                validation finale.
              </p>

              {/* Highlight Card */}
              <div className="rounded-2xl p-5 mb-6 
                              bg-gradient-to-br from-black/40 to-black/20 
                              border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-purple-400">
                    Prêt pour la livraison
                  </span>
                </div>

                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  Une fois validé, notre équipe activera l’ensemble des
                  fonctionnalités et procédera à l’intégration complète.
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-purple-600 border-2 border-black flex items-center justify-center text-xs font-bold text-white">
                      D
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white border-2 border-black flex items-center justify-center text-xs font-bold text-black">
                      M
                    </div>
                  </div>
                  <span className="text-xs text-white/50">
                    Équipe dédiée prête à intervenir
                  </span>
                </div>
              </div>

              {/* Footer Info */}
              <div className="flex items-center justify-between rounded-xl p-4 mb-6 
                              bg-white/[0.03] border border-white/10">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/40">
                    Développé par
                  </p>
                  <p className="text-sm font-bold text-white">
                    DigitalMaroc
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/40">Casablanca</p>
                  <p className="text-xs font-semibold text-purple-400">
                    Maroc
                  </p>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={onClose}
                className="w-full py-4 rounded-full 
                           bg-gradient-to-r from-purple-600 to-fuchsia-600 
                           text-white font-semibold text-[15px]
                           flex items-center justify-center gap-2
                           shadow-lg shadow-purple-500/30
                           hover:shadow-xl hover:shadow-purple-500/40
                           transition-all duration-300"
              >
                Continuer la visite
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Legal */}
              <p className="text-center text-[11px] text-white/30 mt-4">
                © 2025 DigitalMaroc. Tous droits réservés.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
