// Builds a clean, deployable copy of the site into dist/ for Cloudflare
// (Workers static assets - see cloudflare/wrangler.jsonc).
//
// Publishing the repo root directly would also ship node_modules, server.js,
// the Worker source, deploy configs and internal files. Instead this copies
// only git-tracked public files into dist/, runs the usual generators
// (inline-partials, generate-markdown, generate-llms-txt) on that copy so the
// working tree is never modified, then adds the Cloudflare-specific files:
//   - _headers   from cloudflare/_headers
//   - _redirects converted from the Netlify-style root _redirects
//   - 404.html   from 404-page.html
//
//   node scripts/build-dist.mjs
//   npx wrangler deploy -c cloudflare/wrangler.jsonc

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

// Top-level entries that are tooling, server code, configs or internal docs -
// never part of the public site. scripts/ is copied so the generators can run
// against dist/, then removed.
const EXCLUDE = new Set([
    '--full-page', 'false', '.github', '.gitignore', '.htaccess', '.vercelignore',
    'README.md', 'SentraTech_Website_Content_Change_Tracker.xlsx', 'cloudflare',
    'config.js', 'deno.lock', 'index.js', 'server.js', 'netlify', 'netlify.toml',
    'package.json', 'package-lock.json', 'skills-lock.json', 'seo',
    'staticwebapp.config.json', 'vercel.json', 'web.config', 'wrangler.toml',
    '_redirects',
    // Published only as 404.html (below). As its own URL it answered 200 and
    // Google kept crawling it ("Excluded by 'noindex' tag").
    '404-page.html',
]);

fs.rmSync(DIST, { recursive: true, force: true });

const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: ROOT, encoding: 'utf8' })
    .split('\0')
    .filter(Boolean);

let copied = 0;
for (const rel of tracked) {
    if (EXCLUDE.has(rel.split('/')[0])) continue;
    const src = path.join(ROOT, rel);
    if (!fs.existsSync(src)) continue; // deleted but not yet committed
    const dest = path.join(DIST, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    copied++;
}

for (const script of ['inline-partials.mjs', 'generate-markdown.mjs', 'generate-llms-txt.mjs']) {
    execFileSync(process.execPath, [path.join(DIST, 'scripts', script)], { cwd: DIST, stdio: 'inherit' });
}
fs.rmSync(path.join(DIST, 'scripts'), { recursive: true, force: true });

fs.copyFileSync(path.join(ROOT, 'cloudflare', '_headers'), path.join(DIST, '_headers'));

// Cloudflare has no "force" (301!) marker and no query-string matching, can't
// proxy (200) to another host - /api/* goes to the API Worker through a service
// binding instead - and has no 404 status rules; 404.html covers that.
// /index.html -> / is done in site-worker.js: _redirects also applies to the
// Worker's own asset fetches, so the rule would stop it serving / at all.
// Drop all of those, keep the rest.
const redirects = fs.readFileSync(path.join(ROOT, '_redirects'), 'utf8')
    .split(/\r?\n/)
    .flatMap(line => {
        const parts = line.trim().split(/\s+/);
        if (!parts[0] || parts[0].startsWith('#')) return [line];
        const [from, to, status = '301'] = parts;
        if (from.includes('?') || from === '/index.html') return [];
        if (status === '404' || (status === '200' && /^https?:/.test(to))) return [];
        return [`${from} ${to} ${status.replace('!', '')}`];
    });
fs.writeFileSync(path.join(DIST, '_redirects'), redirects.join('\n'));

// Served with a 404 status by cloudflare/site-worker.js for unknown URLs. The
// base tag keeps its ./css and ./js paths working at nested URLs like
// /blogs/missing. Its canonical and og:url point at /404-page.html, which
// would hand crawlers a URL to fetch from every missing page, so drop them.
const notFound = fs.readFileSync(path.join(ROOT, '404-page.html'), 'utf8')
    .replace(/<head>/i, '<head>\n    <base href="/">')
    .replace(/\s*<link rel="canonical"[^>]*>/i, '')
    .replace(/\s*<meta property="og:url"[^>]*>/i, '');
fs.writeFileSync(path.join(DIST, '404.html'), notFound);

console.log(`build-dist: copied ${copied} files into dist/`);
