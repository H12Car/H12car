"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { blogArticles } from "./data";

export default function BlogPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-blue-400/5 blur-3xl" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                Blog
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
            >
              Nos Articles & Conseils
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-zinc-400 text-base lg:text-lg"
            >
              Guides pratiques, conseils de conduite et idees d&apos;excursions
              pour profiter au maximum de votre sejour a Marrakech.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogArticles.map((article, idx) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link href={`/blog/${article.slug}`} className="group block">
                  <div className="rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 h-full flex flex-col">
                    {/* Image placeholder */}
                    <div className="relative h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden">
                      <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-300" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[11px] font-semibold uppercase tracking-wider">
                          {article.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-zinc-800/80 border border-zinc-700 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-300">
                        <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-[12px] text-zinc-500 mb-3">
                        <span>
                          {new Date(article.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-zinc-600" />
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>

                      <h2 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {article.title}
                      </h2>

                      <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 flex-1">
                        {article.excerpt}
                      </p>

                      <div className="mt-4 pt-4 border-t border-zinc-800">
                        <span className="text-blue-400 text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                          Lire l&apos;article
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
