import React from "react";
import Image from "next/image";
import ButtonLink from "../../components/button/ButtonLink";

const AboutCard = ({ cardIdentity, cardContent }) => {
    return (
        <div className="sgm">
            <div className="card_H flx-c">
                <h3>
                    {cardIdentity.firstName}
                    <span>{cardIdentity.name}</span>
                </h3>
                <Image
                    className="ab-img_head"
                    src="/mob-peur-de-la-conduite/img/about/avatar.webp"
                    alt={`avatar de ${cardIdentity.firstName}`}
                    width={225}
                    height={225}
                    priority={false}
                />
                <p className="profession">{cardIdentity.profession}</p>
            </div>
            <div className="card_cnt">
                {cardContent.description.map((line, i) => (
                    <p
                        key={i + "ab"}
                        dangerouslySetInnerHTML={{ __html: line }}
                    />
                ))}
                <ButtonLink href="/contact">Contacte-moi</ButtonLink>
            </div>
        </div>
    );
};

export default AboutCard;
