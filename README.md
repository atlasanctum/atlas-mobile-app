# Atlas Mobile

**A planetary intelligence interface for clearer decisions and coordinated regenerative action.**

Atlas Mobile is a proposed mobile-first experience for understanding changing conditions across climate, ecosystems, health, infrastructure, economics, governance, and social trust. It brings signals, missions, evidence, simulations, and decisions into one connected workflow so people and institutions can move from observing a problem to learning from an intervention.

> **Product status:** This README describes a product and UX architecture. It does not claim that the features below are already implemented, connected to live data, or validated in real-world deployments.

## The idea

Atlas is not intended to be a desktop control room squeezed onto a phone. It is a decision companion designed around five jobs:

- **Sense** what matters now.
- **Explain** what is changing and why it may matter.
- **Expose uncertainty** rather than manufacture confidence.
- **Explore consequences** before committing to an intervention.
- **Coordinate action** across people, communities, and institutions.

The experience follows a continuous learning loop:

**Sense → Explain → Simulate → Decide → Act → Learn**

## Product principles

1. **Narrative before analytics.** Lead with what changed, why it matters, what remains uncertain, and what could happen next.
2. **Uncertainty is first-class.** Show confidence, data coverage, assumptions, competing hypotheses, and validation dates where relevant.
3. **Missions organize complexity.** Users navigate by goals and interventions, not disconnected dashboards.
4. **Space, time, and causality belong together.** Connect maps, timelines, dependencies, and evidence.
5. **Every alert leads somewhere.** A signal should open into investigation, reasoning, simulation, and an actionable decision.
6. **History stays visible.** Preserve previous incidents, interventions, outcomes, and lessons so teams can compare what happened with what was expected.
7. **Human judgment remains central.** Recommendations support review and decision-making rather than silently replacing accountable people.

## Mobile navigation

The proposed app uses five primary destinations designed for thumb-friendly use.

| Area | Purpose | Typical content |
|---|---|---|
| **Home** | Personalized planetary briefing | Priority changes, mission-linked alerts, uncertainty snapshots, and a decision queue |
| **Signals** | Explore emerging events and anomalies | Signal feed, layered map, filters, signal details, and reasoning trails |
| **Missions** | Organize work around a goal | Objectives, region, leads, mission health, linked risks, tasks, decisions, and timeline |
| **Simulations** | Preview possible outcomes | Scenario library, adjustable assumptions, projected outcomes, trade-offs, and comparisons |
| **Workspace** | Coordinate investigation and action | Investigations, decision rooms, approvals, assignments, annotations, and institutional collaboration |

## Core experience

### 1. Home briefing

The Home screen answers: **“What changed in the world I am responsible for?”**

Planned components include:

- A planetary status indicator: Stable, Watch, Elevated, or Critical.
- Priority briefing cards for material changes affecting a region or mission.
- Mission-linked alerts and a queue of decisions requiring review.
- An uncertainty snapshot showing confidence, missing data, and competing explanations.
- Quick actions such as **Review**, **Escalate**, **Simulate**, and **Assign**.

The intended reading order is **signal → implication → uncertainty → possible next move**. Detailed charts and metadata should be available progressively, rather than overwhelming the first screen.

### 2. Signals and spatial intelligence

Signals are the system's feed of notable changes across climate, health, economy, infrastructure, governance, social trust, and ecosystems.

A proposed signal record can include:

- Title, location, category, and severity
- Confidence and time detected
- Linked missions and related systems
- A short explanation of why the signal was raised
- Supporting evidence, relevant history, and suggested next steps

The map experience may layer information such as flood exposure, crop stress, outbreaks, migration, grid instability, and market stress. A mobile bottom sheet can reveal the detail behind a selected location or signal.

**Illustrative example:**

> **Water stress anomaly · Northern Kenya**  
> Severity: High · Confidence: Medium  
> Possible drivers: rainfall shortfall, reservoir decline, and transport strain.

This is an example of the intended interface, not a claim of a live detection.

### 3. Missions

A mission turns a broad challenge into a goal-based workspace with owners, evidence, decisions, and a history of action.

Illustrative missions include:

