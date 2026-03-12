import { renderNavbar, mountNavbar } from '../components/navbar'
import { renderFooter } from '../components/footer'
import { staggerFade, magneticButton, revealCards } from '../utils/animations'
import gsap from 'gsap'

function toggleFaq(btn: HTMLElement): void {
  const answer = btn.nextElementSibling as HTMLElement
  const chevron = btn.querySelector('.faq-chevron') as HTMLElement
  if (!answer || !chevron) return

  const isOpen = answer.offsetHeight > 0 && !answer.classList.contains('h-0')
  if (isOpen) {
    gsap.to(answer, { height: 0, duration: 0.3, ease: 'power2.inOut' })
    chevron.classList.remove('open')
  } else {
    gsap.set(answer, { height: 'auto' })
    const h = answer.offsetHeight
    gsap.fromTo(answer, { height: 0 }, { height: h, duration: 0.3, ease: 'power2.inOut' })
    chevron.classList.add('open')
  }
}

export function render(): string {
  return `
  ${renderNavbar()}
  <main class="pt-14">

    <!-- Hero -->
    <section class="py-20 lg:py-28 bg-cream border-b border-border">
      <div class="w-full max-w-7xl mx-auto px-6">
        <div class="max-w-2xl mx-auto text-center stagger-fade">
          <span class="text-xs font-semibold tracking-widest uppercase text-accent mb-3 block">Resurse</span>
          <h1 class="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-5">
            Tot ce ai <span class="text-accent italic">nevoie</span>
          </h1>
          <p class="text-base text-txt-secondary leading-relaxed max-w-lg mx-auto">Platforme, documente, calendar și răspunsuri la cele mai frecvente întrebări — totul într-un singur loc.</p>
        </div>
      </div>
    </section>

    <!-- Quick Access Platforms -->
    <section class="py-24">
      <div class="w-full max-w-7xl mx-auto px-6">
        <div class="mb-12 stagger-fade">
          <span class="text-xs font-semibold tracking-widest uppercase text-accent mb-2 block">Acces rapid</span>
          <h2 class="text-2xl font-extrabold tracking-tight">Platforme digitale</h2>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <a href="#" class="feature-card flex flex-col items-start gap-4 p-6 rounded-2xl border border-border bg-white hover:border-accent/30 transition-colors group">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center"><i class="ph-fill ph-notebook text-accent text-xl"></i></div>
            <div><h3 class="text-sm font-bold mb-1">Catalog electronic</h3><p class="text-xs text-txt-secondary leading-relaxed">Note, absențe și rapoarte în timp real.</p></div>
            <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-accent mt-auto group-hover:gap-2.5 transition-all">Accesează <i class="ph ph-arrow-right text-sm"></i></span>
          </a>
          <a href="#" class="feature-card flex flex-col items-start gap-4 p-6 rounded-2xl border border-border bg-white hover:border-accent/30 transition-colors group">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center"><i class="ph-fill ph-monitor text-accent text-xl"></i></div>
            <div><h3 class="text-sm font-bold mb-1">Platforma e-learning</h3><p class="text-xs text-txt-secondary leading-relaxed">Materiale, teme și lecții video online.</p></div>
            <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-accent mt-auto group-hover:gap-2.5 transition-all">Accesează <i class="ph ph-arrow-right text-sm"></i></span>
          </a>
          <a href="#" class="feature-card flex flex-col items-start gap-4 p-6 rounded-2xl border border-border bg-white hover:border-accent/30 transition-colors group">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center"><i class="ph-fill ph-books text-accent text-xl"></i></div>
            <div><h3 class="text-sm font-bold mb-1">Biblioteca digitală</h3><p class="text-xs text-txt-secondary leading-relaxed">Manuale, cărți și resurse gratuite.</p></div>
            <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-accent mt-auto group-hover:gap-2.5 transition-all">Accesează <i class="ph ph-arrow-right text-sm"></i></span>
          </a>
          <a href="#" class="feature-card flex flex-col items-start gap-4 p-6 rounded-2xl border border-border bg-white hover:border-accent/30 transition-colors group">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center"><i class="ph-fill ph-graduation-cap text-accent text-xl"></i></div>
            <div><h3 class="text-sm font-bold mb-1">Portal admitere</h3><p class="text-xs text-txt-secondary leading-relaxed">Înscrieri, dosare și ghid complet.</p></div>
            <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-accent mt-auto group-hover:gap-2.5 transition-all">Accesează <i class="ph ph-arrow-right text-sm"></i></span>
          </a>
        </div>
      </div>
    </section>

    <!-- Calendar Timeline -->
    <section class="py-24 bg-cream border-y border-border">
      <div class="w-full max-w-6xl mx-auto px-6">
        <div class="mb-14 text-center stagger-fade">
          <span class="text-xs font-semibold tracking-widest uppercase text-accent mb-2 block">Calendar</span>
          <h2 class="text-2xl font-extrabold tracking-tight">Anul școlar 2025–2026</h2>
        </div>
        <div class="relative">
          <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px"></div>
          <div class="flex flex-col gap-10">
            <div class="timeline-item relative flex items-start gap-6 md:gap-0">
              <div class="hidden md:flex md:w-1/2 md:pr-10 md:justify-end"><div class="text-right"><span class="text-xs font-bold text-accent">Septembrie 2025</span><p class="text-sm font-semibold mt-1">Deschiderea anului școlar</p><p class="text-xs text-txt-secondary mt-0.5">Festivitate și prima zi de școală.</p></div></div>
              <div class="absolute left-4 md:left-1/2 w-3 h-3 bg-accent rounded-full -translate-x-1/2 mt-1 ring-4 ring-white"></div>
              <div class="md:hidden pl-10"><span class="text-xs font-bold text-accent">Septembrie 2025</span><p class="text-sm font-semibold mt-1">Deschiderea anului școlar</p><p class="text-xs text-txt-secondary mt-0.5">Festivitate și prima zi de școală.</p></div>
              <div class="hidden md:block md:w-1/2 md:pl-10"></div>
            </div>
            <div class="timeline-item relative flex items-start gap-6 md:gap-0">
              <div class="hidden md:block md:w-1/2 md:pr-10"></div>
              <div class="absolute left-4 md:left-1/2 w-3 h-3 bg-accent rounded-full -translate-x-1/2 mt-1 ring-4 ring-cream"></div>
              <div class="md:w-1/2 md:pl-10 pl-10"><span class="text-xs font-bold text-accent">Octombrie 2025</span><p class="text-sm font-semibold mt-1">Vacanța de toamnă</p><p class="text-xs text-txt-secondary mt-0.5">26 oct – 3 nov. Timp de odihnă și relaxare.</p></div>
            </div>
            <div class="timeline-item relative flex items-start gap-6 md:gap-0">
              <div class="hidden md:flex md:w-1/2 md:pr-10 md:justify-end"><div class="text-right"><span class="text-xs font-bold text-accent">Decembrie 2025</span><p class="text-sm font-semibold mt-1">Sărbătoarea de iarnă</p><p class="text-xs text-txt-secondary mt-0.5">Spectacol de Crăciun și vacanță.</p></div></div>
              <div class="absolute left-4 md:left-1/2 w-3 h-3 bg-accent rounded-full -translate-x-1/2 mt-1 ring-4 ring-white"></div>
              <div class="md:hidden pl-10"><span class="text-xs font-bold text-accent">Decembrie 2025</span><p class="text-sm font-semibold mt-1">Sărbătoarea de iarnă</p><p class="text-xs text-txt-secondary mt-0.5">Spectacol de Crăciun și vacanță.</p></div>
              <div class="hidden md:block md:w-1/2 md:pl-10"></div>
            </div>
            <div class="timeline-item relative flex items-start gap-6 md:gap-0">
              <div class="hidden md:block md:w-1/2 md:pr-10"></div>
              <div class="absolute left-4 md:left-1/2 w-3 h-3 bg-accent rounded-full -translate-x-1/2 mt-1 ring-4 ring-cream"></div>
              <div class="md:w-1/2 md:pl-10 pl-10"><span class="text-xs font-bold text-accent">Iunie 2026</span><p class="text-sm font-semibold mt-1">Festivitatea de absolvire</p><p class="text-xs text-txt-secondary mt-0.5">Premiere, diplome și amintiri de neuitat.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Admitere Docs -->
    <section class="py-24">
      <div class="w-full max-w-6xl mx-auto px-6">
        <div class="mb-12 stagger-fade">
          <span class="text-xs font-semibold tracking-widest uppercase text-accent mb-2 block">Admitere</span>
          <h2 class="text-2xl font-extrabold tracking-tight">Documente necesare</h2>
        </div>
        <div class="flex flex-col gap-3">
          <div class="doc-item flex items-center gap-4 p-4 rounded-xl border border-border hover:border-accent/20 transition-colors">
            <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"><i class="ph-fill ph-file-text text-accent text-lg"></i></div>
            <div><p class="text-sm font-semibold">Cerere de înscriere</p><p class="text-xs text-txt-secondary">Formular standard completat de părinți</p></div>
          </div>
          <div class="doc-item flex items-center gap-4 p-4 rounded-xl border border-border hover:border-accent/20 transition-colors">
            <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"><i class="ph-fill ph-clipboard-text text-accent text-lg"></i></div>
            <div><p class="text-sm font-semibold">Foaie matricolă</p><p class="text-xs text-txt-secondary">Copie legalizată de la școala anterioară</p></div>
          </div>
          <div class="doc-item flex items-center gap-4 p-4 rounded-xl border border-border hover:border-accent/20 transition-colors">
            <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"><i class="ph-fill ph-first-aid-kit text-accent text-lg"></i></div>
            <div><p class="text-sm font-semibold">Adeverință medicală</p><p class="text-xs text-txt-secondary">Eliberată de medicul de familie</p></div>
          </div>
          <div class="doc-item flex items-center gap-4 p-4 rounded-xl border border-border hover:border-accent/20 transition-colors">
            <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"><i class="ph-fill ph-identification-card text-accent text-lg"></i></div>
            <div><p class="text-sm font-semibold">Certificat de naștere</p><p class="text-xs text-txt-secondary">Copie și original pentru conformitate</p></div>
          </div>
          <div class="doc-item flex items-center gap-4 p-4 rounded-xl border border-border hover:border-accent/20 transition-colors">
            <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"><i class="ph-fill ph-camera text-accent text-lg"></i></div>
            <div><p class="text-sm font-semibold">Fotografii tip buletin</p><p class="text-xs text-txt-secondary">2 fotografii recente 3x4 cm</p></div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-24 bg-cream border-y border-border">
      <div class="w-full max-w-4xl mx-auto px-6">
        <div class="mb-12 text-center stagger-fade">
          <span class="text-xs font-semibold tracking-widest uppercase text-accent mb-2 block">FAQ</span>
          <h2 class="text-2xl font-extrabold tracking-tight">Întrebări frecvente</h2>
        </div>
        <div class="flex flex-col gap-3" id="faqList">
          <div class="faq-item rounded-xl border border-border bg-white overflow-hidden">
            <button class="faq-toggle w-full flex items-center justify-between p-5 text-left">
              <span class="text-sm font-semibold pr-4">Care este programa școlară?</span>
              <i class="ph ph-caret-down text-txt-secondary faq-chevron flex-shrink-0"></i>
            </button>
            <div class="faq-answer px-5 pb-0 h-0 overflow-hidden">
              <p class="text-sm text-txt-secondary leading-relaxed pb-5">Programa se desfășoară conform planului-cadru aprobat de MECC, cu clase de la a V-a până la a IX-a, completând cu activități extracurriculare.</p>
            </div>
          </div>
          <div class="faq-item rounded-xl border border-border bg-white overflow-hidden">
            <button class="faq-toggle w-full flex items-center justify-between p-5 text-left">
              <span class="text-sm font-semibold pr-4">Cum mă înscriu?</span>
              <i class="ph ph-caret-down text-txt-secondary faq-chevron flex-shrink-0"></i>
            </button>
            <div class="faq-answer px-5 pb-0 h-0 overflow-hidden">
              <p class="text-sm text-txt-secondary leading-relaxed pb-5">Înscrierea se face la secretariatul școlii cu dosarul complet de documente. Perioada de înscriere: 1–30 iunie.</p>
            </div>
          </div>
          <div class="faq-item rounded-xl border border-border bg-white overflow-hidden">
            <button class="faq-toggle w-full flex items-center justify-between p-5 text-left">
              <span class="text-sm font-semibold pr-4">Există activități extracurriculare?</span>
              <i class="ph ph-caret-down text-txt-secondary faq-chevron flex-shrink-0"></i>
            </button>
            <div class="faq-answer px-5 pb-0 h-0 overflow-hidden">
              <p class="text-sm text-txt-secondary leading-relaxed pb-5">Da, oferim peste 9 activități: teatru, STEM, informatică, artă, cor, sport, voluntariat, lectură și limbi străine.</p>
            </div>
          </div>
          <div class="faq-item rounded-xl border border-border bg-white overflow-hidden">
            <button class="faq-toggle w-full flex items-center justify-between p-5 text-left">
              <span class="text-sm font-semibold pr-4">Ce limbi străine se predau?</span>
              <i class="ph ph-caret-down text-txt-secondary faq-chevron flex-shrink-0"></i>
            </button>
            <div class="faq-answer px-5 pb-0 h-0 overflow-hidden">
              <p class="text-sm text-txt-secondary leading-relaxed pb-5">Elevii studiază engleză și franceză ca limbi obligatorii, cu opțiunea de germană ca a treia limbă străină.</p>
            </div>
          </div>
          <div class="faq-item rounded-xl border border-border bg-white overflow-hidden">
            <button class="faq-toggle w-full flex items-center justify-between p-5 text-left">
              <span class="text-sm font-semibold pr-4">Cum pot contacta școala?</span>
              <i class="ph ph-caret-down text-txt-secondary faq-chevron flex-shrink-0"></i>
            </button>
            <div class="faq-answer px-5 pb-0 h-0 overflow-hidden">
              <p class="text-sm text-txt-secondary leading-relaxed pb-5">Ne puteți contacta prin telefon, email sau vizitarea sediului. Toate detaliile se găsesc pe pagina <a data-link="/contact" class="text-accent font-semibold underline cursor-pointer">Contact</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Rapid -->
    <section class="py-20">
      <div class="w-full max-w-6xl mx-auto px-6">
        <div class="grid sm:grid-cols-3 gap-5 stagger-fade">
          <a href="mailto:info@tudordeliu.md" class="feature-card flex items-center gap-4 p-5 rounded-2xl border border-border hover:border-accent/20 transition-colors">
            <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"><i class="ph-fill ph-envelope text-accent text-lg"></i></div>
            <div><p class="text-xs text-txt-secondary">Email</p><p class="text-sm font-semibold">info@tudordeliu.md</p></div>
          </a>
          <a href="tel:+37322123456" class="feature-card flex items-center gap-4 p-5 rounded-2xl border border-border hover:border-accent/20 transition-colors">
            <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"><i class="ph-fill ph-phone text-accent text-lg"></i></div>
            <div><p class="text-xs text-txt-secondary">Telefon</p><p class="text-sm font-semibold">+373 22 123 456</p></div>
          </a>
          <a data-link="/contact" class="feature-card flex items-center gap-4 p-5 rounded-2xl border border-border hover:border-accent/20 transition-colors cursor-pointer">
            <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"><i class="ph-fill ph-chat-circle text-accent text-lg"></i></div>
            <div><p class="text-xs text-txt-secondary">Mesaj</p><p class="text-sm font-semibold">Scrie-ne direct</p></div>
          </a>
        </div>
      </div>
    </section>

  </main>
  ${renderFooter()}`
}

export function mount(): () => void {
  const cleanups: (() => void)[] = []
  mountNavbar()

  document.querySelectorAll<HTMLElement>('.stagger-fade').forEach((el) => staggerFade(el))
  document.querySelectorAll<HTMLElement>('.magnetic-btn').forEach((btn) => cleanups.push(magneticButton(btn)))
  revealCards('.feature-card')
  revealCards('.timeline-item', { y: 30, stagger: 0.1 })
  revealCards('.doc-item', { x: -20, y: 0, stagger: 0.06 })
  revealCards('.faq-item', { y: 16, stagger: 0.06 })

  // FAQ toggles
  document.querySelectorAll<HTMLElement>('.faq-toggle').forEach((btn) => {
    btn.addEventListener('click', () => toggleFaq(btn))
  })

  return () => cleanups.forEach((fn) => fn())
}
