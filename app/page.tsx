import GameOfLife from "@/components/game-of-life"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-400 via-purple-400 to-pink-400 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-md">Conway&apos;s Game of Life</h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            A cellular automaton where cells live or die based on simple rules, creating complex patterns and behaviors
          </p>
        </div>
        <GameOfLife />
      </div>
    </main>
  )
}
