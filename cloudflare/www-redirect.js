// 301 www.sentratech.in/* -> https://sentratech.in/* in a single hop (what
// netlify.toml's www redirects did).
//
//   npx wrangler deploy -c cloudflare/www-redirect.jsonc

export default {
    fetch(request) {
        const url = new URL(request.url);
        url.protocol = 'https:';
        url.hostname = 'sentratech.in';
        return Response.redirect(url.toString(), 301);
    },
};
