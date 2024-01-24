import { Link, useRouteError } from 'react-router-dom'

import campaignNotFoundImage from '@/assets/campaign-not-found.png'

export function CampaignNotFound() {
  const error = useRouteError() as Error

  return (
    <div className="my-10 flex flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">Campanha não encontrada</h1>
      <img src={campaignNotFoundImage} alt="" className="h-60 w-60" />
      <div className="flex flex-col items-center gap-10">
        <p>
          Você tentou acessar uma campanha, porém não conseguimos localiza-la,
          as informações da busca foram:
        </p>
        <p className="text-sm font-bold text-destructive">{error.message}</p>
        <p>
          Verifique se as informações acima estão corretas assim como o endereço
          do link, e tente novamente. Caso prefira você também pode voltar para
          o
          <Link to="/" className="ml-2 text-primary">
            início
          </Link>
        </p>
      </div>
    </div>
  )
}
