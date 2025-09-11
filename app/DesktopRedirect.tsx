"use client";

import { useEffect } from "react";

export default function DesktopRedirect() {
    useEffect(() => {
        if (typeof window === "undefined") return; // sécurité côté SSR

        if (window.innerWidth < 900) {
            return;
        }
        window.location.href =
            "https://jerem16.github.io/dsk-peur-de-la-conduite/";
    }, []);

    return null;
}
