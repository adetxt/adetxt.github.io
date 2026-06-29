import type { IconType } from 'react-icons'

export type Skill = {
  name: string
  icon: IconType
}

export const skills: Skill[] = [
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'React', icon: SiReact },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'Postgres', icon: SiPostgresql },
  { name: 'GraphQL', icon: SiGraphql },
  { name: 'Docker', icon: SiDocker },
  { name: 'Figma', icon: SiFigma },
  { name: 'Vitest', icon: SiVitest },
]

// react-icons imports live at the bottom so the file can be read top-to-bottom
import {
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiGraphql,
  SiDocker,
  SiFigma,
  SiVitest,
} from 'react-icons/si'
