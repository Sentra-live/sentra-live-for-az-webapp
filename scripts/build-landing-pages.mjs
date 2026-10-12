// Generates the buyer-intent landing pages in scripts/content/landing-pages.mjs.
// They use a hand-built solution page as the shell (head assets, styles, baked
// header/footer, scripts) and the solution-page section layout from
// landing-solution-layout.mjs, so they match the rest of solutions/.
// The sensor selection guide keeps the industry-page shell and its own layout.
//
// Re-running regenerates each page from scratch, then:
//   node scripts/build-sections.mjs   (buyer guide + topic cluster)
//   node scripts/inline-partials.mjs  (only needed if header/footer changed)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANDING_PAGES } from './content/landing-pages.mjs';
import { SENSOR_GUIDE } from './content/sensor-guide.mjs';
import { solutionMain } from './landing-solution-layout.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://sentratech.in';
const SHELL = 'industries/railway-infrastructure-monitoring.html';
const SOLUTION_SHELL = 'solutions/fatigue-and-residual-life-assessment.html';
const ARROW = '<i class="fa-solid fa-arrow-right"></i>';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function head(p) {
    const url = `${ORIGIN}/${p.file}`;
    const t = esc(p.title), d = esc(p.description);
    const socialImage = p.heroImage ? `${ORIGIN}/${p.heroImage.replace(/^\.\.\//, '')}` : `${ORIGIN}/image/branding/sentra.webp`;
    const ld = (o) => `  <script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n  </script>`;
    return `  <title>${t}</title>
  <meta name="description" content="${d}" />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="${t}" />
  <meta property="og:description" content="${d}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="${socialImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${t}" />
  <meta name="twitter:description" content="${d}" />
  <meta name="twitter:image" content="${socialImage}" />
  <meta name="twitter:site" content="@sentratech" />
${ld(p.schema ? { '@context': 'https://schema.org', ...p.schema, url } : {
        '@context': 'https://schema.org', '@type': 'Service', name: p.serviceName, description: p.description,
        provider: { '@type': 'Organization', name: 'Sentra', url: `${ORIGIN}/` }, url, areaServed: 'India',
    })}
${ld({
        '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
            { '@type': 'ListItem', position: 2, name: (p.breadcrumb || ['Solutions'])[0], item: `${ORIGIN}${(p.breadcrumb || [null, '/solutions.html'])[1]}` },
            { '@type': 'ListItem', position: 3, name: p.serviceName, item: url },
        ],
    })}
${ld({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: p.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    })}
  <link rel="canonical" href="${url}">
`;
}

const shells = {
    industry: fs.readFileSync(path.join(ROOT, SHELL), 'utf8'),
    solution: fs.readFileSync(path.join(ROOT, SOLUTION_SHELL), 'utf8'),
};

for (const p of [...LANDING_PAGES, SENSOR_GUIDE]) {
    const useSolution = !p.mainHtml;
    let html = useSolution ? shells.solution : shells.industry;
    // Head metadata + JSON-LD: from <title> up to the first stylesheet link.
    const hs = html.indexOf('  <title>');
    const he = html.indexOf('  <link rel="stylesheet"');
    const headHtml = head(p);
    html = html.slice(0, hs) + headHtml + html.slice(he);
    if (useSolution) {
        // The solution shell keeps its canonical and JSON-LD after the stylesheets; drop them.
        const from = hs + headHtml.length;
        const to = html.indexOf('</head>');
        const rest = html.slice(from, to)
            .replace(/[ \t]*<link rel="canonical"[^>]*>\r?\n/g, '')
            .replace(/[ \t]*<script type="application\/ld\+json">[\s\S]*?<\/script>\r?\n?/g, '');
        html = html.slice(0, from) + rest + html.slice(to);
        // solution-sections.css gained the .solx-stats rules these pages use; bust the year-long cache.
        html = html.replace('../css/solution-sections.css"', '../css/solution-sections.css?v=2"');
    }
    // The shell's own FAQPage JSON-LD sits after its <style> block.
    html = html.replace(/<\/style>\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '</style>');
    // The shell's own Markdown twin link (generate-markdown.mjs adds the right one).
    html = html.replace(/[ \t]*<link rel="alternate" type="text\/markdown"[^>]*>\r?\n/, '');
    // Main content.
    const ms = html.indexOf('  <main>');
    const me = html.indexOf('</main>') + '</main>'.length;
    const slug = path.basename(p.file, '.html');
    const assess = `/monitoring-assessment.html?asset=${p.asset}&amp;source=${slug}`;
    const body = p.mainHtml ? p.mainHtml(p) : solutionMain(p, { esc, slug, assess, ARROW });
    html = html.slice(0, ms) + body + html.slice(me);
    // Page-specific styles and scripts.
    if (p.extraHead) html = html.replace('</head>', p.extraHead + '\n</head>');
    if (p.extraScripts) html = html.replace('</body>', p.extraScripts + '\n</body>');
    fs.writeFileSync(path.join(ROOT, p.file), html);
    console.log(`build-landing-pages: ${p.file}`);
}
