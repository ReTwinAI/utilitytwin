// src/lib/firebase.ts
import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';

// This configuration now reads from your .env.local file.
// Make sure that file is created and has the correct NEXT_PUBLIC_ variables.
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

function getFirebaseApp(): FirebaseApp | null {
  // Check if the essential configuration is provided before initializing
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.warn(
      "Firebase is not configured. Please ensure your .env.local file is set up with all the NEXT_PUBLIC_FIREBASE_ variables."
    );
    return null;
  }
  
  try {
    if (getApps().length === 0) {
      return initializeApp(firebaseConfig);
    } else {
      return getApp();
    }
  } catch (e) {
    console.error("Firebase initialization error in src/lib/firebase.ts. Ensure your firebaseConfig and environment variables are correct.", e);
    return null;
  }
}

const app = getFirebaseApp();

export { app };
