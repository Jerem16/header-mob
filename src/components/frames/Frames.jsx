// src/components/frames/Frames.jsx
import React from "react";

const Frames = ({ className, id, children, ...rest }) => {
    return (
        <section className={className} id={id} {...rest}>
            {children}
            <p>Hello, World !</p>
        </section>
    );
};

export default Frames;
