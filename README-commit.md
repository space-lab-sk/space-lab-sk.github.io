# Commit notes — staff photos, Lomnický štít review, mobile layout

All paths are relative to the repository root.

## New

- `assets/img/staff/strharsky.jpg`, `usatiuk.jpg`, `maddox.jpg` — 480 × 480 greyscale
  portraits, cropped so that face width (0.32 of the frame) and eye-line position match
  the median of the twelve existing portraits.
- `.nojekyll` — empty file, so GitHub Pages serves every file as-is (README already
  described it as included).

## Deleted

- `assets/img/staff-mackovjak.jpg` — the old portrait; no page referenced it after
  Contact moved to `assets/img/staff/mackovjak.jpg`.

## Modified

- `about.html` — portraits for Igor Strhárský, Pavlo Usatiuk and Romain Maddox;
  e-mails `maddox@saske.sk` and `randuska@saske.sk`; the intro no longer claims
  "one of Europe's longest cosmic-ray records".
- `contact.html` — portraits for the four cooperation contacts; the contact-information
  split moved from an inline `grid-template-columns` to the class `split--contact`, so it
  collapses to one column on mobile.
- `lomnicky-stit.html` — revised after the review by J. Kubančák:
  - H1 is the official name, Space Physics Laboratory at Lomnický štít; shorter hero text.
  - "Why this mountain" rewritten as four considerations (historical, altitude,
    magnetic, practical); the primary is "predominantly a proton, of galactic or solar
    origin".
  - History: emulsion exposures in winter 1950 (both *Nature* papers of 8 December 1951,
    authors' affiliations as printed); new 1954–1955 entry; 1957–1962 construction;
    first outdoor monitor dated 1970; 12 t is the lead of the producer; expanded entries
    for 3 June 1982, 2012, 2014 (SEVAN), August 2020 (RT-56, GASTRON) and 2025.
  - Instruments: detailed neutron-monitor text added under the general explanation;
    SEVAN and the thunderstorm instruments rewritten; per-section reference lists with
    DOIs; specification tables updated (standard SEVAN geometry, 50 × 50 × 25 cm central
    stack and 5 cm lead; reflector 7.8 cm, KOPOS Kolín; "Energy response" row removed).
- `research.html` — Lomnický štít section: new heading and lede (solar neutrons of
  3 June 1982), feature text from the review, a fourth figure "1951 · First cosmic ray
  results in Nature".
- `facility-lomnicky.html` — history and dates aligned with `lomnicky-stit.html`
  (1950 / 1957–1962 / January 1958 / December 1981); instruments named; 3.84 GV added;
  unsourced superlatives removed; the internal "framework" note removed from the page.
- `infrastructure.html` — "SEVAN particle detector".
- `index.html` — "Cosmic ray measurements at Lomnický štít since the 1950s, with a
  continuous neutron monitor record since December 1981."
- `css/redesign.css` — appended rules: `.refs` and `.src` (references and source lines),
  `.prose h4`; `.feature__img{height:auto}` so the image fills a taller card;
  responsive fixes — `.split--contact`, wrapping eyebrows below 640 px, wrapping long
  links, the Data Portal button in the mobile menu, and adjustments below 400 px
  (display headline size, button text wrapping, stacked `.kv` lists).
- `README.md` — page table, page count for `js/edit.js`, image total and the
  "Before launch" list brought up to date.

## Checked

All 16 pages at 320, 360, 390, 430, 768, 1024, 1280, 1440 and 1920 px: no horizontal
page scroll and no text overflowing its box. HTML of every changed page parses with
balanced tags.
