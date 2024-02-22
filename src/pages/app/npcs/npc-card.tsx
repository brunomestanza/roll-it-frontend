import { Heart, Shield } from 'lucide-react'

import { NPC } from '@/api/npcs/find-all-campaign-npcs'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface CampaignCardProps {
  npc: NPC
}

export function NPCCard({ npc }: CampaignCardProps) {
  const { name, actualLifePoints, difficultToHit, maxLifePoints } = npc

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="line-clamp-3 md:line-clamp-5">
          Descrição do NPC
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 md:grid md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <span className="text-sm">Dificuldade de acerto</span>
          <span className="flex items-center gap-4">
            <Shield />
            <p>{difficultToHit}</p>
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-sm">Vida máxima e atual</span>
          <span className="flex items-center gap-4">
            <Heart />
            <p>
              {actualLifePoints}/{maxLifePoints}
            </p>
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 md:flex-row md:justify-between">
        Rodapé do personagem
      </CardFooter>
    </Card>
  )
}
