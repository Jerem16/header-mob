// src/components/frames/Frames.jsx
import React from "react";
import "./frames.css";

const Frames = ({ className, id, children, ...rest }) => {
    return (
        <section className={className} id={id} {...rest}>
            {children}
            <p>Hello, World !</p>
        </section>
    );
};

export default Frames;
