"use client"

import { PopupButton } from "@/components/ui/popup-button"
import HelpTip from "@/components/help-tip"
import { PATTERNS } from "@/lib/game-of-life-data"

interface PatternSelectorProps {
  selectedPattern: string
  handlePatternChange: (pattern: string) => void
}

export default function PatternSelector({ selectedPattern, handlePatternChange }: PatternSelectorProps) {
  // Render pattern preview
  const renderPatternPreview = (pattern: (typeof PATTERNS)[0]) => {
    const patternHeight = pattern.grid.length
    const patternWidth = pattern.grid[0]?.length || 0
    const cellSize = 8

    if (patternWidth === 0) return null

    return (
      <div className="flex justify-center my-2">
        <div
          className="border border-[var(--line)] bg-[var(--card)]"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${patternWidth}, ${cellSize}px)`,
            gap: "1px",
            background: "var(--line)",
          }}
        >
          {pattern.grid.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: cell ? "var(--fg)" : "var(--card)",
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

  const pattern = PATTERNS.find((p) => p.name === selectedPattern)

  return (
    <li className="group-row">
      <span className="group-label">
        <label htmlFor="pattern-select">Pattern</label>
        {pattern && (
          <HelpTip label={`About ${pattern.name}`}>
            <div className="space-y-2">
              <h4>{pattern.name}</h4>
              <p className="m-0">{pattern.description}</p>
              {pattern.name !== "Random" && renderPatternPreview(pattern)}
              {getPatternDescription(pattern.name) && (
                <p className="m-0 text-xs text-muted-foreground">{getPatternDescription(pattern.name)}</p>
              )}
            </div>
          </HelpTip>
        )}
      </span>
      <div className="group-control">
        <PopupButton id="pattern-select" value={selectedPattern} onChange={(e) => handlePatternChange(e.target.value)}>
          {PATTERNS.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </PopupButton>
      </div>
    </li>
  )
}
