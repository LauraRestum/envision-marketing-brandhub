import { test, expect } from '@playwright/test';

test.describe('Start New Request Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('section is visible with correct heading', async ({ page }) => {
    const section = page.locator('#start-request');
    await expect(section).toBeVisible();
    await expect(section.locator('.section__title')).toHaveText('Start a New Request');
    await expect(section.locator('.section__subtitle')).toContainText('Already know what you need');
  });

  test('displays request cards', async ({ page }) => {
    const section = page.locator('#start-request');
    const cards = section.locator('.resource-card');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBe(4);
  });

  test('Create Something New card is present', async ({ page }) => {
    const card = page.locator('#start-request .resource-card', { hasText: 'Create Something New' });
    await expect(card).toBeVisible();
    await expect(card.locator('.resource-card__desc')).toContainText('new design, asset');
  });

  test('Update Web or Content card is present', async ({ page }) => {
    const card = page.locator('#start-request .resource-card', { hasText: 'Update Web or Content' });
    await expect(card).toBeVisible();
    await expect(card.locator('.resource-card__desc')).toContainText('website update');
  });

  test('Plan a Campaign or Event card is present', async ({ page }) => {
    const card = page.locator('#start-request .resource-card', { hasText: 'Plan a Campaign' });
    await expect(card).toBeVisible();
  });

  test('Request an Asset card is present', async ({ page }) => {
    const card = page.locator('#start-request .resource-card', { hasText: 'Request an Asset' });
    await expect(card).toBeVisible();
  });

  test('each card has a CTA with "Open Form" text', async ({ page }) => {
    const ctas = page.locator('#start-request .resource-card__cta');
    const count = await ctas.count();
    for (let i = 0; i < count; i++) {
      await expect(ctas.nth(i)).toContainText('Open Form');
    }
  });

  test('clicking Create Something New opens a modal', async ({ page }) => {
    await page.locator('#start-request .resource-card', { hasText: 'Create Something New' }).click();
    await expect(page.locator('.modal-overlay')).toBeVisible();
  });

  test('clicking Update Web or Content opens a modal', async ({ page }) => {
    await page.locator('#start-request .resource-card', { hasText: 'Update Web or Content' }).click();
    await expect(page.locator('.modal-overlay')).toBeVisible();
  });

  test('clicking Plan a Campaign opens a modal', async ({ page }) => {
    await page.locator('#start-request .resource-card', { hasText: 'Plan a Campaign' }).click();
    await expect(page.locator('.modal-overlay')).toBeVisible();
  });

  test('clicking Request an Asset opens a modal', async ({ page }) => {
    await page.locator('#start-request .resource-card', { hasText: 'Request an Asset' }).click();
    await expect(page.locator('.modal-overlay')).toBeVisible();
  });
});

test.describe('ClickUp Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#start-request .resource-card', { hasText: 'Create Something New' }).click();
    await expect(page.locator('.modal-overlay')).toBeVisible();
  });

  test('modal has header with title and close button', async ({ page }) => {
    await expect(page.locator('.modal__title')).toBeVisible();
    await expect(page.locator('.modal__close')).toBeVisible();
  });

  test('modal body contains an iframe', async ({ page }) => {
    await expect(page.locator('.modal__body iframe')).toBeVisible();
  });

  test('close button closes the modal', async ({ page }) => {
    await page.locator('.modal__close').click();
    await expect(page.locator('.modal-overlay')).not.toBeVisible();
  });

  test('clicking overlay background closes the modal', async ({ page }) => {
    await page.locator('.modal-overlay').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('.modal-overlay')).not.toBeVisible();
  });

  test('Escape key closes the modal', async ({ page }) => {
    await page.keyboard.press('Escape');
    await expect(page.locator('.modal-overlay')).not.toBeVisible();
  });
});
