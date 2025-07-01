// Product Knowledge Manager - Automatically manages product information for the chatbot
import { products } from '../data/products';

// Product Knowledge Base Class
class ProductKnowledgeBase {
  constructor() {
    this.productData = new Map();
    this.productAnalytics = new Map();
    this.customerPreferences = new Map();
    this.recommendationEngine = {
      popularProducts: [],
      trendingProducts: [],
      categoryPreferences: new Map()
    };
    this.initializeFromProducts();
  }

  // Automatically initialize knowledge base from existing products
  initializeFromProducts() {
    products.forEach(product => {
      this.addProduct(product);
    });
    console.log(`📚 Product Knowledge Base initialized with ${this.productData.size} products`);
  }

  // Add new product to knowledge base (called automatically when new products are added)
  addProduct(product) {
    const productInfo = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      category: product.category,
      rating: product.rating,
      reviews: product.reviews,
      description: product.description,
      inStock: product.inStock,
      isNew: product.isNew,
      isFeatured: product.isFeatured,
      keywords: this.extractKeywords(product),
      benefits: this.extractBenefits(product),
      skinTypes: this.extractSkinTypes(product),
      ingredients: this.extractIngredients(product),
      usage: this.extractUsage(product),
      addedDate: new Date(),
      queryCount: 0
    };

    this.productData.set(product.id, productInfo);
    this.updateAnalytics(product.id);
    
