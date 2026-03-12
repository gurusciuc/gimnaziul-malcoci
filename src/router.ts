export interface Route {
  path: string
  name: string
  render: () => string
  mount?: () => (() => void) | void
}

let routes: Route[] = []
let currentCleanup: (() => void) | null = null

export function registerRoutes(r: Route[]): void {
  routes = r
}

export function navigateTo(path: string): void {
  window.location.hash = '#' + path
}

export function getCurrentPath(): string {
  const hash = window.location.hash.slice(1)
  return hash || '/'
}

export function getRouteName(): string {
  const path = getCurrentPath()
  const route = routes.find((r) => r.path === path)
  return route?.name ?? ''
}

function renderRoute(): void {
  // Cleanup previous page
  if (currentCleanup) {
    currentCleanup()
    currentCleanup = null
  }

  const path = getCurrentPath()
  const route = routes.find((r) => r.path === path)
  const app = document.getElementById('app')
  if (!app) return

  if (route) {
    document.title = `Gimnaziul Tudor Deliu — ${route.name}`
    app.innerHTML = route.render()
    if (route.mount) {
      const cleanup = route.mount()
      if (typeof cleanup === 'function') {
        currentCleanup = cleanup
      }
    }
  } else {
    // 404 — redirect to home
    navigateTo('/')
  }

  // Scroll to top
  window.scrollTo({ top: 0 })
}

export function initRouter(): void {
  window.addEventListener('hashchange', renderRoute)
  renderRoute()
}

// Helper: intercept clicks on [data-link] elements
export function setupLinkInterception(): void {
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('[data-link]')
    if (target) {
      e.preventDefault()
      const href = target.getAttribute('data-link') || '/'
      navigateTo(href)
    }
  })
}
