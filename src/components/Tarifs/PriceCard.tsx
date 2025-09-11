// src/components/ServiceCard.tsx
import React from "react";
import type { ServiceItem, PriceData } from "@src/home/service/Component/servicesTypes";
import PriceTable from "./PriceTable";

type Props = {
  service: ServiceItem;
  prices: PriceData[];
};

const PriceCard: React.FC<Props> = ({ service, prices }) => (
  <div className="pck-Ct">
    <div className="price-tle">
      <div className="coach">
        <p>Coaching</p>
        <div className="srv-image">
          <img src={service.imgSrc} alt={service.imgAlt} />
        </div>
      </div>
      <div className="coach2">
        <div className="empty" />
        <h3>{service.title}</h3>
      </div>
    </div>

    <div className="price-card">
      <PriceTable prices={prices} />
    </div>
  </div>
);

export default PriceCard;
