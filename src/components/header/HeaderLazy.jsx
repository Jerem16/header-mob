"use client";
import dynamic from "next/dynamic";
import NavigationProviderClient from "./NavigationProviderClient";

const Header = dynamic(() => import("./Header"), { ssr: false });

const HeaderLazy = () => {
    return (
        <NavigationProviderClient>
            <Header />
        </NavigationProviderClient>
    );
};

export default HeaderLazy;
