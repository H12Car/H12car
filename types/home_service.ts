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
      "Explorez Marrakech et ses environs avec notre flotte premium. Des berlines élégantes aux SUV puissants, trouvez le véhicule parfait pour votre séjour.",
    features: ["Tarification flexible", "Assurance complète", "Assistance 24h/24 et 7j/7"],
    color: "from-blue-500 to-blue-600",
    serviceType: "car",
  },
  {
    icon: Bike,
    title: "Location de motos",
    description:
      "Parcourez les routes de Marrakech en toute liberté avec notre collection de motos et scooters. L'aventure commence dès que vous prenez le guidon.",
    features: ["Derniers modèles", "Équipement de sécurité inclus", "Planification d'itinéraires"],
    color: "from-blue-400 to-blue-500",
    serviceType: "motorbike",
  },
  {
    icon: Map,
    title: "Excursions personnalisées",
    description:
      "Découvrez les trésors cachés de Marrakech et du Maroc avec nos excursions sur mesure. Atlas, désert, cascades - vivez des moments inoubliables.",
    features: ["Itinéraires sur mesure", "Expertise locale", "Aventures uniques"],
    color: "from-blue-500 to-blue-700",
    serviceType: "excursion",
  },
];
