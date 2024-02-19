import { useQuery } from '@tanstack/react-query'
import { Heart, Shield } from 'lucide-react'

import { Campaign } from '@/api/campaigns/find-all-player-campaigns'
import { getCharacter } from '@/api/characters/get-character'
import { Spinner } from '@/components/spinner'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { CreateCharacterForm } from './create-character-form'
import { EditCharacterForm } from './edit-character-form'

interface PlayerDashboardProps {
  campaign: Campaign
}

export function PlayerDashboard({ campaign }: PlayerDashboardProps) {
  const campaignId = campaign.id
  const { data: character, isLoading: isLoadingCharacter } = useQuery({
    queryKey: ['character', campaignId],
    queryFn: () => getCharacter({ campaignId }),
    refetchOnWindowFocus: false,
  })

  if (isLoadingCharacter) {
    return (
      <div className="flex w-full justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      {character ? (
        <Card>
          <CardHeader>
            <CardTitle>{character.name}</CardTitle>
            <CardDescription>
              Abaixo você encontra todas as informações sobre o seu personagem.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col gap-4">
              <span className="text-sm">Dificuldade de acerto</span>
              <span className="flex items-center gap-4">
                <Shield />
                <p>{character.difficultToHit}</p>
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-sm">Vida máxima e atual</span>
              <span className="flex items-center gap-4">
                <Heart />
                <p>
                  {character.actualLifePoints}/{character.maxLifePoints}
                </p>
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <EditCharacterForm
              name={character.name}
              actualLifePoints={character.actualLifePoints}
              maxLifePoints={character.maxLifePoints}
              difficultToHit={character.difficultToHit}
              initiativeBonus={character.initiativeBonus}
              campaignId={campaign.id}
              characterId={character.id}
            />
          </CardFooter>
        </Card>
      ) : (
        <CreateCharacterForm campaignId={campaign.id} />
      )}
    </div>
  )
}
