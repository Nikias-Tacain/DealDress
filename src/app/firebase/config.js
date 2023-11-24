import { getFirestore } from 'firebase/firestore';

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRZu2-vVF7E_5jAjTS8la9tqlapofky-4",
  authDomain: "dealdress-90f47.firebaseapp.com",
  projectId: "dealdress-90f47",
  storageBucket: "dealdress-90f47.appspot.com",
  messagingSenderId: "377143023164",
  appId: "1:377143023164:web:7647ff34278d9248ce1539"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);