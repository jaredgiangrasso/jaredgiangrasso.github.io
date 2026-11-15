import { defineConfig } from "@playwright/test";

/**
 * Black-box tests for the built site. They never import app code: they load the page in Chrome
 * and check what a visitor gets. `npm test` builds the site first (see webServer below).
 *
 * The post-deploy check against the live site has its own config: playwright.live.config.ts.
 */
// Uncommon port on purpose; with reuseExistingServer off, a clash fails loudly instead of
// silently testing whatever else is listening.
const PORT = 4329;

export default defineConfig({
  testDir: "./tests",
  testIgnore: "live/**",
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
    // Always test a fresh production build, served by Astro's own preview server.
    command: `npm run build && npx astro preview --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
