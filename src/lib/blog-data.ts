/**
 * Blog data module — Supabase-first, localStorage fallback.
 * All CRUD operations are async because Supabase calls are async.
 */
import { supabase, isSupabaseConfigured } from './supabase'
import type { BlogPost, BlogPostInput } from '../types'

const STORAGE_KEY = 'gimnaziu_blog_posts'

const defaultPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Olimpiada Națională de Matematică — Rezultate excepționale',
    excerpt: 'Elevii noștri au obținut 3 premii la faza națională a Olimpiadei de Matematică.',
    content: '<p>Cu mândrie anunțăm că echipa de matematică a gimnaziului a obținut rezultate remarcabile la Olimpiada Națională.</p>',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=500&fit=crop',
    category: 'Olimpiade',
    date: '2025-03-15',
    author: 'Prof. Elena Rusu',
  },
  {
    id: 2,
    title: 'Ziua Mondială a Cărții — Maraton de lectură',
    excerpt: 'Am celebrat Ziua Mondială a Cărții printr-un maraton de lectură de 12 ore.',
    content: '<p>Pe 23 aprilie, gimnaziul nostru s-a transformat într-o bibliotecă vie.</p>',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=500&fit=crop',
    category: 'Evenimente',
    date: '2025-04-23',
    author: 'Echipa gimnaziului',
  },
  {
    id: 3,
    title: 'Atelierul de Robotică — Proiecte STEM în acțiune',
    excerpt: 'Elevii clasei a VII-a au construit roboți autonomi în cadrul noului atelier de robotică.',
    content: '<p>Noul nostru atelier de robotică este acum funcțional!</p>',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop',
    category: 'STEM',
    date: '2025-02-10',
    author: 'Prof. Mihai Lungu',
  },
  {
    id: 4,
    title: 'Excursie la Orheiul Vechi',
    excerpt: 'Clasele a VI-a au explorat patrimoniul cultural la Orheiul Vechi.',
    content: '<p>O zi minunată petrecută în natură și istorie!</p>',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&h=500&fit=crop',
    category: 'Excursii',
    date: '2025-05-08',
    author: 'Prof. Ana Codreanu',
  },
]

/* ─── localStorage helpers (fallback) ─── */
function getLocalPosts(): BlogPost[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch { /* ignore */ }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts))
  return [...defaultPosts]
}

function saveLocalPosts(posts: BlogPost[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

/* ─── Public API (all async, Supabase-first) ─── */

export async function fetchPosts(): Promise<BlogPost[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase!
      .from('posts')
      .select('*')
      .order('date', { ascending: false })
    if (!error && data && data.length > 0) return data as BlogPost[]
  }
  return getLocalPosts().sort((a, b) => b.date.localeCompare(a.date))
}

export async function addPost(input: BlogPostInput): Promise<BlogPost | null> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase!
      .from('posts')
      .insert(input)
      .select()
      .single()
    if (!error && data) return data as BlogPost
  }
  // Fallback to localStorage
  const posts = getLocalPosts()
  const maxId = posts.reduce((m, p) => Math.max(m, p.id), 0)
  const post: BlogPost = { ...input, id: maxId + 1 }
  posts.unshift(post)
  saveLocalPosts(posts)
  return post
}

export async function updatePost(id: number, input: Partial<BlogPostInput>): Promise<void> {
  if (isSupabaseConfigured()) {
    const { error } = await supabase!
      .from('posts')
      .update(input)
      .eq('id', id)
    if (!error) return
  }
  // Fallback
  const posts = getLocalPosts()
  const idx = posts.findIndex((p) => p.id === id)
  if (idx !== -1) {
    posts[idx] = { ...posts[idx], ...input }
    saveLocalPosts(posts)
  }
}

export async function deletePost(id: number): Promise<void> {
  if (isSupabaseConfigured()) {
    const { error } = await supabase!
      .from('posts')
      .delete()
      .eq('id', id)
    if (!error) return
  }
  // Fallback
  const posts = getLocalPosts().filter((p) => p.id !== id)
  saveLocalPosts(posts)
}

export function getCategories(posts: BlogPost[]): string[] {
  return [...new Set(posts.map((p) => p.category))].sort()
}

export async function exportJSON(): Promise<string> {
  const posts = await fetchPosts()
  return JSON.stringify(posts, null, 2)
}

export async function importJSON(json: string): Promise<boolean> {
  try {
    const arr = JSON.parse(json) as BlogPost[]
    if (!Array.isArray(arr)) return false

    if (isSupabaseConfigured()) {
      // Clear existing and insert all
      await supabase!.from('posts').delete().neq('id', 0)
      const { error } = await supabase!.from('posts').insert(
        arr.map(({ id: _id, created_at: _ca, ...rest }) => rest)
      )
      return !error
    }
    saveLocalPosts(arr)
    return true
  } catch {
    return false
  }
}

/* ─── Image upload (Supabase Storage) ─── */
const BUCKET = 'blog-images'

export async function uploadImage(file: File): Promise<string | null> {
  if (!isSupabaseConfigured()) return null

  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const { error } = await supabase!.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error) {
    console.error('Upload error:', error.message)
    return null
  }

  const { data } = supabase!.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function resetPosts(): Promise<void> {
  if (isSupabaseConfigured()) {
    await supabase!.from('posts').delete().neq('id', 0)
    await supabase!.from('posts').insert(
      defaultPosts.map(({ id: _id, ...rest }) => rest)
    )
    return
  }
  localStorage.removeItem(STORAGE_KEY)
  saveLocalPosts(defaultPosts)
}
