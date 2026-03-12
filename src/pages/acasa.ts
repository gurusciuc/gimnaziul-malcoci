import { renderNavbar, mountNavbar } from '../components/navbar'
import { renderFooter } from '../components/footer'
import {
  staggerFade,
  magneticButton,
  animateCounter,
  initMarquee,
  animateHero,
  animateHeroCollage,
  animateFloatingLabels,
  animateMission,
  revealCards,
} from '../utils/animations'
import { fetchPosts } from '../lib/blog-data'
import type { BlogPost } from '../types'
import gsap from 'gsap'

function formatDate(str: string): string {
  const d = new Date(str + 'T00:00:00')
  return d.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })
}

function renderBlogCards(posts: BlogPost[]): string {
  return posts.slice(0, 3).map(p => `
    <article class="group bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer blog-preview-card" data-link="/activitati">
      <div class="aspect-[16/10] overflow-hidden">
        <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy">
      </div>
      <div class="p-5">
        <div class="flex items-center gap-2.5 mb-2.5">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent/10 text-accent">${p.category}</span>
          <span class="text-[11px] text-txt-secondary">${formatDate(p.date)}</span>
        </div>
        <h3 class="text-sm font-bold tracking-tight mb-1.5 group-hover:text-accent transition-colors leading-snug line-clamp-2">${p.title}</h3>
        <p class="text-xs text-txt-secondary leading-relaxed line-clamp-2">${p.excerpt}</p>
      </div>
    </article>
  `).join('')
}

