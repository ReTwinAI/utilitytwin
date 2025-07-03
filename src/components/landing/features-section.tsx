
'use client';

import { useState, useRef, useEffect } from 'react';
import { Clock, Users2, Leaf, DatabaseZap, BrainCircuit, TrendingUp, LayoutDashboard } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from '@/lib/utils';
import { logAnalyticsEvent } from '@/components/layout/firebase-analytics';

interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  category: 'Value Proposition' | 'Core Solution';
}

const features: Feature[] = [
  {
    id: 'time_saving',
    icon: Clock,
    title: "Time Saving",
    description: "Accelerate decision-making and streamline operations with rapid data analysis and automated insights.",
    category: "Value Proposition",
  },
  {
    id: 'collaboration',
    icon: Users2,
    title: "Cross-Team Collaboration",
    description: "Foster seamless teamwork with a unified platform for data sharing and collaborative problem-solving.",
    category: "Value Proposition",
  },
  {
    id: 'optimization',
    icon: Leaf,
    title: "Resource Optimization",
    description: "Enhance efficiency and reduce waste through intelligent resource allocation and predictive maintenance.",
    category: "Value Proposition",
  },
  {
    id: 'data_modelling',
    icon: DatabaseZap,
    title: "End-to-End Data Modelling",
    description: "Comprehensive data integration and modeling for a holistic view of your utility network.",
    category: "Core Solution",
  },
  {
    id: 'ai_analysis',
    icon: BrainCircuit,
    title: "AI-Driven Solution Analysis",
    description: "Advanced AI algorithms to analyze complex scenarios and provide actionable insights.",
    category: "Core Solution",
  },
  {
    id: 'forecasting',
    icon: TrendingUp,
    title: "Forecasting & Network Optimization",
    description: "Predict future demands and optimize network performance for reliability and efficiency.",
    category: "Core Solution",
  },
  {
    id: 'dashboards',
    icon: LayoutDashboard,
    title: "Interactive Dashboards & Visualization",
    description: "Intuitive and customizable dashboards for real-time monitoring and data exploration.",
    category: "Core Solution",
  },
];

const WHEEL_RADIUS = 200; // The radius of the wheel in pixels
const ROTATION_OFFSET = -90; // Start the first item at the top (-90 degrees)

