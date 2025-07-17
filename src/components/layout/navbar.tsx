
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { logAnalyticsEvent } from '@/components/layout/firebase-analytics';
import Image from 'next/image';

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#prototype', label: 'Prototype' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    logAnalyticsEvent('select_content', {
      content_type: 'nav_link',
      item_id: href,
      item_name: label,
    });
    const targetId = href.substring(1); 
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-background/95 shadow-md backdrop-blur-sm py-2' : 'bg-transparent py-3'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2" 
          aria-label="Utility Twin Home"
          onClick={(e) => {
            e.preventDefault();
            logAnalyticsEvent('select_content', {
              content_type: 'logo_click',
              item_id: 'home_logo_header',
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="relative w-[120px] h-[70px]">
            <Image src="/images/logo.png" alt="Utility Twin Logo" fill priority unoptimized className="object-contain [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]" />
          </div>
        </Link>

        <nav className="hidden md:flex space-x-2">
          {navLinks.map((link) => (
            <Button key={link.label} variant="ghost" asChild size="sm"
                    className={cn(
                      "font-medium text-foreground/80 hover:text-primary"
                    )}>
              <Link href={link.href} onClick={(e) => handleSmoothScroll(e, link.href, link.label)}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => logAnalyticsEvent('select_content', { content_type: 'menu_toggle', item_id: 'hamburger_menu_open' })}
                className="text-foreground/80 hover:text-primary h-9 w-9"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background p-6">
              <div className="flex flex-col space-y-2">
                <SheetClose asChild>
                  <Link 
                    href="/" 
                    className="flex items-center gap-2 mb-6"
                    onClick={(e) => {
                      const currentTarget = e.currentTarget as HTMLElement;
                      const sheetDialog = currentTarget.closest('[role="dialog"]');
                      if (sheetDialog) {
                        const closeButton = sheetDialog.querySelector('button[class*="SheetClose"], button[aria-label="Close"]');
                        if (closeButton instanceof HTMLElement) {
                          closeButton.click();
                        }
                      }
                      logAnalyticsEvent('select_content', {
                        content_type: 'logo_click_mobile',
                        item_id: 'home_logo_mobile_menu',
                      });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <div className="relative w-[120px] h-[30px]">
                      <Image src="/images/logo.png" alt="Utility Twin Logo" fill unoptimized className="object-contain [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]" />
                    </div>
                  </Link>
                </SheetClose>
                {navLinks.map((link) => (
                  <SheetClose key={link.label} asChild>
                     <Link
                        href={link.href}
                        onClick={(e) => handleSmoothScroll(e, link.href, link.label)}
                        className="block py-2 text-lg font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                  </SheetClose>
                ))}
                 <SheetClose asChild>
                    <Button 
                      className="w-full font-semibold mt-6"
                      onClick={() => {
                        logAnalyticsEvent('select_content', { content_type: 'button_click', item_id: 'get_started_mobile_menu' });
                        const targetElement = document.getElementById('contact');
                        if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Get Started
                    </Button>
                 </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
