
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getAnalytics, logEvent, isSupported, type Analytics } from 'firebase/analytics';
import { initializeApp, getApps, getApp } from '@/lib/firebase';

// This will hold the initialized analytics instance
let analyticsInstance: Analytics | null = null;
// This ensures initialization only happens once
let analyticsInitialized = false;

// Main component to track page views and handle initialization
export function FirebaseAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // This effect will run only once on the client-side after the component mounts
  useEffect(() => {
    if (analyticsInitialized) {
      return;
    }
    analyticsInitialized = true;

    const firebaseConfig = (window as any).__FIREBASE_CONFIG__;

    // Check if the config object or the API key is missing.
    if (!firebaseConfig || !firebaseConfig.apiKey) {
      console.warn(
`Firebase Analytics is disabled.
Reason: Firebase configuration is missing or incomplete.
Troubleshooting:
1. Ensure all NEXT_PUBLIC_FIREBASE_* variables are set in your Vercel project settings or .env.local file.
2. Restart your development server after making changes.`
      );
      return;
    }

    isSupported().then((supported) => {
      if (supported) {
        try {
            const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
            analyticsInstance = getAnalytics(app);
            console.log("FirebaseAnalytics: Analytics initialized successfully.");
        } catch (error) {
            console.error("FirebaseAnalytics: Error initializing analytics:", error);
        }
      } else {
        console.log("FirebaseAnalytics: Analytics is not supported in this browser environment.");
      }
    });
  }, []);

  // This effect tracks all page views after initialization
  useEffect(() => {
    const page_path = `${pathname}?${searchParams.toString()}`;
    // Use our helper to log page views so they also appear in the console.
    logAnalyticsEvent('page_view', {
        page_path: page_path,
        page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

// Helper function to log events from other components
export const logAnalyticsEvent = (eventName: string, eventParams?: { [key: string]: any }) => {
  // Log the event to the console for easier debugging
  console.log(`FirebaseAnalytics: Logging event '${eventName}'`, eventParams || {});
  
  if (analyticsInstance) {
    try {
        logEvent(analyticsInstance, eventName, eventParams);
    } catch(error) {
        console.error(`FirebaseAnalytics: Failed to log event: ${eventName}`, error);
    }
  }
};
