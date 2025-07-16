
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface ThankYouPopupProps {
  isOpen: boolean;
  onClose: () => void;
  firstName: string;
  lastName: string;
}

export function ThankYouPopup({ isOpen, onClose, firstName, lastName }: ThankYouPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Heart className="text-primary h-6 w-6" />
            A Special Thanks!
          </DialogTitle>
          <DialogDescription>
            Your support makes a world of difference.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-lg text-center">
            Thank you, <span className="font-semibold text-primary">{firstName} {lastName}</span>, for your incredible support and for being a part of our journey towards a more sustainable future.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
