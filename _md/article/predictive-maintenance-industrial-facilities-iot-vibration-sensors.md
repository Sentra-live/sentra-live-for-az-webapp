# Predictive Maintenance for Industrial Facilities

> Industrial predictive maintenance in practice: what IoT vibration sensors measure, which failures they catch early, and how to raise uptime.

Published: 2026-09-07  
Section: Industrial  
Source: https://sentratech.in/article/predictive-maintenance-industrial-facilities-iot-vibration-sensors.html

How IoT vibration sensors help prevent failures. A bearing that fails on a Tuesday afternoon usually started showing it weeks earlier, in a frequency band nobody was measuring. Continuous vibration monitoring lets a plant pick that up in time.

Most plants have a story like this. A pump runs for eleven years without trouble, then seizes one Tuesday afternoon and stops a production line. The investigation finds a bearing that had been wearing out for two months. Nobody was careless; the data just wasn't being collected between monthly inspection rounds.

**Industrial predictive maintenance** fills that gap. Instead of servicing equipment by the calendar or fixing it after it stops, you collect condition data continuously and use it to estimate how much life a component has left. Vibration carries most of that information, so IoT vibration sensors are where most facilities start a predictive program.

## Why vibration is the signal to watch

A shaft, bearing and coupling in good condition vibrate in a stable, recognisable pattern. When something changes, the pattern changes too, and early. A spalled bearing race, a coupling drifting out of alignment and a fan blade building up deposits all show up this way.

Timing is the reason vibration matters. Temperature only rises once a fault is already causing serious friction. Motor current only changes once the machine is already working harder. Noise comes later still, and by the time an operator hears it the chance to plan the repair has usually gone. Vibration changes first, often weeks earlier, because it responds to the fault's geometry rather than its effects.

Vibration also tells you what the fault is, not just that there is one. A rise in overall level says something is wrong. A frequency spectrum says _what_ is wrong, because different faults show up at different frequencies linked to shaft speed and bearing geometry.

## What an IoT vibration sensor measures

A typical wireless vibration sensor is a triaxial MEMS accelerometer, a processor, a radio and a battery in a sealed housing, mounted on the bearing cap or motor frame. It records acceleration in three axes and calculates the values maintenance engineers use from that.

- **Acceleration** (g or m/s²) weights the high frequencies and is the right measure for early bearing and gear defects.

- **Velocity** (mm/s RMS) is the standard measure of overall machine condition. ISO 10816 and its replacement ISO 20816 set velocity zones that rate a machine as acceptable, unsatisfactory or unacceptable, depending on its size and mounting class.

- **Displacement** (µm) is useful at low frequencies, for imbalance and looseness on slow machines.

- **Envelope or demodulated spectra** pull the repeating impacts of an early bearing defect out of broadband noise that would otherwise hide them.

How a sensor samples decides whether it helps with diagnosis or just produces data. A device that reports one RMS value every few hours will only catch a machine that is already badly deteriorated. A device that captures a full waveform and sends a spectrum (typically a few thousand lines up to 10 kHz or more) supports real diagnosis. Sentra's [wireless vibration meter](https://sentratech.in/products/vibration-meter.html) and [triaxial accelerometers](https://sentratech.in/products/accelerometers.html) are designed for the second kind of use.

## Common faults and their signatures

Most rotating-equipment problems fall into a few families, each with a recognisable signature relative to running speed (1×).

- **Imbalance**: a dominant radial peak at 1× that grows with the square of speed. It is the most common fault and usually the cheapest to fix.

- **Misalignment**: strong 2× content, often with significant axial vibration. A repair done with good intentions is a frequent cause.

- **Mechanical looseness**: a series of harmonics at 1×, 2×, 3× and above, sometimes with half-order components.

- **Bearing defects**: non-synchronous frequencies set by the bearing geometry (outer race, inner race, ball spin and cage). These are the classic early-warning targets, and envelope analysis shows them long before the overall level moves.

- **Gear damage**: energy at gear mesh frequency with sidebands spaced at shaft speed. The sideband pattern tells you which gear is affected.

- **Cavitation** in pumps: broadband high-frequency noise instead of distinct peaks. It usually points to a system or suction problem, not a fault in the machine.

- **Resonance**: strong amplification at a structural natural frequency. This is a design or installation issue, and balancing won't fix it.

Once you can name the fault, you can plan around it. "Motor 4 is running rough" leads to an exploratory shutdown. "Motor 4 shows an outer-race defect frequency with rising sidebands" leads to ordering a bearing and raising a job card for the next planned outage.

## The effect on uptime

Predictive maintenance doesn't mainly save you repairs. You still do them, but at a time you choose instead of the worst possible moment.

An unplanned failure costs things a planned one doesn't: lost production while you wait for a part that isn't in stock, overtime, damage to couplings and shafts when a bearing finally seizes, and the safety risk of emergency work. A planned replacement in a scheduled window costs the part and a few hours of labour that were already budgeted.

Calendar-based servicing has a hidden cost of its own. Parts that still had life in them get thrown away on schedule, and every intervention risks creating a new defect, such as a misaligned coupling, a contaminated bearing or an over-tightened foot. Working from condition data means fewer interventions and fewer surprises.

