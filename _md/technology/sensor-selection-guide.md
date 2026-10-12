# Sensor Selection Guide for Structural Monitoring | Sentra

> Which sensor to use for strain, vibration, tilt, displacement, settlement and fatigue monitoring: failure mode to measurement, datasheet figures, sampling rates and loggers.

Published: 2026-10-03  
Source: https://sentratech.in/technology/sensor-selection-guide.html

StrainVibrationTiltDisplacementSettlementFatigue

![Sentra](https://sentratech.in/image/branding/sentra_dark.svg)

## Sensor Selection
Guide

Which sensor to use for strain, vibration, tilt, displacement, settlement and fatigue: start from the failure mode you are worried about, and match it to the measurement that captures it.

[ Download the Guide (PDF)](#) [Get a Sensor Recommendation](https://sentratech.in/monitoring-assessment.html?source=sensor-selection-guide)

## Start From the Failure Mode

Match the question to the measurement. Every sensor here is one we supply and install; figures come from manufacturer datasheets.

Failure mode | Measure | With | Sampling |

**Fatigue in steel members** | Dynamic strain, stress ranges, cycle counts | [Strain gauges on critical details + synchronised DAQ](https://sentratech.in/products/strain-gauges.html) | 50–100 Hz under traffic |

**Loss of stiffness** | Natural frequency and damping over time | [Accelerometers, plus temperature](https://sentratech.in/products/accelerometers.html) | 100–200 Hz for modal work |

**Settlement or scour** | Rotation and vertical movement of supports | [Tiltmeters and GNSS](https://sentratech.in/products/tiltmeter.html) | Periodic, with motion-triggered readings |

**Deflection under load** | Mid-span displacement | [LVDTs or laser distance](https://sentratech.in/products/analog-data-logger.html) | Synchronised with strain during load tests |

**Tunnel or excavation deformation** | Convergence and crown settlement | [Laser tiltmeters](https://sentratech.in/products/laser-tiltmeter.html) | Periodic, per excavation stage |

**Construction or blast vibration** | Peak particle velocity and frequency | [Vibration meters](https://sentratech.in/products/vibration-meter.html) | 1000 Hz internal; reports every 10 min–6 h or on exceedance |

**Crack and joint movement** | Opening, closing and growth of known cracks | [Vibrating wire crackmeters via the G7 logger](https://sentratech.in/products/vibrating-wire.html) | Periodic |

**Pore pressure and water level** | Groundwater and uplift pressure | [Vibrating wire piezometers via the G7 logger](https://sentratech.in/products/vibrating-wire.html) | Periodic |

Not in our range: fibre Bragg grating sensing and corrosion sensing.

## The Sensors

Key datasheet figures for each sensor, and what an engineer reads from it.

[ Strain gauge Vibrating wire, models 4100 / 4150 **3,000–10,000** microstrain range**±0.5%** accuracy (datasheet)**IP67** stainless steel Surface strain; stress via the elastic modulus. Spot-welded or epoxy/weld mounted on steel; also concrete and rock. ](https://sentratech.in/products/strain-gauges.html) [ Accelerometer Triaxial MEMS, model 4030 **±2 / ±6 g** range options**0.5–250 Hz** bandwidth**IP65** −40 to +80 °C Vibration and dynamic response in three axes. Engineers read natural frequencies, damping and peak acceleration. ](https://sentratech.in/products/accelerometers.html) [ Vibration meter Worldsensing, wireless **1000 Hz** internal sampling**0–60 mm/s** PPV (±0.01)**IP68** up to 2 yr battery Peak particle velocity and dominant frequency, processed on board. Bolted to structure or ground; no cable run. ](https://sentratech.in/products/vibration-meter.html) [ Tiltmeter Worldsensing, wireless **±0.005°** accuracy (XHP)**±0.0001°** resolution**10 yr** battery, IP68 Inclination in three axes. Pier and support rotation, the earliest sign of settlement. LoRaWAN, up to 15 km in open terrain. ](https://sentratech.in/products/tiltmeter.html) [ Laser tiltmeter Worldsensing, wireless **±1 mm** at 10 m**0.1 mm** resolution**150 m** max range Distance to a fixed target plus 3-axis tilt. Tunnel convergence and crown settlement, with no contact with the moving surface. ](https://sentratech.in/products/laser-tiltmeter.html) [ GNSS meter Worldsensing, RTK multi-constellation **2 mm** horizontal, 24 h aggregate**184** channels**IP68** −40 to +80 °C 3D position of a point over time. Long-term settlement and displacement, with a base unit on stable ground. ](https://sentratech.in/products/gnss-meter.html)

## Loggers and Gateways

How readings leave the sensor. Strain, LVDT and accelerometer channels can share one clock at 100 Hz for load tests and dynamic response.

[ G7 vibrating wire logger 1, 2 or 6 channels; reads any major VW sensor brand. LoRaWAN or 4G. ](https://sentratech.in/products/vibrating-wire.html) [ Analog data logger 4 channels: voltage, current, Wheatstone bridge, thermistor, for LVDTs and load cells. ](https://sentratech.in/products/analog-data-logger.html) [ Digital data logger RS485 Modbus RTU sensors onto the wireless network. ](https://sentratech.in/products/digital-data-logger.html) [ 4G gateway Up to 1000+ nodes per network, 4G LTE backhaul, IP68. ](https://sentratech.in/products/gateway.html) [ Repeater Extends LoRaWAN underground and around obstacles. ](https://sentratech.in/products/repeater.html)

## Frequently Asked Questions

##

Typically strain gauges on girders and deck sections for stress and fatigue, tiltmeters on piers and bearings for rotation and settlement, and accelerometers for natural frequency and dynamic response. GNSS covers long-term displacement, and LVDTs measure deflection during load tests.

##

Static parameters such as settlement, tilt and crack width need only periodic readings. Dynamic strain under traffic is typically sampled at 50–100 Hz, and bridge modal analysis at 100–200 Hz, several times the highest frequency of interest.

##

Wireless LoRaWAN sensors avoid cable runs and suit long or hard-to-reach structures, with repeaters underground or around obstacles. Wired sensors such as vibrating wire gauges, LVDTs and Modbus devices join the same wireless network through G7, analog and digital data loggers.

## Not Sure Which Sensors
Your Structure Needs?

Tell us the failure mode you are worried about. We will propose the parameters, locations and sampling to capture it.

[Get a Sensor Recommendation ](https://sentratech.in/monitoring-assessment.html?source=sensor-selection-guide) [ Download PDF](#)

Sentra Technologies · sentratech.in · +91 78930 23322 · sentra@clovetech.com · Request a monitoring assessment: sentratech.in/monitoring-assessment.html
