import React from "react";
import { useNavigation } from "../../utils/context/NavigationContext";
import OpenMenuIcon from "@components/svg_Icon/utils/OpenMenuIcon";
import CloseMenuIcon from "@components/svg_Icon/utils/CloseMenuIcon";
const ButtonOpen = () => {
    const { hamburgerMenuIsOpen, openHamburgerMenu, closeHamburgerMenu } = useNavigation();
    return (
        <button
            aria-label="ouvrir le menu"
            onClick={hamburgerMenuIsOpen ? () => closeHamburgerMenu(1) : openHamburgerMenu}
            className="menu"
        >
            {hamburgerMenuIsOpen ? <CloseMenuIcon /> : <OpenMenuIcon />}
        </button>
    );
};

export default React.memo(ButtonOpen);
