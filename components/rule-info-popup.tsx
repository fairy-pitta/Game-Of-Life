"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import type { Rule } from "@/lib/game-of-life-data"

interface RuleInfoPopupProps {
  open: boolean
  onClose: () => void
  rule: Rule
}

export default function RuleInfoPopup({ open, onClose, rule }: RuleInfoPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Rule: {rule.name}</DialogTitle>
          <DialogDescription className="text-muted-foreground">{rule.description}</DialogDescription>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="space-y-4 py-2 text-sm text-muted-foreground">
          <div>
            <h3 className="field-label mb-1.5">Rule Definition</h3>
            <p>
              <span className="font-semibold">Survival:</span> A living cell survives if it has{" "}
              {rule.survive.join(" or ")} neighbors.
            </p>
            <p>
              <span className="font-semibold">Birth:</span> A dead cell becomes alive if it has{" "}
              {rule.birth.join(" or ")} neighbors.
            </p>
            <p className="text-xs text-faint italic mt-1">
              Rule notation: {rule.name} - The first digits represent survival conditions, the digits after the slash
              represent birth conditions.
            </p>
          </div>

          <div>
            <h3 className="field-label mb-1.5">Characteristics</h3>
            <p>{rule.longDescription}</p>
          </div>

          {rule.examples && (
            <div>
              <h3 className="field-label mb-1.5">Examples</h3>
              <p>{rule.examples}</p>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="action">
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
