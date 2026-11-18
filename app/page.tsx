import GameOfLife from "@/components/game-of-life"

export default function Home() {
  return (
    <main className="page">
      <header className="mb-10">
        <p className="eyebrow">Cellular automaton</p>
        <h1 className="display">Conway&apos;s Game of Life</h1>
        <p className="lede">
          A cellular automaton where cells live or die based on simple rules, creating complex patterns and behaviors
        </p>
      </header>
      <GameOfLife />
    </main>
  )
}
