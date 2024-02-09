import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome de jogador').fill('John Doe')
  await page.getByLabel('Seu email').fill('john.doe@test.com')
  await page.getByLabel('Sua senha').fill('justfortests')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Jogador cadastrado com sucesso.')

  expect(toast).toBeVisible()
})

test('sign up with error', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome de jogador').fill('John Doe')
  await page.getByLabel('Seu email').fill('invalid.email@test.com')
  await page.getByLabel('Sua senha').fill('justfortests')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar jogador.')

  expect(toast).toBeVisible()
})

test('navigate to login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Já possui cadastro? Fazer' }).click()

  expect(page.url()).toContain('/sign-in')
})
