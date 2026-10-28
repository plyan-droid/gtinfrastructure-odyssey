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

## What I would use from the booth FAQ (please confirm)
I would add these as short, plain lines inside the matching popups. Nothing goes on the main map.

1. **Alerts to resolution (Why StackOps popup):** issues raise alerts in Jira Service Management. That pages the right team and tracks each step until it is fixed, so recovery is faster.
2. **Elastic in one line (Elastic popup):** "Elastic is the engine, Kibana is the cockpit." Elastic stores and searches logs, metrics and traces, and Kibana is the set of dashboards and alerts.
3. **Serverless Elastic (Elastic popup):** no cluster sizing, and you pay for what you use. It comes in three project types (Search, Observability, Security). Savings are indicative and depend on each agency's usage.
4. **Data tiers (SODA popup):** hot, warm, cold and frozen storage, which explains where cost savings come from.
5. **No code changes for infra (SORA popup):** SORA collects cloud logs and metrics automatically. App tracing uses an OpenTelemetry auto-instrumentation agent, often with no code change. AWS and Azure feed into one view.
6. **No data loss on short outages (OpenTelemetry popup):** agents buffer data locally, so delivery is delayed rather than lost.
7. **Security basics (Foundations popup):** data is encrypted at rest and in transit, with role-based access down to field level. ISO 27001, SOC 2 and CSA STAR are named only if you confirm they can be shown publicly.
8. **Fewer noisy alerts (Capabilities popup):** anomaly detection instead of fixed limits, with only urgent alerts paging on-call.

Not used: the 7% discount, pricing links, cost estimator, Kibana query tips, Slack/PagerDuty connector lists, and the per-video FAQ list.

## Skipped on purpose
These slides are title cards, the Thank-you slide, QR codes, the slide 22 screen recording, and the raw dashboard photos. The photos are replaced by the redrawn sample report card.

## Technical details
- Add new chart kinds to DetailCharts: `hub` (sources → core → outcomes), `cards` (2 to 4 column cards, reusing the Items styling), `stage-strip` (horizontal pipeline that stacks on mobile), `journey` (numbered dots on a line), `report` (sample grade card with bars, flagged as synthetic). All labels come from `src/content/showcase.ts`.
- Add the chart data to the matching modals in showcase.ts. Add a new GCC modal linked from the existing GCC section's Read More.
- Extend `src/test/showcase-charts.test.ts`: each new chart is attached to its intended popup, the SODA report is marked synthetic, and no chart contains "Source:" notes.
- Check every popup with Playwright at 1203x845 and on a phone, and confirm the pinned map is unchanged.

## Subscription table: add an Elastic column (slide 40)
- Rename the table "StackOps Subscription Model Offerings". It moves out of the Dynatrace popup into a shared place, the technology options area, so it covers both tools.
- The columns become: StackOps Dynatrace Central Managed, Agency Dynatrace Self-Managed, and a new **StackOps Elastic** column.
- The Elastic cells are drafts written from the FAQ for you to edit later. Rows like ActiveGate are Dynatrace-only, so those cells read "Not applicable". Drafts:
  - Primary Value: Managed Elastic Cloud (hosted or serverless) provided through StackOps
  - Operating Model: StackOps provisions; agency uses its own deployment
  - ActiveGate & Connectivity: Not applicable; SORA sets up private networking and a secure gateway
  - Admin Rights: Agency manages its own spaces, with role-based access
  - Environment Setup: Agency deployment or serverless project
  - Alerting & Thresholds: Kibana alerting with optional anomaly detection
  - Agent Patching: Elastic Agent / OpenTelemetry collectors, kept up to date with SORA baselines
- All drafts are kept together in one place in the copy file, so they are easy to edit.
- On phones the table stacks into cards, one per row.

## Upgrade existing charts that are only text lists
Some charts on the site are just numbered lists right now. Each one gets rebuilt as a real diagram:
- **SODA Cost Optimisation Engine (slide 26):** five check tiles across the top (Node Sizing, Storage Efficiency, Index Lifecycle, Performance, Synthetics). An arrow leads into three outputs (Optimisation Grade 0 to 100, Recommendations, Cost Calculator), and a coloured grade scale sits underneath: S 85+ Optimised, A 65 to 84 Stable, B 40 to 64 Moderate, C 0 to 39 Wastage. It uses site colours, no emoji icons, and the tiles stack on phones.
- **SODA collection (slide 25):** four sources flowing into StackOps Central, with the six data types as a grid below.
- **SODA impact on tenants (slide 24):** Before and After columns side by side, instead of a plain table.
- **Unified tracing pillars (slide 17):** four quadrants around a central "Whole-of-Government APM value" core.
- **Intelligence flywheel (slide 8):** a real circle (Adopt, Analyse, Recommend, Improve) with arrows, instead of a list.
- **SORA Discover, Review, Implement (slide 7):** three connected boxes with an arrow loop for "re-run, safe and idempotent".
- **Onboarding (slide 6):** a four-step horizontal pipeline, with "what gets applied automatically" beneath it.
