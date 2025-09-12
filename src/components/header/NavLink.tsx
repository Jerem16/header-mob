import React from "react";
import { MenuItem } from "../../assets/data/menuItems";
import { useNavigation } from "../../utils/context/NavigationContext";
import SubMenu from "./SubMenu";
import { svgComponents } from "./svgComponents";
interface NavLinkProps {
    menuItem: MenuItem;
    openSubMenu: string | null;
    onNavigationClick: (path: string) => void;
    handleMenuClick: (menuItemId: string) => void;
}

const NavLink: React.FC<NavLinkProps> = ({
    menuItem,
    openSubMenu,
    onNavigationClick,
    handleMenuClick,
}) => {
    const { closeHamburgerMenu } = useNavigation();
    const SvgIcon = svgComponents[menuItem.svg];
    const isOpen = openSubMenu === menuItem.id;

    return (
        <div className={`group_link-submenu ${menuItem.id}`}>
            <a
                aria-label={`Page ${menuItem.title}`}
                className={`head-link ${menuItem.class}`}
                href={menuItem.path + menuItem.AnchorId}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const hasSub = !!menuItem.subItems?.length;
                    const isCurrentlyOpen = openSubMenu === menuItem.id;
                    onNavigationClick(menuItem.path);
                    handleMenuClick(menuItem.id);
                    if (!hasSub || isCurrentlyOpen) closeHamburgerMenu(500);
                }}
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

            {/* Si le menu contient des sous-items, afficher le SubMenu */}
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
