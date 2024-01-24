import { Home } from 'lucide-react'

import { NavLink } from './nav-link'

export function Navigation() {
  return (
    <nav className="flex flex-col gap-4 md:flex-row md:items-center">
      <NavLink to="/">
        <Home className="h-4 w-4" />
        Início
      </NavLink>
    </nav>
  )
}
