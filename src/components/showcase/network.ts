import { serviceLabels } from "@/content/showcase";
// Fictional three-tier ecosystem (1600×900 world). Never a depiction of real agency architecture.
export type Tier = "access" | "services" | "data";
export type Node = {
  id: string;
  label: string;
  kind: "app" | "svc" | "db" | "cloud" | "queue";
  tier: Tier;
  x: number;
  y: number;
};

export const CARD = { w: 216, h: 60 };
export const CLOUD = { w: 260, h: 200 };

export const nodes: Node[] = [
  { id: "web", label: serviceLabels.web, kind: "app", tier: "access", x: 330, y: 250 },
  { id: "mobile", label: serviceLabels.mobile, kind: "app", tier: "access", x: 330, y: 450 },
  { id: "checkout", label: serviceLabels.checkout, kind: "svc", tier: "access", x: 330, y: 650 },
  { id: "gateway", label: serviceLabels.gateway, kind: "svc", tier: "services", x: 640, y: 450 },
  { id: "ai", label: serviceLabels.ai, kind: "svc", tier: "services", x: 1145, y: 330 },
  { id: "catalog", label: serviceLabels.catalog, kind: "svc", tier: "services", x: 900, y: 330 },
  { id: "orders", label: serviceLabels.orders, kind: "queue", tier: "services", x: 900, y: 535 },
  { id: "payments", label: serviceLabels.payments, kind: "svc", tier: "services", x: 1110, y: 640 },
  { id: "inventory", label: serviceLabels.inventory, kind: "db", tier: "data", x: 1400, y: 330 },
  { id: "cloudA", label: serviceLabels.cloudA, kind: "cloud", tier: "data", x: 1400, y: 306 },
  { id: "cloudB", label: serviceLabels.cloudB, kind: "cloud", tier: "data", x: 1400, y: 590 },
];

export const byId = Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<string, Node>;

// Plausible request and data flows between the tiers.
export const ecoEdges: [string, string][] = [
  ["web", "gateway"],
  ["mobile", "gateway"],
  ["checkout", "gateway"],
  ["gateway", "catalog"],
  ["catalog", "orders"],
  ["orders", "payments"],
  ["catalog", "ai"],
  ["ai", "inventory"],
  ["payments", "cloudB"],
];

export const incidentId = "catalog";
export const tracePath = ["web", "gateway", "catalog", "ai", "inventory"];

type P = { x: number; y: number };
function half(n: Node) {
  return n.kind === "cloud" ? { w: CLOUD.w / 2, h: CLOUD.h / 2 } : { w: CARD.w / 2, h: CARD.h / 2 };
}
/** Smooth orthogonal link from card edge to card edge, so lines never run under labels. */
export function link(a: Node, b: Node) {
  const ha = half(a);
  const hb = half(b);
  const vertical = Math.abs(a.x - b.x) < 40;
  let s: P, e: P;
  if (vertical) {
    const dir = b.y > a.y ? 1 : -1;
    s = { x: a.x, y: a.y + dir * ha.h };
    e = { x: b.x, y: b.y - dir * hb.h };
    const my = (s.y + e.y) / 2;
    return `M${s.x},${s.y} C${s.x},${my} ${e.x},${my} ${e.x},${e.y}`;
  }
  const dir = b.x > a.x ? 1 : -1;
  s = { x: a.x + dir * ha.w, y: a.y };
  e = { x: b.x - dir * hb.w, y: b.y };
  const mx = (s.x + e.x) / 2;
  return `M${s.x},${s.y} C${mx},${s.y} ${mx},${e.y} ${e.x},${e.y}`;
}
