"use client";
import React from "react";
import { NavigationProvider } from "../../utils/context/NavigationContext";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("./Header"), {
    ssr: false,
});

const HeaderWarpProvider = () => {
    return (
        <NavigationProvider>
            <Header />
        </NavigationProvider>
    );
};

export default dynamic(() => Promise.resolve(React.memo(HeaderWarpProvider)));
