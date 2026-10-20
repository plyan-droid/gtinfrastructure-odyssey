import { useEffect, useRef, useState } from "react";
import { aiAnalysis, closing, disclaimer, dynatrace, elastic, opening, type Product } from "@/content/showcase";
import { byId, curve, ecoEdges, latencyChain, mapEdges, nodes, tracePath } from "./network";
import { ReadMorePanel } from "./ReadMorePanel";

const SCROLL_LEN = 9000; // px of scroll mapped to the full story
const HOLDS = ["opening", "elastic", "elastic-p3", "dyn", "dyn-ai", "closing"];

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

export function Showcase() {
  const root = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState<Product | null>(null);
  const [presenting, setPresenting] = useState(false);
  const holdsRef = useRef<number[]>([]);

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
        gsap.set(q(".scene-el, .to-hub, .hub, .map-edge, .ai-panel, .paths, .qr, .err-ring, .lat-ring"), { autoAlpha: 0 });
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
        const enter = (sel: string, at: number | string) =>
          tl.fromTo(q(sel), { autoAlpha: 0, y: reduce ? 0 : 60 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" }, at);
        const exit = (sel: string, at: number | string) =>
          tl.to(q(sel), { autoAlpha: 0, y: reduce ? 0 : -70, duration: 0.5, stagger: 0.06, ease: "power2.in" }, at);

        // Opening: drift + follow signal inward
        tl.addLabel("opening", 0.3);
        tl.to(cam, { scale: 1.08, x: -20, duration: 1.2 }, 0.2);
        exit(".scene-opening .scene-el", 1);

        // Elastic
        tl.to(cam, { scale: 1.22, x: 210, y: 10, duration: 1.2 }, 1.3);
        tl.to(q(".hub"), { autoAlpha: 1, duration: 0.6 }, 1.8);
        tl.to(q(".to-hub"), { autoAlpha: 1, duration: 0.6, stagger: 0.05 }, 2);
        enter(".scene-elastic .head", 1.8);
        tl.addLabel("elastic", 2.8);
        enter(".scene-elastic .p0", 3);
        enter(".scene-elastic .p1", 3.8);
        tl.to(q(".trace-edge"), { stroke: "var(--primary)", strokeWidth: 3, strokeOpacity: 1, duration: 0.5 }, 3.9);
        enter(".scene-elastic .p2", 4.6);
        tl.to(q(".err-ring"), { autoAlpha: 1, duration: 0.4 }, 4.7);
        tl.addLabel("elastic-p3", 5.3);
        exit(".scene-elastic .scene-el", 5.9);

        // Dynatrace: same nodes reconfigure into dependency map
        tl.to(q(".err-ring, .hub, .to-hub"), { autoAlpha: 0, duration: 0.4 }, 6);
        tl.to(q(".trace-edge"), { stroke: "var(--foreground)", strokeWidth: 1.2, strokeOpacity: 0.22, duration: 0.4 }, 6);
        tl.to(q(".eco-edge"), { autoAlpha: 0, duration: 0.4 }, 6.1);
        nodes.forEach((n) => tl.to(q(`.node-${n.id}`), { x: n.mx - n.x, y: n.my - n.y, duration: 1 }, 6.3));
        tl.to(cam, { scale: 1.15, x: 240, y: 0, duration: 1.2 }, 6.2);
        tl.to(q(".map-edge"), { autoAlpha: 1, duration: 0.5, stagger: 0.04 }, 7);
        enter(".scene-dyn .head", 6.8);
        tl.addLabel("dyn", 7.8);
        enter(".scene-dyn .p0", 8);
        tl.to(q(".lat-ring"), { autoAlpha: 1, duration: 0.4 }, 8.6);
        enter(".scene-dyn .p1", 8.8);
        tl.to(q(".lat-edge"), { stroke: "var(--warn)", strokeWidth: 3, strokeOpacity: 1, duration: 0.5 }, 9);
        tl.fromTo(q(".ai-panel"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 9.4);
        enter(".scene-dyn .p2", 9.8);
        tl.addLabel("dyn-ai", 10.4);
        exit(".scene-dyn .scene-el, .ai-panel", 11);

        // Closing: pull back, two distinct solution paths
        tl.to(q(".lat-ring"), { autoAlpha: 0, duration: 0.4 }, 11.2);
        tl.to(q(".lat-edge"), { stroke: "var(--foreground)", strokeWidth: 1.2, strokeOpacity: 0.22, duration: 0.4 }, 11.2);
        tl.to(cam, { scale: 0.78, x: 0, y: -60, duration: 1.4 }, 11.2);
        tl.to(q(".net"), { opacity: 0.35, duration: 1 }, 11.4);
        tl.to(q(".paths"), { autoAlpha: 1, duration: 0.8 }, 12);
        enter(".scene-closing .scene-el", 12.2);
        tl.fromTo(q(".qr"), { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.6 }, 12.8);
        tl.addLabel("closing", 13.6);
        tl.to({}, { duration: 0.6 });

        const st = tl.scrollTrigger!;
        const total = tl.duration();
        holdsRef.current = HOLDS.map((l) => st.start + ((tl.labels[l] ?? 0) / total) * (st.end - st.start));
      }, root);
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  // Presentation Mode: auto-drive the same scroll timeline; never opens panels.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("present") === "1") setPresenting(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("present-mode", presenting);
    if (!presenting) return;
    setPanel(null);
    let raf = 0;
    let last = performance.now();
    let holdUntil = 0;
    let nextHold = 0;
    window.scrollTo(0, 0);
    const speed = 420; // px per second
    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      const holds = holdsRef.current;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (t < holdUntil) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const y = window.scrollY;
      if (y >= max - 2) {
        window.scrollTo(0, 0);
        nextHold = 0;
        holdUntil = t + 1500;
      } else {
        const target = holds[nextHold];
        let ny = y + speed * dt;
        if (target !== undefined && ny >= target) {
          ny = target;
          nextHold++;
          holdUntil = t + (nextHold === holds.length ? 5000 : 3000);
        }
        window.scrollTo(0, ny);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const stop = () => setPresenting(false);
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
              {/* ecosystem edges */}
              {ecoEdges.map(([a, b]) => {
                const trace = inPath(tracePath, a, b);
                return (
                  <path
                    key={edgeKey(a, b)}
                    id={`e-${edgeKey(a, b)}`}
                    d={curve(byId[a], byId[b])}
                    className={`eco-edge ${trace ? "trace-edge" : ""}`}
                    fill="none"
                    stroke="var(--foreground)"
                    strokeOpacity="0.22"
                    strokeWidth="1.2"
                  />
                );
              })}
              {ecoEdges.slice(0, 8).map(([a, b], i) => (
                <circle key={`s${i}`} r="3" fill={i % 2 ? "var(--accent)" : "var(--primary)"} className="signal eco-edge">
                  <animateMotion dur={`${3 + (i % 3)}s`} begin={`${i * 0.4}s`} repeatCount="indefinite">
                    <mpath href={`#e-${edgeKey(a, b)}`} />
                  </animateMotion>
                </circle>
              ))}

              {/* dependency map edges (target layout) */}
              {mapEdges.map(([a, b]) => {
                const A = { x: byId[a].mx, y: byId[a].my };
                const B = { x: byId[b].mx, y: byId[b].my };
                const lat = inPath(latencyChain, a, b);
                return (
                  <path
                    key={`m${edgeKey(a, b)}`}
                    d={`M${A.x},${A.y} C${(A.x + B.x) / 2},${A.y} ${(A.x + B.x) / 2},${B.y} ${B.x},${B.y}`}
                    className={`map-edge ${lat ? "lat-edge" : ""}`}
                    fill="none"
                    stroke="var(--foreground)"
                    strokeOpacity="0.22"
                    strokeWidth="1.2"
                  />
                );
              })}

              {/* Elastic unified analytics hub */}
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
                <text x={hub.x} y={hub.y + 4} textAnchor="middle" fontSize="11" fill="var(--foreground)" fontFamily="var(--font-mono)">ANALYTICS</text>
                <text x={hub.x} y={hub.y + 58} textAnchor="middle" fontSize="10" fill="var(--muted-foreground)" fontFamily="var(--font-mono)">logs · metrics · traces</text>
              </g>

              {/* nodes */}
              {nodes.map((n) => (
                <g key={n.id} className={`node node-${n.id}`}>
                  {n.id === "checkout" && (
                    <g className="err-ring">
                      <circle cx={n.x} cy={n.y} r="30" fill="none" stroke="var(--error)" strokeWidth="2" />
                      <text x={n.x + 36} y={n.y - 22} fontSize="12" fill="var(--error)" fontFamily="var(--font-mono)">ERR 500 · trace a91f…</text>
                    </g>
                  )}
                  {n.id === "catalog" && (
                    <g className="lat-ring">
                      <circle cx={n.x} cy={n.y} r="30" fill="none" stroke="var(--warn)" strokeWidth="2" />
                      <text x={n.x + 36} y={n.y + 40} fontSize="12" fill="var(--warn)" fontFamily="var(--font-mono)">p95 1.8s ↑</text>
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
                  <text x={n.x} y={n.y + (n.kind === "cloud" ? 38 : 34)} textAnchor="middle" fontSize="12" fill="var(--muted-foreground)" fontFamily="var(--font-mono)">{n.label}</text>
                </g>
              ))}
            </g>

            {/* closing: two distinct solution paths, not connected to each other */}
            <g className="paths" fontFamily="var(--font-mono)">
              <path d="M760,1050 C700,800 420,760 330,560" fill="none" stroke="var(--primary)" strokeWidth="3" />
              <text x="250" y="530" fontSize="22" fill="var(--primary)">ELASTIC</text>
              <text x="250" y="556" fontSize="13" fill="var(--muted-foreground)">search · logs · metrics · traces</text>
              <path d="M840,1050 C900,800 1180,760 1270,560" fill="none" stroke="var(--healthy)" strokeWidth="3" />
              <text x="1180" y="530" fontSize="22" fill="var(--healthy)">DYNATRACE</text>
              <text x="1180" y="556" fontSize="13" fill="var(--muted-foreground)">APM · dependencies · AI-assisted</text>
            </g>
          </g>
        </svg>
        <div className="stage-vignette pointer-events-none absolute inset-0" />

        {/* Opening */}
        <div className="scene-opening absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="scene-el eyebrow mb-6">STACKOPS · INTERACTIVE SHOWCASE</p>
          <h1 className="scene-el text-5xl font-semibold leading-[0.95] tracking-tight md:text-8xl lg:text-[9rem]">
            {opening.headline[0]}
            <br />
            <span className="text-signal">{opening.headline[1]}</span>
          </h1>
          <p className="scene-el mt-8 max-w-xl text-base text-muted-foreground md:text-xl">{opening.sub}</p>
          <p className="scene-el eyebrow mt-16">SCROLL TO BEGIN ↓</p>
        </div>

        <ProductScene p={elastic} cls="scene-elastic" onMore={() => setPanel(elastic)} />
        <ProductScene p={dynatrace} cls="scene-dyn" onMore={() => setPanel(dynatrace)} />

        <div className="ai-panel absolute bottom-8 right-6 w-80 rounded-xl border bg-card/85 p-5 backdrop-blur md:bottom-16 md:right-16">
          <p className="eyebrow mb-3">{aiAnalysis.title.toUpperCase()}</p>
          <p className="text-sm font-medium text-warn">{aiAnalysis.finding}</p>
          <p className="mt-2 text-xs text-muted-foreground">{aiAnalysis.confidence}</p>
          <p className="mt-2 text-xs text-muted-foreground">{aiAnalysis.next}</p>
        </div>

        {/* Closing */}
        <div className="scene-closing absolute inset-x-0 top-[12%] flex flex-col items-center px-6 text-center">
          <h2 className="scene-el text-4xl font-semibold leading-[1] tracking-tight md:text-7xl">
            {closing.headline[0]}
            <br />
            <span className="text-signal">{closing.headline[1]}</span>
          </h2>
          <p className="scene-el mt-6 max-w-xl text-muted-foreground md:text-lg">{closing.sub}</p>
          <div className="qr mt-10 flex flex-col items-center gap-3">
            <div className="grid h-36 w-36 place-items-center rounded-xl border-2 border-dashed border-primary/60 bg-card/70 md:h-44 md:w-44">
              <span className="eyebrow text-center">QR CODE<br />PLACEHOLDER</span>
            </div>
            <p className="font-mono text-sm tracking-widest">{closing.qrLabel.toUpperCase()}</p>
          </div>
        </div>

        {/* Chrome */}
        <div className="chrome absolute left-6 top-6 eyebrow transition-opacity">STACKOPS</div>
        <button
          onClick={() => setPresenting((v) => !v)}
          className="chrome absolute right-6 top-5 rounded-full border px-4 py-2 font-mono text-xs tracking-widest text-foreground transition hover:border-primary hover:text-primary"
        >
          ▶ PRESENTATION MODE
        </button>
        <p className="chrome absolute bottom-4 left-6 max-w-md text-[10px] leading-snug text-muted-foreground/70">{disclaimer}</p>
      </section>

      <ReadMorePanel product={panel} onClose={() => setPanel(null)} />
    </div>
  );
}

function ProductScene({ p, cls, onMore }: { p: Product; cls: string; onMore: () => void }) {
  return (
    <div className={`${cls} pointer-events-none absolute inset-y-0 left-0 flex w-full flex-col justify-end px-6 pb-20 md:w-[46%] md:justify-center md:px-16 md:pb-0`}>
      <p className="scene-el head eyebrow mb-5 text-primary">{p.eyebrow}</p>
      <h2 className="scene-el head text-4xl font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
        {p.headline.map((l, i) => (
          <span key={l} className={i === p.headline.length - 1 ? "block text-signal" : "block"}>{l}</span>
        ))}
      </h2>
      <p className="scene-el head mt-5 max-w-md text-sm text-muted-foreground md:text-lg">{p.description}</p>
      <ol className="mt-6 space-y-3 md:mt-10 md:space-y-5">
        {p.points.map((pt, i) => (
          <li key={pt.n} className={`scene-el p${i} flex gap-4 border-l border-primary/40 pl-4`}>
            <span className="font-mono text-xs text-primary">{pt.n}</span>
            <div>
              <p className="text-sm font-medium md:text-lg">{pt.title}</p>
              <p className="hidden text-sm text-muted-foreground md:block">{pt.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <button
        onClick={onMore}
        className="scene-el p2 read-more pointer-events-auto mt-6 w-fit rounded-full bg-primary px-5 py-2.5 font-mono text-xs tracking-widest text-primary-foreground transition hover:opacity-90 md:mt-10"
      >
        READ MORE →
      </button>
    </div>
  );
}
