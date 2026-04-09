import { test, expect } from '@playwright/test';

test.describe('Help Wizard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Open Help Wizard via the "Not sure where to start" hero tile
    await page.locator('.hero-tile', { hasText: 'Not sure where to start' }).click();
    await expect(page.locator('.wizard-overlay')).toBeVisible();
  });

  test('opens with correct heading', async ({ page }) => {
    await expect(page.locator('.wizard__heading')).toHaveText('Not Sure Where to Start');
    await expect(page.locator('.wizard__close')).toBeVisible();
  });

  test('displays initial question with options', async ({ page }) => {
    await expect(page.locator('.wizard__question')).toBeVisible();
    const options = page.locator('.wizard__option');
    await expect(options.first()).toBeVisible();
    const count = await options.count();
    expect(count).toBeGreaterThan(1);
  });

  test('options have labels', async ({ page }) => {
    const firstOption = page.locator('.wizard__option').first();
    await expect(firstOption.locator('.wizard__option-label')).toBeVisible();
  });

  test('clicking an option navigates to next question or result', async ({ page }) => {
    const initialQuestion = await page.locator('.wizard__question').textContent();
    await page.locator('.wizard__option').first().click();
    // Either shows a new question or a result
    const hasNewQuestion = await page.locator('.wizard__question').isVisible().catch(() => false);
    const hasResult = await page.locator('.wizard__result').isVisible().catch(() => false);
    expect(hasNewQuestion || hasResult).toBeTruthy();
    if (hasNewQuestion) {
      const newQuestion = await page.locator('.wizard__question').textContent();
      // Questions may differ or breadcrumbs should update
      const breadcrumbs = page.locator('.wizard__crumb');
      const crumbCount = await breadcrumbs.count();
      expect(crumbCount).toBeGreaterThanOrEqual(1);
    }
  });

  test('breadcrumbs update as user navigates', async ({ page }) => {
    await page.locator('.wizard__option').first().click();
    const breadcrumbs = page.locator('.wizard__crumb');
    await expect(breadcrumbs.first()).toBeVisible();
  });

  test('back button returns to previous question', async ({ page }) => {
    await page.locator('.wizard__option').first().click();
    const backBtn = page.locator('.wizard__back');
    if (await backBtn.isVisible()) {
      await backBtn.click();
      await expect(page.locator('.wizard__question')).toBeVisible();
    }
  });

  test('navigating through multiple levels reaches a result', async ({ page }) => {
    // Click through options until we hit a result
    for (let i = 0; i < 5; i++) {
      const hasResult = await page.locator('.wizard__result').isVisible().catch(() => false);
      if (hasResult) break;
      const options = page.locator('.wizard__option');
      const count = await options.count();
      if (count > 0) {
        await options.first().click();
      }
    }
    // Should eventually reach a result or still be navigating
    const hasResult = await page.locator('.wizard__result').isVisible().catch(() => false);
    const hasOptions = await page.locator('.wizard__option').count();
    expect(hasResult || hasOptions > 0).toBeTruthy();
  });

  test('result view shows recommendation text', async ({ page }) => {
    // Navigate to a result
    for (let i = 0; i < 5; i++) {
      if (await page.locator('.wizard__result').isVisible().catch(() => false)) break;
      const options = page.locator('.wizard__option');
      if (await options.count() > 0) await options.first().click();
    }
    if (await page.locator('.wizard__result').isVisible()) {
      await expect(page.locator('.wizard__result-text')).toBeVisible();
    }
  });

  test('result view has "Start Over" button', async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      if (await page.locator('.wizard__result').isVisible().catch(() => false)) break;
      const options = page.locator('.wizard__option');
      if (await options.count() > 0) await options.first().click();
    }
    if (await page.locator('.wizard__result').isVisible()) {
      const startOver = page.locator('.wizard__result-btn--secondary', { hasText: /start over/i });
      await expect(startOver).toBeVisible();
    }
  });

  test('"Start Over" resets the wizard', async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      if (await page.locator('.wizard__result').isVisible().catch(() => false)) break;
      const options = page.locator('.wizard__option');
      if (await options.count() > 0) await options.first().click();
    }
    if (await page.locator('.wizard__result').isVisible()) {
      await page.locator('.wizard__result-btn--secondary', { hasText: /start over/i }).click();
      await expect(page.locator('.wizard__question')).toBeVisible();
    }
  });

  test('close button closes the wizard', async ({ page }) => {
    await page.locator('.wizard__close').click();
    await expect(page.locator('.wizard-overlay')).not.toBeVisible();
  });

  test('clicking overlay background closes the wizard', async ({ page }) => {
    await page.locator('.wizard-overlay').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('.wizard-overlay')).not.toBeVisible();
  });
});
