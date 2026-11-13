import { defineConfig } from "@playwright/test";

/**
 * Black-box tests for the built site. They never import app code, so the same suite
 * verified both the old CRA build and the Astro build during the migration.
 *
 *   npm test                      build output in ./dist (default)
 *   SITE_DIR=some/dir npm test    any other build output folder
 */
const PORT = 4173;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    // Use the locally installed Chrome rather than downloading a browser.
    // In CI, switch to the bundled Chromium (`npx playwright install chromium`) and drop this.
    channel: "chrome",
  },
  expect: {
    toHaveScreenshot: {
      // Tolerate anti-aliasing noise, but fail on real layout or style drift.
      maxDiffPixelRatio: 0.01,
      animations: "disabled",
      caret: "hide",
    },
  },
  webServer: {
    command: "node tests/serve.mjs",
    env: { PORT: String(PORT), SITE_DIR: process.env.SITE_DIR || "dist" },
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
  },
});
