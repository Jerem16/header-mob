"use client";
import dynamic from "next/dynamic";
import HeaderGhost from "./HeaderGhost";

const HeaderWarpProvider = dynamic(() => import("./HeaderWarpProvider"), {
    ssr: false,
    loading: () => <HeaderGhost />,
});

const HeaderLazy = () => {
    return <HeaderWarpProvider />;
};

export default HeaderLazy;

