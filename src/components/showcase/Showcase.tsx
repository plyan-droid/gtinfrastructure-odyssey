import { useCallback, useEffect, useRef, useState } from "react";
import {
  aiAnalysis, challenge, closing, comparison, disclaimer, dynatrace, dynatraceDemo, elastic, elasticDemo,
  opening, presentationStops, qr, type Product,
} from "@/content/showcase";
import { alertNodes, byId, clusters, curve, ecoEdges, incidentId, latencyChain, mapEdges, nodes, tracePath } from "./network";
import { ReadMorePanel } from "./ReadMorePanel";
import { SiteMap } from "./SiteMap";

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
const products = { elastic, dynatrace };

export function Showcase() {
  const root = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState<Product | null>(null);
  const [presenting, setPresenting] = useState(false);
  const labelsRef = useRef<Record<string, number>>({});
  const savedY = useRef(0);

  const openPanel = useCallback((id: "elastic" | "dynatrace") => {
    savedY.current = window.scrollY;
    setPanel(products[id]);
  }, []);
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
          q(".scene-el, .to-hub, .hub, .map-edge, .ai-panel, .paths, .qr, .ring, .cluster, .cluster-link, .demo-panel, .es-step, .dt-step, .cmp-with"),
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
        const inc = byId[incidentId];

        // 1. Opening: healthy flow, then one service slows and the camera leans in.
        tl.addLabel("opening", 0.2);
        tl.to(cam, { scale: 1.05, x: -10, duration: 0.8 }, 0.3);
        show(".inc-ring", 0.9);
        tl.to(q(".inc-edge"), { stroke: "var(--warn)", strokeOpacity: 0.9, strokeWidth: 2, duration: 0.4 }, 0.9);
        tl.to(cam, { scale: 1.3, x: 800 - inc.x * 1.3 + 200, y: 450 - inc.y * 1.3, duration: 1 }, 1);
        tl.addLabel("incident", 1.7);
        exit(".scene-opening .scene-el", 1.9);

        // 2. Challenge: signals scatter into separate clusters, then drift together.
        tl.to(cam, { scale: 1, x: 0, y: 0, duration: 1 }, 2.2);
        show(".cluster, .cluster-link", 2.6, 0.5);
        enter(".scene-challenge .head", 2.6);
        enter(".scene-challenge .c0", 3);
        enter(".scene-challenge .c1", 3.3);
        enter(".scene-challenge .c2", 3.6);
        tl.addLabel("challenge", 4.1);
        hide(".cluster-link", 4.4, 0.3);
        clusters.forEach((c) => tl.to(q(`.cluster-${c.key}`), { x: 800 - c.x, y: 430 - c.y, scale: 0.6, duration: 0.8 }, 4.5));
        exit(".scene-challenge .scene-el", 4.6);
        hide(".cluster", 5.2, 0.3);

        // 3. Elastic intro: analytics hub gathers the data.
        tl.to(cam, { scale: 1.18, x: 200, y: 10, duration: 1 }, 5);
        show(".hub", 5.2, 0.5);
        tl.to(q(".to-hub"), { autoAlpha: 1, duration: 0.5, stagger: 0.04 }, 5.4);
        enter(".scene-elastic .head", 5.3);
        tl.addLabel("elastic", 6.1);
        [0, 1, 2, 3, 4].forEach((i) => enter(`.scene-elastic .p${i}`, 6.3 + i * 0.35));
        tl.addLabel("elastic-points", 8.1);
        exit(".scene-elastic .scene-el", 8.4);
        hide(".hub, .to-hub", 8.5);

        // 4. Elastic use case: fragmented views -> connected analysis.
        enter(".scene-edemo .head", 8.8);
        show(".edemo-before", 8.9, 0.5);
        tl.addLabel("elastic-demo", 9.6);
        hide(".edemo-before", 9.9);
        enter(".edemo-with", 10.1);
        [0, 1, 2, 3].forEach((i) => show(`.es-step-${i}`, 10.4 + i * 0.4, 0.3));
        tl.to(q(".trace-edge"), { stroke: "var(--primary)", strokeWidth: 3, strokeOpacity: 1, duration: 0.5 }, 11.2);
        show(".es-focus", 11.6);
        enter(".scene-edemo .value", 12);
        tl.addLabel("elastic-value", 12.6);
        exit(".scene-edemo .scene-el, .edemo-with", 12.9);
        hide(".es-focus, .inc-ring", 13);
        tl.to(q(".trace-edge, .inc-edge"), neutral, 13);

        // 5. Dynatrace intro: same nodes reconfigure into a dependency map.
        hide(".eco-edge", 13.1);
        nodes.forEach((n) => tl.to(q(`.node-${n.id}`), { x: n.mx - n.x, y: n.my - n.y, duration: 1 }, 13.3));
        tl.to(cam, { scale: 1.12, x: 240, y: 0, duration: 1 }, 13.2);
        tl.to(q(".map-edge"), { autoAlpha: 1, duration: 0.5, stagger: 0.03 }, 14);
        enter(".scene-dyn .head", 13.8);
        tl.addLabel("dyn", 14.6);
        [0, 1, 2, 3, 4].forEach((i) => enter(`.scene-dyn .p${i}`, 14.8 + i * 0.35));
        tl.addLabel("dyn-points", 16.6);
        exit(".scene-dyn .scene-el", 16.9);

        // 6. Dynatrace use case: many alerts -> contextual investigation.
        enter(".scene-ddemo .head", 17.2);
        tl.to(q(".alert-ring"), { autoAlpha: 1, duration: 0.3, stagger: 0.08 }, 17.3);
        show(".ddemo-before", 17.4, 0.5);
        tl.addLabel("dyn-demo", 18.1);
        hide(".alert-ring, .ddemo-before", 18.4);
        enter(".ddemo-with", 18.5);
        show(".dt-step-0, .app-ring", 18.8, 0.3);
        show(".dt-step-1", 19.1, 0.3);
        tl.to(q(".dep-edge"), { stroke: "var(--healthy)", strokeOpacity: 0.8, strokeWidth: 2, duration: 0.4 }, 19.1);
        show(".dt-step-2, .lat-ring", 19.4, 0.3);
        tl.to(q(".lat-edge"), { stroke: "var(--warn)", strokeWidth: 3, strokeOpacity: 1, duration: 0.4 }, 19.4);
        show(".dt-step-3", 19.7, 0.3);
        tl.fromTo(q(".ai-panel"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 19.7);
        show(".dt-step-4, .db-ring", 20.1, 0.3);
        enter(".scene-ddemo .value", 20.4);
        tl.addLabel("dyn-value", 21.1);
        exit(".scene-ddemo .scene-el, .ddemo-with, .ai-panel", 21.4);
        hide(".app-ring, .lat-ring, .db-ring", 21.5);
        tl.to(q(".dep-edge, .lat-edge"), neutral, 21.5);

        // 7. Why connected helps: each "without" line transforms into a "with" line.
        tl.to(q(".net"), { opacity: 0.4, duration: 0.5 }, 21.6);
        enter(".scene-cmp .head", 21.8);
        tl.fromTo(q(".cmp-without"), { autoAlpha: 0, x: reduce ? 0 : -30 }, { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.12 }, 22);
        comparison.rows.forEach((_, i) => {
          tl.to(q(`.cmp-without-${i}`), { autoAlpha: 0.25, duration: 0.3 }, 22.9 + i * 0.3);
          tl.fromTo(q(`.cmp-with-${i}`), { autoAlpha: 0, x: reduce ? 0 : 30 }, { autoAlpha: 1, x: 0, duration: 0.4 }, 22.9 + i * 0.3);
        });
        tl.to(q(".net"), { opacity: 1, duration: 0.6 }, 23.2);
        tl.to(q(".lat-edge"), { stroke: "var(--primary)", strokeWidth: 2.4, strokeOpacity: 1, duration: 0.5 }, 23.4);
        tl.addLabel("compare", 24.3);
        exit(".scene-cmp .scene-el", 24.6);
        tl.to(q(".cmp-with"), { autoAlpha: 0, duration: 0.3 }, 24.6);
        tl.to(q(".lat-edge"), neutral, 24.7);

        // 8. Closing: pull back, two distinct exploration paths.
        tl.to(cam, { scale: 0.78, x: 0, y: -60, duration: 1.2 }, 24.8);
        tl.to(q(".net"), { opacity: 0.35, duration: 0.8 }, 25);
        show(".paths", 25.5, 0.7);
        enter(".scene-closing .scene-el", 25.6);
        tl.fromTo(q(".qr"), { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.5 }, 26.2);
        tl.addLabel("closing", 26.9);
        tl.to({}, { duration: 0.5 });

        const st = tl.scrollTrigger!;
        const total = tl.duration();
        const map: Record<string, number> = {};
        for (const [k, v] of Object.entries(tl.labels)) map[k] = st.start + (v / total) * (st.end - st.start);
        map.opening = 0;
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
    let raf = 0;
    let last = performance.now();
    let holdUntil = 0;
    let next = 0;
    window.scrollTo(0, 0);
    const speed = 900; // px per second between stops
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
          const target = labelsRef.current[stop.label] ?? max;
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
                  d={curve(byId[a], byId[b])}
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
                const A = { x: byId[a].mx, y: byId[a].my };
                const B = { x: byId[b].mx, y: byId[b].my };
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
                  <path key={`cl-${c.key}-${id}`} className="cluster-link" d={`M${byId[id].x},${byId[id].y} L${c.x},${c.y}`} stroke="var(--accent)" strokeOpacity="0.4" strokeDasharray="3 6" />
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
                <text x={hub.x} y={hub.y + 4} textAnchor="middle" fontSize="11" fill="var(--foreground)" fontFamily={mono}>ANALYTICS</text>
                <text x={hub.x} y={hub.y + 58} textAnchor="middle" fontSize="10" fill="var(--muted-foreground)" fontFamily={mono}>logs · metrics · traces</text>
              </g>

              {nodes.map((n) => (
                <g key={n.id} className={`node node-${n.id}`}>
                  {n.id === incidentId && (
                    <>
                      <g className="ring inc-ring">
                        <circle cx={n.x} cy={n.y} r="30" fill="none" stroke="var(--warn)" strokeWidth="2" />
                        <text x={n.x + 36} y={n.y + 44} fontSize="12" fill="var(--warn)" fontFamily={mono}>latency ↑</text>
                      </g>
                      <g className="ring lat-ring">
                        <circle cx={n.x} cy={n.y} r="30" fill="none" stroke="var(--warn)" strokeWidth="2" />
                        <text x={n.x + 36} y={n.y + 44} fontSize="12" fill="var(--warn)" fontFamily={mono}>response time ↑</text>
                      </g>
                    </>
                  )}
                  {n.id === "inventory" && (
                    <>
                      <g className="ring es-focus">
                        <circle cx={n.x} cy={n.y} r="32" fill="none" stroke="var(--primary)" strokeWidth="2.5" />
                        <text x={n.x - 40} y={n.y + 56} fontSize="12" fill="var(--primary)" fontFamily={mono}>slow spans · trace 7c2e…</text>
                      </g>
                      <g className="ring db-ring">
                        <circle cx={n.x} cy={n.y} r="32" fill="none" stroke="var(--error)" strokeWidth="2.5" />
                        <text x={n.x + 38} y={n.y + 6} fontSize="12" fill="var(--error)" fontFamily={mono}>query latency ↑</text>
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

            <g className="paths" fontFamily={mono}>
              <path d="M760,1050 C700,800 420,760 330,560" fill="none" stroke="var(--primary)" strokeWidth="3" />
              <text x="250" y="530" fontSize="22" fill="var(--primary)">ELASTIC</text>
              <path d="M840,1050 C900,800 1180,760 1270,560" fill="none" stroke="var(--healthy)" strokeWidth="3" />
              <text x="1180" y="530" fontSize="22" fill="var(--healthy)">DYNATRACE</text>
            </g>
          </g>
        </svg>
        <div className="stage-vignette pointer-events-none absolute inset-0" />

        {/* 1. Opening */}
        <div className="scene-opening absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="scene-el eyebrow mb-6">{opening.eyebrow}</p>
          <h1 className="scene-el text-5xl font-semibold leading-[0.95] tracking-tight md:text-8xl lg:text-[8.5rem]">
            {opening.headline[0]}
            <br />
            <span className="text-signal">{opening.headline[1]}</span>
          </h1>
          <p className="scene-el mt-8 max-w-2xl text-base text-foreground/85 md:text-xl">{opening.sub}</p>
          <p className="scene-el mt-4 max-w-xl text-sm text-muted-foreground md:text-base">{opening.secondary}</p>
          <div className="scene-el mt-10 flex flex-col items-center gap-3">
            <div className="flex gap-3">
              {opening.offerings.map((o, i) => (
                <span key={o} className={`rounded-full border px-4 py-1.5 font-mono text-xs tracking-widest ${i === 0 ? "border-primary/60 text-primary" : "border-healthy/60 text-healthy"}`}>{o.toUpperCase()}</span>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground">{opening.offeringsNote}</p>
          </div>
          <p className="scene-el eyebrow mt-12">SCROLL TO BEGIN ↓</p>
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

        <ProductScene p={elastic} cls="scene-elastic" onMore={() => openPanel("elastic")} />

        {/* 4. Elastic use case */}
        <DemoText cls="scene-edemo" eyebrow={elasticDemo.eyebrow} scenario={elasticDemo.scenario} value={elasticDemo.value} valueSub={elasticDemo.valueSub} note={elasticDemo.note} />
        <div className="demo-panel edemo-before absolute right-4 top-20 grid w-[min(92vw,26rem)] gap-3 md:right-16 md:top-auto md:bottom-24">
          <p className="eyebrow text-warn">{elasticDemo.beforeTag}</p>
          <div className="grid grid-cols-3 gap-2">
            {["logs-tool", "metrics-tool", "apm-tool"].map((t, i) => (
              <div key={t} className="rounded-lg border bg-card/80 p-2 backdrop-blur" style={{ transform: `rotate(${(i - 1) * 3}deg)` }}>
                <p className="font-mono text-[9px] text-muted-foreground">{t}</p>
                <div className="mt-2 space-y-1">
                  {[0, 1, 2].map((r) => <div key={r} className="h-1.5 rounded bg-muted" style={{ width: `${50 + ((r + i) % 3) * 20}%` }} />)}
                </div>
              </div>
            ))}
          </div>
          <ul className="space-y-1 font-mono text-xs text-muted-foreground">
            {elasticDemo.beforeLabels.map((l) => <li key={l}>· {l}</li>)}
          </ul>
        </div>
        <div className="demo-panel edemo-with absolute right-4 top-20 w-[min(92vw,26rem)] rounded-xl border border-primary/40 bg-card/85 p-5 backdrop-blur md:right-16 md:top-auto md:bottom-24">
          <p className="eyebrow mb-3 text-primary">{elasticDemo.withTag}</p>
          <div className="rounded-md border bg-background/70 px-3 py-2 font-mono text-[11px] text-foreground/90">⌕ {elasticDemo.query}</div>
          <ol className="mt-4 space-y-2">
            {elasticDemo.steps.map((s, i) => (
              <li key={s.k} className={`es-step es-step-${i} flex items-baseline gap-3`}>
                <span className="w-16 shrink-0 font-mono text-[10px] tracking-widest text-primary">{s.k}</span>
                <span className="text-sm">{s.v}</span>
              </li>
            ))}
          </ol>
        </div>

        <ProductScene p={dynatrace} cls="scene-dyn" onMore={() => openPanel("dynatrace")} />

        {/* 6. Dynatrace use case */}
        <DemoText cls="scene-ddemo" eyebrow={dynatraceDemo.eyebrow} scenario={dynatraceDemo.scenario} value={dynatraceDemo.value} note={dynatraceDemo.note} />
        <div className="demo-panel ddemo-before absolute right-4 top-20 w-[min(92vw,20rem)] rounded-xl border border-warn/40 bg-card/80 p-5 backdrop-blur md:right-16 md:top-24">
          <p className="eyebrow mb-3 text-warn">{dynatraceDemo.beforeTag}</p>
          <ul className="space-y-1.5 font-mono text-xs">
            {dynatraceDemo.beforeLabels.map((l) => <li key={l} className="text-warn">⚠ {l}</li>)}
          </ul>
        </div>
        <div className="demo-panel ddemo-with absolute right-4 top-20 w-[min(92vw,20rem)] rounded-xl border border-healthy/40 bg-card/80 p-5 backdrop-blur md:right-16 md:top-24">
          <p className="eyebrow mb-3 text-healthy">{dynatraceDemo.withTag}</p>
          <ol className="space-y-1.5">
            {dynatraceDemo.steps.map((s, i) => (
              <li key={s} className={`dt-step dt-step-${i} flex gap-3 text-sm`}>
                <span className="font-mono text-[10px] text-healthy">0{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>
        <div className="ai-panel absolute bottom-8 right-4 w-[min(92vw,20rem)] rounded-xl border bg-card/90 p-5 backdrop-blur md:bottom-16 md:right-16">
          <p className="eyebrow mb-3">{aiAnalysis.title.toUpperCase()}</p>
          <p className="text-sm font-medium text-warn">{aiAnalysis.finding}</p>
          <p className="mt-2 text-xs text-muted-foreground">{aiAnalysis.confidence}</p>
          <p className="mt-2 font-mono text-[10px] text-muted-foreground">{aiAnalysis.next}</p>
        </div>

        {/* 7. Comparison */}
        <div className="scene-cmp pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6">
          <p className="scene-el head eyebrow mb-4">{comparison.eyebrow}</p>
          <h2 className="scene-el head text-center text-3xl font-semibold tracking-tight md:text-5xl">{comparison.headline}</h2>
          <div className="mt-10 grid w-full max-w-4xl grid-cols-2 gap-x-6 gap-y-4 md:gap-x-16">
            <p className="scene-el head eyebrow text-warn">{comparison.withoutTag}</p>
            <p className="scene-el head eyebrow text-primary">{comparison.withTag}</p>
            {comparison.rows.map((r, i) => (
              <div key={i} className="contents">
                <p className={`cmp-without cmp-without-${i} border-l border-warn/40 pl-3 text-sm text-muted-foreground md:text-base`}>{r.without}</p>
                <p className={`cmp-with cmp-with-${i} border-l-2 border-primary pl-3 text-sm md:text-base`}>{r.with}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Closing */}
        <div className="scene-closing absolute inset-x-0 top-[9%] flex flex-col items-center px-6 text-center">
          <h2 className="scene-el text-4xl font-semibold leading-[1] tracking-tight md:text-7xl">
            {closing.headline[0]} <span className="text-signal">{closing.headline[1]}</span>
          </h2>
          <p className="scene-el mt-5 max-w-xl text-sm text-foreground/80 md:text-lg">{closing.sub}</p>
          <div className="scene-el mt-8 grid w-full max-w-2xl grid-cols-2 gap-4 md:gap-10">
            {closing.options.map((o) => (
              <button
                key={o.id}
                onClick={() => openPanel(o.id)}
                className={`read-more rounded-xl border bg-card/70 p-4 text-left backdrop-blur transition hover:bg-card focus-visible:outline-2 ${o.id === "elastic" ? "border-primary/50" : "border-healthy/50"}`}
              >
                <p className={`font-mono text-sm tracking-widest ${o.id === "elastic" ? "text-primary" : "text-healthy"}`}>{o.name.toUpperCase()} →</p>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">{o.body}</p>
              </button>
            ))}
          </div>
          <div className="qr mt-8 flex flex-col items-center gap-2">
            <QrBox />
            <p className="text-sm font-medium">{qr.title}</p>
            <p className="text-xs text-muted-foreground">{qr.sub}</p>
          </div>
        </div>

        {/* Persistent QR for booth recording (Presentation Mode only) */}
        <div className="present-qr absolute bottom-6 right-6 flex-col items-center gap-1">
          <QrBox small />
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground">SCAN TO EXPLORE</p>
        </div>

        {/* Chrome */}
        <div className="chrome absolute left-6 top-6 eyebrow transition-opacity">STACKOPS</div>
        <div className="chrome absolute right-6 top-5 flex items-center gap-2">
          <SiteMap onJump={jumpTo} onOpen={openPanel} />
          <button
            onClick={() => setPresenting((v) => !v)}
            className="rounded-full border px-4 py-2 font-mono text-xs tracking-widest text-foreground transition hover:border-primary hover:text-primary"
          >
            ▶ PRESENTATION MODE
          </button>
        </div>
        <p className="absolute bottom-4 left-6 max-w-md pr-28 text-[10px] leading-snug text-muted-foreground/70">{disclaimer}</p>
      </section>

      <ReadMorePanel product={panel} onClose={closePanel} />
    </div>
  );
}

function QrBox({ small }: { small?: boolean }) {
  const size = small ? "h-20 w-20" : "h-28 w-28 md:h-32 md:w-32";
  return (
    <div className={`grid ${size} place-items-center rounded-xl border-2 border-dashed border-primary/60 bg-card/70`}>
      <span className="eyebrow text-center text-[9px]">QR CODE<br />PLACEHOLDER</span>
    </div>
  );
}

function DemoText({ cls, eyebrow, scenario, value, valueSub, note }: { cls: string; eyebrow: string; scenario: string; value: string[]; valueSub?: string; note: string }) {
  return (
    <div className={`${cls} pointer-events-none absolute inset-y-0 left-0 flex w-full flex-col justify-end px-6 pb-20 md:w-[46%] md:justify-center md:px-16 md:pb-0`}>
      <p className="scene-el head eyebrow mb-4 text-primary">{eyebrow}</p>
      <h2 className="scene-el head text-3xl font-semibold leading-[1] tracking-tight md:text-5xl">{scenario}</h2>
      <div className="mt-8 md:mt-12">
        <p className="scene-el value text-2xl font-semibold leading-tight md:text-4xl">
          {value.map((v, i) => <span key={v} className={i === value.length - 1 ? "block text-signal" : "block"}>{v}</span>)}
        </p>
        {valueSub && <p className="scene-el value mt-4 max-w-md text-sm text-foreground/80 md:text-base">{valueSub}</p>}
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
      <button
        onClick={onMore}
        className="scene-el p4 read-more pointer-events-auto mt-6 w-fit rounded-full bg-primary px-5 py-2.5 font-mono text-xs tracking-widest text-primary-foreground transition hover:opacity-90"
      >
        READ MORE →
      </button>
    </div>
  );
}
