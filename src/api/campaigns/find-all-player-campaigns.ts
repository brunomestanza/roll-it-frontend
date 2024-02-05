import { api } from '@/lib/axios'

interface Player {
  id: string
  email: string
  name: string
  createdAt: string
  updatedAt: string | null
}

export interface Campaign {
  id: string
  dungeonMasterId: string
  dungeonMaster: Player
  tags: string[]
  slug: string
  description: string | null
  name: string
  players: Player[]
  createdAt: string
  updatedAt: string | null
}

export interface FindAllPlayerCampaignsResponse {
  campaigns: Campaign[]
}

export async function findAllPlayerCampaigns() {
  const response = await api.get<FindAllPlayerCampaignsResponse>('my-campaigns')

  return response.data.campaigns
}
