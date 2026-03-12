import { renderNavbar, mountNavbar } from '../components/navbar'
import { renderFooter } from '../components/footer'
import { magneticButton } from '../utils/animations'
import { getLenis } from '../utils/animations'
import { fetchPosts, getCategories } from '../lib/blog-data'
import type { BlogPost } from '../types'
import gsap from 'gsap'

/* ─── State ─── */
let allPosts: BlogPost[] = []
let currentFilter = 'all'

function formatDate(str: string): string {
  const d = new Date(str + 'T00:00:00')
  return d.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })
}

function buildFilterButtons(): void {
  const bar = document.getElementById('filterBar')
  if (!bar) return
  bar.querySelectorAll('[data-dynamic]').forEach((b) => b.remove())
  const cats = getCategories(allPosts)
  cats.forEach((cat) => {
    const btn = document.createElement('button')
    btn.className = 'filter-btn shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors'
    btn.setAttribute('data-cat', cat)
    btn.setAttribute('data-dynamic', '1')
    btn.textContent = cat
    btn.onclick = () => filterPosts(cat)
    bar.appendChild(btn)
  })
}

function filterPosts(cat: string): void {
  currentFilter = cat
  document.querySelectorAll('.filter-btn').forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-cat') === cat)
  })
  renderPosts()
}

function renderPosts(): void {
  const grid = document.getElementById('blogGrid')
  const empty = document.getElementById('emptyState')
  if (!grid || !empty) return

  let posts = allPosts
  if (currentFilter !== 'all') {
    posts = posts.filter((p) => p.category === currentFilter)
  }

  if (posts.length === 0) {
    grid.innerHTML = ''
    empty.classList.remove('hidden')
    empty.classList.add('flex', 'flex-col')
    return
  }

  empty.classList.add('hidden')
  empty.classList.remove('flex', 'flex-col')

  grid.innerHTML = posts
    .map(
      (post) => `
    <article class="blog-card group bg-white border border-border rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer" data-post-id="${post.id}">
      <div class="aspect-[16/10] overflow-hidden">
        <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy">
      </div>
      <div class="p-6">
        <div class="flex items-center gap-3 mb-3">
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-accent-light text-accent">${post.category}</span>
          <span class="text-xs text-txt-secondary">${formatDate(post.date)}</span>
        </div>
        <h3 class="text-lg font-bold tracking-tight mb-2 group-hover:text-accent transition-colors leading-snug">${post.title}</h3>
        <p class="text-sm text-txt-secondary leading-relaxed line-clamp-3">${post.excerpt}</p>
        <div class="flex items-center gap-2 mt-4 text-accent text-sm font-semibold">
          Citește mai mult <i class="ph ph-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>
    </article>`
    )
    .join('')

  // Animate cards
  gsap.from(grid.querySelectorAll('.blog-card'), {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out',
  })

  // Attach click handlers
  grid.querySelectorAll<HTMLElement>('.blog-card').forEach((card) => {
    card.addEventListener('click', () => {
      const id = Number(card.dataset.postId)
      openPost(id)
    })
  })
}

