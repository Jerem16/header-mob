// src/hooks/useScrollAnchors.ts
"use client";

import { useEffect, useMemo, useRef } from "react";
import {
    SCROLL_OFFSET,
    type Section,
    type SectionPosition,
} from "@utils/scroll/types";
import { computePositions } from "@utils/scroll/positions";
import { addPassive, rafThrottle } from "@utils/scroll/dom";
import {
    createScrollWorker,
    onWorkerMessage,
    postInit,
    postPositions,
    postScrollY,
} from "@utils/scroll/workerClient";
import { scrollToId } from "@utils/scroll/smoothScroll";
// import { useScrollContext } from "@/contexts/ScrollContext"; // si tu as un contexte

type UseScrollAnchorsOpts = {
    sections: Section[];
    offset?: number;
    onActiveChange?: (id: string | null) => void; // e.g. maj menu
};

export const useScrollAnchors = ({
    sections,
    offset = SCROLL_OFFSET,
    onActiveChange,
}: UseScrollAnchorsOpts) => {
    const workerRef = useRef<ReturnType<typeof createScrollWorker> | null>(
        null
    );
    // const { setActiveSection } = useScrollContext(); // optionnel

    useEffect(() => {
        if (typeof window === "undefined") return;
        const controller = new AbortController();

        const worker = createScrollWorker();
        workerRef.current = worker;

        const stopMsg = onWorkerMessage(worker, (msg) => {
            if (msg.type === "active") {
                onActiveChange?.(msg.id);
                // setActiveSection?.(msg.id);
            }
        });

        // init + positions
        postInit(worker, sections);
        const pushPositions = () => {
            const positions: Record<string, SectionPosition> =
                computePositions(sections);
            postPositions(worker, positions);
        };
        // 1) au montage + au load/resize
        pushPositions();
        addPassive(window, "load", pushPositions);
        addPassive(window, "resize", rafThrottle(pushPositions));

        // 2) scroll
        const onScroll = rafThrottle(() => postScrollY(worker, window.scrollY));
        addPassive(window, "scroll", onScroll);

        return () => {
            stopMsg();
            worker.terminate();
            controller.abort();
        };
    }, [sections, offset, onActiveChange]);

    // API de scroll
    const goTo = useMemo(
        () => (id: string) => scrollToId(id, { offset }),
        [offset]
    );

    return { scrollToId: goTo };
};
