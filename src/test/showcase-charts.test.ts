import { describe, expect, it } from "vitest";
import { popupCharts } from "@/content/showcase";

describe("Chart workflow approval boundaries", () => {
  it("requires human approval before SORA implementation", () => {
    const chart = popupCharts["sora"]?.find(c => c.id === "sora-workflow");
    expect(chart?.steps?.[1]?.requiresApproval).toBe(true);
    expect(chart?.steps?.[2]?.requiresApproval).not.toBe(true);
  });
  it("ends SODA analysis with a human decision", () => {
    const chart = popupCharts["soda"]?.find(c => c.id === "soda-engine");
    expect(chart?.steps?.at(-1)?.requiresApproval).toBe(true);
  });
});
describe("Slide-derived popup charts", () => {
  const find = (popup: string, id: string) => popupCharts[popup]?.find(c => c.id === id);
  it("places each new chart in its intended popup", () => {
    const expected: [string, string][] = [["foundations", "stackops-hub"], ["sora", "sora-how"], ["otel", "otel-problem"], ["soda", "soda-report"], ["dynatrace", "dt-stages"], ["gcc", "gccaas-onboarding"], ["subscriptions", "subscription-models"]];
    for (const [popup, id] of expected) expect(find(popup, id)).toBeDefined();
  });
  it("keeps the 4 Golden Signals in the Capabilities popup", () => {
    expect(find("capabilities", "golden-signals")?.items?.map(i => i.title)).toEqual(["Latency", "Traffic", "Errors", "Saturation"]);
  });
  it("keeps the unified tracing pillars in the Investigation popup", () => {
    expect(find("investigation", "tracing-pillars")?.center?.title).toContain("Whole-of-Government");
  });
  it("marks the SODA report as illustrative sample data", () => {
    expect(find("soda", "soda-report")?.report?.synthetic).toBe(true);
  });
  it("uses the S/A/B/C grade scale with the slide thresholds", () => {
    expect(find("soda", "soda-engine")?.grades?.map(g => `${g.grade} ${g.range}`)).toEqual(["S 85+", "A 65 to 84", "B 40 to 64", "C 0 to 39"]);
  });
  it("adds an Elastic column to every subscription row", () => {
    const t = find("subscriptions", "subscription-models");
    expect(t?.columns).toHaveLength(4);
    expect(t?.rows?.every(r => r.length === 4 && r[3])).toBe(true);
  });
  it("never mentions the 7% discount or source notes", () => {
    const text = JSON.stringify(popupCharts);
    expect(text).not.toMatch(/7%/);
    expect(text).not.toMatch(/Source:/);
  });
});
