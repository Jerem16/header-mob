"use client";

import { useEffect } from "react";

export function useDesktopRedirect(options?: {
    breakpoint?: number;
    desktopDomain?: string;
}) {
    useEffect(() => {
        if (typeof window === "undefined") return;
        const {
            breakpoint = 900,
            desktopDomain = "desktop.peur-de-la-conduite.fr",
        } = options || {};

        const isDesktop = window.innerWidth >= breakpoint;
        const onDesktopDomain = window.location.hostname.startsWith("desktop.");

        if (isDesktop && !onDesktopDomain) {
            // Redirige vers le domaine desktop uniquement si on n’y est pas déjà
            const dest =
                "https://" +
                desktopDomain +
                window.location.pathname +
                window.location.search +
                window.location.hash;
            window.location.replace(dest);
        }
        // Optionnel : tu peux ici gérer l'inverse si tu le souhaites (rediriger vers domaine principal sur mobile)
    }, []);
}
