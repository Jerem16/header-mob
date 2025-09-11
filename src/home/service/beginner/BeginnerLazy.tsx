import { lazy } from "react";
import LazyWrapper from "@/src/components/LazyWrapper";

const Beginner = lazy(() => import("./beginner"));
const BeginnerLazy = () => (
    <LazyWrapper>
        <Beginner />
    </LazyWrapper>
);

export default BeginnerLazy;
