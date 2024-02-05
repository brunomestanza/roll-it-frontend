import { http, HttpResponse } from 'msw'

import { AddPlayerToCampaignParams } from '../add-player-to-campaign'

type Params = AddPlayerToCampaignParams

export const addPlayerToCampaignMock = http.put<Params, never, never>(
  '/campaigns/:campaignId/add-new-player/:playerEmail',
  async ({ params }) => {
    if (params.playerEmail === 'john.doe@test.com') {
      return HttpResponse.json(null, { status: 201 })
    }

    return HttpResponse.json(null, { status: 400 })
  },
)
