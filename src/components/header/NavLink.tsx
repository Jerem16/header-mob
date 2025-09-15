// NavLink.tsx
import React, { useMemo } from "react";
import { MenuItem } from "../../assets/data/menuItems";
import { useNavigation } from "../../utils/context/NavigationContext";
import dynamic from "next/dynamic";
import { svgComponents } from "./svgComponents";

const SubMenu = dynamic(() => import("./SubMenu"), {
    loading: () => <div className="submenu-placeholder" />,
});
import { makeClickHandler } from "@utils/handlers";

interface NavLinkProps {
    menuItem: MenuItem;
    onNavigationClick: (path: string) => void;
    isOpen: boolean;
    handleMenuClick: (menuItemId: string) => void;
}

const NavLink: React.FC<NavLinkProps> = ({
    menuItem,
    onNavigationClick,
    isOpen,
    handleMenuClick,
}) => {
    const { closeHamburgerMenu } = useNavigation();
    const SvgIcon = useMemo(() => svgComponents[menuItem.svg], [menuItem.svg]);

    const handleClick = useMemo(
        () =>
            makeClickHandler(() => {
                onNavigationClick(menuItem.path);
                const wasOpen = isOpen;
                handleMenuClick(menuItem.id);

                if (!menuItem.subItems?.length || wasOpen) {
                    closeHamburgerMenu(500);
                }
            }),
        [
            onNavigationClick,
            menuItem.path,
            menuItem.id,
            menuItem.subItems?.length,
            isOpen,
            handleMenuClick,
            closeHamburgerMenu,
        ]
    );

    return (
        <div className={`group_link-submenu ${menuItem.id}`}>
            <a
                aria-label={`Page ${menuItem.title}`}
                className={`head-link ${menuItem.class}`}
                href={menuItem.path + menuItem.AnchorId}
                onClick={handleClick}
                tabIndex={0}
            >
                {SvgIcon && <SvgIcon />}
                <span className="nav-link">{menuItem.title}</span>
                {menuItem.subItems && menuItem.subItems.length > 0 && (
                    <span className={`submenu-arrow ${isOpen ? "open" : "closed"}`}>
                        {isOpen ? "▲" : "▼"}
                    </span>
                )}
            </a>

            {menuItem.subItems && menuItem.subItems.length > 0 && (
                <SubMenu menuItem={menuItem} isOpen={isOpen} onSubItemClick={onNavigationClick} />
            )}
        </div>
    );
};

export default React.memo(NavLink);
