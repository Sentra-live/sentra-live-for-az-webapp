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

Indian Railways is moving to heavier axle loads. That is straightforward to state and considerably harder to justify on a steel bridge built decades ago, because the question is not whether the structure can carry a 25 tonne axle once. It is how many more times it can carry one before fatigue becomes the governing limit.

South Central Railway commissioned Clove Technologies to assess two steel bridges in the Vijayawada Division on exactly that basis. The assignment covers structural instrumentation, dynamic strain and acceleration measurement, controlled load testing, finite element modelling and [residual fatigue life assessment](https://sentratech.in/solutions/fatigue-and-residual-life-assessment.html). The methodology was written against RDSO requirements, BS-106R instrumentation guidance and the fatigue assessment provisions of BS 5400 Part 10.

What follows describes that assessment methodology and the reasoning behind it. Sensor counts, sampling rates and the load test programme are as specified in the methodology document, and the detailed test programme is to be agreed with South Central Railway before execution.

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

## The Question Visual Inspection Cannot Answer

A visual inspection tells you what the bridge looks like now. Corrosion, section loss, loose rivets, cracked welds, deformed members: all of it is real information, and none of it tells you how much fatigue capacity the structure has already spent.

Fatigue damage accumulates through cycles, not through time. Every train that crosses puts the members through a stress range, and the damage from each pass depends on the size of that range at the specific detail you care about. A member can look untouched and still be most of the way through its life. Another can look poor and have decades left, because the stress ranges it sees are small.

To get at that you have to answer a different question: **how does this bridge actually respond when a train crosses it?** That means measuring dynamic strain, acceleration and stress ranges at critical members, under both controlled test loading and ordinary traffic, and turning the result into cycle counts that a fatigue calculation can use.

## The Two Bridges

The assignment covers two structures of quite different scale.

Bridge No. 615 UP

Configuration of 2 × 12.20 m plus 5 × 18.29 m, at Km 708/5-11 on the BZA-VSKP section. The methodology identifies this as an open web girder bridge and treats it as the reference structure: the detailed instrumentation layout and the fatigue assessment procedure are both developed around it, with performance under heavier axle loads as the specific concern.

Bridge No. 3 West

Twelve spans of 91.40 m at Km 425/42-427/06 on the GDR-BZA section. A considerably larger open web steel girder structure, to which the same instrumentation and fatigue life assessment approach is applied.

## Instrumentation Strategy

For Bridge No. 615 UP the methodology specifies eight strain gauges and four accelerometers. The strain gauges measure stress ranges and fatigue cycles at critical locations; the accelerometers cover dynamic behaviour and feed modal analysis. Sensor positions follow BS-106R guidance for instrumenting open web girders, with final locations to be confirmed against the structural drawings and the agreed load test plan.

Why sensor placement decides the answer

Sensors are not spread evenly over the structure. They go where fatigue is plausible, which means the members that see repeated significant stress ranges under train loading. In this case the strain gauge locations are drawn from the bottom long girders, flange locations, cross girders and other critical sections.

The arrangement is chosen so that different components of the response can be separated: axial strain, bending effects and out of plane behaviour each show up differently depending on where the gauge sits. Get the placement wrong and you measure a member that was never going to be the problem, which is an expensive way to prove nothing.

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

If the underlying instruments are unfamiliar, we have written separately on [how strain gauges work](https://sentratech.in/blogs/what-is-a-strain-gauge-types-working-principle.html) and on [accelerometer types and working principles](https://sentratech.in/blogs/what-is-an-accelerometer-sensor-guide.html).

## Measuring the Bridge Under Real Traffic

Sampling strain at 100 Hz continuously for a month produces an enormous quantity of data, almost all of it recorded while nothing is happening. The methodology instead uses trigger based sampling: a threshold starts and stops recording around each train crossing, so the dataset holds the events that matter and little else.

The recommended monitoring period is around four weeks at roughly 50 to 100 Hz, with the exact rate refined against design and simulation results. Alongside that, normal railway traffic is recorded for a selected train over 72 hours.

Those two datasets do different jobs. Controlled load testing gives a known input and a measurable output, which is what calibration needs. Normal traffic tells you what the bridge is subjected to in service, which is what the fatigue cycle count needs. Neither substitutes for the other. This is the same continuous measurement principle applied in our [IoT bridge monitoring case study](https://sentratech.in/case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html), where sensors ran on a railway bridge over an extended monitoring period.

## Controlled Load Testing

Load testing establishes the relationship between a known railway load and the measured structural response. The methodology sets out the test conditions available under the relevant RDSO guidance:

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

The static tests isolate the load effect from the dynamic one. The moving tests add speed, and the braking test adds longitudinal force, which is the case that tends to be underestimated. Which of these actually run, and in what order, is settled with South Central Railway against the structural and traffic information for each site.

## Finite Element Modelling and Calibration

Measurements come from eight points on a structure with thousands of details. The finite element model is what lets the assessment reach the details that were never instrumented.

An FE model of the instrumented span is built in commercial engineering software from the supplied structural information, and evaluated for dead loads, superimposed dead loads, live loads, standard railway loading, 25 tonne loading, test train loading, and the dynamic properties including natural frequencies and mode shapes.

The step that matters is calibration. Measured strain and acceleration from the controlled tests are used to update the model until its predicted response matches what the bridge actually did. An uncalibrated model reflects the assumptions of whoever built it, most obviously in boundary conditions and connection stiffness, and those assumptions are exactly what field data is able to correct. Once the model tracks the measured response, its predictions at uninstrumented details carry real weight.

## From Strain History to Residual Fatigue Life

A strain time history from a train crossing is an irregular signal, not a neat series of identical cycles. Converting it into something a fatigue calculation can use is the job of Rainflow cycle counting, which decomposes the signal into discrete stress cycles and their amplitudes.

The chain runs: strain time history, then Rainflow cycle counting, then stress and strain amplitudes, then S-N fatigue data, then cumulative damage, then residual fatigue life.

Cumulative damage is calculated on Miner's Rule:

**D = ( ni / Ni )**

Here ni is the observed number of cycles at a given stress or strain amplitude, and Ni is the number of cycles to failure at that amplitude, taken from the fatigue data. Sum the ratio across every amplitude band and you have an accumulated damage figure for that detail.

The assessment itself follows BS 5400 Part 10 and covers identification of fatigue critical locations, determination of stress ranges, cycle counting, fatigue classification of the details, accumulated damage and residual fatigue life.

## Validation Across Several Data Sources

A fatigue number is only as good as the model and the measurements behind it, so the methodology cross checks the result rather than accepting it. Analytical predictions are compared against measured strain response, accelerometer data, controlled load test results, historical or physical test information where it exists, and behaviour under different loading conditions.

Accelerometer data does specific work here. Natural frequencies and mode shapes are sensitive to boundary conditions and to how much of the connection stiffness is real, so a model that reproduces the measured strain but gets the frequencies wrong is telling you something is off in the idealisation.

The result is a loop rather than a line: physical bridge, measured data, FE model, calibration, fatigue assessment, validation, and back into the model where the comparison shows a discrepancy.

## Bringing the Data Into a Monitoring Platform

The instrumentation transmits to a cloud monitoring environment rather than to a logger somebody collects later. That environment hosts the data in real time and provides live visualisation, configurable dashboards, video synchronisation, analytics, alerting and automated reporting.

Video synchronisation is worth calling out. Matching a strain trace to footage of the train that produced it turns an anomalous peak from a mystery into an identifiable event, which is often the difference between a data point you can act on and one you have to discard.

Longer term, the same instrumentation supports continuous [structural health monitoring](https://sentratech.in/solutions/structural-health-monitoring.html) rather than a single assessment campaign, and the readings can be organised alongside the rest of the asset record through [asset monitoring and management](https://sentratech.in/solutions/asset-monitoring-and-management-solutions.html). Where a [digital twin](https://sentratech.in/solutions/digital-twin.html) of the structure exists, sensor output can be tied to the specific member it came from, as we did on the [digital twin of Bridge No. 60 DN](https://sentratech.in/case-studies/railway-bridge-digital-twin-drone-lidar-inspection.html) in the same division.

## What This Approach Adds

Conventional inspection observes, records and reports. Instrumented assessment measures, analyses, models, validates and assesses. The distinction is not that one is more rigorous than the other, but that they answer different questions, and fatigue is not a question inspection can answer on its own.

Across the assignment, each element contributes something the others cannot:

- [Structural instrumentation](https://sentratech.in/solutions/structural-health-monitoring.html) records how the bridge actually behaves rather than how it was assumed to behave.

- Load testing establishes a known relationship between applied load and measured response.

- Cloud monitoring makes the measurements usable while the campaign is still running.

- FE modelling extends the findings from eight instrumented points to the details that were never gauged.

- Model calibration keeps the analysis tied to field evidence instead of to assumptions.

- [Fatigue analysis](https://sentratech.in/solutions/fatigue-and-residual-life-assessment.html) converts stress ranges and cycle counts into an accumulated damage figure.

- Residual life assessment turns that figure into the answer the asset owner asked for.

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

For Bridge No. 615 UP and Bridge No. 3 West, the assessment builds a chain from sensor readings through measured structural response and a calibrated FE model to a residual fatigue life figure. Every link is checked against field data, which is what separates a fatigue assessment from an estimate.

The wider point for railway asset owners is that the instrumentation does not have to come off the bridge when the assessment ends. Left in place and connected to a monitoring platform, the same sensors turn a one time answer into a performance history, and that is the basis on which inspection and maintenance can be scheduled by condition rather than by calendar. It is the direction all of Sentra's [railway infrastructure monitoring](https://sentratech.in/industries/railway-infrastructure-monitoring.html) work points in.

## Assessing fatigue life on your bridges?

Tell us about the structure and the loading you need to justify, and we will scope the instrumentation, the load testing and the fatigue assessment.

[Contact us ](https://sentratech.in/contact.html)
