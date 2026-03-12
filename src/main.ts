import './assets/main.css'
import { registerRoutes, initRouter, setupLinkInterception } from './router'
import { initLenis } from './utils/animations'

/* ─── Page modules ─── */
import * as acasa from './pages/acasa'
import * as elevi from './pages/elevi'
import * as resurse from './pages/resurse'
import * as galerie from './pages/galerie'
import * as activitati from './pages/activitati'
import * as contact from './pages/contact'
import * as admin from './pages/admin'

/* ─── Register routes ─── */
registerRoutes([
  { path: '/', name: 'Acasă', render: acasa.render, mount: acasa.mount },
  { path: '/elevi', name: 'Elevi', render: elevi.render, mount: elevi.mount },
  { path: '/resurse', name: 'Resurse', render: resurse.render, mount: resurse.mount },
  { path: '/galerie', name: 'Galerie', render: galerie.render, mount: galerie.mount },
  { path: '/activitati', name: 'Activități', render: activitati.render, mount: activitati.mount },
  { path: '/contact', name: 'Contact', render: contact.render, mount: contact.mount },
  { path: '/td-panel-s3cur3', name: 'Admin', render: admin.render, mount: admin.mount },
])

/* ─── Init ─── */
setupLinkInterception()
initRouter()
initLenis()
