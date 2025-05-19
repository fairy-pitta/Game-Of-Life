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
      <DialogContent className="sm:max-w-md bg-white/95 border-purple-300 text-slate-800 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-purple-700">Rule: {rule.name}</DialogTitle>
          <DialogDescription className="text-slate-600">{rule.description}</DialogDescription>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="space-y-4 py-2 text-sm text-slate-700">
          <div>
            <h3 className="font-medium text-purple-700 mb-1">Rule Definition</h3>
            <p>
              <span className="font-semibold">Survival:</span> A living cell survives if it has{" "}
              {rule.survive.join(" or ")} neighbors.
            </p>
            <p>
              <span className="font-semibold">Birth:</span> A dead cell becomes alive if it has{" "}
              {rule.birth.join(" or ")} neighbors.
            </p>
            <p className="text-xs text-slate-500 italic mt-1">
              Rule notation: {rule.name} - The first digits represent survival conditions, the digits after the slash
              represent birth conditions.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-purple-700 mb-1">Characteristics</h3>
            <p>{rule.longDescription}</p>
          </div>

          {rule.examples && (
            <div>
              <h3 className="font-medium text-purple-700 mb-1">Examples</h3>
              <p>{rule.examples}</p>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose} className="border-purple-300 text-purple-700 hover:bg-purple-100">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
