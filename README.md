# space.saske.sk — Department of Space Physics, IEP SAS

Website of the Department of Space Physics (SPACE::LAB), Institute of Experimental
Physics, Slovak Academy of Sciences, Košice.

Static HTML, CSS and two small vanilla JavaScript files. No build step, no framework,
no dependencies. To preview, open `index.html` in a browser — it works straight from disk.

## Deploying to GitHub Pages

Copy the contents of this folder to the repository root and push.

**Check for a `CNAME` file** in the repository root before overwriting it. If
`space.saske.sk` is served from this repository, `CNAME` carries that mapping and
deleting it takes the custom domain down.

`.nojekyll` is included so GitHub serves every file as-is.

## Pages

| File | Contents |
|---|---|
| `index.html` | Home — hero, pillars, partners, public teaser |
| `about.html` | Mission, history, team, PhD students, cooperators |
| `research.html` | Space science, missions, Lomnický štít, services |
| `results.html` | Publications, projects by funder, data, conferences |
| `infrastructure.html` | Hub for the two partner-facing facilities |
| `facility-cleanroom.html` | Space cleanroom — specifications, equipment, access |
| `facility-lomnicky.html` | Space Physics Laboratory at Lomnický štít |
| `public.html` | Media, education, SPACE::TALK, theses, open positions |
| `contact.html` | Addresses, cooperation contacts, travel, social |
| `mission-juice.html` | Mission detail — ACM for JUICE PEP/JDC |
| `mission-bepicolombo.html` | Mission detail — PICAM electronics-box structure |
| `theses.html` · `spacetalk.html` · `summer-school.html` · `media.html` | Detail pages linked from For the Public |

All eleven filenames from the previous version are unchanged, so links already shared
in papers, ESA reports and emails keep resolving.

## Structure

```
css/site.css      original stylesheet — untouched, so the two files can be merged
css/redesign.css  additions for the 2026 redesign, loaded second
js/site.js        nav, mobile menu, scroll-spy, filter chips, hero starfield
js/edit.js        inline content editing for copy review
assets/           logos, icons, photographs
```

The site is fully readable with JavaScript off: mission and project disclosure rows use
native `<details>`, and filter chips degrade to showing every group. All animation is
disabled under `prefers-reduced-motion`.

## Inline editing (for copy review)

The editor is opt-in: it loads only when a page is opened with `?edit=1`
(e.g. `index.html?edit=1`), and stays active while clicking through the site in that
tab. `?edit=0` or a new tab exits it, so the public site shows no editing UI.

In review mode the "Edit content" button appears in the bottom right and turns the page
into a live editor — click any text block to change it. Edits are stored in that visitor's own `localStorage` and
never leave the browser. "Export content (JSON)" downloads every edit made across all
pages so it can be handed back to a developer.

Keys are derived from each element's position in the document, so no special markup is
needed. Because they are positional, restructuring a page's markup orphans the edits made
on it — export before a layout change. Navigation labels are deliberately not editable.

To remove the feature, delete `js/edit.js` and its `<script>` tag from the 15 pages.

## Before launch

- Staff research-focus lines read "Research focus" as a placeholder for all but one person.
- Eight VEGA grant numbers read "To be confirmed".
- The `200+` publications figure on the home page is unverified.
- The Košice cathedral photograph on Contact is credited to Košice Region Tourism and
  needs written permission.
- Slovak translation is not done; the SK/EN switch in the header is decorative.
- Photographs are 1800 px JPEGs, ~5 MB in total. Re-exporting as WebP with 800 px
  variants and `srcset` is a worthwhile optimisation.
