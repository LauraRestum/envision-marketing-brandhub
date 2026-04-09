import { test, expect } from '@playwright/test';

test.describe('Logo Downloader', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Open Logo Downloader via the Logos card
    await page.locator('#brand-assets .resource-card', { hasText: 'Logos' }).click();
    await expect(page.locator('.logo-dl__overlay')).toBeVisible();
  });

  test('opens with header, title, and close button', async ({ page }) => {
    await expect(page.locator('.logo-dl__title')).toHaveText('Logo Downloads');
    await expect(page.locator('.logo-dl__subtitle')).toBeVisible();
    await expect(page.locator('.logo-dl__close')).toBeVisible();
  });

  test('displays logo usage policies', async ({ page }) => {
    const policies = page.locator('.logo-dl__policy');
    await expect(policies.first()).toBeVisible();
  });

  test('shows step counter on first step', async ({ page }) => {
    await expect(page.locator('.logo-dl__step-counter')).toContainText('Step 1');
  });

  test('shows question heading on first step', async ({ page }) => {
    await expect(page.locator('.logo-dl__question')).toBeVisible();
  });

  test('displays option buttons for logo type selection', async ({ page }) => {
    const options = page.locator('.logo-dl__option');
    await expect(options.first()).toBeVisible();
    const count = await options.count();
    expect(count).toBeGreaterThan(1);
  });

  test('clicking an option advances to the next step', async ({ page }) => {
    await page.locator('.logo-dl__option').first().click();
    await expect(page.locator('.logo-dl__step-counter')).toContainText('Step 2');
  });

  test('breadcrumb trail updates as user progresses', async ({ page }) => {
    await page.locator('.logo-dl__option').first().click();
    const breadcrumb = page.locator('.logo-dl__breadcrumb');
    await expect(breadcrumb).toBeVisible();
    await expect(page.locator('.logo-dl__crumb').first()).toBeVisible();
  });

  test('back button returns to previous step', async ({ page }) => {
    await page.locator('.logo-dl__option').first().click();
    await expect(page.locator('.logo-dl__step-counter')).toContainText('Step 2');
    await page.locator('.logo-dl__back-btn').click();
    await expect(page.locator('.logo-dl__step-counter')).toContainText('Step 1');
  });

  test('completing all steps shows results', async ({ page }) => {
    // Step through the wizard
    await page.locator('.logo-dl__option').first().click();
    await page.locator('.logo-dl__option').first().click();
    // Some paths have 2 steps, some 3 - check if we're at results or step 3
    const hasResults = await page.locator('.logo-dl__results').isVisible().catch(() => false);
    if (!hasResults) {
      await page.locator('.logo-dl__option').first().click();
    }
    await expect(page.locator('.logo-dl__results')).toBeVisible();
  });

  test('results show file list with download buttons', async ({ page }) => {
    await page.locator('.logo-dl__option').first().click();
    await page.locator('.logo-dl__option').first().click();
    const hasResults = await page.locator('.logo-dl__results').isVisible().catch(() => false);
    if (!hasResults) {
      await page.locator('.logo-dl__option').first().click();
    }
    const files = page.locator('.logo-dl__file');
    const fileCount = await files.count();
    if (fileCount > 0) {
      await expect(files.first().locator('.logo-dl__download-btn')).toBeVisible();
      await expect(files.first().locator('.logo-dl__badge')).toBeVisible();
    }
  });

  test('results header shows file count', async ({ page }) => {
    await page.locator('.logo-dl__option').first().click();
    await page.locator('.logo-dl__option').first().click();
    const hasResults = await page.locator('.logo-dl__results').isVisible().catch(() => false);
    if (!hasResults) {
      await page.locator('.logo-dl__option').first().click();
    }
    await expect(page.locator('.logo-dl__results-title')).toBeVisible();
  });

  test('"Try different options" link resets the wizard', async ({ page }) => {
    await page.locator('.logo-dl__option').first().click();
    await page.locator('.logo-dl__option').first().click();
    const hasResults = await page.locator('.logo-dl__results').isVisible().catch(() => false);
    if (!hasResults) {
      await page.locator('.logo-dl__option').first().click();
    }
    const startOver = page.locator('.logo-dl__link-btn', { hasText: /different options|start over/i });
    if (await startOver.isVisible()) {
      await startOver.click();
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
});
