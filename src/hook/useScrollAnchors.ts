"use client";
import { useEffect, useRef } from "react";
import { useScrollContext } from "../utils/context/ScrollContext";
import { sections } from "../assets/data/sections";
import addPassive from "../utils/addPassive";

type SectionPosition = { top: number; height: number };

export const useScrollAnchors = () => {
  const { setActiveSection } = useScrollContext();
  const lastActiveIdRef = useRef<string>("");
  const positionsRef = useRef<Record<string, SectionPosition>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    const worker = new Worker(
      new URL("/public/workers/scrollWorker.js", import.meta.url)
    );

    const ro = new ResizeObserver(() => measure());
    const observed = new Set<Element>();

    const measure = () => {
      const scrollY = window.scrollY;
      const next: Record<string, SectionPosition> = {};
      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          next[id] = { top: rect.top + scrollY, height: rect.height };
          if (!observed.has(el)) {
            ro.observe(el);
            observed.add(el);
          }
        }
      });
      positionsRef.current = next;
      worker.postMessage({ sections, positions: next });
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        worker.postMessage({ scrollY: window.scrollY });
      });
    };

    worker.onmessage = (event) => {
      const { currentSectionId } = event.data as { currentSectionId?: string };
      if (!currentSectionId || currentSectionId === lastActiveIdRef.current) return;

      // URL (éviter re-writes inutiles)
      if (window.location.hash !== `#${currentSectionId}`) {
        window.history.replaceState(null, "", `#${currentSectionId}`);
      }

      // Classe : ne toucher qu’à l’ancien et au nouveau
      const prev =
        lastActiveIdRef.current &&
        document.getElementById(lastActiveIdRef.current);
      const next = document.getElementById(currentSectionId);
      if (prev) prev.classList.remove("active-section");
      if (next) next.classList.add("active-section");

      lastActiveIdRef.current = currentSectionId;
      setActiveSection(currentSectionId);
    };

    measure(); // positions initiales
    onScroll(); // init section active
    window.addEventListener("scroll", onScroll, addPassive());
    window.addEventListener("resize", measure, addPassive());

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      ro.disconnect();
      worker.terminate();
    };
  }, [setActiveSection]);
};