export function render(): string {
  return `
  ${renderNavbar()}

  <div class="cursor-glow" id="cursorGlow"></div>
  <div class="scroll-progress" id="scrollProgress"></div>

  <main class="pt-14">

    <!-- HERO -->
    <section class="relative min-h-[94vh] flex items-center overflow-hidden bg-cream">
      <div class="w-full max-w-7xl mx-auto px-6 relative z-10 py-20 lg:py-0">
        <div class="grid lg:grid-cols-12 gap-10 items-center">

          <div class="lg:col-span-5">
            <p class="hero-subtitle text-sm text-txt-secondary mb-5 leading-relaxed tracking-wide">
              Sprijinim creșterea academică, emoțională și socială a fiecărui copil.
            </p>
            <h1 class="text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.1] mb-8">
              <span class="line-mask"><span>Educație prin</span></span>
              <span class="line-mask"><span>grijă, curiozitate</span></span>
              <span class="line-mask"><span>și <span class="text-accent italic font-extrabold">creativitate</span></span></span>
            </h1>
            <div class="flex items-center gap-3 mb-8 hero-pill">
              <div class="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-border shadow-sm">
                <i class="ph-fill ph-chalkboard-teacher text-accent text-lg"></i>
                <span class="text-xs font-semibold text-charcoal">40+ Profesori dedicați</span>
              </div>
            </div>
            <div class="flex flex-wrap gap-3 hero-btns">
              <a data-link="/contact" class="magnetic-btn inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-hover transition-colors cursor-pointer">
                Începe aventura <i class="ph ph-arrow-right text-base"></i>
              </a>
              <a data-link="/elevi" class="magnetic-btn inline-flex items-center gap-2 px-7 py-3.5 bg-white border border-border text-sm font-medium rounded-full hover:border-charcoal transition-colors cursor-pointer">
                Descoperă
              </a>
            </div>
          </div>

          <div class="lg:col-span-7 relative hero-collage" style="min-height: 480px;">
            <div class="hero-img-main absolute top-0 left-[8%] w-[52%] aspect-[4/5] rounded-3xl overflow-hidden border-4 border-white shadow-lg z-10">
              <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=750&fit=crop" alt="Elevi în clasă" class="w-full h-full object-cover">
            </div>
            <div class="hero-img-tr absolute -top-4 right-[2%] w-[38%] aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-lg z-20">
              <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=500&fit=crop" alt="Activități creative" class="w-full h-full object-cover">
            </div>
            <div class="hero-img-br absolute bottom-4 right-[6%] w-[40%] aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white shadow-lg z-20">
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&h=375&fit=crop" alt="Laborator științe" class="w-full h-full object-cover">
            </div>
            <div class="floating-label absolute top-6 right-[42%] z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-[11px] font-bold text-charcoal shadow-md">
              <i class="ph-fill ph-star text-xs"></i> Curioși
            </div>
            <div class="floating-label absolute top-[30%] right-0 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-[11px] font-bold text-white shadow-md">
              <i class="ph-fill ph-heart text-xs"></i> Implicați
            </div>
            <div class="floating-label absolute bottom-[15%] left-[3%] z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-400 text-[11px] font-bold text-charcoal shadow-md">
              <i class="ph-fill ph-leaf text-xs"></i> Sănătoși
            </div>
            <div class="floating-label absolute bottom-0 right-[44%] z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-400 text-[11px] font-bold text-white shadow-md">
              <i class="ph-fill ph-lightbulb text-xs"></i> Inspirați
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- MARQUEE -->
    <section class="py-4 border-y border-border overflow-hidden bg-white">
      <div class="marquee-track" id="marquee">
        <span class="text-sm font-semibold tracking-[0.2em] uppercase text-accent/30 whitespace-nowrap">Excelență</span>
        <span class="text-accent/15"><i class="ph-fill ph-diamond text-xs"></i></span>
        <span class="text-sm font-semibold tracking-[0.2em] uppercase text-accent/30 whitespace-nowrap">Creativitate</span>
        <span class="text-accent/15"><i class="ph-fill ph-diamond text-xs"></i></span>
        <span class="text-sm font-semibold tracking-[0.2em] uppercase text-accent/30 whitespace-nowrap">Comunitate</span>
        <span class="text-accent/15"><i class="ph-fill ph-diamond text-xs"></i></span>
        <span class="text-sm font-semibold tracking-[0.2em] uppercase text-accent/30 whitespace-nowrap">Respect</span>
        <span class="text-accent/15"><i class="ph-fill ph-diamond text-xs"></i></span>
        <span class="text-sm font-semibold tracking-[0.2em] uppercase text-accent/30 whitespace-nowrap">Curiozitate</span>
        <span class="text-accent/15"><i class="ph-fill ph-diamond text-xs"></i></span>
        <span class="text-sm font-semibold tracking-[0.2em] uppercase text-accent/30 whitespace-nowrap">Inovare</span>
        <span class="text-accent/15"><i class="ph-fill ph-diamond text-xs"></i></span>
        <span class="text-sm font-semibold tracking-[0.2em] uppercase text-accent/30 whitespace-nowrap">Tradiție</span>
        <span class="text-accent/15"><i class="ph-fill ph-diamond text-xs"></i></span>
      </div>
    </section>

    <!-- MISSION -->
    <section class="py-24 lg:py-32">
      <div class="w-full max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div class="relative mission-visual" style="min-height: 300px;">
            <div class="mission-img-1 w-[65%] aspect-[3/4] rounded-3xl overflow-hidden border border-border">
              <img src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&h=800&fit=crop" alt="Activități școlare" class="w-full h-full object-cover">
            </div>
            <div class="mission-img-2 absolute bottom-0 right-0 w-[50%] aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-lg">
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c476?w=500&h=500&fit=crop" alt="Sala de clasă" class="w-full h-full object-cover">
            </div>
            <div class="mission-badge absolute -top-3 right-[20%] flex items-center gap-2 px-4 py-2.5 rounded-full bg-accent text-white shadow-md">
              <i class="ph-fill ph-shooting-star text-base"></i>
              <span class="text-xs font-bold tracking-wide">Inspirăm din 1995</span>
            </div>
          </div>
          <div>
            <div class="stagger-fade">
              <span class="text-xs font-semibold tracking-widest uppercase text-accent mb-3 block">Despre Noi</span>
              <h2 class="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-6">
                <span class="text-accent italic">Despre</span> Gimnaziul<br>Tudor Deliu
              </h2>
            </div>
            <p class="text-sm text-txt-secondary leading-relaxed mb-6 mission-text">Gimnaziul Tudor Deliu este un spațiu plin de viață unde copiii explorează, descoperă și cresc cu încredere. Cultivăm curiozitatea fiecărui elev prin joc, creativitate și ghidare atentă.</p>
            <p class="text-base font-semibold text-charcoal leading-relaxed mb-10 mission-text-bold">Ajutăm copiii să învețe și să crească prin activități creative, bazate pe joc, într-un mediu sigur și încurajator.</p>
            <div class="grid grid-cols-3 gap-3 sm:gap-6 pt-8 border-t border-border mission-stats">
              <div>
                <span class="text-2xl sm:text-3xl font-extrabold text-accent counter" data-target="98">0</span><span class="text-2xl sm:text-3xl font-extrabold text-accent">%</span>
                <p class="text-[10px] sm:text-xs text-txt-secondary mt-1 font-medium">Părinți mulțumiți</p>
              </div>
              <div>
                <span class="text-2xl sm:text-3xl font-extrabold text-accent counter" data-target="38">0</span><span class="text-2xl sm:text-3xl font-extrabold text-accent">+</span>
                <p class="text-[10px] sm:text-xs text-txt-secondary mt-1 font-medium">Cadre didactice</p>
              </div>
              <div>
                <span class="text-2xl sm:text-3xl font-extrabold text-accent counter" data-target="420">0</span>
                <p class="text-[10px] sm:text-xs text-txt-secondary mt-1 font-medium">Elevi formați anual</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="py-24 bg-cream">
      <div class="w-full max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div class="stagger-fade lg:sticky lg:top-24">
            <span class="text-xs font-semibold tracking-widest uppercase text-accent mb-3 block">Ce ne face speciali</span>
            <h2 class="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-5">
              Creăm un spațiu cald, plin de bucurie, unde fiecare copil învață în ritmul lui.
            </h2>
            <p class="text-sm text-txt-secondary leading-relaxed">Abordarea noastră combină jocul, creativitatea și ghidarea atentă a cadrelor didactice.</p>
          </div>
          <div class="flex flex-col gap-5 feature-cards">
            <div class="feature-card flex items-start gap-5 p-6 bg-white rounded-2xl border border-border">
              <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0"><i class="ph-fill ph-shield-check text-accent text-xl"></i></div>
              <div><h3 class="text-sm font-bold mb-1.5">Mediu sigur și primitor</h3><p class="text-xs text-txt-secondary leading-relaxed">Un spațiu cald, securizat, unde copiii se simt liberi să exploreze și să se exprime.</p></div>
            </div>
            <div class="feature-card flex items-start gap-5 p-6 bg-white rounded-2xl border border-border">
              <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0"><i class="ph-fill ph-puzzle-piece text-accent text-xl"></i></div>
              <div><h3 class="text-sm font-bold mb-1.5">Învățare prin experiență</h3><p class="text-xs text-txt-secondary leading-relaxed">Copiii învață natural prin jocuri, proiecte practice și activități creative adaptate vârstei.</p></div>
            </div>
            <div class="feature-card flex items-start gap-5 p-6 bg-white rounded-2xl border border-border">
              <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0"><i class="ph-fill ph-users-three text-accent text-xl"></i></div>
              <div><h3 class="text-sm font-bold mb-1.5">Echipă experimentată</h3><p class="text-xs text-txt-secondary leading-relaxed">Cadre didactice dedicate care ghidează fiecare copil cu răbdare, încurajare și expertiză.</p></div>
            </div>
            <div class="feature-card flex items-start gap-5 p-6 bg-white rounded-2xl border border-border">
              <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0"><i class="ph-fill ph-trophy text-accent text-xl"></i></div>
              <div><h3 class="text-sm font-bold mb-1.5">Rezultate dovedite</h3><p class="text-xs text-txt-secondary leading-relaxed">Premii la olimpiade naționale, rată de promovare de 97% și absolvenți de excepție.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS BAND -->
    <section class="py-20 bg-accent text-white">
      <div class="w-full max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
          <div class="stat-item"><span class="text-3xl sm:text-4xl lg:text-5xl font-extrabold counter-white" data-target="30">0</span><span class="text-3xl sm:text-4xl lg:text-5xl font-extrabold">+</span><p class="text-xs sm:text-sm mt-2 text-white/60 font-medium">Ani de tradiție</p></div>
          <div class="stat-item"><span class="text-3xl sm:text-4xl lg:text-5xl font-extrabold counter-white" data-target="420">0</span><p class="text-xs sm:text-sm mt-2 text-white/60 font-medium">Elevi înscriși</p></div>
          <div class="stat-item"><span class="text-3xl sm:text-4xl lg:text-5xl font-extrabold counter-white" data-target="50">0</span><span class="text-3xl sm:text-4xl lg:text-5xl font-extrabold">+</span><p class="text-xs sm:text-sm mt-2 text-white/60 font-medium">Premii la olimpiade</p></div>
          <div class="stat-item"><span class="text-3xl sm:text-4xl lg:text-5xl font-extrabold counter-white" data-target="97">0</span><span class="text-3xl sm:text-4xl lg:text-5xl font-extrabold">%</span><p class="text-xs sm:text-sm mt-2 text-white/60 font-medium">Rata promovării</p></div>
        </div>
      </div>
    </section>

    <!-- GALLERY PREVIEW -->
    <section class="py-24 lg:py-32">
      <div class="w-full max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14 stagger-fade">
          <div>
            <span class="text-xs font-semibold tracking-widest uppercase text-accent mb-3 block">Viața la școală</span>
            <h2 class="text-3xl lg:text-4xl font-extrabold tracking-tight">Momente care contează</h2>
          </div>
          <a data-link="/galerie" class="magnetic-btn inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all cursor-pointer">
            Vezi galeria completă <i class="ph ph-arrow-right text-base"></i>
          </a>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="preview-img aspect-square overflow-hidden rounded-2xl"><img src="https://images.unsplash.com/photo-1523050854058-8df90110c476?w=500&h=500&fit=crop" alt="Sala de clasă" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"></div>
          <div class="preview-img aspect-[3/4] overflow-hidden rounded-2xl md:row-span-2"><img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&h=700&fit=crop" alt="Elevi" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"></div>
          <div class="preview-img aspect-square overflow-hidden rounded-2xl"><img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&h=500&fit=crop" alt="Laborator" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"></div>
          <div class="preview-img aspect-square overflow-hidden rounded-2xl"><img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=500&fit=crop" alt="Proiecte" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"></div>
          <div class="preview-img aspect-square overflow-hidden rounded-2xl"><img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=500&h=500&fit=crop" alt="Bibliotecă" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"></div>
          <div class="preview-img aspect-square overflow-hidden rounded-2xl hidden md:block"><img src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=500&h=500&fit=crop" alt="Sport" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"></div>
          <div class="preview-img aspect-square overflow-hidden rounded-2xl hidden md:block"><img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&h=500&fit=crop" alt="Cărți" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"></div>
        </div>
      </div>
    </section>

    <!-- BLOG PREVIEW -->
    <section class="py-24 lg:py-32 bg-cream border-t border-border">
      <div class="w-full max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 stagger-fade">
          <div>
            <span class="text-xs font-semibold tracking-widest uppercase text-accent mb-3 block">Blog & Noutăți</span>
            <h2 class="text-3xl lg:text-4xl font-extrabold tracking-tight">Ultimele activități</h2>
          </div>
          <a data-link="/activitati" class="magnetic-btn inline-flex items-center gap-2 text-xs font-semibold text-accent hover:gap-3 transition-all cursor-pointer">
            Toate activitățile <i class="ph ph-arrow-right text-sm"></i>
          </a>
        </div>
        <div class="grid md:grid-cols-3 gap-6" id="homeBlogGrid">
          <!-- filled async -->
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 bg-cream border-t border-border">
      <div class="w-full max-w-4xl mx-auto px-6 text-center stagger-fade">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6"><i class="ph-fill ph-hand-waving text-accent text-3xl"></i></div>
        <h2 class="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">Pregătit să faci parte din echipă?</h2>
        <p class="text-base text-txt-secondary mb-8 max-w-md mx-auto">Înscrierea este simplă și rapidă. Hai să construim viitorul împreună!</p>
        <div class="flex flex-wrap justify-center gap-4">
          <a data-link="/contact" class="magnetic-btn inline-flex items-center gap-2 px-8 py-4 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-hover transition-colors cursor-pointer">Contactează-ne <i class="ph ph-arrow-right text-base"></i></a>
          <a data-link="/resurse" class="magnetic-btn inline-flex items-center gap-2 px-8 py-4 bg-white border border-border text-sm font-medium rounded-full hover:border-charcoal transition-colors cursor-pointer">Informații admitere</a>
        </div>
      </div>
    </section>

  </main>

  ${renderFooter()}`
}

