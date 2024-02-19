import { expect, test } from '@playwright/test'

test('should be able to load an player character', async ({ page }) => {
  await page.goto('/campaign/player-jones-campaign-2-name', {
    waitUntil: 'networkidle',
  })

  await expect(
    page.getByText('Oromis, the Wizard', { exact: true }),
  ).toHaveCount(1)
})

test('should be able to edit an character', async ({ page }) => {
  await page.goto('/campaign/player-jones-campaign-2-name', {
    waitUntil: 'networkidle',
  })

  await page.getByRole('button', { name: 'Editar' }).click()

  await expect(
    page.getByRole('heading', { name: 'Edição de personagem' }),
  ).toHaveCount(1)

  await page
    .getByPlaceholder('Insira o valor dos pontos de vida máximos')
    .fill('12')

  await page.getByRole('button', { name: 'Confirmar alterações' }).click()

  await expect(
    page.getByText('Personagem editado com sucesso.', { exact: true }),
  ).toHaveCount(1)

  await page.getByRole('button', { name: 'Cancelar alterações' }).click()

  await expect(page.getByText('8/12', { exact: true })).toHaveCount(1)
})

test('should show error message when editing an character', async ({
  page,
}) => {
  await page.goto('/campaign/player-jones-campaign-2-name', {
    waitUntil: 'networkidle',
  })

  await page.getByRole('button', { name: 'Editar' }).click()

  await page
    .getByPlaceholder('Insira o nome do personagem')
    .fill('Invalid name')

  await page.getByRole('button', { name: 'Confirmar alterações' }).click()

  await expect(
    page.getByText('Erro ao editar personagem.', { exact: true }),
  ).toHaveCount(1)

  await page.getByRole('button', { name: 'Cancelar alterações' }).click()

  await expect(
    page.getByRole('heading', { name: 'Oromis, the Wizard' }),
  ).toHaveCount(1)
})
