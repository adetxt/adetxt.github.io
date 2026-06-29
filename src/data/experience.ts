export type Experience = {
  id: string
  role: string
  company: string
  start: string
  end: string
  description: string
}

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Senior Software Engineer',
    company: 'Acme Co',
    start: '2023',
    end: 'Present',
    description: 'Lead frontend for a data-heavy dashboard used by 10k+ daily users.',
  },
  {
    id: 'exp-2',
    role: 'Software Engineer',
    company: 'Startup Inc',
    start: '2021',
    end: '2023',
    description: 'Full-stack work on a B2B SaaS, from Postgres to React.',
  },
  {
    id: 'exp-3',
    role: 'Junior Developer',
    company: 'Agency LLC',
    start: '2019',
    end: '2021',
    description: 'Shipped 20+ client sites across React, Vue, and vanilla JS.',
  },
]
