export type ClientWork = {
  id: string
  title: string
  company: string
  description: string
  tags: string[]
  year: number
}

export const clientWork: ClientWork[] = [
  {
    id: 'unair',
    title: 'ETL + University Themes',
    company: 'UNAIR',
    description:
      'Custom WordPress plugin-based ETL for multi-source data centralization; led a team to build 6 dedicated university themes.',
    tags: ['WordPress', 'ETL', 'Team lead'],
    year: 2022,
  },
  {
    id: 'petrokimia',
    title: 'Inventory Management System',
    company: 'PT Petrokimia Gresik',
    description: 'Web-based inventory platform on Laravel.',
    tags: ['Laravel'],
    year: 2022,
  },
  {
    id: 'stiesia-mandiri',
    title: 'Academic & HR Portals',
    company: 'STIESIA & PT Mandiri',
    description:
      'Academic journal registration portal for STIESIA\'s ICOBUSS event and a complete HR application for PT Mandiri.',
    tags: ['Web app'],
    year: 2021,
  },
]
