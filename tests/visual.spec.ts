import { expect, test, type Page } from "@playwright/test";
import { projects } from "./fixtures";

/**
 * Visual regression: the migrated site must look the same as the current one.
 * One viewport per CSS breakpoint band (>1200, 900–1200, 600–900, <600), each captured
 * at the top and scrolled to the last project.
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

async function settle(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].filter((img) => !img.complete).map((img) => new Promise((r) => (img.onload = img.onerror = r)))
    );
  });
}

// The screen recording may or may not be playing at capture time, so mask it.
const masks = (page: Page) => [page.locator('video:has(source[src*="trending-screen"]), video[src*="trending-screen"]')];

for (const vp of viewports) {
  test.describe(vp.name, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test("top of page", async ({ page }) => {
      await page.goto("/");
      await settle(page);
      await expect(page).toHaveScreenshot(`${vp.name}-top.png`, { mask: masks(page) });
    });

    test("scrolled to last project", async ({ page }) => {
      await page.goto("/");
      await settle(page);
      await page.getByText(projects.at(-1)!.description, { exact: true }).scrollIntoViewIfNeeded();
      await page.mouse.move(0, 0); // no hover state
      await expect(page).toHaveScreenshot(`${vp.name}-end.png`, { mask: masks(page) });
    });
  });
}
