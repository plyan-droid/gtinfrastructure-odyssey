import { describe, expect, it } from "vitest";
import { storyStages, stageAtTime, STAGE_DURATION } from "@/components/showcase/story-stages";

describe("Content-aware reversible story", () => {
  it("visits the required progression in order", () => {
    expect([...new Set(storyStages.map(s => s.scene))]).toEqual(["opening", "challenge", "foundations", "capabilities", "action", "tools", "otel", "soda", "customers", "options", "closing"]);
  });
  it("gives logs, metrics and traces their own visual stages", () => {
    expect(storyStages.filter(s => s.scene === "capabilities" && s.point === 1).map(s => s.visual)).toEqual(["logs", "metrics", "trace"]);
  });
  it("reviews the SORA plan before deploying and monitoring", () => {
    expect(storyStages.filter(s => s.scene === "tools").map(s => s.visual)).toEqual(["discover", "approval", "deploy", "telemetry"]);
  });
  it("ends SODA at a decision summary rather than deploying changes", () => {
    expect(storyStages.filter(s => s.scene === "soda").map(s => s.visual)).toEqual(["utilisation", "storage", "recommendation", "decision"]);
  });
  it("does not highlight a possible cause before the dependency trace", () => {
    expect(storyStages.filter(s => s.scene === "action").map(s => s.visual)).toEqual(["slowdown", "logs", "metrics", "trace", "cause"]);
  });
  it("restores the identical content stage when time moves backward", () => {
    for (let i = storyStages.length - 1; i >= 0; i--) expect(stageAtTime(i * STAGE_DURATION + 0.5)).toEqual(storyStages[i]);
    expect(stageAtTime(0)?.scene).toBe("opening");
  });
});