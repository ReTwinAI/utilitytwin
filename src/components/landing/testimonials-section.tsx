
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
    quote: " see a clear need for digitalization in our sector. The concept of Utility Twin can have a major impact on our daily work.",
    name: "Head of Digitalization",
    title: "German Utility Company.",
    avatarFallback: "JD",
    avatarSrc: "https://placehold.co/100x100.png",
    aiHint: "woman portrait"
  },
  {
    quote: "Germany's public sector is facing a huge workforce gap which will likely to a certain extend be filled with AI. Utility Twin fits right into this trend and can provide the demanded AI know-how needed in this sector.",
    name: "IT Expert",
    title: "Utility Industry",
    avatarFallback: "JS",
    avatarSrc: "https://placehold.co/100x100.png",
    aiHint: "man portrait"
  },
  {
    quote: "Utility companies are facing a huge knowledge management problem. This is were Utility Twin can step right in and centralize this knowledge.",
    name: "Innovation expert",
    title: "",
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
            Insights from Industry Leaders
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Validating our approach through trusted leaders in the industry.
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
