// NavLink.tsx
"use client";
import { useMemo, memo } from "react";
import dynamic from "next/dynamic";
import type { MenuItem } from "../../assets/data/menuItems";
import { useNavigation } from "../../utils/context/NavigationContext";
import { svgComponents } from "./svgComponents";
import { makeClickHandler } from "@utils/handlers";
import { useNavigationHandler } from "@utils/context/NavigationHandlerContext";

const LazySubMenu = dynamic<{
    menuItem: MenuItem;
    isOpen: boolean;
}>(() => import("./SubMenu"), { ssr: false, loading: () => null });

interface NavLinkProps {
    menuItem: MenuItem;
    isOpen: boolean;
    handleMenuClick: (menuItemId: string) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ menuItem, isOpen, handleMenuClick }) => {
    const { closeHamburgerMenu } = useNavigation();
    const { onNavigationClick } = useNavigationHandler();
    const SvgIcon = useMemo(() => svgComponents[menuItem.svg], [menuItem.svg]);

    const handleClick = useMemo(
        () =>
            makeClickHandler(() => {
                // 1er clic : on va sur /pX, on ouvre le sous-menu, le hamburger reste ouvert
                onNavigationClick(menuItem.path);
                const wasOpen = isOpen;
                handleMenuClick(menuItem.id);
                // Si pas de sous-items OU si c'était déjà ouvert, on ferme le hamburger
                if (!menuItem.subItems?.length || wasOpen) {
                    closeHamburgerMenu(500);
                }
            }),
        [
            menuItem.path,
            menuItem.id,
            menuItem.subItems?.length,
            isOpen,
            handleMenuClick,
            closeHamburgerMenu,
            onNavigationClick,
        ]
    );

    const hasSub = !!menuItem.subItems && menuItem.subItems.length > 0;

    return (
        <div className={`group_link-submenu ${menuItem.id}`}>
            <a
                aria-label={`Page ${menuItem.title}`}
                className={`head-link ${menuItem.class}`}
                href={menuItem.path + menuItem.AnchorId}
                onClick={handleClick}
                tabIndex={0}
                aria-haspopup={hasSub ? "menu" : undefined}
                aria-expanded={hasSub ? isOpen : undefined}
                aria-controls={hasSub ? `submenu-${menuItem.id}` : undefined}
            >
                {SvgIcon && <SvgIcon />}
                <span className="nav-link">{menuItem.title}</span>
                {hasSub && (
                    <span className={`submenu-arrow ${isOpen ? "open" : "closed"}`}>
                        {isOpen ? "▲" : "▼"}
                    </span>
                )}
            </a>

            {/* Sous-menu chargé seulement quand c’est ouvert */}
            {hasSub && isOpen && <LazySubMenu menuItem={menuItem} isOpen={isOpen} />}
        </div>
    );
};

export default memo(NavLink);
