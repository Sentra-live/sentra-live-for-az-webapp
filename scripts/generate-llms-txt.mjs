// Generates /llms.txt - a plain-text map of the site for LLMs and AI agents,
// which land on sentratech.in with no way to tell which of 90-odd pages are
// canonical for which topic.
//
// Everything in the output is read from the site itself: each entry's text
// comes from that page's own <title> and meta description, and the resources
// list comes from the RESOURCES array in js/resources.js (the same array that
// renders resources.html). Nothing is hand-typed here, so the file cannot
// drift from the site the way a hand-maintained one would.
//
// Run after adding or renaming pages, and commit the result:
//   node scripts/generate-llms-txt.mjs
//
// It also runs on every Netlify build (see netlify.toml [build] command).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://sentratech.in';

/** Pull <title> and meta description out of a page without parsing the whole DOM. */
function readPage(relPath) {
    const abs = path.join(ROOT, relPath);
    if (!fs.existsSync(abs)) return null;
    const head = fs.readFileSync(abs, 'utf8').slice(0, 20000);
    const title = (head.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '';
    // Capture up to the matching quote, not the first quote of either kind -
    // descriptions containing an apostrophe ("Sentra's sensors") would otherwise
    // be cut off at the apostrophe.
    const desc =
        (head.match(/<meta[^>]+name=["']description["'][^>]*\scontent="([^"]*)"/i) ||
            head.match(/<meta[^>]+name=["']description["'][^>]*\scontent='([^']*)'/i) ||
            [])[1] || '';
    return {
        url: ORIGIN + '/' + relPath.split(path.sep).join('/'),
        title: clean(title),
        desc: clean(desc)
    };
}

function clean(s) {
    return s
        .replace(/&amp;/g, '&')
        .replace(/&#8217;|&rsquo;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Page titles carry SEO tails ("... | Sentra", "— Smart Structural Monitoring").
 * The link text should be the thing itself, so cut at the first separator.
 */
function shortTitle(title) {
    return clean(title.split(/\s+[|—–-]\s+/)[0]);
}

/** One line of description, not the full SEO paragraph. */
function shortDesc(desc, limit = 150) {
    if (!desc) return '';
    let out = desc.split(/(?<=\.)\s/)[0];
    if (out.length > limit) {
        out = out.slice(0, limit).replace(/\s+\S*$/, '') + '...';
    }
    return out.replace(/\.$/, '');
}

function entry(page) {
    if (!page) return null;
    const d = shortDesc(page.desc);
    return `- [${shortTitle(page.title)}](${page.url})${d ? ': ' + d : ''}`;
}

/** Every .html file directly inside a section folder, alphabetically. */
function sectionPages(dir) {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) return [];
    return fs.readdirSync(abs)
        .filter(f => f.endsWith('.html'))
        .sort()
        .map(f => readPage(path.join(dir, f)))
        .filter(Boolean);
}

/** The RESOURCES array in js/resources.js is the site's own index of published work. */
function readResources() {
    const src = fs.readFileSync(path.join(ROOT, 'js', 'resources.js'), 'utf8');
    const marker = 'var RESOURCES = ';
    const start = src.indexOf(marker + '[');
    if (start < 0) return [];
    const end = src.indexOf('];', start) + 1;
    const arr = eval('(' + src.slice(start + marker.length, end) + ')');
    return arr
        .map(r => ({ ...r, when: new Date(r.date) }))
        .sort((a, b) => b.when - a.when);
}

const TYPE_LABEL = { blogs: 'Blog', 'case-studies': 'Case study', articles: 'Article' };

function resourceEntry(r) {
    const url = ORIGIN + '/' + r.link.replace(/^\.\//, '');
    return `- [${clean(r.title)}](${url}): ${TYPE_LABEL[r.type] || 'Resource'}, ${r.category}, ${r.date}`;
}

// ---------------------------------------------------------------------------

const lines = [];
const push = (...l) => lines.push(...l);

push('# Sentra');
push('');
push('> IoT structural health monitoring for bridges, railways, buildings, dams,');
push('> tunnels and water infrastructure. Sentra designs and deploys wireless sensor');
push('> networks, data loggers, laser scanning and digital twins, with analytics that');
push('> turn continuous tilt, strain, vibration, displacement and scour readings into');
push('> decisions about structures in service. Based in Visakhapatnam, Andhra Pradesh,');
push('> India; part of Clove Technologies. Authorised India reseller for Worldsensing');
push('> and XGRIDS.');
push('');
push('Sentra sells instrumentation and monitoring programmes to infrastructure owners,');
push('EPC contractors and consultants. Deployments include Indian Railways bridges,');
push('highway structures, high-rise buildings, dams, ports and mining slopes.');
push('');
push('This site is documentation and marketing content only. There is no public API,');
push('no agent tool endpoint and no authenticated interface; /api/ is an internal');
push('backend for the site\'s own chatbot and is disallowed in robots.txt.');
push('');

const groups = [
    ['Solutions', 'What Sentra delivers, by discipline.', sectionPages('solutions')],
    ['Industries', 'The same capabilities framed by sector.', sectionPages('industries')],
    ['Products', 'Hardware: laser scanners, wireless and wired sensors, data loggers, communications.', sectionPages('products')],
];

for (const [heading, blurb, pages] of groups) {
    push(`## ${heading}`);
    push('');
    push(blurb);
    push('');
    pages.map(entry).filter(Boolean).forEach(l => push(l));
    push('');
}

push('## Key pages');
push('');
[
    'index.html',
    'about.html',
    'solutions.html',
    'products.html',
    'industries.html',
    'resources.html',
    'partnership.html',
    'contact.html'
].map(f => entry(readPage(f))).filter(Boolean).forEach(l => push(l));
push('');

push('## Reference');
push('');
push('Definitional and technical material, useful for resolving terminology.');
push('');
[
    'glossary.html',
    'faq.html',
    'document-center.html',
    'testimonial.html',
    'videos.html'
].map(f => entry(readPage(f))).filter(Boolean).forEach(l => push(l));
push('');

const resources = readResources();
push('## Latest resources');
push('');
push('Newest first. The full, filterable index lives at ' + ORIGIN + '/resources.html');
push('');
resources.slice(0, 20).map(resourceEntry).forEach(l => push(l));
push('');

if (resources.length > 20) {
    push('## Optional');
    push('');
    push('Older published work, same index.');
    push('');
    resources.slice(20).map(resourceEntry).forEach(l => push(l));
    push('');
}

const out = lines.join('\n').replace(/\n{3,}/g, '\n\n');
fs.writeFileSync(path.join(ROOT, 'llms.txt'), out, 'utf8');

const counts = groups.map(([h, , p]) => `${p.length} ${h.toLowerCase()}`).join(', ');
console.log(`llms.txt written: ${counts}, ${resources.length} resources, ${out.split('\n').length} lines.`);
