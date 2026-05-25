/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface Specification {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  description: string;
  stock: number;
  images: string[];
  rating: number;
  reviews: Review[];
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  specifications: Specification;
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  image: string; // Premium photography banner
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'User' | 'Admin';
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  pincode: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  paymentMethod: 'COD' | 'UPI' | 'Card';
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  date: string;
  couponApplied?: string;
  deviceIp?: string;
  invoiceUrl?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase: number;
  description: string;
}

export interface EmailLog {
  id: string;
  type: string;
  sender?: string;
  recipient: string;
  subject: string;
  body: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'Pending' | 'Resolved';
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
