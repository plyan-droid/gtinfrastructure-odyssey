import { useCallback, useEffect, useRef, useState } from "react";
import {
  challenge, closing, disclaimer, capabilities, investigation, modules, tools, customerStories, customers, options,
  opening, presentationStops, presentationSpeed, details, diagram, ui, type Detail, type Product,
} from "@/content/showcase";
import { alertNodes, byId, clusters, curve, ecoEdges, incidentId, latencyChain, mapEdges, nodes, tracePath } from "./network";
import { ReadMorePanel } from "./ReadMorePanel";
import { SiteMap } from "./SiteMap";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Play, ExternalLink } from "lucide-react";

const SCROLL_LEN = 16000; // px of scroll mapped to the full story

const kindColor: Record<string, string> = {
  app: "var(--healthy)",
  svc: "var(--foreground)",
  db: "var(--violet)",
  cloud: "var(--muted-foreground)",
  queue: "var(--accent)",
};

const edgeKey = (a: string, b: string) => `${a}-${b}`;
const inPath = (path: string[], a: string, b: string) => {
  const i = path.indexOf(a);
  return i >= 0 && path[i + 1] === b;
};
const touches = (id: string, a: string, b: string) => a === id || b === id;
const nd = (id: string) => {
  const node = byId[id];
  if (!node) throw new Error(`Unknown network node: ${id}`);
  return node;
};

