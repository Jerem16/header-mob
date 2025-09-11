import React from "react";
import SldParagraph from "./SldParagraph";
type SldDescribeProps = {
    descriptionBold?: string;
    description?: string;
    descriptionBoldEnd?: string;
    description2?: string;
    descriptionBold2?: string;
};
const SldDescribe: React.FC<SldDescribeProps> = ({
    descriptionBold = "",
    description = "",
    descriptionBoldEnd = "",
    description2 = "",
    descriptionBold2 = "",
}) => {
    return (
        <div className="banner-description">
            <SldParagraph
                boldText={descriptionBold}
                text={description}
                boldEndText={descriptionBoldEnd}
            />
            <SldParagraph text={description2} boldEndText={descriptionBold2} />
        </div>
    );
};
export default React.memo(SldDescribe);
