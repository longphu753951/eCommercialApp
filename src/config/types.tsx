export interface Category {
  id: number;
  name: string;
  image_outline: string;
  image_solid: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
  avatar_path: string;
  payment_info: object;
}

export interface UserRegister {
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
  avatar?: any;
}

export interface ShippingContact {
  id: number;
}

export interface Product {
  id: number;
  name: string;
  rating: number;
  description: string;
  category: number;
  productAttribute: ProductAttribute;
}

export interface ProductDetail {
  id: number;
  name: string;
  rating: number;
  description: string;
  category: number;
  productAttribute: ProductAttribute[];
}

export interface ProductAttribute {
  sku: number;
  color: string;
  hex: string;
  sale_off: number;
  on_stock: number;
  active: boolean;
  product: number;
  productImage: ProductImage[];
}

export interface ProductImage {
  image: string;
}

export interface Bookmark {
  id: number;
  bookmarkDetail: BookmarkDetail[];
}

export interface BookmarkDetail {
  id: number;
  productAttribute: ProductAttribute;
}

export interface Card {
  id: string;
  brand: string,
  fullName: string;
  last4: string;
  exp_month: string;
  exp_year: string;
}

export interface ShippingUnit {
  id: number;
}

export interface ShippingType {
  id: number;
}

export interface Order {
  id: number;
}

export interface OrderDetail {
  id: number;
}

export interface Review {
  id: number;
}
