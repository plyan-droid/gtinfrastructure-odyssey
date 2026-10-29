import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { VideoPlayer } from "@/components/showcase/VideoPlayer";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("Video playback controls", () => {
  function setup() {
    const { container } = render(<VideoPlayer src="/recording.mp4" />);
    const video = container.querySelector("video");
    if (!video) throw new Error("Missing video");
    Object.defineProperty(video, "duration", { configurable: true, value: 51.7 });
    fireEvent.loadedMetadata(video);
    return video;
  }
  it("seeks forward and backwards by ten seconds within the recording", () => {
    const video = setup();
    fireEvent.click(screen.getByRole("button", { name: "Forward 10 seconds" }));
    expect(video.currentTime).toBe(10);
    fireEvent.click(screen.getByRole("button", { name: "Back 10 seconds" }));
    expect(video.currentTime).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: "Back 10 seconds" }));
    expect(video.currentTime).toBe(0);
    video.currentTime = 49;
    fireEvent.timeUpdate(video);
    fireEvent.click(screen.getByRole("button", { name: "Forward 10 seconds" }));
    expect(video.currentTime).toBe(51.7);
  });
  it("seeks using the timeline keyboard controls", () => {
    const video = setup();
    const slider = screen.getByRole("slider", { name: "Video timeline" });
    fireEvent.keyDown(slider, { key: "End" });
    expect(video.currentTime).toBe(51.7);
    fireEvent.keyDown(slider, { key: "Home" });
    expect(video.currentTime).toBe(0);
  });
  it("plays and pauses the actual media element", () => {
    const video = setup();
    const play = vi.spyOn(video, "play").mockResolvedValue(undefined);
    const pause = vi.spyOn(video, "pause").mockImplementation(() => {});
    fireEvent.click(screen.getByRole("button", { name: "Play video" }));
    expect(play).toHaveBeenCalledOnce();
    Object.defineProperty(video, "paused", { configurable: true, value: false });
    fireEvent.play(video);
    fireEvent.click(screen.getByRole("button", { name: "Pause video" }));
    expect(pause).toHaveBeenCalledOnce();
  });
});