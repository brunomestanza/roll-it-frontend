import { api } from '@/lib/axios'

export interface CreateAnCampaignBody {
  name: string
  description?: string
  tags?: string[]
}

export interface CreateAnCampaignResponse {
  slug: string
}

export async function createAnCampaign({
  name,
  description,
  tags,
}: CreateAnCampaignBody) {
  const response = await api.post<CreateAnCampaignResponse>('/campaigns', {
    name,
    description,
    tags,
  })

  return response.data
}
