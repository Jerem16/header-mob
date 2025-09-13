// src/utils/scroll/workerClient.ts
import type {
    ScrollFromWorker,
    ScrollInitMessage,
    ScrollPositionsMessage,
    ScrollYMessage,
} from "./types";

export type ScrollWorker = Worker & {
    postMessage(
        msg: ScrollInitMessage | ScrollPositionsMessage | ScrollYMessage
    ): void;
};

export const createScrollWorker = (): ScrollWorker => {
    // ✅ Next.js/webpack/Vite-safe
    return new Worker(new URL("./workers/scrollWorker.ts", import.meta.url), {
        type: "module",
    }) as ScrollWorker;
};

export const postInit = (w: ScrollWorker, sections: { id: string }[]) =>
    w.postMessage({ type: "init", sections });

export const postPositions = (
    w: ScrollWorker,
    positions: Record<string, { top: number; height: number }>
) => w.postMessage({ type: "positions", positions });

export const postScrollY = (w: ScrollWorker, y: number) =>
    w.postMessage({ type: "scrollY", y });

export const onWorkerMessage = (
    w: ScrollWorker,
    handler: (msg: ScrollFromWorker) => void
) => {
    const cb = (e: MessageEvent<ScrollFromWorker>) => handler(e.data);
    w.addEventListener("message", cb);
    return () => w.removeEventListener("message", cb);
};
