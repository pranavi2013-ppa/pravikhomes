import Link from "next/link"
import { Home } from "lucide-react"
import { landlord } from "@/lib/rentals"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Home className="size-4.5" aria-hidden="true" />
          </span>
          <span className="font-heading text-lg font-semibold leading-none tracking-tight">
            {landlord.buildingName}
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm sm:gap-2">
          <Link
            href="/#homes"
            className="rounded-full px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            Homes
          </Link>
          <Link
            href="/#contact"
            className="rounded-full bg-foreground px-4 py-2 font-medium text-background transition-opacity hover:opacity-90"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
