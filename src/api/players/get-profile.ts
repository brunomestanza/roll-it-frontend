import { api } from '@/lib/axios'

interface Player {
  id: string
  email: string
  name: string
  createdAt: string
  updatedAt: string | null
}

export interface GetProfileResponse {
  player: Player
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>('/me')

  return response.data.player
}
