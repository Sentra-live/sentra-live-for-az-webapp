// Content for the buyer-guide, topic-cluster and extra FAQ blocks that
// scripts/build-sections.mjs inserts into the five pillar pages.
//
// Rule: every statement here restates something already published on the
// site (the source page is noted per card). Cost cards list cost drivers,
// never prices.

const CALENDLY = 'https://calendly.com/sentra-clovetech/30min?primary_color=f48120';

// Shared answer for the "what drives cost" card, tuned per pillar.
const costPara = (drivers, extra = '') =>
    `<p>There is no fixed price; scope is set by the structure and the programme. The main drivers are:</p><ul>${drivers.map(d => `<li>${d}</li>`).join('')}</ul>${extra}`;

export const PILLARS = {
    'solutions/structural-health-monitoring.html': {
        asset: '',
        engineer: 'Talk to an SHM Engineer',
        seo: {
            title: 'Structural Health Monitoring Services in India | Sentra',
            description: 'Structural health monitoring services in India: site survey, sensor design, installation, 24/7 analytics and alerts for bridges, railways, buildings and dams.',
            subtitle: {
                from: /<p class="sol-hero-subtitle">Real-time intelligence for structures that cannot afford to fail: continuous\s+sensing, instant alerts, and predictive analytics in one integrated platform.<\/p>/,
                to: '<p class="sol-hero-subtitle">Structural health monitoring services for bridges, railways, buildings and dams in India: continuous sensing, instant alerts and engineering analysis from one team.</p>',
            },
        },
        guide: {
            title: 'Buying a Structural Health Monitoring System',
            subtitle: 'What an asset owner needs to know before asking for a proposal: what gets measured, how it is installed, what drives the cost and how quickly you get usable data.',
            cards: [
                { icon: 'fa-wave-square', title: 'What it measures',
                  body: '<ul><li>Displacement and settlement (<a href="/products/gnss-meter.html">GNSS</a>)</li><li>Vibration and modal response (<a href="/products/accelerometers.html">accelerometers</a>)</li><li>Strain, stress and fatigue (<a href="/products/strain-gauges.html">strain gauges</a>)</li><li>Tilt and rotation (<a href="/products/tiltmeter.html">tiltmeters</a>)</li><li>Crack and joint movement, pore pressure and temperature</li></ul>' },
                { icon: 'fa-diagram-project', title: 'How it is deployed',
                  body: '<p>Site survey and risk assessment, then instrumentation design, then installation by our own field engineers. Edge loggers and gateways send the data to cloud analytics, and you get alerts and monthly reports. <a href="#sol-how">See the six steps</a>.</p>' },
                { icon: 'fa-indian-rupee-sign', title: 'What drives the cost',
                  body: costPara([
                      'Number of measurement points and sensor types',
                      'Static trend monitoring or high-rate dynamic monitoring',
                      'Wireless or wired installation, and connectivity at site',
                      'Access constraints such as live traffic, height or water',
                      'Monitoring duration and depth of engineering reporting',
                  ], '<p><a href="/blogs/structural-health-monitoring-cost-factors.html">How SHM cost is built up</a></p>') },
                { icon: 'fa-clock', title: 'How long until you have data',
                  body: '<p>Readings and basic alerts arrive within hours to days of installation. A reliable structural baseline typically takes 2–6 weeks, and predictive models 2–6 months. We recommend a 4–8 week pilot to validate the measurements and tune alert thresholds.</p>' },
                { icon: 'fa-plug', title: 'Alerts, reports and integration',
                  body: '<p>Multi-tier alerts (warning, alert, critical) reach your team by SMS, email and dashboard. You also get monthly engineering reports and CSV export. If you need to integrate with an asset-management or SCADA platform, we scope that per project and confirm the route before it goes into a proposal.</p>' },
                { icon: 'fa-train', title: 'Have we done this before?',
                  body: '<p>Our railway bridge work for South Central Railway was instrumented and load-tested around running trains, following RDSO and BS-106R guidance. On an in-service 1960s steel railway bridge, our instrumentation measured a 5.3 Hz first natural frequency and a 98 MPa peak stress range, and gave an estimated 12–15 years of residual fatigue life. <a href="/case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html">Read the case study</a>.</p>' },
            ],
        },
        cluster: {
            title: 'Structural Health Monitoring: Services, Case Studies and Guides',
            links: [
                ['fa-train', 'Railway Bridge Monitoring', 'Strain, vibration and fatigue under live rail loads', '/solutions/railway-bridge-monitoring.html'],
                ['fa-road-bridge', 'Bridge Monitoring System', 'Bridges and highway structures', '/industries/bridges-highways-monitoring.html'],
                ['fa-helmet-safety', 'Construction Vibration Monitoring', 'Protecting adjacent structures during works', '/solutions/construction-vibration-monitoring.html'],
                ['fa-chart-line', 'Fatigue & Residual Life Assessment', 'Remaining life from measured stress ranges', '/solutions/fatigue-and-residual-life-assessment.html'],
                ['fa-indian-rupee-sign', 'What Drives SHM Cost', 'Scoping a monitoring programme and budget', '/blogs/structural-health-monitoring-cost-factors.html'],
                ['fa-sitemap', 'SHM System Architecture', 'From sensor to decision, layer by layer', '/technology/shm-architecture.html'],
                ['fa-microchip', 'SHM Sensors', 'Which sensor measures what', '/technology/shm-sensors.html'],
                ['fa-file-arrow-down', 'Sensor Selection Guide (PDF)', 'Which sensor for which failure mode', '/technology/sensor-selection-guide.html'],
                ['fa-file-lines', 'Case Study: Highway Bridges', 'A year of continuous data on a 30-year-old bridge', '/case-studies/structural-health-monitoring-of-highway-bridges.html'],
            ],
        },
        faqs: [
            { q: 'How much does structural health monitoring cost?',
              a: 'There is no fixed price. Cost depends on the number of measurement points and sensor types, whether high-rate dynamic monitoring is needed, wireless or wired installation and connectivity at site, access constraints such as live traffic, the monitoring duration, and how much engineering analysis and reporting you need. A site survey and a 4–8 week pilot are the usual way to fix scope and budget. Request a monitoring assessment and we will scope it for your structure.' },
        ],
    },

    'industries/bridges-highways-monitoring.html': {
        asset: 'bridge',
        engineer: 'Talk to an SHM Engineer',
        seo: {
            title: 'Bridge Health Monitoring System India | Sentra',
            description: 'Bridge monitoring system for highway and railway bridges in India: strain, tilt, displacement and vibration sensors with real-time alerts and engineering reports.',
            subtitle: {
                from: /<p>Continuous displacement, strain and inclination monitoring for bridges and highway structures to detect structural degradation before it becomes critical.<\/p>/,
                to: '<p>A bridge monitoring system that tracks displacement, strain, tilt and vibration continuously, so you know how your bridge is behaving between inspections.</p>',
            },
        },
        guide: {
            title: 'Choosing a Bridge Monitoring System',
            subtitle: 'The questions bridge owners and engineers ask before commissioning continuous monitoring, answered from our own deployments.',
            cards: [
                { icon: 'fa-wave-square', title: 'What it monitors',
                  body: '<ul><li>Deflection and displacement of spans</li><li>Strain on girders, decks and expansion joints</li><li>Pier tilt and bearing rotation</li><li>Vibration frequency and amplitude under traffic</li><li>Crack width, and fatigue cycle counting for remaining-life assessment</li></ul>' },
                { icon: 'fa-diagram-project', title: 'How it is installed',
                  body: '<p>After a site survey, strain gauges go on girders and deck sections, tiltmeters on piers and bearings, and accelerometers capture dynamic response. Sensors are retrofitted on live structures and report through LoRaWAN or cellular gateways to one dashboard.</p>' },
                { icon: 'fa-indian-rupee-sign', title: 'What drives the cost',
                  body: costPara([
                      'Number of spans, piers and bearings instrumented',
                      'Trend monitoring only, or dynamic response as well',
                      'Access: traffic management, height, water crossings',
                      'Whether load testing or fatigue assessment is included',
                      'Monitoring duration and reporting cadence',
                  ], '<p><a href="/blogs/structural-health-monitoring-cost-factors.html">How monitoring cost is built up</a></p>') },
                { icon: 'fa-clock', title: 'How fast you see results',
                  body: '<p>Sensors report periodically, every few minutes to hours, and immediately when a threshold is crossed. Readings start within hours to days of installation, and a reliable baseline typically takes 2–6 weeks. We recommend a 4–8 week pilot.</p>' },
                { icon: 'fa-bell', title: 'Alerts your team can act on',
                  body: '<p>Thresholds are set against structural design limits, so each level has an agreed response: warning, alert and critical. Notifications go out by SMS, email and dashboard, and scheduled engineering reports record what was measured and why it matters.</p>' },
                { icon: 'fa-road-bridge', title: 'Bridges we have monitored',
                  body: '<p>We monitored a four-lane highway bridge, more than 30 years old and carrying about 55,000 vehicles a day, for a year. We also instrumented a 1960s steel railway bridge under running trains. <a href="/case-studies/structural-health-monitoring-of-highway-bridges.html">Highway case study</a> · <a href="/case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html">Railway case study</a></p>' },
            ],
        },
        cluster: {
            title: 'Bridge Monitoring: Services, Case Studies and Guides',
            links: [
                ['fa-train', 'Railway Bridge Monitoring', 'Strain, vibration and fatigue under live rail loads', '/solutions/railway-bridge-monitoring.html'],
                ['fa-magnifying-glass', 'Bridge Inspection & Condition Assessment', 'Drone, NDT and AI-assisted inspection', '/solutions/bridge-inspection-and-condition-assessment.html'],
                ['fa-chart-line', 'Bridge Fatigue & Residual Life', 'Remaining life from measured stress ranges', '/solutions/fatigue-and-residual-life-assessment.html'],
                ['fa-file-lines', 'Case Study: BridgePulse', 'AI and drone bridge health monitoring', '/case-studies/bridgepluse-ai-and-drone-technology-for-bridge-health-monitoring.html'],
                ['fa-water', 'Bridge Scour Monitoring', 'What inspections miss below the waterline', '/blogs/bridge-scour-monitoring-iot-digital-twins.html'],
                ['fa-triangle-exclamation', '10 Early Warning Signs', 'When a bridge needs continuous monitoring', '/blogs/10-early-warning-signs-bridge-continuous-monitoring.html'],
                ['fa-eye-slash', 'Hidden Damage Inspections Miss', 'Five defects manual inspection overlooks', '/blogs/top-5-hidden-structural-damages-bridge-inspection.html'],
                ['fa-newspaper', 'Lessons from Bridge Collapses', 'What monitoring would have shown in Madhya Pradesh', '/article/madhya-pradesh-bridge-collapses-structural-health-monitoring.html'],
                ['fa-file-arrow-down', 'Sensor Selection Guide (PDF)', 'Which sensor for which failure mode', '/technology/sensor-selection-guide.html'],
            ],
        },
        faqs: [
            { q: 'How much does a bridge monitoring system cost?',
              a: 'It depends on the bridge and the programme: how many spans, piers and bearings are instrumented, whether dynamic response is measured as well as long-term trends, access conditions such as traffic, height or water, whether load testing or fatigue assessment is included, and how long monitoring runs. A site survey and a short pilot are the usual way to fix scope and budget. Request a monitoring assessment and we will scope it for your bridge.' },
        ],
    },

    'solutions/geotechnical-and-foundation-monitoring.html': {
        asset: '',
        engineer: 'Talk to a Geotechnical Engineer',
        seo: {
            title: 'Geotechnical Monitoring Services India | Sentra',
            description: 'Geotechnical monitoring services in India: inclinometers, piezometers, settlement and vibration monitoring with Amber/Red alerts for excavations, tunnels, slopes and dams.',
            subtitle: {
                from: /<p class="sol-hero-subtitle">Ground-level intelligence that keeps projects safe and on schedule: real-time\s+settlement, slope stability, and piezometric data from sub-millimetre precision instruments.<\/p>/,
                to: '<p class="sol-hero-subtitle">Geotechnical monitoring services that keep projects safe and on schedule: real-time settlement, slope stability and piezometric data from sub-millimetre precision instruments.</p>',
            },
        },
        guide: {
            title: 'Commissioning a Geotechnical Monitoring Programme',
            subtitle: 'What contractors, designers and asset owners should expect, from instrument selection to the reports that go into regulatory submissions.',
            cards: [
                { icon: 'fa-ruler-vertical', title: 'What it measures',
                  body: '<ul><li>Lateral ground deformation (<a href="/blogs/what-is-an-inclinometer-digital-tiltmeter-guide.html">inclinometers</a>)</li><li>Pore water pressure (piezometers)</li><li>Settlement (settlement sensors, extensometers)</li><li>Strain in piles and retaining walls (<a href="/products/vibrating-wire.html">vibrating wire</a>)</li><li>Surface movement (<a href="/products/gnss-meter.html">GNSS</a>), rotation (tiltmeters) and vibration (seismographs)</li></ul>' },
                { icon: 'fa-diagram-project', title: 'How it is delivered',
                  body: '<p>We start with a review of the site investigation, then design the monitoring network. Instruments go into boreholes, trenches and structural elements, with baseline readings taken before construction starts. Logging is automated: 15-minute cycles for routine monitoring, and 1-minute or continuous logging at critical stages.</p>' },
                { icon: 'fa-indian-rupee-sign', title: 'What drives the cost',
                  body: costPara([
                      'Number, type and depth of instruments and boreholes',
                      'Reading frequency during critical construction stages',
                      'Construction-phase only, or long-term surveillance after',
                      'Alert response arrangements and reporting cadence',
                  ], '<p>Programmes step down from intensive construction-phase monitoring to lower-frequency surveillance as the ground stabilises. That reduces cost without losing safety intelligence.</p>') },
                { icon: 'fa-bell', title: 'Alert levels and response',
                  body: '<p>Three tiers are set against design trigger levels: Amber, Amber+ and Red. An alert goes immediately by SMS and email to the site engineer, the geotechnical designer and the project manager. It names the instrument, the reading and the trigger level exceeded, and our engineers are available 24/7 to interpret it.</p>' },
                { icon: 'fa-file-signature', title: 'Reports for submissions',
                  body: '<p>Reports are typically weekly during active construction and monthly for long-term surveillance. They cover every reading, trend analysis, trigger-level status and any exceedance, with engineering commentary, and are structured for regulatory and contractual use.</p>' },
                { icon: 'fa-mountain', title: 'Where it is used',
                  body: '<p>Deep excavations, tunnelling, piling and embankment construction; slopes, dams and mine tailings in operation; and anywhere ground movement could affect public safety or adjacent structures. <a href="/industries/construction-tunnelling-monitoring.html">Construction</a> · <a href="/industries/mining-geotechnical-monitoring.html">Mining</a> · <a href="/industries/dams-reservoirs-monitoring.html">Dams</a></p>' },
            ],
        },
        cluster: {
            title: 'Geotechnical Monitoring: Services, Industries and Guides',
            links: [
                ['fa-helmet-safety', 'Construction Vibration Monitoring', 'Vibration limits for adjacent structures', '/solutions/construction-vibration-monitoring.html'],
                ['fa-person-digging', 'Construction & Tunnelling', 'Excavation, tunnel and settlement monitoring', '/industries/construction-tunnelling-monitoring.html'],
                ['fa-mountain', 'Mining & Slope Stability', 'Slope and ground movement monitoring', '/industries/mining-geotechnical-monitoring.html'],
                ['fa-water', 'Dams & Reservoirs', 'Deformation, seepage and pore pressure', '/industries/dams-reservoirs-monitoring.html'],
                ['fa-chart-area', 'Slope Stability Monitoring in Mining', 'Instruments and alert strategy', '/blogs/slope-stability-monitoring-mining.html'],
                ['fa-compass-drafting', 'What Is an Inclinometer?', 'Measuring lateral ground deformation', '/blogs/what-is-an-inclinometer-digital-tiltmeter-guide.html'],
                ['fa-satellite', 'GNSS Displacement Monitoring', 'Millimetre surface movement from satellites', '/blogs/gnss-displacement-monitoring-satellite-sensors.html'],
                ['fa-house-flood-water', 'Dam Safety Monitoring', 'LiDAR, drones and digital twins for dams', '/blogs/dam-safety-monitoring-lidar-drones-digital-twins.html'],
                ['fa-file-arrow-down', 'Sensor Selection Guide (PDF)', 'Which sensor for which failure mode', '/technology/sensor-selection-guide.html'],
            ],
        },
        faqs: [
            { q: 'How much does geotechnical monitoring cost?',
              a: 'It is set by the programme rather than a fixed price: the number, type and depth of instruments and boreholes, how often readings are needed during critical construction stages, whether monitoring continues long term after construction, and the alert-response and reporting arrangements. Programmes usually step down to lower-frequency surveillance as the ground stabilises, which reduces cost. Request a monitoring assessment and we will scope it for your project.' },
        ],
    },

    'solutions/digital-twin.html': {
        asset: '',
        engineer: 'Talk to an Engineer',
        seo: {
            title: 'Infrastructure Digital Twin for Monitoring | Sentra',
            description: 'Infrastructure digital twins built from LiDAR and drone capture, with live IoT sensor data bound to each component, for bridges, railways, substations and buildings.',
            subtitle: {
                from: /<p class="sol-hero-subtitle">A living digital replica of your physical assets, integrating BIM, IoT sensor\s+data, and predictive analytics to enable real-time visibility, simulation, and smarter decisions.<\/p>/,
                to: '<p class="sol-hero-subtitle">Digital twins for infrastructure monitoring and asset management: measured reality capture, BIM and live IoT sensor data in one model of your asset.</p>',
            },
        },
        guide: {
            title: 'Planning an Infrastructure Digital Twin',
            subtitle: 'What goes into a monitoring-grade digital twin, how long it takes, and what to check before you commission one.',
            cards: [
                { icon: 'fa-cube', title: 'What goes into it',
                  body: '<ul><li>Reality capture: drone survey, terrestrial LiDAR, handheld SLAM and 360° imagery</li><li>A model of named components built from the point cloud</li><li>Inspection, maintenance and construction records attached to those components</li><li>Live sensor channels bound to the part of the structure they measure</li></ul>' },
                { icon: 'fa-diagram-project', title: 'How it is delivered',
                  body: '<p>Data capture and scanning come first, followed by platform setup with data classified to ISO 19650. Then we integrate the IoT sensors, configure analytics and dashboards, validate the twin and train your team. After that, the twin keeps evolving with the asset.</p>' },
                { icon: 'fa-indian-rupee-sign', title: 'What drives the cost',
                  body: costPara([
                      'Size of the asset and the scanning effort',
                      'Level of model detail and number of components',
                      'Number of live sensor channels to bind',
                      'Existing systems to integrate (BMS, SCADA, CMMS)',
                      'Number of users and training required',
                  ]) },
                { icon: 'fa-clock', title: 'How long it takes',
                  body: '<p>A single building or infrastructure asset typically takes 8–16 weeks from survey to live platform. That breaks down as: scanning 1–2 days, BIM model 2–4 weeks, sensor installation 1–2 weeks, configuration and integration 2–4 weeks, and acceptance testing and training 1 week.</p>' },
                { icon: 'fa-plug', title: 'Platforms and protocols',
                  body: '<p>Delivered twins run in a browser-based viewer that combines 360° imagery, point cloud and the 3D model with measurement and records. Monitoring hardware reports over LoRaWAN, 4G and Modbus RTU. If you already run a twin or asset platform, we confirm what we can deliver into it before quoting.</p>' },
                { icon: 'fa-train', title: 'Twins we have delivered',
                  body: '<p>We built a twin of a 40.23 m open web girder railway bridge for South Central Railway, and a digital asset model of TGNPDCL\'s Bathupally substation. <a href="/case-studies/railway-bridge-digital-twin-drone-lidar-inspection.html">Railway bridge twin</a> · <a href="/case-studies/substation-digital-asset-management-predictive-maintenance.html">Substation case study</a></p>' },
            ],
        },
        cluster: {
            title: 'Digital Twins: Case Studies, Technology and Guides',
            links: [
                ['fa-train', 'Case Study: Railway Bridge Digital Twin', 'Drone and LiDAR inspection to a live twin', '/case-studies/railway-bridge-digital-twin-drone-lidar-inspection.html'],
                ['fa-bolt', 'Case Study: Substation Digital Asset Management', 'Predictive maintenance for a substation', '/case-studies/substation-digital-asset-management-predictive-maintenance.html'],
                ['fa-layer-group', 'SHM Digital Twin Technology', 'How monitoring data binds to the model', '/technology/structural-health-monitoring-digital-twin.html'],
                ['fa-gears', 'Digital Twin for Predictive Maintenance', 'How it works in practice', '/article/digital-twin-predictive-maintenance-sentra.html'],
                ['fa-cubes', 'Mesh, Point Cloud or Gaussian Splatting?', 'Choosing a twin representation', '/blogs/future-digital-twins-mesh-point-cloud-gaussian-splatting.html'],
                ['fa-satellite-dish', '3D Laser Scanning for Digital Twins', 'LiDAR capture for infrastructure', '/article/3d-laser-scanning-lidar-infrastructure-digital-twins.html'],
                ['fa-pen-ruler', 'Digital Engineering & Documentation', 'BIM, scan-to-BIM and ISO 19650', '/solutions/digital-engineering-and-documentation.html'],
                ['fa-heart-pulse', 'Structural Health Monitoring', 'The live data behind the twin', '/solutions/structural-health-monitoring.html'],
            ],
        },
        faqs: [
            { q: 'How much does an infrastructure digital twin cost?',
              a: 'It depends on the asset and the scope: the size of the asset and the scanning effort, the level of model detail, how many live sensor channels are bound to the model, which existing systems need integrating, and how many users need training. A single asset typically takes 8–16 weeks to deliver. Request an assessment and we will scope it for your asset.' },
        ],
    },

    'industries/industrial-facilities-monitoring.html': {
        asset: 'industrial',
        engineer: 'Talk to an Engineer',
        seo: {
            title: 'Industrial Vibration & Condition Monitoring | Sentra',
            description: 'Industrial condition monitoring: wireless vibration, temperature and current sensors for pumps, motors, compressors and transformers, with predictive maintenance alerts.',
            subtitle: {
                from: /<p>Asset health, predictive maintenance and equipment vibration monitoring for power plants, refineries and process industries.<\/p>/,
                to: '<p>Vibration and condition monitoring that detects equipment deterioration before failure disrupts operations in power plants, refineries and process industries.</p>',
            },
        },
        guide: {
            title: 'Setting Up Industrial Condition Monitoring',
            subtitle: 'What plant and maintenance teams should expect from an IoT condition-monitoring deployment, from the first asset survey to predictive alerts.',
            cards: [
                { icon: 'fa-gear', title: 'What it monitors',
                  body: '<ul><li>Vibration signatures on rotating equipment (<a href="/products/accelerometers.html">accelerometers</a>, <a href="/products/vibration-meter.html">vibration meters</a>)</li><li>Bearing temperature, motor current and power</li><li>Pipe wall thickness and corrosion</li><li>Foundation settlement, and vessel and tank integrity</li></ul><p>Typical assets: pumps, motors, fans, compressors, gearboxes, transformers and switchgear.</p>' },
                { icon: 'fa-diagram-project', title: 'How it is deployed',
                  body: '<p>We start with an asset inventory and criticality ranking, then install wireless instrumentation on the critical assets. After data integration we set baselines and thresholds, then run alert management and lifecycle reporting.</p>' },
                { icon: 'fa-indian-rupee-sign', title: 'What drives the cost',
                  body: costPara([
                      'Number of assets and sensors per asset',
                      'Sampling needs of each failure mode',
                      'Connectivity across the site and edge processing',
                      'Integration with existing CMMS, SCADA or BMS',
                  ]) },
                { icon: 'fa-clock', title: 'How long it takes',
                  body: '<p>A deployment covering 20–50 critical assets typically takes 4–8 weeks from site survey to live dashboard. Alerts are threshold-based during the first 4–8 weeks of baseline. Predictive alerts follow as the models learn each asset\'s behaviour.</p>' },
                { icon: 'fa-server', title: 'Resilience and integration',
                  body: '<p>Edge units buffer typically 30–90 days of data during connectivity outages, and can trigger local alarms without the cloud. Data exports as CSV. We confirm integration with a specific CMMS or ERP before it goes into a proposal.</p>' },
                { icon: 'fa-bolt', title: 'Where we have done it',
                  body: '<p>We built digital asset management and predictive maintenance for TGNPDCL\'s Bathupally substation, and intelligent monitoring and control for pump houses. <a href="/case-studies/substation-digital-asset-management-predictive-maintenance.html">Substation case study</a> · <a href="/article/intelligent-pump-house-monitoring-and-control.html">Pump house article</a></p>' },
            ],
        },
        cluster: {
            title: 'Industrial Monitoring: Services, Case Studies and Guides',
            links: [
                ['fa-gauge-high', 'Predictive Maintenance & Condition Monitoring', 'Detect deterioration before failure', '/solutions/predictive-maintenance-condition-monitoring.html'],
                ['fa-gears', 'Asset Monitoring & Management', 'Lifecycle monitoring across your asset base', '/solutions/asset-monitoring-and-management-solutions.html'],
                ['fa-bolt', 'Case Study: Substation Predictive Maintenance', 'Digital asset management for a substation', '/case-studies/substation-digital-asset-management-predictive-maintenance.html'],
                ['fa-industry', 'Predictive Maintenance with Vibration Sensors', 'IoT vibration monitoring in industrial facilities', '/article/predictive-maintenance-industrial-facilities-iot-vibration-sensors.html'],
                ['fa-faucet-drip', 'Intelligent Pump House Monitoring', 'Monitoring and control for pump stations', '/article/intelligent-pump-house-monitoring-and-control.html'],
                ['fa-building', 'Asset Monitoring for Facility Management', 'End-to-end IoT implementation', '/blogs/asset-monitoring-facility-management.html'],
                ['fa-wave-square', 'What Is an Accelerometer?', 'The sensor behind vibration monitoring', '/blogs/what-is-an-accelerometer-sensor-guide.html'],
            ],
        },
        faqs: [
            { q: 'How much does industrial condition monitoring cost?',
              a: 'It scales with the number of assets and sensors per asset, the sampling each failure mode needs, connectivity and edge processing across the site, and any integration with an existing CMMS, SCADA or BMS. A deployment covering 20–50 critical assets typically takes 4–8 weeks from survey to live dashboard. Request an assessment and we will scope it for your facility.' },
        ],
    },

    // ── Landing pages generated by build-landing-pages.mjs (their own FAQs and
    //    meta come from landing-pages.mjs, so no seo / faqs here). ──

    'solutions/railway-bridge-monitoring.html': {
        asset: 'railway',
        engineer: 'Talk to an SHM Engineer',
        guide: {
            title: 'How a Railway Bridge Monitoring Programme Runs',
            subtitle: 'From the first survey to a residual fatigue life figure, based on our railway bridge instrumentation and load testing work.',
            cards: [
                { icon: 'fa-diagram-project', title: 'How it is deployed',
                  body: '<p>We survey geometry, camber and bearing condition before instrumenting. Controlled train runs set reference stress and deflection profiles. Then we record continuously at operational speeds, log timestamped data automatically to the cloud, and validate it against the design model.</p>' },
                { icon: 'fa-weight-hanging', title: 'Load testing',
                  body: '<p>Under RDSO guidance the test conditions include a stationary locomotive and wagon, slow and design-speed moving loads, accelerating loads, and braking at about 20 km/h. Which tests run, and in what order, is agreed with the railway beforehand.</p>' },
                { icon: 'fa-clock', title: 'Monitoring period',
                  body: '<p>Our steel plate girder deployment logged continuously for three months at 100 Hz. For fatigue assessment, the methodology recommends around four weeks at 50–100 Hz, plus 72 hours of normal traffic for a selected train.</p>' },
                { icon: 'fa-indian-rupee-sign', title: 'What drives the cost',
                  body: costPara([
                      'Number of spans and members instrumented',
                      'Whether load testing and FE model calibration are included',
                      'Track access and block arrangements',
                      'Sampling rate and monitoring duration',
                      'Depth of fatigue assessment and reporting',
                  ]) },
                { icon: 'fa-bell', title: 'Alerts and dashboards',
                  body: '<p>Engineers watch bridge behaviour in real time and set alarm thresholds. The system automatically flags deviations beyond permissible values, and multi-tier alerts reach your team by SMS, email and dashboard.</p>' },
                { icon: 'fa-chart-line', title: 'What you get at the end',
                  body: '<p>Measured stress range, deflection, natural frequency and fatigue damage index, each against its limit. You also get a calibrated finite element model and a residual fatigue life estimate. <a href="/solutions/fatigue-and-residual-life-assessment.html">Fatigue &amp; residual life assessment</a></p>' },
            ],
        },
        cluster: {
            title: 'Railway Bridge Monitoring: Related Services and Reading',
            links: [
                ['fa-heart-pulse', 'Structural Health Monitoring', 'The full SHM service', '/solutions/structural-health-monitoring.html'],
                ['fa-train', 'Railway Infrastructure Monitoring', 'Track, bridges and rail structures', '/industries/railway-infrastructure-monitoring.html'],
                ['fa-road-bridge', 'Bridge Monitoring System', 'Highway and road bridges', '/industries/bridges-highways-monitoring.html'],
                ['fa-chart-line', 'Fatigue & Residual Life Assessment', 'Remaining life from measured stress ranges', '/solutions/fatigue-and-residual-life-assessment.html'],
                ['fa-cube', 'Case Study: Railway Bridge Digital Twin', 'Drone and LiDAR for a 40.23 m girder bridge', '/case-studies/railway-bridge-digital-twin-drone-lidar-inspection.html'],
                ['fa-newspaper', 'Remote Monitoring for Rail Infrastructure', 'Track to the future', '/article/track-to-the-future-remote-monitoring-rail-infrastructure.html'],
                ['fa-ruler', 'What Is a Strain Gauge?', 'How stress is measured on steel members', '/blogs/what-is-a-strain-gauge-types-working-principle.html'],
                ['fa-file-arrow-down', 'Sensor Selection Guide (PDF)', 'Which sensor for which failure mode', '/technology/sensor-selection-guide.html'],
            ],
        },
        faqs: [],
    },

    'solutions/construction-vibration-monitoring.html': {
        asset: 'building',
        engineer: 'Talk to an Engineer',
        guide: {
            title: 'Setting Up Vibration Monitoring Around Your Site',
            subtitle: 'How a construction vibration programme is planned, what it costs to run, and what it gives you if a damage claim is raised.',
            cards: [
                { icon: 'fa-diagram-project', title: 'How it is deployed',
                  body: '<p>We identify the nearest receptors and the transmission path from the works. Sensors go at foundation level and at several elevations on tall buildings, with reference sensors away from the site. Then we record an ambient baseline and start live monitoring, with FFT analysis at the sensor node.</p>' },
                { icon: 'fa-hammer', title: 'Know your vibration sources',
                  body: '<ul><li>Piling: high-energy, low-frequency, travels far</li><li>Demolition: impulsive, high-amplitude</li><li>Tunnelling: continuous, low-level, with settlement risk</li><li>Compaction: sustained surface vibration</li><li>Blasting: transient, high-frequency</li></ul>' },
                { icon: 'fa-indian-rupee-sign', title: 'What drives the cost',
                  body: costPara([
                      'Number of adjacent structures and sensors',
                      'Duration of the works',
                      'Tilt and settlement alongside vibration',
                      'Alert levels and response arrangements',
                      'Reporting cadence for stakeholders and regulators',
                  ]) },
                { icon: 'fa-bell', title: 'Alerts and reports',
                  body: '<p>Thresholds are set per sensor, for PPV, tilt, displacement or rate of change, and breaches notify the project team immediately. Reports are generated automatically, daily, weekly or per event.</p>' },
                { icon: 'fa-scale-balanced', title: 'Evidence if a claim is raised',
                  body: '<p>A continuous, timestamped vibration record documents what neighbouring structures were actually exposed to. That gives you evidence in damage claims or disputes, and shows proactive care of the surrounding buildings.</p>' },
                { icon: 'fa-mountain', title: 'Ground movement too',
                  body: '<p>Excavation and tunnelling also move the ground. Settlement, inclinometer and piezometer monitoring with Amber, Amber+ and Red trigger levels runs on the same platform. <a href="/solutions/geotechnical-and-foundation-monitoring.html">Geotechnical monitoring</a></p>' },
            ],
        },
        cluster: {
            title: 'Construction Monitoring: Related Services and Reading',
            links: [
                ['fa-mountain', 'Geotechnical & Foundation Monitoring', 'Settlement, slope and ground movement', '/solutions/geotechnical-and-foundation-monitoring.html'],
                ['fa-person-digging', 'Construction & Tunnelling', 'Excavation, tunnel and settlement monitoring', '/industries/construction-tunnelling-monitoring.html'],
                ['fa-building', 'Buildings & High-Rise Monitoring', 'Tilt, settlement and seismic response', '/industries/buildings-highrise-monitoring.html'],
                ['fa-file-lines', 'Construction-Induced Vibrations Guide', 'Thresholds, placement and analysis', '/blogs/monitoring-construction-induced-vibrations.html'],
                ['fa-house-crack', 'Seismic Monitoring for Buildings', 'Accelerometers on critical structures', '/blogs/seismic-monitoring-buildings-critical-infrastructure.html'],
                ['fa-wave-square', 'What Is an Accelerometer?', 'The sensor behind vibration monitoring', '/blogs/what-is-an-accelerometer-sensor-guide.html'],
                ['fa-heart-pulse', 'Structural Health Monitoring', 'Long-term monitoring of the structure itself', '/solutions/structural-health-monitoring.html'],
                ['fa-file-arrow-down', 'Sensor Selection Guide (PDF)', 'Which sensor for which failure mode', '/technology/sensor-selection-guide.html'],
            ],
        },
        faqs: [],
    },

    'solutions/predictive-maintenance-condition-monitoring.html': {
        asset: 'industrial',
        engineer: 'Talk to an Engineer',
        guide: {
            title: 'Rolling Out Condition Monitoring in a Working Plant',
            subtitle: 'What maintenance and reliability teams should plan for, from the first criticality ranking to predictive alerts.',
            cards: [
                { icon: 'fa-diagram-project', title: 'How it is deployed',
                  body: '<p>We catalogue your assets and rank them by criticality, then put wireless sensors on the critical ones. After data integration we set baselines and alert thresholds. Then we run alert management and lifecycle reporting, including remaining useful life projections.</p>' },
                { icon: 'fa-wave-square', title: 'Sampling that catches faults early',
                  body: '<p>A sensor that reports only an RMS value every few hours catches a machine that is already deteriorating badly. Early warning needs devices that capture a full waveform and transmit a spectrum.</p>' },
                { icon: 'fa-tower-broadcast', title: 'A network built for the plant',
                  body: '<p>Steel structure, concrete and rotating machinery make a hostile radio environment. LoRaWAN gateways handle range and penetration well for periodic spectra, and repeaters cover the awkward corners.</p>' },
                { icon: 'fa-indian-rupee-sign', title: 'What drives the cost',
                  body: costPara([
                      'Number of assets and sensors per asset',
                      'Sampling each failure mode needs',
                      'Gateways, repeaters and edge processing',
                      'Integration with CMMS, SCADA or BMS',
                  ]) },
                { icon: 'fa-clock', title: 'How long it takes',
                  body: '<p>20–50 critical assets typically go from site survey to live dashboard in 4–8 weeks. Alerts are threshold-based during the first 4–8 week baseline period, and predictive alerts improve as the models learn each asset.</p>' },
                { icon: 'fa-plug', title: 'Alerts and integration',
                  body: '<p>Alerts arrive by dashboard, SMS and email, with diagnostic context, and data exports as CSV. If alerts or readings need to reach a specific CMMS or ERP, we confirm the route before it goes into a proposal.</p>' },
            ],
        },
        cluster: {
            title: 'Industrial Monitoring: Related Services and Reading',
            links: [
                ['fa-industry', 'Industrial Facilities Monitoring', 'Power, refineries and process industry', '/industries/industrial-facilities-monitoring.html'],
                ['fa-gears', 'Asset Monitoring & Management', 'Lifecycle monitoring across your asset base', '/solutions/asset-monitoring-and-management-solutions.html'],
                ['fa-bolt', 'Case Study: Substation Predictive Maintenance', 'Digital asset management for a substation', '/case-studies/substation-digital-asset-management-predictive-maintenance.html'],
                ['fa-file-lines', 'Predictive Maintenance with Vibration Sensors', 'Building the IoT layer in a plant', '/article/predictive-maintenance-industrial-facilities-iot-vibration-sensors.html'],
                ['fa-faucet-drip', 'Intelligent Pump House Monitoring', 'Monitoring and control for pump stations', '/article/intelligent-pump-house-monitoring-and-control.html'],
                ['fa-cube', 'Digital Twin for Predictive Maintenance', 'How the twin supports maintenance', '/article/digital-twin-predictive-maintenance-sentra.html'],
                ['fa-building', 'Asset Monitoring for Facility Management', 'End-to-end IoT implementation', '/blogs/asset-monitoring-facility-management.html'],
            ],
        },
        faqs: [],
    },
};

