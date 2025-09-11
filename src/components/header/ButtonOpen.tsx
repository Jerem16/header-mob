import React from "react";
import { useNavigation } from "../../utils/context/NavigationContext";
import MenuIcon from "@components/svg_Icon/utils/MenuIcon";
import XIcon from "@components/svg_Icon/utils/XIcon";
const ButtonOpen = () => {
    const {
        hamburgerMenuIsOpen,
        openHamburgerMenu,
        closeHamburgerMenu,
    } = useNavigation();
    return (
        <button
            aria-label="ouvrir le menu"
            onClick={
                hamburgerMenuIsOpen
                    ? () => closeHamburgerMenu(1)
                    : openHamburgerMenu
            }
            className="menu"
        >
            {hamburgerMenuIsOpen ? <XIcon /> : <MenuIcon />}
        </button>
    );
};

export default React.memo(ButtonOpen);
