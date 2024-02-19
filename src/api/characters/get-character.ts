import { api } from '@/lib/axios'

export interface GetCharacterParams {
  campaignId: string | undefined
}

interface Character {
  id: string
  name: string
  playerId: string
  campaignId: string
  actualLifePoints: number
  maxLifePoints: number
  difficultToHit: number
  initiativeBonus: number
  createdAt: string
  updatedAt?: string | null
}

export interface GetCharacterResponse {
  character: Character
}

export async function getCharacter({ campaignId }: GetCharacterParams) {
  if (campaignId) {
    const response = await api.get<GetCharacterResponse>(
      `/characters/${campaignId}`,
    )

    return response.data.character
  } else {
    return null
  }
}
