import { http, HttpResponse } from 'msw'

import {
  CreateAnCampaignBody,
  CreateAnCampaignResponse,
} from '../create-an-campaign'

export const createAnCampaignMock = http.post<
  never,
  CreateAnCampaignBody,
  CreateAnCampaignResponse | null
>('/campaigns', async ({ request }) => {
  const { name } = await request.json()

  if (name === 'Test campaign') {
    return HttpResponse.json({ slug: 'john-doe-test-campaign' })
  }

  return HttpResponse.json(null, { status: 401 })
})
