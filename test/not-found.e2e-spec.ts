import { expect, test } from '@playwright/test'

test('should navigate to not found page', async ({ page }) => {
  await page.goto('/this-dont-exist', { waitUntil: 'networkidle' })

  await expect(
    page.getByRole('heading', {
      name: 'Página não encontrada',
    }),
  ).toHaveCount(1)
  await expect(
    page.getByText('Voltar para o início', { exact: true }),
  ).toHaveCount(1)
})
