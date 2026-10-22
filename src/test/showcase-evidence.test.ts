import { describe, expect, it } from "vitest";
import { customerStories, modules, presentationStops, presentationSpeed } from "@/content/showcase";

function evidence(id: string) {
  const story = customerStories.find(s => s.id === id);
  if (!story) throw new Error(`Missing story: ${id}`);
  return story.evidence;
}

describe("Stakeholder evidence and availability rules", () => {
  it("keeps all five official stories", () => {
    expect(customerStories.map(s => s.id).sort()).toEqual(["apex", "cft", "hdb", "htx", "ship-hats"]);
  });
  it("keeps CFT's 1500 workflow threshold", () => { expect(evidence("cft").workflows).toBe(1500); });
  it("keeps CFT's 75 percent reported efficiency improvement", () => { expect(evidence("cft").improvementPercent).toBe(75); });
  it("keeps CFT's 2–3 hour baseline and 30 minute handling result", () => {
    expect(evidence("cft").baselineHours).toEqual([2, 3]); expect(evidence("cft").afterMinutes).toBe(30);
  });
  it("keeps SHIP-HATS' 75 percent recovery reduction", () => { expect(evidence("ship-hats").improvementPercent).toBe(75); });
  it("keeps SHIP-HATS' two hour baseline and under 30 minute recovery", () => {
    expect(evidence("ship-hats").baselineHours).toEqual([2]); expect(evidence("ship-hats").underMinutes).toBe(30);
  });
  it("keeps APEX's monthly log threshold at 90 million", () => { expect(evidence("apex").logsPerMonth).toBe(90000000); });
  it("keeps HDB compliance expansion planned", () => { expect(evidence("hdb").complianceStatus).toBe("planned"); });
  it("does not attach quantitative outcomes to HTX", () => { expect(evidence("htx")).toEqual({ quantitativeOutcome: false }); });
  it("introduces approved StackOps supporting tools", () => { expect(modules.sora.enabled).toBe(true); expect(modules.soda.enabled).toBe(true); });
  it("budgets approximately 60 seconds using the same scroll journey", () => {
    const duration = 16000 / presentationSpeed + presentationStops.reduce((sum, stop) => sum + stop.hold / 1000, 0);
    expect(duration).toBeGreaterThan(55); expect(duration).toBeLessThan(65);
  });
});