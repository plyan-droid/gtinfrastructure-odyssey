import { diagram, mapCopy, visualCopy } from "@/content/showcase";
import { nodes, ecoEdges, byId, link, tracePath, CARD, CLOUD, type Node } from "./network";

const mono = "var(--font-mono)";
const kindColor: Record<string, string> = {
  app: "var(--healthy)",
  svc: "var(--foreground)",
  db: "var(--violet)",
  cloud: "var(--muted-foreground)",
  queue: "var(--accent)",
};
const edgeKey = (a: string, b: string) => `${a}-${b}`;
const n = (id: string) => byId[id] as Node;

/** Persistent three-tier topology with the StackOps observability layer wrapped around it. */
export function TopologyMap() {
  const services = nodes.filter((x) => x.kind !== "cloud");
  return (
    <g className="net opening-network">
      {/* Tier bands */}
      <g className="tier-bands" fontFamily={mono}>
        {mapCopy.tiers.map((t, i) => (
          <text
            key={t}
            x={[330, 870, 1400][i]}
            y={88}
            textAnchor="middle"
            fontSize="20"
            letterSpacing="0"
            fill="var(--foreground)"
          >
            {t}
          </text>
        ))}
        {[490, 1232].map((x) => (
          <path
            key={x}
            d={`M${x} 96V760`}
            stroke="var(--foreground)"
            strokeOpacity="0.07"
            strokeDasharray="2 8"
          />
        ))}
      </g>

      {/* StackOps observability layer: frame, bus and sensor taps on every service */}
      <g className="obs-layer">
        <rect
          x="200"
          y="44"
          width="1360"
          height="730"
          rx="28"
          fill="none"
          stroke="var(--primary)"
          strokeOpacity="0.35"
          strokeDasharray="1 7"
          strokeLinecap="round"
        />
        <path d="M240 746H1520" stroke="var(--primary)" strokeOpacity="0.45" />
        <path className="obs-pulse" d="M240 746H1520" stroke="var(--primary)" strokeWidth="2" />
        <text
          x="880"
          y="728"
          textAnchor="middle"
          fontSize="18"
          fontWeight="600"
          letterSpacing="6"
          fill="var(--primary)"
          fontFamily={mono}
        >
          {mapCopy.layer}
        </text>
        {services.map((s) => (
          <g key={s.id} className={`obs-sensor sensor-${s.id}`}>
            <path
              d={`M${s.x} ${s.y + CARD.h / 2 + 4}V746`}
              stroke="var(--primary)"
              strokeOpacity="0.18"
              strokeDasharray="2 5"
            />
            <circle cx={s.x} cy={s.y + CARD.h / 2 + 4} r="3" fill="var(--primary)" />
            <circle cx={s.x} cy="746" r="2.5" fill="var(--primary)" />
          </g>
        ))}
      </g>

      {/* Cloud environments as logical boundaries */}
      {nodes
        .filter((c) => c.kind === "cloud")
        .map((c) => (
          <g key={c.id} className={`node node-${c.id}`}>
            <rect
              x={c.x - CLOUD.w / 2}
              y={c.y - CLOUD.h / 2}
              width={CLOUD.w}
              height={CLOUD.h}
              rx="18"
              fill="var(--foreground)"
              fillOpacity="0.015"
              stroke="var(--muted-foreground)"
              strokeOpacity="0.45"
              strokeDasharray="6 6"
            />
            <text
              x={c.x - CLOUD.w / 2 + 16}
              y={c.y - CLOUD.h / 2 + 24}
              fontSize="17"
              letterSpacing="0"
              fill="var(--foreground)"
              fontFamily={mono}
            >
              {c.label.toUpperCase()}
            </text>
          </g>
        ))}
      {/* Supporting resources inside Cloud Environment B */}
      <g className="node node-support">
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={1340 + i * 44}
            y="600"
            width="32"
            height="40"
            rx="5"
            fill="var(--card)"
            stroke="var(--violet)"
            strokeOpacity="0.55"
          />
        ))}
        <text x="1400" y="664" textAnchor="middle" fontSize="15" fill="var(--foreground)" fontFamily="var(--font-display)">
          {mapCopy.support}
        </text>
      </g>

      {ecoEdges.map(([a, b]) => (
        <path
          key={edgeKey(a, b)}
          id={`e-${edgeKey(a, b)}`}
          d={link(n(a), n(b))}
          className="eco-edge"
          fill="none"
          stroke="var(--healthy)"
          strokeOpacity="0.5"
          strokeWidth="1.2"
        />
      ))}
      {/* Ambient request pulses along the persistent flows */}
      <g className="flow-pulses" fill="none" stroke="var(--healthy)" strokeWidth="2">
        {ecoEdges.map(([a, b], i) => (
          <path
            key={edgeKey(a, b)}
            d={link(n(a), n(b))}
            className="flow-pulse"
            style={{ animationDelay: `${-i * 0.7}s` }}
          />
        ))}
      </g>

      {services.map((s) => (
        <g key={s.id} className={`node node-${s.id}`}>
          {s.id === "catalog" && (
            <rect
              className="ring inc-ring"
              x={s.x - CARD.w / 2 - 8}
              y={s.y - CARD.h / 2 - 8}
              width={CARD.w + 16}
              height={CARD.h + 16}
              rx="16"
              fill="none"
              stroke="var(--warn)"
              strokeWidth="1.5"
            />
          )}
          {s.id === "inventory" && (
            <rect
              className="ring db-ring"
              x={s.x - CARD.w / 2 - 8}
              y={s.y - CARD.h / 2 - 8}
              width={CARD.w + 16}
              height={CARD.h + 16}
              rx="16"
              fill="none"
              stroke="var(--error)"
              strokeWidth="1.5"
            />
          )}
          <rect
            x={s.x - CARD.w / 2}
            y={s.y - CARD.h / 2}
            width={CARD.w}
            height={CARD.h}
            rx="12"
            fill="var(--card)"
            fillOpacity="0.92"
            stroke={kindColor[s.kind]}
            strokeOpacity="0.75"
          />
          <circle className="status-dot" cx={s.x - CARD.w / 2 + 18} cy={s.y} r="4" fill={kindColor[s.kind]} />
          <text
            className="node-name"
            x={s.x - CARD.w / 2 + 32}
            y={s.y + 6}
            fontSize={s.label.length > 15 ? "18" : "19"}
            fill="var(--foreground)"
            fontFamily="var(--font-display)"
          >
            {s.label}
          </text>
        </g>
      ))}
    </g>
  );
}