export function Showcase() {
  const root = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState<Detail | null>(null);
  const [presenting, setPresenting] = useState(false);
  const labelsRef = useRef<Record<string, number>>({});
  const savedY = useRef(0);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [storyIndex, setStoryIndex] = useState(0);

  const openPanel = useCallback((id: string) => {
    if (presenting || !details[id]) return;
    savedY.current = window.scrollY;
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setPanel(details[id]);
  }, [presenting]);
  const closePanel = useCallback(() => {
    setPanel(null);
    window.scrollTo(0, savedY.current);
  }, []);
  const jumpTo = useCallback((label: string) => {
    const y = labelsRef.current[label];
    if (y !== undefined) window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      ctx = gsap.context(() => {
        const q = gsap.utils.selector(root);
        gsap.set(
          q(".scene-el, .to-hub, .hub, .map-edge, .ai-panel, .paths, .qr, .ring, .cluster, .cluster-link, .demo-panel, .es-step, .dt-step, .cmp-with, .tool-flow, .customer-beacon"),
          { autoAlpha: 0 },
        );
        gsap.set(q(".scene-opening .scene-el"), { autoAlpha: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: q(".stage")[0] as HTMLElement,
            start: "top top",
            end: `+=${SCROLL_LEN}`,
            pin: true,
            scrub: reduce ? true : 1,
          },
        });
        const cam = q("#cam");
        const enter = (sel: string, at: number) =>
          tl.fromTo(q(sel), { autoAlpha: 0, y: reduce ? 0 : 50 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }, at);
        const exit = (sel: string, at: number) =>
          tl.to(q(sel), { autoAlpha: 0, y: reduce ? 0 : -60, duration: 0.4, stagger: 0.04, ease: "power2.in" }, at);
        const show = (sel: string, at: number, d = 0.4) => tl.to(q(sel), { autoAlpha: 1, duration: d }, at);
        const hide = (sel: string, at: number, d = 0.4) => tl.to(q(sel), { autoAlpha: 0, duration: d }, at);
        const neutral = { stroke: "var(--foreground)", strokeWidth: 1.2, strokeOpacity: 0.22, duration: 0.4 };
        const inc = nd(incidentId);

        // The existing world evolves continuously; all navigation uses timeline labels.
        tl.addLabel("opening", 0.2);
        tl.to(cam, { scale: 1.08, x: -10, duration: 1 }, 0.3);
        exit(".scene-opening .scene-el", 1.8);
        show(".inc-ring", 1.9);
        tl.to(q(".inc-edge"), { stroke: "var(--warn)", strokeOpacity: 0.9, strokeWidth: 2, duration: 0.6 }, 1.9);
        tl.to(cam, { scale: 1.25, x: 800 - inc.x * 1.25 + 200, y: 450 - inc.y * 1.25, duration: 1 }, 2);
        show(".cluster, .cluster-link", 2.2);
        enter(".scene-challenge .head", 2.2);
        challenge.items.forEach((_, i) => enter(`.scene-challenge .c${i}`, 2.5 + i * 0.2));
        tl.addLabel("challenge", 3.5);
        exit(".scene-challenge .scene-el", 3.9);
        hide(".cluster-link", 3.9);
        clusters.forEach(c => tl.to(q(`.cluster-${c.key}`), { x: 800 - c.x, y: 430 - c.y, scale: 0.6, duration: 0.8 }, 4));
        hide(".cluster, .inc-ring", 4.7);
        tl.to(cam, { scale: 1.18, x: 200, y: 10, duration: 1 }, 4.2);
        show(".hub", 4.5);
        tl.to(q(".to-hub"), { autoAlpha: 1, duration: 0.5, stagger: 0.04 }, 4.5);
        enter(".scene-capabilities .head", 4.6);
        capabilities.points.forEach((_, i) => enter(`.scene-capabilities .p${i}`, 5 + i * 0.25));
        tl.addLabel("capabilities", 6.5);
        exit(".scene-capabilities .scene-el", 6.9);
        hide(".hub, .to-hub", 7);
        hide(".eco-edge", 7.1);
        nodes.forEach(n => tl.to(q(`.node-${n.id}`), { x: n.mx - n.x, y: n.my - n.y, duration: 1 }, 7.2));
        tl.to(cam, { scale: 1.12, x: 240, y: 0, duration: 1 }, 7.2);
        tl.to(q(".map-edge"), { autoAlpha: 1, duration: 0.5, stagger: 0.03 }, 7.8);
        enter(".scene-action .head", 7.4);
        show(".action-before, .alert-ring", 7.6);
        hide(".action-before, .alert-ring", 8.4);
        enter(".action-with", 8.5);
        investigation.steps.forEach((_, i) => show(`.dt-step-${i}`, 8.8 + i * 0.35));
        show(".app-ring", 8.8);
        tl.to(q(".dep-edge"), { stroke: "var(--healthy)", strokeOpacity: 0.8, strokeWidth: 2, duration: 0.5 }, 9);
        show(".lat-ring", 9.2);
        tl.to(q(".lat-edge"), { stroke: "var(--warn)", strokeWidth: 3, strokeOpacity: 1, duration: 0.5 }, 9.2);
        show(".db-ring", 9.8);
        enter(".scene-action .value", 10);
        tl.addLabel("action", 10.7);
        exit(".scene-action .scene-el, .action-with", 11.1);
        hide(".app-ring, .lat-ring, .db-ring", 11.2);
        tl.to(q(".dep-edge, .lat-edge, .inc-edge"), neutral, 11.2);
        tl.to(cam, { scale: 0.95, x: 0, y: -40, duration: 1 }, 11.2);
        enter(".scene-tools .head", 11.5);
        enter(".scene-tools .tool-item", 11.9);
        show(".tool-flow", 12);
        tl.fromTo(q(".tool-flow path"), { strokeDashoffset: 180 }, { strokeDashoffset: 0, duration: 1.2, stagger: 0.1 }, 12);
        tl.addLabel("tools", 13.6);
        exit(".scene-tools .scene-el", 14);
        hide(".tool-flow", 14);
        tl.to(cam, { scale: 0.86, x: 0, y: -70, duration: 1 }, 14);
        tl.to(q(".net"), { opacity: 0.35, duration: 0.7 }, 14.2);
        enter(".scene-customers .scene-el", 14.4);
        show(".customer-beacon", 14.7);
        tl.addLabel("customers", 16);
        exit(".scene-customers .scene-el", 16.6);
        hide(".customer-beacon", 16.6);
        tl.to(cam, { scale: 0.78, x: 0, y: -60, duration: 1 }, 16.6);
        show(".paths", 17);
        enter(".scene-options .scene-el", 17);
        tl.addLabel("options", 18.5);
        exit(".scene-options .scene-el", 19);
        hide(".paths", 19);
        enter(".scene-closing .scene-el", 19.4);
        tl.to(q(".net"), { opacity: 0.5, duration: 0.8 }, 19.5);
        tl.addLabel("closing", 20.7);
        tl.to({}, { duration: 0.6 });

        const st = tl.scrollTrigger;
        if (!st) return;
        const total = tl.duration();
        const map: Record<string, number> = {};
        for (const [k, v] of Object.entries(tl.labels)) map[k] = st.start + (v / total) * (st.end - st.start);
        map["opening"] = 0;
        labelsRef.current = map;
      }, root);
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  // Presentation Mode: auto-drive the same scroll timeline; never opens panels; loops.
  useEffect(() => {
    if (new URL(window.location.href).searchParams.get("present") === "1") setPresenting(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("present-mode", presenting);
    if (!presenting) return;
    setPanel(null);
    setStoryIndex(0);
    let raf = 0;
    let last = performance.now();
    let holdUntil = 0;
    let next = 0;
    window.scrollTo(0, 0);
    const speed = presentationSpeed; // px per second between stops
    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      if (t >= holdUntil) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const y = window.scrollY;
        if (next >= presentationStops.length || y >= max - 2) {
          window.scrollTo(0, 0);
          next = 0;
          holdUntil = t + 800;
        } else {
          const stop = presentationStops[next];
          if (!stop) return;
          const target = labelsRef.current[stop.label];
          if (target === undefined) { raf = requestAnimationFrame(tick); return; }
          let ny = y + speed * dt;
          if (ny >= target) {
            ny = target;
            next++;
            holdUntil = t + stop.hold;
          }
          window.scrollTo(0, ny);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const stop = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key === "Tab") return;
      setPresenting(false);
    };
    window.addEventListener("keydown", stop);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
    };
  }, [presenting]);

  const hub = { x: 800, y: 430 };
  const mono = "var(--font-mono)";
  const story = customerStories[storyIndex] ?? customerStories[0];
  if (!story) return null;

  return (
    <div ref={root}>
      <section className="stage relative h-screen w-full overflow-hidden bg-background">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
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
            <g className="net">
              {ecoEdges.map(([a, b]) => (
                <path
                  key={edgeKey(a, b)}
                  id={`e-${edgeKey(a, b)}`}
                  d={curve(nd(a), nd(b))}
                  className={`eco-edge ${inPath(tracePath, a, b) ? "trace-edge" : ""} ${touches(incidentId, a, b) ? "inc-edge" : ""}`}
                  fill="none"
                  stroke="var(--foreground)"
                  strokeOpacity="0.22"
                  strokeWidth="1.2"
                />
              ))}
              {ecoEdges.slice(0, 8).map(([a, b], i) => (
                <circle key={`s${i}`} r="3" fill={i % 2 ? "var(--accent)" : "var(--primary)"} className="signal eco-edge">
                  <animateMotion dur={`${3 + (i % 3)}s`} begin={`${i * 0.4}s`} repeatCount="indefinite">
                    <mpath href={`#e-${edgeKey(a, b)}`} />
                  </animateMotion>
                </circle>
              ))}

              {mapEdges.map(([a, b]) => {
                const A = { x: nd(a).mx, y: nd(a).my };
                const B = { x: nd(b).mx, y: nd(b).my };
                const lat = inPath(latencyChain, a, b);
                const dep = !lat && (touches("gateway", a, b) || touches("web", a, b));
                return (
                  <path
                    key={`m${edgeKey(a, b)}`}
                    d={`M${A.x},${A.y} C${(A.x + B.x) / 2},${A.y} ${(A.x + B.x) / 2},${B.y} ${B.x},${B.y}`}
                    className={`map-edge ${lat ? "lat-edge" : ""} ${dep ? "dep-edge" : ""}`}
                    fill="none"
                    stroke="var(--foreground)"
                    strokeOpacity="0.22"
                    strokeWidth="1.2"
                  />
                );
              })}

              {/* Challenge: signal clusters */}
              {clusters.map((c) =>
                c.from.map((id) => (
                  <path key={`cl-${c.key}-${id}`} className="cluster-link" d={`M${nd(id).x},${nd(id).y} L${c.x},${c.y}`} stroke="var(--accent)" strokeOpacity="0.4" strokeDasharray="3 6" />
                )),
              )}
              {clusters.map((c, i) => (
                <g key={c.key} className={`cluster cluster-${c.key}`} style={{ transformOrigin: `${c.x}px ${c.y}px` }}>
                  <rect x={c.x - 70} y={c.y - 26} width="140" height="52" rx="10" fill="var(--card)" stroke={["var(--accent)", "var(--healthy)", "var(--primary)"][i]} strokeOpacity="0.8" />
                  <text x={c.x} y={c.y + 5} textAnchor="middle" fontSize="14" letterSpacing="3" fill="var(--foreground)" fontFamily={mono}>{c.key}</text>
                </g>
              ))}

              {/* Elastic analytics hub */}
              {nodes
                .filter((n) => n.kind !== "cloud")
                .map((n, i) => (
                  <g key={`h${n.id}`} className="to-hub">
                    <path id={`hub-${n.id}`} d={`M${n.x},${n.y} L${hub.x},${hub.y}`} stroke="var(--primary)" strokeOpacity="0.35" strokeDasharray={i % 3 === 0 ? "6 6" : i % 3 === 1 ? "1 7" : "14 4"} />
                    <circle r="2.6" fill={["var(--accent)", "var(--healthy)", "var(--primary)"][i % 3]} className="signal">
                      <animateMotion dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite">
                        <mpath href={`#hub-${n.id}`} />
                      </animateMotion>
                    </circle>
                  </g>
                ))}
              <g className="hub">
                <circle cx={hub.x} cy={hub.y} r="90" fill="url(#hubGrad)" />
                <circle cx={hub.x} cy={hub.y} r="34" fill="var(--background)" stroke="var(--primary)" strokeWidth="1.5" />
                <text x={hub.x} y={hub.y + 4} textAnchor="middle" fontSize="11" fill="var(--foreground)" fontFamily={mono}>{diagram.analytics}</text>
                <text x={hub.x} y={hub.y + 58} textAnchor="middle" fontSize="10" fill="var(--muted-foreground)" fontFamily={mono}>{diagram.telemetry}</text>
              </g>

              {nodes.map((n) => (
                <g key={n.id} className={`node node-${n.id}`}>
                  {n.id === incidentId && (
                    <>
                      <g className="ring inc-ring">
                        <circle cx={n.x} cy={n.y} r="30" fill="none" stroke="var(--warn)" strokeWidth="2" />
                        <text x={n.x + 36} y={n.y + 44} fontSize="12" fill="var(--warn)" fontFamily={mono}>{diagram.latency}</text>
                      </g>
                      <g className="ring lat-ring">
                        <circle cx={n.x} cy={n.y} r="30" fill="none" stroke="var(--warn)" strokeWidth="2" />
                        <text x={n.x + 36} y={n.y + 44} fontSize="12" fill="var(--warn)" fontFamily={mono}>{diagram.response}</text>
                      </g>
                    </>
                  )}
                  {n.id === "inventory" && (
                    <>
                      <g className="ring es-focus">
                        <circle cx={n.x} cy={n.y} r="32" fill="none" stroke="var(--primary)" strokeWidth="2.5" />
                        <text x={n.x - 40} y={n.y + 56} fontSize="12" fill="var(--primary)" fontFamily={mono}>{diagram.spans}</text>
                      </g>
                      <g className="ring db-ring">
                        <circle cx={n.x} cy={n.y} r="32" fill="none" stroke="var(--error)" strokeWidth="2.5" />
                        <text x={n.x + 38} y={n.y + 6} fontSize="12" fill="var(--error)" fontFamily={mono}>{diagram.query}</text>
                      </g>
                    </>
                  )}
                  {n.id === "web" && (
                    <circle className="ring app-ring" cx={n.x} cy={n.y} r="28" fill="none" stroke="var(--healthy)" strokeWidth="2.5" />
                  )}
                  {alertNodes.includes(n.id) && (
                    <g className="ring alert-ring">
                      <circle cx={n.x} cy={n.y} r="24" fill="none" stroke="var(--warn)" strokeWidth="1.5" strokeDasharray="4 4" />
                      <text x={n.x + 20} y={n.y - 20} fontSize="13" fill="var(--warn)" fontFamily={mono}>⚠</text>
                    </g>
                  )}
                  {n.kind === "cloud" ? (
                    <rect x={n.x - 34} y={n.y - 20} width="68" height="40" rx="20" fill="var(--card)" stroke={kindColor[n.kind]} strokeOpacity="0.6" />
                  ) : n.kind === "db" ? (
                    <rect x={n.x - 16} y={n.y - 16} width="32" height="32" rx="6" fill="var(--card)" stroke={kindColor[n.kind]} strokeWidth="1.5" />
                  ) : (
                    <circle cx={n.x} cy={n.y} r={n.kind === "app" ? 12 : 16} fill="var(--card)" stroke={kindColor[n.kind]} strokeWidth="1.5" />
                  )}
                  <circle cx={n.x} cy={n.y} r="3" fill={kindColor[n.kind]} />
                  <text x={n.x} y={n.y + (n.kind === "cloud" ? 38 : 34)} textAnchor="middle" fontSize="12" fill="var(--muted-foreground)" fontFamily={mono}>{n.label}</text>
                </g>
              ))}
            </g>

            <g className="tool-flow" fill="none" stroke="var(--primary)" strokeWidth="2">
              <path d="M250 280 C600 180 800 450 1300 280" strokeDasharray="180 12" />
              <path d="M250 650 C600 750 800 450 1300 650" stroke="var(--healthy)" strokeDasharray="180 12" />
            </g>
            <g className="customer-beacon" fill="none" stroke="var(--healthy)" strokeWidth="1.5">
              <circle cx="1120" cy="420" r="100" /><circle cx="1120" cy="420" r="140" strokeOpacity="0.35" />
            </g>
            <g className="paths" fontFamily={mono}>
              <path d="M760,1050 C700,800 420,760 330,560" fill="none" stroke="var(--primary)" strokeWidth="3" />
              <text x="250" y="530" fontSize="22" fill="var(--primary)">{diagram.paths[0]}</text>
              <path d="M840,1050 C900,800 1180,760 1270,560" fill="none" stroke="var(--healthy)" strokeWidth="3" />
              <text x="1180" y="530" fontSize="22" fill="var(--healthy)">{diagram.paths[1]}</text>
            </g>
          </g>
        </svg>
        <div className="stage-vignette pointer-events-none absolute inset-0" />

        {/* 1. Opening */}
        <div className="scene-opening absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="scene-el eyebrow mb-6">{opening.eyebrow}</p>
          <h1 className="scene-el text-4xl font-semibold leading-[0.95] tracking-tight md:text-8xl lg:text-[7rem]">
            {opening.headline[0]}
            <br />
            <span className="text-signal">{opening.headline[1]}</span>
          </h1>
          <p className="scene-el mt-8 max-w-2xl text-base text-foreground/85 md:text-xl">{opening.sub}</p>
          <p className="scene-el mt-4 max-w-xl text-sm text-muted-foreground md:text-base">{opening.secondary}</p>
          <p className="scene-el eyebrow mt-10">{ui.start} ↓</p>
        </div>

        {/* 2. Challenge */}
        <div className="scene-challenge pointer-events-none absolute inset-y-0 left-0 flex w-full flex-col justify-end px-6 pb-20 md:w-[48%] md:justify-center md:px-16 md:pb-0">
          <p className="scene-el head eyebrow mb-5 text-accent">{challenge.eyebrow}</p>
          <h2 className="scene-el head text-3xl font-semibold leading-[1] tracking-tight md:text-6xl">
            {challenge.headline[0]}
            <span className="block text-signal">{challenge.headline[1]}</span>
          </h2>
          <p className="scene-el head mt-5 max-w-md text-sm text-foreground/80 md:text-lg">{challenge.sub}</p>
          <ol className="mt-6 space-y-3 md:mt-10 md:space-y-5">
            {challenge.items.map((c, i) => (
              <li key={c.n} className={`scene-el c${i} flex gap-4 border-l border-accent/50 pl-4`}>
                <span className="font-mono text-xs text-accent">{c.n}</span>
                <div>
                  <p className="text-sm font-medium md:text-lg">{c.title}</p>
                  <p className="hidden text-sm text-muted-foreground md:block">{c.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <ProductScene p={capabilities} cls="scene-capabilities" onMore={() => openPanel("capabilities")} />

        <DemoText cls="scene-action" eyebrow={investigation.eyebrow} scenario={investigation.scenario} value={investigation.value} valueSub={investigation.valueSub} note={investigation.note} onMore={() => openPanel("investigation")} />
        <div className="demo-panel action-before investigation-console absolute right-4 top-20 w-[min(92vw,26rem)] rounded-lg border border-warn/40 bg-card/85 p-5 backdrop-blur md:right-16 md:top-24">
          <p className="eyebrow mb-3 text-warn">{investigation.beforeTag}</p>
          <div className="flex gap-3">{diagram.fragmented.map(t => <span key={t} className="border-b border-warn/50 pb-2 font-mono text-xs">{t}</span>)}</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">{investigation.beforeLabels.map(l => <li key={l}>{l}</li>)}</ul>
        </div>
        <div className="demo-panel action-with investigation-console absolute right-4 top-20 w-[min(92vw,26rem)] rounded-lg border border-primary/40 bg-card/85 p-5 backdrop-blur md:right-16 md:top-24">
          <p className="eyebrow mb-3 text-primary">{investigation.withTag}</p>
          <div className="break-all rounded-md border bg-background/70 px-3 py-2 font-mono text-[11px]">⌕ {investigation.query}</div>
          <ol className="mt-4 space-y-3">{investigation.steps.map((step, i) => <li key={step.k} className={`dt-step dt-step-${i} flex gap-3 text-sm`}><span className="w-16 shrink-0 font-mono text-[10px] text-primary">{step.k}</span><span>{step.v}</span></li>)}</ol>
        </div>

        <div className="scene-tools story-full absolute inset-0 flex flex-col justify-center px-6 md:px-16">
          <SceneHeading cls="head" eyebrow={tools.eyebrow} headline={tools.headline} sub={tools.sub} />
          <div className="mt-8 grid max-w-5xl gap-8 md:grid-cols-2 md:gap-16">
            {Object.values(modules).filter(t => t.enabled).map(t => <article key={t.id} className="scene-el tool-item border-t border-primary/50 pt-5">
              <p className="eyebrow text-primary">{ui.toolsBuilt}</p><h3 className="mt-2 text-3xl font-semibold">{t.name}</h3><p className="mt-2 text-lg">{t.headline}</p><p className="mt-2 max-w-md text-sm text-muted-foreground">{t.summary}</p>
              <ol className="mt-5 flex flex-wrap gap-3 font-mono text-[10px] text-healthy">{t.steps.map((step,i) => <li key={step}>{i > 0 && "→ "}{step}</li>)}</ol>
              <Button onClick={() => openPanel(t.id)} variant="link" className="read-more mt-4 px-0">{ui.readMore}<ArrowRight /></Button>
            </article>)}
          </div><p className="scene-el tool-item mt-5 text-xs text-muted-foreground">{ui.toolsNote}</p>
        </div>

        <div className="scene-customers story-full absolute inset-0 flex flex-col justify-center px-6 md:px-16">
          <SceneHeading eyebrow={customers.eyebrow} headline={customers.headline} sub={customers.sub} />
          <div className="scene-el interactive-stories mt-7 max-w-5xl">
            <div className="flex flex-wrap gap-2 border-b pb-3" role="tablist" aria-label={ui.storySection}>
              {customerStories.map((c,i) => <Button key={c.id} role="tab" aria-selected={i === storyIndex} aria-controls="customer-story-detail" id={`story-tab-${c.id}`} variant={i === storyIndex ? "default" : "ghost"} onClick={() => setStoryIndex(i)}>{c.name}</Button>)}
            </div>
            <article id="customer-story-detail" role="tabpanel" aria-labelledby={`story-tab-${story.id}`} className="mt-5 grid gap-5 md:grid-cols-[1.3fr_1fr] md:gap-16">
              <div><p className="eyebrow text-healthy">{story.eyebrow}</p><h3 className="mt-3 text-2xl font-medium md:text-3xl">{story.title}</h3><p className="mt-3 max-w-lg text-sm text-muted-foreground">{story.benefit}</p><Button onClick={() => openPanel(story.id)} variant="link" className="read-more mt-4 px-0">{ui.readMore}<ArrowRight /></Button></div>
              {story.metric && <div className="border-l border-healthy/50 pl-6"><p className="text-6xl font-semibold text-healthy md:text-7xl">{story.metric}</p><p className="mt-2 max-w-xs text-sm">{story.metricLabel}</p><p className="mt-3 text-[10px] text-muted-foreground">{ui.attributed}</p></div>}
            </article>
            <div className="mt-4 flex items-center gap-3"><Button variant="ghost" size="icon" aria-label={ui.previous} onClick={() => setStoryIndex(i => (i + customerStories.length - 1) % customerStories.length)}><ArrowLeft /></Button><span className="font-mono text-xs text-muted-foreground">{storyIndex + 1} / {customerStories.length}</span><Button variant="ghost" size="icon" aria-label={ui.next} onClick={() => setStoryIndex(i => (i + 1) % customerStories.length)}><ArrowRight /></Button></div>
          </div>
          <div className="scene-el presentation-impact mt-8 grid max-w-5xl grid-cols-2 gap-8">{customerStories.slice(0,2).map(c => <article key={c.id} className="border-t border-healthy/50 pt-4"><p className="eyebrow">{c.name}</p><p className="mt-3 text-6xl text-healthy">{c.metric}</p><p className="mt-2 text-sm">{c.metricLabel}</p><p className="mt-3 text-[10px] text-muted-foreground">{ui.attributed}</p></article>)}</div>
        </div>

        <div className="scene-options story-full absolute inset-0 flex flex-col justify-center px-6 md:px-16">
          <SceneHeading eyebrow={options.eyebrow} headline={options.headline} sub={options.sub} />
          <div className="mt-7 grid max-w-5xl gap-6 md:grid-cols-2 md:gap-16">{options.platforms.map(o => <article key={o.id} className="scene-el border-t border-primary/50 pt-4"><h3 className="text-2xl font-medium">{o.name}</h3><p className="mt-3 max-w-md text-sm text-muted-foreground">{o.summary}</p><Button variant="link" onClick={() => openPanel(o.id)} className="read-more mt-3 px-0">{ui.technologyMore}<ArrowRight /></Button></article>)}</div>
          <p className="scene-el mt-4 max-w-3xl text-sm text-foreground/80">{options.note}</p><p className="scene-el mt-5 font-mono text-sm text-accent">{ui.pricing}</p><p className="scene-el mt-2 max-w-3xl text-xs text-muted-foreground">{ui.optionScope}</p>
        </div>

        <div className="scene-closing story-full absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="scene-el max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">{closing.headline[0]}<span className="block text-signal">{closing.headline[1]}</span></h2>
          <p className="scene-el mt-6 max-w-xl text-sm text-foreground/80 md:text-lg">{closing.sub}</p>
          <Button asChild size="lg" className="scene-el mt-8"><a href={closing.href} target="_blank" rel="noreferrer">{ui.explore}<ExternalLink /></a></Button>
        </div>

        {/* Chrome */}
        <div className="chrome absolute left-6 top-6 eyebrow transition-opacity">{ui.brand}</div>
        <div className="chrome absolute right-6 top-5 flex items-center gap-2">
          <SiteMap onJump={jumpTo} />
          <Button variant="outline"
            onClick={() => setPresenting((v) => !v)}
            className="rounded-full border px-4 py-2 font-mono text-xs tracking-widest text-foreground transition hover:border-primary hover:text-primary"
          >
            <Play /> <span className="hidden sm:inline">{ui.presentation}</span>
          </Button>
        </div>
        <p className="absolute bottom-4 left-6 max-w-md pr-28 text-[10px] leading-snug text-muted-foreground/70">{disclaimer}</p>
      </section>

      <ReadMorePanel detail={panel} onClose={closePanel} onRestoreFocus={() => { window.scrollTo(0, savedY.current); triggerRef.current?.focus({ preventScroll: true }); }} />
    </div>
  );
}

function DemoText({ cls, eyebrow, scenario, value, valueSub, note, onMore }: { onMore: () => void; cls: string; eyebrow: string; scenario: string; value: string[]; valueSub?: string; note: string }) {
  return (
    <div className={`${cls} pointer-events-none absolute inset-y-0 left-0 flex w-full flex-col justify-end px-6 pb-20 md:w-[46%] md:justify-center md:px-16 md:pb-0`}>
      <p className="scene-el head eyebrow mb-4 text-primary">{eyebrow}</p>
      <h2 className="scene-el head text-3xl font-semibold leading-[1] tracking-tight md:text-5xl">{scenario}</h2>
      <div className="mt-8 md:mt-12">
        <p className="scene-el value text-2xl font-semibold leading-tight md:text-4xl">
          {value.map((v, i) => <span key={v} className={i === value.length - 1 ? "block text-signal" : "block"}>{v}</span>)}
        </p>
        {valueSub && <p className="scene-el value mt-4 max-w-md text-sm text-foreground/80 md:text-base">{valueSub}</p>}
        <Button onClick={onMore} variant="link" className="scene-el value read-more pointer-events-auto mt-3 px-0">{ui.readMore}<ArrowRight /></Button>
        <p className="scene-el value mt-4 font-mono text-[10px] tracking-widest text-muted-foreground">{note.toUpperCase()}</p>
      </div>
    </div>
  );
}

function ProductScene({ p, cls, onMore }: { p: Product; cls: string; onMore: () => void }) {
  return (
    <div className={`${cls} pointer-events-none absolute inset-y-0 left-0 flex w-full flex-col justify-end px-6 pb-16 md:w-[48%] md:justify-center md:px-16 md:pb-0`}>
      <p className="scene-el head eyebrow mb-3 text-primary">{p.eyebrow}</p>
      <p className="scene-el head text-sm font-medium text-foreground/80 md:text-lg">{p.problem}</p>
      <p className="scene-el head mb-5 hidden max-w-md text-sm text-muted-foreground md:block">{p.problemSub}</p>
      <h2 className="scene-el head text-4xl font-semibold leading-[0.95] tracking-tight md:text-6xl">
        {p.headline.map((l, i) => (
          <span key={l} className={i === p.headline.length - 1 ? "block text-signal" : "block"}>{l}</span>
        ))}
      </h2>
      <p className="scene-el head mt-4 max-w-md text-sm text-foreground/80 md:text-base">{p.description}</p>
      <ol className="mt-5 space-y-2 md:mt-7 md:space-y-3">
        {p.points.map((pt, i) => (
          <li key={pt.n} className={`scene-el p${i} flex gap-4 border-l border-primary/40 pl-4`}>
            <span className="font-mono text-xs text-primary">{pt.n}</span>
            <div>
              <p className="text-sm font-medium md:text-base">{pt.title}</p>
              <p className="hidden text-sm text-muted-foreground md:block">{pt.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <Button
        onClick={onMore}
        className="scene-el p4 read-more pointer-events-auto mt-6 w-fit rounded-full bg-primary px-5 py-2.5 font-mono text-xs tracking-widest text-primary-foreground transition hover:opacity-90"
      >
        {ui.readMore}<ArrowRight />
      </Button>
    </div>
  );
}

function SceneHeading({ cls = "", eyebrow, headline, sub }: { cls?: string; eyebrow: string; headline: string[]; sub: string }) {
  return <><p className={`scene-el ${cls} eyebrow mb-4 text-primary`}>{eyebrow}</p><h2 className={`scene-el ${cls} max-w-4xl text-3xl font-semibold leading-tight md:text-5xl`}>{headline[0]}<span className="block text-signal">{headline[1]}</span></h2><p className={`scene-el ${cls} mt-4 max-w-2xl text-sm text-foreground/80 md:text-base`}>{sub}</p></>;
}
