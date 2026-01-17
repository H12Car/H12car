import { Car, Bike, Map } from "lucide-react";

export interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  color: string;
  serviceType: "car" | "motorbike" | "excursion";
}

export const services: Service[] = [
  {
    icon: Car,
    title: "Location de voitures",
    description:
      "Découvrez le luxe sur roues avec notre flotte soigneusement sélectionnée de véhicules haut de gamme. Des berlines élégantes aux SUV puissants.",
    features: ["Tarification flexible", "Assurance complète", "Assistance 24h/24 et 7j/7"],
    color: "from-purple-500 to-fuchsia-500",
    serviceType: "car",
  },
  {
    icon: Bike,
    title: "Location de motos",
    description:
      "Ressentez le frisson de la route avec notre collection de motos et scooters haute performance.",
    features: ["Derniers modèles", "Équipement de sécurité inclus", "Planification d’itinéraires"],
    color: "from-fuchsia-500 to-pink-500",
    serviceType: "motorbike",
  },
  {
    icon: Map,
    title: "Excursions personnalisées",
    description:
      "Découvrez des lieux cachés grâce à nos visites guidées par des experts, adaptées à vos centres d’intérêt et à votre rythme.",
    features: ["Itinéraires sur mesure", "Expertise locale", "Aventures uniques"],
    color: "from-indigo-500 to-purple-500",
    serviceType: "excursion",
  },
];
