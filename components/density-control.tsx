"use client"

import { Slider } from "@/components/ui/slider"

interface DensityControlProps {
  density: number
  setDensity: (density: number) => void
}

export default function DensityControl({ density, setDensity }: DensityControlProps) {
  return (
    <li className="group-row">
      <span className="group-label" id="density-label">Density</span>
      <div className="group-control">
        <Slider
          value={[density]}
          min={10}
          max={50}
          step={5}
          onValueChange={(value) => setDensity(value[0])}
          className="flex-1"
          aria-labelledby="density-label"
        />
        <span className="field-value w-10 text-right">{density}%</span>
      </div>
    </li>
  )
}
