import { renderNavbar, mountNavbar } from '../components/navbar'
import { renderFooter } from '../components/footer'
import { staggerFade, magneticButton } from '../utils/animations'
import gsap from 'gsap'

export function render(): string {
  return `
  ${renderNavbar()}
  <main class="pt-14">

    <!-- Hero -->
    <section class="py-20 lg:py-28 bg-cream border-b border-border">
      <div class="w-full max-w-7xl mx-auto px-6">
        <div class="max-w-2xl mx-auto text-center stagger-fade">
          <span class="text-xs font-semibold tracking-widest uppercase text-accent mb-3 block">Contact</span>
          <h1 class="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-5">
            Suntem <span class="text-accent italic">aici</span> pentru tine
          </h1>
          <p class="text-base text-txt-secondary leading-relaxed max-w-lg mx-auto">Ai întrebări? Vrei să ne vizitezi? Scrie-ne sau sună-ne oricând.</p>
        </div>
      </div>
    </section>

    <!-- Contact Info + Form -->
    <section class="py-24 lg:py-32">
      <div class="w-full max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-16">

          <!-- Left: contact info -->
          <div>
            <div class="stagger-fade mb-10">
              <h2 class="text-2xl font-extrabold tracking-tight mb-2">Informații de contact</h2>
              <p class="text-sm text-txt-secondary">Ne poți găsi prin oricare din metodele de mai jos.</p>
            </div>
            <div class="flex flex-col gap-4 contact-info">
              <div class="flex items-start gap-4 p-5 rounded-2xl border border-border">
                <div class="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0"><i class="ph-fill ph-map-pin text-accent text-lg"></i></div>
                <div><p class="text-sm font-bold mb-0.5">Adresa</p><p class="text-xs text-txt-secondary leading-relaxed">str. Tudor Deliu 24, Chișinău, MD-2001, Republica Moldova</p></div>
              </div>
              <div class="flex items-start gap-4 p-5 rounded-2xl border border-border">
                <div class="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0"><i class="ph-fill ph-phone text-accent text-lg"></i></div>
                <div><p class="text-sm font-bold mb-0.5">Telefon</p><p class="text-xs text-txt-secondary">+373 22 123 456</p></div>
              </div>
              <div class="flex items-start gap-4 p-5 rounded-2xl border border-border">
                <div class="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0"><i class="ph-fill ph-envelope text-accent text-lg"></i></div>
                <div><p class="text-sm font-bold mb-0.5">Email</p><p class="text-xs text-txt-secondary">info@tudordeliu.md</p></div>
              </div>
              <div class="flex items-start gap-4 p-5 rounded-2xl border border-border">
                <div class="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0"><i class="ph-fill ph-clock text-accent text-lg"></i></div>
                <div><p class="text-sm font-bold mb-0.5">Program</p><p class="text-xs text-txt-secondary">Luni – Vineri: 08:00 – 17:00</p></div>
              </div>
            </div>
          </div>

          <!-- Right: form -->
          <div>
            <div class="stagger-fade mb-10">
              <h2 class="text-2xl font-extrabold tracking-tight mb-2">Trimite un mesaj</h2>
              <p class="text-sm text-txt-secondary">Completează formularul, iar noi te contactăm în cel mai scurt timp.</p>
            </div>
            <form class="flex flex-col gap-4 contact-form" id="contactForm">
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="text-xs font-semibold text-charcoal mb-1.5 block">Nume complet</label>
                  <input type="text" placeholder="Ion Popescu" class="w-full px-4 py-3 text-sm rounded-xl border border-border bg-white placeholder-txt-secondary/50">
                </div>
                <div>
                  <label class="text-xs font-semibold text-charcoal mb-1.5 block">Email</label>
                  <input type="email" placeholder="ion@mail.md" class="w-full px-4 py-3 text-sm rounded-xl border border-border bg-white placeholder-txt-secondary/50">
                </div>
              </div>
              <div>
                <label class="text-xs font-semibold text-charcoal mb-1.5 block">Subiect</label>
                <input type="text" placeholder="Înscriere / Întrebare generală" class="w-full px-4 py-3 text-sm rounded-xl border border-border bg-white placeholder-txt-secondary/50">
              </div>
              <div>
                <label class="text-xs font-semibold text-charcoal mb-1.5 block">Mesaj</label>
                <textarea rows="5" placeholder="Scrie mesajul tău aici..." class="w-full px-4 py-3 text-sm rounded-xl border border-border bg-white placeholder-txt-secondary/50 resize-none"></textarea>
              </div>
              <button type="submit" class="magnetic-btn inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-hover transition-colors self-start">
                Trimite mesajul <i class="ph ph-paper-plane-tilt text-base"></i>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>

    <!-- Map -->
    <section class="pb-24">
      <div class="w-full max-w-7xl mx-auto px-6">
        <div class="rounded-2xl overflow-hidden border border-border map-container" style="height: 400px;">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2719.8!2d28.8358!3d47.0245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDAxJzI4LjIiTiAyOMKwNTAnMDkuMCJF!5e0!3m2!1sen!2smd!4v1" width="100%" height="100%" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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

  // Contact info animation
  gsap.utils.toArray<HTMLElement>('.contact-info > div').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 0.5, delay: i * 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 90%', once: true } }
    )
  })

  // Contact form
  gsap.fromTo('.contact-form',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-form', start: 'top 85%', once: true } }
  )

  // Map
  gsap.fromTo('.map-container',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.map-container', start: 'top 90%', once: true } }
  )

  // Form submit
  const form = document.getElementById('contactForm')
  if (form) {
    form.addEventListener('submit', (e) => e.preventDefault())
  }

  return () => cleanups.forEach((fn) => fn())
}
