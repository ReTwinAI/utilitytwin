
'use client';

import { Button } from "@/components/ui/button";
import { logAnalyticsEvent } from '@/components/layout/firebase-analytics';
import { ParallaxShowcase } from './parallax-showcase';

export function HeroSection() {
  const slogan = "Smart Solution – Sustainable Impact";

  return (
    <section 
      id="hero" 
      className="bg-gradient-to-b from-background to-secondary/30 dark:from-background dark:to-secondary/20"
    >
      {/* Scene 1: Centered slogan. Takes full screen height and centers content. */}
      <div className="relative flex h-screen min-h-[700px] w-full items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
                <h1 className="font-headline text-4xl md:text-6xl font-bold mb-8 flex min-h-[80px] items-center justify-center md:min-h-[70px]">
                  {slogan}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-10">
                  Leveraging digital twin technology and AI to optimize utility networks, enhance collaboration, and drive resource efficiency for a greener future.
                </p>
                <div className="space-x-4">
                  <Button 
                    size="lg" 
                    className="font-semibold text-base px-8 py-6"
                    onClick={() => {
                      logAnalyticsEvent('select_content', { 
                        content_type: 'button_click', 
                        item_id: 'learn_more_hero',
                        item_name: 'Learn More Hero'
                      });
                      const targetElement = document.getElementById('features');
                      if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Learn More
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="font-semibold text-base px-8 py-6"
                    onClick={() => {
                      logAnalyticsEvent('select_content', { 
                        content_type: 'button_click', 
                        item_id: 'get_started_hero',
                        item_name: 'Get Started Hero'
                      });
                      const targetElement = document.getElementById('contact'); 
                      if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Get Started
                  </Button>
                </div>
            </div>
        </div>
      </div>
      
      {/* Scene 2: Parallax Showcase, which starts below the initial view */}
      <ParallaxShowcase />
      
    </section>
  );
}
