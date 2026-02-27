"use client";

import { motion } from "framer-motion";
import { ChevronDown, HelpCircle, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Script from "next/script";

const faqs = [
  {
    category: "Réservation & Documents",
    questions: [
      {
        q: "Quels documents sont nécessaires pour louer une voiture?",
        a: "Pour louer un véhicule chez H12 Car, vous devez fournir : un permis de conduire valide (national ou international), une pièce d'identité (passeport ou carte d'identité), et une carte bancaire pour la caution. L'âge minimum est de 21 ans avec au moins 1 an de permis."
      },
      {
        q: "Puis-je conduire au Maroc avec un permis français ou européen?",
        a: "Oui, les permis français et européens sont acceptés au Maroc pour les courts séjours touristiques (moins de 1 an). Pour plus d'informations sur les réglementations, consultez les recommandations officielles du gouvernement français."
      },
      {
        q: "Comment annuler ou modifier ma réservation?",
        a: "Vous pouvez annuler ou modifier votre réservation gratuitement jusqu'à 24h avant la date de prise en charge. Contactez-nous par WhatsApp au +212 614 968 594 ou par email à contact@h12car.com."
      },
      {
        q: "Acceptez-vous les réservations de dernière minute?",
        a: "Oui, nous acceptons les réservations de dernière minute sous réserve de disponibilité. Contactez-nous directement par WhatsApp pour une confirmation immédiate."
      }
    ]
  },
  {
    category: "Tarifs & Assurance",
    questions: [
      {
        q: "Le kilométrage est-il vraiment illimité?",
        a: "Oui, absolument! Tous nos véhicules sont loués avec kilométrage 100% illimité sans frais supplémentaires. Vous pouvez explorer le Maroc sans aucune restriction de distance."
      },
      {
        q: "L'assurance est-elle incluse dans le prix?",
        a: "Oui, une assurance complète est incluse dans tous nos tarifs. Elle couvre les dommages au véhicule, le vol, et la responsabilité civile selon les normes marocaines établies par l'ACAPS (Autorité de Contrôle des Assurances et de la Prévoyance Sociale)."
      },
      {
        q: "Y a-t-il des frais cachés?",
        a: "Non, nos prix sont tout compris : kilométrage illimité, assurance complète, livraison gratuite à Marrakech. La seule variable est le carburant qui est à votre charge (véhicule livré plein, à retourner plein)."
      },
      {
        q: "Comment fonctionne la caution?",
        a: "Une empreinte bancaire (sans débit) est effectuée lors de la prise en charge. Le montant varie selon le véhicule (généralement 3000-5000 MAD). La caution est libérée immédiatement au retour du véhicule en bon état."
      },
      {
        q: "Proposez-vous des réductions pour locations longue durée?",
        a: "Oui, nous offrons des tarifs dégressifs pour les locations de 7 jours ou plus. Contactez-nous pour un devis personnalisé adapté à vos besoins."
      }
    ]
  },
  {
    category: "Livraison & Retour",
    questions: [
      {
        q: "Livrez-vous à l'aéroport de Marrakech Menara?",
        a: "Oui, nous offrons un service de livraison et récupération gratuit à l'aéroport Marrakech Menara. Un membre de notre équipe vous attendra avec le véhicule prêt à partir, vous faisant gagner un temps précieux."
      },
      {
        q: "Quels sont les horaires de location et de retour?",
        a: "Nous sommes disponibles 24h/24 et 7j/7 pour répondre à vos besoins. Les livraisons et retours peuvent être organisés à n'importe quelle heure, même la nuit ou lors des jours fériés."
      },
      {
        q: "Puis-je récupérer à Marrakech et déposer à Casablanca?",
        a: "Oui, nous proposons des locations one-way entre Marrakech et d'autres villes marocaines. Des frais supplémentaires s'appliquent selon la destination. Contactez-nous pour plus de détails."
      }
    ]
  },
  {
    category: "Véhicules & Options",
    questions: [
      {
        q: "Les sièges bébé sont-ils disponibles?",
        a: "Oui, nous fournissons des sièges auto pour enfants gratuitement sur demande (bébé, rehausseur). Merci de nous le préciser lors de votre réservation pour garantir la disponibilité."
      },
      {
        q: "GPS est-il inclus ou en option?",
        a: "Un GPS peut être fourni gratuitement sur demande. Cependant, la plupart de nos clients utilisent Google Maps sur leur smartphone, qui fonctionne parfaitement au Maroc."
      },
      {
        q: "Le carburant est-il inclus?",
        a: "Le véhicule vous est livré avec le réservoir plein. Vous devez le retourner plein également (politique Full-to-Full). C'est la formule la plus économique et transparente."
      },
      {
        q: "Puis-je ajouter un conducteur supplémentaire?",
        a: "Oui, vous pouvez ajouter un conducteur supplémentaire gratuitement. Il doit présenter les mêmes documents (permis, identité) et être présent lors de la prise en charge."
      }
    ]
  },
  {
    category: "Sécurité & Assistance",
    questions: [
      {
        q: "Que faire en cas d'accident ou de panne?",
        a: "Contactez-nous immédiatement par téléphone (+212 614 968 594). Nous sommes disponibles 24/7 et interviendrons rapidement. Ne quittez pas les lieux de l'accident et établissez un constat amiable si possible."
      },
      {
        q: "Puis-je traverser les frontières vers l'Espagne?",
        a: "Les passages transfrontaliers ne sont généralement pas autorisés avec nos véhicules de location. Si vous avez ce besoin spécifique, contactez-nous en amont pour étudier les possibilités."
      },
      {
        q: "Vos véhicules sont-ils régulièrement entretenus?",
        a: "Oui, tous nos véhicules font l'objet d'un entretien rigoureux selon les standards européens. Chaque voiture est inspectée avant et après chaque location pour garantir votre sécurité."
      }
    ]
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.flatMap(category => 
    category.questions.map(faq => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  )
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://h12car.com"
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "FAQ",
      item: "https://h12car.com/faq"
    }
  ]
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFaq = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-zinc-800 min-h-screen">
      
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6">
              <HelpCircle className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">Questions Fréquentes</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              Foire Aux <span className="text-blue-500">Questions</span>
            </h1>

            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Trouvez les réponses à toutes vos questions sur la location de voiture et moto à Marrakech avec H12 Car
            </p>
          </motion.div>

          {faqs.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <span className="text-blue-400 font-bold">{catIndex + 1}</span>
                </div>
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => {
                  const faqId = `${catIndex}-${qIndex}`;
                  const isOpen = openIndex === faqId;

                  return (
                    <div
                      key={qIndex}
                      className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(faqId)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-zinc-800/50 transition-colors duration-200"
                        aria-expanded={isOpen}
                      >
                        <h3 className="text-lg font-semibold text-white pr-8">
                          {faq.q}
                        </h3>
                        <ChevronDown
                          className={`w-5 h-5 text-blue-400 flex-shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-5"
                        >
                          <p className="text-zinc-400 leading-relaxed border-t border-zinc-800 pt-5">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Vous ne trouvez pas la réponse à votre question?
            </h2>
            <p className="text-zinc-400 mb-6">
              Notre équipe est disponible 24h/24 et 7j/7 pour répondre à toutes vos questions
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/212614968594"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                WhatsApp: +212 614 968 594
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold hover:bg-zinc-700 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                Formulaire de Contact
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-zinc-500 text-sm">
              Liens utiles:{" "}
              <a
                href="https://www.diplomatie.gouv.fr/fr/services-aux-francais"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Permis international
              </a>
              {" • "}
              <a
                href="https://www.acaps.ma"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Normes assurance Maroc
              </a>
              {" • "}
              <a
                href="https://www.gov.uk/foreign-travel-advice/morocco/safety-and-security"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Sécurité routière Maroc
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}