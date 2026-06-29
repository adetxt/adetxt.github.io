import { TopNav } from './components/nav/TopNav'
import { MeshGradient } from './components/motion/MeshGradient'
import { MagneticCursor } from './components/motion/MagneticCursor'
import { BentoGrid } from './components/bento/BentoGrid'
import { HeroTile } from './components/tiles/HeroTile'
import { ProjectTile } from './components/tiles/ProjectTile'
import { TechStackTile } from './components/tiles/TechStackTile'
import { NowBuildingTile } from './components/tiles/NowBuildingTile'
import { MusicTile } from './components/tiles/MusicTile'
import { ContactTile } from './components/tiles/ContactTile'
import { projects } from './data/projects'

export default function App() {
  return (
    <main id="top" className="relative min-h-screen bg-bg">
      <MeshGradient />
      <MagneticCursor />
      <TopNav />
      <BentoGrid>
        <HeroTile />
        <ProjectTile project={projects[0]} className="lg:col-span-5" />
        <TechStackTile />
        <NowBuildingTile />
        <ProjectTile project={projects[1]} className="lg:col-span-7" />
        <MusicTile />
        <ContactTile />
        <ProjectTile project={projects[2]} className="lg:col-span-4" />
      </BentoGrid>
    </main>
  )
}
