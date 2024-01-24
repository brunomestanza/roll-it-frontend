import { Link } from 'react-router-dom'

import campaignNotFoundImage from '@/assets/campaign-not-found.png'

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 text-center">
      <h1 className="text-4xl font-bold">Página não encontrada</h1>
      <img src={campaignNotFoundImage} alt="" className="h-60 w-60" />
      <p className="text-accent-foreground">
        Voltar para o{' '}
        <Link to="/" className="text-sky-500 dark:text-sky-400">
          início
        </Link>
      </p>
    </div>
  )
}
