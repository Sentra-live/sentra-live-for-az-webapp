// Solution-page layout for the buyer-intent landing pages: same section flow and
// components as the hand-built pages in solutions/ (hero, what we do + what we
// measure, field evidence, how it works slideshow, case studies, hardware, FAQ, CTA).
const STEP_WORDS = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];

// Pick an icon from the wording of a measured parameter.
function paramIcon(text) {
    const t = text.toLowerCase();
    const rules = [
        [/temperature|thermal/, 'fa-temperature-half'],
        [/tilt|inclin|rotation/, 'fa-ruler-combined'],
        [/strain|stress|fatigue|cycle/, 'fa-chart-area'],
        [/deflection|displacement|settlement|movement/, 'fa-arrows-up-down'],
        [/frequency|vibration|acceleration|ppv|velocity/, 'fa-wave-square'],
        [/baseline|ambient|reference/, 'fa-sliders'],
        [/elevation|taller|storey/, 'fa-building'],
        [/current|motor|electrical/, 'fa-bolt'],
        [/bearing|gear|imbalance|misalign|rotating/, 'fa-gears'],
        [/alarm|alert|threshold/, 'fa-bell'],
        [/report|record|work order|cmms/, 'fa-file-lines'],
    ];
    for (const [re, icon] of rules) if (re.test(t)) return icon;
    return 'fa-circle-nodes';
}

// "Stress ranges at girder flanges (strain gauges)" -> title + sensor label
function splitParam(text) {
    const m = text.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
    if (m) return [m[1], m[2]];
    const c = text.match(/^([^:]+):\s*(.+)$/);
    if (c) return [c[1], c[2]];
    return [text, ''];
}

