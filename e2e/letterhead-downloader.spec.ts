import { test, expect } from '@playwright/test';

test.describe('Letterhead Downloader', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Open Letterhead Downloader via the Templates section
    await page.locator('#templates .resource-card', { hasText: 'Letterhead' }).click();
    await expect(page.locator('.logo-dl__overlay')).toBeVisible();
  });

  test('opens with header and title', async ({ page }) => {
    await expect(page.locator('.logo-dl__title')).toHaveText('Letterhead Downloads');
    await expect(page.locator('.logo-dl__close')).toBeVisible();
  });

  test('shows step 1 - office selection', async ({ page }) => {
    await expect(page.locator('.logo-dl__step-counter')).toContainText('Step 1');
    await expect(page.locator('.logo-dl__question')).toBeVisible();
    const options = page.locator('.logo-dl__option');
    await expect(options.first()).toBeVisible();
    const count = await options.count();
    expect(count).toBeGreaterThan(1);
  });

  test('selecting an office advances to step 2 - format selection', async ({ page }) => {
    // Click first non-MJM office option
    await page.locator('.logo-dl__option').first().click();
    // If it's not the password-gated one, we should see step 2
    const hasPasswordGate = await page.locator('.logo-dl__password-wrap').isVisible().catch(() => false);
    if (!hasPasswordGate) {
      await expect(page.locator('.logo-dl__step-counter')).toContainText('Step 2');
    }
  });

  test('completing wizard shows results with download buttons', async ({ page }) => {
    await page.locator('.logo-dl__option').first().click();
    const hasPasswordGate = await page.locator('.logo-dl__password-wrap').isVisible().catch(() => false);
    if (!hasPasswordGate) {
      await page.locator('.logo-dl__option').first().click();
      await expect(page.locator('.logo-dl__results')).toBeVisible();
    }
  });

  test('back button works in step 2', async ({ page }) => {
    await page.locator('.logo-dl__option').first().click();
    const hasPasswordGate = await page.locator('.logo-dl__password-wrap').isVisible().catch(() => false);
    if (!hasPasswordGate) {
      await expect(page.locator('.logo-dl__step-counter')).toContainText('Step 2');
      await page.locator('.logo-dl__back-btn').click();
      await expect(page.locator('.logo-dl__step-counter')).toContainText('Step 1');
    }
  });

  test('close button closes the overlay', async ({ page }) => {
    await page.locator('.logo-dl__close').click();
    await expect(page.locator('.logo-dl__overlay')).not.toBeVisible();
  });

  test('clicking overlay background closes the modal', async ({ page }) => {
    await page.locator('.logo-dl__overlay').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('.logo-dl__overlay')).not.toBeVisible();
  });

  test('file list shows format badges', async ({ page }) => {
    await page.locator('.logo-dl__option').first().click();
    const hasPasswordGate = await page.locator('.logo-dl__password-wrap').isVisible().catch(() => false);
    if (!hasPasswordGate) {
      await page.locator('.logo-dl__option').first().click();
      const files = page.locator('.logo-dl__file');
      const count = await files.count();
      if (count > 0) {
        await expect(files.first().locator('.logo-dl__badge')).toBeVisible();
      }
    }
  });
});
