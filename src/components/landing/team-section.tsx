
'use client';

import { useRef } from 'react';
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  aiHint: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Adithya Ramachandran",
    role: "PhD Researcher",
    bio: "Hello! I'm Adithya Ramachandran, a Computer Science Doctoral Candidate at FAU Erlangen specializing in AI-driven solutions for water and heat supply systems. With a background in Computational (M.Sc.) and Mechanical (B.Eng.) Engineering, I'm passionate about translating complex AI research into tangible, real-world applications that enhance sustainability and efficiency in the utility sector.",
    imageSrc: "/images/adithya.jpeg",
    aiHint: "person portrait"
  },
  {
    name: "Malte Hitpaß",
    role: "Medical Student",
    bio: "Hey! I am Malte Hitpaß, a 5th-semester medical student from NRW, Germany. I am deeply interested in how technology can shape a more sustainable future. I am keen to explore and contribute to innovative solutions that address pressing environmental challenges, bringing a fresh perspective to the team.",
    imageSrc: "/images/malte.jpeg",
    aiHint: "person portrait"
  },
  {
    name: "Rifaath Ameen",
    role: "Master's Student - Artificial Intelligence",
    bio: "Hey! I'm Rifaath Ameen, currently diving deeper into Artificial Intelligence with my Master's studies at FAU, after completing my Bachelor's in AI & Machine Learning. I thrive on learning and tackling new challenges, with a passion for figuring out how AI can create impactful solutions.",
    imageSrc: "/images/rifaath.png",
    aiHint: "person portrait"
  },
  {
    name: "Karla Hausel",
    role: "Master's Student - International Information Systems",
    bio: "Hey there! My name is Karla Hausel and I’m passionate about leveraging technology to drive sustainability and market growth. My main interests are digital transformation, innovation and aligning IT strategies with business goals. I have a Double Bachelor's Degree in International Management and have gained work experience during 2 years in the SaaS - Start-up environment in Paris.",
    imageSrc: "/images/karla.jpg",
    aiHint: "person portrait"
  },
];

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionVisible = useScrollAnimation(sectionRef, { threshold: 0.1, triggerOnce: true });
  
  return (
    <section 
      ref={sectionRef} 
      id="team" 
      className="py-16 md:py-24 bg-secondary/30 dark:bg-secondary/20 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "text-center mb-12 md:mb-16 transform transition-all duration-700 ease-in-out",
          isSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h2 className="font-headline text-4xl md:text-5xl font-semibold mb-4">
            Meet the Team
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            The passionate individuals behind Utility Twin's success.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={cn(
                "transform transition-all duration-700 ease-in-out",
                isSectionVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              )}
              style={{ transitionDelay: isSectionVisible ? `${150 + index * 100}ms` : '0ms' }}
            >
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 text-center bg-card transform hover:-translate-y-1 h-full">
                <CardHeader className="items-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 shadow-md">
                    <Image
                      src={member.imageSrc}
                      alt={member.name}
                      fill={true}
                      style={{ objectFit: 'cover' }}
                      sizes="128px"
                      data-ai-hint={member.aiHint}
                    />
                  </div>
                  <CardTitle className="font-headline text-2xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
