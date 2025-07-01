export const products = [
  // SKINCARE PRODUCTS
  {
    id: 1,
    name: 'COSRX Advanced Snail 96 Mucin Power Essence',
    price: 24.99,
    originalPrice: 32.99,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop'
    ],
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    category: 'skincare',
    rating: 4.8,
    reviews: 1247,
    description: 'Hydrating essence with 96% snail mucin for plump, glowing skin. Reduces fine lines and improves skin texture.',
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: 2,
    name: 'Laneige Water Sleeping Mask',
    price: 29.99,
    originalPrice: 39.99,
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop'
    ],
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    category: 'skincare',
    rating: 4.7,
    reviews: 892,
    description: 'Overnight hydrating mask that locks in moisture while you sleep. Leaves skin refreshed and dewy.',
    inStock: true,
    isNew: false,
    isFeatured: true
  },
  {
    id: 3,
    name: 'Innisfree Green Tea Seed Serum',
    price: 19.99,
    originalPrice: 25.99,
    images: [
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop'
    ],
    category: 'skincare',
    rating: 4.6,
    reviews: 1563,
    description: 'Antioxidant-rich serum with green tea extract for brightening and anti-aging benefits.',
    inStock: true,
    isNew: false,
    isFeatured: true
  },
  {
    id: 4,
    name: 'The Face Shop Rice Water Bright Cleansing Foam',
    price: 12.99,
    originalPrice: 16.99,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop'
    ],
    category: 'skincare',
    rating: 4.4,
    reviews: 945,
    description: 'Gentle foaming cleanser with rice water extract for brightening and gentle cleansing.',
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: 5,
    name: 'TonyMoly Panda\'s Dream So Cool Eye Stick',
    price: 6.99,
    originalPrice: 9.99,
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop'
    ],
    category: 'skincare',
    rating: 4.3,
    reviews: 672,
    description: 'Cooling eye stick with panda design. Reduces puffiness and dark circles.',
    inStock: true,
    isNew: true,
    isFeatured: false
  },
  {
    id: 6,
    name: 'Mizon Snail Recovery Gel Cream',
    price: 16.99,
    originalPrice: 22.99,
    images: [
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop'
    ],
    category: 'skincare',
    rating: 4.5,
    reviews: 789,
    description: 'Lightweight gel cream with snail mucin for healing and moisturizing.',
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: 7,
    name: 'A\'PIEU Madecassoside Cream',
    price: 18.99,
    originalPrice: 24.99,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop'
    ],
    category: 'skincare',
    rating: 4.7,
    reviews: 567,
    description: 'Calming cream with madecassoside for sensitive and irritated skin.',
    inStock: true,
    isNew: true,
    isFeatured: false
  },
  {
    id: 8,
    name: 'Nature Republic Aloe Vera Gel',
    price: 9.99,
    originalPrice: 13.99,
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop'
    ],
    category: 'skincare',
    rating: 4.4,
    reviews: 2156,
    description: '92% aloe vera gel for soothing and hydrating skin. Multi-purpose use.',
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: 9,
    name: 'Klairs Supple Preparation Facial Toner',
    price: 22.99,
    originalPrice: 28.99,
    images: [
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop'
    ],
    category: 'skincare',
    rating: 4.6,
    reviews: 1234,
    description: 'Hydrating toner that preps skin for better absorption of subsequent products.',
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: 10,
    name: 'Benton Snail Bee High Content Essence',
    price: 21.99,
    originalPrice: 27.99,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop'
    ],
    category: 'skincare',
    rating: 4.5,
    reviews: 876,
    description: 'Essence with snail mucin and bee venom for brightening and anti-aging.',
    inStock: true,
    isNew: false,
    isFeatured: false
  },

  // MAKEUP PRODUCTS
  {
    id: 11,
    name: 'Etude House Dear Darling Water Gel Tint',
    price: 8.99,
    originalPrice: 12.99,
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop'
    ],
    category: 'makeup',
    rating: 4.5,
    reviews: 2341,
    description: 'Long-lasting water-based lip tint with natural finish. Available in multiple shades.',
    inStock: true,
    isNew: true,
    isFeatured: false
  },
  {
    id: 12,
    name: 'Missha Perfect Cover BB Cream',
    price: 14.99,
    originalPrice: 18.99,
    images: [
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop'
    ],
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
    category: 'makeup',
    rating: 4.7,
    reviews: 1876,
    description: 'All-in-one BB cream with SPF 42. Provides coverage, sun protection, and skincare benefits.',
    inStock: true,
    isNew: false,
    isFeatured: true
  },
  {
    id: 13,
    name: 'Peripera Ink Velvet Lip Tint',
    price: 11.99,
    originalPrice: 15.99,
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop'
    ],
    category: 'makeup',
    rating: 4.6,
    reviews: 1342,
    description: 'Velvety matte lip tint with long-lasting color and comfortable wear.',
    inStock: true,
    isNew: false,
    isFeatured: true
  },
  {
    id: 14,
    name: 'Clio Kill Cover Liquid Concealer',
    price: 13.99,
    originalPrice: 17.99,
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop'
    ],
    category: 'makeup',
    rating: 4.6,
    reviews: 923,
    description: 'High-coverage liquid concealer for flawless finish and long-lasting wear.',
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: 15,
    name: '3CE Mood Recipe Lipstick',
    price: 16.99,
    originalPrice: 21.99,
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop'
    ],
    category: 'makeup',
    rating: 4.4,
    reviews: 654,
    description: 'Creamy lipstick with mood-enhancing colors. Long-lasting and moisturizing.',
    inStock: true,
    isNew: true,
    isFeatured: false
  },
  {
    id: 16,
    name: 'Innisfree No-Sebum Mineral Powder',
    price: 7.99,
    originalPrice: 10.99,
    images: [
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop'
    ],
    category: 'makeup',
    rating: 4.3,
    reviews: 1876,
    description: 'Oil-control powder with natural minerals. Keeps makeup fresh all day.',
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: 17,
    name: 'Etude House Play Color Eyes Palette',
    price: 24.99,
    originalPrice: 29.99,
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop'
    ],
    category: 'makeup',
    rating: 4.5,
    reviews: 432,
    description: 'Colorful eyeshadow palette with 10 shades. Highly pigmented and blendable.',
    inStock: true,
    isNew: true,
    isFeatured: false
  },
  {
    id: 18,
    name: 'The Saem Cover Perfection Tip Concealer',
    price: 5.99,
    originalPrice: 8.99,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop'
    ],
    category: 'makeup',
    rating: 4.7,
    reviews: 2156,
    description: 'High-coverage concealer stick for blemishes and dark circles.',
    inStock: true,
    isNew: false,
    isFeatured: false
  },

  // HAIRCARE PRODUCTS
  {
    id: 19,
    name: 'Amore Pacific Treatment Enzyme Peel',
    price: 45.99,
    originalPrice: 55.99,
    images: [
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop'
    ],
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_10mb.mp4',
    category: 'haircare',
    rating: 4.8,
    reviews: 234,
    description: 'Enzyme-based scalp treatment that gently exfoliates and promotes healthy hair growth.',
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: 20,
    name: 'Lador Scalp Scaling Shampoo',
    price: 18.99,
    originalPrice: 24.99,
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop'
    ],
    category: 'haircare',
    rating: 4.5,
    reviews: 567,
    description: 'Scalp care shampoo that removes buildup and promotes healthy scalp environment.',
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: 21,
    name: 'Mise en Scene Perfect Serum',
    price: 12.99,
    originalPrice: 16.99,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    category: 'haircare',
    rating: 4.6,
    reviews: 892,
    description: 'Argan oil hair serum for smooth, frizz-free hair with natural shine.',
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: 22,
    name: 'Dahong Hair Treatment',
    price: 32.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
    category: 'haircare',
    rating: 4.4,
    reviews: 345,
    description: 'Intensive hair treatment mask for damaged and dry hair.',
    inStock: true,
    isNew: true,
    isFeatured: false
  },
  {
    id: 23,
    name: 'Ryoe Hair Loss Prevention Shampoo',
    price: 28.99,
    originalPrice: 34.99,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    category: 'haircare',
    rating: 4.3,
    reviews: 678,
    description: 'Traditional Korean herbal shampoo for hair loss prevention and scalp health.',
    inStock: true,
    isNew: false,
    isFeatured: false
  },

  // BODY CARE PRODUCTS
  {
    id: 24,
    name: 'Innisfree Green Tea Body Wash',
    price: 15.99,
    originalPrice: 19.99,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    category: 'bodycare',
    rating: 4.5,
    reviews: 456,
    description: 'Refreshing body wash with green tea extract for gentle cleansing and hydration.',
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: 25,
    name: 'The Face Shop Rice Water Bright Body Lotion',
    price: 18.99,
    originalPrice: 23.99,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    category: 'bodycare',
    rating: 4.4,
    reviews: 234,
    description: 'Brightening body lotion with rice water extract for smooth, glowing skin.',
    inStock: true,
    isNew: true,
    isFeatured: false
  },
  {
    id: 26,
    name: 'Nature Republic Aloe Vera Body Wash',
    price: 13.99,
    originalPrice: 17.99,
    image: 'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
    category: 'bodycare',
    rating: 4.3,
    reviews: 567,
    description: 'Soothing body wash with aloe vera for sensitive skin.',
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: 27,
    name: 'Laneige Body Milk',
    price: 22.99,
    originalPrice: 27.99,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    category: 'bodycare',
    rating: 4.6,
    reviews: 345,
    description: 'Lightweight body milk with long-lasting hydration and fresh scent.',
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: 28,
    name: 'TonyMoly Foot Peeling Shoes',
    price: 8.99,
    originalPrice: 12.99,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    category: 'bodycare',
    rating: 4.2,
    reviews: 789,
    description: 'Foot peeling treatment that removes dead skin for soft, smooth feet.',
    inStock: true,
    isNew: true,
    isFeatured: false
  },

  // BEAUTY TOOLS
  {
    id: 29,
    name: 'Pony Effect Makeup Sponge',
    price: 12.99,
    originalPrice: 16.99,
    image: 'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
    category: 'tools',
    rating: 4.7,
    reviews: 432,
    description: 'Professional makeup sponge for flawless foundation application.',
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: 30,
    name: 'Etude House Beauty Tool Set',
    price: 19.99,
    originalPrice: 24.99,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    category: 'tools',
    rating: 4.5,
    reviews: 234,
    description: 'Complete beauty tool set including tweezers, scissors, and nail tools.',
    inStock: true,
    isNew: true,
    isFeatured: false
  },
  {
    id: 31,
    name: 'Innisfree Makeup Brush Set',
    price: 34.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    category: 'tools',
    rating: 4.6,
    reviews: 345,
    description: 'Professional makeup brush set with soft bristles for perfect application.',
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: 32,
    name: 'The Face Shop Facial Roller',
    price: 16.99,
    originalPrice: 21.99,
    image: 'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
    category: 'tools',
    rating: 4.4,
    reviews: 567,
    description: 'Jade facial roller for lymphatic drainage and skin tightening.',
    inStock: true,
    isNew: true,
    isFeatured: false
  },
  {
    id: 33,
    name: 'TonyMoly Eyelash Curler',
    price: 9.99,
    originalPrice: 13.99,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    category: 'tools',
    rating: 4.3,
    reviews: 678,
    description: 'Professional eyelash curler for perfectly curled lashes.',
    inStock: true,
    isNew: false,
    isFeatured: false
  },

  // ACCESSORIES
  {
    id: 34,
    name: 'Etude House Beauty Bag',
    price: 24.99,
    originalPrice: 29.99,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    category: 'accessories',
    rating: 4.5,
    reviews: 234,
    description: 'Cute and spacious beauty bag with multiple compartments.',
    inStock: true,
    isNew: true,
    isFeatured: false
  },
  {
    id: 35,
    name: 'The Face Shop Makeup Organizer',
    price: 32.99,
    originalPrice: 38.99,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    category: 'accessories',
    rating: 4.6,
    reviews: 345,
    description: 'Acrylic makeup organizer with drawers for perfect organization.',
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: 36,
    name: 'Innisfree Travel Set',
    price: 28.99,
    originalPrice: 34.99,
    image: 'https://images.unsplash.com/photo-1556229010-6c6760aa19d5?w=400&h=400&fit=crop',
    category: 'accessories',
    rating: 4.4,
    reviews: 456,
    description: 'Travel-sized beauty set with essential skincare products.',
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: 37,
    name: 'Nature Republic Hair Accessories Set',
    price: 14.99,
    originalPrice: 18.99,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    category: 'accessories',
    rating: 4.3,
    reviews: 234,
    description: 'Set of cute hair clips and bands for styling.',
    inStock: true,
    isNew: true,
    isFeatured: false
  },
  {
    id: 38,
    name: 'Laneige Mirror Compact',
    price: 11.99,
    originalPrice: 15.99,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    category: 'accessories',
    rating: 4.5,
    reviews: 567,
    description: 'Portable mirror compact with LED light for touch-ups.',
    inStock: true,
    isNew: false,
    isFeatured: false
  }
];

export const categories = [
  {
    id: 'skincare',
    name: 'Skincare',
    description: 'Cleansers, toners, serums, and moisturizers for healthy skin',
    icon: '🧴',
    productCount: 10
  },
  {
    id: 'makeup',
    name: 'Makeup',
    description: 'Foundation, lip products, eye makeup, and beauty tools',
    icon: '💄',
    productCount: 8
  },
  {
    id: 'haircare',
    name: 'Haircare',
    description: 'Shampoos, conditioners, treatments, and styling products',
    icon: '🧴',
    productCount: 5
  },
  {
    id: 'bodycare',
    name: 'Body Care',
    description: 'Body washes, lotions, and body treatments',
    icon: '🛁',
    productCount: 5
  },
  {
    id: 'tools',
    name: 'Beauty Tools',
    description: 'Makeup brushes, sponges, and beauty accessories',
    icon: '🖌️',
    productCount: 5
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Beauty bags, organizers, and other accessories',
    icon: '👜',
    productCount: 5
  }
]; 