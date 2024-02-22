import { http, HttpResponse } from 'msw'

import { FindAllCampaignNPCsResponse } from '../find-all-campaign-npcs'

type Response = FindAllCampaignNPCsResponse

export const findAllCampaignNpcsMock = http.get<never, never, Response>(
  '/campaigns/:campaignId/npcs',
  async () => {
    return HttpResponse.json({
      npcs: [
        {
          id: 'npc-1',
          maxLifePoints: 10,
          actualLifePoints: 10,
          difficultToHit: 10,
          initiativeBonus: 3,
          name: 'NPC 1',
          createdAt: String(new Date()),
          updatedAt: null,
        },
        {
          id: 'npc-2',
          maxLifePoints: 20,
          actualLifePoints: 20,
          difficultToHit: 10,
          initiativeBonus: 3,
          name: 'NPC 2',
          createdAt: String(new Date()),
          updatedAt: null,
        },
      ],
    })
  },
)
