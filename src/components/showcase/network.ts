import { serviceLabels } from "@/content/showcase";
// Fictional ecosystem. (x,y) = ecosystem layout, (mx,my) = dependency-map layout.
export type Node = {
  id: string;
  label: string;
  kind: "app" | "svc" | "db" | "cloud" | "queue";
  x: number;
  y: number;
  mx: number;
  my: number;
};

export const nodes: Node[] = [
  { id: "web", label: serviceLabels.web, kind: "app", x: 260, y: 250, mx: 300, my: 300 },
  { id: "mobile", label: serviceLabels.mobile, kind: "app", x: 230, y: 580, mx: 300, my: 560 },
  { id: "gateway", label: serviceLabels.gateway, kind: "svc", x: 520, y: 410, mx: 560, my: 430 },
  { id: "checkout", label: serviceLabels.checkout, kind: "svc", x: 790, y: 230, mx: 820, my: 300 },
  { id: "catalog", label: serviceLabels.catalog, kind: "svc", x: 800, y: 620, mx: 820, my: 560 },
  {
    id: "payments",
    label: serviceLabels.payments,
    kind: "svc",
    x: 1080,
    y: 170,
    mx: 1080,
    my: 220,
  },
  { id: "orders", label: serviceLabels.orders, kind: "queue", x: 1090, y: 430, mx: 1080, my: 430 },
  {
    id: "inventory",
    label: serviceLabels.inventory,
    kind: "db",
    x: 1100,
    y: 690,
    mx: 1080,
    my: 640,
  },
  { id: "cloudA", label: serviceLabels.cloudA, kind: "cloud", x: 1370, y: 290, mx: 1330, my: 320 },
  { id: "cloudB", label: serviceLabels.cloudB, kind: "cloud", x: 1370, y: 600, mx: 1330, my: 560 },
];

export const byId = Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<string, Node>;

export const ecoEdges: [string, string][] = [
  ["web", "gateway"],
  ["mobile", "gateway"],
  ["gateway", "checkout"],
  ["gateway", "catalog"],
  ["orders", "payments"],
  ["gateway", "checkout"],
  ["catalog", "inventory"],
  ["payments", "inventory"],
  ["payments", "cloudA"],
  ["orders", "cloudA"],
  ["inventory", "cloudB"],
  ["catalog", "orders"],
];

export const mapEdges: [string, string][] = [
  ["web", "gateway"],
  ["mobile", "gateway"],
  ["gateway", "checkout"],
  ["gateway", "catalog"],
  ["orders", "payments"],
  ["gateway", "checkout"],
  ["catalog", "inventory"],
  ["catalog", "orders"],
  ["payments", "cloudA"],
  ["inventory", "cloudB"],
];

// The single fictional incident used across the whole story.
export const incidentId = "catalog";
// Elastic demo: trace followed through the ecosystem layout.
export const tracePath = ["web", "gateway", "catalog", "inventory"];
// Dynatrace demo: latency chain in the dependency-map layout.
export const latencyChain = ["gateway", "catalog", "inventory"];
// Nodes that raise warnings in the Dynatrace "before" view.
export const alertNodes = ["web", "gateway", "checkout", "catalog", "orders"];
// Challenge scene: where each signal type clusters (SVG coords).
export const clusters = [
  { key: "LOGS", x: 330, y: 200, from: ["web", "mobile", "gateway"] },
  { key: "METRICS", x: 1240, y: 200, from: ["payments", "checkout", "cloudA"] },
  { key: "TRACES", x: 1000, y: 780, from: ["catalog", "inventory", "orders"] },
];

export function curve(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - (b.x - a.x) * 0.12;
  return `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`;
}
