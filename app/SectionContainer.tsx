import React from "react";
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
        <section className="section page" id={id}>
            <div className="fixed-menu" />
            <div className="container">
                <div className="page-tle">
                    {icon}
                    <h1 className="title">{title}</h1>
                </div>
                <div className="fixed-menu" />
                {children}
            </div>
        </section>
    );
});

SectionContainer.displayName = "SectionContainer";

export default React.memo(SectionContainer);
