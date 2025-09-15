export default function createScrollWorker() {
    return new Worker(new URL("/public/workers/scrollWorker.js", import.meta.url));
}
