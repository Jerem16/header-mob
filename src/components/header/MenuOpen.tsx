import React, { useState } from "react";
import { useNavigation } from "../../utils/context/NavigationContext";
import MenuList from "./MenuList";
import { MenuItem } from "../../assets/data/menuItems";
interface NavProps {
    menuItems: {
        mainLink?: MenuItem[];
    };
    onNavigationClick: (path: string) => void;
}

const MenuOpen: React.FC<NavProps> = ({ menuItems, onNavigationClick }) => {
    const { hamburgerMenuIsOpen } = useNavigation();
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

    const handleMenuClick = (menuItemId: string) => {
        setOpenSubMenu(openSubMenu === menuItemId ? null : menuItemId);
    };

    return (
        <div
            className={`head-flex absolute ${
                hamburgerMenuIsOpen ? "open" : ""
            }`}
        >
            {hamburgerMenuIsOpen && menuItems.mainLink && (
                <MenuList
                    menuItems={menuItems.mainLink}
                    openSubMenu={openSubMenu}
                    onNavigationClick={onNavigationClick}
                    handleMenuClick={handleMenuClick}
                />
            )}
        </div>
    );
};

export default React.memo(MenuOpen);
