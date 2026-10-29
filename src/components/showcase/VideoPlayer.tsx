import { useEffect, useRef, useState } from "react";
import { Maximize, Minimize, Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

function timeLabel(seconds: number) {
  const total = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

export function VideoPlayer({ src, poster }: { src: string; poster?: string | undefined }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const updateFullscreen = () => setFullscreen(document.fullscreenElement === playerRef.current);
    document.addEventListener("fullscreenchange", updateFullscreen);
    return () => document.removeEventListener("fullscreenchange", updateFullscreen);
  }, []);

  const seek = (next: number) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    video.currentTime = Math.min(duration, Math.max(0, next));
    setTime(video.currentTime);
  };
  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) { video.pause(); return; }
    try {
      setError(false);
      if (video.ended) seek(0);
      await video.play();
    } catch { setError(true); }
  };
  const toggleFullscreen = async () => {
    const player = playerRef.current;
    const video = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (player?.requestFullscreen) await player.requestFullscreen();
      else video?.webkitEnterFullscreen?.();
    } catch { /* Browsers can reject fullscreen without affecting playback. */ }
  };

  return <div ref={playerRef} className="video-chart">
    <video ref={videoRef} playsInline preload="metadata" poster={poster} src={src}
      onClick={() => void togglePlayback()}
      onLoadedMetadata={event => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
      onDurationChange={event => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
      onTimeUpdate={event => setTime(event.currentTarget.currentTime)}
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}
      onError={() => setError(true)} />
    <div className="video-controls" role="group" aria-label="Video controls">
      <Slider className="video-timeline" value={[time]} min={0} max={duration || 1} step={0.1}
        disabled={!duration} onValueChange={values => seek(values[0] ?? 0)}
        aria-label="Video timeline" aria-valuetext={`${timeLabel(time)} of ${timeLabel(duration)}`} />
      <div className="video-buttons">
        <Button type="button" variant="ghost" size="icon" title={playing ? "Pause" : "Play"}
          aria-label={playing ? "Pause video" : "Play video"} onClick={() => void togglePlayback()}>
          {playing ? <Pause /> : <Play />}
        </Button>
        <Button type="button" variant="ghost" size="icon" title="Back 10 seconds" aria-label="Back 10 seconds" disabled={!duration} onClick={() => seek(time - 10)}><RotateCcw /></Button>
        <Button type="button" variant="ghost" size="icon" title="Forward 10 seconds" aria-label="Forward 10 seconds" disabled={!duration} onClick={() => seek(time + 10)}><RotateCw /></Button>
        <span className="video-time">{timeLabel(time)} / {timeLabel(duration)}</span>
        <Button type="button" className="ml-auto" variant="ghost" size="icon" title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
          aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"} onClick={() => void toggleFullscreen()}>
          {fullscreen ? <Minimize /> : <Maximize />}
        </Button>
      </div>
      {error && <p className="text-sm text-destructive" role="alert">Video could not play. Please try again.</p>}
    </div>
  </div>;
}