    console.log(`✅ Product "${product.name}" added to knowledge base`);
    return productInfo;
  }

  // Extract keywords from product information
  extractKeywords(product) {
    const text = `${product.name} ${product.description} ${product.category}`.toLowerCase();
    const keywords = new Set();
    
    // Common K-beauty keywords
    const beautyKeywords = [
      'hydrating', 'brightening', 'anti-aging', 'moisturizing', 'cleansing',
      'essence', 'serum', 'cream', 'mask', 'toner', 'cleanser', 'sunscreen',
      'snail', 'aloe', 'green tea', 'vitamin c', 'hyaluronic acid', 'niacinamide',
      'retinol', 'peptide', 'ceramide', 'centella', 'madecassoside', 'propolis',
      'glass skin', 'dewy', 'plump', 'smooth', 'radiant', 'glowing',
      'acne', 'pore', 'whitening', 'firming', 'lifting', 'wrinkle',
      'dark spot', 'hyperpigmentation', 'redness', 'irritation', 'sensitive'
    ];

    beautyKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        keywords.add(keyword);
      }
    });

    return Array.from(keywords);
  }

  // Extract benefits from product description
  extractBenefits(product) {
    const benefits = [];
    const description = product.description.toLowerCase();
    
    if (description.includes('hydrat')) benefits.push('Hydration');
    if (description.includes('brighten') || description.includes('glow')) benefits.push('Brightening');
    if (description.includes('anti-aging') || description.includes('fine line')) benefits.push('Anti-aging');
    if (description.includes('soothing') || description.includes('calm')) benefits.push('Soothing');
    if (description.includes('cleansing') || description.includes('clean')) benefits.push('Cleansing');
    if (description.includes('moisturiz')) benefits.push('Moisturizing');
    if (description.includes('smooth') || description.includes('texture')) benefits.push('Smoothing');
    if (description.includes('radiant') || description.includes('glow')) benefits.push('Radiant Glow');
    if (description.includes('acne') || description.includes('breakout')) benefits.push('Acne Control');
    if (description.includes('pore') || description.includes('minimize')) benefits.push('Pore Refining');
    if (description.includes('whitening') || description.includes('even')) benefits.push('Even Skin Tone');
    if (description.includes('firm') || description.includes('lifting')) benefits.push('Firming');

    return benefits;
  }

  // Extract skin types from product information
  extractSkinTypes(product) {
    const skinTypes = [];
    const text = `${product.name} ${product.description}`.toLowerCase();
    
    if (text.includes('sensitive') || text.includes('gentle')) skinTypes.push('Sensitive');
    if (text.includes('dry') || text.includes('hydrat')) skinTypes.push('Dry');
    if (text.includes('oily') || text.includes('control')) skinTypes.push('Oily');
    if (text.includes('combination')) skinTypes.push('Combination');
    if (text.includes('all skin') || text.includes('universal')) skinTypes.push('All Skin Types');
    if (text.includes('acne') || text.includes('blemish')) skinTypes.push('Acne-Prone');

    return skinTypes.length > 0 ? skinTypes : ['All Skin Types'];
  }

  // Extract ingredients from product information
  extractIngredients(product) {
    const ingredients = [];
    const text = `${product.name} ${product.description}`.toLowerCase();
    
    const commonIngredients = [
      'snail mucin', 'aloe vera', 'green tea', 'vitamin c', 'hyaluronic acid',
      'niacinamide', 'retinol', 'peptide', 'ceramide', 'centella', 'madecassoside',
      'propolis', 'rice water', 'bee venom', 'tea tree', 'witch hazel',
      'salicylic acid', 'glycolic acid', 'lactic acid', 'aha', 'bha',
      'collagen', 'elastin', 'coenzyme q10', 'vitamin e', 'vitamin b',
      'panthenol', 'allantoin', 'glycerin', 'squalane', 'jojoba oil'
    ];

    commonIngredients.forEach(ingredient => {
      if (text.includes(ingredient)) {
        ingredients.push(ingredient);
      }
    });

    return ingredients;
  }

  // Extract usage instructions
  extractUsage(product) {
    const usage = [];
    const category = product.category.toLowerCase();
    
    if (category === 'skincare') {
      if (product.name.toLowerCase().includes('cleanser')) {
        usage.push('Use morning and evening as first step');
      } else if (product.name.toLowerCase().includes('toner')) {
        usage.push('Apply after cleansing, before essence');
      } else if (product.name.toLowerCase().includes('essence')) {
        usage.push('Apply after toner, before serum');
      } else if (product.name.toLowerCase().includes('serum')) {
        usage.push('Apply after essence, before moisturizer');
      } else if (product.name.toLowerCase().includes('cream') || product.name.toLowerCase().includes('moisturizer')) {
        usage.push('Apply as final step in skincare routine');
      } else if (product.name.toLowerCase().includes('mask')) {
        usage.push('Use 2-3 times per week for intensive care');
      } else if (product.name.toLowerCase().includes('sunscreen')) {
        usage.push('Apply as final step in morning routine');
      }
    } else if (category === 'makeup') {
      usage.push('Apply as needed for makeup routine');
    }

    return usage.length > 0 ? usage : ['Follow product instructions'];
  }

  // Update analytics when product is queried
  updateAnalytics(productId) {
    const currentCount = this.productAnalytics.get(productId) || 0;
    this.productAnalytics.set(productId, currentCount + 1);
  }

  // Search products with enhanced knowledge base
  searchProducts(query) {
    const searchTerm = query.toLowerCase();
    const results = [];

    this.productData.forEach((productInfo, productId) => {
      let score = 0;
      
      // Exact name match
      if (productInfo.name.toLowerCase().includes(searchTerm)) score += 10;
      
      // Category match
      if (productInfo.category.toLowerCase().includes(searchTerm)) score += 5;
      
      // Keyword match
      if (productInfo.keywords.some(keyword => keyword.includes(searchTerm))) score += 3;
      
      // Benefit match
      if (productInfo.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm))) score += 3;
      
      // Ingredient match
      if (productInfo.ingredients.some(ingredient => ingredient.includes(searchTerm))) score += 2;
      
      // Description match
      if (productInfo.description.toLowerCase().includes(searchTerm)) score += 1;

      if (score > 0) {
        results.push({ productInfo, score });
      }
    });

    return results
      .sort((a, b) => b.score - a.score)
      .map(result => result.productInfo);
  }

  // Get personalized recommendations
  getPersonalizedRecommendations(userPreferences = {}) {
    const recommendations = [];
    
    this.productData.forEach((productInfo) => {
      let score = 0;
      
      // Match skin type preferences
      if (userPreferences.skinType && productInfo.skinTypes.includes(userPreferences.skinType)) {
        score += 5;
      }
      
      // Match benefit preferences
      if (userPreferences.benefits) {
        const matchingBenefits = productInfo.benefits.filter(benefit => 
          userPreferences.benefits.includes(benefit)
        );
        score += matchingBenefits.length * 3;
      }
      
      // Consider rating and popularity
      score += productInfo.rating * 0.5;
      score += Math.min(productInfo.reviews / 100, 5);
      
      if (score > 0) {
        recommendations.push({ productInfo, score });
      }
    });

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(result => result.productInfo);
  }

  // Get trending products based on analytics
  getTrendingProducts() {
    const trending = Array.from(this.productAnalytics.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([productId]) => this.productData.get(productId))
      .filter(Boolean);

    return trending;
  }

  // Get detailed product information
  getProductDetails(productId) {
    return this.productData.get(productId);
  }

  // Get knowledge base statistics
  getStats() {
    const categories = new Set();
    this.productData.forEach(product => {
      categories.add(product.category);
    });

    return {
      totalProducts: this.productData.size,
      categories: Array.from(categories),
      totalQueries: Array.from(this.productAnalytics.values()).reduce((sum, count) => sum + count, 0),
      mostQueriedProducts: this.getTrendingProducts().slice(0, 3)
    };
  }

  // Export knowledge base data (for backup or analysis)
  exportData() {
    return {
      products: Array.from(this.productData.values()),
      analytics: Object.fromEntries(this.productAnalytics),
      stats: this.getStats()
    };
  }
}

