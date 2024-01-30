import { api } from '@/lib/axios'

export interface CreateAnCampaignBody {
  name: string
  campaignId: string
  difficultToHit: number
  initiativeBonus: number
  lifePoints: number
}

// name: z.string().min(6, 'Nome deve ter no mínimo 6 caracteres.'),
//   campaignId: z.string().uuid(),
//   difficultToHit: z
//     .number()
//     .min(1, 'Dificuldade de acerto deve ser no mínimo 1'),
//   initiativeBonus: z.number(),
//   lifePoints: z.number(),

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
