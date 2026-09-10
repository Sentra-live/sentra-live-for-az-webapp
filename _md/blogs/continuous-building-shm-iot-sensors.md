# Continuous Building Monitoring with IoT Sensors: What Actually Gets Measured

> Buildings settle, sway and crack over time. Continuous structural health monitoring with IoT sensors gives owners real-time data to act early.

Published: 2026-08-25  
Source: https://sentratech.in/blogs/continuous-building-shm-iot-sensors.html

Buildings settle, sway, and crack. Most of that is normal. Continuous monitoring exists to tell you which part of it is not, and to do so early enough that you still have cheap options.

"Continuous structural health monitoring" is a phrase that gets used without much specificity. Owners are told their building will be monitored in real time, and are rarely told what quantity is being measured, at what resolution, or what number would actually prompt somebody to do something.

This is a walk through the measurements that make up a building monitoring system, why each one is taken, and what the reading has to beat to be meaningful.

## The problem with periodic inspection

A structural inspection is a snapshot. Someone walks the building, records crack widths, notes anything that has changed since last time, and writes it up. For many defects that is entirely adequate.

It works less well for movement, because movement is a rate rather than a state. A 2 mm crack tells you very little on its own. A 2 mm crack that was 1.2 mm eighteen months ago, and which opens a further 0.3 mm every summer, tells you something specific. Getting from the first statement to the second requires either a long series of careful manual readings or an instrument that takes them for you.

There is a second issue. Buildings move for reasons that have nothing to do with damage. Concrete expands when it warms. Timber and masonry respond to humidity. A tall building leans measurably in the wind and comes back. If you sample twice a year at unrecorded times of day, seasonal and thermal effects are folded invisibly into your trend, and they are often larger than the signal you were looking for.

