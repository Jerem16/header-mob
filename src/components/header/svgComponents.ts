// src/components/header/svgComponents.ts
import React from "react";

import {
    Tarifs as TarifsIcon,
    Home as HomeIcon,
    Logo as LogoIcon,
    Services as ServicesIcon,
    Blog as BlogIcon,
    Contact as ContactIcon,
} from "../svg_Icon";

export const svgComponents = {
    Home: React.memo(HomeIcon),
    Logo: React.memo(LogoIcon),
    Services: React.memo(ServicesIcon),
    Blog: React.memo(BlogIcon),
    Tarifs: React.memo(TarifsIcon),
    Contact: React.memo(ContactIcon),
} as const;

export type SvgIconName = keyof typeof svgComponents;
