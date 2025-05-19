"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import type { Pattern } from "@/lib/game-of-life-data"

interface PatternInfoPopupProps {
  open: boolean
  onClose: () => void
  pattern: Pattern
}

export default function PatternInfoPopup({ open, onClose, pattern }: PatternInfoPopupProps) {
  // パターンのプレビューを描画
  const renderPatternPreview = () => {
    const patternHeight = pattern.grid.length
    const patternWidth = pattern.grid[0]?.length || 0
    const cellSize = 16

    return (
      <div className="flex justify-center my-4">
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 border-purple-300 text-slate-800 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-purple-700">Pattern: {pattern.name}</DialogTitle>
          <DialogDescription className="text-slate-600">{pattern.description}</DialogDescription>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="space-y-4 py-2 text-sm text-slate-700">
          {renderPatternPreview()}

          <div>
            <h3 className="font-medium text-purple-700 mb-1">Pattern Information</h3>
            <p>
              {pattern.name === "Glider"
                ? "The Glider is one of the most famous patterns in Conway's Game of Life. It's a small pattern that moves diagonally across the grid, shifting one cell diagonally every four generations."
                : pattern.name === "Blinker"
                  ? "The Blinker is a simple oscillator that alternates between a horizontal line of three cells and a vertical line of three cells. It has a period of 2, meaning it returns to its original state after two generations."
                  : pattern.name === "Block"
                    ? "The Block is a still life pattern - it doesn't change from one generation to the next. It's one of the simplest stable patterns in the Game of Life."
                    : pattern.name === "Beehive"
                      ? "The Beehive is a still life pattern that resembles a beehive. It's stable and doesn't change from one generation to the next."
                      : pattern.name === "Loaf"
                        ? "The Loaf is a still life pattern that resembles a loaf of bread. It's stable and doesn't change from one generation to the next."
                        : pattern.name === "Toad"
                          ? "The Toad is an oscillator with a period of 2. It alternates between two different states and is one of the most common oscillators in the Game of Life."
                          : pattern.name === "Gosper Glider Gun"
                            ? "The Gosper Glider Gun is a pattern that periodically emits gliders. It was the first known pattern to exhibit infinite growth in the Game of Life. It produces a new glider every 30 generations."
                            : pattern.name === "Pulsar"
                              ? "The Pulsar is one of the most common oscillators in the Game of Life. It has a period of 3, meaning it cycles through three different states before returning to its original configuration."
                              : pattern.name === "Spaceship"
                                ? "The Spaceship is a pattern that moves horizontally across the grid. It's a type of 'spaceship' in Conway's Game of Life terminology - a pattern that translates itself across the grid."
                                : ""}
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose} className="border-purple-300 text-purple-700 hover:bg-purple-100">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
