"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// A macOS-style pop-up button: a native <select> under a drawn up/down chevron.
const PopupButton = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <span className={cn("popup", className)}>
      <select ref={ref} {...props}>
        {children}
      </select>
      <svg className="popup-chevron" width="10" height="14" viewBox="0 0 10 14" aria-hidden="true">
        <path d="M2 5.25 5 2.25l3 3M2 8.75l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  ),
)
PopupButton.displayName = "PopupButton"

export { PopupButton }
