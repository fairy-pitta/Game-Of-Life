"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"

interface GameGridProps {
  grid: boolean[][]
  toggleCellState: (i: number, j: number) => void
  gridSize: number
  cellColor: string
  bgColor: string
  hoverColor: string
  gridLineColor: string
}

export default function GameGrid({
  grid,
  toggleCellState,
  gridSize,
  cellColor,
  bgColor,
  hoverColor,
  gridLineColor,
}: GameGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 600 })

  // キャンバスサイズを計算（正方形に固定）
  useEffect(() => {
    const updateCanvasSize = () => {
      const container = canvasRef.current?.parentElement
      if (container) {
        const containerWidth = container.clientWidth
        const containerHeight = container.clientHeight
        const size = Math.min(containerWidth, containerHeight, 600) // 最大サイズを600pxに制限
        setCanvasSize({ width: size, height: size })
      }
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)
    return () => window.removeEventListener("resize", updateCanvasSize)
  }, [])

  // グリッドを描画
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // キャンバスをクリア
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // セルサイズを計算
    const cellWidth = canvas.width / gridSize
    const cellHeight = canvas.height / gridSize

    // グリッド線を描画（セルサイズが十分大きい場合のみ）
    if (cellWidth > 3) {
      ctx.strokeStyle = gridLineColor
      ctx.lineWidth = 0.5

      for (let i = 0; i <= gridSize; i++) {
        // 横線
        ctx.beginPath()
        ctx.moveTo(0, i * cellHeight)
        ctx.lineTo(canvas.width, i * cellHeight)
        ctx.stroke()

        // 縦線
        ctx.beginPath()
        ctx.moveTo(i * cellWidth, 0)
        ctx.lineTo(i * cellWidth, canvas.height)
        ctx.stroke()
      }
    }

    // セルを描画
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (grid[i]?.[j]) {
          ctx.fillStyle = cellColor
          ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight)
        }
      }
    }

    // ホバー中のセルを描画
    if (hoveredCell && !grid[hoveredCell.row]?.[hoveredCell.col]) {
      ctx.fillStyle = hoverColor
      ctx.fillRect(hoveredCell.col * cellWidth, hoveredCell.row * cellHeight, cellWidth, cellHeight)
    }
  }, [grid, hoveredCell, gridSize, cellColor, bgColor, hoverColor, gridLineColor, canvasSize])

  // マウスイベントハンドラ
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cellWidth = canvas.width / gridSize
    const cellHeight = canvas.height / gridSize

    const col = Math.floor(x / cellWidth)
    const row = Math.floor(y / cellHeight)

    if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
      setHoveredCell({ row, col })
    } else {
      setHoveredCell(null)
    }
  }

  const handleMouseLeave = () => {
    setHoveredCell(null)
  }

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cellWidth = canvas.width / gridSize
    const cellHeight = canvas.height / gridSize

    const col = Math.floor(x / cellWidth)
    const row = Math.floor(y / cellHeight)

    if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
      toggleCellState(row, col)
    }
  }

  return (
    <div className="relative border border-purple-300 rounded-xl shadow-lg overflow-hidden bg-white/80 backdrop-blur-sm p-4">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="cursor-pointer mx-auto rounded-lg shadow-inner shadow-purple-200"
        style={{ display: "block", width: `${canvasSize.width}px`, height: `${canvasSize.height}px` }}
      />
    </div>
  )
}
