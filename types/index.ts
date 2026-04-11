export interface Lead {
  id?: string
  name: string
  phone: string
  course: string
  status: string
  city: string
  email?: string
  message?: string
  budget?: string
  source_page?: string
  created_at?: string
}

export type BlogCategory =
  | 'Engineering'
  | 'MBBS India'
  | 'MBBS Abroad'
  | 'MBA & Management'
  | 'BSCC Loan'
  | 'Career Guidance'
  | 'Study Abroad'
  | 'Nursing & Pharma'

export interface BlogPost {
  id?: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  meta_desc?: string
  cover_image?: string
  category: BlogCategory
  image_url: string
  image_alt: string       // English only — RULE 8
  author: string
  read_time: number       // minutes
  published?: boolean
  created_at?: string
  updated_at?: string
}

export interface StatItem {
  value: string
  label: string
  labelHi: string
}

export interface EligibilityCriterion {
  id: string
  label: string
  desc: string
}

export interface DocumentCategory {
  category: string
  items: string[]
}

export interface ProcessStep {
  step: number
  title: string
  titleHindi: string
  desc: string
  time: string
  link?: string
  caeHelp: string
}

export interface EligibleCourseStream {
  stream: string
  courses: string[]
}
