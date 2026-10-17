# Vroeglicht website

A complete static website. You can upload this folder to any web host as is. There is no build step and nothing to install.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home: hero, 3D flacon, the night-to-dawn story, collection, how ordering works, ingredients |
| `collection.html` | All three perfumes with sizes and prices, the discovery set, a comparison table |
| `scent-finder.html` | Four-question quiz that recommends a perfume |
| `atelier.html` | Story, figures, process, raw materials, refills |
| `contact.html` | Visit details, opening hours, the order/request form, FAQ |
| `404.html` | Page-not-found page |

Every page works in Dutch and English (the NL / EN switch in the menu bar). The visitor's choice is remembered.

## Publish it

**Easiest: Netlify Drop (free)**
1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page.
3. You get a live link straight away. You can connect your own domain in the Netlify settings.

On Netlify, the order form and the newsletter sign-up work immediately: submissions appear under **Forms** in your Netlify dashboard, and you can turn on email notifications there.

**Other hosts** (Vercel, GitHub Pages, Cloudflare Pages, or classic hosting with FTP such as Combell or one.com): upload the contents of this folder to the web root. Everything works except form submissions, which need a form service. Connect the forms to one (Formspree, for example) or host on Netlify.

**Try it on your own computer:** double-click `index.html`. For the closest match to a real host, run `python3 -m http.server` in this folder and open http://localhost:8000.

## Make it yours

- **Text in Dutch:** edit the HTML files directly.
- **Text in English:** edit `assets/js/i18n.js`. Each English line has the same key as the Dutch text in the HTML (`data-i18n="..."`).
- **Prices:** in `collection.html`, change both the visible price and the `data-price="..."` number next to it (the page formats the number itself).
- **Address and opening hours:** in `contact.html` and in the footer of each page. `Voorbeeldstraat 12` is a placeholder.
- **Colours and fonts:** the tokens at the top of `assets/css/style.css`.
- **Product images:** `assets/img/` (WebP, 960 × 1200 for the perfumes). Swap in your own photos with the same file names.
- **Brand:** Vroeglicht is a fictional stand-in brand. Replace the name, the footer note ("Concept design") and `assets/img/og.jpg` (the image shown when the link is shared) when you put in your real business.

## How it stays fast

- The 3D flacon only runs on the home page. Phones get a lighter version, and it lowers its quality automatically on slow devices.
- Drawing stops as soon as the 3D scene scrolls out of view.
- Visitors who turn off animations in their system settings get a calm, still version.
- All libraries are included in `assets/vendor/` (three.js r158, GSAP 3.12.5 with ScrollTrigger, Lenis 1.1.13), so the site does not depend on other servers. Only the fonts load from Google Fonts.

## Folder structure

```
index.html  collection.html  scent-finder.html  atelier.html  contact.html  404.html
assets/
  css/style.css        all styles
  js/i18n.js           English text and script messages
  js/site.js           language switch, menu, smooth scrolling, forms (every page)
  js/flacon.js         the 3D flacon
  js/home.js           home page animation
  js/collection.js     size choice and prices
  js/finder.js         scent finder quiz
  js/contact.js        order and request form
  img/                 product images, favicon, share image
  vendor/              three.js, GSAP, ScrollTrigger, Lenis
```
