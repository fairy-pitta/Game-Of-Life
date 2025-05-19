"use client"

import { useState, useRef } from "react"
import { createPortal } from "react-dom"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Repeat, HelpCircle } from "lucide-react"

interface TorusToggleProps {
  torusMode: boolean
  setTorusMode: (enabled: boolean) => void
}

export default function TorusToggle({ torusMode, setTorusMode }: TorusToggleProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const tooltipWidth = 300 // Fixed width for tooltip

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setTooltipPosition({
        top: rect.top,
        left: rect.left - tooltipWidth - 10, // Position to the left of the button with some spacing
      })
      setShowTooltip(true)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Repeat className="h-4 w-4 text-purple-500" />
        <Label htmlFor="torus-mode" className="text-sm font-medium text-slate-700">
          Torus Mode
        </Label>
        <button
          ref={buttonRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setShowTooltip(false)}
          className="text-purple-500 hover:text-purple-700 focus:outline-none"
        >
          <HelpCircle className="h-4 w-4" />
        </button>
      </div>
      <Switch
        id="torus-mode"
        checked={torusMode}
        onCheckedChange={setTorusMode}
        className="data-[state=checked]:bg-purple-500"
      />

      {showTooltip &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed bg-white border border-purple-200 p-3 rounded-lg shadow-lg z-[9999]"
            style={{
              top: `${tooltipPosition.top}px`,
              left: `${tooltipPosition.left}px`,
              width: `${tooltipWidth}px`,
            }}
          >
            <p className="text-xs">
              In torus mode, the grid edges are connected.
              <br />
              Cells that move off one edge of the screen appear on the opposite edge.
            </p>
          </div>,
          document.body,
        )}
    </div>
  )
}
