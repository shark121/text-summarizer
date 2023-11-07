// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCP57UM0VFwFeduyOmhoj-cac9l94928gU",
  authDomain: "text-summarizer-01.firebaseapp.com",
  projectId: "text-summarizer-01",
  storageBucket: "text-summarizer-01.appspot.com",
  messagingSenderId: "430681734113",
  appId: "1:430681734113:web:f18afe7f5598aa039df0a0",
  measurementId: "G-DHV482SBSP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database =  getFirestore(app)
export const auth = getAuth(app)