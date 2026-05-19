import { useState, useEffect } from 'react'
import Login from './Login'
import Visiteur from './Visiteur'
import Famille from './Famille'
import Admin from './Admin'

import loginCSS   from './Login.css?inline'
import visiteurCSS from './Visiteur.css?inline'
import familleCSS  from './Famille.css?inline'
import adminCSS    from './Admin.css?inline'

const CSS_MAP = {
  login:   loginCSS,
  visitor: visiteurCSS,
  family:  familleCSS,
  admin:   adminCSS,
}

function usePageCSS(page) {
  useEffect(() => {
    // Retire tout style de page précédent
    document.querySelectorAll('[data-page-css]').forEach(el => el.remove())

    const css = CSS_MAP[page]
    if (!css) return

    const style = document.createElement('style')
    style.textContent = css
    style.setAttribute('data-page-css', page)
    document.head.appendChild(style)

    return () => {
      document.querySelectorAll('[data-page-css]').forEach(el => el.remove())
    }
  }, [page])
}

export default function App() {
  const [user, setUser] = useState(null)
  const page = !user ? 'login' : user.role

  usePageCSS(page)

  if (!user)                  return <Login    onLogin={setUser} />
  if (user.role === 'visitor') return <Visiteur />
  if (user.role === 'family')  return <Famille />
  if (user.role === 'admin')   return <Admin />

  return <Login onLogin={setUser} />
}
