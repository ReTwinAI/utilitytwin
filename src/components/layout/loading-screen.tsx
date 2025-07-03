
'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-in-out',
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="relative w-48 h-12">
        <Image 
          src="/images/logo.png" 
          alt="Utility Twin Logo" 
          fill 
          className="object-contain animate-pulse [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
          priority
          unoptimized
        />
      </div>
      <p className="mt-4 text-muted-foreground">Loading assets, please wait...</p>
    </div>
  );
}
