import { defineConfig, devices } from "@playwright/test";

// This suite is intended to run only on LambdaTest. Require credentials.
if (!process.env.LT_USERNAME || !process.env.LT_ACCESS_KEY) {
  throw new Error(
    "LambdaTest credentials missing: set LT_USERNAME and LT_ACCESS_KEY. This project is configured to run only on LambdaTest.",
  );
}

function ltWsEndpoint(cap: Record<string, any>) {
  const caps = {
    browserName: cap.browserName || "Chrome",
    browserVersion: cap.browserVersion || "latest",
    "LT:Options": {
      platform: cap.platform || "Windows 11",
      build:
        process.env.GITHUB_WORKFLOW ||
        process.env.GITHUB_RUN_NUMBER ||
        process.env.GITHUB_SHA ||
        "local-build",
      name: cap.name || "intl-tel-input e2e",
      user: process.env.LT_USERNAME,
      accessKey: process.env.LT_ACCESS_KEY,
      tunnel: true,
      tunnelName: process.env.LT_TUNNEL || "iti-ci",
      network: true,
      video: true,
      console: "error",
      selenium_version: "4.0.0", // ignored by Playwright but accepted by grid
    },
  };
  return (
    "wss://cdp.lambdatest.com/playwright?capabilities=" +
    encodeURIComponent(JSON.stringify(caps))
  );
}

export default defineConfig({
  testDir: "tests-e2e",
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: "http://localhost:4173",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
        connectOptions: {
          wsEndpoint: ltWsEndpoint({ browserName: "Chrome", name: "Desktop Chrome" }),
        },
      },
    },
    // {
    //   name: "Desktop Firefox",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //     connectOptions: {
    //       wsEndpoint: ltWsEndpoint({ browserName: "Firefox", name: "Desktop Firefox" }),
    //     },
    //   },
    // },
    // {
    //   name: "Desktop Safari",
    //   use: {
    //     ...devices["Desktop Safari"],
    //     // Safari maps to WebKit in Playwright/LambdaTest
    //     connectOptions: {
    //       wsEndpoint: ltWsEndpoint({ browserName: "WebKit", platform: "macOS Sonoma", name: "Desktop Safari" }),
    //     },
    //   },
    // },
    // {
    //   name: "Mobile Safari (iPhone 14)",
    //   use: {
    //     ...devices["iPhone 14"],
    //     connectOptions: {
    //       wsEndpoint: ltWsEndpoint({ browserName: "WebKit", platform: "macOS Sonoma", name: "Mobile Safari (iPhone 14)" }),
    //     },
    //   },
    // },
    // {
    //   name: "Mobile Chrome (Pixel 7)",
    //   use: {
    //     ...devices["Pixel 7"],
    //     connectOptions: {
    //       wsEndpoint: ltWsEndpoint({ browserName: "Chrome", name: "Mobile Chrome (Pixel 7)" }),
    //     },
    //   },
    // },
  ],
  webServer: {
    command: "./node_modules/.bin/http-server -p 4173 -c-1 .",
    url: "http://localhost:4173/tests-e2e/fixtures/vanilla.html",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
