import { Dices } from 'lucide-react'
import { Outlet } from 'react-router-dom'

import logoImg from '@/assets/logo.png'

export function AuthLayout() {
  return (
    <div className="flex flex-col md:grid min-h-screen md:grid-cols-2 antialiased">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Dices className="h-5 w-5" />
          <span className="font-semibold">Roll it!</span>
        </div>
        <img src={logoImg} alt="" />
        <footer className="text-sm hidden md:block">
          Painel de cadastro &copy; Roll it! - {new Date().getFullYear()}
        </footer>
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
