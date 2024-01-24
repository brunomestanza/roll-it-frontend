import { api } from '@/lib/axios'

interface Campaign {
  id: string
  dungeonMasterId: string
  slug: string
  dungeonMasterDisplay: string
  name: string
  createdAt: string
  updatedAt: string | null
}

interface Player {
  id: string
  email: string
  name: string
  campaigns: Campaign[]
  createdAt: string
  updatedAt: string | null
}

interface GetProfileResponse {
  player: Player
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>('/me')

  return response.data.player
}
