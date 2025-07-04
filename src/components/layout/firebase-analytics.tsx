
'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getAnalytics, logEvent, isSupported, type Analytics } from 'firebase/analytics';
import { app } from '@/lib/firebase';

let analyticsInstance: Analytics | null = null;

function initializeAnalytics() {
    if (analyticsInstance || typeof window === 'undefined') {
        return;
    }

    isSupported().then((supported) => {
        if (supported && app) {
            console.log("FirebaseAnalytics: Analytics is supported and app is available.");
            try {
                const instance = getAnalytics(app);
                analyticsInstance = instance;
                console.log("FirebaseAnalytics: Analytics initialized successfully.");
            } catch (error) {
                console.error("FirebaseAnalytics: Error initializing analytics:", error);
            }
        } else {
            console.log("FirebaseAnalytics: Analytics is not supported in this browser environment or app is null.");
        }
    });
}

// Initialize on first load
initializeAnalytics();

// Main component to track page views
export function FirebaseAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialized = useRef(false);

  useEffect(() => {
    // This effect ensures we only try to log after the first render on the client
    // and when analytics has had a chance to initialize.
    if (!initialized.current) {
        initialized.current = true;
        // The first page view is logged here after initialization.
        if (analyticsInstance) {
            logEvent(analyticsInstance, 'page_view', {
                page_path: `${pathname}?${searchParams.toString()}`,
                page_title: document.title,
            });
            console.log(`Logged page_view for: ${pathname}`);
        }
    } else {
        // Subsequent page views are logged here on path changes.
        if (analyticsInstance) {
             logEvent(analyticsInstance, 'page_view', {
                page_path: `${pathname}?${searchParams.toString()}`,
                page_title: document.title,
            });
            console.log(`Logged page_view for: ${pathname}`);
        }
    }
  }, [pathname, searchParams]);

  return null;
}

// Helper function to log events from other components
export const logAnalyticsEvent = (eventName: string, eventParams?: { [key: string]: any }) => {
  if (analyticsInstance) {
    try {
        logEvent(analyticsInstance, eventName, eventParams);
        console.log(`Analytics event logged: ${eventName}`, eventParams);
    } catch(error) {
        console.error(`Failed to log analytics event: ${eventName}`, error);
    }
  } else {
    console.log(`Analytics not initialized. Event not logged: ${eventName}`, eventParams);
  }
};
