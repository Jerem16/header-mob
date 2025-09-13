let sections = [];
let positions = {};
let lastId = "";

self.onmessage = (event) => {
  const { sections: s, positions: p, scrollY } = event.data || {};
  if (s && p) {
    sections = s;
    positions = p;
  }
  if (typeof scrollY !== "number") return;

  let currentSectionId = "";
  for (let i = 0; i < sections.length; i++) {
    const id = sections[i].id;
    const pos = positions[id];
    if (!pos) continue;
    const isInView = scrollY >= pos.top - 100 && scrollY < pos.top + pos.height;
    if (isInView) {
      currentSectionId = id;
      break;
    }
  }
  if (currentSectionId && currentSectionId !== lastId) {
    lastId = currentSectionId;
    self.postMessage({ currentSectionId });
  }
};
