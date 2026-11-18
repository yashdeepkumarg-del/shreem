import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { feature } from 'topojson-client';
import { geoMercator, geoPath } from 'd3-geo';

import { MP_STORES } from './src/app/data/mp-stores.ts';
import { MP_DISTRICTS, FLAGSHIP_HUBS, getDistrictByGeoName } from './src/app/data/mp-districts.config.ts';

console.log('--- Running Madhya Pradesh Map Integration Integrity Tests ---');

// 1. TopoJSON verification
const topoPath = path.join(process.cwd(), 'src', 'app', 'data', 'mp-districts.topo.json');
assert.ok(fs.existsSync(topoPath), 'mp-districts.topo.json must exist');
const topoData = JSON.parse(fs.readFileSync(topoPath, 'utf8'));
const geojson = feature(topoData, topoData.objects.MadhyaPradesh || topoData.objects.districts);

console.log(`Verified districts in MP TopoJSON: ${geojson.features.length}`);
assert.strictEqual(geojson.features.length, 51, 'Must contain all 51 districts of Madhya Pradesh');

// 2. Districts Configuration
console.log(`Verified configured districts: ${MP_DISTRICTS.length}`);
assert.strictEqual(MP_DISTRICTS.length, 51, 'Must have exactly 51 configured districts');

// 3. Flagship Hubs
console.log(`Verified flagship hubs: ${FLAGSHIP_HUBS.length}`);
assert.strictEqual(FLAGSHIP_HUBS.length, 8, 'Must have exactly 8 flagship craft hubs');
const flagshipNames = ['Indore', 'Bhopal', 'Gwalior', 'Jabalpur', 'Ujjain', 'Khargone (West Nimar)', 'Ashoknagar', 'Chhatarpur'];
flagshipNames.forEach(geoName => {
  const d = getDistrictByGeoName(geoName);
  assert.ok(d, `Flagship district ${geoName} must exist`);
  assert.ok(d.isFlagship, `District ${geoName} must be flagged as flagship`);
  assert.ok(d.stores.length > 0, `Flagship ${geoName} must have stores`);
});

// 4. Stores Coverage & Authenticity
console.log(`Verified total MP stores count: ${MP_STORES.length}`);
assert.ok(MP_STORES.length >= 51, 'Must have at least 1 store for every district');
assert.strictEqual(MP_STORES.length, 62, 'Total stores must be 62 across all 51 districts');

// Every district has at least 1 store
MP_DISTRICTS.forEach(d => {
  const districtStores = MP_STORES.filter(s => s.districtName.toLowerCase() === d.geoName.toLowerCase());
  assert.ok(districtStores.length >= 1, `District ${d.name} (${d.geoName}) must have at least 1 store`);
});

// 5. Projection & Bounds Verification
const projection = geoMercator().fitExtent([[30, 80], [890, 840]], geojson);
const pathGen = geoPath().projection(projection);

MP_STORES.forEach(store => {
  assert.ok(store.id && store.name && store.city && store.pincode && store.url, `Store valid: ${store.name}`);
  const [px, py] = projection([store.lng, store.lat]);
  assert.ok(px > 0 && px < 948, `Store ${store.name} X coord (${px}) inside SVG canvas bounds`);
  assert.ok(py > 0 && py < 920, `Store ${store.name} Y coord (${py}) inside SVG canvas bounds`);
});

console.log('--- ALL MADHYA PRADESH MAP INTEGRITY CHECKS PASSED SUCCESSFULLY! ---');
