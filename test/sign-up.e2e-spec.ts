import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome de jogador').fill('John Doe')
  await page.getByLabel('Seu email').fill('john.doe@test.com')
  await page.getByLabel('Sua senha').fill('justfortests')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  await expect(
    page.getByText('Jogador cadastrado com sucesso.', { exact: true }),
  ).toHaveCount(1)
})

test('sign up with error', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome de jogador').fill('John Doe')
  await page.getByLabel('Seu email').fill('invalid.email@test.com')
  await page.getByLabel('Sua senha').fill('justfortests')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  await expect(
    page.getByText('Erro ao cadastrar jogador.', { exact: true }),
  ).toHaveCount(1)
})

test('navigate to login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Já possui cadastro? Fazer' }).click()

  expect(page.url()).toContain('/sign-in')
})
