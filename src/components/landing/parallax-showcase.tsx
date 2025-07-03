
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Scroll animation config defines how each layer animates based on scroll progress
const scrollLayers = [
  // Layer 1 (Background): Fades in and moves up slightly
  { id: 1, src: '/images/kopr-layer01.png', alt: 'Platform background', hint: 'abstract background', width: 900, height: 700, start: 0, end: 1, yStart: 50, yEnd: -100, scaleStart: 1, scaleEnd: 1.1, opacityStart: 0, opacityEnd: 0.5 },
  { id: 2, src: '/images/kopr-layer02.png', alt: 'Platform UI graph', hint: 'UI graph', width: 500, height: 400, start: 0.1, end: 0.4, yStart: 100, yEnd: 0, scaleStart: 0.9, scaleEnd: 1, opacityStart: 0, opacityEnd: 1 },
  { id: 3, src: '/images/kopr-layer03.png', alt: 'Platform UI element', hint: 'UI element', width: 400, height: 300, start: 0.2, end: 0.5, yStart: 150, yEnd: 0, scaleStart: 0.9, scaleEnd: 1, opacityStart: 0, opacityEnd: 1 },
  { id: 4, src: '/images/kopr-layer04.png', alt: 'Platform UI card', hint: 'UI card', width: 350, height: 250, start: 0.3, end: 0.6, yStart: 200, yEnd: 0, scaleStart: 0.8, scaleEnd: 1, opacityStart: 0, opacityEnd: 1 },
  { id: 5, src: '/images/kopr-layer05.png', alt: 'Platform UI component', hint: 'UI component', width: 300, height: 200, start: 0.4, end: 0.7, yStart: 250, yEnd: 0, scaleStart: 0.8, scaleEnd: 1, opacityStart: 0, opacityEnd: 1 },
  { id: 6, src: '/images/kopr-layer06.png', alt: 'Platform UI icon', hint: 'UI icon', width: 150, height: 100, start: 0.5, end: 0.8, yStart: 300, yEnd: 0, scaleStart: 0.7, scaleEnd: 1, opacityStart: 0, opacityEnd: 1 },
  { id: 7, src: '/images/kopr-layer07.png', alt: 'Platform UI abstract', hint: 'UI abstract', width: 100, height: 100, start: 0.6, end: 0.9, yStart: 350, yEnd: 0, scaleStart: 0.7, scaleEnd: 1, opacityStart: 0, opacityEnd: 1 },
];

// Mouse move parallax config adds subtle movement
const mouseLayers = [
  { depth: 0.1 }, { depth: 0.25 }, { depth: 0.15 }, { depth: 0.35 },
  { depth: 0.4 }, { depth: 0.55 }, { depth: 0.45 },
];

// Helper function to interpolate values between two points
const interpolate = (value: number, from: [number, number], to: [number, number]): number => {
  if (from[1] === from[0]) return to[0]; // Avoid division by zero
  const result = to[0] + (value - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
  return result;
};

export function ParallaxShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Effect to handle scroll-based animations
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      // The total distance we can scroll while the sticky element is pinned.
      // It's the container's height (200vh) minus the viewport height (100vh).
      const scrollableDistance = containerRef.current.offsetHeight - viewHeight;

      // If the container's top is still on screen (i.e. > 0), we haven't started.
      if (rect.top > 0) {
        setScrollProgress(0);
        return;
      }

      // If the container's top is scrolled past the total scrollable distance, we're done.
      if (rect.top < -scrollableDistance) {
        setScrollProgress(1);
        return;
      }
      
      // Calculate progress from 0 to 1 as we scroll through the pinned section.
      const progress = (-rect.top) / scrollableDistance;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run on mount to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Effect to handle mouse-move parallax
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const moveX = (clientX - innerWidth / 2);
      const moveY = (clientY - innerHeight / 2);

      layerRefs.current.forEach((layer, index) => {
        if (layer) {
          const depth = mouseLayers[index].depth;
          const x = -(moveX * depth) / 15;
          const y = -(moveY * depth) / 15;
          layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    // This container defines the scrollable area for the animation
    <div ref={containerRef} className="relative w-full h-[200vh]">
      {/* This container sticks to the viewport while scrolling through the parent */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {scrollLayers.map((layer, index) => {
          const progressInRange = (scrollProgress - layer.start) / (layer.end - layer.start);
          const clampedProgress = Math.max(0, Math.min(1, progressInRange));

          const opacity = interpolate(clampedProgress, [0, 1], [layer.opacityStart, layer.opacityEnd]);
          const translateY = interpolate(clampedProgress, [0, 1], [layer.yStart, layer.yEnd]);
          const scale = interpolate(clampedProgress, [0, 1], [layer.scaleStart, layer.scaleEnd]);

          if (opacity <= 0 && layer.opacityEnd <= 0) return null;

          return (
            // This div handles the scroll-based animation (position, scale, opacity)
            <div
              key={layer.id}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                opacity,
                transform: `translateY(${translateY}px) scale(${scale})`,
                willChange: 'transform, opacity',
                zIndex: layer.id,
              }}
            >
              {/* This inner div handles the mouse-move parallax effect */}
              <div ref={(el) => (layerRefs.current[index] = el)} className="transition-transform duration-300 ease-out">
                <Image
                  src={layer.src}
                  alt={layer.alt}
                  width={layer.width}
                  height={layer.height}
                  className="object-contain"
                  data-ai-hint={layer.hint}
                  priority={layer.id === 1}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
