import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('.header__link--btn').click();
    await expect(page.locator('.contact-page')).toBeVisible();
  });

  test('displays hero section with title', async ({ page }) => {
    await expect(page.locator('.contact-page__hero-title')).toHaveText('Meet the Marketing Team');
    await expect(page.locator('.contact-page__hero-subtitle')).toContainText('brand and marketing needs');
  });

  test('has back button to return to hub', async ({ page }) => {
    await expect(page.locator('.contact-page__back-btn')).toBeVisible();
  });

  test('back button returns to main hub', async ({ page }) => {
    await page.locator('.contact-page__back-btn').click();
    await expect(page.locator('.hero__title')).toBeVisible();
    await expect(page.locator('.contact-page')).not.toBeVisible();
  });

  test('displays team member cards', async ({ page }) => {
    const cards = page.locator('.contact-page__card');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBe(3);
  });

  test('team members have avatars and names', async ({ page }) => {
    const firstCard = page.locator('.contact-page__card').first();
    await expect(firstCard.locator('.contact-page__avatar')).toBeVisible();
    await expect(firstCard.locator('.contact-page__name')).toBeVisible();
    await expect(firstCard.locator('.contact-page__title')).toBeVisible();
  });

  test('contact form is displayed', async ({ page }) => {
    await expect(page.locator('.contact-page__form')).toBeVisible();
    await expect(page.locator('.contact-page__form-heading')).toContainText('Send Us a Message');
  });

  test('contact form has all required fields', async ({ page }) => {
    const form = page.locator('.contact-page__form');
    await expect(form.locator('input[placeholder="First and last name"]')).toBeVisible();
    await expect(form.locator('input[placeholder="you@envisionus.com"]')).toBeVisible();
    await expect(form.locator('input[placeholder="What is this regarding?"]')).toBeVisible();
    await expect(form.locator('textarea[placeholder="Tell us how we can help..."]')).toBeVisible();
  });

  test('submit button is present', async ({ page }) => {
    await expect(page.locator('.contact-page__submit')).toBeVisible();
    await expect(page.locator('.contact-page__submit')).toHaveText('Send Message');
  });

  test('form fields are required', async ({ page }) => {
    const nameInput = page.locator('input[placeholder="First and last name"]');
    await expect(nameInput).toHaveAttribute('required', '');
  });

  test('can fill in the contact form', async ({ page }) => {
    await page.locator('input[placeholder="First and last name"]').fill('John Doe');
    await page.locator('input[placeholder="you@envisionus.com"]').fill('john@envisionus.com');
    await page.locator('input[placeholder="What is this regarding?"]').fill('Test Subject');
    await page.locator('textarea[placeholder="Tell us how we can help..."]').fill('This is a test message');

    // Verify values
    await expect(page.locator('input[placeholder="First and last name"]')).toHaveValue('John Doe');
    await expect(page.locator('input[placeholder="you@envisionus.com"]')).toHaveValue('john@envisionus.com');
    await expect(page.locator('input[placeholder="What is this regarding?"]')).toHaveValue('Test Subject');
    await expect(page.locator('textarea[placeholder="Tell us how we can help..."]')).toHaveValue('This is a test message');
  });
});

test.describe('Story Submission', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('story submission section is visible', async ({ page }) => {
    const section = page.locator('#story-submission');
    await expect(section).toBeVisible();
  });

  test('displays section title and description', async ({ page }) => {
    await expect(page.locator('.story__title')).toHaveText('Have a story worth sharing?');
    await expect(page.locator('.story__desc')).toContainText('Patient impact moments');
  });

  test('displays idea prompt chips', async ({ page }) => {
    const chips = page.locator('.story__prompt-chip');
    await expect(chips.first()).toBeVisible();
    const count = await chips.count();
    expect(count).toBe(5);
  });

  test('prompt chips have expected text', async ({ page }) => {
    const chipTexts = await page.locator('.story__prompt-chip').allTextContents();
    expect(chipTexts.some(t => t.includes('patient impact'))).toBeTruthy();
    expect(chipTexts.some(t => t.includes('team achievement'))).toBeTruthy();
    expect(chipTexts.some(t => t.includes('milestone'))).toBeTruthy();
  });

  test('story form has all required fields', async ({ page }) => {
    const form = page.locator('.story__form');
    await expect(form).toBeVisible();
    await expect(form.locator('input[placeholder="First and last name"]')).toBeVisible();
    await expect(form.locator('input[placeholder="you@envisionus.com"]')).toBeVisible();
    await expect(form.locator('input[placeholder="Give your story a short title"]')).toBeVisible();
    await expect(form.locator('textarea[placeholder*="Tell us about"]')).toBeVisible();
  });

  test('story form has file attachment field', async ({ page }) => {
    const fileInput = page.locator('.story__file-input');
    await expect(fileInput).toBeVisible();
  });

  test('submit button is present', async ({ page }) => {
    await expect(page.locator('.story__cta')).toBeVisible();
    await expect(page.locator('.story__cta')).toHaveText('Submit Your Story');
  });

  test('can fill in the story form', async ({ page }) => {
    await page.locator('.story__form input[placeholder="First and last name"]').fill('Jane Smith');
    await page.locator('.story__form input[placeholder="you@envisionus.com"]').fill('jane@envisionus.com');
    await page.locator('.story__form input[placeholder="Give your story a short title"]').fill('Great Achievement');
    await page.locator('.story__form textarea').fill('An amazing story happened');

    await expect(page.locator('.story__form input[placeholder="First and last name"]')).toHaveValue('Jane Smith');
    await expect(page.locator('.story__form input[placeholder="Give your story a short title"]')).toHaveValue('Great Achievement');
  });
});
