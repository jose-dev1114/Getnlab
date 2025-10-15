# Shopify Integration Setup Guide

This guide will help you set up Shopify integration for the $1 pre-order functionality on your nLab website.

## Prerequisites

1. **Shopify Store**: You need a Shopify store (can be a development store)
2. **Product Created**: Create a "$1 nLab Pre-Order" product in your Shopify admin
3. **Shopify Partner Account**: Recommended for development stores

## Step 1: Create Shopify Store & Product

### 1.1 Create Shopify Store
- Go to [Shopify Partners](https://partners.shopify.com/) or [Shopify](https://shopify.com)
- Create a new store or use existing one
- Note your store domain: `your-store-name.myshopify.com`

### 1.2 Create Pre-Order Product
1. In Shopify Admin, go to **Products** → **Add product**
2. Set up the product:
   - **Title**: "nLab Starter Kit - Pre-Order"
   - **Description**: Add detailed description from the pre-order page
   - **Price**: $1.00
   - **SKU**: "NLAB-PREORDER-001"
   - **Inventory**: Set to track quantity if desired
   - **Images**: Upload product images
   - **SEO**: Optimize title and description

## Step 2: Set Up Storefront API

### 2.1 Create Private App
1. In Shopify Admin, go to **Apps** → **App and sales channel settings**
2. Click **Develop apps** → **Create an app**
3. Name it "nLab Website Integration"
4. Click **Configure Storefront API scopes**
5. Enable these scopes:
   - `unauthenticated_read_products`
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`

### 2.2 Get API Credentials
1. Click **API credentials** tab
2. Copy the **Storefront access token**
3. Note your store domain

## Step 3: Update Pre-Order Page Code

### 3.1 Update Environment Variables
The pre-order page automatically reads from your environment variables. No code changes needed - just set up your `.env` file with the correct values.

### 3.2 Get Product ID
1. In Shopify Admin, go to your pre-order product
2. Note the product ID from the URL (e.g., `/products/123456789`)
3. Or use GraphQL to get the product ID:

```graphql
query {
  products(first: 10) {
    edges {
      node {
        id
        title
        handle
      }
    }
  }
}
```

## Step 4: Set Up Environment Variables

### 4.1 Copy and Configure Environment File
```bash
# Copy the example file
cp .env.example .env
```

### 4.2 Update Your .env File
```bash
# .env
PUBLIC_STORE_DOMAIN=your-shop-name.myshopify.com
PUBLIC_STOREFRONT_API_TOKEN=your-storefront-access-token
SHOPIFY_PRODUCT_ID=your-product-id
```

**Important**: The pre-order page automatically reads these environment variables. No code changes needed!

## Step 5: Test the Integration

### 5.1 Test Checklist
- [ ] Pre-order page loads without errors
- [ ] Shopify Buy Button appears
- [ ] Product information displays correctly
- [ ] Add to cart functionality works
- [ ] Checkout process completes
- [ ] Order appears in Shopify admin
- [ ] Customer receives confirmation email

### 5.2 Test with Shopify's Test Cards
Use these test credit card numbers:
- **Visa**: 4242 4242 4242 4242
- **Mastercard**: 5555 5555 5555 4444
- **American Express**: 3782 822463 10005

## Step 6: Shopify Analytics Setup

### 6.1 Enable Analytics
1. In Shopify Admin, go to **Analytics** → **Reports**
2. Set up conversion tracking
3. Monitor key metrics:
   - Pre-order conversion rate
   - Traffic sources
   - Customer acquisition cost
   - Geographic distribution

### 6.2 Google Analytics Integration
1. In Shopify Admin, go to **Online Store** → **Preferences**
2. Add Google Analytics tracking ID
3. Enable Enhanced Ecommerce
4. Set up conversion goals for pre-orders

## Step 7: Webhook Setup (Advanced)

### 7.1 Create Webhooks for Order Processing
1. In Shopify Admin, go to **Settings** → **Notifications**
2. Create webhooks for:
   - Order creation
   - Order payment
   - Order cancellation

### 7.2 Webhook Endpoints
Set up endpoints in your app to handle:
- Adding customers to email lists
- Sending confirmation emails
- Updating inventory
- Analytics tracking

## Step 8: Production Deployment

### 8.1 Domain Setup
1. Configure custom domain in Shopify
2. Set up SSL certificates
3. Update CORS settings if needed

### 8.2 Payment Gateway
1. Set up payment providers (Stripe, PayPal, etc.)
2. Configure payment methods
3. Set up tax calculations
4. Configure shipping (if applicable)

## Troubleshooting

### Common Issues

**Buy Button Not Loading**
- Check console for JavaScript errors
- Verify Storefront API token
- Ensure CORS is properly configured

**Product Not Found**
- Verify product ID is correct
- Check product is published
- Ensure product is available in sales channel

**Checkout Issues**
- Verify payment gateway setup
- Check inventory levels
- Ensure shipping settings are correct

### Support Resources
- [Shopify Buy Button SDK Documentation](https://shopify.github.io/buy-button-js/)
- [Shopify Storefront API](https://shopify.dev/api/storefront)
- [Shopify Partner Support](https://partners.shopify.com/support)

## Security Considerations

1. **API Token Security**: Never expose private API keys in frontend code
2. **HTTPS**: Always use HTTPS for checkout processes
3. **Data Privacy**: Comply with GDPR/CCPA requirements
4. **PCI Compliance**: Shopify handles PCI compliance for payments

## Next Steps

After successful integration:
1. Set up email marketing automation
2. Create abandoned cart recovery
3. Implement customer segmentation
4. Set up A/B testing for conversion optimization
5. Monitor and optimize based on analytics data
