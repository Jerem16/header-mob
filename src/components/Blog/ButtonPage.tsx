// src/components/button/ButtonPage.tsx
import React from "react";

interface ButtonPageProps {
    href: string;
    className?: string;
}

const ButtonPage: React.FC<ButtonPageProps> = ({ href, className = "" }) => (
    <div className={`btn-P ${className}`.trim()}>
        <div className="center-fixed">
            <a className="btn-P__back" title="Retour" href={href}>
                <svg
                    focusable="false"
                    fill="#fff"
                    aria-hidden="true"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    data-testid="ArrowBackIcon"
                >
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"></path>
                </svg>
            </a>
        </div>
    </div>
);

export default ButtonPage;
