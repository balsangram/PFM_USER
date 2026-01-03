# Image Assets

This folder contains all the image assets used throughout the application.

## Structure

- `imageAssets.js` - Central configuration file for all images
- `README.md` - This documentation file

## Usage

### Import the image assets:
```javascript
import { IMAGE_ASSETS, getCategoryImage, getProductImage } from '../assets/images/imageAssets';
```

### Available Functions:

1. **`getCategoryImage(categoryName)`** - Returns appropriate image for category
2. **`getProductImage(productName)`** - Returns appropriate image for product
3. **`getImage(imageKey, fallback)`** - Generic function to get image with fallback

### Image Categories:

- **Categories**: Chicken, Mutton, Fish, Seafood, Eggs, Ready-to-cook, Snacks, Liver, Prawns, Masala, Spreads, Kebabs, Kids
- **Products**: Various product images for different food items
- **Hero Images**: Banner/slider images for homepage
- **Bestsellers**: Product images for bestseller section
- **Icons**: Small icons for subcategories
- **Brands**: Brand logos and partnerships

### Image Sources:
All images are sourced from publicly available Unsplash URLs, optimized for web use with appropriate dimensions and crop settings.

### Fallback Handling:
All images have fallback mechanisms to ensure the application doesn't break if an image fails to load.

## Adding New Images:

1. Add the new image URL to the appropriate category in `imageAssets.js`
2. Use the helper functions to access the image in your components
3. Ensure fallback images are always available
