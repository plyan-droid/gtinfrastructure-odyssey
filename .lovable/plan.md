# Bring the missing slide graphics into the site

I compared all 48 slides with the site. The popups have 15 charts now. About 20 graphic slides are still missing or only show up as text. The background map stays exactly as it is. Every new graphic is redrawn in the site's style: no screenshots, no source notes, and no icons unless they help.

## What is missing, and where it will go

**Why StackOps / Foundations popup**
- Slide 4, StackOps hub: App + Cloud Infra sends Logs, Metrics and Traces into StackOps, which leads to Goal and Purpose, plus four pillars (Security, Observability & Collaboration, Ease of Use, Generally Available Aug 2025).
- Slide 5, "More than a monitoring tool": three cards (Standards built in, Tooling to support users, Intelligence layered on).

**SORA popup**
- Slide 10, "Every team builds monitoring from scratch": a list of four problems shown before the solution.
- Slide 11, "How SORA works": Discover, Review, Deploy, Monitor, plus the "one command removes everything" teardown note.
- Slide 12, "What you will get": six capability rows (gap discovery, pre-flight checks, private networking, secure gateway, logging baseline, synthetic monitoring).

**OpenTelemetry popup**
- Slide 20, the problem: three cards for siloed visibility, broken traces and high recovery time, placed before the cross-cloud diagram.
- Slide 21, "How it is achieved": three numbered steps (standardise on OTel, deploy third-party platforms, map correlated dependencies).
- Slide 16, the cross-agency journey: one request moving through Agency A, B and C as a single trace.

**Capabilities popup**
- Slide 19, "Why APM matters": three outcomes (prevents revenue loss, faster resolution, bridges the gap).

**SODA popup**
- Slides 27 and 28: a redrawn sample report card showing the grade (A to C scale), example sizing bars and a recommendations list. It will be clearly labelled as illustrative sample data.

**Intelligence / Dynatrace popup**
- Slide 29, fragmented to connected: four outcomes (integrated platform, unified data, real-time context, answers not guesses).
- Slide 30, "Action based on answers": AI lakehouse, then live dependency graph, then agentic operations, as a three-stage flow.
- Slide 31, Differentiator: understand data in context, leverage AI, empower teams to automate, drive outcomes.
- Slide 32, three benefit cards (unified visibility, automatic root cause, faster remediation with cloud context).
- Slide 33, the seven-stage pipeline (Collect to Solve) as a horizontal stage strip that stacks on phones.
- Slide 34, "From visibility to answers": four action points.

**New "Part of the GCC journey" popup (from the existing GCC synergy section)**
- Slide 40: three challenges (late discovery, fragmented visibility, unrealised value).
- Slide 41: the five-step journey (Build, Deploy, Operate, Understand, Optimise) on a connected line.
- Slide 43: GCCaaS onboarding in five steps, starting Q3 2026.
- Slides 45 to 47: GCC PULSE Monitor, Diagnose, Optimise, Track, and the "one platform story" with three columns (GCCaaS, Platform Journey, PULSE).
- QR codes and booth calls to action are left out unless you want them.

## Booth FAQ
I will use it as background only, to check that the wording is accurate. This covers Jira Service Management alert routing, Elastic vs Kibana, serverless and data tiers, buffering and no data loss, RBAC, and the 7% discount with indicative-only savings. Pricing and cost-saving claims stay hedged the same way the FAQ hedges them. Nothing from the FAQ is added as new on-screen content unless you ask.

## Skipped on purpose
These slides are title cards, the Thank-you slide, QR codes, the slide 22 screen recording, and the raw dashboard photos. The photos are replaced by the redrawn sample report card.

## Technical details
- Add new chart kinds to DetailCharts: `hub` (sources → core → outcomes), `cards` (2 to 4 column cards, reusing the Items styling), `stage-strip` (horizontal pipeline that stacks on mobile), `journey` (numbered dots on a line), `report` (sample grade card with bars, flagged as synthetic). All labels come from `src/content/showcase.ts`.
- Add the chart data to the matching modals in showcase.ts. Add a new GCC modal linked from the existing GCC section's Read More.
- Extend `src/test/showcase-charts.test.ts`: each new chart is attached to its intended popup, the SODA report is marked synthetic, and no chart contains "Source:" notes.
- Check every popup with Playwright at 1203x845 and on a phone, and confirm the pinned map is unchanged.
