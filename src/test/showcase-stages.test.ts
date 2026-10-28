import { describe, expect, it } from "vitest";
import {
  storyStages,
  stageAtTime,
  STAGE_DURATION,
  presentationStops,
} from "@/components/showcase/story-stages";
import { intelligenceApproval, siteMap, details } from "@/content/showcase";

describe("Content-aware reversible story", () => {
  it("visits the required progression in order", () => {
    expect([...new Set(storyStages.map((s) => s.scene))]).toEqual([
      "opening",
      "challenge",
      "foundations",
      "capabilities",
      "action",
      "tools",
      "otel",
      "soda",
      "intelligence",
      "customers",
      "options",
      "closing",
    ]);
  });
  it("gives logs, metrics and traces their own visual stages", () => {
    expect(
      storyStages.filter((s) => s.scene === "capabilities").map((s) => [s.point, s.visual]),
    ).toEqual([
      [0, "logs"],
      [1, "metrics"],
      [2, "trace"],
      [3, "context"],
    ]);
  });
  it("reviews the SORA plan before deploying and monitoring", () => {
    expect(storyStages.filter((s) => s.scene === "tools").map((s) => s.visual)).toEqual([
      "discover",
      "approval",
      "deploy",
      "telemetry",
    ]);
  });
  it("ends SODA at a decision summary rather than deploying changes", () => {
    expect(storyStages.filter((s) => s.scene === "soda").map((s) => s.visual)).toEqual([
      "utilisation",
      "storage",
      "recommendation",
      "decision",
    ]);
  });
  it("does not highlight a possible cause before the dependency trace", () => {
    expect(storyStages.filter((s) => s.scene === "action").map((s) => s.visual)).toEqual([
      "slowdown",
      "signals",
      "trace",
      "cause",
    ]);
  });
  it("restores the identical content stage when time moves backward", () => {
    for (let i = storyStages.length - 1; i >= 0; i--)
      expect(stageAtTime(i * STAGE_DURATION + 0.5)).toEqual(storyStages[i]);
    expect(stageAtTime(0)?.scene).toBe("opening");
  });
  it("uses the twelve navigation labels from the master brief", () => {
    expect(siteMap.map((entry) => entry.label)).toEqual([
      "opening",
      "challenge",
      "foundations",
      "capabilities",
      "action",
      "tools",
      "otel",
      "soda",
      "intelligence",
      "customers",
      "options",
      "closing",
    ]);
    expect(storyStages.filter((stage) => stage.label).map((stage) => stage.label)).toEqual(
      siteMap.map((entry) => entry.label),
    );
  });
  it("keeps AI availability pending and excludes it from public playback", () => {
    expect(intelligenceApproval.availability).toBe("pending-product-owner-validation");
    expect(intelligenceApproval.publicPresentationApproved).toBe(false);
    expect(presentationStops.some((stop) => stop.scene === "intelligence")).toBe(false);
  });
  it("plays the selected booth narrative in sixty seconds", () => {
    expect(presentationStops.reduce((total, stop) => total + stop.seconds, 0)).toBe(60);
    expect(presentationStops.at(-1)?.scene).toBe("closing");
  });
  it("retains all supplied detailed stories plus the subscription popup", () => {
    expect(Object.keys(details).sort()).toEqual(
      [
        "foundations",
        "capabilities",
        "investigation",
        "sora",
        "otel",
        "soda",
        "intelligence",
        "cft",
        "ship-hats",
        "hdb",
        "htx",
        "apex",
        "elastic",
        "dynatrace",
        "subscriptions",
        "glance",
      ].sort(),
    );
  });
  it("changes stage exactly at each shared boundary in both directions", () => {
    for (let i = 1; i < storyStages.length; i++) {
      expect(stageAtTime(i * STAGE_DURATION - 0.001)).toEqual(storyStages[i - 1]);
      expect(stageAtTime(i * STAGE_DURATION)).toEqual(storyStages[i]);
    }
  });
});
