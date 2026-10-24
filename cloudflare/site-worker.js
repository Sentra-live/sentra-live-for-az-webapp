// Runs only for /api/*, /index.html and for requests that matched no static file or
// _redirects rule. Static files themselves are served directly from dist/.

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (url.pathname.startsWith('/api/')) {
            return env.API.fetch(request);
        }

        if (url.pathname === '/index.html') {
            return Response.redirect(new URL('/' + url.search, url), 301);
        }

        // html_handling is "none": /dir/ is served from dir/index.html, and
        // /foo is 301'd to /foo.html (the form canonicals and sitemap.xml use)
        // so Google sees one URL per page instead of two.
        if (request.method === 'GET' || request.method === 'HEAD') {
            if (url.pathname.endsWith('/')) {
                const res = await env.ASSETS.fetch(new Request(new URL(`${url.pathname}index.html`, url), request));
                if (res.ok || res.status === 304) return res;
            } else {
                const candidate = new URL(`${url.pathname}.html`, url);
                const res = await env.ASSETS.fetch(new Request(candidate, { method: 'HEAD' }));
                if (res.ok) return Response.redirect(new URL(candidate.pathname + url.search, url), 301);
            }
        }

        const notFound = await env.ASSETS.fetch(new URL('/404.html', url));
        return new Response(request.method === 'HEAD' ? null : notFound.body, {
            status: 404,
            headers: notFound.headers,
        });
    },
};
