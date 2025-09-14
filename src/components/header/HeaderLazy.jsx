"use client";
import dynamic from "next/dynamic";
// import HeaderGhost from "./HeaderGhost";
const Header = dynamic(() => import("./Header"), {
    ssr: false,
    // loading: () => <HeaderGhost />,
});

const HeaderLazy = () => {
    return <Header />;
};

export default HeaderLazy;
