import { expect, test, type Page } from "@playwright/test";
import { projects } from "./fixtures";

/**
 * Visual regression: the migrated site must look the same as the current one.
 * One viewport per CSS breakpoint band (>1200, 900–1200, 600–900, <600), each captured
 * at the top, scrolled to the last project, and at the very bottom of the page.
 *
 * Baselines are OS/browser-specific (they're generated on Windows + Chrome).
 * Regenerate deliberately with: npm run test:update
 */
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1024, height: 768 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "phone", width: 390, height: 844 },
];

/**
 * Waits for fonts and for every image that should be visible to finish loading.
 * Lazy images far off-screen never start loading, so each wait is capped; call again after scrolling.
 */
async function settle(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(async () => {
    await document.fonts.ready;
    const loaded = (img: HTMLImageElement) =>
      img.complete && img.naturalWidth > 0
        ? Promise.resolve()
        : Promise.race([img.decode().catch(() => {}), new Promise((r) => setTimeout(r, 5000))]);
    await Promise.all([...document.images].map(loaded));
  });
  await page.waitForLoadState("networkidle");
}

for (const vp of viewports) {
  test.describe(vp.name, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test("top of page", async ({ page }) => {
      await page.goto("/");
      await settle(page);
      await expect(page).toHaveScreenshot(`${vp.name}-top.png`);
    });

    test("scrolled to last project", async ({ page }) => {
      await page.goto("/");
      await settle(page);
      await page.getByText(projects.at(-1)!.description, { exact: true }).scrollIntoViewIfNeeded();
      await settle(page); // lazy images near the new scroll position
      await page.mouse.move(0, 0); // no hover state
      await expect(page).toHaveScreenshot(`${vp.name}-end.png`);
    });

    test("bottom of page", async ({ page }) => {
      await page.goto("/");
      await settle(page);
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await settle(page);
      await page.mouse.move(0, 0);
      await expect(page).toHaveScreenshot(`${vp.name}-bottom.png`);
    });
  });
}
