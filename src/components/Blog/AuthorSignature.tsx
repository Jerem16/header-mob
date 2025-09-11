// src/components/Blog/AuthorSignature.tsx
import React from "react";
import { Author } from "@src/types/blog";

interface AuthorSignatureProps {
    author: Author;
    date: string | Date;
    className?: string;
}

const formatDate = (date: string | Date) => {
    try {
        return new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    } catch {
        return date.toString();
    }
};
const ava = "/mob-peur-de-la-conduite/img/about/avatar.webp";
const AuthorSignature: React.FC<AuthorSignatureProps> = ({
    author,
    date,
    className = "",
}) => (
    <div className={`pst-a__meta ${className}`.trim()}>
        <div className="pst-a__info">
            <span className="pst-a_aut">{author.name}</span>
            <time
                className="pst-a_dt"
                dateTime={
                    typeof date === "string"
                        ? date
                        : (date as Date).toISOString()
                }
            >
                {formatDate(date)}
            </time>
        </div>
        <div className="avat">
            <img
                src={ava}
                alt={`avatar de ${author.name}`}
                className="av  shadow"
            />
            <img src={ava} alt={`avat de ${author.name}`} className="av " />
        </div>
    </div>
);

export default React.memo(AuthorSignature);
