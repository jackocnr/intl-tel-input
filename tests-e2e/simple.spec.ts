import { test, expect } from "@playwright/test";

test.describe("basic usage test with vanilla library", () => {
  test("ignores country selection after an open input becomes disabled", async ({ page }) => {
    await page.goto("/tests-e2e/fixtures/vanilla.html");

    const input = page.locator("#phone");
    const trigger = page.locator(".iti__selected-country");
    const unitedKingdom = page.locator(".iti__country[data-iso2='gb']");
    const changes = await page.evaluateHandle(() => {
      const iti = (window as any).iti;
      iti.setSelectedCountry("us");
      const countries: string[] = [];
      document.querySelector("#phone")!.addEventListener("countrychange", () => {
        countries.push(iti.getSelectedCountry().iso2);
      });
      return countries;
    });

    await trigger.click();
    await expect(unitedKingdom).toBeVisible();
    await page.evaluate(() => (window as any).iti.setDisabled(true));
    await expect(input).toBeDisabled();
    await unitedKingdom.click();

    await expect(trigger).toHaveAttribute("title", "United States");
    expect(await changes.jsonValue()).toEqual([]);

    await page.evaluate(() => (window as any).iti.setDisabled(false));
    await unitedKingdom.click();
    await expect(trigger).toHaveAttribute("title", "United Kingdom");
    expect(await changes.jsonValue()).toEqual(["gb"]);
  });

  test("can select country and type number and getNumber works", async ({ page }) => {
    // Load vanilla fixture page
    await page.goto("/tests-e2e/fixtures/vanilla.html");

    const input = page.locator("#phone");
    const selectedCountry = await page.locator(".iti__selected-country");

    // no country is selected by default
    await expect(selectedCountry).toHaveAttribute("title", "Select country for phone number");

    // open country dropdown
    await selectedCountry.click();

    // select US
    await page.locator(".iti__country-list li.iti__country", { hasText: "United States" }).click();

    // the selected country should update to US
    await expect(selectedCountry).toHaveAttribute("title", "United States");

    // Type a US number in national format in the input
    await input.pressSequentially("4155552671");

    // the input value should have formatting applied (format-as-you-type)
    await expect(input).toHaveValue("415-555-2671");

    // Calling getNumber should return the full E.164 number
    const e164 = await page.evaluate(() => (window as any).iti.getNumber());
    expect(e164).toBe("+14155552671");
  });
});
