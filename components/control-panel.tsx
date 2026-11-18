"use client"

import { Play, Pause, RotateCcw, Info } from "lucide-react"
import SpeedControl from "@/components/speed-control"
import RuleSelector from "@/components/rule-selector"
import PatternSelector from "@/components/pattern-selector"
import ThemeSelector from "@/components/theme-selector"
import DensityControl from "@/components/density-control"
import GameStats from "@/components/game-stats"
import TorusToggle from "@/components/torus-toggle"

interface ControlPanelProps {
  running: boolean
  setRunning: (running: boolean) => void
  resetGrid: () => void
  speed: number
  setSpeed: (speed: number) => void
  selectedRule: string
  handleRuleChange: (rule: string) => void
  selectedPattern: string
  handlePatternChange: (pattern: string) => void
  selectedTheme: string
  handleThemeChange: (theme: string) => void
  density: number
  setDensity: (density: number) => void
  generation: number
  livingCells: number
  isDesktop: boolean
  onInfoClick: () => void
  gridSize: number
  torusMode: boolean
  setTorusMode: (enabled: boolean) => void
}

export default function ControlPanel({
  running,
  setRunning,
  resetGrid,
  speed,
  setSpeed,
  selectedRule,
  handleRuleChange,
  selectedPattern,
  handlePatternChange,
  selectedTheme,
  handleThemeChange,
  density,
  setDensity,
  generation,
  livingCells,
  isDesktop,
  onInfoClick,
  gridSize,
  torusMode,
  setTorusMode,
}: ControlPanelProps) {
  return (
    <section className="panel overflow-hidden" aria-labelledby="controls-title">
      <div className="flex items-start justify-between gap-3 px-4 pt-4">
        <div>
          <h2 id="controls-title" className="m-0 text-[1.05rem] font-semibold tracking-[-0.02em]">
            Controls
          </h2>
          <p className="field-value m-0 mt-0.5">
            {gridSize} × {gridSize} grid
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`stamp ${running ? "stamp-live" : ""}`}>
            <span className="stamp-dot" aria-hidden="true" />
            {running ? "Running" : "Paused"}
          </span>
          <button type="button" onClick={onInfoClick} className="icon-button" aria-label="How to play">
            <Info className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-2 px-4 pb-4 pt-4">
        <button type="button" onClick={() => setRunning(!running)} className="action action-primary flex-1">
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? "Stop" : "Start"}
        </button>
        <button type="button" onClick={resetGrid} className="action flex-1">
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>

      <h3 className="field-label border-t border-[var(--line)] px-4 pb-1 pt-4">Simulation</h3>
      <ul className="group">
        <SpeedControl speed={speed} setSpeed={setSpeed} />
        <RuleSelector selectedRule={selectedRule} handleRuleChange={handleRuleChange} />
        <TorusToggle torusMode={torusMode} setTorusMode={setTorusMode} />
      </ul>

      <h3 className="field-label border-t border-[var(--line)] px-4 pb-1 pt-4">Board</h3>
      <ul className="group">
        <PatternSelector selectedPattern={selectedPattern} handlePatternChange={handlePatternChange} />
        {selectedPattern === "Random" && <DensityControl density={density} setDensity={setDensity} />}
        <ThemeSelector selectedTheme={selectedTheme} handleThemeChange={handleThemeChange} />
      </ul>

      <div className="border-t border-[var(--line)] px-4 py-4">
        <GameStats generation={generation} livingCells={livingCells} />
      </div>
    </section>
  )
}
