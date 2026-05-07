import { useEffect, useRef, useState, useCallback } from "react";

export function usePresentationScroll(totalSlides: number) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const lockRef = useRef(false);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      if (lockRef.current) return;
      if (index < 0 || index >= totalSlides) return;
      const dir = index > current ? "down" : "up";
      setDirection(dir);
      setAnimating(true);
      lockRef.current = true;
      setCurrent(index);
      setTimeout(() => {
        setAnimating(false);
        lockRef.current = false;
      }, 800);
    },
    [current, totalSlides]
  );

  const next = useCallback(() => goTo(current + 1), [goTo, current]);
  const prev = useCallback(() => goTo(current - 1), [goTo, current]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (lockRef.current) return;
      if (e.deltaY > 30) next();
      else if (e.deltaY < -30) prev();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); next(); }
      if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); prev(); }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
    };

    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      const dt = Date.now() - touchStartTime.current;
      if (Math.abs(dy) > 40 && dt < 500) {
        if (dy > 0) next();
        else prev();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [next, prev]);

  return { current, goTo, animating, direction };
}
