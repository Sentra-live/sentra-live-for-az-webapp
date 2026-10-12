# SHM Sensors: Strain, Vibration, Tilt & GNSS | Sentra

> Engineering reference for the structural monitoring sensors Sentra installs: vibrating wire strain gauges, MEMS accelerometers, vibration meters, tiltmeters, laser tiltmeters and RTK GNSS, with measurement principle, installation, data output and what each detects.

Published: 2026-09-30  
Source: https://sentratech.in/technology/shm-sensors.html

!

![Close technical installation of strain, vibration and tilt sensors on a steel railway bridge](https://sentratech.in/image/technology/shm-sensors.png)

Strain Vibration Tilt Convergence GNSS

## Structural Monitoring Sensors

Every sensor here is one we supply and install. For each: how it measures, how it is installed, what data it produces, and what an engineer reads from it. Figures come from manufacturer datasheets; unverified figures are left out.

[Talk to an Engineer ](https://sentratech.in/contact.html) [Open the sensor explorer](#tx-explorer)

Sensor Explorer

## Six Sensors, One Question Each

Pick a sensor. The trace shows the kind of signal it produces; the facts below are from its datasheet and our projects.

Delivered Built or run by Sentra / Clove Engineering service Done by our engineers, per project Partner technology Supplied by a partner we resell Capability gap Not in place yet

Models 4100 / 4150 vibrating wireDelivered

### Strain gauge

Strain as a train crosses · illustrative signal shape, not project data

**3,000–10,000**microstrain range

**±0.5%**accuracy (datasheet)

**IP67**stainless steel

MeasuresSurface strain; stress via the elastic modulus

PrincipleTensioned steel wire; deformation changes its resonant frequency, read by the logger

InstallationSpot-welded (4150) or epoxy/weld mounted on steel; also concrete and rock

SamplingPeriodic for static strain; 50–100 Hz for dynamic strain under traffic

Connects viaG7 vibrating wire logger, LoRaWAN or 4G

Engineer readsLive-load stress, stress range spectra for fatigue, load sharing between members

FlagsRising stress range, load redistribution, stress concentration

Evidence[Railway plate girder](https://sentratech.in/case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html): 98 MPa peak stress range. [SCR fatigue assessment](https://sentratech.in/case-studies/railway-bridge-fatigue-life-assessment-load-testing.html): 8 gauges at critical members.

[Full product specifications ](https://sentratech.in/products/strain-gauges.html)

Model 4030 triaxial MEMSDelivered

### Accelerometer

Free vibration decay after a load passes · illustrative signal shape, not project data

**±2 / ±6 g**range options

**0.5–250 Hz**bandwidth

**IP65**−40 to +80 °C

MeasuresAcceleration in three axes; vibration and dynamic response

PrincipleCapacitive MEMS with low-pass filter and temperature compensation

InstallationBrass inserts on deck, girders or joints; shielded cable to the logger

SamplingSeveral times the highest frequency of interest; 100–200 Hz for bridge modal work

Engineer readsNatural frequencies, damping and, with several sensors, mode shapes; a falling frequency (temperature-corrected) signals lost stiffness

FlagsStiffness loss, bearing or joint problems, excessive dynamic response

Evidence[Railway plate girder](https://sentratech.in/case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html): 5.3 Hz, damping 0.04. [SCR fatigue](https://sentratech.in/case-studies/railway-bridge-fatigue-life-assessment-load-testing.html): 4 accelerometers, ±6 g, 1 mg, up to 200 Hz.

[Full product specifications ](https://sentratech.in/products/accelerometers.html)

Worldsensing LSG7ACL-BILR-VIBPartner technology

### Vibration meter

A single vibration event · illustrative signal shape, not project data

**1000 Hz**internal sampling

**0–60 mm/s**PPV (±0.01)

**IP68**up to 2 yr battery

MeasuresPeak particle velocity and dominant frequency, or MTVV for human comfort

PrincipleTriaxial MEMS sampled at 1000 Hz, processed on board

InstallationBolted to structure or ground; no cable run

ReportingEvery 10 minutes to 6 hours, or on threshold exceedance

Connects viaLoRaWAN

Engineer readsCompliance with vibration limits during construction, piling, blasting or traffic

FlagsEvents exceeding structural or comfort limits

[Full product specifications ](https://sentratech.in/products/vibration-meter.html)

Worldsensing LS-G6-TIL90Partner technology

### Tiltmeter

Seasonal tilt cycle with a slow drift · illustrative signal shape, not project data

**±0.005°**accuracy (XHP)

**±0.0001°**resolution

**10 yr**battery, IP68

MeasuresInclination in three axes

PrincipleGravity-referenced MEMS, factory calibrated, temperature compensated

InstallationBracket-mounted on piers, abutments, walls, towers or track

SamplingPeriodic, with motion-triggered extra readings

Connects viaLoRaWAN, up to 15 km open terrain

Engineer readsPier and support rotation: the earliest sign of settlement or foundation movement

FlagsDifferential settlement, scour-induced rotation, wall or tower lean

Evidence[Railway plate girder](https://sentratech.in/case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html): pier and bearing tilt normal. [Highway bridge](https://sentratech.in/case-studies/structural-health-monitoring-of-highway-bridges.html): piers and supports.

[Full product specifications ](https://sentratech.in/products/tiltmeter.html)

Worldsensing LS-G6-LAS-TIL90Partner technology

### Laser tiltmeter

Convergence stepping with excavation stages · illustrative signal shape, not project data

**±1 mm**at 10 m

**0.1 mm**resolution

**150 m**max range

MeasuresDistance to a fixed target plus 3-axis tilt

PrincipleClass II 650 nm laser rangefinder with MEMS tilt sensor

InstallationWall or crown mounted, aimed at a target; no contact with the moving surface

EnvironmentIP68, −20 to +60 °C; stores 100,000 readings

Connects viaLoRaWAN; repeaters in tunnels

Engineer readsTunnel convergence, crown settlement, joint and crack opening across a gap

FlagsConvergence rate rising during excavation, joint opening

[Full product specifications ](https://sentratech.in/products/laser-tiltmeter.html)

Worldsensing LSG7GNS-SXLHPartner technology

### GNSS meter

Noisy daily positions over a slow trend · illustrative signal shape, not project data

**2 mm**horizontal, 24 h aggregate

**184**channels

**RTK**multi-constellation

Measures3D position of a point; displacement over time

PrincipleMulti-band GPS/QZSS, GLONASS, Galileo, BeiDou with RTK correction from a base unit

InstallationRover on the monitored point, base on stable ground; clear sky view

EnvironmentIP68, −40 to +80 °C; integrated tilt, temperature, humidity

Connects viaLoRaWAN

Engineer readsLong-term settlement and horizontal movement of towers, dams, slopes, bridge supports

FlagsAccelerating displacement, differential movement between points

[Full product specifications ](https://sentratech.in/products/gnss-meter.html)

Data Acquisition

## Loggers, Gateways, and a Shared Clock

How readings leave the sensor.

Partner technology

### G7 vibrating wire logger

1, 2 or 6 channels; reads any major VW sensor brand. LoRaWAN or 4G. [Specs](https://sentratech.in/products/vibrating-wire.html)

Partner technology

### Analog data logger

4 channels: voltage, current, Wheatstone bridge, thermistor, for LVDTs and load cells. [Specs](https://sentratech.in/products/analog-data-logger.html)

Partner technology

### Digital data logger

RS485 Modbus RTU sensors onto the wireless network. [Specs](https://sentratech.in/products/digital-data-logger.html)

Partner technology

### 4G gateway

Up to 1000+ nodes per network, 4G LTE backhaul, IP68. [Specs](https://sentratech.in/products/gateway.html)

Partner technology

### Repeater

Extends LoRaWAN underground and around obstacles. [Specs](https://sentratech.in/products/repeater.html)

Delivered

### Synchronised DAQ

Strain, LVDT and accelerometer channels on one clock at 100 Hz, for load tests and dynamic response.

Choosing Sensors

## Start From the Failure Mode

Match the question to the measurement.

### Fatigue in steel members

**Measure** dynamic strain, stress ranges, cycle counts. **With** strain gauges on critical details and a synchronised DAQ.

### Loss of stiffness

**Measure** natural frequency and damping over time. **With** accelerometers plus temperature.

### Settlement or scour

**Measure** rotation and vertical movement of supports. **With** tiltmeters and GNSS.

### Deflection under load

**Measure** mid-span displacement. **With** LVDTs or laser distance.

### Tunnel or excavation deformation

**Measure** convergence and crown settlement. **With** laser tiltmeters.

### Construction or blast vibration

**Measure** PPV and frequency. **With** vibration meters.

Also used: LVDTs for deflection (6.2 mm on the [railway project](https://sentratech.in/case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html)); vibrating wire crackmeters and piezometers through the G7 logger, specified per project. Not in our range: fibre Bragg grating sensing and corrosion sensing. Visual crack detection is done from drone imagery; see [AI in SHM](https://sentratech.in/technology/ai-in-shm.html).

Evidence on request

## Not sure which sensors your structure needs?

Tell us the failure mode you are worried about and we will propose the parameters, locations and sampling to capture it.

- Case studies and method statements

- Datasheets for every sensor

- Sensors to assessment, one team

[Talk to an Engineer ](https://sentratech.in/contact.html) [ Schedule a Call](https://calendly.com/sentra-clovetech/30min?primary_color=f48120) [ +91 78930 23322](tel:+917893023322)
