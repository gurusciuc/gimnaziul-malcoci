import { getCurrentPath } from '../router'

const links = [
  { label: 'Acasă', path: '/', name: 'acasa' },
  { label: 'Elevi', path: '/elevi', name: 'elevi' },
  { label: 'Resurse', path: '/resurse', name: 'resurse' },
  { label: 'Galerie', path: '/galerie', name: 'galerie' },
  { label: 'Activități', path: '/activitati', name: 'activitati' },
]

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

  const mobileLinks = links
    .map((l) => {
      const isActive = current === l.path
      return `<a data-link="${l.path}" class="text-sm font-medium cursor-pointer ${isActive ? 'text-accent' : 'text-txt-secondary'}">${l.label}</a>`
    })
    .join('')

  const contactActive = current === '/contact'

  return `
  <nav class="fixed top-0 left-0 right-0 z-50 nav-blur border-b border-border h-14 flex items-center justify-center">
    <div class="w-full max-w-7xl px-6 flex items-center justify-between">
      <a data-link="/" class="text-sm font-bold tracking-widest uppercase text-charcoal cursor-pointer">Gimnaziul <span class="text-accent">Tudor Deliu</span></a>
      <div class="hidden md:flex items-center gap-8">
        ${desktopLinks}
        <a data-link="/contact" class="magnetic-btn inline-flex items-center gap-1.5 text-[13px] font-semibold tracking-wide px-4 py-1.5 bg-accent text-white rounded-full hover:bg-accent-hover transition-colors cursor-pointer">Contact <i class="ph ph-arrow-up-right text-xs"></i></a>
      </div>
      <button class="flex md:hidden flex-col gap-[5px] p-1" id="navToggle" aria-label="Menu">
        <span class="block w-5 h-[1.5px] bg-charcoal"></span>
        <span class="block w-5 h-[1.5px] bg-charcoal"></span>
        <span class="block w-5 h-[1.5px] bg-charcoal"></span>
      </button>
    </div>
    <div class="mobile-nav-panel md:hidden" id="mobileNav">
      ${mobileLinks}
      <a data-link="/contact" class="text-sm font-medium cursor-pointer ${contactActive ? 'text-accent' : 'text-txt-secondary'}">Contact</a>
    </div>
  </nav>`
}

export function mountNavbar(): void {
  const toggle = document.getElementById('navToggle')
  const panel = document.getElementById('mobileNav')
  if (toggle && panel) {
    toggle.addEventListener('click', () => panel.classList.toggle('open'))
  }
}
