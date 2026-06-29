import { useState } from 'react'
import { TopNav } from './components/nav/TopNav'
import { MeshGradient } from './components/motion/MeshGradient'
import { MagneticCursor } from './components/motion/MagneticCursor'
import { Marquee } from './components/motion/Marquee'
import { BentoGrid } from './components/bento/BentoGrid'
import { TileDetail } from './components/bento/expand/TileDetail'
import { HeroTile } from './components/tiles/HeroTile'
import { ProjectTile } from './components/tiles/ProjectTile'
import { TechStackTile } from './components/tiles/TechStackTile'
import { NowBuildingTile } from './components/tiles/NowBuildingTile'
import { MusicTile } from './components/tiles/MusicTile'
import { ContactTile } from './components/tiles/ContactTile'
import { GitHubTile } from './components/tiles/GitHubTile'
import { ExperienceTile } from './components/tiles/ExperienceTile'
import { projects } from './data/projects'
import { heroDetail } from './data/hero'
import type { Project } from './data/projects'

export default function App() {
  const [openDetail, setOpenDetail] = useState<Project | null>(null)

  return (
    <main id="top" className="relative min-h-screen bg-bg">
      <MeshGradient />
      <MagneticCursor />
      <TopNav />
      <BentoGrid>
        <HeroTile onClick={() => setOpenDetail(heroDetail)} />
        <ProjectTile project={projects[0]} className="lg:col-span-5" onClick={() => setOpenDetail(projects[0])} />
        <TechStackTile />
        <NowBuildingTile />
        <ProjectTile project={projects[1]} className="lg:col-span-7" onClick={() => setOpenDetail(projects[1])} />
        <ExperienceTile />
        <GitHubTile />
        <MusicTile />
        <ContactTile />
        <ProjectTile project={projects[2]} className="lg:col-span-4" onClick={() => setOpenDetail(projects[2])} />
      </BentoGrid>
      <Marquee
        items={[
          'Available for hire',
          'Open to interesting projects',
          'Currently shipping CLI tools',
        ]}
      />
      <TileDetail project={openDetail} onClose={() => setOpenDetail(null)} />
    </main>
  )
}
