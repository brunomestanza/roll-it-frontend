import { expect, test } from '@playwright/test'

test('should be able to load all player campaigns', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('John Doe (Você)', { exact: true })).toHaveCount(
    2,
  )
})

test('should be able to navigate to new campaign page', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Criar nova campanha' }).click()

  await page.waitForURL('/new-campaign')

  expect(page.url()).toContain('/new-campaign')
})

test('should be able to access the campaign as dungeon master', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Acessar campanha' }).first().click()

  await page.waitForURL('/campaign/john-doe-campaign-1-name')

  await expect(
    page.getByRole('heading', {
      name: 'Adicionar novo jogador',
    }),
  ).toHaveCount(1)
})

test('should be able to access the campaign as player', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Acessar campanha' }).nth(1).click()

  await page.waitForURL('/campaign/player-jones-campaign-2-name')

  await expect(
    page.getByText(
      'Abaixo você encontra todas as informações sobre o seu personagem.',
    ),
  ).toHaveCount(1)
})
