// src/utils/scroll/active.ts
import type { Section, SectionPosition } from "./types";
import { SCROLL_OFFSET } from "./types";

export const getActiveSectionId = (
    y: number,
    sections: Section[],
    positions: Record<string, SectionPosition>,
    offset: number = SCROLL_OFFSET
): string | null => {
    const scroll = y + offset;
    let current: string | null = null;

    for (const { id } of sections) {
        const pos = positions[id];
        if (!pos) continue;
        if (scroll >= pos.top && scroll < pos.top + pos.height) {
            current = id;
            break;
        }
    }
    return current;
};
