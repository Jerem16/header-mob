"use client";
import { useEffect } from "react";
import { resetActiveMenuClasses } from "./updateMenuUtils";
import { handleScrollClick } from "./fnScrollUtils";
export const useInitialScroll = (pathname: string | null) => {
    useEffect(() => {
        if (window.location.hash) {
            window.scrollTo({ top: 0 });
            handleScrollClick(window.location.hash.substring(1));
        }
        resetActiveMenuClasses();
    }, [pathname]);
};
