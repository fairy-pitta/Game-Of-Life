"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ZoomIn, ZoomOut } from "lucide-react"
import { useState } from "react"

interface ZoomControlsProps {
  zoomLevel: number
  onZoomChange: (zoom: number) => void
}

export default function ZoomControls({ zoomLevel, onZoomChange }: ZoomControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleZoomIn = () => {
    const newZoom = Math.min(2, zoomLevel + 0.1)
    onZoomChange(newZoom)
  }

  const handleZoomOut = () => {
    const newZoom = Math.max(0.2, zoomLevel - 0.1)
    onZoomChange(newZoom)
  }

  const handleSliderChange = (value: number[]) => {
    onZoomChange(value[0])
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2 flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={handleZoomOut} className="h-8 w-8">
        <ZoomOut className="h-4 w-4" />
      </Button>

      {isExpanded && (
        <Slider value={[zoomLevel]} min={0.2} max={2} step={0.1} onValueChange={handleSliderChange} className="w-24" />
      )}

      <Button variant="outline" size="icon" onClick={handleZoomIn} className="h-8 w-8">
        <ZoomIn className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="text-xs h-8 px-2">
        {Math.round(zoomLevel * 100)}%
      </Button>
    </div>
  )
}
