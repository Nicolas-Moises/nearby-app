export type Details = {
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: number;
  rules: Rule[];
}

type Rule = {
  id: string;
  description: string;
}