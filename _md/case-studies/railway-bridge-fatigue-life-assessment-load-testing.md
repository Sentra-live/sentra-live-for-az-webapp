# Railway Bridge Fatigue Life Assessment and Load Testing

> Instrumentation, controlled load testing, FE model calibration and residual fatigue life assessment of two steel railway bridges for South Central Railway.

Published: 2026-08-28  
Source: https://sentratech.in/case-studies/railway-bridge-fatigue-life-assessment-load-testing.html

How Clove Technologies approached the instrumentation and residual fatigue life assessment of two steel railway bridges for South Central Railway, using strain and acceleration measurement, controlled load testing and a calibrated finite element model.

[ Back to Resources](https://sentratech.in/resources.html#case-studies)

Railways Aug 28, 2026

## Railway Bridge Fatigue Life Assessment and Load Testing

How Clove Technologies approached the instrumentation and residual fatigue life assessment of two steel railway bridges for South Central Railway, using strain and acceleration measurement, controlled load testing and a calibrated finite element model.

![Railway bridge fatigue life assessment using strain gauges, load testing and residual life analysis](https://sentratech.in/image/case-studies/banners/case_studies_railway-bridge-fatigue-life-assessment-load-testing.webp)

Aug 28, 2026 Case Study

Yuva Subharam  | Sentra Technologies

Indian Railways is moving to heavier axle loads. On a steel bridge built decades ago, the hard part is not showing it can carry a 25 tonne axle once. You have to show how many more times it can carry one before fatigue becomes the limit.

South Central Railway commissioned Clove Technologies to assess two steel bridges in the Vijayawada Division on exactly that basis. The assignment covers structural instrumentation, dynamic strain and acceleration measurement, controlled load testing, finite element modelling and [residual fatigue life assessment](https://sentratech.in/solutions/fatigue-and-residual-life-assessment.html). The methodology was written against RDSO requirements, BS-106R instrumentation guidance and the fatigue assessment provisions of BS 5400 Part 10.

This page describes the assessment methodology and why it is set up the way it is. Sensor counts, sampling rates and the load test programme are as specified in the methodology document. The detailed test programme will be agreed with South Central Railway before work starts.

**Project snapshot**

Client

South Central Railway, Vijayawada Division

Scope

Fatigue life assessment of two steel railway bridges

Loading considered

CC+8+2T and 25T axle load wagons

Approach

Instrumentation Load testing FE modelling Fatigue analysis

Standards referenced

RDSO, BS-106R, BS 5400 Part 10

## Project Details

Parameter | Detail |

Client

|

South Central Railway, Vijayawada Division

|

Project type

|

Railway bridge fatigue life assessment

|

Assessment approach

|

Instrumentation, load testing, FE modelling and fatigue analysis

|

Bridge 1

|

Bridge No. 615 UP

|

Bridge 1 configuration

|

2 × 12.20 m + 5 × 18.29 m

|

Bridge 1 location

|

Km 708/5-11, BZA-VSKP section

|

Bridge 2

|

Bridge No. 3 West

|

Bridge 2 configuration

|

12 × 91.40 m

|

Bridge 2 location

|

Km 425/42-427/06, GDR-BZA section

|

Bridge types

|

Steel girder / open web steel girder

|

Loading consideration

|

CC+8+2T / 25T axle load wagons

|

Key measurements

|

Strain, acceleration and dynamic response

|

## What visual inspection can't tell you

A visual inspection shows what the bridge looks like today. Corrosion, section loss, loose rivets, cracked welds and deformed members are all useful findings, but none of them tells you how much of the structure's fatigue capacity is already used up.

Fatigue damage builds up with load cycles, not with age. Every train that crosses puts the members through a stress range, and the damage from each pass depends on how big that range is at the detail in question. A member can look untouched and be most of the way through its life. Another can look poor and still have decades left because the stress ranges it sees are small.

So the real question is **how this bridge actually responds when a train crosses it.** Answering it means measuring dynamic strain, acceleration and stress ranges at critical members, under controlled test loads and under ordinary traffic, and turning the results into cycle counts for a fatigue calculation.

## The Two Bridges

The two bridges in the assignment are very different in size.

Bridge No. 615 UP

2 × 12.20 m plus 5 × 18.29 m spans, at Km 708/5-11 on the BZA-VSKP section. The methodology classes this as an open web girder bridge and uses it as the reference structure. The detailed instrumentation layout and the fatigue assessment procedure are both built around it, and the specific concern is how it performs under heavier axle loads.

Bridge No. 3 West

Twelve spans of 91.40 m at Km 425/42-427/06 on the GDR-BZA section. It is a much larger open web steel girder structure, and the same instrumentation and fatigue assessment approach applies.

## Instrumentation Strategy

For Bridge No. 615 UP the methodology specifies eight strain gauges and four accelerometers. The strain gauges measure stress ranges and fatigue cycles at critical locations. The accelerometers record dynamic behaviour for modal analysis. Sensor positions follow BS-106R guidance for open web girders, and final locations will be confirmed against the structural drawings and the agreed load test plan.

Why sensor placement decides the answer

The sensors aren't spread evenly. They go where fatigue is a realistic risk, on members that see repeated large stress ranges under train loading. Here that means the bottom long girders, flange locations, cross girders and other critical sections.

Gauge positions are chosen so the different parts of the response can be separated. Axial strain, bending and out-of-plane behaviour each show up differently depending on where the gauge sits. A gauge in the wrong place ends up measuring a member that was never at risk, and the data tells you nothing useful.

Sensor specifications

Sensor | Quantity | Specification | Purpose |

[

Strain gauges

](https://sentratech.in/products/strain-gauges.html) |

08

|

Approx. 1 microstrain accuracy, 3000 microstrain range, up to 100 Hz

|

Stress ranges and fatigue cycles at critical members

|

[

MEMS accelerometers

](https://sentratech.in/products/accelerometers.html) |

04

|

3-axis, ±6 g range, 1 mg resolution, up to 200 Hz

|

Dynamic behaviour, natural frequencies and model validation

|

If these instruments are new to you, we have separate articles on [how strain gauges work](https://sentratech.in/blogs/what-is-a-strain-gauge-types-working-principle.html) and on [accelerometer types and working principles](https://sentratech.in/blogs/what-is-an-accelerometer-sensor-guide.html).

## Measuring the bridge under real traffic

Recording strain at 100 Hz non-stop for a month produces a huge amount of data, nearly all of it from periods when nothing is happening. The methodology uses trigger-based sampling instead. A threshold starts and stops recording around each train crossing, so the dataset contains the events that matter and little else.

The recommended monitoring period is about four weeks at roughly 50 to 100 Hz, with the exact rate refined against design and simulation results. Normal railway traffic is also recorded for a selected train over 72 hours.

The two datasets do different jobs. Controlled load tests give a known input and a measured output, which is what calibration needs. Normal traffic shows what the bridge goes through in service, which is what the fatigue cycle count needs. You need both. Our [IoT bridge monitoring case study](https://sentratech.in/case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html) uses the same continuous measurement approach, with sensors running on a railway bridge over an extended period.

## Controlled Load Testing

Load testing establishes how the measured response relates to a known railway load. The methodology lists the test conditions available under the relevant RDSO guidance:

Test | Condition |

Locomotive static test

|

Stationary locomotive positioned on the test span

|

Wagon static test

|

Stationary wagon positioned on the test span

|

Slow moving load test

|

Test train crossing the span at approximately 20 km/h

|

Fast moving load test

|

Design train crossing the test span at the track design speed

|

Accelerating load tests

|

Accelerating design train and test train conditions

|

Braking load test

|

Test train braking at approximately 20 km/h on dynamic brakes

|

Static tests separate the load effect from the dynamic effect. Moving tests add speed, and the braking test adds longitudinal force, which is the case most often underestimated. Which tests are run, and in what order, is decided with South Central Railway based on the structural and traffic information for each site.

## Finite Element Modelling and Calibration

Eight measurement points on a structure with thousands of details only go so far. The finite element model lets the assessment cover the details that have no sensors.

We build an FE model of the instrumented span in commercial engineering software from the structural information supplied. It is analysed for dead load, superimposed dead load, live load, standard railway loading, 25 tonne loading and test train loading, and for dynamic properties including natural frequencies and mode shapes.

Calibration is the important step. Strain and acceleration measured in the controlled tests are used to adjust the model until its predicted response matches what the bridge actually did. An uncalibrated model reflects its builder's assumptions, especially about boundary conditions and connection stiffness, and field data is what corrects them. Once the model matches the measured response, you can trust its predictions at details without sensors.

## From strain history to residual fatigue life

The strain record from a train crossing is an irregular signal, not a tidy series of identical cycles. Rainflow cycle counting breaks it down into individual stress cycles and their amplitudes so a fatigue calculation can use it.

The sequence is: strain time history, Rainflow cycle counting, stress and strain amplitudes, S-N fatigue data, cumulative damage, and finally residual fatigue life.

Cumulative damage is calculated using Miner's Rule:

**D = ( ni / Ni )**

Here ni is the observed number of cycles at a given stress or strain amplitude, and Ni is the number of cycles to failure at that amplitude, from the fatigue data. Adding up the ratio across all amplitude bands gives the accumulated damage for that detail.

The assessment follows BS 5400 Part 10. It covers finding the fatigue-critical locations, determining stress ranges, cycle counting, classifying the details for fatigue, accumulated damage and residual fatigue life.

## Validation Across Several Data Sources

A fatigue figure is only as reliable as the model and measurements behind it, so the methodology cross-checks the result. Analytical predictions are compared with measured strain, accelerometer data, controlled load test results, any historical or physical test information available, and behaviour under different loading conditions.

The accelerometer data matters here. Natural frequencies and mode shapes depend heavily on boundary conditions and on how stiff the connections really are. If a model reproduces the measured strain but gets the frequencies wrong, something in its assumptions needs fixing.

The process is iterative. It runs from the physical bridge to measured data, FE model, calibration, fatigue assessment and validation, and goes back into the model wherever the comparison shows a mismatch.

## Getting the data into a monitoring platform

The instruments send data to a cloud monitoring platform instead of a logger that someone has to collect later. The platform stores the data in real time and provides live charts, configurable dashboards, video synchronisation, analytics, alerts and automated reports.

Video synchronisation is especially useful. If you can match a strain trace to footage of the train that caused it, an unusual peak becomes an event you can identify. Often that decides whether the reading can be acted on or has to be thrown out.

Over the longer term, the same instruments can support continuous [structural health monitoring](https://sentratech.in/solutions/structural-health-monitoring.html) instead of a one-off assessment, and the readings can sit with the rest of the asset record through [asset monitoring and management](https://sentratech.in/solutions/asset-monitoring-and-management-solutions.html). Where a [digital twin](https://sentratech.in/solutions/digital-twin.html) of the structure exists, each sensor's output can be linked to the member it came from, as we did on the [digital twin of Bridge No. 60 DN](https://sentratech.in/case-studies/railway-bridge-digital-twin-drone-lidar-inspection.html) in the same division.

## What This Approach Adds

Conventional inspection observes, records and reports. An instrumented assessment measures, analyses, models, validates and assesses. Neither is more rigorous than the other; they answer different questions, and inspection alone can't answer the fatigue question.

Each part of the assignment adds something the others can't:

- [Structural instrumentation](https://sentratech.in/solutions/structural-health-monitoring.html) records how the bridge really behaves, not how it was assumed to behave.

- Load testing establishes a known relationship between applied load and measured response.

- Cloud monitoring makes the measurements usable while testing is still under way.

- FE modelling extends the findings from eight instrumented points to the details that were never gauged.

- Model calibration keeps the analysis tied to field evidence instead of assumptions.

- [Fatigue analysis](https://sentratech.in/solutions/fatigue-and-residual-life-assessment.html) converts stress ranges and cycle counts into an accumulated damage figure.

- Residual life assessment turns that damage figure into the answer the asset owner asked for.

## Key Project Figures

Figure | Detail |

2 bridges

|

Steel structures assessed under the project scope

|

25T

|

Higher axle load condition considered

|

4 weeks

|

Recommended monitoring period

|

72 hours

|

Normal traffic recording for a selected train

|

50 to 100 Hz

|

Proposed sampling range, subject to refinement

|

08 strain gauges

|

Specified for critical locations on Bridge No. 615 UP

|

04 accelerometers

|

For dynamic behaviour and modal analysis

|

BS 5400 Part 10

|

Fatigue assessment basis, with Rainflow counting and Miner's Rule

|

## Conclusion

For Bridge No. 615 UP and Bridge No. 3 West, the assessment links sensor readings, measured structural response and a calibrated FE model to arrive at a residual fatigue life figure. Each step is checked against field data, and that checking is what makes it an assessment and not an estimate.

For railway asset owners, the wider point is that the sensors don't have to come off the bridge when the assessment ends. Left in place and connected to a monitoring platform, they turn a one-time answer into a performance history. With that history, inspection and maintenance can be scheduled by condition instead of by calendar, which is where all of Sentra's [railway infrastructure monitoring](https://sentratech.in/industries/railway-infrastructure-monitoring.html) work is heading.

Related service [Railway Bridge Monitoring ](https://sentratech.in/solutions/railway-bridge-monitoring.html)

- [10 Early Warning Signs Your Bridge Needs Continuous Monitoring](https://sentratech.in/blogs/10-early-warning-signs-bridge-continuous-monitoring.html)

- [Bridge Scour: How IoT Sensors and Digital Twins Catch What Inspections Miss](https://sentratech.in/blogs/bridge-scour-monitoring-iot-digital-twins.html)

- [Top 5 Hidden Structural Damages That Manual Bridge Inspection Misses](https://sentratech.in/blogs/top-5-hidden-structural-damages-bridge-inspection.html)

[Request a monitoring assessment for your asset](https://sentratech.in/monitoring-assessment.html?asset=bridge&amp;source=railway-bridge-fatigue-life-assessment-load-testing)

## Assessing fatigue life on your bridges?

Tell us about the structure and the loading you need to justify, and we'll scope the instrumentation, load testing and fatigue assessment.

[Request a Similar Monitoring Assessment ](https://sentratech.in/monitoring-assessment.html?asset=railway&amp;source=railway-bridge-fatigue-life-assessment-load-testing)
