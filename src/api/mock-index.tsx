import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { signInMock } from './auth/sign-in-mock'
import { createAnCampaignMock } from './campaigns/mocks/create-an-campaign-mock'
import { findAllPlayerCampaignsMock } from './campaigns/mocks/find-all-player-campaigns-mock'
import { findCampaignBySlugMock } from './campaigns/mocks/find-campaign-by-slug-mock'
import { createCharacterMock } from './characters/mocks/create-character-mock'
import { getCharacterMock } from './characters/mocks/get-character-mock'
import { addPlayerToCampaignMock } from './players/mocks/add-player-to-campaign'
import { createAccountMock } from './players/mocks/create-account-mock'
import { getProfileMock } from './players/mocks/get-profile-mock'

export const worker = setupWorker(
  signInMock,
  createAnCampaignMock,
  findAllPlayerCampaignsMock,
  getProfileMock,
  findCampaignBySlugMock,
  createCharacterMock,
  getCharacterMock,
  addPlayerToCampaignMock,
  createAccountMock,
)

const ignoredRequestsEndPath = ['.png', '.ico']

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start({
    onUnhandledRequest(req, print) {
      if (!ignoredRequestsEndPath.some((item) => req.url.endsWith(item))) {
        print.warning()
      }
    },
  })
}
