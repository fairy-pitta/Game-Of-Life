"use client"

import { PopupButton } from "@/components/ui/popup-button"
import { THEMES } from "@/lib/game-of-life-data"

interface ThemeSelectorProps {
  selectedTheme: string
  handleThemeChange: (theme: string) => void
}

export default function ThemeSelector({ selectedTheme, handleThemeChange }: ThemeSelectorProps) {
  const current = THEMES.find((theme) => theme.name === selectedTheme) || THEMES[0]
  return (
    <li className="group-row">
      <label className="group-label" htmlFor="theme-select">
        Theme
      </label>
      <div className="group-control">
        <span
          className="h-3 w-3 flex-none rounded-full"
          style={{ backgroundColor: current.cellColor }}
          aria-hidden="true"
        />
        <PopupButton id="theme-select" value={selectedTheme} onChange={(e) => handleThemeChange(e.target.value)}>
          {THEMES.map((theme) => (
            <option key={theme.name} value={theme.name}>
              {theme.name}
            </option>
          ))}
        </PopupButton>
      </div>
    </li>
  )
}
