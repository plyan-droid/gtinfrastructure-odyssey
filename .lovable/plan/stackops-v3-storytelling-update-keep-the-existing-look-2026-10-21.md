# StackOps V3 — Storytelling Update (keep the existing look)

Update the existing site in place. Keep the same dark navy look, magenta/coral gradients, animated network, Read More panels and Presentation Mode. No redesign, no backend.

## Story order (one continuous scroll)

```text
StackOps -> The Challenge -> Elastic -> Elastic Use Case -> Dynatrace -> Dynatrace Use Case -> Why Connected Helps -> Closing
```

## What changes

1. **Fix first** — clear the remaining preview errors so the site loads again.
2. **Opening** — new headline "Complex Systems. Clearer Insights.", the brief's supporting copy, and Elastic and Dynatrace shown as two separate options. The network flows normally, then one service slows down, a few lines turn amber, and the view moves closer to it.
3. **New "The Challenge" scene** — "When Something Breaks, Where Do You Look First?" with three short challenges. The same network splits into separate clusters for logs, metrics and traces, then they drift back together.
4. **Elastic** — the brief's problem line, headline, plain-English definition and five points, shown one at a time.
5. **Elastic Use Case** — a "before" view (separate monitoring views with labels), then a simple Elastic-style search panel goes through search, metrics, trace and the slow service. The path lights up. Ends on "Find Relevant Signals. Investigate with More Context." No numbers.
6. **Dynatrace** — the brief's problem line, headline, definition and five points.
7. **Dynatrace Use Case** — "before" view with several warning nodes, then: highlight the app, show its connections, latency labels, the made-up AI analysis panel ("Potential contributor: increased database query latency" / "Review recommended…"), and the database highlighted.
8. **Why Connected Helps** — the four "without" lines change into the four "with" lines as you scroll, labelled "Illustrative workflow scenario". No percentages.
9. **Closing** — "From Complexity to Clarity.", two separate explore options, and a QR placeholder ("Want to Explore the Technical Details?"). No real QR code until you approve a link.
10. **Read More panels** — organised under the section headings from the brief. Dynatrace explains Davis AI, Smartscape and PurePath accurately. All data is made up.
11. **Site Map dropdown (top right, next to Presentation Mode)** — 9 entries. Section entries jump to that part of the story. "Technical Details" entries open that product's panel. Closing a panel keeps your scroll position. Keyboard accessible.
12. **Presentation Mode** — plays the main story in order, holds about 8–12 seconds on each main message, hides the Site Map, never opens panels, keeps the QR area visible, loops, and is tuned for 1920×1080.
13. **SORA and SODA** — the text is prepared but stays hidden behind an "off" switch. They don't appear on the site or in the Site Map. They use only the brief's placeholder text and clearly labelled made-up figures.

## Technical details

- All copy stays in `src/content/showcase.ts`. Add `challenge`, `elasticDemo`, `dynatraceDemo`, `comparison`, `qr`, `siteMap`, and `modules: { sora, soda }` with `enabled: false`. Restructure the Read More data as `sections[]`.
- Keep the single pinned GSAP timeline over the persistent SVG network. Add labelled timeline positions (`tl.addLabel`) for each scene. The Site Map and Presentation Mode both scroll to the scroll position for each label, so both use the same source.
- Extend `network.ts` with an incident service ID, cluster positions (logs/metrics/traces), and the paths to highlight. Reuse the existing nodes and edges.
- Add a new `SiteMap.tsx` (dropdown using the existing UI primitives). Save `scrollY` before opening a panel and restore it when the panel closes.
- Presentation: an ordered list of label stops, each with a hold time. Use the same timeline.
- Reduced motion: keep the scroll-linked reveals and remove the moving dots, same as today.
- Update the `AGENTS.md` rules for the label-driven navigation and the disabled modules.
