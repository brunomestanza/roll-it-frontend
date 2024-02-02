import { useQuery } from '@tanstack/react-query'

import { Campaign } from '@/api/campaigns/find-all-player-campaigns'
import { getCharacter } from '@/api/characters/get-character'
import { Spinner } from '@/components/spinner'

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
        <p>Alguma coisa</p>
      ) : (
        <CreateCharacterForm campaignId={campaign.id} />
      )}
    </div>
  )
}
