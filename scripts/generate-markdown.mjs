// Generates a Markdown twin of every content page into _md/, so the site can
// answer `Accept: text/markdown` with prose instead of a 180 KB page an agent
// has to strip nav, chatbot and footer out of first.
//
// The conversion happens here, at build time, rather than in the edge function:
// the edge function then only has to pick a file, which keeps it to a few
// milliseconds and means a malformed page fails the build instead of failing a
// request. netlify/edge-functions/markdown.ts serves what this writes.
//
// Each page also gets a <link rel="alternate" type="text/markdown"> in its head,
// so an agent that does not send an Accept header can still find the twin. The
// injection is idempotent - running twice changes nothing.
//
// Run after adding pages, and commit the result:
//   node scripts/generate-markdown.mjs
//
// It also runs on every Netlify build (see netlify.toml [build] command).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, '_md');
const ORIGIN = 'https://sentratech.in';

// Directories holding pages worth serving as Markdown.
const CONTENT_DIRS = ['blogs', 'article', 'case-studies', 'solutions', 'industries', 'products'];

// Root-level pages worth serving. Partials (header/footer/sidebar) and
// utility pages are deliberately absent - they are not documents.
const ROOT_PAGES = [
    'index.html', 'about.html', 'solutions.html', 'products.html', 'industries.html',
    'resources.html', 'partnership.html', 'contact.html', 'glossary.html', 'faq.html',
    'document-center.html', 'testimonial.html', 'videos.html'
];

/* ────────────────────────── HTML → Markdown ────────────────────────── */

/** Elements whose entire subtree is page furniture, not content. */
const DROP_SELECTORS = [
    'script', 'style', 'noscript', 'svg', 'form', 'nav', 'iframe', 'video', 'audio', 'button'
];

/** Class names that mark interactive chrome rather than prose. */
const DROP_CLASSES = [
    'tts-bar', 'back-btn', 'detail-sidebar', 'sidebar-sticky', 'trending-section',
    'swiper-nav-row', 'swiper-btn', 'share-icon', 'sidebar-share', 'preloader',
    'chatbot', 'breadcrumb', 'cta-btn', 'hero-bg-dots', 'hero-glow', 'hero-top-line'
];

function stripComments(html) {
    return html.replace(/<!--[\s\S]*?-->/g, '');
}

/** Remove a whole element and its children, by tag name. */
function dropTag(html, tag) {
    const re = new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi');
    let out = html;
    let prev;
    do { prev = out; out = out.replace(re, ''); } while (out !== prev);
    // self-closing / unclosed leftovers
    return out.replace(new RegExp(`<${tag}\\b[^>]*\\/?>`, 'gi'), '');
}

/**
 * Remove a <div>/<aside>/<section> whose opening tag matches `test`, along with
 * everything up to its matching close. Depth-counted, so nesting is safe.
 */
function dropByClass(html, className) {
    const open = new RegExp(`<(div|aside|section|span)\\b[^>]*class="[^"]*\\b${className}[^"]*"[^>]*>`, 'i');
    let out = html;
    for (;;) {
        const m = open.exec(out);
        if (!m) return out;
        const tag = m[1];
        const start = m.index;
        let i = start + m[0].length;
        let depth = 1;
        const scan = new RegExp(`<${tag}\\b[^>]*>|<\\/${tag}>`, 'gi');
        scan.lastIndex = i;
        let s;
        while (depth > 0 && (s = scan.exec(out))) {
            depth += s[0][1] === '/' ? -1 : 1;
            i = scan.lastIndex;
        }
        out = out.slice(0, start) + out.slice(i);
    }
}

function decode(text) {
    return text
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&apos;/g, "'")
        .replace(/&mdash;/g, '—')
        .replace(/&ndash;/g, '–')
        .replace(/&rsquo;|&#8217;/g, '’')
        .replace(/&lsquo;/g, '‘')
        .replace(/&hellip;/g, '…')
        .replace(/&middot;/g, '·')
        .replace(/&deg;/g, '°')
        .replace(/&micro;/g, 'µ')
        .replace(/&plusmn;/g, '±')
        .replace(/&times;/g, '×')
        .replace(/&epsilon;/g, 'ε')
        .replace(/&radic;/g, '√')
        .replace(/&sup2;/g, '²')
        .replace(/&thinsp;/g, ' ')
        .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
        .replace(/&[a-z]+;/gi, ' ');
}

