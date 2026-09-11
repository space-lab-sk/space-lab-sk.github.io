# space.saske.sk — Department of Space Physics, IEP SAS

Website of the **Department of Space Physics**, Institute of Experimental Physics,
Slovak Academy of Sciences, Košice — public brand **SPACE::LAB**.

Static site: plain HTML, one stylesheet, two small scripts. No build step, no
framework, no dependencies. Open `index.html` in a browser, or serve the folder
with any static file server.

```
python3 -m http.server 8000    # then visit http://localhost:8000
```

## Pages

| File | Contents |
|---|---|
| `index.html` | Home — hero, three pillars, partners, public teaser |
| `about.html` | Mission, history timeline, team, PhD students & cooperators |
| `research.html` | Space science, space missions (28 entries), Lomnický štít, services & products |
| `infrastructure.html` | Hub for the two partner-facing facilities |
| `facility-cleanroom.html` | Space cleanroom — specifications, equipment, access |
| `facility-lomnicky.html` | Space Physics Laboratory at Lomnický štít |
| `results.html` | Publications, projects by funding source, data, conferences |
| `public.html` | Media coverage, education, SPACE::TALK, theses, open positions |
| `contact.html` | Addresses, contacts for cooperation, travel, social networks |
| `mission-juice.html` | Mission detail — ACM for JUICE PEP/JDC |
| `mission-bepicolombo.html` | Mission detail — PICAM electronics-box structure |

## Structure

```
css/site.css   design tokens, shared components, shared page scaffolding
js/site.js     nav, mobile menu, starfield, language toggle, scroll-spy
js/edit.js     inline content editing (see below)
assets/logos/  SPACE::LAB wordmark, dark and light variants
assets/img/    photography, grouped per subject
```

`css/site.css` holds everything used on more than one page, including the
sub-page scaffolding (`.page-hero`, `.subnav`, `.glance`, `.spec`, `.fac`,
`.mbody` …). Each page's own `<style>` block contains **only** its deltas —
a hero width, a panel offset. Add shared patterns to `site.css`, not to a page.

## Inline editing

Every editable string carries a `data-edit="key"` attribute. The "Edit content"
button (bottom right) turns the page into a live editor; changes are stored in
the visitor's own `localStorage` and never leave the browser. Use "Export JSON"
in the edit panel to hand edited copy back to a developer.

This is a copy-review tool, not a CMS — edits are per-browser.

## Language

The site is English. The SK/EN toggle in the header is present but not yet
wired; Slovak translations are pending.

## Deployment (GitHub Pages)

This folder is the repository root — push its contents, not the folder itself.

```bash
cd space-lab-website
git init
git add .
git commit -m "Initial commit — SPACE::LAB website"
git branch -M main
git remote add origin https://github.com/space-lab-sk/<repo>.git
git push -u origin main
```

Then in the repository: **Settings ▸ Pages ▸ Build and deployment**, source
"Deploy from a branch", branch `main`, folder `/ (root)`. The site appears at
`https://space-lab-sk.github.io/<repo>/` within a minute or two.

All paths are relative, so the site works from any subdirectory. `.nojekyll`
is included so GitHub serves the files as-is. For a custom domain
(`space.saske.sk`), add a `CNAME` file containing the hostname and point a DNS
CNAME record at `space-lab-sk.github.io`.

`Space Missions Content Brief.md` is kept in the project workspace, not in
this repository.

## Content notes

- Mission and facility copy is reviewed and approved; figure credits are
  carried in each caption's `.cred` line.
- Placeholders reading `[ Add … ]` mark rows awaiting content (VEGA and APVV
  projects, conference contributions).
- Photographs are 500–650 kB JPEGs. Generating WebP versions at 1600 px and
  800 px is a worthwhile pre-launch optimisation.
