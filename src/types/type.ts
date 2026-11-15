export interface ICategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
  descriptionBn: string;
}

export interface IMarketPrice {
  id: string;
  marketName: string;
  area: string;
  min: number;
  max: number;
  price: number;
}

export type ChangeDir = "up" | "down" | "flat";

export interface IProduct {
  id: string;
  slug: string;
  nameBn: string;
  descriptionBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  tags: string[];
  unit: string;
  unitNameBn: string;
  image: string;
  today: number;
  yesterday: number;
  change: {
    dir: ChangeDir;
    pct: number;
  };
  markets: IMarketPrice[];
  lastUpdated: string;
}
