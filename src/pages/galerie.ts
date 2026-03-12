import { renderNavbar, mountNavbar } from '../components/navbar'
import { renderFooter } from '../components/footer'
import { staggerFade, magneticButton, animateGalleryItems } from '../utils/animations'
import { getLenis } from '../utils/animations'
import gsap from 'gsap'

function openLightbox(el: HTMLElement): void {
  const img = el.querySelector('img')
  if (!img) return
  const src = img.src.replace(/w=\d+&h=\d+/, 'w=1200&h=1200')
  const lightboxImg = document.getElementById('lightboxImg') as HTMLImageElement
  const lightbox = document.getElementById('lightbox')
  if (!lightboxImg || !lightbox) return
  lightboxImg.src = src
  lightbox.classList.add('active')
  getLenis()?.stop()
}

function closeLightbox(): void {
  const lightbox = document.getElementById('lightbox')
  if (!lightbox) return
  lightbox.classList.remove('active')
  getLenis()?.start()
}

export function render(): string {
  const images = [
    { src: 'photo-1577896851231-70ef18881754', alt: 'Elevi în clasă', cls: 'bento-large' },
    { src: 'photo-1503676260728-1c00da094a0b', alt: 'Activități', cls: '' },
    { src: 'photo-1509062522246-3755977927d7', alt: 'Laborator', cls: '' },
    { src: 'photo-1588072432836-e10032774350', alt: 'Curtea școlii', cls: 'bento-tall' },
    { src: 'photo-1523050854058-8df90110c476', alt: 'Sala de clasă', cls: 'bento-wide' },
    { src: 'photo-1571260899304-425eee4c7efc', alt: 'Bibliotecă', cls: '' },
    { src: 'photo-1497633762265-9d179a990aa6', alt: 'Cărți', cls: '' },
    { src: 'photo-1427504494785-3a9ca7044f45', alt: 'Proiecte', cls: 'bento-wide' },
    { src: 'photo-1546410531-bb4caa6b424d', alt: 'Artă', cls: '' },
    { src: 'photo-1580582932707-520aed937b7b', alt: 'Sport', cls: '' },
    { src: 'photo-1522661067900-ab829854a57f', alt: 'Festivitate', cls: 'bento-large' },
    { src: 'photo-1544717305-2782549b5136', alt: 'Muzică', cls: '' },
    { src: 'photo-1606761568499-6d2451b23c66', alt: 'Lectură', cls: '' },
  ]

  const items = images
    .map(
      (img) => `
    <div class="bento-item ${img.cls} gallery-item cursor-zoom-in">
      <img src="https://images.unsplash.com/${img.src}?w=800&h=800&fit=crop" alt="${img.alt}" class="w-full h-full object-cover">
    </div>`
    )
    .join('')

  return `
  ${renderNavbar()}
  <main class="pt-14">

    <!-- Hero -->
    <section class="py-20 lg:py-28 bg-cream border-b border-border">
      <div class="w-full max-w-7xl mx-auto px-6">
        <div class="max-w-2xl mx-auto text-center stagger-fade">
          <span class="text-xs font-semibold tracking-widest uppercase text-accent mb-3 block">Galerie</span>
          <h1 class="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-5">
            Momente din viața <span class="text-accent italic">școlii</span>
          </h1>
          <p class="text-base text-txt-secondary leading-relaxed max-w-lg mx-auto">Fotografii din activitățile, evenimentele și viața de zi cu zi a elevilor noștri.</p>
        </div>
      </div>
    </section>

    <!-- Bento Gallery -->
    <section class="py-24 lg:py-32">
      <div class="w-full max-w-7xl mx-auto px-6">
        <div class="bento-grid">
          ${items}
        </div>
      </div>
    </section>

  </main>

  <!-- Lightbox -->
  <div class="lightbox-overlay" id="lightbox">
    <img id="lightboxImg" src="" alt="Lightbox">
  </div>

  ${renderFooter()}`
}

export function mount(): () => void {
  const cleanups: (() => void)[] = []
  mountNavbar()

  document.querySelectorAll<HTMLElement>('.stagger-fade').forEach((el) => staggerFade(el))
  document.querySelectorAll<HTMLElement>('.magnetic-btn').forEach((btn) => cleanups.push(magneticButton(btn)))

  animateGalleryItems()

  // Gallery click handlers
  document.querySelectorAll<HTMLElement>('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => openLightbox(item))
  })

  // Lightbox close
  const lightbox = document.getElementById('lightbox')
  if (lightbox) {
    lightbox.addEventListener('click', closeLightbox)
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox()
  }
  document.addEventListener('keydown', onKey)
  cleanups.push(() => document.removeEventListener('keydown', onKey))

  return () => cleanups.forEach((fn) => fn())
}
