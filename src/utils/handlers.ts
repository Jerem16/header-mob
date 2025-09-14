// src/utils/handlers.ts
type MinimalEvent = { preventDefault(): void; stopPropagation(): void; key?: string };

export const stopAndPrevent = (e: MinimalEvent) => {
    e.preventDefault();
    e.stopPropagation();
};

export const isActivationKey = (e: MinimalEvent) => e.key === "Enter" || e.key === " ";

/** Clic générique : stop+prevent, exécute run, puis ferme éventuellement. */
export function makeClickHandler(
    run: () => void,
    opts?: { close?: (delay?: number) => void; delay?: number }
) {
    return (e: MinimalEvent) => {
        stopAndPrevent(e);
        run();
        opts?.close?.(opts?.delay);
    };
}

/** Variante avec payload (ex: path). */
export function makePayloadClickHandler<P>(
    run: (payload: P) => void,
    opts?: { close?: (delay?: number) => void; delay?: number }
) {
    return (payload: P, e: MinimalEvent) => {
        stopAndPrevent(e);
        run(payload);
        opts?.close?.(opts?.delay);
    };
}

/** Clavier : déclenche uniquement sur Entrée/Espace. */
export function makeActivationHandler<P>(run: (payload: P) => void) {
    return (payload: P, e: MinimalEvent) => {
        if (isActivationKey(e)) {
            e.preventDefault?.();
            run(payload);
        }
    };
}
