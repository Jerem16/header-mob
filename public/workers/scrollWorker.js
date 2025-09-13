let sections = [];
let positions = {};

self.onmessage = function (event) {
    const {
        sections: incomingSections,
        positions: incomingPositions,
        scrollY,
    } = event.data;

    if (incomingSections && incomingPositions) {
        sections = incomingSections;
        positions = incomingPositions;
    }

    if (typeof scrollY !== "number") return;

    let currentSectionId = "";

    // Déterminer la section visible
    sections.forEach(({ id }) => {
        const sectionTop = positions[id]?.top;
        const sectionHeight = positions[id]?.height;
        const isInView =
            scrollY >= sectionTop - 100 && scrollY < sectionTop + sectionHeight;

        if (isInView) {
            currentSectionId = id;
        }
    });

    // Retourner la section active au main thread
    self.postMessage({ currentSectionId });
};
