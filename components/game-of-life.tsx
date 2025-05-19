"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import GameGrid from "@/components/game-grid"
import ControlPanel from "@/components/control-panel"
import InfoPopup from "@/components/info-popup"
import { PATTERNS, RULES, THEMES } from "@/lib/game-of-life-data"
import { createEmptyGrid, createRandomGrid, placePatternInCenter, countNeighbors } from "@/lib/game-of-life-utils"

// Fixed grid size of 50x50
const GRID_SIZE = 50

export default function GameOfLife() {
  // Initialize with empty grid first to avoid hydration errors
  const [grid, setGrid] = useState<boolean[][]>(() => createEmptyGrid(GRID_SIZE))
  const [running, setRunning] = useState(false)
  const [speed, setSpeed] = useState(500) // Update speed in milliseconds
  const [selectedRule, setSelectedRule] = useState<string>("23/3")
  const [selectedPattern, setSelectedPattern] = useState<string>("Random")
  const [selectedTheme, setSelectedTheme] = useState<string>("Pastel")
  const [generation, setGeneration] = useState(0)
  const [density, setDensity] = useState(30) // Random pattern density (%)
  const [infoOpen, setInfoOpen] = useState(false)
  const [torusMode, setTorusMode] = useState(false) // Torus mode state
  const [initialized, setInitialized] = useState(false)

  const runningRef = useRef(running)
  runningRef.current = running

  // Check if the screen is at least large size
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  // Get the currently selected rule and theme
  const currentRule = RULES.find((rule) => rule.name === selectedRule) || RULES[0]
  const currentTheme = THEMES.find((theme) => theme.name === selectedTheme) || THEMES[0]

  // Initialize the random grid on client-side only to avoid hydration errors
  useEffect(() => {
    if (!initialized) {
      setGrid(createRandomGrid(density / 100, GRID_SIZE))
      setInitialized(true)
    }
  }, [density, initialized])

  // Function to update the grid to the next generation
  const runSimulation = useCallback(() => {
    if (!runningRef.current) return

    setGrid((currentGrid) => {
      return currentGrid.map((row, i) =>
        row.map((cell, j) => {
          const neighbors = countNeighbors(currentGrid, i, j, GRID_SIZE, torusMode) // Pass torus mode
          if (cell) {
            // For living cells
            return currentRule.survive.includes(neighbors)
          } else {
            // For dead cells
            return currentRule.birth.includes(neighbors)
          }
        }),
      )
    })

    setGeneration((g) => g + 1)

    setTimeout(runSimulation, speed)
  }, [speed, currentRule, torusMode]) // Add torus mode to dependency array

  // Start/stop simulation
  useEffect(() => {
    if (running) {
      runSimulation()
    }
  }, [running, runSimulation])

  // Toggle cell state when clicked
  const toggleCellState = (i: number, j: number) => {
    if (running) return // Disable editing while simulation is running

    const newGrid = [...grid]
    newGrid[i][j] = !newGrid[i][j]
    setGrid(newGrid)
  }

  // Reset grid
  const resetGrid = () => {
    const pattern = PATTERNS.find((p) => p.name === selectedPattern)
    if (pattern) {
      if (pattern.name === "Random") {
        setGrid(createRandomGrid(density / 100, GRID_SIZE))
      } else {
        setGrid(placePatternInCenter(pattern.grid, GRID_SIZE))
      }
    } else {
      setGrid(createEmptyGrid(GRID_SIZE))
    }
    setRunning(false)
    setGeneration(0)
  }

  // Handle pattern change
  const handlePatternChange = (value: string) => {
    setSelectedPattern(value)
    const pattern = PATTERNS.find((p) => p.name === value)
    if (pattern) {
      if (pattern.name === "Random") {
        setGrid(createRandomGrid(density / 100, GRID_SIZE))
      } else {
        setGrid(placePatternInCenter(pattern.grid, GRID_SIZE))
      }
      setGeneration(0)
      setRunning(false)
    }
  }

  // Handle rule change
  const handleRuleChange = (value: string) => {
    setSelectedRule(value)
    if (running) {
      setRunning(false)
      setTimeout(() => setRunning(true), 100)
    }
  }

  // Handle theme change
  const handleThemeChange = (value: string) => {
    setSelectedTheme(value)
  }

  // Calculate number of living cells
  const livingCells = grid.flat().filter(Boolean).length

  return (
    <div className="w-full max-w-full mx-auto">
      <div className={`flex ${isDesktop ? "flex-row" : "flex-col"} gap-6`}>
        <div className="flex-1 relative">
          <GameGrid
            grid={grid}
            toggleCellState={toggleCellState}
            gridSize={GRID_SIZE}
            cellColor={currentTheme.cellColor}
            bgColor={currentTheme.bgColor}
            hoverColor={currentTheme.hoverColor}
            gridLineColor={currentTheme.gridLineColor}
          />
        </div>

        <div className={`${isDesktop ? "w-96" : "w-full"}`}>
          <ControlPanel
            running={running}
            setRunning={setRunning}
            resetGrid={resetGrid}
            speed={speed}
            setSpeed={setSpeed}
            selectedRule={selectedRule}
            handleRuleChange={handleRuleChange}
            selectedPattern={selectedPattern}
            handlePatternChange={handlePatternChange}
            selectedTheme={selectedTheme}
            handleThemeChange={handleThemeChange}
            density={density}
            setDensity={setDensity}
            generation={generation}
            livingCells={livingCells}
            isDesktop={isDesktop}
            onInfoClick={() => setInfoOpen(true)}
            gridSize={GRID_SIZE}
            torusMode={torusMode}
            setTorusMode={setTorusMode}
          />
        </div>
      </div>

      <InfoPopup open={infoOpen} onClose={() => setInfoOpen(false)} currentRule={currentRule} torusMode={torusMode} />
    </div>
  )
}
