## Personal Site

Source for [jaredgiangrasso.com](https://jaredgiangrasso.com): a single static page built with [Astro](https://astro.build). It ships plain HTML and CSS with no client-side JavaScript.

### Tech Stack & Infrastructure

- **Framework**: Astro (static output) with TypeScript
- **Styling**: component-scoped CSS in each `.astro` file, plus `src/styles/global.css`
- **Images**: `astro:assets` generates responsive WebP sizes at build time
- **Icons**: Font Awesome, rendered to inline SVG at build time (no runtime JS)
- **Tests**: Playwright end-to-end and visual-regression tests against the built site
- **Hosting**: GitHub Pages (custom domain via `public/CNAME`)

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
| `npm test` | Run Playwright tests against `dist/` (run `npm run build` first) |
| `npm run test:update` | Regenerate visual baselines. Only do this when a visual change is intended |
| `npm run deploy` | Build and publish `dist/` to GitHub Pages |

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
  assets/                    images and video processed by Astro
  styles/global.css          site-wide base styles
public/                      copied as-is: résumé PDF, favicons, manifest, CNAME
tests/                       Playwright suite (see below)
```

**Adding a project:** put the screenshot (and optional screen recording) in `src/assets/projects/`, then add an entry to `src/data/projects.ts`. Also add it to `tests/fixtures.ts`, which is the tests' copy of the site content.

### Tests

The tests never import app code. They load the built site in Chrome and check what a visitor gets:

- `tests/site.spec.ts`: content, links, the résumé download, head tags, scrolling behaviour, and no console errors or broken requests.
- `tests/visual.spec.ts`: screenshots at 1440, 1024, 768 and 390px, at the top of the page and scrolled to the end.

Visual baselines live in `tests/visual.spec.ts-snapshots/`. They are specific to the OS and browser and were generated on Windows with Chrome. To run in CI, switch `playwright.config.ts` to Playwright's bundled Chromium and generate Linux baselines.

### Deployment

`npm run deploy` builds the site and pushes `dist/` to the `master` branch of the `origin` remote (`jaredgiangrasso.github.io`) using `gh-pages`. `public/CNAME` is included in the build, so the custom domain survives each deploy.
