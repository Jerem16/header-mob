import React, { useCallback } from "react";
import Link from "next/link";
import Logo from "../svg_Icon/Logo";

const LogoLink = ({ onClick }) => {
    const handleClick = useCallback(() => {
        onClick?.();
    }, [onClick]);

    return (
        <Link
            href="/#top"
            aria-label="Vers home page "
            className="logo-link"
            onClick={handleClick}
        >
            <Logo />
        </Link>
    );
};

export default React.memo(LogoLink);
