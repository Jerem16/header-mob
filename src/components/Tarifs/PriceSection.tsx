// src/components/PriceSection.tsx
import React from "react";
import { CategoryData } from "@src/home/service/Component/servicesTypes";
import PriceCard from "./PriceCard";
import CategoryHeader from "./CategoryHeader";
type Props = { category: CategoryData };

const PriceSection: React.FC<Props> = ({ category }) => (
    <section id={category.ref}>
        <div className="fixed-menu" />
        <section className="category">
            <CategoryHeader title={category.title} intro={category.intro} />

            {category.services.map((service) => (
                <PriceCard
                    key={service.id}
                    service={service}
                    prices={category.prices}
                />
            ))}
        </section>
    </section>
);

export default PriceSection;
