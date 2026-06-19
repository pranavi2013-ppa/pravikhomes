"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

type MediaItem = { type: "image"; src: string } | { type: "video"; src: string }

export function MediaGallery({
  images,
  video,
  title,
}: {
  images: string[]
  video?: string
  title: string
}) {
  const items: MediaItem[] = [
    ...images.map((src) => ({ type: "image" as const, src })),
    ...(video ? [{ type: "video" as const, src: video }] : []),
  ]
  const [active, setActive] = useState(0)
  const current = items[active]

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted sm:aspect-[16/10]">
        {current.type === "image" ? (
          <Image
            src={current.src || "/placeholder.svg"}
            alt={`${title} photo`}
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        ) : (
          <video
            key={current.src}
            src={current.src}
            controls
            playsInline
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {items.length > 1 ? (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {items.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View ${item.type} ${i + 1}`}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg border-2 transition-colors",
                active === i ? "border-primary" : "border-transparent hover:border-border",
              )}
            >
              {item.type === "image" ? (
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt=""
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-foreground text-background">
                  <Play className="size-5 fill-current" aria-hidden="true" />
                </span>
              )}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
