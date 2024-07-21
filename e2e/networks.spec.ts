import { expect, test } from "@playwright/test";

import defineConfig from "../playwright.config";

const baseURL = defineConfig.use?.baseURL;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Networks pages", () => {
  test("has titles", async ({ page }) => {
    await expect(page).toHaveTitle(/cyclemap app/i);
    await expect(page.getByText(/cyclemap/i)).toBeVisible();
    await expect(page.locator("h1")).toContainText(/discover bike networks/i);
  });

  test("should navigate to the details page of a network", async ({ page }) => {
    await page
      .locator("li")
      .filter({ hasText: /bicimad/i })
      .getByRole("link")
      .click();
    await expect(page).toHaveURL(baseURL + "/bicimad");
    await expect(page.getByRole("heading", { name: /bicimad/i })).toBeVisible();
  });

  test("should render filtered network list by search param with 1 network", async ({
    page,
  }) => {
    await page.goto("/?search=bicimad");
    await page.getByRole("link", { name: /details/i }).click();
    await expect(page).toHaveURL(baseURL + "/bicimad");
  });

  test("should render filtered network list with 1 network by typing in searchbox", async ({
    page,
  }) => {
    await page
      .getByRole("searchbox", { name: /search network/i })
      .fill("bicimad");
    await page.waitForURL(baseURL + "/?search=bicimad");
    await page.getByRole("link", { name: /details/i }).click();
    await expect(page).toHaveURL(baseURL + "/bicimad");
  });
});
