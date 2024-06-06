import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAdDTF0zqT4BaejWa3Fnp-0aGROPE2nGUg",
  authDomain: "exam-1f0ed.firebaseapp.com",
  projectId: "exam-1f0ed",
  storageBucket: "exam-1f0ed.appspot.com",
  messagingSenderId: "8537336134",
  appId: "1:8537336134:web:6b357f25c29556f7521d47",
  measurementId: "G-W51JHPY149"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firestore database instance
const db = firebase.firestore();

// Authentication instance
const projectAuth = firebase.auth();

// Google authentication provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Export the instances for use in other parts of the application
export { db, projectAuth, googleProvider };
