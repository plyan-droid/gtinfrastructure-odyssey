# Gtinfrastructure Odyssey

ORYZO-inspired Cinematic Scroll Experience

Use https://oryzo.ai as a **reference for interaction design, motion quality, pacing and visual storytelling**, not as a template to copy.

The website must feel like one continuous cinematic experience rather than separate webpage sections.

The central visual subject should be a stylised, fictional digital infrastructure ecosystem that evolves as the user scrolls.

## Essential interaction requirements

1. **Scroll-controlled animation:** The user's scroll position controls the progress of animations. Scrolling backward should reverse the scene where feasible.

2. **Persistent visual world:** Maintain continuity between scenes. Rather than replacing the entire screen with unrelated cards, transform, zoom, pan or reconfigure the same visual system as the story develops.

3. **Camera-like transitions:** Use depth, scale, perspective and elegant movement to guide the viewer from the overall ecosystem into specific capabilities.

4. **Typography as part of the animation:** Large headlines enter, move and exit in coordination with the visual story.

5. **Visual-first storytelling:** Each main scene should have a strong visual metaphor and limited copy, with up to five concise points when presenting a product.

6. **Progressive disclosure:** Include Read More controls that open detailed information overlays. These must be optional and must not interrupt the main scroll narrative.

7. **Presentation Mode:** Automatically drive the same scroll-based animation sequence for a booth recording without triggering any Read More panels.

8. **Performance:** Use GSAP ScrollTrigger and lightweight SVG/CSS or Three.js where genuinely useful. Do not force heavy 3D rendering for every element. Prioritise smooth desktop playback, mobile performance and reduced-motion accessibility.

## Visual direction

Premium enterprise technology, cinematic lighting, strong typography, generous negative space, carefully composed animated infrastructure diagrams, and sophisticated motion.

Avoid generic SaaS cards, repetitive feature grids, stock illustrations, excessive glow, decorative particles without meaning, and unrelated animations.

Build with original assets and an original design language. Do not reuse ORYZO's source code, proprietary visual assets, 3D models, illustrations or branding.

Theme color/design style-> lovable futuristic tech vibe

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://gtinfrastructure-odyssey.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/93b598bc-6143-4ea8-8164-2d5c7a6a3eec).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
