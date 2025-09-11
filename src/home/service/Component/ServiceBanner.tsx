import React, { memo } from "react";
import Image from "next/image";

interface ServiceBannerProps {
    title: string;
}

const ServiceBanner = ({ title }: ServiceBannerProps) => {
    return (
        <div className="flx-c srv-description o1">
            <p>
                {title.includes("novice") ? "Vise l’excellence" : "Redécouvrez"}
                <br />
                {title.includes("novice")
                    ? "En route vers la réussite !"
                    : "Le plaisir de conduire !"}
            </p>
            <div className="flx-c icon-description">
                <Image
                    className="srv-aside-bg"
                    src="/mob-peur-de-la-conduite/img/services/Trophy.svg"
                    alt="Logo Trophy"
                    width={1145}
                    height={1145}
                    loading="lazy"
                    priority={false}
                />
            </div>
        </div>
    );
};

export default memo(ServiceBanner);
