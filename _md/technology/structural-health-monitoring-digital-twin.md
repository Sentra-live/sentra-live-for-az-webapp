# Structural Health Monitoring Digital Twin | Sentra

> What a structural health monitoring digital twin is, how it differs from a 3D model and from BIM, how sensor data binds to structural components, and where Sentra's delivered twins sit on the maturity ladder.

Published: 2026-09-30  
Source: https://sentratech.in/technology/structural-health-monitoring-digital-twin.html

!

![Layered digital twin visualization of a steel railway bridge with live sensor points](https://sentratech.in/image/technology/shm-digital-twin.png)

Reality Capture Components Live Data Analytics

## Structural Health Monitoring Digital Twin

A 3D model shows what a structure looks like. BIM describes what it is made of. A digital twin tracks what it is doing. Here is the difference, the architecture that joins them, and where our twins sit.

[Talk to an Engineer ](https://sentratech.in/contact.html) [See the difference](#tx-diff)

Three Terms, Three Things

## 3D Model BIM Digital Twin

The difference decides what the deliverable can do for you.

### 3D model

Geometry and appearance, from drawings, scans or photogrammetry.

- **Answers**What does it look like?

- **Unit**Surfaces, points

- **After handover**Does not change

### BIM

Geometry plus objects, properties and relationships, usually authored at design stage.

- **Answers**What is it made of, and where?

- **Unit**Building or structural elements

- **After handover**Only if re-modelled

### Digital twin

The asset as it is now and how it got there: components with an identity, a condition and a history.

- **Answers**What state is this component in, and what happened to it?

- **Unit**Components with IDs

- **After handover**Keeps accepting inspections, maintenance and live readings

Our working definition: a component-level model of the asset as built, plus its inspection and maintenance history, plus live measurements bound to those components, plus the analysis that turns measurements into a condition.

Architecture

## From Physical Asset to Decision

01 · Capture

### Reality capture

Drone, terrestrial LiDAR, handheld SLAM, 360° imagery

- Drone

- Terrestrial LiDAR

- Handheld SLAM

- 360°

Delivered

02 · Register

### Point cloud

Registered, cleaned, georeferenced

Delivered

03 · Model

### Component model

Named objects with asset IDs

Delivered

04 · Attach

### Asset information

Inspections, POIs, construction video

- Inspections

- POIs

- Construction video

Delivered

05 · Bind

### Live data

Sensor channels keyed to component IDs

Delivered

06 · Decide

### Decision support

Alerts on components, where to inspect, what to repair

Delivered

1. Alert on component

2. Where to inspect

3. What to repair

Maturity Ladder

## Where Our Twins Sit

Five levels, from survey to prediction.

L0

### Survey

Point cloud, mesh or photogrammetry.Delivered[BridgePulse](https://sentratech.in/case-studies/bridgepluse-ai-and-drone-technology-for-bridge-health-monitoring.html) models; [60 DN](https://sentratech.in/case-studies/railway-bridge-digital-twin-drone-lidar-inspection.html) capture

L1

### 3D model

Geometry organised for viewing and measurement.DeliveredDelivered within L2 projects

L2

### Asset twin

Component model with records attached.Delivered[Bridge No. 60 DN](https://sentratech.in/case-studies/railway-bridge-digital-twin-drone-lidar-inspection.html) (SCR); [Bathupally substation](https://sentratech.in/case-studies/substation-digital-asset-management-predictive-maintenance.html) (TGNPDCL)

L3

### Monitored twin

Live sensor channels bound to components; condition on the model.DeliveredIn-house monitoring application

L4

### Predictive twin

Models forecast component condition.Capability gapResidual fatigue life exists as a separate, physics-based assessment

The formula _3D/BIM model + live IoT data + analytics + lifecycle information = operational digital twin_ describes L3 and L4. L3 is delivered; L4 is the next step.

Binding Sensors to Components

## Every Channel Knows Its Member

Select a component of an open web girder span to see its asset ID and what is measured on it. Layout shown on the geometry of Bridge No. 60 DN.

BR-60DN/SPAN1/GIRDER-US/BF-MID

### Main girder bottom chord

MeasuredStrain, stress range, fatigue cycles SensorsVibrating wire strain gauges Why it mattersStress range spectra feed the member’s fatigue assessment directly.

BR-60DN/SPAN1/CROSS-GIRDER-05

### Cross girder

MeasuredStrain, load transfer, secondary stress SensorsStrain gauges near bearings Why it mattersShows how load passes from deck to main girders.

BR-60DN/SPAN1/DECK

### Deck and track

MeasuredAcceleration, vibration amplitude and frequency SensorsAccelerometers Why it mattersNatural frequency and damping tracked against temperature for stiffness change.

BR-60DN/SPAN1/BEARING-A1

### Bearing A1

MeasuredDisplacement, rotation, temperature SensorsLVDT / laser distance, tiltmeter, temperature Why it mattersSeparates thermal movement from a seized or damaged bearing.

BR-60DN/ABUT-A

### Abutment A

MeasuredTilt, settlement SensorsTiltmeter, GNSS Why it mattersRotation of the substructure is the earliest sign of settlement or scour.

BR-60DN/SPAN1/TOP-CHORD

### Top chord and diagonals

MeasuredGeometry, condition records SensorsReality capture (drone + TLS); strain where fatigue-critical Why it mattersInspection findings and defect notes attach to the member they describe.

**BR-60DN** Bridge └── **SPAN1** 1 × 40.23 m OWG ├── GIRDER-US / GIRDER-DS strain, stress range │ └── BF-MID bottom flange, mid-span │ └── **SG-03** gauge logger channel ├── CROSS-GIRDER-nn strain ├── DECK acceleration └── BEARING-A1 / A2 displacement, temperature **ABUT-A** / PIER tilt, settlement

- **Model** the asset from reality capture as separate components. Delivered

- **Assign asset IDs** in a hierarchy like the one shown. Delivered

- **Design the sensor layout** against the components: sensor ID component ID. Engineering service

- **Map logger channels** to sensor IDs. Engineering service

- **Show live readings** and condition state on each component. Delivered

In Use

## What Engineers Do With It

Screens from the Bathupally substation twin delivered to TGNPDCL.

![360 degree imagery layer of the substation twin with point cloud minimap](https://sentratech.in/image/case-studies/substation-digital-asset-management-predictive-maintenance/360-panorama-view.webp)

Walk every bay in 360° imagery; the minimap shows where you stand.

![Measuring a 7.86 m gantry column in the twin](https://sentratech.in/image/case-studies/substation-digital-asset-management-predictive-maintenance/measurement-tool.webp)

Measure in real units: a 7.86 m gantry column, no permit to work.

![Maintenance point of interest logged on a transformer](https://sentratech.in/image/case-studies/substation-digital-asset-management-predictive-maintenance/point-of-interest.webp)

Log maintenance points on the equipment itself, with X, Y, Z.

![Construction footage playing inside the twin](https://sentratech.in/image/case-studies/substation-digital-asset-management-predictive-maintenance/construction-video.webp)

Construction footage stays linked to the assets it shows.

The same approach on a railway truss: [Bridge No. 60 DN, South Central Railway](https://sentratech.in/case-studies/railway-bridge-digital-twin-drone-lidar-inspection.html). The Bathupally twin has no condition sensors connected yet; each future sensor already has an asset to report against.

Evidence on request

## Planning a digital twin?

Tell us the asset and the decisions the twin should support; we will scope capture, model and monitoring together.

- Case studies and method statements

- Datasheets for every sensor

- Sensors to assessment, one team

[Talk to an Engineer ](https://sentratech.in/contact.html) [ Schedule a Call](https://calendly.com/sentra-clovetech/30min?primary_color=f48120) [ +91 78930 23322](tel:+917893023322)
