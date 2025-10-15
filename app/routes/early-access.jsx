import {Link, Form, useActionData, useNavigation, useLoaderData} from 'react-router';
import {data} from 'react-router';
import { useState, useEffect } from 'react';

export const meta = () => {
  return [{title: 'Get Early Access | nLab'}];
};

export const loader = async ({ context }) => {
  return {
    shopifyDomain: context?.env?.PUBLIC_STORE_DOMAIN || process.env.PUBLIC_STORE_DOMAIN,
    shopifyStorefrontToken: context?.env?.PUBLIC_STOREFRONT_API_TOKEN || process.env.PUBLIC_STOREFRONT_API_TOKEN,
    shopifyProductId: context?.env?.PUBLIC_SHOPIFY_PRODUCT_ID || process.env.PUBLIC_SHOPIFY_PRODUCT_ID
  };
};

// Action function to handle form submission
export async function action({request, context}) {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const interest = formData.get('interest');

  // Validate required fields
  if (!name || !email) {
    return data(
      {
        error: 'Name and email are required',
        success: false,
      },
      {status: 400}
    );
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return data(
      {
        error: 'Please enter a valid email address',
        success: false,
      },
      {status: 400}
    );
  }

  try {
    // Klaviyo API integration - get from environment variables
    // Try multiple ways to access env vars in Hydrogen
    const klaviyoApiKey = context?.env?.KLAVIYO_PRIVATE_API_KEY ||
                          process.env.KLAVIYO_PRIVATE_API_KEY;
    const klaviyoListId = context?.env?.KLAVIYO_LIST_ID ||
                         process.env.KLAVIYO_LIST_ID;

    if (!klaviyoApiKey || !klaviyoListId) {
      return data(
        {
          error: 'Configuration error. Please check environment variables.',
          success: false,
        },
        {status: 500}
      );
    }

    // Create or update profile in Klaviyo
    const requestBody = {
      data: {
        type: 'profile',
        attributes: {
          email: email,
          first_name: name.split(' ')[0],
          last_name: name.split(' ').slice(1).join(' ') || '',
          properties: {
            interest: interest || 'Not specified',
            source: 'Early Access Form',
            signup_date: new Date().toISOString(),
          },
        },
      },
    };

    const profileResponse = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
        'Content-Type': 'application/json',
        'revision': '2024-10-15',
      },
      body: JSON.stringify(requestBody),
    });

    let profileId;

    if (!profileResponse.ok) {
      const errorText = await profileResponse.text();
      const errorData = JSON.parse(errorText);

      // Check if it's a duplicate profile error (409)
      if (profileResponse.status === 409 && errorData.errors?.[0]?.code === 'duplicate_profile') {
        // Profile already exists, get the existing profile ID
        profileId = errorData.errors[0].meta.duplicate_profile_id;
      } else {
        // Other error, throw
        throw new Error(`Failed to create profile: ${profileResponse.status} ${errorText}`);
      }
    } else {
      // Profile created successfully
      const profileData = await profileResponse.json();
      profileId = profileData.data.id;
    }

    // Add profile to the early access list
    const listResponse = await fetch(`https://a.klaviyo.com/api/lists/${klaviyoListId}/relationships/profiles/`, {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
        'Content-Type': 'application/json',
        'revision': '2024-10-15',
      },
      body: JSON.stringify({
        data: [
          {
            type: 'profile',
            id: profileId,
          },
        ],
      }),
    });

    if (!listResponse.ok) {
      const errorText = await listResponse.text();
      // Don't fail the whole process if list subscription fails
      if (listResponse.status !== 409) {
        // Only log non-409 errors (409 means already subscribed)
        console.warn('List subscription failed:', listResponse.status);
      }
    }

    return data({
      success: true,
      message: 'Successfully joined the early access list!',
    });

  } catch (error) {
    return data(
      {
        error: 'Something went wrong. Please try again.',
        success: false,
      },
      {status: 500}
    );
  }
}

