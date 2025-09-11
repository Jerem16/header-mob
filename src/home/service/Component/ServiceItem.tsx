import React, { memo } from "react";
import Image from "next/image";
import { ServiceItemProps } from "./interface";
import Link from "next/link";

const ServiceItem = ({ title, imgSrc, imgAlt, id }: ServiceItemProps) => (
    <div className="flx-c srv-description">
        <Link href={`/services#${id}`} passHref>
            {title}
        </Link>
        <div className="flx-c icon-description">
            <Image
                className="srv-aside-bg"
                src={imgSrc}
                alt={imgAlt}
                width={1145}
                height={1145}
                loading="lazy"
                priority={false}
            />
        </div>
    </div>
);
export default memo(ServiceItem);
