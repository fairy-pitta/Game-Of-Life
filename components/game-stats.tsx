import { Badge } from "@/components/ui/badge"
import { Clock, Users } from "lucide-react"

interface GameStatsProps {
  generation: number
  livingCells: number
}

export default function GameStats({ generation, livingCells }: GameStatsProps) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-purple-500" />
        <span className="text-sm text-slate-700">Generation:</span>
        <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
          {generation}
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-purple-500" />
        <span className="text-sm text-slate-700">Living cells:</span>
        <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
          {livingCells}
        </Badge>
      </div>
    </div>
  )
}
