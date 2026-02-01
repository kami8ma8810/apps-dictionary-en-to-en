import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('History page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/history')
    await page.waitForLoadState('networkidle')
  })

  test('should display empty history state', async ({ page }) => {
    await expect(page.getByText('No search history')).toBeVisible({ timeout: 15000 })
  })

  test('should pass WCAG 2.2 AA accessibility checks', async ({ page }) => {
    await expect(page.getByText('No search history')).toBeVisible({ timeout: 15000 })

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze()

    expect(results.violations).toEqual([])
  })
})
