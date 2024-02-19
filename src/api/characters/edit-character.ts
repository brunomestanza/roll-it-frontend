import { api } from '@/lib/axios'

export interface EditCharacterParams {
  characterId: string
  campaignId: string
  name: string
  actualLifePoints: number
  maxLifePoints: number
  difficultToHit: number
  initiativeBonus: number
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

export interface EditCharacterResponse {
  character: Character
}

export async function editCharacter({
  characterId,
  name,
  actualLifePoints,
  maxLifePoints,
  difficultToHit,
  initiativeBonus,
}: EditCharacterParams) {
  await api.put<EditCharacterResponse>(`/characters/${characterId}`, {
    name,
    actualLifePoints,
    maxLifePoints,
    difficultToHit,
    initiativeBonus,
  })
}
