import { Helmet } from 'react-helmet-async'

import { CampaignCard } from './campaign-card'

export function Home() {
  return (
    <>
      <Helmet title="Home" />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Campanhas</h1>
        <CampaignCard
          title="Luz de Xaryxis"
          description="Depois da devastação de um planeta, os jogadores devem se aventurar pelo espaço em busca de novas aventuras, e daqueles que os fizeram sair de seu lar."
          lastSessionDate="Há 2 semanas"
          playersNames={['Gabriel Nogueira', 'Clara Guimarães']}
          dungeonMaster="Bruno Mestanza"
        />
      </div>
    </>
  )
}
