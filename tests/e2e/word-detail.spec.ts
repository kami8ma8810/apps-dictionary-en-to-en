import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Word detail page', () => {
  test('should display word definition', async ({ page }) => {
    await page.goto('/word/hello')
    await page.waitForLoadState('networkidle')
    // Wait for the API call to complete and render
    await expect(page.locator('h1')).toContainText('hello', { timeout: 30000 })
  })

  test('should display part of speech', async ({ page }) => {
    await page.goto('/word/hello')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('h1')).toContainText('hello', { timeout: 30000 })
    await expect(page.getByText(/exclamation|noun|verb|interjection/).first()).toBeVisible()
  })

  test('should have a bookmark toggle button', async ({ page }) => {
    await page.goto('/word/hello')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('h1')).toContainText('hello', { timeout: 30000 })

    const bookmarkButton = page.getByRole('button', { name: /bookmark/i }).first()
    await expect(bookmarkButton).toBeVisible()
  })

  test('should handle not-found words', async ({ page }) => {
    await page.goto('/word/xyznotarealword123')
    await page.waitForLoadState('networkidle')
    await expect(page.getByText('No definitions found')).toBeVisible({ timeout: 30000 })
  })

  test('should pass WCAG 2.2 AA accessibility checks', async ({ page }) => {
    await page.goto('/word/hello')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('h1')).toContainText('hello', { timeout: 30000 })

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze()

    expect(results.violations).toEqual([])
  })
})