/** Absolute URL for a href/src that may be relative to `pageDir`. */
function absolute(url, pageDir) {
    if (!url) return '';
    if (/^(https?:|mailto:|tel:|#)/i.test(url)) return url;
    const clean = url.replace(/^\.\//, '');
    if (clean.startsWith('/')) return ORIGIN + clean;
    const joined = path.posix.normalize(path.posix.join(pageDir, clean));
    return ORIGIN + '/' + joined.replace(/^\/+/, '');
}

/**
 * Convert a fragment of this site's HTML to Markdown. The tag set is small and
 * known, so a token walk beats pulling in a general-purpose parser.
 */
function toMarkdown(html, pageDir) {
    let s = stripComments(html);
    for (const tag of DROP_SELECTORS) s = dropTag(s, tag);
    for (const cls of DROP_CLASSES) s = dropByClass(s, cls);

    // Icon-only <i> elements carry no text; drop before inline handling.
    s = s.replace(/<i\b[^>]*class="[^"]*fa[^"]*"[^>]*><\/i>/gi, '');

    const out = [];
    const listStack = [];
    let buf = '';

    const flush = () => {
        const text = buf.replace(/[ \t]+/g, ' ').replace(/ +([.,;:!?])/g, '$1').trim();
        buf = '';
        if (text) out.push(text);
    };

    const token = /<\/?([a-z][a-z0-9]*)\b([^>]*)>|([^<]+)/gi;
    let m;
    while ((m = token.exec(s))) {
        const [, rawTag, attrs, text] = m;

        if (text !== undefined) {
            // Source newlines are HTML whitespace, not line breaks. Collapse them so a
            // paragraph wrapped across source lines emits as one line; only an explicit
            // <br> puts a newline in `buf`.
            buf += decode(text).replace(/\s+/g, ' ');
            continue;
        }

        const tag = rawTag.toLowerCase();
        const closing = m[0][1] === '/';

        switch (tag) {
            case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6': {
                flush();
                // The document already opens with a level-1 title, so an in-body
                // <h1> becomes an <h2> rather than a second top-level heading.
                if (!closing) buf = '#'.repeat(Math.max(2, Number(tag[1]))) + ' ';
                else flush();
                break;
            }
            case 'p': case 'div': case 'section': case 'article': case 'figcaption': case 'blockquote':
                flush();
                break;
            case 'br':
                buf += '\n';
                break;
            case 'hr':
                flush();
                out.push('---');
                break;
            case 'strong': case 'b':
                buf += '**';
                break;
            case 'em': case 'i':
                buf += '_';
                break;
            case 'code':
                buf += '`';
                break;
            case 'ul': case 'ol':
                flush();
                if (closing) listStack.pop();
                else listStack.push({ ordered: tag === 'ol', n: 0 });
                break;
            case 'li': {
                flush();
                if (!closing) {
                    const list = listStack[listStack.length - 1] || { ordered: false, n: 0 };
                    list.n += 1;
                    const indent = '  '.repeat(Math.max(0, listStack.length - 1));
                    buf = indent + (list.ordered ? `${list.n}. ` : '- ');
                }
                break;
            }
            case 'a': {
                if (closing) { buf += ']LINKHREF'; break; }
                const href = (attrs.match(/href="([^"]*)"/i) || [])[1];
                buf += `[`;
                buf += '';
                pendingHrefs.push(absolute(href, pageDir));
                break;
            }
            case 'img': {
                const src = (attrs.match(/src="([^"]*)"/i) || [])[1];
                const alt = decode((attrs.match(/alt="([^"]*)"/i) || [])[1] || '');
                flush();
                if (src) out.push(`![${alt}](${absolute(src, pageDir)})`);
                break;
            }
            case 'table': case 'tr':
                flush();
                break;
            case 'td': case 'th':
                buf += closing ? ' | ' : '';
                break;
            default:
                break;
        }
    }
    flush();

    // Resolve link placeholders in document order.
    let text = out.join('\n\n');
    text = text.replace(/\]LINKHREF/g, () => `](${pendingHrefs.shift() || ''})`);
    pendingHrefs.length = 0;

    return text
        .replace(/\[\s*\]\([^)]*\)/g, '')       // links that held only an icon
        .replace(/\*\*\s*\*\*/g, '')
        .replace(/_\s*_/g, '')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

let pendingHrefs = [];

/* ────────────────────────── page handling ────────────────────────── */

function meta(html, name, attr = 'name') {
    const m = html.match(new RegExp(`<meta[^>]+${attr}=["']${name}["'][^>]*\\scontent="([^"]*)"`, 'i'))
        || html.match(new RegExp(`<meta[^>]+${attr}=["']${name}["'][^>]*\\scontent='([^']*)'`, 'i'));
    return m ? decode(m[1]).replace(/\s+/g, ' ').trim() : '';
}

/** The part of the page a reader actually came for. */
function contentRegion(html) {
    const tts = html.indexOf('id="ttsContent"');
    if (tts !== -1) {
        const end = html.indexOf('</article>', tts);
        const start = html.indexOf('>', tts) + 1;
        return html.slice(start, end === -1 ? html.length : end);
    }
    const mainStart = html.indexOf('<main');
    if (mainStart !== -1) {
        const start = html.indexOf('>', mainStart) + 1;
        const end = html.indexOf('</main>', start);
        return html.slice(start, end === -1 ? html.length : end);
    }
    return '';
}

/** The hero headline and standfirst, which sit outside #ttsContent. */
function heroLead(html) {
    const h1 = html.match(/<h1[^>]*class="hero-title"[^>]*>([\s\S]*?)<\/h1>/i);
    const intro = html.match(/<div[^>]*class="hero-intro"[^>]*>([\s\S]*?)<\/div>/i);
    return {
        title: h1 ? decode(h1[1].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim() : '',
        intro: intro ? decode(intro[1].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim() : ''
    };
}

const ALTERNATE_MARK = 'type="text/markdown"';

/** Add <link rel="alternate" type="text/markdown"> to a page head, once. */
function injectAlternate(absPath, relUrl) {
    let html = fs.readFileSync(absPath, 'utf8');
    if (html.includes(ALTERNATE_MARK)) return false;
    const tag = `    <link rel="alternate" type="text/markdown" href="${ORIGIN}${relUrl}">\n`;
    const canonical = html.match(/[ \t]*<link rel="canonical"[\s\S]*?>\n/i);
    if (canonical) {
        html = html.replace(canonical[0], canonical[0] + tag);
    } else if (html.includes('</head>')) {
        html = html.replace('</head>', tag + '</head>');
    } else {
        return false;
    }
    fs.writeFileSync(absPath, html, 'utf8');
    return true;
}

function pageList() {
    const pages = [];
    for (const f of ROOT_PAGES) {
        if (fs.existsSync(path.join(ROOT, f))) pages.push(f);
    }
    for (const dir of CONTENT_DIRS) {
        const abs = path.join(ROOT, dir);
        if (!fs.existsSync(abs)) continue;
        for (const f of fs.readdirSync(abs).filter(n => n.endsWith('.html')).sort()) {
            pages.push(`${dir}/${f}`);
        }
    }
    return pages;
}

/* ────────────────────────── main ────────────────────────── */

let written = 0;
let tagged = 0;

for (const rel of pageList()) {
    const abs = path.join(ROOT, rel);
    const html = fs.readFileSync(abs, 'utf8');
    const pageDir = path.posix.dirname(rel) === '.' ? '' : path.posix.dirname(rel);

    const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || rel)
        .replace(/\s+/g, ' ').trim();
    const description = meta(html, 'description');
    const published = (html.match(/"datePublished"\s*:\s*"([^"]+)"/) || [])[1] || '';
    const section = (html.match(/"articleSection"\s*:\s*"([^"]+)"/) || [])[1] || '';

    const lead = heroLead(html);
    const body = toMarkdown(contentRegion(html), pageDir);

    const canonicalUrl = `${ORIGIN}/${rel}`;
    const front = [`# ${lead.title || title}`, ''];
    if (description) front.push(`> ${description}`, '');
    const facts = [];
    if (published) facts.push(`Published: ${published}`);
    if (section) facts.push(`Section: ${section}`);
    facts.push(`Source: ${canonicalUrl}`);
    front.push(facts.join('  \n'), '');
    if (lead.intro) front.push(lead.intro, '');

    const md = front.join('\n') + '\n' + body + '\n';

    const outPath = path.join(OUT, rel.replace(/\.html$/, '.md'));
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, md, 'utf8');
    written += 1;

    if (injectAlternate(abs, '/' + rel.replace(/\.html$/, '.md'))) tagged += 1;
}

console.log(`markdown twins written: ${written} into _md/, rel=alternate added to ${tagged} page(s).`);
