const firebase = require('firebase/app');
require('firebase/firestore');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAdDTF0zqT4BaejWa3Fnp-0aGROPE2nGUg",
  authDomain: "exam-1f0ed.firebaseapp.com",
  projectId: "exam-1f0ed",
  storageBucket: "exam-1f0ed.appspot.com",
  messagingSenderId: "8537336134",
  appId: "1:8537336134:web:6b357f25c29556f7521d47",
  measurementId: "G-W51JHPY149"
};

firebase.initializeApp(firebaseConfig);

// Access Firestore
const db = firebase.firestore();

// Data to add
const recipesData = [
  {
    "nom": "Saumon Rôti aux Asperges Rôties",
    "description": "Un plat délicieux et nutritif, facile à préparer",
    "ingredients": [
      { "nom": "Filets de saumon", "quantité": 450, "unité": "g" },
      { "nom": "Asperges vertes", "quantité": 250, "unité": "g" },
      { "nom": "Huile d'olive", "quantité": "2 cuillères à soupe", "unité": "" },
      { "nom": "Sel et poivre", "quantité": "au goût", "unité": "" },
      { "nom": "Citron, en jus", "quantité": "1/2", "unité": "unité" }
    ],
    "instructions": [
      "Préchauffer le four à 200°C.",
      "Sécher les filets de saumon avec du papier absorbant et les assaisonner de sel, de poivre et d'herbes fraîches (facultatif).",
      "Disposer les filets de saumon sur une plaque de cuisson tapissée de papier sulfurisé.",
      "Laver et sécher les asperges vertes.",
      "Couper les extrémités dures des asperges et les enrober d'huile d'olive.",
      "Disposer les asperges autour des filets de saumon.",
      "Enfourner pendant 15-20 minutes, ou jusqu'à ce que le saumon soit cuit et que les asperges soient tendres.",
      "Servir immédiatement avec un jus de citron pressé."
    ],
    "temps_preparation": 10,
    "temps_cuisson": 20,
    "regime": "Omnivore",
    "portions": 2,
    "tags": ["facile", "rapide", "santé", "poisson"],
    "image": "https://example.com/baked_salmon_asparagus.jpg"
  },
  {
    "nom": "Pâtes Carbonara",
    "description": "Des pâtes crémeuses et savoureuses avec du bacon.",
    "ingredients": [
      { "nom": "Spaghetti", "quantité": 200, "unité": "g" },
      { "nom": "Lardons", "quantité": 100, "unité": "g" },
      { "nom": "Crème fraîche", "quantité": 100, "unité": "ml" },
      { "nom": "Parmesan râpé", "quantité": 50, "unité": "g" },
      { "nom": "Oeufs", "quantité": 2, "unité": "unité" },
      { "nom": "Sel et poivre", "quantité": "au goût", "unité": "" }
    ],
    "instructions": [
      "Faire cuire les pâtes dans de l'eau bouillante salée.",
      "Faire revenir les lardons dans une poêle jusqu'à ce qu'ils soient croustillants.",
      "Battre les oeufs avec la crème et le parmesan dans un bol.",
      "Égoutter les pâtes et les ajouter aux lardons.",
      "Retirer du feu et incorporer le mélange œufs-crème.",
      "Assaisonner avec du sel et du poivre, puis servir immédiatement."
    ],
    "temps_preparation": 10,
    "temps_cuisson": 15,
    "regime": "Omnivore",
    "portions": 2,
    "tags": ["italien", "classique", "pâtes"],
    "image": "https://example.com/pasta_carbonara.jpg"
  },
  {
    "nom": "Curry de Légumes",
    "description": "Un curry de légumes épicé et savoureux.",
    "ingredients": [
      { "nom": "Pommes de terre", "quantité": 300, "unité": "g" },
      { "nom": "Carottes", "quantité": 200, "unité": "g" },
      { "nom": "Poivrons", "quantité": 150, "unité": "g" },
      { "nom": "Oignons", "quantité": 100, "unité": "g" },
      { "nom": "Lait de coco", "quantité": 400, "unité": "ml" },
      { "nom": "Pâte de curry", "quantité": "2 cuillères à soupe", "unité": "" },
      { "nom": "Coriandre fraîche", "quantité": "pour garnir", "unité": "" }
    ],
    "instructions": [
      "Éplucher et couper les pommes de terre, les carottes et les oignons en morceaux.",
      "Couper les poivrons en lanières.",
      "Faire revenir les oignons dans une grande casserole.",
      "Ajouter la pâte de curry et faire revenir pendant 2 minutes.",
      "Ajouter les légumes et le lait de coco.",
      "Laisser mijoter à feu doux pendant 25 minutes ou jusqu'à ce que les légumes soient tendres.",
      "Servir avec du riz et garnir de coriandre fraîche."
    ],
    "temps_preparation": 15,
    "temps_cuisson": 25,
    "regime": "Vegan",
    "portions": 4,
    "tags": ["vegan", "curry", "épices"],
    "image": "https://example.com/vegetable_curry.jpg"
  },
  {
    "nom": "Tarte aux Pommes",
    "description": "Une tarte aux pommes classique avec une pâte feuilletée.",
    "ingredients": [
      { "nom": "Pommes", "quantité": 500, "unité": "g" },
      { "nom": "Pâte feuilletée", "quantité": 1, "unité": "rouleau" },
      { "nom": "Sucre", "quantité": 100, "unité": "g" },
      { "nom": "Beurre", "quantité": 50, "unité": "g" },
      { "nom": "Cannelle", "quantité": "1 cuillère à café", "unité": "" }
    ],
    "instructions": [
      "Préchauffer le four à 180°C.",
      "Éplucher et trancher les pommes.",
      "Dérouler la pâte feuilletée dans un moule à tarte.",
      "Disposer les tranches de pommes en spirale sur la pâte.",
      "Saupoudrer de sucre et de cannelle.",
      "Parsemer de beurre en morceaux.",
      "Cuire au four pendant 30-35 minutes jusqu'à ce que la tarte soit dorée.",
      "Laisser refroidir avant de servir."
    ],
    "temps_preparation": 15,
    "temps_cuisson": 35,
    "regime": "Végétarien",
    "portions": 6,
    "tags": ["dessert", "pomme", "tarte"],
    "image": "https://example.com/apple_tart.jpg"
  },
  {
    "nom": "Salade César",
    "description": "Une salade classique avec des croûtons, du parmesan et une sauce crémeuse.",
    "ingredients": [
      { "nom": "Laitue romaine", "quantité": 200, "unité": "g" },
      { "nom": "Croûtons", "quantité": 100, "unité": "g" },
      { "nom": "Parmesan", "quantité": 50, "unité": "g" },
      { "nom": "Filets d'anchois", "quantité": 4, "unité": "unité" },
      { "nom": "Sauce César", "quantité": "100 ml", "unité": "" }
    ],
    "instructions": [
      "Laver et couper la laitue romaine.",
      "Ajouter les croûtons et le parmesan.",
      "Ajouter les filets d'anchois et la sauce César.",
      "Mélanger et servir immédiatement."
    ],
    "temps_preparation": 10,
    "temps_cuisson": 0,
    "regime": "Omnivore",
    "portions": 2,
    "tags": ["salade", "classique", "rapide"],
    "image": "https://example.com/caesar_salad.jpg"
  }
];

// Function to add data to Firestore
const uploadData = async () => {
  try {
    // Upload recipes
    for (const recipe of recipesData) {
      await db.collection('recipes').add(recipe);
    }

    console.log('Recipes upload completed');
  } catch (error) {
    console.error('Error uploading recipes: ', error);
  }
};

uploadData().catch(console.error);
