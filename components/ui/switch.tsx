"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

// iOS-style switch drawn over a real checkbox, so keyboard and screen readers get a native control.
const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(({ className, checked, onCheckedChange, ...props }, ref) => (
  <span className={cn("switch", className)}>
    <input
      ref={ref}
      type="checkbox"
      role="switch"
      checked={checked}
      aria-checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      {...props}
    />
    <span className="switch-track" aria-hidden="true">
      <span className="switch-knob" />
    </span>
  </span>
))
Switch.displayName = "Switch"

export { Switch }
