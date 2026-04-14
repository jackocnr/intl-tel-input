import { test, expect } from "@playwright/test";

test.describe("visual snapshots", () => {
  test.skip(
    process.platform !== "linux",
    "Visual snapshots are recorded on Linux to avoid cross-platform rendering diffs.",
  );
  test.beforeEach(async ({ page }) => {
    await page.goto("/tests-e2e/fixtures/vanilla.html");

    // Wait for intl-tel-input to initialise and wrap the input.
    await expect(page.locator(".iti")).toBeVisible();
  });

  test("initial render", async ({ page }) => {
    await expect(page).toHaveScreenshot("vanilla-initial.png");
  });

  test("after selecting a country", async ({ page }) => {
    const selectedCountry = page.locator(".iti__selected-country");

    await selectedCountry.click();
    await page.locator(".iti__country-list li.iti__country", { hasText: "United States" }).click();

    await expect(selectedCountry).toHaveAttribute("title", "United States");

    await expect(page).toHaveScreenshot("vanilla-us-selected.png");
  });

  test("after typing a number", async ({ page }) => {
    const selectedCountry = page.locator(".iti__selected-country");
    const input = page.locator("#phone");

    await selectedCountry.click();
    await page.locator(".iti__country-list li.iti__country", { hasText: "United States" }).click();

    await input.pressSequentially("4155552671");
    await expect(input).toHaveValue("(415) 555-2671");

    await expect(page).toHaveScreenshot("vanilla-us-number.png");
  });

  test("dropdown open", async ({ page }) => {
    await page.locator(".iti__selected-country").click();
    await expect(page.locator(".iti__country-list")).toBeVisible();

    await expect(page).toHaveScreenshot("vanilla-dropdown-open.png");
  });
});

test.describe("visual snapshots - useFullscreenPopup", () => {
  test.skip(
    process.platform !== "linux",
    "Visual snapshots are recorded on Linux to avoid cross-platform rendering diffs.",
  );

  test("fullscreen popup open", async ({ page }) => {
    await page.goto("/tests-e2e/fixtures/vanilla-fullscreen.html");
    await expect(page.locator(".iti")).toBeVisible();

    await page.locator(".iti__selected-country").click();
    await expect(page.locator(".iti__country-list")).toBeVisible();

    await expect(page).toHaveScreenshot("vanilla-fullscreen-popup-open.png");
  });
});
