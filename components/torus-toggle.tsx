"use client"

import { Switch } from "@/components/ui/switch"
import HelpTip from "@/components/help-tip"

interface TorusToggleProps {
  torusMode: boolean
  setTorusMode: (enabled: boolean) => void
}

export default function TorusToggle({ torusMode, setTorusMode }: TorusToggleProps) {
  return (
    <li className="group-row">
      <span className="group-label">
        <label htmlFor="torus-mode">Torus mode</label>
        <HelpTip label="About torus mode">
          <p className="m-0">
            In torus mode, the grid edges are connected. Cells that move off one edge of the screen appear on the
            opposite edge.
          </p>
        </HelpTip>
      </span>
      <div className="group-control">
        <Switch id="torus-mode" checked={torusMode} onCheckedChange={setTorusMode} />
      </div>
    </li>
  )
}
