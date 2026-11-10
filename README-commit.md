# Commit notes — partners map, LinkedIn, home-page fixes

All paths are relative to the repository root.

## New

- `tools/partners-map/` — generator for the partners map: `data.py` (places and
  institutions), `places.json` (coordinates), `gen.mjs` (projects Natural Earth outlines),
  `build.py` (writes the `#partners` section into `index.html`), `README.md`.
  Run `npm install` once, then `npm run map`. `node_modules/`, `map.json` and
  `section.html` are ignored.
- `assets/icons/linkedin.svg` — 24 × 24, `fill="currentColor"`, Simple Icons shape.

## Modified

- `index.html` — the partner tiles are replaced by an interactive map of Europe
  (Lambert azimuthal equal-area, static inline SVG): 27 institutions + ESA in 12 countries,
  a detail card per place, pills for Kiruna, Boston and Yerevan, a collapsed
  "All partners" list, and six cards under the map (ESA, NMDB, KM3NeT, STEPHANIK,
  SAV OPEN LABS, East Slovak Space Cluster).
- `css/redesign.css` — map styles at the end (`/* Partners map — home page */`), including
  mobile hit-area fixes; unused `.ptile` / `.partners` rules removed; Follow-us grid has
  six columns.
- `js/site.js` — detail card for the map; screen readers are notified only on click or
  keyboard focus, not on mouse hover.
- All 16 pages — footer social links in the order GitHub, LinkedIn, Instagram, Facebook,
  YouTube (Meetup removed from the footer).
- `contact.html` — Follow-us cards: GitHub, LinkedIn, Instagram, Facebook, YouTube, Meetup.
- `about.html` — research focus for Pavlo Usatiuk.
- `README.md` — partners map and `tools/` described.

## Checked

Home page at 320–1920 px: no horizontal scroll, no overflowing text, and on every
width each map point's centre hits its own button. HTML parses with balanced tags; no
JavaScript errors. The generator reproduces the committed `index.html` byte for byte.
