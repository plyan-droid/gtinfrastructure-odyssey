// Fictional ecosystem. (x,y) = ecosystem layout, (mx,my) = dependency-map layout.
export type Node = { id: string; label: string; kind: "app" | "svc" | "db" | "cloud" | "queue"; x: number; y: number; mx: number; my: number };

export const nodes: Node[] = [
  { id: "web", label: "web-portal", kind: "app", x: 260, y: 250, mx: 300, my: 300 },
  { id: "mobile", label: "mobile-api", kind: "app", x: 230, y: 580, mx: 300, my: 560 },
  { id: "gateway", label: "edge-gateway", kind: "svc", x: 520, y: 410, mx: 560, my: 430 },
  { id: "checkout", label: "checkout-svc", kind: "svc", x: 790, y: 230, mx: 820, my: 300 },
  { id: "catalog", label: "catalog-svc", kind: "svc", x: 800, y: 620, mx: 820, my: 560 },
  { id: "payments", label: "payments-svc", kind: "svc", x: 1080, y: 170, mx: 1080, my: 220 },
  { id: "orders", label: "orders-queue", kind: "queue", x: 1090, y: 430, mx: 1080, my: 430 },
  { id: "inventory", label: "inventory-db", kind: "db", x: 1100, y: 690, mx: 1080, my: 640 },
  { id: "cloudA", label: "cloud-north", kind: "cloud", x: 1370, y: 290, mx: 1330, my: 320 },
  { id: "cloudB", label: "cloud-south", kind: "cloud", x: 1370, y: 600, mx: 1330, my: 560 },
];

export const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

export const ecoEdges: [string, string][] = [
  ["web", "gateway"], ["mobile", "gateway"], ["gateway", "checkout"], ["gateway", "catalog"],
  ["checkout", "payments"], ["checkout", "orders"], ["catalog", "inventory"], ["orders", "inventory"],
  ["payments", "cloudA"], ["orders", "cloudA"], ["inventory", "cloudB"], ["catalog", "orders"],
];

export const mapEdges: [string, string][] = [
  ["web", "gateway"], ["mobile", "gateway"], ["gateway", "checkout"], ["gateway", "catalog"],
  ["checkout", "payments"], ["checkout", "orders"], ["catalog", "inventory"], ["catalog", "orders"],
  ["payments", "cloudA"], ["inventory", "cloudB"],
];

export const tracePath = ["web", "gateway", "checkout", "payments"];
export const latencyChain = ["gateway", "catalog", "inventory"];

export function curve(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - (b.x - a.x) * 0.12;
  return `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`;
}
