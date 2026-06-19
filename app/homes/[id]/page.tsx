import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, BedDouble, Bath, Maximize, Building2, Check } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MediaGallery } from "@/components/media-gallery"
import { ContactSection } from "@/components/contact-section"
import { getRental, rentals, statusLabels } from "@/lib/rentals"

export function generateStaticParams() {
  return rentals.map((r) => ({ id: r.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const rental = getRental(id)
  if (!rental) return { title: "Home not found" }
  return {
    title: `${rental.name} — for rent`,
    description: rental.shortDescription,
  }
}

export default async function HomeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const rental = getRental(id)
  if (!rental) notFound()

  const specs = [
    {
      icon: BedDouble,
      label: rental.bedrooms === 0 ? "Studio" : `${rental.bedrooms} bedroom${rental.bedrooms > 1 ? "s" : ""}`,
    },
    { icon: Bath, label: `${rental.bathrooms} bathroom${rental.bathrooms > 1 ? "s" : ""}` },
    { icon: Maximize, label: `${rental.size.toLocaleString()} sq ft` },
    { icon: Building2, label: rental.floor },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <Link
            href="/#homes"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All homes
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            <div>
              <MediaGallery images={rental.images} video={rental.video} title={rental.name} />
            </div>

            <div className="lg:pt-2">
              <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                {statusLabels[rental.status]}
              </span>
              <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {rental.name}
              </h1>
              <p className="mt-4 leading-relaxed text-muted-foreground">{rental.description}</p>

              <p className="mt-6">
                <span className="font-heading text-3xl font-semibold">
                  {rental.currency}
                  {rental.price.toLocaleString()}
                </span>
                <span className="text-muted-foreground"> / month</span>
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-3">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                  >
                    <spec.icon className="size-5 text-primary" aria-hidden="true" />
                    <dd className="text-sm font-medium">{spec.label}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <h2 className="font-heading text-lg font-semibold">What&apos;s included</h2>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {rental.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="flex size-5 items-center justify-center rounded-full bg-accent text-accent-foreground">
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#contact"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
              >
                Enquire about this home
              </a>
            </div>
          </div>
        </div>

        <ContactSection defaultUnit={rental.name} />
      </main>

      <SiteFooter />
    </div>
  )
}
