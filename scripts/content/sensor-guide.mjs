// Sensor Selection Guide (technology/sensor-selection-guide.html), the lead
// magnet. The same page prints to the gated PDF:
//   products/Datasheets/sentra-sensor-selection-guide.pdf
// Source for every figure: technology/shm-sensors.html and the product pages.

const PDF = '../products/Datasheets/sentra-sensor-selection-guide.pdf';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const FAILURE_MODES = [
    ['Fatigue in steel members', 'Dynamic strain, stress ranges, cycle counts', 'Strain gauges on critical details + synchronised DAQ', '50–100 Hz under traffic', '../products/strain-gauges.html'],
    ['Loss of stiffness', 'Natural frequency and damping over time', 'Accelerometers, plus temperature', '100–200 Hz for modal work', '../products/accelerometers.html'],
    ['Settlement or scour', 'Rotation and vertical movement of supports', 'Tiltmeters and GNSS', 'Periodic, with motion-triggered readings', '../products/tiltmeter.html'],
    ['Deflection under load', 'Mid-span displacement', 'LVDTs or laser distance', 'Synchronised with strain during load tests', '../products/analog-data-logger.html'],
    ['Tunnel or excavation deformation', 'Convergence and crown settlement', 'Laser tiltmeters', 'Periodic, per excavation stage', '../products/laser-tiltmeter.html'],
    ['Construction or blast vibration', 'Peak particle velocity and frequency', 'Vibration meters', '1000 Hz internal; reports every 10 min–6 h or on exceedance', '../products/vibration-meter.html'],
    ['Crack and joint movement', 'Opening, closing and growth of known cracks', 'Vibrating wire crackmeters via the G7 logger', 'Periodic', '../products/vibrating-wire.html'],
    ['Pore pressure and water level', 'Groundwater and uplift pressure', 'Vibrating wire piezometers via the G7 logger', 'Periodic', '../products/vibrating-wire.html'],
];

const SENSORS = [
    ['Strain gauge', 'Vibrating wire, models 4100 / 4150', [['3,000–10,000', 'microstrain range'], ['±0.5%', 'accuracy (datasheet)'], ['IP67', 'stainless steel']], 'Surface strain; stress via the elastic modulus. Spot-welded or epoxy/weld mounted on steel; also concrete and rock.', '../products/strain-gauges.html'],
    ['Accelerometer', 'Triaxial MEMS, model 4030', [['±2 / ±6 g', 'range options'], ['0.5–250 Hz', 'bandwidth'], ['IP65', '−40 to +80 °C']], 'Vibration and dynamic response in three axes. Engineers read natural frequencies, damping and peak acceleration.', '../products/accelerometers.html'],
    ['Vibration meter', 'Worldsensing, wireless', [['1000 Hz', 'internal sampling'], ['0–60 mm/s', 'PPV (±0.01)'], ['IP68', 'up to 2 yr battery']], 'Peak particle velocity and dominant frequency, processed on board. Bolted to structure or ground; no cable run.', '../products/vibration-meter.html'],
    ['Tiltmeter', 'Worldsensing, wireless', [['±0.005°', 'accuracy (XHP)'], ['±0.0001°', 'resolution'], ['10 yr', 'battery, IP68']], 'Inclination in three axes. Pier and support rotation, the earliest sign of settlement. LoRaWAN, up to 15 km in open terrain.', '../products/tiltmeter.html'],
    ['Laser tiltmeter', 'Worldsensing, wireless', [['±1 mm', 'at 10 m'], ['0.1 mm', 'resolution'], ['150 m', 'max range']], 'Distance to a fixed target plus 3-axis tilt. Tunnel convergence and crown settlement, with no contact with the moving surface.', '../products/laser-tiltmeter.html'],
    ['GNSS meter', 'Worldsensing, RTK multi-constellation', [['2 mm', 'horizontal, 24 h aggregate'], ['184', 'channels'], ['IP68', '−40 to +80 °C']], '3D position of a point over time. Long-term settlement and displacement, with a base unit on stable ground.', '../products/gnss-meter.html'],
];