type Slot = { x: number; y: number; from: [number, number]; to: [number, number]; via?: [number, number] };
const slots: Record<string, Slot> = {
  cat: { x: 1030, y: 118, from: [1008, 330], to: [1060, 278] },
  inv: { x: 1010, y: 124, from: [1250, 244], to: [1400, 302] },
  low: { x: 880, y: 694, from: [1200, 720], to: [1290, 690] },
};
const slotFor: Record<string, keyof typeof slots> = {
  dependencies: "cat", slowdown: "cat", repeated: "cat", baseline: "cat", automation: "cat",
  context: "cat", learning: "cat", logs: "cat", metrics: "cat", signals: "cat", trace: "cat",
  instrument: "cat", analyse: "cat", guidance: "cat", improve: "cat", search: "cat",
  cause: "inv", approval: "inv", deploy: "inv", telemetry: "inv", utilisation: "inv",
  storage: "inv", recommendation: "inv", decision: "inv",
  discover: "low", benchmark: "low",
};
const graphic: Record<string, "spark" | "warn" | "bars" | "log" | "check"> = {
  metrics: "spark", utilisation: "spark", slowdown: "warn", storage: "bars", benchmark: "bars",
  logs: "log", signals: "log", baseline: "check", deploy: "check", instrument: "check",
  approval: "check", decision: "check", recommendation: "check", guidance: "check",
};
const markNodes: Record<string, string[]> = {
  baseline: ["gateway", "catalog", "inventory"],
  deploy: ["catalog", "inventory"],
  instrument: ["gateway", "catalog", "inventory"],
};
const signalKeys = ["reveal", "trace", "dependencies", "telemetry", "context"];

