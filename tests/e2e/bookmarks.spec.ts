import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Bookmarks page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/bookmarks')
    await page.waitForLoadState('networkidle')
  })

  test('should display bookmarks page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Bookmarks' })).toBeVisible()
  })

  test('should show empty state when no bookmarks', async ({ page }) => {
    await expect(page.getByText('No bookmarks yet')).toBeVisible()
  })

  test('should display "Create new folder" button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Create new folder' })).toBeVisible()
  })

  test('should pass WCAG 2.2 AA accessibility checks', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze()

    expect(results.violations).toEqual([])
  })
})
