# space.saske.sk — Department of Space Physics, IEP SAS

Website of the **Department of Space Physics** (SPACE::LAB), Institute of Experimental
Physics, Slovak Academy of Sciences, Košice.

Static HTML, CSS and one small vanilla JavaScript file. No build step, no framework,
no dependencies. Copy the contents of this folder to the repository root and push.

## Deploying

Copy everything here to the repository root, replacing the previous version, and push.
GitHub Pages serves it at <https://space-lab-sk.github.io/>.

**Check for a `CNAME` file** in the repository root before you overwrite it. If the
domain `space.saske.sk` is served from this repository, `CNAME` carries that mapping
and deleting it takes the custom domain down.

To preview locally, just open `index.html` in a browser — it works straight from disk.

## Every old URL still works

All eleven page filenames from the previous version are unchanged, so links already
shared in papers, ESA reports and emails keep resolving:

`index.html` · `about.html` · `research.html` · `results.html` · `infrastructure.html` ·
`public.html` · `contact.html` · `facility-cleanroom.html` · `facility-lomnicky.html` ·
`mission-juice.html` · `mission-bepicolombo.html`

Four pages are new: `theses.html`, `spacetalk.html`, `summer-school.html`, `media.html`.

## Structure

| Path | What it is |
|---|---|
| `*.html` | one file per page, 15 in total |
| `css/site.css` | the original stylesheet, unchanged |
| `css/redesign.css` | additions for the 2026 redesign, layered on top |
| `js/site.js` | nav, mobile menu, sub-nav scroll-spy, filter chips, hero starfield |
| `assets/` | logos, icons, photographs |

`css/site.css` is deliberately untouched, so the two files can be diffed and eventually
merged. Nothing in `redesign.css` depends on load order beyond coming second.

## What the JavaScript does

`js/site.js` is 150 lines of vanilla JS and the site is fully readable without it:

- translucent nav bar once the page scrolls
- mobile menu toggle below 1000px
- sub-nav smooth scrolling and scroll-spy underline
- year and decade filter chips on Results and the media archive
- "Show all 28 missions" expander on Research
- the drifting starfield on the home hero (disabled under `prefers-reduced-motion`)

Mission and project disclosure rows use native `<details>`, so they open with
JavaScript off. Filter chips degrade to showing every group.

## Outstanding content

- Staff research-focus lines read "Research focus" as a placeholder for all but one person.
- Eight VEGA grant numbers are "To be confirmed".
- The `200+` peer-reviewed publications figure on the home page is an unverified placeholder.
- The Košice cathedral photograph on the Contact page is credited to Košice Region
  Tourism and needs written permission before launch.
- Slovak translation is not done; the SK/EN switch in the header is decorative.

## Images

Photographs are capped at 1800px wide, JPEG quality 0.82 — about 5 MB in total. For the
live site, consider re-exporting from the originals as WebP with 800px variants and
`srcset`.
