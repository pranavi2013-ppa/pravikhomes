"use client"

import { useState } from "react"
import { Check } from "lucide-react"
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

    const subject = `Rental enquiry${unit ? ` — ${unit}` : ""}`
    const body = [
      `Name: ${name}`,
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

  return (
    <section id="contact" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Get in touch</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Interested? Send a quick enquiry.
          </h2>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
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
      </div>
    </section>
  )
}
