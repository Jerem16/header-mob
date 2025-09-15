"use client";
import { useMemo } from "react";
import { useNavigation } from "@utils/context/NavigationContext";
import { useSmoothScroll } from "@utils/useSmoothScroll";
import { makeClickHandler } from "@utils/handlers";

export const useNavigationHandlers = () => {
    const { currentRoute, updateRoute, closeHamburgerMenu } = useNavigation();

    const handleNavigationClick = useSmoothScroll(currentRoute, updateRoute);

    const handleLogoClick = useMemo(
        () =>
            makeClickHandler(() => {
                closeHamburgerMenu(200);
                handleNavigationClick("/#top");
            }),
        [closeHamburgerMenu, handleNavigationClick]
    );

    return { handleNavigationClick, handleLogoClick } as const;
};
