import { Link, useRouteError } from 'react-router-dom'

import errorImage from '@/assets/error.jpeg'

export function ErrorPage() {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold text-destructive">
        Droga, um erro maligno surgiu...
      </h1>
      <img src={errorImage} alt="" className="h-60 w-60" />
      <span className="text-xs text-muted-foreground">
        Sim, o monstro é analfabeto
      </span>
      <p className="text-accent-foreground">
        Um erro não mapeado aconteceu na aplicação, abaixo você encontra mais
        detalhes, que podem ser usados para o devido suporte:
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p className="text-accent-foreground">
        Voltar para o{' '}
        <Link to="/" className="text-sky-500 dark:text-sky-400">
          início
        </Link>
      </p>
    </div>
  )
}
