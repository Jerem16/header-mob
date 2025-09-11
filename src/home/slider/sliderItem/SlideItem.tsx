import React from "react";
import SldTitle from "./SldTitle";
import SldDescribe from "./SldDescribe";
type SlideItemProps = {
    className?: string;
    h2: string;
    h2bold: string;
    h2bold2?: string;
    h2bold3?: string;
    descriptionBold?: string;
    description?: string;
    description2?: string;
    descriptionBold2?: string;
};
const SlideItem: React.FC<SlideItemProps> = ({
    className = "",
    h2,
    h2bold,
    h2bold2,
    h2bold3 = "",
    ...descProps
}) => {
    return (
        <div className={className.trim() || undefined}>
            <div className="slider-content">
                <SldTitle
                    h2={h2}
                    h2bold={h2bold}
                    h2bold2={h2bold2}
                    h2bold3={h2bold3}
                />
                <SldDescribe {...descProps} />
            </div>
        </div>
    );
};
export default React.memo(SlideItem);
