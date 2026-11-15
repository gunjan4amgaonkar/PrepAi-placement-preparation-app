import { useEffect, useRef, useState } from "react";

export function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function formatTime(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

// Countdown timer. onDone runs once when the time reaches zero.
export function useCountdown(initialSeconds, onDone) {
  const [total, setTotal] = useState(initialSeconds);
  const [left, setLeft] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  });

  useEffect(() => {
    if (!running) return undefined;
    const id = setInterval(() => {
      setLeft((value) => {
        if (value <= 1) {
          clearInterval(id);
          setRunning(false);
          if (doneRef.current) setTimeout(() => doneRef.current(), 0);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  return {
    left,
    total,
    running,
    elapsed: total - left,
    start: () => setRunning(true),
    pause: () => setRunning(false),
    reset: (seconds) => {
      const next = seconds ?? total;
      setRunning(false);
      setTotal(next);
      setLeft(next);
    },
  };
}
