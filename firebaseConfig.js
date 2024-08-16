import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDINkRqEPz3ACEhFJ_diEWCSIxvyPjT-A",
  authDomain: "ahaz-pharma.firebaseapp.com",
  projectId: "ahaz-pharma",
  storageBucket: "ahaz-pharma.appspot.com",
  messagingSenderId: "727958215712",
  appId: "1:727958215712:web:ec9bda70624db760e37045",
  measurementId: "G-PYTYQCST69",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
