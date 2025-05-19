// Create an empty grid
export const createEmptyGrid = (gridSize: number) => {
  return Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(false))
}

// Create a random grid with specified density
export const createRandomGrid = (density: number, gridSize: number) => {
  return Array(gridSize)
    .fill(null)
    .map(() =>
      Array(gridSize)
        .fill(null)
        .map(() => Math.random() < density),
    )
}

// Place a pattern in the center of the grid
export const placePatternInCenter = (pattern: boolean[][], gridSize: number) => {
  const grid = createEmptyGrid(gridSize)
  const patternHeight = pattern.length
  const patternWidth = pattern[0]?.length || 0

  if (patternWidth === 0) return createRandomGrid(0.3, gridSize)

  const startRow = Math.floor((gridSize - patternHeight) / 2)
  const startCol = Math.floor((gridSize - patternWidth) / 2)

  for (let i = 0; i < patternHeight; i++) {
    for (let j = 0; j < patternWidth; j++) {
      if (startRow + i < gridSize && startCol + j < gridSize) {
        grid[startRow + i][startCol + j] = pattern[i][j]
      }
    }
  }

  return grid
}

// Count living neighbors around a cell
export const countNeighbors = (grid: boolean[][], x: number, y: number, gridSize: number, torusMode = false) => {
  let count = 0
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]

  for (const [dx, dy] of directions) {
    let newX = x + dx
    let newY = y + dy

    if (torusMode) {
      // Wrap around in torus mode
      newX = (newX + gridSize) % gridSize
      newY = (newY + gridSize) % gridSize
      count += grid[newX]?.[newY] ? 1 : 0
    } else {
      // Check boundaries in normal mode
      if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
        count += grid[newX]?.[newY] ? 1 : 0
      }
    }
  }

  return count
}
