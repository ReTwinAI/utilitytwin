
'use client';
import type { RefObject } from 'react';
import { useState, useEffect } from 'react';

interface ScrollAnimationOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(
  elementRef: RefObject<T>,
  options?: ScrollAnimationOptions
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options?.triggerOnce) {
            observer.unobserve(currentElement);
          }
        } else {
          if (!options?.triggerOnce) {
            setIsVisible(false); 
          }
        }
      },
      {
        root: options?.root || null,
        rootMargin: options?.rootMargin || '0px',
        threshold: options?.threshold || 0.1, 
      }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [elementRef, options?.triggerOnce, options?.threshold, options?.root, options?.rootMargin]);

  return isVisible;
}
