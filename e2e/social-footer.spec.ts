import { test, expect } from '@playwright/test';

test.describe('Social Icon Row', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('social icon row is visible', async ({ page }) => {
    await expect(page.locator('.social-row')).toBeVisible();
  });

  test('displays "Follow Us" label', async ({ page }) => {
    await expect(page.locator('.social-row__label')).toHaveText('Follow Us');
  });

  test('displays 4 social media links', async ({ page }) => {
    const links = page.locator('.social-row__icon-link');
    await expect(links).toHaveCount(4);
  });

  test('social links open in new tab', async ({ page }) => {
    const links = page.locator('.social-row__icon-link');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).toHaveAttribute('target', '_blank');
      await expect(links.nth(i)).toHaveAttribute('rel', /noopener/);
    }
  });

  test('includes Facebook link', async ({ page }) => {
    const fbLink = page.locator('.social-row__icon-link', { hasText: /Facebook/i });
    await expect(fbLink).toBeVisible();
    await expect(fbLink).toHaveAttribute('href', /facebook\.com/);
  });

  test('includes LinkedIn link', async ({ page }) => {
    const liLink = page.locator('.social-row__icon-link', { hasText: /LinkedIn/i });
    await expect(liLink).toBeVisible();
    await expect(liLink).toHaveAttribute('href', /linkedin\.com/);
  });

  test('includes Instagram link', async ({ page }) => {
    const igLink = page.locator('.social-row__icon-link', { hasText: /Instagram/i });
    await expect(igLink).toBeVisible();
    await expect(igLink).toHaveAttribute('href', /instagram\.com/);
  });

  test('includes TikTok link', async ({ page }) => {
    const ttLink = page.locator('.social-row__icon-link', { hasText: /TikTok/i });
    await expect(ttLink).toBeVisible();
    await expect(ttLink).toHaveAttribute('href', /tiktok\.com/);
  });

  test('each social link has a platform name label', async ({ page }) => {
    const names = page.locator('.social-row__icon-name');
    await expect(names).toHaveCount(4);
    const texts = await names.allTextContents();
    expect(texts).toContain('Facebook');
    expect(texts).toContain('LinkedIn');
    expect(texts).toContain('Instagram');
    expect(texts).toContain('TikTok');
  });
});

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('footer is visible', async ({ page }) => {
    await expect(page.locator('.footer')).toBeVisible();
  });

  test('shows internal use text', async ({ page }) => {
    await expect(page.locator('.footer__text')).toContainText('Envision Brand & Marketing Hub');
    await expect(page.locator('.footer__text')).toContainText('internal use only');
  });

  test('has contact the marketing team link', async ({ page }) => {
    const link = page.locator('.footer__link');
    await expect(link).toBeVisible();
    await expect(link).toHaveText('Contact the Marketing Team');
  });

  test('footer contact link opens contact page', async ({ page }) => {
    await page.locator('.footer__link').click();
    await expect(page.locator('.contact-page')).toBeVisible();
  });
});
