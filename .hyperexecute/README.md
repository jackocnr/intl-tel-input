# HyperExecute configs

This folder contains two HyperExecute configs to run Playwright E2E on LambdaTest across multiple OSes using 2-way parallelism:

- `win-chrome.yaml`: Windows 11 + Desktop Chrome (parallelism 1)
- `mac-safari.yaml`: macOS Sonoma + Desktop Safari (WebKit) (parallelism 1)

Run them together to utilize your 2 parallel sessions.

## Prerequisites
- Set LT_USERNAME and LT_ACCESS_KEY in HyperExecute secrets or environment.
- Ensure your repo can build with `npm ci && npm run build:ci`.

## Run (CLI examples)
- hyperexecute --config .hyperexecute/win-chrome.yaml --verbose
- hyperexecute --config .hyperexecute/mac-safari.yaml --verbose

Artifacts (test-results and playwright-report) are collected automatically.
