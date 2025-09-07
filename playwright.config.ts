import { defineConfig, devices } from "@playwright/test";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pwVersion = require("playwright/package.json").version;

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
      // Help LT grid match the client version
      playwrightClientVersion: pwVersion,
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
  // You have 2 parallel on HyperExecute Cloud (Multi OS)
  workers: 2,
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
          wsEndpoint: ltWsEndpoint({ browserName: "Chrome", platform: "Windows 11", name: "Desktop Chrome" }),
        },
      },
    },
    {
      name: "Desktop Safari",
      use: {
        ...devices["Desktop Safari"],
        // Safari maps to WebKit in Playwright/LambdaTest
        connectOptions: {
          wsEndpoint: ltWsEndpoint({ browserName: "WebKit", platform: "macOS Sonoma", name: "Desktop Safari" }),
        },
      },
    },
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
