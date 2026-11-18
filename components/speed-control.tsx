"use client"

import { Slider } from "@/components/ui/slider"

interface SpeedControlProps {
  speed: number
  setSpeed: (speed: number) => void
}

export default function SpeedControl({ speed, setSpeed }: SpeedControlProps) {
  return (
    <li className="group-row">
      <span className="group-label" id="speed-label">Speed</span>
      <div className="group-control">
        <Slider
          value={[1000 - speed]}
          min={100}
          max={900}
          step={100}
          onValueChange={(value) => setSpeed(1000 - value[0])}
          className="flex-1"
          aria-labelledby="speed-label"
        />
        <span className="field-value w-10 text-right">{(1000 - speed) / 10}%</span>
      </div>
    </li>
  )
}
