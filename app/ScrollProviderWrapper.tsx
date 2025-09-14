"use client";
import ScrollSectionsWrapper from "./ScrollSectionsWrapper";
import ScrollProvider from "../src/utils/context/ScrollContext";
import React from "react";

export default function ScrollProviderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ScrollProvider>
            <ScrollSectionsWrapper>{children}</ScrollSectionsWrapper>
        </ScrollProvider>
    );
}
