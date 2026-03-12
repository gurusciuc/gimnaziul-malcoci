import { renderNavbar, mountNavbar } from '../components/navbar'
import { renderFooter } from '../components/footer'
import { magneticButton } from '../utils/animations'
import {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
  exportJSON,
  importJSON,
  resetPosts,
  uploadImage,
} from '../lib/blog-data'
import type { BlogPost, BlogPostInput } from '../types'
import gsap from 'gsap'

/* ─── Auth: SHA-256 hashing ─── */
const DEFAULT_HASH = '743215235579b232286c12c79d5ff86bf56d6da8cb8f27524faf9f4ebd45d81f' // "GimnaziuTD@2026!"

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function isAuthenticated(): boolean {
  return sessionStorage.getItem('admin_auth') === 'true'
}

/* ─── Helpers ─── */
let cachedPosts: BlogPost[] = []

function formatDate(str: string): string {
  const d = new Date(str + 'T00:00:00')
  return d.toLocaleDateString('ro-RO', { day: 'numeric', month: 'short', year: 'numeric' })
}

/* ─── Render helpers ─── */
let editingId: number | null = null

function renderDashboard(posts: BlogPost[]): string {
  if (posts.length === 0) {
    return `<div class="text-center py-12 text-txt-secondary text-sm">Nicio postare. Apasă <strong>+ Postare nouă</strong> pentru a adăuga.</div>`
  }
  return posts
    .map(
      (p) => `
    <div class="flex items-center gap-4 p-4 border border-border rounded-2xl bg-white hover:shadow-sm transition-shadow admin-row" data-id="${p.id}">
      <img src="${p.image}" alt="" class="w-16 h-16 rounded-xl object-cover shrink-0">
      <div class="flex-1 min-w-0">
        <h3 class="font-semibold text-sm truncate">${p.title}</h3>
        <div class="flex items-center gap-2 text-[11px] text-txt-secondary mt-0.5">
          <span class="px-1.5 py-0.5 rounded-full bg-accent/10 text-accent font-medium">${p.category}</span>
          <span>${formatDate(p.date)}</span>
        </div>
      </div>
      <div class="flex items-center gap-1.5 shrink-0">
        <button class="edit-btn w-8 h-8 flex items-center justify-center rounded-lg hover:bg-accent/10 text-accent transition-colors" title="Editează">
          <i class="ph ph-pencil-simple"></i>
        </button>
        <button class="delete-btn w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Șterge">
          <i class="ph ph-trash"></i>
        </button>
      </div>
    </div>`
    )
    .join('')
}

function renderEditorModal(post?: BlogPost): string {
  const isEdit = !!post
  return `
  <div class="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" id="editorModal">
    <div class="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold">${isEdit ? 'Editează postarea' : 'Postare nouă'}</h2>
        <button id="closeEditorBtn" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"><i class="ph ph-x text-lg"></i></button>
      </div>
      <form id="postForm" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-txt-secondary mb-1">Titlu</label>
          <input name="title" required class="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition" value="${post?.title ?? ''}">
        </div>
        <div>
          <label class="block text-xs font-semibold text-txt-secondary mb-1">Rezumat</label>
          <textarea name="excerpt" required rows="2" class="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition resize-none">${post?.excerpt ?? ''}</textarea>
        </div>
        <div>
          <label class="block text-xs font-semibold text-txt-secondary mb-1">Conținut (HTML)</label>
          <textarea name="content" required rows="4" class="w-full px-4 py-2.5 border border-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition resize-none">${post?.content ?? ''}</textarea>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-txt-secondary mb-1">Categorie</label>
            <input name="category" required class="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition" value="${post?.category ?? ''}">
          </div>
          <div>
            <label class="block text-xs font-semibold text-txt-secondary mb-1">Data</label>
            <input type="date" name="date" required class="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition" value="${post?.date ?? new Date().toISOString().split('T')[0]}">
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-txt-secondary mb-1">Imagine</label>
            <!-- File upload dropzone -->
            <div id="imageDropzone" class="relative border-2 border-dashed border-border rounded-xl p-3 text-center cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-colors">
              <input type="file" accept="image/*" id="imageFileInput" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
              <div id="dropzoneContent">
                <i class="ph ph-cloud-arrow-up text-2xl text-txt-secondary"></i>
                <p class="text-xs text-txt-secondary mt-1">Click sau trage o imagine</p>
              </div>
              <div id="uploadProgress" class="hidden">
                <div class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                  <span class="text-xs text-accent font-medium">Se încarcă...</span>
                </div>
              </div>
            </div>
            <!-- URL fallback -->
            <div class="flex items-center gap-2 mt-2">
              <span class="text-xs text-txt-secondary whitespace-nowrap">sau URL:</span>
              <input name="image" class="w-full px-3 py-1.5 border border-border rounded-lg text-xs focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition" placeholder="https://..." value="${post?.image ?? ''}">
            </div>
            <!-- Preview -->
            <div id="imagePreview" class="${post?.image ? '' : 'hidden'} mt-2">
              <img id="previewImg" src="${post?.image ?? ''}" class="w-full h-24 object-cover rounded-lg border border-border" alt="Preview">
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-txt-secondary mb-1">Autor</label>
            <input name="author" class="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition" value="${post?.author ?? ''}">
          </div>
        </div>
        <button type="submit" class="w-full py-3 rounded-2xl bg-accent hover:bg-accent/90 text-white font-semibold text-sm transition-colors">
          ${isEdit ? 'Salvează modificările' : 'Publică postarea'}
        </button>
      </form>
    </div>
  </div>`
}

