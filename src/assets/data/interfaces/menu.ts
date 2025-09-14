// src/interfaces/menu.ts
import React from "react";
import { Content } from "../interfaces/content";
import { SvgIconName } from "@components/header/svgComponents";

export interface SubItem {
    id: string;
    title: string;
    AnchorId: string;
    class: string;
    content?: Content[]; // contenu typé Content[]
}

export interface MenuItem {
    id: string;
    title: string;
    class?: string;
    path: string;
    svg: SvgIconName; // <-- on passe de string à SvgIconName
    subItems?: SubItem[];
    AnchorId?: string;
    content?: string | React.ReactNode;
}

export interface MenuLinks {
    mainLink: MenuItem[];
    reservation?: MenuItem[];
    search?: MenuItem[];
    connection?: MenuItem[];
}
