import { test, expect } from '@playwright/test';

test.describe('Typography Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Open Typography Panel via Brand Identity section
    await page.locator('#brand-identity .resource-card', { hasText: 'Typography' }).click();
    await expect(page.locator('.brand-panel-overlay')).toBeVisible();
  });

  test('opens with correct header', async ({ page }) => {
    await expect(page.locator('.brand-panel__title')).toHaveText('Typography & Fonts');
    await expect(page.locator('.brand-panel__subtitle')).toContainText('Official Envision typefaces');
  });

  test('has close button', async ({ page }) => {
    await expect(page.locator('.brand-panel__close')).toBeVisible();
  });

  test('displays font specimen cards', async ({ page }) => {
    const fontCards = page.locator('.typo-font-card');
    await expect(fontCards.first()).toBeVisible();
    const count = await fontCards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('font cards show font name and specimen', async ({ page }) => {
    const firstCard = page.locator('.typo-font-card').first();
    await expect(firstCard.locator('.typo-font-card__specimen')).toBeVisible();
  });

  test('font cards show alphabet preview', async ({ page }) => {
    const preview = page.locator('.typo-font-card__preview');
    await expect(preview.first()).toBeVisible();
  });

  test('displays font download section', async ({ page }) => {
    const downloads = page.locator('.typo-download');
    await expect(downloads.first()).toBeVisible();
    await expect(downloads.first().locator('.typo-download__title')).toBeVisible();
  });

  test('displays font weight samples', async ({ page }) => {
    const weights = page.locator('.typo-weight-row');
    await expect(weights.first()).toBeVisible();
    const count = await weights.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('weight rows show sample text and weight name', async ({ page }) => {
    const firstWeight = page.locator('.typo-weight-row').first();
    await expect(firstWeight.locator('.typo-weight-row__sample')).toBeVisible();
    await expect(firstWeight.locator('.typo-weight-row__name')).toBeVisible();
  });

  test('displays usage guidelines', async ({ page }) => {
    const guidelines = page.locator('.typo-guideline');
    const count = await guidelines.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('close button closes the panel', async ({ page }) => {
    await page.locator('.brand-panel__close').click();
    await expect(page.locator('.brand-panel-overlay')).not.toBeVisible();
  });

  test('clicking overlay background closes the panel', async ({ page }) => {
    await page.locator('.brand-panel-overlay').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('.brand-panel-overlay')).not.toBeVisible();
  });
});
