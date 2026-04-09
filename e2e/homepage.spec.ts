import { test, expect } from '@playwright/test';

test.describe('Homepage Layout & Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the app shell with header, main, and footer', async ({ page }) => {
    await expect(page.locator('.header')).toBeVisible();
    await expect(page.locator('main.main')).toBeVisible();
    await expect(page.locator('.footer')).toBeVisible();
  });

  test('header displays brand logo and title', async ({ page }) => {
    await expect(page.locator('.header__logo')).toBeVisible();
    await expect(page.locator('.header__title')).toHaveText('Brand & Marketing Hub');
    await expect(page.locator('.header__tag')).toHaveText('Internal');
  });

  test('header navigation links are present', async ({ page }) => {
    const navLinks = page.locator('.header__nav .header__link:not(.header__link--btn)');
    await expect(navLinks).toHaveCount(4);
    await expect(navLinks.nth(0)).toHaveText('Brand Assets');
    await expect(navLinks.nth(1)).toHaveText('Guidelines');
    await expect(navLinks.nth(2)).toHaveText('Templates');
    await expect(navLinks.nth(3)).toHaveText('Requests');
  });

  test('header has Contact Us button', async ({ page }) => {
    const contactBtn = page.locator('.header__link--btn');
    await expect(contactBtn).toBeVisible();
    await expect(contactBtn).toHaveText(/Contact Us/);
  });

  test('hero section displays title and subtitle', async ({ page }) => {
    await expect(page.locator('.hero__title')).toHaveText('What do you need today?');
    await expect(page.locator('.hero__subtitle')).toContainText('From brand strategy to creative execution');
  });

  test('hero tiles are visible with correct content', async ({ page }) => {
    const tiles = page.locator('.hero-tile');
    await expect(tiles).toHaveCount(4);

    await expect(tiles.nth(0).locator('.hero-tile__title')).toHaveText('Create something new');
    await expect(tiles.nth(1).locator('.hero-tile__title')).toHaveText('Find a resource');
    await expect(tiles.nth(2).locator('.hero-tile__title')).toHaveText('Update or reprint');
    await expect(tiles.nth(3).locator('.hero-tile__title')).toHaveText('Not sure where to start');
  });

  test('hero tile descriptions are visible', async ({ page }) => {
    await expect(page.locator('.hero-tile').nth(0).locator('.hero-tile__desc')).toContainText('Request a new design');
    await expect(page.locator('.hero-tile').nth(1).locator('.hero-tile__desc')).toContainText('Logos, templates');
    await expect(page.locator('.hero-tile').nth(2).locator('.hero-tile__desc')).toContainText('Revise or reorder');
    await expect(page.locator('.hero-tile').nth(3).locator('.hero-tile__desc')).toContainText('Let us guide you');
  });

  test('"Find a resource" tile scrolls to Brand Assets section', async ({ page }) => {
    await page.locator('.hero-tile').nth(1).click();
    await page.waitForTimeout(500);
    const section = page.locator('#brand-assets');
    await expect(section).toBeInViewport();
  });

  test('"Create something new" tile scrolls to Start Request section', async ({ page }) => {
    await page.locator('.hero-tile').nth(0).click();
    await page.waitForTimeout(500);
    const section = page.locator('#start-request');
    await expect(section).toBeInViewport();
  });

  test('"Not sure where to start" tile opens Help Wizard', async ({ page }) => {
    await page.locator('.hero-tile').nth(3).click();
    await expect(page.locator('.wizard-overlay')).toBeVisible();
  });

  test('"Update or reprint" tile opens design request modal', async ({ page }) => {
    await page.locator('.hero-tile').nth(2).click();
    await expect(page.locator('.modal-overlay')).toBeVisible();
  });

  test('Brand Assets section is rendered with cards', async ({ page }) => {
    const section = page.locator('#brand-assets');
    await expect(section).toBeVisible();
    await expect(section.locator('.section__title')).toHaveText('Brand Assets');

    const cards = section.locator('.resource-card');
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0).locator('.resource-card__title')).toHaveText('Logos');
    await expect(cards.nth(1).locator('.resource-card__title')).toHaveText('Approved Imagery');
    await expect(cards.nth(2).locator('.resource-card__title')).toHaveText('Video Library');
  });

  test('Brand Identity section is rendered with cards', async ({ page }) => {
    const section = page.locator('#brand-identity');
    await expect(section).toBeVisible();
    await expect(section.locator('.section__title')).toHaveText('Brand Identity & Guidelines');

    const cards = section.locator('.resource-card');
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0).locator('.resource-card__title')).toHaveText('Color Palette');
    await expect(cards.nth(1).locator('.resource-card__title')).toHaveText('Typography & Fonts');
    await expect(cards.nth(2).locator('.resource-card__title')).toHaveText('Approved Messaging & Copy');
  });

  test('Templates section is rendered with cards', async ({ page }) => {
    const section = page.locator('#templates');
    await expect(section).toBeVisible();
    await expect(section.locator('.section__title')).toHaveText('Ready-to-Use Templates');

    const cards = section.locator('.resource-card');
    await expect(cards).toHaveCount(2);
    await expect(cards.nth(0).locator('.resource-card__title')).toHaveText('Presentation');
    await expect(cards.nth(1).locator('.resource-card__title')).toHaveText('Letterhead');
  });

  test('Print callout is displayed in Templates section', async ({ page }) => {
    const callout = page.locator('.print-callout');
    await expect(callout).toBeVisible();
    await expect(callout.locator('.print-callout__title')).toHaveText('Need something printed?');
    const link = callout.locator('.print-callout__btn');
    await expect(link).toHaveAttribute('href', 'https://www.envisionprintservices.com');
    await expect(link).toHaveAttribute('target', '_blank');
  });

  test('Messaging Assistant card is visible with Phase 2 badge', async ({ page }) => {
    const card = page.locator('.messaging-assistant-card');
    await expect(card).toBeVisible();
    await expect(card.locator('.messaging-assistant-card__badge')).toHaveText('Phase 2');
    await expect(card.locator('.messaging-assistant-card__title')).toHaveText('Messaging Assistant');
  });

  test('footer displays correct text and contact link', async ({ page }) => {
    await expect(page.locator('.footer__text')).toContainText('For internal use only');
    await expect(page.locator('.footer__link')).toHaveText('Contact the Marketing Team');
  });

  test('Contact Us button in header switches to Contact Page', async ({ page }) => {
    await page.locator('.header__link--btn').click();
    await expect(page.locator('.contact-page')).toBeVisible();
    await expect(page.locator('.contact-page__hero-title')).toHaveText('Meet the Marketing Team');
  });

  test('footer Contact link switches to Contact Page', async ({ page }) => {
    await page.locator('.footer__link').click();
    await expect(page.locator('.contact-page')).toBeVisible();
  });

  test('navigation links point to correct anchors', async ({ page }) => {
    const links = page.locator('.header__link');
    await expect(links.nth(0)).toHaveAttribute('href', '#brand-assets');
    await expect(links.nth(1)).toHaveAttribute('href', '#brand-identity');
    await expect(links.nth(2)).toHaveAttribute('href', '#templates');
    await expect(links.nth(3)).toHaveAttribute('href', '#start-request');
  });
});