/* ─── Page: Login ─── */
function renderLogin(): string {
  return `
  <main class="pt-14 min-h-screen flex items-center justify-center bg-cream">
    <div class="max-w-md w-full mx-6">
      <div class="bg-white border border-border rounded-3xl p-10 shadow-sm">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mb-4">
            <i class="ph ph-lock-key text-accent text-2xl"></i>
          </div>
          <h1 class="text-2xl font-extrabold tracking-tight">Panou Administrator</h1>
          <p class="text-sm text-txt-secondary mt-1">Introdu parola pentru a accesa panoul.</p>
        </div>
        <form id="loginForm">
          <div class="relative mb-4">
            <input type="password" id="adminPass" required placeholder="Parola" autocomplete="off"
              class="w-full px-4 py-3 border border-border rounded-2xl text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition">
          </div>
          <div id="loginError" class="hidden text-sm text-red-500 mb-3 text-center font-medium"></div>
          <button type="submit" class="w-full py-3 rounded-2xl bg-accent hover:bg-accent/90 text-white font-semibold text-sm transition-colors magnetic-btn">
            Autentificare
          </button>
        </form>
      </div>
    </div>
  </main>`
}

/* ─── Page: Dashboard ─── */
function renderDashboardPage(posts: BlogPost[]): string {
  return `
  <main class="pt-14 min-h-screen bg-cream">
    <!-- Toolbar -->
    <div class="border-b border-border bg-white sticky top-14 z-30">
      <div class="w-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-accent/10"><i class="ph ph-crown text-accent text-base"></i></span>
          <h1 class="text-base font-bold">Admin Dashboard</h1>
        </div>
        <div class="flex items-center gap-2">
          <button id="newPostBtn" class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent/90 transition-colors">
            <i class="ph ph-plus text-sm"></i> Postare nouă
          </button>
          <button id="exportBtn" class="w-9 h-9 flex items-center justify-center rounded-xl border border-border hover:bg-gray-50 transition-colors" title="Export JSON">
            <i class="ph ph-download-simple text-base"></i>
          </button>
          <label class="w-9 h-9 flex items-center justify-center rounded-xl border border-border hover:bg-gray-50 transition-colors cursor-pointer" title="Import JSON">
            <i class="ph ph-upload-simple text-base"></i>
            <input type="file" accept=".json" id="importInput" class="hidden">
          </label>
          <button id="resetBtn" class="w-9 h-9 flex items-center justify-center rounded-xl border border-border hover:bg-red-50 text-red-500 transition-colors" title="Reset la default">
            <i class="ph ph-arrow-counter-clockwise text-base"></i>
          </button>
          <button id="logoutBtn" class="w-9 h-9 flex items-center justify-center rounded-xl border border-border hover:bg-gray-50 transition-colors" title="Deconectează-te">
            <i class="ph ph-sign-out text-base"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Posts list -->
    <div class="w-full max-w-5xl mx-auto px-6 py-8">
      <div class="flex items-center justify-between mb-4">
        <p class="text-sm text-txt-secondary" id="postCount"><span class="font-semibold text-charcoal">${posts.length}</span> postări</p>
      </div>
      <div class="space-y-3" id="adminPostsList">
        ${renderDashboard(posts)}
      </div>
    </div>
  </main>

  <div id="editorRoot"></div>`
}

