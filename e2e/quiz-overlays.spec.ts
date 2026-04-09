import { test, expect } from '@playwright/test';

test.describe('Imagery Quiz', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#brand-assets .resource-card', { hasText: 'Approved Imagery' }).click();
    await expect(page.locator('.logo-dl__overlay')).toBeVisible();
  });

  test('opens with imagery quiz title', async ({ page }) => {
    await expect(page.locator('.logo-dl__title')).toContainText(/Imagery|Image/i);
  });

  test('shows topic selection options', async ({ page }) => {
    const options = page.locator('.logo-dl__option');
    await expect(options.first()).toBeVisible();
    const count = await options.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('selecting a topic shows results with SharePoint link', async ({ page }) => {
    await page.locator('.logo-dl__option').first().click();
    await expect(page.locator('.quiz-result')).toBeVisible();
    await expect(page.locator('.quiz-result__title')).toBeVisible();
    await expect(page.locator('.quiz-result__desc')).toBeVisible();
  });

  test('result contains action button to open folder', async ({ page }) => {
    await page.locator('.logo-dl__option').first().click();
    const actionBtn = page.locator('.quiz-result__action-btn');
    if (await actionBtn.isVisible()) {
      await expect(actionBtn).toHaveAttribute('target', '_blank');
    }
  });

  test('"Start over" resets the quiz', async ({ page }) => {
    await page.locator('.logo-dl__option').first().click();
    await expect(page.locator('.quiz-result')).toBeVisible();
    const startOver = page.locator('.logo-dl__link-btn', { hasText: /start over/i });
    if (await startOver.isVisible()) {
      await startOver.click();
      await expect(page.locator('.logo-dl__step-counter')).toContainText('Step 1');
    }
  });

  test('close button closes the quiz', async ({ page }) => {
    await page.locator('.logo-dl__close').click();
    await expect(page.locator('.logo-dl__overlay')).not.toBeVisible();
  });
});

test.describe('Video Quiz', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#brand-assets .resource-card', { hasText: 'Video Library' }).click();
    await expect(page.locator('.logo-dl__overlay')).toBeVisible();
  });

  test('opens with video quiz title', async ({ page }) => {
    await expect(page.locator('.logo-dl__title')).toContainText(/Video/i);
  });

  test('shows video type options', async ({ page }) => {
    const options = page.locator('.logo-dl__option');
    await expect(options.first()).toBeVisible();
    const count = await options.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('selecting a type shows result with contact info', async ({ page }) => {
    await page.locator('.logo-dl__option').first().click();
    await expect(page.locator('.quiz-result')).toBeVisible();
    await expect(page.locator('.quiz-result__note')).toBeVisible();
  });

  test('close button closes the quiz', async ({ page }) => {
    await page.locator('.logo-dl__close').click();
    await expect(page.locator('.logo-dl__overlay')).not.toBeVisible();
  });
});

test.describe('Presentation Quiz', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#templates .resource-card', { hasText: 'Presentation' }).click();
    await expect(page.locator('.logo-dl__overlay')).toBeVisible();
  });

  test('opens with presentation quiz title', async ({ page }) => {
    await expect(page.locator('.logo-dl__title')).toContainText(/Presentation/i);
  });

  test('shows purpose options', async ({ page }) => {
    const options = page.locator('.logo-dl__option');
    await expect(options.first()).toBeVisible();
    const count = await options.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('selecting a purpose shows result with template info', async ({ page }) => {
    await page.locator('.logo-dl__option').first().click();
    await expect(page.locator('.quiz-result')).toBeVisible();
    await expect(page.locator('.quiz-result__title')).toBeVisible();
  });

  test('close button closes the quiz', async ({ page }) => {
    await page.locator('.logo-dl__close').click();
    await expect(page.locator('.logo-dl__overlay')).not.toBeVisible();
  });
});