export default function EarlyAccess() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const { shopifyDomain, shopifyStorefrontToken, shopifyProductId } = useLoaderData();
  const [shopifyClient, setShopifyClient] = useState(null);

  useEffect(() => {
    console.log('=== Shopify SDK Loading ===');
    console.log('shopifyDomain:', shopifyDomain);
    console.log('shopifyStorefrontToken:', shopifyStorefrontToken ? 'Present' : 'Missing');

    // Load Shopify Buy Button SDK
    const script = document.createElement('script');
    script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    script.async = true;
    script.onload = () => {
      console.log('Shopify SDK loaded, window.ShopifyBuy:', !!window.ShopifyBuy);
      if (window.ShopifyBuy && shopifyDomain && shopifyStorefrontToken) {
        console.log('Creating Shopify client...');
        const client = window.ShopifyBuy.buildClient({
          domain: shopifyDomain,
          storefrontAccessToken: shopifyStorefrontToken
        });
        setShopifyClient(client);
        console.log('Shopify client created successfully');
      } else {
        console.log('Cannot create Shopify client:', {
          ShopifyBuy: !!window.ShopifyBuy,
          domain: !!shopifyDomain,
          token: !!shopifyStorefrontToken
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [shopifyDomain, shopifyStorefrontToken]);

  const handlePreOrder = async () => {
    // Debug logging
    console.log('=== Pre-Order Debug Info ===');
    console.log('shopifyDomain:', shopifyDomain);
    console.log('shopifyStorefrontToken:', shopifyStorefrontToken ? 'Present' : 'Missing');
    console.log('shopifyProductId:', shopifyProductId);
    console.log('shopifyClient:', shopifyClient ? 'Initialized' : 'Not initialized');
    console.log('window.ShopifyBuy:', window.ShopifyBuy ? 'Loaded' : 'Not loaded');

    if (!shopifyClient || !shopifyProductId) {
      console.log('Redirecting to pre-order page - Missing:', {
        shopifyClient: !shopifyClient ? 'shopifyClient' : null,
        shopifyProductId: !shopifyProductId ? 'shopifyProductId' : null
      });
      window.location.href = '/pre-order';
      return;
    }

    try {
      // Fetch the pre-order product (separate $1 product)
      const preOrderProduct = await shopifyClient.product.fetch(shopifyProductId);

      if (!preOrderProduct || !preOrderProduct.variants || preOrderProduct.variants.length === 0) {
        throw new Error('Pre-order product not found or has no variants');
      }

      // Create checkout with the pre-order product
      const checkout = await shopifyClient.checkout.create();

      // Add pre-order item to checkout
      const lineItemsToAdd = [{
        variantId: preOrderProduct.variants[0].id,
        quantity: 1,
        customAttributes: [
          {
            key: 'Pre-Order Type',
            value: 'nLab Kit Reservation'
          },
          {
            key: 'Expected Launch',
            value: 'Kickstarter Campaign'
          },
          {
            key: 'Discount Eligible',
            value: '10% off at launch'
          }
        ]
      }];

      // Add line items to checkout
      const updatedCheckout = await shopifyClient.checkout.addLineItems(checkout.id, lineItemsToAdd);

      // Add checkout attributes for tracking
      const checkoutWithAttributes = await shopifyClient.checkout.updateAttributes(updatedCheckout.id, {
        customAttributes: [
          {
            key: 'Order Type',
            value: 'Pre-Order Reservation'
          },
          {
            key: 'Source',
            value: 'Early Access Page'
          },
          {
            key: 'Campaign',
            value: 'Pre-Launch'
          }
        ]
      });

      // Redirect to Shopify checkout
      window.location.href = checkoutWithAttributes.webUrl;
    } catch (error) {
      console.error('Error creating pre-order checkout:', error);
      // Fallback to pre-order page on error
      window.location.href = '/pre-order';
    }
  };

  return (
    <div className="early-access-page">
      <div className="early-access-content">
        <h1>
          <span className="hidden md:inline">Get Early Access <br /> FOR 10% Off at Launch</span>
          <span className="md:hidden">Get Early Access FOR 10% Off at Launch</span>
        </h1>
        <p>
          <span className="hidden md:inline">Be among the first to build, learn, and create with nLab <br /> — now before the Kickstarter goes live.</span>
          <span className="md:hidden">Be among the first to build, learn, and create with nLab — now before the Kickstarter goes live.</span>
        </p>
      </div>

      <div className="early-access-image-container">
        <img
          src="/svg/blue_light.svg"
          alt=""
          className="blue-light-overlay"
        />
        <img
          src="/svg/img/access_main.png"
          alt="nLab Electronics Kit"
          className="early-access-main-image"
        />
      </div>

      <div className="early-access-description">
        <p className="description-main">
          nLab isn't a new idea — it's a field-tested system trusted by educators and learners. We've refined it through university classrooms and hundreds of hands-on builds. Now, we're launching it for everyone.
        </p>
        <p className="description-secondary">
          When you join Early Access, you're not just pre-ordering a kit. You're joining a community, shaping the future of STEM learning, and getting in early with perks.
        </p>
      </div>

      <div className="early-access-content">
        <Form method="post" className="early-access-form">
          <h2>SIGN UP</h2>

          {/* Success Message */}
          {actionData?.success && (
            <div className="form-message success">
              <p>🎉 {actionData.message}</p>
              <p>Check your email for confirmation and next steps!</p>
            </div>
          )}

          {/* Error Message */}
          {actionData?.error && (
            <div className="form-message error">
              <p>❌ {actionData.error}</p>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="interest">What interests you most?</label>
            <select id="interest" name="interest" disabled={isSubmitting}>
              <option value="">Why are you interested in nLab?</option>
              <option value="light">Light Projects</option>
              <option value="sound">Sound Projects</option>
              <option value="sensing">Sensing Projects</option>
              <option value="motion">Motion Projects</option>
              <option value="ai">AI Hardware</option>
              <option value="all">All of the above</option>
            </select>
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            <span>{isSubmitting ? 'Joining...' : 'Join the list'}</span>
            <span>{isSubmitting ? '⏳' : '→'}</span>
          </button>

          <div className="pre-order-cta">
            <p className="pre-order-text">
              Want to secure your spot? <strong>Pre-order for just $1</strong>
            </p>
            <button onClick={handlePreOrder} className="pre-order-button">
              Pre-Order Now for $1 →
            </button>
          </div>

          <p className="form-disclaimer">
            No spam—just cool builds, perks, and learning inspiration. You can unsubscribe anytime.
          </p>
        </Form>
      </div>

      <div className="early-access-features-wrapper">
        <div className="feature-block">
          <div className="access-image-container">
            <img
              src="/svg/img/access_first.png"
              alt="nLab Kit Feature 1"
              className="access-image"
            />
          </div>

          <div className="benefits-column">
            <h3 className="benefits-title">WHY JOIN EARLY ACCESS?</h3>

            <div className="benefit-item">
              <h4>SAVE AT LAUNCH</h4>
              <p>Get 10% off your Starter Kit on Kickstarter.</p>
            </div>

            <div className="benefit-item">
              <h4>EXCLUSIVE PREVIEWS</h4>
              <p>Be the first to see new projects, lessons, and updates.</p>
            </div>

            <div className="benefit-item">
              <h4>BEHIND THE SCENES</h4>
              <p>Get insider access to how we're building nLab.</p>
            </div>

            <div className="benefit-item">
              <h4>COMMUNITY ACCESS</h4>
              <p>Join our Discord maker community before launch.</p>
            </div>

            <div className="benefit-item">
              <h4>SHAPE THE FUTURE</h4>
              <p>Help us refine projects and guide what comes next.</p>
            </div>
          </div>
        </div>

        <div className="feature-block">
          <div className="access-image-container">
            <img
              src="/svg/img/access_second.png"
              alt="nLab Kit Feature 2"
              className="access-image"
            />
          </div>

          <div className="benefits-column">
            <h3 className="benefits-title">WHO'S IT FOR</h3>

            <div className="benefit-item">
              <h4>CAREER CHANGERS & UPSKILLERS</h4>
              <p>Build real skills that translate into opportunities.</p>
            </div>

            <div className="benefit-item">
              <h4>STUDENTS & FUTURE ENGINEERS</h4>
              <p>Learn electronics and robotics by doing, not just reading.</p>
            </div>

            <div className="benefit-item">
              <h4>SELF-DIRECTED LEARNERS</h4>
              <p>Follow your curiosity — no prerequisites required.</p>
            </div>

            <div className="benefit-item">
              <h4>PARENTS & EDUCATORS</h4>
              <p>Give teens hands-on STEM learning that builds confidence.</p>
            </div>

            <div className="benefit-item">
              <h4>MAKERS & INFLUENCERS</h4>
              <p>Experiment, share, and inspire others with your builds.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="early-access-content">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

