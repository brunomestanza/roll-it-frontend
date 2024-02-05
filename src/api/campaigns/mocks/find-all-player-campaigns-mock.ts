import { http, HttpResponse } from 'msw'

import { FindAllPlayerCampaignsResponse } from '../find-all-player-campaigns'

type Response = FindAllPlayerCampaignsResponse

export const findAllPlayerCampaignsMock = http.get<never, never, Response>(
  '/my-campaigns',
  async () => {
    return HttpResponse.json({
      campaigns: [
        {
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
        {
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
      ],
    })
  },
)
