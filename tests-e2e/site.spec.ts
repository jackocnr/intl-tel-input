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

    await page.locator("#opt_allowNumberExtensions").check();

    await expect(codeBlock).not.toHaveText(initialCode);
    await expect(codeBlock).toContainText("allowNumberExtensions");
  });

  test("toggling separateDialCode updates the Live Demo", async ({ page }) => {
    await page.goto(`${SITE}/playground.html`);

    // The playground enables separateDialCode by default, so the dial-code element is present on load.
    await expect(page.locator(".iti__selected-dial-code")).toHaveCount(1);

    await page.locator("#opt_separateDialCode").uncheck();

    // Re-init is debounced (~100ms) and async, so wait for the new DOM to settle.
    await expect(page.locator(".iti__selected-dial-code")).toHaveCount(0);

    await page.locator("#opt_separateDialCode").check();
    await expect(page.locator(".iti__selected-dial-code")).toHaveCount(1);

    await page.locator(".iti__selected-country").first().click();
    await page.locator(".iti__country-list li.iti__country", { hasText: "United Kingdom" }).click();

    const dialCode = page.locator(".iti__selected-dial-code");
    await expect(dialCode).toBeVisible();
    await expect(dialCode).toHaveText("+44");
  });
});

test.describe("site nav — mobile layout", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hamburger sits top-left and opens a left-anchored sidebar", async ({ page }) => {
    await page.goto(`${SITE}/`);

    const hamburger = page.locator(".navbar-toggler");
    await expect(hamburger).toBeVisible();
    await expect(page.locator(".bd-navbar-nav")).toBeHidden();

    const vw = page.viewportSize()!.width;
    const hb = (await hamburger.boundingBox())!;
    expect(hb.x).toBeLessThan(vw * 0.25);
    expect(hb.y).toBeLessThan(80);

    const sidebar = page.locator("#itiMobileNav");
    await expect(sidebar).toBeHidden();
    await hamburger.click();
    await expect(sidebar).toBeVisible();

    const sb = (await sidebar.boundingBox())!;
    expect(sb.x).toBeLessThanOrEqual(1);
    expect(sb.width).toBeGreaterThan(vw * 0.5);

    const examples = sidebar.getByRole("button", { name: "Examples" });
    await expect(examples).toBeVisible();

    const submenu = sidebar.locator("#itiMobileExamplesMenu");
    await expect(submenu).toBeHidden();
    await examples.click();
    await expect(submenu).toBeVisible();

    await submenu.locator(".iti-nav-section-toggle").first().click();
    await submenu.locator(".nav-link").first().click();
    await expect(page).toHaveURL(/\/examples\//);
  });
});

test.describe("site nav — desktop layout", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("Examples dropdown lives top-right and navigates on click", async ({ page }) => {
    await page.goto(`${SITE}/`);

    await expect(page.locator(".navbar-toggler")).toBeHidden();

    const examples = page.getByRole("button", { name: "Examples" });
    await expect(examples).toBeVisible();

    const vw = page.viewportSize()!.width;
    const box = (await examples.boundingBox())!;
    expect(box.x).toBeGreaterThan(vw * 0.5);
    expect(box.y).toBeLessThan(80);

    const menu = examples.locator(
      "xpath=following-sibling::ul[contains(@class,'dropdown-menu')]",
    );
    await expect(menu).toBeHidden();
    await examples.click();
    await expect(menu).toBeVisible();

    await menu.locator(".iti-flyout-toggle").first().click();
    await menu.locator(".dropdown-item").first().click();
    await expect(page).toHaveURL(/\/examples\//);
  });
});

test.describe("site example pages", () => {
  test("display-number example parses the initial +44 value and reformats it", async ({ page }) => {
    await page.goto(`${SITE}/examples/javascript-plugin/display-number.html`);

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
