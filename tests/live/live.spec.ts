import { expect, test } from "@playwright/test";

// Catches what only the real host can break: missing or unpublished assets,
// an unstyled page, a lost custom domain (CNAME) or HTTPS.
test("live site loads completely and styled, with no broken requests", async ({ page, request }) => {
  const broken: string[] = [];
  page.on("response", (r) => r.status() >= 400 && broken.push(`${r.status()} ${r.url()}`));
  page.on("requestfailed", (r) => broken.push(`failed ${r.url()}`));

  await page.goto(`/?v=${Date.now()}`);
  // Load every lazy image too, then wait for the network to go quiet.
  await page.evaluate(() => document.querySelectorAll("img").forEach((img) => (img.loading = "eager")));
  await page.waitForLoadState("networkidle");

  expect(broken).toEqual([]);
  const unloaded = await page.evaluate(() => [...document.images].filter((i) => !i.naturalWidth).map((i) => i.src));
  expect(unloaded, "images that failed to load").toEqual([]);
  // Uppercase name comes from the stylesheet, so this fails if CSS didn't load.
  await expect(page.getByText("Jared", { exact: true })).toHaveCSS("text-transform", "uppercase");

  const resume = await page.getByRole("link", { name: "Download Resume" }).getAttribute("href");
  expect((await request.get(resume!)).ok(), "résumé PDF").toBe(true);
});
