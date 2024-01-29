import { Campaign } from '@/api/campaigns/find-all-player-campaigns'

import { AddPlayerToCampaignForm } from './add-player-to-campaign-form'

interface DungeonMasterDashboardProps {
  campaign: Campaign
}

export function DungeonMasterDashboard({
  campaign,
}: DungeonMasterDashboardProps) {
  return (
    <div>
      <AddPlayerToCampaignForm campaignId={campaign.id} />
    </div>
  )
}
