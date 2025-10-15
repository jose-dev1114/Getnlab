import { Link, useLoaderData } from 'react-router';
import { useState, useEffect } from 'react';

export const loader = async ({ context }) => {
  // In Hydrogen deployment, environment variables are accessed through context.env
  const env = context?.env || {};

  return {
    shopifyDomain: env.PUBLIC_STORE_DOMAIN,
    shopifyStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
    shopifyProductId: env.PUBLIC_SHOPIFY_PRODUCT_ID
  };
};

export const meta = () => {
  return [{ title: 'Pre-Order nLab Kit | nLab' }];
};

// Client-side only Shopify component
function ShopifyBuyButton({ shopifyDomain, shopifyStorefrontToken, shopifyProductId }) {
  const [shopifyLoaded, setShopifyLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Hydration check
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let script = null;
    let fontLink = null;
    let isComponentMounted = true;

    // Add Google Fonts for better font loading
    fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;700&display=swap';
    fontLink.rel = 'stylesheet';
    fontLink.id = 'roboto-condensed-font';

    if (!document.head.querySelector('#roboto-condensed-font')) {
      document.head.appendChild(fontLink);
    }

    // Load Shopify Buy Button SDK
    script = document.createElement('script');
    script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    script.async = true;
    script.id = 'shopify-buy-sdk';

    script.onload = () => {
      if (isComponentMounted) {
        console.log('Shopify SDK loaded');
        setShopifyLoaded(true);
        // Small delay to ensure SDK is fully ready
        setTimeout(() => {
          if (isComponentMounted) {
            initializeShopifyBuyButton();
          }
        }, 100);
      }
    };

    script.onerror = () => {
      console.error('Failed to load Shopify SDK');
      if (isComponentMounted) {
        setShopifyLoaded(false);
      }
    };

    if (!document.head.querySelector('#shopify-buy-sdk')) {
      document.head.appendChild(script);
    }

    return () => {
      isComponentMounted = false;

      // Cleanup MutationObserver first
      if (window.shopifyFontObserver) {
        try {
          window.shopifyFontObserver.disconnect();
        } catch (e) {
          // Ignore
        }
        window.shopifyFontObserver = null;
      }

      // Don't remove scripts as they might be shared across components
      // Just mark component as unmounted to prevent callbacks
    };
  }, [isClient]);

  const initializeShopifyBuyButton = () => {
    console.log('Initializing Shopify Buy Button...');
    console.log('ShopifyBuy available:', !!window.ShopifyBuy);
    console.log('Domain:', shopifyDomain);
    console.log('Token available:', !!shopifyStorefrontToken);
    console.log('Product ID:', shopifyProductId);

    if (!window.ShopifyBuy) {
      console.error('ShopifyBuy not available');
      return;
    }

    if (!shopifyDomain || !shopifyStorefrontToken || !shopifyProductId) {
      console.error('Missing Shopify configuration');
      return;
    }

    // Clear any existing content to prevent duplicates
    const container = document.getElementById('shopify-buy-button');
    if (!container) {
      console.error('Container not found');
      return;
    }

    // Check if already initialized
    if (container.hasChildNodes() && container.querySelector('.shopify-buy__product')) {
      console.log('Already initialized');
      return;
    }

    container.innerHTML = '';

    try {

      const client = window.ShopifyBuy.buildClient({
        domain: shopifyDomain,
        storefrontAccessToken: shopifyStorefrontToken
      });

      const ui = window.ShopifyBuy.UI.init(client);

      const component = ui.createComponent('product', {
        id: shopifyProductId,
        node: document.getElementById('shopify-buy-button'),
        moneyFormat: '$%7B%7Bamount%7D%7D',
        options: {
          product: {
            layout: 'horizontal',
            variantId: 'all',
            width: '100%',
            contents: {
              img: true,
              title: true,
              price: false,
              options: false,
              quantity: false,
              button: true,
              buttonWithQuantity: false,
              description: false
            },
            styles: {
              product: {
                '@media (min-width: 601px)': {
                  'max-width': '500px',
                  'margin-left': 'auto',
                  'margin-right': 'auto',
                  'margin-bottom': '50px'
                },
                'text-align': 'center'
              },
              img: {
                'width': '300px',
                'height': '300px',
                'object-fit': 'cover',
                'border-radius': '12px',
                'margin-bottom': '20px',
                'box-shadow': '0 4px 12px rgba(0, 0, 0, 0.1)'
              },
              title: {
                'font-family': '"Roboto Condensed", sans-serif !important',
                'font-size': '28px !important',
                'font-weight': '700 !important',
                'color': '#2B2B2B !important',
                'margin-bottom': '20px !important',
                'text-transform': 'uppercase !important',
                'line-height': '1.2 !important'
              },
              button: {
                'font-family': '"Roboto Condensed", sans-serif',
                'font-size': '20px',
                'font-weight': '700',
                'padding-top': '20px',
                'padding-bottom': '20px',
                'padding-left': '40px',
                'padding-right': '40px',
                'color': '#2B2B2B',
                'background-color': '#FF6B35',
                'text-transform': 'uppercase',
                'border': 'none',
                'border-radius': '12px',
                'box-shadow': '0 4px 12px rgba(255, 107, 53, 0.3)',
                'transition': 'all 0.3s ease',
                ':hover': {
                  'background-color': '#E55A2B',
                  'color': '#ffffff',
                  'transform': 'translateY(-2px)',
                  'box-shadow': '0 6px 16px rgba(255, 107, 53, 0.4)'
                },
                ':focus': {
                  'background-color': '#E55A2B',
                  'outline': 'none',
                  'box-shadow': '0 0 0 3px rgba(255, 107, 53, 0.2)'
                },
                ':active': {
                  'transform': 'translateY(0)',
                  'box-shadow': '0 2px 8px rgba(255, 107, 53, 0.3)'
                }
              },
              price: {
                'font-family': '"Roboto Condensed", sans-serif',
                'font-size': '24px',
                'color': '#2B2B2B'
              },
              compareAt: {
                'font-family': '"Roboto Condensed", sans-serif',
                'font-size': '20px',
                'color': '#666666'
              }
            },
            text: {
              button: 'Reserve Your Spot - $1'
            }
          },
          productSet: {
            styles: {
              products: {
                '@media (min-width: 601px)': {
                  'margin-left': '-20px'
                }
              }
            }
          },
          modalProduct: {
            styles: {
              product: {
                '@media (min-width: 601px)': {
                  'max-width': '100%',
                  'margin-left': '0px',
                  'margin-bottom': '0px'
                }
              }
            }
          },
          cart: {
            styles: {
              button: {
                'font-family': '"Roboto Condensed", sans-serif',
                'font-size': '20px',
                'font-weight': '700',
                'padding-top': '20px',
                'padding-bottom': '20px',
                'padding-left': '40px',
                'padding-right': '40px',
                'color': '#ffffff',
                'background-color': '#FF6B35',
                'text-transform': 'uppercase',
                'border': 'none',
                'border-radius': '12px',
                'box-shadow': '0 4px 12px rgba(255, 107, 53, 0.3)',
                'transition': 'all 0.3s ease',
                ':hover': {
                  'background-color': '#E55A2B',
                  'color': '#ffffff',
                  'transform': 'translateY(-2px)',
                  'box-shadow': '0 6px 16px rgba(255, 107, 53, 0.4)'
                },
                ':focus': {
                  'background-color': '#E55A2B',
                  'outline': 'none',
                  'box-shadow': '0 0 0 3px rgba(255, 107, 53, 0.2)'
                }
              }
            }
          }
        }
      });

      // Force font styles after component loads
      setTimeout(() => {
        const applyFontStyles = () => {
          const titleElements = document.querySelectorAll(
            '.shopify-buy__product__title, [data-element="product.title"]'
          );
          const buttonElements = document.querySelectorAll(
            '.shopify-buy__btn, [data-element="product.button"]'
          );

          titleElements.forEach(el => {
            if (el && el.style) {
              try {
                el.style.setProperty('font-family', 'Roboto Condensed, sans-serif', 'important');
                el.style.setProperty('font-weight', '700', 'important');
                el.style.setProperty('text-transform', 'uppercase', 'important');
                // el.style.setProperty('letter-spacing', '0.5px', 'important');
                el.style.setProperty('color', '#2B2B2B', 'important');
                el.style.setProperty('font-size', '28px', 'important');
                el.style.setProperty('line-height', '1.2', 'important');
              } catch (error) {
                console.log('Title styling error:', error);
              }
            }
          });

          buttonElements.forEach(el => {
            if (el && el.style) {
              try {
                el.style.setProperty('font-family', 'Roboto Condensed, sans-serif', 'important');
                el.style.setProperty('font-weight', '700', 'important');
                el.style.setProperty('text-transform', 'uppercase', 'important');
                // el.style.setProperty('letter-spacing', '0.5px', 'important');
              } catch (error) {
                console.log('Button styling error:', error);
              }
            }
          });
        };

        // Apply styles immediately and then watch for changes
        applyFontStyles();

        // Use MutationObserver to catch any dynamic changes
        if (!window.shopifyFontObserver) {
          const observer = new MutationObserver(() => {
            try {
              applyFontStyles();
            } catch (error) {
              // Ignore styling errors
            }
          });

          const container = document.getElementById('shopify-buy-button');
          if (container) {
            observer.observe(container, {
              childList: true,
              subtree: true
            });

            // Store observer for cleanup
            window.shopifyFontObserver = observer;
          }
        }
      }, 500);
    } catch (error) {
      console.error('Error initializing Shopify Buy Button:', error);
    }
  };

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="shopify-buy-container">
        <div id="shopify-buy-button">
          <div className="loading-placeholder">
            <div className="loading-spinner"></div>
            <p>Loading secure checkout...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shopify-buy-container">
      <div id="shopify-buy-button">
        {!shopifyDomain || !shopifyStorefrontToken || !shopifyProductId ? (
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
        ) : !shopifyLoaded ? (
          <div className="loading-placeholder">
            <div className="loading-spinner"></div>
            <p>Loading secure checkout...</p>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#FF6B35',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Retry Loading
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// Main component
export default function PreOrder() {
  const { shopifyDomain, shopifyStorefrontToken, shopifyProductId } = useLoaderData();

  return (
    <div className="pre-order-page">
      {/* Combined Hero and Checkout Section */}
      <section className="pre-order-combined-section">
        <div className="pre-order-combined-content">
          {/* Left Side - Checkout */}
          <div className="pre-order-checkout-content">
            <ShopifyBuyButton
              shopifyDomain={shopifyDomain}
              shopifyStorefrontToken={shopifyStorefrontToken}
              shopifyProductId={shopifyProductId}
            />
          </div>

          {/* Right Side - Hero Content */}
          <div className="pre-order-hero-content">
            <h1 className="pre-order-title">Reserve Your nLab Kit</h1>
            <p className="pre-order-subtitle">
              Secure your spot for just $1 and get 10% off at launch
            </p>
          </div>
        </div>
      </section>


    </div>
  );
}
