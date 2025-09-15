// SubMenu.tsx
"use client";

import { useMemo, memo } from "react";
import { MenuItem } from "../../assets/data/menuItems";
import { useNavigation } from "../../utils/context/NavigationContext";
import { makePayloadClickHandler, makeActivationHandler } from "@utils/handlers";
import { useNavigationHandler } from "@utils/context/NavigationHandlerContext";

interface SubMenuProps {
    menuItem: MenuItem;
    isOpen: boolean;
}

const SubMenu: React.FC<SubMenuProps> = ({ menuItem, isOpen }) => {
    const { closeHamburgerMenu } = useNavigation();
    const { onNavigationClick } = useNavigationHandler();

    const handleSubItemClick = useMemo(
        () =>
            makePayloadClickHandler<string>(onNavigationClick, {
                close: closeHamburgerMenu,
                delay: 650,
            }),
        [onNavigationClick, closeHamburgerMenu]
    );

    const handleKeyDown = useMemo(
        () => makeActivationHandler<string>(onNavigationClick),
        [onNavigationClick]
    );

    if (!menuItem.subItems || menuItem.subItems.length === 0) return null;

    return (
        <div className={`submenu ${isOpen ? "open" : ""}`}>
            <div className="submenu_group">
                {isOpen &&
                    menuItem.subItems.map((subItem) => {
                        const fullPath = `${menuItem.path}${subItem.AnchorId}`;
                        return (
                            <a
                                key={subItem.id}
                                aria-label={`Section ${subItem.title}`}
                                href={fullPath}
                                className={`nav-link ${subItem.class}`}
                                tabIndex={0}
                                onClick={(e) => handleSubItemClick(fullPath, e)}
                                onKeyDown={(e) => handleKeyDown(fullPath, e)}
                            >
                                {subItem.title}
                            </a>
                        );
                    })}
            </div>
        </div>
    );
};

export default memo(SubMenu);
