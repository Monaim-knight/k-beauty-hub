import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    discount: 15
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor and GPS.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.3,
    reviews: 89,
    inStock: true
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable cotton t-shirt in various colors.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'Clothing',
    rating: 4.7,
    reviews: 256,
    inStock: true,
    discount: 20
  },
  {
    id: '4',
    name: 'Leather Crossbody Bag',
    description: 'Stylish leather bag perfect for everyday use.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    category: 'Accessories',
    rating: 4.4,
    reviews: 67,
    inStock: true
  },
  {
    id: '5',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1609592806596-b43bada2f2d2?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.2,
    reviews: 45,
    inStock: false
  },
  {
    id: '6',
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle that keeps drinks cold for 24 hours.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    category: 'Home & Garden',
    rating: 4.8,
    reviews: 189,
    inStock: true,
    discount: 10
  },
  {
    id: '7',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat made from eco-friendly materials.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    category: 'Sports',
    rating: 4.6,
    reviews: 134,
    inStock: true
  },
  {
    id: '8',
    name: 'Bluetooth Speaker',
    description: 'Portable waterproof speaker with 360-degree sound.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.1,
    reviews: 78,
    inStock: true,
    discount: 25
  }
];

export const categories = [
  'All',
  'Electronics',
  'Clothing',
  'Accessories',
  'Home & Garden',
  'Sports'
]; 