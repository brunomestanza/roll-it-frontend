import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../get-profile'

type Response = GetProfileResponse | null

export const getProfileMock = http.get<never, never, Response>(
  '/me',
  async () => {
    return HttpResponse.json(
      {
        player: {
          id: 'john-doe-id',
          name: 'John Doe',
          email: 'john.doe@test.com',
          createdAt: new Date().toISOString(),
          updatedAt: null,
        },
      },
      { status: 200 },
    )
  },
)
