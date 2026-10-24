# Structural Health Monitoring of Bridges: Sensors, Data and How It Works

> Structural health monitoring of bridges explained: what it measures, which sensors go where, how data becomes alerts, and results from two Indian bridges.

Published: 2026-10-23  
Source: https://sentratech.in/article/structural-health-monitoring-of-bridges.html

Inspection shows how a bridge looked on the day of the visit. Structural health monitoring shows how it behaves every day in between. Here is what a bridge SHM system measures, which sensors go where, how the data becomes alerts, and what it showed on two bridges in service.

Most bridges in India are managed by inspection: an engineer visits, looks, records the condition and comes back a year or two later. Inspection finds what can be seen. It cannot say how a girder responds when a loaded truck or a 25-tonne axle crosses it, or whether a pier has rotated a fraction of a degree since the last monsoon. Structural health monitoring fills that gap. This article explains what structural health monitoring of bridges involves, which sensors are used and where they go, how the system turns readings into decisions, and what the data looked like on two bridges we have instrumented.

## What Is Structural Health Monitoring of Bridges?

Structural health monitoring (SHM) of bridges is the continuous measurement of how a bridge behaves under traffic, temperature and time. Sensors fixed at critical points record strain, deflection, vibration, tilt and movement. A data acquisition system sends the readings to engineers, who compare them with design limits and with the bridge's own baseline.

