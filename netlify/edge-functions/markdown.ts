// Content negotiation: serve the Markdown twin of a page when the client asks
// for text/markdown, and the normal HTML to everybody else. Same URL, two
// representations - RFC 9110 content negotiation.
//
// The twins are generated at build time by scripts/generate-markdown.mjs into
// _md/, so this function does no HTML parsing: it maps a path, fetches a static
// file, and returns it. Anything unexpected falls through to the HTML, because
// a browser getting the page is always the safer failure.
//
// Declared for /* below, so keep the early exits first and cheap.

import type { Config, Context } from '@netlify/edge-functions';

/** Does this client actually prefer Markdown? */
function wantsMarkdown(accept: string): boolean {
    if (!accept) return false;

    let markdownQ = -1;
    let htmlQ = -1;

    for (const part of accept.split(',')) {
        const [rawType, ...params] = part.trim().split(';');
        const type = rawType.trim().toLowerCase();
        let q = 1;
        for (const p of params) {
            const [k, v] = p.split('=');
            if (k?.trim().toLowerCase() === 'q') q = Number(v) || 0;
        }
        if (type === 'text/markdown' || type === 'text/x-markdown') markdownQ = Math.max(markdownQ, q);
        if (type === 'text/html') htmlQ = Math.max(htmlQ, q);
    }

    // A browser sends text/html plus */*, never text/markdown, so it never
    // matches. An agent asking for both gets whichever it weighted higher.
    if (markdownQ < 0) return false;
    return markdownQ > 0 && markdownQ >= htmlQ;
}

/** /blogs/foo.html -> /_md/blogs/foo.md, or null if this isn't a page. */
function twinPath(pathname: string): string | null {
    let p = decodeURIComponent(pathname);
    if (p.endsWith('/')) p += 'index.html';
    if (!p.endsWith('.html')) {
        // Extensionless pretty URL, e.g. /contact
        if (/\.[a-z0-9]+$/i.test(p)) return null;
        p += '.html';
    }
    return '/_md' + p.replace(/\.html$/, '.md');
}

export default async (request: Request, _context: Context) => {
    if (request.method !== 'GET' && request.method !== 'HEAD') return;

    const url = new URL(request.url);
    const isMdUrl = url.pathname.endsWith('.md');

    // Two ways in: request /blogs/foo.md directly, or request /blogs/foo.html
    // with Accept: text/markdown. The first needs no header, so a plain curl
    // and the <link rel="alternate"> in the page head both work.
    if (!isMdUrl && !wantsMarkdown(request.headers.get('accept') ?? '')) return;

    const twin = isMdUrl ? '/_md' + decodeURIComponent(url.pathname) : twinPath(url.pathname);
    if (!twin || twin.includes('..')) return;

    const res = await fetch(new URL(twin, url), { headers: { accept: 'text/plain' } });
    if (!res.ok) return; // no twin for this page - let the HTML answer

    const htmlPath = url.pathname.endsWith('.md')
        ? url.pathname.replace(/\.md$/, '.html')
        : url.pathname;

    return new Response(request.method === 'HEAD' ? null : res.body, {
        status: 200,
        headers: {
            'content-type': 'text/markdown; charset=utf-8',
            'content-location': htmlPath.replace(/\.html$/, '.md'),
            // An alternate representation of the HTML page, not a page in its
            // own right: point search engines at the canonical and keep the
            // twin out of the index so it cannot read as duplicate content.
            link: '<' + url.origin + htmlPath + '>; rel="canonical"',
            'x-robots-tag': 'noindex',
            // Two representations share this URL, so caches must key on Accept.
            vary: 'Accept',
            'cache-control': 'public, max-age=3600',
            'x-content-type-options': 'nosniff',
        },
    });
};

export const config: Config = {
    path: '/*',
    // Never intercept the twins themselves or the static assets - saves the
    // Accept parse on the majority of requests.
    excludedPath: ['/_md/*', '/image/*', '/css/*', '/js/*', '/webfonts/*', '/videos/*'],
};
