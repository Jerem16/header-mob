"use client";
import dynamic from "next/dynamic";
import LazyWrapper from "@/src/components/LazyWrapper";

const ScrollProviderWrapper = dynamic(() => import("./ScrollProviderWrapper"), {
    ssr: false,
});

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <LazyWrapper>
            <ScrollProviderWrapper>{children}</ScrollProviderWrapper>
        </LazyWrapper>
    );
};

export default ClientLayout;
