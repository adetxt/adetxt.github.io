import { FiArrowUpRight } from 'react-icons/fi'
import { BentoTile } from '../bento/BentoTile'
import type { Project } from '../../data/projects'

type Props = {
  project: Project
  className?: string
  onClick?: () => void
  layoutId?: string
}

export function ProjectTile({ project, className = '', onClick, layoutId }: Props) {
  return (
    <BentoTile
      data-bento-tile
      label={`Project: ${project.title}`}
      className={`col-span-1 lg:col-span-5 ${className}`}
      onClick={onClick}
      layoutId={layoutId ?? `tile-${project.id}`}
    >
      <div className={`flex h-full flex-col gap-4 bg-gradient-to-br ${project.gradient} p-6 text-white`}>
        <div className="flex items-start justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
            Project · {project.year}
          </p>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white/20 p-2 backdrop-blur transition-transform hover:rotate-45"
              aria-label={`Open ${project.title}`}
            >
              <FiArrowUpRight size={14} />
            </a>
          )}
        </div>
        <div className="mt-auto">
          <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
          <p className="mt-1 text-sm text-white/90">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium backdrop-blur"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </BentoTile>
  )
}
