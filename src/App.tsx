import { TopNav } from './components/nav/TopNav'
import { MeshGradient } from './components/motion/MeshGradient'
import { MagneticCursor } from './components/motion/MagneticCursor'
import { BentoGrid } from './components/bento/BentoGrid'
import { HeroTile } from './components/tiles/HeroTile'

export default function App() {
  return (
    <main id="top" className="relative min-h-screen bg-bg">
      <MeshGradient />
      <MagneticCursor />
      <TopNav />
      <BentoGrid>
        <HeroTile />
      </BentoGrid>
    </main>
  )
}
