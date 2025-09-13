"use client";
import { useScrollAnchors } from "../src/hook/useScrollAnchors";
import { sections } from "../src/assets/data/sections";

const ScrollSectionsWrapper = ({ children }) => {
    useScrollAnchors(sections);
    return <>{children}</>;
};
export default ScrollSectionsWrapper;
