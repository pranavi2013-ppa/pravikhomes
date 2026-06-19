import Link from "next/link"
import Image from "next/image"
import { BedDouble, Bath, Maximize, Play } from "lucide-react"
import { type Rental, statusLabels } from "@/lib/rentals"
import { cn } from "@/lib/utils"

const statusStyles: Record<Rental["status"], string> = {
  available: "bg-primary text-primary-foreground",
  occupied: "bg-muted text-muted-foreground",
  "coming-soon": "bg-accent text-accent-foreground",
}

export function RentalCard({ rental }: { rental: Rental }) {
  return (
    <Link
      href={`/homes/${rental.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={rental.images[0] || "/placeholder.svg"}
          alt={rental.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium",
            statusStyles[rental.status],
          )}
        >
          {statusLabels[rental.status]}
        </span>
        {rental.video ? (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground">
            <Play className="size-3 fill-current" aria-hidden="true" /> Video
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-semibold tracking-tight">{rental.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {rental.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <BedDouble className="size-4" aria-hidden="true" />
            {rental.bedrooms === 0 ? "Studio" : `${rental.bedrooms} bed`}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="size-4" aria-hidden="true" />
            {rental.bathrooms} bath
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="size-4" aria-hidden="true" />
            {rental.size.toLocaleString()} sq ft
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-border/60 pt-4">
          <p>
            <span className="font-heading text-xl font-semibold text-foreground">
              {rental.currency}
              {rental.price.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground"> / month</span>
          </p>
          <span className="text-sm font-medium text-primary group-hover:underline">
            View details
          </span>
        </div>
      </div>
    </Link>
  )
}
