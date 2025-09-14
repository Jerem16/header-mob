"use client";
import React, { useState, lazy, Suspense } from "react";
import useT from "../../hook/useTimeoutWorker";
const HeaderWarpProvider = lazy(() => import("./HeaderWarpProvider"));
const HeaderLazy = () => {
    const [showHeader, setShowHeader] = useState(false);

    useT(() => {
        setShowHeader(true);
    }, 300);

    if (!showHeader) {
        return;
    }
    return (
        <Suspense fallback={null}>
            <HeaderWarpProvider />
        </Suspense>
    );
};

export default React.memo(HeaderLazy);
