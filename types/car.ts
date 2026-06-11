export interface Car {
  id: string;
  brand: string;
  model: string;
  registration_year: number;
  fuel_type: string;
  transmission: string;
  km_driven: number;
  discount_price: number;
  original_price: number;
  ownership: string;
  description: string;
  registration_location: string;
  images: string[];
  badge: string;
  slug: string;
  variant: string;
  seats: number;
  features: string[];
  engine_cc: number;
  power: number;
  mileage: number;
}