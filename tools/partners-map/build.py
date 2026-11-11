"""Builds the #partners section of index.html from data.py and map.json.

Usage: python3 build.py            (writes the section into ../../index.html)
       python3 build.py --dry-run  (only writes section.html next to this script)
"""
import json,html,sys,os
HERE=os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,HERE); from data import PLACES, INST
M=json.load(open(os.path.join(HERE,'map.json'))); W,H=M['W'],M['H']
pts={p['key']:p for p in M['pts']}
e=html.escape
hub=pts['kosice']
# --- SVG
svg=[f'<svg class="pmap__svg" viewBox="0 0 {W} {H}" aria-hidden="true" focusable="false">']
svg.append(f'<path class="pmap__grat" d="{M["grat"]}"/>')
svg.append('<g class="pmap__land">'+''.join(f'<path d="{c["d"]}"/>' for c in M['countries'] if c['name']!='Slovakia')+'</g>')
svk=[c for c in M['countries'] if c['name']=='Slovakia'][0]
svg.append(f'<path class="pmap__home" d="{svk["d"]}"/>')
arcs=[]
for k,p in pts.items():
    if k=='kosice' or p['y']<0 or p['x']>W: continue
    x0,y0,x1,y1=hub['x'],hub['y'],p['x'],p['y']; mx,my=(x0+x1)/2,(y0+y1)/2; dx,dy=x1-x0,y1-y0; L=(dx*dx+dy*dy)**.5
    if L<40: continue
    nx,ny=-dy/L,dx/L
    if ny>0: nx,ny=-nx,-ny          # bend upwards
    c=0.18*L; arcs.append(f'<path data-arc="{k}" d="M{x0} {y0}Q{mx+nx*c:.1f} {my+ny*c:.1f} {x1} {y1}"/>')
# Kiruna: towards the top edge
kx=pts['kiruna']['x']
arcs.append(f'<path data-arc="kiruna" class="pmap__arc--edge" d="M{hub["x"]} {hub["y"]}Q{(hub["x"]+kx)/2-60:.1f} {hub["y"]*0.45:.1f} {kx} 0"/>')
# Yerevan: towards the right edge
yy=0.9*H
arcs.append(f'<path data-arc="yerevan" class="pmap__arc--edge" d="M{hub["x"]} {hub["y"]}Q{(hub["x"]+W)/2:.1f} {hub["y"]-40:.1f} {W} {yy}"/>')
# Boston: towards the left edge
by=0.6*H
arcs.append(f'<path data-arc="boston" class="pmap__arc--edge" d="M{hub["x"]} {hub["y"]}Q{W*0.42:.1f} {by-170:.1f} 0 {by:.1f}"/>')
svg.append('<g class="pmap__arcs">'+''.join(arcs)+'</g></svg>')
# --- pins
by_place={}
for i in INST: by_place.setdefault(i[0],[]).append(i)
def n_partners(k): return len([i for i in by_place[k] if not i[4]])
pins=[]
for k,v in PLACES.items():
    city,country,side=v[:3]
    cnt=n_partners(k); own=any(i[4] for i in by_place[k])
    desc=f'{v[3] if len(v)>3 else city}, {country}'+ (f' — {cnt} partner'+('s' if cnt!=1 else '') if cnt else '')
    if k=='boston':
        pins.append(f'<button type="button" class="pin pin--edge" data-place="boston" style="left:0;top:{100*by/H:.2f}%" aria-label="{e(desc)}"><span class="pin__arr" aria-hidden="true">←</span><span class="pin__label">Boston<span class="pin__more">, USA</span></span></button>')
        continue
    if k=='yerevan':
        pins.append(f'<button type="button" class="pin pin--edge pin--edge-right" data-place="yerevan" style="right:0;left:auto;top:{100*0.9:.0f}%" aria-label="{e(desc)}"><span class="pin__label">Yerevan<span class="pin__more">, Armenia</span></span><span class="pin__arr" aria-hidden="true">→</span></button>')
        continue
    if k=='kiruna':
        pins.append(f'<button type="button" class="pin pin--edge pin--edge-top" data-place="kiruna" style="left:{pts["kiruna"]["px"]}%;top:0" aria-label="{e(desc)}"><span class="pin__arr" aria-hidden="true">↑</span><span class="pin__label">Kiruna<span class="pin__more">, Sweden</span></span></button>')
        continue
    p=pts[k]; cls='pin'+(' pin--home' if own else '')
    pins.append(f'<button type="button" class="{cls} pin--{side}" data-place="{k}" style="left:{p["px"]}%;top:{p["py"]}%" aria-label="{e(desc)}"><span class="pin__dot" aria-hidden="true"></span><span class="pin__label">{e(city)}</span></button>')
