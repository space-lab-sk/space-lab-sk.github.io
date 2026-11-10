# Partners map — generator

The map, the detail card, the "All partners" list and the connecting lines in the
`#partners` section of `index.html` are generated from two files in this folder:

| File | What to edit |
|---|---|
| `data.py` | places on the map (`PLACES`) and the institutions at each place (`INST`): name, collaboration text, link |
| `places.json` | longitude and latitude of each place |

The cards under the map (ESA, NMDB, KM3NeT, STEPHANIK, SAV OPEN LABS, East Slovak
Space Cluster) are written in `build.py`. Styles live at the end of `css/redesign.css`
(`/* Partners map — home page */`), the small script for the detail card in `js/site.js`.

Do not edit the generated section in `index.html` by hand: the next run overwrites it.

## Regenerating

Requires Node.js and Python 3. The website itself still has no build step; this is
only needed when partners change.

```
cd tools/partners-map
npm install        # first time only
npm run map        # = node gen.mjs && python3 build.py
```

`gen.mjs` projects the Natural Earth country outlines (package `world-atlas`, public
domain) with a Lambert azimuthal equal-area projection centred at 10° E, 48° N and writes
`map.json`. `build.py` turns `map.json` and `data.py` into HTML and replaces the
`#partners` section in `../../index.html`. `python3 build.py --dry-run` writes only
`section.html` for inspection.

Map extent: 7° W – 26° E, 39.5° N – 55.6° N. Places outside it (Kiruna, Boston, Yerevan)
are drawn as pills on the map edge; their position is set in `build.py`.

After regenerating, check the map at phone width: points closer than about 10 px
(Košice / Lomnický štít) overlap there.
