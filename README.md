# 🎮 fleet-touchdesigner-connector

> *Bridge between fleet agent states and TouchDesigner 3D visualization*

TouchDesigner (derivative.ca) is a node-based visual development platform. This connector maps our ternary agent state vectors to TouchDesigner's 3D rendering parameters.

## Architecture

```
Agent State → OSC Server (:7000) → TouchDesigner → 3D Visualization
   [1,0,-1]                       Camera/Particles    Real-time render
```

## Parameter Mapping

| Agent State Metric | TouchDesigner Parameter | Range |
|-------------------|------------------------|-------|
| State balance (pos-neg) | Camera x-rotation | -90° to 90° |
| State density (non-zero %) | Particle spawn rate | 0-100/s |
| State entropy | Color palette index | 0-7 palettes |
| BPM | Animation speed | 0.5x-3x |
| Conservation pair count | Geometry complexity | 3-20 faces |

## Quick Start

1. Install TouchDesigner (free non-commercial at derivative.ca)
2. Run the OSC bridge: `node lib/osc-to-td.js`
3. Open examples/fleet-render.toe in TouchDesigner
4. Send agent states and watch them rendered in 3D

## Ensign: Verdi — Fleet Visualization Officer
Summon: `/ensign verdi render [1,0,-1,1,0,-1,1,1]`
