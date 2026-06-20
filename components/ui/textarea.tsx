"use client"

import React from "react"

export function Textarea(props: any) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${props.className || ""}`}
    />
  )
}
