"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import type { Rule } from "@/lib/game-of-life-data"

interface InfoPopupProps {
  open: boolean
  onClose: () => void
  currentRule: Rule
  torusMode: boolean
}

export default function InfoPopup({ open, onClose, currentRule, torusMode }: InfoPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 border-purple-300 text-slate-800 backdrop-blur-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-purple-700">Game of Life - How to Play</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <DialogDescription className="text-slate-600">
            Conway&apos;s Game of Life is a cellular automaton devised by mathematician John Conway.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2 text-sm text-slate-700 max-h-[60vh] overflow-y-auto">
          <div>
            <h3 className="font-medium text-purple-700 mb-1">Basic Controls</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Click on cells to toggle their state (only when simulation is stopped)</li>
              <li>Use the Start/Stop button to control the simulation</li>
              <li>Use Reset to return to the initial pattern</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-purple-700 mb-1">Control Panel Options</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">Speed:</span> Adjust how quickly the simulation runs. Higher values make
                the simulation run faster.
              </li>
              <li>
                <span className="font-semibold">Rule:</span> Select different rule sets that determine when cells live
                or die. Hover over the help icon for detailed explanations of each rule.
              </li>
              <li>
                <span className="font-semibold">Pattern:</span> Choose from various predefined patterns or a random
                configuration. Hover over the help icon to see pattern details.
              </li>
              <li>
                <span className="font-semibold">Density:</span> When using the Random pattern, this controls how many
                cells are initially alive (higher values create more populated grids).
              </li>
              <li>
                <span className="font-semibold">Theme:</span> Change the color scheme of the grid and cells.
              </li>
              <li>
                <span className="font-semibold">Torus Mode:</span> When enabled, the grid wraps around at the edges,
                connecting opposite sides.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-purple-700 mb-1">Current Rule: {currentRule.name}</h3>
            <p>
              A cell survives with {currentRule.survive.join(" or ")} neighbors and is born with{" "}
              {currentRule.birth.join(" or ")} neighbors.
            </p>
            <p className="text-xs text-slate-500 italic mt-1">
              Rule notation: The first digits represent survival conditions, the digits after the slash represent birth
              conditions.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-purple-700 mb-1">Torus Mode: {torusMode ? "On" : "Off"}</h3>
            <p>
              {torusMode
                ? "Torus mode is enabled. The grid wraps around at the edges, so cells at the edge of the grid are neighbors with cells at the opposite edge."
                : "Torus mode is disabled. The grid has boundaries, and cells at the edge of the grid have fewer neighbors."}
            </p>
          </div>

          <div>
            <h3 className="font-medium text-purple-700 mb-1">Statistics</h3>
            <p>
              The control panel displays the current generation number and the count of living cells, allowing you to
              track the evolution of your patterns.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-purple-700 mb-1">About the Game of Life</h3>
            <p>
              The Game of Life is played on a grid of cells, each of which can be either alive or dead. The state of
              each cell in the next generation is determined by its current state and the number of live neighbors it
              has, according to the rules.
            </p>
            <p className="mt-1">
              Despite its simple rules, the Game of Life can create complex patterns and behaviors, making it a
              fascinating subject of study in mathematics and computer science.
            </p>
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <Button variant="outline" onClick={onClose} className="border-purple-300 text-purple-700 hover:bg-purple-100">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
