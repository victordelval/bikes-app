import { expect, test } from "@playwright/test";

import defineConfig from "../playwright.config";

const baseURL = defineConfig.use?.baseURL;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Networks pages", () => {
  test("has titles", async ({ page }) => {
    await expect(page).toHaveTitle(/cyclemap app/i);
    await expect(page.locator("h1")).toContainText(/discover bike networks/i);
  });

  test("should navigate to the details page of a network", async ({ page }) => {
    await page
      .locator("li")
      .filter({ hasText: /network 1/i })
      .getByRole("link")
      .click();
    await expect(page).toHaveURL(baseURL + "/network-1");
    await expect(
      page.getByRole("heading", { name: /network-1/i }),
    ).toBeVisible();
  });
});
