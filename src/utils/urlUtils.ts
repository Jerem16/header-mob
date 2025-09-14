export const addNewUrl = (currentSectionId: string) => {
    if (currentSectionId) {
        const newUrl = `#${currentSectionId}`;
        if (window.location.hash !== newUrl) {
            window.history.replaceState(null, "", newUrl);
        }
    }
};
