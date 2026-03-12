import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

/* ─── Lenis Smooth Scroll ─── */
export function initLenis(): Lenis {
  if (lenis) return lenis

  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  })

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis!.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function getLenis(): Lenis | null {
  return lenis
}

export function destroyLenis(): void {
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
}

/* ─── Cursor Glow ─── */
export function initCursorGlow(el: HTMLElement): () => void {
  const handler = (e: MouseEvent) => {
    gsap.to(el, { x: e.clientX, y: e.clientY, duration: 0.6, ease: 'power2.out' })
  }
  document.addEventListener('mousemove', handler)
  return () => document.removeEventListener('mousemove', handler)
}

/* ─── Scroll Progress ─── */
export function initScrollProgress(el: HTMLElement): ScrollTrigger {
  return ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.3,
    onUpdate: (self) => {
      gsap.set(el, { scaleX: self.progress })
    },
  })
}

/* ─── Stagger Fade ─── */
export function staggerFade(el: HTMLElement): void {
  gsap.to(Array.from(el.children), {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
  })
}

/* ─── Magnetic Buttons ─── */
export function magneticButton(el: HTMLElement): () => void {
  const onMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15
    gsap.to(el, { x, y, duration: 0.3, ease: 'power2.out' })
  }
  const onLeave = () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' })
  }
  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)
  return () => {
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
  }
}

/* ─── Animate Counters ─── */
export function animateCounter(el: HTMLElement, target: number): void {
  gsap.to({ val: 0 }, {
    val: target,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    onUpdate: function () {
      el.textContent = Math.round(this.targets()[0].val).toString()
    },
  })
}

/* ─── Card Reveal ─── */
export function revealCards(selector: string, opts?: { x?: number; y?: number; stagger?: number }): void {
  const defaults = { x: 0, y: 30, stagger: 0.1 }
  const o = { ...defaults, ...opts }

  gsap.utils.toArray<HTMLElement>(selector).forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      x: o.x,
      y: o.y,
      duration: 0.6,
      delay: (i % 3) * o.stagger,
      ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 90%', once: true },
    })
  })
}

/* ─── Marquee ─── */
export function initMarquee(el: HTMLElement): void {
  el.innerHTML += el.innerHTML
  requestAnimationFrame(() => {
    const mWidth = el.scrollWidth / 2
    gsap.to(el, { x: -mWidth, duration: 60, ease: 'none', repeat: -1 })
  })
}

/* ─── Hero Animations (index page) ─── */
export function animateHero(): void {
  gsap.from('.hero-subtitle', { opacity: 0, y: 16, duration: 0.6, delay: 0.15, ease: 'power3.out' })
  gsap.utils.toArray<HTMLElement>('.line-mask > span').forEach((span, i) => {
    gsap.to(span, { y: 0, duration: 0.9, delay: 0.3 + i * 0.12, ease: 'power3.out' })
  })
  gsap.from('.hero-pill', { opacity: 0, y: 16, duration: 0.6, delay: 0.75, ease: 'power3.out' })
  gsap.from('.hero-btns', { opacity: 0, y: 20, duration: 0.7, delay: 0.9, ease: 'power3.out' })
}

/* ─── Hero Collage Images ─── */
export function animateHeroCollage(): void {
  gsap.from('.hero-img-main', { opacity: 0, y: 40, scale: 0.95, duration: 1, delay: 0.3, ease: 'power3.out' })
  gsap.from('.hero-img-tr', { opacity: 0, x: 30, y: -20, scale: 0.9, duration: 0.9, delay: 0.55, ease: 'power3.out' })
  gsap.from('.hero-img-br', { opacity: 0, x: 20, y: 30, scale: 0.9, duration: 0.9, delay: 0.7, ease: 'power3.out' })
}

/* ─── Floating Labels ─── */
export function animateFloatingLabels(): void {
  gsap.utils.toArray<HTMLElement>('.floating-label').forEach((label, i) => {
    gsap.from(label, { opacity: 0, scale: 0.5, duration: 0.5, delay: 0.9 + i * 0.12, ease: 'back.out(2)' })
    gsap.to(label, {
      y: 'random(-8, 8)',
      x: 'random(-5, 5)',
      duration: 'random(2.5, 4)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.4,
    })
  })
}

/* ─── Mission Section ─── */
export function animateMission(): void {
  gsap.from('.mission-img-1', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.mission-visual', start: 'top 80%', once: true } })
  gsap.from('.mission-img-2', { opacity: 0, x: 30, y: 20, scale: 0.9, duration: 0.8, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.mission-visual', start: 'top 80%', once: true } })
  gsap.from('.mission-badge', { opacity: 0, scale: 0.5, duration: 0.5, delay: 0.4, ease: 'back.out(2)', scrollTrigger: { trigger: '.mission-visual', start: 'top 80%', once: true } })
  gsap.from('.mission-text', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.mission-text', start: 'top 88%', once: true } })
  gsap.from('.mission-text-bold', { opacity: 0, y: 20, duration: 0.6, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.mission-text-bold', start: 'top 88%', once: true } })
  gsap.from('.mission-stats > div', { opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.mission-stats', start: 'top 90%', once: true } })
}

/* ─── Gallery Items ─── */
export function animateGalleryItems(): void {
  gsap.utils.toArray<HTMLElement>('.gallery-item').forEach((item, i) => {
    gsap.from(item, {
      opacity: 0, scale: 0.9, duration: 0.6, delay: (i % 4) * 0.07, ease: 'power3.out',
      scrollTrigger: { trigger: item, start: 'top 92%', once: true },
    })
  })
}

/* ─── Blog Cards ─── */
export function animateBlogCards(container: HTMLElement): void {
  gsap.from(container.querySelectorAll('.blog-card'), {
    opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: 'power3.out',
  })
}

/* ─── Generic From ─── */
export function animateFrom(selector: string, vars: gsap.TweenVars): void {
  gsap.from(selector, vars)
}

/* ─── Cleanup ─── */
export function cleanupAnimations(): void {
  ScrollTrigger.getAll().forEach((t) => t.kill())
}
