// src/utils/scroll/positions.ts
import { forEachSectionEl, getPos } from "./dom";
import type { Section, SectionPosition } from "./types";

export const computePositions = (
    sections: Section[]
): Record<string, SectionPosition> => {
    const map: Record<string, SectionPosition> = {};
    forEachSectionEl(sections, (id, el) => {
        map[id] = getPos(el);
    });
    return map;
};
