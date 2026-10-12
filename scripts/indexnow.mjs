// Submit every URL in sitemap.xml to IndexNow (Bing, Yandex, Seznam, Naver;
// Ahrefs reads the same feed). Run after a deploy has gone live:
//   node scripts/indexnow.mjs            -> all sitemap URLs
//   node scripts/indexnow.mjs <url> ...  -> just these URLs
// The key file bb1b128e048091c6cde3cd2eeb0794af.txt must stay at the site root.
import fs from 'fs';

const HOST = 'sentratech.in';
const KEY = 'bb1b128e048091c6cde3cd2eeb0794af';

const urls = process.argv.length > 2
    ? process.argv.slice(2)
    : [...fs.readFileSync(new URL('../sitemap.xml', import.meta.url), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());

const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls.slice(0, 10000) })
});
console.log(`IndexNow: ${res.status} ${res.statusText} (${urls.length} URLs)`);
