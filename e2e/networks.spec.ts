import { test, expect } from '@playwright/test';
import defineConfig from '../playwright.config';

const baseURL = defineConfig.use?.baseURL;

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Networks pages', () => {
  test('has titles', async ({ page }) => {
    await expect(page).toHaveTitle(/cyclemap app/i);
    await expect(page.locator('h1')).toContainText(/discover bike networks/i);
  });

  test('should navigate to the details page of a network', async ({ page }) => {
    await page.getByRole('link').click();
    await expect(page).toHaveURL(baseURL + '/bicimad');
    await expect(page.locator('h1')).toContainText(/bicimad/i);
    await expect(page.getByRole('heading', { name: /bicimad/i })).toBeVisible();
  });
});