/* ─── Render ─── */
export function render(): string {
  return `
  ${renderNavbar()}
  <div id="adminContainer">
    ${isAuthenticated()
      ? '<div id="dashboardLoading" class="pt-14 min-h-screen bg-cream flex items-center justify-center"><p class="text-sm text-txt-secondary">Se încarcă...</p></div>'
      : renderLogin()}
  </div>
  ${renderFooter()}`
}

/* ─── Editor Modal Logic ─── */
function openEditor(post?: BlogPost): void {
  editingId = post?.id ?? null
  const root = document.getElementById('editorRoot')
  if (!root) return
  root.innerHTML = renderEditorModal(post)

  const closeBtn = document.getElementById('closeEditorBtn')
  const form = document.getElementById('postForm') as HTMLFormElement
  const modal = document.getElementById('editorModal')
  const imageFileInput = document.getElementById('imageFileInput') as HTMLInputElement
  const dropzone = document.getElementById('imageDropzone')
  const dropzoneContent = document.getElementById('dropzoneContent')
  const uploadProgress = document.getElementById('uploadProgress')
  const imagePreview = document.getElementById('imagePreview')
  const previewImg = document.getElementById('previewImg') as HTMLImageElement
  const imageUrlInput = form?.querySelector('input[name="image"]') as HTMLInputElement

  // Pending uploaded image URL (set by file upload, used on submit)
  let pendingImageUrl: string | null = null

  /* ── Image file selected or dropped ── */
  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file)
    if (previewImg) previewImg.src = localUrl
    imagePreview?.classList.remove('hidden')

    // Show upload spinner
    dropzoneContent?.classList.add('hidden')
    uploadProgress?.classList.remove('hidden')

    const url = await uploadImage(file)
    if (url) {
      pendingImageUrl = url
      if (imageUrlInput) imageUrlInput.value = url
      if (previewImg) previewImg.src = url
      URL.revokeObjectURL(localUrl)
    } else {
      // Fallback — keep local preview, user can paste URL manually
      alert('Încărcarea imaginii a eșuat. Poți adăuga manual un URL.')
    }

    // Restore dropzone
    dropzoneContent?.classList.remove('hidden')
    uploadProgress?.classList.add('hidden')
  }

  imageFileInput?.addEventListener('change', () => {
    const file = imageFileInput.files?.[0]
    if (file) handleFile(file)
  })

  // URL input live preview
  imageUrlInput?.addEventListener('input', () => {
    const val = imageUrlInput.value.trim()
    if (val) {
      if (previewImg) previewImg.src = val
      imagePreview?.classList.remove('hidden')
    } else {
      imagePreview?.classList.add('hidden')
    }
  })

  // Drag-and-drop visual feedback
  dropzone?.addEventListener('dragover', (e) => {
    e.preventDefault()
    dropzone.classList.add('border-accent', 'bg-accent/5')
  })
  dropzone?.addEventListener('dragleave', () => {
    dropzone.classList.remove('border-accent', 'bg-accent/5')
  })
  dropzone?.addEventListener('drop', (e) => {
    e.preventDefault()
    dropzone.classList.remove('border-accent', 'bg-accent/5')
    const file = (e as DragEvent).dataTransfer?.files[0]
    if (file) handleFile(file)
  })

  closeBtn?.addEventListener('click', () => { root.innerHTML = '' })
  modal?.addEventListener('click', (e) => { if (e.target === modal) root.innerHTML = '' })

  form?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement
    submitBtn.disabled = true
    submitBtn.textContent = 'Se salvează...'

    const fd = new FormData(form)
    const imageValue = pendingImageUrl || (fd.get('image') as string) || ''
    if (!imageValue) {
      alert('Te rog adaugă o imagine (încarcă un fișier sau introdu un URL).')
      submitBtn.disabled = false
      submitBtn.textContent = editingId ? 'Salvează modificările' : 'Publică postarea'
      return
    }
    const data: BlogPostInput = {
      title: fd.get('title') as string,
      excerpt: fd.get('excerpt') as string,
      content: fd.get('content') as string,
      image: imageValue,
      category: fd.get('category') as string,
      date: fd.get('date') as string,
      author: (fd.get('author') as string) || 'Echipa gimnaziului',
    }
    if (editingId) {
      await updatePost(editingId, data)
    } else {
      await addPost(data)
    }
    root.innerHTML = ''
    await refreshList()
  })

  gsap.from(root.querySelector('.bg-white'), { opacity: 0, y: 30, scale: 0.96, duration: 0.35, ease: 'power3.out' })
}

