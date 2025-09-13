// src/utils/fnScrollUtils.ts

/* ---------- Smooth scroll (worker) : spécifique à ce fichier ---------- */
let smoothWorker: Worker | null = null;
const isCoarse = () => matchMedia("(pointer: coarse)").matches;

const getSmoothWorker = () => {
    if (!smoothWorker) {
        smoothWorker = new Worker("/workers/scrollSmoothWorker.js");
    }
    return smoothWorker;
};

export const handleScrollClick = (targetId: string): void => {
    const element = document.getElementById(targetId);
    if (!element) return;

    if (isCoarse()) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
    }

    const start = window.scrollY;
    const end = element.getBoundingClientRect().top + window.scrollY;
    const duration = 750;
    const startTime = performance.now();
    const worker = getSmoothWorker();

    const animateScroll = (currentTime: number): void => {
        worker.postMessage({ start, end, duration, startTime, currentTime });
    };

    const onMsg = (
        event: MessageEvent<{ newScrollY: number; progress: number }>
    ) => {
        const { newScrollY, progress } = event.data;
        window.scrollTo(0, newScrollY);
        if (progress < 1) {
            window.requestAnimationFrame(animateScroll);
        } else {
            worker.removeEventListener("message", onMsg);
        }
    };

    worker.addEventListener("message", onMsg);
    window.requestAnimationFrame(animateScroll);
};

/* ---------- Navigation helpers : spécifique à ce fichier ---------- */
interface NavParams {
    currentPath: string;
    targetPath: string;
    targetHash: string | undefined;
    currentHash: string | undefined;
    updateRoute: (route: string) => void;
    handleScrollClick?: (hash: string) => void;
}

export const handleNavClick = (
    path: string,
    currentRoute: string | undefined,
    updateRoute: (route: string) => void,
    handleScrollClick?: (hash: string) => void
): void => {
    if (!currentRoute) return;

    const [currentPath, currentHash] = currentRoute.split("#");
    const [targetPath, targetHash] = path.split("#");

    ifNav({ currentPath, targetPath, targetHash, currentHash, updateRoute });
    elseNav({
        currentPath,
        targetPath,
        targetHash,
        currentHash,
        updateRoute,
        handleScrollClick,
    });
};

function ifNav({
    currentPath,
    targetPath,
    targetHash,
    currentHash,
    updateRoute,
}: NavParams): void {
    if (currentPath !== targetPath) {
        updateRoute(targetPath);
        if (typeof targetHash === "undefined") return;
        if (targetHash !== currentHash) {
            updateRoute(`${targetPath}#${targetHash}`);
        }
    }
}

function elseNav({
    currentPath,
    targetPath,
    targetHash,
    currentHash,
    updateRoute,
    handleScrollClick,
}: NavParams): void {
    if (currentPath === targetPath) {
        updateRoute(targetPath);
        if (typeof targetHash === "undefined") {
            handleScrollClick?.(`scroll-start`);
        } else if (targetHash !== currentHash) {
            handleScrollClick?.(targetHash);
            updateRoute(`${targetPath}#${targetHash}`);
        } else {
            updateRoute(`${targetPath}#${targetHash}`);
        }
    }
}
