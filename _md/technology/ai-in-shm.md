# AI in Structural Health Monitoring: What We Use | Sentra

> Where Sentra uses AI and machine learning in structural health monitoring: CNN crack and rust detection on drone imagery and anomaly detection on sensor data streams, and why fatigue and residual life assessment stays physics-based.

Published: 2026-09-30  
Source: https://sentratech.in/technology/ai-in-shm.html

!

![AI-assisted condition inspection highlighting structural anomalies on a steel railway bridge](https://sentratech.in/image/technology/shm-ai-inspection.png)

Computer Vision Anomaly Detection Drones Physics

## AI in Structural Health Monitoring

"AI-powered" rarely says what the AI does. Ours does two things: finds and measures defects in drone imagery, and flags anomalous behaviour in sensor streams. Some questions, like fatigue life, are better answered by engineering models.

[Talk to an Engineer ](https://sentratech.in/contact.html) [What the AI does](#tx-bp)

Computer Vision

## BridgePulse: Defects From Drone Imagery

Built by Clove Technologies for Indian Railways, used on bridges in Andhra Pradesh.

![BridgePulse crack and rust detection overlay on a bridge structure](https://clovetech.com/wp-content/uploads/2025/09/cracks-rust.jpg)

BridgePulse output: cracks and rust overlaid on the structure. Image: Clove Technologies.

- **Technology:** convolutional neural networks for segmentation and object detection Delivered

- **Data:** high-resolution drone imagery reconstructed into photogrammetry and mesh models

- **Detects:** cracks, with width and depth estimated from photogrammetry, and rust on metal

- **Output:** overlays on the 3D model, severity class Low / Moderate / Critical, GPS location, report

- **Over time:** each scan compared with the last, so a growing defect is flagged

Pipeline

## From Flight to Report

01

Delivered

01 · Capture

### Drone flight

2D and 3D imagery of the structure

02

Delivered

02 · Reconstruct

### Photogrammetry

Mesh and photogrammetry model

03

Delivered

03 · Detect

### CNN detection

Cracks and rust segmented

04

Delivered

04 · Measure

### Measurement

Crack width and depth, location

05

Delivered

05 · Compare

### Change

Deviation from previous scan

06

Delivered

06 · Report

### Severity

Every defect is graded and the findings export as a PDF report.

- Low

- Moderate

- Critical

- PDF export

Sensor Data

## Machine Learning on Monitoring Streams

Our in-house monitoring application runs machine learning anomaly detection on structural monitoring data, alongside engineering thresholds. Readings are bound to the components they come from, so an anomaly is reported against the member it concerns.

Delivered

### History

A long, clean record on the specific structure, covering a seasonal cycle, so normal behaviour can be learned.

Delivered

### Normalisation

Temperature and traffic move frequency and strain more than early damage does; they are separated first.

Engineering service

### Validation

Known events, load tests and inspection findings to check alerts against.

Engineering service

### Thresholds behind every alert

Each ML alert maps to an engineering level, so the operator knows what action it calls for.

Forecasting when a component will reach a limit from sensor data alone is not something we claim. For that we use the physics-based approach below.

Physics First

## Where Engineering Models Beat ML

Residual fatigue life decides whether a bridge carries 25 t axles. Every step of the answer has to be checkable.

Strain history Rainflow counting Stress range spectra S-N curves Miner’s rule BS 5400 Part 10 Residual life

**0.63**Fatigue damage index_Limit < 1.0_

**12–15yrs**Residual fatigue life_Railway plate girder_

**98MPa**Peak stress range_Limit 120 MPa_

**8 + 4**Strain gauges + accelerometers_SCR fatigue method_

**FE**Model calibrated to load tests_Reaches uninstrumented details_

Sources: [railway IoT monitoring](https://sentratech.in/case-studies/iot-bridge-monitoring-and-sensor-installation-on-railway-bridges.html); method in [SCR fatigue assessment](https://sentratech.in/case-studies/railway-bridge-fatigue-life-assessment-load-testing.html).

Known Limitations

## What Imagery Cannot See

### Look-alikes

Fungus, stains and shadows were sometimes read as cracks; shadow filtering and more training data reduced this.

### Training data

Large labelled datasets of bridge defects were needed across Andhra Pradesh conditions.

### Flight conditions

Poor light and unstable flight in high wind degrade scans.

### Surfaces only

Internal cracking, section loss behind coatings and uncracked fatigue damage need [NDT](https://sentratech.in/solutions/advanced-non-destructive-testing-ndt.html) or strain measurement.

Evidence on request

## Evaluating AI for your inspections?

Tell us about your asset stock and inspection cycle; we will show you what drone and AI inspection would and would not catch.

- Case studies and method statements

- Datasheets for every sensor

- Sensors to assessment, one team

[Talk to an Engineer ](https://sentratech.in/contact.html) [ Schedule a Call](https://calendly.com/sentra-clovetech/30min?primary_color=f48120) [ +91 78930 23322](tel:+917893023322)
