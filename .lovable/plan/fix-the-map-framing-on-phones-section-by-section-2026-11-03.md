# Fix the map framing on phones, section by section

## What is going wrong
On phones the map behind each section is zoomed in on a fixed spot and only part of it shows. In your screenshot (The Challenge, point 03) you only see the "Application & Services" label and the AI / Agent / LLM Service box cut off at the right edge, and the boxes the section talks about (Application API and Data Service) aren't clearly shown. The phone view always uses the same zoom level and doesn't check whether the boxes for that step actually fit on screen. The wider AI box and the new direct line to Data Service made this worse.

## What I will do
1. **Check every section on a phone first.** Open the site at your phone size (393 x 838) and take a screenshot at every step: opening, challenge 01-04, foundations, signals, investigation, SORA, tracing, SODA, intelligence, customer stories, technology options and closing. Then list exactly which steps show cut-off or missing boxes.
2. **Frame the right boxes for each step.** On phones, the map will zoom and move so every box that step talks about fits in the space above the text, with a small margin, and no box is cut off at the edge. If a step involves boxes that are far apart (for example Citizen Portal to Data Service), it zooms out just enough to fit them, with a minimum size so the names stay readable.
3. **Keep the map in the clear area.** The boxes sit between the logo/Site Map button and the start of the text, not hidden behind the words.
4. **Leave laptop and TV as they are.** Only the phone view changes.
5. **Check again.** Retake the same screenshots at 360, 393 and 430 widths and compare before and after. Then run the site's checks.

## Technical details
- In `Showcase.tsx` `frame()`, replace the fixed mobile `{ scale: 0.54 }` with a fit computed from the focused nodes' bounding box (using card widths, including the 290px AI card, and cloud boxes), the visible slice width (`visibleW`) and the vertical band between the header (~120px) and the reading area. Clamp the scale to roughly 0.38-0.6.
- Steps with no focus nodes keep the current wide framing. The mobile ecosystem pan tour stays unchanged.
- Network coordinates in `network.ts` stay the same, following the project rule.
