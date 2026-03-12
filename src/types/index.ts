export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  date: string
  author: string
  created_at?: string
}

export type BlogPostInput = Omit<BlogPost, 'id' | 'created_at'>

export interface NavLink {
  label: string
  to: string
  routeName: string
}

export interface Activity {
  icon: string
  title: string
  description: string
  link: string
}

export interface TimelineEvent {
  date: string
  title: string
  description: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface ContactInfo {
  icon: string
  label: string
  value: string
  href?: string
}
