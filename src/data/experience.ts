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
    id: 'exp-delta',
    role: 'Software Engineer',
    company: 'Delta HQ',
    start: '2024',
    end: 'Present',
    description:
      'Built an internal Go backend framework, an AI SDK for support tooling, and integrated Stripe, Veritrans, Flywire, and Midtrans payment gateways across the EMS, Payments, and AI teams.',
  },
  {
    id: 'exp-meda',
    role: 'Software Engineer & Lead Backend',
    company: 'Meda Technology',
    start: '2023',
    end: '2024',
    description:
      'Standardized backend architecture, shipped Bridgestone enterprise APIs, and integrated multi-brand biometric attendance machines (Revo, Hikvision, Dahua) via C# and Go adaptors.',
  },
  {
    id: 'exp-ruangguru',
    role: 'Software Engineer',
    company: 'Ruangguru',
    start: '2021',
    end: '2023',
    description:
      'Owned CRM and lead-routing at SEA\'s largest ed-tech; built a real-time assignment engine and an experimental OpenAI chatbot for agent-customer communications.',
  },
  {
    id: 'exp-sevima',
    role: 'Fullstack Developer',
    company: 'Sevima',
    start: '2020',
    end: '2021',
    description:
      'Engineered Siakad Cloud (Academic Information System) and a Computer-Based Test platform on Lumen and React for academic institutions.',
  },
  {
    id: 'exp-fittech',
    role: 'Project Manager & Web Programmer',
    company: 'CV. Fit Tech Inova Global',
    start: '2019',
    end: '2020',
    description:
      'Led a Laravel-based digital investment guidance platform and built a REST API for a real-time pediatric asthma monitoring app connecting doctors and patients.',
  },
  {
    id: 'exp-scomptec',
    role: 'Freelance Web Programmer & IT Instructor',
    company: 'SCOMPTEC Education',
    start: '2018',
    end: '2019',
    description:
      'Full-stack Computer-Based Test System on Node.js, MongoDB, and Vue.js, plus classroom IT instruction.',
  },
]
