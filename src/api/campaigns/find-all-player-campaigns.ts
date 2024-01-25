import { api } from '@/lib/axios'

interface Player {
  id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date | null
}

export interface Campaign {
  id: string
  dungeonMasterId: string
  dungeonMasterName: string
  tags: string[]
  slug: string
  description: string | null
  name: string
  players: Player[]
  createdAt: Date
  updatedAt: Date
}

interface FindAllPlayerCampaignsResponse {
  campaigns: Campaign[]
}

export async function findAllPlayerCampaigns() {
  const response = await api.get<FindAllPlayerCampaignsResponse>('my-campaigns')

  return response.data.campaigns
}
