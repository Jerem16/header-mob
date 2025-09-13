// src/utils/scroll/smoothScroll.ts
import { getEl } from "./dom";

const isCoarse = () =>
    typeof matchMedia !== "undefined" &&
    matchMedia("(pointer: coarse)").matches;

const prefersReduced = () =>
    typeof matchMedia !== "undefined" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

export const scrollToId = (
    targetId: string,
    {
        offset = 0,
        behavior,
    }: { offset?: number; behavior?: ScrollBehavior } = {}
) => {
    const el = getEl(targetId);
    if (!el) return;

    const target = Math.max(
        0,
        el.getBoundingClientRect().top + window.scrollY - offset
    );
    const useSmooth =
        behavior ?? (!prefersReduced() && !isCoarse() ? "smooth" : "auto");

    window.scrollTo({ top: target, behavior: useSmooth });
};
