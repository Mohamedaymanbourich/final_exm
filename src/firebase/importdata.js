const firebase = require('firebase/app');
require('firebase/firestore');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCx9wPMGlQSsBnqnTF1mYYooVpa1jPR4vk",
    authDomain: "tp6-forum.firebaseapp.com",
    projectId: "tp6-forum",
    storageBucket: "tp6-forum.appspot.com",
    messagingSenderId: "988720251378",
    appId: "1:988720251378:web:d3b75fd10223088cbfab6b"
};

firebase.initializeApp(firebaseConfig);

// Access Firestore
const db = firebase.firestore();

// Data to add
const jobsData = [
          {
            "id": 1,
            "contenu": "Je recommande React pour sa grande communauté et ses nombreuses bibliothèques.",
            "dateCreation": "2023-05-13",
            "auteur": "user2",
            "discussionId": "1"
          },
          {
            "id": 2,
            "contenu": "Vue.js 3 est super, mais il a encore quelques bugs à résoudre.",
            "dateCreation": "2023-06-21",
            "auteur": "user3",
            "discussionId": "2"
          },
          {
            "id": 3,
            "contenu": "Assurez-vous d'utiliser Firestore Rules pour la sécurité.",
            "dateCreation": "2023-07-16",
            "auteur": "user4",
            "discussionId": "2"
          },
          {
            "id": 4,
            "contenu": "Commencez par lire la documentation officielle de Bootstrap-Vue.",
            "dateCreation": "2023-08-11",
            "auteur": "user5",
            "discussionId": "1"
          },
          {
            "id": 5,
            "contenu": "Suivez les tutoriels de Firebase pour une configuration facile.",
            "dateCreation": "2023-09-06",
            "auteur": "user6",
            "discussionId": "2"
          },
          {
            "id": 6,
            "contenu": "Utilisez des sous-dossiers pour organiser vos composants par fonctionnalité.",
            "dateCreation": "2023-10-02",
            "auteur": "user7",
            "discussionId": "1"
          },
          {
            "id": 7,
            "contenu": "Vérifiez vos configurations de sécurité et de cache.",
            "dateCreation": "2023-11-11",
            "auteur": "user8",
            "discussionId": "1"
          },
          {
            "id": 8,
            "contenu": "Bootstrap-Vue offre de nombreux composants prêts à l'emploi pour les formulaires.",
            "dateCreation": "2023-12-02",
            "auteur": "user9",
            "discussionId": "2"
          },
          {
            "id": 9,
            "contenu": "J'aime utiliser Webpack et Babel pour le développement front-end.",
            "dateCreation": "2024-01-06",
            "auteur": "user10",
            "discussionId": "2"
          }
];


// Function to add data to Firestore
const addJobsToFirestore = async (jobsData) => {
    try {
        // Loop through each job and add it to Firestore
        for (const job of jobsData) {
            // Use set with merge to add or update the document
            await db.collection('responses').doc(job.id.toString()).set(job, { merge: true });
        }
        console.log("Jobs added to Firestore successfully!");
    } catch (error) {
        console.error("Error adding jobs to Firestore: ", error);
    }
};

// Call the function to add jobs data to Firestore
addJobsToFirestore(jobsData);
