import { TopNav } from './components/nav/TopNav'
import { MeshGradient } from './components/motion/MeshGradient'
import { MagneticCursor } from './components/motion/MagneticCursor'

export default function App() {
  return (
    <main id="top" className="relative min-h-screen bg-bg">
      <MeshGradient />
      <MagneticCursor />
      <TopNav />
    </main>
  )
}
