// Build-time: dotted land map (North America to Europe) with the three pilot sites.
import fs from 'node:fs';
import { geoMercator, geoContains } from 'd3-geo';
import { feature } from 'topojson-client';
const topo = JSON.parse(fs.readFileSync('node_modules/world-atlas/land-50m.json'));
const land = feature(topo, topo.objects.land);
const W = 760, H = 400;
const proj = geoMercator().fitExtent([[10, 10], [W - 10, H - 10]], { type: 'MultiPoint', coordinates: [[-142, 22], [32, 63], [-142, 63], [32, 22]] });
const dots = [];
const step = 9;
for (let y = 6; y < H; y += step) {
  for (let x = 6 + ((y / step) % 2 ? step / 2 : 0); x < W; x += step) {
    const ll = proj.invert([x, y]);
    if (geoContains(land, ll)) dots.push([+x.toFixed(1), +y.toFixed(1)]);
  }
}
const sites = {
  stanford: proj([-122.17, 37.43]).map(v => +v.toFixed(1)),
  edinburgh: proj([-3.19, 55.95]).map(v => +v.toFixed(1)),
  frankfurt: proj([8.68, 50.11]).map(v => +v.toFixed(1)),
};
fs.writeFileSync('src/art/map-dots.json', JSON.stringify({ W, H, dots, sites }));
console.log(dots.length, sites);
