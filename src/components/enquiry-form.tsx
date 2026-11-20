import { useId, useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hospital, specialties } from "@/lib/hospital-data";

type EnquiryFormProps = {
  heading?: string;
  showHeading?: boolean;
  brief?: boolean;
  compact?: boolean;
  initialSpeciality?: string;
  kind?: "appointment" | "general";
};

export function EnquiryForm({
  heading = "How can we help?",
  compact = false,
  showHeading = true,
  brief = false,
  initialSpeciality = "",
  kind = "appointment",
}: EnquiryFormProps) {
  const id = useId();
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [error, setError] = useState("");
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const date = String(data.get("date") ?? "").trim();
    const speciality = String(data.get("speciality") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const digits = phone.replace(/[+()\s-]/g, "");
    if (!name || !/^(?:91)?[6-9]\d{9}$/.test(digits)) {
      setError(
        !name ? "Enter your name." : "Enter a valid Indian mobile number, with or without +91.",
      );
      form.querySelector<HTMLInputElement>(!name ? '[name="name"]' : '[name="phone"]')?.focus();
      return;
    }
    setError("");
    const lines = [
      kind === "general"
        ? "Hello Care Speciality Hospital, I have a general enquiry."
        : "Hello Care Speciality Hospital, I would like to make an appointment enquiry.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      date ? `Preferred date: ${date}` : "",
      speciality ? `Service: ${speciality}` : "",
      message ? `Message: ${message}` : "",
    ].filter(Boolean);

    const url = `${hospital.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    setWhatsappUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      className={brief ? "space-y-4" : "space-y-5"}
      onSubmit={handleSubmit}
      onChange={() => {
        setError("");
        setWhatsappUrl("");
      }}
    >
      {showHeading && (
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">Enquiry</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">{heading}</h2>
          {!compact && (
            <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
              Share your preferred details and we’ll open a prefilled message in WhatsApp. This is
              an enquiry, not a confirmed appointment.
            </p>
          )}
        </div>
      )}

      <div className={brief ? "grid gap-3" : "grid gap-4 sm:grid-cols-2"}>
        <label className="space-y-1.5 text-sm font-semibold" htmlFor={`${id}-name`}>
          Your name
          <input
            autoComplete="name"
            className="h-11 w-full rounded-md border border-input bg-background px-3 font-normal"
            id={`${id}-name`}
            maxLength={80}
            name="name"
            placeholder="Name"
            required
          />
        </label>
        <label className="space-y-1.5 text-sm font-semibold" htmlFor={`${id}-phone`}>
          Phone number
          <input
            autoComplete="tel"
            className="h-11 w-full rounded-md border border-input bg-background px-3 font-normal"
            id={`${id}-phone`}
            inputMode="tel"
            maxLength={16}
            minLength={10}
            name="phone"
            placeholder="Your contact number"
            required
            title="Enter an Indian mobile number, with or without +91"
            type="tel"
          />
        </label>
        {!brief && (
          <label className="space-y-1.5 text-sm font-semibold" htmlFor={`${id}-date`}>
            Preferred date <span className="font-normal text-muted-foreground">(optional)</span>
            <input
              className="h-11 w-full rounded-md border border-input bg-background px-3 font-normal"
              id={`${id}-date`}
              min={today}
              name="date"
              type="date"
            />
          </label>
        )}
        <label className="space-y-1.5 text-sm font-semibold" htmlFor={`${id}-speciality`}>
          <span id={`${id}-speciality-label`}>{brief ? "Service (optional)" : "Service"}</span>
          <select
            aria-labelledby={`${id}-speciality-label`}
            className="h-11 w-full rounded-md border border-input bg-background px-3 font-normal"
            defaultValue={initialSpeciality}
            id={`${id}-speciality`}
            name="speciality"
          >
            <option value="">Select a service</option>
            {specialties.map((speciality) => (
              <option key={speciality.slug} value={speciality.name}>
                {speciality.name}
              </option>
            ))}
          </select>
        </label>
        {!brief && (
          <label
            className="space-y-1.5 text-sm font-semibold sm:col-span-2"
            htmlFor={`${id}-message`}
          >
            Message <span className="font-normal text-muted-foreground">(optional)</span>
            <textarea
              className="min-h-28 w-full resize-y rounded-md border border-input bg-background px-3 py-2.5 font-normal"
              id={`${id}-message`}
              maxLength={1000}
              name="message"
              placeholder="Tell us what you’d like to ask"
              rows={4}
            />
          </label>
        )}
      </div>

      <div className="flex flex-col items-start gap-3">
        <Button type="submit" className={brief ? "w-full" : undefined}>
          Send enquiry on WhatsApp <MessageCircle aria-hidden="true" />
        </Button>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        {whatsappUrl && (
          <p role="status" className="text-sm font-medium text-primary">
            Your enquiry is ready. Review and send it in WhatsApp.{" "}
            <a className="underline" href={whatsappUrl} target="_blank" rel="noreferrer">
              Open WhatsApp again
            </a>
          </p>
        )}
        {!brief && (
          <p className="text-xs leading-5 text-muted-foreground">
            The hospital receives your enquiry when you send the message in WhatsApp. Wait for the
            team to confirm appointment availability.
          </p>
        )}
      </div>
    </form>
  );
}