// Global instance of the knowledge base
let globalProductKB = null;

// Initialize the global knowledge base
export const initializeProductKnowledgeBase = () => {
  if (!globalProductKB) {
    globalProductKB = new ProductKnowledgeBase();
  }
  return globalProductKB;
};

// Get the global knowledge base instance
export const getProductKnowledgeBase = () => {
  if (!globalProductKB) {
    initializeProductKnowledgeBase();
  }
  return globalProductKB;
};

// Add new product to the knowledge base
export const addNewProductToKnowledgeBase = (product) => {
  const kb = getProductKnowledgeBase();
  return kb.addProduct(product);
};

// Add multiple products at once
export const addMultipleProductsToKnowledgeBase = (products) => {
  const kb = getProductKnowledgeBase();
  const results = [];
  
  products.forEach(product => {
    results.push(kb.addProduct(product));
  });
  
  console.log(`📦 Added ${products.length} new products to knowledge base`);
  return results;
};

// Update existing product in knowledge base
export const updateProductInKnowledgeBase = (productId, updatedProduct) => {
  const kb = getProductKnowledgeBase();
  return kb.addProduct({ ...updatedProduct, id: productId });
};

// Remove product from knowledge base
export const removeProductFromKnowledgeBase = (productId) => {
  const kb = getProductKnowledgeBase();
  const product = kb.productData.get(productId);
  
  if (product) {
    kb.productData.delete(productId);
    kb.productAnalytics.delete(productId);
    console.log(`🗑️ Product "${product.name}" removed from knowledge base`);
    return true;
  }
  
  return false;
};

// Get knowledge base statistics
export const getKnowledgeBaseStats = () => {
  const kb = getProductKnowledgeBase();
  return kb.getStats();
};

// Search products using knowledge base
export const searchProductsInKnowledgeBase = (query) => {
  const kb = getProductKnowledgeBase();
  return kb.searchProducts(query);
};

// Get personalized recommendations
export const getPersonalizedRecommendations = (userPreferences = {}) => {
  const kb = getProductKnowledgeBase();
  return kb.getPersonalizedRecommendations(userPreferences);
};

// Export knowledge base data
export const exportKnowledgeBaseData = () => {
  const kb = getProductKnowledgeBase();
  return kb.exportData();
};

// Auto-sync with products data (call this when products are updated)
export const syncKnowledgeBaseWithProducts = () => {
  const kb = getProductKnowledgeBase();
  
  // Clear existing data
  kb.productData.clear();
  kb.productAnalytics.clear();
  
  // Re-initialize with current products
  kb.initializeFromProducts();
  
  console.log(`🔄 Knowledge base synced with ${products.length} products`);
  return kb.getStats();
};

export default ProductKnowledgeBase; 