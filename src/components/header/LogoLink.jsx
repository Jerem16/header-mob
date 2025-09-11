import React from "react";
import Link from "next/link";
import Logo from "../svg_Icon/Logo";

const LogoLink = ({ onClick }) => {
    return (
        <Link
            href="/#slider"
            aria-label="Vers home page "
            className="logo-link"
            onClick={onClick}
        >
            <Logo />
        </Link>
    );
};

export default React.memo(LogoLink);
