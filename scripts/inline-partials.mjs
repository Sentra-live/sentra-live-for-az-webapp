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

// Blank out <script>/<style> bodies and comments, keeping every other
// character at its original offset. A `<div` mentioned inside a script string
// or a CSS rule must not be mistaken for real markup, or the depth count below
// drifts and we end up splicing out live page content.
function maskInert(html) {
    const blank = (m) => m.replace(/[^\n]/g, ' ');
    return html
        .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, (m) => m.slice(0, m.indexOf('>') + 1) + blank(m.slice(m.indexOf('>') + 1)))
        .replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, (m) => m.slice(0, m.indexOf('>') + 1) + blank(m.slice(m.indexOf('>') + 1)))
        .replace(/<!--[\s\S]*?-->/g, blank);
}

// Find the matching closing </div> for a tag that starts at `startIdx`.
// Counts nested <div ...> / </div> pairs to find the correct closing tag.
// Returns -1 if the region never balances (a malformed partial), so callers
// can refuse to write rather than swallowing whatever follows.
function findClosingDiv(html, startIdx) {
    const scan = maskInert(html);
    const tagRe = /<(\/?)div[\s>]/g;
    tagRe.lastIndex = startIdx;
    let depth = 0;
    let m;
    while ((m = tagRe.exec(scan)) !== null) {
        if (m[1]) {
            depth--;
            if (depth === 0) return scan.indexOf('>', m.index) + 1;
            if (depth < 0) return -1;
        } else {
            depth++;
        }
    }
    return -1;
}

// Number of unbalanced <div>s in a fragment. Anything other than 0 means the
// partial itself is broken; baking it would leave every page short a closing
// tag, and the *next* run would then splice out real markup while hunting for
// the missing </div>.
function divImbalance(fragment) {
    const scan = maskInert(fragment);
    let depth = 0;
    for (const m of scan.matchAll(/<(\/?)div[\s>]/g)) depth += m[1] ? -1 : 1;
    return depth;
}

for (const [name, frag] of [['header.html', rawHeader], ['footer.html', rawFooter], ['sidebar.html', rawSidebar]]) {
    const off = divImbalance(frag);
    if (off !== 0) {
        console.error(
            `inline-partials: ABORT - ${name} has ${Math.abs(off)} unclosed <div>${Math.abs(off) === 1 ? '' : 's'}` +
            ` (${off > 0 ? 'missing </div>' : 'extra </div>'}). Fix the partial before baking; ` +
            `writing it as-is would corrupt every page.`);
        process.exit(1);
    }
}

let changed = 0;
let skipped = 0;

for (const file of findHtmlFiles(ROOT)) {
    const base = path.basename(file);
    if (base === 'header.html' || base === 'footer.html' || base === 'sidebar.html') continue;

    let html = fs.readFileSync(file, 'utf8');

    // Case 1: Empty placeholders (original behavior)
    if (html.includes(PLACEHOLDER.header)) {
        const v = variantFor(file);
        html = html
            .replace(PLACEHOLDER.header, `<div id="header">${v.header}</div>`)
            .replace(PLACEHOLDER.sidebar, `<div id="sidebar">${v.sidebar}</div>`)
            .replace(PLACEHOLDER.footer, `<div id="footer">${v.footer}</div>`)
            .replace(/\s*<link rel="preload" href="header\.html" as="fetch"[^>]*>\n?/, '\n')
            .replace(/\s*<link rel="preload" href="footer\.html" as="fetch"[^>]*>\n?/, '\n');
        fs.writeFileSync(file, html);
        changed++;
        continue;
    }

    // Case 2: Already baked-in nav — replace existing header/sidebar/footer content
    const v = variantFor(file);
    let modified = false;

    for (const [tag, newContent] of [['header', v.header], ['sidebar', v.sidebar], ['footer', v.footer]]) {
        const marker = `<div id="${tag}">`;
        const startIdx = html.indexOf(marker);
        if (startIdx === -1) continue;
        const endIdx = findClosingDiv(html, startIdx);
        if (endIdx === -1) {
            console.error(`inline-partials: SKIP ${path.relative(ROOT, file)} - <div id="${tag}"> never closes; leaving it untouched.`);
            continue;
        }
        const oldContent = html.substring(startIdx, endIdx);
        // The baked region is nav boilerplate only. If the span we are about to
        // overwrite reaches past it into the page shell, the depth count was
        // wrong - bail out instead of deleting the page's own markup.
        const strayTag = /<\/header>|<aside[\s>]|<main[\s>]|<\/main>|<footer[\s>]/i.exec(maskInert(oldContent));
        if (strayTag) {
            console.error(
                `inline-partials: SKIP ${path.relative(ROOT, file)} - the <div id="${tag}"> span reaches past the ` +
                `nav region (found "${strayTag[0]}"). Refusing to overwrite page content.`);
            continue;
        }
        const baked = `<div id="${tag}">${newContent}</div>`;
        if (oldContent === baked) continue; // already up-to-date
        html = html.substring(0, startIdx) + baked + html.substring(endIdx);
        modified = true;
    }

    if (modified) {
        html = html
            .replace(/\s*<link rel="preload" href="header\.html" as="fetch"[^>]*>\n?/, '\n')
            .replace(/\s*<link rel="preload" href="footer\.html" as="fetch"[^>]*>\n?/, '\n');
        fs.writeFileSync(file, html);
        changed++;
    } else {
        skipped++;
    }
}

console.log(`inline-partials: baked nav into ${changed} page(s), skipped ${skipped} file(s) without the placeholder.`);
