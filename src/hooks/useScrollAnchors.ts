"use client";
import { useEffect } from "react";
import { useScrollContext } from "../utils/context/ScrollContext";
import { scrollInView, addNewUrl, updateSectionClasses } from "../utils/fnScrollUtils";
import { rafThrottle } from "../utils/rafThrottle";

interface SectionPosition {
    top: number;
    height: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useScrollAnchors = (_sections: { id: string }[]) => {
    const { setActiveSection } = useScrollContext();

    useEffect(() => {
        if (typeof window === "undefined") return;

        let worker: Worker | null = null;
        let workerReady: Promise<void> | null = null;
        let currentSections: { id: string }[] = [];

        const loadWorker = () => {
            if (!workerReady) {
                workerReady = import("../workers/createScrollWorker").then(
                    ({ default: create }) => {
                        worker = create();
                        worker.onmessage = (event) => {
                            const { currentSectionId } = event.data;
                            if (currentSectionId) {
                                scrollInView(currentSections);
                                addNewUrl(currentSectionId);
                                updateSectionClasses(currentSections, setActiveSection);
                            }
                        };
                    }
                );
            }
            return workerReady;
        };

        const handleScroll = async () => {
            await loadWorker();
            const nodes = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
            currentSections = nodes.map((el) => ({ id: el.id }));
            const positions = currentSections.reduce<Record<string, SectionPosition>>(
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
                {}
            );

            worker?.postMessage({
                sections: currentSections,
                scrollY: window.scrollY,
                positions,
            });
        };

        const controller = new AbortController();
        const throttledScroll = rafThrottle(handleScroll);

        window.addEventListener("scroll", throttledScroll, {
            passive: true,
            signal: controller.signal,
        });

        return () => {
            controller.abort();
            throttledScroll.cancel();
            worker?.terminate();
        };
    }, [setActiveSection]);
};
