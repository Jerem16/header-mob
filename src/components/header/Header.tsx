// Header.tsx
import { useMemo, memo } from "react";
import LogoLink from "./LogoLink";
import { usePathname } from "next/navigation";
import Nav from "./Nav";
import { useScrollContext } from "@utils/context/ScrollContext";
import { useNavigation } from "@utils/context/NavigationContext";
import { menuItems } from "@assets/data/menuItems";
import { updateMenuClasses } from "@utils/updateMenuUtils";
import { useInitialScroll } from "@utils/scrollUtils";
import { useNavigationHandlers } from "@hooks/useNavigationHandlers";
import { NavigationHandlerProvider } from "@utils/context/NavigationHandlerContext";

const Header: React.FC = () => {
    const pathname = usePathname();
    const { currentRoute } = useNavigation();
    const { activeSection } = useScrollContext();

    useInitialScroll(pathname);

    const { handleNavigationClick, handleLogoClick } = useNavigationHandlers();

    const updatedMenuItems = useMemo(
        () => updateMenuClasses(menuItems.mainLink, activeSection, currentRoute),
        [activeSection, currentRoute]
    );

    return (
        <NavigationHandlerProvider value={{ onNavigationClick: handleNavigationClick }}>
            <div className="ha header">
                <LogoLink onClick={handleLogoClick} />
                <Nav menuItems={updatedMenuItems} />
            </div>
        </NavigationHandlerProvider>
    );
};

export default memo(Header);
