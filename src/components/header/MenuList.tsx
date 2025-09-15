import { useMemo, memo, useCallback } from "react";
import { MenuItem } from "../../assets/data/menuItems";
import NavLink from "./NavLink";

interface MenuListProps {
    menuItems: MenuItem[];
    openSubMenu: string | null;
    handleMenuClick: (menuItemId: string) => void;
}

const MenuList: React.FC<MenuListProps> = ({ menuItems, openSubMenu, handleMenuClick }) => {
    const renderNavLink = useCallback(
        (menuItem: MenuItem) => (
            <NavLink
                key={menuItem.id}
                menuItem={menuItem}
                isOpen={openSubMenu === menuItem.id}
                handleMenuClick={handleMenuClick}
            />
        ),
        [openSubMenu, handleMenuClick]
    );

    const renderedMenuItems = useMemo(
        () => menuItems.map(renderNavLink),
        [menuItems, renderNavLink]
    );

    return <nav className="main-nav">{renderedMenuItems}</nav>;
};

export default memo(MenuList);
