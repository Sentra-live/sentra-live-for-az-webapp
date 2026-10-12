// Product -> application -> industry -> case study links ("Used in" block on
// product pages), ending in a sensor-recommendation CTA. Each pairing comes
// from the product's role on the solution, industry or case-study page linked.
// Inserted by scripts/build-sections.mjs.

export const PRODUCT_USES = {
    'products/tiltmeter.html': { name: 'Wireless Tiltmeter', uses: [
        ['fa-road-bridge', 'Bridge pier & bearing rotation', 'Bridge monitoring system', '/industries/bridges-highways-monitoring.html'],
        ['fa-train', 'Railway bridges & track', 'Railway bridge monitoring', '/solutions/railway-bridge-monitoring.html'],
        ['fa-mountain', 'Slopes & retaining structures', 'Geotechnical monitoring', '/solutions/geotechnical-and-foundation-monitoring.html'],
        ['fa-file-lines', 'Case study: highway bridges', 'Tilt sensors on piers and supports', '/case-studies/structural-health-monitoring-of-highway-bridges.html'],
    ] },
    'products/tiltmeter-event-detection.html': { name: 'Event Detection Tiltmeter', uses: [
        ['fa-road-bridge', 'Bridge pier & bearing rotation', 'Bridge monitoring system', '/industries/bridges-highways-monitoring.html'],
        ['fa-helmet-safety', 'Structures next to construction', 'Construction vibration monitoring', '/solutions/construction-vibration-monitoring.html'],
        ['fa-mountain', 'Slopes & retaining structures', 'Geotechnical monitoring', '/solutions/geotechnical-and-foundation-monitoring.html'],
        ['fa-heart-pulse', 'Structural health monitoring', 'Tilt & rotation, triggered readings', '/solutions/structural-health-monitoring.html'],
    ] },
    'products/laser-tiltmeter.html': { name: 'Laser Tiltmeter', uses: [
        ['fa-person-digging', 'Tunnel convergence', 'Construction & tunnelling', '/industries/construction-tunnelling-monitoring.html'],
        ['fa-mountain', 'Excavation & crown settlement', 'Geotechnical monitoring', '/solutions/geotechnical-and-foundation-monitoring.html'],
        ['fa-helmet-safety', 'Works near existing structures', 'Construction vibration monitoring', '/solutions/construction-vibration-monitoring.html'],
    ] },
    'products/vibration-meter.html': { name: 'Wireless Vibration Meter', uses: [
        ['fa-helmet-safety', 'Construction & blast vibration', 'Construction vibration monitoring', '/solutions/construction-vibration-monitoring.html'],
        ['fa-train', 'Railway bridges & viaducts', 'Railway bridge monitoring', '/solutions/railway-bridge-monitoring.html'],
        ['fa-gem', 'Mining & blasting', 'Mining & slope stability', '/industries/mining-geotechnical-monitoring.html'],
        ['fa-file-lines', 'Guide: construction vibrations', 'PPV limits and sensor placement', '/blogs/monitoring-construction-induced-vibrations.html'],
    ] },
    'products/gnss-meter.html': { name: 'GNSS Meter', uses: [
        ['fa-water', 'Dam deformation', 'Dams & reservoirs', '/industries/dams-reservoirs-monitoring.html'],
        ['fa-mountain', 'Settlement & slope movement', 'Geotechnical monitoring', '/solutions/geotechnical-and-foundation-monitoring.html'],
        ['fa-heart-pulse', 'Long-term structural displacement', 'Structural health monitoring', '/solutions/structural-health-monitoring.html'],
        ['fa-file-lines', 'Guide: GNSS displacement monitoring', 'Millimetre movement from satellites', '/blogs/gnss-displacement-monitoring-satellite-sensors.html'],
    ] },
    'products/accelerometers.html': { name: 'Accelerometer', uses: [
        ['fa-train', 'Railway bridge dynamic response', 'Railway bridge monitoring', '/solutions/railway-bridge-monitoring.html'],
        ['fa-road-bridge', 'Bridge vibration & modal analysis', 'Bridge monitoring system', '/industries/bridges-highways-monitoring.html'],
        ['fa-gauge-high', 'Machinery vibration', 'Predictive maintenance', '/solutions/predictive-maintenance-condition-monitoring.html'],
        ['fa-file-lines', 'Case study: railway bridge', '5.3 Hz natural frequency at 100 Hz sampling', '/case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html'],
    ] },
    'products/strain-gauges.html': { name: 'Strain Gauge', uses: [
        ['fa-train', 'Railway bridge stress & fatigue', 'Railway bridge monitoring', '/solutions/railway-bridge-monitoring.html'],
        ['fa-chart-line', 'Residual fatigue life', 'Fatigue & residual life assessment', '/solutions/fatigue-and-residual-life-assessment.html'],
        ['fa-road-bridge', 'Girders, decks & joints', 'Bridge monitoring system', '/industries/bridges-highways-monitoring.html'],
        ['fa-file-lines', 'Case study: railway bridge', '98 MPa peak stress range measured', '/case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html'],
    ] },
    'products/vibrating-wire.html': { name: 'Vibrating Wire Logger', uses: [
        ['fa-mountain', 'Piezometers & crackmeters', 'Geotechnical monitoring', '/solutions/geotechnical-and-foundation-monitoring.html'],
        ['fa-water', 'Seepage & pore pressure', 'Dams & reservoirs', '/industries/dams-reservoirs-monitoring.html'],
        ['fa-chart-line', 'VW strain on steel members', 'Fatigue & residual life assessment', '/solutions/fatigue-and-residual-life-assessment.html'],
    ] },
    'products/analog-data-logger.html': { name: 'Analog Data Logger', uses: [
        ['fa-train', 'LVDT deflection in load tests', 'Railway bridge monitoring', '/solutions/railway-bridge-monitoring.html'],
        ['fa-heart-pulse', 'Load cells & legacy sensors', 'Structural health monitoring', '/solutions/structural-health-monitoring.html'],
        ['fa-file-lines', 'Case study: railway bridge', '6.2 mm mid-span deflection from LVDTs', '/case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html'],
    ] },
    'products/digital-data-logger.html': { name: 'Digital Data Logger', uses: [
        ['fa-gauge-high', 'Modbus sensors on plant equipment', 'Predictive maintenance', '/solutions/predictive-maintenance-condition-monitoring.html'],
        ['fa-gears', 'Existing instrumentation', 'Asset monitoring & management', '/solutions/asset-monitoring-and-management-solutions.html'],
        ['fa-industry', 'Industrial facilities', 'Condition monitoring', '/industries/industrial-facilities-monitoring.html'],
    ] },
    'products/gateway.html': { name: '4G Gateway', uses: [
        ['fa-industry', 'Large industrial sites', 'Industrial facilities monitoring', '/industries/industrial-facilities-monitoring.html'],
        ['fa-train', 'Remote rail corridors', 'Railway bridge monitoring', '/solutions/railway-bridge-monitoring.html'],
        ['fa-helmet-safety', 'Construction sites', 'Construction vibration monitoring', '/solutions/construction-vibration-monitoring.html'],
    ] },
};
