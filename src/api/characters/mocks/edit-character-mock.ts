import { http, HttpResponse } from 'msw'

import { EditCharacterParams, EditCharacterResponse } from '../edit-character'

interface Params {
  characterId: string
}

type Body = EditCharacterParams

type Response = EditCharacterResponse | null

export const editCharacterMock = http.put<Params, Body, Response>(
  '/characters/:characterId',
  async ({ request }) => {
    const { name } = await request.json()
    if (name === 'Oromis, the Wizard') {
      return HttpResponse.json({
        character: {
          id: 'character-1-id',
          name: 'Character name',
          actualLifePoints: 10,
          maxLifePoints: 10,
          difficultToHit: 12,
          initiativeBonus: 2,
          playerId: 'random-player-id',
          campaignId: 'random-campaign-id',
          createdAt: new Date().toISOString(),
          updatedAt: null,
        },
      })
    }

    return HttpResponse.json(null, { status: 404 })
  },
)
