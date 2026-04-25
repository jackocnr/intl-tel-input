import { test, expect } from "@playwright/test";

test.skip(process.platform !== "linux", "Visual snapshots are Linux-only");

test.describe("visual snapshots", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tests-e2e/fixtures/vanilla.html");

    // Wait for intl-tel-input to initialise and wrap the input.
    await expect(page.locator(".iti")).toBeVisible();
  });

  test("initial render", async ({ page }) => {
    await expect(page).toHaveScreenshot("vanilla-initial.png");
  });

  test("after typing a number", async ({ page }) => {
    const selectedCountry = page.locator(".iti__selected-country");
    const input = page.locator("#phone");

    await selectedCountry.click();
    await page.locator(".iti__country-list li.iti__country", { hasText: "United States" }).click();

    await input.pressSequentially("4155552671");
    await expect(input).toHaveValue("415-555-2671");

    await expect(page).toHaveScreenshot("vanilla-us-number.png");
  });

  test("country search with query", async ({ page }) => {
    await page.locator(".iti__selected-country").click();
    const searchInput = page.locator(".iti__search-input");
    await expect(searchInput).toBeVisible();
    await searchInput.pressSequentially("brit");

    await expect(page).toHaveScreenshot("vanilla-country-search-brit.png");
  });

  test("dropdown with highlighted item", async ({ page }) => {
    await page.locator(".iti__selected-country").click();
    await expect(page.locator(".iti__country-list")).toBeVisible();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");

    await expect(page).toHaveScreenshot("vanilla-dropdown-highlighted.png");
  });

  test("disabled state", async ({ page }) => {
    await page.evaluate(() => (window as any).iti.setNumber("+14155552671"));
    await page.evaluate(() => (window as any).iti.setDisabled(true));

    await expect(page).toHaveScreenshot("vanilla-disabled.png");
  });

  test("readonly state", async ({ page }) => {
    await page.evaluate(() => (window as any).iti.setNumber("+14155552671"));
    await page.evaluate(() => (window as any).iti.setReadonly(true));

    await expect(page).toHaveScreenshot("vanilla-readonly.png");
  });
});

test.describe("visual snapshots - useFullscreenPopup", () => {

  test("fullscreen popup open", async ({ page }) => {
    await page.goto("/tests-e2e/fixtures/vanilla-fullscreen.html");
    await expect(page.locator(".iti")).toBeVisible();

    await page.locator(".iti__selected-country").click();
    await expect(page.locator(".iti__country-list")).toBeVisible();

    await expect(page).toHaveScreenshot("vanilla-fullscreen-popup-open.png");
  });
});

test.describe("visual snapshots - separateDialCode", () => {

  test("initial render", async ({ page }) => {
    await page.goto("/tests-e2e/fixtures/vanilla-separate-dial-code.html");
    await expect(page.locator(".iti")).toBeVisible();

    await expect(page).toHaveScreenshot("vanilla-separate-dial-code.png");
  });

  test("longest dial code", async ({ page }) => {
    await page.goto("/tests-e2e/fixtures/vanilla-separate-dial-code-long.html");
    await expect(page.locator(".iti")).toBeVisible();

    await expect(page).toHaveScreenshot("vanilla-separate-dial-code-long.png");
  });
});

test.describe("visual snapshots - allowDropdown=false", () => {

  test("initial render", async ({ page }) => {
    await page.goto("/tests-e2e/fixtures/vanilla-allow-dropdown-false.html");
    await expect(page.locator(".iti")).toBeVisible();

    await expect(page).toHaveScreenshot("vanilla-allow-dropdown-false.png");
  });
});

test.describe("visual snapshots - showFlags=false", () => {

  test("country selected with dropdown open", async ({ page }) => {
    await page.goto("/tests-e2e/fixtures/vanilla-no-flags.html");
    await expect(page.locator(".iti")).toBeVisible();

    await page.locator(".iti__selected-country").click();
    await expect(page.locator(".iti__country-list")).toBeVisible();

    await expect(page).toHaveScreenshot("vanilla-no-flags-dropdown-open.png");
  });
});

test.describe("visual snapshots - RTL", () => {

  test("dropdown open with arabic locale", async ({ page }) => {
    await page.goto("/tests-e2e/fixtures/vanilla-rtl.html");
    await expect(page.locator(".iti")).toBeVisible();

    await page.locator(".iti__selected-country").click();
    await expect(page.locator(".iti__country-list")).toBeVisible();

    await expect(page).toHaveScreenshot("vanilla-rtl-dropdown-open.png");
  });
});

test.describe("visual snapshots - narrow container", () => {

  test("long country name in narrow container", async ({ page }) => {
    await page.goto("/tests-e2e/fixtures/vanilla-narrow.html");
    await expect(page.locator(".iti")).toBeVisible();

    await page.locator(".iti__selected-country").click();
    await expect(page.locator(".iti__country-list")).toBeVisible();

    await expect(page).toHaveScreenshot("vanilla-narrow.png");
  });
});

test.describe("visual snapshots - dropdown above input", () => {

  test("dropdown appears above when input is near bottom of viewport", async ({ page }) => {
    await page.goto("/tests-e2e/fixtures/vanilla-bottom.html");
    await expect(page.locator(".iti")).toBeVisible();

    await page.locator(".iti__selected-country").click();
    await expect(page.locator(".iti__country-list")).toBeVisible();

    await expect(page).toHaveScreenshot("vanilla-dropdown-above.png");
  });

  test("dropdown above with single search result", async ({ page }) => {
    await page.goto("/tests-e2e/fixtures/vanilla-bottom.html");
    await expect(page.locator(".iti")).toBeVisible();

    await page.locator(".iti__selected-country").click();
    const searchInput = page.locator(".iti__search-input");
    await expect(searchInput).toBeVisible();
    await searchInput.pressSequentially("france");

    await expect(page).toHaveScreenshot("vanilla-dropdown-above-single-result.png");
  });
});

test.describe("visual snapshots - countrySearch=false", () => {

  test("dropdown open without search", async ({ page }) => {
    await page.goto("/tests-e2e/fixtures/vanilla-country-search-false.html");
    await expect(page.locator(".iti")).toBeVisible();

    await page.locator(".iti__selected-country").click();
    await expect(page.locator(".iti__country-list")).toBeVisible();

    await expect(page).toHaveScreenshot("vanilla-country-search-false-dropdown-open.png");
  });
});

test.describe("visual snapshots - fixDropdownWidth=false", () => {

  test("dropdown auto-sized to content", async ({ page }) => {
    await page.goto("/tests-e2e/fixtures/vanilla-fix-dropdown-width-false.html");
    await expect(page.locator(".iti")).toBeVisible();

    await page.locator(".iti__selected-country").click();
    await expect(page.locator(".iti__country-list")).toBeVisible();

    await expect(page).toHaveScreenshot("vanilla-fix-dropdown-width-false.png");
  });
});
