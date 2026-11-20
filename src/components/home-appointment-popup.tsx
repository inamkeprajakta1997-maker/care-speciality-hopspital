import { useEffect, useRef, useState } from "react";
import hospitalPhoto from "@/assets/facility-room.jpg";
import { EnquiryForm } from "@/components/enquiry-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const storageKey = "care-hospital:appointment-popup-shown";
let shown = false;

export function HomeAppointmentPopup() {
  const [open, setOpen] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (shown) return;
    try {
      if (sessionStorage.getItem(storageKey)) return;
    } catch {
      // In-memory state covers browsers without session storage.
    }

    const timer = window.setTimeout(() => {
      shown = true;
      try {
        sessionStorage.setItem(storageKey, "1");
      } catch {
        // The appointment form still works in this tab.
      }
      previousFocus.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setOpen(true);
    }, 1700);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-[46rem] gap-0 overflow-y-auto rounded-2xl p-0 sm:grid-cols-[0.9fr_1fr] [&>button]:grid [&>button]:size-9 [&>button]:place-items-center [&>button]:rounded-full [&>button]:bg-white [&>button]:text-foreground [&>button]:opacity-100 [&>button]:shadow-sm"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          heading.current?.focus();
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          const previous = previousFocus.current;
          if (previous?.isConnected && previous !== document.body) previous.focus();
          else document.getElementById("main-content")?.focus({ preventScroll: true });
        }}
      >
        <figure className="relative h-36 overflow-hidden bg-secondary sm:h-full sm:min-h-[25rem]">
          <img
            src={hospitalPhoto}
            alt="Hospital room with a single patient bed"
            className="absolute inset-0 size-full object-cover"
          />
          <figcaption className="absolute bottom-3 left-3 rounded-full bg-[#151936]/85 px-3 py-1 text-xs text-white">
            Illustrative image
          </figcaption>
        </figure>
        <div className="min-w-0 space-y-4 px-5 py-5 sm:px-7 sm:py-8">
          <DialogHeader className="pr-8 text-left">
            <DialogTitle ref={heading} tabIndex={-1} className="text-2xl">
              Book an appointment
            </DialogTitle>
            <DialogDescription>
              Send an enquiry on WhatsApp. The hospital will confirm availability.
            </DialogDescription>
          </DialogHeader>
          <EnquiryForm brief showHeading={false} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
