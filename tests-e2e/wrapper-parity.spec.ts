import { test, expect, Page } from "@playwright/test";

// Shared feature-parity suite: every wrapper's /simple/ demo should behave identically
// for the core user journeys (mount, formatting, country change via dropdown, destroy).
// Each target below points at an equivalent demo page served by the framework-specific dev server.

type Target = {
  name: string;
  url: string;
  baseURL?: string;
};

const targets: Target[] = [
  { name: "react", url: "/react/demo/simple/" },
  { name: "angular", url: "/angular/demo/simple/index.html" },
  { name: "vue", url: "/simple/", baseURL: "http://localhost:4174" },
  { name: "svelte", url: "/simple/", baseURL: "http://localhost:4175" },
];

const gotoTarget = async (page: Page, t: Target): Promise<void> => {
  const url = t.baseURL ? new URL(t.url, t.baseURL).toString() : t.url;
  await page.goto(url);
  await expect(page.locator(".iti")).toBeVisible();
};

for (const t of targets) {
  test.describe(`${t.name} wrapper parity`, () => {
    if (t.baseURL) {
      test.use({ baseURL: t.baseURL });
    }

    test("mounts with US default and formats national number", async ({ page }) => {
      await gotoTarget(page, t);
      const input = page.locator('input[type="tel"]');
      await expect(page.locator(".iti__selected-country")).toHaveAttribute("title", "United States");
      await input.pressSequentially("4155552671");
      await expect(input).toHaveValue("415-555-2671");
    });

    test("opens dropdown and selects a different country", async ({ page }) => {
      await gotoTarget(page, t);
      await page.locator(".iti__selected-country").click();
      await expect(page.locator(".iti__dropdown-content")).toBeVisible();
      await page.locator('li[data-country-code="gb"]').first().click();
      await expect(page.locator(".iti__selected-country")).toHaveAttribute("title", /United Kingdom/);
    });

    test("dropdown closes when clicking outside", async ({ page }) => {
      await gotoTarget(page, t);
      await page.locator(".iti__selected-country").click();
      await expect(page.locator(".iti__dropdown-content")).toBeVisible();
      await page.locator("body").click({ position: { x: 5, y: 5 } });
      await expect(page.locator(".iti__dropdown-content")).not.toBeVisible();
    });
  });
}
