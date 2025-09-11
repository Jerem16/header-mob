"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Loader from "@/src/components/loader/Loader";
const ClientSldProvider = dynamic(() => import("./ClientSldProvider"), {
    ssr: false,
    loading: () => <Loader />,
});

const SliderContent = () => {
    return (
        <Suspense fallback={<Loader />}>
            <ClientSldProvider />
        </Suspense>
    );
};

export default SliderContent;
