import { getCurrentPath } from '../router'

const links = [
  { label: 'Acasă', path: '/', name: 'acasa' },
  { label: 'Elevi', path: '/elevi', name: 'elevi' },
  { label: 'Resurse', path: '/resurse', name: 'resurse' },
  { label: 'Galerie', path: '/galerie', name: 'galerie' },
  { label: 'Activități', path: '/activitati', name: 'activitati' },
]

const allLinks = [...links, { label: 'Contact', path: '/contact', name: 'contact' }]

export function renderNavbar(): string {
  const current = getCurrentPath()

  const desktopLinks = links
    .map((l) => {
      const isActive = current === l.path
      const cls = isActive
        ? 'text-accent relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[1.5px] after:bg-accent'
        : 'text-txt-secondary hover:text-accent'
      return `<a data-link="${l.path}" class="text-[13px] font-medium tracking-wide transition-colors cursor-pointer ${cls}">${l.label}</a>`
    })
    .join('')

  const mobileLinks = allLinks
    .map((l, i) => {
      const isActive = current === l.path
      return `<a data-link="${l.path}" class="mobile-menu-link block text-3xl sm:text-4xl font-extrabold tracking-tight cursor-pointer transition-colors ${isActive ? 'text-accent' : 'text-white hover:text-accent'}" style="opacity:0;transform:translateX(30px);transition-delay:${i * 60}ms">${l.label}</a>`
    })
    .join('')

  return `
  <nav class="fixed top-0 left-0 right-0 z-50 nav-blur border-b border-border h-14 flex items-center justify-center">
    <div class="w-full max-w-7xl px-6 flex items-center justify-between">
      <a data-link="/" class="text-sm font-bold tracking-widest uppercase text-charcoal cursor-pointer">Gimnaziul <span class="text-accent">Tudor Deliu</span></a>
      <div class="hidden md:flex items-center gap-8">
        ${desktopLinks}
        <a data-link="/contact" class="magnetic-btn inline-flex items-center gap-1.5 text-[13px] font-semibold tracking-wide px-4 py-1.5 bg-accent text-white rounded-full hover:bg-accent-hover transition-colors cursor-pointer">Contact <i class="ph ph-arrow-up-right text-xs"></i></a>
      </div>
      <button class="flex md:hidden flex-col items-center justify-center w-8 h-8 relative" id="navToggle" aria-label="Menu">
        <span class="nav-bar block w-5 h-[1.5px] bg-charcoal absolute transition-all duration-300" style="top:11px"></span>
        <span class="nav-bar block w-5 h-[1.5px] bg-charcoal absolute transition-all duration-300" style="top:16px"></span>
        <span class="nav-bar block w-5 h-[1.5px] bg-charcoal absolute transition-all duration-300" style="top:21px"></span>
      </button>
    </div>
  </nav>

  <!-- Fullscreen mobile menu -->
  <div class="mobile-menu-overlay md:hidden" id="mobileNav">
    <div class="flex flex-col justify-between h-full px-8 py-6">
      <div class="flex items-center justify-between">
        <a data-link="/" class="text-sm font-bold tracking-widest uppercase text-white cursor-pointer">Gimnaziul <span class="text-accent">Tudor Deliu</span></a>
        <button class="mobile-menu-close w-10 h-10 flex items-center justify-center" id="navClose" aria-label="Închide">
          <i class="ph ph-x text-2xl text-white"></i>
        </button>
      </div>
      <div class="flex flex-col items-end gap-5 text-right">
        ${mobileLinks}
      </div>
      <div class="text-right">
        <p class="text-xs text-white/40">Gimnaziul Tudor Deliu, Malcoci</p>
      </div>
    </div>
  </div>`
}

export function mountNavbar(): void {
  const toggle = document.getElementById('navToggle')
  const closeBtn = document.getElementById('navClose')
  const overlay = document.getElementById('mobileNav')
  if (!toggle || !overlay) return

  const open = () => {
    overlay.classList.add('open')
    document.body.style.overflow = 'hidden'
    // Animate links in
    overlay.querySelectorAll<HTMLElement>('.mobile-menu-link').forEach((link) => {
      link.style.opacity = '1'
      link.style.transform = 'translateX(0)'
    })
  }

  const close = () => {
    // Animate links out first
    overlay.querySelectorAll<HTMLElement>('.mobile-menu-link').forEach((link) => {
      link.style.opacity = '0'
      link.style.transform = 'translateX(30px)'
    })
    setTimeout(() => {
      overlay.classList.remove('open')
      document.body.style.overflow = ''
    }, 200)
  }

  toggle.addEventListener('click', open)
  if (closeBtn) closeBtn.addEventListener('click', close)

  // Close on link click
  overlay.querySelectorAll('[data-link]').forEach((link) => {
    link.addEventListener('click', close)
  })
}
