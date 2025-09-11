import React, { lazy } from "react";
import LazyWrapper from "@/src/components/LazyWrapper";
// Chargement différé
const SectionPageContainer = lazy(() => import("./SectionContainer"));

type SectionContainerProps = {
    children: React.ReactNode;
    id?: string;
    title?: React.ReactNode;
    icon?: React.ReactNode;
};

const SectionContainer = React.memo(function SectionContainer({
    children,
    id,
    title,
    icon,
}: SectionContainerProps) {
    return (
        <LazyWrapper>
            <SectionPageContainer id={id} title={title} icon={icon}>
                {children}
            </SectionPageContainer>
        </LazyWrapper>
    );
});

SectionContainer.displayName = "SectionContainer";

export default React.memo(SectionContainer);
