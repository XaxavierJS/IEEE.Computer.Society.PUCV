// Checks internal links/images in dist/ and external links via HEAD/GET. Usage: npm run build && node scripts/check-links.mjs [--external]
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const external = process.argv.includes('--external');
const pages = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && pages.push(p);
  }
})(dist);

const bad = [];
const manual = [];
const ext = new Set();
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  for (const [, url] of html.matchAll(/(?:href|src)="([^"#][^"]*)"/g)) {
    if (/^(mailto:|tel:|data:|\/\/)/.test(url)) continue;
    if (/^https?:/.test(url)) { if (!url.startsWith('https://www.ieeepucv.computer')) ext.add(url); continue; }
    const clean = url.split('#')[0];
    if (!clean) continue;
    const path = join(dist, clean.startsWith('/') ? clean : join(dirname(page).slice(dist.length), clean)).split('?')[0];
    if (!existsSync(path) && !existsSync(join(path, 'index.html'))) bad.push(`${page.slice(dist.length)} -> ${url}`);
  }
}
if (external) {
  for (const url of ext) {
    try {
      const r = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'user-agent': 'Mozilla/5.0' } });
      if ([401, 403, 999].includes(r.status)) manual.push(`${r.status} ${url}`);
      else if (r.status >= 400) bad.push(`EXT ${r.status} ${url}`);
    } catch (e) { bad.push(`EXT FAIL ${url} (${e.cause?.code ?? e.message})`); }
  }
}
console.log(`${pages.length} pages, ${ext.size} external links${external ? ' checked' : ' (use --external to check)'}`);
console.log(bad.length ? `BROKEN:\n${bad.join('\n')}` : 'No broken links');
if (manual.length) console.log(`Blocked to bots, verify manually:\n${manual.join('\n')}`);
process.exit(bad.length ? 1 : 0);
