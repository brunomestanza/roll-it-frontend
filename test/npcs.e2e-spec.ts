import { expect, test } from '@playwright/test'

test('should be able to load the npcs screen', async ({ page }) => {
  await page.goto('/npcs/campaign-1-id', {
    waitUntil: 'networkidle',
  })

  await expect(
    page.getByText('Adicionar novo NPC', { exact: true }),
  ).toHaveCount(1)
})

test('should be able to add an npc', async ({ page }) => {
  await page.goto('/npcs/campaign-1-id', {
    waitUntil: 'networkidle',
  })

  await page.getByPlaceholder('Insira o nome do NPC').fill('Testing NPC')

  await page.getByRole('button', { name: 'Criar novo NPC' }).click()

  await expect(
    page.getByText('NPC criado com sucesso.', { exact: true }),
  ).toHaveCount(1)
})

test('should show error message when creating an npc', async ({ page }) => {
  await page.goto('/npcs/campaign-1-id', {
    waitUntil: 'networkidle',
  })

  await page.getByPlaceholder('Insira o nome do NPC').fill('Error NPC')

  await page.getByRole('button', { name: 'Criar novo NPC' }).click()

  await expect(
    page.getByText('Erro ao criar NPC.', { exact: true }),
  ).toHaveCount(1)
})

test('should load npcs', async ({ page }) => {
  await page.goto('/npcs/campaign-1-id', {
    waitUntil: 'networkidle',
  })

  await expect(page.getByRole('heading', { name: 'NPC 1' })).toHaveCount(1)
  await expect(page.getByRole('heading', { name: 'NPC 2' })).toHaveCount(1)
})