const LOGGERS = [
    ['G7 vibrating wire logger', '1, 2 or 6 channels; reads any major VW sensor brand. LoRaWAN or 4G.', '../products/vibrating-wire.html'],
    ['Analog data logger', '4 channels: voltage, current, Wheatstone bridge, thermistor, for LVDTs and load cells.', '../products/analog-data-logger.html'],
    ['Digital data logger', 'RS485 Modbus RTU sensors onto the wireless network.', '../products/digital-data-logger.html'],
    ['4G gateway', 'Up to 1000+ nodes per network, 4G LTE backhaul, IP68.', '../products/gateway.html'],
    ['Repeater', 'Extends LoRaWAN underground and around obstacles.', '../products/repeater.html'],
];

const FAQS = [
    { q: 'Which sensors are used for bridge monitoring?',
      a: 'Typically strain gauges on girders and deck sections for stress and fatigue, tiltmeters on piers and bearings for rotation and settlement, and accelerometers for natural frequency and dynamic response. GNSS covers long-term displacement, and LVDTs measure deflection during load tests.' },
    { q: 'What sampling rate does structural monitoring need?',
      a: 'Static parameters such as settlement, tilt and crack width need only periodic readings. Dynamic strain under traffic is typically sampled at 50–100 Hz, and bridge modal analysis at 100–200 Hz, several times the highest frequency of interest.' },
    { q: 'Should I choose wired or wireless sensors?',
      a: 'Wireless LoRaWAN sensors avoid cable runs and suit long or hard-to-reach structures, with repeaters underground or around obstacles. Wired sensors such as vibrating wire gauges, LVDTs and Modbus devices join the same wireless network through G7, analog and digital data loggers.' },
];

