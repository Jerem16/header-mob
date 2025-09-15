import React, { createContext } from "react";
import { createUseContext } from "./utils/createUseContext";

interface NavigationHandlerContextType {
    onNavigationClick: (path: string) => void;
}

const NavigationHandlerContext = createContext<NavigationHandlerContextType | null>(null);

export const NavigationHandlerProvider: React.FC<{
    value: NavigationHandlerContextType;
    children: React.ReactNode;
}> = ({ value, children }) => {
    return (
        <NavigationHandlerContext.Provider value={value}>
            {children}
        </NavigationHandlerContext.Provider>
    );
};

export const useNavigationHandler = createUseContext(
    NavigationHandlerContext,
    "useNavigationHandler"
);
