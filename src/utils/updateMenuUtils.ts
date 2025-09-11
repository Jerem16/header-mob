import { MenuItem } from "../assets/data/menuItems";
import { SubItem } from "../assets/data/interfaces/menu";

export const isMainItemActive = (
    itemPath: string,
    currentRoute: string
): boolean => {
    if (itemPath === "/") {
        return currentRoute === "/" || currentRoute.startsWith("/#");
    }
    return currentRoute.startsWith(itemPath);
};
const updateSubItems = (
    subItems: SubItem[],
    activeSection: string
): SubItem[] => {
    const activeSubItem = subItems.find(
        (sub) => sub.AnchorId === `#${activeSection}`
    );
    return subItems.map((sub) => ({
        ...sub,
        class: activeSubItem?.id === sub.id ? "active" : "",
    }));
};
export const updateMenuItems = (
    items: MenuItem[],
    activeSection: string,
    currentRoute: string
): MenuItem[] => {
    return items.map((item) => ({
        ...item,
        class: isMainItemActive(item.path, currentRoute) ? "active" : "",
        subItems: item.subItems
            ? updateSubItems(item.subItems, activeSection)
            : undefined,
    }));
};
export const updateMenuClasses = (
    mainLink?: MenuItem[],
    activeSection = "",
    currentRoute = ""
) => ({
    mainLink: updateMenuItems(mainLink || [], activeSection, currentRoute),
});
export const resetActiveMenuClasses = () => {
    const activeLinks = document.querySelectorAll(".nav-link.active");
    activeLinks.forEach((link) => {
        if (link instanceof HTMLElement) {
            link.classList.remove("active");
        }
    });
    const submenus = document.querySelectorAll(".submenu.open");
    submenus.forEach((submenu) => {
        if (submenu instanceof HTMLElement) {
            submenu.style.display = "";
        }
    });
};
