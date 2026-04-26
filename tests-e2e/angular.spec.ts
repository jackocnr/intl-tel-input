import { test, expect } from "@playwright/test";

test.describe("angular component demo", () => {
  test("mounts and formats a number", async ({ page }) => {
    await page.goto("/packages/angular/demo/simple/index.html");

    const input = page.locator("input[type=\"tel\"]");
    await expect(input).toBeVisible();

    // Wait for plugin to initialise.
    await expect(page.locator(".iti")).toBeVisible();

    // Should default to US per demo initOptions.
    const selectedCountry = page.locator(".iti__selected-country");
    await expect(selectedCountry).toHaveAttribute("title", "United States");

    await input.pressSequentially("4155552671");
    await expect(input).toHaveValue("415-555-2671");
  });
});
