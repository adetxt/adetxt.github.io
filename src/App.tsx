import { TopNav } from './components/nav/TopNav'
import { MeshGradient } from './components/motion/MeshGradient'
import { MagneticCursor } from './components/motion/MagneticCursor'
import { BentoGrid } from './components/bento/BentoGrid'
import { HeroTile } from './components/tiles/HeroTile'
import { ProjectTile } from './components/tiles/ProjectTile'
import { projects } from './data/projects'

export default function App() {
  return (
    <main id="top" className="relative min-h-screen bg-bg">
      <MeshGradient />
      <MagneticCursor />
      <TopNav />
      <BentoGrid>
        <HeroTile />
        {projects.map((p, i) => (
          <ProjectTile
            key={p.id}
            project={p}
            className={i === 0 ? 'lg:col-span-5' : i === 1 ? 'lg:col-span-7' : 'lg:col-span-4'}
          />
        ))}
      </BentoGrid>
    </main>
  )
}
