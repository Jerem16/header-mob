"use client";

import React from "react";
import { useDesktopRedirect } from "@/src/hooks/useMobileRedirect";

const useDesktopRedirectWrapper = ({ children }) => {
    useDesktopRedirect();
    return <>{children}</>;
};

export default useDesktopRedirectWrapper;
