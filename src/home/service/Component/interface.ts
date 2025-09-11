export interface ServiceItemProps {
    title: string;
    imgSrc: string;
    imgAlt: string;
    id: string;
}

export interface ServiceCategoryProps {
    id: string;
    title: string;
    subtitle: string;
    intro: string;
    services: ServiceItemProps[];
}
