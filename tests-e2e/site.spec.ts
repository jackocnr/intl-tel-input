import { test, expect } from "@playwright/test";

const SITE = "http://localhost:4176";

test.describe("site homepage demo", () => {
  test("initialises plugin and shows valid number in live results", async ({ page }) => {
    await page.goto(`${SITE}/`);

    const input = page.locator("#phone");
    await expect(input).toHaveClass(/iti__tel-input/);

    const selectedCountry = page.locator(".iti__selected-country");
    await selectedCountry.click();
    await page.locator(".iti__country-list li.iti__country", { hasText: "United States" }).click();

    await input.pressSequentially("4155552671");

    await expect(page.locator(".iti-live-results")).toHaveText(/Valid number:\s*\+14155552671/);
  });
});

test.describe("site playground", () => {
  test("typing in the demo input updates live results", async ({ page }) => {
    await page.goto(`${SITE}/playground.html`);

    const input = page.locator("#playgroundPhone");
    await expect(input).toHaveClass(/iti__tel-input/);

    await page.locator(".iti__selected-country").first().click();
    await page.locator(".iti__country-list li.iti__country", { hasText: "United Kingdom" }).click();

    await input.pressSequentially("7400123456");

    await expect(page.locator(".iti-live-results")).toHaveText(/Valid number:\s*\+447400123456/);
  });

  test("init code block reflects a non-default option", async ({ page }) => {
    await page.goto(`${SITE}/playground.html`);

    const codeBlock = page.locator("#playgroundInitCode");
    const initialCode = (await codeBlock.textContent()) || "";

    await page.locator("#opt_separateDialCode").check();

    await expect(codeBlock).not.toHaveText(initialCode);
    await expect(codeBlock).toContainText("separateDialCode");
  });

  test("toggling separateDialCode updates the Live Demo", async ({ page }) => {
    await page.goto(`${SITE}/playground.html`);

    // The dial-code element shouldn't exist in the default configuration.
    await expect(page.locator(".iti__selected-dial-code")).toHaveCount(0);

    await page.locator("#opt_separateDialCode").check();

    // Re-init is debounced (~100ms) and async, so wait for the new DOM to settle.
    await expect(page.locator(".iti__selected-dial-code")).toHaveCount(1);

    await page.locator(".iti__selected-country").first().click();
    await page.locator(".iti__country-list li.iti__country", { hasText: "United Kingdom" }).click();

    const dialCode = page.locator(".iti__selected-dial-code");
    await expect(dialCode).toBeVisible();
    await expect(dialCode).toHaveText("+44");
  });
});

test.describe("site example pages", () => {
  test("display-number example parses the initial +44 value and reformats it", async ({ page }) => {
    await page.goto(`${SITE}/examples/display-number.html`);

    const input = page.locator("#phone");
    await expect(input).toHaveClass(/iti__tel-input/);

    // The page hardcodes value="+447733312345" and inits without initialCountry.
    // Once utils load, the plugin should parse the +44 prefix, switch to UK,
    // and reformat the value into national format (no leading "+").
    await expect(page.locator(".iti__selected-country")).toHaveAttribute(
      "title",
      /United Kingdom/,
    );
    await expect(input).not.toHaveValue(/^\+/);
    await expect(input).toHaveValue(/7733/);
  });
});
