export interface PriceData {
  sessions: number;
  total: number;
  perSession: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  imgSrc: string;
  imgAlt: string;
  description: string;
}

export interface CategoryData {
  id: string;
  ref: string;
  title: string;
  subtitle: string;
  intro: string;
  prices: PriceData[];
  services: ServiceItem[];
}
