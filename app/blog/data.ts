export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "guide-location-voiture-marrakech",
    title: "Guide Complet : Louer une Voiture a Marrakech",
    excerpt:
      "Tout ce que vous devez savoir pour louer une voiture a Marrakech : documents, conseils de conduite, itineraires et astuces pour profiter au maximum de votre sejour.",
    content: [
      "Marrakech, la ville rouge du Maroc, attire chaque annee des millions de visiteurs du monde entier. Pour explorer cette cite fascinante et ses environs, la location de voiture reste le moyen le plus pratique et flexible. Voici notre guide complet pour vous aider a preparer votre location.",

      "Documents necessaires : Pour louer un vehicule a Marrakech, vous aurez besoin d'un permis de conduire valide (national ou international), d'une piece d'identite (passeport ou carte d'identite) et d'une carte bancaire pour la caution. L'age minimum requis est de 21 ans avec au moins un an de permis.",

      "Conseils de conduite : La conduite a Marrakech peut etre differente de ce que vous connaissez en Europe. Les ronds-points sont frequents, et la priorite a droite n'est pas toujours respectee. Soyez vigilant dans la medina ou les ruelles sont etroites. En dehors de la ville, les routes sont generalement en bon etat, surtout les autoroutes reliant Marrakech a Essaouira, Ouarzazate et Casablanca.",

      "Les meilleurs itineraires : Depuis Marrakech, plusieurs routes panoramiques s'offrent a vous. La route du Tizi n'Tichka vers Ouarzazate traverse l'Atlas et offre des paysages spectaculaires. La route vers Essaouira longe des champs d'arganiers. Et la vallee de l'Ourika, a seulement 45 minutes, est parfaite pour une excursion d'une journee.",

      "Pourquoi choisir H12 Car ? Chez H12 Car, nous proposons une flotte de vehicules premium entretenus avec soin. Livraison gratuite a l'aeroport, kilométrage illimite, et assistance 24/7. Notre equipe locale connait parfaitement la region et peut vous conseiller les meilleurs itineraires selon vos envies.",
    ],
    date: "2025-12-15",
    readTime: "5 min",
    category: "Guide",
    image: "/blog-guide-marrakech.jpg",
  },
  {
    slug: "top-excursions-depart-marrakech",
    title: "Top 5 des Excursions au Depart de Marrakech",
    excerpt:
      "Decouvrez les excursions incontournables depuis Marrakech : cascades d'Ouzoud, desert d'Agafay, vallee de l'Ourika, Essaouira et bien plus encore.",
    content: [
      "Marrakech est un point de depart ideal pour decouvrir la diversite du Maroc. Entre montagnes, desert, cascades et ocean, les excursions possibles sont nombreuses et variees. Voici notre selection des 5 meilleures excursions a faire depuis la ville rouge.",

      "1. Les Cascades d'Ouzoud : Situees a environ 2h30 de route, les cascades d'Ouzoud sont les plus impressionnantes du Maroc avec leurs 110 metres de hauteur. Vous pourrez y observer des singes magots en liberte et profiter de baignades rafraichissantes au pied des chutes. Prevoyez une journee complete pour cette excursion.",

      "2. Le Desert d'Agafay : A seulement 45 minutes de Marrakech, le desert d'Agafay offre une experience saharienne sans les longues heures de route. Dunes de pierre, couchers de soleil spectaculaires et possibilite de passer une nuit en bivouac sous les etoiles. Ideal pour une demi-journee ou une nuit.",

      "3. La Vallee de l'Ourika : Nichee dans le Haut Atlas, cette vallee verdoyante est accessible en 45 minutes. Randonnees le long de la riviere, visite de villages berberes traditionnels, et decouverte de cooperatives d'huile d'argan. Un depaysement total aux portes de Marrakech.",

      "4. Essaouira : La cite des alizees se trouve a 2h30 de route a travers des forets d'arganiers. Medina classee UNESCO, port de peche pittoresque, plages de sable fin et ambiance boheme. Une excursion parfaite pour une journee ou un week-end.",

      "5. La Route du Tizi n'Tichka : Ce col de montagne a 2260m d'altitude offre l'une des routes les plus spectaculaires du Maroc. Direction Ouarzazate et les studios de cinema, la route traverse des paysages a couper le souffle avec des villages accroches a flanc de montagne.",
    ],
    date: "2025-11-28",
    readTime: "7 min",
    category: "Excursions",
    image: "/blog-excursions.jpg",
  },
  {
    slug: "conseils-conduire-maroc",
    title: "10 Conseils pour Conduire au Maroc en Toute Securite",
    excerpt:
      "Nos meilleurs conseils pratiques pour conduire au Maroc : code de la route, peages, stations essence, et tout ce qu'il faut savoir avant de prendre le volant.",
    content: [
      "Conduire au Maroc peut sembler intimidant au premier abord, mais avec les bons conseils, votre experience sera agreable et sans souci. Voici nos 10 recommandations essentielles pour rouler en toute securite.",

      "1. Respectez les limitations de vitesse : 60 km/h en ville, 100 km/h sur route nationale, 120 km/h sur autoroute. Les radars sont frequents et les amendes immediates. Soyez particulierement vigilant dans les zones de 40 km/h aux abords des villages.",

      "2. Mefiance aux ronds-points : La priorite dans les ronds-points n'est pas toujours respectee. Approchez lentement et assurez-vous que la voie est libre avant de vous engager. L'usage du clignotant est recommande mais rarement pratique par les locaux.",

      "3. Conduite de nuit : Evitez de conduire la nuit en dehors des villes. Les routes ne sont pas toujours eclairees, les pietons et les animaux peuvent surgir a tout moment, et certains vehicules roulent sans eclairage. Si vous devez conduire la nuit, redoublez de prudence.",

      "4. Stations essence : Faites le plein regulierement, surtout si vous vous aventurez dans les zones rurales ou le Haut Atlas. Les stations sont frequentes sur les grands axes mais peuvent etre espacees dans les regions reculees. La plupart acceptent les cartes bancaires.",

      "5. Peages autoroutiers : Le reseau autoroutier marocain est moderne et bien entretenu. Les peages se paient en dirhams (especes) ou par carte. Le trajet Marrakech-Casablanca coute environ 150 MAD. Gardez toujours de la monnaie sur vous.",

      "6. GPS et navigation : Utilisez Google Maps ou Waze, ils fonctionnent tres bien au Maroc. Telecharger les cartes hors-ligne est recommande pour les zones montagneuses ou le reseau peut etre instable.",

      "7. Stationnement : En ville, privilegiez les parkings gardes (environ 5-10 MAD/heure). Des gardiens de parking informels vous guideront souvent — un pourboire de 5-10 MAD est apprecie. Ne laissez jamais d'objets de valeur visibles dans le vehicule.",

      "8. En cas d'accident : Gardez votre calme, ne deplacez pas les vehicules et appelez la police (19) ou la gendarmerie (177). Prenez des photos et echangez les coordonnees avec l'autre conducteur. Contactez immediatement votre agence de location.",

      "9. Assurance : Verifiez toujours que votre contrat de location inclut une assurance tous risques. Chez H12 Car, tous nos vehicules sont assures avec une couverture complete pour votre tranquillite d'esprit.",
    ],
    date: "2025-10-10",
    readTime: "6 min",
    category: "Conseils",
    image: "/blog-conduite-maroc.jpg",
  },
];
