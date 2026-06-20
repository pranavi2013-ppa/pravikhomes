"use client"

import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RentalCard } from "@/components/rental-card"
import { ContactSection } from "@/components/contact-section"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [rentals, setRentals] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/rentals", { credentials: "include" })
      const json = await res.json()
      setRentals(json)
    }
    load()
  }, [])

  const availableCount = rentals.filter((r) => r.status === "available").length

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16">
            <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-primary">Homes for rent</p>
                <h1 className="mt-4 font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">PravikHomes</h1>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">PravikHomes is a newly built residential building with a handful of bright, semi-furnished 2BHK flats for rent.</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href="#homes" className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90">Browse {rentals.length} homes</a>
                  <a href="#contact" className="rounded-full border border-border px-6 py-3 font-medium transition-colors hover:bg-secondary">Get in touch</a>
                </div>
                <p className="mt-6 text-sm text-muted-foreground">{availableCount} available right now</p>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border lg:aspect-[5/6]">
                <Image src="/pravik/building.jpeg" alt={`Exterior of PravikHomes`} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Listings */}
        <section id="homes" className="scroll-mt-20 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">The homes</h2>
                <p className="mt-2 text-muted-foreground">Tap any home to see the full gallery, video tour and details.</p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rentals.map((rental) => (
                <RentalCard key={rental.id} rental={rental} />
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  )
}
