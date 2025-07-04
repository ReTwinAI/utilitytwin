
import type {Metadata} from 'next';
import { Suspense } from 'react';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseAnalytics } from '@/components/layout/firebase-analytics';
import { getFirebaseApp } from "@/lib/firebase";

export const metadata: Metadata = {
  title: 'Utility Twin – Smart Solution – Sustainable Impact',
  description: 'Landing page for Utility Twin project, showcasing smart solutions for sustainable impact.',
};

export default function FirebaseInitWrapper() {
  useEffect(() => {
    const app = getFirebaseApp();
    console.log("Firebase initialized on client:", app?.name);
  }, []);

  return null;
}

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
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <Suspense fallback={null}>
          <FirebaseAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
