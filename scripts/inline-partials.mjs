// Bakes header.html / footer.html / sidebar.html directly into every page's
// <div id="header"></div> / <div id="sidebar"></div> / <div id="footer"></div>
// placeholders, so the nav (and every link inside it) is real static HTML
// that crawlers see - instead of only existing after js/script.js fetches
// and injects it client-side.
//
// Run this after editing header.html, footer.html, or sidebar.html, and
// commit the result:
//   node scripts/inline-partials.mjs
//
// js/script.js still fetches+injects these partials at runtime as a
// fallback for any page that hasn't been run through this script (e.g.
// local dev straight off the raw source), but on baked pages it skips the
// fetch and just wires up the interactive behavior against the existing markup.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Directories one level below the site root whose pages need '../'-relative
// partials instead of './'-relative ones. Must mirror the subfolder list in
// js/script.js (pathPrefix / fixNavLinks).
const SUBFOLDERS = new Set(['solutions', 'products', 'case-studies', 'article', 'blogs', 'industries']);

const SKIP_DIRS = new Set(['node_modules', '.git', '.netlify', '.vercel', '.wrangler', '.github', 'archive']);

function readPartial(name) {
    // header.html / footer.html are saved as UTF-8 with a BOM; strip it so
    // the BOM character doesn't end up embedded mid-document on every page.
    return fs.readFileSync(path.join(ROOT, name), 'utf8').replace(/^﻿/, '');
}

// './foo' -> '../foo' for every relative reference (href, src, data-img,
// data-url, url('./...')) without touching absolute/scheme URLs, and without
// mangling any pre-existing '../' (a leading './' that is itself preceded by
// a '.' is left alone).
function toSubfolderVariant(html) {
    return html
        .replace(/(?<!\.)\.\//g, '../')
        // The one bare-relative reference in these partials (no leading './').
        .replace('src="js/themeswitch.js"', 'src="../js/themeswitch.js"');
}

const rawHeader = readPartial('header.html');
const rawFooter = readPartial('footer.html');
const rawSidebar = readPartial('sidebar.html');

const variants = {
    root: { header: rawHeader, footer: rawFooter, sidebar: rawSidebar },
    sub: {
        header: toSubfolderVariant(rawHeader),
        footer: toSubfolderVariant(rawFooter),
        sidebar: toSubfolderVariant(rawSidebar),
    },
};

function findHtmlFiles(dir, out = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.name.startsWith('.')) continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (SKIP_DIRS.has(entry.name)) continue;
            findHtmlFiles(full, out);
        } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
            out.push(full);
        }
    }
    return out;
}

function variantFor(filePath) {
    const rel = path.relative(ROOT, filePath).split(path.sep);
    const topDir = rel.length > 1 ? rel[0] : null;
    return topDir && SUBFOLDERS.has(topDir) ? variants.sub : variants.root;
}

const PLACEHOLDER = {
    header: '<div id="header"></div>',
    sidebar: '<div id="sidebar"></div>',
    footer: '<div id="footer"></div>',
};

let changed = 0;
let skipped = 0;

for (const file of findHtmlFiles(ROOT)) {
    const base = path.basename(file);
    if (base === 'header.html' || base === 'footer.html' || base === 'sidebar.html') continue;

    let html = fs.readFileSync(file, 'utf8');
    if (!html.includes(PLACEHOLDER.header)) {
        skipped++;
        continue;
    }

    const v = variantFor(file);
    html = html
        .replace(PLACEHOLDER.header, `<div id="header">${v.header}</div>`)
        .replace(PLACEHOLDER.sidebar, `<div id="sidebar">${v.sidebar}</div>`)
        .replace(PLACEHOLDER.footer, `<div id="footer">${v.footer}</div>`)
        // These preloads only mattered when header/footer were fetched at
        // runtime; now that they're baked in, they're a wasted request.
        .replace(/\s*<link rel="preload" href="header\.html" as="fetch"[^>]*>\n?/, '\n')
        .replace(/\s*<link rel="preload" href="footer\.html" as="fetch"[^>]*>\n?/, '\n');

    fs.writeFileSync(file, html);
    changed++;
}

console.log(`inline-partials: baked nav into ${changed} page(s), skipped ${skipped} file(s) without the placeholder.`);
