# Rayglobal Digital World website

Static site: HTML, CSS and vanilla JavaScript. No build step.

## 1. Images to supply
Place in `assets/images/`:
- `rayglobal-logo.png` — full horizontal logo (used on email signatures, print, and `og:image` fallback)
- `rayglobal-logo-icon.png` — square icon (used in header brand, favicon, apple touch icon)
- `og-image.png` — **1200×630** social share image (brand colour background, logo centred, tagline)
- Optional service banners: `service-documents.jpg`, `service-design.jpg`, `service-registration.jpg`, `service-applications.jpg`, `service-web.jpg`, `service-data.jpg`, `service-ict.jpg`, `service-finance.jpg` — each ~800×450, under 200 KB
- Optional hero photo: `hero.jpg` — ~1600×900 (the hero now uses a CSS gradient, but `style.css` previously referenced this)

Crop/adjust in any image editor and export as PNG (logos) or JPEG (photos). Do not resize or recolour the logo itself.

## 2. Preview in VS Code
Open the folder in VS Code, install the **Live Server** extension, right-click `index.html`, choose **Open with Live Server**.

## 3. Deploy on Netlify
Sign in at netlify.com, go to **Sites > Add new site > Deploy manually**, drag the whole project folder in. Your site goes live on a netlify.app address. Custom domain: **Domain management > Add a domain**, then follow Netlify's DNS instructions at your registrar.

## 4. Editing
- WhatsApp number, name, Forex switch: top of `assets/js/script.js`.
- Brand colours: `:root` in `assets/css/style.css`.
- Hero animations: `assets/css/hero.css` (this file is the single owner of `.hero`).
- Service card animations: bottom of `assets/css/style.css`.
- Phone, email, address, services text: in the HTML pages (search and replace across files in VS Code with Ctrl+Shift+H).

## 5. Replace before publishing
- `og-image.png` (1200×630) — place in `assets/images/`
- **OG image versioning:** All pages reference `og-image.png?v=3`. When you replace the OG image, bump the `?v=` number (e.g. `?v=4`) in every page's `<meta property="og:image">` and `<meta property="og:image:url">`. Search across the project with Ctrl+Shift+H.
- Social profile URLs for @Rayglobal1 (footer, marked by comment)
- Forex/crypto service: hidden until `showForex` is true and you have confirmed the offer and legal position
- Privacy policy: verify and get it reviewed
- Custom domain (optional): change `https://rayglobaldigitalworld.netlify.app` to your final domain in all `<link rel="canonical">`, `<meta property="og:url">`, `<meta property="og:image">`, `robots.txt`, and `sitemap.xml`

## 6. What works / what needs a service
Works now: responsive layout, mobile menu, WhatsApp buttons with service prefill, form validation and WhatsApp enquiry (customer must press Send), FAQ, automatic year, popup-blocker fallback message, scroll-triggered service reveal.
Needs an external service: stored or emailed form submissions (e.g. Netlify Forms), payments, analytics.

## 7. Testing checklist
Open each page at 320, 375, 430, 768, 1024 and 1440px; check no sideways scrolling; open and close menu by touch, Enter and Esc; tap every WhatsApp button and confirm the number 2349064326182; submit the form empty, then valid (with popup blocked, then allowed); tab through pages and see focus outlines; check all links, including 404.html.

## 8. Design decisions
- **Path convention:** All asset paths use absolute `/assets/...` form so 404.html and any future subdirectory routes resolve correctly.
- **`.no-js` / `.js-ready`:** HTML `<html class="no-js">` is the default; `script.js` removes it and adds `.js-ready` on load. Service-card reveal animations and about-page reveals are gated on `.js-ready`.
- **`.leader-avatar`:** Owned solely by `style.css`. `about.css` contains no avatar sizing rules.
- **Navigation:** `.nav`, `.hdr-actions`, and `.wa-icon-btn` each have a single definition in `style.css`. No `!important` on `display`.
- `.hero` is owned **only** by `hero.css` — never duplicated in `style.css`.
- Service-card animation is scoped to `.services-grid .card.reveal` so it never affects the sample-work grid.
- Header brand is icon + name on **every** page for consistency.
- `theme-color` meta matches `--navy` so mobile Chrome address bar reflects the brand.
- All reduced-motion preferences are honoured.