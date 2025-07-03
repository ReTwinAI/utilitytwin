// src/lib/firebase.ts
import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';

// IMPORTANT: Replace with your actual Firebase project configuration.
// You can find this in your Firebase project settings (Project settings > General > Your apps > Firebase SDK snippet > Config).
// It is highly recommended to use environment variables for these values:
// e.g., apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY
// Create a .env.local file in your project root for these variables.
export const firebaseConfig = {
  apiKey: "AIzaSyAj0tzW7juUXHOfiB0OFgWehC6lygE2OkE",
  authDomain: "utlanding-9ba15.firebaseapp.com",
  projectId: "utlanding-9ba15",
  storageBucket: "utlanding-9ba15.firebasestorage.app",
  messagingSenderId: "947938181275",
  appId: "1:947938181275:web:74934472122026d37cc63e",
  measurementId: "G-6FZY0KQSZ7"
};

let app: FirebaseApp;

try {
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_API_KEY") {
    console.warn(
      "Firebase is not configured. Please update firebaseConfig in src/lib/firebase.ts with your project details."
    );
    // Assign a dummy app or handle this state if config is missing,
    // to prevent errors if other Firebase services are used later.
    // For now, other parts of the app might try to use `app` which would be undefined.
  } else if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
} catch (e) {
  console.error("Firebase initialization error in src/lib/firebase.ts. Ensure your firebaseConfig is correct and complete.", e);
  // Handle the error appropriately in a real app
}

// @ts-ignore app might be uninitialized if config is missing
export { app };
