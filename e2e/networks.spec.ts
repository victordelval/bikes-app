import { expect, test } from "@playwright/test";

import defineConfig from "../playwright.config";

const baseURL = defineConfig.use?.baseURL;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Networks pages", () => {
  test("renders the page with all the titles", async ({ page }) => {
    await expect(page).toHaveTitle(/cyclemap app/i);
    await expect(page.getByText(/cyclemap/i)).toBeVisible();
    await expect(page.locator("h1")).toContainText(/discover bike networks/i);
  });

  test("navigates to the details page of a network", async ({ page }) => {
    await page
      .locator("li")
      .filter({ hasText: /bicimad/i })
      .getByRole("link")
      .click();
    await expect(page).toHaveURL(baseURL + "/bicimad");
    await expect(page.getByRole("heading", { name: /bicimad/i })).toBeVisible();
    await expect(page.locator("h1")).toContainText(/bicimad/i);
  });

  test("renders a total of 790 networks", async ({ page }) => {
    await expect(page.getByRole("listitem")).toHaveCount(790);
  });

  test("renders filtered network list by url search param, with 1 network", async ({
    page,
  }) => {
    await page.goto("/?search=bicimad");

    await expect(page.getByRole("listitem")).toHaveCount(1);
    await expect(page.getByRole("listitem")).toHaveText(/bicimad/i);
  });

  test("renders filtered network list by typing in searchbox, with 1 network", async ({
    page,
  }) => {
    await page
      .getByRole("searchbox", { name: /search network/i })
      .fill("bicimad");
    await page.waitForURL(baseURL + "/?search=bicimad");

    await expect(page.locator("li")).toHaveCount(1);
    await expect(page.getByRole("listitem")).toHaveText(/bicimad/i);
  });

  test("renders filtered network list by url country param, with 66 networks", async ({
    page,
  }) => {
    await page.goto("/?country=ES");

    await expect(page.getByRole("listitem")).toHaveCount(66);
  });

  test("renders filtered network list by selecting a country, with 66 networks", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /country/i }).click();
    await page.getByRole("listbox").getByText(/spain/i).click();

    await expect(page.getByRole("listitem")).toHaveCount(66);
  });

  test("renders filtered country options in filter dropdown", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /country/i }).click();

    // total contries with some networks
    await expect(
      page.getByLabel("selector-with-searchbox-listbox-listitem"),
    ).toHaveCount(57);

    await page
      .getByRole("searchbox", { name: /search country/i })
      .fill("spain");

    await expect(
      page.getByLabel("selector-with-searchbox-listbox-listitem"),
    ).toHaveCount(1);
  });
});

test.describe("Networks use cases", () => {
  test("Filter by country and by seachbox and navigates to the details page", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /country/i }).click();
    await page.getByRole("listbox").getByText(/spain/i).click();

    await page
      .getByRole("searchbox", { name: /search network/i })
      .fill("bicimad");

    await expect(page.getByRole("listitem")).toHaveCount(1);
    await expect(page.getByRole("listitem")).toHaveText(/bicimad/i);

    await page
      .locator("li")
      .filter({ hasText: /bicimad/i })
      .getByRole("link")
      .click();

    await expect(page).toHaveURL(baseURL + "/bicimad");
    await expect(page.getByRole("heading", { name: /bicimad/i })).toBeVisible();
  });
});