- Strengthen flood resilience in informal settlements.
- Restore a degraded watershed.
- Reduce vaccine supply disruption risk.
- Coordinate finance for regenerative agriculture.

A mission view may contain its objective, region, time horizon, lead institutions, status, and a health summary covering system stress, funding, public trust, infrastructure dependencies, and policy readiness.

Its timeline connects events such as:

**Signal detected → Investigation opened → Simulation run → Decision proposed → Action assigned → Outcome observed**

### 4. Simulations and scenario comparison

The proposed simulation experience helps teams compare possible interventions before choosing a course of action. Scenario types may include climate adaptation, infrastructure failure cascades, policy trade-offs, funding allocation, social response, and multi-agent behavior.

A mobile scenario builder can guide a user through:

1. Selecting a region and system.
2. Choosing an intervention.
3. Adjusting variables with sliders, toggles, or stepper inputs.
4. Running an available model.
5. Reviewing results and comparing alternatives.

Results should be **narrative-first, chart-second**. Relevant outputs may include projected outcomes, costs, trade-offs, distributional effects, ecological impact, uncertainty ranges, ethical tensions, reversibility, and possible second-order effects.

Every scenario should make its assumptions and limitations visible. A simulated result must not be presented as an observed outcome or a guarantee.

### 5. Workspace and accountable decisions

Workspace is the human coordination layer. It is intended to support investigations, shared evidence, decision review, approvals, and action tracking without becoming just another chat feed.

A proposed decision record includes:

- Proposed action and supporting evidence
- Confidence level and key assumptions
- Risks of action and risks of inaction
- Dissenting views and unresolved questions
- Responsible owners and approval chain
- Status, timeline, and eventual outcome

A coordination board may track work through **Monitor → Investigating → Simulating → Escalated → Approved → Executing → Verified**.

Potential participants include ministries, county teams, NGOs, investors, researchers, and community groups. Access and visibility should be appropriate to each user's role and responsibilities.

## Uncertainty and explainability

Atlas should not behave as if an incomplete model has perfect knowledge. For consequential signals and recommendations, the intended interface surfaces:

- Probability or confidence, where supported
- Data coverage and important missing observations
- Model agreement or disagreement
- Alternative explanations and assumptions
- The last validation date
- What additional evidence could reduce uncertainty

A reusable **Uncertainty panel** can answer four questions:

1. What does Atlas know?
2. What does Atlas suspect?
3. What does Atlas not know?
4. What evidence would reduce uncertainty?

The interface may use confidence bars, probability ranges, forecast bands, dotted prediction lines, and competing-hypothesis views. These visual indicators should be backed by documented methods and should not imply more precision than the data supports.

## A connected world model

The mobile experience should connect related entities without forcing every user to navigate a complex graph visualization. Relevant relationships may include:

- Regions and affected populations
- Systems and infrastructure dependencies
- Signals and risks
- Missions and interventions
- Institutions and responsible actors
- Evidence, incidents, and historical analogues

For example, a flood-related signal could link to rainfall anomalies, drainage constraints, housing exposure, governance delays, previous flood events, and a related resilience mission. These relationships are proposed product behavior and depend on the availability and quality of underlying data.

## Reusable interface objects

The architecture is organized around reusable concepts that can appear across different domains.

| Object | Role in the product |
|---|---|
| **Signal** | A detected change or event |
| **Risk** | A potential threat or adverse outcome |
| **Mission** | A goal-oriented operational workspace |
| **Scenario** | A modeled intervention or possible future |
| **Decision** | A proposal, review, approval, or action |
| **Evidence** | A dataset, field report, satellite observation, or document |
| **Actor** | An institution, team, or stakeholder |
| **Memory** | A previous incident, intervention, or recorded lesson |

## Role-based experiences

The underlying system can present different priorities to different users without fragmenting the core data model.

| User group | Example priorities |
|---|---|
| **Government operator** | Infrastructure risk, public-service continuity, inter-agency coordination, approvals |
| **NGO or humanitarian lead** | Field conditions, vulnerability mapping, trust signals, response prioritization |
| **Investor or funder** | Regenerative opportunities, risk-adjusted impact, capital allocation scenarios, portfolio exposure |
| **Researcher or analyst** | Data lineage, model assumptions, scenario controls, historical comparisons |
| **Community leader** | Local alerts, clear explanations, trust and grievance indicators, practical guidance |

