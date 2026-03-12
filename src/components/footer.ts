export function renderFooter(): string {
  return `
  <footer class="border-t border-border py-10 bg-white">
    <div class="w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <span class="text-xs text-txt-secondary">&copy; 2026 Gimnaziul Tudor Deliu. Toate drepturile rezervate.</span>
      <div class="flex gap-6">
        <a data-link="/resurse" class="text-xs text-txt-secondary hover:text-charcoal transition-colors cursor-pointer">Resurse</a>
        <a data-link="/galerie" class="text-xs text-txt-secondary hover:text-charcoal transition-colors cursor-pointer">Galerie</a>
        <a data-link="/contact" class="text-xs text-txt-secondary hover:text-charcoal transition-colors cursor-pointer">Contact</a>
      </div>
    </div>
  </footer>`
}
