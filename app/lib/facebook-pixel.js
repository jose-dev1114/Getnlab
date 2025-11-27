/**
 * Facebook Pixel Event Tracking Utilities
 * 
 * This module provides helper functions to track Facebook Pixel events
 * throughout the nLab website for better conversion tracking and analytics.
 */

/**
 * Track a standard Facebook Pixel event
 * @param {string} eventName - Standard event name (e.g., 'Lead', 'Purchase', 'AddToCart')
 * @param {Object} parameters - Event parameters
 */
export function trackFacebookEvent(eventName, parameters = {}) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
    console.log(`📊 Facebook Pixel: ${eventName}`, parameters);
  }
}

/**
 * Track a custom Facebook Pixel event
 * @param {string} eventName - Custom event name
 * @param {Object} parameters - Event parameters
 */
export function trackCustomFacebookEvent(eventName, parameters = {}) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, parameters);
    console.log(`📊 Facebook Pixel Custom: ${eventName}`, parameters);
  }
}

/**
 * Track email signup events (for early access, newsletter, etc.)
 * @param {string} email - User email
 * @param {string} source - Source of signup (e.g., 'early-access', 'popup', 'footer')
 */
export function trackEmailSignup(email, source = 'unknown') {
  trackFacebookEvent('Lead', {
    content_name: 'Email Signup',
    content_category: 'Lead Generation',
    source: source,
    value: 1.00,
    currency: 'USD'
  });
  
  trackCustomFacebookEvent('EmailSignup', {
    email_hash: hashEmail(email), // Hash for privacy
    source: source,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track pre-order events
 * @param {Object} product - Product information
 * @param {number} value - Order value
 * @param {string} currency - Currency code
 */
export function trackPreOrder(product, value, currency = 'USD') {
  trackFacebookEvent('Purchase', {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    content_category: 'Electronics Kit',
    value: value,
    currency: currency,
    num_items: 1
  });
  
  trackCustomFacebookEvent('PreOrder', {
    product_id: product.id,
    product_name: product.name,
    value: value,
    currency: currency,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track page view events for specific pages
 * @param {string} pageName - Name of the page
 * @param {Object} additionalData - Additional page data
 */
export function trackPageView(pageName, additionalData = {}) {
  trackCustomFacebookEvent('PageView', {
    page_name: pageName,
    ...additionalData,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track video engagement events
 * @param {string} videoTitle - Title of the video
 * @param {string} action - Action taken (e.g., 'play', 'pause', 'complete')
 * @param {number} progress - Progress percentage (0-100)
 */
export function trackVideoEngagement(videoTitle, action, progress = 0) {
  trackCustomFacebookEvent('VideoEngagement', {
    video_title: videoTitle,
    action: action,
    progress: progress,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track form interactions
 * @param {string} formName - Name of the form
 * @param {string} action - Action taken (e.g., 'start', 'submit', 'abandon')
 */
export function trackFormInteraction(formName, action) {
  trackCustomFacebookEvent('FormInteraction', {
    form_name: formName,
    action: action,
    timestamp: new Date().toISOString()
  });
}

/**
 * Simple email hashing for privacy (basic implementation)
 * @param {string} email - Email to hash
 * @returns {string} - Hashed email
 */
function hashEmail(email) {
  // Simple hash function for privacy - in production, use a proper hashing library
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    const char = email.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16);
}

/**
 * Initialize Facebook Pixel with enhanced ecommerce tracking
 * @param {string} pixelId - Facebook Pixel ID
 */
export function initializeFacebookPixel(pixelId) {
  if (typeof window !== 'undefined' && pixelId) {
    // Enable advanced matching for better conversion tracking
    if (window.fbq) {
      window.fbq('init', pixelId, {
        em: 'auto', // Enable automatic advanced matching
        external_id: 'auto' // Enable external ID matching
      });
      
      console.log(`📊 Facebook Pixel initialized: ${pixelId}`);
    }
  }
}
