import React from "react";
import Link from "next/link";
import Logo from "../svg_Icon/Logo";

const LogoLink = ({ onPointerDown }) => {
    return (
        <Link
            href="/#top"
            aria-label="Vers home page "
            className="logo-link"
            onPointerDown={onPointerDown}
        >
            <Logo />
        </Link>
    );
};

export default React.memo(LogoLink);
