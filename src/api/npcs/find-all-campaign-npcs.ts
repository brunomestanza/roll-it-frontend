import { api } from '@/lib/axios'

export interface FindAllCampaignNPCsParams {
  campaignId: string | undefined
}

export interface NPC {
  id: string
  name: string
  actualLifePoints: number
  maxLifePoints: number
  difficultToHit: number
  initiativeBonus: number
  createdAt: string
  updatedAt?: string | null
}

export interface FindAllCampaignNPCsResponse {
  npcs: NPC[]
}

export async function findAllCampaignNPCs({
  campaignId,
}: FindAllCampaignNPCsParams) {
  if (campaignId) {
    const response = await api.get<FindAllCampaignNPCsResponse>(
      `/campaigns/${campaignId}/npcs`,
    )

    return response.data.npcs
  } else {
    return null
  }
}
