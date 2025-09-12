"use client";
import { useEffect } from "react";
import { useScrollContext } from "../src/utils/context/ScrollContext";
import {
  scrollInView,
  addNewUrl,
  updateSectionClasses,
} from "../src/utils/fnScrollUtils";
import { sections } from "@assets/data/sections";
import addPassive from "@utils/addPassive";

interface SectionPosition {
  top: number;
  height: number;
}

export const useScrollAnchors = () => {
  const { setActiveSection } = useScrollContext();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const worker = new Worker(
      new URL("../public/workers/scrollWorker.js", import.meta.url),
    );

    let positions: Record<string, SectionPosition> = {};

    const updatePositions = () => {
      positions = sections.reduce<Record<string, SectionPosition>>(
        (acc, { id }) => {
          const section = document.getElementById(id);
          if (section) {
            acc[id] = {
              top: section.offsetTop,
              height: section.offsetHeight,
            };
          }
          return acc;
        },
        {},
      );
      worker.postMessage({ sections, positions });
    };

    const handleScroll = () => {
      worker.postMessage({ scrollY: window.scrollY });
    };

    worker.onmessage = (event) => {
      const { currentSectionId } = event.data;
      if (currentSectionId) {
        scrollInView(sections);
        addNewUrl(currentSectionId);
        updateSectionClasses(sections, setActiveSection);
      }
    };

    updatePositions();
    handleScroll();
    window.addEventListener("scroll", handleScroll, addPassive());
    window.addEventListener("resize", updatePositions);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updatePositions);
      worker.terminate();
    };
  }, [setActiveSection]);
};
