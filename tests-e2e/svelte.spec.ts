import { test, expect } from "@playwright/test";

test.describe("svelte component demo", () => {
  test.use({ baseURL: "http://localhost:4175" });

  test("mounts and formats a number", async ({ page }) => {
    await page.goto("/simple/");

    const input = page.locator("input[type=\"tel\"]");
    await expect(input).toBeVisible();

    // Wait for plugin to initialise.
    await expect(page.locator(".iti")).toBeVisible();

    // Should default to US per demo options.
    const selectedCountry = page.locator(".iti__selected-country");
    await expect(selectedCountry).toHaveAttribute("title", "United States");

    await input.pressSequentially("4155552671");
    await expect(input).toHaveValue("415-555-2671");
  });
});
