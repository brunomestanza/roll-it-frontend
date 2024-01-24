import { api } from '@/lib/axios'

export interface CreateAnCampaignBody {
  name: string
  dungeonMasterDisplayName: string
}

interface CreateAnCampaignResponse {
  accessToken: string
}

export async function createAnCampaign({
  name,
  dungeonMasterDisplayName,
}: CreateAnCampaignBody) {
  await api.post<CreateAnCampaignResponse>('/campaigns', {
    name,
    dungeonMasterDisplayName,
  })
}
