"use client";
import React from "react";
import { NavigationProvider } from "../../utils/context/NavigationContext";
import Header from "./Header";

const HeaderClient = () => {
    return (
        <NavigationProvider>
            <Header />
        </NavigationProvider>
    );
};

export default React.memo(HeaderClient);
