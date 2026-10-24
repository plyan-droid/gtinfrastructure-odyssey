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
- Showcase copy lives only in src/content/showcase.ts — keeps text editable without touching animation code.
- The story is one GSAP ScrollTrigger pinned, scrubbed timeline over a single persistent SVG network (src/components/showcase) — continuity between scenes; GSAP is dynamically imported in an effect for SSR safety.
- Site Map navigates via named GSAP timeline labels mapped to scroll positions — one source of truth for story positions.
- Supporting tools live in content with explicit enabled flags and scope caveats — keep approval and availability distinct, without implying universal technology support.
- All detail types use the shared Radix-based centred ReadMorePanel modal with scroll isolation and trigger focus restoration — consistent accessible exploration without restarting the story.
- Customer evidence is structured separately from synthetic infrastructure data in showcase content — attributed agency outcomes must never be presented as demo metrics or guarantees.
- All story reading areas use screen-space shields (centred, left-column or wide) and timeline-controlled network/label fades, rather than changing shared node coordinates — keeps diagrams out of the words while preserving reversible scene continuity.
