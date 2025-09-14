import React, { useCallback, useMemo } from "react";
import { MenuItem } from "../../assets/data/menuItems";
import { useNavigation } from "../../utils/context/NavigationContext";
import SubMenu from "./SubMenu";
import { svgComponents } from "./svgComponents";
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

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            onNavigationClick(menuItem.path);
            const wasOpen = isOpen;
            handleMenuClick(menuItem.id);
            e.stopPropagation();

            if (!menuItem.subItems || menuItem.subItems.length === 0 || wasOpen) {
                closeHamburgerMenu(500);
            }
        },
        [
            onNavigationClick,
            menuItem,
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
                    <span
                        className={`submenu-arrow ${
                            isOpen ? "open" : "closed"
                        }`}
                    >
                        {isOpen ? "▲" : "▼"}
                    </span>
                )}
            </a>

            {menuItem.subItems && menuItem.subItems.length > 0 && (
                <SubMenu
                    menuItem={menuItem}
                    isOpen={isOpen}
                    onSubItemClick={onNavigationClick}
                />
            )}
        </div>
    );
};

export default React.memo(NavLink);
