# Structural Health Monitoring System Architecture | Sentra

> How an SHM system moves data from sensors through data acquisition, IoT gateways, cloud storage and structural analytics to an engineering decision, with each layer of Sentra's stack marked as delivered, partner-supplied or a gap.

Published: 2026-09-30  
Source: https://sentratech.in/technology/shm-architecture.html

!

![Railway bridge sensors, edge logger and wireless gateway connected to an engineering data platform](https://sentratech.in/image/technology/shm-architecture.png)

Sensors Edge LoRaWAN Analytics Twin

## SHM System Architecture

A strain gauge on a girder produces a frequency. Between that frequency and an engineer deciding whether to restrict a span, sixteen things have to happen. Here is each one, and who does it.

[Talk to an Engineer ](https://sentratech.in/contact.html) [Explore the stack](#tx-stack)

Interactive Stack

## Sixteen Layers, Sensor to Decision

Select a layer to see what happens there, what data comes out, and who implements it.

Delivered Built or run by Sentra / Clove Engineering service Done by our engineers, per project Partner technology Supplied by a partner we resell Capability gap Not in place yet

Field**02 layers**

Edge & network**03 layers**

Platform**02 layers**

Analytics**04 layers**

Twin & decision**05 layers**

LAYER **03** / 16

LAYER 01 · FIELDPartner technology

### Sensors

Vibrating wire strain gauges, MEMS accelerometers and vibration meters, 3-axis tiltmeters, laser distance/tilt meters, RTK GNSS, LVDTs and temperature sensors. Selection and placement are ours; most wireless devices are Worldsensing models.

Data outFrequency, voltage, digital readings Implemented bySentra

[Evidence and detail ](https://sentratech.in/technology/shm-sensors.html)

LAYER 02 · FIELDPartner technology

### Signal conditioning

Vibrating wire excitation and frequency readout, Wheatstone bridge and thermistor inputs, and on-board temperature compensation, inside the logger or sensor node.

Data outEngineering units with temperature Implemented bySentra

LAYER 03 · EDGE & NETWORKDelivered

### Data acquisition

Wireless loggers for vibrating wire (1, 2, 6 channel), analog and RS485 Modbus sensors. On the railway project a multi-channel DAQ recorded strain, vibration and deflection synchronously at 100 Hz.

Data outTimestamped channels, 100 Hz synchronised Implemented bySentra

[Evidence and detail ](https://sentratech.in/case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html)

LAYER 04 · EDGE & NETWORKPartner technology

### Edge processing

Nodes apply thresholds and event triggers locally: the vibration meter samples at 1000 Hz and reports PPV and frequency on exceedance; tiltmeters trigger extra readings on movement. Gateways buffer if backhaul drops.

Data outEvents, summaries, buffered data Implemented bySentra

LAYER 05 · EDGE & NETWORKPartner technology

### IoT communication

LoRaWAN from node to gateway (up to 15 km in open terrain, repeaters underground), 4G LTE backhaul, AES-128 on the radio link.

Data outEncrypted packets Implemented bySentra

LAYER 06 · PLATFORMDelivered Partner technology

### Monitoring platform

Sentra’s in-house monitoring application, alongside Worldsensing CMT Cloud for multi-project deployments or CMT Edge where data must stay on site.

Data outLive readings, history, users Implemented bySentra

LAYER 07 · PLATFORMDelivered Partner technology

### Storage & export

Readings are stored with timestamps for the life of the programme and exported as CSV for analysis.

Data outTime series, CSV Implemented bySentra

LAYER 08 · ANALYTICSEngineering service

### Signal processing

Filtering, temperature separation, FFT for frequency content, and Rainflow counting of strain histories.

Data outSpectra, cycle counts Implemented bySentra

LAYER 09 · ANALYTICSEngineering service

### Structural analytics

Natural frequency and damping, stress ranges, deflection against serviceability limits, FE model calibration, fatigue damage and residual life.

Data outEngineering quantities vs limits Implemented bySentra

[Evidence and detail ](https://sentratech.in/case-studies/railway-bridge-fatigue-life-assessment-load-testing.html)

LAYER 10 · ANALYTICSDelivered

### AI / machine learning

CNN crack and rust detection on drone imagery (BridgePulse) and machine learning anomaly detection on sensor streams in the in-house application.

Data outDetections, anomaly flags Implemented bySentra

[Evidence and detail ](https://sentratech.in/technology/ai-in-shm.html)

LAYER 11 · ANALYTICSDelivered

### Anomaly detection

Threshold and baseline exceedance, plus machine learning anomaly detection on the sensor streams.

Data outFlags per sensor and component Implemented bySentra

LAYER 12 · TWIN & DECISIONEngineering service

### Condition assessment

Engineers interpret trends against design assumptions and write the assessment, e.g. 98 MPa peak stress range against a 120 MPa limit.

Data outEngineering assessment Implemented bySentra

[Evidence and detail ](https://sentratech.in/case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html)

LAYER 13 · TWIN & DECISIONDelivered

### Digital twin

Component-level asset twins from reality capture (Bridge No. 60 DN, TGNPDCL substation), with live sensor data bound to twin components in the in-house application.

Data outComponents with state and history Implemented bySentra

[Evidence and detail ](https://sentratech.in/technology/structural-health-monitoring-digital-twin.html)

LAYER 14 · TWIN & DECISIONEngineering service Capability gap

### Prediction

Physics-based residual fatigue life from measured stress spectra (12–15 years on one railway bridge). Data-driven deterioration forecasting is not in place.

Data outResidual life estimate Implemented bySentra

LAYER 15 · TWIN & DECISIONDelivered

### Decision support

Alerts, periodic engineering reports, maintenance points of interest in the twin, and fatigue assessment reports with recommendations.

Data outAlerts, reports, POIs Implemented bySentra

LAYER 16 · TWIN & DECISION

### Engineer / operator

The asset owner decides: inspect, restrict, repair, or keep in service. The system exists to make that decision evidence-based.

Data outThe decision Implemented bySentra

One Bridge, End to End

## A 1960s Railway Plate Girder, Instrumented

Three spans of 18.3 m, Fe 410 steel, 25 t axle loading, three months of continuous monitoring at 100 Hz. Sensor locations by type:

**SG** Strain gauges: bottom flanges at mid-span, cross girders near bearings**LV** LVDT at mid-span**IN** Inclinometers at bearings and piers**AC** Accelerometers at deck and joints**T** Temperature on girder surface

Schematic by location type, not to scale. Hover a marker for its location.

**98MPa**Peak stress range at mid-span_Limit 120 MPa_

**6.2mm**Maximum deflection_Limit 7.5 mm_

**5.3Hz**First natural frequency_Limit 4.5 Hz_

**0.04**Damping ratio_Typical for steel_

**12–15yrs**Residual fatigue life_Damage index 0.63_

Source: [IoT Bridge Monitoring and Sensor Installation on Railway Bridges](https://sentratech.in/case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html). The same chain with load testing and FE calibration added: [railway bridge fatigue life assessment](https://sentratech.in/case-studies/railway-bridge-fatigue-life-assessment-load-testing.html).

Sampling & Synchronisation

## Sample for the Question, Not the Hardware

Behaviour of interest ranges from milliseconds to seasons. The sampling plan follows from it.

Blast / construction vibration Modal response Strain per train crossing Thermal strain (daily) Tilt, settlement GNSS trend

1 ms0.1 s10 shoursweeksseasons

Delivered

### Dynamic strain

Synchronised 50–100 Hz with trigger-based recording around each crossing, so the dataset holds the events.

Engineering service

### Modal work

Sample several times above the highest frequency of interest: 100 Hz for a 5.3 Hz first mode on the railway girder.

Partner technology

### Vibration limits

The vibration meter samples at 1000 Hz internally and reports PPV and frequency per interval or on exceedance.

Where strain, deflection and acceleration must be read together, for example a stress peak against a deflection peak under the same axle, the channels share a clock on a synchronised DAQ rather than independent wireless nodes.

Alerts

## Thresholds, Plus Machine Learning

Engineering limits set from the design and the measured baseline, with machine learning anomaly detection on the sensor streams. Every level has an agreed response.

### Multi-Tier Alerting

Each level has an agreed response, set with the asset owner before commissioning.

**Normal**Within expected behaviour. Logged and trended.

**Warning**Approaching a limit or anomalous. Engineer reviews trend and sensor.

**Alert**Limit reached. Targeted inspection, higher reading frequency.

**Critical**Design limit exceeded. Supports restriction or closure decisions.

Notifications by SMS, email and dashboard. Temperature is logged at every sensor location so thermal movement is not mistaken for structural change; on the [highway bridge programme](https://sentratech.in/case-studies/structural-health-monitoring-of-highway-bridges.html) seasonal expansion and rainfall-related bearing behaviour were both visible this way.

Measurement to Maintenance

## The Predictive Maintenance Chain

Each link, marked honestly.

01

Delivered

01 · Measure

### Measurement

Continuous readings from instruments fixed to the structure.

- Strain

- Tilt

- Vibration

- Displacement

- Temperature

02

Engineering service

02 · Condition

### Condition

Trend against baseline and design limits

03

Delivered

03 · Anomaly

### Anomaly

Threshold exceedance and ML anomaly detection

04

Engineering service Capability gap

04 · Predict

### Prediction

Residual life is calculated from physics today. Forecasting it from the data alone is not in place yet.

Physics-based residual fatigue life**In service**

Data-driven forecasting**Not yet**

05

Engineering service

05 · Recommend

### Recommendation

Every assessment ends in one of four decisions for the asset owner.

- Inspect

- Repair

- Restrict

- Keep in service

06

Delivered

06 · Record

### Asset history

Maintenance points and records on the twin

Honest Gaps

## What Is Not in Place Yet

Capability gap

### Deterioration forecasting

Anomalies are detected; forecasting when a component reaches a limit from sensor data alone is not. Our predictions are physics-based.

Capability gap

### Fibre-optic sensing

FBG and distributed fibre sensing are not in our current range.

Capability gap

### Corrosion sensing

Embedded or half-cell corrosion monitoring is not in our current range.

Capability gap

### Public data API

Data leaves as CSV export; system integrations are scoped per project.

Evidence on request

## Planning a monitoring system?

Tell us the structure and the question you need answered; we will propose the sensors, the data path and the analysis.

- Case studies and method statements

- Datasheets for every sensor

- Sensors to assessment, one team

[Talk to an Engineer ](https://sentratech.in/contact.html) [ Schedule a Call](https://calendly.com/sentra-clovetech/30min?primary_color=f48120) [ +91 78930 23322](tel:+917893023322)
