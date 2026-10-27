import { diagram, visualCopy } from "@/content/showcase";
import { nodes, ecoEdges, byId, curve, tracePath } from "./network";

// Network marks share the real persistent topology, not a second miniature map.
export function NetworkVisuals() {
  return <g aria-hidden="true">{Object.keys(visualCopy).map(key => <g key={key} className={`network-layer network-${key}`}>
    {nodes.filter(n => !["web", "mobile"].includes(n.id)).map(n => <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
      {["baseline", "deploy", "instrument", "repeated", "automation"].includes(key) && <g><rect x="-44" y="-44" width="88" height="88" rx="6" fill="none" stroke="var(--healthy)" strokeDasharray={key === "repeated" ? "5 5" : undefined}/><path className="draw-line" d="M-12 -32l8 8 16-18" pathLength="1" fill="none" stroke="var(--healthy)" strokeWidth="2"/></g>}
      {["discover", "analyse"].includes(key) && <g><circle className="scan-ring" r="48" fill="none" stroke="var(--warn)" strokeDasharray="4 8"/><circle cx="32" cy="-32" r="5" fill="var(--warn)"/></g>}
      {["metrics", "signals", "utilisation"].includes(key) && n.id === "catalog" && <g transform="translate(38 -80)"><path d="M0 0V90H170" fill="none" stroke="var(--muted-foreground)"/><path className="draw-line" pathLength="1" d="M0 75L30 68 55 72 80 50 105 54 135 23 170 10" fill="none" stroke="var(--healthy)" strokeWidth="3"/></g>}
      {["logs", "signals", "fragmented"].includes(key) && ["catalog", "inventory", "gateway"].includes(n.id) && <g transform="translate(35 5)">{[0,1,2].map(i => <path key={i} d={`M0 ${i*13}h${70+i*10}`} stroke="var(--healthy)" strokeOpacity={0.9-i*0.2} strokeWidth="3"/>)}</g>}
      {key === "storage" && n.id === "inventory" && <g transform="translate(35 -60)">{[0,1,2].map(i => <rect key={i} x={i*28} width="18" y={i*12} height={65-i*12} fill="var(--violet)" fillOpacity="0.5"/>)}</g>}
      {["approval", "decision", "guidance", "recommendation"].includes(key) && n.id === "inventory" && <g><path d="M28 -30h90v65H28z" fill="var(--card)" stroke="var(--accent)"/><path d="M40 -15h64M40 0h48M40 15h56" stroke="var(--accent)"/></g>}
    </g>)}
    {["trace", "dependencies", "context", "telemetry", "reveal"].includes(key) && ecoEdges.map(([a,b]) => { const A=byId[a], B=byId[b]; if (!A || !B) return null; const active=key === "reveal" || key === "telemetry" || (tracePath.includes(a) && tracePath.includes(b)); return active ? <path key={a+b} className="network-signal" d={curve(A,B)} fill="none" stroke="var(--healthy)" strokeWidth="3" strokeDasharray="7 22"/> : null; })}
    {key === "benchmark" && ["cloudA","cloudB"].map((id,i) => { const n=byId[id]; return n ? <g key={id} transform={`translate(${n.x-115} ${n.y-85})`}><rect width="230" height="160" rx="8" fill="none" stroke="var(--violet)" strokeDasharray="4 6"/>{[0,1,2].map(j=><rect key={j} x={20+j*58} y={55+j*8} width="34" height={65-j*8} fill="var(--healthy)" fillOpacity="0.3"/>)}<text x="20" y="25" fill="var(--muted-foreground)" fontSize="12">{i === 0 ? diagram.environmentA : diagram.environmentB}</text></g> : null; })}
    {["learning","improve","automation"].includes(key) && <ellipse className="feedback-loop" cx="900" cy="520" rx="260" ry="170" fill="none" stroke="var(--primary)" strokeWidth="2" strokeDasharray="100 15"/>}
  </g>)}</g>;
}
export function ContextVisual() {
  return <div className="context-visual pointer-events-none absolute" aria-hidden="true"><svg viewBox="0 0 520 160" className="h-full w-full">{Object.entries(visualCopy).map(([key,copy]) => <g key={key} className={`visual-layer visual-${key}`}><text x="12" y="28" fill="var(--healthy)" fontSize="14" fontFamily="var(--font-mono)">{copy.title}</text>{copy.rows.map((row,i)=><text key={row} x="12" y={58+i*24} fill="var(--foreground)" fontSize="11" fontFamily="var(--font-mono)">{row}</text>)}</g>)}<text x="12" y="150" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-mono)">{diagram.synthetic}</text></svg></div>;
}
