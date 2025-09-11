// src/components/CategoryHeader.tsx
import React from "react";

type Props = {
    title: string;
    intro: string;
};

const CategoryHeader: React.FC<Props> = ({ title, intro }) => (
    <div className="sct-C-hd">
        <h2 className="category-tle">{title}</h2>
        <p className="category-intro">{intro}</p>
    </div>
);

export default React.memo(CategoryHeader);