![Sensor placement for continuous building structural health monitoring](https://sentratech.in/image/blogs/blog_building_sensors.webp)

## Settlement and differential settlement

Nearly every building settles after construction as the soil beneath it consolidates. Uniform settlement is usually tolerable. The structure goes down as a unit and little distress appears.

Differential settlement is the damaging case. One part of the foundation moves more than another, the frame is forced to accommodate the difference, and the result appears as diagonal cracking, jammed doors, and out of level floors. Causes include variable soil conditions, changes to the water table, leaking drainage, nearby excavation, and vibration from adjacent construction.

Continuous measurement usually relies on:

- **Liquid level settlement systems:** Connected vessels around the building share a fluid reservoir, so vertical movement at one point registers as a pressure change. These resolve fractions of a millimetre and are well suited to slow consolidation.

- **GNSS receivers:** Practical on larger or taller structures where a few millimetres of resolution is enough, and useful because they give absolute position rather than movement relative to another part of the same building.

- **Borehole extensometers:** Where the concern is the ground itself, these show which soil layer is actually compressing.

## Tilt and inter-story drift

Tilt is a sensitive early indicator because rotation shows up before settlement becomes visible. A foundation losing support on one side rotates the column above it, and a [MEMS tiltmeter](https://sentratech.in/products/tiltmeter.html) resolving a few arc seconds will register that long before anyone notices a sloping floor.

Inter-story drift is the related measurement in taller buildings: the horizontal displacement of one floor relative to the one below, divided by the storey height. It is the parameter most closely tied to damage in frames, which is why it appears in seismic assessment criteria. It can be derived from accelerometers at multiple levels or measured more directly with displacement sensors across the storey.

Two practical notes. Tiltmeters need rigid mounting to structural elements, since a sensor fixed to a partition measures the partition. And they need temperature compensation, because thermal effects on both the sensor and its mount can exceed the movement being tracked.

## Crack width and movement

Cracks are the most visible symptom and the most commonly misread. What matters is not the width so much as whether the crack is active.

A stable crack from settlement that finished years ago needs cosmetic repair. A crack that opens and closes seasonally is responding to thermal or moisture cycling and may need a movement joint. A crack that opens steadily in one direction indicates something ongoing, and that is the one worth investigating.

[Vibrating wire crackmeters](https://sentratech.in/products/vibrating-wire.html) are the common instrument here. They resolve movements well under a tenth of a millimetre, hold calibration over years, and include a thermistor so readings can be corrected for temperature. That correction matters more than people expect. On an exposed facade, the daily thermal cycle can move a crack more than a year of structural change.

## Vibration and dynamic properties

Every structure has natural frequencies determined by its mass and stiffness. Mass rarely changes much. Stiffness falls when a structure is damaged. So a downward drift in natural frequency is a global indicator that something has changed, without needing a sensor at the damage location.

[Accelerometers](https://sentratech.in/products/accelerometers.html) placed at a handful of levels capture enough response to track those frequencies over time, using ambient excitation from wind and traffic rather than any deliberate forcing.

The method has real limits and it is worth being honest about them. Frequency shifts are sensitive to temperature and occupancy load, often by more than moderate damage would cause, so a raw drop is not proof of anything. Useful systems normalise against temperature using a long baseline before treating a shift as significant. Localising damage from frequency data alone is difficult, and in practice the technique works best as a trigger for inspection rather than a diagnosis.

Vibration monitoring also covers a more immediate concern: construction next door. Piling, excavation, and demolition transmit ground vibration that can damage neighbouring structures, and continuous measurement provides both protection and an evidential record. Our note on [construction-induced vibration](https://sentratech.in/blogs/monitoring-construction-induced-vibrations.html) covers that in more depth.

## Environmental context

Environmental sensors are not really about the environment. They are there so the structural data can be interpreted.

- **Temperature:** Recorded at the structure rather than from a weather service, because surface temperature on a sunlit facade differs substantially from ambient air. Nearly every other measurement needs this to be corrected properly.

- **Humidity:** Relevant for timber and masonry, and for corrosion risk in reinforced concrete.

- **Wind speed and direction:** Explains short-term sway in tall buildings and separates wind response from anything structural.

- **Groundwater level:** Often the missing link when settlement correlates with the seasons or with pumping nearby.

A monitoring system without environmental context produces alarms that nobody trusts, because the first few will turn out to be hot afternoons.

## Baselines, thresholds, and who gets called

Instrumentation only becomes monitoring once someone has decided what the numbers mean.

That starts with a baseline. A monitoring system needs a period of normal operation recorded before its readings can be judged, and long enough to capture a full seasonal cycle if thermal effects matter. Systems commissioned in a hurry and alarmed immediately tend to generate false positives through their first winter, after which people stop reading the alerts.

Thresholds should come from the structure rather than from a catalogue. Allowable tilt for a heritage masonry building is not the allowable tilt for a modern steel frame. The engineer who understands the structure sets the numbers, informed by the design and its condition.

Then the response has to be defined in advance. An alert that arrives with no agreed action is noise. Practical systems distinguish a level that prompts a closer look at the data from a level that brings an engineer to site, and name the person responsible at each stage.

For buildings where several of these measurements are combined, a [digital twin](https://sentratech.in/solutions/digital-twin.html) is a reasonable way to hold sensor data against the structural model so readings are assessed in context. Our overview of [structural health monitoring](https://sentratech.in/solutions/structural-health-monitoring.html) covers how these systems are specified, and [building and high-rise monitoring](https://sentratech.in/industries/buildings-highrise-monitoring.html) describes deployments on occupied towers. If earthquake loading is a concern for your site, [seismic monitoring for buildings](https://sentratech.in/blogs/seismic-monitoring-buildings-critical-infrastructure.html) deals with the post-event assessment side.

## Work out what your building needs

Not every building needs continuous monitoring, and the ones that do rarely need everything described here. Sentra helps owners and engineers decide which measurements are worth taking on a given structure, then designs, installs, and runs the system. Get in touch if you have a building you are unsure about.

[Contact us ](https://sentratech.in/contact.html)
