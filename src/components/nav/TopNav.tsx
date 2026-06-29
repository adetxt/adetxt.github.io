import { ThemeToggle } from '../ui/ThemeToggle'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function TopNav() {
  return (
    <nav className="sticky top-0 z-40 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 backdrop-blur-md lg:px-6">
      <a href="#top" className="text-lg font-bold tracking-tight text-ink">
        ade<span className="text-accent">.</span>
      </a>
      <div className="flex items-center gap-1 sm:gap-2">
        <ul className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-ink-muted transition-colors hover:bg-tile hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  )
}
