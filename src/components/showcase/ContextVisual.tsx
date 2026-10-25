import { diagram, visualCopy } from "@/content/showcase";

export function ContextVisual() {
  return <div className="context-visual pointer-events-none absolute" aria-hidden="true">
    <svg viewBox="0 0 520 310" className="h-full w-full">
      {Object.entries(visualCopy).map(([key, copy]) => <g key={key} className={`visual-layer visual-${key}`}>
        <text x="24" y="28" fill="var(--healthy)" fontSize="14" fontFamily="var(--font-mono)">{copy.title}</text>
        {copy.rows.map((row, i) => <text key={row} x="24" y={62 + i * 25} fill="var(--foreground)" fontSize="12" fontFamily="var(--font-mono)">{row}</text>)}
        {["metrics", "utilisation"].includes(key) && <g fill="none" stroke="var(--healthy)"><path d="M24 145V245H480" strokeOpacity="0.3"/><path className="draw-line" d="M24 220 L80 210 L130 218 L180 192 L235 196 L290 160 L350 170 L410 135 L480 125" strokeWidth="3" pathLength="1"/></g>}
        {["trace", "context", "dependencies", "telemetry", "instrument"].includes(key) && <g>
          <path className="draw-line" d="M50 190H455" pathLength="1" fill="none" stroke="var(--healthy)" strokeWidth="2"/>
          {[50,185,320,455].map((x,i) => <g key={x}><circle cx={x} cy="190" r="12" fill="var(--card)" stroke="var(--healthy)"/><text x={x} y="226" textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">{["mobile", "gateway", "catalog", "inventory"][i]}</text></g>)}
          <circle className="request-dot" cx="50" cy="190" r="4" fill="var(--accent)"/>
        </g>}
        {["baseline", "deploy", "instrument"].includes(key) && <g fill="none" stroke="var(--healthy)" strokeWidth="2">{[0,1,2].map(i => <path key={i} className="draw-line" d={`M${50+i*130} 170l10 10 22-28`} pathLength="1"/>)}</g>}
        {key === "discover" && <g fill="none" stroke="var(--warn)"><circle cx="265" cy="195" r="50"/><path className="scan-line" d="M150 140V245" strokeWidth="2"/><circle cx="325" cy="215" r="10" strokeDasharray="3 3"/></g>}
        {["approval", "decision", "recommendation"].includes(key) && <g fill="none" stroke="var(--accent)"><path d="M24 155H470M24 190H390M24 225H440" strokeOpacity="0.5"/><circle cx="465" cy="220" r="15"/><path d="M465 210V224M465 230v2"/></g>}
        {key === "storage" && <g fill="var(--card)" stroke="var(--violet)">{[0,1,2].map(i => <rect key={i} x={24+i*145} y="152" width="120" height={50+i*15} rx="4"/>)}</g>}
      </g>)}
      <text x="24" y="290" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-mono)">{diagram.synthetic}</text>
    </svg>
  </div>;
}