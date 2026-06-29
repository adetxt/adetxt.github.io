import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import type { Project } from '../../../data/projects'

type Props = {
  project: Project | null
  onClose: () => void
}

export function TileDetail({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="tile-detail-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            layoutId={`tile-${project.id}`}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-bento bg-tile shadow-tile-hover"
          >
            <div className={`h-48 bg-gradient-to-br ${project.gradient} p-6 text-white`}>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                Project · {project.year}
              </p>
              <h2 id="tile-detail-title" className="mt-2 text-3xl font-bold tracking-tight">{project.title}</h2>
            </div>
            <div className="p-6">
              <p className="text-base text-ink">{project.longDescription}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-[var(--bg)] px-2.5 py-1 text-xs font-medium text-ink-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-tile hover:opacity-80"
                  >
                    Visit
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--tile-border)] px-4 py-2 text-sm font-medium text-ink hover:bg-[var(--bg)]"
                  >
                    Source
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="ml-auto text-sm text-ink-muted hover:text-ink"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
