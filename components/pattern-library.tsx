"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LibraryIcon } from "lucide-react"
import type { Pattern } from "@/lib/game-of-life-data"

interface PatternLibraryProps {
  patterns: Pattern[]
  placePatternAt: (pattern: boolean[][], row: number, col: number) => void
  cellSize: number
  cellColor: string
}

export default function PatternLibrary({ patterns, placePatternAt, cellSize, cellColor }: PatternLibraryProps) {
  // Filter out the "Random" pattern
  const filteredPatterns = patterns.filter((pattern) => pattern.name !== "Random")

  // Group patterns by category
  const stillLifes = [
    {
      name: "Block",
      grid: [
        [true, true],
        [true, true],
      ],
    },
    {
      name: "Beehive",
      grid: [
        [false, true, true, false],
        [true, false, false, true],
        [false, true, true, false],
      ],
    },
    {
      name: "Loaf",
      grid: [
        [false, true, true, false],
        [true, false, false, true],
        [false, true, false, true],
        [false, false, true, false],
      ],
    },
  ]

  const oscillators = filteredPatterns.filter((p) => p.name === "Blinker" || p.name === "Pulsar" || p.name === "Toad")
  const spaceships = filteredPatterns.filter((p) => p.name === "Glider" || p.name === "Spaceship")
  const others = filteredPatterns.filter(
    (p) =>
      p.name !== "Block" &&
      p.name !== "Beehive" &&
      p.name !== "Loaf" &&
      p.name !== "Blinker" &&
      p.name !== "Pulsar" &&
      p.name !== "Toad" &&
      p.name !== "Glider" &&
      p.name !== "Spaceship",
  )

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, pattern: boolean[][]) => {
    // Create a JSON string representation of the pattern
    const patternData = JSON.stringify(pattern)

    // Set the drag data
    e.dataTransfer.setData("application/json", patternData)
    e.dataTransfer.effectAllowed = "copy"

    // Create a drag image
    const dragPreview = document.createElement("div")
    dragPreview.style.position = "absolute"
    dragPreview.style.top = "-1000px"
    dragPreview.style.left = "-1000px"
    dragPreview.style.width = "20px"
    dragPreview.style.height = "20px"
    dragPreview.style.backgroundColor = cellColor
    dragPreview.style.opacity = "0.7"
    document.body.appendChild(dragPreview)

    e.dataTransfer.setDragImage(dragPreview, 10, 10)

    // Remove the drag preview element after a short delay
    setTimeout(() => {
      document.body.removeChild(dragPreview)
    }, 0)
  }

  // Render a pattern preview
  const renderPatternPreview = (pattern: { name: string; grid: boolean[][] }) => {
    const patternHeight = pattern.grid.length
    const patternWidth = pattern.grid[0]?.length || 0
    const previewCellSize = 8

    return (
      <div className="flex flex-col items-center">
        <div
          className="border border-slate-300 bg-white cursor-grab active:cursor-grabbing hover:border-purple-500 transition-colors mb-1"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${patternWidth}, ${previewCellSize}px)`,
            gap: "1px",
          }}
          draggable
          onDragStart={(e) => handleDragStart(e, pattern.grid)}
        >
          {pattern.grid.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                style={{
                  width: `${previewCellSize}px`,
                  height: `${previewCellSize}px`,
                  backgroundColor: cell ? cellColor : "white",
                }}
              />
            )),
          )}
        </div>
        <span className="text-xs text-center">{pattern.name}</span>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <LibraryIcon className="h-4 w-4 text-purple-500" />
          <CardTitle>Pattern Library</CardTitle>
        </div>
        <CardDescription>Drag patterns to the grid</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="still">Still</TabsTrigger>
            <TabsTrigger value="oscillators">Osc</TabsTrigger>
            <TabsTrigger value="spaceships">Ship</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="max-h-[400px] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
              {filteredPatterns.map((pattern) => (
                <div key={pattern.name}>{renderPatternPreview(pattern)}</div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="still" className="max-h-[400px] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
              {stillLifes.map((pattern) => (
                <div key={pattern.name}>{renderPatternPreview(pattern)}</div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="oscillators" className="max-h-[400px] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
              {oscillators.map((pattern) => (
                <div key={pattern.name}>{renderPatternPreview(pattern)}</div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="spaceships" className="max-h-[400px] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
              {spaceships.map((pattern) => (
                <div key={pattern.name}>{renderPatternPreview(pattern)}</div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
