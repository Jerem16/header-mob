"use client";

import React, { ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loader from "@/src/components/loader/Loader";

type DrivingLazyWrapperProps = {
    children: ReactNode;
};

const DrivingProvider = dynamic(
    () => import("@src/utils/context/DrivingContext"),
    { ssr: false, loading: () => <Loader /> }
);

const DrivingLazyWrapper = ({ children }: DrivingLazyWrapperProps) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    return visible ? <DrivingProvider>{children}</DrivingProvider> : <></>;
};

export default React.memo(DrivingLazyWrapper);
