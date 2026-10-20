# StackOps Observability Showcase — Cinematic Scroll Prototype

One continuous scroll story (Opening, Elastic, Dynatrace, Closing) built around a single persistent animated network that the "camera" pans, zooms and reconfigures. Unofficial prototype; all services, metrics and dashboards are fictional.

## Visual direction
- Dark futuristic tech: near-black indigo base, magenta-to-coral-to-violet signal gradient (Lovable-like), cool cyan accent used sparingly for "healthy" state, coral/amber for errors and latency.
- Typography: large editorial display (Space Grotesk / Syne-style) with mono labels (JetBrains Mono) for eyebrows and data.
- Restrained glow, thin hairline strokes, generous negative space, no card grids.

## Story (pinned, scroll-scrubbed, reversible)
1. **Opening** — "Observability. Reimagined." Wide shot of fictional ecosystem (apps, clouds, DBs, queues). Data pulses travel edges; camera drifts and follows one signal inward.
2. **Elastic** — PRODUCT 01. Camera zooms to a cluster; nodes emit three signal types (logs = dashes, metrics = dots, traces = linked arcs) flowing into a unified analytics core. Points 01–03 reveal in sequence. A fictional error ("checkout-svc 500") lights up; connected trace path highlights to show investigation. Read More button.
3. **Dynatrace** — PRODUCT 02. Same nodes re-layout into a dependency map. One service turns amber (latency); dependencies animate; a simplified "AI-assisted analysis" panel shows *likely* cause with confidence wording (never "auto-resolved"). Points 01–03 reveal. Read More button.
4. **Closing** — "From Signals to Insights. From Insights to Action." Camera pulls back; network splits into two distinct, unconnected solution paths labelled Elastic and Dynatrace. Prominent QR placeholder "Scan to Explore More" (no live QR).

Headlines enter/move/exit in sync with camera moves.

## Read More overlays
- Side drawer panels (never auto-open), keyboard/esc closable, scroll-locked internally.
- Elastic: what it is, logs/metrics/traces, distributed tracing, multi-cloud use cases, illustrative SVG dashboard with synthetic data.
- Dynatrace: what it does, APM, dependency mapping, distributed tracing, AI-assisted analysis, workflow automation.
- Disclaimer footer: unofficial prototype, fictional data, no integration implied between products.

## Presentation Mode
- Toggle button (and `?present=1` URL) that auto-scrolls the page through the whole sequence at a booth-friendly pace with holds on each scene, loops, hides UI chrome and disables Read More buttons. Any key/Esc exits.

## Responsiveness and accessibility
- Composed for 1920x1080; scales down. Mobile: simplified layout, fewer nodes, normal touch scroll.
- `prefers-reduced-motion`: no scrubbing/pinning, static scene states with fades.

## Technical details
- GSAP + ScrollTrigger (one master pinned timeline scrubbed by scroll), SVG for the network (no Three.js — not needed), CSS transforms for camera (scale/translate on an SVG group).
- All copy in a single structured content file (`src/content/showcase.ts`).
- Components: NetworkStage (persistent SVG), SceneText layers, ReadMorePanel (shadcn Sheet), PresentationController, QRPlaceholder.
- GSAP loaded client-side only (in effect) to stay SSR-safe; route head metadata set on index.
- Design tokens added to `src/styles.css`; fonts linked in root head.
