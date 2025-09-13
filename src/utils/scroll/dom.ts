// src/utils/scroll/dom.ts
export const isBrowser = () => typeof window !== "undefined";

export const getEl = (id: string) =>
    (isBrowser() && document.getElementById(id)) as HTMLElement | null;

export const getPos = (el: HTMLElement) => ({
    top: el.offsetTop,
    height: el.offsetHeight,
});

export const forEachSectionEl = (
    sections: { id: string }[],
    fn: (id: string, el: HTMLElement) => void
) => {
    for (const { id } of sections) {
        const el = getEl(id);
        if (el) fn(id, el);
    }
};

// Passive option util
export const addPassive = <K extends keyof WindowEventMap>(
    target: Window | Document | HTMLElement,
    type: K,
    handler: (e: WindowEventMap[K]) => void,
    opts: AddEventListenerOptions = {}
) => {
    const supportsPassive =
        isBrowser() &&
        (() => {
            let supported = false;
            try {
                const opt = Object.defineProperty({}, "passive", {
                    get: () => (supported = true),
                });
                window.addEventListener("test", () => {}, opt);
                window.removeEventListener("test", () => {}, opt);
            } catch {}
            return supported;
        })();
    target.addEventListener(type, handler as EventListener, {
        passive: true,
        ...opts,
        ...(supportsPassive ? { passive: true } : {}),
    });
    return () =>
        target.removeEventListener(type, handler as EventListener, opts);
};

// RAF throttle
export const rafThrottle = <T extends (...args: any[]) => void>(fn: T): T => {
    let ticking = false;
    let lastArgs: any[] | null = null;
    const wrapped = ((...args: any[]) => {
        lastArgs = args;
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
                ticking = false;
                if (lastArgs) {
                    fn(...lastArgs);
                    lastArgs = null;
                }
            });
        }
    }) as T;
    return wrapped;
};
