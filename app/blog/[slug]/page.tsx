"use client";

import { motion } from "framer-motion";
import {
  Clock,
  ArrowLeft,
  BookOpen,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { blogArticles } from "../data";

export default function BlogArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="bg-zinc-950 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Article introuvable
          </h1>
          <Link
            href="/blog"
            className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  // Get other articles for "Read more"
  const otherArticles = blogArticles
    .filter((a) => a.slug !== slug)
    .slice(0, 2);

  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-blue-400/5 blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-6 sm:px-8 relative z-10">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-blue-400 transition-colors text-sm font-medium mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Link>
          </motion.div>

          {/* Category + Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-5"
          >
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-semibold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-zinc-500 text-[12px]">
              <Calendar className="w-3 h-3" />
              {new Date(article.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5 text-zinc-500 text-[12px]">
              <Clock className="w-3 h-3" />
              {article.readTime} de lecture
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white mb-6 tracking-tight leading-tight"
          >
            {article.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 text-lg leading-relaxed"
          >
            {article.excerpt}
          </motion.p>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {article.content.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-zinc-300 text-base leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 p-6 rounded-2xl bg-zinc-900 border border-zinc-800"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Pret a explorer Marrakech ?
                </h3>
                <p className="text-zinc-400 text-sm">
                  Reservez votre vehicule et partez a l&apos;aventure.
                </p>
              </div>
              <Link href="/voiture">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-full bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  Voir nos vehicules
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Read More */}
      {otherArticles.length > 0 && (
        <section className="pb-20 lg:pb-28">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
            <div className="border-t border-zinc-800 pt-12">
              <div className="flex items-center gap-2 mb-8">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-bold text-white">
                  Autres articles
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherArticles.map((other, idx) => (
                  <motion.div
                    key={other.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <Link
                      href={`/blog/${other.slug}`}
                      className="group block"
                    >
                      <div className="rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 p-5">
                        <div className="flex items-center gap-3 text-[12px] text-zinc-500 mb-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-semibold uppercase tracking-wider">
                            {other.category}
                          </span>
                          <span>{other.readTime}</span>
                        </div>
                        <h3 className="text-white font-bold text-base mb-2 group-hover:text-blue-400 transition-colors">
                          {other.title}
                        </h3>
                        <p className="text-zinc-400 text-sm line-clamp-2">
                          {other.excerpt}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
