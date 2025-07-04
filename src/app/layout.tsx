
import type {Metadata} from 'next';
import { Suspense } from 'react';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseAnalytics } from '@/components/layout/firebase-analytics';

export const metadata: Metadata = {
  title: 'Utility Twin – Smart Solution – Sustainable Impact',
  description: 'Landing page for Utility Twin project, showcasing smart solutions for sustainable impact.',
};

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    window.__FIREBASE_CONFIG__ = ${JSON.stringify(firebaseConfig)};
                `,
            }}
        />
      </head>
      <body className="font-body antialiased">
        <Suspense>
          <FirebaseAnalytics />
          {children}
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
