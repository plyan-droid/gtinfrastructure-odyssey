import { describe, expect, it } from "vitest";
import { popupCharts } from "@/content/showcase";

describe("Chart workflow approval boundaries", () => {
  it("requires human approval before SORA implementation", () => {
    const chart = popupCharts.sora.find(c => c.id === "sora-workflow");
    expect(chart?.steps?.[1].requiresApproval).toBe(true);
    expect(chart?.steps?.[2].requiresApproval).not.toBe(true);
  });
  it("ends SODA analysis with a human decision", () => {
    const chart = popupCharts.soda.find(c => c.id === "soda-engine");
    expect(chart?.steps?.at(-1)?.requiresApproval).toBe(true);
  });
});