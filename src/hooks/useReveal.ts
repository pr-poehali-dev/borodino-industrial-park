import { useEffect, useRef } from "react";

export function useReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Reveal on scroll
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));

    // Cinematic parallax
    const handleParallax = () => {
      document.querySelectorAll<HTMLElement>(".cinematic-img").forEach((img) => {
        const section = img.closest(".cinematic-section");
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const progress = -rect.top / window.innerHeight;
        img.style.transform = `translateY(${progress * 60}px) scale(1.08)`;
      });
    };
    window.addEventListener("scroll", handleParallax, { passive: true });
    handleParallax();

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", handleParallax);
    };
  }, []);

  return ref;
}
