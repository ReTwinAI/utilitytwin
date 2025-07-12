
'use client';

import { Button } from "@/components/ui/button";
import { logAnalyticsEvent } from '@/components/layout/firebase-analytics';
import { ParallaxShowcase } from './parallax-showcase';
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const slogan = "Smart Solution – Sustainable Impact";

  const handleScrollDown = () => {
    logAnalyticsEvent('select_content', {
      content_type: 'scroll_prompt_click',
      item_id: 'scroll_down_arrow',
    });
    const targetElement = document.getElementById('parallax-showcase');
    if (targetElement) {
      // Get the top position of the parallax container
      const targetPosition = targetElement.offsetTop;
      
      // Calculate 33% of the viewport height to scroll into the animation
      const scrollOffset = window.innerHeight * 0.33;

      window.scrollTo({
        top: targetPosition + scrollOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative bg-gradient-to-b from-background to-secondary/30 dark:from-background dark:to-secondary/20"
    >
      {/* Scene 1: Centered slogan. */}
      <div className="relative flex min-h-[calc(100vh-5rem)] w-full items-center justify-center pt-24 pb-12 md:pt-0 md:pb-0">
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <button
            onClick={handleScrollDown}
            className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
            aria-label="Scroll to next section"
          >
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {/* Scene 2: Parallax Showcase, which starts immediately after the section above */}
      <div id="parallax-showcase">
        <ParallaxShowcase />
      </div>
      
    </section>
  );
}