## Mobile-native behavior

The experience is designed for field use as well as desk-based analysis. Proposed mobile patterns include:

- Push notifications tiered by urgency: Critical, Elevated, and Informational.
- Offline access to recent mission briefs, essential maps, simulation summaries, and decision packages.
- Gesture-based triage and prioritization, with explicit controls and undo paths for consequential actions.
- Home-screen summaries for active risks, mission health, and decisions awaiting review.
- Progressive disclosure, expandable detail sheets, accessible status indicators, and restrained motion.

Offline data freshness and synchronization status should be visible so users can distinguish cached information from current information.

## Visual direction

**Design goal: calm intelligence under pressure.** The interface should feel spatial, legible, and trustworthy rather than flashy or overloaded.

- Dark foundations for complex monitoring views, with luminous accents used sparingly.
- Clear typography and compact secondary metadata.
- Map-first spatial views, rounded cards, timelines, and expandable detail sheets.
- Motion that explains changing states or dependencies instead of adding decoration.
- A semantic color system: red for acute instability, amber for emerging risk, blue for stable or monitored states, green for regenerative progress, purple for simulations, and gray for unknown or low-confidence states.

Color must never be the only way status is communicated; pair it with labels, icons, and accessible contrast.

## Illustrative end-to-end flow

**Scenario: rising flood risk in the Nairobi basin**

1. Home surfaces a notice that flood cascade risk may be rising.
2. The user opens the signal and reviews rainfall anomalies, possible drainage constraints, exposed communities, and confidence limitations.
3. The user compares available scenarios, such as emergency pumping, drainage clearing, wetland restoration, or relocation support.
4. The comparison presents modeled short- and long-term outcomes, costs, equity implications, and uncertainties.
5. The user shares the evidence with a decision room for review and approval.
6. Responsible teams receive assignments and record progress.
7. Observed outcomes are recorded so later teams can compare results with prior expectations.

This flow illustrates the desired product loop. It does not assert that Atlas currently detects flood risks, runs these models, or coordinates these institutions.

## MVP scope

The initial version should validate the core decision loop rather than attempt to build every planetary system at once.

**Proposed MVP modules:**

- Home briefing
- Signal feed and signal map
- Mission workspace
- Scenario comparison
- Decision cards
- Notification center
- Explainability and uncertainty panel

A credible MVP should begin with a defined pilot geography, a small number of data sources, explicit data-quality limits, and a narrow set of decisions that users can evaluate. Live integrations, model availability, access controls, and offline behavior should be documented as they are implemented.

## Suggested screen inventory

- Splash and authentication
- Role-based onboarding
- Home briefing
- Global or regional map
- Signal feed and signal detail
- Mission list and mission detail
- Investigation detail
- Scenario library, builder, results, and comparison
- Decision room and workspace board
- Actor coordination view
- Historical memory view
- Notification center
- Search or command palette
- Settings and alert preferences
- Explainability and model transparency view

## Non-goals and safeguards

- Do not present forecasts as facts or simulated outcomes as observed impact.
- Do not hide missing data, model assumptions, or meaningful disagreement.
- Do not treat a confidence score as a substitute for evidence or accountable review.
- Do not send noisy alerts without a clear reason, priority, and next step.
- Do not assume that every institution or community has the same needs, permissions, or connectivity.

## Project status and next steps

This document captures the proposed mobile product architecture and interaction model. It does not specify a confirmed implementation stack, deployed services, operational data sources, or completed integrations.

A practical next step is to turn the MVP into testable user stories and a prototype, select one pilot use case, define the evidence and uncertainty requirements, and validate the workflow with the people who would use it in the field.

## North star

Atlas Mobile aims to help people detect weak signals earlier, understand causal relationships, confront uncertainty honestly, test interventions before damage spreads, and coordinate wiser action across institutions.

**Not another dashboard. A human-centered interface for planetary understanding and regenerative action.**
