import {Link, Form, useActionData, useNavigation, useLoaderData} from 'react-router';
import {data} from 'react-router';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

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

// Spam filter functions
function isSpamEmail(email) {
  const spamDomains = [
    '10minutemail.com', 'tempmail.org', 'guerrillamail.com', 'mailinator.com',
    'yopmail.com', 'temp-mail.org', 'throwaway.email', 'getnada.com',
    'maildrop.cc', 'sharklasers.com', 'grr.la', 'guerrillamailblock.com',
    'pokemail.net', 'spam4.me', 'bccto.me', 'chacuo.net', 'dispostable.com',
    'fakeinbox.com', 'hide.biz.st', 'mytrashmail.com', 'nobulk.com',
    'sogetthis.com', 'spamherelots.com', 'superrito.com', 'zoemail.org'
  ];

  const domain = email.toLowerCase().split('@')[1];
  return spamDomains.includes(domain);
}

function isSpamName(name) {
  const spamPatterns = [
    /^test\s*$/i,
    /^admin\s*$/i,
    /^user\s*$/i,
    /^sample\s*$/i,
    /^example\s*$/i,
    /^fake\s*$/i,
    /^spam\s*$/i,
    /^bot\s*$/i,
    /^robot\s*$/i,
    /^[a-z]{1,2}$/i, // Single or double letters
    /^\d+$/, // Only numbers
    /^(.)\1{3,}/, // Repeated characters (aaaa, bbbb)
    /^[^a-zA-Z\s]+$/, // No letters at all
    /test.*test/i,
    /admin.*admin/i,
    /spam.*spam/i,
    /^[a-z]{8,}$/i, // Long strings of only lowercase letters (like sdbwebwefwef)
    /^[A-Z]{8,}$/i, // Long strings of only uppercase letters
    /^[bcdfghjklmnpqrstvwxyz]{6,}$/i, // Long strings without vowels (gibberish)
    /^[aeiou]{4,}$/i, // Long strings of only vowels
    /^[qwerty]{6,}$/i, // Keyboard mashing patterns
    /^[asdf]{4,}$/i, // More keyboard patterns
    /^[zxcv]{4,}$/i, // Bottom row keyboard patterns
  ];

  return spamPatterns.some(pattern => pattern.test(name.trim()));
}

function hasSpamKeywords(text) {
  const spamKeywords = [
    'viagra', 'casino', 'lottery', 'winner', 'congratulations',
    'click here', 'free money', 'make money', 'work from home',
    'bitcoin', 'crypto', 'investment', 'loan', 'credit',
    'pharmacy', 'pills', 'medication', 'weight loss',
    'seo', 'marketing', 'promotion', 'advertisement'
  ];

  const lowerText = text.toLowerCase();
  return spamKeywords.some(keyword => lowerText.includes(keyword));
}

function isValidHumanName(name) {
  const trimmedName = name.trim();

  // Must be at least 2 characters
  if (trimmedName.length < 2) return false;

  // Must contain at least one letter
  if (!/[a-zA-Z]/.test(trimmedName)) return false;

  // Should not be all uppercase (unless short)
  if (trimmedName.length > 3 && trimmedName === trimmedName.toUpperCase()) return false;

  // Should not have excessive special characters
  const specialCharCount = (trimmedName.match(/[^a-zA-Z\s'-]/g) || []).length;
  if (specialCharCount > 2) return false;

  // Check for reasonable vowel-to-consonant ratio (human names have vowels)
  const vowels = (trimmedName.match(/[aeiouAEIOU]/g) || []).length;
  const consonants = (trimmedName.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length;
  const totalLetters = vowels + consonants;

  if (totalLetters > 4) {
    // Names should have at least some vowels (at least 15% vowels)
    const vowelRatio = vowels / totalLetters;
    if (vowelRatio < 0.15) return false;

    // Names shouldn't be mostly vowels either (max 70% vowels)
    if (vowelRatio > 0.7) return false;
  }

  // Check for excessive consonant clusters (more than 4 consonants in a row is suspicious)
  if (/[bcdfghjklmnpqrstvwxyz]{5,}/i.test(trimmedName)) return false;

  // Check for patterns that look like keyboard mashing
  const keyboardPatterns = [
    /qwerty/i, /asdfgh/i, /zxcvbn/i, /qazwsx/i, /plmokn/i,
    /mnbvcx/i, /lkjhgf/i, /poiuyt/i, /rewqas/i
  ];

  if (keyboardPatterns.some(pattern => pattern.test(trimmedName))) return false;

  return true;
}

// Action function to handle form submission
export async function action({request, context}) {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const interest = formData.get('interest');

  console.log('📝 Early access form submission:', { name, email, interest });

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

  // Spam filtering
  if (isSpamEmail(email)) {
    console.log('🚫 Blocked spam email:', email);
    return data(
      {
        error: 'Please use a valid email address.',
        success: false,
      },
      {status: 400}
    );
  }

  if (isSpamName(name)) {
    console.log('🚫 Blocked spam name:', name);
    return data(
      {
        error: 'Please enter your real name.',
        success: false,
      },
      {status: 400}
    );
  }

  if (!isValidHumanName(name)) {
    console.log('🚫 Blocked invalid name format:', name);
    return data(
      {
        error: 'Please enter a valid name.',
        success: false,
      },
      {status: 400}
    );
  }

  if (hasSpamKeywords(name) || hasSpamKeywords(email)) {
    console.log('🚫 Blocked spam keywords in:', { name, email });
    return data(
      {
        error: 'Invalid submission detected.',
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
    // Determine source based on interest field
    const isPopupSubmission = interest === 'Kickstarter Popup';
    const source = isPopupSubmission ? 'Kickstarter Popup' : 'Early Access Form';

    console.log('🎯 Submission type:', { isPopupSubmission, source });

    const requestBody = {
      data: {
        type: 'profile',
        attributes: {
          email: email,
          first_name: name.split(' ')[0],
          last_name: name.split(' ').slice(1).join(' ') || '',
          properties: {
            interest: isPopupSubmission ? 'General Interest' : (interest || 'Not specified'),
            source: source,
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

    console.log('✅ Klaviyo integration successful!');

    return data({
      success: true,
      message: isPopupSubmission
        ? 'Successfully joined the Kickstarter launch list! 🎉'
        : 'Successfully joined the early access list!',
    });

  } catch (error) {
    console.error('❌ Klaviyo integration failed:', error);

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
  const navigate = useNavigate();
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

  // Keyboard shortcut to admin signups page
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ctrl+Alt+N to navigate to admin signups page
      if (event.ctrlKey && event.altKey && event.key === 'n') {
        event.preventDefault();
        navigate('/admin/signups');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

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
              <option value="">I want to learn how to build my own projects</option>
              <option value="light">I’m looking for tools to prototype new ideas</option>
              <option value="sound">I want to teach or run workshops</option>
              <option value="sensing">I’m exploring AI and creative technology</option>
              <option value="motion">I’m interested in mechanical or electrical engineering</option>
              <option value="ai">I want to join a community of builders</option>
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

