import { api } from '@/lib/axios'

export interface AddPlayerToCampaignParams {
  campaignId: string
  playerEmail: string
}

export async function addPlayerToCampaign({
  campaignId,
  playerEmail,
}: AddPlayerToCampaignParams) {
  await api.put(`/campaigns/${campaignId}/add-new-player/${playerEmail}`)
}
