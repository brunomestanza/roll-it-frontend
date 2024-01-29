import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowBigRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Campaign } from '@/api/campaigns/find-all-player-campaigns'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface CampaignCardProps {
  campaign: Campaign
  userId: string
}

export function CampaignCard({ campaign, userId }: CampaignCardProps) {
  const navigate = useNavigate()
  const {
    slug,
    name,
    description,
    dungeonMaster,
    players,
    tags,
    dungeonMasterId,
  } = campaign
  const lastSessionDate = formatDistanceToNow(
    campaign.updatedAt || campaign.createdAt,
    {
      locale: ptBR,
      addSuffix: true,
    },
  )

  function accessCampaign() {
    navigate(`/campaign/${slug}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="line-clamp-3 md:line-clamp-5">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 md:grid md:grid-cols-3">
        <div>
          <p className="font-bold text-slate-500">Mestre</p>
          <p className="font-semibold text-primary">
            {dungeonMaster.name}
            {dungeonMasterId === userId && ' (Você)'}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-slate-500">
            Jogadores ({players.length})
          </p>
          <div className="flex flex-col gap-2">
            {players.map((player) => (
              <p key={player.id}>
                {player.name}
                {player.id === userId && ' (Você)'}
              </p>
            ))}
            {players.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Nenhum jogador cadastrado, acesse a campanha para cadastra-los!
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-slate-500">Categorias</p>
          {tags.map((tag) => (
            <Badge key={tag} className="w-fit">
              {tag}
            </Badge>
          ))}
          {tags.length === 0 && (
            <p className="text-xs text-muted-foreground">
              Essa campanha não possui categorias.
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 md:flex-row md:justify-between">
        <p>Última sessão: {lastSessionDate}</p>
        <Button onClick={accessCampaign}>
          Acessar campanha <ArrowBigRight />
        </Button>
      </CardFooter>
    </Card>
  )
}