async function refreshList(): Promise<void> {
  const list = document.getElementById('adminPostsList')
  const countEl = document.getElementById('postCount')
  if (!list) return

  cachedPosts = await fetchPosts()
  list.innerHTML = renderDashboard(cachedPosts)
  if (countEl) countEl.innerHTML = `<span class="font-semibold text-charcoal">${cachedPosts.length}</span> postări`
  attachRowListeners()
}

function attachRowListeners(): void {
  document.querySelectorAll<HTMLElement>('.admin-row').forEach((row) => {
    const id = Number(row.dataset.id)
    row.querySelector('.edit-btn')?.addEventListener('click', (e) => {
      e.stopPropagation()
      const post = cachedPosts.find((p) => p.id === id)
      if (post) openEditor(post)
    })
    row.querySelector('.delete-btn')?.addEventListener('click', async (e) => {
      e.stopPropagation()
      if (confirm('Ești sigur că vrei să ștergi această postare?')) {
        await deletePost(id)
        gsap.to(row, {
          opacity: 0, x: -20, height: 0, padding: 0, margin: 0,
          duration: 0.35, ease: 'power2.in', onComplete: () => { refreshList() },
        })
      }
    })
  })
}

/* ─── Show dashboard (async — loads from Supabase) ─── */
async function showDashboard(container: HTMLElement, cleanups: (() => void)[]): Promise<void> {
  cachedPosts = await fetchPosts()
  container.innerHTML = renderDashboardPage(cachedPosts)
  mountDashboard(cleanups)
}

/* ─── Mount ─── */
export function mount(): () => void {
  const cleanups: (() => void)[] = []
  mountNavbar()
  document.querySelectorAll<HTMLElement>('.magnetic-btn').forEach((b) => cleanups.push(magneticButton(b)))

  const container = document.getElementById('adminContainer')!

  if (!isAuthenticated()) {
    setupLogin(container, cleanups)
    gsap.from('main .bg-white', { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' })
  } else {
    showDashboard(container, cleanups)
  }

  return () => cleanups.forEach((fn) => fn())
}

function setupLogin(container: HTMLElement, cleanups: (() => void)[]): void {
  const form = document.getElementById('loginForm') as HTMLFormElement | null
  form?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const passEl = document.getElementById('adminPass') as HTMLInputElement
    const errEl = document.getElementById('loginError')

    const hash = await sha256(passEl.value)
    if (hash === DEFAULT_HASH) {
      sessionStorage.setItem('admin_auth', 'true')
      await showDashboard(container, cleanups)
    } else {
      if (errEl) {
        errEl.textContent = 'Parolă incorectă. Încearcă din nou.'
        errEl.classList.remove('hidden')
      }
      gsap.fromTo(passEl, { x: -6 }, { x: 6, duration: 0.08, repeat: 5, yoyo: true, ease: 'power2.inOut' })
    }
  })
}

function mountDashboard(cleanups: (() => void)[]): void {
  attachRowListeners()

  const container = document.getElementById('adminContainer')!

  // New post
  document.getElementById('newPostBtn')?.addEventListener('click', () => openEditor())

  // Export
  document.getElementById('exportBtn')?.addEventListener('click', async () => {
    const json = await exportJSON()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'blog-posts.json'
    a.click()
    URL.revokeObjectURL(url)
  })

  // Import
  const importEl = document.getElementById('importInput') as HTMLInputElement | null
  importEl?.addEventListener('change', async () => {
    const file = importEl.files?.[0]
    if (!file) return
    const text = await file.text()
    const ok = await importJSON(text)
    if (ok) {
      await refreshList()
      alert('Postările au fost importate cu succes!')
    } else {
      alert('Fișier JSON invalid.')
    }
  })

  // Reset
  document.getElementById('resetBtn')?.addEventListener('click', async () => {
    if (confirm('Resetezi toate postările la cele implicite?')) {
      await resetPosts()
      await refreshList()
    }
  })

  // Logout
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    sessionStorage.removeItem('admin_auth')
    container.innerHTML = renderLogin()
    gsap.from('main .bg-white', { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' })
    setupLogin(container, cleanups)
  })

  // Magnetic buttons
  document.querySelectorAll<HTMLElement>('.magnetic-btn').forEach((b) => cleanups.push(magneticButton(b)))

  // Entrance
  gsap.from('.admin-row', { opacity: 0, y: 15, stagger: 0.05, duration: 0.5, ease: 'power3.out', delay: 0.1 })
}
