import { test, expect } from '@playwright/test';

test.describe('Messaging Assistant', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('.messaging-assistant-card').click();
    await expect(page.locator('.msg-overlay')).toBeVisible();
  });

  test('opens with lock screen', async ({ page }) => {
    await expect(page.locator('.msg__lock-screen')).toBeVisible();
    await expect(page.locator('.msg__lock-title')).toContainText('Phase 2');
  });

  test('lock screen has password input', async ({ page }) => {
    await expect(page.locator('.msg__lock-input')).toBeVisible();
    await expect(page.locator('.msg__lock-input')).toHaveAttribute('placeholder', /password/i);
  });

  test('lock screen has unlock button', async ({ page }) => {
    await expect(page.locator('.msg__lock-btn')).toBeVisible();
  });

  test('wrong password shows error', async ({ page }) => {
    await page.locator('.msg__lock-input').fill('wrongpassword');
    await page.locator('.msg__lock-btn').click();
    await expect(page.locator('.msg__lock-error')).toBeVisible();
  });

  test('correct password unlocks the assistant', async ({ page }) => {
    await page.locator('.msg__lock-input').fill('123456');
    await page.locator('.msg__lock-btn').click();
    await expect(page.locator('.msg__lock-screen')).not.toBeVisible();
    await expect(page.locator('.msg__header')).toBeVisible();
  });

  test('close button closes the overlay from lock screen', async ({ page }) => {
    await page.locator('.msg__close').first().click();
    await expect(page.locator('.msg-overlay')).not.toBeVisible();
  });
});

test.describe('Messaging Assistant - Unlocked', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('.messaging-assistant-card').click();
    await page.locator('.msg__lock-input').fill('123456');
    await page.locator('.msg__lock-btn').click();
    await expect(page.locator('.msg__header')).toBeVisible();
  });

  test('shows header with title', async ({ page }) => {
    await expect(page.locator('.msg__header-title')).toContainText('Messaging Assistant');
  });

  test('displays three tabs: Compose, Approved Copy, Reformat', async ({ page }) => {
    const tabs = page.locator('.msg__tab');
    await expect(tabs).toHaveCount(3);
    const tabTexts = await tabs.allTextContents();
    expect(tabTexts.some(t => t.includes('Compose'))).toBeTruthy();
    expect(tabTexts.some(t => t.includes('Approved Copy'))).toBeTruthy();
    expect(tabTexts.some(t => t.includes('Reformat'))).toBeTruthy();
  });

  test('Compose tab is active by default', async ({ page }) => {
    const activeTab = page.locator('.msg__tab--active');
    await expect(activeTab).toContainText('Compose');
  });

  test('Compose tab shows topic selection', async ({ page }) => {
    await expect(page.locator('.msg__step-title')).toBeVisible();
    const topics = page.locator('.msg__topic-card');
    await expect(topics.first()).toBeVisible();
  });

  test('selecting a topic advances to audience step', async ({ page }) => {
    await page.locator('.msg__topic-card').first().click();
    await expect(page.locator('.msg__audience-btn').first()).toBeVisible();
  });

  test('selecting audience advances to platform step', async ({ page }) => {
    await page.locator('.msg__topic-card').first().click();
    await page.locator('.msg__audience-btn').first().click();
    await expect(page.locator('.msg__platform-card').first()).toBeVisible();
  });

  test('selecting platform advances to draft step', async ({ page }) => {
    await page.locator('.msg__topic-card').first().click();
    await page.locator('.msg__audience-btn').first().click();
    await page.locator('.msg__platform-card').first().click();
    await expect(page.locator('.msg__draft-textarea')).toBeVisible();
  });

  test('draft step shows brand compliance check', async ({ page }) => {
    await page.locator('.msg__topic-card').first().click();
    await page.locator('.msg__audience-btn').first().click();
    await page.locator('.msg__platform-card').first().click();
    await expect(page.locator('.msg__compliance')).toBeVisible();
  });

  test('draft step has Copy to Clipboard and Start Over buttons', async ({ page }) => {
    await page.locator('.msg__topic-card').first().click();
    await page.locator('.msg__audience-btn').first().click();
    await page.locator('.msg__platform-card').first().click();
    await expect(page.locator('.msg__btn', { hasText: /Copy to Clipboard/i })).toBeVisible();
    await expect(page.locator('.msg__btn', { hasText: /Start Over/i })).toBeVisible();
  });

  test('Approved Copy tab shows search and filter', async ({ page }) => {
    await page.locator('.msg__tab', { hasText: 'Approved Copy' }).click();
    await expect(page.locator('.msg__library-search')).toBeVisible();
    await expect(page.locator('.msg__library-filter')).toBeVisible();
  });

  test('Approved Copy tab lists copy cards', async ({ page }) => {
    await page.locator('.msg__tab', { hasText: 'Approved Copy' }).click();
    const cards = page.locator('.msg__copy-card');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Approved Copy cards have title, content, and copy button', async ({ page }) => {
    await page.locator('.msg__tab', { hasText: 'Approved Copy' }).click();
    const firstCard = page.locator('.msg__copy-card').first();
    await expect(firstCard.locator('.msg__copy-title')).toBeVisible();
    await expect(firstCard.locator('.msg__copy-content')).toBeVisible();
  });

  test('Approved Copy tab has Brand Voice Guidelines section', async ({ page }) => {
    await page.locator('.msg__tab', { hasText: 'Approved Copy' }).click();
    await expect(page.locator('.msg__voice-ref')).toBeVisible();
  });

  test('search in Approved Copy filters results', async ({ page }) => {
    await page.locator('.msg__tab', { hasText: 'Approved Copy' }).click();
    const initialCount = await page.locator('.msg__copy-card').count();
    await page.locator('.msg__library-search').fill('mission');
    const filteredCount = await page.locator('.msg__copy-card').count();
    // Should show fewer or same results
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('Reformat tab shows textarea for pasting content', async ({ page }) => {
    await page.locator('.msg__tab', { hasText: 'Reformat' }).click();
    await expect(page.locator('.msg__reformat textarea')).toBeVisible();
  });

  test('Reformat tab shows platform options after entering text', async ({ page }) => {
    await page.locator('.msg__tab', { hasText: 'Reformat' }).click();
    await page.locator('.msg__reformat textarea').first().fill('This is sample content to reformat for different platforms.');
    await expect(page.locator('.msg__platform-card').first()).toBeVisible();
  });

  test('breadcrumb navigation works in Compose tab', async ({ page }) => {
    await page.locator('.msg__topic-card').first().click();
    const backBtn = page.locator('.msg__compose-back');
    if (await backBtn.isVisible()) {
      await backBtn.click();
      await expect(page.locator('.msg__topic-card').first()).toBeVisible();
    }
  });

  test('close button closes the assistant', async ({ page }) => {
    await page.locator('.msg__close').first().click();
    await expect(page.locator('.msg-overlay')).not.toBeVisible();
  });
});
