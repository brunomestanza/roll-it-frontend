import { api } from '@/lib/axios'

export interface CreateAnCampaignBody {
  name: string
  dungeonMasterDisplayName: string
}

interface CreateAnCampaignResponse {
  slug: string
}

export async function createAnCampaign({
  name,
  dungeonMasterDisplayName,
}: CreateAnCampaignBody) {
  const response = await api.post<CreateAnCampaignResponse>('/campaigns', {
    name,
    dungeonMasterDisplayName,
  })

  return response.data
}
