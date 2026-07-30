# Esco Pride Website — App-First Rework

Static website built for GitHub Pages.

## Strategy

The website now has two jobs:

1. Introduce Esco Pride and drive community members toward the future iPhone and Android app.
2. Recruit and onboard Pride Partners, Welcoming Places, and Online Partners through the business portal.

Live business discovery, maps, Pride Passport activity, Avi Trails, meetup RSVPs, community features, and saved places are intentionally reserved for the mobile app.

## Files

- `index.html` — Full app-first Esco Pride landing page
- `styles.css` — Main responsive design system and landing-page styles
- `site.js` — Navigation, scroll effects, current year, and reveal animations
- `business-signup.html` — Business partner portal and application
- `business-signup.css` — Portal and application styling
- `business-signup.js` — Draft saving, validation, progress, text download, and email preparation
- `assets/avi.webp` — Optimized official Avi artwork used by the website
- `assets/avi.png` — Original full-quality Avi artwork retained for future use

## Publish to GitHub Pages

1. Upload the contents of this folder to the root of the GitHub repository.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**.
4. Select `main` and `/ (root)`.
5. Save and allow GitHub Pages to deploy.

## Current application flow

The static GitHub Pages site cannot securely write applications to a database by itself. Until the shared Esco Pride backend is built, the application:

- Automatically saves a draft in the applicant's browser.
- Validates required information.
- Lets the applicant download a plain-text copy.
- Opens a prepared email addressed to `will@outatinc.com`.

When the app backend is built, replace the mailto step in `business-signup.js` with the shared application API. The website form and app/business dashboard can then use the same database.

## App-store links

The App Store and Google Play treatments are intentionally shown as coming soon. Replace them with live store links once each app is approved.

## Ownership

Esco Pride is a community platform developed and operated by OutAt Inc., a California C corporation.

## Locked Avi design rules

- Black hat with “ESCO” in Progress Pride colors
- Attached arms and hands
- Blush cheeks
- No cape
- Heart-hands pose for the official illustrated mascot
