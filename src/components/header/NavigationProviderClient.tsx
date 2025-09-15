"use client";
import React from "react";
import { NavigationProvider } from "../../utils/context/NavigationContext";

const NavigationProviderClient: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <NavigationProvider>{children}</NavigationProvider>;
};

export default React.memo(NavigationProviderClient);
