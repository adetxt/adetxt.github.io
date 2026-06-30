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
  { name: 'C#', icon: SiSharp },
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Vue.js', icon: SiVuedotjs },
  { name: 'Laravel', icon: SiLaravel },
  { name: 'Ruby on Rails', icon: SiRubyonrails },
  { name: 'Docker', icon: SiDocker },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Git', icon: SiGit },
]

// react-icons imports live at the bottom so the file can be read top-to-bottom
import {
  SiTypescript,
  SiJavascript,
  SiGo,
  SiPhp,
  SiPython,
  SiSharp,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiVuedotjs,
  SiLaravel,
  SiRubyonrails,
  SiDocker,
  SiMongodb,
  SiGit,
} from 'react-icons/si'
