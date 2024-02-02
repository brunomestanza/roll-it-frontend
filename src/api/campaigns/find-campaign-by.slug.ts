import { api } from '@/lib/axios'

export interface FindCampaignBySlugParams {
  slug: string | undefined
}

interface Player {
  id: string
  email: string
  name: string
  createdAt: string
  updatedAt: string | null
}

interface Campaign {
  id: string
  description: string
  dungeonMasterId: string
  dungeonMaster: Player
  tags: string[]
  slug: string
  name: string
  players: Player[]
  createdAt: string
  updatedAt: string | null
}

interface FindCampaignBySlugResponse {
  campaign: Campaign
}

export async function findCampaignBySlug({ slug }: FindCampaignBySlugParams) {
  if (slug) {
    const response = await api.get<FindCampaignBySlugResponse>(
      `/campaigns/${slug}`,
    )

    return response.data.campaign
  } else {
    return null
  }
}
