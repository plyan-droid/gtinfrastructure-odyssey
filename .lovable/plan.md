# StackOps master cinematic update

## Preserve the existing experience
Update the current site in place: keep the dark palette, typography, lighting, persistent infrastructure network, scroll-controlled camera movement, customer selector and Site Map. No redesign, new backend or generic card layout.

First finish the outstanding scene-isolation and overlapping-point fixes, so opening text cannot remain over later sections and each reading point appears only at its own story position.

## Twelve-scene story
1. **Overview:** “MORE THAN MONITORING. BUILT FOR GOVERNMENT.” Start close to a data signal, reveal the fictional network, then hold a composed view with the supplied supporting copy and discovery CTA.
2. **The Challenge:** “ONE DIGITAL SERVICE. MANY MOVING PARTS.” Demonstrate fragmented monitoring, complex dependencies, difficult investigation and repeated setup individually.
3. **Why StackOps:** Show government-ready foundations, reduced rework, connected insights and continuous improvement through matching network transformations.
4. **Observability:** Give logs, metrics, traces and context separate reading points and demonstrations.
5. **Incident Investigation:** Detect → examine → follow → investigate, with synthetic evidence and a possible contributor—not guaranteed diagnosis or resolution.
6. **SORA:** Introduce StackOps Resiliency Accelerator. Discover → human review → approved deployment → monitoring, with supported-scope caveats.
7. **Cross-System Observability:** Instrument → connect → investigate across fictional environments, limited to appropriately instrumented services and permitted collection paths.
8. **SODA:** Introduce StackOps Data Analysis. Utilisation → storage → opportunities → human decisions; no invented savings or automatic changes.
9. **Intelligence That Compounds:** A prominent Analyse → Benchmark → Recommend → Improve scene, explicitly presented as a direction pending product-owner validation. Use fictional, anonymised comparison environments and conceptual guidance, never actual agency rankings or live AI claims.
10. **Customer Stories:** Retain all five selectable stories and attributed evidence. Emphasise CFT’s 1,500+ workflows and 75% result, SHIP-HATS’ 75% recovery reduction, and APEX’s 90M+ monthly API transaction logs. Preserve HDB’s planned expansion and HTX’s non-quantitative story.
11. **Technology & Operating Options:** First visitor-facing introduction of Elastic and Dynatrace. Explain overlapping observability capabilities, scoped Dynatrace centrally managed versus agency self-managed approaches, and unconfirmed pricing without inventing detailed terms.
12. **Get Started:** “SEE WHAT STACKOPS CAN DO FOR YOUR AGENCY.” Keep the existing official StackOps destination; leave discussion booking and QR destinations clearly pending until approved URLs are supplied. No unapproved contact form.

## Reading, navigation and booth playback
- Populate all fourteen centred Read More popups with the supplied complete descriptions and accuracy caveats. Maintain generous desktop sizing, near-full-screen mobile sizing, internal scrolling, Escape dismissal and trigger focus restoration.
- Freeze both scroll-linked animation and any subtle data movement when a popup opens; closing restores the exact story time and scroll position.
- Update Site Map to the twelve requested entries, each landing on the matching text and visual state.
- Restore Presentation Mode, as requested by this master brief, despite its earlier removal. Use an approximately 60-second selection of story moments rather than squeezing every reading point into the loop. Include customer proof and CTA, never open popups automatically, and provide an accessible exit.
- Exclude the AI scene from booth playback until its public messaging is approved; use that time for customer proof instead.

## Technical details
- Keep copy, source links, availability flags and popup descriptions in `src/content/showcase.ts`.
- Extend `story-stages.ts` as the shared mapping for text, network focus, highlighted paths, overlays and navigation labels. Keep one dynamically imported GSAP ScrollTrigger timeline over the same stable SVG nodes.
- Improve contextual demonstrations inside the existing visual world rather than adding disconnected decorative diagrams. Keep inactive components quiet and reading areas free of competing nodes, lines and labels.
- Gate whole scenes and individual points consistently; use stage-derived boundaries for scrolling, reverse scrolling and Site Map navigation.
- Store AI availability and public-presentation approval separately; pending claims must never enter unqualified current-feature summaries or presentation stops.
- Preserve reduced-motion access to the full content with simplified camera and signal motion. No Three.js or external services required.

## Verification
Run the existing relevant tests and add focused checks for scene order, stage boundaries, SORA approval sequencing, SODA’s human decision endpoint, and exclusion of unapproved AI from presentation playback. Retain customer-evidence checks.

Exercise every Site Map destination and reading point, forward and backward scrolling, all five customer stories, popup scrolling and exact restoration, and the complete booth loop. Check readable layouts at the current 1085×749 view, wider desktop, 1920×1080 booth view and mobile, plus reduced motion. Confirm no opening or point-text overlap and no preview errors.

## Approval-dependent items
AI capability claims and booth inclusion remain pending product-owner validation. Pricing, exact operating-model details beyond the supplied descriptions, and discussion/QR URLs remain unconfirmed; the update will show appropriate caveats or placeholders, not invented information. Publishing is not part of this update.