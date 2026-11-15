import { defineConfig } from "@playwright/test";

/**
 * Smoke tests against the real site. They run automatically after `npm run deploy`, once
 * scripts/wait-for-deploy.ts has seen the new build go live.
 *
 *   npm run test:live                                 check whatever is live now
 *   LIVE_URL=http://localhost:4321 npm run test:live  check another server instead
 */
export default defineConfig({
  testDir: "./tests/live",
  reporter: "list",
  use: { baseURL: process.env.LIVE_URL ?? "https://jaredgiangrasso.com", channel: "chrome" },
});
