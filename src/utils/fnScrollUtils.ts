// src/utils/fnScrollUtils.ts
export type Section = { id: string };
export type SectionPosition = { top: number; height: number };

export const SCROLL_OFFSET = 100;

export const getEl = (id: string) =>
    document.getElementById(id) as HTMLElement | null;

export const getPos = (el: HTMLElement): SectionPosition => ({
    top: el.offsetTop,
    height: el.offsetHeight,
});

export const forEachSectionEl = (
    sections: Section[],
    fn: (id: string, el: HTMLElement) => void
): void => {
    for (const { id } of sections) {
        const el = getEl(id);
        if (el) fn(id, el);
    }
};

// ---------- Smooth scroll (worker) ----------
let smoothWorker: Worker | null = null;
const isCoarse = () => matchMedia("(pointer: coarse)").matches;

const getSmoothWorker = () => {
    if (!smoothWorker) {
        smoothWorker = new Worker(
            new URL("/public/workers/scrollSmoothWorker.js", import.meta.url)
        );
    }
    return smoothWorker;
};

export const handleScrollClick = (targetId: string): void => {
    const element = document.getElementById(targetId);
    if (!element) return;

    // Mobile / pointeur “coarse” → scroll natif
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

// ---------- Navigation helpers ----------
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

// ---------- Section in-view / classes ----------
/* eslint-disable-next-line */
export let currentSectionId = "";

export const setCurrentSectionId = (id: string): void => {
    currentSectionId = id;
};

export function scrollInView(sections: Section[]): void {
    currentSectionId = "";
    const y = window.scrollY;

    forEachSectionEl(sections, (id, el) => {
        const { top, height } = getPos(el);
        const inView = y >= top - SCROLL_OFFSET && y < top + height;
        if (inView) {
            // "Dernier match gagne"
            currentSectionId = id;
        }
    });
}

export function updateSectionClasses(
    sections: Section[],
    setActiveSection: (id: string) => void
): void {
    forEachSectionEl(sections, (id, el) => {
        const isActive = id === currentSectionId;
        el.classList.toggle("active-section", isActive);
        if (isActive) setActiveSection(id);
    });
}

export function addNewUrl(id: string): void {
    if (!id) return;
    const newHash = `#${id}`;
    if (window.location.hash !== newHash) {
        window.history.replaceState(null, "", newHash);
    }
}
