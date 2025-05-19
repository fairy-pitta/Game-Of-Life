"use client"

import { useState, useRef } from "react"
import { createPortal } from "react-dom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { LayoutGrid, HelpCircle } from "lucide-react"
import { PATTERNS } from "@/lib/game-of-life-data"

interface PatternSelectorProps {
  selectedPattern: string
  handlePatternChange: (pattern: string) => void
}

export default function PatternSelector({ selectedPattern, handlePatternChange }: PatternSelectorProps) {
  const [hoveredPattern, setHoveredPattern] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const tooltipWidth = 300 // Fixed width for tooltip

  const handleMouseEnter = (patternName: string, button: HTMLButtonElement) => {
    const rect = button.getBoundingClientRect()
    setTooltipPosition({
      top: rect.top,
      left: rect.left - tooltipWidth - 10, // Position to the left of the button with some spacing
    })
    setHoveredPattern(patternName)
  }

  // Render pattern preview
  const renderPatternPreview = (pattern: (typeof PATTERNS)[0]) => {
    const patternHeight = pattern.grid.length
    const patternWidth = pattern.grid[0]?.length || 0
    const cellSize = 8

    if (patternWidth === 0) return null

    return (
      <div className="flex justify-center my-2">
        <div
          className="border border-purple-200 bg-white"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${patternWidth}, ${cellSize}px)`,
            gap: "1px",
          }}
        >
          {pattern.grid.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: cell ? "#8b5cf6" : "white",
                }}
              />
            )),
          )}
        </div>
      </div>
    )
  }

  const getPatternDescription = (patternName: string) => {
    switch (patternName) {
      case "Glider":
        return "The Glider is one of the most famous patterns in Conway's Game of Life. It moves diagonally across the grid, shifting one cell diagonally every four generations."
      case "Blinker":
        return "The Blinker is a simple oscillator that alternates between a horizontal line of three cells and a vertical line of three cells. It has a period of 2, meaning it returns to its original state after two generations."
      case "Block":
        return "The Block is a still life pattern - it doesn't change from one generation to the next. It's one of the simplest stable patterns in the Game of Life."
      case "Beehive":
        return "The Beehive is a still life pattern that resembles a beehive. It's stable and doesn't change from one generation to the next."
      case "Loaf":
        return "The Loaf is a still life pattern that resembles a loaf of bread. It's stable and doesn't change from one generation to the next."
      case "Toad":
        return "The Toad is an oscillator with a period of 2. It alternates between two different states and is one of the most common oscillators in the Game of Life."
      case "Gosper Glider Gun":
        return "The Gosper Glider Gun is a pattern that periodically emits gliders. It was the first known pattern to exhibit infinite growth in the Game of Life. It produces a new glider every 30 generations."
      case "Pulsar":
        return "The Pulsar is one of the most common oscillators in the Game of Life. It has a period of 3, meaning it cycles through three different states before returning to its original configuration."
      case "Spaceship":
        return "The Spaceship is a pattern that moves horizontally across the grid. It's a type of 'spaceship' in Conway's Game of Life terminology - a pattern that translates itself across the grid."
      default:
        return ""
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <LayoutGrid className="h-4 w-4 text-purple-500" />
        <Label className="text-sm font-medium text-slate-700">Pattern</Label>
      </div>
      <Select value={selectedPattern} onValueChange={handlePatternChange}>
        <SelectTrigger className="w-full bg-white border-purple-200 text-slate-700">
          <SelectValue placeholder="Select pattern" />
        </SelectTrigger>
        <SelectContent className="bg-white border-purple-200 text-slate-700">
          {PATTERNS.map((pattern) => (
            <SelectItem key={pattern.name} value={pattern.name} className="focus:bg-purple-100 focus:text-purple-800">
              <div className="flex items-center justify-between w-full">
                <span>
                  {pattern.name} - {pattern.description}
                </span>
                {pattern.name !== "Random" && (
                  <button
                    ref={(el) => {
                      if (el) buttonRefs.current.set(pattern.name, el)
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={(e) => handleMouseEnter(pattern.name, e.currentTarget)}
                    onMouseLeave={() => setHoveredPattern(null)}
                    className="ml-2 text-purple-500 hover:text-purple-700 focus:outline-none"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </button>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hoveredPattern &&
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
              const pattern = PATTERNS.find((p) => p.name === hoveredPattern)
              if (!pattern) return null
              return (
                <div className="space-y-2">
                  <h4 className="font-medium text-purple-700">{pattern.name}</h4>
                  <p className="text-sm">{pattern.description}</p>
                  {renderPatternPreview(pattern)}
                  <p className="text-xs">{getPatternDescription(pattern.name)}</p>
                </div>
              )
            })()}
          </div>,
          document.body,
        )}
    </div>
  )
}
