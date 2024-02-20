import { http, HttpResponse } from 'msw'

import { CreateNpcBody } from '../create-npc'

export const createNpcMock = http.post<never, CreateNpcBody, never>(
  '/non-playable-characters',
  async ({ request }) => {
    const { name } = await request.json()

    if (name === 'Testing NPC') {
      return HttpResponse.json(null, { status: 201 })
    }

    return HttpResponse.json(null, { status: 400 })
  },
)
