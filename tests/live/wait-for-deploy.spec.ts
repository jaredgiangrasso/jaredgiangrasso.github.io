import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

// GitHub Pages takes a minute or two to publish after a push. Wait until the live page is exactly
// the build in dist/, so live.spec.ts checks the new version. (The query string skips the CDN cache.)
test("GitHub Pages is serving the build in dist/", async ({ request }) => {
  const built = readFileSync("dist/index.html", "utf8");
  await expect
    .poll(async () => (await request.get(`/?v=${Date.now()}`)).text().then((live) => live === built), {
      message: "live index.html matches dist/index.html",
      intervals: [15_000],
      timeout: 9 * 60_000,
    })
    .toBe(true);
});
