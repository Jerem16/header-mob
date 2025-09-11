// src/components/header/svgComponents.ts
import React from "react";

import TarifsIcon from "../svg_Icon/Tarifs";
import HomeIcon from "../svg_Icon/Home";
import LogoIcon from "../svg_Icon/Logo";
import ServicesIcon from "../svg_Icon/Services";
import BlogIcon from "../svg_Icon/Blog";
import ContactIcon from "../svg_Icon/Contact";
import ReservationIcon from "../svg_Icon/Reservation";
import SearchIcon from "../svg_Icon/Search";
import ConnectionIcon from "../svg_Icon/Connection";

export const svgComponents = {
    Home: React.memo(HomeIcon),
    Logo: React.memo(LogoIcon),
    Services: React.memo(ServicesIcon),
    Blog: React.memo(BlogIcon),
    Tarifs: React.memo(TarifsIcon),
    Contact: React.memo(ContactIcon),
    Reservation: React.memo(ReservationIcon),
    Search: React.memo(SearchIcon),
    Connection: React.memo(ConnectionIcon),
} as const;

export type SvgIconName = keyof typeof svgComponents;
// => "Home" | "Services" | "Blog" | "Tarifs" | "Contact" | "Reservation" | "Search" | "Connection"
