"use client";
import React, { useState, lazy, Suspense } from "react";
import useT from "../../hook/useTimeoutWorker";
import HeaderGhost from "./HeaderGhost";
const HeaderWarpProvider = lazy(() => import("./HeaderWarpProvider"));
const HeaderLazy = () => {
    const [showHeader, setShowHeader] = useState(false);

    useT(() => {
        setShowHeader(true);
    }, 600);

    if (!showHeader) {
        return <HeaderGhost />;
    }
    return (
        <Suspense fallback={<HeaderGhost />}>
            <HeaderWarpProvider />
        </Suspense>
    );
};

export default React.memo(HeaderLazy);
