# Online CV — Le Viet Hai Dang

English-only static portfolio presenting software testing experience and project case studies.

## Preview

Run `node scripts/build.cjs`, then `node scripts/check.cjs`.
Serve the generated `dist/` directory with a static web server. The site root
opens `/personalinformation/`. Nested paths also work under GitHub Pages' `/CV/` prefix.

## Structure

- `templates/personal.html`: sidebar and personal profile source
- `templates/projects.html`: project overview and case-study source
- `routes.js`: canonical folder paths and page selection
- `scripts/build.cjs`: generates static directory pages in `dist/`
- `scripts/check.cjs`: validates routes, assets and runtime page selection
- `styles.css`: responsive visual system
- `app.js`: sidebar search, project navigation and mobile menu
- `assets/avatar.jpg`: profile photo from the provided reference project

## Publishing

Pushing `main` runs the GitHub Pages workflow. It builds and checks the site,
then uploads only `dist/`; templates and build scripts are not public web pages.
The old `placeholder.html?section=...` URLs are no longer supported.
