import { ArrowBigRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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
  title: string
  slug: string
  description: string
  lastSessionDate: string
  playersNames: string[]
  dungeonMaster: string
}

export function CampaignCard({
  title,
  slug,
  description,
  lastSessionDate,
  playersNames,
  dungeonMaster,
}: CampaignCardProps) {
  const navigate = useNavigate()

  function accessCampaign() {
    navigate(`/campaign/${slug}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-3 md:line-clamp-5">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 md:grid md:grid-cols-3">
        <div>
          <p className="font-bold text-slate-500">Mestre</p>
          <p className="font-semibold text-primary">{dungeonMaster}</p>
        </div>
        <div>
          <p className="font-bold text-slate-500">Jogadores (5)</p>
          <div className="flex flex-col gap-2">
            {playersNames.map((player) => (
              <p key={player}>{player}</p>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-slate-500">Categorias</p>
          <Badge className="w-fit">Dungeon and Dragons 5e</Badge>
          <Badge className="w-fit">Violencia explicita</Badge>
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
