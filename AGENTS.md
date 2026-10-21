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
- Presentation Mode auto-scrolls the same timeline and must never open Read More panels.
- Site Map and Presentation Mode navigate via named GSAP timeline labels mapped to scroll positions — one source of truth for story positions.
- Optional modules (SORA, SODA) live in content with enabled:false and must not render or appear in the Site Map until approved — unapproved product claims.
