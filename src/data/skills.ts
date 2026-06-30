import type { IconType } from 'react-icons'

export type Skill = {
  name: string
  icon: IconType
}

export const skills: Skill[] = [
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'Go', icon: SiGo },
  { name: 'PHP', icon: SiPhp },
  { name: 'Python', icon: SiPython },
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Laravel', icon: SiLaravel },
  { name: 'Ruby on Rails', icon: SiRubyonrails },
  { name: 'Electron', icon: SiElectron },
  { name: 'OpenAI', icon: SiOpenai },
  { name: 'Pocketbase', icon: SiPocketbase },
  { name: 'SQLite', icon: SiSqlite },
  { name: 'Docker', icon: SiDocker },
  { name: 'Git', icon: SiGit },
]

// react-icons imports live at the bottom so the file can be read top-to-bottom
import {
  SiTypescript,
  SiJavascript,
  SiGo,
  SiPhp,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiLaravel,
  SiRubyonrails,
  SiElectron,
  SiOpenai,
  SiPocketbase,
  SiSqlite,
  SiDocker,
  SiGit,
} from 'react-icons/si'
