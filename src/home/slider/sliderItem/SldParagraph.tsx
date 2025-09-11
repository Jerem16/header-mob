import React from "react";
type SldParagraphProps = {
    boldText?: string;
    text?: string;
    boldEndText?: string;
};
const SldParagraph: React.FC<SldParagraphProps> = ({
    boldText,
    text,
    boldEndText,
}) => {
    return (
        <p>
            {boldText && <span className="bold">{boldText}</span>} {text}{" "}
            {boldEndText && <span className="bold">{boldEndText}</span>}
        </p>
    );
};
export default React.memo(SldParagraph);