function mainHtml(p) {
    const assess = '/monitoring-assessment.html?source=sensor-selection-guide';
    const rows = FAILURE_MODES.map(([mode, measure, sensor, sampling, href]) => `            <tr>
              <td><strong>${esc(mode)}</strong></td>
              <td>${esc(measure)}</td>
              <td><a href="${href}">${esc(sensor)}</a></td>
              <td>${esc(sampling)}</td>
            </tr>`).join('\n');
    const sensors = SENSORS.map(([name, model, specs, desc, href]) => `          <a href="${href}" class="sg-sensor">
            <span class="sg-sensor-name">${esc(name)}</span>
            <span class="sg-sensor-model">${esc(model)}</span>
            <span class="sg-sensor-specs">${specs.map(([v, l]) => `<span><strong>${esc(v)}</strong> ${esc(l)}</span>`).join('')}</span>
            <span class="sg-sensor-desc">${esc(desc)}</span>
          </a>`).join('\n');
    const loggers = LOGGERS.map(([n, d, h]) => `          <a href="${h}" class="sol-card">
            <span class="sol-card-title">${esc(n)}</span>
            <span class="sol-card-desc">${esc(d)}</span>
          </a>`).join('\n');
    const faqs = FAQS.map((f, i) => `            <div class="accordion-item">
              <h2 class="accordion-header"><button class="accordion-button${i ? ' collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#sg-faq${i + 1}" aria-expanded="${i ? 'false' : 'true'}" aria-controls="sg-faq${i + 1}">${esc(f.q)}</button></h2>
              <div id="sg-faq${i + 1}" class="accordion-collapse collapse${i ? '' : ' show'}" data-bs-parent="#sg-accordion"><div class="accordion-body"><p>${esc(f.a)}</p></div></div>
            </div>`).join('\n');

    return `  <main>
    <section class="ind-hero-sm">
      <div class="ind-hero-sm-bg" style="background-image:url('../image/industries/hero/bridge-structure.webp');"></div>
      <div class="ind-hero-sm-overlay"></div>
      <div class="ind-hero-sm-content">
        <div class="ind-hero-sm-tags">
          <span>Strain</span><span>Vibration</span><span>Tilt</span><span>Displacement</span><span>Settlement</span><span>Fatigue</span>
        </div>
        <img class="sg-print-logo" src="../image/branding/sentra_dark.svg" alt="Sentra" style="display:none;">
        <h1>Sensor Selection<br><span class="accent">Guide</span></h1>
        <p>Which sensor to use for strain, vibration, tilt, displacement, settlement and fatigue: start from the failure mode you are worried about, and match it to the measurement that captures it.</p>
        <div class="sg-no-print" style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <a href="#" class="sol-btn-primary" style="height:48px;padding:0 28px;font-size:14px;" data-brochure-download="${PDF}" data-brochure-name="Sensor Selection Guide" data-cta="download-sensor-guide"><i class="fa-solid fa-download"></i> Download the Guide (PDF)</a>
          <a href="${assess}" class="sol-btn-white" data-cta="sensor-recommendation">Get a Sensor Recommendation</a>
        </div>
      </div>
    </section>

    <section class="ind-content-block sol-bg-dark">
      <div class="ind-section-inner">
        <h2 class="sg-h2">Start From the <span class="accent">Failure Mode</span></h2>
        <p class="sol-section-sub" style="margin-left:0;">Match the question to the measurement. Every sensor here is one we supply and install; figures come from manufacturer datasheets.</p>
        <div class="sg-table-wrap">
          <table class="sg-table">
            <thead><tr><th>Failure mode</th><th>Measure</th><th>With</th><th>Sampling</th></tr></thead>
            <tbody>
${rows}
            </tbody>
          </table>
        </div>
        <p class="sg-note">Not in our range: fibre Bragg grating sensing and corrosion sensing.</p>
      </div>
    </section>

    <section class="ind-content-block sol-bg-darker">
      <div class="ind-section-inner">
        <h2 class="sg-h2">The <span class="accent">Sensors</span></h2>
        <p class="sol-section-sub" style="margin-left:0;">Key datasheet figures for each sensor, and what an engineer reads from it.</p>
        <div class="sg-sensor-grid">
${sensors}
        </div>
      </div>
    </section>

    <section class="ind-content-block sol-bg-dark">
      <div class="ind-section-inner">
        <h2 class="sg-h2">Loggers and <span class="accent">Gateways</span></h2>
        <p class="sol-section-sub" style="margin-left:0;">How readings leave the sensor. Strain, LVDT and accelerometer channels can share one clock at 100 Hz for load tests and dynamic response.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;">
${loggers}
        </div>
      </div>
    </section>

    <section class="ind-content-block sol-bg-darker sol-faq-section">
      <div class="ind-section-inner" style="max-width:800px;">
        <h2 style="font-size:clamp(22px,2.5vw,32px);font-weight:700;text-transform:uppercase;margin:0 0 24px;text-align:center;">Frequently Asked <span class="accent">Questions</span></h2>
        <div class="accordion" id="sg-accordion">
${faqs}
        </div>
      </div>
    </section>

    <section class="ind-content-block sol-bg-dark sg-no-print" style="text-align:center;padding:60px 0;">
      <div class="ind-section-inner">
        <h2 style="font-size:clamp(20px,2.2vw,28px);font-weight:700;text-transform:uppercase;margin:0 0 8px;">Not Sure Which Sensors<br><span class="accent">Your Structure Needs?</span></h2>
        <p class="sol-cta-sub">Tell us the failure mode you are worried about. We will propose the parameters, locations and sampling to capture it.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <a href="${assess}" class="sol-btn-primary" data-cta="sensor-recommendation">Get a Sensor Recommendation <i class="fa-solid fa-arrow-right"></i></a>
          <a href="#" class="sol-btn-white" data-brochure-download="${PDF}" data-brochure-name="Sensor Selection Guide" data-cta="download-sensor-guide"><i class="fa-solid fa-download"></i> Download PDF</a>
        </div>
      </div>
    </section>
    <p class="sg-print-only">Sentra Technologies · sentratech.in · +91 78930 23322 · sentra@clovetech.com · Request a monitoring assessment: sentratech.in/monitoring-assessment.html</p>
  </main>`;
}

