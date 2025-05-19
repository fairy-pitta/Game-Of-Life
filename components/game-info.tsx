import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoIcon } from "lucide-react"
import type { Rule } from "@/lib/game-of-life-data"

interface GameInfoProps {
  currentRule: Rule
}

export default function GameInfo({ currentRule }: GameInfoProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <InfoIcon className="h-4 w-4 text-slate-500" />
          <CardTitle>Game Info</CardTitle>
        </div>
        <CardDescription>How to play and current rules</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-slate-600 space-y-2">
        <p>Click on cells to toggle their state (only when simulation is stopped).</p>
        <p>Drag patterns from the library and drop them onto the grid.</p>
        <p>
          <span className="font-medium">Current rule ({currentRule.name}):</span> A cell survives with{" "}
          {currentRule.survive.join(" or ")} neighbors and is born with {currentRule.birth.join(" or ")} neighbors.
        </p>
        <p className="text-xs text-slate-500 italic">
          Rule notation: The first digits represent survival conditions, the digits after the slash represent birth
          conditions.
        </p>
      </CardContent>
    </Card>
  )
}
