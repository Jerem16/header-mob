"use client";
// import { useScrollAnchors } from "../src/utils/scrollUtils";
import { useScrollAnchors } from "./useScrollAnchors";
import { sections } from "../src/assets/data/sections";

const ScrollSectionsWrapper = ({ children }) => {
    useScrollAnchors(sections);
    return <>{children}</>;
};
export default ScrollSectionsWrapper;
