## Personal Site

Source for [jaredgiangrasso.com](https://jaredgiangrasso.com): a single static page built with [Astro](https://astro.build). It ships plain HTML and CSS with no client-side JavaScript.

### Tech Stack & Infrastructure

- **Framework**: Astro (static output) with TypeScript
- **Styling**: component-scoped CSS in each `.astro` file, plus `src/styles/global.css`
- **Images**: `astro:assets` generates responsive WebP sizes at build time
- **Icons**: Font Awesome, rendered to inline SVG at build time (no runtime JS)
- **Tests**: Playwright end-to-end and visual-regression tests against the built site
- **Hosting**: GitHub Pages, deployed by GitHub Actions on every push to `main`

### Getting Started

Requires Node 22.23.4 or newer.

```bash
npm install
npm run dev       # http://localhost:4321
```

### Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run check` | Type-check `.astro` and `.ts` files |
| `npm test` | Build, then run the Playwright tests against the build |
| `npm run test:update` | Regenerate visual baselines. Only do this when a visual change is intended |
| `npm run test:live` | Check the live site (also runs automatically after a deploy) |

### Project Structure

```
src/
  pages/index.astro          page layout (two-column grid, background)
  layouts/Base.astro         <head>: title, favicons, manifest
  components/
    Intro.astro              name, headshot, bio, résumé link
    ProjectList.astro        projects column
    ProjectCard.astro        a single project card
    Icon.astro               Font Awesome icon -> inline SVG
  data/projects.ts           the project list (edit this to add/change projects)
  assets/                    images processed by Astro
  styles/global.css          site-wide base styles
public/                      copied as-is: résumé PDF, favicons, manifest
tests/                       Playwright suite (see below)
  live/                      post-deploy checks against the real site
.github/workflows/           CI: test and deploy, update Linux screenshots
```

**Adding a project:** put the screenshot in `src/assets/projects/`, then add an entry to `src/data/projects.ts`. Also add it to `tests/fixtures.ts`, which is the tests' copy of the site content.

### Tests

The tests never import app code. `npm test` builds the site, serves it with `astro preview` on port 4329, and checks in Chrome what a visitor gets (your installed Chrome locally, Playwright's bundled Chromium in CI). Stop any other `astro preview` first; Astro only allows one per project.

- `tests/site.spec.ts`: content, links, the résumé download, head tags, scrolling behaviour, and no console errors or broken requests.
- `tests/visual.spec.ts`: screenshots at 1440, 1024, 768 and 390px: at the top, scrolled to the last project, and at the very bottom.
- `tests/live/`: smoke tests against https://jaredgiangrasso.com, run after each deploy (config: `playwright.live.config.ts`). They check that every asset loads, the page is styled, and the résumé downloads.

Visual baselines live in `tests/visual.spec.ts-snapshots/`. Fonts render slightly differently on each OS, so there are two sets: `*-win32.png` for local runs on Windows and `*-linux.png` for CI. After an intended visual change, update both:

1. Locally: `npm run test:update`, then review the changed `*-win32.png` images.
2. On GitHub: Actions → **Update Linux screenshots** → Run workflow. Download its `linux-screenshots` artifact (`gh run download <run-id>`), review, copy the images into `tests/visual.spec.ts-snapshots/`, and commit.

### Deployment

Every push to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which you can watch in the repo's Actions tab:

1. **test**: install, type-check, build, run the Playwright suite. A failure stops here, and the test report is attached to the run.
2. **deploy**: publish `dist/` to GitHub Pages (waits until the new version is live).
3. **smoke**: run `tests/live/` against https://jaredgiangrasso.com.

Pull requests run the tests only. To redeploy without a new commit: Actions → **Test and deploy** → Run workflow.

The custom domain is set in the repo's **Settings → Pages**, not in a `CNAME` file.
