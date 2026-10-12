// Inserts the generated internal-linking and conversion blocks:
//   - pillar pages: buyer-guide + topic-cluster sections, extra FAQ entries
//     (visible accordion + FAQPage JSON-LD) and buyer-intent <title>/meta
//   - blogs, articles, case studies: "Related service" cluster box, and an
//     assessment CTA in place of a bare contact link
//   - case studies: "Project snapshot" card where the page has none
//   - product pages: "Used in" application links
// Content lives in scripts/content/pillar-sections.mjs and product-uses.mjs.
//
// Idempotent: generated markup sits between <!-- build-sections:* --> markers
// and is replaced on every run, so edit the content files and re-run:
//   node scripts/build-sections.mjs
// Run it after scripts/build-landing-pages.mjs, which regenerates its pages
// from scratch.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PILLARS, CALENDLY, POST_CLUSTERS, CASE_SNAPSHOTS } from './content/pillar-sections.mjs';
import { PRODUCT_USES } from './content/product-uses.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ARROW = '<i class="fa-solid fa-arrow-right"></i>';

const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function assessUrl(rel, asset) {
    const source = path.basename(rel, '.html');
    return `/monitoring-assessment.html?${asset ? `asset=${asset}&amp;` : ''}source=${source}`;
}

// Replace the region between start/end markers, or insert it at `at`.
function upsertRegion(html, name, content, at) {
    const start = `<!-- build-sections:${name}:start -->`;
    const end = `<!-- build-sections:${name}:end -->`;
    const block = `${start}\n${content}\n${end}`;
    const i = html.indexOf(start);
    if (i !== -1) {
        const j = html.indexOf(end, i);
        return html.slice(0, i) + block + html.slice(j + end.length);
    }
    return html.slice(0, at) + block + '\n' + html.slice(at);
}

function stripRegion(html, name) {
    const start = `<!-- build-sections:${name}:start -->`;
    const end = `<!-- build-sections:${name}:end -->`;
    const i = html.indexOf(start);
    if (i === -1) return html;
    const j = html.indexOf(end, i);
    return html.slice(0, i) + html.slice(j + end.length).replace(/^\r?\n/, '');
}

// Index just past the </div> that closes the <div> opening at `start`.
function closingDiv(html, start) {
    const re = /<(\/?)div[\s>]/g;
    re.lastIndex = start;
    let depth = 0, m;
    while ((m = re.exec(html))) {
        depth += m[1] ? -1 : 1;
        if (depth === 0) return html.indexOf('>', m.index) + 1;
    }
    throw new Error('unbalanced div');
}

function guideSection(rel, cfg, bg) {
    const g = cfg.guide;
    const cards = g.cards.map(c => `      <div class="buyer-guide-card">
        <h3><i class="fa-solid ${c.icon}" aria-hidden="true"></i> ${escText(c.title)}</h3>
        ${c.body}
      </div>`).join('\n');
    return `    <section class="sol-section ${bg}" id="buyer-guide">
    <div class="sol-section-inner">
      <div class="buyer-guide-head">
        <span class="sol-eyebrow">Buyer Guide</span>
        <h2 class="sol-section-title">${escText(g.title)}</h2>
        <p class="sol-section-subtitle">${escText(g.subtitle)}</p>
      </div>
      <div class="buyer-guide-grid">
${cards}
      </div>
      <div class="buyer-guide-actions">
        <a href="${assessUrl(rel, cfg.asset)}" class="sol-btn-primary" data-cta="assessment-buyer-guide">Request a Monitoring Assessment ${ARROW}</a>
        <a href="${CALENDLY}" class="sol-btn-secondary" data-cta="talk-to-engineer">${escText(cfg.engineer)}</a>
      </div>
    </div>
    </section>`;
}

function clusterSection(cfg, bg) {
    const cards = cfg.cluster.links.map(([icon, title, sub, href]) => `        <a href="${href}" class="sol-related-card">
          <div class="sol-related-icon"><i class="fa-solid ${icon}" aria-hidden="true"></i></div>
          <div class="sol-related-content">
            <h4>${escText(title)}</h4>
            <span>${escText(sub)}</span>
          </div>
          <div class="sol-related-arrow"><i class="fa-solid fa-chevron-right"></i></div>
        </a>`).join('\n');
    return `    <section class="sol-section ${bg}" id="topic-cluster">
    <div class="sol-section-inner">
      <div class="buyer-guide-head">
        <span class="sol-eyebrow">Explore This Topic</span>
        <h2 class="sol-section-title">${escText(cfg.cluster.title)}</h2>
      </div>
      <div class="sol-related-grid">
${cards}
      </div>
    </div>
    </section>`;
}

function faqItems(cfg, accId, withSpacer) {
    return cfg.faqs.map((f, i) => {
        const id = `${accId}-buyer${i + 1}`;
        return `<div class="accordion-item">
              <h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="false" aria-controls="${id}">${escText(f.q)}</button></h2>
              <div id="${id}" class="accordion-collapse collapse" data-bs-parent="#${accId}"><div class="accordion-body">${withSpacer ? '<div class="accordion-spacer"></div>' : ''}<p>${escText(f.a)}</p></div></div>
            </div>`;
    }).join('\n');
}

