// src/components/frames/Frames.jsx
import React from "react";

const Frames = ({ className, id, children, ...rest }) => {
    return (
        <section className={className} id={id} {...rest}>
            {children}
            <div className="fixed-menu"></div>
            <h2>Welcome !</h2>
            <p>Hello, World !</p>
        </section>
    );
};

export default Frames;
