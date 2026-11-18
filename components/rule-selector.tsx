"use client"

import { PopupButton } from "@/components/ui/popup-button"
import HelpTip from "@/components/help-tip"
import { RULES } from "@/lib/game-of-life-data"

interface RuleSelectorProps {
  selectedRule: string
  handleRuleChange: (rule: string) => void
}

export default function RuleSelector({ selectedRule, handleRuleChange }: RuleSelectorProps) {
  const rule = RULES.find((r) => r.name === selectedRule) || RULES[0]
  return (
    <li className="group-row">
      <span className="group-label">
        <label htmlFor="rule-select">Rule</label>
        <HelpTip label={`About rule ${rule.name}`}>
          <div className="space-y-2">
            <h4>
              <span className="font-mono">{rule.name}</span> · {rule.description}
            </h4>
            <dl className="m-0 space-y-1 text-xs">
              <div>
                <dt className="inline font-semibold">Survival:</dt> <dd className="inline m-0">{rule.survive.join(" or ")} neighbors</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Birth:</dt> <dd className="inline m-0">{rule.birth.join(" or ")} neighbors</dd>
              </div>
            </dl>
            <p className="m-0 text-xs text-muted-foreground">{rule.longDescription}</p>
          </div>
        </HelpTip>
      </span>
      <div className="group-control">
        <PopupButton id="rule-select" value={selectedRule} onChange={(e) => handleRuleChange(e.target.value)}>
          {RULES.map((r) => (
            <option key={r.name} value={r.name}>
              {r.name} · {r.description}
            </option>
          ))}
        </PopupButton>
      </div>
    </li>
  )
}
