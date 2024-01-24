import { api } from '@/lib/axios'

export interface FindCampaignBySlugParams {
  slug: string | undefined
}

interface Player {
  id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date | null
}

interface Campaign {
  id: string
  dungeonMasterId: string
  dungeonMasterDisplay: string
  name: string
  players: Player[]
  createdAt: Date
  updatedAt: Date
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
