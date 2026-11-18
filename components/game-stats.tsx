interface GameStatsProps {
  generation: number
  livingCells: number
}

export default function GameStats({ generation, livingCells }: GameStatsProps) {
  return (
    <dl className="label-grid">
      <div>
        <dt>Generation</dt>
        <dd>{generation}</dd>
      </div>
      <div>
        <dt>Living cells</dt>
        <dd>{livingCells}</dd>
      </div>
    </dl>
  )
}
