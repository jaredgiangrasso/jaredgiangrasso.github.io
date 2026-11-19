import { expect, test, type Page } from "@playwright/test";
import { bio, projects, resume, title } from "./fixtures";

/**
 * Content + behaviour contract for jaredgiangrasso.com.
 * Selectors use visible text, roles, and asset names only (no framework-specific ids/classes),
 * so these must pass unchanged before and after the Astro migration.
 */

/** Finds the screenshot whose asset name contains `slug`. */
const media = (page: Page, slug: string) => page.locator(`img[src*="${slug}"]`).first();

/** href of the link a click at the centre of `locator` would hit, or null if none. */
async function hrefAtCentre(page: Page, locator: ReturnType<Page["locator"]>) {
  await locator.scrollIntoViewIfNeeded();
  const box = (await locator.boundingBox())!;
  return page.evaluate(
    ([x, y]) => document.elementFromPoint(x, y)?.closest("a")?.getAttribute("href") ?? null,
    [box.x + box.width / 2, box.y + box.height / 2],
  );
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("document head", () => {
  test("has the site title", async ({ page }) => {
    await expect(page).toHaveTitle(title);
  });

  test("links favicons and manifest that all resolve", async ({ page, request }) => {
    const links = {
      'link[rel="icon"][sizes="16x16"]': "image/png",
      'link[rel="icon"][sizes="32x32"]': "image/png",
      'link[rel="apple-touch-icon"][sizes="180x180"]': "image/png",
    };
    for (const [selector, type] of Object.entries(links)) {
      const href = await page.locator(selector).getAttribute("href");
      expect(href, selector).toBeTruthy();
      // Bundlers may inline small icons as data URIs; those are fine as long as they're the right type.
      if (href!.startsWith("data:")) {
        expect(href).toMatch(new RegExp(`^data:${type}`));
        continue;
      }
      const res = await request.get(href!);
      expect(res.ok(), `${selector} -> ${href}`).toBe(true);
      expect(res.headers()["content-type"]).toContain(type);
    }
    // Two manifests exist today (CRA's public/manifest.json and the favicon site.webmanifest);
    // what matters is that every declared manifest resolves.
    const manifests = await page.locator('link[rel="manifest"]').evaluateAll((els) => els.map((e) => e.getAttribute("href")!));
    expect(manifests.length).toBeGreaterThan(0);
    for (const href of manifests) expect((await request.get(href)).ok(), href).toBe(true);
  });
});

test.describe("intro", () => {
  test("shows the name", async ({ page }) => {
    await expect(page.getByText("Jared", { exact: true })).toBeVisible();
    await expect(page.getByText("Giangrasso", { exact: true })).toBeVisible();
  });

  test("shows the headshot", async ({ page }) => {
    const img = page.locator('img[src*="Headshot"]');
    await expect(img).toBeVisible();
    expect(await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  });

  test("shows both bio paragraphs on desktop", async ({ page }) => {
    for (const paragraph of bio) await expect(page.getByText(paragraph)).toBeVisible();
  });

  test("hides the second bio paragraph on small phones", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.getByText(bio[0])).toBeVisible();
    await expect(page.getByText(bio[1])).toBeHidden();
  });

  test("offers the résumé as a PDF download", async ({ page, request }) => {
    const link = page.getByRole("link", { name: resume.label });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("download", resume.downloadName);
    const href = await link.getAttribute("href");
    expect(href).toMatch(/\.pdf$/);
    const res = await request.get(href!);
    expect(res.ok()).toBe(true);
    expect(res.headers()["content-type"]).toContain("application/pdf");
  });
});

