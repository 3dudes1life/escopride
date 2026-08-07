# Esco Pride Website — Final App-First Landing Site

Static website prepared for GitHub Pages.

## Website role

The public website intentionally has two jobs:

1. Introduce Esco Pride and preview the future iPhone/Android experience.
2. Recruit and onboard Pride Partners, Welcoming Places, and Online Partners.

Live maps, business discovery, offers, meetup RSVPs, Pride Passport activity, Avi Trails, community participation, and saved places remain app-only.

## Major upgrades in this build

- Refined headline tracking and reduced overly tight typography.
- Interactive four-screen app concept preview.
- New How It Works, privacy-by-design, and launch-roadmap sections.
- Improved desktop and mobile navigation, active section state, keyboard controls, focus states, and reduced-motion behavior.
- Mobile quick-action bar for partner recruitment.
- Expanded business application with autosave status, copy, download, clear-draft controls, reference numbers, and additional onboarding fields.
- Privacy notice, website terms, custom 404 page, favicon/app icons, social-sharing image, sitemap, robots file, structured metadata, and web manifest.
- Optimized Avi WebP plus original PNG retained.

## Publish

Upload the contents of this folder—not the enclosing folder—to the root of the GitHub repository. GitHub Pages should deploy from `main` and `/ (root)`.

## Current application flow

The site is static. Partner application drafts save only in the applicant's browser. “Prepare application email” opens a completed message addressed to `admin@outatinc.com` with an Esco Pride application subject; nothing is silently transmitted. Once the shared Esco Pride backend exists, replace the mailto submission in `business-signup.js` with the application API.

## Domain assumptions

Canonical links, sitemap entries, and social metadata use `https://escopride.com/`. They can remain in place when the custom domain is connected.

## Locked Avi design rules

- Black hat with “ESCO” in Progress Pride colors
- Attached arms and hands
- Blush cheeks
- No cape
- Heart-hands pose for the official illustrated mascot


## Launch-ready August 2026 update
- Repositioned the site around the 2026 Founding Beta and a pre-Pride-2027 public soft launch.
- Added Founding Beta recruitment CTAs and a dedicated beta section.
- Updated business recruitment to year-round Founding Partner language.
- Expanded Privacy and Terms to cover the Founding Beta app and TestFlight-era data flows.
- Updated launch roadmap, FAQ, mobile CTA, social metadata, and launch messaging.
