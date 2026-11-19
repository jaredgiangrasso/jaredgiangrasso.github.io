import { defineConfig } from "@playwright/test";

/**
 * Smoke tests against the real site. They run in CI after each deploy (see .github/workflows/deploy.yml).
 *
 *   npm run test:live                                 check whatever is live now
 *   LIVE_URL=http://localhost:4321 npm run test:live  check another server instead
 */
export default defineConfig({
  testDir: "./tests/live",
  reporter: "list",
  use: {
    baseURL: process.env.LIVE_URL ?? "https://jaredgiangrasso.com",
    // Locally: the installed Chrome. In CI: Playwright's bundled Chromium.
    channel: process.env.CI ? undefined : "chrome",
  },
});
