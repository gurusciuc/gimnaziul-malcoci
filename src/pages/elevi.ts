import { renderNavbar, mountNavbar } from '../components/navbar'
import { renderFooter } from '../components/footer'
import { staggerFade, magneticButton, revealCards } from '../utils/animations'

export function render(): string {
  return `
  ${renderNavbar()}
  <main class="pt-14">

    <!-- Hero -->
    <section class="py-20 lg:py-28 bg-cream border-b border-border">
      <div class="w-full max-w-7xl mx-auto px-6">
        <div class="max-w-2xl mx-auto text-center stagger-fade">
          <span class="text-xs font-semibold tracking-widest uppercase text-accent mb-3 block">Activități</span>
          <h1 class="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-5">
            Viața <span class="text-accent italic">elevilor</span> noștri
          </h1>
          <p class="text-base text-txt-secondary leading-relaxed max-w-lg mx-auto">Fiecare elev descoperă pasiuni noi prin activități variate care dezvoltă creativitatea, gândirea critică și spiritul de echipă.</p>
        </div>
      </div>
    </section>

    <!-- Activities Grid -->
    <section class="py-24 lg:py-32">
      <div class="w-full max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          <div class="activity-card p-7 rounded-2xl border border-border group">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5"><i class="ph-fill ph-book-open text-accent text-xl"></i></div>
            <h3 class="text-base font-bold mb-2">Cercul de Lectură</h3>
            <p class="text-sm text-txt-secondary leading-relaxed mb-4">Descoperim lumea prin povești, analizăm texte literare și scriem creativ în fiecare săptămână.</p>
            <a data-link="/resurse" class="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:gap-2.5 transition-all cursor-pointer">Detalii <i class="ph ph-arrow-right text-sm"></i></a>
          </div>

          <div class="activity-card p-7 rounded-2xl border border-border group">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5"><i class="ph-fill ph-atom text-accent text-xl"></i></div>
            <h3 class="text-base font-bold mb-2">Laborator STEM</h3>
            <p class="text-sm text-txt-secondary leading-relaxed mb-4">Experimente practice în fizică, chimie și biologie cu echipamente moderne de laborator.</p>
            <a data-link="/resurse" class="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:gap-2.5 transition-all cursor-pointer">Detalii <i class="ph ph-arrow-right text-sm"></i></a>
          </div>

          <div class="activity-card p-7 rounded-2xl border border-border group">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5"><i class="ph-fill ph-masks-theater text-accent text-xl"></i></div>
            <h3 class="text-base font-bold mb-2">Atelierul de Teatru</h3>
            <p class="text-sm text-txt-secondary leading-relaxed mb-4">Dezvoltarea expresivității și a încrederii prin artă dramatică și spectacole de final de an.</p>
            <a data-link="/resurse" class="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:gap-2.5 transition-all cursor-pointer">Detalii <i class="ph ph-arrow-right text-sm"></i></a>
          </div>

          <div class="activity-card p-7 rounded-2xl border border-border group">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5"><i class="ph-fill ph-code text-accent text-xl"></i></div>
            <h3 class="text-base font-bold mb-2">Clubul de Informatică</h3>
            <p class="text-sm text-txt-secondary leading-relaxed mb-4">Introducem elevi în lumea programării și a gândirii algoritmice prin proiecte interactive.</p>
            <a data-link="/resurse" class="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:gap-2.5 transition-all cursor-pointer">Detalii <i class="ph ph-arrow-right text-sm"></i></a>
          </div>

          <div class="activity-card p-7 rounded-2xl border border-border group">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5"><i class="ph-fill ph-hand-heart text-accent text-xl"></i></div>
            <h3 class="text-base font-bold mb-2">Voluntariat</h3>
            <p class="text-sm text-txt-secondary leading-relaxed mb-4">Proiecte comunitare care formează caracter, empatie și responsabilitate socială.</p>
            <a data-link="/contact" class="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:gap-2.5 transition-all cursor-pointer">Detalii <i class="ph ph-arrow-right text-sm"></i></a>
          </div>

          <div class="activity-card p-7 rounded-2xl border border-border group">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5"><i class="ph-fill ph-basketball text-accent text-xl"></i></div>
            <h3 class="text-base font-bold mb-2">Activități sportive</h3>
            <p class="text-sm text-txt-secondary leading-relaxed mb-4">Fotbal, baschet, atletism și gimnastică pentru dezvoltarea fizică a fiecărui elev.</p>
            <a data-link="/contact" class="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:gap-2.5 transition-all cursor-pointer">Detalii <i class="ph ph-arrow-right text-sm"></i></a>
          </div>

          <div class="activity-card p-7 rounded-2xl border border-border group">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5"><i class="ph-fill ph-paint-brush text-accent text-xl"></i></div>
            <h3 class="text-base font-bold mb-2">Atelierul de Artă</h3>
            <p class="text-sm text-txt-secondary leading-relaxed mb-4">Pictură, grafică și compoziții artistice care dezvoltă creativitatea și estetica.</p>
            <a data-link="/galerie" class="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:gap-2.5 transition-all cursor-pointer">Detalii <i class="ph ph-arrow-right text-sm"></i></a>
          </div>

          <div class="activity-card p-7 rounded-2xl border border-border group">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5"><i class="ph-fill ph-music-notes text-accent text-xl"></i></div>
            <h3 class="text-base font-bold mb-2">Corul Școlii</h3>
            <p class="text-sm text-txt-secondary leading-relaxed mb-4">Armonizăm voci și cultivăm simțul muzical prin repertoriu divers și concerte.</p>
            <a data-link="/galerie" class="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:gap-2.5 transition-all cursor-pointer">Detalii <i class="ph ph-arrow-right text-sm"></i></a>
          </div>

          <div class="activity-card p-7 rounded-2xl border border-border group">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5"><i class="ph-fill ph-globe-hemisphere-west text-accent text-xl"></i></div>
            <h3 class="text-base font-bold mb-2">Limbi Străine</h3>
            <p class="text-sm text-txt-secondary leading-relaxed mb-4">Engleză, franceză și germană predate prin metode interactive și imersive.</p>
            <a data-link="/resurse" class="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:gap-2.5 transition-all cursor-pointer">Detalii <i class="ph ph-arrow-right text-sm"></i></a>
          </div>

        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-cream border-t border-border">
      <div class="w-full max-w-3xl mx-auto px-6 text-center stagger-fade">
        <h2 class="text-2xl font-extrabold tracking-tight mb-4">Vrei să te alături?</h2>
        <p class="text-sm text-txt-secondary mb-7 max-w-md mx-auto">Fiecare copil are un talent ascuns. Hai să-l descoperăm împreună.</p>
        <a data-link="/contact" class="magnetic-btn inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-hover transition-colors cursor-pointer">
          Contactează-ne <i class="ph ph-arrow-right text-base"></i>
        </a>
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
  revealCards('.activity-card')

  return () => cleanups.forEach((fn) => fn())
}
