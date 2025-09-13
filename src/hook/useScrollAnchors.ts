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
import { requestIdle } from "@utils/idle";

export const useScrollAnchors = () => {
    const { setActiveSection } = useScrollContext();

    useEffect(() => {
        if (typeof window === "undefined") return;

        // Création paresseuse du worker (au premier idle / premier scroll)
        let w: Worker | null = null;
        let positions: Record<string, SectionPosition> = {};

        const ensureWorker = () =>
            (w ??= new Worker("/workers/scrollWorker.js"));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const updatePositions = (_evt?: Event) => {
            const worker = ensureWorker();
            positions = computePositions(sections);
            postPositions(worker, sections, positions);
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const handleScroll = (_evt?: Event) => {
            if (!w) return; // pas d'allocation / pas de post tant que non nécessaire
            postScrollY(w);
        };

        const attachWorkerHandler = () => {
            if (!w) return;
            w.onmessage = onScrollWorkerMessage(sections, setActiveSection);
        };

        // Listeners légers dès le départ
        const off = addWindowListeners([
            ["scroll", handleScroll as EventListener, addPassive()],
            ["resize", updatePositions as EventListener],
        ]);

        // Init après l'idle (idéal pour protéger FCP/LCP)
        requestIdle(() => {
            ensureWorker();
            attachWorkerHandler();
            updatePositions();
            postScrollY(w!);
        });

        // Filet de sécurité : au premier scroll, on initialise si besoin
        const onFirstScroll = () => {
            if (!w) {
                ensureWorker();
                attachWorkerHandler();
                updatePositions();
                postScrollY(w!);
            }
            window.removeEventListener("scroll", onFirstScroll, {
                capture: false,
            });
        };
        window.addEventListener("scroll", onFirstScroll, {
            capture: false,
            passive: true,
        });

        return () => {
            off();
            window.removeEventListener("scroll", onFirstScroll);
            if (w) w.terminate();
        };
    }, [setActiveSection]);
};
