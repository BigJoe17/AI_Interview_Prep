
import { initializeApp,getApp, getApps} from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDH920shjZSLx2j4fKFQFVJQp-9afsZuc8",
  authDomain: "prepai-fdd57.firebaseapp.com",
  projectId: "prepai-fdd57",
  storageBucket: "prepai-fdd57.firebasestorage.app",
  messagingSenderId: "860614014002",
  appId: "1:860614014002:web:1bb189677943988ea7f82b",
  measurementId: "G-FRRZ85G4JB"
};

// Initialize Firebase
const app = !getApps.length ?  initializeApp(firebaseConfig): getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);