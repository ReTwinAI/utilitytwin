
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';
import { logAnalyticsEvent } from '@/components/layout/firebase-analytics';

// Replace with your actual YouTube video ID
const YOUTUBE_VIDEO_ID = 'NfPTbaMHcKQ'; 

export function PrototypeSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef, { threshold: 0.3, triggerOnce: true });

  const handlePlay = () => {
    setIsPlaying(true);
    logAnalyticsEvent('select_content', {
      content_type: 'prototype_video_play',
      item_id: YOUTUBE_VIDEO_ID,
    });
  };

  return (
    <section 
      ref={sectionRef} 
      id="prototype" 
      className="py-16 md:py-24 bg-secondary/30 dark:bg-secondary/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "relative mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-xl border-4 border-primary/20 bg-background shadow-2xl transition-all duration-700 ease-in-out",
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
        )}>
          {isPlaying ? (
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="Utility Twin Prototype"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 h-full w-full"
            ></iframe>
          ) : (
            <button
              onClick={handlePlay}
              className="group absolute inset-0 flex h-full w-full cursor-pointer flex-col items-center justify-center bg-card transition-colors hover:bg-secondary/50"
              aria-label="Play prototype video"
            >
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="relative w-[200px] h-[100px]">
                  <Image 
                    src="/images/logo.png" 
                    alt="Utility Twin Logo" 
                    fill 
                    unoptimized 
                    className="object-contain [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]" 
                  />
                </div>
                <h3 className="font-headline text-2xl md:text-3xl font-semibold text-foreground">
                  View Our Prototype
                </h3>
                <PlayCircle className="h-20 w-20 text-primary transition-transform duration-300 group-hover:scale-110" />
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
