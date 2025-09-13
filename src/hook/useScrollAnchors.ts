// src/hooks/useScrollAnchors.ts
"use client";

import { useEffect } from "react";
import { useScrollContext } from "../utils/context/ScrollContext";
import {
    scrollInView,
    addNewUrl,
    updateSectionClasses,
    forEachSectionEl,
    getPos,
    setCurrentSectionId,
} from "../utils/fnScrollUtils";
import type { SectionPosition } from "../utils/fnScrollUtils";
import { sections } from "@assets/data/sections";
import addPassive from "@utils/addPassive";

// Hook principal
export const useScrollAnchors = () => {
    const { setActiveSection } = useScrollContext();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const worker = new Worker("/workers/scrollWorker.js");
        let positions: Record<string, SectionPosition> = {};

        // Recalcule les positions (compact + lisible)
        const updatePositions = () => {
            const next: Record<string, SectionPosition> = {};
            forEachSectionEl(sections, (id, el) => {
                next[id] = getPos(el);
            });
            positions = next;
            worker.postMessage({ sections, positions });
        };

        const handleScroll = () => {
            worker.postMessage({ scrollY: window.scrollY });
        };

        worker.onmessage = (
            event: MessageEvent<{ currentSectionId?: string }>
        ) => {
            const { currentSectionId } = event.data || {};

            if (currentSectionId) {
                // Utilise directement l'ID du worker (évite un parcours DOM)
                setCurrentSectionId(currentSectionId);
                addNewUrl(currentSectionId);
                updateSectionClasses(sections, setActiveSection);
            } else {
                // Fallback local (au cas où le worker ne renvoie pas d'ID)
                scrollInView(sections);
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
