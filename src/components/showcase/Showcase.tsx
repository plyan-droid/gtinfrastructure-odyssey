import { useCallback, useEffect, useRef, useState } from "react";
import {
  challenge,
  closing,
  disclaimer,
  capabilities,
  investigation,
  customerStories,
  customers,
  options,
  opening,
  topology,
  details,
  diagram,
  ui,
  contextSections,
  type Detail,
  type Product,
} from "@/content/showcase";
import { byId, ecoEdges, nodes } from "./network";
import { ReadMorePanel } from "./ReadMorePanel";
import { SiteMap } from "./SiteMap";
import { Button } from "@/components/ui/button";
import { NetworkVisuals, TopologyMap } from "./ContextVisual";
import { storyStages, STAGE_DURATION, stageAtTime } from "./story-stages";
import { ArrowRight, ArrowLeft, ExternalLink, ChevronDown, QrCode } from "lucide-react";

const MOBILE_TOUR_SCALE = 0.6;
const SCROLL_LEN = 16000; // px of scroll mapped to the full story

const edgeKey = (a: string, b: string) => `${a}-${b}`;
const nd = (id: string) => {
  const node = byId[id];
  if (!node) throw new Error(`Unknown network node: ${id}`);
  return node;
};

export function Showcase() {
  const root = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState<Detail | null>(null);
  const labelsRef = useRef<Record<string, number>>({});
  const savedY = useRef(0);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [storyIndex, setStoryIndex] = useState(0);
  const presenting = false;
  const playbackRef = useRef<(time: number, exit?: boolean) => void>(() => {});
  const freezeRef = useRef<(frozen: boolean) => void>(() => {});

  const openPanel = useCallback((id: string) => {
    if (!details[id]) return;
    freezeRef.current(true);
    savedY.current = window.scrollY;
    triggerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (root.current) root.current.dataset["dialogOpen"] = "true";
    setPanel(details[id]);
  }, []);
  const closePanel = useCallback(() => {
    setPanel(null);
    if (root.current) root.current.dataset["dialogOpen"] = "false";
    window.scrollTo(0, savedY.current);
    freezeRef.current(false);
  }, []);
  const jumpTo = useCallback((label: string) => {
    const y = labelsRef.current[label];
    if (y !== undefined)
      window.scrollTo({
        top: y,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }, []);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      ctx = gsap.context(() => {
        const q = gsap.utils.selector(root);
        gsap.set(q(".scene-el"), { autoAlpha: 1, y: 0 });
        gsap.set(q(".ring, .demo-panel, .visual-layer, .network-layer, .obs-layer"), {
          autoAlpha: 0,
        });
        gsap.set(q(".net"), { opacity: 0.7 });
        let frozen = false;
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          onUpdate() {
            const active = stageAtTime(tl.time());
            if (!active || frozen || !root.current) return;
            root.current.dataset["activeScene"] = active.scene;
            root.current.dataset["activeBlock"] = active.key;
            root.current.dataset["activePoint"] = String(active.point ?? -1);
            root.current.dataset["visual"] = active.visual;
            root.current.querySelectorAll<HTMLElement>("[data-scene]").forEach((element) => {
              element.inert = element.dataset["scene"] !== active.scene;
            });
          },
          scrollTrigger: {
            trigger: q(".stage")[0] as HTMLElement,
            start: "top top",
            end: `+=${SCROLL_LEN}`,
            pin: true,
            scrub: reduce ? true : 0.35,
          },
        });
        const cam = q("#cam");
        gsap.set(cam, { x: 0, y: 0, svgOrigin: "0 0" });
        // Visible world width for the 1600×900 "slice" viewBox at this viewport.
        const visibleW = Math.min(1600, (900 * window.innerWidth) / window.innerHeight);
        const visibleL = (1600 - visibleW) / 2;
        const wide = ["opening", "customers", "closing"];
        const frame = (stage: (typeof storyStages)[number]) => {
          const focused = stage.focus;
          const center = focused.length
            ? focused.reduce(
                (sum, id) => ({
                  x: sum.x + nd(id).x / focused.length,
                  y: sum.y + nd(id).y / focused.length,
                }),
                { x: 0, y: 0 },
              )
            : { x: 880, y: 452 };
          if (reduce) return { scale: 1, x: 0, y: 0 };
          if (mobile && stage.key === "ecosystem") {
            // Readable zoom on phones; the camera then pans across the tiers.
            return { scale: MOBILE_TOUR_SCALE, x: 800 - 520 * MOBILE_TOUR_SCALE, y: 330 - 452 * MOBILE_TOUR_SCALE };
          }
          if (mobile) return { scale: 0.54, x: 800 - center.x * 0.54, y: 65 - center.y * 0.54 };
          if (wide.includes(stage.scene)) {
            const s = Math.min(1, (visibleW - 40) / 1400);
            return { scale: s, x: 800 - 880 * s, y: 450 - 452 * s };
          }
          // Story frame: services + data tiers fill the visual area right of the reading column.
          const left = visibleL + visibleW * 0.47;
          const s = Math.min(0.95, (visibleL + visibleW - 60 - left) / 1040);
          const drift = (center.x - 1000) * 0.05 * s;
          return { scale: s, x: left - 540 * s - drift, y: 450 - 452 * s - (center.y - 450) * 0.04 };
        };
        if (storyStages[0]) gsap.set(cam, frame(storyStages[0]));
        storyStages.forEach((stage, index) => {
          const at = index * STAGE_DURATION;
          if (stage.label) tl.addLabel(stage.label, at + 0.75);
          const focused = stage.focus;
          tl.to(cam, { ...frame(stage), duration: 0.65 }, at);
          if (mobile && !reduce && stage.key === "ecosystem")
            tl.to(cam, { x: 800 - 1240 * MOBILE_TOUR_SCALE, duration: 1 }, at + 0.7);
          tl.to(
            q(".net"),
            {
              opacity: stage.scene === "customers" ? 0.32 : stage.scene === "closing" ? 0.6 : 0.95,
              duration: 0.5,
            },
            at,
          );
          tl.to(
            q(".obs-layer"),
            {
              autoAlpha:
                stage.scene === "opening" || stage.scene === "challenge"
                  ? 0
                  : stage.scene === "customers"
                    ? 0.3
                    : 1,
              duration: 0.5,
            },
            at,
          );
          tl.to(
            q(".opening-shield"),
            {
              autoAlpha:
                stage.key === "ecosystem"
                  ? 0
                  : stage.scene === "opening" || stage.scene === "closing"
                    ? 1
                    : 0,
              duration: 0.45,
            },
            at,
          );
          tl.to(
            q(".reading-shield-left"),
            {
              autoAlpha: ["opening", "customers", "options", "closing"].includes(stage.scene)
                ? 0
                : 1,
              duration: 0.45,
            },
            at,
          );
          tl.to(
            q(".reading-shield-wide"),
            { autoAlpha: ["customers", "options"].includes(stage.scene) ? 1 : 0, duration: 0.45 },
            at,
          );
          nodes.forEach((n) =>
            tl.to(
              q(`.node-${n.id}`),
              { opacity: !focused.length ? 0.9 : focused.includes(n.id) ? 1 : 0.5, duration: 0.5 },
              at,
            ),
          );
          ecoEdges.forEach(([a, b]) =>
            tl.to(
              q(`#e-${edgeKey(a, b)}`),
              {
                stroke: ["slowdown", "cause"].includes(stage.visual)
                  ? "var(--warn)"
                  : "var(--healthy)",
                strokeOpacity: !focused.length
                  ? 0.5
                  : focused.includes(a) && focused.includes(b)
                    ? 0.9
                    : 0.18,
                strokeWidth: focused.includes(a) && focused.includes(b) ? 2.5 : 1,
                duration: 0.55,
              },
              at,
            ),
          );
          tl.to(
            q(".inc-ring"),
            { autoAlpha: stage.visual === "slowdown" ? 1 : 0, duration: 0.4 },
            at,
          );
          tl.to(q(".db-ring"), { autoAlpha: stage.visual === "cause" ? 1 : 0, duration: 0.4 }, at);
          if (index > 0 && storyStages[index - 1]?.visual !== stage.visual) {
            tl.to(
              q(
                `.visual-${storyStages[index - 1]?.visual}, .network-${storyStages[index - 1]?.visual}`,
              ),
              { autoAlpha: 0, duration: 0.15 },
              at,
            );
          }
          if (
            stage.visual !== "none" &&
            (index === 0 || storyStages[index - 1]?.visual !== stage.visual)
          ) {
            tl.fromTo(
              q(`.visual-${stage.visual}, .network-${stage.visual}`),
              { autoAlpha: 0, y: reduce ? 0 : 12 },
              { autoAlpha: 1, y: 0, duration: 0.5, immediateRender: false },
              at + 0.15,
            );
            tl.fromTo(
              q(`.network-${stage.visual} .draw-line`),
              { strokeDasharray: 1, strokeDashoffset: reduce ? 0 : 1 },
              { strokeDashoffset: 0, duration: 0.85, immediateRender: false },
              at + 0.2,
            );
          }
        });
        tl.to({}, { duration: STAGE_DURATION }, (storyStages.length - 1) * STAGE_DURATION);
        let savedTime = 0;
        let lastPlaybackTime = -1;
        let playbackTween: { kill: () => void } | undefined;
        playbackRef.current = (time, exit) => {
          if (exit) {
            playbackTween?.kill();
            lastPlaybackTime = -1;
            tl.scrollTrigger?.enable(false, false);
            window.scrollTo(0, savedY.current);
            tl.scrollTrigger?.update();
            return;
          }
          tl.scrollTrigger?.getTween()?.pause();
          tl.scrollTrigger?.disable(false);
          if (lastPlaybackTime !== time) {
            playbackTween?.kill();
            lastPlaybackTime = time;
            playbackTween = gsap.to(tl, {
              time,
              duration: reduce ? 0 : 0.65,
              ease: "power2.inOut",
            });
          }
        };
        freezeRef.current = (freeze) => {
          const trigger = tl.scrollTrigger;
          if (!trigger) return;
          if (freeze) {
            trigger.getTween()?.pause();
            savedTime = tl.time();
            frozen = true;
            trigger.disable(false);
            tl.pause();
          } else {
            trigger.enable(false, false);
            tl.time(savedTime, true);
            frozen = false;
            trigger.update();
          }
        };
        const st = tl.scrollTrigger;
        if (!st) return;
        const total = tl.duration();
        const updateLabels = () => {
          const map: Record<string, number> = {};
          for (const [k, v] of Object.entries(tl.labels))
            map[k] = st.start + (v / total) * (st.end - st.start);
          map["opening"] = 0;
          labelsRef.current = map;
        };
        st.vars.onRefresh = updateLabels;
        st.refresh();
        updateLabels();
      }, root);
    })();
    return () => {
      cancelled = true;
      freezeRef.current = () => {};
      playbackRef.current = () => {};
      ctx?.revert();
    };
  }, []);


  const story = customerStories[storyIndex] ?? customerStories[0];
  if (!story) return null;

  return (
    <div
      ref={root}
      data-presenting={presenting}
      data-active-scene="opening"
      data-active-point="-1"
      data-active-block="overview"
    >
      <section className="stage relative h-dvh w-full overflow-hidden bg-background">
        <svg
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <radialGradient id="hubGrad">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.9" />
              <stop offset="60%" stopColor="var(--violet)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
            </radialGradient>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="var(--foreground)" strokeOpacity="0.04" />
            </pattern>
          </defs>
          <rect width="1600" height="900" fill="url(#grid)" />
          <g id="cam">
            <TopologyMap />
            <NetworkVisuals />
          </g>
        </svg>
        <div className="opening-shield pointer-events-none absolute inset-0" />
        <div className="stage-vignette pointer-events-none absolute inset-0" />
        <div className="reading-shield-left pointer-events-none absolute inset-0" />
        <div className="reading-shield-wide pointer-events-none absolute inset-0" />

        {/* 1. Opening */}
        <div
          data-scene="opening"
          className="scene-opening absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <div className="opening-copy flex flex-col items-center">
          <p className="scene-el eyebrow mb-6">{opening.eyebrow}</p>
          <h1 className="scene-el opening-title font-semibold leading-[1.05]">
            {opening.headline[0]}
            <br />
            <span className="text-signal">{opening.headline[1]}</span>
          </h1>
          <p className="scene-el mt-8 max-w-2xl text-base text-foreground/85 md:text-xl">
            {opening.sub}
          </p>
          <p className="scene-el mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
            {opening.secondary}
          </p>
          <button
            type="button"
            className="scene-el eyebrow mt-10 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => jumpTo("challenge")}
          >
            {ui.discover}
            <ChevronDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" />
          </button>
          </div>
          <div className="topology-card absolute inset-x-0 bottom-28 mx-auto max-w-xl px-6 text-center md:bottom-14">
            <p className="eyebrow mb-3 text-accent">{topology.eyebrow}</p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{topology.headline}</h2>
            <p className="mt-2 text-sm text-foreground/80">{topology.sub}</p>
            <ul className="mt-3 flex flex-wrap justify-center gap-2 font-mono text-[11px] text-muted-foreground">
              {topology.tiers.map((t) => (
                <li key={t} className="rounded-full border border-border px-3 py-1">{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 2. Challenge */}
        <div
          data-scene="challenge"
          className="scene-challenge narrative-scene pointer-events-none absolute inset-y-0 left-0 flex w-full flex-col justify-end px-6 pb-20 md:w-[48%] md:justify-center md:px-16 md:pb-0"
        >
          <p className="scene-el head eyebrow mb-5 text-accent">{challenge.eyebrow}</p>
          <h2 className="scene-el head text-3xl font-semibold leading-[1] tracking-tight md:text-6xl">
            {challenge.headline[0]}
            <span className="block text-signal">{challenge.headline[1]}</span>
          </h2>
          <p className="scene-el head mt-5 max-w-md text-sm text-foreground/80 md:text-lg">
            {challenge.sub}
          </p>
          <ol className="reading-points mt-6 space-y-3 md:mt-10 md:space-y-5">
            {challenge.items.map((c, i) => (
              <li
                key={c.n}
                data-point={i}
                className={`reading-point c${i} flex gap-4 border-l border-accent/50 pl-4`}
              >
                <span className="font-mono text-xs text-accent">{c.n}</span>
                <div>
                  <p className="text-sm font-medium md:text-lg">{c.title}</p>
                  <p className="hidden text-sm text-muted-foreground md:block">{c.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <ProductScene
          p={capabilities}
          cls="scene-capabilities"
          onMore={() => openPanel("capabilities")}
        />

        <div
          data-scene="action"
          className="scene-action narrative-scene pointer-events-none absolute inset-y-0 left-0 flex w-full flex-col justify-center px-6 md:w-[48%] md:px-16"
        >
          <SceneHeading
            eyebrow={investigation.eyebrow}
            headline={["FOLLOW THE EVIDENCE.", "UNDERSTAND THE ISSUE."]}
            sub={investigation.sub}
          />
          <ol className="reading-points mt-6">
            {investigation.steps.map((step, i) => (
              <li
                key={step.k}
                data-point={i}
                className="reading-point border-l border-primary/50 pl-4"
              >
                <p className="font-mono text-xs text-primary">{step.k}</p>
                <h3 className="mt-2 text-lg">{step.v}</h3>
              </li>
            ))}
          </ol>
          <Button
            variant="link"
            className="scene-el w-fit px-0"
            onClick={() => openPanel("investigation")}
          >
            {ui.readMore}
            <ArrowRight />
          </Button>
          <p className="scene-el mt-3 text-xs text-muted-foreground">{investigation.note}</p>
        </div>
        {Object.entries(contextSections).map(([scene, section]) => (
          <div
            key={scene}
            data-scene={scene}
            className={`scene-${scene} narrative-scene context-section pointer-events-none absolute inset-y-0 left-0 flex w-full flex-col justify-center px-6 md:w-[48%] md:px-16`}
          >
            <SceneHeading eyebrow={section.eyebrow} headline={section.headline} sub={section.sub} />
            <ol className="reading-points mt-7 space-y-4">
              {section.points.map((pt, i) => (
                <li
                  key={pt.n}
                  data-point={i}
                  className="reading-point border-l border-primary/50 pl-4"
                >
                  <p className="font-mono text-xs text-primary">{pt.n}</p>
                  <h3 className="mt-2 text-xl font-medium">{pt.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{pt.body}</p>
                </li>
              ))}
            </ol>
            {"detail" in section && (
              <>
                <Button
                  variant="link"
                  className="scene-el mt-5 w-fit px-0"
                  onClick={() => openPanel(section.detail)}
                >
                  {ui.readMore}
                  <ArrowRight />
                </Button>
                <p className="scene-el mt-3 text-xs text-muted-foreground">
                  {"note" in section ? section.note : ""}
                </p>
              </>
            )}
          </div>
        ))}

        <div
          data-scene="customers"
          className="scene-customers story-full absolute inset-0 flex flex-col justify-center px-6 md:px-16"
        >
          <SceneHeading
            eyebrow={customers.eyebrow}
            headline={customers.headline}
            sub={customers.sub}
          />
          <div className="scene-el interactive-stories mt-7 max-w-5xl">
            <div
              className="flex flex-wrap gap-2 border-b pb-3"
              role="tablist"
              aria-label={ui.storySection}
            >
              {customerStories.map((c, i) => (
                <Button
                  key={c.id}
                  role="tab"
                  aria-selected={i === storyIndex}
                  aria-controls="customer-story-detail"
                  id={`story-tab-${c.id}`}
                  variant={i === storyIndex ? "default" : "ghost"}
                  onClick={() => setStoryIndex(i)}
                >
                  {c.name}
                </Button>
              ))}
            </div>
            <article
              id="customer-story-detail"
              role="tabpanel"
              aria-labelledby={`story-tab-${story.id}`}
              className="mt-5 grid gap-5 md:grid-cols-[1.3fr_1fr] md:gap-16"
            >
              <div>
                <p className="eyebrow text-healthy">{story.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-medium md:text-3xl">{story.title}</h3>
                <p className="mt-3 max-w-lg text-sm text-muted-foreground">{story.benefit}</p>
                {story.id === "cft" && (
                  <p className="mt-4 text-2xl text-healthy">{diagram.workflowCount}</p>
                )}
                <Button
                  onClick={() => openPanel(story.id)}
                  variant="link"
                  className="read-more mt-4 px-0"
                >
                  {ui.readMore}
                  <ArrowRight />
                </Button>
              </div>
              {story.metric && (
                <div className="border-l border-healthy/50 pl-6">
                  <p className="text-6xl font-semibold text-healthy md:text-7xl">{story.metric}</p>
                  <p className="mt-2 max-w-xs text-sm">{story.metricLabel}</p>
                  <p className="mt-3 text-[10px] text-muted-foreground">{ui.attributed}</p>
                </div>
              )}
            </article>
            <div className="mt-4 flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                aria-label={ui.previous}
                onClick={() =>
                  setStoryIndex((i) => (i + customerStories.length - 1) % customerStories.length)
                }
              >
                <ArrowLeft />
              </Button>
              <span className="font-mono text-xs text-muted-foreground">
                {storyIndex + 1} / {customerStories.length}
              </span>
              <Button
                variant="ghost"
                size="icon"
                aria-label={ui.next}
                onClick={() => setStoryIndex((i) => (i + 1) % customerStories.length)}
              >
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>

        <div
          data-scene="options"
          className="scene-options story-full absolute inset-0 flex flex-col justify-center px-6 md:px-16"
        >
          <SceneHeading eyebrow={options.eyebrow} headline={options.headline} sub={options.sub} />
          <div className="mt-7 grid max-w-5xl gap-6 md:grid-cols-2 md:gap-16">
            {options.platforms.map((o) => (
              <article key={o.id} className="scene-el border-t border-primary/50 pt-4">
                <h3 className="text-2xl font-medium">{o.name}</h3>
                <p className="mt-3 max-w-md text-sm text-muted-foreground">{o.summary}</p>
                <Button
                  variant="link"
                  onClick={() => openPanel(o.id)}
                  className="read-more mt-3 px-0"
                >
                  {ui.technologyMore}
                  <ArrowRight />
                </Button>
              </article>
            ))}
          </div>
          <p className="scene-el mt-4 max-w-3xl text-sm text-foreground/80">{options.note}</p>
          <div className="scene-el operating-models mt-4 max-w-5xl">
            <h3 className="font-medium">{options.modelsHeading}</h3>
            <div className="mt-2 grid gap-3 md:grid-cols-2">
              {options.models.map((model) => (
                <div key={model.title}>
                  <h4 className="text-sm text-healthy">{model.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{model.body}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="scene-el mt-5 font-mono text-sm text-accent">{ui.pricing}</p>
          <p className="scene-el mt-2 max-w-3xl text-xs text-muted-foreground">{ui.optionScope}</p>
        </div>

        <div
          data-scene="closing"
          className="scene-closing story-full absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="scene-el eyebrow mb-5">{closing.eyebrow}</p>
          <h2 className="scene-el closing-title max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">
            {closing.headline[0]}
            <span className="block text-signal">{closing.headline[1]}</span>
          </h2>
          <p className="scene-el mt-6 max-w-xl text-sm text-foreground/80 md:text-lg">
            {closing.sub}
          </p>
          <div className="scene-el mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <a href={closing.href} target="_blank" rel="noreferrer">
                {ui.explore}
                <ExternalLink />
              </a>
            </Button>
            <Button variant="outline" size="lg" disabled title={ui.discussionPending}>
              {ui.discussion}
              <ArrowRight />
            </Button>
          </div>
          <p className="scene-el mt-3 text-xs text-muted-foreground">{ui.discussionPending}</p>
          <div className="scene-el qr-placeholders mt-6 flex gap-8">
            {[ui.websiteQr, ui.discussionQr].map((label) => (
              <div key={label} className="flex max-w-40 flex-col items-center gap-2">
                <QrCode className="h-12 w-12 text-muted-foreground/40" />
                <p className="text-[10px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chrome */}
        <div className="chrome absolute left-6 top-6 eyebrow transition-opacity">{ui.brand}</div>
        <div className="chrome absolute right-6 top-5 flex items-center gap-2">
          <SiteMap onJump={jumpTo} />
        </div>
        <p className="story-disclaimer absolute bottom-4 left-6 max-w-md pr-28 text-[10px] leading-snug text-muted-foreground/70">
          {disclaimer}
        </p>
      </section>

      <ReadMorePanel
        detail={panel}
        onClose={closePanel}
        onRestoreFocus={() => {
          window.scrollTo(0, savedY.current);
          triggerRef.current?.focus({ preventScroll: true });
        }}
      />
    </div>
  );
}

function ProductScene({ p, cls, onMore }: { p: Product; cls: string; onMore: () => void }) {
  return (
    <div
      data-scene="capabilities"
      className={`${cls} narrative-scene pointer-events-none absolute inset-y-0 left-0 flex w-full flex-col justify-end px-6 pb-16 md:w-[48%] md:justify-center md:px-16 md:pb-0`}
    >
      <p className="scene-el head eyebrow mb-3 text-primary">{p.eyebrow}</p>
      <p className="scene-el head text-sm font-medium text-foreground/80 md:text-lg">{p.problem}</p>
      <p className="scene-el head mb-5 hidden max-w-md text-sm text-muted-foreground md:block">
        {p.problemSub}
      </p>
      <h2 className="scene-el head text-4xl font-semibold leading-[0.95] tracking-tight md:text-6xl">
        {p.headline.map((l, i) => (
          <span key={l} className={i === p.headline.length - 1 ? "block text-signal" : "block"}>
            {l}
          </span>
        ))}
      </h2>
      <p className="scene-el head mt-4 max-w-md text-sm text-foreground/80 md:text-base">
        {p.description}
      </p>
      <ol className="reading-points mt-5 space-y-2 md:mt-7 md:space-y-3">
        {p.points.map((pt, i) => (
          <li
            key={pt.n}
            data-point={i}
            className={`reading-point p${i} flex gap-4 border-l border-primary/40 pl-4`}
          >
            <span className="font-mono text-xs text-primary">{pt.n}</span>
            <div>
              <p className="text-sm font-medium md:text-base">{pt.title}</p>
              <p className="hidden text-sm text-muted-foreground md:block">{pt.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <Button onClick={onMore} className="scene-el read-more pointer-events-auto mt-4 w-fit">
        {ui.readMore}
        <ArrowRight />
      </Button>
    </div>
  );
}

function SceneHeading({
  cls = "",
  eyebrow,
  headline,
  sub,
}: {
  cls?: string;
  eyebrow: string;
  headline: string[];
  sub: string;
}) {
  return (
    <>
      <p className={`scene-el ${cls} eyebrow mb-4 text-primary`}>{eyebrow}</p>
      <h2 className={`scene-el ${cls} max-w-4xl text-3xl font-semibold leading-tight md:text-5xl`}>
        {headline[0]}
        <span className="block text-signal">{headline[1]}</span>
      </h2>
      <p className={`scene-el ${cls} mt-4 max-w-2xl text-sm text-foreground/80 md:text-base`}>
        {sub}
      </p>
    </>
  );
}
