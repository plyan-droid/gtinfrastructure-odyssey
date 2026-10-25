export type StoryStage = { scene: string; key: string; visual: string; focus: string[]; label?: string | undefined; point?: number | undefined };
const stage = (scene: string, key: string, visual: string, focus: string[], point?: number, label?: string): StoryStage => ({ scene, key, visual, focus, point, label });
export const storyStages: StoryStage[] = [
  stage("opening", "overview", "none", [], undefined, "opening"),
  stage("challenge", "fragmented", "fragmented", ["web", "catalog", "payments"], 0, "challenge"),
  stage("challenge", "complexity", "dependencies", ["web", "gateway", "checkout", "catalog", "inventory"], 1),
  stage("challenge", "investigation", "slowdown", ["catalog", "inventory"], 2),
  stage("challenge", "visibility", "context", ["mobile", "gateway", "catalog", "inventory"], 3),
  stage("foundations", "standards", "baseline", ["gateway", "catalog", "inventory"], 0, "foundations"),
  stage("foundations", "governance", "access", ["gateway", "catalog"], 1),
  stage("capabilities", "health", "context", ["mobile", "gateway", "catalog", "inventory"], 0, "capabilities"),
  stage("capabilities", "logs", "logs", ["catalog"], 1),
  stage("capabilities", "metrics", "metrics", ["catalog"], 1),
  stage("capabilities", "traces", "trace", ["mobile", "gateway", "catalog", "inventory"], 1),
  stage("capabilities", "performance", "metrics", ["catalog", "inventory"], 2),
  stage("capabilities", "investigate", "slowdown", ["catalog", "inventory"], 3),
  stage("capabilities", "share", "access", ["gateway", "catalog", "inventory"], 4),
  stage("action", "slow", "slowdown", ["catalog"], undefined, "action"),
  stage("action", "events", "logs", ["catalog"], 0),
  stage("action", "performance", "metrics", ["catalog"], 1),
  stage("action", "dependencies", "trace", ["mobile", "gateway", "catalog", "inventory"], 2),
  stage("action", "cause", "cause", ["catalog", "inventory"], 3),
  stage("tools", "discover", "discover", ["cloudA", "cloudB", "catalog"], 0, "tools"),
  stage("tools", "review", "approval", ["catalog", "inventory"], 1),
  stage("tools", "deploy", "deploy", ["catalog", "inventory"], 2),
  stage("tools", "monitor", "telemetry", ["catalog", "inventory"], 3),
  stage("otel", "request", "trace", ["mobile", "gateway", "catalog", "inventory"], 0, "otel"),
  stage("otel", "instrument", "instrument", ["gateway", "catalog", "inventory"], 1),
  stage("otel", "telemetry", "telemetry", ["gateway", "catalog", "inventory"], 2),
  stage("otel", "context", "context", ["mobile", "gateway", "catalog", "inventory"], 3),
  stage("soda", "utilisation", "utilisation", ["catalog", "inventory"], 0, "soda"),
  stage("soda", "storage", "storage", ["inventory"], 1),
  stage("soda", "recommend", "recommendation", ["inventory"], 2),
  stage("soda", "decide", "decision", ["inventory"], 3),
  stage("customers", "impact", "none", [], undefined, "customers"),
  stage("options", "elastic", "search", ["catalog", "inventory"], 0, "options"),
  stage("options", "dynatrace", "dependencies", ["web", "gateway", "catalog", "inventory"], 1),
  stage("closing", "explore", "none", [], undefined, "closing"),
];
export const STAGE_DURATION = 1.8;
export function stageAtTime(time: number) {
  return storyStages[Math.min(storyStages.length - 1, Math.max(0, Math.floor(time / STAGE_DURATION)))];
}