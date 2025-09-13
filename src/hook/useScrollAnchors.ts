// src/hooks/useScrollAnchors.ts
"use client";

import { useEffect } from "react";
import { useScrollContext } from "../utils/context/ScrollContext";
import {
    computePositions,
    postPositions,
    postScrollY,
    onScrollWorkerMessage,
    addWindowListeners,
} from "../utils/fnScrollUtils";
import type { SectionPosition } from "../utils/fnScrollUtils";
import { sections } from "@assets/data/sections";
import addPassive from "@utils/addPassive";

export const useScrollAnchors = () => {
    const { setActiveSection } = useScrollContext();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const worker = new Worker("/workers/scrollWorker.js");
        let positions: Record<string, SectionPosition> = {};

        const updatePositions = (_evt?: Event) => {
            positions = computePositions(sections);
            postPositions(worker, sections, positions);
        };

        const handleScroll = (_evt?: Event) => {
            postScrollY(worker);
        };

        // Handler factorisé
        worker.onmessage = onScrollWorkerMessage(sections, setActiveSection);

        updatePositions();
        handleScroll();

        // Listeners factorisés (+ passive pour scroll)
        const off = addWindowListeners([
            ["scroll", handleScroll as EventListener, addPassive()],
            ["resize", updatePositions as EventListener],
        ]);

        return () => {
            off();
            worker.terminate();
        };
    }, [setActiveSection]);
};
