// Services.tsx
"use client";
import React from "react";
import dynamic from "next/dynamic";
import BeginnerLazy from "./beginner/BeginnerLazy";
import ConfirmedLazy from "./confirmed/ConfirmedLazy";
import { useDriving } from "../../utils/context/DrivingContext";

const PermitStatus: React.FC = () => {
    const { hasPermit } = useDriving();
    return hasPermit ? <ConfirmedLazy /> : <BeginnerLazy />;
};

export default dynamic(() => Promise.resolve(React.memo(PermitStatus)), {
    ssr: false,
});
