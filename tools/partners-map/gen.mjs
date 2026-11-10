// Projects Natural Earth country outlines (world-atlas) and the points in places.json
// into map.json, which build.py turns into the #partners section of index.html.
import fs from 'fs';
import nodePath from 'path';
import {fileURLToPath} from 'url';
const here=nodePath.dirname(fileURLToPath(import.meta.url));
const P_=f=>nodePath.join(here,f);
import {geoAzimuthalEqualArea, geoPath, geoGraticule} from 'd3-geo';
import {feature, mesh} from 'topojson-client';
import {presimplify, simplify, quantile} from 'topojson-simplify';
const res=process.argv[2]||'50m';
let topo=JSON.parse(fs.readFileSync(P_(`node_modules/world-atlas/countries-${res}.json`)));
topo=presimplify(topo); topo=simplify(topo, quantile(topo, +process.argv[3]||0.5));
const W=1000;
// extent box of interest (lon,lat)
const ext={type:'MultiPoint',coordinates:[]};
const [L0,L1,B0,B1]=[-7,26,39.5,55.6];
for(let lon=L0;lon<=L1;lon+=0.5){ext.coordinates.push([lon,B0],[lon,B1]);}
for(let lat=B0;lat<=B1;lat+=0.5){ext.coordinates.push([L0,lat],[L1,lat]);}
const proj=geoAzimuthalEqualArea().rotate([-10,-48]).fitWidth(W,ext);
const b=geoPath(proj).bounds(ext); const H=Math.round(b[1][1]);
// crop vertically to the extent
proj.clipExtent([[0,0],[W,H]]);
const path=geoPath(proj).digits(1);
const countries=feature(topo,topo.objects.countries).features;
let out=[];
for(const c of countries){const d=path(c); if(!d) continue; out.push({id:c.id,name:c.properties.name,d});}
const P=JSON.parse(fs.readFileSync(P_('places.json')));
const pts=P.map(p=>{const [x,y]=proj([p.lon,p.lat]);return {...p,x:+x.toFixed(1),y:+y.toFixed(1),px:+(100*x/W).toFixed(2),py:+(100*y/H).toFixed(2)}});
const svk=out.find(c=>c.name==='Slovakia');
const grat=geoPath(proj).digits(1)(geoGraticule().step([10,10])());
fs.writeFileSync(P_('map.json'),JSON.stringify({W,H,countries:out,pts,grat}));
console.log('W,H',W,H,'countries',out.length,'bytes',out.reduce((a,c)=>a+c.d.length,0),'SVK',!!svk);
for(const p of pts) console.log(p.key,p.x,p.y, (p.x<0||p.x>W||p.y<0||p.y>H)?'OUT':'');
