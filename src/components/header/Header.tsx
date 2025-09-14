import React, { useCallback, useMemo } from "react";
import LogoLink from "./LogoLink";
import { usePathname } from "next/navigation";
import Nav from "./Nav";
import { useScrollContext } from "../../utils/context/ScrollContext";
import { useNavigation } from "../../utils/context/NavigationContext";
import { MenuItem, menuItems } from "../../assets/data/menuItems";
import { updateMenuClasses } from "../../utils/updateMenuUtils";
import { handleScrollClick, handleNavClick } from "../../utils/navigationUtils";
import { useInitialScroll } from "../../utils/scrollUtils";

interface NavProps {
    menuItems: MenuItem[];
    onNavigationClick: (path: string) => void;
}

const Header: React.FC<NavProps> = () => {
    const pathname = usePathname();
    const { currentRoute, updateRoute, closeHamburgerMenu } = useNavigation();
    const { activeSection } = useScrollContext();

    useInitialScroll(pathname);

    const handleNavigationClick = useCallback(
        (path: string) => {
            handleNavClick(path, currentRoute, updateRoute, handleScrollClick);
        },
        [currentRoute, updateRoute]
    );

    const handleLogoClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            closeHamburgerMenu(200);
            handleNavigationClick("/#top");
            e.stopPropagation();
        },
        [closeHamburgerMenu, handleNavigationClick]
    );

    const updatedMenuItems = useMemo(
        () =>
            updateMenuClasses(
                menuItems.mainLink,
                activeSection,
                currentRoute
            ),
        [activeSection, currentRoute]
    );

    return (
        <div className="ha header">
            <LogoLink onClick={handleLogoClick} />
            <Nav
                menuItems={updatedMenuItems}
                onNavigationClick={handleNavigationClick}
            />
        </div>
    );
};

export default React.memo(Header);
