## Personal Site

This repository contains the source code for Jared Giangrasso’s personal website, built as a single-page React app.

### Tech Stack & Infrastructure

- **Frontend**: React (Create React App, `react-scripts`)
- **Styling & Layout**: Standard CSS (see `src/App.css` and related styles)
- **Icons**: Font Awesome (`@fortawesome/*` React bindings)
- **Head / Meta Management**: `react-helmet`
- **Build Tooling**: `react-scripts` (webpack/Babel under the hood)
- **Hosting / Deployment**: GitHub Pages (configured via `gh-pages` and the `homepage` field in `package.json`)

### Getting Started (Local Development)

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the development server**
   ```bash
   npm start
   ```
   This runs the app in development mode (Create React App default) and opens it at `http://localhost:3000/`. The page reloads automatically as you edit source files.

### Available NPM Scripts

- **`npm start`**: Run the local development server.
- **`npm test`**: Run the test runner in watch mode (Create React App default).
- **`npm run build`**: Create a production build in the `build/` directory.
- **`npm run deploy`**: Build the app and publish the contents of `build/` to GitHub Pages (branch configured in `package.json`).

### Deployment Details

- **Target**: GitHub Pages, with a custom domain configured for `jaredgiangrasso.com`.
- **Process**:
  - `npm run build` is executed via the `predeploy` script.
  - `gh-pages` publishes the `build/` directory to the configured branch (currently `master`).
  - GitHub Pages serves the static assets, and DNS for the custom domain points to GitHub Pages.

### Project Structure (High-Level)

- **`src/App.js`**: Top-level React component, sets up document metadata and composes the main sections of the site.
- **`src/Info.js`, `src/CardViewer.js`**: Core presentation components for profile/info and content cards.
- **`src/Images/`**: Favicons, icons, and other image assets.
- **`src/App.css` and related styles**: Global styling and layout.

### Development Notes

- This project uses an older version of Create React App and dependencies; if you upgrade Node or major packages, test the dev server and build pipeline carefully.
- For SEO and social sharing tweaks, update the tags managed by `react-helmet` in `src/App.js` and any related components.

