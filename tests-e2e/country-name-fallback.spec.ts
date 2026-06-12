import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

//* Some locales' region display names are missing from Chrome's filtered ICU
//* data, so Intl.DisplayNames silently falls back to English. We ship bundled
//* country-name translations for exactly those locales (see
//* scripts/generate-country-names.js + packages/core/src/js/locale/country-names/).
//*
//* This test runs in real Chromium and guards that the bundled set stays in sync
//* with reality: if a Chromium upgrade fixes one of these locales (or breaks a
//* new one), this fails and tells us to re-run the generator and update the set.

const localeDir = "packages/core/src/js/locale";

const allLocales = fs
  .readdirSync(localeDir)
  .filter((f) => f.endsWith(".ts") && f !== "index.ts" && f !== "types.ts")
  .map((f) => f.replace(/\.ts$/, ""))
  .sort();

const bundledFallbackLocales = fs
  .readdirSync(path.join(localeDir, "country-names"))
  .filter((f) => f.endsWith(".ts"))
  .map((f) => f.replace(/\.ts$/, ""))
  .sort();

test.describe("country name fallback (real Chromium)", () => {
  test("locales Chrome falls back on === locales we bundle fallbacks for", async ({ page }) => {
    await page.goto("/tests-e2e/fixtures/vanilla.html");

    const chromeFails = (
      await page.evaluate((locales) => {
        // Mirrors hasNoBrowserCountryNameData in the playground.
        function hasNoBrowserCountryNameData(locale: string): boolean {
          if (!locale || /^en($|-)/i.test(locale)) {
            return false;
          }
          try {
            const supported = (Intl as any).DisplayNames.supportedLocalesOf([locale]);
            if (supported.length === 0) {
              return true;
            }
            const dn = new (Intl as any).DisplayNames([locale], { type: "region" });
            const en = new (Intl as any).DisplayNames(["en"], { type: "region" });
            return ["US", "FR", "DE", "CN", "RU"].every((iso) => dn.of(iso) === en.of(iso));
          } catch {
            return false;
          }
        }
        return locales.filter(hasNoBrowserCountryNameData);
      }, allLocales)
    ).sort();

    expect(
      chromeFails,
      "Chrome's Intl.DisplayNames fallback set has changed. Re-run `node scripts/generate-country-names.js` after updating FALLBACK_LOCALES, then update packages/core/src/js/locale/country-names/.",
    ).toEqual(bundledFallbackLocales);
  });
});
