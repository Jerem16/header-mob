// "use client";

import { Suspense, ReactNode, memo } from "react";
import Loader from "@/src/components/loader/Loader";

type LazyWrapperProps = {
    children: ReactNode;
};

const LazyWrapper = memo(function LazyWrapper({ children }: LazyWrapperProps) {
    return <Suspense fallback={<Loader />}>{children}</Suspense>;
});

LazyWrapper.displayName = "LazyWrapper";

export default LazyWrapper;
