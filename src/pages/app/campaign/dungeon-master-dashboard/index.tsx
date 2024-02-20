import { Users } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Campaign } from '@/api/campaigns/find-all-player-campaigns'
import { Button } from '@/components/ui/button'

import { AddPlayerToCampaignForm } from './add-player-to-campaign-form'

interface DungeonMasterDashboardProps {
  campaign: Campaign
}

export function DungeonMasterDashboard({
  campaign,
}: DungeonMasterDashboardProps) {
  return (
    <div className="space-y-4">
      <Button variant="default" asChild>
        <Link to={`/npcs/${campaign.id}`} className="flex gap-2">
          Acessar NPCs <Users className="h-4 w-4" />
        </Link>
      </Button>
      <AddPlayerToCampaignForm campaignId={campaign.id} />
    </div>
  )
}
