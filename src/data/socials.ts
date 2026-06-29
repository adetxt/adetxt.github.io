import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi'
import type { IconType } from 'react-icons'

export type Social = {
  name: string
  icon: IconType
  href: string
}

export const socials: Social[] = [
  { name: 'GitHub', icon: FiGithub, href: 'https://github.com/adetxt' },
  { name: 'LinkedIn', icon: FiLinkedin, href: 'https://linkedin.com/in/example' },
  { name: 'Twitter', icon: FiTwitter, href: 'https://twitter.com/example' },
  { name: 'Email', icon: FiMail, href: 'mailto:hello@example.com' },
]
