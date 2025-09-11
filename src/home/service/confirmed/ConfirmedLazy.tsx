import { lazy } from "react";
import LazyWrapper from "@/src/components/LazyWrapper";

const Confirmed = lazy(() => import("./confirmed"));
const ConfirmedLazy = () => (
    <LazyWrapper>
        <Confirmed />
    </LazyWrapper>
);

export default ConfirmedLazy;
