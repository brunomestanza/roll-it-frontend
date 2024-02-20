import { api } from '@/lib/axios'

export interface CreateNpcBody {
  name: string
  campaignId: string | undefined
  difficultToHit: number
  initiativeBonus: number
  lifePoints: number
}

export async function createNpc({
  name,
  campaignId,
  difficultToHit,
  initiativeBonus,
  lifePoints,
}: CreateNpcBody) {
  if (campaignId) {
    await api.post('/non-playable-characters', {
      name,
      campaignId,
      difficultToHit,
      initiativeBonus,
      lifePoints,
    })
  } else {
    return null
  }
}
