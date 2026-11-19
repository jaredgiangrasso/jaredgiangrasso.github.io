import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { projects } from "./fixtures";

/**
 * Accessibility checks (WCAG 2.2 AA). axe covers what can be checked automatically; the other tests
 * cover what axe can't see on this design (focus visibility, the pinned mobile header, text spacing, reflow).
 */

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

const viewports = {
  desktop: { width: 1440, height: 900 },
  laptop: { width: 1024, height: 768 },
  tablet: { width: 768, height: 1024 },
  phone: { width: 390, height: 844 },
  // Landscape phone, and a 1280x1024 screen at 400% zoom.
  "phone landscape": { width: 844, height: 390 },
  "400% zoom": { width: 320, height: 256 },
};

/** Every linked card, in page order, plus the extra GitHub link, after the résumé link. */
const expectedTabStops = [
  "Download Resume (PDF, 102 KB)",
  ...projects.flatMap((p) => {
    const stops: string[] = [];
    if (p.demoLink ?? p.gitLink) stops.push(`${p.name} (opens in new tab)`);
    if (p.gitLink && p.demoLink) stops.push(`${p.name} on GitHub (opens in new tab)`);
    return stops;
  }),
];

/** Accessible name of the focused element (aria-label, else text content incl. visually hidden text). */
const focusedName = (page: Page) =>
  page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    if (!el || el === document.body) return "";
    return (el?.getAttribute("aria-label") ?? el?.textContent ?? "").replace(/\s+/g, " ").trim();
  });

// Transitions off, so focus styles apply instantly and screenshots are stable.
test.use({ reducedMotion: "reduce" });

for (const [name, viewport] of Object.entries(viewports)) {
  test(`${name}: no axe violations`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  });
}

test("keyboard: tab order is the résumé, then each project in order", async ({ page }) => {
  await page.goto("/");
  const names: string[] = [];
  for (let i = 0; i < expectedTabStops.length + 1; i++) {
    await page.keyboard.press("Tab");
    names.push(await focusedName(page));
  }
  // One extra Tab leaves the page (focus returns to the body).
  expect(names).toEqual([...expectedTabStops, ""]);
});

for (const name of ["desktop", "phone"] as const) {
  test(`${name}: every tab stop shows a visible focus indicator`, async ({ page }) => {
    await page.setViewportSize(viewports[name]);
    await page.goto("/");
    for (const stop of expectedTabStops) {
      await page.keyboard.press("Tab");
      expect(await focusedName(page)).toBe(stop);
      const focused = await page.screenshot();
      // Same scroll position, focus removed: something on screen must differ.
      await page.evaluate(() => (document.activeElement as HTMLElement).blur());
      const blurred = await page.screenshot();
      expect(focused.equals(blurred), `focus on "${stop}" is visible`).toBe(false);
      // Restore focus to the same element so the next Tab continues from it.
      await page.keyboard.press("Shift+Tab");
      await page.keyboard.press("Tab");
    }
  });
}

for (const name of ["phone", "phone landscape"] as const) {
  test(`${name}: focused items are not hidden under the header`, async ({ page }) => {
    await page.setViewportSize(viewports[name]);
    await page.goto("/");
    for (const stop of expectedTabStops) {
      await page.keyboard.press("Tab");
      const hidden = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement;
        if (el.closest("header")) return false; // the header's own links
        const r = el.getBoundingClientRect();
        const x = r.left + Math.min(r.width / 2, 20);
        const y = r.top + r.height / 2;
        if (y < 0 || y > innerHeight) return true;
        return !!document.elementFromPoint(x, y)?.closest("header");
      });
      expect(hidden, `"${stop}" covered by the header`).toBe(false);
    }
  });
}

test("short screens: the header doesn't stay pinned over the content", async ({ page }) => {
  for (const name of ["phone landscape", "400% zoom"] as const) {
    await page.setViewportSize(viewports[name]);
    await page.goto("/");
    await page.mouse.wheel(0, 1500);
    await expect(page.getByText("Jared", { exact: true })).not.toBeInViewport();
  }
});

for (const name of ["400% zoom", "phone"] as const) {
  test(`${name}: reflows without horizontal scrolling`, async ({ page }) => {
    await page.setViewportSize(viewports[name]);
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

// WCAG 1.4.12: users may override line, letter, word and paragraph spacing; nothing may overlap or be cut off.
for (const name of ["desktop", "phone", "400% zoom"] as const) {
  test(`${name}: text spacing overrides don't cause overlaps`, async ({ page }) => {
    await page.setViewportSize(viewports[name]);
    await page.goto("/");
    await page.addStyleTag({
      content: `* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
                p { margin-bottom: 2em !important; }`,
    });
    const problems = await page.evaluate(() => {
      const out: string[] = [];
      const overlaps = (a: DOMRect, b: DOMRect) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
      for (const card of document.querySelectorAll("main li")) {
        const img = card.querySelector("img")!.getBoundingClientRect();
        for (const text of card.querySelectorAll("h2, p"))
          if (overlaps(text.getBoundingClientRect(), img)) out.push(`"${text.textContent!.trim()}" overlaps its screenshot`);
      }
      const header = document.querySelector("header")!.getBoundingClientRect();
      for (const el of document.querySelectorAll("header h1, header p, header a"))
        if (getComputedStyle(el).display !== "none" && el.getBoundingClientRect().bottom > header.bottom + 1)
          out.push(`"${el.textContent!.trim().slice(0, 30)}" spills out of the header`);
      return out;
    });
    expect(problems).toEqual([]);
  });
}

test("links are at least 24x24 CSS px to tap", async ({ page }) => {
  await page.setViewportSize(viewports["400% zoom"]);
  await page.goto("/");
  const small = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>("a[href]")]
      .map((a) => {
        // A card's title link is stretched over the whole card.
        const r = (a.closest("li") && !a.getAttribute("aria-label") ? a.closest("li")! : a).getBoundingClientRect();
        return { name: (a.getAttribute("aria-label") ?? a.textContent ?? "").trim(), w: r.width, h: r.height };
      })
      .filter((t) => t.w < 24 || t.h < 24),
  );
  expect(small).toEqual([]);
});