function updateFaqJsonLd(html, faqs) {
    return html.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (m, open, body, close) => {
        let data;
        try { data = JSON.parse(body); } catch { return m; }
        const faqNode = data['@type'] === 'FAQPage' ? data
            : Array.isArray(data['@graph']) ? data['@graph'].find(n => n['@type'] === 'FAQPage') : null;
        if (!faqNode) return m;
        const have = new Set(faqNode.mainEntity.map(q => q.name));
        let added = false;
        for (const f of faqs) {
            if (have.has(f.q)) continue;
            faqNode.mainEntity.push({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } });
            added = true;
        }
        if (!added) return m;
        return `${open}\n${JSON.stringify(data, null, 2)}\n    ${close}`;
    });
}

function updateSeo(html, seo) {
    const t = escAttr(seo.title), d = escAttr(seo.description);
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
        .replace(/(<meta name="description"\s+content=")[^"]*(")/, `$1${d}$2`)
        .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${t}$2`)
        .replace(/(<meta property="og:description"\s+content=")[^"]*(")/, `$1${d}$2`)
        .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${t}$2`)
        .replace(/(<meta name="twitter:description"\s+content=")[^"]*(")/, `$1${d}$2`);
    if (seo.subtitle) html = html.replace(seo.subtitle.from, seo.subtitle.to);
    return html;
}

for (const [rel, cfg] of Object.entries(PILLARS)) {
    const file = path.join(ROOT, rel);
    let html = fs.readFileSync(file, 'utf8');

    if (cfg.seo) html = updateSeo(html, cfg.seo);

    // Sections go immediately before the visible FAQ section.
    html = stripRegion(html, 'pillar');
    const mainAt = html.indexOf('<main');
    const faqHeading = html.indexOf('Frequently Asked', mainAt);
    if (faqHeading === -1) throw new Error(`${rel}: no FAQ section`);
    const faqSection = html.lastIndexOf('<section', faqHeading);
    const faqBg = /sol-bg-darker/.test(html.slice(faqSection, html.indexOf('>', faqSection))) ? 'sol-bg-darker' : 'sol-bg-dark';
    const other = faqBg === 'sol-bg-darker' ? 'sol-bg-dark' : 'sol-bg-darker';
    const sections = guideSection(rel, cfg, faqBg) + '\n\n' + clusterSection(cfg, other) + '\n';
    // Insert at the start of the line holding the FAQ <section>.
    const lineStart = html.lastIndexOf('\n', faqSection) + 1;
    html = upsertRegion(html, 'pillar', sections, lineStart);

    // Extra FAQ items, appended inside the FAQ accordion.
    html = stripRegion(html, 'faq');
    const faqAgain = html.indexOf('Frequently Asked', html.indexOf('build-sections:pillar:end'));
    const accMatch = /<div class="accordion" id="([^"]+)"/g;
    accMatch.lastIndex = faqAgain;
    const acc = accMatch.exec(html);
    if (!acc) throw new Error(`${rel}: no FAQ accordion`);
    // Several FAQ sections never close their accordion wrapper (the browser
    // closes it at </section>), so anchor on the last accordion item instead.
    const sectionEnd = html.indexOf('</section>', acc.index);
    const lastItem = html.lastIndexOf('<div class="accordion-item">', sectionEnd);
    const itemEnd = closingDiv(html, lastItem);
    const accHtml = html.slice(acc.index, sectionEnd);
    html = upsertRegion(html, 'faq', faqItems(cfg, acc[1], accHtml.includes('accordion-spacer')), itemEnd + 1);

    if (cfg.faqs.length) html = updateFaqJsonLd(html, cfg.faqs);

    fs.writeFileSync(file, html);
    console.log(`build-sections: ${rel}`);
}

// ── Blog / article clusters ────────────────────────────────────────────────

function postTitle(rel) {
    const html = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const m = html.match(/<h1 class="hero-title">([\s\S]*?)<\/h1>/);
    return m ? m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : path.basename(rel, '.html');
}

let postCount = 0;
for (const group of POST_CLUSTERS) {
    const posts = group.posts.map(p => (Array.isArray(p) ? { rel: p[0], pillar: p[1] } : { rel: p, pillar: group.pillar }));
    const titles = Object.fromEntries(posts.map(p => [p.rel, postTitle(p.rel)]));

    for (const post of posts) {
        const file = path.join(ROOT, post.rel);
        let html = fs.readFileSync(file, 'utf8');
        const slug = path.basename(post.rel, '.html');
        const assess = `/monitoring-assessment.html?${group.asset ? `asset=${group.asset}&amp;` : ''}source=${slug}`;

        const siblings = posts.filter(p => p.rel !== post.rel).slice(0, 3)
            .map(p => `            <li><a href="/${p.rel}">${titles[p.rel]}</a></li>`).join('\n');
        const box = `                    <div class="post-cluster">
          <span class="post-cluster-label">Related service</span>
          <a class="post-cluster-pillar" href="${post.pillar[1]}">${escText(post.pillar[0])} ${ARROW}</a>
          <ul class="post-cluster-list">
${siblings}
          </ul>
          <a class="post-cluster-assess" href="${assess}" data-cta="assessment-post-cluster">Request a monitoring assessment for your asset</a>
        </div>`;

        html = stripRegion(html, 'post-cluster');
        const ctaAt = html.indexOf('<div class="detail-cta">');
        if (ctaAt === -1) throw new Error(`${post.rel}: no detail-cta`);
        html = upsertRegion(html, 'post-cluster', box, html.lastIndexOf('\n', ctaAt) + 1);

        // Bare contact CTA -> assessment funnel (product / reseller CTAs are left alone).
        html = html.replace(
            /<a class="cta-btn" href="(?:\.\.)?\/contact\.html">[^<]*<i\s+class="fa-solid fa-arrow-right"><\/i><\/a>/,
            `<a class="cta-btn" href="${assess}" data-cta="assessment-post">Request a Monitoring Assessment ${ARROW}</a>`);

        fs.writeFileSync(file, html);
        postCount++;
    }
}
console.log(`build-sections: ${postCount} blog/article cluster boxes`);

// ── Case-study "Project snapshot" cards ────────────────────────────────────

for (const [rel, snap] of Object.entries(CASE_SNAPSHOTS)) {
    const file = path.join(ROOT, rel);
    let html = fs.readFileSync(file, 'utf8');
    const rows = (list) => list.map(([label, value]) => `                                    <div class="snapshot-label">${escText(label)}</div>
                                    <div class="snapshot-value">${escText(value)}</div>`).join('\n');
    const tech = snap.tech.map(([icon, label]) => `                                        <span class="snapshot-tech-item"><i class="fa-solid ${icon}"></i> ${escText(label)}</span>`).join('\n');
    const card = `                    <div class="snapshot-wrapper">
                        <div class="snapshot-card">
                            <div class="snapshot-grid">
                                <div>
                                    <div class="snapshot-icon-row"><i class="fa-solid ${snap.icon}"></i> <strong>Project snapshot</strong></div>
${rows(snap.left)}
                                </div>
                                <div>
                                    <div class="snapshot-label">Technologies on site</div>
                                    <div class="snapshot-tech-grid">
${tech}
                                    </div>
                                    <div style="margin-top:1rem">
${rows(snap.right)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
    html = stripRegion(html, 'case-snapshot');
    const article = html.indexOf('<article class="detail-article">');
    const firstH2 = html.indexOf('<h2', article);
    if (article === -1 || firstH2 === -1) throw new Error(`${rel}: no article heading`);
    html = upsertRegion(html, 'case-snapshot', card, html.lastIndexOf('\n', firstH2) + 1);
    fs.writeFileSync(file, html);
}
console.log(`build-sections: ${Object.keys(CASE_SNAPSHOTS).length} case-study snapshots`);

// ── Product "Used in" blocks ───────────────────────────────────────────────

for (const [rel, prod] of Object.entries(PRODUCT_USES)) {
    const file = path.join(ROOT, rel);
    let html = fs.readFileSync(file, 'utf8');
    const slug = path.basename(rel, '.html');
    const cards = prod.uses.map(([icon, title, sub, href]) => `                    <a href="${href}" class="used-in-card">
                        <span class="used-in-icon"><i class="fa-solid ${icon}" aria-hidden="true"></i></span>
                        <span class="used-in-text"><strong>${escText(title)}</strong><small>${escText(sub)}</small></span>
                        <i class="fa-solid fa-chevron-right used-in-arrow" aria-hidden="true"></i>
                    </a>`).join('\n');
    const block = `        <div class="section used-in-section">
            <div class="hero-container">
                <div class="sub-heading"><i class="fa-regular fa-circle-dot"></i><span>Used In</span></div>
                <h2 class="title-heading" style="font-size:clamp(22px,3.2vw,34px);">Where the ${escText(prod.name)} Is Used</h2>
                <div class="used-in-grid">
${cards}
                </div>
                <div class="used-in-actions">
                    <a href="/monitoring-assessment.html?source=product-${slug}" class="used-in-cta" data-cta="sensor-recommendation">Get a sensor recommendation for your structure ${ARROW}</a>
                    <a href="/technology/sensor-selection-guide.html" class="used-in-link">Sensor Selection Guide</a>
                </div>
            </div>
        </div>`;
    html = stripRegion(html, 'used-in');
    // Goes immediately before the FAQ section.
    const mainAt = html.indexOf('<main');
    const faq = html.indexOf('Frequently Asked', mainAt);
    if (faq === -1) throw new Error(`${rel}: no FAQ section`);
    const sectionAt = html.lastIndexOf('<div class="section', faq);
    html = upsertRegion(html, 'used-in', block, html.lastIndexOf('\n', sectionAt) + 1);
    fs.writeFileSync(file, html);
}
console.log(`build-sections: ${Object.keys(PRODUCT_USES).length} product "Used in" blocks`);
