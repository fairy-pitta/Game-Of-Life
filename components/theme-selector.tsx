"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Palette } from "lucide-react"
import { THEMES } from "@/lib/game-of-life-data"

interface ThemeSelectorProps {
  selectedTheme: string
  handleThemeChange: (theme: string) => void
}

export default function ThemeSelector({ selectedTheme, handleThemeChange }: ThemeSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Palette className="h-4 w-4 text-purple-500" />
        <Label className="text-sm font-medium text-slate-700">Theme</Label>
      </div>
      <Select value={selectedTheme} onValueChange={handleThemeChange}>
        <SelectTrigger className="w-full bg-white border-purple-200 text-slate-700">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent className="bg-white border-purple-200 text-slate-700">
          {THEMES.map((theme) => (
            <SelectItem key={theme.name} value={theme.name} className="focus:bg-purple-100 focus:text-purple-800">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.cellColor }} />
                {theme.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
