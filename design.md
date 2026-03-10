# Atlas Mobile App Design

## Overview

Atlas is a **planetary intelligence system** designed as a civilizational operating interface on mobile. The app transforms sprawling global data into actionable intelligence through a layered, decision-focused architecture.

**Design Philosophy:** Not a shrunken desktop dashboard, but a **decision companion** built around signals, missions, uncertainty, and action. Every screen tells a story: signal → implication → uncertainty → recommended next move.

---

## Screen List

1. **Home** — Personalized planetary briefing
2. **Signals** — Real-time civilizational signals and alerts
3. **Missions** — Goal-based workspaces tied to regions or interventions
4. **Simulations** — Scenario modeling and decision previews
5. **Workspace** — Collaboration, investigations, notes, and escalation
6. **Signal Detail** — Bottom sheet with reasoning, history, and actions
7. **Mission Detail** — Full mission context, health, risks, and timeline
8. **Simulation Builder** — Interactive scenario configuration
9. **Simulation Results** — Outcome narrative, trade-offs, and comparisons

---

## Primary Content and Functionality

### 1. Home Screen

**Purpose:** "What changed in the world I'm responsible for?"

**Key Components:**

- **Planetary Status Banner** — Global health indicator (Stable / Watch / Elevated / Critical)
- **Priority Briefing Cards** — Stack of 3–5 high-impact signals with context
  - Flood pressure rising in Nairobi basin
  - Food price stress in Rift Valley
  - Grid instability probability increasing
  - Community trust dropping in a region
- **Mission-Linked Alerts** — "3 active risks affecting Wetland Restoration Mission"
- **Uncertainty Snapshot** — Confidence score, missing data notice, competing hypotheses
- **Today's Decision Queue** — 4 action buttons: Review, Escalate, Simulate, Assign

**Functionality:**

- Swipe right on card → attach to mission
- Swipe left on card → archive/dismiss
- Tap card → open Signal Detail sheet
- Pull-to-refresh → reload briefing

**Layout:** Card stack briefing with progressive disclosure. Status chips, expandable reasoning.

---

### 2. Signals Tab

**Purpose:** Atlas's nervous system. Show emerging events across climate, economy, health, infrastructure, governance, ecosystems, and social trust.

**Key Components:**

- **Signal Feed** — Infinite list of notable changes
  - Each card: title, location, category, severity, confidence, time detected, linked missions, causal hint
  - Example: "Water stress anomaly | Northern Kenya | Severity: High | Confidence: Medium"
- **Signal Map** — Mobile-first map with layered overlays (floods, crop stress, outbreaks, migration, civic unrest, grid instability, market stress)
- **Filter Rail** — Horizontal chips: All, Climate, Health, Economy, Infrastructure, Governance, Social trust, Ecosystems

**Functionality:**

- Swipe right → attach to mission
- Swipe left → archive/dismiss
- Hold → compare with historical baseline
- Tap → open Signal Detail sheet
- Tap filter chip → filter feed by category
- Tap map region → zoom and show regional signals

**Layout:** Infinite feed with filter chips, severity color coding, explainability accordion, timeline sparkline.

---

### 3. Missions Tab

**Purpose:** Turn sprawling data into purpose-driven operations.

**Key Components:**

- **Mission List** — Cards showing:
  - Mission name, objective, time horizon, region, lead institutions
  - Status indicator (On Track / At Risk / Critical)
  - Mission health strip (system stress, funding status, public trust, infrastructure dependency, policy readiness)
- **Mission Header** (in detail view) — Name, objective, time horizon, region, lead institutions, status
- **Linked Blocks** — Active risks, key signals, simulations, assigned actors, open decisions, recent changes
- **Mission Timeline** — Chronological chain: signal detected → investigation opened → simulation run → decision proposed → action assigned → outcome observed

**Functionality:**

- Tap mission card → open Mission Detail screen
- Tap risk block → open risk investigation
- Tap signal block → open Signal Detail
- Tap simulation block → open Simulation Results
- Tap timeline event → expand details

**Layout:** Mission as container with modular cards, sticky summary header, expandable timeline, cross-linked system tags.

---

### 4. Simulations Tab

**Purpose:** Preview outcomes before reality sends the invoice.

**Key Components:**

- **Scenario Library** — Cards for pre-built scenarios:
  - Flood barrier vs wetland restoration
  - Carbon tax introduction
  - Subsidy reform
  - Grid rerouting under heat stress
  - Food aid distribution optimization
- **Scenario Builder** — Simplified input flow:
  - Choose region
  - Choose system
  - Choose intervention
  - Adjust variables (sliders, toggles, steppers, policy presets)
  - Run model
- **Simulation Results** — Narrative-first, chart-second:
  - Projected outcomes
  - Trade-offs (winners/losers)
  - Uncertainty bands
  - Ethical tensions
  - Possible second-order effects
  - Example: "Recommended path: wetland restoration outperforms concrete barriers over 10 years"
- **Compare Scenarios** — Side-by-side card comparison: cost, resilience, equity, ecological impact, uncertainty, reversibility

**Functionality:**

- Tap scenario card → open Simulation Results
- Tap "Build Scenario" → open Scenario Builder
- Adjust sliders/toggles → live preview updates
- Tap "Run Model" → compute and show results
- Tap "Compare" → side-by-side comparison view
- Tap "What changes if…" → counterfactual lever panel

**Layout:** Scenario cards, slider controls, uncertainty bands, decision comparison matrix, narrative explanation blocks.

