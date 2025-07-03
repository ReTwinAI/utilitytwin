
'use client';

import { useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatarSrc?: string;
  avatarFallback: string;
  aiHint: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Utility Twin revolutionized how we manage our resources. The time savings are incredible!",
    name: "Jane Doe",
    title: "Operations Manager, Energetic Solutions",
    avatarFallback: "JD",
    avatarSrc: "https://placehold.co/100x100.png",
    aiHint: "woman portrait"
  },
  {
    quote: "Collaboration has never been smoother. The insights from their AI analysis are game-changing.",
    name: "John Smith",
    title: "Lead Engineer, AquaPure Systems",
    avatarFallback: "JS",
    avatarSrc: "https://placehold.co/100x100.png",
    aiHint: "man portrait"
  },
  {
    quote: "Optimizing our network with Utility Twin has led to significant cost reductions and improved efficiency.",
    name: "Alice Brown",
    title: "CTO, GridFlow Technologies",
    avatarFallback: "AB",
    avatarSrc: "https://placehold.co/100x100.png",
    aiHint: "woman tech"
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionVisible = useScrollAnimation(sectionRef, { threshold: 0.1, triggerOnce: true });

  return (
    <section 
      ref={sectionRef} 
      id="testimonials" 
      className="py-16 md:py-24 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "text-center mb-12 md:mb-16 transform transition-all duration-700 ease-in-out",
          isSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h2 className="font-headline text-4xl md:text-5xl font-semibold mb-4">
            Trusted by Innovators
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear what our partners and clients are saying about Utility Twin.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "transform transition-all duration-700 ease-in-out",
                isSectionVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              )}
              style={{ transitionDelay: isSectionVisible ? `${150 + index * 100}ms` : '0ms' }}
            >
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between bg-card h-full">
                <CardContent className="pt-6 pb-4 flex-grow">
                  <p className="text-lg italic text-foreground mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
                <div className="px-6 pb-6 pt-2 border-t border-border mt-auto">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                      <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
