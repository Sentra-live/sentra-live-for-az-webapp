# GNSS Displacement Monitoring: How Satellite Sensors Detect Ground & Structural Movement

> How GNSS displacement monitoring works, what accuracy is realistic, the error sources that dominate long-term records, and where satellite sensors fit in dam, slope, mining and structural monitoring programs.

Published: 2026-09-09  
Section: Geotechnical  
Source: https://sentratech.in/blogs/gnss-displacement-monitoring-satellite-sensors.html

A permanently installed GNSS receiver can resolve a few millimetres of movement on a dam crest, a mine slope or a tall building, and keep resolving it every hour for years. Here is how satellite displacement monitoring actually works, what limits its accuracy, and how to design a deployment that produces a record engineers will trust.

**GNSS displacement monitoring** uses permanently installed satellite receivers to measure how a point on a structure or a piece of ground moves over time. The instrument is the same family of technology as a survey rover or a phone's location chip, but the job is different. A navigation receiver answers "where am I, roughly, right now." A monitoring receiver answers "has this point moved since yesterday, and by how much" — and it has to answer that to within a few millimetres, unattended, in whatever weather the site provides.

That difference in purpose changes almost every design decision: the antenna, the mount, the observation window, the processing strategy and the way results are reported. What follows is the working detail behind **GNSS monitoring** for dams, slopes, mines, embankments and structures.

## How a Satellite Fix Becomes a Displacement Measurement

GNSS is the general term for the satellite constellations a modern receiver tracks: GPS (United States), GLONASS (Russia), Galileo (Europe), BeiDou (China), and the regional NavIC constellation over India. Each satellite broadcasts a signal on more than one frequency. The receiver measures how far it is from each satellite it can see, and solves for its own position.

A navigation-grade solution uses the **code** on the signal and lands within a few metres. Monitoring uses the **carrier phase** instead: the receiver counts cycles of the carrier wave itself, which is around 19 cm long on the GPS L1 frequency. A fraction of one cycle is millimetres. The difficulty is that the receiver does not know how many whole cycles lie between it and the satellite at the moment it starts tracking. That unknown integer is the **ambiguity**, and resolving it — "fixing" the solution — is what separates a millimetre-class result from a decimetre-class one.

The second essential idea is that monitoring is **relative**. A single receiver on its own inherits every error in the system. Two receivers observing the same satellites at the same time share most of those errors, so differencing one against the other cancels them. In practice a site has one or more **reference receivers** on ground believed to be stable, and a set of **monitoring receivers** on the structure or the moving mass. The output is not a map coordinate. It is a baseline vector between reference and monitoring point, reported as change in north, east and height against a declared epoch.

This is why a GNSS monitoring record is only as good as its reference. If the reference monument itself creeps, every monitoring point appears to move in the opposite direction, and nothing in the data will announce the error. Sites that matter use two references, separated, so that a drifting one can be identified.

## What Accuracy Is Realistic

Manufacturer figures for RTK positioning are usually quoted in a form such as `±(8 mm + 1 ppm)` horizontal. The second term is the part people forget: 1 ppm is 1 mm of additional uncertainty for every kilometre of baseline. A monitoring point 5 km from its reference carries 5 mm of baseline-length error before anything else goes wrong. Keeping baselines short is the cheapest accuracy improvement available.

Those figures also describe a single epoch. Monitoring does not have to work that way. Averaging a long observation window — an hour, six hours, a full day — suppresses the noise that varies quickly and tightens the result considerably. A well-sited installation with short baselines and daily processing commonly reports horizontal displacement at the 2–5 mm level, with the vertical component roughly two to three times worse. The vertical is always the weak axis, because every satellite is above the horizon and the geometry is therefore one-sided.

The trade-off is directly between precision and latency. A one-minute solution will show a sudden slope failure quickly but will scatter by a centimetre or more. A daily solution resolves a slow, millimetre-per-month trend that the one-minute record buries in noise, but it reports a day late. Most programs run both from the same raw data: a fast solution for alarms, a long-window solution for trend.

## The Error Sources That Dominate Long Records

Once ambiguities are fixed and baselines are short, four things set the quality of a multi-year record.

