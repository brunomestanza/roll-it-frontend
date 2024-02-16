import { useQuery } from '@tanstack/react-query'
import { Heart, Pencil, Shield } from 'lucide-react'

import { Campaign } from '@/api/campaigns/find-all-player-campaigns'
import { getCharacter } from '@/api/characters/get-character'
import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { CreateCharacterForm } from './create-character-form'

interface PlayerDashboardProps {
  campaign: Campaign
}

export function PlayerDashboard({ campaign }: PlayerDashboardProps) {
  const campaignId = campaign.id
  const { data: character, isLoading: isLoadingCharacter } = useQuery({
    queryKey: ['character', campaignId],
    queryFn: () => getCharacter({ campaignId }),
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
            <span className="flex items-center gap-4">
              <Shield />
              <p>14</p>
            </span>
            <span className="flex items-center gap-4">
              <Heart />
              <p>10/10</p>
            </span>
          </CardContent>
          <CardFooter>
            <Button variant="default" className="flex items-center gap-2">
              Editar <Pencil className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <CreateCharacterForm campaignId={campaign.id} />
      )}
    </div>
  )
}
