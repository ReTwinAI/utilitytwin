
import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function getFirebaseApp(): FirebaseApp | null {
    if (typeof window === 'undefined') {
        // Return null on the server to avoid running Firebase admin-only code
        return null; 
    }
    
    // Check if all required client-side env vars are present
    const requiredEnvVars = [
        'NEXT_PUBLIC_FIREBASE_API_KEY',
        'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
        'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
        'NEXT_PUBLIC_FIREBASE_APP_ID',
    ];
    
    const missingVar = requiredEnvVars.find(key => !process.env[key]);
    if (missingVar) {
        console.error(`Firebase init error: Missing environment variable ${missingVar}`);
        return null;
    }

    try {
        return getApps().length ? getApp() : initializeApp(firebaseConfig);
    } catch (error) {
        console.error("Firebase initialization failed:", error);
        return null;
    }
}

export const app = getFirebaseApp();