Most facilities already track motor current, temperature, pressure and flow as well as vibration. Looking at them together on one platform separates a machine fault from a process problem. For example, a pump drawing more current with no change in vibration is usually being asked to do more work, not failing. This is the broader scope of [industrial facility monitoring](https://sentratech.in/industries/industrial-facilities-monitoring.html) and [asset monitoring and management](https://sentratech.in/solutions/asset-monitoring-and-management-solutions.html).

## Adding IoT monitoring to a working plant

The technology is rarely the difficult part. Installing it in a plant that can't stop for the work is.

**Start with criticality, not the sensor catalogue.** Rank equipment by what a failure would cost in production, safety and repair. A few sensors on the machines that really matter are worth more than covering everything that turns.

**Mount sensors for the frequencies you need.** Stud mounting keeps the high-frequency response. Adhesive is acceptable. Magnets are convenient but lose response in exactly the range where early bearing defects show up. Position matters as much as mounting: on the bearing housing, in the load zone, and in the same orientation every time so later readings can be compared.

**Plan the network around the building.** Steel frames, concrete and rotating machinery are hard on radio signals. LoRaWAN gateways have good range and penetration for periodic spectra, and repeaters cover the awkward corners. Sentra's [rugged gateways](https://sentratech.in/products/gateway.html) and [repeaters](https://sentratech.in/products/repeater.html) are made for this.

**Record a baseline before setting alarms.** Every machine has its own normal. Collect several weeks of data across the full range of operating conditions, then set thresholds from that baseline instead of a generic table. Standards such as ISO 20816 give the outer limits, but the machine's own history gives you the alarm levels that actually work.

**Decide who responds before the first alert arrives.** Predictive programs fail because of organisation far more often than because of instruments. An alert with no named owner, no agreed response and no link to the work-order system turns into an email people learn to ignore.

## Where analytics helps and where it doesn't

Claims about machine learning on vibration data vary a lot in how honest they are. Three uses are well proven: anomaly detection against a learned baseline, trending toward a threshold with a forecast date for crossing it, and automatic classification of known fault signatures. All three are useful, and none needs a machine to fail before it can be trained.

Precise remaining-useful-life prediction for general-purpose equipment is oversold. A credible RUL model needs many recorded run-to-failure examples for that machine type under those conditions. Most plants don't have them, because they replace parts before they fail, which is the whole point of the program.

What you can realistically get, and it is still valuable, is a ranked list of which machines are deteriorating, how fast, and in what way. That is enough to plan a shutdown.

## Where to Begin

You don't need a plant-wide program to begin. Start with a shortlist of machines whose failure really hurts, sensors mounted properly on them, a few weeks of baseline data, and one person responsible for what happens when an alert fires. Expand from there, paid for by the outages you avoid.

Related service [Predictive Maintenance & Condition Monitoring ](https://sentratech.in/solutions/predictive-maintenance-condition-monitoring.html)

- [Intelligent Pump House Monitoring & Control](https://sentratech.in/article/intelligent-pump-house-monitoring-and-control.html)

- [Intelligent Pump House Monitoring & Control](https://sentratech.in/blogs/intelligent-pump-house-monitoring-and-control.html)

- [Asset Monitoring & Facility Management](https://sentratech.in/blogs/asset-monitoring-facility-management.html)

[Request a monitoring assessment for your asset](https://sentratech.in/monitoring-assessment.html?asset=industrial&amp;source=predictive-maintenance-industrial-facilities-iot-vibration-sensors)

#### Ready to start with the machines that matter?

Sentra designs and installs vibration monitoring for industrial facilities across India, including the sensors, gateways and dashboards, and the threshold logic that turns a spectrum into a work order.

[Request a Monitoring Assessment ](https://sentratech.in/monitoring-assessment.html?asset=industrial&amp;source=predictive-maintenance-industrial-facilities-iot-vibration-sensors)

## Frequently Asked Questions

##

Industrial predictive maintenance uses continuous condition data from machinery to estimate when a component will fail, so that repair is scheduled shortly before failure rather than on a fixed calendar or after a breakdown. Vibration is the most widely used signal because most rotating-equipment faults change the vibration signature long before they change temperature, output or noise.

##

Equipment vibration monitoring detects imbalance, shaft misalignment, mechanical looseness, bearing wear at all four defect frequencies, gear tooth damage, rotor bar faults, belt problems, cavitation in pumps and resonance. Each has a characteristic frequency signature, which is what allows the fault to be named rather than only detected.

##

It depends on the fault and the machine. Rolling-element bearing degradation typically progresses over weeks to months, and high-frequency envelope analysis often flags it long before the overall vibration level rises. Imbalance and looseness can be identified as soon as they appear. Sudden failures caused by foreign objects or lubrication loss give far less notice, which is why continuous monitoring outperforms periodic route-based readings.

##

For most balance-of-plant equipment, yes. Wireless sensors measure continuously, cost far less per point than wired analysers, and remove the gap between monthly routes in which a fault can develop unseen. Critical, high-speed or safety-related machines usually keep permanently wired systems with higher bandwidth and protection functions alongside the wireless network.
