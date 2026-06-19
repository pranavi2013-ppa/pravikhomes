"use client"

import { useState } from "react"
import { Phone, Mail, MessageCircle, MapPin, Check } from "lucide-react"
import { landlord } from "@/lib/rentals"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function ContactSection({ defaultUnit }: { defaultUnit?: string }) {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") || "")
    const unit = String(data.get("unit") || "")
    const message = String(data.get("message") || "")
    const phone = String(data.get("phone") || "")

    const subject = `Rental enquiry${unit ? ` — ${unit}` : ""}`
    const body = [
      `Name: ${name}`,
      phone ? `Phone: ${phone}` : "",
      unit ? `Interested in: ${unit}` : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n")

    // Opens the visitor's email app pre-filled to you — no backend needed.
    window.location.href = `mailto:${landlord.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const waText = encodeURIComponent(
    `Hi! I'm interested in renting${defaultUnit ? ` ${defaultUnit}` : " a home"} at ${landlord.buildingName}.`,
  )

  return (
    <section id="contact" className="scroll-mt-20 bg-secondary/60 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Get in touch</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Interested? Let&apos;s arrange a visit.
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
            Reach out any way you like — call, message, or send the quick form. Happy to answer
            questions and show you around.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={`tel:${landlord.phone.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Phone className="size-4.5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm text-muted-foreground">Call</span>
                <span className="font-medium">{landlord.phone}</span>
              </span>
            </a>

            <a
              href={`https://wa.me/${landlord.whatsapp}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <MessageCircle className="size-4.5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm text-muted-foreground">WhatsApp</span>
                <span className="font-medium">Message us</span>
              </span>
            </a>

            <a
              href={`mailto:${landlord.email}`}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Mail className="size-4.5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm text-muted-foreground">Email</span>
                <span className="font-medium">{landlord.email}</span>
              </span>
            </a>

            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
              <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <MapPin className="size-4.5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm text-muted-foreground">Address</span>
                <span className="font-medium">{landlord.address}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          {sent ? (
            <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-heading text-xl font-semibold">Almost done!</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Your email app should have opened with your message ready to send. If it
                didn&apos;t, just email us at {landlord.email}.
              </p>
              <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
                Send another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Your name</Label>
                <Input id="name" name="name" required placeholder="Jane Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+1 555 000 0000" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="unit">Which home?</Label>
                <Input
                  id="unit"
                  name="unit"
                  defaultValue={defaultUnit}
                  placeholder="e.g. 2nd Floor — 2BHK"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us a little about what you're looking for or when you'd like to visit."
                />
              </div>
              <Button type="submit" className="mt-2 w-full">
                Send enquiry
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                This opens your email app with the message ready to send.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
