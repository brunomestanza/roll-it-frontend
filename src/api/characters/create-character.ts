import { api } from '@/lib/axios'

export interface CreateAnCampaignBody {
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
}: CreateAnCampaignBody) {
  console.log(name, campaignId, difficultToHit, initiativeBonus, lifePoints)
  await api.post('/characters', {
    name,
    campaignId,
    difficultToHit,
    initiativeBonus,
    lifePoints,
  })
}
