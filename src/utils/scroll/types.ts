// src/utils/scroll/types.ts
export type Section = { id: string };
export type SectionPosition = { top: number; height: number };

export const SCROLL_OFFSET = 100;

export type ScrollInitMessage = { type: "init"; sections: Section[] };
export type ScrollPositionsMessage = {
    type: "positions";
    positions: Record<string, SectionPosition>;
};
export type ScrollYMessage = { type: "scrollY"; y: number };
export type ScrollFromWorker =
    | { type: "active"; id: string | null }
    | { type: "debug"; payload: unknown };

export type ScrollToIdOptions = {
    offset?: number;
    behavior?: ScrollBehavior; // "smooth" | "auto"
};