export function mount(): () => void {
  const cleanups: (() => void)[] = []

  mountNavbar()

  // Stagger fades
  document.querySelectorAll<HTMLElement>('.stagger-fade').forEach((el) => staggerFade(el))

  // Magnetic buttons
  document.querySelectorAll<HTMLElement>('.magnetic-btn').forEach((btn) => {
    cleanups.push(magneticButton(btn))
  })

  // Counters
  document.querySelectorAll<HTMLElement>('.counter').forEach((el) => {
    const target = +(el.dataset.target || '0')
    animateCounter(el, target)
  })
  document.querySelectorAll<HTMLElement>('.counter-white').forEach((el) => {
    const target = +(el.dataset.target || '0')
    animateCounter(el, target)
  })

  // Marquee
  const marquee = document.getElementById('marquee')
  if (marquee) initMarquee(marquee)

  // Hero animations
  animateHero()
  animateHeroCollage()
  animateFloatingLabels()

  // Mission
  animateMission()

  // Feature cards
  revealCards('.feature-card', { x: 30, y: 0 })

  // Stats
  revealCards('.stat-item', { y: 30 })

  // Gallery preview
  revealCards('.preview-img', { y: 0, stagger: 0.07 })

  // Blog preview
  const blogGrid = document.getElementById('homeBlogGrid')
  if (blogGrid) {
    fetchPosts().then((posts) => {
      blogGrid.innerHTML = renderBlogCards(posts)
      revealCards('.blog-preview-card', { y: 30, stagger: 0.1 })
    })
  }

  return () => cleanups.forEach((fn) => fn())
}
