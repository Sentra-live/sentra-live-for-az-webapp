// One-off: points the generic "Contact Us / Talk to an Expert" CTAs on
// solution, industry and case-study pages at the Monitoring Assessment funnel
// (monitoring-assessment.html), with ?asset= / ?source= so the form arrives
// pre-filled and GA4 knows which page produced the lead. Every rewritten link
// gets a data-cta attribute, which js/script.js reports as cta_click.
//
// Idempotent: links already pointing at the assessment page are left alone.
//   node scripts/update-ctas.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// asset: pre-selects the form's asset type. engineer: specialism named on the
// Calendly button. keepLabels: keep the page's own wording on the closing
// button (inspection / NDT / consulting CTAs are already specific).
const PAGES = {
    'solutions/structural-health-monitoring.html': { asset: '', engineer: 'SHM' },
    'solutions/geotechnical-and-foundation-monitoring.html': { asset: '', engineer: 'Geotechnical' },
    'solutions/fatigue-and-residual-life-assessment.html': { asset: 'bridge', engineer: 'SHM' },
    'solutions/digital-twin.html': { asset: '', engineer: '' },
    'solutions/asset-monitoring-and-management-solutions.html': { asset: 'industrial', engineer: '' },
    'solutions/bridge-inspection-and-condition-assessment.html': { asset: 'bridge', engineer: 'SHM', keepLabels: true },
    'solutions/advanced-non-destructive-testing-ndt.html': { asset: '', engineer: 'NDT', keepLabels: true },
    'solutions/consulting-and-advisory-services.html': { asset: '', engineer: 'SHM', keepLabels: true },
    'industries/bridges-highways-monitoring.html': { asset: 'bridge' },
    'industries/buildings-highrise-monitoring.html': { asset: 'building' },
    'industries/construction-tunnelling-monitoring.html': { asset: 'tunnel' },
    'industries/dams-reservoirs-monitoring.html': { asset: 'dam' },
    'industries/industrial-facilities-monitoring.html': { asset: 'industrial' },
    'industries/mining-geotechnical-monitoring.html': { asset: 'mine' },
    'industries/ports-marine-monitoring.html': { asset: 'other' },
    'industries/railway-infrastructure-monitoring.html': { asset: 'railway' },
    'case-studies/bridgepluse-ai-and-drone-technology-for-bridge-health-monitoring.html': { asset: 'bridge' },
    'case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html': { asset: 'railway' },
    'case-studies/railway-bridge-digital-twin-drone-lidar-inspection.html': { asset: 'railway' },
    'case-studies/railway-bridge-fatigue-life-assessment-load-testing.html': { asset: 'railway' },
    'case-studies/structural-health-monitoring-of-highway-bridges.html': { asset: 'bridge' },
    'case-studies/substation-digital-asset-management-predictive-maintenance.html': { asset: 'industrial' },
    'industries.html': { asset: '' },
    'solutions.html': { asset: '' },
};

const ARROW = '<i class="fa-solid fa-arrow-right"></i>';

function assessUrl(file, asset) {
    const source = path.basename(file, '.html');
    const q = (asset ? `asset=${asset}&amp;` : '') + `source=${source}`;
    return `/monitoring-assessment.html?${q}`;
}

// "Talk to an SHM Engineer", "Talk to a Geotechnical Engineer", "Talk to an Engineer"
function engineerLabel(kind) {
    if (!kind) return 'Talk to an Engineer';
    const article = /^(SHM|NDT|[AEIOU])/.test(kind) ? 'an' : 'a';
    return `Talk to ${article} ${kind} Engineer`;
}

let total = 0;
for (const [rel, cfg] of Object.entries(PAGES)) {
    const file = path.join(ROOT, rel);
    let html = fs.readFileSync(file, 'utf8');
    const url = assessUrl(rel, cfg.asset);
    const before = html;
    let n = 0;
    const count = (r) => { n++; return r; };

    // Hero / section primary button: "Talk to an Expert" -> assessment.
    html = html.replace(
        /<a href="\.?\/contact\.html" class="(sol-btn-primary|ind-btn-primary)"([^>]*)>Talk to an Expert\s*<i\s+class="fa-solid fa-arrow-right"><\/i><\/a>/g,
        (m, cls, rest) => count(`<a href="${url}" class="${cls}"${rest} data-cta="assessment-hero">Request a Monitoring Assessment ${ARROW}</a>`));

    // Industry closing section: "Get in Touch".
    html = html.replace(
        /<a href="\/contact\.html" class="sol-btn-primary">Get in Touch <i class="fa-solid fa-arrow-right"><\/i><\/a>/g,
        () => count(`<a href="${url}" class="sol-btn-primary" data-cta="assessment-final">Request a Monitoring Assessment ${ARROW}</a>`));

    // Solution closing panel: primary button.
    html = html.replace(
        /<a href="\/contact\.html" class="solx-cta-btn solx-magnetic">([^<]*?)\s*<i\s+class="fa-solid fa-arrow-right"><\/i><\/a>/g,
        (m, text) => count(`<a href="${url}" class="solx-cta-btn solx-magnetic" data-cta="assessment-final">${cfg.keepLabels ? text.trim() : 'Request a Monitoring Assessment'} ${ARROW}</a>`));

    // Solution closing panel: Calendly ghost button.
    html = html.replace(
        /<a href="(https:\/\/calendly\.com\/[^"]+)" class="solx-cta-ghost"><i class="fa-solid fa-calendar"><\/i> Schedule a Call<\/a>/g,
        (m, href) => count(`<a href="${href}" class="solx-cta-ghost" data-cta="talk-to-engineer"><i class="fa-solid fa-calendar"></i> ${engineerLabel(cfg.engineer)}</a>`));

    // Solution pages: remaining primary buttons, inline text links and the
    // benefits-grid CTA tile keep their specific wording, just re-pointed.
    html = html.replace(/<a href="\/contact\.html" class="sol-btn-primary">/g,
        () => count(`<a href="${url}" class="sol-btn-primary" data-cta="assessment-section">`));
    html = html.replace(/<a href="\/contact\.html" class="solx-link solx-anim">/g,
        () => count(`<a href="${url}" class="solx-link solx-anim" data-cta="assessment-inline">`));
    html = html.replace(/<a class="solx-benefit solx-benefit--cta" href="\/contact\.html">/g,
        () => count(`<a class="solx-benefit solx-benefit--cta" href="${url}" data-cta="assessment-tile">`));

    // Case studies.
    html = html.replace(
        /<a class="cta-btn" href="\/contact\.html">Contact us\s*<i\s+class="fa-solid fa-arrow-right"><\/i><\/a>/g,
        () => count(`<a class="cta-btn" href="${url}" data-cta="assessment-case-study">Request a Similar Monitoring Assessment ${ARROW}</a>`));

    // solutions.html hub.
    html = html.replace(/<a href="\.\/contact\.html" class="sol-btn-cta">Request a Consultation/g,
        () => count(`<a href="./monitoring-assessment.html?source=solutions" class="sol-btn-cta" data-cta="assessment-hub">Request a Monitoring Assessment`));

    if (html !== before) {
        fs.writeFileSync(file, html);
        console.log(`${rel}: ${n} CTA(s)`);
        total += n;
    }
}
console.log(`update-ctas: ${total} CTA(s) rewritten`);
