export function requestIdle(fn: () => void, timeout = 1500) {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ric = (window as any).requestIdleCallback as
        | ((cb: () => void, opts?: { timeout?: number }) => number)
        | undefined;
    if (ric) ric(fn, { timeout });
    else setTimeout(fn, 0);
}