---

### 5. Workspace Tab

**Purpose:** Human coordination layer. Ensure civilization does not fail because everyone assumes someone else is handling the mess.

**Key Components:**

- **Investigations** — For anomalies, risks, or emerging failures
  - Title, linked signals, hypothesis, evidence, simulation references, task owners, urgency, timeline
- **Decision Room** — Mobile decision object
  - Proposed action, supporting evidence, confidence level
- **Escalation Queue** — Decisions awaiting review or escalation
- **Notes & Artifacts** — Shared investigation notes, evidence documents, linked media

**Functionality:**

- Tap investigation → open Investigation Detail
- Tap decision → open Decision Detail with evidence and actions
- Swipe to mark decision as "Reviewed", "Escalated", or "Assigned"
- Tap "Add Note" → compose investigation note
- Tap "Link Signal" → attach signal to investigation

**Layout:** Investigation cards with urgency badges, decision cards with confidence indicators, expandable evidence sections.

---

## Key User Flows

### Flow 1: Planetary Briefing → Decision
1. User opens Home
2. Sees Planetary Status Banner (Critical)
3. Taps Priority Briefing Card (Flood pressure rising)
4. Signal Detail sheet opens with reasoning, history, related systems
5. User taps "Simulate" → Simulation Builder opens
6. User adjusts intervention variables
7. Taps "Run Model" → Results show trade-offs
8. User taps "Escalate" → Decision Room opens
9. User adds evidence and assigns to team member

### Flow 2: Signal Triage → Mission Attachment
1. User opens Signals tab
2. Scrolls feed, sees "Water stress anomaly"
3. Swipes right → "Attach to Mission" sheet opens
4. Selects "Wetland Restoration Mission"
5. Signal is now linked to mission
6. User opens Missions tab → sees signal in mission's "Key Signals" block

### Flow 3: Scenario Comparison
1. User opens Simulations tab
2. Taps "Flood barrier vs wetland restoration"
3. Simulation Results show narrative and charts
4. User taps "Compare" → side-by-side view
5. Sees cost, resilience, equity, ecological impact, uncertainty
6. Taps "What changes if rainfall increases 20%?" → counterfactual lever
7. Results update live

---

## Color Choices

**Brand Palette for Atlas:**

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|----------|-------|
| `primary` | #0a7ea4 | #0a7ea4 | Accent, tint, key actions |
| `background` | #ffffff | #151718 | Screen background |
| `surface` | #f5f5f5 | #1e2022 | Cards, elevated surfaces |
| `foreground` | #11181C | #ECEDEE | Primary text |
| `muted` | #687076 | #9BA1A6 | Secondary text |
| `border` | #E5E7EB | #334155 | Borders, dividers |
| `success` | #22C55E | #4ADE80 | Success states, green |
| `warning` | #F59E0B | #FBBF24 | Warning states, amber |
| `error` | #EF4444 | #F87171 | Error states, red |

**Severity Color Coding:**

- **Stable** — Green (#22C55E)
- **Watch** — Amber (#F59E0B)
- **Elevated** — Orange (#FF6B35)
- **Critical** — Red (#EF4444)

---

## Design Patterns

- **Card Stack Briefing** — Progressive disclosure with tap-to-expand
- **Status Chips** — Inline severity/status indicators
- **Bottom Sheet** — Signal Detail, Decision Room, Attach to Mission
- **Infinite Feed** — Signals and investigations with pagination
- **Filter Rail** — Horizontal chips for category filtering
- **Sticky Header** — Mission name/status stays visible during scroll
- **Timeline** — Chronological chain of events with expandable details
- **Slider Controls** — Variable adjustment in Scenario Builder
- **Uncertainty Bands** — Visual confidence ranges in results
- **Narrative First** — Text explanation before charts/data

---

## Mobile Interaction Patterns

- **Swipe Right** — Attach to mission, positive action
- **Swipe Left** — Archive, dismiss, negative action
- **Hold/Long Press** — Compare with baseline, reveal context menu
- **Tap** — Open detail, expand section, navigate
- **Pull-to-Refresh** — Reload briefing, refresh data
- **Slider Drag** — Adjust simulation variables
- **Chip Tap** — Filter feed by category
- **Bottom Sheet Swipe Down** — Close detail view

---

## Responsive Design Notes

- **Portrait Orientation Only** — 9:16 aspect ratio, one-handed usage
- **Safe Area Handling** — Status bar, notch, home indicator respected
- **Tab Bar** — 5-tab bottom navigation, thumb-friendly spacing
- **Text Sizing** — Hierarchy: 32px (hero) → 20px (title) → 16px (body) → 14px (secondary)
- **Touch Targets** — Minimum 44×44pt for interactive elements
- **Spacing** — 16px base unit, 8px half-unit for fine adjustments

---

## Accessibility

- **Color Contrast** — WCAG AA compliant (4.5:1 for text)
- **Text Alternatives** — Icons paired with labels
- **Focus States** — Clear visual feedback for keyboard navigation
- **Haptic Feedback** — Light impact on button taps, medium on toggles
- **Dark Mode** — Full support with automatic color switching

---

## Next Steps

1. Implement tab navigation with 5 screens
2. Build Home screen with briefing cards
3. Build Signals feed with map and filters
4. Build Missions list and detail view
5. Build Simulations library and builder
6. Build Workspace with investigations
7. Implement bottom sheets and modals
8. Add state management for data flow
9. Integrate with backend APIs
10. Polish animations and interactions
