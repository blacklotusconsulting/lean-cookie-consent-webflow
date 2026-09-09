# Lean Cookie Consent for Webflow

Lightweight Webflow custom code connector for the Lean Cookie Consent SaaS platform.

This first release is not a Webflow Marketplace app. It is a safe head-code snippet and helper workflow for Webflow sites that need Lean Cookie Consent without adding arbitrary configurable script URLs.

## What it does

- Adds Lean Cookie Consent to Webflow published pages.
- Uses one public Site Key from the Lean Cookie Consent dashboard.
- Hardcodes the Lean runtime host: `https://api.leancookieconsent.com`.
- Exposes basic Webflow page context through `window.LeanCookieConsentWebflow`.
- Keeps banner copy, languages, categories, services, policy links and evidence handling inside Lean Cookie Consent.

## Requirements

- A Webflow site plan that supports Custom Code.
- A Lean Cookie Consent account.
- A valid Lean Cookie Consent Site Key for the Webflow custom domain.

## Installation

1. Open the Webflow project.
2. Go to **Site settings -> Custom code**.
3. Paste the snippet from `snippets/head-code.html` into **Head code**.
4. Replace `YOUR_SITE_KEY` with the Site Key from the Lean Cookie Consent dashboard.
5. Save changes.
6. Publish the site.
7. Test the published domain in an incognito browser window.

For a single page test, use **Page settings -> Custom code -> Inside `<head>` tag** instead of global Site settings.

## Generate a ready snippet

From this repository:

```bash
npm run generate -- site_1234567890abcdef
```

The command prints a ready-to-paste Webflow head-code snippet.

## Content Security Policy

If the site or reverse proxy adds a strict CSP, allow:

```text
script-src https://api.leancookieconsent.com
connect-src https://api.leancookieconsent.com
```

Webflow-hosted sites generally do not require additional CSP changes unless custom headers are added through a proxy/CDN.

## Current limitations

- This connector is not yet a Webflow Marketplace app.
- It does not automatically manage Webflow Embed elements or third-party scripts already present on the page.
- It cannot block scripts loaded before the head-code snippet runs.
- For marketing tags, install Lean through Google Tag Manager with the Lean GTM template and fire tags after consent.

## Repository Links

- Lean Cookie Consent: https://leancookieconsent.com/
- Lean app: https://app.leancookieconsent.com/
- GTM template: https://github.com/blacklotusconsulting/lean-cookie-consent-gtm-template
