import { expect, test } from '@playwright/test'

test('should be able to create an campaign', async ({ page }) => {
  await page.goto('/new-campaign', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome da campanha').fill('Test campaign')
  await page.getByLabel('Insira a descrição da sua campanha').fill('Testing')
  await page.getByPlaceholder('Sistema de jogo, tópicos').fill('Tag 1')
  await page.getByRole('button', { name: 'Adicionar' }).click()
  await page.getByPlaceholder('Sistema de jogo, tópicos').fill('Tag 2')
  await page.getByRole('button', { name: 'Adicionar' }).click()
  await page.getByPlaceholder('Sistema de jogo, tópicos').fill('Tag 3')
  await page.getByRole('button', { name: 'Adicionar' }).click()

  await page.getByRole('button', { name: 'Criar campanha' }).click()

  await page.waitForURL('/campaign/john-doe-test-campaign')

  await expect(
    page.getByText('Campanha criada com sucesso.', { exact: true }),
  ).toHaveCount(1)

  expect(page.url()).toContain('/campaign/john-doe-test-campaign')
})

test('should not be able to create campaign without name', async ({ page }) => {
  await page.goto('/new-campaign', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome da campanha').fill('Error campaign')

  await page.getByRole('button', { name: 'Criar campanha' }).click()

  await expect(
    page.getByText('Erro ao criar a campanha.', { exact: true }),
  ).toHaveCount(1)

  expect(page.url()).toContain('/new-campaign')
})
