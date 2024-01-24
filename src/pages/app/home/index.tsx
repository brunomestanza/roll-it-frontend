import { BookmarkPlus } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import { CampaignCard } from './campaign-card'

export function Home() {
  const navigate = useNavigate()

  function createNewCampaign() {
    navigate('/new-campaign')
  }

  return (
    <>
      <Helmet title="Home" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <h1 className="text-2xl font-bold tracking-tight">Campanhas</h1>
          <Button className="w-fit gap-3" onClick={createNewCampaign}>
            <BookmarkPlus />
            Criar nova campanha
          </Button>
        </div>
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