export { CALENDLY };

// Blog / article clusters: each post gets a "Related service" box linking up
// to its pillar and across to sibling posts, and (if its CTA is a bare
// contact link) a Monitoring Assessment CTA. `pillar` can be overridden per post.
export const POST_CLUSTERS = [
    {
        pillar: ['Bridge Monitoring System', '/industries/bridges-highways-monitoring.html'], asset: 'bridge',
        posts: [
            'blogs/10-early-warning-signs-bridge-continuous-monitoring.html',
            'blogs/bridge-scour-monitoring-iot-digital-twins.html',
            'blogs/top-5-hidden-structural-damages-bridge-inspection.html',
            'article/madhya-pradesh-bridge-collapses-structural-health-monitoring.html',
            ['blogs/fatigue-life-assessment.html', ['Fatigue & Residual Life Assessment', '/solutions/fatigue-and-residual-life-assessment.html']],
            ['article/track-to-the-future-remote-monitoring-rail-infrastructure.html', ['Railway Bridge Monitoring', '/solutions/railway-bridge-monitoring.html']],
            'case-studies/structural-health-monitoring-of-highway-bridges.html',
            'case-studies/bridgepluse-ai-and-drone-technology-for-bridge-health-monitoring.html',
            ['case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html', ['Railway Bridge Monitoring', '/solutions/railway-bridge-monitoring.html']],
            ['case-studies/railway-bridge-fatigue-life-assessment-load-testing.html', ['Railway Bridge Monitoring', '/solutions/railway-bridge-monitoring.html']],
            ['article/metro-rail-monitoring-tunnels-viaducts-stations.html', ['Railway Infrastructure Monitoring', '/industries/railway-infrastructure-monitoring.html']],
        ],
    },
    {
        pillar: ['Structural Health Monitoring Services', '/solutions/structural-health-monitoring.html'], asset: '',
        posts: [
            'blogs/structural-health-monitoring.html',
            'blogs/structural-health-monitoring-cost-factors.html',
            'blogs/continuous-building-shm-iot-sensors.html',
            'blogs/seismic-monitoring-buildings-critical-infrastructure.html',
            'blogs/real-time-monitoring-solutions-transforming-infrastructure-safety-performance.html',
            'article/ai-infrastructure-monitoring.html',
            'article/revolutionizing-infrastructure-monitoring-with-iot.html',
            'article/shm-consulting-expert-advisory-infrastructure-risk.html',
            'blogs/what-is-a-strain-gauge-types-working-principle.html',
            'blogs/what-is-an-accelerometer-sensor-guide.html',
            'blogs/what-is-a-data-logger-types-guide.html',
        ],
    },
    {
        pillar: ['Geotechnical Monitoring Services', '/solutions/geotechnical-and-foundation-monitoring.html'], asset: '',
        posts: [
            'blogs/early-warning-plan-critical-infrastructure-checklist.html',
            'article/nepal-flash-floods-early-warning-himalayan-infrastructure.html',
            'blogs/slope-stability-monitoring-mining.html',
            'blogs/gnss-displacement-monitoring-satellite-sensors.html',
            'blogs/dam-safety-monitoring-lidar-drones-digital-twins.html',
            'blogs/what-is-an-inclinometer-digital-tiltmeter-guide.html',
            ['blogs/monitoring-construction-induced-vibrations.html', ['Construction Vibration Monitoring', '/solutions/construction-vibration-monitoring.html']],
            ['article/10-construction-technologies-redefining-the-industry.html', ['Construction Vibration Monitoring', '/solutions/construction-vibration-monitoring.html']],
        ],
    },
    {
        pillar: ['Infrastructure Digital Twins', '/solutions/digital-twin.html'], asset: '',
        posts: [
            'article/digital-twin-predictive-maintenance-sentra.html',
            'blogs/future-digital-twins-mesh-point-cloud-gaussian-splatting.html',
            'article/3d-laser-scanning-lidar-infrastructure-digital-twins.html',
            'article/building-resilient-smart-cities-with-data-driven-insights.html',
            'case-studies/railway-bridge-digital-twin-drone-lidar-inspection.html',
            'case-studies/substation-digital-asset-management-predictive-maintenance.html',
            'case-studies/handheld-slam-vs-tls-highway-bridge-surveys.html',
        ],
    },
    {
        pillar: ['Predictive Maintenance & Condition Monitoring', '/solutions/predictive-maintenance-condition-monitoring.html'], asset: 'industrial',
        posts: [
            'article/predictive-maintenance-industrial-facilities-iot-vibration-sensors.html',
            'article/intelligent-pump-house-monitoring-and-control.html',
            'blogs/intelligent-pump-house-monitoring-and-control.html',
            'blogs/asset-monitoring-facility-management.html',
            'blogs/advanced-iot-solutions.html',
        ],
    },
];

