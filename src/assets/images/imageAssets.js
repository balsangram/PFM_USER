// Publicly available food and grocery images
export const IMAGE_ASSETS = {
  // Logo and branding
  logo: '/logo.png',
  favicon: '/vite.svg',
  
  // Category images
  categories: {
    chicken: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop',
    mutton: 'https://images.unsplash.com/photo-1588347818206-ba1b4d2e2e7f?w=400&h=400&fit=crop',
    fish: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop',
    seafood: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400&h=400&fit=crop',
    eggs: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop',
    readyToCook: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop',
    snacks: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop',
    liver: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=400&fit=crop',
    prawns: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=400&fit=crop',
    masala: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop',
    spreads: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    kebabs: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=400&fit=crop',
    kids: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop',
    combos: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=400&fit=crop'
  },
  
  // Product images
  products: {
    chickenCurry: 'c',
    chickenBreast: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&h=500&fit=crop',
    muttonCurry: 'https://images.unsplash.com/photo-1588347818206-ba1b4d2e2e7f?w=500&h=500&fit=crop',
    fishRohu: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=500&fit=crop',
    prawns: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&h=500&fit=crop',
    liver: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=500&fit=crop',
    eggs: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&h=500&fit=crop',
    nuggets: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&h=500&fit=crop',
    tandoori: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=500&fit=crop',
    combo: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=500&fit=crop'
  },
  
  // Hero images
  hero: [
    'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1588347818206-ba1b4d2e2e7f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop'
  ],
  
  // Bestseller products
  bestsellers: [
    'https://c',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1588347818206-ba1b4d2e2e7f?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'
  ],
  
  // Icons for subcategories
  icons: {
    all: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=100&h=100&fit=crop',
    curryCuts: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=100&h=100&fit=crop',
    boneless: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=100&h=100&fit=crop',
    specialty: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=100&h=100&fit=crop',
    offals: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=100&h=100&fit=crop',
    combos: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=100&h=100&fit=crop',
    premium: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=100&h=100&fit=crop'
  },
  
  // Placeholder images (use brand logo to avoid irrelevant photos)
  placeholder: '/logo.png',
  
  // Brand logos
  brands: {
    licious: 'https://logos-world.net/wp-content/uploads/2020/09/Licious-Logo.png',
    freshToHome: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=100&fit=crop'
  }
};

// Helper function to get image with fallback
export const getImage = (imageKey, fallback = IMAGE_ASSETS.placeholder) => {
  if (typeof imageKey === 'string') {
    return imageKey;
  }
  
  const keys = imageKey.split('.');
  let current = IMAGE_ASSETS;
  
  for (const key of keys) {
    current = current?.[key];
    if (!current) return fallback;
  }
  
  return current || fallback;
};

// Helper function to get category image
export const getCategoryImage = (categoryName) => {
  if (!categoryName) return IMAGE_ASSETS.placeholder;
  
  const category = categoryName.toLowerCase().trim();
  
  // Map category names to image keys
  const categoryMap = {
    'chicken': 'chicken',
    'fish': 'fish',
    'fish & seafood': 'fish',
    'seafood': 'seafood',
    'mutton': 'mutton',
    'eggs': 'eggs',
    'ready to cook': 'readyToCook',
    'readytocook': 'readyToCook',
    'snacks': 'snacks',
    'crispy snacks': 'snacks',
    'liver': 'liver',
    'liver & more': 'liver',
    'prawns': 'prawns',
    'masala': 'masala',
    'meat masala': 'masala',
    'spreads': 'spreads',
    'spreads & cold cuts': 'spreads',
    'kebabs': 'kebabs',
    'kebab & biryani': 'kebabs',
    'kids': 'kids',
    'kids favourites': 'kids',
    'combos': 'combos'
  };
  
  const imageKey = categoryMap[category] || category;
  return IMAGE_ASSETS.categories[imageKey] || IMAGE_ASSETS.placeholder;
};

// Helper function to get product image
export const getProductImage = (productName) => {
  if (!productName) return IMAGE_ASSETS.placeholder;
  const name = productName.toLowerCase();

  // Keyword-based mapping for robustness against varying names
  if (name.includes('liver')) return IMAGE_ASSETS.products.liver;
  if (name.includes('curry') && name.includes('chicken')) return IMAGE_ASSETS.products.chickenCurry;
  if (name.includes('breast')) return IMAGE_ASSETS.products.chickenBreast;
  if (name.includes('mutton')) return IMAGE_ASSETS.products.muttonCurry;
  if (name.includes('rohu') || (name.includes('fish') && name.includes('fillet'))) return IMAGE_ASSETS.products.fishRohu;
  if (name.includes('prawn') || name.includes('shrimp')) return IMAGE_ASSETS.products.prawns;
  if (name.includes('egg')) return IMAGE_ASSETS.products.eggs;
  if (name.includes('nugget') || name.includes('snack')) return IMAGE_ASSETS.products.nuggets;
  if (name.includes('tandoori') || name.includes('kebab')) return IMAGE_ASSETS.products.tandoori;
  if (name.includes('combo')) return IMAGE_ASSETS.products.combo;

  // Fallback to placeholder
  return IMAGE_ASSETS.placeholder;
};
