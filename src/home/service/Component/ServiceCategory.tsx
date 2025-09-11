import React, { memo } from "react";
import { ServiceCategoryProps } from "./interface";
import ServiceItem from "./ServiceItem";
import ServiceBanner from "./ServiceBanner";

const ServiceCategory = ({
    id,
    title,
    subtitle,
    intro,
    services,
}: ServiceCategoryProps) => {
    return (
        <div className="services content-wrapper content-srv" id={id}>
            <div className="sgm sgm-tle">
                <h2 className="card_title">{title}</h2>
            </div>
            <div className="sgm">
                <div className="card_H flx-c">
                    <p>
                        {subtitle}
                        <br />
                        <span>{intro}</span>
                    </p>
                </div>
                <div className="card_cnt">
                    <ServiceBanner title={title} />

                    {services.map((service, index) => (
                        <ServiceItem
                            key={`${index}-srv-${title}`}
                            {...service}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default memo(ServiceCategory);
