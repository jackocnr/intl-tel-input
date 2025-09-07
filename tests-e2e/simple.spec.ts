import { test, expect } from "@playwright/test";

test.describe("basic usage test with vanilla plugin", () => {
  test("can select country and type number and getNumber works", async ({ page }) => {
    // Load vanilla fixture page
    await page.goto("/tests-e2e/fixtures/vanilla.html");

    const input = page.locator("#phone");
    const selectedCountry = await page.locator(".iti__selected-country");

    // no country is selected by default
    await expect(selectedCountry).toHaveAttribute("title", "Select country");

    // open country dropdown
    await selectedCountry.click();

    // select US
    await page.locator(".iti__country-list li.iti__country", { hasText: "United States" }).click();

    // the selected country should update to US
    await expect(selectedCountry).toHaveAttribute("title", "United States");

    // Type a US number in national format in the input
    await input.pressSequentially("4155552671");

    // the input value should have formatting applied (format-as-you-type)
    await expect(input).toHaveValue("(415) 555-2671");

    // Calling getNumber should return the full E.164 number
    const e164 = await page.evaluate(() => (window as any).iti.getNumber());
    expect(e164).toBe("+14155552671");
  });
});
