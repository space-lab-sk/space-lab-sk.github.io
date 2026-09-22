# Commit package — Lomnický štít research page

Unzip over the repository root. Paths are already correct; every file below
replaces or adds at the same location.

## New

- `lomnicky-stit.html` — the Lomnický štít research page
- `assets/img/lomnicky/` — 10 figures (9 supplied with the copy deck, plus
  `ls-05-measurement-building-1981-2012.jpg`)

## Modified

- `css/redesign.css` — five additions at the end of the file:
  `main section[id]` / `.anchor` scroll offset, `.figpair`, `.prose--wide`,
  `.chart`, and the `.timeline--v` vertical timeline variant.
  The `a.feature` hover rules were added alongside `.feature__body`.
- `research.html` — the three Lomnický štít cards now link into the new page's
  sections; the observatory feature block is itself a link to it; the
  facility-page link moved inline into the section standfirst.
- `facility-lomnicky.html` — hero h1 reads "Lomnický štít — facility"; the
  "The science at Lomnický štít" link now points at `lomnicky-stit.html`
  instead of `research.html#missions`.

## Bug fixes and refactors in this pass

1. `og:image` pointed at the Skywalk photo, not the page's own hero — corrected
   to `ls-02`.
2. Hash links arriving from another page (`lomnicky-stit.html#history`) landed
   under the fixed 72px nav. The sub-nav's click handler only offsets in-page
   clicks, so anchor clearance is now a CSS rule on `main section[id]` and
   `.anchor` — this fixes the same latent problem on every sub-page.
3. Two figures of equal weight were laid out with `.fig-split`, which reserves a
   fixed 300px second column for a portrait. New `.figpair` grid instead.
4. `.reading__col--wide` sets `max-width:none`, which an inline `max-width:860px`
   then fought. Replaced by `.prose--wide`, which keeps prose at 68ch while
   letting tables, charts and figures use the full column.
5. The spec tables and both charts were being squeezed into a 68ch measure in
   the Instruments and Science sections — same fix.
6. SVG chart presentation moved out of inline `style` attributes into `.chart`.
7. The bar chart's value labels overlapped their bars, and a duplicate column
   header sat above the first row.
8. The enquiry band sat inside the hosting section with an inline margin; it is
   now its own `#enquire` section, matching `facility-cleanroom.html`.
9. Every image carries its real intrinsic `width`/`height`, so nothing shifts
   while the page loads.
10. `ls-05` shipped as a 1.4 MB PNG; converted to a 295 kB JPEG.
11. The footer photography credit did not name the one licensed third-party
    image. It now reads "Bubamara / Wikimedia Commons (CC BY-SA 3.0)".

## Still open

- Four figures are low-resolution extracts from a print PDF and are marked in
  their credit lines as to be redrawn: `ls-09` (1940/1962 composite),
  `ls-10` (shower illustration), `ls-11` (SEVAN schematic). The Forbush plot
  was replaced by an SVG chart labelled as schematic.
- `ls-09`'s rights holder is still being confirmed — the credit line says so.
- `ls-04`'s date and photographer are unconfirmed.
- Both SVG charts are drawn in site style: the 12 September 2021 bar chart uses
  the published values; the Forbush trace is schematic and labelled as such.
