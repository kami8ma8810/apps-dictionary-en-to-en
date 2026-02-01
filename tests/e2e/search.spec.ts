import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Search page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should display the app title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'English-to-English Dictionary' })).toBeVisible()
  })

  test('should have a search input', async ({ page }) => {
    await expect(page.getByPlaceholder('Search a word...')).toBeVisible()
  })

  test('should navigate to word page on search', async ({ page }) => {
    const input = page.getByPlaceholder('Search a word...')
    await expect(input).toBeVisible()
    await input.fill('hello')
    await input.press('Enter')

    await page.waitForURL(/\/word\/hello/, { timeout: 10000 })
  })

  test('should have navigation', async ({ page }) => {
    await expect(page.locator('nav').first()).toBeVisible()
  })

  test('should pass WCAG 2.2 AA accessibility checks', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze()

    expect(results.violations).toEqual([])
  })
})