export function FeaturesSection() {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const lastLoggedIndex = useRef<number | null>(null);

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      if (!scrollTrackRef.current) return;

      const rect = scrollTrackRef.current.getBoundingClientRect();
      const scrollableHeight = scrollTrackRef.current.offsetHeight - window.innerHeight;
      
      if (scrollableHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      
      const newActiveIndex = Math.min(features.length - 1, Math.floor(progress * features.length));
      
      const anglePerItem = 360 / features.length;
      const newRotation = newActiveIndex * -anglePerItem;

      setRotation(newRotation);
      setActiveIndex(newActiveIndex);
      
      if (newActiveIndex !== lastLoggedIndex.current) {
        lastLoggedIndex.current = newActiveIndex;
        logAnalyticsEvent('view_item', {
            item_category: 'feature_wheel_view',
            item_id: features[newActiveIndex].id,
            item_name: features[newActiveIndex].title,
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFeatureClick = (index: number) => {
    if (!scrollTrackRef.current) return;

    const scrollableHeight = scrollTrackRef.current.offsetHeight - window.innerHeight;
    const trackTop = scrollTrackRef.current.offsetTop;
    const scrollPerItem = scrollableHeight / features.length;
    const targetScrollY = trackTop + (index * scrollPerItem) + 1; // +1 to ensure it enters the threshold

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
    
    logAnalyticsEvent('select_content', {
        content_type: 'feature_wheel_click',
        item_id: features[index].id,
        item_name: features[index].title,
    });
  };

  const activeFeature = features[activeIndex];

  return (
    <section id="features" className="bg-background">
      <div ref={scrollTrackRef} className="relative h-[300vh] w-full">
        <div className="sticky top-24 h-[calc(100vh-12rem)] w-full flex flex-col items-center overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
          
            <div className="pb-8 text-center md:text-left">
              <h2 className="font-headline text-4xl md:text-5xl font-semibold mb-4">
                  How We Transform Utilities
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
                  From value-driven outcomes to cutting-edge solutions, Utility Twin is engineered to deliver comprehensive improvements across your entire network.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center flex-grow pb-16">

              <div className="relative flex flex-col items-start h-auto md:h-80">
                  <div className="relative w-full h-52">
                      {features.map((feature, index) => (
                          <div
                          key={feature.id}
                          className={cn(
                              "absolute top-0 left-0 transition-opacity duration-500 ease-in-out w-full",
                              activeIndex === index ? "opacity-100" : "opacity-0 pointer-events-none"
                          )}
                          >
                              <div className="flex items-center gap-4 mb-4">
                                  <div className={cn(
                                  "p-3 rounded-lg",
                                  feature.category === 'Value Proposition' ? 'bg-primary/10' : 'bg-accent/10'
                                  )}>
                                  <feature.icon className={cn(
                                      "w-8 h-8",
                                      feature.category === 'Value Proposition' ? 'text-primary' : 'text-accent'
                                  )} />
                                  </div>
                                  <h3 className="font-headline text-3xl md:text-4xl font-semibold">
                                  {feature.title}
                                  </h3>
                              </div>
                              <p className="text-muted-foreground text-lg leading-relaxed">
                                  {feature.description}
                              </p>
                          </div>
                      ))}
                  </div>
              </div>

              <div className="relative w-full h-full min-h-[400px] flex items-center justify-center pt-24">
                  {isClient && <div 
                      className="absolute transition-transform duration-500 ease-in-out"
                      style={{
                          width: `calc(${WHEEL_RADIUS}px * 2)`,
                          height: `calc(${WHEEL_RADIUS}px * 2)`,
                          transform: `rotate(${rotation}deg)`
                      }}
                  >
                      {features.map((feature, index) => {
                          const angle = (index / features.length) * 360 + ROTATION_OFFSET;
                          const x = WHEEL_RADIUS * Math.cos(angle * (Math.PI / 180));
                          const y = WHEEL_RADIUS * Math.sin(angle * (Math.PI / 180));
                          
                          const isActive = index === activeIndex;
                          const scale = isActive ? 1.1 : 0.8;
                          const opacity = isActive ? 1 : 0.4;

                          return (
                              <div 
                                  key={feature.id}
                                  className="absolute top-1/2 left-1/2 w-32 h-32"
                                  style={{
                                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
                                  }}
                              >
                                  <button
                                    onClick={() => handleFeatureClick(index)}
                                    aria-label={`View feature: ${feature.title}`}
                                    className="w-full h-full flex flex-col items-center justify-center text-center p-2 rounded-full shadow-lg bg-card border-2 transition-all duration-300 ease-in-out cursor-pointer hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                                    style={{
                                      transform: `rotate(${-rotation}deg) scale(${scale})`,
                                      opacity: opacity,
                                      borderColor: isActive
                                        ? (feature.category === 'Value Proposition' ? 'hsl(var(--primary))' : 'hsl(var(--accent))')
                                        : 'hsl(var(--border))',
                                    }}
                                  >
                                    <feature.icon className={cn(
                                      "w-8 h-8 mb-1 transition-colors",
                                      isActive 
                                         ? (feature.category === 'Value Proposition' ? 'text-primary' : 'text-accent')
                                         : 'text-muted-foreground'
                                    )} />
                                    <span className={cn(
                                        "text-xs font-semibold transition-colors text-center",
                                        isActive ? 'text-foreground' : 'text-muted-foreground'
                                    )}>
                                        {feature.title}
                                    </span>
                                  </button>
                              </div>
                          )
                      })}
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
