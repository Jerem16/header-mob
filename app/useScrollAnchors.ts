"use client";
import { useEffect } from "react";
import { useScrollContext } from "../src/utils/context/ScrollContext";
import {
    scrollInView,
    addNewUrl,
    updateSectionClasses,
    currentSectionId,
    SectionMeta,
} from "../src/utils/fnScrollUtils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useScrollAnchors = (_sections: { id: string }[]) => {
    const { setActiveSection } = useScrollContext();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleScroll = () => {
            const nodes = Array.from(
                document.querySelectorAll<HTMLElement>("section[id]")
            );
            const sections: SectionMeta[] = nodes.map((el) => ({
                id: el.id,
                top: el.offsetTop,
                height: el.offsetHeight,
                element: el,
            }));
            const scrollY = window.scrollY;
            scrollInView(sections, scrollY);
            addNewUrl(currentSectionId);
            updateSectionClasses(sections, setActiveSection);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [setActiveSection]);
};