# --- place panels (templates)
def place_html(k):
    v=PLACES[k]; city,country=(v[3] if len(v)>3 else v[0]),v[1]
    rows=[]
    for _,name,proj,url,own in by_place[k]:
        nm=f'<a href="{e(url)}"'+('' if url.endswith('.html') else ' target="_blank" rel="noopener"')+f'>{e(name)}</a>' if url else e(name)
        rows.append(f'<li{" class=\"own\"" if own else ""}><b>{nm}</b><span>{e(proj)}</span></li>')
    return f'<span class="eyebrow">{e(country)}</span><h3>{e(city)}</h3><ul class="pmap__inst'+(' pmap__inst--dense' if len(rows)>=5 else '')+'">'+''.join(rows)+'</ul>'
templates=''.join(f'<template id="place-{k}">{place_html(k)}</template>' for k in PLACES)
# --- full list by country
order=[]; groups={}
for k,v in PLACES.items():
    city,country=(v[3] if len(v)>3 else v[0]),v[1]
    for i in by_place[k]:
        if i[4]: continue
        groups.setdefault(country,[]).append((i,city))
        if country not in order: order.append(country)
lst=[]
for c in order:
    items=''.join(f'<li><b>'+(f'<a href="{e(i[3])}" target="_blank" rel="noopener">{e(i[1])}</a>' if i[3] else e(i[1]))+f'</b><span class="pl">{e(city)}</span><span class="pj">{e(i[2])}</span></li>' for i,city in groups[c])
    lst.append(f'<div class="pgroup"><h4>{e(c)}</h4><ul>{items}</ul></div>')
npart=sum(len(v) for v in groups.values())+1  # + ESA
ncountries=len(order)
section=f'''<section class="band" id="partners"><div class="wrap">
<div class="sec-head">
  <hr class="rule">
  <span class="eyebrow">Our Partners</span>
  <h2>Partners across Europe and beyond</h2>
  <p class="lede">Select a point on the map to see the institutes, universities and companies we work with there.</p>
</div>
<div class="pmap">
  <figure class="pmap__fig">
    <div class="pmap__canvas">
      {"".join(svg)}
      {"".join(pins)}
    </div>
  </figure>
  <div class="pmap__panel" id="pmap-panel" aria-live="polite">{place_html('kosice')}</div>
</div>
{templates}
<div class="pmap__cons">
  <h3 class="pmap__sub">Agencies, consortia and networks</h3>
  <div class="grid grid-3">
    <a class="card card--link" href="https://www.esa.int/" target="_blank" rel="noopener"><h3>ESA</h3><p>European Space Agency, 13 awarded contracts since 2016.</p><span class="card__more">esa.int →</span></a>
    <a class="card card--link" href="https://www.nmdb.eu/" target="_blank" rel="noopener"><h3>NMDB</h3><p>Real-time neutron monitor network, with Lomnický štít as station LMKS.</p><span class="card__more">nmdb.eu →</span></a>
    <a class="card card--link" href="https://www.km3net.org/" target="_blank" rel="noopener"><h3>KM3NeT</h3><p>Deep-sea neutrino telescopes in the Mediterranean.</p><span class="card__more">km3net.org →</span></a>
    <a class="card card--link" href="https://stephanik.eu/members" target="_blank" rel="noopener"><h3>STEPHANIK</h3><p>Slovak consortium building a modular satellite platform, with us among its 15 members.</p><span class="card__more">Consortium members →</span></a>
    <div class="card"><h3>SAV OPEN LABS</h3><p>Developing the concept of an open research infrastructure of the Slovak Academy of Sciences for applied research in Slovakia.</p></div>
    <a class="card card--link" href="https://vsvk.sk/en/" target="_blank" rel="noopener"><h3>East Slovak Space Cluster</h3><p>Regional cluster developing the space economy in eastern Slovakia.</p><span class="card__more">vsvk.sk →</span></a>
  </div>
</div>
<details class="pmap__all">
  <summary>All partners · {npart-1} institutions in {ncountries} countries</summary>
  <div class="pmap__list">{"".join(lst)}</div>
</details>
</div></section>'''
open(os.path.join(HERE,'section.html'),'w',encoding='utf-8').write(section)
print(len(section),'bytes;',npart-1,'institutions + ESA in',ncountries,'countries')
if '--dry-run' in sys.argv: sys.exit(0)
# write the section into index.html, replacing the previous one
idx=os.path.join(HERE,'..','..','index.html')
s=open(idx,encoding='utf-8').read()
start=s.index('<section class="band" id="partners">')
end_mark='</details>\n</div></section>'
end=s.index(end_mark,start)+len(end_mark)
open(idx,'w',encoding='utf-8').write(s[:start]+section+s[end:])
print('index.html updated')
