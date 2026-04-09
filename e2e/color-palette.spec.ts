import { test, expect } from '@playwright/test';

test.describe('Color Palette Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Open Color Palette via Brand Identity section
    await page.locator('#brand-identity .resource-card', { hasText: 'Color Palette' }).click();
    await expect(page.locator('.brand-panel-overlay')).toBeVisible();
  });

  test('opens with correct header', async ({ page }) => {
    await expect(page.locator('.brand-panel__title')).toHaveText('Color Palette');
    await expect(page.locator('.brand-panel__subtitle')).toContainText('Official Envision brand colors');
  });

  test('has close button', async ({ page }) => {
    await expect(page.locator('.brand-panel__close')).toBeVisible();
  });

  test('displays primary colors section', async ({ page }) => {
    const sections = page.locator('.color-section');
    await expect(sections.first()).toBeVisible();
    await expect(page.locator('.color-section__title').first()).toBeVisible();
  });

  test('displays color swatches with preview and name', async ({ page }) => {
    const swatches = page.locator('.color-swatch');
    await expect(swatches.first()).toBeVisible();
    const count = await swatches.count();
    expect(count).toBeGreaterThan(2);

    await expect(swatches.first().locator('.color-swatch__preview')).toBeVisible();
    await expect(swatches.first().locator('.color-swatch__name')).toBeVisible();
  });

  test('each swatch shows HEX, RGB, CMYK, and Pantone values', async ({ page }) => {
    const firstSwatch = page.locator('.color-swatch').first();
    const labels = firstSwatch.locator('.color-swatch__label');
    const labelTexts = await labels.allTextContents();
    expect(labelTexts.some(t => t.includes('HEX'))).toBeTruthy();
    expect(labelTexts.some(t => t.includes('RGB'))).toBeTruthy();
    expect(labelTexts.some(t => t.includes('CMYK'))).toBeTruthy();
    expect(labelTexts.some(t => t.includes('Pantone'))).toBeTruthy();
  });

  test('clicking a color value copies to clipboard and shows feedback', async ({ page }) => {
    const copyBtn = page.locator('.color-swatch__value').first();
    await copyBtn.click();
    // Should show "Copied" feedback
    await expect(page.locator('.color-swatch__copied').first()).toBeVisible();
  });

  test('color swatches display usage descriptions', async ({ page }) => {
    const usages = page.locator('.color-swatch__usage');
    await expect(usages.first()).toBeVisible();
  });

  test('close button closes the panel', async ({ page }) => {
    await page.locator('.brand-panel__close').click();
    await expect(page.locator('.brand-panel-overlay')).not.toBeVisible();
  });

  test('clicking overlay background closes the panel', async ({ page }) => {
    await page.locator('.brand-panel-overlay').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('.brand-panel-overlay')).not.toBeVisible();
  });

  test('displays both primary and extended palette sections', async ({ page }) => {
    const sections = page.locator('.color-section');
    const count = await sections.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });
});
