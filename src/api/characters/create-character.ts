import { api } from '@/lib/axios'

export interface CreateCharacterBody {
  name: string
  campaignId: string
  difficultToHit: number
  initiativeBonus: number
  lifePoints: number
}

export async function createCharacter({
  name,
  campaignId,
  difficultToHit,
  initiativeBonus,
  lifePoints,
}: CreateCharacterBody) {
  await api.post('/characters', {
    name,
    campaignId,
    difficultToHit,
    initiativeBonus,
    lifePoints,
  })
}