- **Multipath.** Signal that arrives after bouncing off a rock face, a parapet, a haul road or a water surface adds a false path length. It is the single largest error at most monitoring sites, and it is not random: it repeats as the constellation geometry repeats, so it can masquerade as a real cyclic movement. Choke ring or ground-plane antennas and careful siting are the defence.

- **Atmosphere.** The ionosphere and troposphere delay the signal. Differencing removes most of it on short baselines, but the troposphere is local and does not cancel when the reference and monitoring points differ significantly in height — which is exactly the case on a dam face, a high-wall or a tall building.

- **Satellite geometry.** A partly obstructed sky raises PDOP and weakens the solution. A monitoring point in a valley, under a bridge deck or against a steep high-wall may only ever see half the sky, and no amount of processing recovers what was never observed.

- **The mount.** Antenna phase centre variation, thermal expansion of the mast, and any movement of the bracket relative to the structure all enter the record as real-looking displacement. A mast that grows a few millimetres in afternoon sun produces a clean daily cycle that has nothing to do with the structure.

None of these announce themselves as faults. They arrive as plausible movement. Reviewing a GNSS series alongside temperature, reservoir level, rainfall and construction activity is what separates a mechanism from an artefact.

![Wireless GNSS monitoring receiver for permanent displacement monitoring](https://sentratech.in/image/products/worldsensing_gnss_meter_main.webp)

A permanently installed monitoring receiver combines the antenna, logger and radio in one enclosure and reports over a low-power network. Sentra supplies the [Worldsensing GNSS Meter](https://sentratech.in/products/gnss-meter.html) for this class of deployment.

## Where Satellite Displacement Monitoring Earns Its Place

GNSS is the right instrument when the quantity of interest is absolute three-dimensional movement of a point, over a long period, at a location with open sky. That describes a recognisable set of assets.

- **Dams and embankments.** Crest settlement and downstream displacement are classic surveillance measurements, historically read by precise levelling a few times a year. GNSS turns them into a continuous record, which matters most during first filling and drawdown. See [dam and reservoir monitoring](https://sentratech.in/industries/dams-reservoirs-monitoring.html).

- **Slopes and landslides.** A moving mass needs its direction and rate quantified, not just detected. GNSS gives a vector, which is what tells you whether the movement is translational, rotational or accelerating.

- **Open-pit mining.** High-wall and waste-dump monitoring, where the consequence of a missed acceleration is measured in lives. Discussed further under [mining and geotechnical monitoring](https://sentratech.in/industries/mining-geotechnical-monitoring.html).

- **Tall and long-span structures.** Towers, chimneys, stadium roofs and long-span bridges move under wind and temperature by amounts GNSS can resolve, and a high-rate receiver can capture the dynamic response as well as the mean position.

- **Regional subsidence.** Ground lowering from groundwater extraction, tunnelling or mining, where the affected area is large and the movement is slow.

It is equally worth naming where GNSS is the wrong choice. Inside a tunnel, under dense canopy, against a high-wall that blocks most of the sky, or wherever the movement of interest is internal strain rather than position, other instruments do the work better.

## GNSS Against the Alternatives

**Robotic total stations** reach sub-millimetre precision on prisms and work where the sky is blocked, but they need line of sight, a stable instrument pillar, and they degrade in rain, fog and heat shimmer. GNSS needs no line of sight between points and is largely indifferent to visibility.

**InSAR** covers hundreds of square kilometres from orbit with no site hardware, but it measures only along the satellite line of sight, revisits on a fixed schedule, and struggles over vegetation and fast movement. The two pair well: InSAR identifies where something is moving across a region, and GNSS instruments quantify it continuously at the points that matter.

**Tiltmeters, extensometers and piezometers** resolve mechanism — rotation, crack opening, pore pressure — at far lower cost per point, but each measures relative to its own installation. They cannot tell you that the whole block they are mounted on has translated two centimetres downhill. A common and effective architecture is a small number of GNSS points establishing the global frame, with a dense network of [tiltmeters](https://sentratech.in/products/tiltmeter.html) and [strain gauges](https://sentratech.in/products/strain-gauges.html) filling in the detail between them. That combination is the basis of most [geotechnical and foundation monitoring](https://sentratech.in/solutions/geotechnical-and-foundation-monitoring.html) programs.

## Designing a GNSS Sensor Infrastructure

Most disappointing GNSS datasets are the result of decisions made before the first measurement. A deployment that holds up over years tends to settle the following.

- **Reference siting.** Stable ground outside the influence of the monitored mass, founded on rock or a deep monument, with the shortest practical baselines to the monitoring points. Two references, not one.

- **Sky view.** An unobstructed horizon above roughly 15°. Survey the obstructions before installing, not after the first month of poor data.

- **Mounting.** Rigid, thermally stable, fixed to the element whose movement you actually care about. A bracket bolted to cladding measures the cladding.

- **Constellations and frequencies.** Multi-constellation, multi-frequency receivers see more satellites, fix ambiguities faster and hold a solution in partly obstructed sky where a single-constellation unit will not.

- **Power and communications.** Solar with enough battery for the worst monsoon week, and a radio link sized for the data rate you chose. Continuous 1 Hz raw data is a very different transmission problem from hourly position solutions.

- **Thresholds set before the event.** Agree the displacement rate and total movement that trigger review, and who acts on the alarm. A threshold argued about during an incident is not a threshold.

The baseline epoch deserves particular care. Every subsequent number is a change from that reference state, so it should be established over a long observation window in quiet conditions, and it should be documented well enough that someone can re-establish it after an instrument is replaced.

## From Position Series to Decision

Raw GNSS output is a noisy three-component time series, and it is not what an engineer should be asked to read. The processing chain that makes it usable is broadly consistent across sites: filter or average to the reporting interval, remove known seasonal and thermal signals where they can be modelled, express the result as displacement and velocity against the baseline epoch, and compare that velocity against agreed thresholds.

**Velocity, not position, is usually the alarm quantity.** A slope that has moved 40 mm over two years and is still moving at 0.05 mm/day is behaving differently from one that has moved 12 mm in the past week, even though the second has moved less in total. Acceleration is the signal that precedes failure, which is why a continuous record is worth so much more than a periodic survey: the periodic survey can tell you movement happened, but rarely when it started or how fast it is developing.

Displacement also belongs in the same view as everything else the site records. Reservoir level, rainfall, pore pressure, excavation stage and temperature explain most of what a GNSS series does. Reviewed together, a movement that correlates with drawdown is a different finding from the same movement with no external driver, and only the second one should wake anybody up.

## Takeaway

GNSS monitoring is the practical way to obtain continuous, absolute, three-dimensional displacement at a point in open sky, and it has moved well past being a specialist survey exercise. The physics is settled and the hardware is a commodity. What still separates a useful record from an expensive one is siting, reference stability, honest treatment of multipath and atmosphere, and thresholds agreed before the data starts arriving.

Used on its own, GNSS gives a small number of very trustworthy points. Used as the reference frame for a wider instrumentation network, it gives every other sensor on the site something absolute to be measured against.

#### Planning a GNSS monitoring deployment?

We design, install and operate satellite displacement monitoring for dams, slopes, mines and structures — including reference network design and alarm thresholds.

[Talk to our team ](https://sentratech.in/contact.html)

## Frequently Asked Questions

##

GNSS displacement monitoring uses permanently installed satellite receivers to measure how a point on a structure or slope moves over time. Each monitoring receiver is processed against a reference receiver on stable ground, so the output is a relative displacement time series in north, east and height rather than an absolute map coordinate.

##

With short baselines, long observation windows and a clear sky view, horizontal displacement is commonly resolved to a few millimetres and vertical displacement to roughly twice that. Accuracy degrades with baseline length, typically by about 1 mm per kilometre, and with multipath, obstructions and poor satellite geometry.

##

GNSS gives a continuous, three-dimensional record at a small number of instrumented points, usually updating every few minutes. InSAR gives wide-area coverage from satellite imagery at a lower revisit rate and along the satellite line of sight. They are complementary: InSAR finds where movement is happening, GNSS quantifies it continuously where it matters.

##

No. GNSS measures absolute three-dimensional position change at a point but cannot see rotation, internal strain or subsurface movement, and it needs open sky. In practice GNSS anchors the global reference frame for a monitoring network while tiltmeters, extensometers, piezometers and robotic total stations resolve the local mechanism.
