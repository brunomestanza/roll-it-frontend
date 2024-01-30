import { Campaign } from '@/api/campaigns/find-all-player-campaigns'

import { CreateCharacterForm } from './create-character-form'

interface PlayerDashboardProps {
  campaign: Campaign
}

export function PlayerDashboard({ campaign }: PlayerDashboardProps) {
  return (
    <div>
      <CreateCharacterForm campaignId={campaign.id} />
    </div>
  )
}
