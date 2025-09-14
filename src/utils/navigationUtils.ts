export const handleScrollClick = (targetId: string): void => {
    const element = document.getElementById(targetId);
    if (!element) return;
    const start = window.scrollY;
    const end = element.getBoundingClientRect().top + window.scrollY;
    const duration = 750;
    const startTime = performance.now();

    const worker = new Worker(
        new URL("/public/workers/scrollSmoothWorker.js", import.meta.url)
    );

    const animateScroll = (currentTime: number): void => {
        worker.postMessage({ start, end, duration, startTime, currentTime });
    };

    worker.onmessage = (
        event: MessageEvent<{ newScrollY: number; progress: number }>
    ): void => {
        const { newScrollY, progress } = event.data;
        window.scrollTo(0, newScrollY);
        if (progress < 1) {
            window.requestAnimationFrame(animateScroll);
        } else {
            worker.terminate();
        }
    };

    window.requestAnimationFrame(animateScroll);
};

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
    if (!currentRoute) {
        return;
    }
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
        if (targetHash === undefined) {
            return;
        }
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
        if (targetHash === undefined) {
            handleScrollClick?.(`scroll-start`);
        } else if (targetHash !== currentHash) {
            handleScrollClick?.(targetHash);
            updateRoute(`${targetPath}#${targetHash}`);
        } else if (targetHash === currentHash) {
            updateRoute(`${targetPath}#${targetHash}`);
        }
    }
}
