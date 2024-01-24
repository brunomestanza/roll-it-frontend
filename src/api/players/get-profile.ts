import { api } from '@/lib/axios'

interface Campaign {
  id: string
  dungeonMasterId: string
  dungeonMasterDisplay: string
  name: string
  createdAt: string
  updatedAt: string | null
}

interface Player {
  id: string
  email: string
  name: string
  campaignsAsDugeonMaster: Campaign[]
  campaignsAsPlayer: Campaign[]
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
