// src/components/CategorySection.tsx
// "use client";
import React from "react";
import type { CategoryData } from "@src/home/service/Component/servicesTypes";
import CategoryHeader from "../Tarifs/CategoryHeader";
import ServiceArticle from "./ServiceArticle";

type Props = { category: CategoryData };

const CategorySection: React.FC<Props> = ({ category }) => (
  <section id={category.ref} key={category.id}>
    <div className="fixed-menu" />
    <section className="category">
      <CategoryHeader title={category.title} intro={category.intro} />

      {category.services.map((svc) => (
        <ServiceArticle key={svc.id} service={svc} />
      ))}
    </section>
  </section>
);

export default CategorySection;
