"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Layers } from "lucide-react"

interface DensityControlProps {
  density: number
  setDensity: (density: number) => void
}

export default function DensityControl({ density, setDensity }: DensityControlProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Layers className="h-4 w-4 text-purple-500" />
        <Label className="text-sm font-medium text-slate-700">Density</Label>
      </div>
      <div className="flex items-center gap-4">
        <Slider
          value={[density]}
          min={10}
          max={50}
          step={5}
          onValueChange={(value) => setDensity(value[0])}
          className="flex-1"
        />
        <span className="text-sm w-12 text-right text-slate-700">{density}%</span>
      </div>
    </div>
  )
}