export function solutionMain(p, { esc, slug, assess, ARROW }) {
    const accId = `lp-${slug}`;
    const title = p.h1.join(' ');
    const steps = p.workflow;
    const slideImgs = [p.fieldImage, p.workflowImage, p.heroImage, p.fieldImage, p.workflowImage, p.heroImage];

    const params = p.intro.list.map((item) => {
        const [h, sensor] = splitParam(item);
        return `            <div class="solx-param">
              <span class="solx-param-icon"><i class="fa-solid ${paramIcon(item)}"></i></span>
              <h4>${esc(h.charAt(0).toUpperCase() + h.slice(1))}</h4>${sensor ? `
              <span class="solx-param-sensor">${esc(sensor.charAt(0).toUpperCase() + sensor.slice(1))}</span>` : ''}
            </div>`;
    }).join('\n');

    const stats = p.stats.items.map(([v, l], i) => `          <div class="solx-stat solx-anim${i === 0 ? ' solx-stat--lead' : ''}${/\d/.test(v) ? '' : ' solx-stat--text'}">
            <span class="solx-stat-value">${esc(v)}</span>
            <span class="solx-stat-label">${esc(l)}</span>
          </div>`).join('\n');

    const slides = steps.map(([t, d], i) => `              <div class="sol-slide${i === 0 ? ' active' : ''}">
                <div class="sol-sticky-slide">
                  <div class="sol-sticky-slide-img">
                    <img src="${slideImgs[i]}" alt="${esc(t)}" loading="lazy">
                  </div>
                  <div class="sol-sticky-slide-body">
                    <div class="sol-sticky-slide-step">
                      <span class="sol-sticky-slide-badge">0${i + 1}</span>
                      <span class="sol-sticky-slide-label">Step ${STEP_WORDS[i]}</span>
                    </div>
                    <h3 class="sol-sticky-slide-title">${esc(t)}</h3>
                    <p class="sol-sticky-slide-desc">${esc(d)}</p>
                  </div>
                </div>
              </div>`).join('\n');
    const dots = steps.map((_, i) => `                <button class="sol-slide-indicator-dot${i === 0 ? ' active' : ''}" aria-label="Step ${i + 1}"></button>`).join('\n');

    const caseIcons = ['fa-file-lines', 'fa-chart-line', 'fa-cube', 'fa-clipboard-check'];
    const cases = p.proof.cards.map(([t, d, href], i) => `          <a href="${href}" class="sol-related-card sol-reveal">
            <div class="sol-related-icon"><i class="fa-solid ${caseIcons[i % caseIcons.length]}"></i></div>
            <div class="sol-related-content">
              <h4>${esc(t)}</h4>
              <span>${esc(d)}</span>
            </div>
            <div class="sol-related-arrow"><i class="fa-solid fa-chevron-right"></i></div>
          </a>`).join('\n');

    const hardware = p.hardware.map(([t, d, href]) => `            <a class="solx-param" href="${href}">
              <span class="solx-param-icon"><i class="fa-solid ${paramIcon(t + ' ' + d)}"></i></span>
              <h4>${esc(t)}</h4>
              <p>${esc(d)}</p>
              <span class="solx-param-sensor">View product <i class="fa-solid fa-arrow-right"></i></span>
            </a>`).join('\n');

    const faqs = p.faqs.map((f, i) => `                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button${i ? ' collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#${accId}-faq${i + 1}" aria-expanded="${i ? 'false' : 'true'}" aria-controls="${accId}-faq${i + 1}">${esc(f.q)}</button>
                  </h2>
                  <div id="${accId}-faq${i + 1}" class="accordion-collapse collapse${i ? '' : ' show'}" data-bs-parent="#${accId}">
                    <div class="accordion-body">
                      <div class="accordion-spacer"></div>
                      <p>${esc(f.a)}</p>
                    </div>
                  </div>
                </div>`).join('\n');

    return `  <main>

    <section class="sol-hero">
      <div class="sol-hero-media">
        <img class="sol-hero-video" src="${p.heroImage}" alt="" width="1600" height="1067" fetchpriority="high" decoding="async">
        <div class="sol-hero-overlay"></div>
      </div>
      <div class="sol-hero-image-card">
        <img src="${p.fieldImage}" alt="${esc(p.fieldAlt)}" width="1200" height="800" decoding="async" style="aspect-ratio:4/3;object-fit:cover;">
      </div>
      <div class="sol-hero-container">
        <div class="sol-hero-content">
          <div class="sol-hero-tags">
${p.tags.map(t => `            <span class="sol-tag">${esc(t)}</span>`).join('\n')}
          </div>
          <h1 class="sol-hero-title">${esc(title)}</h1>
          <p class="sol-hero-subtitle">${esc(p.lead)}</p>
          <div class="sol-hero-actions">
            <a href="${assess}" class="sol-btn-primary" data-cta="assessment-hero">Request a Monitoring Assessment ${ARROW}</a>
            <a href="#sol-overview" class="sol-btn-secondary">Explore Solution</a>
          </div>
        </div>
      </div>
      <div class="sol-hero-scroll-indicator"><span></span></div>
    </section>

    <!-- 2. WHAT WE DO -->
    <section class="sol-section sol-bg-dark solx-wwd" id="sol-overview">
      <div class="sol-section-inner">
        <div class="solx-head solx-head--split">
          <div>
            <span class="sol-eyebrow solx-anim">What We Do</span>
            <h2 class="sol-section-title solx-anim">${esc(p.intro.h2.join(' '))}</h2>
          </div>
          <p class="sol-section-subtitle solx-anim">${esc(p.description)}</p>
        </div>

        <div class="solx-wwd-grid">
          <article class="solx-wwd-story solx-anim">
            <h3>${esc(p.serviceName)}</h3>
${p.intro.paras.map(x => `            <p>${esc(x)}</p>`).join('\n')}
            <ul class="solx-checks">
${p.tags.slice(0, 4).map(t => `              <li><i class="fa-solid fa-check"></i> ${esc(t)}</li>`).join('\n')}
            </ul>
            <div class="solx-actions">
              <a href="${assess}" class="sol-btn-primary" data-cta="assessment-section">Request a Monitoring Assessment ${ARROW}</a>
              <a href="#sol-how" class="solx-link">See how it works <i class="fa-solid fa-arrow-down"></i></a>
            </div>
          </article>
          <figure class="solx-wwd-media solx-anim">
            <img src="${p.workflowImage}" alt="${esc(p.workflowAlt)}" loading="lazy">
            <figcaption class="solx-live-chip"><span class="solx-live-dot"></span> ${esc(p.signal[0].charAt(0) + p.signal[0].slice(1).toLowerCase())}</figcaption>
            <div class="solx-media-stack" aria-hidden="true">
              <span><i class="fa-solid fa-wave-square"></i> ${esc(p.signal[1])}</span>
              <span><i class="fa-solid fa-chart-line"></i> ${esc(p.signal[2])}</span>
            </div>
          </figure>
        </div>

        <div class="solx-measure">
          <div class="solx-measure-head solx-anim">
            <h3>${esc(p.intro.listTitle)}</h3>
            <p>The parameters recorded on site, and the sensor that records each one.</p>
          </div>
          <div class="solx-param-grid">
${params}
          </div>
        </div>
      </div>
    </section>

    <!-- 3. KEY FIGURES -->
    <section class="sol-section sol-bg-darker solx-outcomes">
      <div class="sol-section-inner">
        <div class="solx-head">
          <span class="sol-eyebrow solx-anim">At a Glance</span>
          <h2 class="sol-section-title solx-anim">${esc(p.stats.title.join(' '))}</h2>
          <p class="sol-section-subtitle solx-anim">${esc(p.stats.sub)}</p>
        </div>
        <div class="solx-stats solx-stats--${p.stats.items.length}">
${stats}
        </div>
        <a href="${p.stats.link[1]}" class="solx-link solx-anim" style="margin-top:28px;display:inline-flex">${esc(p.stats.link[0])} <i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </section>

    <!-- 4. HOW IT WORKS -->
    <div class="sol-how-scroll-track">
      <section class="sol-section sol-bg-dark sol-how-sticky" id="sol-how">
        <div class="sol-section-inner">
          <div class="sol-how-header sol-reveal" style="max-width:700px;">
            <span class="sol-eyebrow">Process</span>
            <h2 class="sol-section-title">How It Works</h2>
            <p class="sol-section-subtitle">From field deployment to an engineering decision.</p>
          </div>
          <div class="sol-slideshow" id="solHowSlideshow">
            <div class="sol-slides-track">
${slides}
            </div>
            <div class="sol-slideshow-controls">
              <div class="sol-slideshow-progress">
                <div class="sol-slideshow-progress-bar">
                  <div class="sol-slideshow-progress-fill" style="width:${(100 / steps.length).toFixed(2)}%"></div>
                </div>
                <span class="sol-slideshow-counter"><span class="sol-slide-current">01</span> / 0${steps.length}</span>
              </div>
              <div class="sol-slide-indicators">
${dots}
              </div>
              <div class="sol-slideshow-arrows">
                <button class="sol-slide-btn sol-slide-prev" aria-label="Previous step"><i class="fa-solid fa-arrow-left"></i></button>
                <button class="sol-slide-btn sol-slide-next" aria-label="Next step"><i class="fa-solid fa-arrow-right"></i></button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 5. CASE STUDIES -->
    <section class="sol-section sol-bg-darker">
      <div class="sol-section-inner">
        <div class="sol-reveal" style="max-width:650px;margin-bottom:60px;">
          <span class="sol-eyebrow">Proof</span>
          <h2 class="sol-section-title">${esc(p.proof.title.join(' '))}</h2>
          <p class="sol-section-subtitle">${esc(p.proof.sub)}</p>
        </div>
        <div class="sol-related-grid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr));">
${cases}
        </div>
      </div>
    </section>

    <!-- 6. HARDWARE -->
    <section class="sol-section sol-bg-dark solx-system">
      <div class="sol-section-inner">
        <div class="solx-head">
          <span class="sol-eyebrow solx-anim">Hardware</span>
          <h2 class="sol-section-title solx-anim">Recommended Hardware</h2>
          <p class="sol-section-subtitle solx-anim">Sensors and edge hardware commonly deployed for this application.</p>
        </div>
        <div class="solx-measure" style="margin-top:36px;">
          <div class="solx-param-grid">
${hardware}
          </div>
        </div>
      </div>
    </section>

    <!-- 7. FAQ -->
    <section class="sol-section sol-bg-darker">
      <div class="hero-container">
        <div class="row row-cols-xl-2 row-cols-1 grid-spacer-5">
          <div class="col col-xl-5">
            <div class="faq-title-container sol-reveal">
              <div class="sub-heading">
                <i class="fa-regular fa-circle-dot"></i>
                <span>FAQ</span>
              </div>
              <h2 class="title-heading" style="font-size:clamp(22px,3.2vw,34px);">Frequently Asked Questions</h2>
              <p style="opacity:0.6;font-size:0.87rem;line-height:1.65;margin-top:1rem;">
                Can't find what you're looking for?
                <a href="../contact.html" style="color:var(--accent-color);">Contact our team</a>. We're happy to help.
              </p>
            </div>
          </div>
          <div class="col col-xl-7">
            <div class="d-flex flex-column">
              <div class="accordion" id="${accId}">
${faqs}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="solx-cta">
      <div class="solx-cta-panel">
        <div class="solx-cta-grid-bg" aria-hidden="true"></div>
        <div class="solx-cta-copy">
          <span class="solx-cta-badge"><span class="solx-live-dot"></span> Free Consultation Available</span>
          <h2 class="solx-cta-title">${esc(p.cta.h2.join(' '))}</h2>
          <p>${esc(p.cta.sub)}</p>
          <ul class="solx-cta-points">
            <li><i class="fa-solid fa-check"></i> No obligation</li>
            <li><i class="fa-solid fa-check"></i> Tailored to your asset</li>
            <li><i class="fa-solid fa-check"></i> Clear scope and timeline</li>
          </ul>
        </div>
        <div class="solx-cta-actions">
          <a href="${assess}" class="solx-cta-btn solx-magnetic" data-cta="assessment-final">Request a Monitoring Assessment ${ARROW}</a>
          <a href="https://calendly.com/sentra-clovetech/30min?primary_color=f48120" class="solx-cta-ghost" data-cta="talk-to-engineer"><i class="fa-solid fa-calendar"></i> Talk to an SHM Engineer</a>
          <a href="tel:+917893023322" class="solx-cta-phone"><i class="fa-solid fa-phone"></i> +91 78930 23322</a>
        </div>
      </div>
    </section>

  </main>`;
}
