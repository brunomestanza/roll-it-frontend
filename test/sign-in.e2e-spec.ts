import { expect, test } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu email').fill('john.doe@test.com')
  await page.getByLabel('Sua senha').fill('onlyfortests')
  await page.getByRole('button', { name: 'Entrar' }).click()

  await page.waitForURL('/')

  await page.getByText('Jogador autenticado com sucesso.').waitFor()
  const toast = page.getByText('Jogador autenticado com sucesso.')
  const url = page.url().endsWith('/')

  expect(toast).toBeVisible()
  expect(url).toBeTruthy()
})

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu email').fill('wrong@example.com')
  await page.getByLabel('Sua senha').fill('onlyfortests')
  await page.getByRole('button', { name: 'Entrar' }).click()

  const toast = page.getByText('Credenciais inválidas.')

  expect(toast).toBeVisible()
})

test('navigate to new account page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page
    .getByRole('link', { name: 'É novo conosco? Crie sua conta' })
    .click()

  expect(page.url()).toContain('/sign-up')
})
