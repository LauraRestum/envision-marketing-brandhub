import { test, expect } from '@playwright/test';

test.describe('Approved Messaging Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#brand-identity .resource-card', { hasText: 'Approved Messaging' }).click();
    await expect(page.locator('.logo-dl__overlay')).toBeVisible();
  });

  test('opens with correct title', async ({ page }) => {
    await expect(page.locator('.logo-dl__title')).toHaveText('Approved Messaging & Copy');
  });

  test('displays subtitle', async ({ page }) => {
    await expect(page.locator('.logo-dl__subtitle')).toContainText('Download approved boilerplate');
  });

  test('shows two messaging options', async ({ page }) => {
    const options = page.locator('.messaging-option');
    await expect(options).toHaveCount(2);
  });

  test('Download Boilerplate option is active/clickable', async ({ page }) => {
    const activeOption = page.locator('.messaging-option--active');
    await expect(activeOption).toBeVisible();
    await expect(activeOption.locator('.messaging-option__title')).toHaveText('Download Boilerplate');
  });

  test('View by Pillar option is locked', async ({ page }) => {
    const lockedOption = page.locator('.messaging-option--locked');
    await expect(lockedOption).toBeVisible();
    await expect(lockedOption.locator('.messaging-option__badge')).toHaveText('Coming Soon');
  });

  test('Download Boilerplate option has descriptive text', async ({ page }) => {
    const activeOption = page.locator('.messaging-option--active');
    await expect(activeOption.locator('.messaging-option__desc')).toContainText('Official Envision');
  });

  test('View by Pillar option has descriptive text', async ({ page }) => {
    const lockedOption = page.locator('.messaging-option--locked');
    await expect(lockedOption.locator('.messaging-option__desc')).toContainText('pillar');
  });

  test('close button closes the modal', async ({ page }) => {
    await page.locator('.logo-dl__close').click();
    await expect(page.locator('.logo-dl__overlay')).not.toBeVisible();
  });

  test('clicking overlay background closes the modal', async ({ page }) => {
    await page.locator('.logo-dl__overlay').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('.logo-dl__overlay')).not.toBeVisible();
  });
});
