
// src/components/layout/firebase-analytics.tsx
'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getAnalytics, logEvent as firebaseLogEvent, isSupported, type Analytics } from 'firebase/analytics';
import { app, firebaseConfig } from '@/lib/firebase'; // app is initialized here, firebaseConfig is used for check

let analyticsInstance: Analytics | null = null;

const PLACEHOLDER_API_KEY = "YOUR_API_KEY"; // Define placeholder constants
const PLACEHOLDER_MEASUREMENT_ID = "YOUR_MEASUREMENT_ID";

export function FirebaseAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialized = useRef(false); // To prevent multiple initializations

  useEffect(() => {
    console.log("FirebaseAnalytics: useEffect for initialization triggered.");

    if (initialized.current) {
      console.log("FirebaseAnalytics: Already initialized.");
      return;
    }

    if (!firebaseConfig.apiKey || firebaseConfig.apiKey === PLACEHOLDER_API_KEY || 
        !firebaseConfig.measurementId || firebaseConfig.measurementId === PLACEHOLDER_MEASUREMENT_ID) {
      console.warn(
        "FirebaseAnalytics: Firebase configuration in src/lib/firebase.ts appears to use placeholder values (YOUR_API_KEY or YOUR_MEASUREMENT_ID) or is missing key details. Please update it with your actual Firebase project configuration. Analytics will not be initialized."
      );
      return;
    }
    console.log("FirebaseAnalytics: Config check passed. API Key and Measurement ID seem to be set.");

    isSupported().then(supported => {
        if (supported) {
          if (app) {
            console.log("FirebaseAnalytics: Analytics is supported in this browser environment.");
            const instance = getAnalytics(app);
            analyticsInstance = instance;
            initialized.current = true;
            console.log("FirebaseAnalytics: Analytics initialized successfully.");

            // Log initial page view once analytics is initialized
            const pagePath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
            firebaseLogEvent(instance, 'page_view', {
              page_path: pagePath,
              page_location: window.location.href,
              page_title: document.title,
            });
            console.log(`FirebaseAnalytics: Initial page_view logged for: ${pagePath}`);
          } else {
             console.warn("FirebaseAnalytics: Firebase app instance (app) is NOT available. Analytics cannot be initialized. Check src/lib/firebase.ts.");
          }
        } else {
          console.log("FirebaseAnalytics: Analytics is NOT supported in this browser environment.");
        }
      }).catch(error => {
        console.error("FirebaseAnalytics: Error checking analytics support or initializing analytics:", error);
      });
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  useEffect(() => {
    if (analyticsInstance && initialized.current) {
      const pagePath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      // Log page_view event when pathname or searchParams change
      firebaseLogEvent(analyticsInstance, 'page_view', {
        page_path: pagePath,
        page_location: window.location.href,
        page_title: document.title,
      });
      console.log(`FirebaseAnalytics: Subsequent page_view logged for: ${pagePath}`);
    }
  }, [pathname, searchParams]);

  return null; // This component does not render anything
}

// Helper function to log events from other components
export const logAnalyticsEvent = (eventName: string, eventParams?: { [key: string]: any }) => {
  if (analyticsInstance) {
    firebaseLogEvent(analyticsInstance, eventName, eventParams);
    console.log(`FirebaseAnalytics: Custom event logged - Name: ${eventName}, Params:`, eventParams);
  } else {
    console.warn(`FirebaseAnalytics: Analytics not ready or not supported. Event NOT logged: ${eventName}`, eventParams);
  }
};