The point is not to collect data for its own sake. Each sensor answers a specific question: is this girder carrying more stress than it was designed for, is this pier moving, has this deck lost stiffness? Our [guide to structural health monitoring](https://sentratech.in/blogs/structural-health-monitoring.html) covers the general principles. This article applies them to bridges.

## What a Bridge SHM System Measures

Every bridge is different, but most monitoring programmes draw on the same set of parameters:

- **Strain and stress** in girders, cross girders and connections. Stress range under traffic is what drives fatigue in steel bridges.

- **Deflection** at mid-span, compared with the serviceability limit. A growing deflection under the same load points to lost stiffness.

- **Vibration**: natural frequency and damping. Natural frequency depends on stiffness, so a sustained drop, once corrected for temperature, is one of the clearest signs of damage.

- **Tilt and rotation** of piers, abutments and bearings, the earliest indicator of foundation settlement or [scour](https://sentratech.in/blogs/bridge-scour-monitoring-iot-digital-twins.html).

- **Displacement** at bearings and expansion joints, showing whether the deck moves freely with temperature or has started to bind.

- **Crack width** at known cracks in concrete members, to tell an active crack from a dormant one.

- **Temperature and environment**, logged at the sensor locations so that daily thermal movement is not mistaken for structural change.

Cable-stayed and suspension bridges add cable tension and deck movement measured by [GNSS](https://sentratech.in/products/gnss-meter.html). River bridges add scour and water level.

## Bridge SHM Sensors and Where They Go

Sensors are placed where the risk is, not spread evenly over the structure. The layout below is the one we used on an in-service steel railway bridge, and it is typical of a girder bridge:

Location | Sensor | What it tells you |

Bottom flange of main girders, mid-span | [Strain gauges](https://sentratech.in/products/strain-gauges.html) | Bending stress under traffic; stress range for fatigue |

Cross girders near bearings | Strain gauges | Load transfer and secondary stresses |

Mid-span | LVDTs or displacement sensors | Deflection against the serviceability limit |

Bearings and piers | [Tiltmeters](https://sentratech.in/products/tiltmeter.html) / inclinometers | Tilt or settlement of the substructure |

Deck and expansion joints | [Accelerometers](https://sentratech.in/products/accelerometers.html) | Vibration amplitude, natural frequency and damping |

Girder surface | Temperature sensors | Thermal compensation for every other reading |

On concrete bridges the emphasis shifts towards crack monitoring, deflection and long-term tilt. On steel bridges, fatigue-critical details such as welded connections and cross-girder ends get the most strain gauges. Our [sensor selection guide](https://sentratech.in/technology/sensor-selection-guide.html) covers the trade-offs between sensor types in more detail.

## How the System Works: From Sensor to Alert

A bridge SHM system has four layers:

1. **Sensors** at the critical points described above.

2. **Data acquisition.** [Data loggers](https://sentratech.in/products/digital-data-logger.html) collect synchronised readings. Trend parameters such as tilt and crack width are read every few minutes. Dynamic parameters need much faster sampling: on our railway bridge, strain, vibration and deflection were recorded at 100 Hz so that each train passage was captured in full.

3. **Communication.** Wireless sensors and loggers send data over LoRaWAN or 4G through [gateways](https://sentratech.in/products/gateway.html). Loggers store readings locally if the link drops, so a weak signal at a river crossing does not mean lost data.

4. **Analysis and alerts.** On a cloud platform, readings are compared with thresholds set from the design limits. Alerts go out by SMS, email and dashboard, and engineers review the trends in periodic reports.

The first weeks of data set the bridge's baseline: its normal stress range, natural frequency and seasonal movement. From then on, the useful question is not only "is this reading above the limit?" but "is this bridge behaving differently from how it behaved before?"

## What the Data Shows on a Real Bridge

On a [three-span steel plate girder railway bridge](https://sentratech.in/case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html) built in the 1960s, with 3 × 18.3 m spans carrying 25-tonne axle loads at 20 to 100 km/h, three months of continuous monitoring gave the owner these answers:

Parameter | Measured | Limit | Result |

Peak stress range | 98 MPa | 120 MPa | Safe |

Maximum deflection | 6.2 mm | 7.5 mm | Within limit |

First natural frequency | 5.3 Hz | – | Adequate stiffness |

Damping ratio | 0.04 | – | Normal for steel |

Fatigue damage index | 0.63 | 1.0 | Residual life 12–15 years |

Tilt readings at the piers and bearings showed no abnormal movement. The result was a measured basis for keeping an ageing bridge in service under today's loads, with a residual fatigue life estimate in place of an assumption. The fatigue method behind that estimate is explained in our article on [fatigue life assessment](https://sentratech.in/blogs/fatigue-life-assessment.html).

On a [30-year-old four-lane concrete highway bridge](https://sentratech.in/case-studies/structural-health-monitoring-of-highway-bridges.html) carrying about 55,000 vehicles a day, the first year of monitoring identified the girders carrying higher strain under peak freight traffic. Inspections had rated the bridge sound, but they had never shown how it behaved between visits. The owner now plans maintenance from measured behaviour rather than a fixed schedule.

## Different Bridges, Different Priorities

- **Steel railway bridges:** fatigue comes first. Strain gauges at fatigue-critical details, sampled fast enough to capture each train, feed stress-range counting and residual life estimates.

- **Concrete highway bridges and flyovers:** deflection, crack activity, bearing behaviour and long-term creep. Overloaded freight traffic is the usual concern.

- **River bridges:** pier tilt and scour, with water level, because foundations can be undermined during a single flood. The [Madhya Pradesh bridge collapses](https://sentratech.in/article/madhya-pradesh-bridge-collapses-structural-health-monitoring.html) showed how quickly that can happen.

- **Cable-stayed and long-span bridges:** cable tension, deck movement by GNSS and wind-induced vibration.

## Monitoring and Inspection Work Together

Structural health monitoring does not replace inspection. An inspector sees spalling, corrosion and damaged drainage that no sensor will report. What monitoring adds is the behaviour between visits and the trend over months and years. It also directs inspection: crews go to the spans and bearings the data flags, instead of working through a fixed list. Our article on the [hidden damage that manual inspection misses](https://sentratech.in/blogs/top-5-hidden-structural-damages-bridge-inspection.html) covers where the two approaches differ.

## Starting a Bridge Monitoring Programme

The usual route is a site survey and review of drawings, inspection reports and traffic data; then a sensor layout aimed at the bridge's likely failure modes; then installation, calibration and a baseline period. We recommend a 4 to 8 week pilot on the most critical bridge before extending to a network. Readings and basic alerts arrive within hours to days of installation, and a reliable baseline typically emerges within 2 to 6 weeks. What drives the budget is explained in our guide to [structural health monitoring cost](https://sentratech.in/blogs/structural-health-monitoring-cost-factors.html).

## Frequently Asked Questions

#### What is structural health monitoring of bridges?

It is the continuous measurement of a bridge's behaviour using sensors fixed at critical points: strain, deflection, vibration, tilt and movement. Readings are compared with design limits and with the bridge's own baseline, so engineers can see deterioration as it develops rather than at the next inspection.

#### Which sensors are used for bridge structural health monitoring?

Strain gauges on girders and connections, displacement sensors or LVDTs for deflection, accelerometers for vibration and natural frequency, tiltmeters or inclinometers on piers and bearings, crack meters on concrete, and temperature sensors for thermal compensation. Long-span bridges add GNSS and cable tension sensors.

#### Can sensors be installed on a bridge without closing it?

Yes. Wireless sensors need no long cable runs and can be fixed within short traffic or track blocks. Our railway bridge work was instrumented and load-tested around running trains.

#### How long before bridge monitoring produces useful results?

Readings and alerts start within hours to days of installation. A reliable baseline usually takes 2 to 6 weeks, and fatigue and residual life assessment typically needs a few months of data, as on the railway bridge described above.

Related service [Bridge Monitoring System ](https://sentratech.in/industries/bridges-highways-monitoring.html)

- [10 Early Warning Signs Your Bridge Needs Continuous Monitoring](https://sentratech.in/blogs/10-early-warning-signs-bridge-continuous-monitoring.html)

- [Bridge Scour: How IoT Sensors and Digital Twins Catch What Inspections Miss](https://sentratech.in/blogs/bridge-scour-monitoring-iot-digital-twins.html)

- [Top 5 Hidden Structural Damages That Manual Bridge Inspection Misses](https://sentratech.in/blogs/top-5-hidden-structural-damages-bridge-inspection.html)

[Request a monitoring assessment for your asset](https://sentratech.in/monitoring-assessment.html?asset=bridge&amp;source=structural-health-monitoring-of-bridges)

## Plan Monitoring for Your Bridge

Tell us about the bridge: its type and age, the traffic it carries and what concerns you. Our engineers will recommend what to measure, where the sensors go and how alerts should reach your team.

[Request a Monitoring Assessment ](https://sentratech.in/monitoring-assessment.html?source=structural-health-monitoring-of-bridges)
