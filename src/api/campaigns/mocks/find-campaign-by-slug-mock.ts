import { http, HttpResponse } from 'msw'

import { FindCampaignBySlugResponse } from '../find-campaign-by.slug'

interface Params {
  slug: string
}

type Response = FindCampaignBySlugResponse | null

export const findCampaignBySlugMock = http.get<Params, never, Response>(
  '/campaigns/:slug',
  async ({ params }) => {
    if (params.slug === 'john-doe-campaign-1-name') {
      return HttpResponse.json({
        campaign: {
          id: 'campaign-1-id',
          description: 'Campaign 1 description',
          dungeonMasterId: 'john-doe-id',
          name: 'Campaign 1 name',
          slug: 'john-doe-campaign-1-name',
          tags: [],
          updatedAt: null,
          players: [
            {
              id: 'player-jones-id',
              name: 'Player Jones',
              email: 'player.jones@test.com',
              createdAt: new Date().toISOString(),
              updatedAt: null,
            },
          ],
          createdAt: new Date().toISOString(),
          dungeonMaster: {
            id: 'john-doe-id',
            name: 'John Doe',
            email: 'john.doe@test.com',
            createdAt: new Date().toISOString(),
            updatedAt: null,
          },
        },
      })
    }

    if (params.slug === 'player-jones-campaign-2-name') {
      return HttpResponse.json({
        campaign: {
          id: 'campaign-2-id',
          description: 'Campaign 2 description',
          dungeonMasterId: 'player-jones-id',
          name: 'Campaign 2 name',
          slug: 'player-jones-campaign-2-name',
          tags: [],
          updatedAt: null,
          players: [
            {
              id: 'john-doe-id',
              name: 'John Doe',
              email: 'john.doe@test.com',
              createdAt: new Date().toISOString(),
              updatedAt: null,
            },
          ],
          createdAt: new Date().toISOString(),
          dungeonMaster: {
            id: 'player-jones-id',
            name: 'Player Jones',
            email: 'player.jones@test.com',
            createdAt: new Date().toISOString(),
            updatedAt: null,
          },
        },
      })
    }

    return HttpResponse.json(null, { status: 404 })
  },
)
