// src/utils/scroll/workers/scrollWorker.ts
import { getActiveSectionId } from "../active";
import type {
    Section,
    SectionPosition,
    ScrollInitMessage,
    ScrollPositionsMessage,
    ScrollYMessage,
    ScrollFromWorker,
} from "../types";
import { SCROLL_OFFSET } from "../types";
let sections: Section[] = [];
let positions: Record<string, SectionPosition> = {};
let lastActive: string | null = null;

const post = (msg: ScrollFromWorker) => (postMessage as any)(msg);

self.onmessage = (
    e: MessageEvent<ScrollInitMessage | ScrollPositionsMessage | ScrollYMessage>
) => {
    const msg = e.data;
    switch (msg.type) {
        case "init":
            sections = msg.sections ?? [];
            break;
        case "positions":
            positions = msg.positions ?? {};
            break;
        case "scrollY": {
            const id = getActiveSectionId(
                msg.y,
                sections,
                positions,
                SCROLL_OFFSET
            );
            if (id !== lastActive) {
                lastActive = id;
                post({ type: "active", id });
            }
            break;
        }
    }
};
