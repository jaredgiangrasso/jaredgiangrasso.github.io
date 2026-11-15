import { defineConfig } from "@playwright/test";

/**
 * Post-deploy check against the real site (runs automatically after `npm run deploy`).
 * First waits until GitHub Pages is serving the build in dist/, then checks it loads correctly.
 *
 *   npm run test:live       just the checks, against whatever is live now
 */
export default defineConfig({
  testDir: "./tests/live",
  reporter: "list",
  use: { baseURL: process.env.LIVE_URL ?? "https://jaredgiangrasso.com", channel: "chrome" },
  projects: [
    { name: "wait-for-deploy", testMatch: "wait-for-deploy.spec.ts", timeout: 10 * 60_000 },
    { name: "live", testMatch: "live.spec.ts", dependencies: ["wait-for-deploy"] },
  ],
});
