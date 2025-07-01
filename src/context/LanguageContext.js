import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation data
const translations = {
  en: {
    // Header
    home: 'Home',
    products: 'Products',
    categories: 'Categories',
    about: 'About',
    searchPlaceholder: 'Search products...',
    
    // Hero Section
    heroTitle: 'Discover Amazing',
    heroTitleHighlight: 'Korean Beauty',
    heroSubtitle: 'Experience the latest Korean beauty trends with authentic K-beauty products. Premium skincare, innovative makeup, and beauty secrets from Korea - all in one place.',
    shopNow: 'Shop K-Beauty',
    learnMore: 'Learn More',
    freeShipping: 'Free Shipping',
    freeShippingDesc: 'On orders over $50',
    securePayment: 'Authentic Products',
    securePaymentDesc: '100% genuine K-beauty',
    qualityGuarantee: 'Beauty Guarantee',
    qualityGuaranteeDesc: '30-day returns',
    liveSupport: 'Beauty Experts',
    customerRating: 'Customer Rating',
    
    // Products
    featuredProducts: 'Trending K-Beauty',
    featuredProductsDesc: 'Discover our curated selection of the hottest Korean beauty products that beauty enthusiasts love.',
    viewAllProducts: 'View All K-Beauty',
    allProducts: 'All K-Beauty Products',
    allProductsDesc: 'Browse our complete collection of authentic Korean beauty products',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    favorites: 'Favorites',
    addMore: 'Add More',
    outOfStock: 'Out of Stock',
    noProductsFound: 'No products found.',
    sortByName: 'Sort by Name',
    sortByPriceLow: 'Price: Low to High',
    sortByPriceHigh: 'Price: High to Low',
    sortByRating: 'Rating',
    
    // Cart
    shoppingCart: 'Shopping Cart',
    yourCartEmpty: 'Your cart is empty',
    cartEmptyDesc: 'Add some products to get started!',
    total: 'Total:',
    proceedToCheckout: 'Proceed to Checkout',
    clearCart: 'Clear Cart',
    checkout: 'Checkout',
    processing: 'Processing...',
    
    // Checkout
    checkoutTitle: 'Checkout',
    backToCart: 'Back to Cart',
    shippingInformation: 'Shipping Information',
    paymentInformation: 'Payment Information',
    orderSummary: 'Order Summary',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    state: 'State',
    zipCode: 'ZIP Code',
    country: 'Country',
    cardNumber: 'Card Number',
    nameOnCard: 'Name on Card',
    expiryDate: 'Expiry Date',
    cvv: 'CVV',
    placeOrder: 'Place Order',
    processingOrder: 'Processing Order...',
    orderConfirmed: 'Order Confirmed!',
    orderConfirmedDesc: 'Thank you for your purchase. Your order has been successfully placed.',
    orderTotal: 'Order Total',
    continueShopping: 'Continue Shopping',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    tax: 'Tax',
    
    // Categories
    shopByCategory: 'Shop by Category',
    shopByCategoryDesc: 'Find exactly what you\'re looking for in our organized K-beauty categories.',
    skincare: 'Skincare',
    makeup: 'Makeup',
    haircare: 'Haircare',
    bodycare: 'Body Care',
    tools: 'Beauty Tools',
    accessories: 'Accessories',
    
    // Newsletter
    stayUpdated: 'Stay Updated',
    stayUpdatedDesc: 'Subscribe to our newsletter for the latest products, exclusive offers, and updates.',
    enterEmail: 'Enter your email',
    enterPhone: 'Enter your phone number',
    subscribe: 'Subscribe',
    subscribeByEmail: 'Subscribe by Email',
    subscribeByPhone: 'Subscribe by Phone',
    or: 'or',
    newsletterSuccess: 'Successfully subscribed!',
    newsletterError: 'Please enter a valid email or phone number.',
    
    // Footer
    companyDesc: 'Your trusted destination for quality products. We\'re committed to providing exceptional shopping experiences with the best customer service.',
    quickLinks: 'Quick Links',
    customerService: 'Customer Service',
    contactUs: 'Contact Us',
    helpCenter: 'Help Center',
    shippingInfo: 'Shipping Info',
    returnsExchanges: 'Returns & Exchanges',
    sizeGuide: 'Size Guide',
    faq: 'FAQ',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePolicy: 'Cookie Policy',
    copyright: '© 2024 ShopHub. All rights reserved.',
    
    // Countries
    unitedStates: 'United States',
    canada: 'Canada',
    unitedKingdom: 'United Kingdom',
    australia: 'Australia',
    bangladesh: 'Bangladesh'
  },
  
  es: {
    // Header
    home: 'Inicio',
    products: 'Productos',
    categories: 'Categorías',
    about: 'Acerca de',
    searchPlaceholder: 'Buscar productos...',
    
    // Hero Section
    heroTitle: 'Descubre la Belleza',
    heroTitleHighlight: 'Coreana',
    heroSubtitle: 'Experimenta las últimas tendencias de belleza coreana con productos auténticos de K-beauty. Cuidado de la piel premium, maquillaje innovador y secretos de belleza de Corea - todo en un lugar.',
    shopNow: 'Comprar K-Beauty',
    learnMore: 'Saber Más',
    freeShipping: 'Envío Gratis',
    freeShippingDesc: 'En pedidos superiores a $50',
    securePayment: 'Productos Auténticos',
    securePaymentDesc: '100% K-beauty genuino',
    qualityGuarantee: 'Garantía de Belleza',
    qualityGuaranteeDesc: 'Devoluciones de 30 días',
    liveSupport: 'Expertos en Belleza',
    customerRating: 'Calificación de Clientes',
    
    // Products
    featuredProducts: 'K-Beauty Tendencia',
    featuredProductsDesc: 'Descubre nuestra selección curada de los productos de belleza coreana más populares que los entusiastas de la belleza aman.',
    viewAllProducts: 'Ver Todo K-Beauty',
    allProducts: 'Todos los Productos K-Beauty',
    allProductsDesc: 'Explora nuestra colección completa de productos auténticos de belleza coreana',
    addToCart: 'Agregar al Carrito',
    buyNow: 'Comprar Ahora',
    addToFavorites: 'Agregar a Favoritos',
    removeFromFavorites: 'Quitar de Favoritos',
    favorites: 'Favoritos',
    addMore: 'Agregar Más',
    outOfStock: 'Sin Stock',
    noProductsFound: 'No se encontraron productos.',
    sortByName: 'Ordenar por Nombre',
    sortByPriceLow: 'Precio: Menor a Mayor',
    sortByPriceHigh: 'Precio: Mayor a Menor',
    sortByRating: 'Calificación',
    
    // Cart
    shoppingCart: 'Carrito de Compras',
    yourCartEmpty: 'Tu carrito está vacío',
    cartEmptyDesc: '¡Agrega algunos productos para comenzar!',
    total: 'Total:',
    proceedToCheckout: 'Proceder al Pago',
    clearCart: 'Vaciar Carrito',
    checkout: 'Pagar',
    processing: 'Procesando...',
    
    // Checkout
    checkoutTitle: 'Pago',
    backToCart: 'Volver al Carrito',
    shippingInformation: 'Información de Envío',
    paymentInformation: 'Información de Pago',
    orderSummary: 'Resumen del Pedido',
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'Correo Electrónico',
    phone: 'Teléfono',
    address: 'Dirección',
    city: 'Ciudad',
    state: 'Estado',
    zipCode: 'Código Postal',
    country: 'País',
    cardNumber: 'Número de Tarjeta',
    nameOnCard: 'Nombre en la Tarjeta',
    expiryDate: 'Fecha de Vencimiento',
    cvv: 'CVV',
    placeOrder: 'Realizar Pedido',
    processingOrder: 'Procesando Pedido...',
    orderConfirmed: '¡Pedido Confirmado!',
    orderConfirmedDesc: 'Gracias por tu compra. Tu pedido ha sido realizado exitosamente.',
    orderTotal: 'Total del Pedido',
    continueShopping: 'Seguir Comprando',
    subtotal: 'Subtotal',
    shipping: 'Envío',
    tax: 'Impuestos',
    
    // Categories
    shopByCategory: 'Comprar por Categoría',
    shopByCategoryDesc: 'Encuentra exactamente lo que buscas en nuestras categorías organizadas de K-beauty.',
    skincare: 'Cuidado de la Piel',
    makeup: 'Maquillaje',
    haircare: 'Cuidado del Cabello',
    bodycare: 'Cuidado Corporal',
    tools: 'Herramientas de Belleza',
    accessories: 'Accesorios',
    
    // Newsletter
    stayUpdated: 'Mantente Actualizado',
    stayUpdatedDesc: 'Suscríbete a nuestro boletín para los últimos productos, ofertas exclusivas y actualizaciones.',
    enterEmail: 'Ingresa tu correo',
    enterPhone: 'Ingresa tu número de teléfono',
    subscribe: 'Suscribirse',
    subscribeByEmail: 'Suscribirse por correo electrónico',
    subscribeByPhone: 'Suscribirse por teléfono',
    or: 'o',
    newsletterSuccess: '¡Suscrito exitosamente!',
    newsletterError: 'Por favor, ingrese un correo electrónico o número de teléfono válido.',
    
    // Footer
    companyDesc: 'Tu destino confiable para productos de belleza coreana auténticos. Nos comprometemos a brindar experiencias de compra excepcionales con el mejor servicio al cliente.',
    quickLinks: 'Enlaces Rápidos',
    customerService: 'Servicio al Cliente',
    contactUs: 'Contáctanos',
    helpCenter: 'Centro de Ayuda',
    shippingInfo: 'Información de Envío',
    returnsExchanges: 'Devoluciones y Cambios',
    sizeGuide: 'Guía de Tallas',
    faq: 'Preguntas Frecuentes',
    privacyPolicy: 'Política de Privacidad',
    termsOfService: 'Términos de Servicio',
    cookiePolicy: 'Política de Cookies',
    copyright: '© 2024 K-Beauty Hub. Todos los derechos reservados.',
    
    // Countries
    unitedStates: 'Estados Unidos',
    canada: 'Canadá',
    unitedKingdom: 'Reino Unido',
    australia: 'Australia',
    bangladesh: 'Bangladesh'
  },
  
  fr: {
    // Header
    home: 'Accueil',
    products: 'Produits',
    categories: 'Catégories',
    about: 'À propos',
    searchPlaceholder: 'Rechercher des produits...',
    
    // Hero Section
    heroTitle: 'Découvrez la Beauté',
    heroTitleHighlight: 'Coréenne',
    heroSubtitle: 'Découvrez les dernières tendances de beauté coréenne avec des produits K-beauty authentiques. Soins de la peau premium, maquillage innovant et secrets de beauté de Corée - le tout en un seul endroit.',
    shopNow: 'Acheter K-Beauty',
    learnMore: 'En Savoir Plus',
    freeShipping: 'Livraison Gratuite',
    freeShippingDesc: 'Pour les commandes de plus de 50€',
    securePayment: 'Produits Authentiques',
    securePaymentDesc: '100% K-beauty authentique',
    qualityGuarantee: 'Garantie Beauté',
    qualityGuaranteeDesc: 'Retours sous 30 jours',
    liveSupport: 'Experts Beauté',
    customerRating: 'Évaluation Client',
    
    // Products
    featuredProducts: 'K-Beauty Tendances',
    featuredProductsDesc: 'Découvrez notre sélection de produits de beauté coréenne les plus populaires que les passionnés de beauté adorent.',
    viewAllProducts: 'Voir Tout K-Beauty',
    allProducts: 'Tous les Produits K-Beauty',
    allProductsDesc: 'Parcourez notre collection complète de produits de beauté coréenne authentiques',
    addToCart: 'Ajouter au Panier',
    buyNow: 'Acheter Maintenant',
    addToFavorites: 'Ajouter aux Favoris',
    removeFromFavorites: 'Retirer des Favoris',
    favorites: 'Favoris',
    addMore: 'Ajouter Plus',
    outOfStock: 'Rupture de Stock',
    noProductsFound: 'Aucun produit trouvé.',
    sortByName: 'Trier par Nom',
    sortByPriceLow: 'Prix: Croissant',
    sortByPriceHigh: 'Prix: Décroissant',
    sortByRating: 'Évaluation',
    
    // Cart
    shoppingCart: 'Panier d\'Achat',
    yourCartEmpty: 'Votre panier est vide',
    cartEmptyDesc: 'Ajoutez quelques produits pour commencer !',
    total: 'Total:',
    proceedToCheckout: 'Procéder au Paiement',
    clearCart: 'Vider le Panier',
    checkout: 'Payer',
    processing: 'Traitement...',
    
    // Checkout
    checkoutTitle: 'Paiement',
    backToCart: 'Retour au Panier',
    shippingInformation: 'Informations de Livraison',
    paymentInformation: 'Informations de Paiement',
    orderSummary: 'Résumé de la Commande',
    firstName: 'Prénom',
    lastName: 'Nom de Famille',
    email: 'Email',
    phone: 'Téléphone',
    address: 'Adresse',
    city: 'Ville',
    state: 'État',
    zipCode: 'Code Postal',
    country: 'Pays',
    cardNumber: 'Numéro de Carte',
    nameOnCard: 'Nom sur la Carte',
    expiryDate: 'Date d\'Expiration',
    cvv: 'CVV',
    placeOrder: 'Passer la Commande',
    processingOrder: 'Traitement de la Commande...',
    orderConfirmed: 'Commande Confirmée !',
    orderConfirmedDesc: 'Merci pour votre achat. Votre commande a été passée avec succès.',
    orderTotal: 'Total de la Commande',
    continueShopping: 'Continuer les Achats',
    subtotal: 'Sous-total',
    shipping: 'Livraison',
    tax: 'Taxes',
    
    // Categories
    shopByCategory: 'Acheter par Catégorie',
    shopByCategoryDesc: 'Trouvez exactement ce que vous cherchez dans nos catégories organisées de K-beauty.',
    skincare: 'Soins de la Peau',
    makeup: 'Maquillage',
    haircare: 'Soins des Cheveux',
    bodycare: 'Soins du Corps',
    tools: 'Outils de Beauté',
    accessories: 'Accessoires',
    
    // Newsletter
    stayUpdated: 'Restez Informé',
    stayUpdatedDesc: 'Abonnez-vous à notre newsletter pour les derniers produits, offres exclusives et mises à jour.',
    enterEmail: 'Entrez votre email',
    enterPhone: 'Entrez votre numéro de téléphone',
    subscribe: 'S\'abonner',
    subscribeByEmail: 'S\'abonner par email',
    subscribeByPhone: 'S\'abonner par téléphone',
    or: 'ou',
    newsletterSuccess: 'Abonné avec succès !',
    newsletterError: 'Veuillez entrer un email ou numéro de téléphone valide.',
    
    // Footer
    companyDesc: 'Votre destination de confiance pour des produits de beauté coréenne authentiques. Nous nous engageons à fournir des expériences d\'achat exceptionnelles avec le meilleur service client.',
    quickLinks: 'Liens Rapides',
    customerService: 'Service Client',
    contactUs: 'Contactez-nous',
    helpCenter: 'Centre d\'Aide',
    shippingInfo: 'Informations de Livraison',
    returnsExchanges: 'Retours et Échanges',
    sizeGuide: 'Guide des Tailles',
    faq: 'FAQ',
    privacyPolicy: 'Politique de Confidentialité',
    termsOfService: 'Conditions de Service',
    cookiePolicy: 'Politique des Cookies',
    copyright: '© 2024 K-Beauty Hub. Tous droits réservés.',
    
    // Countries
    unitedStates: 'États-Unis',
    canada: 'Canada',
    unitedKingdom: 'Royaume-Uni',
    australia: 'Australie',
    bangladesh: 'Bangladesh'
  },

  bn: {
    // Header
    home: 'হোম',
    products: 'পণ্যসমূহ',
    categories: 'বিভাগসমূহ',
    about: 'আমাদের সম্পর্কে',
    searchPlaceholder: 'পণ্য খুঁজুন...',
    
    // Hero Section
    heroTitle: 'আশ্চর্যজনক কোরিয়ান',
    heroTitleHighlight: 'বিউটি আবিষ্কার করুন',
    heroSubtitle: 'প্রকৃত কে-বিউটি পণ্য দিয়ে সর্বশেষ কোরিয়ান বিউটি ট্রেন্ড অনুভব করুন। প্রিমিয়াম স্কিনকেয়ার, উদ্ভাবনী মেকআপ এবং কোরিয়ার বিউটি সিক্রেট - সবকিছু একই জায়গায়।',
    shopNow: 'কে-বিউটি কিনুন',
    learnMore: 'আরও জানুন',
    freeShipping: 'বিনামূল্যে ডেলিভারি',
    freeShippingDesc: '$৫০ এর বেশি অর্ডারে',
    securePayment: 'প্রকৃত পণ্য',
    securePaymentDesc: '১০০% প্রকৃত কে-বিউটি',
    qualityGuarantee: 'বিউটি গ্যারান্টি',
    qualityGuaranteeDesc: '৩০ দিনের রিটার্ন',
    liveSupport: 'বিউটি বিশেষজ্ঞ',
    customerRating: 'গ্রাহক রেটিং',
    
    // Products
    featuredProducts: 'ট্রেন্ডিং কে-বিউটি',
    featuredProductsDesc: 'আমাদের বিউটি উৎসাহীদের প্রিয় সবচেয়ে জনপ্রিয় কোরিয়ান বিউটি পণ্যগুলির নির্বাচন আবিষ্কার করুন।',
    viewAllProducts: 'সব কে-বিউটি দেখুন',
    allProducts: 'সব কে-বিউটি পণ্য',
    allProductsDesc: 'প্রকৃত কোরিয়ান বিউটি পণ্যগুলির আমাদের সম্পূর্ণ সংগ্রহ ব্রাউজ করুন',
    addToCart: 'কার্টে যোগ করুন',
    buyNow: 'Buy Now',
    addToFavorites: 'পছন্দ যোগ করুন',
    removeFromFavorites: 'পছন্দ সরান',
    favorites: 'পছন্দ',
    addMore: 'আরও যোগ করুন',
    outOfStock: 'স্টক শেষ',
    noProductsFound: 'কোন পণ্য পাওয়া যায়নি।',
    sortByName: 'নাম অনুযায়ী সাজান',
    sortByPriceLow: 'মূল্য: কম থেকে বেশি',
    sortByPriceHigh: 'মূল্য: বেশি থেকে কম',
    sortByRating: 'রেটিং',
    
    // Cart
    shoppingCart: 'শপিং কার্ট',
    yourCartEmpty: 'আপনার কার্ট খালি',
    cartEmptyDesc: 'শুরু করতে কিছু পণ্য যোগ করুন!',
    total: 'মোট:',
    proceedToCheckout: 'চেকআউটে যান',
    clearCart: 'কার্ট খালি করুন',
    checkout: 'চেকআউট',
    processing: 'প্রক্রিয়াকরণ হচ্ছে...',
    
    // Checkout
    checkoutTitle: 'চেকআউট',
    backToCart: 'কার্টে ফিরে যান',
    shippingInformation: 'শিপিং তথ্য',
    paymentInformation: 'পেমেন্ট তথ্য',
    orderSummary: 'অর্ডার সারসংক্ষেপ',
    firstName: 'নামের প্রথম অংশ',
    lastName: 'নামের শেষ অংশ',
    email: 'ইমেইল',
    phone: 'ফোন',
    address: 'ঠিকানা',
    city: 'শহর',
    state: 'রাজ্য',
    zipCode: 'জিপ কোড',
    country: 'দেশ',
    cardNumber: 'কার্ড নম্বর',
    nameOnCard: 'কার্ডে নাম',
    expiryDate: 'মেয়াদ শেষের তারিখ',
    cvv: 'সিভিভি',
    placeOrder: 'অর্ডার দিন',
    processingOrder: 'অর্ডার প্রক্রিয়াকরণ হচ্ছে...',
    orderConfirmed: 'অর্ডার নিশ্চিত!',
    orderConfirmedDesc: 'আপনার কেনাকাটার জন্য ধন্যবাদ। আপনার অর্ডার সফলভাবে দেওয়া হয়েছে।',
    orderTotal: 'অর্ডার মোট',
    continueShopping: 'কেনাকাটা চালিয়ে যান',
    subtotal: 'সাবটোটাল',
    shipping: 'শিপিং',
    tax: 'কর',
    
    // Categories
    shopByCategory: 'বিভাগ অনুযায়ী কিনুন',
    shopByCategoryDesc: 'আমাদের সংগঠিত কে-বিউটি বিভাগগুলিতে ঠিক যা খুঁজছেন তা খুঁজে পান।',
    skincare: 'স্কিনকেয়ার',
    makeup: 'মেকআপ',
    haircare: 'হেয়ারকেয়ার',
    bodycare: 'বডি কেয়ার',
    tools: 'বিউটি টুলস',
    accessories: 'অ্যাকসেসরিজ',
    
    // Newsletter
    stayUpdated: 'আপডেট থাকুন',
    stayUpdatedDesc: 'সর্বশেষ পণ্য, এক্সক্লুসিভ অফার এবং আপডেটের জন্য আমাদের নিউজলেটারে সাবস্ক্রাইব করুন।',
    enterEmail: 'আপনার ইমেইল দিন',
    enterPhone: 'আপনার ফোন নম্বর দিন',
    subscribe: 'সাবস্ক্রাইব করুন',
    subscribeByEmail: 'ইমেইল দিয়ে সাবস্ক্রাইব করুন',
    subscribeByPhone: 'ফোন দিয়ে সাবস্ক্রাইব করুন',
    or: 'অথবা',
    newsletterSuccess: 'সফলভাবে সাবস্ক্রাইব করা হয়েছে!',
    newsletterError: 'দয়া করে একটি বাস্তব ইমেইল বা ফোন নম্বর প্রবেশ করুন।',
    
    // Footer
    companyDesc: 'প্রকৃত কোরিয়ান বিউটি পণ্যের জন্য আপনার বিশ্বস্ত গন্তব্য। আমরা সর্বোত্তম গ্রাহক সেবা সহ অসাধারণ কেনাকাটার অভিজ্ঞতা প্রদানের জন্য প্রতিশ্রুতিবদ্ধ।',
    quickLinks: 'দ্রুত লিঙ্কসমূহ',
    customerService: 'গ্রাহক সেবা',
    contactUs: 'যোগাযোগ করুন',
    helpCenter: 'সাহায্য কেন্দ্র',
    shippingInfo: 'শিপিং তথ্য',
    returnsExchanges: 'রিটার্ন ও এক্সচেঞ্জ',
    sizeGuide: 'সাইজ গাইড',
    faq: 'প্রশ্নোত্তর',
    privacyPolicy: 'গোপনীয়তা নীতি',
    termsOfService: 'সেবার শর্তাবলী',
    cookiePolicy: 'কুকি নীতি',
    copyright: '© ২০২৪ কে-বিউটি হাব। সর্বস্বত্ব সংরক্ষিত।',
    
    // Countries
    unitedStates: 'যুক্তরাষ্ট্র',
    canada: 'কানাডা',
    unitedKingdom: 'যুক্তরাজ্য',
    australia: 'অস্ট্রেলিয়া',
    bangladesh: 'বাংলাদেশ'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const t = (key) => {
    return translations[currentLanguage][key] || translations.en[key] || key;
  };

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages: Object.keys(translations)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 