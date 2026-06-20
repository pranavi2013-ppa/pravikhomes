"use client"

import React from "react"

export function Button({ children, className = "", ...props }: any) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium ${className}`}
    >
      {children}
    </button>
  )
}

export const buttonVariants = {} as any
