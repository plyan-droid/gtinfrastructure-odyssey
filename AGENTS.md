<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Popup charts are content-defined in showcase.ts and rendered by DetailCharts inside the existing modal; uploaded architecture assets can enlarge inline, while dense comparisons use phone-friendly text layouts, keeping diagrams off the pinned story map.
- Showcase copy lives only in src/content/showcase.ts — keeps text editable without touching animation code.
- The story is one GSAP ScrollTrigger pinned, scrubbed timeline over a single persistent SVG network (src/components/showcase) — continuity between scenes; GSAP is dynamically imported in an effect for SSR safety.
- Site Map navigates via named GSAP timeline labels mapped to scroll positions — one source of truth for story positions.
- Supporting tools live in content with explicit enabled flags and scope caveats — keep approval and availability distinct, without implying universal technology support.
- All detail types use the shared Radix-based centred ReadMorePanel modal with scroll isolation and trigger focus restoration — consistent accessible exploration without restarting the story.
- Customer evidence is structured separately from synthetic infrastructure data in showcase content — attributed agency outcomes must never be presented as demo metrics or guarantees.
- All story reading areas use screen-space shields (centred, left-column or wide) and timeline-controlled network/label fades, rather than changing shared node coordinates — keeps diagrams out of the words while preserving reversible scene continuity.
- Gate complete text scenes and individual reading points with timeline-derived data-active-scene and data-active-point attributes; stage timing and navigation labels live in story-stages.ts — keeps content and visual demonstrations on one reversible clock without stale opening text.
- ContextVisual overlays illustrate the current reading stage while the persistent network dims unrelated components; never run unrelated ambient telemetry loops — each visual must reinforce its active message.
- Freeze the scrub timeline and ScrollTrigger at the captured timeline time while Read More is open, then restore without resetting — preserves the exact reading and visual state.
- Presentation playback uses curated stops from story-stages.ts to drive the same timeline; availability and public-message approval are separate content flags — booth playback must not expose unapproved claims.
- The map is a fixed three-tier topology (TopologyMap) wrapped by a StackOps observability layer; stage visuals are in-world HUD panels in reserved slots, one network-layer visible at a time and hidden by default — prevents overlays colliding with nodes or each other. Camera framing is computed from the visible slice width so tiers stay right of the reading column.
- The desktop ecosystem camera fits the entire observability frame between the header and a reserved bottom caption area, accounting for SVG slice cropping; the ecosystem explicitly shows the observability layer so its bus and label remain visible without overlapping the plain-text caption.
- Whole-scene visibility belongs to data-scene gating and individual point visibility to scene-qualified data-point selectors; never put scene-el on reading-point elements — prevents inactive points escaping their hidden scenes.