test.describe("projects", () => {
  test("lists all projects, numbered, in order", async ({ page }) => {
    const text = await page.locator("body").innerText();
    let last = -1;
    projects.forEach((p, i) => {
      const at = text.indexOf(p.name);
      expect(at, `${p.name} present`).toBeGreaterThan(-1);
      expect(at, `${p.name} after previous project`).toBeGreaterThan(last);
      last = at;
      expect(text).toContain(`#00${i + 1}`);
    });
    expect(text).not.toContain(`#00${projects.length + 1}`);
  });

  for (const [i, p] of projects.entries()) {
    test(`#00${i + 1} ${p.name}: title, stack, description, screenshot`, async ({ page }) => {
      // Each project's text must sit in its own section of the page (between its title and the next one),
      // which checks grouping without depending on markup.
      const text = await page.locator("body").innerText();
      const start = text.indexOf(p.name);
      const next = projects[i + 1] ? text.indexOf(projects[i + 1].name, start + 1) : text.length;
      const section = text.slice(start, next);
      expect(start).toBeGreaterThan(-1);
      expect(section).toContain(`#00${i + 1}`);
      expect(section).toContain(p.tools);
      expect(section).toContain(p.description);
      await expect(media(page, p.slug)).toBeAttached();
    });

    test(`#00${i + 1} ${p.name}: links`, async ({ page }) => {
      const primary = p.demoLink ?? p.gitLink ?? null;
      const titleLink = page.getByRole("heading", { name: p.name }).getByRole("link");

      if (!primary) {
        await expect(titleLink).toHaveCount(0);
        expect(await hrefAtCentre(page, media(page, p.slug)), "unlinked card").toBeNull();
        return;
      }

      // One link per card: the title, named after the project, opening safely in a new tab (and saying so).
      await expect(titleLink).toHaveAttribute("href", primary);
      await expect(titleLink).toHaveAttribute("target", "_blank");
      await expect(titleLink).toHaveAttribute("rel", /noopener/);
      await expect(titleLink).toHaveAccessibleName(`${p.name} (opens in new tab)`);
      await expect(page.locator(`a[href="${primary}"]`)).toHaveCount(1);

      // ...but the whole card is clickable: the screenshot and the description both hit that link.
      expect(await hrefAtCentre(page, media(page, p.slug)), "click on screenshot").toBe(primary);
      expect(await hrefAtCentre(page, page.getByText(p.description, { exact: true })), "click on description").toBe(primary);

      // Projects with both a demo and public source get one extra, separate GitHub link, clickable above the card link.
      if (p.gitLink && p.gitLink !== primary) {
        const github = page.getByRole("link", { name: `${p.name} on GitHub (opens in new tab)` });
        await expect(github).toHaveAttribute("href", p.gitLink);
        expect(await hrefAtCentre(page, github), "click on GitHub icon").toBe(p.gitLink);
      }
    });
  }

  test("only projects with public source show a GitHub link", async ({ page }) => {
    const githubLinks = await page.locator('a[href*="github.com"]').evaluateAll((els) => els.map((e) => e.getAttribute("href")));
    expect(githubLinks).toEqual(projects.filter((p) => p.gitLink).map((p) => p.gitLink));
  });

  test("project screenshots are images marked decorative (the card title names the project)", async ({ page }) => {
    for (const p of projects) {
      await expect(page.locator(`img[src*="${p.slug}"]`), p.name).toHaveCount(1);
      await expect(page.locator(`img[src*="${p.slug}"]`), p.name).toHaveAttribute("alt", "");
    }
  });
});

test.describe("layout behaviour", () => {
  for (const viewport of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "phone", width: 390, height: 844 },
  ]) {
    test(`${viewport.name}: intro stays in place while the projects scroll`, async ({ page }) => {
      await page.setViewportSize(viewport);
      const name = page.getByText("Jared", { exact: true });
      const before = (await name.boundingBox())!;

      await page.getByText(projects.at(-1)!.name, { exact: true }).scrollIntoViewIfNeeded();

      await expect(page.getByText(projects.at(-1)!.description, { exact: true })).toBeInViewport();
      await expect(page.getByText(projects[0].name, { exact: true })).not.toBeInViewport();
      await expect(name).toBeInViewport();
      const after = (await name.boundingBox())!;
      expect(Math.abs(after.y - before.y), "intro did not move").toBeLessThan(2);
    });
  }

  // Regressions from the original CRA layout (html { overflow: hidden } + an inner scroll container),
  // fixed in the Astro migration by letting the document scroll.
  test("desktop: mouse wheel over the intro scrolls the projects", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const box = (await page.getByText("Jared", { exact: true }).boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.wheel(0, 2000);
    await expect(page.getByText(projects[0].name, { exact: true })).not.toBeInViewport();
  });

  test("desktop: keyboard (Page Down) scrolls the projects", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.keyboard.press("PageDown");
    await page.keyboard.press("PageDown");
    await expect(page.getByText(projects[0].name, { exact: true })).not.toBeInViewport();
  });
});

test("loads without errors or broken requests", async ({ page }) => {
  const problems: string[] = [];
  page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
  page.on("console", (m) => m.type() === "error" && problems.push(`console: ${m.text()}`));
  page.on("response", (r) => r.status() >= 400 && problems.push(`${r.status()} ${r.url()}`));
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(problems).toEqual([]);
});
