import { Link, useRouteError } from 'react-router-dom'

export function CampaignNotFound() {
  const error = useRouteError() as Error

  console.log(error)

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Campanha não encontrada</h1>
      <p className="text-sm">
        Você tentou encontrar uma campanha, porém não conseguimos localiza-la 😓
      </p>
      <p className="text-xs">As informações da busca foram: {error.message}</p>
      <p>Verifique se as informações acima estão corretas, e tente novamente</p>
      <p className="text-accent-foreground">
        Voltar para o{' '}
        <Link to="/" className="text-sky-500 dark:text-sky-400">
          início
        </Link>
      </p>
    </div>
  )
}
