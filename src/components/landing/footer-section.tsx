
import Image from "next/image";

export function FooterSection() {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="footer" className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center items-center mb-4">
          <Image src="/images/logo.png" alt="Utility Twin Logo" width={180} height={45} unoptimized className="[mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]" />
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
