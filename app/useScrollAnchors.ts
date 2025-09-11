"use client";
import { useEffect } from "react";
import { useScrollContext } from "../src/utils/context/ScrollContext";
import {
    scrollInView,
    addNewUrl,
    updateSectionClasses,
} from "../src/utils/fnScrollUtils";

interface SectionPosition {
    top: number;
    height: number;
}

// sections parameter is kept for compatibility but current sections are detected dynamically
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useScrollAnchors = (_sections: { id: string }[]) => {
    const { setActiveSection } = useScrollContext();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const worker = new Worker(
            new URL("../public/workers/scrollWorker.js", import.meta.url)
        );

        let currentSections: { id: string }[] = [];

        const handleScroll = () => {
            const nodes = Array.from(
                document.querySelectorAll<HTMLElement>("section[id]")
            );
            currentSections = nodes.map((el) => ({ id: el.id }));
            const positions = currentSections.reduce<
                Record<string, SectionPosition>
            >((acc, { id }) => {
                const section = document.getElementById(id);
                if (section) {
                    acc[id] = {
                        top: section.offsetTop,
                        height: section.offsetHeight,
                    };
                }
                return acc;
            }, {});

            worker.postMessage({
                sections: currentSections,
                scrollY: window.scrollY,
                positions,
            });
        };

        worker.onmessage = (event) => {
            const { currentSectionId } = event.data;
            if (currentSectionId) {
                scrollInView(currentSections);
                addNewUrl(currentSectionId);
                updateSectionClasses(currentSections, setActiveSection);
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            worker.terminate();
        };
    }, [setActiveSection]);
};
