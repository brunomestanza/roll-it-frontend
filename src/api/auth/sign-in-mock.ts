import { http, HttpResponse } from 'msw'

import { SignInBody, SignInResponse } from './sign-in'

export const signInMock = http.post<never, SignInBody, SignInResponse | null>(
  '/sessions',
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
