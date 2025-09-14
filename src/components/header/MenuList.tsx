import React from "react";
import { MenuItem } from "../../assets/data/menuItems";
import NavLink from "./NavLink";

interface MenuListProps {
    menuItems: MenuItem[];
    onNavigationClick: (path: string) => void;
}

const MenuList: React.FC<MenuListProps> = ({ menuItems, onNavigationClick }) => {
    return (
        <nav className="main-nav">
            {menuItems.map((menuItem) => (
                <NavLink
                    key={menuItem.id}
                    menuItem={menuItem}
                    onNavigationClick={onNavigationClick}
                />
            ))}
        </nav>
    );
};

export default React.memo(MenuList);