function openPost(id: number): void {
  const post = allPosts.find((p) => p.id === id)
  if (!post) return

  const img = document.getElementById('modalImage') as HTMLImageElement
  const cat = document.getElementById('modalCategory')
  const date = document.getElementById('modalDate')
  const author = document.getElementById('modalAuthor')
  const title = document.getElementById('modalTitle')
  const content = document.getElementById('modalContent')
  const modal = document.getElementById('postModal')
  if (!img || !cat || !date || !author || !title || !content || !modal) return

  img.src = post.image
  img.alt = post.title
  cat.textContent = post.category
  date.textContent = formatDate(post.date)
  author.textContent = post.author || 'Echipa gimnaziului'
  title.textContent = post.title
  content.innerHTML = post.content

  modal.classList.remove('hidden')
  modal.classList.add('flex')
  getLenis()?.stop()

  const card = modal.querySelector('.bg-white')
  if (card) gsap.fromTo(card, { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' })
}

function closeModal(): void {
  const modal = document.getElementById('postModal')
  if (!modal) return
  const card = modal.querySelector('.bg-white')
  if (card) {
    gsap.to(card, {
      opacity: 0,
      y: 20,
      scale: 0.97,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        modal.classList.add('hidden')
        modal.classList.remove('flex')
        gsap.set(card, { clearProps: 'all' })
        getLenis()?.start()
      },
    })
  }
}

export function render(): string {
  return `
  ${renderNavbar()}
  <main class="pt-14">

    <!-- Hero -->
    <section class="py-20 lg:py-28 bg-cream border-b border-border">
      <div class="w-full max-w-7xl mx-auto px-6">
        <div class="max-w-2xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wide mb-6">
            <i class="ph-fill ph-newspaper text-sm"></i> Blog &amp; Noutăți
          </div>
          <h1 class="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Activități și <span class="text-accent italic">Evenimente</span>
          </h1>
          <p class="text-base lg:text-lg text-txt-secondary leading-relaxed max-w-lg mx-auto">
            Descoperă ce se întâmplă în școala noastră — de la olimpiade și concursuri, până la excursii și proiecte creative.
          </p>
        </div>
      </div>
    </section>

    <!-- Filters -->
    <section class="border-b border-border bg-white sticky top-14 z-30">
      <div class="w-full max-w-7xl mx-auto px-6 py-3 flex items-center gap-3 overflow-x-auto" id="filterBar">
        <button class="filter-btn active shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors" data-cat="all">Toate</button>
      </div>
    </section>

    <!-- Blog Grid -->
    <section class="py-16 lg:py-20">
      <div class="w-full max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-8" id="blogGrid"></div>
        <div id="emptyState" class="hidden text-center py-20">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6"><i class="ph ph-article text-accent text-3xl"></i></div>
          <h3 class="text-xl font-bold mb-2">Nicio postare încă</h3>
          <p class="text-sm text-txt-secondary">Revino curând pentru noutăți despre activitățile școlii.</p>
        </div>
      </div>
    </section>

  </main>

  <!-- Post Modal -->
  <div class="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm hidden items-center justify-center p-4" id="postModal">
    <div class="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
      <div class="relative">
        <img id="modalImage" src="" alt="" class="w-full h-64 object-cover rounded-t-3xl">
        <button id="modalCloseBtn" class="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
          <i class="ph ph-x text-lg text-charcoal"></i>
        </button>
        <div class="absolute bottom-4 left-4">
          <span id="modalCategory" class="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur text-accent"></span>
        </div>
      </div>
      <div class="p-8">
        <div class="flex items-center gap-3 text-xs text-txt-secondary mb-4">
          <span class="flex items-center gap-1"><i class="ph ph-calendar-blank"></i> <span id="modalDate"></span></span>
          <span class="w-1 h-1 rounded-full bg-border"></span>
          <span class="flex items-center gap-1"><i class="ph ph-user"></i> <span id="modalAuthor"></span></span>
        </div>
        <h2 id="modalTitle" class="text-2xl lg:text-3xl font-extrabold tracking-tight mb-6"></h2>
        <div id="modalContent" class="prose prose-sm text-txt-secondary leading-relaxed space-y-3"></div>
      </div>
    </div>
  </div>

  ${renderFooter()}`
}

export function mount(): () => void {
  const cleanups: (() => void)[] = []
  mountNavbar()
  document.querySelectorAll<HTMLElement>('.magnetic-btn').forEach((btn) => cleanups.push(magneticButton(btn)))

  // Hero animation
  gsap.from('.bg-cream h1', { opacity: 0, y: 30, duration: 0.8, delay: 0.1, ease: 'power3.out' })
  gsap.from('.bg-cream p', { opacity: 0, y: 20, duration: 0.7, delay: 0.25, ease: 'power3.out' })
  gsap.from('.bg-cream .inline-flex', { opacity: 0, y: 10, duration: 0.5, delay: 0.05, ease: 'power3.out' })

  // Load posts
  fetchPosts().then((posts) => {
    allPosts = posts
    buildFilterButtons()
    renderPosts()
  })

  // Filter "all" button
  const allBtn = document.querySelector('.filter-btn[data-cat="all"]')
  if (allBtn) {
    allBtn.addEventListener('click', () => filterPosts('all'))
  }

  // Modal backdrop close
  const modal = document.getElementById('postModal')
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal()
    })
  }

  // Modal close button
  const closeBtn = document.getElementById('modalCloseBtn')
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal)
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeModal()
  }
  document.addEventListener('keydown', onKey)
  cleanups.push(() => document.removeEventListener('keydown', onKey))

  return () => cleanups.forEach((fn) => fn())
}
