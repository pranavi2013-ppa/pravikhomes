import { landlord } from "@/lib/rentals"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p className="font-heading text-base font-semibold text-foreground">
          {landlord.buildingName}
        </p>
        <p>{landlord.address}</p>
        <p>
          {new Date().getFullYear()} · Private rentals
        </p>
      </div>
    </footer>
  )
}
