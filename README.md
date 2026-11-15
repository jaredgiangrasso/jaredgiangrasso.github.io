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
| `npm test` | Build, then run the Playwright tests against the build |
| `npm run test:update` | Regenerate visual baselines. Only do this when a visual change is intended |
| `npm run test:live` | Check the live site (also runs automatically after a deploy) |
| `npm run deploy` | Type-check and test, publish `dist/` to GitHub Pages, then check the live site |

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
public/                      copied as-is: résumé PDF, favicons, manifest, CNAME, .nojekyll
scripts/wait-for-deploy.ts  follows a deploy until it is live (see Deployment)
tests/                       Playwright suite (see below)
  live/                      post-deploy checks against the real site
```

**Adding a project:** put the screenshot in `src/assets/projects/`, then add an entry to `src/data/projects.ts`. Also add it to `tests/fixtures.ts`, which is the tests' copy of the site content.

### Tests

The tests never import app code. `npm test` builds the site, serves it with `astro preview` on port 4329, and checks in Chrome what a visitor gets. Stop any other `astro preview` first; Astro only allows one per project.

- `tests/site.spec.ts`: content, links, the résumé download, head tags, scrolling behaviour, and no console errors or broken requests.
- `tests/visual.spec.ts`: screenshots at 1440, 1024, 768 and 390px: at the top, scrolled to the last project, and at the very bottom.
- `tests/live/`: smoke tests against https://jaredgiangrasso.com, run after each deploy (config: `playwright.live.config.ts`). They check that every asset loads, the page is styled, and the résumé downloads.

Visual baselines live in `tests/visual.spec.ts-snapshots/`. They are specific to the OS and browser and were generated on Windows with Chrome. To run in CI, switch `playwright.config.ts` to Playwright's bundled Chromium and generate Linux baselines.

### Deployment

The site's source and the published site live in two GitHub repos:

| Remote | Repo | Contents |
| --- | --- | --- |
| `origin` | `personal-site-dev` | this source code (`git push`) |
| `pages` | `jaredgiangrasso.github.io` | the built site that GitHub Pages serves (`npm run deploy` only) |

In a fresh clone, add the deploy remote once: `git remote add pages https://github.com/jaredgiangrasso/jaredgiangrasso.github.io.git`.

`npm run deploy` runs three steps:

1. **predeploy**: type-check, build and run the full test suite. Any failure stops the deploy.
2. **deploy**: push `dist/` to the `master` branch of the `pages` remote (`jaredgiangrasso.github.io`) using `gh-pages`.
3. **postdeploy**: `scripts/wait-for-deploy.ts` follows the GitHub Pages build for the pushed commit, logging its status and a link to the run. It fails straight away if the build fails, then waits for the live site to serve the new build (usually 1–2 minutes in total). After that, the smoke tests in `tests/live/` run.

Two files in `public/` matter for GitHub Pages:

- `CNAME` keeps the custom domain on each deploy.
- `.nojekyll` stops Pages from running the site through Jekyll, which would drop the `_astro/` folder (all CSS and images). `gh-pages -t` is what makes it include this dotfile.