// "Project snapshot" cards for case studies that lack one, reusing the
// .snapshot-card markup already on the railway digital twin, fatigue and
// substation case studies. Only facts stated in each case study's own text.
// handheld-slam-vs-tls is a manufacturer (XGRIDS) comparison, not a Sentra
// project, so it gets no snapshot.
export const CASE_SNAPSHOTS = {
    'case-studies/bridgepluse-ai-and-drone-technology-for-bridge-health-monitoring.html': {
        icon: 'fa-road-bridge',
        left: [
            ['Client', 'Indian Railways'],
            ['Asset', 'Rural and semi-urban bridge stock across Andhra Pradesh'],
            ['Problem', 'Walk-through inspections miss micro-cracks and rust hidden behind cladding'],
            ['Deliverable', 'BridgePulse: an AI and drone application that measures crack depth, width and GPS location, and compares each scan with the last'],
        ],
        tech: [['fa-helicopter', 'Drone scanning'], ['fa-cubes', 'Photogrammetry & mesh'], ['fa-brain', 'CNN defect detection'], ['fa-clock-rotate-left', 'Scan-to-scan comparison']],
        right: [
            ['Result', 'Every defect graded Low, Moderate or Critical. Engineers see a defect forming between visits and plan the repair instead of reacting to it.'],
        ],
    },
    'case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html': {
        icon: 'fa-train',
        // TODO: data needed - client / railway zone not stated in the case study.
        left: [
            ['Asset', 'Three-span steel plate girder railway bridge, 3 × 18.3 m, built in the 1960s'],
            ['Loading', '25 t axle loads, trains at 20–100 km/h'],
            ['Problem', 'Confirm an ageing bridge is fit for today\'s faster trains and heavier axles'],
        ],
        tech: [['fa-ruler', 'Strain gauges'], ['fa-arrows-up-down', 'LVDTs'], ['fa-compass', 'Inclinometers'], ['fa-wave-square', 'Accelerometers']],
        right: [
            ['Duration', '3 months continuous logging at 100 Hz'],
            ['Result', '98 MPa stress range (limit 120), 6.2 mm deflection (limit 7.5), 5.3 Hz natural frequency, fatigue index 0.63, residual life 12–15 years'],
        ],
    },
    'case-studies/structural-health-monitoring-of-highway-bridges.html': {
        icon: 'fa-road',
        // TODO: data needed - owner / location not stated in the case study.
        left: [
            ['Asset', 'Four-lane reinforced concrete highway bridge, in service for more than 30 years'],
            ['Traffic', 'About 55,000 vehicles a day, a large share heavy freight'],
            ['Problem', 'Inspections rated it sound, but gave no data on how it behaved between visits'],
        ],
        tech: [['fa-ruler', 'Strain sensors'], ['fa-compass', 'Tilt sensors'], ['fa-arrows-up-down-left-right', 'Displacement sensors'], ['fa-temperature-half', 'Environmental sensors']],
        right: [
            ['Duration', 'First year of continuous monitoring'],
            ['Result', 'Owner moved from reactive to condition-based maintenance; girders carrying higher strain under peak freight identified and kept under observation'],
        ],
    },
};