function Graphic({ kind, rows }: { kind: string | undefined; rows: string[] }) {
  if (kind === "spark" || kind === "warn")
    return (
      <svg viewBox="0 0 260 54" className="hud-chart">
        <path d="M0 53H260" stroke="var(--muted-foreground)" strokeOpacity="0.35" />
        <path
          className="draw-line"
          pathLength="1"
          d={kind === "warn" ? "M0 44L40 42 80 43 120 40 150 36 180 22 210 12 260 6" : "M0 40L35 34 65 38 100 24 130 28 165 16 200 20 260 8"}
          fill="none"
          stroke={kind === "warn" ? "var(--warn)" : "var(--healthy)"}
          strokeWidth="2.5"
        />
      </svg>
    );
  if (kind === "bars")
    return (
      <svg viewBox="0 0 260 54" className="hud-chart">
        {[46, 30, 38, 18, 26].map((h, i) => (
          <rect key={i} x={i * 54} y={54 - h} width="34" height={h} rx="3" fill="var(--violet)" fillOpacity={0.35 + i * 0.1} />
        ))}
      </svg>
    );
  return (
    <ul className={kind === "log" ? "hud-log" : "hud-rows"}>
      {rows.map((r, i) => (
        <li key={r}>
          {kind === "check" && <span className={i === rows.length - 1 ? "hud-tick" : "hud-tick done"} />}
          {r}
        </li>
      ))}
    </ul>
  );
}

/** One contextual layer per visual state; the timeline shows exactly one at a time. */
export function NetworkVisuals() {
  return (
    <g aria-hidden="true">
      {Object.entries(visualCopy).map(([key, copy]) => {
        const slot = slots[slotFor[key] ?? ""];
        const kind = graphic[key];
        return (
          <g key={key} className={`network-layer network-${key}`}>
            {signalKeys.includes(key) &&
              ecoEdges.map(([a, b]) => {
                const on =
                  key === "reveal" || key === "telemetry" || (tracePath.includes(a) && tracePath.includes(b));
                return on ? (
                  <path
                    key={a + b}
                    className="network-signal"
                    d={link(n(a), n(b))}
                    fill="none"
                    stroke={key === "telemetry" ? "var(--primary)" : "var(--healthy)"}
                    strokeWidth="3"
                    strokeDasharray="6 26"
                  />
                ) : null;
              })}
            {(markNodes[key] ?? []).map((id) => (
              <g key={id} transform={`translate(${n(id).x + CARD.w / 2 - 18} ${n(id).y - CARD.h / 2 - 10})`}>
                <circle r="11" fill="var(--background)" stroke="var(--healthy)" />
                <path d="M-5 0l3.5 3.5 6.5-7" fill="none" stroke="var(--healthy)" strokeWidth="2" />
              </g>
            ))}
            {key === "fragmented" &&
              ["web", "catalog", "inventory"].map((id, i) => (
                <foreignObject key={id} x={n(id).x - 70} y={n(id).y - 74} width="140" height="34">
                  <div className={`hud-chip chip-${i}`}>{diagram.fragmented[i]}</div>
                </foreignObject>
              ))}
            {["discover", "benchmark"].includes(key) &&
              ["cloudA", "cloudB"].map((id) => (
                <rect
                  key={id}
                  className="scan-ring"
                  x={n(id).x - CLOUD.w / 2 - 10}
                  y={n(id).y - CLOUD.h / 2 - 10}
                  width={CLOUD.w + 20}
                  height={CLOUD.h + 20}
                  rx="24"
                  fill="none"
                  stroke={key === "discover" ? "var(--warn)" : "var(--violet)"}
                  strokeDasharray="4 10"
                />
              ))}
            {slot && (
              <>
                <path
                  d={
                    slot.via
                      ? `M${slot.from[0]} ${slot.from[1]}L${slot.via[0]} ${slot.via[1]}L${slot.to[0]} ${slot.to[1]}`
                      : `M${slot.from[0]} ${slot.from[1]}L${slot.to[0]} ${slot.to[1]}`
                  }
                  stroke="var(--primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx={slot.from[0]} cy={slot.from[1]} r="4" fill="var(--primary)" />
                <circle cx={slot.to[0]} cy={slot.to[1]} r="4.5" fill="var(--primary)" />
                <foreignObject x={slot.x} y={slot.y} width="380" height="160">
                  <div className="hud-panel">
                    <p className="hud-title">
                      <span className={kind === "warn" ? "hud-dot warn" : "hud-dot"} />
                      {copy.title}
                    </p>
                    <Graphic kind={kind} rows={copy.rows} />
                    {(kind === "spark" || kind === "warn" || kind === "bars") && (
                      <p className="hud-caption">{copy.rows[0]}</p>
                    )}
                  </div>
                </foreignObject>
              </>
            )}
          </g>
        );
      })}
    </g>
  );
}
