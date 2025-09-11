import React from "react";

const LoadMoreButton = ({ onClick, isVisible }) => {
    if (!isVisible) return null;

    return (
        <button className="load-more" onClick={onClick}>
            Voir Plus
        </button>
    );
};

export default LoadMoreButton;
