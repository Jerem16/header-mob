import React from "react";

const Button = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <button className="btn-SB flx-c">{children}</button>;
};

export default Button;
