import { Link, useLoaderData } from 'react-router';
import { useState, useEffect } from 'react';

export const loader = async ({ context }) => {
  // In Hydrogen deployment, environment variables are accessed through context.env
  const env = context?.env || {};

  const shopifyDomain = env.PUBLIC_STORE_DOMAIN;
  const shopifyStorefrontToken = env.PUBLIC_STOREFRONT_API_TOKEN;
  const shopifyProductId = env.PUBLIC_SHOPIFY_PRODUCT_ID;

  // Fetch product data from Shopify Storefront API
  let productData = null;

  if (shopifyDomain && shopifyStorefrontToken && shopifyProductId) {
    try {
      const query = `
        query getProduct($id: ID!) {
          product(id: $id) {
            id
            title
            description
            featuredImage {
              url
              altText
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                }
              }
            }
          }
        }
      `;

      const response = await fetch(`https://${shopifyDomain}/api/2023-10/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': shopifyStorefrontToken,
        },
        body: JSON.stringify({
          query,
          variables: { id: `gid://shopify/Product/${shopifyProductId}` }
        })
      });

      const result = await response.json();
      productData = result.data?.product;
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  }

  return {
    shopifyDomain,
    shopifyStorefrontToken,
    shopifyProductId,
    productData
  };
};

export const meta = () => {
  return [{ title: 'Pre-Order nLab Kit | nLab' }];
};

// Star Rating Component
function StarRating() {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="star"
        >
          <path
            d="M10 1L12.09 6.26L18 7.27L14 11.14L15.18 17.02L10 14.77L4.82 17.02L6 11.14L2 7.27L7.91 6.26L10 1Z"
            fill="#FFD700"
            stroke="#FFD700"
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}

// Custom Product Component
function CustomProductDisplay({ productData, shopifyDomain, shopifyStorefrontToken }) {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Product images array
  const productImages = [
    {
      src: "/svg/img/pre_order.webp",
      alt: "nLab Electronics Kit - Main View"
    },
    {
      src: "/svg/img/pre_order_1.webp",
      alt: "nLab Electronics Kit - Projects View"
    },
    {
      src: "/svg/img/pre_order_2.webp",
      alt: "nLab Electronics Kit - First Access"
    }
  ];

  if (!productData) {
    return (
      <div className="product-loading">
        <div className="loading-spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  const variant = productData.variants.edges[0]?.node;
  const price = variant?.price;

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = async () => {
    if (!variant || isAddingToCart) return;

    setIsAddingToCart(true);

    try {
      // Create cart using Storefront API (updated approach)
      const cartCreateQuery = `
        mutation cartCreate($input: CartInput!) {
          cartCreate(input: $input) {
            cart {
              id
              checkoutUrl
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const response = await fetch(`https://${shopifyDomain}/api/2024-01/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': shopifyStorefrontToken,
        },
        body: JSON.stringify({
          query: cartCreateQuery,
          variables: {
            input: {
              lines: [{
                merchandiseId: variant.id,
                quantity: quantity
              }]
            }
          }
        })
      });

      const result = await response.json();
      console.log('Cart creation result:', result);

      const cart = result.data?.cartCreate?.cart;
      const errors = result.data?.cartCreate?.userErrors;

      if (errors && errors.length > 0) {
        console.error('Cart creation errors:', errors);
        alert(`Error: ${errors[0].message}`);
        return;
      }

      if (cart?.checkoutUrl) {
        // Redirect to Shopify checkout
        window.location.href = cart.checkoutUrl;
      } else {
        console.error('No checkout URL returned:', result);
        alert('Failed to create cart. Please try again.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="custom-product-display">
      {/* Product Image Gallery */}
      <div className="product-image-container">
        {/* Main Image */}
        <div className="main-image-container">
          <img
            src={productImages[selectedImageIndex].src}
            alt={productImages[selectedImageIndex].alt}
            className="product-image"
          />
        </div>

        {/* Thumbnail Gallery */}
        <div className="thumbnail-gallery">
          {productImages.map((image, index) => (
            <button
              key={index}
              className={`thumbnail-btn ${index === selectedImageIndex ? 'active' : ''}`}
              onClick={() => setSelectedImageIndex(index)}
              type="button"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="thumbnail-image"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="product-details">
        <h1 className="product-title">{productData.title}</h1>

        <StarRating />

        <div className="product-description">
          Reserve your nLab Electronics Learning Kit for just $1!<br /><br />

          <strong>About nLab Kit:</strong><br />
          The complete electronics learning system with oscilloscope, power supply, function generator, and 12+ interactive projects and tutorials. Perfect for students, makers, and electronics beginners.<br /><br />

          <strong>How it works:</strong><br />
          • Pay $1 now to reserve your kit<br />
          • Get notified when our Kickstarter launches<br />
          • Complete your order with 10% discount<br />
          • Receive your kit when we start shipping<br /><br />

          <strong>Regular price: $199 | Your price with pre-order: $179.10</strong>
        </div>

        <div className="product-controls">
          {/* Quantity Spinner */}
          <div className="quantity-spinner">
            <button
              type="button"
              className="quantity-btn"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="quantity-value">{quantity}</span>
            <button
              type="button"
              className="quantity-btn"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={!variant?.availableForSale || isAddingToCart}
          >
            {isAddingToCart ? 'Adding...' : `Add to Cart - ${price ? `$${(parseFloat(price.amount) * quantity).toFixed(2)}` : 'Price unavailable'}`}
          </button>
        </div>
      </div>
    </div>
  );
}

// Configuration Error Component
function ConfigurationError() {
  return (
    <div className="config-error">
      <h4>Configuration Required</h4>
      <p>Shopify integration is not yet configured. Please set up your environment variables:</p>
      <ul>
        <li>PUBLIC_STORE_DOMAIN</li>
        <li>PUBLIC_STOREFRONT_API_TOKEN</li>
        <li>PUBLIC_SHOPIFY_PRODUCT_ID</li>
      </ul>
      <p>See SHOPIFY_SETUP.md for detailed instructions.</p>
    </div>
  );
}

// Main component
export default function PreOrder() {
  const { shopifyDomain, shopifyStorefrontToken, shopifyProductId, productData } = useLoaderData();

  return (
    <div className="pre-order-main">
      <div className="pre-order-page">
        {/* Product Section */}
        <section className="pre-order-product-section">
          <div className="pre-order-product-content">
            {!shopifyDomain || !shopifyStorefrontToken || !shopifyProductId ? (
              <ConfigurationError />
            ) : (
              <CustomProductDisplay
                productData={productData}
                shopifyDomain={shopifyDomain}
                shopifyStorefrontToken={shopifyStorefrontToken}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
