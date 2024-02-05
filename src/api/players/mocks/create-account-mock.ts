import { http, HttpResponse } from 'msw'

import { CreateAccountBody, CreateAccountResponse } from '../create-account'

type Body = CreateAccountBody
type Response = CreateAccountResponse | null

export const createAccountMock = http.post<never, Body, Response>(
  '/players',
  async ({ request }) => {
    const { email } = await request.json()

    if (email === 'john.doe@test.com') {
      return HttpResponse.json(
        { accessToken: 'fake-access-token' },
        { status: 200 },
      )
    }

    return HttpResponse.json(null, { status: 401 })
  },
)
