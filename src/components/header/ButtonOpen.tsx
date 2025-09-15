// ButtonOpen.tsx
import React, { useCallback } from "react";
import { useNavigation } from "../../utils/context/NavigationContext";
import OpenMenuIcon from "@components/svg_Icon/utils/OpenMenuIcon";
import CloseMenuIcon from "@components/svg_Icon/utils/CloseMenuIcon";

const ButtonOpen = () => {
    const { hamburgerMenuIsOpen, openHamburgerMenu, closeHamburgerMenu } = useNavigation();
    const handleClick = useCallback(() => {
        if (hamburgerMenuIsOpen) {
            closeHamburgerMenu(1);
        } else {
            openHamburgerMenu();
        }
    }, [hamburgerMenuIsOpen, openHamburgerMenu, closeHamburgerMenu]);

    return (
        <button
            aria-label={hamburgerMenuIsOpen ? "fermer le menu" : "ouvrir le menu"}
            aria-expanded={hamburgerMenuIsOpen}
            aria-controls="main-nav"
            onClick={handleClick}
            className="menu"
        >
            {hamburgerMenuIsOpen ? <CloseMenuIcon /> : <OpenMenuIcon />}
        </button>
    );
};

export default React.memo(ButtonOpen);
