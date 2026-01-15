"use client";

import { usePlayerStore } from "@/app/(lib)/store/PlayerStore";
import { useEffect, useCallback } from "react";

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tagName = target.tagName.toLowerCase();
  const editable = target.getAttribute("contenteditable");
  return (
    editable ||
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select"
  );
}

export default function KeyboardShortcuts() {
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const setProgress = usePlayerStore((state) => state.setProgress);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;

      switch (event.code) {
        case "Space":
          event.preventDefault();
          togglePlay();
          break;
        case "ArrowUp":
          event.preventDefault();
          setVolume(Math.min(usePlayerStore.getState().volume + 5, 100));
          break;
        case "ArrowDown":
          event.preventDefault();
          setVolume(Math.max(usePlayerStore.getState().volume - 5, 0));
          break;
        case "ArrowRight":
          event.preventDefault();
          setProgress(Math.min(usePlayerStore.getState().progress + 5, 100));
          break;
        case "ArrowLeft":
          event.preventDefault();
          setProgress(Math.max(usePlayerStore.getState().progress - 5, 0));
          break;
      }
    },
    [togglePlay, setVolume, setProgress]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return null;
}