import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnKfVx_5znUrflUisMxCAT-251pOEu0WQ",
  authDomain: "sparknova-56ba9.firebaseapp.com",
  projectId: "sparknova-56ba9",
  storageBucket: "sparknova-56ba9.firebasestorage.app",
  messagingSenderId: "735633464015",
  appId: "1:735633464015:web:d38d474be04daccc6475ba",
  measurementId: "G-L375YQMDY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