const EXTRA_HEAD = `  <style>
    .sg-h2 { font-size:clamp(22px,2.5vw,32px); font-weight:700; text-transform:uppercase; margin:0 0 12px; }
    .sg-table-wrap { overflow-x:auto; border-radius:14px; border:1px solid rgba(255,255,255,.08); }
    .sg-table { width:100%; border-collapse:collapse; font-size:14px; min-width:640px; }
    .sg-table th { text-align:left; padding:14px 16px; font-size:12px; letter-spacing:1px; text-transform:uppercase; color:#f48120; background:rgba(244,129,32,.06); }
    .sg-table td { padding:14px 16px; border-top:1px solid rgba(255,255,255,.06); color:rgba(255,255,255,.7); vertical-align:top; line-height:1.5; }
    .sg-table td strong { color:#fff; }
    .sg-table a { color:#f48120; text-decoration:none; font-weight:600; font-size:inherit; }
    .sg-note { font-size:13px; color:rgba(255,255,255,.45); margin-top:14px; }
    .sg-sensor-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:16px; }
    .sg-sensor { display:flex; flex-direction:column; gap:8px; padding:22px; border-radius:14px; border:1px solid rgba(255,255,255,.06); background:rgba(255,255,255,.02); text-decoration:none; color:inherit; transition:border-color .25s; }
    .sg-sensor:hover { border-color:rgba(244,129,32,.3); }
    .sg-sensor-name { font-size:17px; font-weight:700; color:#f48120; }
    .sg-sensor-model { font-size:12px; color:rgba(255,255,255,.45); }
    .sg-sensor-specs { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin:6px 0; }
    .sg-sensor-specs span { font-size:11px; line-height:1.4; color:rgba(255,255,255,.5); }
    .sg-sensor-specs strong { display:block; font-size:15px; color:#fff; }
    .sg-sensor-desc { font-size:13px; line-height:1.6; color:rgba(255,255,255,.6); }
    body.lightmode .sg-table-wrap { border-color:rgba(0,0,0,.08); }
    body.lightmode .sg-table td { color:#555; border-top-color:rgba(0,0,0,.06); }
    body.lightmode .sg-table td strong, body.lightmode .sg-sensor-specs strong { color:#111; }
    body.lightmode .sg-sensor { background:#fff; border-color:rgba(0,0,0,.08); }
    body.lightmode .sg-sensor-model, body.lightmode .sg-sensor-specs span, body.lightmode .sg-note { color:#777; }
    body.lightmode .sg-sensor-desc { color:#555; }
    .sg-print-only { display:none; }
    @media print {
      @page { margin:14mm 12mm; }
      header, footer, aside, #preloader, .sg-no-print, #buyer-guide, #topic-cluster, #chatbot-container, .chatbot-toggle { display:none !important; }
      body, body.lightmode .sol-bg-dark, body.lightmode .sol-bg-darker, body .ind-content-block { background:#fff !important; color:#111 !important; }
      .ind-hero-sm { min-height:auto; padding:0 0 12px; }
      .ind-hero-sm-bg, .ind-hero-sm-overlay, .ind-hero-sm-tags { display:none; }
      .ind-hero-sm-content h1, .sg-h2, h2 { color:#111 !important; }
      .ind-hero-sm-content p, .sol-section-sub, .sg-table td, .sg-sensor-desc, .sg-sensor-specs span, .sol-card-desc, .accordion-body p { color:#333 !important; }
      .sg-table td strong, .sg-sensor-specs strong { color:#111 !important; }
      .sg-table tr, .sg-sensor, .sol-card, .accordion-item { break-inside:avoid; }
      .sg-sensor, .sol-card, .sg-table-wrap { border-color:#ccc !important; background:#fff !important; }
      .ind-content-block { padding:16px 0; }
      .sol-section-sub { margin-bottom:16px; }
      .accordion-item, .accordion-button, .accordion-body { background:#fff !important; border:0 !important; box-shadow:none !important; padding:0 !important; }
      .accordion-button { font-weight:700; color:#111 !important; margin:12px 0 4px; }
      .accordion-button::after { display:none !important; }
      .accordion-collapse { display:block !important; }
      .sg-print-only { display:block; text-align:center; font-size:11px; color:#333; margin:16px 0 0; }
      .sg-print-logo { display:block !important; height:34px; margin:0 auto 16px; }
    }
  </style>`;

export const SENSOR_GUIDE = {
    file: 'technology/sensor-selection-guide.html',
    title: 'Sensor Selection Guide for Structural Monitoring | Sentra',
    description: 'Which sensor to use for strain, vibration, tilt, displacement, settlement and fatigue monitoring: failure mode to measurement, datasheet figures, sampling rates and loggers.',
    serviceName: 'Sensor Selection Guide',
    breadcrumb: ['Technology', '/technology/index.html'],
    schema: {
        '@type': 'TechArticle',
        headline: 'Sensor Selection Guide for Structural Monitoring',
        description: 'Which sensor to use for strain, vibration, tilt, displacement, settlement and fatigue monitoring, matched to the failure mode.',
        author: { '@type': 'Organization', name: 'Sentra Technologies' },
        publisher: { '@type': 'Organization', name: 'Sentra', logo: { '@type': 'ImageObject', url: 'https://sentratech.in/image/branding/sentra.webp' } },
        datePublished: '2026-10-03',
        inLanguage: 'en',
    },
    faqs: FAQS,
    mainHtml,
    extraHead: EXTRA_HEAD,
    extraScripts: '  <script src="../js/brochure-download.js"></script>',
};
