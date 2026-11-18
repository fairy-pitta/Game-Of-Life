"use client"

import { useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { HelpCircle } from "lucide-react"

const TIP_WIDTH = 300

// A small "?" button that shows help text in a floating panel on hover or focus.
export default function HelpTip({ label, children }: { label: string; children: ReactNode }) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const ref = useRef<HTMLButtonElement>(null)

  const show = () => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    let left = rect.left - TIP_WIDTH - 10
    let top = rect.top
    // Not enough room on the left (phones): drop below the button instead.
    if (left < 8) {
      left = Math.min(Math.max(8, rect.left - TIP_WIDTH / 2), window.innerWidth - TIP_WIDTH - 8)
      top = rect.bottom + 8
    }
    setPos({ top, left })
  }

  return (
    <>
      <button
        ref={ref}
        type="button"
        aria-label={label}
        className="icon-button icon-button-bare"
        onMouseEnter={show}
        onMouseLeave={() => setPos(null)}
        onFocus={show}
        onBlur={() => setPos(null)}
      >
        <HelpCircle className="h-4 w-4" />
      </button>
      {pos &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="tip" role="tooltip" style={{ top: pos.top, left: pos.left, width: TIP_WIDTH }}>
            {children}
          </div>,
          document.body,
        )}
    </>
  )
}
