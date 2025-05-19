"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Gauge } from "lucide-react"

interface SpeedControlProps {
  speed: number
  setSpeed: (speed: number) => void
}

export default function SpeedControl({ speed, setSpeed }: SpeedControlProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Gauge className="h-4 w-4 text-purple-500" />
        <Label className="text-sm font-medium text-slate-700">Speed</Label>
      </div>
      <div className="flex items-center gap-4">
        <Slider
          value={[1000 - speed]}
          min={100}
          max={900}
          step={100}
          onValueChange={(value) => setSpeed(1000 - value[0])}
          className="flex-1"
        />
        <span className="text-sm w-12 text-right text-slate-700">{(1000 - speed) / 10}%</span>
      </div>
    </div>
  )
}
