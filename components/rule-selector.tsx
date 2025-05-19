"use client"

import { useState, useRef } from "react"
import { createPortal } from "react-dom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { BookOpen, HelpCircle } from "lucide-react"
import { RULES } from "@/lib/game-of-life-data"

interface RuleSelectorProps {
  selectedRule: string
  handleRuleChange: (rule: string) => void
}

export default function RuleSelector({ selectedRule, handleRuleChange }: RuleSelectorProps) {
  const [hoveredRule, setHoveredRule] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const tooltipWidth = 300 // Fixed width for tooltip

  const handleMouseEnter = (ruleName: string, button: HTMLButtonElement) => {
    const rect = button.getBoundingClientRect()
    setTooltipPosition({
      top: rect.top,
      left: rect.left - tooltipWidth - 10, // Position to the left of the button with some spacing
    })
    setHoveredRule(ruleName)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-purple-500" />
        <Label className="text-sm font-medium text-slate-700">Rule</Label>
      </div>
      <Select value={selectedRule} onValueChange={handleRuleChange}>
        <SelectTrigger className="w-full bg-white border-purple-200 text-slate-700">
          <SelectValue placeholder="Select rule" />
        </SelectTrigger>
        <SelectContent className="bg-white border-purple-200 text-slate-700">
          {RULES.map((rule) => (
            <SelectItem key={rule.name} value={rule.name} className="focus:bg-purple-100 focus:text-purple-800">
              <div className="flex items-center justify-between w-full">
                <span>
                  {rule.name} - {rule.description}
                </span>
                <button
                  ref={(el) => {
                    if (el) buttonRefs.current.set(rule.name, el)
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={(e) => handleMouseEnter(rule.name, e.currentTarget)}
                  onMouseLeave={() => setHoveredRule(null)}
                  className="ml-2 text-purple-500 hover:text-purple-700 focus:outline-none"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hoveredRule &&
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
            {(() => {
              const rule = RULES.find((r) => r.name === hoveredRule)
              if (!rule) return null
              return (
                <div className="space-y-2">
                  <h4 className="font-medium text-purple-700">{rule.name}</h4>
                  <p className="text-sm">{rule.description}</p>
                  <div className="text-xs space-y-1">
                    <p>
                      <span className="font-semibold">Survival:</span> {rule.survive.join(" or ")} neighbors
                    </p>
                    <p>
                      <span className="font-semibold">Birth:</span> {rule.birth.join(" or ")} neighbors
                    </p>
                  </div>
                  <p className="text-xs">{rule.longDescription}</p>
                </div>
              )
            })()}
          </div>,
          document.body,
        )}
    </div>
  )
}
