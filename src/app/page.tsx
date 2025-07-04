
'use client';

import { useState, useEffect } from 'react';
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { TeamSection } from "@/components/landing/team-section";
import { ContactUsSection } from "@/components/landing/contact-us-section";
import { FooterSection } from "@/components/landing/footer-section";
import { Navbar } from "@/components/layout/navbar";
import { LoadingScreen } from '@/components/layout/loading-screen';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simple timeout to simulate loading, more robust than listening for window.load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <Navbar />
        <HeroSection />
        <main>
          <FeaturesSection />
          <TestimonialsSection />
          <TeamSection />
          <ContactUsSection />
        </main>
        <FooterSection />
      </div>
    </>
  );
}
