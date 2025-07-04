
import Image from "next/image";

export function FooterSection() {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="footer" className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center items-center mb-4">
          <div className="relative w-[180px] h-[45px]">
            <Image src="/images/logo.png" alt="Utility Twin Logo" fill unoptimized className="object-contain [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]" />
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          &copy; {currentYear} Utility Twin. All rights reserved.
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          Smart Solutions for a Sustainable Future.
        </p>
      </div>
    </footer>
  );
}
