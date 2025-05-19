"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Play, Pause, RotateCcw, Info, Zap } from "lucide-react"
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
    <Card className="bg-white/80 border-purple-300 backdrop-blur-sm text-slate-800">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-500" />
            <CardTitle className="text-purple-700">Controls</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onInfoClick}
            className="h-8 w-8 text-purple-500 hover:text-purple-700 hover:bg-purple-100"
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-slate-600">
          Manage simulation settings ({gridSize}x{gridSize} grid)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 justify-center">
          <Button
            onClick={() => setRunning(!running)}
            variant={running ? "destructive" : "default"}
            className={`flex items-center gap-2 w-32 ${running ? "bg-pink-500 hover:bg-pink-600" : "bg-purple-500 hover:bg-purple-600"}`}
          >
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {running ? "Stop" : "Start"}
          </Button>

          <Button
            onClick={resetGrid}
            variant="outline"
            className="flex items-center gap-2 w-32 border-purple-300 text-purple-700 hover:bg-purple-100"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        <Separator className="bg-purple-200" />

        <SpeedControl speed={speed} setSpeed={setSpeed} />

        <Separator className="bg-purple-200" />

        <RuleSelector selectedRule={selectedRule} handleRuleChange={handleRuleChange} />

        <Separator className="bg-purple-200" />

        <PatternSelector selectedPattern={selectedPattern} handlePatternChange={handlePatternChange} />

        {selectedPattern === "Random" && <DensityControl density={density} setDensity={setDensity} />}

        <Separator className="bg-purple-200" />

        <ThemeSelector selectedTheme={selectedTheme} handleThemeChange={handleThemeChange} />

        <Separator className="bg-purple-200" />

        <TorusToggle torusMode={torusMode} setTorusMode={setTorusMode} />

        <Separator className="bg-purple-200" />

        <GameStats generation={generation} livingCells={livingCells} />
      </CardContent>
    </Card>
  )
}
