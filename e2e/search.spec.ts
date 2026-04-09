import { test, expect } from '@playwright/test';

test.describe('Universal Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('search input is visible with correct placeholder', async ({ page }) => {
    const input = page.locator('.search__input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', /Search for logos, templates, forms/);
  });

  test('search hints are displayed below the input', async ({ page }) => {
    const hints = page.locator('.search__hint');
    await expect(hints.first()).toBeVisible();
    const hintTexts = await hints.allTextContents();
    expect(hintTexts).toContain('logo');
    expect(hintTexts).toContain('letterhead');
    expect(hintTexts).toContain('colors');
  });

  test('clicking a search hint populates the input', async ({ page }) => {
    const hint = page.locator('.search__hint', { hasText: 'logo' });
    await hint.click();
    const input = page.locator('.search__input');
    await expect(input).toHaveValue('logo');
  });

  test('typing in search shows results dropdown', async ({ page }) => {
    await page.locator('.search__input').fill('logo');
    await expect(page.locator('.search__results')).toBeVisible();
  });

  test('search for "logo" returns results containing logo-related items', async ({ page }) => {
    await page.locator('.search__input').fill('logo');
    const results = page.locator('.search__result-item');
    await expect(results.first()).toBeVisible();
    const count = await results.count();
    expect(count).toBeGreaterThan(0);
  });

  test('clear button appears when text is entered', async ({ page }) => {
    const input = page.locator('.search__input');
    await input.fill('test');
    const clearBtn = page.locator('.search__clear');
    await expect(clearBtn).toBeVisible();
  });

  test('clear button clears the search input', async ({ page }) => {
    const input = page.locator('.search__input');
    await input.fill('test');
    await page.locator('.search__clear').click();
    await expect(input).toHaveValue('');
  });

  test('search for "colors" returns color palette result', async ({ page }) => {
    await page.locator('.search__input').fill('colors');
    const result = page.locator('.search__result-item', { hasText: /[Cc]olor/ });
    await expect(result.first()).toBeVisible();
  });

  test('search for "presentation" returns template results', async ({ page }) => {
    await page.locator('.search__input').fill('presentation');
    const results = page.locator('.search__result-item');
    await expect(results.first()).toBeVisible();
  });

  test('search for "letterhead" returns letterhead results', async ({ page }) => {
    await page.locator('.search__input').fill('letterhead');
    const results = page.locator('.search__result-item');
    await expect(results.first()).toBeVisible();
  });

  test('empty search query hides results', async ({ page }) => {
    const input = page.locator('.search__input');
    await input.fill('logo');
    await expect(page.locator('.search__results')).toBeVisible();
    await input.fill('');
    await expect(page.locator('.search__results')).not.toBeVisible();
  });

  test('search for nonsense shows empty state', async ({ page }) => {
    await page.locator('.search__input').fill('xyznonexistent123');
    const empty = page.locator('.search__empty');
    await expect(empty).toBeVisible();
  });

  test('clicking a search result triggers navigation', async ({ page }) => {
    await page.locator('.search__input').fill('logo');
    const firstResult = page.locator('.search__result-item').first();
    await expect(firstResult).toBeVisible();
    await firstResult.click();
    // After clicking, either an overlay opens or navigation happens
    // The search results should close
    await expect(page.locator('.search__results')).not.toBeVisible();
  });

  test('search for imagery-related terms works via synonyms', async ({ page }) => {
    await page.locator('.search__input').fill('photo');
    const results = page.locator('.search__result-item');
    await expect(results.first()).toBeVisible();
  });

  test('search for "brand guidelines" returns results', async ({ page }) => {
    await page.locator('.search__input').fill('brand guidelines');
    const results = page.locator('.search__result-item');
    await expect(results.first()).toBeVisible();
  });

  test('search results show title and description', async ({ page }) => {
    await page.locator('.search__input').fill('logo');
    const firstResult = page.locator('.search__result-item').first();
    await expect(firstResult.locator('.search__result-title')).toBeVisible();
    await expect(firstResult.locator('.search__result-desc')).toBeVisible();
  });
});
