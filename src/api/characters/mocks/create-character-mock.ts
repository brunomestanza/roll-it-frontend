import { http, HttpResponse } from 'msw'

import { CreateCharacterBody } from '../create-character'

export const createCharacterMock = http.post<never, CreateCharacterBody, never>(
  '/characters',
  async ({ request }) => {
    const { name } = await request.json()

    if (name === 'Oromis, the wizard') {
      return HttpResponse.json(null, { status: 201 })
    }

    return HttpResponse.json(null, { status: 400 })
  },
)
