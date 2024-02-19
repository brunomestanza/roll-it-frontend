import { http, HttpResponse } from 'msw'

import { GetCharacterResponse } from '../get-character'

interface Params {
  campaignId: string
}

type Response = GetCharacterResponse | null

export const getCharacterMock = http.get<Params, never, Response>(
  '/characters/:campaignId',
  async ({ params }) => {
    if (params.campaignId === 'campaign-2-id') {
      return HttpResponse.json({
        character: {
          id: 'character-1',
          playerId: 'john-doe-id',
          campaignId: 'campaign-2-id',
          difficultToHit: 12,
          initiativeBonus: 1,
          actualLifePoints: 8,
          maxLifePoints: 8,
          name: 'Oromis, the Wizard',
          createdAt: new Date().toISOString(),
          updatedAt: null,
        },
      })
    }

    return HttpResponse.json(null, { status: 404 })
  },
)
